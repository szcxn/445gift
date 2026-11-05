const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/mid-slide-evidence-baseline.json'), 'utf8'));
const batches = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/original-batches.json'), 'utf8'));
const plain = value => JSON.parse(JSON.stringify(value));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const canonical = value => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(canonical).join(',')}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;

function immutableQuestions(questions) {
  return plain(questions).map(question => {
    for (const key of baseline.reviewKeys) {
      if (!question[key]) continue;
      delete question[key].evidence;
      delete question[key].basis;
    }
    return question;
  });
}

function checkBaseline(questions, label) {
  assert.equal(questions.length, baseline.questions, `${label}: question count changed`);
  assert.equal(hash(canonical(immutableQuestions(questions))), baseline.sha256,
    `${label}: original source content, ordering, grading, scientific answer, confidence, explanation, or placement changed`);
  for (const [subject, expected] of Object.entries(baseline.subjects)) {
    const selected = questions.filter(question => question.subjectId === subject);
    assert.equal(selected.length, expected.questions, `${subject}: original occurrence count`);
    assert.equal(hash(canonical(immutableQuestions(selected))), expected.sha256, `${subject}: immutable runtime fields`);
  }
}

function installFunctions(context) {
  // Load the real application functions without bootstrapping browser state.
  // This includes any evidence-display helpers regardless of their position.
  for (const match of html.matchAll(/^    function ([A-Za-z_$][\w$]*)\(/gm)) {
    const end = html.indexOf('\n    }\n', match.index) + 6;
    assert.ok(end > match.index, `Unterminated application function: ${match[1]}`);
    vm.runInContext(html.slice(match.index, end), context, {filename: `index.html:${match[1]}`});
  }
}

const context = {window: {}};
vm.createContext(context);
for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
  const filename = path.join(root, match[1]);
  assert.ok(fs.existsSync(filename), `Missing application script: ${match[1]}`);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {filename: match[1]});
}
// This fixture records the November 4 MID-source stage. The later Informatics
// Final review has its own full-runtime conservation and rendering test.
if (context.window.GIFT445_COMPLETE_INFORMATICS_FINAL) context.window.GIFT445_COMPLETE_INFORMATICS_FINAL = bank => bank;
installFunctions(context);
assert.equal(typeof context.window.GIFT445_COMPLETE_MID_EVIDENCE, 'function');
const patches = plain(context.window.GIFT445_MID_EVIDENCE_PATCHES);
const assets = plain(context.window.GIFT445_MID_EVIDENCE_ASSETS);
assert.ok(Object.keys(patches).length > 0, 'Evidence overlay contains no reviewed patches');
assert.ok(Object.keys(assets).length > 0, 'Evidence overlay contains no source images');

const declarationStart = html.indexOf('    const QUESTION_BANK =');
const declarationEnd = html.indexOf('\n\n', declarationStart);
assert.ok(declarationStart >= 0 && declarationEnd > declarationStart);
const bankCode = html.slice(declarationStart, declarationEnd).replace('const QUESTION_BANK', 'window.__EVIDENCE_TEST_BANK');
assert.match(bankCode, /GIFT445_COMPLETE_MID_EVIDENCE\(/, 'The visible application bank bypasses the evidence overlay');
const complete = context.window.GIFT445_COMPLETE_MID_EVIDENCE;
context.window.GIFT445_COMPLETE_MID_EVIDENCE = bank => bank;
vm.runInContext(bankCode, context);
const before = context.window.__EVIDENCE_TEST_BANK;
checkBaseline(before, 'Before overlay');
const beforeJson = JSON.stringify(before);
const rawArrays = Object.fromEntries(Object.entries(context.window)
  .filter(([name, value]) => /^GIFT445_.*QUESTIONS$/.test(name) && Array.isArray(value))
  .map(([name, value]) => [name, JSON.stringify(value)]));
const patchJson = JSON.stringify(context.window.GIFT445_MID_EVIDENCE_PATCHES);
const completed = complete(before);
assert.equal(JSON.stringify(before), beforeJson, 'Overlay mutated its input bank or a nested review');
for (const [name, value] of Object.entries(rawArrays)) {
  assert.equal(JSON.stringify(context.window[name]), value, `${name}: original module array was mutated`);
}
assert.equal(JSON.stringify(context.window.GIFT445_MID_EVIDENCE_PATCHES), patchJson, 'Overlay mutated its evidence manifest');
checkBaseline(completed, 'After overlay');
assert.deepEqual(plain(complete(completed)), plain(completed), 'Applying the overlay twice changes feedback');
let wrapperCalls = 0;
context.window.GIFT445_COMPLETE_MID_EVIDENCE = bank => {
  wrapperCalls++;
  return complete(bank);
};
vm.runInContext(bankCode, context);
const questions = plain(context.window.__EVIDENCE_TEST_BANK);
assert.equal(wrapperCalls, 1, 'The application must complete the final deduplicated bank exactly once');
assert.deepEqual(questions, plain(completed), 'The UI bank differs from the tested overlay result');
const beforeById = new Map(plain(before).map(question => [question.id, question]));
const byId = new Map(questions.map(question => [question.id, question]));
assert.equal(byId.size, questions.length, 'Duplicate runtime IDs');

// Original bank navigation retains every occurrence, repeated number and order.
context.QUESTION_BANK = questions;
assert.deepEqual(plain(context.window.GIFT445_ORIGINAL_BATCH_INDEX), batches.index);
let originalOccurrences = 0;
for (const [subject, sets] of Object.entries(batches.index)) {
  for (const [key, ids] of Object.entries(sets)) {
    const [assessment, batch] = key.split('|');
    assert.deepEqual(plain(context.questionsForBatch(subject, assessment, batch)).map(question => question.id), ids,
      `${subject} ${key}: original batch order or occurrence changed`);
    originalOccurrences += ids.length;
  }
}
assert.equal(originalOccurrences, 6446);
for (const question of questions.filter(question => question.batchOnly)) {
  const original = beforeById.get(question.id);
  const patch = question.inheritStudyReview && patches[question.studyQuestionId];
  if (!patch) {
    assert.deepEqual(question, original, `${question.id}: an independent original-batch review changed`);
  } else {
    assert.ok(question.studyQuestionId, `${question.id}: inherited evidence has no study question`);
    assert.deepEqual(question[patch.reviewKey].evidence, byId.get(question.studyQuestionId)[patch.reviewKey].evidence,
      `${question.id}: inherited source evidence diverged from the explicitly linked study question`);
  }
}
for (const subject of ['community', 'research', 'radiology']) {
  assert.equal(context.questionsForAssessment(subject, 'Final').length, 0, `${subject}: Final-only questions leaked into lecture practice`);
}
for (const question of questions.filter(question => question.subjectId === 'informatics' && question.informaticsReviewStatus === 'deferred')) {
  assert.deepEqual(question, beforeById.get(question.id), `${question.id}: deferred Final-only feedback changed`);
}

function imageDimensions(bytes, filename) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  }
  if (bytes.subarray(0, 3).toString() === 'GIF') return [bytes.readUInt16LE(6), bytes.readUInt16LE(8)];
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `${filename}: unsupported or invalid image`);
  const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset < bytes.length) {
    assert.equal(bytes[offset++], 0xff, `${filename}: invalid JPEG marker`);
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd8) continue;
    const length = bytes.readUInt16BE(offset);
    if (sof.has(marker)) return [bytes.readUInt16BE(offset + 5), bytes.readUInt16BE(offset + 3)];
    assert.ok(length >= 2, `${filename}: invalid JPEG segment`);
    offset += length;
  }
  assert.fail(`${filename}: image dimensions not found`);
}

for (const [relative, metadata] of Object.entries(assets)) {
  assert.ok(relative.startsWith('lecture-media/'), `Non-source image published in evidence manifest: ${relative}`);
  assert.equal(path.isAbsolute(relative), false, relative);
  assert.ok(!relative.split(/[\\/]/).includes('..'), `Unsafe evidence image path: ${relative}`);
  const filename = path.join(root, relative);
  assert.ok(fs.existsSync(filename), `Missing source image: ${relative}`);
  const bytes = fs.readFileSync(filename);
  assert.match(metadata.imageSha256, /^[a-f0-9]{64}$/);
  assert.match(metadata.sourceSha256, /^[a-f0-9]{64}$/);
  assert.equal(hash(bytes), metadata.imageSha256, `${relative}: source image bytes changed`);
  const dimensions = imageDimensions(bytes, relative);
  assert.deepEqual(dimensions, metadata.imageDimensions, `${relative}: declared dimensions differ from actual image`);
  assert.ok(dimensions.every(value => Number.isSafeInteger(value) && value > 0), relative);
  assert.ok(metadata.sourceId && metadata.renderMethod, `${relative}: source provenance missing`);
  assert.ok(['page', 'slide', 'paragraph'].includes(metadata.unit), `${relative}: unknown source unit`);
  assert.ok(Number.isSafeInteger(metadata.page) && metadata.page > 0, relative);
  assert.ok(Number.isSafeInteger(metadata.sourcePageCount) && metadata.sourcePageCount > 0, relative);
  if (metadata.unit !== 'paragraph') assert.ok(metadata.page <= metadata.sourcePageCount, `${relative}: source position out of range`);
}

const renderer = {
  window: context.window,
  QUESTION_BANK: questions,
  SUBJECTS: Object.keys(baseline.subjects).map(id => ({id, name: id})),
  appState: {navigation: {mode: 'lecture', assessment: null}, quiz: {answers: {}, questionIds: [], currentIndex: 0}},
  completedQuizKeys: new Set(),
  currentQuizKey: () => 'mid-evidence-test',
  persistState() {}, captureAnalytics() {}, quizAnalyticsProperties: () => ({})
};
vm.createContext(renderer);
installFunctions(renderer);
let direct = 0, related = 0, notes = 0, summaries = 0;
for (const [id, patch] of Object.entries(patches)) {
  const question = byId.get(id);
  assert.ok(question, `${id}: evidence patch has no effective runtime question`);
  assert.ok(!question.batchOnly || question.inheritStudyReview && question.studyQuestionId, `${id}: invalid original-batch patch`);
  assert.ok(baseline.reviewKeys.includes(patch.reviewKey), `${id}: invalid review field`);
  const review = question[patch.reviewKey];
  const evidence = review?.evidence;
  assert.deepEqual(evidence, patch.evidence, `${id}: patch evidence not applied to the UI bank`);
  if (patch.basis) assert.equal(review.basis, patch.basis, id);
  assert.ok(evidence.quote?.trim() || evidence.sourceSummary?.trim(), `${id}: no source excerpt`);
  assert.ok(['direct', 'teaching', 'background'].includes(evidence.relation), `${id}: ambiguous support relation`);
  assert.ok(evidence.cohortLabel?.trim(), `${id}: cohort/source attribution missing`);
  assert.doesNotMatch(JSON.stringify(evidence), /download_url|storage\.googleapis\.com|X-Goog-Signature|file:\/\/|\/(?:Users|home)\//,
    `${id}: private path or temporary download URL published`);
  const asset = assets[evidence.image];
  assert.ok(asset, `${id}: displayed image absent from verified asset manifest`);
  assert.equal(evidence.imageSha256, asset.imageSha256, id);
  assert.deepEqual(evidence.imageDimensions, asset.imageDimensions, id);
  assert.equal(evidence.sourceId, asset.sourceId, id);
  assert.equal(evidence.sourceSha256, asset.sourceSha256, id);
  assert.equal(evidence.page, asset.page, id);
  assert.equal(evidence.unit, asset.unit, id);
  if (evidence.slideImage) assert.ok(assets[evidence.slideImage], `${id}: original slide link lacks verified asset`);

  const output = renderer.renderMedicineExplanation(question, '', review);
  const escaped = renderer.escapeHtml;
  assert.ok(output.includes(escaped(review.explanation)), `${id}: explanation was lost from feedback`);
  assert.ok(output.includes(escaped(evidence.title)) && output.includes(escaped(evidence.cohortLabel)), `${id}: displayed source attribution missing`);
  assert.ok(output.includes(`src="${escaped(evidence.image)}"`), `${id}: source image hidden`);
  assert.ok(output.includes(`href="${escaped(evidence.image)}"`), `${id}: source image full-size link missing`);
  assert.ok(output.includes(`href="${escaped(evidence.url)}"`), `${id}: original source link missing`);
  if (evidence.relation === 'background') {
    related++;
    assert.match(output, /Related source:/, `${id}: related evidence represented as direct`);
    assert.match(output, /does not establish the answer/, `${id}: background limitation hidden`);
    assert.doesNotMatch(output, /<summary>View supporting (?:slide|notes|text)<\/summary>/, `${id}: background source falsely labelled supporting`);
  } else {
    direct++;
    assert.match(output, /<div class="medicine-source">Source:/, `${id}: direct source attribution missing`);
    assert.doesNotMatch(output, /<summary>Related (?:slide|speaker notes|source text)<\/summary>/, id);
  }
  if (evidence.textKind === 'speaker-notes') {
    notes++;
    assert.ok(output.includes(`Speaker notes for Slide ${evidence.page}`), `${id}: notes were labelled as visible slide text`);
    assert.match(output, /quoted text is from the lecturer&#39;s speaker notes|quoted text is from the lecturer's speaker notes/, id);
    assert.ok(['quotedSource', 'slideContextOnly'].includes(evidence.imageRole), id);
    if (evidence.imageRole === 'slideContextOnly') {
      assert.equal(id, 'community-final-431-q011', 'Unexpected quote without a visible notes-page source');
      assert.match(output, /quotation is in its notes, not on the slide itself/, id);
      assert.match(output, /slide context only/, id);
    } else {
      assert.match(output, /image below shows the original notes page/, id);
      assert.ok(evidence.slideImage && evidence.slideImage !== evidence.image, `${id}: notes page replaced with slide context`);
    }
  }
  const blocks = [...output.matchAll(/<blockquote>([\s\S]*?)<\/blockquote>/g)].map(match => match[1]);
  if (evidence.quoteKind === 'summary') {
    summaries++;
    assert.ok(evidence.sourceSummary?.trim(), `${id}: source summary missing`);
    assert.ok(output.includes(`<strong>Source summary:</strong> ${escaped(evidence.sourceSummary)}`), `${id}: summary not clearly labelled`);
    assert.ok(!blocks.includes(escaped(evidence.sourceSummary)), `${id}: a summary was represented as a verbatim quotation`);
    if (!evidence.quoteParts?.length) assert.equal(blocks.length, 0, `${id}: summary-only source rendered inside quotation marks`);
  }
  for (const fragment of evidence.quoteParts || (evidence.quoteKind === 'summary' ? [] : [evidence.quote])) {
    assert.ok(blocks.includes(escaped(fragment)), `${id}: exact source excerpt missing from feedback`);
  }
}
assert.ok(direct > 0 && related > 0 && notes > 0 && summaries > 0, 'Evidence-display regression cases are missing');

const exception = byId.get('community-final-431-q011');
assert.equal(exception.communityReview.evidence.textKind, 'speaker-notes');
assert.equal(exception.communityReview.evidence.imageRole, 'slideContextOnly');
assert.equal(exception.communityReview.evidence.page, 9);
assert.match(exception.communityReview.evidence.quote, /Touch a need/);
assert.doesNotMatch(exception.communityReview.evidence.image, /-notes\./, 'Clipped notes page falsely used as the visible quote source');
// Separate table cells must not become a newly written continuous quotation.
const mmr = byId.get('community-mid-maternal-health-77783cf2').communityReview.evidence;
assert.equal(mmr.sourceId, '1gFWmD24J1BBJmiv7Q5Df-hAiZR0i9A6B');
assert.equal(mmr.page, 8);
assert.equal(mmr.quoteKind, 'fragments');
assert.deepEqual(mmr.quoteParts, ['MMR (Measles, Mumps, Rubella)', 'No, should be avoided during pregnancy.', 'It is a live-virus vaccine.']);
assert.equal(mmr.quote, mmr.quoteParts[0]);
// Exercise actual question-card routing, not only the source-display helper.
for (const question of [exception, ...['direct', 'background'].map(relation => {
  const [id] = Object.entries(patches).find(([, patch]) => patch.evidence.relation === relation);
  return byId.get(id);
})]) {
  renderer.appState.quiz.answers[question.id] = question.options[0]?.id || '__reviewed__';
  const output = renderer.renderQuestion(question, 0, 1);
  assert.match(output, /answer-panel visible/);
  assert.ok(output.includes(renderer.escapeHtml(question[patches[question.id].reviewKey].evidence.image)), question.id);
  assert.ok(output.includes(renderer.escapeHtml(question[patches[question.id].reviewKey].explanation)), question.id);
}
const missing = questions.find(question => !question.batchOnly && question.communityReview && !question.communityReview.evidence);
assert.ok(missing, 'No genuine source-gap regression case remains');
assert.match(renderer.renderMedicineExplanation(missing, '', missing.communityReview), /No verified lecture passage is attached to this explanation/);

console.log(`PASS: MID evidence overlay preserves ${questions.length} original runtime records and ${originalOccurrences} original batch occurrences; ${Object.keys(patches).length} patches, ${Object.keys(assets).length} verified image hashes/dimensions; direct/background, summaries, speaker notes and the clipped-notes context exception render correctly.`);
