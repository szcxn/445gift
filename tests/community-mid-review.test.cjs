const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/community-mid-review.json')));
const plain=v=>JSON.parse(JSON.stringify(v)),hash=v=>crypto.createHash('sha256').update(v).digest('hex');
const live={window:{}};vm.createContext(live);
for(const m of html.matchAll(/<script src="([^"?]+)/g)){const p=path.join(root,m[1]);assert.ok(fs.existsSync(p),m[1]);vm.runInContext(fs.readFileSync(p,'utf8'),live);}
const questions=plain(live.window.GIFT445_COMMUNITY_QUESTIONS),catalog=plain(live.window.GIFT445_COMMUNITY_CATALOG),byId=new Map(questions.map(q=>[q.id,q]));
assert.equal(fixture.counts.originalOccurrences,851);assert.equal(fixture.counts.sourceMidterm,506);assert.equal(fixture.counts.sourceFinal,345);
assert.ok(questions.length>400);assert.equal(questions.length,fixture.counts.selected);assert.equal(byId.size,questions.length);
assert.deepEqual(questions.map(q=>q.id),fixture.selectedIds);assert.deepEqual(questions.map(q=>q.communitySourceIntegrity.canonicalId),fixture.selectedCanonicalIds);assert.equal(fixture.excludedIds.length+questions.length,851);
assert.ok(fixture.excludedIds.every(id=>!questions.some(q=>q.communitySourceIntegrity.canonicalId===id)));
assert.equal(catalog.flatMap(g=>g.lectures).length,44);
assert.deepEqual(catalog.flatMap(g=>g.lectures),fixture.curriculum.lectures.map(l=>l.title));
for(const [name,prior]of Object.entries(fixture.previousSubjects)){assert.equal(live.window[name].length,prior.count,name);assert.equal(hash(JSON.stringify(live.window[name])),prior.sha256,`${name}: existing material changed`);}
const midTitles=new Set(catalog.filter(g=>g.assessment==='Midterm').flatMap(g=>g.lectures)),finalTitles=new Set(catalog.filter(g=>g.assessment==='Final').flatMap(g=>g.lectures));
assert.equal(midTitles.size,30);assert.equal(finalTitles.size,14);
const sources=new Map(fixture.sources.map(s=>[s.id,s])),proofs=new Map(fixture.checkedPositions.map(p=>[[p.sourceId,p.unit,p.page].join('|'),p]));
for(const q of questions){
 assert.equal(q.subjectId,'community');assert.equal(q.communityPracticeAssessment,'Midterm');assert.ok(midTitles.has(q.lecture));assert.ok(!finalTitles.has(q.lecture));
 assert.deepEqual(q.sourceLocations.map(l=>l.assessment),[q.assessment]);assert.deepEqual(q.sourceLocations.map(l=>l.batch),[q.sourceBatch]);
 for(const [key,value]of Object.entries(fixture.originalQuestions[q.id]))assert.deepEqual(q[key],value,`${q.id}: original ${key} changed`);
 assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length,q.id);
 const key=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 assert.equal(q.giftReview.policy,'gift-key-first');
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,key,q.id);else assert.ok(q.giftReview.ungradedReason,q.id);
 const r=q.communityReview;assert.ok(r.explanation.length>=80,q.id);assert.doesNotMatch(r.explanation+(r.objection||''),/[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
 assert.ok(['supported','preference','unresolved'].includes(r.confidence));assert.ok(['lecture','concept'].includes(r.basis));
 if(r.confidence==='unresolved'){assert.deepEqual(r.answers,[]);assert.deepEqual(q.giftReview.gradingAnswers,[]);}
 for(const answer of r.answers)assert.ok(q.options.some(o=>o.id===answer&&(o.text.trim()||o.images.length)),q.id);
 if(key.length&&r.answers.length&&JSON.stringify([...key].sort())!==JSON.stringify([...r.answers].sort()))assert.ok(r.objection,q.id);
 if(r.basis==='lecture')assert.equal(r.evidence?.relation,'direct',q.id);
 if(r.evidence){const e=r.evidence,s=sources.get(e.sourceId),p=proofs.get([e.sourceId,e.unit,e.page].join('|'));assert.ok(s&&p,q.id);assert.equal(e.sourceSha256,s.sha256);assert.equal(e.url,s.url);assert.ok(p.quotes.includes(e.quote));assert.ok(e.page>0&&e.page<=(e.unit==='page'?s.pageCount:e.unit==='slide'?s.slideCount:s.paragraphCount));if(e.unit==='page'){assert.equal(hash(fs.readFileSync(path.join(root,e.image))),e.imageSha256);}else assert.equal(e.image,undefined,'No fabricated slide or document-paragraph screenshot');}
 const images=[...q.images,...q.options.flatMap(o=>o.images)];
 assert.equal(images.length,q.communitySourceIntegrity.sourceImages.length);
 for(const image of images){const source=q.communitySourceIntegrity.sourceImages.find(i=>i.image===image);assert.ok(source,q.id);assert.equal(hash(fs.readFileSync(path.join(root,image))),source.sha256);if(Object.values(source.wordCrop).some(v=>v!==0))assert.equal(source.renderKind,'word-source-appearance');}
 for(const o of q.options)for(const image of o.images)assert.ok(q.communitySourceIntegrity.sourceImages.some(i=>i.image===image&&i.role==='option'&&i.optionId===o.id));
 assert.doesNotMatch(JSON.stringify(q),/download_url|storage\.googleapis\.com|\/Users\//,'Private paths or bearer URLs published');
}
function load(name,c=live){const a=html.indexOf(`    function ${name}(`),b=html.indexOf('\n    }\n',a)+6;assert.ok(a>=0,name);vm.runInContext(html.slice(a,b),c);}
for(const name of ['deduplicateQuestions','questionsFor','isQuestionAvailableInLecture','questionsForAssessment','questionsForBatch','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openLecture'])load(name);
live.QUESTION_BANK=questions;live.SUBJECTS=[{id:'community',name:'Community'}];
for(const name of ['captureAnalytics','renderQuestionSetView','persistState','renderResumePanel'])live[name]=()=>{};live.quizAnalyticsProperties=()=>({});
assert.equal(live.deduplicateQuestions(questions).length,questions.length,'Distinct source images and original exam occurrences were merged');
assert.equal(live.questionsForAssessment('community','Midterm').length,questions.length);assert.equal(live.questionsForAssessment('community','Final').length,0);
for(const q of questions){live.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};live.openLecture('community',null,q.lecture);assert.ok(live.appState.quiz.questionIds.includes(q.id),q.id);assert.ok(live.questionsForBatch('community',q.assessment,q.sourceBatch).some(x=>x.id===q.id),q.id);}
for(const title of finalTitles){live.appState.quiz.questionIds=[];live.openLecture('community',null,title);assert.equal(live.appState.quiz.questionIds.length,0);}
for(const name of ['openSubject','questionCountLabel','batchCountLabel','batchDisplayName'])load(name);
live.CYCLE_ORDER=[];live.workspaceHeader=t=>t;live.escapeHtml=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));live.bindWorkspaceClose=()=>{};
live.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};live.openSubject('community');
const menu=live.workspaceElement.innerHTML;assert.match(menu,/data-mode="assessment" data-assessment="Final" disabled/);assert.match(menu,/Final · Midterm topics/);
const cards=[...menu.matchAll(/<button class="route-card direct-lecture-card"[\s\S]*?<\/button>/g)].map(m=>m[0]);assert.equal(cards.length,44);
for(const title of finalTitles){const card=cards.find(c=>c.includes(`data-lecture="${live.escapeHtml(title)}"`));assert.ok(card&&card.includes(' disabled')&&card.includes('Lecture names only'),title);}
const renderer={appState:{navigation:{mode:'lecture',assessment:null},quiz:{answers:{},questionIds:questions.map(q=>q.id),currentIndex:0}},SUBJECTS:[{id:'community',name:'Community'}],QUESTION_BANK:questions,escapeHtml:live.escapeHtml,persistState(){},captureAnalytics(){},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'community-test'};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);load('batchDisplayName',renderer);
let clicks=0;
for(const q of questions){
 const usable=q.options.filter(o=>o.images.length||!renderer.isMissingSourceOption(o.text,'community'));
 delete renderer.appState.quiz.answers[q.id];const initial=renderer.renderQuestion(q,0,questions.length);
 if(!usable.length){
  assert.match(initial,/answer-panel visible/);assert.doesNotMatch(initial,/class="option-button/);assert.match(initial,/Mark reviewed/);
  renderer.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>[],querySelector:()=>({classList:{add(){}}})}:null};
  renderer.answerQuestion(q.id,'__reviewed__');assert.equal(renderer.appState.quiz.answers[q.id],'__reviewed__');assert.match(renderer.renderQuestion(q,0,questions.length),/>Reviewed<\/button>/);assert.deepEqual(q.giftReview.gradingAnswers,[],'A review-only action was scored');
 }
 if(q.options.some(o=>o.images.length&&!o.text.trim()))assert.match(initial,/class="option-button/,'Image-only choices disappeared');
 assert.doesNotMatch(initial,/<button[^>]*class="option-button[^>]*>(?:(?!<\/button>)[\s\S])*?<a\b/,'Nested interactive full-size link');
 for(const image of [...q.images,...q.options.flatMap(o=>o.images)]){
  assert.ok(initial.includes(`src="${image}"`),`${q.id}: missing displayed illustration`);
  assert.ok(initial.includes(`href="${image}"`),`${q.id}: full-size link differs from displayed illustration`);
 }
 for(const option of usable){
  const buttons=usable.map(o=>{const b={dataset:{option:o.id},classes:new Set(),setAttribute(){}};b.classList={toggle(n,on){if(on)b.classes.add(n);else b.classes.delete(n)}};return b;});
  renderer.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
  renderer.answerQuestion(q.id,option.id);const text=renderer.renderQuestion(q,0,questions.length);clicks++;
  assert.match(text,/Gift answer:/);assert.ok(text.includes(renderer.escapeHtml(q.communityReview.explanation)),q.id);assert.equal((text.match(/class="medicine-explanation"/g)||[]).length,1);
  assert.doesNotMatch(text,/AI opinion:|Tentative interpretation:|Clinical explanation|Reference status:/);assert.ok(text.includes(`${q.assessment} · Batch ${q.sourceBatch}`),q.id);
  for(const b of buttons){assert.equal(b.classes.has('correct'),q.giftReview.gradingAnswers.includes(b.dataset.option));assert.equal(b.classes.has('incorrect'),b.dataset.option===option.id&&q.giftReview.gradingAnswers.length>0&&!q.giftReview.gradingAnswers.includes(option.id));}
  const e=q.communityReview.evidence;if(e){assert.ok(text.includes(renderer.escapeHtml(e.quote)));assert.ok(text.includes(`${e.unit==='paragraph'?'Source paragraph':e.unit==='slide'?'Slide':'PDF page'} ${e.page}`));}
  renderer.appState.quiz.answers=plain(renderer.appState.quiz.answers);assert.equal(renderer.renderQuestion(q,0,questions.length),text,'Feedback changed on revisit');
 }
 renderer.appState.navigation.mode='lecture-mix';assert.match(renderer.renderQuestion(q,0,questions.length),new RegExp(`${q.assessment} · Batch ${q.sourceBatch}`));renderer.appState.navigation.mode='lecture';
}
const byCanonical=new Map(questions.map(q=>[q.communitySourceIntegrity.canonicalId,q]));
assert.equal(byCanonical.size,questions.length);
for(const q of questions){
 const canonical=q.communitySourceIntegrity.canonicalId;
 assert.equal(q.id,fixture.legacyIdMap[canonical]||canonical,'Progress ID did not follow the strict legacy map');
 assert.ok(fixture.selectedCanonicalIds.includes(canonical));
 const original=fixture.originalQuestions[q.id];
 assert.deepEqual(q.sourceTables,original.sourceTables);
 for(const table of q.sourceTables){
  assert.equal(table.cellLayout.length,table.rows.length);
  for(let r=0;r<table.rows.length;r++)assert.deepEqual(table.cellLayout[r].map(c=>c.text),table.rows[r]);
  assert.ok(table.cellLayout.flat().every(c=>Number.isInteger(c.colSpan)&&c.colSpan>=1&&Number.isInteger(c.rowSpan)&&c.rowSpan>=1));
 }
}
const ratio=byCanonical.get('community-midterm-442-q024');
assert.equal(ratio.sourceAnswer,'A');assert.deepEqual(ratio.communityReview.answers,['B']);assert.deepEqual(ratio.giftReview.gradingAnswers,['A'],'Scientific disagreement changed complete Gift scoring');
const shifted=byCanonical.get('community-midterm-433-q023');
assert.deepEqual(shifted.options.map(o=>o.id),['A','B','D','C']);assert.equal(shifted.sourceAnswer,'D');assert.deepEqual(shifted.communityReview.answers,['C']);assert.deepEqual(shifted.giftReview.gradingAnswers,['D'],'Original D/C option order or key changed');
const duplicateLabel=byCanonical.get('community-midterm-442-q019');
assert.deepEqual(duplicateLabel.options.map(o=>o.id),['A','B','C','D']);assert.deepEqual(duplicateLabel.options.map(o=>o.sourceLabel),['A','B','C','B']);
const immunoglobulin=byCanonical.get('community-midterm-443-q010');assert.equal(immunoglobulin.sourceAnswer,'B');assert.deepEqual(immunoglobulin.giftReview.gradingAnswers,[]);assert.match(immunoglobulin.communityReview.explanation,/artificial passive/i);
const missing=byCanonical.get('community-midterm-442-q030');assert.deepEqual(missing.options.map(o=>o.text).slice(1),['?','?','?']);assert.deepEqual(missing.giftReview.gradingAnswers,[]);
renderer.appState.quiz.answers[missing.id]='A';const missingHtml=renderer.renderQuestion(missing,0,1);assert.equal((missingHtml.match(/class="option-button/g)||[]).length,1,'Question-mark placeholders became answer buttons');
for(const q of questions){
 if(/\b(?:not sure|note sure)\b/i.test(q.sourceAnswerNote))assert.deepEqual(q.giftReview.gradingAnswers,[],`${q.id}: an explicitly uncertain source key was scored`);
}
const screening=byCanonical.get('community-midterm-438-q029');assert.equal(screening.images.length,1);assert.match(screening.communityReview.explanation,/position 2|point 2|stage 2/i);
assert.equal(byCanonical.get('community-midterm-431-q058').images.length,0,'Following natural-history figure remained on maternal-ratio question');
assert.equal(byCanonical.get('community-midterm-431-q059').images.length,1);
const ageRate=byCanonical.get('community-midterm-439-q060');assert.equal(ageRate.sourceTables.length,1);assert.match(ageRate.communityReview.explanation,/0\.87/);
const sharedA=byCanonical.get('community-final-430-q007'),sharedB=byCanonical.get('community-final-430-q008');
if(sharedA&&sharedB){const a=sharedA.communitySourceIntegrity.sourceImages.find(i=>i.imageOccurrenceId==='final-image-use-0003'),b=sharedB.communitySourceIntegrity.sourceImages.find(i=>i.imageOccurrenceId==='final-image-use-0003');assert.ok(a&&b);assert.equal(a.image,b.image,'Explicit shared figure was lost');}
// Public paths may contain only the actual Word appearance, not hidden crop areas.
const hiddenHashes=new Set(questions.flatMap(q=>q.communitySourceIntegrity.sourceImages).filter(i=>i.sourceSha256!==i.sha256).map(i=>i.sourceSha256));
for(const item of fs.readdirSync(path.join(root,'question-media/community'))){const file=path.join(root,'question-media/community',item);if(fs.statSync(file).isFile())assert.ok(!hiddenHashes.has(hash(fs.readFileSync(file))),`Uncropped legacy source image remains public: ${item}`);}
assert.match(html,/حدثوا الصفحة بشكل دوري عشان توصلكم التحديثات/);
assert.doesNotMatch(html,/localStorage\.clear\(/,'Progress storage was cleared');
const merged=byCanonical.get('community-midterm-435-q023');assert.ok(merged);
assert.equal(merged.sourceTables[0].sourceElementIndex,2158);assert.equal(merged.sourceTables[0].cellLayout[0][0].rowSpan,2);assert.equal(merged.sourceTables[0].cellLayout[0][1].colSpan,2);
const mergedHtml=renderer.renderSourceTables(merged);assert.match(mergedHtml,/rowspan="2"/);assert.match(mergedHtml,/colspan="2"/);assert.match(mergedHtml,/Biopsy results/);
const table32=byCanonical.get('community-midterm-432-q032'),table33=byCanonical.get('community-midterm-432-q033');assert.ok(table32&&table33);
assert.equal(table32.sourceTables[0].sourceElementIndex,3212);assert.deepEqual(table32.sourceTables,table33.sourceTables,'Shared screening table lost its native binding');
assert.equal(table32.sourceTables[0].rows[1][2],'1500');assert.equal(byCanonical.get('community-midterm-432-q031')?.sourceTables.length||0,0,'Following screening table remained on preceding question');
const table60=byCanonical.get('community-midterm-431-q060');assert.ok(table60);assert.equal(table60.sourceTables[0].sourceElementIndex,3813);assert.equal(table60.sourceTables[0].cellLayout[0][0].rowSpan,2);assert.equal(byCanonical.get('community-midterm-431-q059').sourceTables.length,0);
console.log(`PASS: Community ${questions.length} MID-topic occurrences; ${clicks} answer clicks/revisits; 30 MID/14 names-only Final lectures; immutable original keys/labels/tables/images; strict legacy IDs; exact page/slide/paragraph evidence and previous subjects preserved.`);
