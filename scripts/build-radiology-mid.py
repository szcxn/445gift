"""Build MID Radiology practice from verified original banks and authored reviews.

All source documents and deferred questions remain in the private work folder.
Word crops are respected: hidden screenshot regions are never published.
Diagnostic images retain the cropped source pixels' natural aspect ratio.
"""
from pathlib import Path
from copy import deepcopy
from collections import Counter
import hashlib, json, posixpath, re, runpy, xml.etree.ElementTree as ET, zipfile
import pdfplumber
import pypdfium2 as pdfium

REPO=Path(__file__).resolve().parents[1]
WORK=REPO.parent/'work/radiology-mid-review'
read=lambda n:json.loads((WORK/n).read_text())
sha=lambda b:hashlib.sha256(b).hexdigest()
norm=lambda s:' '.join(str(s).split())
def save(path,data):path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
runpy.run_path(str(REPO/'scripts/audit-radiology-source.py'))
runpy.run_path(str(WORK/'render-source-images.py'))
questions=read('canonical-questions.json');curriculum=read('curriculum.json')
assert len(questions)==1071
assignments=read('review-assignments.json');reviews={}
for group,ids in assignments.items():
    authored=read(f'reviews-{group}.json')
    assert {r['id']for r in authored}==set(ids),(group,'Incomplete or duplicate assignment')
    assert len(authored)==len(ids)
    for review in authored:
        assert review['id']not in reviews
        reviews[review['id']]=review
assert set(reviews)=={q['id']for q in questions}
catalog=[]
for lecture in curriculum['lectures']:
    if not catalog or (catalog[-1]['block'],catalog[-1]['assessment'])!=(lecture['group'],lecture['assessment']):
        catalog.append({'block':lecture['group'],'assessment':lecture['assessment'],'lectures':[]})
    catalog[-1]['lectures'].append(lecture['title'])
mid={l['title']:l for l in curriculum['lectures']if l['inMidterm']}
assert len(mid)==15 and sum(len(g['lectures'])for g in catalog if g['assessment']=='Final')==13
sources={s['id']:s for s in read('lecture-sources.json')+read('pptx-sources.json')}
for s in sources.values():assert sha(Path(s['path']).read_bytes())==s['sha256']
display=read('source-image-display.json')
needed={}
for r in reviews.values():
    if r['inMidterm'] and r.get('evidence'):
        e=r['evidence'];needed.setdefault(e['sourceId'],set()).add((e['unit'],e['page']))
text={}
A='{http://schemas.openxmlformats.org/drawingml/2006/main}'
P='{http://schemas.openxmlformats.org/presentationml/2006/main}'
R='{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
def paragraphs(root):return norm(' '.join(''.join(t.text or ''for t in p.findall('.//'+A+'t'))for p in root.findall('.//'+A+'p')))
for fid,positions in needed.items():
    s=sources[fid]
    if s['sourceType']=='pdf':
        with pdfplumber.open(s['path'])as pdf:
            assert len(pdf.pages)==s['pageCount']
            for unit,page in positions:
                assert unit=='page'and 1<=page<=len(pdf.pages)
                original=pdf.pages[page-1]
                checks={'flowText':norm(original.extract_text(use_text_flow=True,x_tolerance=1)or''),'text':norm(original.extract_text()or''),'tightText':norm(original.extract_text(x_tolerance=1)or'')}
                ocr=WORK/'source-ocr'/f'{fid}-{page:03d}.json'
                if ocr.exists():
                    o=json.loads(ocr.read_text());pg=s['pages'][page-1]
                    assert o['sourceSha256']==s['sha256']and o['imageSha256']==sha(Path(pg['pageImage']).read_bytes())
                    checks['visualOcrText']=norm(' '.join(line['text']for line in o['lines']))
                text[(fid,unit,page)]=checks
    else:
        with zipfile.ZipFile(s['path'])as z:
            rels={e.attrib['Id']:e.attrib['Target']for e in ET.fromstring(z.read('ppt/_rels/presentation.xml.rels'))}
            ordered=ET.fromstring(z.read('ppt/presentation.xml')).find(P+'sldIdLst')
            paths=[posixpath.normpath('ppt/'+rels[e.attrib[R+'id']]).replace('ppt/ppt/','ppt/')for e in ordered]
            assert len(paths)==s['slideCount']
            for unit,page in positions:
                assert unit=='slide'and 1<=page<=len(paths)
                part=paths[page-1];root=ET.fromstring(z.read(part));checks={'slideXmlText':paragraphs(root)}
                relpart=posixpath.dirname(part)+'/_rels/'+posixpath.basename(part)+'.rels'
                if relpart in z.namelist():
                    for rel in ET.fromstring(z.read(relpart)):
                        kind=rel.attrib.get('Type','')
                        if kind.endswith(('/diagramDrawing','/notesSlide')):
                            linked=posixpath.normpath(posixpath.join(posixpath.dirname(part),rel.attrib['Target']))
                            value=paragraphs(ET.fromstring(z.read(linked)))
                            checks['notesXmlText'if kind.endswith('/notesSlide')else'linkedXmlText']=value
                text[(fid,unit,page)]=checks

question_dir=REPO/'question-media/radiology';question_dir.mkdir(parents=True,exist_ok=True)
lecture_dir=REPO/'lecture-media/radiology-mid';lecture_dir.mkdir(parents=True,exist_ok=True)
def missing(option):
    return not option.get('images')and(not option['text'].strip()or bool(re.fullmatch(r'(?:missing|not provided|unavailable|[A-F])\.?',option['text'].strip(),re.I)))
def inspection_ids(review):
    output=set()
    for value in review.get('imageInspection',{}).get('images',[]):
        if isinstance(value,str):output.add(value)
        else:output.update(str(v)for k,v in value.items()if k in ('sourceSha256','sha256','path','imageOccurrenceId','displaySha256'))
    return output
output=[];originals={};exclusions=[];proofs={};assets={}
for original in questions:
    qid=original['id'];authored=reviews[qid]
    if not authored['inMidterm']:
        exclusions.append({'id':qid,'assessment':original['assessment'],'batch':original['sourceBatch'],'reason':authored['classificationReason'],'deferredTopic':authored.get('deferredTopic','')});continue
    assert authored['lecture']in mid,qid
    assert authored['confidence']in ('supported','preference','unresolved')
    assert authored['basis']in ('lecture','concept')
    assert len(authored['explanation'].strip())>=80
    assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]',authored['explanation']+authored.get('objection','')),(qid,'English review required')
    assert authored['confidence']!='unresolved'or not authored['answers'],qid
    q=deepcopy(original);q['images']=[]
    for option in q['options']:option['images']=[]
    if q['imageSources']:
        seen=inspection_ids(authored)
        assert seen,(qid,'No actual illustration inspection')
        assert authored['imageInspection'].get('finding'),(qid,'No visual finding')
    for image in q.pop('imageSources'):
        iid=image['imageOccurrenceId'];s=display[iid]
        assert s['questionId']==qid
        assert {iid,s['sourceSha256'],s['displayPath'],image['media']['path']}&seen,(qid,'An original illustration was not inspected',iid)
        data=Path(s['displayPath']).read_bytes();assert sha(data)==s['displaySha256']
        relative=f'question-media/radiology/{s["displaySha256"]}{Path(s["displayPath"]).suffix.lower()}'
        (REPO/relative).write_bytes(data)
        if image['role']=='option':
            option=next(o for o in q['options']if o['id']==image['anchoredOptionId']);option['images'].append(relative)
        else:q['images'].append(relative)
        metadata={'image':relative,'sourceSha256':s['sourceSha256'],'sha256':s['displaySha256'],'mediaPart':image['packagePath'],'imageOccurrenceId':iid,'sourceElementIndex':image['sourceElementIndex'],'role':image['role'],'optionId':image.get('anchoredOptionId'),'wordCrop':s['wordCrop'],'wordTransform':s['wordTransform'],'pixelCrop':s['pixelCrop'],'privacyRedactions':s['privacyRedactions'],'renderKind':s['renderKind']}
        q['radiologySourceIntegrity']['sourceImages'].append(metadata);assets[relative]=metadata
    for option in q['options']:option.pop('sourceImageIds',None)
    for answer in authored['answers']:
        assert any(o['id']==answer and not missing(o)for o in q['options']),(qid,'Reviewed choice not recorded',answer)
    key=q['sourceAnswer']if isinstance(q['sourceAnswer'],list)else[q['sourceAnswer']]if q['sourceAnswer']else[]
    if key and authored['answers']and set(key)!=set(authored['answers']):assert authored.get('objection'),(qid,'Unexplained key disagreement')
    review={k:deepcopy(authored[k])for k in ('answers','confidence','basis','explanation','objection','references')if k in authored}
    evidence=authored.get('evidence')
    if evidence:
        e=evidence;s=sources[e['sourceId']];position=(e['sourceId'],e['unit'],e['page']);quote=norm(e['quote'])
        assert quote and any(quote in passage for passage in text[position].values()),(qid,'Quote not in original source',e)
        assert e['relation']in ('direct','background')
        assert authored['basis']!='lecture'or e['relation']=='direct',(qid,'Topic-only lecture evidence')
        result={k:e[k]for k in ('sourceId','unit','page','relation')}
        result.update(title=s['title'],url=s['url'],sourceSha256=s['sha256'],quote=quote)
        if e['unit']=='page':
            relative=f'lecture-media/radiology-mid/{e["sourceId"]}-{e["page"]:03d}.jpg'
            path=REPO/relative
            if not path.exists():
                pdf=pdfium.PdfDocument(s['path']);page=pdf[e['page']-1]
                page.render(scale=min(2,1700/max(page.get_size()))).to_pil().convert('RGB').save(path,quality=88,optimize=True)
                pdf.close()
            result['image']=relative;result['imageSha256']=sha(path.read_bytes())
        if quote not in text[position].get('flowText','')and 'visualOcrText'in text[position]and quote in text[position]['visualOcrText']:result['textMethod']='visual-ocr'
        review['evidence']=result
        proof=proofs.setdefault('|'.join(map(str,position)),{'sourceId':s['id'],'sourceSha256':s['sha256'],'unit':e['unit'],'page':e['page'],'textHashes':{k:sha(v.encode())for k,v in text[position].items()},'quotes':[]})
        if quote not in proof['quotes']:proof['quotes'].append(quote)
        if result.get('image'):proof.update(image=result['image'],imageSha256=result['imageSha256'])
    else:assert authored['basis']=='concept',(qid,'Lecture claim without evidence')
    if re.fullmatch(r'\s*(?:Self\s+)?Answer\s*:\s*',q['sourceAnswerNote'],re.I):q['sourceAnswerNote']=''
    reason=(authored.get('ungradedReason')or
        (authored['confidence']=='unresolved'and'The available source does not establish a unique answer.')or
        (not key and('The source gives a written answer without an answer letter.'if q['sourceAnswerText']else'No Gift answer letter was recorded.'))or
        (any(missing(o)for o in q['options'])and'One or more original choices are missing.')or
        (any(not any(o['id']==k and not missing(o)for o in q['options'])for k in key)and'The recorded Gift letter has no usable original choice.')or
        (re.search(r'\b(?:not sure|note sure|if\s+(?:ask|the))\b',q['sourceAnswerNote'],re.I)and'The original bank marks its answer as uncertain or conditional.')or'')
    q.update(lecture=authored['lecture'],lectureOrder=mid[authored['lecture']]['order'],radiologyPracticeAssessment='Midterm',radiologyReview=review,radiologyClassification={'reason':authored['classificationReason'],'curriculumUrl':curriculum['sourceUrl'],'sourceRow':mid[authored['lecture']]['sourceRow']},giftReview={'policy':'gift-key-first','gradingAnswers':[]if reason else key,'possibleAnswers':list(authored['answers']),'ungradedReason':str(reason)})
    originals[qid]={k:deepcopy(q[k])for k in ('stem','options','sourceAnswer','sourceAnswerText','sourceAnswerNote','sourceTables','images','assessment','sourceBatch','sourceQuestionNumber','sourceOccurrence','sourceLocations','radiologySourceIntegrity')}
    output.append(q)
counts={'originalOccurrences':len(questions),'sourceMidterm':628,'sourceFinal':443,'selected':len(output),'selectedBySourceExam':dict(Counter(q['assessment']for q in output)),'deferred':len(exclusions),'byLecture':dict(Counter(q['lecture']for q in output)),'basis':dict(Counter(q['radiologyReview']['basis']for q in output)),'confidence':dict(Counter(q['radiologyReview']['confidence']for q in output)),'ungraded':sum(not q['giftReview']['gradingAnswers']for q in output),'illustratedQuestions':sum(bool(q['images']or any(o['images']for o in q['options']))for q in output),'questionImageFiles':len(assets),'sourceImageOccurrences':sum(len(q['radiologySourceIntegrity']['sourceImages'])for q in output),'wordCroppedOccurrences':sum(any(i['wordCrop'].values())for q in output for i in q['radiologySourceIntegrity']['sourceImages']),'checkedLecturePositions':len(proofs)}
assert output and all(q['radiologyPracticeAssessment']=='Midterm'for q in output)
(REPO/'radiology-catalog.js').write_text('// Radiology curriculum: checked MID topics; Final lecture names only.\nwindow.GIFT445_RADIOLOGY_CATALOG = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n')
(REPO/'radiology-data.js').write_text('// Radiology MID practice. Original Gift keys, illustrations and exam occurrences are retained.\nwindow.GIFT445_RADIOLOGY_QUESTIONS = '+json.dumps(output,ensure_ascii=False,indent=2)+';\n')
fixture={'curriculum':curriculum,'counts':counts,'bankHashes':read('canonical-source-audit.json'),'previousSubjects':read('existing-subject-hashes.json'),'selectedIds':[q['id']for q in output],'excludedIds':[q['id']for q in exclusions],'originalQuestions':originals,'sources':[{k:v for k,v in s.items()if k in ('id','title','url','sha256','team','cohortProvenance','sourceType','numbering','pageCount','slideCount')}for s in sources.values()],'checkedPositions':list(proofs.values())}
save(REPO/'tests/fixtures/radiology-mid.json',fixture);save(WORK/'deferred-questions.json',exclusions);save(WORK/'build-summary.json',counts)
print(json.dumps(counts,ensure_ascii=False,indent=2))
