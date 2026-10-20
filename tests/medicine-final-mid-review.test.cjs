const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const plain=value=>JSON.parse(JSON.stringify(value));
function imported(skip=false){const c={window:{}};vm.createContext(c);for(const m of html.matchAll(/<script src="([^"?]+)/g)){if(skip&&m[1]==='medicine-final-mid-review.js')continue;const p=path.join(root,m[1]);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),c);}return c;}
const before=imported(true),live=imported(),old=plain(before.window.GIFT445_QUESTIONS),questions=plain(live.window.GIFT445_QUESTIONS),byId=new Map(questions.map(q=>[q.id,q]));
const f=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/medicine-final-mid-review.json'),'utf8'));
assert.equal(f.sourceOccurrences,765);assert.equal(f.scannedCanonicalQuestions,750);
assert.equal(questions.length,old.length+3);assert.equal(byId.size,questions.length);
const selected=f.selectedIds.map(id=>byId.get(id));assert.equal(selected.length,f.linkedFinalQuestions);
const oldById=new Map(old.map(q=>[q.id,q]));
for(const q of [...old,...f.variants]){
 const expected={...q,...f.corrections[q.id]},actual=plain(byId.get(q.id));
 if(f.selectedIds.includes(q.id))for(const key of ['cycle','lecture','lectureOrder','medicineMidLecture','medicineReview','medicineSourceIntegrity','giftReview']){
  if(key in expected)actual[key]=expected[key];else delete actual[key];
 }
 assert.deepEqual(actual,expected,`Unapproved change to question, source key, MID review or progress ID: ${q.id}`);
}
for(const key of ['GIFT445_SURGERY_QUESTIONS','GIFT445_COMMUNITY_QUESTIONS','GIFT445_INFORMATICS_QUESTIONS','GIFT445_INFORMATICS_FINAL_QUESTIONS'])assert.deepEqual(plain(live.window[key]),plain(before.window[key]),key);
const actualOccurrences=questions.flatMap(q=>(q.sourceLocations||[]).filter(l=>l.assessment==='Final').map(l=>({id:q.id,batch:String(l.batch),questionNumber:l.questionNumber})));
assert.deepEqual(actualOccurrences.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))),f.finalOccurrences.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))));
assert.equal(new Set(actualOccurrences.map(l=>`${l.batch}:${l.questionNumber}`)).size,765);
const sources=new Map(JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/medicine-mid-study-review.json'))).sources.map(s=>[s.id,s]));
for(const q of selected){
 for(const [key,value] of Object.entries(f.expectedSources[q.id]))assert.deepEqual(q[key],value,`${q.id}: ${key}`);
 assert.equal(q.assessment,'Final');assert.deepEqual(q.medicineMidLecture,{cycle:q.cycle,lecture:q.lecture});
 assert.equal(q.medicineSourceIntegrity.docxSha256,f.sourceSha256);
 const keys=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 for(const source of q.medicineSourceIntegrity.sources)assert.deepEqual([...source.answers].sort(),[...keys].sort(),`${q.id}: exam key changed`);
 assert.equal(q.giftReview.policy,'gift-key-first');
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,keys);else assert.ok(q.giftReview.ungradedReason);
 const review=q.medicineReview;assert.ok(review.explanation.length>=80);assert.doesNotMatch(JSON.stringify(review),/[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
 assert.ok(['supported','preference','unresolved'].includes(review.confidence));
 for(const answer of review.answers)assert.ok(q.options.some(o=>o.id===answer&&o.text.trim()),q.id);
 if(review.basis==='lecture')assert.equal(review.evidence?.relation,'teaching',q.id);
 if(review.evidence){const e=review.evidence,s=sources.get(e.pdfId);assert.ok(s);assert.equal(e.sourceSha256,s.sha256);assert.ok(e.page>0&&e.page<=s.pageCount);assert.ok(e.quote.trim());const bytes=fs.readFileSync(path.join(root,e.image));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),e.imageSha256);}
}
function load(name,c=live){const start=html.indexOf(`    function ${name}(`),end=html.indexOf('\n    }\n',start)+6;assert.ok(start>=0,name);vm.runInContext(html.slice(start,end),c);}
for(const name of ['deduplicateQuestions','questionsFor','isQuestionAvailableInLecture','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openLecture','openCycleQuestions','questionsForBatch','questionsForAssessment'])load(name);
live.QUESTION_BANK=live.deduplicateQuestions(questions);live.SUBJECTS=[{id:'medicine',name:'Medicine'}];live.captureAnalytics=()=>{};live.quizAnalyticsProperties=()=>({});live.renderQuestionSetView=()=>{};live.persistState=()=>{};live.renderResumePanel=()=>{};
assert.equal(live.QUESTION_BANK.length,1424,'Exam-key variants must survive duplicate filtering');
assert.equal(live.questionsForAssessment('medicine','Midterm').length,687,'Only lecture practice is extended');
assert.equal(live.questionsForAssessment('medicine','Final').length,751);
for(const q of selected){
 assert.ok(live.isQuestionAvailableInLecture(q,'medicine'),q.id);
 live.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};
 live.openLecture('medicine',q.cycle,q.lecture);assert.ok(live.appState.quiz.questionIds.includes(q.id),q.id);
 live.openCycleQuestions('medicine',q.cycle,false,'Midterm');assert.ok(live.appState.quiz.questionIds.includes(q.id),q.id);
 for(const loc of q.sourceLocations)assert.ok(live.questionsForBatch('medicine',loc.assessment,loc.batch).some(item=>item.id===q.id),q.id);
}
for(const q of questions.filter(q=>q.assessment==='Final'&&!q.medicineMidLecture&&['Cardiology','Pulmonology','Nephrology','Gastroenterology'].includes(q.cycle)))assert.equal(live.isQuestionAvailableInLecture(q,'medicine'),false,'Unmatched old labels must not leak into reviewed MID lectures');
const renderer={appState:{quiz:{answers:{},questionIds:selected.map(q=>q.id),currentIndex:0},navigation:{mode:'lecture-mix',assessment:null}},SUBJECTS:[{id:'medicine',name:'Medicine'}],QUESTION_BANK:questions,batchDisplayName:(_,b)=>`Batch ${b}`,escapeHtml:v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),persistState(){},captureAnalytics(){},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'test'};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);
for(const q of selected)for(const option of q.options){
 const buttons=q.options.map(o=>{const b={dataset:{option:o.id},classes:new Set(),setAttribute(){}};b.classList={toggle(name,on){if(on)b.classes.add(name);else b.classes.delete(name)}};return b;});
 renderer.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
 renderer.answerQuestion(q.id,option.id);const output=renderer.renderQuestion(q,0,selected.length);
 assert.match(output,/Final · Batch/);assert.match(output,/Gift answer:/);assert.ok(output.includes(renderer.escapeHtml(q.medicineReview.explanation)));assert.doesNotMatch(output,/AI opinion:|Tentative interpretation:|Management focus:/);
 if(q.medicineReview.evidence){assert.ok(output.includes(renderer.escapeHtml(q.medicineReview.evidence.quote)));assert.ok(output.includes(renderer.escapeHtml(q.medicineReview.evidence.image)));}
 for(const button of buttons)assert.equal(button.classes.has('correct'),q.giftReview.gradingAnswers.includes(button.dataset.option));
 renderer.appState.quiz.answers=plain(renderer.appState.quiz.answers);assert.equal(renderer.renderQuestion(q,0,selected.length),output);
}
// Regression: each exam retains its own original key and option positions.
assert.equal(byId.get('medicine-final-442-nephrology-q008').sourceAnswer,'B');assert.equal(byId.get('medicine-final-438-nephrology-q016').sourceAnswer,'C');
assert.deepEqual(byId.get('medicine-midterm-434-pulmonary-q028').giftReview,oldById.get('medicine-midterm-434-pulmonary-q028').giftReview);
assert.equal(byId.get('medicine-final-434-pulmonary-q054').sourceAnswer,'A');assert.deepEqual(byId.get('medicine-final-434-pulmonary-q054').medicineReview.answers,['A']);
assert.match(byId.get('medicine-final-434-pulmonary-q054').options.find(o=>o.id==='A').text,/intensive care unit/i);
assert.equal(byId.get('medicine-final-431-nephrology-q040').sourceAnswer,null);assert.deepEqual(byId.get('medicine-final-431-nephrology-q040').giftReview.gradingAnswers,[]);
assert.equal(byId.get('medicine-final-431-hematology-oncology-q042').options.find(o=>o.id==='B').text,'Fat droplets in urine microscopy');
assert.equal(byId.get('medicine-final-439-endocrinology-q023').sourceAnswer,'B','Rejected choices in an explanatory note are not additional Gift keys');
assert.equal(byId.get('medicine-final-432-endocrinology-q032').sourceAnswer,null,'An empty original answer must not acquire an imported key');
assert.deepEqual(byId.get('medicine-final-437-endocrinology-q031').sourceAnswer,['A','B']);
assert.deepEqual(byId.get('medicine-final-434-hematology-oncology-q048').medicineReview.answers,['A']);
assert.deepEqual(byId.get('medicine-final-432-endocrinology-q028').medicineReview.answers,['A','C']);
const blank=byId.get('medicine-final-443-cardiology-q001');delete renderer.appState.quiz.answers[blank.id];
const blankOutput=renderer.renderQuestion(blank,0);assert.match(blankOutput,/answer-panel visible/);assert.doesNotMatch(blankOutput,/class="option-button/);assert.match(blankOutput,/Not scored:/);
assert.match(html, /Previous update:<\/strong> Informatics added/);
console.log(`PASS: ${selected.length} individually reviewed Final questions in matching MID lectures; all765 source occurrences conserved, three exam-key variants separated, original options restored, all-choice Gift grading/reload, mixed exam labels, source assets, existing MID reviews and other subjects preserved.`);
