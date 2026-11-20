const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const expected = { community: 17, research: 25, medicine: 33, surgery: 48, radiology: 35 };
const plain = value => JSON.parse(JSON.stringify(value));

function buildRuntime(includeGift) {
  const runtime = vm.createContext({
    window: {},
    SUBJECTS: Object.keys(expected).concat('informatics').map(id => ({ id })),
    appState: { navigation: { mode: 'batch', assessment: 'Midterm', batch: '444' }, quiz: { answers: {} } },
    escapeHtml: value => String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char])
  });
  for (const [, filename] of html.matchAll(/<script src="([^"?]+)/g)) {
    if (includeGift || filename !== 'midterm-444.js') {
      vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), runtime, { filename });
    }
  }

  function loadFunction(name) {
    const start = html.indexOf(`    function ${name}(`);
    assert.ok(start >= 0, name);
    vm.runInContext(html.slice(start, html.indexOf('\n    }\n', start) + 6), runtime);
  }

  for (const name of [
    'deduplicateQuestions', 'questionsFor', 'questionsForBatch', 'questionsForAssessment', 'isQuestionAvailableInLecture',
    'renderQuestion', 'renderSourceTables', 'renderInformaticsFinalExplanation', 'renderReferenceDetails',
    'sourceAnswers', 'gradingAnswersForQuestion', 'batchDisplayName', 'newestQuestionBatch', 'isMissingSourceOption'
  ]) loadFunction(name);
  const bankStart = html.indexOf('    const QUESTION_BANK =');
  vm.runInContext(html.slice(bankStart, html.indexOf('\n\n', bankStart)).replace('const QUESTION_BANK', 'QUESTION_BANK'), runtime);
  return runtime;
}

const before = buildRuntime(false);
const after = buildRuntime(true);
const beforeIndex = before.window.GIFT445_ORIGINAL_BATCH_INDEX;
const afterIndex = after.window.GIFT445_ORIGINAL_BATCH_INDEX;
const newQuestions = after.QUESTION_BANK.filter(question => question.midterm444Review);

test('new Gift sets preserve original occurrences and existing batch routes', () => {
  const existingAfter = after.QUESTION_BANK.filter(question => !question.midterm444Review);
  assert.equal(JSON.stringify(existingAfter), JSON.stringify(before.QUESTION_BANK));
  assert.equal(newQuestions.length, 158);
  assert.equal(after.questionsForBatch('surgery', 'Midterm', '444').length, 104);
  assert.equal(after.questionsForBatch('informatics', 'Midterm', '444').length, 34);
  assert.equal(after.batchDisplayName('surgery', '444-gift'), 'Gift 444');

  for (const [subject, sets] of Object.entries(beforeIndex)) {
    for (const [key, ids] of Object.entries(sets)) assert.deepEqual(plain(afterIndex[subject][key]), plain(ids));
  }
  for (const [subject, total] of Object.entries(expected)) {
    const batch = subject === 'surgery' ? '444-gift' : '444';
    const questions = after.questionsForBatch(subject, 'Midterm', batch);
    assert.equal(questions.length, total, subject);
    assert.deepEqual(plain(questions.map(question => question.sourceLocations[0].questionNumber)), Array.from({ length: total }, (_, index) => index + 1));
    assert.ok(questions.every(question => question.sourceBatch === '444' && question.giftPdf.page > 0));
  }

  const totals = {};
  for (const [key, ids] of Object.entries(afterIndex.research)) {
    const [assessment, batch] = key.split('|');
    const questions = after.questionsForBatch('research', assessment, batch);
    assert.equal(questions.length, ids.length, key);
    totals[assessment] = (totals[assessment] || 0) + questions.length;
  }
  assert.deepEqual(totals, { Midterm: 466, Final: 466 });
  assert.equal(after.questionsForAssessment('research', 'Final').length, 0);
});

test('all added questions reveal a Gift key, an individual explanation, and evidence', () => {
  for (const question of newQuestions) {
    const review = question.midterm444Review;
    const feedback = after.renderQuestion(question, 0, 1, question.options[0].id);
    assert.match(feedback, /answer-panel visible/, question.id);
    assert.match(feedback, /Gift answer:/, question.id);
    assert.match(feedback, /<strong>Explanation<\/strong>/, question.id);
    assert.match(feedback, />Source PDF ↗</, question.id);
    assert.ok(review.evidence.length || review.references.length, question.id);
    assert.ok(review.explanation.length > 60, question.id);
    for (const source of review.evidence) {
      assert.ok(source.quote && source.pdfPage > 0, question.id);
      if (source.image) assert.ok(fs.existsSync(path.join(root, source.image)), source.image);
    }
    for (const reference of review.references) assert.match(reference.url, /^https:\/\//);
    if (question.giftReview.ungradedReason) {
      assert.equal(after.gradingAnswersForQuestion(question).length, 0, question.id);
      assert.match(feedback, /Not scored:/, question.id);
    } else {
      assert.deepEqual(plain(after.gradingAnswersForQuestion(question)), [question.sourceAnswer], question.id);
    }
    assert.equal(after.questionsFor(question.subjectId).includes(question), !question.batchOnly, question.id);
    if (question.batchOnly) assert.match(feedback, /Current course topic:|outside the listed Radiology midterm lectures/, question.id);
  }

  const reflux = newQuestions.find(question => question.id === 'surgery-midterm-444-gift-q41');
  const feedback = after.renderQuestion(reflux, 40, 48, 'A');
  assert.match(feedback, /Gift answer: B — Renal ultrasound/);
  assert.match(feedback, /Reviewed answer: A — Voiding cystourethrogram/);
  assert.doesNotMatch(feedback, /option-button selected incorrect/);
});
