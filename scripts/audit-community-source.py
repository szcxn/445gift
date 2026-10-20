"""Independently verify the Community import against both original Word packages.

Keeps raw source capture separate from reviewed semantic image/table bindings.
"""
from pathlib import Path
from copy import deepcopy
from collections import Counter
import hashlib,json,re,unicodedata,xml.etree.ElementTree as ET,zipfile
REPO=Path(__file__).resolve().parents[1];WORK=REPO.parent/'work/community-mid-review'
read=lambda n:json.loads((WORK/n).read_text());sha=lambda b:hashlib.sha256(b).hexdigest();norm=lambda s:' '.join(str(s).split())
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}';A='{http://schemas.openxmlformats.org/drawingml/2006/main}';R='{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
EXPECTED={'mid':('2878aabb849f186fc495ce25b98a7e804af0747e2ac5a30be3bb4d428577c5ba',506),'final':('41fe2880ea839a2934d79d5cdd8b989494aa995bd6d7480c279dca815ca27a97',345)}
def text(e):
 if e.tag==W+'t':return e.text or''
 if e.tag in (W+'br',W+'cr'):return '\n'
 if e.tag==W+'tab':return '\t'
 return ''.join(text(c)for c in e)
def recognition(s):return ''.join(c for c in s if unicodedata.category(c)not in ('Cf','Mn')).lstrip()
def keys(value):
 m=re.search(r'(?i)(?:^|\n)\s*(?:Self\s+)?Answer\s*:\s*(.*)',value,re.S)
 if not m:return []
 value=m[1]
 both=re.match(r'(?i)Both\s+Answers?\s*\(([^)]+)\)',value)
 if both:value=both[1]
 m=re.match(r'\s*([A-F])\b',value)
 if not m:return []
 output=[m[1]];tail=value[m.end():]
 while True:
  m=re.match(r'\s*[!?.]*\s*(?:&|/|,|\bor\b|\band\b)\s*([A-F])\b',tail,re.I)
  if not m:break
  output.append(m[1].upper());tail=tail[m.end():]
 return list(dict.fromkeys(output))
canonical=read('canonical-questions.json');by={q['id']:q for q in canonical};assert len(by)==len(canonical)==851
proof={};all_headers=[];raw_images={};tables={};body_by_exam={}
for exam,(digest,count)in EXPECTED.items():
 path=WORK/'originals'/f'community-{exam}.docx';assert sha(path.read_bytes())==digest
 candidates=read(exam+'-import-candidates.json');assert len(candidates)==count
 source=read(exam+'-source-elements.json');assert source['sha256']==digest
 with zipfile.ZipFile(path)as archive:
  xml=archive.read('word/document.xml');body=list(ET.fromstring(xml).find(W+'body'));rels={r.attrib['Id']:r.attrib for r in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
  body_by_exam[exam]=body
  heads={i for i,e in enumerate(body)if e.tag==W+'p'and re.match(r'(?i)^Q\s*\.?\s*\d+\s*[:.\-)]+',recognition(text(e)))}
  captured={q['source']['qHeaderElementIndex']for q in candidates};assert heads==captured,(exam,'Missing or fabricated header',heads^captured)
  native_options=[]
  for q in candidates:
   id=q['id'];c=by[id];assert q['source']['sha256']==digest==c['communitySourceIntegrity']['bankSha256'];all_headers.append(id)
   head=recognition(text(body[q['source']['qHeaderElementIndex']]));m=re.match(r'(?is)^Q\s*\.?\s*(\d+)\s*[:.\-)]+\s*(.*)',head);assert int(m[1])==q['originalQuestionNumber']
   assert not norm(m[2])or norm(m[2])in norm(c['stem']),(id,'Header text lost')
   for fragment in q['fragments']:
    element=body[fragment['elementIndex']]
    if element.tag==W+'tbl':continue
    assert norm(fragment['text'])==norm(text(element)),(id,'Source fragment changed',fragment['elementIndex'])
   assert len(c['options'])==len(q['options']),(id,'Choice count changed')
   duplicate_labels=len({o['id']for o in q['options']})<len(q['options'])
   for ordinal,(a,o)in enumerate(zip(c['options'],q['options'])):
    assert a['text']==o['text']and a['id']==(chr(65+ordinal)if duplicate_labels else o['id']),(id,'Choice modified')
    assert a['sourceLabel']==re.sub(r'[.)\-\s]+$','',o.get('originalLabel')or'')or not o.get('originalLabel'),(id,'Printed option label changed')
    original=' '.join(text(body[i])for i in o['sourceElementIndices']);assert not a['text']or norm(a['text'])in norm(original),(id,'Choice not in source',a['id'])
    if o['labelOrigin']=='native-numbering':native_options.extend(o['sourceParagraphIndices'])
   for f in q['recordedAnswer']['fragments']:assert norm(f['text'])in norm(text(body[f['elementIndex']])),(id,'Answer fragment not original')
   letters=keys(q['recordedAnswer']['text']);assert letters==q['recordedAnswer']['letters'],(id,'Incorrect key parse',letters,q['recordedAnswer']['letters'])
   key=letters[0]if len(letters)==1 else letters if letters else None;assert c['sourceAnswer']==q['sourceAnswer']==key,(id,'Gift key changed')
   original_free=q['recordedAnswer'].get('freeText')or''
   expected_free='\n'.join([original_free]+[f['text']for f in c['communitySourceIntegrity']['postAnswerFragments']]).strip()if original_free else''
   assert c['sourceAnswerText']==expected_free,(id,'Written source answer changed')
   post=c['communitySourceIntegrity']['postAnswerFragments'];transferred=c['communitySourceIntegrity'].get('contextTransferredElementIndices',[])
   for f in post:assert norm(f['text'])in norm(text(body[f['elementIndex']]))
   expected_note=q['sourceAnswerNote']if original_free else'\n'.join([q['sourceAnswerNote']]+[f['text']for f in post if f['elementIndex']not in transferred]).strip()
   assert c['sourceAnswerNote']==expected_note,(id,'Original note changed')
  for image in source['images']:
   assert image['relationship']==rels[image['relationshipId']];assert any(e.get(R+'embed')==image['relationshipId']for e in body[image['sourceElementIndex']].findall('.//'+A+'blip'))
   data=archive.read(image['packagePath']);assert sha(data)==image['media']['sha256']==sha(Path(image['media']['path']).read_bytes());raw_images[image['imageOccurrenceId']]=image
  for e in source['elements']:
   if e['kind']=='table':
    native=body[e['elementIndex']];rows=[['\n'.join(text(p)for p in cell.findall(W+'p'))for cell in row.findall(W+'tc')]for row in native.findall(W+'tr')]
    assert rows==[[c['text']for c in row]for row in e['cells']],(exam,e['elementIndex'],'Table cell content changed');tables[(exam,e['elementIndex'])]=rows
  assert len(native_options)==len(set(native_options)),(exam,'Native choice duplicated')
  proof[exam]={'filename':path.name,'sha256':digest,'sourceXmlSha256':sha(xml),'occurrences':count,'candidateSha256':sha((WORK/(exam+'-import-candidates.json')).read_bytes()),'nativeOptionParagraphs':len(native_options),'sourceTables':sum(e['kind']=='table'for e in source['elements']),'sourceImageOccurrences':len(source['images'])}
seen_images=Counter();seen_tables=Counter()
for q in canonical:
 exam='mid'if q['assessment']=='Midterm'else'final'
 for image in q['imageSources']:
  raw=raw_images[image['imageOccurrenceId']];assert image['packagePath']==raw['packagePath']and image['sourceElementIndex']==raw['sourceElementIndex']and image['media']['sha256']==raw['media']['sha256'];assert image['questionId']==q['id'];seen_images[image['imageOccurrenceId']]+=1
 for table in q['sourceTables']:
  key=(exam,table['sourceElementIndex']);assert table['rows']==tables[key];assert len(table['cellLayout'])==len(table['rows'])
  for row,cells in zip(table['rows'],table['cellLayout']):assert row==[c['text']for c in cells]
  seen_tables[key]+=1
 for case in [q.get('sharedCase')]:
  if not case:continue
  for f in case['fragments']:assert norm(f['text'])in norm(text(body_by_exam[exam][f['elementIndex']]))
assert set(all_headers)==set(by);assert len(seen_tables)==12
assert {id:n for id,n in seen_images.items()if n>1}=={'final-image-use-0003':2}
assert len(seen_images)==13 and sum(seen_images.values())==14
proof['layout']={'bindingDecisions':read('asset-binding-corrections.json'),'uniqueDiagnosticImages':13,'displayedDiagnosticOccurrences':14,'uniqueTables':12,'displayedTableOccurrences':sum(seen_tables.values())}
(WORK/'independent-source-audit.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2)+'\n')
print('PASS:851 original occurrences, exact stems/choices/keys/notes;12 native tables with merged-cell layout;13 original diagnostic images and explicitly verified shared context.')
