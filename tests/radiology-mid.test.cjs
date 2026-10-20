const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const fixture=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/radiology-mid.json')));
const plain=v=>JSON.parse(JSON.stringify(v)),hash=v=>crypto.createHash('sha256').update(v).digest('hex');
const live={window:{}};vm.createContext(live);
for(const m of html.matchAll(/<script src="([^"?]+)/g)){const p=path.join(root,m[1]);assert.ok(fs.existsSync(p),m[1]);vm.runInContext(fs.readFileSync(p,'utf8'),live);}
const questions=plain(live.window.GIFT445_RADIOLOGY_QUESTIONS),catalog=plain(live.window.GIFT445_RADIOLOGY_CATALOG),byId=new Map(questions.map(q=>[q.id,q]));
assert.equal(fixture.counts.originalOccurrences,1071);assert.equal(fixture.counts.sourceMidterm,628);assert.equal(fixture.counts.sourceFinal,443);
assert.ok(questions.length>600);assert.equal(questions.length,fixture.counts.selected);assert.equal(byId.size,questions.length);
assert.deepEqual(questions.map(q=>q.id),fixture.selectedIds);assert.equal(fixture.excludedIds.length+questions.length,1071);
assert.ok(fixture.excludedIds.every(id=>!byId.has(id)));
assert.deepEqual(catalog.map(g=>g.lectures.length),[5,4,2,4,4,3,4,1,1]);
assert.deepEqual(catalog.flatMap(g=>g.lectures),fixture.curriculum.lectures.map(l=>l.title));
for(const [name,prior]of Object.entries(fixture.previousSubjects)){assert.equal(live.window[name].length,prior.count,name);assert.equal(hash(JSON.stringify(live.window[name])),prior.sha256,`${name}: existing material changed`);}
const midTitles=new Set(catalog.filter(g=>g.assessment==='Midterm').flatMap(g=>g.lectures)),finalTitles=new Set(catalog.filter(g=>g.assessment==='Final').flatMap(g=>g.lectures));
assert.equal(midTitles.size,15);assert.equal(finalTitles.size,13);
const sources=new Map(fixture.sources.map(s=>[s.id,s])),proofs=new Map(fixture.checkedPositions.map(p=>[[p.sourceId,p.unit,p.page].join('|'),p]));
for(const q of questions){
 assert.equal(q.subjectId,'radiology');assert.equal(q.radiologyPracticeAssessment,'Midterm');assert.ok(midTitles.has(q.lecture));assert.ok(!finalTitles.has(q.lecture));
 assert.deepEqual(q.sourceLocations.map(l=>l.assessment),[q.assessment]);assert.deepEqual(q.sourceLocations.map(l=>l.batch),[q.sourceBatch]);
 for(const [key,value]of Object.entries(fixture.originalQuestions[q.id]))assert.deepEqual(q[key],value,`${q.id}: original ${key} changed`);
 assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length,q.id);
 const key=Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
 assert.equal(q.giftReview.policy,'gift-key-first');
 if(q.giftReview.gradingAnswers.length)assert.deepEqual(q.giftReview.gradingAnswers,key,q.id);else assert.ok(q.giftReview.ungradedReason,q.id);
 const r=q.radiologyReview;assert.ok(r.explanation.length>=80,q.id);assert.doesNotMatch(r.explanation+(r.objection||''),/[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
 assert.ok(['supported','preference','unresolved'].includes(r.confidence));assert.ok(['lecture','concept'].includes(r.basis));
 if(r.confidence==='unresolved'){assert.deepEqual(r.answers,[]);assert.deepEqual(q.giftReview.gradingAnswers,[]);}
 for(const answer of r.answers)assert.ok(q.options.some(o=>o.id===answer&&(o.text.trim()||o.images.length)),q.id);
 if(key.length&&r.answers.length&&JSON.stringify([...key].sort())!==JSON.stringify([...r.answers].sort()))assert.ok(r.objection,q.id);
 if(r.basis==='lecture')assert.equal(r.evidence?.relation,'direct',q.id);
 if(r.evidence){const e=r.evidence,s=sources.get(e.sourceId),p=proofs.get([e.sourceId,e.unit,e.page].join('|'));assert.ok(s&&p,q.id);assert.equal(e.sourceSha256,s.sha256);assert.equal(e.url,s.url);assert.ok(p.quotes.includes(e.quote));assert.ok(e.page>0&&e.page<=(e.unit==='page'?s.pageCount:s.slideCount));if(e.unit==='page'){assert.equal(hash(fs.readFileSync(path.join(root,e.image))),e.imageSha256);}else assert.equal(e.image,undefined,'No fabricated PowerPoint screenshot');}
 const images=[...q.images,...q.options.flatMap(o=>o.images)];
 assert.equal(images.length,q.radiologySourceIntegrity.sourceImages.length);
 for(const image of images){const source=q.radiologySourceIntegrity.sourceImages.find(i=>i.image===image);assert.ok(source,q.id);assert.equal(hash(fs.readFileSync(path.join(root,image))),source.sha256);if(Object.values(source.wordCrop).some(v=>v!==0))assert.equal(source.renderKind,'word-source-appearance');}
 for(const o of q.options)for(const image of o.images)assert.ok(q.radiologySourceIntegrity.sourceImages.some(i=>i.image===image&&i.role==='option'&&i.optionId===o.id));
 assert.doesNotMatch(JSON.stringify(q),/download_url|storage\.googleapis\.com|\/Users\//,'Private paths or bearer URLs published');
}
function load(name,c=live){const a=html.indexOf(`    function ${name}(`),b=html.indexOf('\n    }\n',a)+6;assert.ok(a>=0,name);vm.runInContext(html.slice(a,b),c);}
for(const name of ['deduplicateQuestions','questionsFor','isQuestionAvailableInLecture','questionsForAssessment','questionsForBatch','newestQuestionBatch','orderQuestionsNewestFirst','openQuestionSet','openLecture'])load(name);
live.QUESTION_BANK=questions;live.SUBJECTS=[{id:'radiology',name:'Radiology'}];
for(const name of ['captureAnalytics','renderQuestionSetView','persistState','renderResumePanel'])live[name]=()=>{};live.quizAnalyticsProperties=()=>({});
assert.equal(live.deduplicateQuestions(questions).length,questions.length,'Distinct source images and original exam occurrences were merged');
assert.equal(live.questionsForAssessment('radiology','Midterm').length,questions.length);assert.equal(live.questionsForAssessment('radiology','Final').length,0);
for(const q of questions){live.appState={navigation:{},quiz:{questionIds:[],currentIndex:0,answers:{},flagged:[]}};live.openLecture('radiology',null,q.lecture);assert.ok(live.appState.quiz.questionIds.includes(q.id),q.id);assert.ok(live.questionsForBatch('radiology',q.assessment,q.sourceBatch).some(x=>x.id===q.id),q.id);}
for(const title of finalTitles){live.appState.quiz.questionIds=[];live.openLecture('radiology',null,title);assert.equal(live.appState.quiz.questionIds.length,0);}
for(const name of ['openSubject','questionCountLabel','batchCountLabel','batchDisplayName'])load(name);
live.CYCLE_ORDER=[];live.workspaceHeader=t=>t;live.escapeHtml=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));live.bindWorkspaceClose=()=>{};
live.workspaceElement={innerHTML:'',classList:{add(){}},querySelector:()=>null,querySelectorAll:()=>[],scrollIntoView(){}};live.openSubject('radiology');
const menu=live.workspaceElement.innerHTML;assert.match(menu,/data-mode="assessment" data-assessment="Final" disabled/);assert.match(menu,/By Batch includes the complete original banks/);
const cards=[...menu.matchAll(/<button class="route-card direct-lecture-card"[\s\S]*?<\/button>/g)].map(m=>m[0]);assert.equal(cards.length,28);
for(const title of finalTitles){const card=cards.find(c=>c.includes(`data-lecture="${live.escapeHtml(title)}"`));assert.ok(card&&card.includes(' disabled')&&card.includes('Lecture names only'),title);}
const renderer={appState:{navigation:{mode:'lecture',assessment:null},quiz:{answers:{},questionIds:questions.map(q=>q.id),currentIndex:0}},SUBJECTS:[{id:'radiology',name:'Radiology'}],QUESTION_BANK:questions,escapeHtml:live.escapeHtml,persistState(){},captureAnalytics(){},quizAnalyticsProperties:()=>({}),completedQuizKeys:new Set(),currentQuizKey:()=> 'radiology-test'};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);load('batchDisplayName',renderer);
let clicks=0;
for(const q of questions){
 const usable=q.options.filter(o=>o.images.length||!renderer.isMissingSourceOption(o.text));
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
  assert.match(text,/Gift answer:/);assert.ok(text.includes(renderer.escapeHtml(q.radiologyReview.explanation)),q.id);assert.equal((text.match(/class="medicine-explanation"/g)||[]).length,1);
  assert.doesNotMatch(text,/AI opinion:|Tentative interpretation:|Clinical explanation|Reference status:/);assert.ok(text.includes(`${q.assessment} · Batch ${q.sourceBatch}`),q.id);
  for(const b of buttons){assert.equal(b.classes.has('correct'),q.giftReview.gradingAnswers.includes(b.dataset.option));assert.equal(b.classes.has('incorrect'),b.dataset.option===option.id&&q.giftReview.gradingAnswers.length>0&&!q.giftReview.gradingAnswers.includes(option.id));}
  const e=q.radiologyReview.evidence;if(e){assert.ok(text.includes(renderer.escapeHtml(e.quote)));assert.ok(text.includes(`${e.unit==='slide'?'Slide':'PDF page'} ${e.page}`));}
  renderer.appState.quiz.answers=plain(renderer.appState.quiz.answers);assert.equal(renderer.renderQuestion(q,0,questions.length),text,'Feedback changed on revisit');
 }
 renderer.appState.navigation.mode='lecture-mix';assert.match(renderer.renderQuestion(q,0,questions.length),new RegExp(`${q.assessment} · Batch ${q.sourceBatch}`));renderer.appState.navigation.mode='lecture';
}
const symbol=byId.get('radiology-midterm-443-q003');assert.ok(symbol);assert.equal(symbol.images.length,0);assert.deepEqual(symbol.options.map(o=>o.images.length),[1,1,1,1]);assert.equal(symbol.sourceAnswer,'A');
assert.match(symbol.radiologyReview.explanation,/magnet/i);assert.ok(byId.get('radiology-midterm-443-q005').images.length);
assert.equal(byId.get('radiology-midterm-443-q004').images.length,0,'Radiation symbol attached to the preceding missing CXR');assert.match(byId.get('radiology-midterm-443-q004').radiologyReview.explanation,/images are not supplied/,'Missing original image was not acknowledged');
assert.deepEqual(byId.get('radiology-midterm-431-q021').giftReview.gradingAnswers,[],'A missing necessary image was scored');
assert.equal(byId.get('radiology-midterm-443-q009').images.length,2,'Real CXR/CT pair was lost');
assert.ok(byId.has('radiology-midterm-438-q003')&&byId.has('radiology-midterm-438-q003-o02'),'Repeated source number lost');
const shortAnswer=byId.get('radiology-midterm-443-q001-o02');assert.equal(shortAnswer.options.length,0);assert.equal(shortAnswer.sourceAnswer,null);assert.equal(shortAnswer.sourceAnswerText,'CT scan without IV contrast');assert.match(renderer.renderQuestion(shortAnswer,0,questions.length),/Gift answer: CT scan without IV contrast/);
assert.match(byId.get('radiology-midterm-443-q002-o02').stem,/Answer: CT scan without IV contrast/,'Dependent subquestion lost its original context');
assert.ok(byId.has('radiology-midterm-442-qnone-o01'),'Original unnumbered short-answer question omitted');
const angiogram=byId.get('radiology-final-433-q044'),appearance=angiogram.radiologySourceIntegrity.sourceImages[0];assert.deepEqual(appearance.pixelCrop,[234,323,695,698]);assert.equal(appearance.renderKind,'word-source-appearance');assert.notEqual(appearance.sha256,appearance.sourceSha256,'Hidden screenshot answer was published');
function rejectRawScreenshot(directory){for(const item of fs.readdirSync(directory,{withFileTypes:true})){if(item.name==='.git')continue;const file=path.join(directory,item.name);if(item.isDirectory())rejectRawScreenshot(file);else if(/\.(?:png|jpe?g|gif|webp)$/i.test(item.name))assert.notEqual(hash(fs.readFileSync(file)),appearance.sourceSha256,`Uncropped source screenshot published at ${file}`);}}
rejectRawScreenshot(root);
assert.ok(byId.get('radiology-midterm-432-q002').radiologySourceIntegrity.sourceImages[0].privacyRedactions.length,'Potential identifier in a non-diagnostic margin was not removed');
assert.match(html,/حدثوا الصفحة بشكل دوري عشان توصلكم التحديثات/);
console.log(`PASS: Radiology ${questions.length} MID-topic source occurrences; ${clicks} answer clicks/revisits; 15 MID/13 empty Final lecture names; immutable Gift keys and original exam labels; faithful Word crops, image-only choices and source evidence; all earlier subjects unchanged.`);
