#!/usr/bin/env python3
"""Build the Community Medicine midterm bank from the supplied DOCX.

The source file is deliberately not committed. Pass its path with --input. The
generated browser data keeps the recorded answer, adds an independently labelled
AI opinion, merges exact repeats across batches, and retains every source location.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph


BATCHES = {"443", "442", "441", "439", "438", "437", "436", "435", "434", "433", "432", "431"}
LECTURES = [
    "Natural History of Disease and Concepts of Prevention and Control",
    "Global Demography Concepts and Population Pyramid",
    "Principles of Epidemiology",
    "Determinants of Health",
    "Surveillance and Screening",
    "Prevention and Control of Infectious Disease Pandemics",
    "Burden of Disease",
    "Disparities in Health",
    "Mental Health",
    "Adolescent and Child Health",
    "Maternal Health",
    "Social and Behavioral Health",
    "Tobacco and Vaping Use",
    "Substance Use",
    "Introduction to Health Policy",
]

REFERENCES = {
    LECTURES[0]: [{"title": "CDC Principles of Epidemiology", "url": "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson1/index.html"}],
    LECTURES[1]: [{"title": "United Nations World Population Prospects", "url": "https://www.un.org/development/desa/pd/content/world-population-prospects-2024"}],
    LECTURES[2]: [{"title": "CDC Principles of Epidemiology — Measures of Risk", "url": "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson3/section2.html"}],
    LECTURES[3]: [{"title": "WHO — Social determinants of health", "url": "https://www.who.int/health-topics/social-determinants-of-health"}],
    LECTURES[4]: [{"title": "WHO — Screening programmes: a short guide", "url": "https://www.who.int/publications/i/item/9789289054782"}],
    LECTURES[5]: [{"title": "CDC Principles of Epidemiology — Chain of Infection", "url": "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson1/section10.html"}],
    LECTURES[6]: [{"title": "WHO — Global Health Estimates", "url": "https://www.who.int/data/global-health-estimates"}],
    LECTURES[7]: [{"title": "WHO — Health inequities and their causes", "url": "https://www.who.int/news-room/facts-in-pictures/detail/health-inequities-and-their-causes"}],
    LECTURES[8]: [{"title": "WHO — Mental health", "url": "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response"}],
    LECTURES[9]: [{"title": "WHO — Adolescent health", "url": "https://www.who.int/health-topics/adolescent-health"}],
    LECTURES[10]: [{"title": "WHO — Maternal health", "url": "https://www.who.int/health-topics/maternal-health"}],
    LECTURES[11]: [{"title": "WHO — Health promotion", "url": "https://www.who.int/health-topics/health-promotion"}],
    LECTURES[12]: [{"title": "WHO — Tobacco", "url": "https://www.who.int/news-room/fact-sheets/detail/tobacco"}],
    LECTURES[13]: [{"title": "WHO — Alcohol, drugs and addictive behaviours", "url": "https://www.who.int/teams/mental-health-and-substance-use/alcohol-drugs-and-addictive-behaviours"}],
    LECTURES[14]: [{"title": "WHO — Health policy and systems research", "url": "https://www.who.int/teams/alliance-for-health-policy-systems-research"}],
}

IMAGE_QUESTION_MAP = {
    ("438", 29): "community-438-q29.png",
    ("438", 37): "community-438-q37.png",
    ("437", 15): "community-437-q15.png",
    ("436", 1): "community-436-q01.png",
    ("436", 31): "community-436-q31.png",
    ("436", 33): "community-436-q33.jpg",
    ("435", 20): "community-435-q20.png",
    ("432", 20): "community-432-q20.jpg",
    ("431", 31): "community-431-q31.jpg",
    ("431", 58): "community-431-q58.png",
}

# Explicit scope decisions are based on the current lecture files, not on the
# older subject headings that happened to exist when a batch question was made.
LECTURE_OVERRIDES = {
    ("442", 3): LECTURES[3], ("442", 4): LECTURES[3], ("442", 11): LECTURES[3],
    ("442", 14): LECTURES[2], ("442", 18): LECTURES[11],
    ("441", 4): LECTURES[12], ("441", 6): None, ("441", 9): None,
    ("441", 13): None, ("441", 14): LECTURES[4], ("441", 16): LECTURES[4],
    ("441", 24): None,
    ("439", 9): None, ("439", 12): LECTURES[9], ("439", 17): LECTURES[5], ("439", 21): LECTURES[11],
    ("439", 24): LECTURES[5], ("439", 28): LECTURES[14], ("439", 32): None,
    ("439", 34): None, ("439", 41): LECTURES[9], ("439", 44): LECTURES[5],
    ("439", 47): None, ("439", 54): LECTURES[9], ("439", 57): LECTURES[14],
    ("439", 58): LECTURES[14],
    ("438", 2): LECTURES[9], ("438", 5): None, ("438", 11): LECTURES[9],
    ("438", 12): None, ("438", 23): None, ("438", 27): LECTURES[9],
    ("438", 32): None, ("438", 38): LECTURES[5], ("438", 47): LECTURES[11],
    ("438", 48): None, ("438", 50): LECTURES[11], ("438", 55): LECTURES[9],
    ("438", 59): LECTURES[14],
    ("437", 2): LECTURES[5], ("437", 3): None, ("437", 6): LECTURES[9],
    ("437", 11): None, ("437", 14): LECTURES[8], ("437", 15): LECTURES[1],
    ("437", 21): LECTURES[9], ("437", 22): None, ("437", 27): LECTURES[14],
    ("437", 28): LECTURES[14], ("437", 29): LECTURES[14],
    ("436", 1): LECTURES[3], ("436", 10): LECTURES[5], ("436", 21): LECTURES[5],
    ("436", 26): None,
    ("435", 15): None, ("435", 25): LECTURES[1], ("435", 30): LECTURES[1],
    ("435", 36): LECTURES[5],
    ("434", 1): LECTURES[2], ("434", 2): LECTURES[2], ("434", 4): LECTURES[2],
    ("434", 7): None, ("434", 33): LECTURES[9], ("434", 44): LECTURES[1],
    ("434", 46): None,
    ("433", 10): LECTURES[5], ("433", 18): LECTURES[5], ("433", 28): LECTURES[7],
    ("433", 35): LECTURES[3],
    ("432", 4): LECTURES[5], ("432", 11): LECTURES[0], ("432", 17): LECTURES[5],
    ("432", 18): LECTURES[5], ("432", 34): LECTURES[9], ("432", 35): LECTURES[9],
    ("431", 18): LECTURES[5],
    # Current child-health content includes Saudi vaccination timing and obesity;
    # the current burden lecture includes national burden patterns.
    ("439", 6): LECTURES[9], ("438", 46): LECTURES[9],
    ("439", 15): LECTURES[9], ("438", 39): LECTURES[9], ("437", 31): LECTURES[9],
    ("435", 17): LECTURES[9], ("439", 33): LECTURES[6],
    # Older standalone topics that can otherwise be captured by a word in an option.
    ("441", 7): None,
    # Manual audit corrections where a word in an option would otherwise win.
    ("442", 31): LECTURES[6],
    ("439", 46): LECTURES[5], ("437", 8): LECTURES[2], ("437", 19): LECTURES[5],
    ("437", 23): LECTURES[9], ("436", 9): LECTURES[5], ("436", 20): LECTURES[7],
    ("435", 39): LECTURES[5], ("434", 34): LECTURES[5], ("434", 47): LECTURES[5],
    ("433", 4): LECTURES[7], ("432", 14): LECTURES[5], ("432", 15): LECTURES[9],
    ("431", 17): LECTURES[9], ("431", 34): LECTURES[5],
    ("441", 1): LECTURES[1], ("434", 41): LECTURES[5], ("436", 30): LECTURES[7],
    ("438", 35): LECTURES[0], ("438", 45): LECTURES[6], ("431", 11): LECTURES[0],
    ("431", 16): LECTURES[5],
    ("439", 19): None, ("439", 39): None, ("437", 30): None,
    ("442", 32): LECTURES[11], ("441", 22): LECTURES[11],
    ("436", 16): None, ("436", 24): LECTURES[5], ("432", 5): LECTURES[2],
    ("431", 40): LECTURES[5],
    ("436", 7): LECTURES[1], ("438", 44): LECTURES[2], ("435", 11): LECTURES[2],
    ("434", 18): LECTURES[1], ("433", 26): LECTURES[1], ("431", 54): LECTURES[1],
    ("431", 57): LECTURES[1], ("434", 9): LECTURES[5], ("434", 21): LECTURES[5],
    ("433", 34): LECTURES[5], ("431", 42): LECTURES[5],
    ("433", 22): LECTURES[2], ("431", 6): LECTURES[5], ("431", 10): LECTURES[2],
    ("439", 27): None, ("431", 41): LECTURES[5], ("431", 52): LECTURES[5],
    ("431", 53): LECTURES[4], ("439", 26): None, ("438", 7): None,
    ("436", 5): LECTURES[5], ("435", 37): LECTURES[5], ("434", 36): LECTURES[5],
    ("434", 56): LECTURES[5], ("432", 39): LECTURES[5], ("432", 40): LECTURES[5],
    ("431", 8): LECTURES[5], ("431", 36): LECTURES[5], ("431", 37): LECTURES[5],
    ("431", 47): LECTURES[5],
}

AI_OVERRIDES = {
    ("443", 3): {"answer": "D", "verification": "conflict", "suggestion": "The calculated number of positive tests is 95: 85 true positives plus 10 false positives. The Gift records C (85)."},
    ("443", 9): {"answer": "C", "verification": "conflict", "suggestion": "Because diabetes is already established, foot-care education is intended to prevent complications and is best classified as tertiary prevention."},
    ("443", 10): {"answer": None, "verification": "conflict", "suggestion": "Immediate protection from injected immunoglobulin is artificial passive immunity, but that option is missing; the source also duplicates passive natural immunity."},
    ("443", 12): {"answer": "B", "verification": "needs-review", "suggestion": "An intrauterine device is a highly effective reversible option and can be removed when pregnancy is desired, although contraceptive choice should be individualized."},
    ("442", 3): {"answer": "A", "verification": "needs-review", "suggestion": "The multiple cardiometabolic risks support intensive lifestyle intervention, but the source stem and one option are incomplete."},
    ("442", 5): {"answer": "B", "verification": "supported", "suggestion": "Cervical cancer screening is secondary prevention."},
    ("442", 8): {"answer": "A", "verification": "needs-review", "suggestion": "General school-health promotion is usually primary prevention, but the stem is too broad to exclude specific secondary or tertiary activities."},
    ("442", 15): {"answer": None, "verification": "conflict", "suggestion": "For type 2 diabetes, retinopathy screening begins at diagnosis; none of the listed options states this."},
    ("442", 11): {"answer": "D", "verification": "needs-review", "suggestion": "A maternal cardiovascular event at age 56 is a premature family history and is the strongest clearly stated risk factor among the listed choices."},
    ("442", 23): {"answer": "A", "verification": "conflict", "suggestion": "The stem defines sensitivity: the proportion of people who truly have the disease who are identified as positive. The Gift records uncertainty between A and C."},
    ("442", 24): {"answer": "B", "verification": "conflict", "suggestion": "Maternal mortality ratio uses live births as the denominator; option B is correct, while the Gift records A."},
    ("441", 5): {"answer": "A", "verification": "needs-review", "suggestion": "The only recorded statement is the standard definition of unmet need; the source did not provide a conventional set of choices."},
    ("438", 14): {"answer": "C", "verification": "conflict", "suggestion": "BFHI standards concern maternity and newborn services; routine counselling during home visits is outside the facility initiative. The Gift tentatively records D."},
    ("438", 2): {"answer": "D", "verification": "conflict", "suggestion": "When prior vaccination cannot be documented, the uncertain dose should not replace the scheduled age-appropriate booster; Td-IPV should be given."},
    ("438", 4): {"answer": "B", "verification": "conflict", "suggestion": "With unknown prior tetanus vaccination, at least two tetanus-toxoid-containing doses are given during pregnancy, four weeks apart, with the second at least two weeks before birth."},
    ("438", 13): {"answer": "B", "verification": "needs-review", "suggestion": "Failure to detect infectious cases promptly and complete effective treatment sustains transmission and is the best general programmatic explanation among the options."},
    ("438", 21): {"answer": "D", "verification": "supported", "suggestion": "The Saudi National Mental Health Survey reported separation anxiety disorder as the most common individual lifetime disorder among these options."},
    ("438", 27): {"answer": None, "verification": "needs-review", "suggestion": "The record is incomplete and catch-up vaccination depends on the current national schedule and documented previous doses; no single listed regimen is graded."},
    ("438", 38): {"answer": "D", "verification": "supported", "suggestion": "Frequent hand hygiene is the appropriate listed measure to reduce household influenza transmission; vaccination does not treat the current infection."},
    ("438", 6): {"answer": "A", "verification": "conflict", "suggestion": "Using the standard mid-year population denominator gives 9.02 deaths per 1,000 (A). The Gift note also accepts B after using total population instead."},
    ("436", 5): {"answer": "A", "verification": "supported", "suggestion": "Hepatitis A is transmitted fecal-orally, so safe water, sanitation and community hygiene are the appropriate listed preventive measures."},
    ("434", 5): {"answer": "B", "verification": "supported", "suggestion": "Successive peaks separated by roughly an incubation period suggest propagated person-to-person spread."},
    ("434", 9): {"answer": None, "verification": "conflict", "suggestion": "Immunogenicity is assessed by the immune response, such as seroconversion or antibody titre. None of the listed epidemiologic measures states that directly."},
    ("433", 23): {"answer": "C", "verification": "conflict", "suggestion": "Tetanus toxoid is the recommended listed vaccine in pregnancy. The source labels it C but records D, which is German measles vaccine and is contraindicated."},
    ("433", 14): {"answer": "D", "verification": "conflict", "suggestion": "Because the stem asks about deaths attributable to pregnancy, delivery and the puerperium, maternal mortality is the intended indicator."},
    ("432", 26): {"answer": "A", "verification": "conflict", "suggestion": "A population surveillance system directly measures disease occurrence and can estimate prevalence; the Gift tentatively records C."},
    ("432", 27): {"answer": "B", "verification": "supported", "suggestion": "Extent of communicability is a relevant criterion when prioritizing communicable diseases for mandatory reporting."},
    ("437", 2): {"answer": "D", "verification": "supported", "suggestion": "For a woman with no documented tetanus vaccination, the full lifetime series comprises five properly spaced tetanus-toxoid-containing doses."},
    ("437", 20): {"answer": None, "verification": "conflict", "suggestion": "Fog or mist application is space spraying. That term is missing from the incomplete options, so no listed option is graded correct."},
    ("435", 19): {"answer": "B", "verification": "conflict", "suggestion": "After confirming the outbreak and describing it, the team should develop hypotheses about the unknown source; repeating diagnostic confirmation does not identify the source."},
}

QUESTION_REFERENCE_OVERRIDES = {
    ("438", 4): [{"title": "WHO — Protecting all against tetanus", "url": "https://www.who.int/docs/default-source/tetanus/9789241515610-eng.pdf"}],
    ("438", 21): [{"title": "Saudi National Mental Health Survey — Lifetime prevalence", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7507419/"}],
    ("437", 2): [{"title": "WHO — Maternal and neonatal tetanus elimination strategies", "url": "https://www.who.int/initiatives/maternal-and-neonatal-tetanus-elimination-%28mnte%29/the-strategies"}],
    ("437", 20): [{"title": "WHO — Malaria entomology and vector control", "url": "https://www.afro.who.int/sites/default/files/2017-06/9789241505819_eng.pdf"}],
}


@dataclass
class RawQuestion:
    batch: str
    number: int
    lines: list[str] = field(default_factory=list)
    media_parts: list[object] = field(default_factory=list)


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\u00a0", " ")).strip()


def iter_blocks(document: Document):
    for child in document.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, document)
        elif child.tag == qn("w:tbl"):
            yield Table(child, document)


def parse_source(path: Path) -> list[RawQuestion]:
    document = Document(path)
    questions: list[RawQuestion] = []
    batch = None
    current = None
    for block in iter_blocks(document):
        if isinstance(block, Table):
            if current:
                rows = []
                for row in block.rows:
                    cells = [clean(cell.text) for cell in row.cells]
                    if any(cells):
                        rows.append(" | ".join(cells))
                if rows:
                    current.lines.append("Table: " + " / ".join(rows))
            continue
        text = clean(block.text)
        if text in BATCHES:
            batch = text
            current = None
            continue
        match = re.match(r"^Q\s*(\d+)\s*[\.\:\-\)]?\s*(.*)$", text, re.I)
        if match and batch:
            current = RawQuestion(batch=batch, number=int(match.group(1)))
            questions.append(current)
            remainder = clean(match.group(2))
            if remainder:
                current.lines.append(remainder)
        elif current and text:
            current.lines.append(text)
        if current:
            for blip in block._p.xpath(".//a:blip"):
                rel_id = blip.get(qn("r:embed"))
                part = block.part.related_parts.get(rel_id)
                if part and part not in current.media_parts:
                    current.media_parts.append(part)
    return questions


def answer_parts(lines: list[str]):
    answer_note = None
    body = []
    answer_pattern = re.compile(r"\bAnswer\s*[:\-]\s*(.+)$", re.I)
    for line in lines:
        match = answer_pattern.search(line)
        if match:
            answer_note = clean(match.group(1))
            prefix = clean(line[: match.start()])
            if prefix:
                body.append(prefix)
        else:
            body.append(line)
    letters = []
    if answer_note:
        # Only read the leading answer token(s). Explanatory notes often mention
        # another option later (for example, "D, if negative then give A"), and
        # treating every A-D in that prose as a keyed answer corrupts the bank.
        remaining = re.sub(r"^\s*both\s+answers?\s*", "", answer_note, flags=re.I)
        remaining = remaining.lstrip(" ([")
        first = re.match(r"([A-D])\b", remaining, re.I)
        if first:
            letters.append(first.group(1).upper())
            remaining = remaining[first.end():]
            while True:
                following = re.match(r"\s*(?:[,/&]|\bor\b|\?\s*\bor\b)\s*([A-D])\b", remaining, re.I)
                if not following:
                    break
                letters.append(following.group(1).upper())
                remaining = remaining[following.end():]
        letters = list(dict.fromkeys(letters))
    return body, answer_note, letters


def split_question(raw: RawQuestion) -> dict:
    lines, answer_note, answers = answer_parts(raw.lines)
    explicit = []
    stem_lines = []
    current_option = None
    option_pattern = re.compile(r"^([A-D])\s*[\.\)\:\-]\s*(.*)$", re.I)
    for line in lines:
        match = option_pattern.match(line)
        if match:
            current_option = {"id": match.group(1).upper(), "text": clean(match.group(2))}
            explicit.append(current_option)
        elif explicit and current_option:
            current_option["text"] = clean(current_option["text"] + " " + line)
        else:
            stem_lines.append(line)

    if explicit:
        options = explicit
    else:
        # Older sections frequently omit A-D labels. The choices are normally the
        # final four separate paragraphs; fewer are retained when the source has fewer.
        option_count = min(4, max(1, len(stem_lines) - 1)) if len(stem_lines) > 1 else 0
        if len(stem_lines) >= 5:
            option_count = 4
        option_lines = stem_lines[-option_count:] if option_count else []
        stem_lines = stem_lines[:-option_count] if option_count else stem_lines
        options = [{"id": chr(65 + index), "text": text} for index, text in enumerate(option_lines)]

    stem = clean(" ".join(stem_lines)) or f"Question {raw.number} (stem not recoverable from source text)."
    options = [option for option in options if option["text"]]
    if len({option["id"] for option in options}) != len(options):
        options = [{"id": chr(65 + index), "text": option["text"]} for index, option in enumerate(options)]
    for option in options:
        option["text"] = re.sub(r"\s*Answer\s*:\s*$", "", option["text"], flags=re.I).strip()
    if not options:
        options = [{"id": "A", "text": "No answer choices were recorded in the source."}]
    return {
        "batch": raw.batch,
        "number": raw.number,
        "stem": stem,
        "options": options,
        "sourceAnswer": answers[0] if len(answers) == 1 else (answers or None),
        "sourceAnswerNote": answer_note,
        "incompleteSource": not answer_note or len(options) < 2,
        "mediaParts": raw.media_parts,
    }


def classify(item: dict) -> str | None:
    override_key = (item["batch"], item["number"])
    if override_key in LECTURE_OVERRIDES:
        return LECTURE_OVERRIDES[override_key]
    text = clean(item["stem"] + " " + " ".join(x["text"] for x in item["options"])).lower()
    stem_text = item["stem"].lower()

    def has(pattern: str) -> bool:
        return bool(re.search(pattern, text, re.I))

    # Behavioural framing takes priority when tobacco or vaccines are only examples.
    if has(r"stages? of change|precontemplation|contemplation|preparation|maintenance|relapse|health belief|perceived (?:barrier|benefit|severity|susceptibility)|self[- ]efficacy|diffusion|early adopters?|early majority|late majority|laggards?|injunctive norm|descriptive norm|social norm|blooms? taxonomy|knowledge.*attitude.*practice|behavior(?:al)? change"):
        return LECTURES[11]
    if has(r"smok|tobacco|nicotine|cigarette|vaping|e-cigarette|water.?pipe|shisha|fagerstrom|5\s*a['’]?s|bupropion|varenicline|nicotine replacement"):
        return LECTURES[12]
    if has(r"substance (?:use|misuse|abuse|dependence|withdrawal)|tramadol|opioid|opiate|heroin|cannabis|marijuana|amphetamine|cocaine|alcohol (?:use|withdrawal|intoxication)|delirium tremens|naloxone|psychoactive|addiction|drug dependence|drug withdrawal"):
        return LECTURES[13]
    if has(r"maternal|pregnan|antenatal|postnatal|postpartum|breast.?feed|lactation|baby friendly|rooming.?in|contracept|family planning|unmet need|birth spacing|obstetric|gravida|parity|mother and baby|sore nipple"):
        return LECTURES[10]
    if has(r"adolescen|under.?five|infant mortality|neonatal|post.?neonatal|perinatal|child mortality|child health|young people|10.?19|5.?14|15.?24|jeeluna|vaccination schedule|missed vaccin"):
        return LECTURES[9]
    if has(r"\bmental health|\bmental illness|\bmental disorder|depress|anxiety|schizophren|stigma|psych(?:iatric|ological)|suicid|self.?harm"):
        return LECTURES[8]
    if has(r"\bdaly|\bqaly|\byll|\byld|burden of disease|disability.?adjusted|quality.?adjusted|disability weight|utility weight|health.?adjusted life"):
        return LECTURES[6]
    if has(r"health inequal|health inequit|disparit|health indicator|ideal indicator|reliable indicator|sensitive indicator|specific indicator|crude (?:death|mortality)|cause.?specific mortality|age.?specific mortality|proportionate mortality|case fatality|ratio.*proportion.*rate|mortality rate|sex.?specific mortality|road traffic.*per 100"):
        return LECTURES[7]
    if has(r"screen(?:ing|ed)|sensitivity|specificity|predictive value|false positive|false negative|lead time bias|length time bias|surveillance|sentinel|case finding|premarital"):
        return LECTURES[4]
    if has(r"demograph|population pyramid|dependency ratio|fertility rate|total fertility|gross reproduction|net reproduction|migration|population growth|demographic transition|birth rate|sex ratio|doubling time|population census|population numbers.*age group"):
        return LECTURES[1]
    if has(r"chain of infection|communicable|infectious|infection control|reservoir|carrier|portal of (?:entry|exit)|mode of transmission|droplet|airborne|vehicle.?borne|vector.?borne|incubation period|herd immunity|active immunity|passive immunity|immunoglobulin|eradication|elimination|quarantine|isolation|zoon|hookworm|outbreak") or re.search(r"tuberculosis|malaria|cholera|measles|rabies|hepatitis|\bhiv\b|\baids\b|influenza|food poisoning", stem_text, re.I):
        return LECTURES[5]
    if has(r"natural history|iceberg|level of prevention|primordial|primary prevention|secondary prevention|tertiary prevention|rehabilitation|disability limitation|specific protection|health promotion"):
        return LECTURES[0]
    if has(r"epidemiolog|incidence|prevalence|endemic|epidemic|pandemic|person.?place.?time|bradford hill|causal|necessary cause|sufficient cause|epidemiologic triad|cross.?sectional|cohort|case.?control"):
        return LECTURES[2]
    if has(r"determinants? of health|health.?disease spectrum|positive health|definition of health|absence of disease|illness|sickness|well.?being|right to health|health for all|dahlgren|social determinant|environmental determinant|biological determinant"):
        return LECTURES[3]
    if has(r"health policy|public policy|policy cycle|policy triangle|stakeholder|health system|healthcare system|universal health coverage|allocation of resources|big p policy|little p policy"):
        return LECTURES[14]
    return None


def selected_answer_text(item: dict) -> str | None:
    answers = item.get("sourceAnswer")
    if not answers:
        return None
    if isinstance(answers, str):
        answers = [answers]
    choices = {option["id"]: option["text"] for option in item["options"]}
    return " or ".join(choices.get(answer, answer) for answer in answers)


def explanation(item: dict, lecture: str) -> str:
    text = (item["stem"] + " " + " ".join(x["text"] for x in item["options"])).lower()
    keyed = selected_answer_text(item)
    chosen = (keyed or "").lower()
    # Explanations should be driven by the stem and selected answer—not by a
    # distractor that merely happens to contain a matching keyword.
    semantic_text = (item["stem"] + " " + (keyed or "")).lower()
    prefix = f"The recorded answer is {keyed}. " if keyed else "No reference answer was recorded. "
    targeted = {
        ("443", 3): "With 50% prevalence in 200 people, 100 have diabetes and 100 do not. Sensitivity 85% gives 85 true positives; specificity 90% gives 10 false positives. Total positive tests = 85 + 10 = 95, so the AI answer is D while the Gift records C.",
        ("443", 9): "The patient already has diabetes, so foot-hygiene education is intended to prevent ulcers and other established-disease complications. This is tertiary prevention; the Gift itself records uncertainty between primary and tertiary prevention.",
        ("443", 10): "Injected immunoglobulin supplies ready-made antibodies, giving immediate but short-lived artificial passive immunity. That correct category is absent because the options duplicate passive natural immunity, so no listed option should be graded correct.",
        ("442", 15): "Retinopathy screening in type 2 diabetes begins at diagnosis. The listed time intervals do not include that answer; five years after diagnosis applies to type 1 diabetes, not type 2.",
        ("442", 23): "The stem asks for the proportion of truly diseased people correctly identified by the test, which is sensitivity: TP/(TP+FN). Positive predictive value instead starts from everyone who tested positive.",
        ("442", 24): "Maternal mortality ratio equals maternal deaths divided by live births, multiplied by 100,000. Therefore option B is correct; option A describes a maternal mortality rate and conflicts with the Gift key.",
        ("438", 14): "The Baby-friendly Hospital Initiative applies to maternity and newborn services, including antenatal information, rooming-in and protection from commercial promotion. Routine counselling during home visits is outside the hospital initiative, so the AI answer is C rather than the tentative Gift answer D.",
        ("438", 4): "A pregnant woman with unknown or unreliable tetanus vaccination history should receive at least two tetanus-toxoid-containing doses four weeks apart, with dose two at least two weeks before birth. This supports B rather than the tentative Gift answer D.",
        ("438", 21): "The Saudi National Mental Health Survey found separation anxiety disorder to be the most common individual lifetime disorder among the listed choices, supporting D.",
        ("438", 38): "Frequent handwashing is the appropriate listed action to reduce influenza spread to household contacts. Vaccination is preventive for future exposure and does not immediately make an actively infected person noninfectious.",
        ("438", 6): "The standard crude death rate uses the mid-year population: 90,000/9,982,709 × 1,000 = 9.02, so the AI answer is A. The Gift note also accepts B only when the total population is substituted as denominator.",
        ("436", 5): "Hepatitis A spreads by the fecal–oral route. Safe water, sanitation, food hygiene and hand hygiene are therefore the appropriate listed community-level preventive measures.",
        ("434", 5): "A propagated outbreak produces successive waves or peaks as infection passes from person to person, often separated by an incubation period. A single sharp peak is more typical of a point source.",
        ("434", 9): "Immunogenicity means the ability to induce an immune response and is evaluated with measures such as seroconversion or antibody titre. The listed attack-rate and severity measures do not directly measure immunogenicity, so no option is graded by the AI.",
        ("433", 23): "Tetanus toxoid is the recommended listed vaccine during pregnancy. In the extracted source it is option C; the recorded D is German measles vaccine, a live vaccine that is contraindicated during pregnancy.",
        ("433", 14): "Deaths attributable to pregnancy, childbirth or the puerperium are maternal deaths, so the indicator is maternal mortality. Perinatal mortality concerns late fetal and early neonatal deaths, not deaths of the mother.",
        ("432", 26): "A surveillance system continuously collects and analyzes occurrence data, so it can directly estimate the prevalence and distribution of breast cancer. Awareness screening and educational-material updates are separate activities.",
        ("432", 27): "Communicable-disease reporting prioritization considers public-health importance and transmissibility. Among the choices, extent of communicability is the relevant classification criterion.",
        ("435", 19): "The causative organism has already been established but the source remains unknown. The next investigative step is to develop testable hypotheses about possible exposures, so the AI answer is B rather than the recorded C.",
    }
    if (item["batch"], item["number"]) in targeted:
        return targeted[(item["batch"], item["number"])]
    if lecture == LECTURES[11]:
        if re.search(r"bloom", text):
            return prefix + "Bloom's three learning domains are cognitive (knowledge), affective (attitudes and values), and psychomotor (skills)."
        if re.search(r"innovator|early adopter|early majority|late majority|laggard", text):
            return prefix + "Diffusion-of-innovations categories differ by readiness to adopt: innovators and early adopters move first, the majorities wait for increasing evidence or social proof, and laggards adopt last."
        if re.search(r"injunctive|descriptive norm|social norm", text):
            return prefix + "An injunctive norm concerns perceived approval or disapproval, whereas a descriptive norm concerns what other people are perceived to do."
    if lecture == LECTURES[9] and re.search(r"mental illness|anxiety|depress", text):
        return prefix + "Anxiety and depressive disorders are among the leading mental-health causes of illness and disability during adolescence."
    if lecture == LECTURES[8]:
        if re.search(r"national saudi survey|most recorded mental", semantic_text):
            return prefix + "The course question groups anxiety and mood disorders as the leading category in the cited national survey; the answer is therefore a population-prevalence finding, not a clinical diagnosis for one patient."
        if re.search(r"ashamed|stigma", semantic_text):
            return prefix + "Concealing a mental disorder because of shame reflects internalized stigma: the person has absorbed negative social beliefs and applies them to himself."
        if re.search(r"bullied|quiet|grades", semantic_text):
            return prefix + "Persistent bullying followed by withdrawal and declining school performance is a warning pattern requiring early psychosocial assessment and support."
        if re.search(r"targeted help|high risk|selective", semantic_text):
            return prefix + "Selective prevention targets subgroups with a higher-than-average risk before a diagnosable disorder is established."
    if lecture == LECTURES[10] and re.search(r"unmet need", text):
        return prefix + "Unmet need for family planning refers to fecund, sexually active women who want to delay or avoid pregnancy but are not using a contraceptive method."
    if lecture == LECTURES[1] and re.search(r"dependency ratio", text):
        return prefix + "The dependency ratio compares younger and older dependants with the working-age population, usually expressed per 100 working-age people."
    chosen_cases = [
        (r"burden of disease", "Burden of disease is the cumulative health loss and wider consequences produced by disease or injury in a population, compared with an ideal of full health."),
        (r"cumulated current health", "Burden is the gap between an ideal population living in full health and the population's accumulated current health state."),
        (r"cause.?specific mortality|disease specific mortality", "A cause-specific mortality rate uses deaths from the named cause in the numerator and the relevant population in the denominator over a stated period."),
        (r"case fatality", "Case fatality is deaths among diagnosed cases divided by all cases of that disease; it describes severity rather than population risk."),
        (r"crude death|crude mortality", "The crude death rate is all deaths during the period divided by the mid-year population, usually expressed per 1,000 population."),
        (r"proportionate mortality", "Proportionate mortality is deaths from a specified cause divided by all deaths in the same population and period, expressed as a percentage."),
        (r"same results on repeated|reproduc", "Reliability is reproducibility: the indicator gives consistent results when measurement is repeated under comparable conditions."),
        (r"\byouth\b|15.?24", "WHO population terminology commonly uses youth for ages 15–24; adolescence covers ages 10–19."),
        (r"life expectancy", "Life expectancy summarizes the average years a person is expected to live under current mortality patterns, making it useful for broad population comparisons."),
        (r"positive health", "Positive health is the upper end of the health–disease spectrum; death is the lower end."),
        (r"environmental determinant|environmental factor", "Features of the built and physical environment—such as housing, walkability, crowding, water and pollution—are environmental determinants of health."),
        (r"family history", "A first-degree relative with premature cardiovascular disease is a strong non-modifiable risk marker; it cannot be inferred from BMI alone."),
        (r"intrauterine device", "An IUD is a highly effective long-acting reversible contraceptive that can be removed when pregnancy is desired."),
        (r"\bimplant\b", "A contraceptive implant is a highly effective long-acting reversible method; fertility returns after removal and it does not require daily adherence."),
        (r"\bcondom\b", "A condom is a short-acting reversible barrier method; implants and IUDs are long-acting reversible methods, while sterilization is permanent."),
        (r"poor latching", "Poor latch causes nipple trauma because the infant grasps the nipple rather than taking a large portion of the areola into the mouth."),
        (r"chin touch|mouth is wide open", "A wide-open mouth with the chin touching the breast is a sign of effective attachment and helps milk transfer while reducing nipple pain."),
        (r"kangaroo|bonding", "Kangaroo mother care promotes skin-to-skin contact, bonding, thermal stability and breastfeeding, especially for small or preterm infants."),
        (r"stage ?5|declining stage", "In demographic transition stage 5, the birth rate falls below the death rate, leading to population ageing and possible natural decrease."),
        (r"stage ?4|low stationary", "Stage 4 has low birth and death rates, so population growth is low and the population is relatively stable."),
        (r"early expanding", "The early-expanding stage combines a high birth rate with a rapidly falling death rate, producing rapid population growth."),
        (r"declining fertility.*longevity", "Population ageing results mainly from fewer births and longer survival, which increases the share of older people."),
        (r"crude birth rate", "Crude birth rate is live births during the year divided by the mid-year population, conventionally expressed per 1,000 population."),
        (r"total fertility rate", "Total fertility rate estimates the average number of children a woman would bear if current age-specific fertility rates continued through her reproductive years."),
        (r"gross reproduction", "Gross reproduction rate estimates the average number of daughters a woman would bear under current fertility rates, without adjusting for female mortality."),
        (r"de jure|factual figure", "A de jure census counts people at their usual legal residence, rather than where they happen to be on census day."),
        (r"natality", "Natality is births as a force of population change; mortality and migration are the other major demographic forces."),
        (r"descriptive epidemiology", "Descriptive epidemiology characterizes health events by person, place and time; analytic epidemiology then examines why and how they occur."),
        (r"web of causation", "The web-of-causation model suits multifactorial chronic disease because several interacting causes contribute rather than one necessary agent."),
        (r"external validity", "External validity is the extent to which a study's findings generalize to another population or setting, such as from the UK to Saudi Arabia."),
        (r"necessary factor|necessary cause", "A necessary cause must be present for the disease to occur, even though it may not be sufficient by itself."),
        (r"sentinel|monitoring specific high risk", "Sentinel surveillance uses selected reporting sites or groups to track trends efficiently; it is not intended to enumerate every case in the whole population."),
        (r"\bpassive\b", "Passive surveillance relies on routine reports sent by healthcare providers or laboratories; it is inexpensive but vulnerable to under-reporting."),
        (r"ongoing collection", "Surveillance is continuous, systematic collection, analysis, interpretation and dissemination for public-health action; a survey is time-limited."),
        (r"detect outbreaks", "Timely surveillance detects unusual increases above the expected baseline so investigation and control can begin early."),
        (r"information for public health action", "Surveillance is useful only when analyzed information is communicated to decision-makers and used for prevention and control."),
        (r"under.?report|poor utilization", "Under-reporting and poor service use make surveillance incomplete, biasing estimates downward and delaying outbreak detection."),
        (r"loose case definition|increase the yield", "An intentionally sensitive early case definition captures more possible cases during an emerging outbreak, accepting more false positives for better case finding."),
        (r"direct contact", "Direct transmission occurs through immediate physical contact with an infected person, body fluid, soil or another source without an intervening vehicle or vector."),
        (r"contaminated soil", "Soil can act as an environmental reservoir or direct-contact source when infective larvae penetrate exposed skin."),
        (r"self.?isolation|isolation", "Isolation separates infectious cases during the period of communicability to reduce exposure of susceptible contacts."),
        (r"community hygiene|sanitation|hand washing", "Hygiene, safe water and sanitation interrupt fecal–oral transmission and are central environmental controls for enteric infections."),
        (r"anti.?hbs", "Anti-HBs after hepatitis B vaccination indicates a protective antibody response; HBsAg would indicate current infection rather than vaccine uptake."),
        (r"period of communicability", "The period of communicability is the interval during which an infected person can transmit the agent, which determines the necessary exclusion or isolation period."),
        (r"pathogenicity", "Pathogenicity is the ability of an agent to cause clinical disease among infected hosts; virulence describes the severity of resulting disease."),
        (r"virulence", "Virulence is the severity of disease among cases and is commonly reflected by the case-fatality proportion or the clinical-to-subclinical ratio."),
        (r"micro health", "Micro policies operate within organizations or services, such as hospital procedures and clinical practice guidelines."),
        (r"macro health", "Macro policies are national or system-level decisions on priorities, financing and organization of health services."),
        (r"health policy", "Health policy comprises decisions, plans and actions intended to achieve stated health goals and shape services, financing or population health."),
        (r"psychomotor", "The psychomotor domain concerns performing a physical skill; a hands-on demonstration and practice of glucose testing targets this domain."),
        (r"alcohol use", "Use without impaired control, risky behavior, distress or functional impairment does not by itself meet criteria for a substance use disorder."),
        (r"substance.*surveillance|surveillance.*substance", "Surveillance establishes the size and pattern of a substance-use problem before a campaign selects and evaluates interventions."),
    ]
    for pattern, detail in chosen_cases:
        if re.search(pattern, semantic_text, re.I):
            return prefix + detail
    topic_cases = [
        (r"health.?disease.*continuum|lowest point.*health", "Health is a continuum rather than a binary state because people can move through degrees of wellbeing, illness, disability and recovery; death is its lowest endpoint."),
        (r"health and disease lie along a continuum", "An individual's health state is dynamic and can move in either direction along the continuum; there is therefore no single permanent cut-off between health and disease."),
        (r"screen.*cervix|cervical.*screen", "Screening an asymptomatic person detects preclinical disease and is therefore secondary prevention."),
        (r"prevention.*schools", "Broad school-health promotion and specific protection act before disease develops, so the best general classification is primary prevention; a more specific school activity could fall at another level."),
        (r"policies and legislations|setting of policies", "Primordial prevention changes upstream social and environmental conditions so risk factors do not become established in the population."),
        (r"complete physical.*mental.*social", "This is the WHO constitutional definition of health: wellbeing has physical, mental and social dimensions and is more than the absence of diagnosed disease."),
        (r"beings.? model", "BEINGS is a course framework for grouping determinants of health; the keyed number should be interpreted according to the factors shown in the current lecture diagram."),
        (r"intensive therapeutic lifestyle", "Multiple concurrent cardiometabolic risks justify a structured, intensive lifestyle intervention rather than a minimal or unspecified programme, although the source stem is incomplete."),
        (r"average risk.*colorectal", "This asks for a screening strategy in an asymptomatic average-risk person. The recorded interval is retained from the Gift, but screening age and interval depend on the current guideline and test used."),
        (r"mother.*breast cancer|risk to breast cancer", "A first-degree family history changes breast-cancer risk assessment and may justify earlier individualized imaging; the recorded Gift answer is shown separately from current clinical guidance."),
        (r"dynamic seek", "Actively seeking reports or cases is active surveillance, unlike passive surveillance in which routine reporters submit data without prompting."),
        (r"false negative", "The false-negative proportion among people who truly have disease is FN/(TP+FN), which also equals 1 minus sensitivity."),
        (r"diagnostic power", "A test's diagnostic performance is described by sensitivity and specificity; predictive values additionally depend on disease prevalence in the tested population."),
        (r"main function.*surveillance|description of.*public health surveillance", "Public-health surveillance is continuous, systematic collection, analysis, interpretation and dissemination of health data for action."),
        (r"classify diseases.*surveillance", "Diseases are prioritized for surveillance using public-health importance, epidemic potential, preventability and the feasibility or legal need for reporting."),
        (r"population pyramid.*montenegro|type of population pyramid", "The shape is classified from its age structure: a broad base indicates expansion, similar-sized age bands suggest stationarity, and a narrow base with larger older groups suggests decline or constriction."),
        (r"distribution of old people", "Falling fertility and improving survival increase the proportion of older adults, so population ageing is expected to increase the older share."),
        (r"population.*2051|double in 35|growth rate of 2", "Using the rule of 70, a 2% annual growth rate gives an approximate doubling time of 35 years; 27 million therefore becomes about 54 million by 2051."),
        (r"growth rate.*1\.87|doubling", "The rule of 70 estimates doubling time as 70 divided by the annual percentage growth rate; 70/1.87 is about 37 years."),
        (r"elements of demography", "Population size and structure change through fertility, mortality and migration; these are the core demographic components."),
        (r"crude birth rate.*crude death rate", "Natural increase is approximated by subtracting the crude death rate from the crude birth rate; when rates are per 1,000, divide the difference by 10 to express a percentage."),
        (r"food item.*relative risk|food item.*least possible|attack rate", "For each food, compare the attack rate among those who ate it with the attack rate among those who did not. The highest risk ratio points to the most likely vehicle; the lowest argues against it."),
        (r"study design.*outbreak source", "A retrospective cohort is efficient when the exposed group is well defined, while a case-control study is useful when the full population at risk cannot be enumerated; the outbreak setting determines the choice."),
        (r"formulate.*hypothes|food poisoning.*investig", "After describing an outbreak by person, place and time, investigators formulate a testable hypothesis about the source and then evaluate it analytically."),
        (r"clinical diagnosis.*no lab|suspected|probable case", "Outbreak case classifications combine clinical, epidemiologic and laboratory criteria. A clinically compatible case without confirmatory laboratory evidence is not a confirmed case."),
        (r"epidemiological wheel|epidemiologic wheel", "The wheel model places the host's genetic core at the center and surrounds it with biological, physical and social environments, emphasizing multiple interacting causes."),
        (r"epidemiologic triad", "The epidemiologic triad organizes causation into agent, host and environment; changing any one can alter whether disease occurs."),
        (r"primary preventive measure.*stage|primary preventive level", "Primary prevention acts during susceptibility, before pathologic changes or symptoms occur, through health promotion and specific protection."),
        (r"diabetes for 20 years|insulin for 15", "Because disease is already established, care aimed at limiting complications and disability is tertiary prevention."),
        (r"iceberg phenomenon|few cases.*hidden", "The visible diagnosed cases are the tip of the iceberg, while undiagnosed, subclinical or carrier states form the much larger hidden portion."),
        (r"natural history.*absence of any intervention|progress.*disease.*absence of any intervention", "Natural history describes how a disease progresses from susceptibility through subclinical and clinical stages to recovery, disability or death without intervention."),
        (r"aggregation of cases.*area|cluster", "A cluster is an aggregation of cases in a particular place and period that appears greater than expected, even when the precise expected number is not yet known."),
        (r"constantly present|definition of endemic", "Endemic means the constant or usual presence of a disease or agent in a defined geographic area or population."),
        (r"average number of cases.*ranged|within.*usual.*range", "Because the observed number remains within the usual expected range for that population and period, the disease is endemic rather than an epidemic or outbreak."),
        (r"haphazard|irregular.*infrequent|sporadic", "Sporadic disease occurs irregularly and infrequently, with cases separated in place or time and no sustained pattern."),
        (r"large number of cases.*countries|across continents|pandemic", "A pandemic is an epidemic with sustained spread across multiple countries or continents, affecting a large number of people."),
        (r"successive peaks|propagated|measles outbreak", "A propagated epidemic curve shows successive waves as infection spreads person to person, often separated by roughly one incubation period."),
        (r"wedding reception|single exposure|point.?source", "A shared exposure at one event produces a point-source outbreak, with cases concentrated within one incubation period."),
        (r"soy.?butter|continuous common", "The curve must be interpreted against the exposure window: prolonged access to one contaminated product suggests a common source, while separated waves suggest secondary person-to-person spread."),
        (r"case definition.*outbreak", "An outbreak case definition normally specifies clinical criteria plus restrictions by person, place and time so cases are counted consistently."),
        (r"epidemic curve.*plotted|distribution of the cases", "An epidemic curve plots the number of cases on the vertical axis against time of illness onset on the horizontal axis."),
        (r"infectivity", "Infectivity is an agent's ability to enter, survive and multiply in a susceptible host; it differs from pathogenicity and virulence."),
        (r"presence of living infectious agent.*exterior|infestation", "Infestation is the lodgement or development of arthropods on the body surface or in clothing; infection refers to invasion and multiplication within the host."),
        (r"harbors.*no symptoms.*transmit|carrier", "A carrier harbors the agent without apparent illness yet can transmit it, making detection and appropriate management important for control."),
        (r"carriers of communicable", "Carrier management is disease-specific and may include detection, treatment, exclusion from high-risk work and follow-up to interrupt transmission."),
        (r"targets the mode of transmission|mode of transmission", "Measures aimed at the transmission route include sanitation, disinfection, ventilation, vector control and safe food, water or injection practices, depending on the agent."),
        (r"susceptible host", "Measures directed at susceptible hosts include immunization, chemoprophylaxis and improving host resistance; they do not remove the reservoir or route itself."),
        (r"reason.*vaccines.*safe", "Vaccines expose the immune system to antigen without causing the full natural disease; safety is established through testing and ongoing surveillance."),
        (r"measles infection.*immunity", "Recovery from natural measles infection produces naturally acquired active immunity because the person's own immune system responds to the infection."),
        (r"measles vaccine|german measles.*mumps|\bmmr\b", "Measles-containing vaccines such as MMR are live attenuated vaccines; the schedule and contraindications must follow the current national programme."),
        (r"hepatitis a vaccine.*type|type of hepatitis a vaccine", "Hepatitis A vaccines used in routine practice are inactivated vaccines; they produce active immunity without live viral replication."),
        (r"hepatitis a.*infective material|infective material.*hepatitis a", "Hepatitis A is shed in feces and spreads mainly by the fecal–oral route, especially through contaminated food, water or hands."),
        (r"hepatitis d", "Hepatitis D requires hepatitis B surface antigen for replication, so it occurs only as coinfection or superinfection with hepatitis B."),
        (r"chronic hepatitis [bc]|chronic infection", "Age and immune status strongly affect chronic viral-hepatitis risk; hepatitis B becomes chronic far more often after perinatal infection than after adult infection."),
        (r"hepatitis b.*health care|health care providers", "Occupational hepatitis B transmission occurs mainly through percutaneous or mucosal exposure to infected blood, such as a needlestick injury."),
        (r"mother with chronic hepatitis b|newborn.*hepatitis b", "A newborn exposed to maternal hepatitis B needs prompt post-exposure immunoprophylaxis according to the national protocol to reduce perinatal transmission."),
        (r"hepatitis e.*mortality|mortality.*hepatitis e|pregnan.*hepatitis", "Hepatitis E can be particularly severe during pregnancy, with a higher risk of fulminant hepatitis and maternal death."),
        (r"tuberculosis.*resurgence", "Tuberculosis resurgence is driven by interacting factors including delayed case detection, incomplete effective treatment, drug resistance, HIV and adverse living conditions."),
        (r"tuberculin|\btst\b", "Tuberculin skin-test interpretation depends on induration size and risk group; immunosuppressed contacts use a lower positive threshold and require clinical assessment."),
        (r"fixed dose combination", "Fixed-dose combination treatment simplifies dosing and reduces inadvertent monotherapy, helping adherence and limiting selection of drug resistance."),
        (r"directly observed therapy|\bdots\b", "Directly observed therapy supports completion of an effective multidrug tuberculosis regimen and reduces treatment failure, relapse and acquired resistance."),
        (r"most important mode of transmission of tb|tb.*transmission", "Pulmonary tuberculosis spreads through airborne droplet nuclei released by an infectious person, especially in poorly ventilated indoor settings."),
        (r"leading cause of death.*hiv|hiv infected.*death", "Tuberculosis is a major cause of death among people living with HIV because immunosuppression greatly increases progression and severe disease risk."),
        (r"vertical transmission.*hiv|transmitting hiv.*baby", "Vertical transmission can occur during pregnancy, labour and delivery, or breastfeeding; effective maternal treatment and perinatal care markedly reduce risk."),
        (r"mode of transmission.*hiv|route of transmission.*hiv|hiv/aids.*transmission", "HIV transmission patterns vary by population and period; the keyed answer reflects the course epidemiology, while prevention targets sexual, blood-borne and vertical routes."),
        (r"malaria.*best prevention|control malaria|malaria.*primary intervention|primary intervention.*malaria", "Malaria prevention combines vector control—especially insecticide-treated nets and indoor residual spraying—with chemoprevention and prompt diagnosis where indicated."),
        (r"malaria.*secondary", "Secondary prevention focuses on early diagnosis and effective treatment to prevent progression and reduce the infectious reservoir."),
        (r"malaria.*region|saudi arabia.*malaria", "Local malaria risk is concentrated where competent vectors and transmission conditions persist; the keyed region reflects the course's Saudi epidemiology."),
        (r"west africa|yellow fever", "Travel to a yellow-fever-risk area requires destination-specific vaccination and mosquito-bite prevention, with entry requirements checked before travel."),
        (r"fog|mist.*pesticide|space spraying", "Applying insecticide as fog or mist is space spraying, a rapid adult-mosquito control measure; residual spraying treats indoor surfaces instead."),
        (r"ebola.*healthcare|unprotected contact.*ebola", "Ebola control in healthcare relies on rapid isolation, appropriate personal protective equipment, safe specimen and waste handling, and active contact monitoring for the incubation period."),
        (r"zoonotic", "A zoonosis is naturally transmitted between vertebrate animals and humans; whether onward human-to-human spread occurs depends on the specific agent."),
        (r"school health.*most common", "The keyed condition reflects the course's school-health epidemiology; common conditions are prioritized by prevalence, preventability and effect on learning."),
        (r"primary school prevention|school immunization", "School immunization is specific protection delivered before disease occurs, so it is primary prevention."),
        (r"6 months old.*sit|develop", "Developmental milestones are assessed by age and by domains such as gross motor, fine motor, language and social skills; sitting with support at six months is generally age-appropriate."),
        (r"birth till 7 days|first 7 days", "Deaths during the first seven completed days after birth are early neonatal deaths; neonatal mortality includes the entire first 28 days."),
        (r"infants? death.*live births|infant mortality rate", "Infant mortality uses deaths before age one in the numerator and live births in the denominator, conventionally expressed per 1,000 live births."),
        (r"bcg.*route|route of administration of bcg", "BCG is administered intradermally; correct technique produces a small local wheal and helps avoid injection-related complications."),
        (r"bcg.*when|time of bcg|bcg vaccine given", "BCG timing is taken from the Saudi national immunization schedule used in the course; schedules can change, so the current MOH table should be checked for clinical use."),
        (r"vaccine.*9 months|9 months old.*vaccine", "The answer follows the Saudi national immunization schedule presented in the lecture for the nine-month visit; schedule timing should be checked against the current MOH version."),
        (r"first dose.*hepatitis b|first dose.*hbv|hepatitis b vaccine.*when|when.*hepatitis b vaccine", "The first hepatitis B dose is scheduled at birth to reduce perinatal and early-childhood transmission; subsequent doses complete the primary series."),
        (r"hepatitis b.*correct schedule|national immunization schedule.*hepatitis b", "The keyed series follows the Saudi national immunization schedule used in the lecture, beginning at birth and continuing through the infant primary series."),
        (r"hepatitis a vaccine.*first dose|first dose.*hepatitis a", "The answer follows the age in the Saudi schedule presented in the course; the schedule should be checked against the latest MOH version before clinical use."),
        (r"hospital worker.*hepatitis b vaccine", "A healthcare worker should first have hepatitis B status and prior vaccination documented; vaccination or post-exposure immunoprophylaxis then depends on those results and any exposure history."),
        (r"successful vaccination", "A protective anti-HBs response after hepatitis B vaccination demonstrates successful active immunization; HBsAg would instead indicate current infection."),
        (r"preventive measure for hepatitis a|strategy for prevention.*hepatitis a", "Hepatitis A prevention combines vaccination with safe water, sanitation, food hygiene and hand hygiene; blood-borne precautions address other hepatitis viruses."),
        (r"little unwell|minor illness.*vaccin", "A mild illness without significant fever is generally not a contraindication to routine vaccination; unnecessary delay leaves the child susceptible."),
        (r"immunodeficien.*vaccine|leukemia.*vaccine|vaccine.*leukemia", "Live attenuated measles-containing vaccine is contraindicated in severe immunodeficiency, whereas the listed inactivated or non-live vaccines do not carry the same replication risk."),
        (r"bluish.?white mucosal membrane|diphther", "A pharyngeal pseudomembrane suggests diphtheria; the preventive vaccine component is diphtheria toxoid in DPT-containing vaccines."),
        (r"poor weight gain.*breastfed", "Early poor weight gain in a breastfed infant most often reflects ineffective attachment or milk transfer, so feeding observation is essential before assuming low milk production."),
        (r"positioning her baby", "Good positioning keeps the infant close, aligned and fully supported, with the nose opposite the nipple before attachment; several listed features may therefore be correct."),
        (r"vaccinations?.*pregnant|vaccine.*pregnancy", "Inactivated vaccines recommended for maternal protection can be given during pregnancy when indicated; live attenuated vaccines are generally contraindicated."),
        (r"rusted nail|tetanus.*booster", "Tetanus wound prophylaxis depends on the wound and documented vaccine history; a complete recent series usually does not require another immediate dose."),
        (r"catch.?up vaccination|vaccination was begun abroad", "Catch-up vaccination uses valid documented previous doses and the child's current age; an uncertain history should be assessed against the current national schedule rather than restarting blindly."),
        (r"tetanus toxoid|\btt\b vaccine", "Tetanus-containing vaccination in pregnancy is based on documented prior doses; an incomplete or unknown history requires an appropriate series with sufficient time before delivery."),
        (r"baby friendly hospital", "The Baby-friendly Hospital Initiative applies evidence-based maternity and newborn-care practices that protect, promote and support breastfeeding."),
        (r"triple aims", "The Triple Aim links better population health and care experience with lower per-capita cost; workforce wellbeing is often described separately as part of the Quadruple Aim."),
        (r"six key questions|new model of care|active individuals", "The Model of Care organizes services around people's needs and levels of intervention; the keyed phrase reflects the course framework rather than a clinical diagnosis."),
        (r"vision 2030.*pillars|pillars.*vision 2030", "The keyed pillar is retained from the course's Vision 2030 framework; it should be read as a policy-structure question, not as a clinical recommendation."),
        (r"allocation of resources|referring to other doctor", "A rule governing referrals or resource use inside a service is an organizational or micro-level policy rather than a national macro policy."),
        (r"activated person|self.?care services", "In the course's Model of Care, the activated-person level equips individuals and families with health education and self-care support to maintain health."),
        (r"nrt|nasal spray|nicotine replacement", "Nicotine-replacement products differ in speed of delivery: nasal spray acts faster than gum or a transdermal patch, while patches provide slower sustained delivery."),
        (r"tramadol|without prescription", "Using a prescribed-type medicine without medical direction is misuse; a substance-use disorder additionally requires a clinically significant pattern of impaired control, risk or functional harm."),
        (r"relative death.*male|mortality rate among females|road traffic.*female", "The sex-specific mortality rate uses deaths in that sex divided by its mid-year population, multiplied by the stated base such as 100,000."),
        (r"age.?specific.*mortality|24.?44.*deaths", "An age-specific mortality rate divides deaths in the stated age group by the population of that same age group during the period."),
        (r"low birth weight|2500 grams", "The percentage of liveborn infants below 2,500 g is a morbidity and maternal-child-health indicator reflecting fetal growth and prematurity."),
        (r"limitation.*crude death", "A crude death rate is strongly affected by population age structure, so comparisons can be misleading unless rates are age-specific or standardized."),
        (r"increased population size.*decreased birth", "A population with lower fertility, longer survival and more older adults is undergoing demographic ageing, which changes service needs and crude rates."),
        (r"primary level.*tuberculosis", "Primary prevention of tuberculosis aims to prevent infection or disease before onset through measures such as BCG for eligible groups, infection control and risk reduction."),
        (r"extrinsic risk factor.*tuberculosis|extrinsic risk factors.*tb", "Extrinsic tuberculosis risks arise from the social or physical environment—such as poverty, crowding and poor access to care—rather than from host biology."),
        (r"immigrant.*prednisolone.*cough|productive cough.*night sweats", "Prolonged cough, fever and night sweats in an immunosuppressed person require evaluation for active pulmonary tuberculosis with chest imaging and microbiologic sputum testing; latent-infection tests alone cannot confirm active disease."),
        (r"tb control|barrier.*tb", "Insufficient case detection and notification allow infectious tuberculosis to remain untreated in the community and are major barriers to control."),
        (r"duration of isolation.*traveler|quarantinable disease", "Quarantine or monitoring duration is based on the maximum incubation period of the suspected disease, whereas isolation applies to an infectious case."),
        (r"route of administration.*rotavirus|rotavirus vaccine.*route", "Rotavirus vaccine is administered orally, allowing mucosal immunization of the gastrointestinal tract."),
        (r"type of bcg", "BCG is a live attenuated vaccine derived from Mycobacterium bovis and is administered intradermally."),
        (r"bcg vaccine is indicated", "BCG is given to newborns in the Saudi schedule to reduce severe childhood tuberculosis; it is not routinely used as an occupational booster."),
        (r"mass gathering.*meningitis|meningitis.*mass gathering", "Crowding during mass gatherings increases droplet transmission of meningococcal disease, which is why destination-specific vaccination requirements apply."),
        (r"pilgrims.*blood borne", "Avoiding unsafe injections, razors and other blood-contaminated instruments reduces blood-borne infection risk during mass gatherings."),
        (r"contact with camels|\bmers\b", "A suspected MERS case with camel exposure requires prompt notification through the designated national surveillance system and appropriate infection-control precautions."),
        (r"hajj.*meningitis|tetravalent.*acyw", "Quadrivalent meningococcal vaccination before Hajj reduces individual risk and transmission in crowded settings; validity requirements follow current Saudi rules."),
        (r"scabies", "Scabies spreads mainly through prolonged direct skin-to-skin contact; fomites play a smaller role except with crusted scabies."),
        (r"covid.?19.*risk", "COVID-19 transmission risk rises with close, prolonged indoor exposure, poor ventilation and inadequate respiratory protection."),
        (r"measles.*return to school|sick leave", "School exclusion for measles covers the infectious period; the return date is counted from rash onset according to public-health guidance."),
        (r"goal of.*malaria control|malaria control program", "Malaria-control programmes aim to reduce transmission, illness and death through vector control, prevention, surveillance, prompt diagnosis and effective treatment."),
        (r"sexual transmission.*mediterranean", "The recorded answer follows the course's culturally framed prevention hierarchy; medically, comprehensive HIV prevention combines effective barrier protection, testing, treatment and risk-reduction counselling."),
        (r"hiv declined.*infection increased", "Falling mortality while incidence or prevalence remains high can reflect longer survival with effective treatment rather than elimination of transmission."),
        (r"components of analytic epidemiologic.*triangle", "The analytic epidemiologic triad is agent, host and environment; person, place and time belong to descriptive epidemiology."),
        (r"cohort|pregnant women.*hiv.*children", "Following an exposed group forward to observe transmission outcomes is a cohort design, because exposure status is identified before the outcome is assessed."),
        (r"all the learning domains", "Counselling combined with role play can address knowledge, attitudes and practical performance together, covering cognitive, affective and psychomotor learning domains."),
        (r"immunogenicity", "Immunogenicity is the ability of an agent or vaccine to provoke a measurable immune response; it is not the same as infectivity, pathogenicity or virulence."),
        (r"systematic and continuous collection", "This is the definition of public-health surveillance: ongoing systematic collection, analysis, interpretation and dissemination of data for action."),
        (r"defines disease outbreak|more than usual number", "An outbreak is occurrence of cases above the number normally expected in a defined place, population and period."),
    ]
    for pattern, detail in topic_cases:
        if re.search(pattern, semantic_text, re.I):
            return prefix + detail
    cases = [
        (r"sensitivity", "Sensitivity is the proportion of people with the condition who test positive: TP/(TP+FN). A highly sensitive test therefore minimizes false negatives."),
        (r"specificity", "Specificity is the proportion of people without the condition who test negative: TN/(TN+FP). A highly specific test therefore minimizes false positives."),
        (r"positive predictive|\bppv\b", "Positive predictive value is TP/(TP+FP) and rises as disease prevalence rises, assuming the test characteristics stay the same."),
        (r"negative predictive|\bnpv\b", "Negative predictive value is TN/(TN+FN) and is usually higher when disease prevalence is lower."),
        (r"\bdaly|disability.?adjusted", "A DALY is one lost year of healthy life and equals years of life lost from premature death (YLL) plus years lived with disability (YLD). Lower DALYs are better."),
        (r"\bqaly|quality.?adjusted", "A QALY combines duration and quality of life: years lived multiplied by a utility weight from 0 (death) to 1 (full health). Higher QALYs are better."),
        (r"incidence", "Incidence counts new cases arising in an at-risk population during a stated period, so it measures risk or the rate of developing disease."),
        (r"prevalence", "Prevalence includes all existing cases at a point or during a period. It is influenced by both incidence and disease duration."),
        (r"active immunity", "Active immunity follows infection or vaccination and requires the host to produce an immune response; onset is slower but protection is usually longer lasting."),
        (r"passive immunity|immunoglobulin", "Passive immunity transfers ready-made antibodies. It acts immediately but is temporary; injected immunoglobulin is artificial passive immunity."),
        (r"herd immunity", "Herd immunity is indirect community protection when enough people are immune to interrupt sustained transmission, helping protect those who cannot be immunized."),
        (r"reservoir", "A reservoir is the habitat in which an infectious agent normally lives, grows and multiplies; it is not always the same as the immediate source of exposure."),
        (r"portal of entry", "The portal of entry is the route through which an agent enters a susceptible host, such as the respiratory, gastrointestinal or genitourinary tract."),
        (r"vehicle", "Vehicle-borne transmission occurs through a contaminated non-living medium such as food, water, blood or a fomite."),
        (r"droplet nuclei|airborne", "Airborne transmission involves small droplet nuclei or particles that remain suspended and can travel beyond close-range droplet spread."),
        (r"eradication", "Eradication means permanent worldwide reduction to zero of infection caused by the agent, after which routine control measures are no longer required."),
        (r"elimination", "Elimination means reducing transmission or incidence to zero in a defined geographic area; continued measures are still needed to prevent re-establishment."),
        (r"primary prevention", "Primary prevention acts before disease begins through health promotion or specific protection. Screening is not primary prevention; it is secondary prevention."),
        (r"secondary prevention|screening", "Secondary prevention detects disease early in apparently healthy people so timely treatment can reduce progression or complications."),
        (r"tertiary prevention|rehabilitation", "Tertiary prevention limits disability and restores function after disease is established, including rehabilitation and complication prevention."),
        (r"precontemplation", "In precontemplation the person is not intending to change soon; counselling focuses on awareness and motivation rather than an immediate action plan."),
        (r"contemplation", "In contemplation the person recognizes the issue and is considering change but has not yet committed to action."),
        (r"preparation", "In preparation the person intends to act soon and may already be taking small practical steps toward change."),
        (r"relapse", "Relapse is return to the previous behavior after a period of change; it is used to reassess triggers and restart the change process."),
        (r"perceived barrier", "Perceived barriers are the person's assessment of obstacles or costs that make the recommended behavior difficult, such as time, inconvenience or side effects."),
        (r"self.?efficacy", "Self-efficacy is confidence in one's ability to perform the target behavior successfully; it strongly influences initiation and persistence."),
        (r"early majority", "The early majority adopts an innovation after evidence and experience from earlier adopters reduce uncertainty; they are deliberate rather than first movers."),
        (r"injunctive", "An injunctive norm reflects what a person thinks others approve or disapprove of, whereas a descriptive norm reflects what others are perceived to do."),
        (r"maternal mortality ratio", "The maternal mortality ratio is maternal deaths during a period divided by live births in the same period, conventionally multiplied by 100,000."),
        (r"maternal mortality rate", "The maternal mortality rate uses women of reproductive age in the denominator, unlike the maternal mortality ratio, which uses live births."),
        (r"exclusive breast", "Exclusive breastfeeding means the infant receives breast milk only, apart from permitted medicines or oral rehydration solution, for the recommended first six months."),
        (r"rooming.?in", "Rooming-in keeps the mother and newborn together around the clock, supporting responsive feeding, bonding and breastfeeding establishment."),
        (r"neonatal", "Neonatal mortality covers deaths during the first 28 completed days of life and is expressed per 1,000 live births."),
        (r"perinatal", "Perinatal mortality spans late fetal deaths and early neonatal deaths; the lecture uses the course definition from 28 weeks of gestation through the first 7 days after birth."),
        (r"under.?five", "The under-five mortality rate is the probability of dying between birth and the fifth birthday, expressed per 1,000 live births."),
        (r"tobacco|smok|nicotine|vaping", "All tobacco products can cause harm, nicotine drives dependence, and vaping is not harmless. Cessation combines behavioral support with evidence-based pharmacotherapy when appropriate."),
        (r"substance use disorder", "Substance use disorder requires a clinically significant pattern of impaired control, risky use or continued use despite harm; simple exposure or nonmedical use alone does not establish the disorder."),
        (r"withdrawal", "Withdrawal is the predictable syndrome after abrupt cessation or reduction following repeated exposure; its features and urgency depend on the substance."),
        (r"health inequality", "A health inequality is any measurable difference between people or groups; inequity is the subset that is avoidable, unfair and unjust."),
        (r"health inequity", "Health inequity describes a systematic, avoidable and unjust difference in health, not merely any observed difference."),
        (r"valid", "A valid indicator measures what it is intended to measure, while reliability means it produces consistent results under comparable conditions."),
        (r"\bratio\b", "In a ratio, the numerator is not necessarily part of the denominator. In a proportion it is included, and a rate additionally incorporates the occurrence of events over time."),
        (r"health for all", "Health for All expresses the goal that everyone can attain a level of health that permits a socially and economically productive life, with primary health care as a central strategy."),
        (r"illness", "Illness is the person's subjective experience of feeling unwell; disease is a professionally identified pathology, and sickness is the social role or consequence attached to the condition."),
        (r"population pyramid", "A population pyramid displays age and sex structure; a broad base suggests high fertility and a younger population, while a narrower base and larger older groups suggest ageing."),
        (r"dependency ratio", "The dependency ratio compares the population conventionally considered dependent (younger and older ages) with the working-age population, usually multiplied by 100."),
        (r"policy", "Health policy is a purposive decision—or decision not to act—that shapes population health, services, financing or the wider determinants of health."),
    ]
    for pattern, detail in cases:
        if re.search(pattern, semantic_text, re.I):
            return prefix + detail
    fallbacks = {
        LECTURES[0]: "The answer is determined by matching the intervention to the stage in the natural history of disease: before onset, early detection, or limitation of established disability.",
        LECTURES[1]: "The answer follows from the standard demographic definition or calculation used to describe population size, structure or change.",
        LECTURES[2]: "The answer follows from the epidemiologic distinction between disease frequency, distribution and determinants in a defined population.",
        LECTURES[3]: "The answer distinguishes the individual's experience of health from the biological, behavioral, social, economic and environmental factors that shape it.",
        LECTURES[4]: "The answer follows from the purpose of surveillance or from the standard 2×2 table used to evaluate a screening test.",
        LECTURES[5]: "The answer matches the relevant link in the chain of infection or the control measure directed at the agent, reservoir, route of transmission or susceptible host.",
        LECTURES[6]: "The answer uses time lived in less than full health or time lost through premature death to quantify population health loss.",
        LECTURES[7]: "The answer applies the standard definition of a health indicator or population measure, including the correct numerator, denominator and time frame.",
        LECTURES[8]: "The answer is based on the public-health definition of mental health, its determinants, stigma, prevention and population burden.",
        LECTURES[9]: "The answer matches the lecture's age definition, mortality indicator or priority health problem for children and adolescents.",
        LECTURES[10]: "The answer follows the maternal-health continuum from antenatal care through childbirth, postpartum care, breastfeeding and healthy birth spacing.",
        LECTURES[11]: "The answer matches the behavioral construct that best explains the person's beliefs, motivation, social influence or readiness to change.",
        LECTURES[12]: "The answer follows the course approach to tobacco dependence, health risks and evidence-based cessation support.",
        LECTURES[13]: "The answer distinguishes substance use, misuse, intoxication, withdrawal and substance use disorder using the scenario's functional impact and symptoms.",
        LECTURES[14]: "The answer follows the lecture's distinction between health, medical care, public policy and formal or informal health policy.",
    }
    return prefix + fallbacks[lecture]


def normalized_key(item: dict) -> str:
    def norm(value: str) -> str:
        return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()
    if item["batch"] == "441" and item["number"] in {5, 19}:
        return "definition unmet need family planning|||canonical-source-duplicate"
    if "vision realization office 2030" in item["stem"].lower() and "school health" in item["stem"].lower():
        return "school health common condition obesity|||canonical-source-duplicate"
    return norm(item["stem"]) + "|||" + "||".join(sorted(norm(x["text"]) for x in item["options"]))


def build(input_path: Path, output_path: Path, media_dir: Path):
    raw_questions = parse_source(input_path)
    parsed = [split_question(raw) for raw in raw_questions]
    by_key: dict[str, dict] = {}
    excluded = []
    source_lookup = {(raw.batch, raw.number): raw for raw in raw_questions}

    for item in parsed:
        lecture = classify(item)
        if not lecture:
            excluded.append(item)
            continue
        item["lecture"] = lecture
        key = normalized_key(item)
        location = {"assessment": "Midterm", "batch": item["batch"], "questionNumber": item["number"], "sourceType": "Gift"}
        if key in by_key:
            by_key[key]["sourceLocations"].append(location)
            continue

        slug = re.sub(r"[^a-z0-9]+", "-", lecture.lower()).strip("-")[:36]
        digest = hashlib.sha1(key.encode("utf-8")).hexdigest()[:8]
        source_answer = item["sourceAnswer"]
        uncertain = bool(item.get("sourceAnswerNote") and re.search(r"\?|not sure|maybe|\b[A-D]\s*(?:or|/)\s*[A-D]\b", item["sourceAnswerNote"], re.I))
        valid_letters = {option["id"] for option in item["options"]}
        answer_letters = [source_answer] if isinstance(source_answer, str) else (source_answer or [])
        answer_valid = bool(answer_letters) and all(letter in valid_letters for letter in answer_letters)
        verification = "supported" if answer_valid and not uncertain else "needs-review"
        ai_answer = source_answer if verification == "supported" else None
        ai_suggestion = "The source is incomplete or uncertain, so no single option is graded as the AI answer." if not ai_answer else None
        ai_override = AI_OVERRIDES.get((item["batch"], item["number"]))
        if ai_override:
            ai_answer = ai_override["answer"]
            verification = ai_override["verification"]
            ai_suggestion = ai_override["suggestion"]
        record = {
            "id": f"community-mid-{slug}-{digest}",
            "subjectId": "community",
            "lecture": lecture,
            "assessment": "Midterm",
            "sourceBatch": item["batch"],
            "sourceLabel": "Community Medicine Gift",
            "stem": item["stem"],
            "options": item["options"],
            "images": [],
            "incompleteSource": item["incompleteSource"],
            "sourceAnswer": source_answer,
            "sourceAnswerNote": item["sourceAnswerNote"],
            "aiAnswer": ai_answer,
            "aiSuggestion": ai_suggestion,
            "verification": verification,
            "explanation": explanation(item, lecture),
            "sourceLocations": [location],
            "references": QUESTION_REFERENCE_OVERRIDES.get((item["batch"], item["number"]), REFERENCES[lecture]),
            "lectureOrder": LECTURES.index(lecture) + 1,
            "referenceOrder": (500 - int(item["batch"])) * 1000 + item["number"],
        }

        raw = source_lookup[(item["batch"], item["number"])]
        expected_name = IMAGE_QUESTION_MAP.get((item["batch"], item["number"]))
        if raw.media_parts and expected_name:
            media_dir.mkdir(parents=True, exist_ok=True)
            part = raw.media_parts[0]
            target = media_dir / expected_name
            target.write_bytes(part.blob)
            record["images"] = [f"question-media/community/{expected_name}"]
        by_key[key] = record

    records = list(by_key.values())
    records.sort(key=lambda row: (-(int(row["sourceBatch"])), row["referenceOrder"]))
    output_path.write_text(
        "window.GIFT445_COMMUNITY_QUESTIONS = " + json.dumps(records, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    report = {
        "sourceQuestionStarts": len(raw_questions),
        "includedUniqueQuestions": len(records),
        "includedSourceEntries": sum(len(row["sourceLocations"]) for row in records),
        "excludedUnmapped": len(excluded),
        "byLecture": {lecture: sum(1 for row in records if row["lecture"] == lecture) for lecture in LECTURES},
        "byBatch": {batch: sum(1 for row in records if any(loc["batch"] == batch for loc in row["sourceLocations"])) for batch in sorted(BATCHES, reverse=True)},
        "needsReview": sum(1 for row in records if row["verification"] == "needs-review"),
        "withImages": sum(1 for row in records if row["images"]),
    }
    return report, excluded


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("community-data.js"))
    parser.add_argument("--media-dir", type=Path, default=Path("question-media/community"))
    parser.add_argument("--excluded-report", type=Path)
    args = parser.parse_args()
    report, excluded = build(args.input, args.output, args.media_dir)
    if args.excluded_report:
        serializable_excluded = [
            {key: value for key, value in item.items() if key != "mediaParts"}
            for item in excluded
        ]
        args.excluded_report.write_text(json.dumps(serializable_excluded, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
