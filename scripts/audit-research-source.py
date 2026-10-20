"""Freeze exact question content separately from authored curriculum decisions."""
import copy, hashlib, json, pathlib, re, zipfile, xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parents[1].parent / 'work/research-mid-review'
def read(name): return json.loads((ROOT / name).read_text())
def save(name, data): (ROOT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
def norm(s): return re.sub(r'\s+', ' ', str(s)).strip()
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()

mid, final = read('mid-import-candidates.json'), read('final-import-candidates.json')
assert len(mid) == 441 and len(final) == 466
native = read('originals/mid-native-document.json')
body = native['tabs'][0]['body']['content']
midsha = sha(ROOT / 'originals/mid-native-document.json')
finalsha = sha(ROOT / 'originals/research-final.docx')
assert finalsha == '6f5fae4d424027a1fb121c73c4d5d90e883b027dbd9944bd4802bb4b12ddfec0'
def native_text(element):
    return ''.join(e.get('textRun', {}).get('content', '') for e in element.get('paragraph', {}).get('elements', []))

# Every recorded key and option text is checked directly against the native
# body rather than a second copy of the candidate JSON.
for q in mid:
    head = native_text(body[q['source']['qHeaderElementIndex']])
    match = re.search(r'\bQ\s*(\d+)', head, re.I)
    assert match and int(match[1]) == q['originalQuestionNumber'], q['id']
    for option in q['options']:
        raw = ' '.join(native_text(body[i]) for i in option['sourceElementIndices'])
        assert not option['text'] or norm(option['text']) in norm(raw), (q['id'], option['id'], 'option')
    for answer in q['recordedAnswer']['fragments']:
        assert norm(native_text(body[answer['elementIndex']])).endswith(norm(answer['text'])), (q['id'], 'key')
        value = re.search(r'(?:Self\s+)?Answer\s*:\s*(.*)', answer['text'], re.I)[1]
        leading = re.match(r'([A-D])\b', value)
        assert ([leading[1]] if leading else []) == q['recordedAnswer']['letters'], (q['id'], 'key prefix')
    for table in q['tables']:
        actual = body[table['elementIndex']]['table']['tableRows']
        rows = [[norm(' '.join(native_text(e) for e in c.get('content', []))) for c in row['tableCells']] for row in actual]
        expected = [[norm(c['text']) for c in row] for row in table['cells']]
        assert rows == expected, (q['id'], 'table')

with zipfile.ZipFile(ROOT / 'originals/research-final.docx') as archive:
    docxbody = list(ET.fromstring(archive.read('word/document.xml')).find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body'))
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
M = '{http://schemas.openxmlformats.org/officeDocument/2006/math}'
def original_docx_text(e):
    if e.tag in [W+'t',M+'t']: return e.text or ''
    if e.tag==W+'tab': return '\t'
    if e.tag in [W+'br',W+'cr']: return '\n'
    if e.tag==M+'rad':
        assert e.find(M+'radPr/'+M+'degHide').attrib[M+'val']=='1'
        return 'sqrt('+original_docx_text(e.find(M+'e'))+')'
    return ''.join(original_docx_text(child) for child in e)
for q in final:
    original_header = original_docx_text(docxbody[q['source']['qHeaderElementIndex']])
    match = re.search(r'\bQ\s*(\d+)', original_header, re.I)
    assert match and int(match[1]) == q['originalQuestionNumber'], (q['id'], 'original header')
    for option in q['options']:
        original = ' '.join(original_docx_text(docxbody[i]) for i in option['sourceElementIndices'])
        assert not option['text'] or norm(option['text']) in norm(original), (q['id'], 'original choice')
    if q['sourceAnswer']:
        original = ' '.join(original_docx_text(docxbody[i]) for i in q['recordedAnswer']['sourceElementIndices'])
        assert norm(q['sourceAnswer']) in norm(original), (q['id'], 'original key')

def rows(table):
    return [[c['text'] for c in row] for row in table['cells']]

out = []
for order, q in enumerate(mid + final, 1):
    ismid = q['assessment'] == 'Midterm'
    key = q['recordedAnswer']['letters']
    assert all(k in 'ABCD' and len(k) == 1 for k in key)
    options = [{'id': chr(65+i), 'text': o['text'], 'sourceLabel': re.sub(r'[.)\s]+$', '', o.get('originalLabel', '')) or chr(65+i)} for i,o in enumerate(q['options'])]
    assert len(options) <= 26
    # Canonical button IDs are positional; original repeated labels remain visible.
    tables = [{'rows': rows(t), 'sourceElementIndex': t['elementIndex']} for t in q['tables']] if ismid else []
    stem = q['stem']
    source_context = []
    if q.get('sharedCase'):
        stem = q['sharedCase']['text'] + '\n\n' + stem
        source_context.append({'type': 'sharedCase', 'elementIndices': q['sharedCase']['elementIndices']})
    for c in q.get('context', []):
        stem = c['stem'] + '\n\n' + stem
        tables = [{'rows': rows(t), 'sourceElementIndex': t['elementIndex']} for t in c.get('tables', [])] + tables
        source_context.append({'type': 'precedingQuestion', 'sourceQuestionId': c['sourceQuestionId']})
    # A scenario/table introduced AFTER Q13's answer explicitly says Q14&15.
    # Associate it with those questions instead of the preceding Q13 block.
    if q['id'] == 'research-midterm-435-q013': tables = []
    if q['id'] in ['research-midterm-435-q014', 'research-midterm-435-q015']:
        previous = next(x for x in mid if x['id'] == 'research-midterm-435-q013')
        intro = '\n'.join(x['text'] for x in previous['recordedAnswer']['notes'])
        stem = intro + '\n\n' + stem
        tables = [{'rows': rows(t), 'sourceElementIndex': t['elementIndex']} for t in previous['tables']]
        source_context.append({'type': 'explicitSharedCase', 'sourceQuestionId': previous['id'], 'elementIndices': [1974,1975,1976]})
    rawkey = q['recordedAnswer'].get('text', '')
    if ismid: note = q.get('sourceAnswerNote', '')
    else: note = q['sourceAnswer'] or ''
    # Plain Answer:C is already shown as Gift C. Retain all substantive annotations.
    if re.fullmatch(r'\s*(?:Self\s+)?Answer\s*:\s*[A-D](?:\s*[,/&]\s*[A-D])*\s*', note, re.I) and not re.match(r'Self', note, re.I): note = ''
    images = []
    if not ismid:
        for img in q['images']:
            path = pathlib.Path(img['localPath'])
            assert sha(path) == img['sha256']
            with zipfile.ZipFile(ROOT / 'originals/research-final.docx') as archive:
                assert hashlib.sha256(archive.read(img['mediaPart'])).hexdigest() == img['sha256']
            embedded = docxbody[img['sourceElementIndex']]
            assert any(n.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed') == img['relationshipId'] for n in embedded.iter()), (q['id'],'source image association')
            images.append({'path': str(path), 'sha256': img['sha256'], 'mediaPart': img['mediaPart'], 'sourceElementIndex': img['sourceElementIndex']})
    source = q['source']
    record = {
        'id': q['id'], 'subjectId': 'research', 'assessment': q['assessment'],
        'sourceBatch': q['batch'], 'sourceLabel': 'Gift',
        'sourceQuestionNumber': q['originalQuestionNumber'], 'sourceOccurrence': q.get('occurrence', 1),
        'stem': stem, 'options': options,
        'sourceAnswer': key[0] if len(key) == 1 else key if key else None,
        'sourceAnswerNote': note, 'sourceTables': tables, 'imageSources': images,
        'referenceOrder': order,
        'sourceLocations': [{'sourceType':'Gift', 'assessment':q['assessment'], 'batch':q['batch'], 'questionNumber':q['originalQuestionNumber'], 'occurrence':q.get('occurrence',1), 'paragraphIndex':source.get('qHeaderParagraphIndex',source.get('paragraphIndices',[0])[0])}],
        'researchSourceIntegrity': {'documentId': source.get('documentId',source.get('driveId')), 'sha256': midsha if ismid else finalsha, 'sourceElementIndices': source['elementIndices'], 'recordedAnswerText': rawkey, 'rawAnswerText': q['sourceAnswer'] if not ismid else q['recordedAnswer']['text'], 'sourceContext': source_context, 'originalOptionLabels':[o.get('originalLabel','') for o in q['options']], 'flags':q['flags']},
    }
    if q['images'] and ismid:
        record['researchSourceIntegrity']['opaqueDrawingIds'] = copy.deepcopy(q['images'])
        record['researchSourceIntegrity']['drawingStatus'] = 'Native drawing object has no downloadable image in the API. Complete numerical stem and original native table are preserved.'
    out.append(record)
assert len({q['id'] for q in out}) == 907
save('canonical-questions.json', out)
save('canonical-source-audit.json', {'counts':{'Midterm':441,'Final':466},'nativeMidSha256':midsha,'originalFinalSha256':finalsha,'verifiedMidOptions':sum(len(q['options']) for q in mid),'verifiedMidTables':sum(len(q['tables']) for q in mid),'sharedCaseRepairs':['research-midterm-435-q014','research-midterm-435-q015'],'duplicateOriginalLabels':['research-midterm-431-q022'],'canonicalQuestionSha256':sha(ROOT/'canonical-questions.json')})
print('Frozen907 source occurrences; native options/keys/tables verified; explicit shared-table placement corrected.')
