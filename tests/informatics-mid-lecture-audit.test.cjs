const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const c = vm.createContext({window: {}});
for (const [, file] of html.matchAll(/<script src="([^"?]+)/g)) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c);
}
const fn = c.window.GIFT445_AUDIT_INFORMATICS_PLACEMENT;
assert.equal(typeof fn, 'function');
assert.match(html, /const QUESTION_BANK = [^\n]*window\.GIFT445_AUDIT_INFORMATICS_PLACEMENT\(/);
const original = c.window.GIFT445_EXTEND_BATCH_BANK([
  ...c.window.GIFT445_INFORMATICS_QUESTIONS,
  ...c.window.GIFT445_INFORMATICS_FINAL_QUESTIONS
]);
const before = JSON.stringify(original);
const audited = fn(original);
assert.equal(JSON.stringify(original), before, 'The audited overlay modified its input');
assert.equal(audited.length, original.length);
const legacy = audited.filter(q => q.subjectId === 'informatics' && q.assessment === 'Midterm');
assert.equal(legacy.length, 448, 'Lecture eligibility changed the native MID bank');
const protectedFields = ['id', 'subjectId', 'assessment', 'sourceBatch', 'batchOnly', 'stem', 'options',
  'sourceAnswer', 'sourceAnswerNote', 'images', 'sourceTables', 'sourceLocations', 'sourceOccurrenceIntegrity'];
for (const [i, q] of audited.entries()) {
  const raw = original[i];
  for (const field of protectedFields) assert.equal(q[field], raw[field], `${q.id}: changed source ${field}`);
  assert.equal(q.giftReview?.gradingAnswers, raw.giftReview?.gradingAnswers, `${q.id}: changed Gift grading`);
  if (q.subjectId !== 'informatics' || q.assessment !== 'Midterm') assert.equal(q, raw, 'Changed another original bank');
}
const legacyReviewed = legacy.filter(q => !q.batchOnly);
const movedToBank = legacyReviewed.filter(q => q.hideFromLecture);
assert.equal(movedToBank.length, 14);
assert.equal(legacyReviewed.filter(q => q.lecture && q.informaticsEvidence.some(e => /^F[6-9]$/.test(e.lectureId))).length, 21);
assert.equal(movedToBank.filter(q => q.informaticsEvidence.length === 0).length, 14);
assert.ok(movedToBank.every(q => !q.lecture && q.informaticsPlacementNote));
const qid = id => legacy.find(q => q.id === id);
const diagnostic = qid('informatics-mid-443-p0147');
assert.equal(diagnostic.sourceAnswer, 'D');
assert.deepEqual(Array.from(diagnostic.giftReview.gradingAnswers), ['D']);
assert.deepEqual(Array.from(diagnostic.informaticsSlideAnswer.answers), ['B']);
assert.equal(diagnostic.informaticsEvidence[0].pdfPage, 8);
assert.match(diagnostic.informaticsEvidence[0].quote, /Diagnostic Analysis.*why did it happen/);
for (const id of ['informatics-mid-439-p0931', 'informatics-mid-435-p2127', 'informatics-mid-434-p2257']) {
  const q = qid(id);
  const e = q.informaticsEvidence[0];
  assert.equal(e.verificationMethod, 'visual-original-page');
  assert.equal(e.pdfPage, 10);
  assert.equal(e.quote, 'Data mining');
  assert.match(e.section, /RESEARCH column/);
  assert.equal(q.lecture, 'Introduction to Medical Informatics');
}
const recovered = qid('batch-informatics-mid-437-p1468');
assert.ok(recovered.batchOnly && recovered.informaticsVerifiedBatchLecture);
assert.equal(recovered.informaticsEvidence[0].pdfPage, 8);
assert.match(recovered.informaticsEvidence[0].quote, /randomized clinical trials/);
assert.equal(recovered.batchReview.confidence, 'supported');
const source = c.window.GIFT445_INFORMATICS_BANK;
const midTitles = c.window.GIFT445_INFORMATICS_CATALOG.find(g => g.assessment === 'Midterm').lectures;
assert.equal(source.lectureEntries(legacy, midTitles).length, 342);
assert.ok(source.isLectureQuestion(recovered));
for (const q of source.lectureEntries(legacy, midTitles)) {
  assert.ok(q.informaticsEvidence.every(e => fs.existsSync(path.join(root, e.image))), q.id);
  assert.ok(q.informaticsSlideAnswer.confidence !== 'supported' || q.informaticsEvidence.some(e => e.supportRole === 'direct'), q.id);
}
console.log('PASS: original MID scope audit preserves all 448 source occurrences, keeps 14 unsupported entries out of lecture practice and places 21 in their verified topics, recovers 437 Q9 and preserves separate Gift keys and lecture answers.');
