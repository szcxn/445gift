const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/research-mid.json')));
const plain=value=>JSON.parse(JSON.stringify(value));
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const live={window:{}};vm.createContext(live);
for(const script of html.matchAll(/<script src="([^"?]+)/g)){
 const filename=path.join(root,script[1]);assert.ok(fs.existsSync(filename),`Missing production script ${script[1]}`);
 vm.runInContext(fs.readFileSync(filename,'utf8'),live);
}
const questions=plain(live.window.GIFT445_RESEARCH_QUESTIONS),catalog=plain(live.window.GIFT445_RESEARCH_CATALOG);
assert.equal(fixture.counts.originalOccurrences,907);assert.equal(fixture.counts.sourceMidterm,441);assert.equal(fixture.counts.sourceFinal,466);
assert.equal(questions.length,fixture.counts.selected);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
assert.deepEqual(questions.map(q=>q.id),fixture.selectedIds);
assert.equal(fixture.excludedIds.length+questions.length,907);
assert.ok(fixture.excludedIds.every(id=>!questions.some(q=>q.id===id)),'Deferred Final questions leaked into public practice');
assert.deepEqual(catalog.map(g=>g.lectures.length),[22,11,11,9]);
assert.deepEqual(catalog.flatMap(g=>g.lectures),fixture.curriculum.lectures.map(l=>l.title));
for(const [name,old] of Object.entries(fixture.previousSubjects)){
 assert.equal(live.window[name].length,old.count,name);
 assert.equal(hash(JSON.stringify(live.window[name])),old.sha256,`${name}: unrelated material changed`);
}
const midTitles=new Set(catalog.filter(g=>g.assessment==='Midterm').flatMap(g=>g.lectures));
const finalTitles=new Set(catalog.filter(g=>g.assessment==='Final').flatMap(g=>g.lectures));
const sources=new Map(fixture.sources.map(s=>[s.id,s]));
const proofs=new Map(fixture.checkedPositions.map(p=>[[p.sourceId,p.unit,p.page].join('|'),p]));
for(const q of questions){
 assert.equal(q.subjectId,'research');assert.equal(q.researchPracticeAssessment,'Midterm');
 assert.ok(midTitles.has(q.lecture),q.id);assert.ok(!finalTitles.has(q.lecture),q.id);
 assert.deepEqual(q.sourceLocations.map(l=>l.assessment),[q.assessment]);
 for(const [key,value] of Object.entries(fixture.originalQuestions[q.id]))assert.deepEqual(q[key],value,`${q.id}: original ${key} changed`);
 assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length,`${q.id}: button identity collides`);
 const key=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 assert.equal(q.giftReview.policy,'gift-key-first');
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,key,`${q.id}: opinion replaced Gift key`);else assert.ok(q.giftReview.ungradedReason);
 const r=q.researchReview;assert.ok(r.explanation.length>=80,q.id);assert.doesNotMatch(r.explanation+(r.objection||''),/[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
 assert.ok(['supported','preference','unresolved'].includes(r.confidence));assert.ok(['lecture','concept'].includes(r.basis));
 if(r.confidence==='unresolved'){assert.deepEqual(r.answers,[]);assert.deepEqual(q.giftReview.gradingAnswers,[]);}
 for(const answer of r.answers)assert.ok(q.options.some(o=>o.id===answer&&o.text.trim()),q.id);
 if(key.length&&r.answers.length&&JSON.stringify([...key].sort())!==JSON.stringify([...r.answers].sort()))assert.ok(r.objection,q.id);
 if(r.basis==='lecture')assert.equal(r.evidence?.relation,'direct',q.id);
 if(r.evidence){
  const e=r.evidence,s=sources.get(e.sourceId),p=proofs.get([e.sourceId,e.unit,e.page].join('|'));
  assert.ok(s&&p,q.id);assert.equal(e.sourceSha256,s.sha256);assert.equal(e.url,s.url);assert.ok(p.quotes.includes(e.quote));
  assert.ok(e.page>0&&e.page<=(e.unit==='slide'?s.slideCount:s.pageCount));
  if(e.unit==='slide'){assert.ok(['pptx','ppsx'].includes(s.sourceType));assert.equal(e.image,undefined,'A fabricated slide image was added');}
  else {assert.match(e.image,/^lecture-media\/research-mid\/[\w-]+-\d{3}\.jpg$/);assert.equal(hash(fs.readFileSync(path.join(root,e.image))),e.imageSha256);}
 }
 for(const image of q.images){const source=q.researchSourceIntegrity.sourceImages.find(i=>i.image===image);assert.ok(source,q.id);assert.equal(hash(fs.readFileSync(path.join(root,image))),source.sha256);}
 assert.doesNotMatch(JSON.stringify(q),/download_url|storage\.googleapis\.com|\/Users\//,'Private paths or bearer download URLs were published');
}
function load(name,context=live){const start=html.indexOf(`    function ${name}(`),end=html.indexOf('\n    }\n',start)+6;assert.ok(start>=0,name);vm.runInContext(html.slice(start,end),context);}
for(const name of ['deduplicateQuestions','questionsFor','isQuestionAvailableInLecture','questionsForAssessment','questionsForBatch','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openLecture'])load(name);
live.QUESTION_BANK=questions;live.SUBJECTS=[{id:'research',name:'Research'}];
for(const name of ['captureAnalytics','renderQuestionSetView','persistState','renderResumePanel'])live[name]=()=>{};
live.quizAnalyticsProperties=()=>({});
assert.equal(live.deduplicateQuestions(questions).length,questions.length,'Original repeated exam occurrences must survive');
assert.equal(live.questionsForAssessment('research','Midterm').length,questions.length);
assert.equal(live.questionsForAssessment('research','Final').length,0,'Source Final labels must not create a Final practice collection');
for(const q of questions){
 live.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};
 live.openLecture('research',null,q.lecture);assert.ok(live.appState.quiz.questionIds.includes(q.id),q.id);
 assert.ok(live.questionsForBatch('research',q.assessment,q.sourceBatch).some(item=>item.id===q.id),q.id);
}
for(const lecture of finalTitles){live.appState.quiz.questionIds=[];live.openLecture('research',null,lecture);assert.equal(live.appState.quiz.questionIds.length,0);}
for(const name of ['openSubject','questionCountLabel','batchCountLabel','batchDisplayName'])load(name);
live.CYCLE_ORDER=[];live.workspaceHeader=t=>t;live.escapeHtml=v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));live.bindWorkspaceClose=()=>{};
live.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};
live.openSubject('research');
const menu=live.workspaceElement.innerHTML;
assert.match(menu,/data-mode="assessment" data-assessment="Final" disabled/);
const lectureCards=[...menu.matchAll(/<button class="route-card direct-lecture-card"[\s\S]*?<\/button>/g)].map(m=>m[0]);
assert.equal(lectureCards.length,53);
for(const title of finalTitles){const card=lectureCards.find(c=>c.includes(`data-lecture="${live.escapeHtml(title)}"`));assert.ok(card&&card.includes(' disabled')&&card.includes('Lecture names only'),title);}
assert.match(menu,/Final · Midterm topics/,'Final-source batches must be clearly scoped to MID topics');
const renderer={
 appState:{navigation:{mode:'lecture',assessment:null},quiz:{answers:{},questionIds:questions.map(q=>q.id),currentIndex:0}},
 SUBJECTS:[{id:'research',name:'Research'}],QUESTION_BANK:questions,
 escapeHtml:v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),
 persistState(){},captureAnalytics(){},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'research-test'
};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);
load('batchDisplayName',renderer);
let answerClicks=0;
for(const q of questions){
 const usable=q.options.filter(o=>!renderer.isMissingSourceOption(o.text));
 delete renderer.appState.quiz.answers[q.id];const initial=renderer.renderQuestion(q,0,questions.length);
 if(!usable.length){assert.match(initial,/answer-panel visible/);assert.doesNotMatch(initial,/class="option-button/);}
 for(const option of usable){
  const buttons=usable.map(o=>{const b={dataset:{option:o.id},classes:new Set(),setAttribute(){}};b.classList={toggle(name,on){if(on)b.classes.add(name);else b.classes.delete(name)}};return b;});
  renderer.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
  renderer.answerQuestion(q.id,option.id);const output=renderer.renderQuestion(q,0,questions.length);answerClicks++;
  assert.match(output,/Gift answer:/);assert.ok(output.includes(renderer.escapeHtml(q.researchReview.explanation)),q.id);
  assert.equal((output.match(/class="medicine-explanation"/g)||[]).length,1);
  assert.doesNotMatch(output,/AI opinion:|Tentative interpretation:|Clinical explanation|Reference status:/);
  assert.ok(output.includes(`${q.assessment} · Batch ${q.sourceBatch}`),q.id);
  for(const b of buttons){assert.equal(b.classes.has('correct'),q.giftReview.gradingAnswers.includes(b.dataset.option));assert.equal(b.classes.has('incorrect'),b.dataset.option===option.id&&q.giftReview.gradingAnswers.length>0&&!q.giftReview.gradingAnswers.includes(option.id));}
  if(q.researchReview.evidence){const e=q.researchReview.evidence;assert.ok(output.includes(renderer.escapeHtml(e.quote)));assert.ok(output.includes(`${e.unit==='slide'?'Slide':'PDF page'} ${e.page}`));}
  renderer.appState.quiz.answers=plain(renderer.appState.quiz.answers);assert.equal(renderer.renderQuestion(q,0,questions.length),output,'Feedback changed after revisiting');
 }
 renderer.appState.navigation.mode='lecture-mix';assert.match(renderer.renderQuestion(q,0,questions.length),new RegExp(`${q.assessment} · Batch ${q.sourceBatch}`));renderer.appState.navigation.mode='lecture';
}
const byId=new Map(questions.map(q=>[q.id,q]));
for(const id of ['research-midterm-435-q014','research-midterm-435-q015']){const q=byId.get(id);assert.ok(q);assert.match(q.stem,/association between estrogen/);assert.deepEqual(q.sourceTables[0].rows[1],['Women with Estrogen use','40','160','200']);}
assert.deepEqual(byId.get('research-midterm-435-q013').sourceTables,[],'Following scenario was attached to the wrong question');
const repeatedLabel=byId.get('research-midterm-431-q022');assert.deepEqual(repeatedLabel.options.map(o=>o.id),['A','B','C','D']);assert.deepEqual(repeatedLabel.options.map(o=>o.sourceLabel),['A','B','A','D']);assert.equal(repeatedLabel.sourceAnswer,'D');
assert.ok(fixture.excludedIds.includes('research-final-435-q023'));assert.ok(fixture.excludedIds.includes('research-final-435-q023-o02'),'Both repeated Final-only source numbers must be accounted for and deferred');
assert.match(html,/subjectId === "research" && assessment === "Final" \? "Lecture names only"/);
assert.match(html,/حدثوا الصفحة بشكل دوري عشان توصلكم التحديثات/);
console.log(`PASS: Research ${questions.length} MID-topic occurrences, ${answerClicks} answer clicks/revisits, immutable source keys/tables/media, original exam labels, ${midTitles.size} MID and ${finalTitles.size} empty Final lecture names, checked PDF/PowerPoint evidence, and unchanged existing subjects.`);
