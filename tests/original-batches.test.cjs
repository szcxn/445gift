const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/original-batches.json'))),c={window:{}};vm.createContext(c);
for(const m of html.matchAll(/<script src="([^"?]+)/g))vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),c);
function load(name){const a=html.indexOf(`    function ${name}(`),b=html.indexOf('\n    }\n',a)+6;assert.ok(a>=0,name);vm.runInContext(html.slice(a,b),c);}
for(const n of ['deduplicateQuestions','questionsFor','questionsForBatch','questionsForAssessment','isQuestionAvailableInLecture','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openCollection','batchDisplayName'])load(n);
const start=html.indexOf('    const QUESTION_BANK ='),end=html.indexOf('\n\n',start);vm.runInContext(html.slice(start,end).replace('const QUESTION_BANK','QUESTION_BANK'),c);
const plain=v=>JSON.parse(JSON.stringify(v)),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const canonical=v=>v===null?'null':Array.isArray(v)?'['+v.map(canonical).join(', ')+']':typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+': '+canonical(v[k])).join(', ')+'}':JSON.stringify(v);
const byId=new Map(c.QUESTION_BANK.map(q=>[q.id,q]));assert.equal(byId.size,c.QUESTION_BANK.length);assert.equal(c.QUESTION_BANK.filter(q=>q.batchOnly).length,fixture.additionalBatchRecords);
assert.deepEqual(Object.fromEntries(Object.keys(fixture.counts).map(s=>[s,c.questionsFor(s).map(q=>q.id).length])),{research:640,radiology:663,community:635,informatics:807,medicine:1427,surgery:1214});
assert.deepEqual(Array.from(c.QUESTION_BANK).filter(q=>!q.batchOnly).map(q=>q.id).sort(),fixture.studyIds.slice().sort(),'Lecture study IDs changed while restoring original batches');
let checkedSets=0,total=0;
c.SUBJECTS=Object.keys(fixture.counts).map(id=>({id,name:id}));for(const n of ['captureAnalytics','persistState','renderQuestionSetView','renderResumePanel'])c[n]=()=>{};c.quizAnalyticsProperties=()=>({});
load('renderSubjects');load('questionCountLabel');c.subjectsElement={innerHTML:''};c.document={querySelectorAll:()=>[]};c.renderSubjects();
for(const n of Object.values(fixture.counts))assert.ok(c.subjectsElement.innerHTML.includes(`${n} questions · Original banks`),'Home cards must show the complete original banks, not just the MID lecture subset');
for(const [s,sets]of Object.entries(fixture.index)){
 let subjectTotal=0;
 for(const [key,ids]of Object.entries(sets)){
  const [assessment,batch]=key.split('|'),qs=Array.from(c.questionsForBatch(s,assessment,batch));
  assert.deepEqual(qs.map(q=>q.id),ids,`${s} ${key}: original source order/occurrence conservation`);assert.equal(new Set(ids).size,ids.length);assert.ok(qs.every(q=>q.subjectId===s));
  for(const q of qs)assert.ok(q.sourceLocations.some(l=>l.assessment===assessment&&String(l.batch)===batch));
  c.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};c.openCollection(s,'batch',assessment,batch);assert.deepEqual(plain(c.appState.quiz.questionIds),ids);
  subjectTotal+=qs.length;checkedSets++;
 }
 assert.equal(subjectTotal,fixture.counts[s],s);total+=subjectTotal;
}
assert.equal(total,6446);
for(const p of fixture.originalOccurrences){
 const q=byId.get(p.id);assert.ok(q,p.id);
 if(p.sourceHash){const source=Object.fromEntries(['stem','options','sourceAnswer','sourceAnswerNote','sourceTables','images'].map(k=>[k,q[k]??null]));assert.equal(hash(canonical(source)),p.sourceHash,`${q.id}: source text/options/key/tables/images changed`);}
}
for(const [rel,a]of Object.entries(fixture.assets)){assert.equal(hash(fs.readFileSync(path.join(root,rel))),a.sha256,rel);assert.ok(!rel.includes('..'));}
for(const q of c.QUESTION_BANK.filter(q=>q.batchOnly)){
 assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length,`${q.id}: ambiguous internal option IDs`);
 assert.doesNotMatch(JSON.stringify(q),/\/Users\/|storage\.googleapis\.com|download_url/,'Private path or bearer URL published');
 const key=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 assert.equal(q.giftReview.policy,'gift-key-first');if(q.giftReview.gradingAnswers.length)assert.deepEqual(plain(q.giftReview.gradingAnswers),plain(key),q.id);else assert.ok(q.giftReview.ungradedReason,q.id);
 for(const image of [...q.images,...q.options.flatMap(o=>o.images||[]),...(q.answerImages||[])])assert.ok(fs.existsSync(path.join(root,image)),`${q.id}: missing image`);
 for(const subject of ['research','radiology','community'])if(q.subjectId===subject)assert.equal(c.questionsForAssessment(subject,'Final').length,0,'Original Final batches leaked into Final lecture practice');
}
// Native table choices that the paragraph-only Surgery importer skipped.
const gallstone=Array.from(c.questionsForBatch('surgery','Midterm','437')).find(q=>q.batchSource?.nativeTableChoices);assert.ok(gallstone);assert.equal(gallstone.sourceAnswer,'C');assert.equal(gallstone.options[2].text,'Observation');assert.equal(gallstone.giftReview.gradingAnswers.length,0,'The blank source choice must remain ungraded');
// Different original copies must not inherit another batch's key or reordered choices.
const medFinal=Array.from(c.questionsForBatch('medicine','Final','442'));
assert.equal(medFinal.find(q=>q.sourceLocations[0].questionNumber===39).sourceAnswer,'A');assert.equal(medFinal.find(q=>q.sourceLocations[0].questionNumber===44).sourceAnswer,'B');
const surFinal=Array.from(c.questionsForBatch('surgery','Final','437'));
assert.equal(surFinal.find(q=>q.sourceLocations[0].questionNumber===48).sourceAnswer,null);assert.equal(surFinal.find(q=>q.sourceLocations[0].questionNumber===88).sourceAnswer,null);
const renderer={appState:{navigation:{mode:'batch',assessment:'Final',batch:'442'},quiz:{answers:{},questionIds:[],currentIndex:0}},SUBJECTS:c.SUBJECTS,QUESTION_BANK:c.QUESTION_BANK,escapeHtml:v=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),persistState(){},captureAnalytics(){},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'batch-test'};vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);renderer.batchDisplayName=c.batchDisplayName;
assert.equal(renderer.isMissingSourceOption('A','surgery',true),false,'A is valid original choice text, for example a blood group');
let clicks=0;
for(const q of c.QUESTION_BANK.filter(q=>q.batchOnly)){
 renderer.appState.quiz={answers:{},questionIds:[q.id],currentIndex:0};let out=renderer.renderQuestion(q,0,1);assert.ok(out.includes(q.id));
 const visible=q.options.filter(o=>o.images?.length||o.text.trim()&&!renderer.isMissingSourceOption(o.text,q.subjectId,q.batchOnly));
 const choices=visible.length?visible.map(o=>o.id):['__reviewed__'];
 for(const optionId of choices){
  const buttons=visible.map(o=>({dataset:{option:o.id},classList:{toggle(){}},setAttribute(){}}));renderer.workspaceElement={querySelector:s=>s.includes('data-question-card')?{querySelectorAll:()=>buttons,querySelector:()=>({classList:{add(){}}})}:null};
  renderer.answerQuestion(q.id,optionId);assert.equal(renderer.appState.quiz.answers[q.id],optionId,q.id);out=renderer.renderQuestion(q,0,1);assert.match(out,/answer-panel visible/);assert.match(out,/Gift answer:/);assert.doesNotMatch(out,/Tentative opinion:|AI opinion:/);clicks++;
 }
}
// Every original user ID remains resumable, even though batch-only copies are separate.
for(const id of fixture.studyIds)assert.ok(byId.has(id));
console.log(`PASS: ${total} original occurrences across ${checkedSets} complete batches; ${clicks} batch-only answer clicks; immutable source text/options/keys/tables/images, original order and repeated numbers; original defects remain ungraded; MID lecture scope and saved study IDs preserved.`);
