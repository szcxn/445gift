const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = {window: {}};
vm.createContext(context);
for (const [, file] of html.matchAll(/<script src="([^"?]+)/g)) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
for (const name of ['deduplicateQuestions', 'sourceAnswers', 'isMissingSourceOption', 'gradingAnswersForQuestion', 'quizScoreGrading', 'loadSavedAnswers']) {
  const start = html.indexOf(`    function ${name}(`);
  vm.runInContext(html.slice(start, html.indexOf('\n    }\n', start) + 6), context, {filename: name});
}
const start = html.indexOf('    const QUESTION_BANK =');
const bankCode = html.slice(start, html.indexOf('\n\n', start)).replace('const QUESTION_BANK', 'window.bank');
const review = context.window.GIFT445_REVIEW_SITE_CONTENT;
context.window.GIFT445_REVIEW_SITE_CONTENT = undefined;
vm.runInContext(bankCode, context);
const baseline = context.window.bank;
context.window.GIFT445_REVIEW_SITE_CONTENT = review;
vm.runInContext(bankCode, context);
const bank = context.window.bank;
context.studyTracking = context.window.GIFT445_STUDY_TRACKING;
context.OPTION_LAYOUT_VERSION = 1;
const get = id => bank.find(question => question.id === id);
const original = id => baseline.find(question => question.id === id);
const display = context.window.GIFT445_DISPLAY_REVIEWED_QUESTION;
const basis = question => question.midterm444Review || question[question.subjectId + 'Review'] || question.batchReview || {};
const json = value => JSON.parse(JSON.stringify(value));
const localAsset = asset => assert.ok(fs.existsSync(path.join(root, asset)), `Missing asset: ${asset}`);

test('all original batch entries remain in order with stable IDs and Informatics is conserved', () => {
  assert.deepEqual(json(bank.map(question => question.id)), json(baseline.map(question => question.id)));
  assert.deepEqual(json(bank.filter(question => question.subjectId === 'informatics')),
    json(baseline.filter(question => question.subjectId === 'informatics')));
  const ids = new Set(bank.map(question => question.id));
  for (const [subject, batches] of Object.entries(context.window.GIFT445_ORIGINAL_BATCH_INDEX)) {
    if (subject === 'informatics') continue;
    for (const [key, entries] of Object.entries(batches)) {
      assert.ok(entries.every(id => ids.has(id)), `${subject} ${key}`);
      assert.equal(new Set(entries).size, entries.length, `${subject} ${key}: duplicate original occurrence`);
    }
  }
});

test('the reviewed Research, Radiology and Community banks retain original source fields and have usable explanations', () => {
  const subjects = ['research', 'radiology', 'community'];
  for (const question of bank.filter(item => subjects.includes(item.subjectId))) {
    const before = original(question.id);
    for (const field of ['stem', 'options', 'sourceAnswer', 'sourceAnswerNote', 'sourceLocations', 'images', 'sourceTables', 'answerImages']) {
      assert.equal(JSON.stringify(question[field]), JSON.stringify(before[field]), `${question.id}: ${field}`);
    }
    const review = basis(question);
    assert.notEqual(review.basis, 'pending', question.id);
    assert.ok(review.explanation?.trim(), question.id);
    const evidence = Array.isArray(review.evidence) ? review.evidence : [review.evidence].filter(Boolean);
    for (const item of evidence) if (item.image) localAsset(item.image);
    for (const image of [...(question.images || []), ...(question.answerImages || []), ...question.options.flatMap(option => option.images || [])]) localAsset(image);
  }
});

test('disputed answer keys do not enter quiz scoring or review mistakes', () => {
  const research = bank.find(question => question.subjectId === 'research' &&
    question.researchReview?.explanation.includes('independent') && question.researchReview.answers.length &&
    question.giftReview.ungradedReason?.includes('differs from'));
  assert.ok(research);
  assert.notDeepEqual(json(research.researchReview.answers), json([research.sourceAnswer].flat()));
  assert.equal(context.quizScoreGrading(research).correct.size, 0);
  const elbow = get('batch-radiology-final-439-q017');
  assert.match(elbow.radiologyReview.explanation, /supracondylar fracture/);
  assert.equal(elbow.sourceAnswer, 'C');
  assert.equal(context.quizScoreGrading(elbow).correct.size, 0);
  const maternalMortality = get('community-mid-maternal-health-2336a3db');
  assert.deepEqual(json(original(maternalMortality.id).giftReview.gradingAnswers), ['A']);
  assert.deepEqual(json(maternalMortality.communityReview.answers), ['B']);
  assert.equal(context.quizScoreGrading(maternalMortality).correct.size, 0);
  const pressure = get('batch-medicine-midterm-433-p4353-q6');
  assert.match(pressure.medicineReview.explanation, /mean left atrial pressure/);
  assert.equal(pressure.sourceAnswer, 'D');
  assert.equal(context.quizScoreGrading(pressure).correct.size, 0);
});

test('recovered question choices and relocated diagnostic image appear through the display hook', () => {
  const question = get('batch-medicine-midterm-437-p2707-q19');
  assert.deepEqual(json(display(question).options.map(option => option.text)), ['CT angiography', 'D-dimer', 'V/Q', 'ABG']);
  assert.equal(display(question).sourceAnswer, 'C');
  assert.equal(context.quizScoreGrading(question).correct.size, 0);
  const scan = get('batch-radiology-final-441-q041');
  const mass = get('batch-radiology-final-441-q042');
  assert.equal(scan.images.length, 2);
  assert.equal(display(scan).images.length, 1);
  assert.equal(mass.images.length, 0);
  assert.deepEqual(json(display(mass).images), [scan.images[1]]);
  assert.match(display(mass).reviewedDisplayNote, /Q41/);
  localAsset(display(mass).images[0]);
});

test('saved choices retain their text when source options are restored or reordered', () => {
  const id = 'medicine-final-434-rheumatology-q003';
  assert.equal(original(id).options[0].text, 'Anti-Jo-1');
  assert.equal(get(id).options[1].text, 'Anti-Jo-1');
  const anotherCard = 'research-midterm-435-q011';
  const oldChoice = { [id]: 'A', [anotherCard]: 'C' };
  const saved = context.loadSavedAnswers(oldChoice, undefined);
  assert.deepEqual(json(saved), { [id]: 'B', [anotherCard]: 'C' });
  assert.deepEqual(json(context.loadSavedAnswers(saved, 1)), json(saved));
  assert.deepEqual(json(context.loadSavedAnswers({ [id]: 'D' }, undefined)), {});
  assert.deepEqual(json(oldChoice), { [id]: 'A', [anotherCard]: 'C' });
});

test('the five audited subjects have individual explanations and their local references and original media resolve', () => {
  for (const question of bank.filter(item => item.subjectId !== 'informatics')) {
    const review = basis(question);
    assert.notEqual(review.basis, 'pending', question.id);
    assert.ok(review.explanation?.trim(), question.id);
    const evidence = Array.isArray(review.evidence) ? review.evidence : [review.evidence].filter(Boolean);
    for (const passage of evidence) {
      if (passage.image) localAsset(passage.image);
      if (passage.slideImage) localAsset(passage.slideImage);
    }
    const rendered = display(question);
    for (const image of [...(rendered.images || []), ...(rendered.answerImages || []), ...rendered.options.flatMap(option => option.images || [])]) {
      localAsset(image);
    }
  }
});

test('the Medicine and Research reference audit preserves Gift source fields and grading', () => {
  const restore = context.window.GIFT445_APPLY_CHECKED_REFERENCES;
  try {
    context.window.GIFT445_APPLY_CHECKED_REFERENCES = undefined;
    vm.runInContext(bankCode, context);
    const before = context.window.bank;
    assert.equal(bank.length, before.length);
    bank.forEach((question, index) => {
      const original = before[index];
      assert.equal(question.id, original.id);
      if (question.subjectId !== 'research' &&
          !(question.subjectId === 'medicine' &&
            (question.assessment === 'Midterm' || question.medicineMidLecture))) {
        assert.equal(JSON.stringify(question), JSON.stringify(original), question.id);
        return;
      }
      for (const field of ['stem', 'options', 'sourceAnswer', 'sourceAnswerNote', 'sourceLocations', 'sourceTables', 'images', 'answerImages']) {
        assert.equal(JSON.stringify(question[field]), JSON.stringify(original[field]), `${question.id}: ${field}`);
      }
      assert.deepEqual(json(context.gradingAnswersForQuestion(question)),
        json(context.gradingAnswersForQuestion(original)), question.id);
    });
  } finally {
    context.window.GIFT445_APPLY_CHECKED_REFERENCES = restore;
    vm.runInContext(bankCode, context);
  }
});

test('the audited references link to the answer-specific course pages', () => {
  const lecture = basis(get('medicine-midterm-441-git-hepatobiliary-q058'));
  const batch = basis(get('batch-medicine-midterm-441-p1391-q58'));
  assert.equal(lecture.evidence.verifiedCohort, 'MED445');
  assert.equal(lecture.evidence.relation, 'background');
  assert.equal(lecture.evidence.page, 42);
  assert.equal(batch.evidence.url, lecture.evidence.url);
  assert.ok(batch.references.some(link => link.url.includes('treatment-of-helicobacter')));
  localAsset(lecture.evidence.image);

  const qualitative = basis(get('research-midterm-438-q020')).evidence;
  assert.equal(qualitative.cohortLabel, 'Team 445');
  assert.equal(qualitative.page, 2);
  assert.match(qualitative.quote, /Answers how and why/);
  const introduction = basis(get('research-midterm-434-q016')).evidence;
  assert.equal(introduction.relation, 'background');
  assert.equal(introduction.page, 4);
  const [incidence] = basis(get('research-midterm-444-gift-q11')).evidence;
  assert.equal(incidence.pdfPage, 4);
  assert.match(incidence.quote, /population at risk at start/i);
  assert.doesNotMatch(incidence.quote, /person time/i);
  assert.equal(basis(get('research-midterm-444-gift-q13')).evidence.length, 2);
});
