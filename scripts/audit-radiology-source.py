"""Verify Radiology import against original Word bytes, before any review."""
from pathlib import Path
from copy import deepcopy
import hashlib, json, re, xml.etree.ElementTree as ET, zipfile
REPO=Path(__file__).resolve().parents[1]
WORK=REPO.parent/'work/radiology-mid-review'
read=lambda name:json.loads((WORK/name).read_text())
write=lambda name,data:(WORK/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
sha=lambda data:hashlib.sha256(data).hexdigest()
norm=lambda s:' '.join(str(s).split())
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
A='{http://schemas.openxmlformats.org/drawingml/2006/main}'
R='{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
M='{http://schemas.openxmlformats.org/officeDocument/2006/math}'
EXPECTED={'mid':('f8d6a8661f31d5c50966682c9386faa5ffac984495ce0d721ef8a61c07691475',628),
          'final':('76c0aeb450937c336fb84e97765bbcf5a8290f3224a6c86f683eec3b72c10fca',443)}
def raw_text(e):
    if e.tag in (W+'t',M+'t'):return e.text or ''
    if e.tag==W+'tab':return '\t'
    if e.tag in (W+'br',W+'cr'):return '\n'
    return ''.join(raw_text(c) for c in e)
def original_letters(text):
    value=re.sub(r'^\s*(?:Self\s+)?Answer\s*:\s*','',text,flags=re.I)
    match=re.match(r'\s*([A-F])(?=\b|[&/,])',value)
    if not match:return []
    letters=[match[1].upper()];tail=value[match.end():]
    while True:
        match=re.match(r'\s*(?:&|/|,|\bor\b|\band\b)\s*([A-F])(?=\b|[&/,])',tail,re.I)
        if not match:break
        letters.append(match[1].upper());tail=tail[match.end():]
    return list(dict.fromkeys(letters))
output=[];proof={}
corrections=read('image-binding-corrections.json')
for exam,(expected_hash,expected_count) in EXPECTED.items():
    path=WORK/'originals'/f'{exam}.docx';digest=sha(path.read_bytes())
    assert digest==expected_hash,('Changed original',exam)
    candidates=read(f'{exam}-import-candidates.json')
    assert len(candidates)==expected_count
    assert len({q['id'] for q in candidates})==len(candidates)
    with zipfile.ZipFile(path) as archive:
        body=list(ET.fromstring(archive.read('word/document.xml')).find(W+'body'))
        relationships={e.attrib['Id']:e.attrib for e in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
        raw_headers={i for i,e in enumerate(body) if re.search(r'(?:^|\n)\s*Q\s*\d+\s*[.:)]',raw_text(e),re.I)}
        captured_headers={q['source']['qHeaderElementIndex'] for q in candidates}
        assert not raw_headers-captured_headers,('Omitted source headers',exam,sorted(raw_headers-captured_headers))
        image_uses=[]
        for q in candidates:
            assert q['source']['sha256']==digest
            header=raw_text(body[q['source']['qHeaderElementIndex']]).lstrip()
            prefix=q['source'].get('headerPrefix') or ''
            if prefix and header.startswith(prefix):header=header[len(prefix):]
            clean_header=re.sub(r'^\s*Q\s*(?:\d+)?\s*[.:)\-]*\s*','',header,flags=re.I)
            assert norm(clean_header) in norm(q['stem']),(q['id'],'Header stem truncated')
            for fragment in q['fragments']:
                raw=raw_text(body[fragment['elementIndex']])
                assert norm(fragment['text'])==norm(raw),(q['id'],'Source fragment changed',fragment['elementIndex'])
            for option in q['options']:
                original=' '.join(raw_text(body[i]) for i in option['sourceElementIndices'])
                assert not option['text'] or norm(option['text']) in norm(original),(q['id'],'Choice changed',option['id'])
            for key in q['recordedAnswer']['fragments']:
                assert norm(key['text']) in norm(raw_text(body[key['elementIndex']])),(q['id'],'Key fragment changed')
            parsed=original_letters(q['recordedAnswer']['fragments'][0]['text']) if q['recordedAnswer']['fragments'] else []
            assert q['recordedAnswer']['letters']==parsed,(q['id'],'Wrong original key extraction',parsed,q['recordedAnswer']['letters'])
            key=parsed[0] if len(parsed)==1 else parsed if parsed else None
            assert q['sourceAnswer']==key,(q['id'],'Key shape changed')
            for img in q['images']:
                iid=img['imageOccurrenceId'];image_uses.append(iid)
                relationship=relationships[img['relationshipId']]
                assert relationship==img['relationship'],(q['id'],'Relationship changed')
                assert img['sourceElementIndex']<len(body)
                blips=body[img['sourceElementIndex']].findall('.//'+A+'blip')
                assert any(b.attrib.get(R+'embed')==img['relationshipId'] for b in blips),(q['id'],'Image anchor changed')
                actual=archive.read(img['packagePath'])
                assert sha(actual)==img['media']['sha256']==sha(Path(img['media']['path']).read_bytes()),(q['id'],'Original image changed')
                assert img['role'] in ('stem','option'),(q['id'],'Unresolved image binding')
            stem=q['stem']
            for context in q.get('context',[]):
                text=context.get('stem') or context.get('text','')
                if context.get('recordedAnswer',{}).get('text'):
                    text='Previous subquestion: '+text+'\n'+context['recordedAnswer']['text']
                if text:stem=text+'\n\n'+stem
            if q.get('sharedCase') and q['sharedCase'].get('text'):
                for fragment in q['sharedCase']['fragments']:
                    assert norm(fragment['text'])==norm(raw_text(body[fragment['elementIndex']]))
                stem=q['sharedCase']['text']+'\n\n'+stem
            options=[{'id':o['id'],'text':o['text'],'sourceLabel':re.sub(r'[.)\-\s]+$','',o.get('originalLabel') or '') or o['id'],'labelOrigin':o['labelOrigin'],'sourceImageIds':o.get('images',[])} for o in q['options']]
            result={'id':q['id'],'subjectId':'radiology','assessment':q['assessment'],'sourceBatch':q['batch'],'sourceLabel':'Gift','sourceQuestionNumber':q['originalQuestionNumber'],'sourceOccurrence':q['occurrence'],'referenceOrder':len(output)+1,'stem':stem,'options':options,'sourceAnswer':deepcopy(key),'sourceAnswerText':q['recordedAnswer'].get('freeText') or '', 'sourceAnswerNote':q['sourceAnswerNote'],'sourceTables':[], 'sourceLocations':[{'sourceType':'Gift','assessment':q['assessment'],'batch':q['batch'],'questionNumber':q['originalQuestionNumber'],'occurrence':q['occurrence'],'paragraphIndex':q['source']['qHeaderParagraphIndex']}], 'imageSources':deepcopy(q['images']), 'radiologySourceIntegrity':{'bankSha256':digest,'bankFilename':path.name,'qHeaderElementIndex':q['source']['qHeaderElementIndex'],'sourceElementIndices':q['source']['elementIndices'],'originalKeyText':q['recordedAnswer']['text'],'sourceImages':[]}}
            output.append(result)
        assert len(image_uses)==len(set(image_uses)),('Diagnostic image appeared in more than one question',exam)
        proof[exam]={'filename':path.name,'sha256':digest,'occurrences':len(candidates),'diagnosticImageOccurrences':len(image_uses),'candidateSha256':sha((WORK/f'{exam}-import-candidates.json').read_bytes()),'sourceXmlSha256':sha(archive.read('word/document.xml'))}
write('canonical-questions.json',output);write('canonical-source-audit.json',proof)
print(f'Original Word content independently verified: {len(output)} occurrences, exact recorded keys, choices, fragments and image anchors.')
