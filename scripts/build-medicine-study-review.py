"""Build the Medicine MID study feedback from manually reviewed source records.

Run from any directory with the bundled Python runtime. The private lecture
originals, extracted pages and authored reviews are intentionally outside Git.
Every displayed quotation is checked against its claimed original page before
publication. This builder never changes the imported question or Gift key.
"""
from collections import Counter
from pathlib import Path
import hashlib
import json
import re

import pypdfium2 as pdfium
import pdfplumber


REPO = Path(__file__).resolve().parents[1]
WORKSPACE = REPO.parent
INPUT = WORKSPACE / "work/medicine-explanation-audit"
SOURCES = WORKSPACE / "references/medicine-mid-444"
norm = lambda text: " ".join(text.split())
sha = lambda data: hashlib.sha256(data).hexdigest()
source_pages = json.loads((SOURCES / "evidence-audit/original-page-text-flow.json").read_text())
source_by_id = {source["id"]: source for source in source_pages}
baseline = json.loads((INPUT / "baseline-all.json").read_text())
questions = {q["id"]: q for q in baseline if q["subjectId"] == "medicine" and q["assessment"] == "Midterm"}
reviews = {}
for cycle in ("cardiology", "pulmonology", "nephrology", "gastroenterology", "gastro-liver", "gastro-esophageal"):
    authored = json.loads((INPUT / f"{cycle}-review.json").read_text())
    for qid, review in authored.items():
        assert qid in questions, f"Review outside Medicine MID: {qid}"
        assert qid not in reviews, f"Question reviewed twice: {qid}"
        reviews[qid] = review
assert reviews.keys() == questions.keys(), {"missing": sorted(questions.keys() - reviews.keys()), "extra": sorted(reviews.keys() - questions.keys())}

# Re-extract the pages from the original PDF bytes, independently of the old
# evidence cache. A paraphrase is never published between quotation marks.
needed_pages = {}
for review in reviews.values():
    if review.get("evidence"):
        e = review["evidence"]
        needed_pages.setdefault(e["pdfId"], set()).add(e["page"])
actual_pages = {}
independent_cache_path = INPUT / "independent-original-pages.json"
independent_cache = json.loads(independent_cache_path.read_text()) if independent_cache_path.exists() else {}
for fid, page_numbers in needed_pages.items():
    original = SOURCES / "originals" / f"{fid}.pdf"
    cached = independent_cache.get(fid, {})
    if cached.get("sha256") == sha(original.read_bytes()) and all(str(number) in cached.get("pages", {}) for number in page_numbers):
        for number in page_numbers:
            actual_pages[(fid, number)] = cached["pages"][str(number)]
        print(f"Verified independent PDF extraction {source_by_id[fid]['title'].strip()}: {len(page_numbers)} cited pages", flush=True)
        continue
    with pdfplumber.open(original) as pdf:
        for number in sorted(page_numbers):
            page = pdf.pages[number - 1]
            actual_pages[(fid, number)] = {
                "flowText": norm(page.extract_text(use_text_flow=True, x_tolerance=1) or ""),
                "text": norm(page.extract_text() or ""),
                "tightText": norm(page.extract_text(x_tolerance=1) or ""),
            }
    print(f"Re-extracted {source_by_id[fid]['title'].strip()}: {len(page_numbers)} cited pages", flush=True)

images = REPO / "lecture-media/medicine-mid"
images.mkdir(parents=True, exist_ok=True)
checked_sources = set()
rendered = {}
page_checks = {}
output = {}
for qid, original in questions.items():
    authored = reviews[qid]
    assert len(authored["explanation"].strip()) >= 80, qid
    assert authored["basis"] in ("lecture", "clinical"), qid
    assert authored["confidence"] in ("supported", "preference", "unresolved"), qid
    assert not re.search(r"[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]", authored["explanation"] + authored.get("objection", "")), qid
    for answer in authored["answers"]:
        assert any(option["id"] == answer and option["text"].strip() for option in original["options"]), (qid, answer)
    evidence = authored.get("evidence")
    if evidence:
        fid, page_number = evidence["pdfId"], evidence["page"]
        source = source_by_id[fid]
        original_pdf = SOURCES / "originals" / f"{fid}.pdf"
        if fid not in checked_sources:
            assert sha(original_pdf.read_bytes()) == source["sha256"], f"Changed source PDF: {fid}"
            checked_sources.add(fid)
        page = source["pages"][page_number - 1]
        quote = norm(evidence["quote"])
        assert quote and not re.search(r"[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]", quote), (qid, "unreadable evidence")
        page_texts = actual_pages[(fid, page_number)]
        matches = [kind for kind, actual in page_texts.items() if quote in actual]
        assert matches, (qid, fid, page_number, "Quotation absent from claimed page", quote)
        assert evidence["relation"] in ("teaching", "background"), qid
        if authored["basis"] == "lecture":
            assert evidence["relation"] == "teaching", (qid, "Background must not be called answer support")
        image_name = f"{fid}-{page_number:03}.jpg"
        image_path = images / image_name
        if image_name not in rendered:
            pdf = pdfium.PdfDocument(str(original_pdf))
            pdf_page = pdf[page_number - 1]
            bitmap = pdf_page.render(scale=1600 / pdf_page.get_width())
            pil = bitmap.to_pil().convert("RGB")
            pil.save(image_path, format="JPEG", quality=80, optimize=True)
            rendered[image_name] = sha(image_path.read_bytes())
            pdf.close()
        text_kind = matches[0]
        page_hash = sha(page_texts[text_kind].encode())
        page_checks[f"{fid}:{page_number}:{text_kind}"] = {"pdfId": fid, "page": page_number, "textKind": text_kind, "textSha256": page_hash}
        evidence = {
            "pdfId": fid, "title": re.sub(r"^(?:L)?\d+\)\s*", "", re.sub(r"\.pdf$", "", source["title"].strip())).strip(" ."), "page": page_number,
            "quote": quote, "relation": evidence["relation"], "sourceSha256": source["sha256"],
            "pageTextSha256": page_hash, "textKind": text_kind,
            "url": source["url"], "image": f"lecture-media/medicine-mid/{image_name}",
            "imageSha256": rendered[image_name],
        }
    else:
        assert authored["basis"] == "clinical", (qid, "Lecture-based explanation without evidence")
    keys = original["sourceAnswer"] if isinstance(original["sourceAnswer"], list) else [original["sourceAnswer"]] if original["sourceAnswer"] else []
    objection = authored.get("objection", "").strip()
    if authored["answers"] and set(authored["answers"]) != set(keys) and keys:
        assert objection, (qid, "Different answer without explanation")
    output[qid] = {
        "answers": authored["answers"], "confidence": authored["confidence"], "basis": authored["basis"],
        "explanation": authored["explanation"].strip(), "objection": objection, "evidence": evidence,
        "references": authored.get("references", []),
    }

payload = json.dumps(output, ensure_ascii=False, indent=2)
(REPO / "medicine-mid-study-review.js").write_text(
    "// Medicine MID: simple study explanations; original Gift answers and grading are preserved.\n"
    "(() => {\n  const reviews = " + payload + ";\n"
    "  for (const question of window.GIFT445_QUESTIONS || []) {\n"
    "    if (question.subjectId === 'medicine' && question.assessment === 'Midterm' && reviews[question.id]) {\n"
    "      question.medicineReview = reviews[question.id];\n"
    "    }\n  }\n})();\n"
)
report = {
    "reviewedOn": "2026-10-20", "scope": "Medicine Midterm only", "questions": len(output),
    "lectureBased": sum(r["basis"] == "lecture" for r in output.values()),
    "clinical": sum(r["basis"] == "clinical" for r in output.values()),
    "confidence": dict(Counter(r["confidence"] for r in output.values())),
    "objections": sum(bool(r["objection"]) for r in output.values()),
    "uniqueSlideImages": len(rendered), "imageBytes": sum((images / name).stat().st_size for name in rendered),
    "sources": [{k: source[k] for k in ("id", "title", "cycle", "pageCount", "sha256")} for source in source_pages],
    "pageChecks": list(page_checks.values()),
}
(REPO / "tests/fixtures/medicine-mid-study-review.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
(INPUT / "published-summary.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
lines = [
    "# Medicine Midterm explanation review", "", "Reviewed on 20 October 2026.", "",
    f"All {len(output)} Midterm questions have a question-specific explanation. The original Gift answers, grading, source questions, tables, images and saved IDs are unchanged.", "",
    f"- Explanations based on matching lecture teaching: {report['lectureBased']}",
    f"- Complementary clinical explanations: {report['clinical']}",
    f"- Questions with a qualification or source issue: {report['objections']}",
    f"- Questions without one defensible option: {report['confidence'].get('unresolved', 0)} (each still has an explanation)",
    f"- Original slide pages available within the explanation: {report['uniqueSlideImages']}", "",
    "The feedback shows Gift answer, Explanation, and a reviewed alternative only when needed. Exact source excerpts and original page images are expandable. Clinical explanations are labelled separately. No update announcement was added.", "",
    "## Available lecture sources", "", "| Block | Original lecture | PDF pages |", "|---|---|---:|",
]
for source in source_pages:
    lines.append(f"| {source['cycle']} | {source['title'].strip().replace('|', '/')} | {source['pageCount']} |")
lines += ["", "## Questions with a qualification or source issue", "", "| Question | Gift | Reviewed answer | Reason |", "|---|---|---|---|"]
for qid, review in output.items():
    if not review["objection"]:
        continue
    original = questions[qid]
    keys = original["sourceAnswer"] if isinstance(original["sourceAnswer"], list) else [original["sourceAnswer"]] if original["sourceAnswer"] else []
    answer = ", ".join(review["answers"]) or "No unique option"
    lines.append(f"| {qid} | {', '.join(keys) or 'Not recorded'} | {answer} | {review['objection'].replace('|', '/')} |")
(INPUT / "review-summary.md").write_text("\n".join(lines) + "\n")
print(json.dumps({k: v for k, v in report.items() if k not in ("sources", "pageChecks")}, indent=2))
