const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const c = {window:{}}; vm.createContext(c);
for(const m of html.matchAll(/<script src="([^"?]+)(?:\?[^" ]*)?"><\/script>/g)) if(fs.existsSync(path.join(root,m[1]))) vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),c);
// Capture the complete imported content before any display ordering is performed.
const originalContent = JSON.stringify(c.window);
function loadFunction(name) {
 const start = html.indexOf(`    function ${name}(`); assert.ok(start>=0,name);
 const end = html.indexOf('\n    }\n',start)+6;
 vm.runInContext(html.slice(start,end),c);
}
for(const name of ['deduplicateQuestions','newestQuestionBatch','orderQuestionsNewestFirst','questionsFor','isQuestionAvailableInLecture','openLecture','openCycleQuestions','questionsForBatch','questionsForAssessment','openCollection','openQuestionSet']) loadFunction(name);
c.QUESTION_BANK=c.deduplicateQuestions([...c.window.GIFT445_QUESTIONS,...c.window.GIFT445_SURGERY_QUESTIONS,...c.window.GIFT445_COMMUNITY_QUESTIONS].filter(q=>!q.excluded));
c.SUBJECTS=['medicine','surgery','community'].map(id=>({id,name:id}));
c.captureAnalytics=()=>{};c.quizAnalyticsProperties=()=>({});c.renderQuestionSetView=()=>{};c.persistState=()=>{};c.renderResumePanel=()=>{};c.batchDisplayName=(_,b)=>`Batch ${b}`;
const plain=value=>JSON.parse(JSON.stringify(value));
const sortedIds=value=>Array.from(value,q=>q.id).sort();
const counts=Object.fromEntries(c.SUBJECTS.map(s=>[s.id,c.questionsFor(s.id).length]));
assert.deepEqual(counts,{medicine:1421,surgery:1212,community:432});
function reset() {c.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[],mode:null}};}
function verifySet(input,assessment=null) {
 const unchanged=JSON.stringify(input);
 const ordered=c.orderQuestionsNewestFirst(input,assessment);
 assert.notEqual(ordered,input,'Must sort a copy');
 assert.equal(JSON.stringify(input),unchanged,'Input questions changed');
 assert.deepEqual(sortedIds(ordered),sortedIds(input),'Question lost or duplicated');
 assert.equal(new Set(ordered.map(q=>q.id)).size,input.length);
 for(let i=1;i<ordered.length;i++) assert.ok(c.newestQuestionBatch(ordered[i-1],assessment)>=c.newestQuestionBatch(ordered[i],assessment),'Batches out of descending order');
 for(const batch of new Set(ordered.map(q=>c.newestQuestionBatch(q,assessment)))) assert.deepEqual(Array.from(ordered).filter(q=>c.newestQuestionBatch(q,assessment)===batch).map(q=>q.id),input.filter(q=>c.newestQuestionBatch(q,assessment)===batch).map(q=>q.id),'Within-batch order changed');
 return Array.from(ordered);
}
let checkedSets=0;
for(const subject of c.SUBJECTS) {
 const questions=Array.from(c.questionsFor(subject.id));verifySet(questions);checkedSets++;
 reset();c.openCollection(subject.id,'all');assert.deepEqual(plain(c.appState.quiz.questionIds),verifySet(questions).map(q=>q.id));
 for(const assessment of ['Midterm','Final']) {
  const set=Array.from(c.questionsForAssessment(subject.id,assessment));verifySet(set,assessment);checkedSets++;
  if(set.length) {reset();c.openCollection(subject.id,'assessment',assessment);assert.deepEqual(plain(c.appState.quiz.questionIds),verifySet(set,assessment).map(q=>q.id));}
 }
 for(const cycle of new Set(questions.map(q=>q.cycle).filter(Boolean))) {
  const set=questions.filter(q=>q.cycle===cycle);verifySet(set);checkedSets++;
  reset();c.openCycleQuestions(subject.id,cycle);assert.deepEqual(sortedIds(set),plain(c.appState.quiz.questionIds).sort());
  for(const assessment of ['Midterm','Final']) {
   const subset=set.filter(q=>q.assessment===assessment);if(!subset.length)continue;
   reset();c.openCycleQuestions(subject.id,cycle,false,assessment);const shown=Array.from(c.appState.quiz.questionIds,id=>c.QUESTION_BANK.find(q=>q.id===id));verifySet(shown,assessment);assert.deepEqual(sortedIds(subset),plain(c.appState.quiz.questionIds).sort());checkedSets++;
  }
 }
 for(const lecture of new Set(questions.map(q=>q.lecture).filter(Boolean))) {
  const set=questions.filter(q=>q.lecture===lecture && c.isQuestionAvailableInLecture(q,subject.id));if(!set.length)continue;
  verifySet(set);checkedSets++;reset();c.openLecture(subject.id,null,lecture);
  const shown=Array.from(c.appState.quiz.questionIds,id=>c.QUESTION_BANK.find(q=>q.id===id));verifySet(shown);assert.deepEqual(sortedIds(set),plain(c.appState.quiz.questionIds).sort());
 }
 const batches=new Map(questions.flatMap(q=>(q.sourceLocations||[]).map(l=>[`${l.assessment}|${l.batch}`,l])));
 for(const l of batches.values()) {
  const set=Array.from(c.questionsForBatch(subject.id,l.assessment,l.batch));if(!set.length)continue;
  reset();c.openCollection(subject.id,'batch',l.assessment,l.batch);assert.deepEqual(plain(c.appState.quiz.questionIds),set.map(q=>q.id),'Batch-specific question order changed');checkedSets++;
 }
}
const repeated={id:'repeat',assessment:'Midterm',sourceBatch:'435',sourceLocations:[{batch:'443',assessment:'Midterm'},{batch:'444',assessment:'Final'}]};
assert.equal(c.newestQuestionBatch(repeated),444);
assert.equal(c.newestQuestionBatch(repeated,'Midterm'),443);
assert.equal(c.newestQuestionBatch(repeated,'Final'),444);
assert.equal(c.newestQuestionBatch({sourceBatch:'unknown',sourceLocations:[{batch:''},{batch:'not a batch'}]}),-1);
const synthetic=[{id:'old',sourceBatch:'430'},{id:'new',sourceBatch:'444'},{id:'unknown'}];
assert.deepEqual(plain(c.orderQuestionsNewestFirst(synthetic)).map(q=>q.id),['new','old','unknown']);
// Reordering a saved quiz must retain the current question, answers, and flags.
reset();c.appState.quiz={questionIds:['old','new','unknown'],currentIndex:0,answers:{old:'C',new:'A'},flagged:['old'],mode:'saved'};
const answers=c.appState.quiz.answers,flags=c.appState.quiz.flagged;
c.openQuestionSet('Saved',synthetic,{subjectId:'medicine',mode:'all',assessment:null},true);
assert.equal(c.appState.quiz.questionIds[c.appState.quiz.currentIndex],'old');assert.equal(c.appState.quiz.currentIndex,1);
assert.equal(c.appState.quiz.answers,answers);assert.equal(c.appState.quiz.flagged,flags);
// Starting a new set starts at the newest batch; deliberately shuffled sets stay shuffled.
reset();c.openQuestionSet('New',synthetic,{subjectId:'medicine',mode:'all'},false);assert.equal(c.appState.quiz.currentIndex,0);assert.equal(c.appState.quiz.questionIds[0],'new');
reset();c.openQuestionSet('Mixed',synthetic,{subjectId:'medicine',mode:'lecture-mix'},false);assert.deepEqual(plain(c.appState.quiz.questionIds),['old','new','unknown']);
assert.equal(JSON.stringify(c.window),originalContent,'Imported questions, keys, explanations, citations, tables, or images changed');
for(const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
console.log(`PASS: newest-batch order in ${checkedSets} real question sets; all 3,065 displayed question IDs/content preserved (Medicine 1,421, Surgery 1,212, Community 432); within-batch and shuffled order retained; saved current question, answers and flags survive reordering.`);
