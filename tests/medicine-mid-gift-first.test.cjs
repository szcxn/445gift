const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const c = {window: {}};
vm.createContext(c);
let before;
for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
  const file = path.join(root, match[1]);
  if (!fs.existsSync(file)) continue;
  if (match[1] === 'medicine-mid-gift-first-review.js') before = JSON.parse(JSON.stringify(c.window.GIFT445_QUESTIONS));
  vm.runInContext(fs.readFileSync(file, 'utf8'), c);
}
assert.ok(before);
const after = JSON.parse(JSON.stringify(c.window.GIFT445_QUESTIONS));
assert.equal(after.length, before.length);
const mid = after.filter(q => q.subjectId === 'medicine' && q.assessment === 'Midterm');
assert.equal(mid.length, 687);
const evidenceUpdates = JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/medicine-mid-management-evidence.json')));
const sourceManifest = JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/medicine-mid-original-evidence-manifest.json')));
let rewritten = 0;
for (let i = 0; i < after.length; i++) {
  const q = after[i], old = before[i];
  if (q.subjectId !== 'medicine' || q.assessment !== 'Midterm') { assert.deepEqual(q, old); continue; }
  const {giftReview, lectureEvidence, ...originalFields} = q;
  const {lectureEvidence: oldEvidence, ...oldFields} = old;
  assert.deepEqual(originalFields, oldFields, `Original field changed: ${q.id}`);
  assert.equal(giftReview.policy, 'gift-key-first');
  assert.ok(giftReview.interpretation.length >= 90);
  assert.ok(!/\p{Script=Arabic}/u.test(JSON.stringify(giftReview)));
  rewritten += giftReview.interpretation !== (old.reviewOpinion || old.explanation);
  if (evidenceUpdates[q.id]) {
    assert.deepEqual(lectureEvidence, evidenceUpdates[q.id]);
    const source = sourceManifest.sources.find(s=>s.id===lectureEvidence.pdfId);
    assert.equal(lectureEvidence.sourceSha256, source.sha256);
    assert.equal(lectureEvidence.url, source.url);
    assert.ok(lectureEvidence.page > 0 && lectureEvidence.page <= source.pageCount);
    assert.match(lectureEvidence.pageTextSha256, /^[a-f0-9]{64}$/);
  } else assert.deepEqual(lectureEvidence, oldEvidence);
}
assert.equal(rewritten, 44);
assert.equal(Object.keys(evidenceUpdates).length, 9);
assert.equal(mid.filter(q=>q.giftReview.managementNote).length, 213);
assert.equal(mid.filter(q=>q.giftReview.gradingAnswers.length).length, 636);

const renderer = {
  appState: {quiz: {answers:{},questionIds:mid.map(q=>q.id),currentIndex:0}, navigation:{mode:'batch',assessment:'Midterm'}},
  SUBJECTS:[{id:'medicine',name:'Medicine'}], QUESTION_BANK:after,
  batchDisplayName:(_,b)=>`Batch ${b}`,
  escapeHtml:v=>String(v).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])),
  persistState:()=>{}, captureAnalytics:()=>{}, quizAnalyticsProperties:()=>({}),
  completedQuizKeys:new Set(), currentQuizKey:()=> 'test'
};
vm.createContext(renderer);
vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function questionCountLabel(')),renderer);
function buttons(q) {
  return q.options.map(option=>({dataset:{option:option.id}, classes:new Set(), classList:{
    toggle(name,value) { if(value)this.owner.classes.add(name);else this.owner.classes.delete(name); }
  }, setAttribute(){}})).map(button=>{button.classList.owner=button;return button;});
}
for (const q of mid) {
  const keys = Array.isArray(q.sourceAnswer)?q.sourceAnswer:q.sourceAnswer?[q.sourceAnswer]:[];
  const grades = q.giftReview.gradingAnswers;
  if (grades.length) {
    for(const key of keys)assert.ok(grades.includes(key),`Gift key dropped: ${q.id}`);
    for(const answer of grades)assert.ok(keys.includes(answer)||q.id==='medicine-midterm-436-git-hepatobiliary-q072'&&answer==='D',`AI replaced key: ${q.id}`);
    assert.equal(q.giftReview.ungradedReason,'');
  }else assert.ok(q.giftReview.ungradedReason,`No reason for neutral feedback: ${q.id}`);
  for (const option of q.options) {
    const mockButtons = buttons(q);
    renderer.workspaceElement = {querySelector:selector=>selector.includes('data-question-card')?{
      querySelectorAll:()=>mockButtons,querySelector:()=>({classList:{add(){}}})
    }:null};
    renderer.answerQuestion(q.id, option.id);
    assert.equal(renderer.appState.quiz.answers[q.id],option.id);
    const output = renderer.renderQuestion(q,0);
    assert.ok(output.includes('Gift key:'));
    assert.ok(output.includes('Tentative interpretation:'));
    assert.ok(output.includes(renderer.escapeHtml(q.giftReview.interpretation)));
    assert.ok(!output.includes('AI opinion:')&&!output.includes('expected answer'));
    assert.ok(!/\p{Script=Arabic}/u.test(output));
    for(const button of mockButtons){
      const match = output.match(new RegExp(`<button class="(option-button[^\"]*)"[^>]*data-option="${button.dataset.option}"`));
      assert.ok(match);
      const correct = grades.includes(button.dataset.option);
      const incorrect = grades.length>0 && option.id===button.dataset.option && !correct;
      assert.equal(button.classes.has('correct'),correct,`Click grading: ${q.id}`);
      assert.equal(button.classes.has('incorrect'),incorrect,`Click grading: ${q.id}`);
      assert.equal(/\bcorrect\b/.test(match[1]),correct,`Re-render grading: ${q.id}`);
      assert.equal(/\bincorrect\b/.test(match[1]),incorrect,`Re-render grading: ${q.id}`);
    }
  }
}
// Scope boundary: AI-based behavior for other assessments/subjects is unchanged.
for(const q of [
  {subjectId:'medicine',assessment:'Final',sourceAnswer:'A',aiAnswer:'B',verification:'conflict'},
  {subjectId:'surgery',assessment:'Midterm',sourceAnswer:'A',aiAnswer:'B',verification:'supported'},
  {subjectId:'community',assessment:'Midterm',sourceAnswer:'A',aiAnswer:'B',verification:'needs-review'}
]) assert.deepEqual(Array.from(renderer.gradingAnswersForQuestion(q)),q.verification==='needs-review'?[]:['B']);
const find=id=>mid.find(q=>q.id===id);
assert.deepEqual(find('medicine-midterm-443-pulmonary-q017').giftReview.possibleAnswers,['D']);
assert.deepEqual(find('medicine-midterm-443-git-hepatobiliary-q054').giftReview.possibleAnswers,['D']);
assert.deepEqual(find('medicine-midterm-441-git-hepatobiliary-q058').giftReview.gradingAnswers,['A','B']);
assert.deepEqual(find('medicine-midterm-436-git-hepatobiliary-q072').giftReview.gradingAnswers,['B','D']);
assert.deepEqual(find('medicine-midterm-438-cardiology-q012').giftReview.gradingAnswers,['A']);
assert.deepEqual(find('medicine-midterm-438-cardiology-q012').giftReview.possibleAnswers,['D']);
assert.ok(html.includes('إحسان'));
console.log('PASS: all 687 MID questions preserve source content; 636 use Gift-based feedback and 51 remain explicitly ungraded; all choices have identical click/reload behavior; 44 revised interpretations, 9 verified lecture updates and 213 management notes; other assessments unchanged.');
