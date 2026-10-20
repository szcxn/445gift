"""Build audited Surgery MID feedback; preserve each original bank answer.

Private authored reviews and lecture originals live outside the published repo.
Every displayed quotation is independently checked against its original PDF.
"""
from collections import Counter
from copy import deepcopy
from pathlib import Path
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import zipfile

import pdfplumber
import pypdfium2 as pdfium

REPO = Path(__file__).resolve().parents[1]
WORK = REPO.parent / 'work/surgery-mid-review'
norm = lambda text: ' '.join(text.split())
sha = lambda data: hashlib.sha256(data).hexdigest()
targets = {q['id']: q for q in json.loads((WORK / 'review-targets.json').read_text())}
sources = {s['id']: s for s in json.loads((WORK / 'lecture-sources.json').read_text())}
reviews = {}
for name in ('principles-review.json', 'general-review.json', 'other-review.json', 'other-additional-review.json', 'vascular-review.json'):
    for qid, review in json.loads((WORK / name).read_text()).items():
        assert qid in targets, ('Out of scope', qid)
        assert qid not in reviews, ('Duplicate review', qid)
        reviews[qid] = review
assert reviews.keys() == targets.keys(), {'missing': sorted(targets.keys() - reviews.keys()), 'extra': sorted(reviews.keys() - targets.keys())}

# Reconstruct only source-import defects documented in the original bank.
corrections = {}
source_manifests = {Path(s['path']).name: s for s in json.loads((WORK / 'source-manifest.json').read_text())}
docx_cache = {}
correction_files = [WORK / 'source-corrections.json', WORK / 'source-corrections-extra.json', WORK / 'source-image-corrections.json']
for filename in correction_files:
    if not filename.exists():
        continue
    for item in json.loads(filename.read_text()):
        qid = item['id']
        if qid not in targets:
            continue
        assert qid not in corrections, ('Duplicate correction', qid)
        original = targets[qid]
        for key, value in item['before'].items():
            assert original.get(key) == value, (qid, 'Changed source baseline', key)
        source = item['source']
        manifest = source_manifests[source['filename']]
        path = Path(manifest['path'])
        assert sha(path.read_bytes()) == manifest['sha256'], 'Changed original bank'
        if str(path) not in docx_cache:
            with zipfile.ZipFile(path) as doc:
                tree = ET.fromstring(doc.read('word/document.xml'))
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            body = tree.find('w:body', ns)
            docx_cache[str(path)] = [''.join(t.text or '' for t in p.findall('.//w:t', ns)) for p in body.findall('w:p', ns)]
        paragraphs = source.get('paragraphs', item.get('exactContext', []))
        assert paragraphs, (qid, 'No original source context')
        for paragraph in paragraphs:
            assert norm(docx_cache[str(path)][paragraph['index']]) == norm(paragraph['text']), (qid, 'Source paragraph changed', paragraph['index'])
        if item.get('image'):
            image = item['image']
            with zipfile.ZipFile(path) as doc:
                assert sha(doc.read(image['zipEntry'])) == image['sha256'], (qid, 'Original image mismatch')
            assert sha((REPO / image['existingRuntimePath']).read_bytes()) == image['sha256'], (qid, 'Published image mismatch')
        corrections[qid] = {
            'after': item['after'],
            'source': {'filename': source['filename'], 'sha256': manifest['sha256'], 'paragraphs': paragraphs},
            'reason': item['reason'],
        }

# Correct topic labels without changing original exam, batch, visibility, or IDs.
placements = json.loads((WORK / 'placements.json').read_text())
for qid, placement in placements.items():
    assert qid in targets and targets[qid]['lecture'] == placement['before'], qid
lecture_visibility_repairs = [qid for qid, q in targets.items() if q.get('hideFromLecture') and q['lecture'] in ('Breast Disease', 'Neck Swellings', 'Perioperative Assessment')]
assert len(lecture_visibility_repairs) == 68

# Independently extract every cited original page; cached content is keyed by the
# original bytes and is never substituted for a missing or modified source PDF.
needed = {}
for review in reviews.values():
    evidence = review.get('evidence')
    if evidence:
        if evidence['pdfId'] == 'local-transfusion':
            evidence['pdfId'] = '13i6jgPUXHLH-IPUxPOvAhMxqDtlPc92b'
        needed.setdefault(evidence['pdfId'], set()).add(evidence['page'])
cache_path = WORK / 'independent-original-pages.json'
cache = json.loads(cache_path.read_text()) if cache_path.exists() else {}
actual = {}
for fid, numbers in needed.items():
    source = sources[fid]
    original = WORK / 'originals' / f'{fid}.pdf'
    digest = sha(original.read_bytes())
    assert digest == source['sha256'], ('Changed lecture', fid)
    record = cache.get(fid, {})
    if record.get('sha256') != digest:
        record = {'sha256': digest, 'pages': {}}
    missing = [number for number in numbers if str(number) not in record['pages']]
    if missing:
        with pdfplumber.open(original) as pdf:
            for number in sorted(missing):
                assert 1 <= number <= len(pdf.pages), (fid, number)
                page = pdf.pages[number - 1]
                record['pages'][str(number)] = {
                    'flowText': norm(page.extract_text(use_text_flow=True, x_tolerance=1) or ''),
                    'text': norm(page.extract_text() or ''),
                    'tightText': norm(page.extract_text(x_tolerance=1) or ''),
                }
    cache[fid] = record
    for number in numbers:
        actual[(fid, number)] = record['pages'][str(number)]
    print('Verified original lecture:', source['title'], len(numbers), 'cited pages', flush=True)
cache_path.write_text(json.dumps(cache, ensure_ascii=False, indent=2))

image_dir = REPO / 'lecture-media/surgery-mid'
image_dir.mkdir(parents=True, exist_ok=True)
rendered = {}
page_checks = {}
output = {}
for qid, baseline in targets.items():
    question = deepcopy(baseline)
    if qid in corrections:
        question.update(corrections[qid]['after'])
    review = reviews[qid]
    assert len(review['explanation'].strip()) >= 80, (qid, 'No useful individual explanation')
    assert review['confidence'] in ('supported', 'preference', 'unresolved'), qid
    assert review['basis'] in ('lecture', 'clinical'), qid
    assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]', review['explanation'] + review.get('objection', '')), qid
    assert not re.search(r'\b(?:independent medical verification is pending|AI independently selected|AI therefore selects)\b', review['explanation']), qid
    for answer in review['answers']:
        assert any(o['id'] == answer and o['text'].strip() and not re.search(r'not recorded in (?:the )?source', o['text'], re.I) for o in question['options']), (qid, 'Unusable reviewed choice', answer)
    evidence = review.get('evidence')
    if evidence:
        fid, number = evidence['pdfId'], evidence['page']
        source = sources[fid]
        quote = norm(evidence['quote'])
        assert quote and not re.search(r'[\u0600-\u06ff]|\(cid:', quote), (qid, 'Unreadable quote')
        matches = [kind for kind, text in actual[(fid, number)].items() if quote in text]
        assert matches, (qid, fid, number, 'Quote absent from original page', quote)
        assert evidence['relation'] in ('teaching', 'background'), qid
        assert review['basis'] != 'lecture' or evidence['relation'] == 'teaching', qid
        name = f'{fid}-{number:03}.jpg'
        image_path = image_dir / name
        if name not in rendered:
            with pdfium.PdfDocument(str(WORK / 'originals' / f'{fid}.pdf')) as doc:
                page = doc[number - 1]
                page.render(scale=1600 / page.get_width()).to_pil().convert('RGB').save(image_path, 'JPEG', quality=80, optimize=True)
            rendered[name] = sha(image_path.read_bytes())
        kind = matches[0]
        page_hash = sha(actual[(fid, number)][kind].encode())
        page_checks[f'{fid}:{number}:{kind}'] = {'pdfId': fid, 'page': number, 'textKind': kind, 'textSha256': page_hash}
        title = re.sub(r'\.pdf$', '', source['title'].strip(), flags=re.I)
        team = source.get('team', '')
        title = f'{team} · {title}' if team and team not in title else title
        assert source['url'].startswith('https://drive.google.com/'), fid
        evidence = {'pdfId': fid, 'title': title, 'page': number, 'quote': quote, 'relation': evidence['relation'], 'sourceSha256': source['sha256'], 'pageTextSha256': page_hash, 'textKind': kind, 'url': source['url'], 'image': f'lecture-media/surgery-mid/{name}', 'imageSha256': rendered[name]}
    else:
        assert review['basis'] == 'clinical', (qid, 'No evidence for lecture-based answer')
    key = question.get('sourceAnswer')
    keys = key if isinstance(key, list) else [key] if key else []
    objection = review.get('objection', '').strip()
    if keys and review['answers'] and set(keys) != set(review['answers']):
        assert objection, (qid, 'Disagreement without a reason')
    for ref in review.get('references', []):
        assert ref['title'].strip() and ref['url'].startswith('https://'), (qid, 'Invalid reference')
    output[qid] = {k: review[k] for k in ('answers', 'confidence', 'basis')}
    output[qid].update(explanation=review['explanation'].strip(), objection=objection, evidence=evidence, references=review.get('references', []))
    if review.get('ungradedReason'):
        output[qid]['ungradedReason'] = review['ungradedReason'].strip()

payload = json.dumps(output, ensure_ascii=False, indent=2)
repairs = json.dumps(corrections, ensure_ascii=False, indent=2)
js = """// Surgery MID: source-bank grading with separate, individually reviewed explanations.
(() => {
  const corrections = CORRECTIONS;
  const reviews = REVIEWS;
  const placements = PLACEMENTS;
  const lectureVisibilityRepairs = new Set(VISIBILITY);
  const lectureOrder = new Map();
  let order = 1;
  for (const block of window.GIFT445_SURGERY_CATALOG || []) {
    for (const lecture of block.lectures || []) lectureOrder.set(lecture, order++);
  }
  const missing = text => !String(text || '').trim() || /^(?:option text was not recorded in (?:the )?source|answer choices were not recorded in (?:the )?source|not provided(?: in (?:the )?source)?|missing|unavailable|[A-D])\\.?$/i.test(String(text).trim());
  for (const question of window.GIFT445_SURGERY_QUESTIONS || []) {
    const review = reviews[question.id];
    if (!review) continue;
    const correction = corrections[question.id];
    if (correction) {
      Object.assign(question, correction.after);
      question.surgerySourceIntegrity = correction.source;
    }
    if (placements[question.id]) {
      question.lecture = placements[question.id].lecture;
      if (!lectureOrder.has(question.lecture)) throw new Error('Unknown Surgery lecture: ' + question.lecture);
      question.lectureOrder = lectureOrder.get(question.lecture);
    }
    if (lectureVisibilityRepairs.has(question.id)) question.hideFromLecture = false;
    question.surgeryReview = review;
    const key = Array.isArray(question.sourceAnswer) ? [...question.sourceAnswer] : question.sourceAnswer ? [question.sourceAnswer] : [];
    const bank = question.sourceLabel === 'Q Bank' ? 'Q Bank' : 'Gift';
    const ungradedReason = !key.length ? `No ${bank} answer was recorded.`
      : key.some(answer => !question.options.some(option => option.id === answer && !missing(option.text))) ? `The recorded ${bank} key has no usable option text.`
      : question.options.some(option => missing(option.text)) ? 'One or more original choices are missing; the recorded key is retained.'
      : /\\b(?:not sure|if|doctor says)\\b/i.test(question.sourceAnswerNote || '') ? 'The original bank marks the answer as uncertain or conditional; its recorded alternatives are retained.'
      : review.ungradedReason || '';
    question.giftReview = { policy: 'gift-key-first', gradingAnswers: ungradedReason ? [] : key, possibleAnswers: [...review.answers], ungradedReason };
  }
})();
""".replace('CORRECTIONS', repairs).replace('REVIEWS', payload).replace('PLACEMENTS', json.dumps(placements, ensure_ascii=False, indent=2)).replace('VISIBILITY', json.dumps(lecture_visibility_repairs))
(REPO / 'surgery-mid-study-review.js').write_text(js)
report = {
    'reviewedOn': '2026-10-20', 'scope': 'Existing Surgery MID bank and current MID lecture practice',
    'questions': len(output), 'selectedIds': list(output), 'corrections': corrections,
    'placements': placements,
    'lectureVisibilityRepairs': lecture_visibility_repairs,
    'primaryMidterm': sum(q['assessment'] == 'Midterm' for q in targets.values()),
    'existingMidLectureFinalIds': [q['id'] for q in targets.values() if q['assessment'] == 'Final'],
    'lectureBased': sum(r['basis'] == 'lecture' for r in output.values()),
    'clinical': sum(r['basis'] == 'clinical' for r in output.values()),
    'confidence': dict(Counter(r['confidence'] for r in output.values())),
    'objections': sum(bool(r['objection']) for r in output.values()),
    'uniqueSlideImages': len(rendered), 'imageBytes': sum((image_dir / n).stat().st_size for n in rendered),
    'sources': [{k: s[k] for k in ('id', 'title', 'team', 'pageCount', 'sha256')} for s in sources.values()],
    'pageChecks': list(page_checks.values()),
}
(REPO / 'tests/fixtures/surgery-mid-study-review.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
(WORK / 'published-summary.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k: v for k, v in report.items() if k not in ('selectedIds', 'corrections', 'sources', 'pageChecks', 'existingMidLectureFinalIds', 'placements', 'lectureVisibilityRepairs')}, indent=2))
