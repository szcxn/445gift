"""Build Research MID practice from original banks and individually authored reviews.

Private sources stay in ../work/research-mid-review. This builder rechecks
original file hashes and cited PDF/PowerPoint passages before writing assets.
It never publishes deferred Final questions or changes a recorded Gift key.
"""
from collections import Counter
from copy import deepcopy
from pathlib import Path
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
WORK = REPO.parent / 'work/research-mid-review'
norm = lambda text: ' '.join(str(text).split())
sha = lambda data: hashlib.sha256(data).hexdigest()
read = lambda name: json.loads((WORK / name).read_text())
write = lambda path,data: path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

# Independent source-content verification precedes classification and authoring.
runpy.run_path(str(REPO / 'scripts/audit-research-source.py'))
questions = read('canonical-questions.json')
audit = read('canonical-source-audit.json')
curriculum = read('curriculum.json')
assert len(questions) == 907 and len({q['id'] for q in questions}) == 907
mid_titles = {l['title'] for l in curriculum['lectures'] if l['inMidterm']}
assert len(mid_titles) == 33
catalog = []
for assessment,group,block in [('Midterm','Theory','Research Methods'),('Midterm','Tutorials','Research Methods — Tutorials'),('Final','Theory','Biostatistics'),('Final','Tutorials','Biostatistics — Tutorials')]:
    catalog.append({'block':block,'assessment':assessment,'lectures':[l['title'] for l in curriculum['lectures'] if l['assessment']==assessment and l['group']==group]})
assert [len(g['lectures']) for g in catalog] == [22,11,11,9]

reviews = {}
for filename in ['reviews-mid-a.json','reviews-mid-a2.json','reviews-mid-b.json','reviews-final.json']:
    for review in read(filename):
        assert review['id'] not in reviews, ('Duplicate review',review['id'])
        reviews[review['id']] = review
assert set(reviews) == {q['id'] for q in questions}, 'Every source occurrence needs a curriculum decision'
sources = {s['id']:s for s in read('lecture-sources.json')+read('pptx-sources.json')}
for source in sources.values():
    assert sha(Path(source['path']).read_bytes()) == source['sha256'], ('Changed lecture',source['id'])

# Re-extract cited text from actual original bytes rather than trusting the
# authoring cache. The proof records the original file, position and passage.
needed = {}
for review in reviews.values():
    if review.get('inMidterm') and review.get('evidence'):
        e=review['evidence']; needed.setdefault(e['sourceId'],set()).add((e['unit'],e['page']))
pages = {}
for fid,positions in needed.items():
    source=sources[fid]
    if source.get('sourceType') in ('pptx','ppsx'):
        with zipfile.ZipFile(source['path']) as archive:
            presentation=ET.fromstring(archive.read('ppt/presentation.xml'))
            rels=ET.fromstring(archive.read('ppt/_rels/presentation.xml.rels'))
            targets={e.attrib['Id']:e.attrib['Target'] for e in rels}
            ordered=presentation.find('{http://schemas.openxmlformats.org/presentationml/2006/main}sldIdLst')
            actual_paths=['ppt/'+targets[e.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']].lstrip('/') for e in ordered]
            actual_paths=[p.replace('ppt/ppt/','ppt/') for p in actual_paths]
            assert len(actual_paths)==source['slideCount']
            for unit,number in positions:
                assert unit=='slide' and 1<=number<=len(actual_paths)
                original=ET.fromstring(archive.read(actual_paths[number-1]))
                # A paragraph boundary is whitespace, preserving original words.
                paragraphs=[''.join(t.text or '' for t in p.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}t')) for p in original.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}p')]
                pages[(fid,unit,number)]={'xmlText':norm(' '.join(paragraphs))}
                slide_path=actual_paths[number-1]
                rel_path=posixpath.dirname(slide_path)+'/_rels/'+posixpath.basename(slide_path)+'.rels'
                if rel_path in archive.namelist():
                    linked=[]
                    for relationship in ET.fromstring(archive.read(rel_path)):
                        if relationship.attrib.get('Type','').endswith('/diagramDrawing'):
                            target=posixpath.normpath(posixpath.join(posixpath.dirname(slide_path),relationship.attrib['Target']))
                            diagram=ET.fromstring(archive.read(target))
                            linked.extend(''.join(t.text or '' for t in p.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}t')) for p in diagram.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}p'))
                    if linked:pages[(fid,unit,number)]['linkedXmlText']=norm(' '.join(paragraphs+linked))
    else:
        with pdfplumber.open(source['path']) as pdf:
            assert len(pdf.pages)==source['pageCount']
            for unit,number in positions:
                assert unit=='page' and 1<=number<=len(pdf.pages)
                page=pdf.pages[number-1]
                pages[(fid,unit,number)]={
                    'flowText':norm(page.extract_text(use_text_flow=True,x_tolerance=1) or ''),
                    'text':norm(page.extract_text() or ''),
                    'tightText':norm(page.extract_text(x_tolerance=1) or '')}

def missing(text):
    return not str(text).strip() or bool(re.fullmatch(r'(?:option text was not recorded in (?:the )?source|answer choices were not recorded in (?:the )?source|not provided(?: in (?:the )?source)?|missing|unavailable|[A-D])\.?',str(text).strip(),re.I))

images=REPO/'lecture-media/research-mid'; images.mkdir(parents=True,exist_ok=True)
question_images=REPO/'question-media/research'; question_images.mkdir(parents=True,exist_ok=True)
rendered={}; page_checks={}; output=[]; selected_sources={}; exclusions=[]
lecture_order={l['title']:i+1 for i,l in enumerate(curriculum['lectures'])}
for original in questions:
    authored=reviews[original['id']]
    if not authored['inMidterm']:
        exclusions.append({'id':original['id'],'assessment':original['assessment'],'batch':original['sourceBatch'],'reason':authored['classificationReason'],'deferredTopic':authored.get('deferredTopic','')})
        continue
    q=deepcopy(original); qid=q['id']
    assert authored['lecture'] in mid_titles, (qid,'Non-MID lecture')
    assert len(authored['explanation'].strip())>=80, (qid,'Missing individual explanation')
    assert authored['confidence'] in ('supported','preference','unresolved')
    assert authored['basis'] in ('lecture','concept')
    assert not re.search(r'[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]',authored['explanation']+authored.get('objection','')), (qid,'Review language')
    assert authored['confidence']!='unresolved' or not authored['answers'], (qid,'Unresolved answer')
    for answer in authored['answers']:
        assert any(o['id']==answer and not missing(o['text']) for o in q['options']), (qid,'Unrecorded option')
    key=q['sourceAnswer'] if isinstance(q['sourceAnswer'],list) else [q['sourceAnswer']] if q['sourceAnswer'] else []
    if key and authored['answers'] and set(key)!=set(authored['answers']):
        assert authored.get('objection'), (qid,'Unexplained disagreement')
    review={k:deepcopy(authored[k]) for k in ('answers','confidence','basis','explanation','objection','references') if k in authored}
    e=authored.get('evidence')
    if e:
        source=sources[e['sourceId']]; position=(e['sourceId'],e['unit'],e['page']); quote=norm(e['quote'])
        assert quote and any(quote in text for text in pages[position].values()), (qid,'Unverified original quote',e)
        assert e['relation'] in ('direct','background')
        assert authored['basis']!='lecture' or e['relation']=='direct', (qid,'Topic-only evidence')
        evidence={'sourceId':e['sourceId'],'sourceSha256':source['sha256'],'title':source['title'],'url':source['url'],'unit':e['unit'],'page':e['page'],'quote':quote,'relation':e['relation']}
        if e['unit']=='page':
            if position not in rendered:
                relative=f'lecture-media/research-mid/{e["sourceId"]}-{e["page"]:03d}.jpg'; path=REPO/relative
                if not path.exists():
                    document=pdfium.PdfDocument(source['path']); page=document[e['page']-1]
                    pil=page.render(scale=min(2.0,1500/max(page.get_size()))).to_pil().convert('RGB')
                    pil.save(path,quality=84,optimize=True); document.close()
                rendered[position]=(relative,sha(path.read_bytes()))
            evidence['image'],evidence['imageSha256']=rendered[position]
        review['evidence']=evidence
        check=page_checks.setdefault('|'.join(map(str,position)),{'sourceId':e['sourceId'],'sourceSha256':source['sha256'],'unit':e['unit'],'page':e['page'],'extractedTextHashes':{k:sha(v.encode()) for k,v in pages[position].items()},'quotes':[]})
        if quote not in check['quotes']: check['quotes'].append(quote)
        if evidence.get('image'): check.update({'image':evidence['image'],'imageSha256':evidence['imageSha256']})
    else:
        assert authored['basis']=='concept', (qid,'Lecture claim without passage')
    q['lecture']=authored['lecture'];q['lectureOrder']=lecture_order[q['lecture']]
    q['researchPracticeAssessment']='Midterm';q['researchReview']=review
    q['researchClassification']={'reason':authored['classificationReason'],'curriculumUrl':curriculum['sourceUrl'],'sourceRow':next(l['sourceRow'] for l in curriculum['lectures'] if l['title']==q['lecture'])}
    q['images']=[]
    q['researchSourceIntegrity']['sourceImages']=[]
    for img in q.pop('imageSources'):
        path=Path(img['path']);assert sha(path.read_bytes())==img['sha256']
        relative='question-media/research/'+Path(img['mediaPart']).name
        (REPO/relative).write_bytes(path.read_bytes());q['images'].append(relative)
        q['researchSourceIntegrity']['sourceImages'].append({'image':relative,'sha256':img['sha256'],'mediaPart':img['mediaPart'],'sourceElementIndex':img['sourceElementIndex']})
    # Opaque native drawing metadata stays private. The full original numerical
    # stems and native tables in these three questions are independently verified.
    q['researchSourceIntegrity'].pop('opaqueDrawingIds',None)
    if re.fullmatch(r'\s*Answer\s*:\s*',q['sourceAnswerNote'],re.I):q['sourceAnswerNote']=''
    ungraded=(not key and 'No Gift answer letter was recorded.'
        or any(not any(o['id']==answer and not missing(o['text']) for o in q['options']) for answer in key) and 'The Gift key has no usable original option.'
        or (not q['options'] or any(missing(o['text']) for o in q['options'])) and 'One or more original choices are missing.'
        or re.search(r'\b(?:not sure|if\s+(?:ask|the)|I did put)\b',q['sourceAnswerNote'],re.I) and 'The original bank marks this answer as uncertain or conditional.'
        or authored.get('ungradedReason')
        or authored['confidence']=='unresolved' and 'The original question does not establish a unique answer.' or '')
    q['giftReview']={'policy':'gift-key-first','gradingAnswers':[] if ungraded else key,'possibleAnswers':list(authored['answers']),'ungradedReason':str(ungraded)}
    selected_sources[qid]={k:deepcopy(q[k]) for k in ('stem','options','sourceAnswer','sourceAnswerNote','sourceTables','images','assessment','sourceBatch','sourceLocations','researchSourceIntegrity')}
    output.append(q)

assert output and all(q['researchPracticeAssessment']=='Midterm' for q in output)
counts={'originalOccurrences':907,'sourceMidterm':441,'sourceFinal':466,'selected':len(output),'selectedBySourceExam':dict(Counter(q['assessment'] for q in output)),'deferred':len(exclusions),'deferredBySourceExam':dict(Counter(q['assessment'] for q in exclusions)),'byLecture':dict(Counter(q['lecture'] for q in output)),'basis':dict(Counter(q['researchReview']['basis'] for q in output)),'confidence':dict(Counter(q['researchReview']['confidence'] for q in output)),'ungraded':sum(not q['giftReview']['gradingAnswers'] for q in output),'originalQuestionImages':sum(bool(q['images']) for q in output),'nativeTables':sum(len(q['sourceTables']) for q in output),'citedPositions':len(page_checks),'renderedPdfPages':len(rendered)}
(REPO/'research-catalog.js').write_text('// Research curriculum: checked MID topics and Final lecture names only.\nwindow.GIFT445_RESEARCH_CATALOG = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n')
(REPO/'research-data.js').write_text('// Research MID practice; original Gift keys and exam occurrences are retained.\nwindow.GIFT445_RESEARCH_QUESTIONS = '+json.dumps(output,ensure_ascii=False,indent=2)+';\n')
fixture={'curriculum':curriculum,'counts':counts,'bankHashes':audit,'previousSubjects':read('existing-subject-hashes.json'),'selectedIds':[q['id'] for q in output],'excludedIds':[q['id'] for q in exclusions],'originalQuestions':selected_sources,'sources':[{k:v for k,v in s.items() if k in ('id','title','team','cohortProvenance','url','sha256','pageCount','slideCount','sourceType','numbering')} for s in sources.values()],'checkedPositions':list(page_checks.values())}
write(REPO/'tests/fixtures/research-mid.json',fixture)
write(WORK/'deferred-questions.json',exclusions)
write(WORK/'build-summary.json',counts)
print(json.dumps(counts,ensure_ascii=False,indent=2))
