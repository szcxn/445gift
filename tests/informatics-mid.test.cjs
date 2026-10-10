const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),fixture=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/informatics-mid.json'))),c={window:{}};
vm.createContext(c);
for(const m of html.matchAll(/<script src="([^"?]+)/g)){const p=path.join(root,m[1]);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),c);}
const plain=x=>JSON.parse(JSON.stringify(x)),questions=plain(c.window.GIFT445_INFORMATICS_QUESTIONS),hidden=new Set(fixture.hiddenIds);
const arabicOcr=/[\u0600-\u06ff\u0750-\u077f\ufb50-\ufdff\ufe70-\ufeff]/u;
assert.equal(questions.length,376);assert.equal(new Set(questions.map(q=>q.id)).size,376);assert.equal(hidden.size,72);
assert.equal(questions.filter(q=>q.informaticsReviewStatus==='reviewed').length,376);
assert.equal(questions.filter(q=>q.informaticsReviewStatus==='pending').length,0);
const expected=new Map(fixture.questions.map(q=>[q.id,q]));
for(const q of questions){
 assert.ok(!hidden.has(q.id));assert.equal(q.assessment,'Midterm');assert.equal(q.cycle,null);assert.ok(q.lecture&&q.lectureOrder>=1&&q.lectureOrder<=5);
 for(const [key,value] of Object.entries(expected.get(q.id)))assert.deepEqual(q[key],value,`${q.id}: source ${key} changed`);
 assert.equal(q.informaticsReviewStatus,'reviewed');assert.ok(q.informaticsEvidence.length);assert.ok(q.explanation.length>90);assert.doesNotMatch(q.explanation,/not yet been verified|verification is pending/);assert.equal(q.giftReview.interpretation,q.explanation);assert.ok(q.informaticsLectures.includes(q.lecture));
 assert.equal(q.teamworkReview.sourceSet,'Teamwork MED444');assert.equal(q.teamworkReview.reviewedSlideBySlide,true);assert.equal(q.teamworkReview.lectureId,q.lecturePlacement.lectureId);assert.doesNotMatch(q.explanation,/\bpage[s]? \d+/i);assert.doesNotMatch(q.explanation,arabicOcr);assert.doesNotMatch(q.informaticsSlideAnswer?.basis||'',arabicOcr);
 for(const e of q.informaticsEvidence){assert.equal(e.sourceSet,'Teamwork MED444');assert.match(e.lectureTitle,/^Teamwork MED444/);assert.doesNotMatch(e.quote,arabicOcr);assert.ok(e.pdfPage>=1&&e.pdfPage<=fixture.lecturePages[e.filename]);assert.equal(e.sourceSha256,fixture.lectureHashes[e.filename]);assert.ok(e.quote);assert.ok(fs.existsSync(path.join(root,e.image)));assert.ok(fs.existsSync(path.join(root,e.url.split('#')[0])));}
 for(const image of q.images)assert.ok(fs.existsSync(path.join(root,image)));
 const keys=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,keys);else assert.ok(q.giftReview.ungradedReason);
}
for(const [file,hash] of Object.entries(fixture.lectureHashes))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'lecture-media/informatics',file))).digest('hex'),hash);
assert.equal(fixture.teamworkSourceSet,'Teamwork MED444');assert.equal(fixture.teamworkReviewedCount,616);
const catalog=plain(c.window.GIFT445_INFORMATICS_CATALOG);assert.deepEqual(catalog.map(g=>g.assessment),['Midterm','Final','Final']);assert.equal(catalog[0].lectures.length,5);
for(const q of questions)assert.equal(catalog[0].lectures[q.lectureOrder-1],q.lecture);
function load(name){const start=html.indexOf(`    function ${name}(`),end=html.indexOf('\n    }\n',start)+6;assert.ok(start>=0);vm.runInContext(html.slice(start,end),c);}
for(const n of ['deduplicateQuestions','newestQuestionBatch','orderQuestionsNewestFirst','questionsFor','questionsForBatch'])load(n);
c.QUESTION_BANK=c.deduplicateQuestions([...c.window.GIFT445_QUESTIONS,...c.window.GIFT445_SURGERY_QUESTIONS,...c.window.GIFT445_COMMUNITY_QUESTIONS,...c.window.GIFT445_INFORMATICS_QUESTIONS].filter(q=>!q.excluded));
assert.equal(c.questionsFor('informatics').length,376);
assert.deepEqual(Object.fromEntries(['medicine','surgery','community'].map(s=>[s,c.questionsFor(s).length])),{medicine:1421,surgery:1212,community:432});
const ordered=c.orderQuestionsNewestFirst(c.questionsFor('informatics'),'Midterm');for(let i=1;i<ordered.length;i++)assert.ok(Number(ordered[i-1].sourceBatch)>=Number(ordered[i].sourceBatch));
const b443=c.questionsForBatch('informatics','Midterm','443');assert.equal(b443.length,40);assert.equal(b443[16].sourceLocations[0].questionNumber,null);assert.equal(b443[15].sourceLocations[0].questionNumber,16);assert.equal(b443[17].sourceLocations[0].questionNumber,18);
const r={appState:{quiz:{answers:{},questionIds:questions.map(q=>q.id),currentIndex:0},navigation:{mode:'batch',assessment:'Midterm'}},SUBJECTS:[{id:'informatics',name:'Informatics'}],QUESTION_BANK:questions,batchDisplayName:(_,b)=>`Batch ${b}`,escapeHtml:v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),persistState:()=>{},captureAnalytics:()=>{},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'test'};
vm.createContext(r);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),r);
for(const q of questions)for(const option of q.options){
 const buttons=q.options.map(o=>{const b={dataset:{option:o.id},classes:new Set(),setAttribute(){}};b.classList={toggle(name,on){if(on)b.classes.add(name);else b.classes.delete(name)}};return b;});
 r.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
 r.answerQuestion(q.id,option.id);const output=r.renderQuestion(q,0);assert.match(output,/Gift key:/);assert.ok(output.includes(r.escapeHtml(q.explanation)));assert.ok(!output.includes('AI opinion:'));
 for(const b of buttons){const correct=q.giftReview.gradingAnswers.includes(b.dataset.option),incorrect=!!q.giftReview.gradingAnswers.length&&option.id===b.dataset.option&&!correct;const match=output.match(new RegExp(`<button class="(option-button[^\"]*)"[^>]*data-option="${b.dataset.option}"`));assert.ok(match);assert.equal(b.classes.has('correct'),correct);assert.equal(b.classes.has('incorrect'),incorrect);assert.equal(/\bcorrect\b/.test(match[1]),correct);assert.equal(/\bincorrect\b/.test(match[1]),incorrect);}
}
for(const q of questions){const a=q.informaticsSlideAnswer;assert.ok(a);assert.ok(['supported','preference','unresolved'].includes(a.confidence));if(a.confidence==='unresolved')assert.equal(a.answers.length,0);for(const answer of a.answers)assert.ok(q.options.some(o=>o.id===answer&&o.text));const output=r.renderQuestion(q,0);assert.ok(output.includes(r.escapeHtml(a.basis)));}
for(const [batch,number,answer,confidence] of [['443',1,'A','supported'],['443',25,'A','supported'],['443',11,'B','preference'],['434',16,'A','preference'],['435',11,'B','preference']]){const q=questions.find(q=>q.sourceBatch===batch&&q.sourceLocations[0].questionNumber===number);assert.deepEqual(q.informaticsSlideAnswer.answers,[answer]);assert.equal(q.informaticsSlideAnswer.confidence,confidence);assert.ok(!q.giftReview.gradingAnswers.includes(answer));}
assert.match(html,/Informatics added/);assert.match(html,/2026-10-08/);
load('openLecture');let opened=null;c.openQuestionSet=(title,items)=>{opened=plain(items)};c.isQuestionAvailableInLecture=()=>true;
c.openLecture('informatics',null,'AI in Healthcare');assert.equal(opened.length,17);assert.equal(new Set(opened.map(q=>q.id)).size,17);assert.equal(opened.filter(q=>q.lecture==='AI in Healthcare').length,17);
const both=questions.filter(q=>q.informaticsLectures.some(l=>['AI in Healthcare','Clinical Decision Support'].includes(l)));assert.equal(both.length,79);assert.equal(new Set(both.map(q=>q.id)).size,79);
assert.equal(questions.filter(q=>q.informaticsEvidenceStatus==='direct').length,249);assert.equal(questions.filter(q=>q.informaticsEvidenceStatus==='related').length,127);
const ehr=questions.filter(q=>q.teamworkReview.lectureId==='E');assert.equal(ehr.length,98);assert.equal(ehr.filter(q=>q.informaticsSlideAnswer.confidence==='supported').length,57);assert.equal(ehr.filter(q=>q.informaticsSlideAnswer.confidence==='preference').length,10);assert.equal(ehr.filter(q=>q.informaticsSlideAnswer.confidence==='unresolved').length,31);
for(const q of questions)for(const e of q.informaticsEvidence)assert.ok(['direct','related'].includes(e.supportRole));
// Render the actual subject route to catch template-scope errors in cards and counts.
for(const name of ['openSubject','questionsForAssessment','batchCountLabel','questionCountLabel','isQuestionAvailableInLecture','batchDisplayName'])load(name);
c.SUBJECTS=[{id:'medicine',name:'Medicine'},{id:'surgery',name:'Surgery'},{id:'community',name:'Community Medicine'},{id:'informatics',name:'Informatics'}];c.CYCLE_ORDER=[];c.captureAnalytics=()=>{};c.workspaceHeader=t=>t;c.escapeHtml=v=>String(v??'');c.bindWorkspaceClose=()=>{};c.persistState=()=>{};c.renderResumePanel=()=>{};c.appState={navigation:{},quiz:{answers:{}}};
c.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};
for(const subject of c.SUBJECTS){c.openSubject(subject.id);assert.ok(c.workspaceElement.innerHTML.includes(subject.name));if(subject.id==='informatics'){assert.match(c.workspaceElement.innerHTML,/17 questions/);assert.ok(c.workspaceElement.innerHTML.includes('data-lecture-assessment="Final"'));}}
console.log('PASS: 376 Midterm occurrences, 72 excluded IDs, five ordered lectures, 376 individual slide reviews, original sources/assets/keys, neutral defects, click/reload grading, original batch ordering, and existing subject counts.');

for(const q of questions)if(q.informaticsLectures.includes('AI in Healthcare'))assert.equal(q.lecture,'AI in Healthcare');
