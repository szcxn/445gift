"""Publish complete original batch routes separately from reviewed lecture practice.

Private native source inventories are under ../work/batch-completeness-audit.
The batch index conserves original occurrences, including blank source entries;
adding them never assigns them to a lecture or invents an explanation.
"""
from pathlib import Path
from copy import deepcopy
from collections import defaultdict,Counter
import json,re,hashlib,shutil
from PIL import Image,ImageOps
REPO=Path(__file__).resolve().parents[1];ROOT=REPO.parent;WORK=ROOT/'work/batch-completeness-audit'
read=lambda p:json.loads(Path(p).read_text());sha=lambda b:hashlib.sha256(b).hexdigest();norm=lambda s:re.sub(r'[^a-z0-9]+',' ',str(s).lower()).strip()
study=read(WORK/'study-runtime.json');byid={q['id']:q for q in study};byloc={}
for q in study:
 for l in q.get('sourceLocations',[]):byloc[(q['subjectId'],l['assessment'],str(l['batch']),l.get('questionNumber'))]=q
extra=[];index=defaultdict(lambda:defaultdict(list));proofs=[];assets={};counts=Counter()
def put_asset(path,subject,crop=None,transform=None,privacy_crop=None):
 path=Path(path)
 if not path.is_absolute():path=ROOT/path
 data=path.read_bytes();originalsha=sha(data);crop=crop or{};transform=transform or{}
 if any(int(v)for v in crop.values())or transform or privacy_crop:
  im=Image.open(path).convert('RGB');w,h=im.size
  box=privacy_crop or[round(w*int(crop.get('l',0))/100000),round(h*int(crop.get('t',0))/100000),round(w*(1-int(crop.get('r',0))/100000)),round(h*(1-int(crop.get('b',0))/100000))];im=im.crop(box)
  if transform.get('flipH')in('1','true','on'):im=ImageOps.mirror(im)
  if transform.get('flipV')in('1','true','on'):im=ImageOps.flip(im)
  if int(transform.get('rot',0)):im=im.rotate(-int(transform['rot'])/60000,expand=True)
  dest=WORK/'native-media'/f'{originalsha}-appearance.png';im.save(dest);data=dest.read_bytes();ext='.png'
 else:ext=path.suffix.lower()
 relative=f'question-media/{subject}/{sha(data)}{ext}';dest=REPO/relative;dest.parent.mkdir(exist_ok=True,parents=True)
 if not dest.exists():dest.write_bytes(data)
 assets[relative]={'sha256':sha(data),'originalSha256':originalsha,'wordCrop':crop,'wordTransform':transform,'privacyCrop':privacy_crop}
 return relative

def answer_key(note):
 m=re.match(r'^\s*([A-H1-9](?:(?:\s*[,/&+]\s*|\s+(?:and|or)\s+)[A-H1-9])*)(?=\s|$|[(*,.;:])',note,re.I)
 vals=re.findall(r'\b[A-H1-9]\b',m[1].upper())if m else[]
 return vals[0]if len(vals)==1 else vals or None

def parse_content(content):
 lines=[t.strip()for t in content.splitlines()if t.strip()];text='\n'.join(lines)
 text=re.sub(r'^(?:Q\s*)?\d+\s*[:.)-]\s*','',text,flags=re.I)
 # Printed labels retain their letters and order, including A/B/D/C source typos.
 matches=list(re.finditer(r'(?:^|\n)[ \t]*([A-H1-9])[ \t]*[.)\-:][ \t]*',text))
 b=next((m for m in matches if m[1]=='B'),None)
 if b and not any(m[1]=='A'and m.start()<b.start()for m in matches):
  inline=list(re.finditer(r'(?<!\w)(A)[.)]\s*',text[:b.start()]))
  if inline:matches.insert(0,inline[-1])
 options=[];stem=text
 if matches:
  stem=text[:matches[0].start()].strip();seen=Counter()
  for i,m in enumerate(matches):
   label=m[1];seen[label]+=1;oid=label if seen[label]==1 else label+str(seen[label]);end=matches[i+1].start()if i+1<len(matches)else len(text)
   options.append({'id':oid,'sourceLabel':label,'text':text[m.end():end].strip(),'images':[]})
 else:
  parts=text.splitlines()
  if len(parts)>=5:
   stem='\n'.join(parts[:-4]);options=[{'id':chr(65+i),'text':t,'images':[]}for i,t in enumerate(parts[-4:])]
 return stem,options

def add(q,existing=None,force=False):
 q=deepcopy(q);subject=q['subjectId'];loc=q['sourceLocations'][0];batch=str(loc['batch']);exam=loc['assessment'];key=f'{exam}|{batch}'
 if existing and not force:
  qid=existing['id']
 else:
  qid='batch-'+q['id'];q['id']=qid;q['batchOnly']=True
  q.setdefault('lecture',None);q.setdefault('cycle',None);q.setdefault('images',[]);q.setdefault('sourceTables',[]);q.setdefault('sourceAnswerNote','');q.setdefault('sourceLabel','Gift')
  for option in q['options']:option.setdefault('images',[])
  keyletters=q['sourceAnswer']if isinstance(q.get('sourceAnswer'),list)else[q['sourceAnswer']]if q.get('sourceAnswer')else[]
  missing=lambda o:not o.get('images')and(not o['text'].strip()or bool(re.fullmatch(r'(?:[?؟]+|Not provided(?: in the source)?|Option text was not recorded in the source\.)',o['text'],re.I)))
  reason=(not keyletters and'No Gift answer letter was recorded.')or(not q['options']and'Answer choices are missing in the original source.')or(any(missing(o)for o in q['options'])and'One or more choices are missing in the original source.')or(any(not any(o['id']==k and not missing(o)for o in q['options'])for k in keyletters)and'The recorded Gift letter has no usable original choice.')or(re.search(r'\b(?:not sure|note sure|depends|if\s+(?:ask|the))\b',q['sourceAnswerNote'],re.I)and'The original bank marks this answer as uncertain or conditional.')or''
  q['giftReview']={'policy':'gift-key-first','gradingAnswers':[]if reason else keyletters,'possibleAnswers':[],'ungradedReason':str(reason)}
  if existing:q['studyQuestionId']=existing['id']
  q['batchReview']={'answers':[],'confidence':'unresolved','basis':'pending','explanation':'An explanation has not been prepared for this original batch question.','objection':''}
  # Only a verified, source-compatible review can be inherited. Runtime copying
  # uses this link; review payloads and slide images are not duplicated here.
  if existing:
   optkey=lambda a:[(o['id'],norm(o['text']))for o in a if not missing(o)]
   if optkey(q['options'])==optkey(existing['options'])and q.get('sourceAnswer')==existing.get('sourceAnswer'):
    a=set(norm(q['stem']).split());b=set(norm(existing['stem']).split());score=2*len(a&b)/(len(a)+len(b))if a or b else 0
    if score>=.55:q['inheritStudyReview']=True
  extra.append(q)
 index[subject][key].append(qid);counts[subject]+=1
 proofs.append({'id':qid,'subjectId':subject,'assessment':exam,'batch':batch,'questionNumber':loc.get('questionNumber'),'occurrence':loc.get('occurrence',1),'sourceHash':sha(json.dumps({k:q.get(k)for k in('stem','options','sourceAnswer','sourceAnswerNote','sourceTables','images')},sort_keys=True,ensure_ascii=False).encode())if q.get('batchOnly')else None})

# Canonical native imports already independently audited in their MID projects.
for subject in('research','radiology','community'):
 folder=ROOT/f'work/{subject}-mid-review';questions=read(folder/'canonical-questions.json');display=read(folder/'source-image-display.json')if subject!='research'else{}
 selected={q.get('communitySourceIntegrity',{}).get('canonicalId',q['id']):q for q in study if q['subjectId']==subject}
 for original in questions:
  if original['id']in selected:add(original,selected[original['id']]);continue
  q={k:deepcopy(original[k])for k in('id','subjectId','assessment','sourceBatch','sourceLabel','sourceQuestionNumber','sourceOccurrence','stem','options','sourceAnswer','sourceAnswerNote','sourceLocations','sourceTables')if k in original};q['images']=[]
  if original.get('sourceAnswerText'):q['sourceAnswerText']=original['sourceAnswerText']
  for o in q['options']:
   o.pop('sourceImageIds',None);o.pop('sourceElementIndices',None);o.pop('sourceParagraphIndices',None);o['images']=[]
  q['batchSource']={'sourceId':original['id'],'sha256':next((original.get(k,{}).get(h)for k,h in[(subject+'SourceIntegrity','sha256'),(subject+'SourceIntegrity','bankSha256')]if original.get(k,{}).get(h)),None)}
  for image in original['imageSources']:
   if subject=='research':rel=put_asset(image['path'],subject)
   else:
    s=display[image['imageOccurrenceId']];assert sha(Path(s['displayPath']).read_bytes())==s['displaySha256'];rel=put_asset(s['displayPath'],subject);assets[rel].update(wordCrop=s['wordCrop'],wordTransform=s['wordTransform'],privacyRedactions=s['privacyRedactions'],renderKind=s['renderKind'])
   if image.get('role')=='option':next(o for o in q['options']if o['id']==image['anchoredOptionId'])['images'].append(rel)
   elif image.get('role')=='answer':q.setdefault('answerImages',[]).append(rel)
   else:q['images'].append(rel)
  add(q)

# Informatics keeps the audited visible imports and restores its 72 hidden MID entries.
inf=read(ROOT/'references/informatics/source-inventory.json')
for r in inf['questions']:
 if r['id']in byid:add(r,byid[r['id']]);continue
 q={k:deepcopy(r[k])for k in('id','subjectId','assessment','sourceBatch','stem','options','sourceAnswer','sourceLocations')};q['stem']=re.sub(r'^Q\d+\s*:\s*','',q['stem']);q['sourceAnswerNote']=' or '.join(r.get('sourceAnswerText',[]));q['images']=[]
 for name in r.get('displayImages',[]):
  original=Path('/Users/mohammed/Documents/Codex/2026-10-08/referenced-chatgpt-conversation-this-is-an/outputs/sources')/name
  q['images'].append(put_asset(original,'informatics',privacy_crop=[563,252,1535,971]if name=='image1.png'else None))
 q['batchSource']={'sourceId':r['id'],'sha256':inf['source']['sha256'],'paragraphIndex':r['sourceParagraph']};add(q)
for r in read(ROOT/'references/informatics/final-source-inventory.json')['questions']:add(byid[r['id']],byid[r['id']])

# Medicine uses every native occurrence, before historical merging by stem.
for r in read(WORK/'medicine-native.json'):
 loc={'assessment':r['assessment'],'batch':r['batch'],'questionNumber':r['number'],'paragraphIndex':r['paragraph']};existing=byloc.get(('medicine',r['assessment'],r['batch'],r['number']));stem,options=parse_content(r['content'])
 q={'id':f"medicine-{r['assessment'].lower()}-{r['batch']}-p{r['paragraph']}-q{r['number']}",'subjectId':'medicine','assessment':r['assessment'],'sourceBatch':r['batch'],'stem':stem,'options':options,'sourceAnswer':answer_key(r['answerNote']),'sourceAnswerNote':r['answerNote'],'sourceLocations':[loc],'sourceTables':r['tables'],'images':[],'sourceTranscript':r['content'],'batchSource':{'filename':r['filename'],'sha256':r['sha256'],'paragraphIndex':r['paragraph']}}
 if r['tables']and existing and existing.get('sourceTables'):q['sourceTables']=deepcopy(existing['sourceTables'])
 for image in r['images']:q['images'].append(put_asset(image['path'],'medicine',image['wordCrop'],image['wordTransform']))
 add(q,existing,force=True)

# Surgery native occurrence extraction preserves the original printed choices.
old=Path('/Users/mohammed/Documents/Codex/2026-09-14/referenced-chatgpt-conversation-this-is-an/work/445gift');raw=read(old/'reviews/surgery-raw.json')['questions']
for r in raw:
 exam=r['sourceAssessment'];batch=r['batch'];n=r['questionNumber'];existing=byloc.get(('surgery',exam,batch,n));note=r.get('recordedAnswerText')or''
 q={'id':f"surgery-{exam.lower()}-{batch}-q{n}-s{r['sequence']}",'subjectId':'surgery','assessment':exam,'sourceBatch':batch,'stem':r['stem'],'options':r['options'],'sourceAnswer':answer_key(note),'sourceAnswerNote':note,'sourceLocations':[{'assessment':exam,'batch':batch,'questionNumber':n,'sourceType':'Gift'}],'images':[],'sourceTranscript':'\n'.join(r['rawLines']),'batchSource':{'filename':r['sourceFile'],'sha256':sha((old/'source-materials'/r['sourceFile']).read_bytes()),'sequence':r['sequence']}}
 # The only native table in Surgery MID holds Q18's choices and answer;
 # paragraph-only historical extraction skipped its entire contents.
 if exam=='Midterm'and batch=='437'and n==18:
  q['stem']='A question about a pregnant woman came to her regular follow up, on US you found a gallstone “0.8mm”, she was asymptomatic. What’s the management?'
  q['options']=[{'id':'A','text':'Perform cholecystectomy immediately'},{'id':'B','text':'Perform cholecystectomy after delivery'},{'id':'C','text':'Observation'},{'id':'D','text':''}]
  q['sourceAnswer']='C';q['sourceAnswerNote']='C';q['sourceTranscript']='Q18: '+q['stem']+'\nA. Perform cholecystectomy immediately\nB. Perform cholecystectomy after delivery\nC. Observation\nD.\nAnswer: C'
  q['batchSource']['nativeTableChoices']=True
 for name in r['images']:
  published=REPO/'question-media/surgery'/Path(name).name
  if published.exists():q['images'].append(published.relative_to(REPO).as_posix())
  else:q['images'].append(put_asset(old/name,'surgery'))
 add(q,existing,force=True)
for q in study:
 if q['subjectId']=='surgery'and q.get('sourceLabel')=='Q Bank':add(q,q)

expected={'research':907,'radiology':1071,'community':851,'informatics':879,'medicine':1460,'surgery':1278};assert dict(counts)==expected,(counts,expected)
for subject,rows in read(REPO/'tests/fixtures/batch-source-repairs.json')['sourceCounts'].items():
 assert len(index[subject])==len(rows),(subject,'Unexpected source batch boundary')
 for row in rows:assert len(index[subject][row['assessment']+'|'+row['batch']])==row['count'],(subject,row,'Original batch count mismatch')
for s,sets in index.items():
 for key,ids in sets.items():assert len(ids)==len(set(ids)),(s,key,'Duplicate route ID')
js='''// Complete source batches. Lecture practice remains independently scoped.
(() => {
  const originals = ORIGINALS;
  window.GIFT445_ORIGINAL_BATCH_INDEX = INDEX;
  window.GIFT445_EXTEND_BATCH_BANK = studyQuestions => {
    const studyById = new Map(studyQuestions.map(question => [question.id, question]));
    const copies = originals.map(original => {
      const question = { ...original };
      const study = studyById.get(original.studyQuestionId);
      if (original.inheritStudyReview && study) {
        for (const field of ['medicineReview', 'surgeryReview', 'researchReview', 'radiologyReview', 'communityReview', 'lecture']) {
          if (study[field]) question[field] = study[field];
        }
        if (study.giftReview) {
          question.giftReview = { ...original.giftReview, possibleAnswers: study.giftReview.possibleAnswers };
          if (!study.giftReview.gradingAnswers.length) {
            question.giftReview.gradingAnswers = [];
            question.giftReview.ungradedReason = study.giftReview.ungradedReason || original.giftReview.ungradedReason;
          }
        }
      }
      return question;
    });
    return [...studyQuestions, ...copies];
  };
})();
'''.replace('= ORIGINALS;', '= '+json.dumps(extra,ensure_ascii=False,separators=(',',':'))+';').replace('= INDEX;', '= '+json.dumps(index,ensure_ascii=False,separators=(',',':'))+';')
(REPO/'original-batches.js').write_text(js)
fixture={'counts':dict(counts),'additionalBatchRecords':len(extra),'sets':{s:{k:len(v)for k,v in sets.items()}for s,sets in index.items()},'index':index,'originalOccurrences':proofs,'assets':assets,'studyIds':[q['id']for q in study]}
(REPO/'tests/fixtures/original-batches.json').write_text(json.dumps(fixture,ensure_ascii=False,indent=2)+'\n')
(WORK/'complete-build-summary.json').write_text(json.dumps({'counts':dict(counts),'additional':len(extra),'assets':len(assets),'dataBytes':len(js.encode())},indent=2))
print((WORK/'complete-build-summary.json').read_text())
