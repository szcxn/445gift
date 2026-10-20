const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/batch-source-repairs.json')));
const live={window:{}};vm.createContext(live);
for(const m of html.matchAll(/<script src="([^"?]+)/g))vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),live);
const plain=x=>JSON.parse(JSON.stringify(x));
function load(name){const a=html.indexOf(`    function ${name}(`),b=html.indexOf('\n    }\n',a)+6;assert.ok(a>=0,name);vm.runInContext(html.slice(a,b),live);}
for(const name of ['deduplicateQuestions','questionsFor','questionsForBatch','batchCountLabel','questionCountLabel','questionsForAssessment','isQuestionAvailableInLecture','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openLecture','openCollection','openSubject','batchDisplayName'])load(name);
const imported=Object.values(live.window).filter(Array.isArray).flat().filter(q=>q&&q.id&&q.subjectId&&!q.excluded);
const before=JSON.stringify(imported);
const start=html.indexOf('    const QUESTION_BANK ='),end=html.indexOf('\n\n',start);
vm.runInContext(html.slice(start,end).replace('const QUESTION_BANK','QUESTION_BANK'),live);
assert.equal(JSON.stringify(imported),before,'Occurrence repair must not mutate the historical import layers');
assert.equal(new Set(live.QUESTION_BANK.map(q=>q.id)).size,live.QUESTION_BANK.length);
const byId=new Map(live.QUESTION_BANK.map(q=>[q.id,q]));
assert.deepEqual(Object.fromEntries(['medicine','surgery','community','informatics','research','radiology'].map(s=>[s,live.questionsFor(s).length])),{medicine:1427,surgery:1214,community:635,informatics:807,research:640,radiology:663});
const locations=qs=>qs.flatMap(q=>(q.sourceLocations||[]).map(l=>JSON.stringify([q.subjectId,l.assessment,l.batch,l.questionNumber,l.paragraphIndex]))).sort();
assert.deepEqual(locations(Array.from(live.QUESTION_BANK).filter(q=>!q.batchOnly)),locations(imported),'Reviewed lecture practice source occurrences changed');
for(const repair of fixture.repairs){
 const original=byId.get(repair.baseId),variant=byId.get(repair.variantId);assert.ok(original&&variant);assert.equal(variant.sourceOccurrenceVariantOf,original.id);
 for(const [i,q]of [original,variant].entries()){
  const expected=repair.expected[i],native=repair.occurrences[i];
  for(const key of ['stem','options','sourceAnswer','sourceAnswerNote','sourceLocations','sourceOccurrenceIntegrity'])assert.deepEqual(plain(q[key]),expected[key],`${q.id}: ${key}`);
  assert.ok(native.paragraphs[0].text.includes(expected.stem));
  assert.ok(native.paragraphs.some(p=>p.text.trim()===`Answer: ${q.sourceAnswer||''}`.trim()||p.text.trim()===`Answer:${q.sourceAnswer||''}`.trim()));
 }
 if(variant.medicineReview||variant.surgeryReview){
  const review=variant.medicineReview||variant.surgeryReview;assert.ok(review.explanation.length>100);assert.ok(review.evidence?.image);assert.ok(fs.existsSync(path.join(root,review.evidence.image)));
  assert.deepEqual(plain(variant.giftReview.gradingAnswers),variant.sourceAnswer?[variant.sourceAnswer]:[]);
  if(!variant.sourceAnswer)assert.match(variant.giftReview.ungradedReason,/No Gift answer/);
 }
 const loc=variant.sourceLocations[0];assert.ok(live.questionsForBatch(variant.subjectId,loc.assessment,loc.batch).some(q=>q.sourceLocations.some(l=>l.questionNumber===loc.questionNumber)&&JSON.stringify(q.options.map(o=>[o.id,o.text]))===JSON.stringify(variant.options.map(o=>[o.id,o.text]))));
}
assert.equal(byId.get('medicine-final-442-infectious-diseases-q039').sourceAnswer,'A');
assert.equal(byId.get('medicine-source-442-final-q044').sourceAnswer,'B');
assert.equal(byId.get('medicine-source-442-final-q044').options[1].text,'Meningovascular disease');
assert.equal(byId.get('medicine-source-438-midterm-q057').sourceAnswer,'C');
assert.equal(byId.get('medicine-source-438-midterm-q057').options[2].text,'cerebrovascular disease');
assert.equal(byId.get('medicine-source-436-midterm-q081').options.length,4);
for(const id of ['surgery-source-437-final-q048','surgery-source-437-final-q088'])assert.equal(byId.get(id).sourceAnswer,null,'A blank Gift key must not inherit the other occurrence key');
assert.equal(live.questionsForBatch('medicine','Midterm','438').length,60);
assert.equal(live.questionsForBatch('medicine','Midterm','436').length,85);
assert.equal(live.questionsForBatch('medicine','Final','442').length,80);
assert.equal(live.questionsForBatch('surgery','Final','437').length,91);
live.SUBJECTS=['medicine','surgery','community','informatics','research','radiology'].map(id=>({id,name:id}));live.CYCLE_ORDER=[];
for(const name of ['captureAnalytics','renderQuestionSetView','persistState','renderResumePanel','bindWorkspaceClose'])live[name]=()=>{};live.quizAnalyticsProperties=()=>({});live.workspaceHeader=t=>t;live.escapeHtml=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
live.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};
live.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};
for(const subject of ['research','radiology','community']){
 live.openSubject(subject);const menu=live.workspaceElement.innerHTML;
 assert.match(menu,/By Batch includes the complete original banks/);assert.match(menu,/data-mode="assessment" data-assessment="Final" disabled/);
 const rows=fixture.sourceCounts[subject];assert.equal([...menu.matchAll(/class="route-card batch-card"/g)].length,rows.length);
 for(const row of rows){const n=live.questionsForBatch(subject,row.assessment,row.batch).length;assert.equal(n,row.count);assert.equal(live.batchCountLabel(subject,row.assessment,row.batch),`${n} questions · Original batch`);const pattern=new RegExp(`<button class="route-card batch-card"[^>]*data-assessment="${row.assessment}" data-batch="${row.batch}"[^>]*>`);const card=menu.match(pattern)?.[0];assert.ok(card);assert.equal(card.includes('disabled'),false);}
 const finalNames=live.window[`GIFT445_${subject.toUpperCase()}_CATALOG`].filter(g=>g.assessment==='Final').flatMap(g=>g.lectures);
 for(const lecture of finalNames)assert.equal(live.questionsFor(subject).filter(q=>q.lecture===lecture&&live.isQuestionAvailableInLecture(q,subject)).length,0);
}
assert.equal(live.batchCountLabel('research','Final','442'),'39 questions · Original batch');
assert.equal(live.batchCountLabel('radiology','Final','436'),'31 questions · Original batch');
// Existing IDs and saved answers survive the source repair; new copies store answers independently.
const savedId=fixture.repairs[0].baseId,variantId=fixture.repairs[0].variantId;
live.appState={navigation:{},quiz:{questionIds:[savedId,variantId],currentIndex:0,answers:{[savedId]:'D',[variantId]:'C'},flagged:[savedId]}};
const answers=live.appState.quiz.answers,flags=live.appState.quiz.flagged;
live.openQuestionSet('Saved',[byId.get(savedId),byId.get(variantId)],{subjectId:'medicine',mode:'batch',assessment:'Midterm',batch:'438'},true);
assert.equal(live.appState.quiz.questionIds[0],savedId);assert.equal(live.appState.quiz.answers,answers);assert.equal(live.appState.quiz.flagged,flags);
for(const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
console.log('PASS: five original question variants restored with native DOCX options and keys; blank keys remain ungraded; original source locations and saved IDs conserved; all six subjects have audited batch counts; MID-only lecture scope retained.');
