const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/informatics-final-complete.json'), 'utf8'));
const plain = value => JSON.parse(JSON.stringify(value));
const canonical = value => value === null || typeof value !== 'object' ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(canonical).join(',')}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
// Match the native Word parser's Unicode whitespace handling. A zero-width BOM
// inside an original option is source content, not whitespace to be discarded.
const normalize = text => String(text).split(/[\p{White_Space}\u001c-\u001f]+/u).filter(Boolean).join(' ');
const isFinal = question => question.subjectId === 'informatics' && question.assessment === 'Final';
const beforeMidAudit = question => {
  if (question.subjectId !== 'informatics' || question.assessment !== 'Midterm' || !question.sourceOccurrenceIntegrity) return question;
  const {sourceOccurrenceIntegrity, sourceTranscript, ...original} = question;
  return original;
};
const sourceProjection = question => ({
  ...Object.fromEntries(fixture.sourceFields.filter(key => key in question).map(key => [key, question[key]])),
  giftPolicy: question.giftReview.policy,
  gradingAnswers: question.giftReview.gradingAnswers,
  ungradedReason: question.giftReview.ungradedReason
});
const nativeProjection = question => ({
  id: question.id, batch: question.sourceBatch,
  sourceNumber: question.sourceLocations[0].questionNumber,
  sourceParagraph: question.sourceLocations[0].paragraph,
  sourceFragment: question.sourceLocations[0].fragment,
  stem: question.stem, options: question.options,
  sourceAnswer: question.sourceAnswer, sourceAnswerNote: question.sourceAnswerNote,
  sourceTextSha256: hash(normalize(question.sourceText)),
  images: question.images, gradingAnswers: question.giftReview.gradingAnswers,
  sourceIssues: question.sourceIssues
});

function installFunctions(context) {
  for (const match of html.matchAll(/^    function ([A-Za-z_$][\w$]*)\(/gm)) {
    const end = html.indexOf('\n    }\n', match.index) + 6;
    assert.ok(end > match.index, `Unterminated application function: ${match[1]}`);
    vm.runInContext(html.slice(match.index, end), context, {filename: `index.html:${match[1]}`});
  }
}

const context = {window: {}};
vm.createContext(context);
let extendBatchesBeforeMedicineRepairs;
for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
  if (match[1] === "informatics-mid-445.js") continue; // Separate 445 MID PDF release.
  const file = path.join(root, match[1]);
  assert.ok(fs.existsSync(file), `Missing application module: ${match[1]}`);
  if (match[1] === 'medicine-native-repairs.js') {
    extendBatchesBeforeMedicineRepairs = context.window.GIFT445_EXTEND_BATCH_BANK;
  }
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename: match[1]});
}
installFunctions(context);
const complete = context.window.GIFT445_COMPLETE_INFORMATICS_FINAL;
assert.equal(typeof complete, 'function');
const reviews = plain(context.window.GIFT445_INFORMATICS_FINAL_REVIEWS);
const assets = plain(context.window.GIFT445_INFORMATICS_FINAL_ASSETS);
assert.equal(Object.keys(reviews).length, 351, 'Every question covered by the nine course lectures needs an individual review');

const start = html.indexOf('    const QUESTION_BANK =');
const end = html.indexOf('\n\n', start);
assert.ok(start >= 0 && end > start);
const code = html.slice(start, end).replace('const QUESTION_BANK', 'window.__FINAL_COMPLETE_TEST_BANK');
assert.match(code, /GIFT445_COMPLETE_INFORMATICS_FINAL\(/, 'The visible bank bypasses the tested completion layer');
context.window.GIFT445_COMPLETE_INFORMATICS_FINAL = bank => bank;
// The native MID lecture audit has its own source-and-route regression test.
context.window.GIFT445_AUDIT_INFORMATICS_PLACEMENT = bank => bank;
const extendProductionBatches = context.window.GIFT445_EXTEND_BATCH_BANK;
if (extendBatchesBeforeMedicineRepairs) {
  // Check the historical snapshot before the separately tested Medicine corrections.
  context.window.GIFT445_EXTEND_BATCH_BANK = extendBatchesBeforeMedicineRepairs;
}
vm.runInContext(code, context);
const historical = plain(context.window.__FINAL_COMPLETE_TEST_BANK).filter(question => !isFinal(question));
assert.equal(hash(canonical(historical.map(beforeMidAudit))), fixture.otherRuntimeSha256);
context.window.GIFT445_EXTEND_BATCH_BANK = extendProductionBatches;
vm.runInContext(code, context);
const before = context.window.__FINAL_COMPLETE_TEST_BANK;
assert.equal(before.length, fixture.runtimeCount);
const oldFinal = plain(before).filter(isFinal);
assert.equal(hash(canonical(oldFinal.map(sourceProjection))), fixture.finalSourceSha256);
assert.equal(hash(canonical(oldFinal.map(nativeProjection))), fixture.nativeInventorySha256,
  'Existing source records do not match the independently parsed native Word bank');

const originalInput = JSON.stringify(before);
const originalArrays = Object.fromEntries(Object.entries(context.window)
  .filter(([name, value]) => /^GIFT445_.*QUESTIONS$/.test(name) && Array.isArray(value))
  .map(([name, value]) => [name, JSON.stringify(value)]));
const completed = complete(before);
assert.equal(JSON.stringify(before), originalInput, 'Completion mutated the original bank or a nested review');
for (const [name, serialized] of Object.entries(originalArrays)) {
  assert.equal(JSON.stringify(context.window[name]), serialized, `${name}: imported question array changed`);
}
assert.deepEqual(plain(complete(completed)), plain(completed), 'Completion is not idempotent');
let calls = 0;
context.window.GIFT445_COMPLETE_INFORMATICS_FINAL = bank => { calls++; return complete(bank); };
vm.runInContext(code, context);
assert.equal(calls, 1, 'The production bank must apply the completion once');
const bank = plain(context.window.__FINAL_COMPLETE_TEST_BANK);
assert.deepEqual(bank, plain(completed), 'The application differs from the tested completion result');
assert.equal(bank.length, fixture.runtimeCount);
assert.equal(new Set(bank.map(question => question.id)).size, bank.length);
assert.deepEqual(bank.filter(question => !isFinal(question)), plain(before).filter(question => !isFinal(question)),
  'Another subject, original MID record or batch-only question changed');
const final = bank.filter(isFinal);
assert.equal(final.length, 431);
assert.equal(hash(canonical(final.map(sourceProjection))), fixture.finalSourceSha256,
  'Final question text, options, original keys, source media, exam labels, source positions or grading changed');
assert.equal(hash(canonical(final.map(nativeProjection))), fixture.nativeInventorySha256,
  'The visible Final bank differs from the native-source inventory');

const byId = new Map(bank.map(question => [question.id, question]));
const courseLectures = new Set(fixture.courseLectures);
const sourceLecture = new Map([
  ...fixture.courseLectures.slice(0, 5).map((lecture, index) => [`team444-L${index + 1}`, lecture]),
  ['1DMkrjtv4Jx0cRPriZ_Gq4ggQ4TehrOKB', fixture.courseLectures[5]],
  ['1iMs82SSGkUZYixU596G7OjwOCisOLVng', fixture.courseLectures[6]],
  ['182Eb2lnOvjMES7eUOe2Oz37bL-LJp0oT', fixture.courseLectures[7]],
  ['1h7L0vrIQ2CeqfQwC7l5TPpqkN1CpQ4R7', fixture.courseLectures[8]]
]);
const expectedReviewIds = new Set([
  ...oldFinal.filter(question => courseLectures.has(question.lecture)).map(question => question.id),
  ...fixture.recoveredIds
]);
assert.equal(expectedReviewIds.size, 351);
assert.deepEqual(Object.keys(reviews).sort(), [...expectedReviewIds].sort(), 'A source question was omitted, duplicated or reviewed outside the nine lectures');
const outside = final.filter(question => !expectedReviewIds.has(question.id));
assert.equal(outside.length, 80);
const placed = final.filter(question => question.lecture);
assert.equal(placed.length, 327);
assert.equal(final.filter(question => question.informaticsFinalLectureUnverified).length, 24);
assert.deepEqual(fixture.courseLectures.map(lecture => placed.filter(question => question.lecture === lecture).length),
  [36, 61, 77, 52, 4, 31, 28, 11, 27], 'Verified lecture coverage changed');
for (const question of final) {
  assert.equal(question.batchOnly, undefined, 'Final source occurrences must not become duplicate bank-only copies');
  assert.equal(question.assessment, 'Final');
  assert.ok(question.sourceLocations.every(location => location.assessment === 'Final' && String(location.batch) === question.sourceBatch));
  const review = reviews[question.id];
  if (review) {
    assert.deepEqual(question.informaticsFinalReview, review, `${question.id}: authored review is not visible`);
    assert.equal(question.informaticsReviewStatus, 'reviewed');
    assert.ok(!question.informaticsFinalOutOfScope, question.id);
    if (review.evidence.some(passage => sourceLecture.has(passage.sourceId))) {
      assert.ok(courseLectures.has(question.lecture), `${question.id}: invented lecture`);
      assert.deepEqual(question.informaticsLectures, [question.lecture], `${question.id}: duplicate lecture placement`);
      assert.ok(review.evidence.some(passage => sourceLecture.get(passage.sourceId) === question.lecture),
        `${question.id}: primary lecture has no verified matching passage`);
      assert.ok(!question.hideFromLecture && !question.informaticsFinalLectureUnverified, question.id);
    } else {
      assert.equal(question.lecture, null, `${question.id}: invented lecture for interpretation only`);
      assert.deepEqual(question.informaticsLectures, []);
      assert.ok(question.hideFromLecture && question.informaticsFinalLectureUnverified, question.id);
    }
    assert.ok(review.explanation.trim().length >= 140, `${question.id}: missing individual explanation`);
    assert.doesNotMatch(review.explanation, /provides the matching rule or definition|verification is pending|Explanation deferred/i, question.id);
    assert.doesNotMatch(review.explanation + review.objection + review.basisNote, /[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u, question.id);
    assert.ok(['supported', 'preference', 'unresolved'].includes(review.confidence), question.id);
    assert.ok(['lecture', 'reference', 'interpretation'].includes(review.basis), question.id);
    assert.ok(Array.isArray(review.answers) && Array.isArray(review.evidence) && Array.isArray(review.references), question.id);
    for (const answer of review.answers) assert.ok(question.options.some(option => option.id === answer && option.text.trim()), question.id);
    if (review.confidence === 'unresolved') assert.deepEqual(review.answers, [], question.id);
    if (review.basis === 'lecture') assert.ok(review.evidence.some(passage => passage.supportRole === 'direct' && ['lecture-notes', 'teamwork-lecture-notes', 'printed-notes'].includes(passage.sourceKind)),
      `${question.id}: a broad topic link or AI-assisted study file became original lecture proof`);
    if (!review.evidence.length) assert.notEqual(review.basis, 'lecture', question.id);
    for (const passage of review.evidence) {
      assert.ok(['direct', 'related'].includes(passage.supportRole), question.id);
      assert.ok(['lecture-notes', 'teamwork-lecture-notes', 'printed-notes', 'study-file', 'reference-notes'].includes(passage.sourceKind), question.id);
      assert.ok(passage.sourceId && passage.lectureTitle && passage.url, question.id);
      assert.ok(Number.isSafeInteger(passage.pdfPage) && passage.pdfPage > 0 && passage.pdfPage <= passage.sourcePageCount, question.id);
      assert.match(passage.sourceSha256, /^[a-f0-9]{64}$/, question.id);
      assert.ok(passage.quoteParts.length && passage.quoteParts.every(part => typeof part === 'string' && part.trim()), question.id);
      assert.equal(passage.quote, passage.quoteParts[0], `${question.id}: separate source fragments were joined into a false continuous quotation`);
      const asset = assets[passage.image];
      assert.ok(asset, `${question.id}: missing source-image provenance`);
      for (const key of ['sourceId', 'sourceSha256', 'pdfPage', 'sourcePageCount', 'imageSha256', 'imageDimensions']) {
        assert.deepEqual(passage[key], asset[key], `${question.id}: inconsistent image/source metadata ${key}`);
      }
      if (!/^https:\/\//.test(passage.url)) assert.ok(fs.existsSync(path.join(root, passage.url.split('#')[0])), `${question.id}: missing original PDF`);
    }
    assert.doesNotMatch(JSON.stringify(review), /download_url|storage\.googleapis\.com|X-Goog-Signature|file:\/\/|\/(?:Users|home)\//, `${question.id}: private path or temporary URL published`);
  } else {
    assert.equal(question.informaticsFinalReview, undefined);
    assert.equal(question.lecture, null);
    assert.deepEqual(question.informaticsLectures, []);
    assert.equal(question.hideFromLecture, true);
    assert.equal(question.informaticsFinalOutOfScope, true);
    assert.equal(question.informaticsReviewStatus, 'deferred');
  }
}
assert.deepEqual(final.filter(question => !question.giftReview.gradingAnswers.length).map(question => question.id), fixture.ungradedIds,
  'An incomplete, uncertain or blank-key source item became scored');
assert.equal(fixture.ungradedIds.length, 23);
for (const image of fixture.questionImages) {
  assert.equal(hash(fs.readFileSync(path.join(root, image.image))), image.sha256, `${image.id}: original Word image changed`);
}

function jpegDimensions(bytes, filename) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `${filename}: source page is not a valid JPEG`);
  let i = 2;
  const markers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  while (i < bytes.length) {
    assert.equal(bytes[i++], 0xff, filename);
    while (bytes[i] === 0xff) i++;
    const marker = bytes[i++];
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd8) continue;
    const length = bytes.readUInt16BE(i);
    if (markers.has(marker)) return [bytes.readUInt16BE(i + 5), bytes.readUInt16BE(i + 3)];
    assert.ok(length >= 2, filename); i += length;
  }
  assert.fail(`Missing JPEG dimensions: ${filename}`);
}
for (const [image, metadata] of Object.entries(assets)) {
  assert.ok(image.startsWith('lecture-media/informatics/') && !image.includes('..'), image);
  const bytes = fs.readFileSync(path.join(root, image));
  assert.equal(hash(bytes), metadata.imageSha256, `${image}: source image bytes changed`);
  assert.deepEqual(jpegDimensions(bytes, image), metadata.imageDimensions, image);
  assert.equal(metadata.renderMethod, 'Original PDF page', image);
  assert.match(metadata.sourceSha256, /^[a-f0-9]{64}$/, image);
  assert.ok(metadata.pdfPage > 0 && metadata.pdfPage <= metadata.sourcePageCount, image);
}

context.QUESTION_BANK = bank;
for (const [batch, count] of Object.entries(fixture.batchCounts)) {
  const actual = plain(context.questionsForBatch('informatics', 'Final', batch));
  assert.equal(actual.length, count, `Batch ${batch}: native question count`);
  assert.deepEqual(actual.map(question => question.id), fixture.batchIds[batch], `Batch ${batch}: source order, repeated numbering or occurrences changed`);
  assert.deepEqual(plain(context.window.GIFT445_ORIGINAL_BATCH_INDEX.informatics[`Final|${batch}`]), fixture.batchIds[batch]);
}
const sourceBank = context.window.GIFT445_INFORMATICS_BANK;
assert.equal(sourceBank.entries(bank, 'Final').length, 431, 'Final source inventory was filtered by lecture scope');
assert.equal(sourceBank.entries(bank, 'Midterm').length, 448, 'Midterm source inventory was filtered by lecture scope');
assert.equal(sourceBank.practice(sourceBank.entries(bank)).length, 838);
for (const [assessment, expected] of [['Midterm', 432], ['Final', 420]]) {
  const practice = context.questionsForAssessment('informatics', assessment);
  assert.equal(practice.length, expected);
  assert.ok(practice.every(question => question.assessment === assessment), 'Assessment practice mixed two original Gift files');
  assert.deepEqual(plain(practice), plain(sourceBank.order(practice)), 'Practice no longer follows the original file');
  const original = sourceBank.entries(bank, assessment);
  assert.deepEqual(plain(original.map(q => q.id)), plain(Object.entries(context.window.GIFT445_ORIGINAL_BATCH_INDEX.informatics)
    .filter(([key]) => key.startsWith(`${assessment}|`)).flatMap(([, ids]) => ids)), 'Source order changed');
  assert.ok(original.every(question => sourceBank.location(question)?.url.startsWith('https://docs.google.com/document/d/')));
}
assert.equal(sourceBank.location(byId.get('informatics-mid-443-p0197')).number, 'Unnumbered in source');
assert.equal(sourceBank.location(byId.get('informatics-final-436-p1409-q02')).number, 'Original Q2');
for (const title of fixture.courseLectures) {
  const practice = sourceBank.lecture(bank.filter(q => q.subjectId === 'informatics'), [title]);
  assert.ok(practice.every(q => q.lecture === title && !q.hideFromLecture && !q.batchOnly));
  assert.deepEqual(plain(practice), plain(sourceBank.practice(practice)), `${title}: a confirmed repeat entered the lecture route`);
}
assert.equal(context.window.GIFT445_INFORMATICS_FINAL_COMPLETE, true);
assert.deepEqual(plain(context.window.GIFT445_INFORMATICS_CATALOG).flatMap(group => group.lectures), fixture.courseLectures);
assert.equal(context.window.GIFT445_INFORMATICS_CATALOG.length, 2);

// Render and answer every usable option in the actual production question card.
const renderer = {
  window: context.window, QUESTION_BANK: bank,
  SUBJECTS: [{id: 'informatics', name: 'Informatics'}], CYCLE_ORDER: [],
  appState: {navigation: {subjectId: 'informatics', mode: 'batch', assessment: 'Final'}, quiz: {answers: {}, questionIds: [], currentIndex: 0, flagged: []}},
  completedQuizKeys: new Set(), persistState() {}, captureAnalytics() {}, renderResumePanel() {},
  quizAnalyticsProperties: () => ({}), currentQuizKey: () => 'informatics-final-complete-test'
};
vm.createContext(renderer); installFunctions(renderer);
Object.assign(renderer, {
  persistState() {}, captureAnalytics() {}, renderResumePanel() {},
  quizAnalyticsProperties: () => ({}), currentQuizKey: () => 'informatics-final-complete-test'
});
let clicks = 0;
for (const question of final) {
  const review = question.informaticsFinalReview;
  const usable = question.options.filter(option => option.text.trim() || option.images?.length);
  for (const option of usable) {
    const buttons = usable.map(choice => ({dataset: {option: choice.id}, classes: new Set(), setAttribute() {}}));
    for (const button of buttons) button.classList = {toggle(name, on) {if (on) button.classes.add(name); else button.classes.delete(name);}};
    renderer.workspaceElement = {querySelector: selector => selector.includes('data-question-card')
      ? {querySelectorAll: () => buttons, querySelector: () => ({classList: {add() {}}})} : null};
    renderer.answerQuestion(question.id, option.id);
    const output = renderer.renderQuestion(question, 0, final.length); clicks++;
    assert.match(output, /answer-panel visible/, question.id);
    assert.match(output, review ? /Gift answer:/ : /Gift key:/, question.id);
    if (review) {
      assert.ok(output.includes(renderer.escapeHtml(review.explanation)), `${question.id}: authored explanation is not rendered`);
      assert.doesNotMatch(output, /Explanation deferred|AI opinion:|Tentative interpretation:/, question.id);
      if (!review.evidence.length) assert.match(output, /No verified course passage establishes this answer/, question.id);
      for (const passage of review.evidence) {
        assert.ok(output.includes(renderer.escapeHtml(passage.lectureTitle)), question.id);
        assert.ok(output.includes(`PDF page ${passage.pdfPage}`), question.id);
        assert.ok(output.includes(`src="${renderer.escapeHtml(passage.image)}"`), question.id);
        assert.ok(output.includes(`href="${renderer.escapeHtml(passage.image)}"`), question.id);
        for (const fragment of passage.quoteParts) assert.ok(output.includes(`<blockquote>${renderer.escapeHtml(fragment)}</blockquote>`), `${question.id}: missing exact fragment`);
        if (passage.supportRole === 'related') assert.match(output, /does not establish the exact answer/, question.id);
        if (passage.sourceKind === 'study-file') assert.match(output, /not presented as an original lecturer quotation/, question.id);
      }
      const key = [question.sourceAnswer].flat().filter(Boolean);
      if (!key.length) assert.doesNotMatch(output, /Differs from Gift/, `${question.id}: blank key falsely labelled a conflict`);
    } else {
      assert.match(output, /No matching passage in the supplied course lectures has been verified/, question.id);
      assert.doesNotMatch(output, /<strong>Explanation|Course reference:|Related course context:|Supplementary study file:/, question.id);
    }
    for (const button of buttons) {
      const correct = question.giftReview.gradingAnswers.includes(button.dataset.option);
      assert.equal(button.classes.has('correct'), correct, `${question.id}: feedback no longer follows the original Gift key`);
      assert.equal(button.classes.has('incorrect'), !!question.giftReview.gradingAnswers.length && button.dataset.option === option.id && !correct, question.id);
    }
    const saved = JSON.parse(JSON.stringify(renderer.appState.quiz.answers));
    renderer.appState.quiz.answers = saved;
    assert.equal(renderer.renderQuestion(question, 0, final.length), output, `${question.id}: feedback changed on reload`);
  }
}

const noop = () => {};
const sourceFooter = renderer.renderInformaticsFinalExplanation(final.find(question => question.informaticsFinalReview), 'Gift · Final · Batch 443 · Q13');
assert.match(sourceFooter, /Gift · Final · Batch 443 · Q13/);
assert.doesNotMatch(sourceFooter, /Gift · Gift/);
const stub = () => ({addEventListener: noop, classList: {add: noop}, disabled: false, innerHTML: ''});
renderer.captureAnalytics = noop; renderer.workspaceHeader = text => text; renderer.bindWorkspaceClose = noop;
renderer.workspaceElement = {innerHTML: '', classList: {add: noop}, querySelector: () => null, querySelectorAll: () => [], scrollIntoView: noop};
renderer.openSubject('informatics');
assert.doesNotMatch(renderer.workspaceElement.innerHTML, /Waiting for Lecture Files|6 pending topics|Final Lecture Files|Open original lecture/);
const cards = [...renderer.workspaceElement.innerHTML.matchAll(/class="route-card direct-lecture-card"[^>]*data-lecture="([^"]+)"/g)].map(match => match[1]);
assert.equal(cards.length, 14);
assert.deepEqual(cards, [...fixture.courseLectures.slice(0, 5), ...fixture.courseLectures].map(renderer.escapeHtml));
assert.match(renderer.workspaceElement.innerHTML, /431 original entries · 420 questions for practice/);
assert.match(renderer.workspaceElement.innerHTML, /448 original entries · 432 questions for practice/);
assert.match(renderer.workspaceElement.innerHTML, /838 questions for practice · 879 original entries/);
assert.doesNotMatch(renderer.workspaceElement.innerHTML, /620 questions/);
const elements = new Map();
renderer.workspaceElement.querySelector = selector => {if (!elements.has(selector)) elements.set(selector, stub()); return elements.get(selector);};
renderer.openLectureMixer('informatics');
const mixedLectures = [...renderer.workspaceElement.innerHTML.matchAll(/class="lecture-mix-check"[^>]*data-lecture="([^"]+)"/g)].map(match => match[1]);
assert.equal(mixedLectures.length, 9);
assert.deepEqual([...mixedLectures].sort(), fixture.courseLectures.map(renderer.escapeHtml).sort());
assert.doesNotMatch(renderer.workspaceElement.innerHTML, /pending|lecture waiting/i);

// An old MID quick review could be paused on a Final entry. Follow that exact
// saved entry into its correct bank instead of resetting the question or answer.
const savedFinal = byId.get('informatics-final-437-p1044-q13');
renderer.renderQuestionSetView = noop;
renderer.appState.navigation = {subjectId: 'informatics', mode: 'assessment', assessment: 'Midterm'};
renderer.appState.quiz = {questionIds: [savedFinal.id], currentIndex: 0, answers: {[savedFinal.id]: 'C'}, flagged: [savedFinal.id]};
renderer.resumeNavigation();
assert.equal(renderer.appState.navigation.assessment, 'Final');
assert.equal(renderer.appState.quiz.questionIds.length, 420);
assert.equal(renderer.appState.quiz.questionIds[renderer.appState.quiz.currentIndex], savedFinal.id);
assert.equal(renderer.appState.quiz.answers[savedFinal.id], 'C');
assert.equal(renderer.appState.quiz.flagged[0], savedFinal.id);
assert.ok(!renderer.appState.quiz.questionIds.includes('informatics-final-438-p0767-q13'), 'The saved repeat and its equivalent both entered practice');

// Regression cases independently recovered through actual diagram inspection.
assert.deepEqual(reviews['informatics-final-442-p0543-q29'].answers, ['A']);
assert.ok(reviews['informatics-final-442-p0543-q29'].evidence.some(passage => passage.sourceId === 'team444-L5' && passage.pdfPage === 8 && passage.supportRole === 'direct'));
assert.deepEqual(reviews['informatics-final-441-p0588-q04'].answers, ['A']);
assert.ok(reviews['informatics-final-441-p0588-q04'].evidence.some(passage => passage.sourceId === 'team444-L2' && passage.pdfPage === 4 && passage.supportRole === 'direct'));
assert.deepEqual(reviews['informatics-final-442-p0499-q23'].answers, ['A']);
assert.equal(byId.get('informatics-final-442-p0499-q23').sourceAnswer, 'C');
assert.equal(byId.get('informatics-final-443-p0165-q15').lecture, 'Electronic Health Records', 'E-iatrogenesis definition is from L3');
assert.equal(byId.get('informatics-final-438-p0789-q16').lecture, 'Clinical Decision Support', 'CDSS alert fatigue is from L4');
const demographicReview = byId.get('informatics-final-437-p1088-q19');
assert.equal(demographicReview.lecture, 'Health Data Privacy, Confidentiality and Security');
assert.ok(demographicReview.informaticsFinalReview.evidence.some(passage => passage.pdfPage === 10
  && passage.sourceKind === 'reference-notes' && passage.supportRole === 'related'));
assert.equal(byId.get('informatics-final-435-p1785-q24').lecture, null, 'Sodium sulphate terminology has no verified course placement');
assert.deepEqual(reviews['informatics-final-443-p0242-q26'].evidence[0].quoteParts,
  ['Staging', 'the process of cleaning the data from any incorrect or missing values.'], 'Separate source table cells stay separate');
assert.deepEqual(reviews['informatics-final-435-p1703-q13'].answers, []);
assert.match(reviews['informatics-final-435-p1703-q13'].explanation, /incomplete|incompleteness/i);
// Location alone does not establish a record's interoperability scope.
assert.equal(reviews['informatics-final-443-p0126-q09'].confidence, 'preference');
assert.equal(reviews['informatics-final-443-p0126-q09'].basis, 'interpretation');
assert.deepEqual(reviews['informatics-final-433-p2572-q46'].answers, ['A']);
assert.equal(reviews['informatics-final-433-p2572-q46'].confidence, 'preference');
// A subset also belongs to its umbrella category when no specificity is asked.
for (const id of ['informatics-final-442-p0357-q03', 'informatics-final-441-p0662-q15', 'informatics-final-432-p2837-q21']) {
  assert.deepEqual(reviews[id].answers, ['A', 'B']);
  assert.match(reviews[id].objection, /Both offered classifications apply/);
}

console.log(`PASS: 448 MID and 431 Final original entries kept in source order; 432 MID and 420 Final practice questions, 838 combined; 351 individual Final reviews with 327 verified primary placements; ${Object.keys(assets).length} authentic source pages and ${clicks} all-choice/reload checks.`);
