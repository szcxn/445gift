"""Build Community MID practice after all original occurrences are reviewed.

Originals, deferred questions and authoring caches remain private. Exact Gift
keys, printed option labels, Word image appearances and native tables survive
the import. Use --check-only to verify the complete build without public writes.
"""
from collections import Counter
from copy import deepcopy
from pathlib import Path
import argparse
import hashlib
import json
import posixpath
import re
import runpy
import xml.etree.ElementTree as ET
import zipfile

import pdfplumber
import pypdfium2 as pdfium

REPO = Path(__file__).resolve().parents[1]
WORK = REPO.parent / 'work/community-mid-review'
norm = lambda s: ' '.join(str(s).split())
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda name: json.loads((WORK / name).read_text())
save = lambda path, value: path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
P = '{http://schemas.openxmlformats.org/presentationml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'


def xml_paragraphs(root):
    return norm(' '.join(''.join(t.text or '' for t in p.findall('.//' + A + 't'))
                         for p in root.findall('.//' + A + 'p')))


def target(part, relative):
    if relative.startswith('/'):
        return relative.lstrip('/')
    return posixpath.normpath(posixpath.join(posixpath.dirname(part), relative))


def original_passages(source, positions):
    """Read original bytes, never trust a matching quote in the author cache."""
    result = {}
    kind = source['sourceType']
    if kind == 'pdf':
        with pdfplumber.open(source['path']) as pdf:
            assert len(pdf.pages) == source['pageCount']
            for unit, number in positions:
                assert unit == 'page' and 1 <= number <= len(pdf.pages)
                page = pdf.pages[number - 1]
                result[(unit, number)] = {
                    'flowText': norm(page.extract_text(use_text_flow=True, x_tolerance=1) or ''),
                    'text': norm(page.extract_text() or ''),
                    'tightText': norm(page.extract_text(x_tolerance=1) or '')}
    elif kind == 'docx':
        with zipfile.ZipFile(source['path']) as archive:
            body = ET.fromstring(archive.read('word/document.xml')).find(W + 'body')
            paragraphs = list(body.iter(W + 'p'))
            assert len(paragraphs) == source['paragraphCount']
            for unit, number in positions:
                assert unit == 'paragraph' and 1 <= number <= len(paragraphs)
                result[(unit, number)] = {
                    'paragraphXmlText': norm(''.join(t.text or '' for t in paragraphs[number - 1].iter(W + 't')))}
    else:
        assert kind in ('pptx', 'ppsx'), ('Unsupported source type', source['id'], kind)
        with zipfile.ZipFile(source['path']) as archive:
            rels = {e.attrib['Id']: e.attrib['Target'] for e in ET.fromstring(archive.read('ppt/_rels/presentation.xml.rels'))}
            order = ET.fromstring(archive.read('ppt/presentation.xml')).find(P + 'sldIdLst')
            paths = [target('ppt/presentation.xml', rels[e.attrib[R + 'id']]) for e in order]
            assert len(paths) == source['slideCount']
            for unit, number in positions:
                assert unit == 'slide' and 1 <= number <= len(paths)
                part = paths[number - 1]
                root = ET.fromstring(archive.read(part))
                native = xml_paragraphs(root)
                checks = {'slideXmlText': native}
                diagrams = []
                relpart = posixpath.dirname(part) + '/_rels/' + posixpath.basename(part) + '.rels'
                if relpart in archive.namelist():
                    for index, rel in enumerate(ET.fromstring(archive.read(relpart))):
                        kind = rel.attrib.get('Type', '')
                        if kind.endswith(('/diagramDrawing', '/notesSlide')):
                            linked = xml_paragraphs(ET.fromstring(archive.read(target(part, rel.attrib['Target']))))
                            label = 'notesXmlText' if kind.endswith('/notesSlide') else 'linkedXmlText'
                            checks[f'{label}-{index}'] = linked
                            if kind.endswith('/diagramDrawing'):
                                diagrams.append(linked)
                                checks[f'combinedXmlText-{index}'] = norm(native + ' ' + linked)
                if diagrams:
                    checks['combinedSlideXmlText'] = norm(native + ' ' + ' '.join(diagrams))
                result[(unit, number)] = checks
    return result


def missing(option):
    if option.get('images'):
        return False
    text = str(option.get('text', '')).strip()
    return not text or bool(re.fullmatch(r'[?؟]+|(?:option text was not recorded in (?:the )?source|answer choices were not recorded in (?:the )?source|not provided(?: in (?:the )?source)?|missing|unavailable|[A-F])\.?', text, re.I))


def key_uncertain(question):
    note = question.get('sourceAnswerNote', '')
    original = question['communitySourceIntegrity'].get('originalKeyText', '')
    return bool(re.search(r'\b(?:not sure|note sure|depends|if\s+(?:ask|the))\b', note, re.I)
                or re.match(r'\s*(?:Self\s+)?Answer\s*:\s*[A-F]\s*\?', original, re.I))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    questions = read('canonical-questions.json')
    assert len(questions) == len({q['id'] for q in questions}) == 851
    assignments = read('review-assignments.json')
    reviews = {}
    # This completeness gate runs before asset directories or public files exist.
    for group, ids in assignments.items():
        authored = read(f'reviews-{group}.json')
        assert len(authored) == len(ids) and {r['id'] for r in authored} == set(ids), (group, 'Incomplete or duplicate assignment')
        for review in authored:
            assert review['id'] not in reviews, ('Duplicate review', review['id'])
            reviews[review['id']] = review
    assert set(reviews) == {q['id'] for q in questions}, 'All 851 occurrences need a review before public writes'
    runpy.run_path(str(REPO / 'scripts/audit-community-source.py'))
    curriculum = read('curriculum.json')
    mid = {l['title']: l for l in curriculum['lectures'] if l['inMidterm']}
    assert len(mid) == 30 and sum(not l['inMidterm'] for l in curriculum['lectures']) == 14
    catalog = []
    for lecture in curriculum['lectures']:
        identity = (lecture['group'], lecture['assessment'])
        if not catalog or (catalog[-1]['block'], catalog[-1]['assessment']) != identity:
            catalog.append({'block': lecture['group'], 'assessment': lecture['assessment'], 'lectures': []})
        catalog[-1]['lectures'].append(lecture['title'])
    sources = {s['id']: s for filename in ('lecture-sources.json', 'pptx-sources.json', 'docx-sources.json') for s in read(filename)}
    for source in sources.values():
        assert sha(Path(source['path']).read_bytes()) == source['sha256'], ('Changed source', source['id'])
    needed = {}
    for review in reviews.values():
        if review['inMidterm'] and review.get('evidence'):
            e = review['evidence']
            assert e['sourceId'] in sources, (review['id'], 'Unknown lecture source')
            needed.setdefault(e['sourceId'], set()).add((e['unit'], e['page']))
    passages = {fid: original_passages(sources[fid], positions) for fid, positions in needed.items()}
    display = read('source-image-display.json')
    safe = read('legacy-safe-ID-map.json')['matches']
    output, exclusions, originals, proofs, question_assets, pdf_assets = [], [], {}, {}, {}, {}
    for original in questions:
        canonical_id = original['id']
        authored = reviews[canonical_id]
        if not authored['inMidterm']:
            exclusions.append({'id': canonical_id, 'assessment': original['assessment'], 'batch': original['sourceBatch'], 'reason': authored['classificationReason'], 'deferredTopic': authored.get('deferredTopic', '')})
            continue
        assert authored['lecture'] in mid, canonical_id
        assert authored['confidence'] in ('supported', 'preference', 'unresolved')
        assert authored['basis'] in ('lecture', 'concept')
        assert len(authored['explanation'].strip()) >= 80, canonical_id
        assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]', authored['explanation'] + authored.get('objection', '')), canonical_id
        assert authored['answers'] or authored['confidence'] == 'unresolved', canonical_id
        assert authored['confidence'] != 'unresolved' or not authored['answers'], canonical_id
        q = deepcopy(original)
        q['id'] = safe.get(canonical_id, canonical_id)
        q['communitySourceIntegrity']['canonicalId'] = canonical_id
        q['communitySourceIntegrity']['sourceImages'] = []
        q['images'] = []
        q.pop('decorativeImages', None)
        for option in q['options']:
            option['images'] = []
            option.pop('sourceImageIds', None)
        inspected = authored.get('imageInspection', {})
        seen = set()
        for entry in inspected.get('images', []):
            seen.update([entry] if isinstance(entry, str) else [str(v) for k, v in entry.items() if k in ('imageOccurrenceId', 'sourceSha256', 'displaySha256', 'sha256', 'path')])
        for image in q.pop('imageSources'):
            iid = image['imageOccurrenceId']
            appearance = display[iid]
            assert canonical_id in appearance.get('questionIds', [appearance.get('questionId')]), (canonical_id, 'Wrong image binding')
            assert inspected.get('finding') and seen.intersection({iid, appearance['sourceSha256'], appearance['displayPath'], image['media']['path']}), (canonical_id, 'Uninspected figure', iid)
            data = Path(appearance['displayPath']).read_bytes()
            assert sha(data) == appearance['displaySha256']
            relative = f'question-media/community/{appearance["displaySha256"]}{Path(appearance["displayPath"]).suffix.lower()}'
            question_assets[relative] = data
            if image['role'] == 'option':
                next(o for o in q['options'] if o['id'] == image['anchoredOptionId'])['images'].append(relative)
            else:
                assert image['role'] == 'stem', (canonical_id, 'Unreviewed image role')
                q['images'].append(relative)
            q['communitySourceIntegrity']['sourceImages'].append({
                'image': relative, 'sourceSha256': appearance['sourceSha256'], 'sha256': appearance['displaySha256'],
                'mediaPart': image['packagePath'], 'imageOccurrenceId': iid, 'sourceElementIndex': image['sourceElementIndex'],
                'role': image['role'], 'optionId': image.get('anchoredOptionId'), 'wordCrop': appearance['wordCrop'],
                'wordTransform': appearance['wordTransform'], 'pixelCrop': appearance['pixelCrop'],
                'privacyRedactions': appearance['privacyRedactions'], 'renderKind': appearance['renderKind']})
        for answer in authored['answers']:
            assert any(o['id'] == answer and not missing(o) for o in q['options']), (canonical_id, 'Unrecorded reviewed choice', answer)
        key = q['sourceAnswer'] if isinstance(q['sourceAnswer'], list) else [q['sourceAnswer']] if q['sourceAnswer'] else []
        if key and authored['answers'] and set(key) != set(authored['answers']):
            assert authored.get('objection'), (canonical_id, 'Unexplained disagreement')
        review = {k: deepcopy(authored[k]) for k in ('answers', 'confidence', 'basis', 'explanation', 'objection', 'references') if k in authored}
        e = authored.get('evidence')
        if e:
            source = sources[e['sourceId']]
            position = (e['unit'], e['page'])
            quote = norm(e['quote'])
            checks = passages[e['sourceId']][position]
            assert quote and any(quote in text for text in checks.values()), (canonical_id, 'Quote absent from original', e)
            assert e['relation'] in ('direct', 'background')
            assert authored['basis'] != 'lecture' or e['relation'] == 'direct', (canonical_id, 'Topic-only lecture evidence')
            evidence = {k: e[k] for k in ('sourceId', 'unit', 'page', 'relation')}
            evidence.update(title=source['title'], url=source['url'], sourceSha256=source['sha256'], quote=quote)
            if e['unit'] == 'page':
                relative = f'lecture-media/community-mid/{e["sourceId"]}-{e["page"]:03d}.jpg'
                pdf_assets[relative] = (source['path'], e['page'])
                evidence['image'] = relative
            review['evidence'] = evidence
            proof = proofs.setdefault('|'.join(map(str, (e['sourceId'], *position))), {
                'sourceId': e['sourceId'], 'sourceSha256': source['sha256'], 'unit': e['unit'], 'page': e['page'],
                'textHashes': {k: sha(v.encode()) for k, v in checks.items()}, 'quotes': []})
            if quote not in proof['quotes']:
                proof['quotes'].append(quote)
        else:
            assert authored['basis'] == 'concept', (canonical_id, 'Lecture claim without passage')
        reason = (authored.get('ungradedReason')
                  or authored['confidence'] == 'unresolved' and 'The available source does not establish a unique answer.'
                  or not key and 'No Gift answer letter was recorded.'
                  or any(missing(o) for o in q['options']) and 'One or more original choices are missing.'
                  or any(not any(o['id'] == k and not missing(o) for o in q['options']) for k in key) and 'The Gift key has no usable original choice.'
                  or key_uncertain(q) and 'The original bank marks its answer as uncertain or conditional.' or '')
        q.update(lecture=authored['lecture'], lectureOrder=mid[authored['lecture']]['order'],
                 communityPracticeAssessment='Midterm', communityReview=review,
                 communityClassification={'reason': authored['classificationReason'], 'curriculumUrl': curriculum['sourceUrl'], 'sourceRow': mid[authored['lecture']]['sourceRow']},
                 giftReview={'policy': 'gift-key-first', 'gradingAnswers': [] if reason else key, 'possibleAnswers': list(authored['answers']), 'ungradedReason': str(reason)})
        assert not re.search(r'/Users/|download_url|storage\.googleapis\.com', json.dumps(q)), (canonical_id, 'Private source metadata')
        originals[q['id']] = {k: deepcopy(q[k]) for k in ('stem', 'options', 'sourceAnswer', 'sourceAnswerText', 'sourceAnswerNote', 'sourceTables', 'images', 'assessment', 'sourceBatch', 'sourceQuestionNumber', 'sourceOccurrence', 'sourceLocations', 'communitySourceIntegrity')}
        output.append(q)
    assert output and len({q['id'] for q in output}) == len(output), 'Stable-ID collision'
    counts = {'originalOccurrences': 851, 'sourceMidterm': 506, 'sourceFinal': 345, 'selected': len(output),
              'selectedBySourceExam': dict(Counter(q['assessment'] for q in output)), 'deferred': len(exclusions),
              'byLecture': dict(Counter(q['lecture'] for q in output)), 'basis': dict(Counter(q['communityReview']['basis'] for q in output)),
              'confidence': dict(Counter(q['communityReview']['confidence'] for q in output)),
              'ungraded': sum(not q['giftReview']['gradingAnswers'] for q in output), 'preservedLegacyIds': sum(q['id'] != q['communitySourceIntegrity']['canonicalId'] for q in output),
              'sourceImageOccurrences': sum(len(q['communitySourceIntegrity']['sourceImages']) for q in output),
              'questionImageFiles': len(question_assets), 'nativeTableOccurrences': sum(len(q['sourceTables']) for q in output),
              'checkedLecturePositions': len(proofs), 'renderedPdfPages': len(pdf_assets)}
    if args.check_only:
        print(json.dumps({'status': 'validated-without-public-writes', **counts}, ensure_ascii=False, indent=2))
        return
    # Everything above must pass before any public asset or data file is touched.
    for relative, data in question_assets.items():
        path = REPO / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    for relative, (source_path, number) in pdf_assets.items():
        path = REPO / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        document = pdfium.PdfDocument(source_path)
        page = document[number - 1]
        page.render(scale=min(2, 1500 / max(page.get_size()))).to_pil().convert('RGB').save(path, quality=86, optimize=True)
        document.close()
    for q in output:
        e = q['communityReview'].get('evidence')
        if e and e.get('image'):
            e['imageSha256'] = sha((REPO / e['image']).read_bytes())
            proofs['|'.join(map(str, (e['sourceId'], e['unit'], e['page'])))].update(image=e['image'], imageSha256=e['imageSha256'])
    previous = {k: v for k, v in read('existing-subject-hashes.json').items() if not k.startswith('GIFT445_COMMUNITY_')}
    fixture = {'curriculum': curriculum, 'counts': counts, 'bankHashes': read('independent-source-audit.json'), 'previousSubjects': previous,
               'selectedIds': [q['id'] for q in output], 'selectedCanonicalIds': [q['communitySourceIntegrity']['canonicalId'] for q in output],
               'excludedIds': [q['id'] for q in exclusions], 'legacyIdMap': safe, 'originalQuestions': originals,
               'sources': [{k: v for k, v in s.items() if k in ('id', 'title', 'url', 'sha256', 'cohortProvenance', 'sourceType', 'pageCount', 'slideCount', 'paragraphCount')} for s in sources.values()],
               'checkedPositions': list(proofs.values())}
    (REPO / 'community-catalog.js').write_text('// Community curriculum: MID practice and Final lecture names only.\nwindow.GIFT445_COMMUNITY_CATALOG = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n')
    (REPO / 'community-data.js').write_text('// Community MID practice; original Gift keys and source exam occurrences are retained.\nwindow.GIFT445_COMMUNITY_QUESTIONS = ' + json.dumps(output, ensure_ascii=False, indent=2) + ';\n')
    save(REPO / 'tests/fixtures/community-mid-review.json', fixture)
    save(WORK / 'deferred-questions.json', exclusions)
    save(WORK / 'build-summary.json', counts)
    print(json.dumps(counts, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
