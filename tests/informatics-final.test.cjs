const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),c={window:{}},plain=x=>JSON.parse(JSON.stringify(x));vm.createContext(c);
for(const m of html.matchAll(/<script src="([^"?]+)/g)){const p=path.join(root,m[1]);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),c);}
const final=plain(c.window.GIFT445_INFORMATICS_FINAL_QUESTIONS),mid=plain(c.window.GIFT445_INFORMATICS_QUESTIONS),fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/informatics-final.json')));
assert.equal(final.length,431);assert.equal(new Set(final.map(q=>q.id)).size,431);
assert.deepEqual(Object.fromEntries(Object.keys(fixture.batchCounts).map(b=>[b,final.filter(q=>q.sourceBatch===b).length])),fixture.batchCounts);
assert.equal(final.filter(q=>q.informaticsReviewStatus==='reviewed').length,240);assert.equal(final.filter(q=>q.informaticsReviewStatus==='deferred').length,191);
for(const [i,q] of final.entries()){
 for(const [key,value] of Object.entries(fixture.questions[i]))assert.deepEqual(q[key],value,`${q.id}: source field ${key}`);
 assert.equal(q.assessment,'Final');assert.ok(q.sourceLocations.every(l=>l.assessment==='Final'&&l.batch===q.sourceBatch));
 assert.equal(q.sourceLabel,'Gift Informatics Final');assert.ok(q.informaticsLectures.includes(q.lecture));
 const keys=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,keys);else assert.ok(q.giftReview.ungradedReason);
 if(q.informaticsReviewStatus==='reviewed'){
  assert.ok(q.informaticsPracticeScopes.includes('Midterm'));assert.ok(q.explanation.length>90);assert.equal(q.explanation,q.giftReview.interpretation);assert.ok(q.informaticsEvidence.length);
  assert.equal(q.teamworkReview.sourceSet,'Teamwork MED444');assert.equal(q.teamworkReview.reviewedSlideBySlide,true);assert.doesNotMatch(q.explanation,/\bpage[s]? \d+/i);
  for(const e of q.informaticsEvidence){assert.equal(e.sourceSet,'Teamwork MED444');assert.match(e.lectureTitle,/^Teamwork MED444/);assert.ok(e.quote&&e.sourceSha256);assert.ok(fs.existsSync(path.join(root,e.image)));assert.ok(fs.existsSync(path.join(root,e.url.split('#')[0])));}
 }else{assert.equal(q.explanation,'');assert.equal(q.giftReview.interpretation,'');assert.equal(q.informaticsEvidence.length,0);assert.ok(!q.informaticsSlideAnswer);assert.ok(!q.teamworkReview);}
 for(const image of q.images)assert.ok(fs.existsSync(path.join(root,image)));
}
function load(name){const start=html.indexOf(`    function ${name}(`),end=html.indexOf('\n    }\n',start)+6;assert.ok(start>=0);vm.runInContext(html.slice(start,end),c);}
for(const n of ['deduplicateQuestions','newestQuestionBatch','orderQuestionsNewestFirst','questionsFor','questionsForBatch','questionsForAssessment','gradingAnswersForQuestion'])load(n);
c.QUESTION_BANK=c.deduplicateQuestions([...c.window.GIFT445_QUESTIONS,...c.window.GIFT445_SURGERY_QUESTIONS,...c.window.GIFT445_COMMUNITY_QUESTIONS,...mid,...final].filter(q=>!q.excluded));
assert.equal(c.questionsFor('informatics').length,807);assert.equal(c.questionsForAssessment('informatics','Midterm').length,616);assert.equal(c.questionsForAssessment('informatics','Final').length,431);
assert.deepEqual(Object.fromEntries(['medicine','surgery','community'].map(s=>[s,c.questionsFor(s).length])),{medicine:1421,surgery:1212,community:432});
const b436=plain(c.questionsForBatch('informatics','Final','436'));assert.equal(b436.length,31);
for(const n of [20,21,22,23,24])assert.equal(b436.filter(q=>q.sourceLocations[0].questionNumber===n).length,2);
for(let i=1;i<b436.length;i++)assert.ok(b436[i].referenceOrder>b436[i-1].referenceOrder);
assert.ok(!final.some(q=>q.sourceBatch==='438'&&[22,23].includes(q.sourceLocations[0].questionNumber)));
const find=(b,n)=>final.find(q=>q.sourceBatch===b&&q.sourceLocations[0].questionNumber===n);
for(const [b,n,gift,slide] of [['443',9,'B','C'],['442',23,'C','A'],['438',30,'B','D']]){const q=find(b,n);assert.equal(q.sourceAnswer,gift);assert.deepEqual(plain(c.gradingAnswersForQuestion(q)),[gift]);assert.deepEqual(q.informaticsSlideAnswer.answers,[slide]);}
assert.equal(find('435',20).images.length,0);assert.match(find('435',21).images[0],/confusion-table/);assert.match(find('442',22).sourceIssues.join(' '),/no corresponding image/);
const resources=plain(c.window.GIFT445_INFORMATICS_FINAL_LECTURES);assert.deepEqual(resources.map(r=>r.lectureOrder),[6,7,8,9]);assert.ok(resources.every(r=>r.url.startsWith('https://drive.google.com/')));
const r={appState:{quiz:{answers:{},questionIds:final.map(q=>q.id),currentIndex:0},navigation:{mode:'lecture-mix',assessment:'Midterm'}},SUBJECTS:[{id:'informatics',name:'Informatics'}],QUESTION_BANK:final,batchDisplayName:(_,b)=>`Batch ${b}`,escapeHtml:v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),persistState:()=>{},captureAnalytics:()=>{},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'test'};
vm.createContext(r);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),r);
for(const q of final)for(const option of q.options){
 const buttons=q.options.map(o=>{const b={dataset:{option:o.id},classes:new Set(),setAttribute(){}};b.classList={toggle(name,on){if(on)b.classes.add(name);else b.classes.delete(name)}};return b;});
 r.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
 r.answerQuestion(q.id,option.id);const output=r.renderQuestion(q,0);assert.match(output,/Final · Gift Informatics Final · Batch/);assert.match(output,/Gift key:/);assert.ok(!output.includes('AI opinion:'));
 if(q.informaticsReviewStatus==='deferred'){assert.match(output,/Explanation deferred/);assert.ok(!output.includes('Slide evidence:'));assert.ok(!output.includes('Explanation:'));}else assert.ok(output.includes(r.escapeHtml(q.explanation)));
 for(const b of buttons){assert.equal(b.classes.has('correct'),q.giftReview.gradingAnswers.includes(b.dataset.option));assert.equal(b.classes.has('incorrect'),!!q.giftReview.gradingAnswers.length&&option.id===b.dataset.option&&!q.giftReview.gradingAnswers.includes(b.dataset.option));}
}
for(const name of ['openSubject','batchCountLabel','questionCountLabel','isQuestionAvailableInLecture','batchDisplayName'])load(name);
c.SUBJECTS=[{id:'informatics',name:'Informatics'}];c.CYCLE_ORDER=[];c.captureAnalytics=()=>{};c.workspaceHeader=t=>t;c.escapeHtml=v=>String(v??'');c.bindWorkspaceClose=()=>{};c.persistState=()=>{};c.renderResumePanel=()=>{};c.appState={navigation:{},quiz:{answers:{}}};c.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};
c.openSubject('informatics');assert.match(c.workspaceElement.innerHTML,/data-lecture-assessment="Final"/);assert.match(c.workspaceElement.innerHTML,/Waiting for Lecture Files/);assert.match(c.workspaceElement.innerHTML,/616 questions/);assert.match(c.workspaceElement.innerHTML,/431 questions/);assert.doesNotMatch(c.workspaceElement.innerHTML,/Final Lecture Files|Open original lecture/);
console.log('PASS: 431 original Final occurrences, 240 Midterm-linked individual reviews, 191 deferred explanations, original assessment/batch/key conservation, repeated numbering, slide conflicts, images, all-choice grading, 616 Midterm practice and 4 ordered Final lecture files.');

const ai=[...mid,...final].filter(q=>q.informaticsLectures.includes('AI in Healthcare'));assert.equal(ai.length,23);assert.ok(ai.every(q=>q.lecture==='AI in Healthcare'));
