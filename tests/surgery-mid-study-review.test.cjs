const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const fixture = JSON.parse(fs.readFileSync(path.join(root, 'tests/fixtures/surgery-mid-study-review.json')));

function imported(skipSurgeryReview = false) {
  const context = { window: {} };
  vm.createContext(context);
  for (const script of html.matchAll(/<script src="([^"?]+)/g)) {
    if (skipSurgeryReview && script[1] === 'surgery-mid-study-review.js') continue;
    const filename = path.join(root, script[1]);
    if (fs.existsSync(filename)) vm.runInContext(fs.readFileSync(filename, 'utf8'), context);
  }
  return context;
}

const before = imported(true), after = imported();
const original = plain(before.window.GIFT445_SURGERY_QUESTIONS);
const live = plain(after.window.GIFT445_SURGERY_QUESTIONS);
const byId = new Map(live.map(q => [q.id, q]));
const selectedIds = new Set(fixture.selectedIds);
const lectureOrder = new Map(plain(after.window.GIFT445_SURGERY_CATALOG).flatMap(block => block.lectures).map((lecture, index) => [lecture, index + 1]));
assert.equal(fixture.lectureVisibilityRepairs.length, 68);
assert.equal(selectedIds.size, 970);
assert.equal(fixture.primaryMidterm, 934);
assert.equal(fixture.existingMidLectureFinalIds.length, 36);
assert.equal(live.length, original.length);
assert.equal(byId.size, live.length);

for (const q of original) {
  const actual = plain(byId.get(q.id));
  const expected = { ...q, ...(fixture.corrections[q.id]?.after || {}) };
  if (fixture.placements[q.id]) {
    expected.lecture = fixture.placements[q.id].lecture;
    expected.lectureOrder = lectureOrder.get(expected.lecture);
  }
  if (fixture.lectureVisibilityRepairs.includes(q.id)) expected.hideFromLecture = false;
  if (selectedIds.has(q.id)) {
    assert.ok(actual.surgeryReview, `Missing individual review: ${q.id}`);
    assert.equal(actual.giftReview.policy, 'gift-key-first');
    delete actual.surgeryReview;
    delete actual.giftReview;
    delete actual.surgerySourceIntegrity;
  }
  assert.deepEqual(actual, expected, `Unapproved source, placement, visibility or progress-ID change: ${q.id}`);
}
for (const key of ['GIFT445_QUESTIONS', 'GIFT445_COMMUNITY_QUESTIONS', 'GIFT445_INFORMATICS_QUESTIONS', 'GIFT445_INFORMATICS_FINAL_QUESTIONS']) {
  assert.deepEqual(plain(after.window[key]), plain(before.window[key]), `${key} changed`);
}
const selected = live.filter(q => selectedIds.has(q.id));
assert.equal(selected.length, 970);
assert.ok(live.filter(q => q.excluded).every(q => !q.surgeryReview), 'Excluded Nutrition records must remain excluded');
const sources = new Map(fixture.sources.map(source => [source.id, source]));
for (const q of selected) {
  const r = q.surgeryReview;
  assert.ok(r.explanation.length >= 80, q.id);
  assert.doesNotMatch(JSON.stringify(r), /[\u0600-\u06ff\ufb50-\ufdff\ufe70-\ufeff]/u);
  assert.ok(['supported', 'preference', 'unresolved'].includes(r.confidence));
  assert.ok(['lecture', 'clinical'].includes(r.basis));
  if (r.confidence === 'unresolved') assert.deepEqual(r.answers, [], q.id);
  for (const answer of r.answers) assert.ok(q.options.some(o => o.id === answer && o.text.trim() && !/not recorded in (?:the )?source/i.test(o.text)), q.id);
  const keys = Array.isArray(q.sourceAnswer) ? q.sourceAnswer : q.sourceAnswer ? [q.sourceAnswer] : [];
  if (q.giftReview.gradingAnswers.length) assert.deepEqual(q.giftReview.gradingAnswers, keys, `An opinion replaced the bank key: ${q.id}`);
  else assert.ok(q.giftReview.ungradedReason, q.id);
  if (r.answers.length && keys.length && JSON.stringify([...r.answers].sort()) !== JSON.stringify([...keys].sort())) assert.ok(r.objection, q.id);
  if (r.basis === 'lecture') assert.equal(r.evidence?.relation, 'teaching', q.id);
  if (r.evidence) {
    const e = r.evidence, source = sources.get(e.pdfId);
    assert.ok(source, q.id);
    assert.equal(e.sourceSha256, source.sha256);
    assert.ok(Number.isInteger(e.page) && e.page > 0 && e.page <= source.pageCount);
    assert.ok(e.quote.trim());
    assert.match(e.url, /^https:\/\/drive\.google\.com\//);
    assert.match(e.image, /^lecture-media\/surgery-mid\/[\w-]+-\d{3}\.jpg$/);
    assert.equal(hash(fs.readFileSync(path.join(root, e.image))), e.imageSha256);
  }
}

const renderer = {
  appState: { navigation: { mode: 'lecture', assessment: null }, quiz: { answers: {}, questionIds: selected.map(q => q.id), currentIndex: 0 } },
  SUBJECTS: [{ id: 'surgery', name: 'Surgery' }], QUESTION_BANK: live,
  escapeHtml: v => String(v ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch])),
  persistState() {}, captureAnalytics() {}, quizAnalyticsProperties: () => ({}), completedQuizKeys: new Set(), currentQuizKey: () => 'test',
};
vm.createContext(renderer);
vm.runInContext(html.slice(html.indexOf('    function deduplicateQuestions('), html.indexOf('    const STORAGE_KEY')), renderer);
const displayed = renderer.deduplicateQuestions(live.filter(q => !q.excluded));
assert.equal(displayed.length, 1212, 'Source reconstruction must preserve all previously displayed questions');
assert.equal(displayed.filter(q => q.assessment === 'Midterm').length, 934);
assert.deepEqual(displayed.map(q => q.id), original.filter(q => !q.excluded).map(q => q.id), 'Existing saved question IDs changed during display deduplication');
const midLectureTitles = new Set(plain(after.window.GIFT445_SURGERY_CATALOG).filter(block => block.assessment === 'Midterm').flatMap(block => block.lectures));
const currentMidPractice = displayed.filter(q => !q.cycle && !q.hideFromLecture && midLectureTitles.has(q.lecture));
assert.equal(currentMidPractice.length, 928);
assert.ok(currentMidPractice.every(q => q.surgeryReview), 'A current MID lecture still exposes unaudited legacy feedback');
vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'), html.indexOf('    function questionCountLabel(')), renderer);
// This helper sits later in the UI source, outside the renderer segment.
const batchStart = html.indexOf('    function batchDisplayName(');
const batchEnd = html.indexOf('\n    }\n', batchStart) + 6;
vm.runInContext(html.slice(batchStart, batchEnd), renderer);
for (const q of selected) {
  const usable = q.options.filter(o => !renderer.isMissingSourceOption(o.text));
  delete renderer.appState.quiz.answers[q.id];
  const hidden = renderer.renderQuestion(q, 0, selected.length);
  if (!usable.length) {
    assert.match(hidden, /answer-panel visible/);
    assert.doesNotMatch(hidden, /class="option-button/);
  }
  for (const option of usable) {
    const buttons = usable.map(o => {
      const button = { dataset: { option: o.id }, classes: new Set(), setAttribute() {} };
      button.classList = { toggle(name, on) { on ? button.classes.add(name) : button.classes.delete(name); } };
      return button;
    });
    renderer.workspaceElement = { querySelector: selector => selector.includes('data-question-card') ? {
      querySelectorAll: () => buttons, querySelector: () => ({ classList: { add() {} } }),
    } : null };
    renderer.answerQuestion(q.id, option.id);
    const output = renderer.renderQuestion(q, 0, selected.length);
    assert.match(output, /(?:Gift|Q Bank) answer:/);
    assert.ok(output.includes(renderer.escapeHtml(q.surgeryReview.explanation)), q.id);
    assert.equal((output.match(/class="medicine-explanation"/g) || []).length, 1);
    assert.doesNotMatch(output, /AI opinion:|Tentative interpretation:|Reference status:|Management focus:|AI independently selected/);
    assert.doesNotMatch(output, /class="option-button[^>]*>[\s\S]*?<span>Option text was not recorded/);
    for (const button of buttons) {
      assert.equal(button.classes.has('correct'), q.giftReview.gradingAnswers.includes(button.dataset.option), q.id);
      assert.equal(button.classes.has('incorrect'), button.dataset.option === option.id && q.giftReview.gradingAnswers.length > 0 && !q.giftReview.gradingAnswers.includes(option.id), q.id);
    }
    if (q.surgeryReview.evidence) {
      assert.ok(output.includes(renderer.escapeHtml(q.surgeryReview.evidence.image)));
      assert.ok(output.includes(renderer.escapeHtml(q.surgeryReview.evidence.quote)));
      assert.ok(output.includes(q.surgeryReview.evidence.relation === 'background' ? 'Related slide' : 'View supporting slide'));
    }
    renderer.appState.quiz.answers = plain(renderer.appState.quiz.answers);
    assert.equal(renderer.renderQuestion(q, 0, selected.length), output, `Revisited feedback changed: ${q.id}`);
  }
}

assert.equal(byId.get('surgery-midterm-q0001').sourceAnswer, 'A');
assert.equal(byId.get('surgery-midterm-q0001').options[0].text, 'Abdominal tenderness with rebound');
assert.deepEqual(byId.get('surgery-midterm-q0064').sourceAnswer, ['B', 'C']);
assert.equal(byId.get('surgery-final-q1217').sourceAnswer, 'B');
assert.deepEqual(byId.get('surgery-midterm-q0011').giftReview.gradingAnswers, ['D']);
assert.deepEqual(byId.get('surgery-midterm-q0013').giftReview.gradingAnswers, ['A', 'B']);
assert.deepEqual(byId.get('surgery-midterm-q0034').giftReview.gradingAnswers, []);
assert.deepEqual(byId.get('surgery-midterm-q0257').giftReview.gradingAnswers, []);
assert.deepEqual(byId.get('surgery-midterm-q0184').surgeryReview.answers, []);
assert.deepEqual(byId.get('surgery-midterm-q0184').giftReview.gradingAnswers, []);
assert.deepEqual(byId.get('surgery-midterm-q0586').surgeryReview.answers, []);
assert.deepEqual(byId.get('surgery-midterm-q0520').images, []);
assert.deepEqual(byId.get('surgery-midterm-q0387').images, ['question-media/surgery/midterm-6f2d7023c7864bbc.png']);
assert.equal(byId.get('surgery-midterm-q0743').lecture, 'Surgical Complications');
assert.match(html, /أحدث تحديث:<\/strong> تطوير ضخم لشروح إجابات الباطنة والسيرجري للميد/);
assert.match(html, /حدثوا الصفحة بشكل دوري عشان توصلكم التحديثات/);
console.log(`PASS: ${selected.length} individual Surgery MID reviews, exact slide assets, preserved source records, original multi-keys, Gift-first click/revisit grading, neutral source defects, and unchanged other subjects/Final scope.`);
