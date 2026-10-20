const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));
const context = {window: {}};
vm.createContext(context);
let before;
for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
  // This stage predates Final-source linking; the Final integration test loads
  // both layers and checks the preserved MID reviews and source variants.
  if (match[1] === 'medicine-final-mid-review.js') continue;
  const file = path.join(root, match[1]);
  if (!fs.existsSync(file)) continue;
  if (match[1] === 'medicine-mid-study-review.js') before = plain(context.window.GIFT445_QUESTIONS);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context);
}
assert.ok(before, 'The reviewed study feedback must load after the Gift grading policy.');
const after = plain(context.window.GIFT445_QUESTIONS);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'tests/fixtures/medicine-mid-study-review.json'), 'utf8'));
const sources = new Map(manifest.sources.map(source => [source.id, source]));
const mid = after.filter(q => q.subjectId === 'medicine' && q.assessment === 'Midterm');
assert.equal(mid.length, 687);
assert.equal(manifest.questions, mid.length);
assert.equal(sources.size, 27);
assert.equal(manifest.sources.reduce((sum, source) => sum + source.pageCount, 0), 637);
for (let index = 0; index < after.length; index++) {
  const question = after[index];
  const {medicineReview, ...original} = question;
  assert.deepEqual(original, before[index], `Source, Gift key, grading, table, image or placement changed: ${question.id}`);
  if (question.subjectId !== 'medicine' || question.assessment !== 'Midterm') {
    assert.equal(medicineReview, undefined, `Out-of-scope feedback: ${question.id}`);
    continue;
  }
  assert.ok(medicineReview, `Unreviewed MID question: ${question.id}`);
  assert.ok(medicineReview.explanation.length >= 80, question.id);
  assert.doesNotMatch(medicineReview.explanation, /verification is pending|keyed option is matched|I would lean toward|Tentative interpretation:/i);
  assert.doesNotMatch(JSON.stringify(medicineReview), /[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
  assert.ok(['supported', 'preference', 'unresolved'].includes(medicineReview.confidence));
  assert.ok(['lecture', 'clinical'].includes(medicineReview.basis));
  for (const answer of medicineReview.answers) assert.ok(question.options.some(option => option.id === answer && option.text.trim()), question.id);
  if (medicineReview.basis === 'lecture') assert.equal(medicineReview.evidence?.relation, 'teaching', `A topic match is not answer evidence: ${question.id}`);
  const evidence = medicineReview.evidence;
  if (evidence) {
    const source = sources.get(evidence.pdfId);
    assert.ok(source, question.id);
    assert.equal(evidence.sourceSha256, source.sha256);
    assert.ok(evidence.page > 0 && evidence.page <= source.pageCount, question.id);
    assert.match(evidence.pageTextSha256, /^[a-f0-9]{64}$/);
    assert.ok(evidence.quote.trim());
    const bytes = fs.readFileSync(path.join(root, evidence.image));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), evidence.imageSha256, question.id);
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
  }
}
const renderer = {
  appState: {quiz: {answers: {}, questionIds: mid.map(q => q.id), currentIndex: 0}, navigation: {mode: 'batch', assessment: 'Midterm'}},
  SUBJECTS: [{id: 'medicine', name: 'Medicine'}], QUESTION_BANK: after,
  batchDisplayName: (_, batch) => `Batch ${batch}`,
  escapeHtml: value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[char])),
  persistState() {}, captureAnalytics() {}, quizAnalyticsProperties: () => ({}), completedQuizKeys: new Set(), currentQuizKey: () => 'study-test'
};
vm.createContext(renderer);
vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'), html.indexOf('    function questionCountLabel(')), renderer);
for (const question of mid) {
  const review = question.medicineReview;
  const key = Array.isArray(question.sourceAnswer) ? question.sourceAnswer : question.sourceAnswer ? [question.sourceAnswer] : [];
  for (const option of question.options) {
    const buttons = question.options.map(item => ({dataset: {option: item.id}, classes: new Set(), setAttribute() {}}));
    for (const button of buttons) button.classList = {toggle(name, on) {if (on) button.classes.add(name); else button.classes.delete(name);}};
    renderer.workspaceElement = {querySelector: selector => selector.includes('data-question-card') ? {querySelectorAll: () => buttons, querySelector: () => ({classList: {add() {}}})} : null};
    renderer.answerQuestion(question.id, option.id);
    const output = renderer.renderQuestion(question, 0, mid.length);
    assert.match(output, /Gift answer:/);
    assert.ok(output.includes(renderer.escapeHtml(review.explanation)), question.id);
    assert.doesNotMatch(output, /Tentative opinion:|Tentative interpretation:|Management focus:|AI opinion:|Clinical interpretation \(separate from the lecture text\):|Reference status:/);
    const different = review.answers.length && (review.answers.length !== key.length || review.answers.some(answer => !key.includes(answer)));
    assert.equal(/(?:Reviewed|Suggested) answer:/.test(output), Boolean(different), question.id);
    assert.equal(output.includes('View supporting slide'), review.evidence?.relation === 'teaching');
    if (review.evidence) {
      assert.ok(output.includes('<details class="medicine-slide">'));
      assert.ok(output.includes(renderer.escapeHtml(review.evidence.quote)));
      assert.ok(output.includes(renderer.escapeHtml(review.evidence.image)));
    }
    for (const button of buttons) {
      const correct = question.giftReview.gradingAnswers.includes(button.dataset.option);
      assert.equal(button.classes.has('correct'), correct, question.id);
      const result = output.match(new RegExp(`<button class="(option-button[^\"]*)"[^>]*data-option="${button.dataset.option}"`));
      if (!question.options.find(option => option.id === button.dataset.option).text.trim()) {
        assert.equal(result, null, `An absent source option must not become an empty button: ${question.id}`);
        continue;
      }
      assert.ok(result);
      assert.equal(/\bcorrect\b/.test(result[1]), correct, question.id);
    }
    const restored = JSON.parse(JSON.stringify(renderer.appState.quiz.answers));
    renderer.appState.quiz.answers = restored;
    assert.equal(renderer.renderQuestion(question, 0, mid.length), output, `Answer changed on reload: ${question.id}`);
  }
}
assert.equal(mid.filter(q => q.medicineReview.basis === 'lecture').length, manifest.lectureBased);
assert.equal(mid.filter(q => q.medicineReview.basis === 'clinical').length, manifest.clinical);
// Clinical regression cases: an unchanged bank key must not silently dictate
// a contradictory explanation or turn a missing choice into a scored option.
const byId = new Map(mid.map(question => [question.id, question]));
const hypoxemia = byId.get('medicine-midterm-435-pulmonary-q017');
assert.equal(hypoxemia.sourceAnswer, 'C');
assert.deepEqual(hypoxemia.medicineReview.answers, ['A']);
assert.match(hypoxemia.medicineReview.explanation, /89%.*hypoxemia/i);
assert.match(hypoxemia.medicineReview.evidence.quote, /hypoxemia/i);
const fibrosis = byId.get('medicine-midterm-436-pulmonary-q025');
assert.equal(fibrosis.sourceAnswer, 'D');
assert.deepEqual(fibrosis.medicineReview.answers, ['C']);
assert.match(fibrosis.medicineReview.evidence.quote, /HRCT/);
const inconsistentGas = byId.get('medicine-midterm-436-nephrology-q061');
assert.match(inconsistentGas.medicineReview.explanation, /7\.25.*7\.12/);
assert.match(inconsistentGas.medicineReview.objection, /inconsistent/);
const mass = byId.get('medicine-midterm-437-git-hepatobiliary-q033');
assert.deepEqual(mass.medicineReview.answers, []);
assert.equal(mass.medicineReview.basis, 'clinical');
assert.equal(mass.medicineReview.evidence.relation, 'background');
assert.match(mass.medicineReview.explanation, /biopsy/);
const missingKeyOption = byId.get('medicine-midterm-443-git-hepatobiliary-q049');
assert.equal(missingKeyOption.sourceAnswer, 'D');
assert.deepEqual(missingKeyOption.medicineReview.answers, ['C']);
assert.deepEqual(missingKeyOption.giftReview.gradingAnswers, []);
assert.match(html, /تحديث سابق:<\/strong> إضافة مادة الإنفورماتكس/);
console.log(`PASS: ${mid.length} Medicine MID study explanations; Gift keys and grading preserved; simple feedback, conditional objections, exact-page slide assets, all-choice feedback and reload behavior; other scopes untouched.`);
