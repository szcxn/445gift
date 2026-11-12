"""Compare the native Gift Informatics MID DOCX with all 448 original batch cards.

Usage: python scripts/audit-informatics-mid-source.py /path/to/mid.docx
Pass --write to refresh the compact public provenance layer and test fixture.
Requires Node and Pillow (for the existing privacy-cropped source image).
"""
from argparse import ArgumentParser
from collections import Counter
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re
import subprocess
import xml.etree.ElementTree as ET
from zipfile import ZipFile
from PIL import Image

REPO = Path(__file__).resolve().parents[1]
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
NATIVE_HASH = 'bc85a411e57ac3232d28ee9721c9dbea99e0fcc13e4c068d353a52a15b43dd1d'
HASH_FIELDS = ('stem', 'options', 'sourceAnswer', 'sourceAnswerNote', 'sourceLocations', 'images')
normalize = lambda text: ' '.join(text.replace('\xad', '').split())
digest = lambda value: sha256(value).hexdigest()
compact = lambda value: json.dumps(value, ensure_ascii=False, separators=(',', ':'))

def get_val(element, default=None):
    return default if element is None else element.get(W + 'val')

def read_native(file):
    with ZipFile(file) as docx:
        document = ET.fromstring(docx.read('word/document.xml'))
        assert not document.findall('.//' + W + 'tbl'), 'New native table requires separate verification'
        paragraphs = document.findall('.//' + W + 'p')
        numbering = ET.fromstring(docx.read('word/numbering.xml'))
        abstract = {a.get(W + 'abstractNumId'): a for a in numbering.findall(W + 'abstractNum')}
        lists = {n.get(W + 'numId'): n for n in numbering.findall(W + 'num')}
        rels = {e.get('Id'): e.get('Target') for e in ET.fromstring(docx.read('word/_rels/document.xml.rels'))}
        media = {Path(n).name: docx.read(n) for n in docx.namelist() if n.startswith('word/media/')}
    counters = Counter()
    batch, current = None, None
    records = []
    for index, paragraph in enumerate(paragraphs):
        # Keep both hard Word paragraph boundaries and in-paragraph line breaks.
        text = ''.join((n.text or '') if n.tag == W + 't' else '\n' if n.tag in (W + 'br', W + 'cr') else '\t' if n.tag == W + 'tab' else '' for n in paragraph.iter())
        heading = re.fullmatch(r'4[234]\d', text.strip())
        if heading:
            batch, current = heading[0], None
            continue
        if not batch:
            continue
        number = re.match(r'^\s*Q\s*(\d+)\s*[:：.)]?', text)
        unnumbered = batch == '443' and index == 197 and 'nationally recognized interoperability standards' in text
        if number or unnumbered:
            current = dict(batch=batch, number=int(number[1]) if number else None, start=index, end=index, paragraphs=[], imageAnchors=[])
            records.append(current)
        if current is None:
            continue
        num_props = paragraph.find(f'{W}pPr/{W}numPr')
        if num_props is not None:
            list_id = get_val(num_props.find(W + 'numId'))
            if list_id and list_id != '0':
                level = get_val(num_props.find(W + 'ilvl'), '0')
                num = lists[list_id]
                definition = abstract[get_val(num.find(W + 'abstractNumId'))]
                style = next(l for l in definition.findall(W + 'lvl') if l.get(W + 'ilvl') == level)
                override = next((o for o in num.findall(W + 'lvlOverride') if o.get(W + 'ilvl') == level), None)
                start = get_val(style.find(W + 'start'), '1')
                if override is not None:
                    start = get_val(override.find(W + 'startOverride'), start)
                counters[list_id, level] += 1
                if get_val(style.find(W + 'numFmt')) == 'upperLetter':
                    text = chr(64 + int(start) + counters[list_id, level] - 1) + '. ' + text
        current['paragraphs'].append(text)
        if text.strip() or paragraph.findall('.//' + A + 'blip'):
            current['end'] = index
        current['imageAnchors'].extend(Path(rels[blip.get(R + 'embed')]).name for blip in paragraph.findall('.//' + A + 'blip'))
    return records, media

def runtime(node):
    js = """
    const fs = require('node:fs'), vm = require('node:vm'), c = {window:{}};
    vm.createContext(c);
    for (const file of ['informatics-data.js', 'original-batches.js']) {
      vm.runInContext(fs.readFileSync(file,'utf8'), c);
    }
    const bank = c.window.GIFT445_EXTEND_BATCH_BANK(c.window.GIFT445_INFORMATICS_QUESTIONS);
    console.log(JSON.stringify({
      bank:bank.filter(q=>q.subjectId==='informatics'&&q.assessment==='Midterm'),
      batches:c.window.GIFT445_ORIGINAL_BATCH_INDEX.informatics
    }));
    """
    return json.loads(subprocess.check_output([node, '-e', js], cwd=REPO))

def parse_original(record):
    transcript = '\n'.join(record['paragraphs']).strip()
    markers = list(re.finditer(r'Answer\s*[:：][ \t]*([^\n]*)', transcript, re.I))
    assert len(markers) == 1, (record['batch'], record['number'], 'answer markers')
    note = markers[0][1].strip()
    letters = re.match(r'^[A-D](?:\s+or\s+[A-D])*(?=\s|$|[.,;:()])', note)
    keys = re.findall(r'\b[A-D]\b', letters[0]) if letters else []
    key = keys if len(keys) > 1 else keys[0] if keys else None
    choices = transcript[:markers[0].start()].replace('\xad', '')
    opts = list(re.finditer(r'^\s*([A-D])\s*[.)\-:,]\s*', choices, re.M))
    if record['batch'] == '443' and record['number'] == 28:
        # One printed inline option C follows the complete option B sentence.
        opts.append(re.search(r'(?<=recommendations\.)\s+(C)\.\s+', choices))
        opts.sort(key=lambda m: m.start())
    assert [m[1] for m in opts] == list('ABCD'), (record['batch'], record['number'], 'option labels')
    stem = re.sub(r'^\s*Q\s*\d+\s*[:：.)]?\s*', '', choices[:opts[0].start()])
    options = [[m[1], normalize(choices[m.end():opts[i + 1].start() if i + 1 < len(opts) else len(choices)])] for i, m in enumerate(opts)]
    return transcript, normalize(stem), options, note, key

def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('--node', default='node')
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    source_sha = digest(args.source.read_bytes())
    assert source_sha == NATIVE_HASH, 'Use the byte-verified Gift Informatics MID original'
    native, original_images = read_native(args.source)
    site = runtime(args.node)
    by_id = {q['id']: q for q in site['bank']}
    assert len(native) == len(by_id) == len(site['bank']) == 448
    batch_index = {}
    fixture_items, provenance = [], {}
    image_count = 0
    for record in native:
        batch, number, start = (record[k] for k in ('batch', 'number', 'start'))
        base = f'informatics-mid-{batch}-p{start:04d}'
        q = by_id.get(base) or by_id['batch-' + base]
        qid = q['id']
        loc, = q['sourceLocations']
        assert (loc['assessment'], str(loc['batch']), loc['questionNumber'], loc['paragraphIndex']) == ('Midterm', batch, number, start), qid
        transcript, stem, options, note, key = parse_original(record)
        actual_stem = normalize(re.sub(r'^\s*Q\s*\d+\s*[:：.)]?\s*', '', q['stem']))
        assert actual_stem == stem, (qid, 'stem', actual_stem, stem)
        assert [[o['id'], normalize(o['text'])] for o in q['options']] == options, (qid, 'options')
        assert (q['sourceAnswerNote'], q['sourceAnswer']) == (note, key), (qid, 'answer', note, key)
        assert not q.get('sourceTables'), qid

        anchors = record['imageAnchors']
        expected_images = [] if (batch, number) == ('432', 1) else anchors
        # The native floating duplicate is anchored at Q1, but rendered only at Q34.
        # Q15 retains the previous privacy crop; never export the uncropped source.
        assert len(q['images']) == len(expected_images), (qid, 'image count')
        asset_hashes = {}
        for asset, name in zip(q['images'], expected_images):
            payload = (REPO / asset).read_bytes()
            if name == 'image1.png':
                old = Image.open(BytesIO(original_images[name])).convert('RGB').crop((563, 252, 1535, 971))
                shown = Image.open(BytesIO(payload)).convert('RGB')
                assert old.size == shown.size and old.tobytes() == shown.tobytes(), (qid, 'image privacy crop')
            else:
                assert payload == original_images[name], (qid, 'native image bytes')
            asset_hashes[asset] = digest(payload)
            image_count += 1
        item = {'id':qid,'batch':batch,'number':number,'start':start,'end':record['end'],'exportedPdfPage':loc.get('exportedPdfPage'),'sourceHash':digest(compact([q.get(k) for k in HASH_FIELDS]).encode()),'transcriptHash':digest(transcript.encode())}
        if asset_hashes:
            item['assets'] = asset_hashes
        fixture_items.append(item)
        batch_index.setdefault('Midterm|' + batch, []).append(qid)
        prior = q.get('sourceRenderedText', '').strip()
        payload = [start, record['end']]
        if prior != transcript:
            payload.append(transcript)
        provenance[qid] = payload
    assert image_count == 3
    assert {k:v for k,v in site['batches'].items() if k.startswith('Midterm|')} == batch_index
    fixture = {'sourceSha256':source_sha,'sourceFilename':'mid.docx','batches':batch_index,'hashFields':HASH_FIELDS,'questions':fixture_items}
    if args.write:
        (REPO / 'tests/fixtures/informatics-mid-source-integrity.json').write_text(json.dumps(fixture, ensure_ascii=False, indent=2) + '\n')
        (REPO / 'informatics-mid-source-integrity.js').write_text(
            '// Source paragraph proof, extracted from the original Gift Informatics MID DOCX.\n'
            '// Keeps the original question IDs, choices, keys, grade rules and media intact.\n'
            '(() => {\n  const byId = ' + compact(provenance) + ';\n'
            '  window.GIFT445_AUDIT_INFORMATICS_MID = questions => questions.map(question => {\n'
            '    if (question.subjectId !== "informatics" || question.assessment !== "Midterm") return question;\n'
            '    const audited = byId[question.id];\n'
            '    if (!audited) return question;\n'
            '    const [paragraphStart, paragraphEnd, transcript] = audited;\n'
            '    const source = question.sourceLocations[0];\n'
            '    return { ...question,\n'
            '      sourceTranscript: transcript ?? question.sourceRenderedText.trim(),\n'
            '      sourceOccurrenceIntegrity: {\n'
            f'        filename: "mid.docx", sha256: "{source_sha}",\n'
            '        paragraphStart, paragraphEnd, questionNumber: source.questionNumber,\n'
            '        exportedPdfPage: source.exportedPdfPage ?? null\n'
            '      }\n'
            '    };\n'
            '  });\n'
            '})();\n')
    print(f'PASS: {len(native)} native MID questions, {len(batch_index)} original ordered batches, {image_count} source-image displays, all original keys and options.')

if __name__ == '__main__':
    main()
