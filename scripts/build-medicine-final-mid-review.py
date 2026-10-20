"""Build Final-source questions for Medicine MID lecture practice.

Private inputs retain the original DOCX, its complete occurrence inventory and
manually authored reviews. No model-generated answer replaces a source key.
"""
from pathlib import Path
from collections import Counter
from copy import deepcopy
import hashlib, json, re
import pdfplumber
import pypdfium2 as pdfium

R=Path(__file__).resolve().parents[1];W=R.parent/'work/medicine-final-mid'
S=R.parent/'references/medicine-mid-444'
read=lambda p:json.loads(p.read_text())
norm=lambda s:' '.join(s.split())
sha=lambda b:hashlib.sha256(b).hexdigest()
original=read(W/'baseline.json');prepared=read(W/'prepared-questions.json')
byid={q['id']:q for q in prepared};baseline={q['id']:q for q in original}
associations=read(W/'prepared-associations.json');source_manifest=read(W/'source-manifest.json')
assert sha(Path(source_manifest['path']).read_bytes())==source_manifest['sha256']
sources={s['id']:s for s in read(S/'evidence-audit/original-page-text-flow.json')}
cache=read(R.parent/'work/medicine-explanation-audit/independent-original-pages.json')
orders={(q['cycle'],q['lecture']):q.get('lectureOrder',999) for q in original if q['assessment']=='Midterm'}
reviews={}
for name in ['renal','gi','cardio-pulmonary']:
 for qid,review in read(W/f'{name}-review.json').items():
  assert qid not in reviews,qid
  assert qid in byid and byid[qid]['assessment']=='Final',qid
  reviews[qid]=review
variants=read(W/'source-variants.json');assert all(q['id'] in reviews for q in variants)
corrections={k:v for k,v in read(W/'source-corrections.json').items() if k in reviews or baseline[k]['assessment']=='Midterm'}
def answer_keys(note):
 prefix=re.match(r'^\s*([A-D]\b(?:\s*(?:,|or|and|&|/|\+)\s*[A-D]\b)*)',note,re.I)
 return list(dict.fromkeys(re.findall(r'\b[A-D]\b',prefix[1].upper()))) if prefix else []
for qid in reviews:
 primary=next((s for s in associations[qid] if s['batch']==str(byid[qid]['sourceBatch'])),associations[qid][0])
 keys=answer_keys(primary['answerNote']);actual=keys[0] if len(keys)==1 else keys or None
 existing=byid[qid].get('sourceAnswer');existing_keys=existing if isinstance(existing,list) else [existing] if existing else []
 if set(existing_keys)!=set(keys):
  assert len(associations[qid])==1,(qid,'Different original keys need separate exam variants')
  corrections.setdefault(qid,{}).update({'sourceAnswer':actual,'sourceAnswerNote':primary['answerNote']})
  byid[qid].update(corrections[qid])
 for source in associations[qid]:assert set(answer_keys(source['answerNote']))==set(keys),(qid,'Source answer differs by exam')

old_js=(R/'medicine-mid-study-review.js').read_text()
old_reviews=json.loads(re.search(r'const reviews = (.*);\n  for',old_js,re.S)[1])
old_images={r['evidence']['image']:r['evidence'] for r in old_reviews.values() if r.get('evidence')}
image_dir=R/'lecture-media/medicine-mid';image_dir.mkdir(exist_ok=True)
page_checks={};checked=set();rendered={};added=[];output={};expected_sources={}
for qid,authored in reviews.items():
 q=byid[qid];placement=authored['placement'];pair=(placement['cycle'],placement['lecture'])
 assert pair in orders and orders[pair]<999,(qid,placement)
 assert len(authored['explanation'].strip())>=80,qid
 assert authored['basis'] in ['lecture','clinical'] and authored['confidence'] in ['supported','preference','unresolved'],qid
 assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]',authored['explanation']+authored.get('objection','')),qid
 for a in authored['answers']:assert any(o['id']==a and o['text'].strip() for o in q['options']),(qid,a)
 evidence=authored.get('evidence')
 if evidence:
  fid,n=evidence['pdfId'],evidence['page'];source=sources[fid];pdf=S/'originals'/f'{fid}.pdf'
  if fid not in checked:
   assert sha(pdf.read_bytes())==source['sha256'];checked.add(fid)
  assert 0<n<=source['pageCount'],qid
  if cache.get(fid,{}).get('sha256')==source['sha256'] and str(n) in cache[fid]['pages']:
   texts=cache[fid]['pages'][str(n)]
  else:
   with pdfplumber.open(pdf) as doc:
    page=doc.pages[n-1];texts={'flowText':norm(page.extract_text(use_text_flow=True,x_tolerance=1) or ''),'text':norm(page.extract_text() or '')}
  quote=norm(evidence['quote']);matches=[kind for kind,text in texts.items() if quote in norm(text)]
  assert quote and matches,(qid,'Quote absent from original page',fid,n,quote)
  assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]',quote),qid
  assert evidence['relation'] in ['teaching','background'],qid
  if authored['basis']=='lecture':assert evidence['relation']=='teaching',qid
  relative=f'lecture-media/medicine-mid/{fid}-{n:03}.jpg';path=R/relative
  if relative not in rendered:
   previous=old_images.get(relative)
   if previous and path.exists():assert sha(path.read_bytes())==previous['imageSha256'],relative
   else:
    doc=pdfium.PdfDocument(str(pdf));page=doc[n-1];bitmap=page.render(scale=1600/page.get_width());bitmap.to_pil().convert('RGB').save(path,format='JPEG',quality=80,optimize=True);doc.close();added.append(relative)
   rendered[relative]=sha(path.read_bytes())
  kind=matches[0];page_hash=sha(norm(texts[kind]).encode())
  evidence={'pdfId':fid,'title':re.sub(r'^(?:L)?\d+\)\s*','',re.sub(r'\.pdf$','',source['title'].strip())).strip(' .'),'page':n,'quote':quote,'relation':evidence['relation'],'sourceSha256':source['sha256'],'pageTextSha256':page_hash,'textKind':kind,'url':source['url'],'image':relative,'imageSha256':rendered[relative]}
  page_checks[f'{fid}:{n}:{kind}']={'pdfId':fid,'page':n,'textKind':kind,'textSha256':page_hash}
 else:assert authored['basis']=='clinical',qid
 keys=q['sourceAnswer'] if isinstance(q['sourceAnswer'],list) else [q['sourceAnswer']] if q.get('sourceAnswer') else []
 if keys and authored['answers'] and set(keys)!=set(authored['answers']):assert authored.get('objection'),qid
 missing=any(not o['text'].strip() for o in q['options'])
 reason=authored.get('ungradedReason','') or ('No Gift answer was recorded.' if not keys else 'One or more choices are missing in the original source.' if missing else '')
 grade=[] if reason else keys
 assert all(a in {o['id'] for o in q['options']} for a in grade),qid
 review={k:authored[k] for k in ['answers','confidence','basis','explanation']};review.update({'objection':authored.get('objection',''),'evidence':evidence,'references':authored.get('references',[])})
 integrity={'docxSha256':source_manifest['sha256'],'sources':[{'batch':s['batch'],'questionNumber':s['number'],'paragraph':s['paragraph'],'answerNote':s['answerNote'],'answers':answer_keys(s['answerNote']),'contentSha256':sha(s['content'].encode())} for s in associations[qid]]}
 output[qid]={'cycle':placement['cycle'],'lecture':placement['lecture'],'lectureOrder':orders[pair],'medicineMidLecture':placement,'medicineReview':review,'medicineSourceIntegrity':integrity,'giftReview':{'policy':'gift-key-first','gradingAnswers':grade,'ungradedReason':reason,'possibleAnswers':authored['answers'],'interpretation':authored['explanation']}}
 expected_sources[qid]={'stem':q['stem'],'options':q['options'],'sourceAnswer':q.get('sourceAnswer'),'sourceLocations':q['sourceLocations'],'assessment':q['assessment'],'sourceBatch':q['sourceBatch']}

payload={'corrections':corrections,'variants':variants,'reviews':output}
(R/'medicine-final-mid-review.js').write_text('// Original Final questions linked to matching Medicine MID lectures; exam keys stay separate.\n(()=>{\n  const data = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n  const questions=window.GIFT445_QUESTIONS||[];\n  for(const question of questions){\n    if(data.corrections[question.id]) Object.assign(question,data.corrections[question.id]);\n  }\n  questions.push(...data.variants);\n  for(const question of questions){\n    if(data.reviews[question.id]) Object.assign(question,data.reviews[question.id]);\n  }\n})();\n')
final_occurrences=[{'id':q['id'],'batch':str(l['batch']),'questionNumber':l['questionNumber']} for q in prepared for l in q.get('sourceLocations',[]) if l['assessment']=='Final']
assert len(final_occurrences)==765
assert len({(l['batch'],l['questionNumber']) for l in final_occurrences})==765
report={'reviewedOn':'2026-10-20','sourceFile':Path(source_manifest['path']).name,'sourceSha256':source_manifest['sha256'],'sourceOccurrences':765,'scannedCanonicalQuestions':750,'linkedFinalQuestions':len(output),'linkedFinalOccurrences':sum(len(associations[qid]) for qid in reviews),'basis':dict(Counter(r['medicineReview']['basis'] for r in output.values())),'confidence':dict(Counter(r['medicineReview']['confidence'] for r in output.values())),'byCycle':dict(Counter(r['cycle'] for r in output.values())),'sourceVariants':len(variants),'correctedSourceImports':len(corrections),'supportingPages':len(rendered),'newSlideImages':added,'pageChecks':list(page_checks.values()),'selectedIds':list(output),'corrections':corrections,'variants':variants,'expectedSources':expected_sources,'finalOccurrences':final_occurrences}
(R/'tests/fixtures/medicine-final-mid-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
(W/'published-summary.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['newSlideImages','pageChecks','selectedIds','corrections','variants','expectedSources','finalOccurrences']},indent=2),flush=True)
