const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const fixture = name => JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures", name + ".json"), "utf8"));
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const plain = value => JSON.parse(JSON.stringify(value));
const ids = questions => Array.from(questions, question => question.id);
const qById = new Map();
const c = vm.createContext({ window: {} });
for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
  vm.runInContext(fs.readFileSync(path.join(root, match[1]), "utf8"), c, { filename: match[1] });
}
for (const match of html.matchAll(/^    function ([A-Za-z_$][\w$]*)\(/gm)) {
  const end = html.indexOf("\n    }\n", match.index) + 6;
  assert.ok(end > match.index, `Unterminated app function: ${match[1]}`);
  vm.runInContext(html.slice(match.index, end), c, { filename: `index.html:${match[1]}` });
}
const start = html.indexOf("    const QUESTION_BANK =");
assert.ok(start >= 0);
const bank = vm.runInContext(html.slice(start, html.indexOf("\n\n", start)) + "\nQUESTION_BANK", c);
const source = c.window.GIFT445_INFORMATICS_BANK;
for (const q of bank) qById.set(q.id, q);
const finalFixture = fixture("informatics-final-complete");
const midFixture = fixture("informatics-mid-source-integrity");
const mid445Fixture = fixture("informatics-mid-445");
const titles = finalFixture.courseLectures;
const midTitles = titles.slice(0, 5);
const finalTitles = titles.slice(5);
const scope = Object.fromEntries([
  ...midTitles.map(title => [title, "Midterm"]),
  ...finalTitles.map(title => [title, "Final"])
]);

// Original lecture identities come from the five checked-in MID PDFs and
// independently verified hashes/pages of the four original Final PDFs.
const lectureSources = new Map([
  ...[
    ["01-introduction.pdf", 13], ["02-clinical-data.pdf", 14], ["03-ehr.pdf", 12],
    ["04-cds.pdf", 16], ["05-overgaard.pdf", 26]
  ].map(([filename, pages], i) => [sha(fs.readFileSync(path.join(root, "lecture-media/informatics", filename))), {title: titles[i], pages}]),
  ...[
    ["555e183b2be3d676de187f27b5af89c96369d2102b9ae9befd2d578716572170", 13],
    ["f607b9ba2b03dbb84e7fdb7d129dd751a9e937cb3149231c87a0d96418cdf9b0", 20],
    ["e70d9d3a4071b43b9109a5e2c30ade3a78fbefa22881bd00a881244f5c18e8a8", 12],
    ["449057a6f8431827e84a37eab95c03d76ff55beee428d1883ecded271c9dbfa3", 15]
  ].map(([hash, pages], i) => [hash, {title: finalTitles[i], pages}])
]);

// Original file routes must not inherit lecture restrictions or repeat
// collapsing. The historical fixtures and original Batch 444 PDF numbering give the expected order.
const expectedBatches = {
  ...midFixture.batches,
  ...Object.fromEntries(Object.entries(finalFixture.batchIds).map(([b, rows]) => [`Final|${b}`, rows])),
  "Midterm|445": mid445Fixture.questions.map(q => `informatics-mid-445-q${String(q.number).padStart(2, "0")}`),
  "Midterm|444": Array.from({length: 34}, (_, i) => `informatics-mid-444-q${String(i + 1).padStart(2, "0")}`),
  "Final|444": Array.from({length: 32}, (_, i) => `informatics-final-444-q${String(i + 1).padStart(2, "0")}`)
};
const originalSourceIds = new Set(Object.values(expectedBatches).flat());
assert.equal(originalSourceIds.size, 982);
assert.deepEqual(new Set(ids(source.entries(bank))), originalSourceIds);
for (const [key, expected] of Object.entries(expectedBatches)) {
  const [assessment, batch] = key.split("|");
  const actual = c.questionsForBatch("informatics", assessment, batch);
  assert.deepEqual(ids(actual), expected, `Source occurrence loss/order change: ${key}`);
  for (const q of actual) {
    assert.equal(q.assessment, assessment, q.id);
    assert.equal(String(q.sourceBatch), batch, q.id);
    assert.ok(q.sourceLocations.some(loc => loc.assessment === assessment && String(loc.batch) === batch), q.id);
  }
}
const preservedFields = ["stem", "options", "sourceAnswer", "sourceAnswerNote", "sourceLocations", "sourceTables", "images", "answerImages"];
for (const raw of [
  ...c.window.GIFT445_INFORMATICS_QUESTIONS,
  ...c.window.GIFT445_INFORMATICS_445_QUESTIONS,
  ...c.window.GIFT445_INFORMATICS_444_QUESTIONS,
  ...c.window.GIFT445_INFORMATICS_FINAL_QUESTIONS
]) {
  const actual = qById.get(raw.id);
  assert.ok(actual, `Original question no longer resolves: ${raw.id}`);
  for (const field of preservedFields) {
    assert.equal(JSON.stringify(actual[field]), JSON.stringify(raw[field]), `Lecture scope changed Gift ${field}: ${raw.id}`);
  }
  assert.equal(JSON.stringify(actual.giftReview.gradingAnswers), JSON.stringify(raw.giftReview.gradingAnswers), raw.id);
}

const aliases = new Map(plain(c.window.GIFT445_INFORMATICS_SOURCE_REPEATS).flatMap(group => group.map(id => [id, group[0]])));
const sourcePosition = new Map(ids(source.entries(bank)).map((id, i) => [id, i]));
function assertScope(questionIds, chosenTitles, assessment = null) {
  assert.ok(questionIds.length, `Empty lecture selection: ${chosenTitles.join(", ")}`);
  assert.equal(new Set(questionIds.map(id => aliases.get(id) || id)).size, questionIds.length, "A verified repeat was added twice");
  for (const id of questionIds) {
    const q = qById.get(id);
    assert.ok(originalSourceIds.has(id), id);
    assert.ok(chosenTitles.includes(q.lecture), `${id}: wrong lecture ${q.lecture}`);
    if (assessment) assert.equal(scope[q.lecture], assessment, id);
    const evidence = q.informaticsBatch445Review?.evidence || q.informaticsBatch444Review?.evidence || q.informaticsFinalReview?.evidence || q.informaticsEvidence || [];
    assert.ok(evidence.some(passage => lectureSources.get(passage.sourceSha256)?.title === q.lecture), `${id}: no original page evidence for its own lecture`);
    for (const passage of evidence) {
      const entry = lectureSources.get(passage.sourceSha256);
      if (!entry) {
        assert.ok((q.informaticsBatch445Review || q.informaticsFinalReview) && passage.sourceKind === "study-file", `${id}: unrecognized or unlabeled lecture evidence`);
        continue;
      }
      if (q.assessment === "Midterm") assert.equal(scope[entry.title], scope[q.lecture], `${id}: opposite assessment source page`);
      assert.ok(Number.isInteger(passage.pdfPage) && passage.pdfPage >= 1 && passage.pdfPage <= entry.pages, `${id}: invalid original PDF page`);
      const excerpts = passage.quoteParts || [passage.quote];
      assert.ok(excerpts.length && excerpts.every(excerpt => typeof excerpt === "string" && excerpt.trim()), id);
      assert.ok(passage.image && fs.existsSync(path.join(root, passage.image)), `${id}: missing original page image`);
    }
  }
}

const calls = [];
Object.assign(c, {
  SUBJECTS: [{ id: "informatics", name: "Informatics" }],
  CYCLE_ORDER: [],
  captureAnalytics() {},
  quizAnalyticsProperties: () => ({}),
  persistState() {},
  renderResumePanel() {},
  renderQuestionSetView() { calls.push([...c.appState.quiz.questionIds]); },
  bindWorkspaceClose() {}
});
const fresh = () => c.appState = {
  navigation: {},
  quiz: { questionIds: [], currentIndex: 0, answers: {}, firstAnswers: {}, flagged: [] }
};

const batch444Files = {
  Midterm: {
    driveId: "1ONNzWI1mIe-0JzmqtKnh1KRRym3ILB5f",
    sha256: "6363bd2c606a4d7339f5bf00adc60512f75cd419a909ed3ce2ff59a10163d83a",
    keys: "BABBCACB-BCAABCCAADCBCAABACCAABCAB",
    ungraded: [6, 9]
  },
  Final: {
    driveId: "13AcxzJR8ftqt6_TxoCF_K961a6VgGmcZ",
    sha256: "6b0473a6171c120f8635a7e0e520d401f6030da7b710609946a281756bc77477",
    keys: "BBA-BBAAAAABACBBBBBBBABBABBBBCAB",
    ungraded: [4, 10, 14]
  }
};
for (const [assessment, file] of Object.entries(batch444Files)) {
  fresh();
  c.openCollection("informatics", "batch", assessment, "444");
  const questions = c.questionsForBatch("informatics", assessment, "444");
  assert.deepEqual(Array.from(c.appState.quiz.questionIds), ids(questions));
  for (const [i, q] of questions.entries()) {
    const num = i + 1;
    const loc = source.location(q);
    assert.equal(q.sourceOccurrenceIntegrity.sha256, file.sha256);
    assert.equal(loc.url, `https://drive.google.com/file/d/${file.driveId}/view`);
    assert.equal(loc.number, `Original Q${num}`);
    assert.ok(source.isLectureQuestion(q), q.id);
    assert.equal(q.sourceAnswer || "-", file.keys[i], q.id);
    const revealed = q.options.find(o => o.text.trim()).id;
    const card = c.renderQuestion(q, i, questions.length, revealed);
    assert.ok(card.includes(loc.url), q.id);
    assert.ok(card.includes(c.escapeHtml(q.informaticsBatch444Review.explanation)), q.id);
    assert.ok(card.includes(q.informaticsBatch444Review.evidence[0].image), q.id);
    if (file.ungraded.includes(num)) {
      assert.match(card, /Not scored:/);
      assert.doesNotMatch(card, /option-button[^"]*\b(?:correct|incorrect)\b/);
    } else {
      assert.deepEqual(plain(c.gradingAnswersForQuestion(q)), [q.sourceAnswer]);
    }
    for (const option of q.options.filter(o => !o.text)) {
      assert.doesNotMatch(card, new RegExp(`data-option="${option.id}"`));
    }
  }
}
for (const [older, newer] of [["07", "23"], ["23", "28"]]) {
  const q444 = qById.get(`informatics-mid-444-q${older}`);
  const q445 = qById.get(`informatics-mid-445-q${newer}`);
  const normalized = text => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  assert.equal(normalized(q444.stem), normalized(q445.stem));
  assert.deepEqual(plain(q444.options.map(o => normalized(o.text)).sort()), plain(q445.options.map(o => normalized(o.text)).sort()));
  assert.equal(normalized(q444.options.find(o => o.id === q444.sourceAnswer).text), normalized(q445.options.find(o => o.id === q445.sourceAnswer).text));
  assert.equal(aliases.get(q444.id), q445.id);
  assert.ok(!source.lecture(bank, [q444.lecture]).some(q => q.id === q444.id));
  assert.ok(source.lecture(bank, [q445.lecture]).some(q => q.id === q445.id));
}

// Exercise the live route instead of only checking a source helper.
const scopedEntries = new Map();
for (const title of titles) {
  fresh();
  c.openLecture("informatics", null, title);
  assert.equal(c.appState.navigation.mode, "lecture", title);
  assert.equal(c.appState.navigation.assessment, scope[title], title);
  const actual = c.appState.quiz.questionIds;
  assertScope(actual, [title]);
  for (let i = 1; i < actual.length; i++) {
    const a = qById.get(actual[i - 1]), b = qById.get(actual[i]);
    assert.ok(+a.sourceBatch >= +b.sourceBatch, title);
    if (a.sourceBatch === b.sourceBatch) assert.ok(sourcePosition.get(a.id) < sourcePosition.get(b.id), title);
  }
  assert.deepEqual(Array.from(actual), ids(source.lecture(bank, [title])), title);
  scopedEntries.set(title, source.lectureEntries(bank, [title]));
  for (const [i, id] of actual.entries()) {
    const q = qById.get(id);
    const card = c.renderQuestion(q, i, actual.length, q.options.find(o => o.text.trim())?.id);
    assert.ok(card.includes(`Gift ${q.assessment} · Batch ${q.sourceBatch}`), `${id}: missing original source caption`);
    const passages = q.informaticsBatch445Review?.evidence || q.informaticsBatch444Review?.evidence || q.informaticsFinalReview?.evidence || q.informaticsEvidence || [];
    for (const e of passages) {
      assert.ok(card.includes(c.escapeHtml(e.image)), `${id}: verified page not displayed`);
      assert.ok(card.includes(`PDF page ${e.pdfPage}`), `${id}: missing page number`);
    }
  }
}
for (const title of titles.filter(t => !t.startsWith("Patient Safety"))) {
  const practice = source.lecture(bank, [title], scope[title]);
  assert.ok(practice.some(q => q.assessment === "Midterm") && practice.some(q => q.assessment === "Final"), title);
  assert.ok(practice.every(q => q.lecture === title));
}
// Final Lectures contains L6–L9, with verified questions from either bank.
const finalEntries = source.lectureEntries(bank, titles, "Final");
assert.equal(finalEntries.length, 130);
assert.ok(midTitles.every(title => source.lecture(bank, [title], "Final").length === 0));
for (const title of finalTitles) {
  fresh();
  c.openLecture("informatics", null, title, false, "Final");
  assert.equal(c.appState.navigation.assessment, "Final", title);
  const actual = c.appState.quiz.questionIds;
  assertScope(actual, [title], "Final");
  assert.deepEqual(Array.from(actual), ids(source.lecture(bank, [title], "Final")), title);
  for (let i = 1; i < actual.length; i++) {
    const a = qById.get(actual[i - 1]), b = qById.get(actual[i]);
    assert.ok(+a.sourceBatch >= +b.sourceBatch, title);
    if (a.sourceBatch === b.sourceBatch) assert.ok(sourcePosition.get(a.id) < sourcePosition.get(b.id), title);
  }
}
const originalMidExample = scopedEntries.get(midTitles[0]).find(q => q.informaticsEvidence?.length && !q.informaticsBatch445Review);
assert.ok(originalMidExample);
const reference = originalMidExample.informaticsEvidence[0];
assert.equal(source.isLectureQuestion(originalMidExample), true);
for (const invalid of [
  {assessment: "Final"},
  {id: "not-an-original-gift-entry"},
  {informaticsEvidence: []},
  {informaticsEvidence: [{...reference, pdfPage: 12}]},
  {informaticsEvidence: [{...reference, pdfPage: 10000}]},
  {informaticsEvidence: [{...reference, quote: "", quoteParts: [""]}]},
  {informaticsEvidence: [{...reference, sourceSha256: "0".repeat(64)}]},
  {informaticsEvidence: [reference, {...reference, sourceSha256: "555e183b2be3d676de187f27b5af89c96369d2102b9ae9befd2d578716572170"}]}
]) {
  assert.equal(source.isLectureQuestion({...originalMidExample, ...invalid}), false, `Accepted invalid scope/evidence: ${JSON.stringify(invalid)}`);
}

// Exercise the checkbox handler and Start button used by the actual mixer.
function control(properties = {}) {
  const listeners = new Map();
  return {...properties, addEventListener(type, callback) {listeners.set(type, callback);}, fire(type) {listeners.get(type)?.();}};
}
fresh();
c.workspaceElement = {
  innerHTML: "",
  querySelector: () => control(),
  querySelectorAll: () => [],
  classList: {add() {}},
  scrollIntoView() {}
};
c.openSubject("informatics");
const menu = c.workspaceElement.innerHTML;
assert.doesNotMatch(menu, /may draw from either file|Waiting for Lecture Files/);
const finalPanel = menu.split('data-lecture-panel="Final"')[1];
assert.equal((finalPanel.match(/data-assessment="Final"/g) || []).length, 4);
assert.match(menu, /Final Lectures<\/strong><span>4 lectures/);

for (const title of titles) {
  const card = Array.from(menu.matchAll(/<button class="route-card direct-lecture-card"[^>]*data-lecture="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g))
    .find(match => match[1] === c.escapeHtml(title));
  assert.ok(card, `No menu card for scoped lecture ${title}`);
  const count = source.lecture(bank, [title]).length;
  assert.match(card[2], new RegExp(`\\b${count} questions?\\b`), `Menu count differs from lecture route: ${title}`);
  assert.match(card[2], /\d+ Gift Midterm · \d+ Gift Final/, title);
}

function runMixer(selectedTitles) {
  fresh();
  const controls = new Map();
  let rendered = "";
  let checks = [];
  c.workspaceElement = {
    set innerHTML(value) {
      rendered = value;
      checks = Array.from(rendered.matchAll(/class="lecture-mix-check"[^>]*data-cycle="([^"]*)"[^>]*data-lecture="([^"]*)"/g),
        m => control({dataset: {cycle: m[1], lecture: m[2]}, checked: selectedTitles.includes(m[2])}));
    },
    get innerHTML() { return rendered; },
    querySelector(selector) {
      if (!controls.has(selector)) controls.set(selector, control());
      return controls.get(selector);
    },
    querySelectorAll(selector) { return selector === ".lecture-mix-check" ? checks : []; },
    classList: {add() {}},
    scrollIntoView() {}
  };
  c.openLectureMixer("informatics");
  const selected = checks.filter(check => check.checked);
  assert.equal(selected.length, selectedTitles.length);
  selected.forEach(check => check.fire("change"));
  const start = controls.get('[data-action="start-lecture-mix"]');
  assert.equal(start.disabled, false);
  start.fire("click");
  assert.equal(c.appState.navigation.mode, "lecture-mix");
  assertScope(c.appState.quiz.questionIds, selectedTitles);
  const expected = source.lecture(bank, selectedTitles);
  assert.deepEqual(new Set(c.appState.quiz.questionIds), new Set(ids(expected)));
  const batches = Array.from(c.appState.quiz.questionIds, id => Number(qById.get(id).sourceBatch));
  assert.deepEqual(batches, Array.from(expected, question => Number(question.sourceBatch)).sort((a, b) => b - a));
  assert.equal(c.appState.quiz.currentIndex, 0);
}
runMixer(midTitles);
runMixer(finalTitles);
runMixer([midTitles[0], finalTitles[0]]);

function save(question, navigation) {
  fresh();
  c.appState.navigation = { subjectId: "informatics", cycle: null, batch: null, ...navigation };
  c.appState.quiz.questionIds = [question.id];
  c.appState.quiz.answers[question.id] = "A";
  c.appState.quiz.firstAnswers[question.id] = "A";
  c.appState.quiz.flagged.push(question.id);
}
function assertResumeState(question) {
  assert.equal(c.appState.quiz.questionIds[c.appState.quiz.currentIndex], question.id, "Resume dropped or replaced the saved source ID");
  assert.equal(c.appState.quiz.answers[question.id], "A");
  assert.equal(c.appState.quiz.firstAnswers[question.id], "A");
  assert.ok(c.appState.quiz.flagged.includes(question.id));
}
const midAlias = midTitles.flatMap(title => {
  const preferred = new Set(ids(source.lecture(bank, [title])));
  return scopedEntries.get(title).filter(q => !preferred.has(q.id));
})[0];
assert.ok(midAlias, "Need a real source alias excluded in a fresh lecture");
save(midAlias, { mode: "lecture", lecture: midAlias.lecture, assessment: null });
c.resumeNavigation();
assertResumeState(midAlias);
assertScope(c.appState.quiz.questionIds, [midAlias.lecture]);

// Preserve a saved Final-bank item in comprehensive MID lecture practice.
// A bank-only assessment view still follows the item's original exam.
const oldCrossListed = c.window.GIFT445_INFORMATICS_FINAL_QUESTIONS.find(q => midTitles.includes(q.lecture));
assert.ok(oldCrossListed, "Need an actual old cross-listed Final question");
for (const mode of ["lecture", "lecture-mix", "assessment"]) {
  save(oldCrossListed, { mode, lecture: mode === "lecture" ? oldCrossListed.lecture : null, assessment: mode === "assessment" ? "Midterm" : null });
  const callCount = calls.length;
  c.resumeNavigation();
  assert.equal(calls.length, callCount + 1, `Legacy ${mode} did not render`);
  assertResumeState(oldCrossListed);
  if (mode === "assessment") {
    assert.equal(c.appState.navigation.assessment, "Final");
    assert.ok(c.appState.quiz.questionIds.every(id => qById.get(id).assessment === "Final"));
  }
  if (mode === "lecture") {
    assert.equal(c.appState.navigation.assessment, "Midterm");
    assert.ok(c.appState.quiz.questionIds.some(id => qById.get(id).assessment === "Midterm"));
    assertScope(c.appState.quiz.questionIds, [c.appState.navigation.lecture]);
  }
}

// A saved L1–L5 Final lecture from the earlier layout resumes in its MID topic.
save(oldCrossListed, { mode: "lecture", lecture: oldCrossListed.lecture, assessment: "Final" });
c.resumeNavigation();
assertResumeState(oldCrossListed);
assert.equal(c.appState.navigation.assessment, "Midterm");
assert.ok(c.appState.quiz.questionIds.some(id => qById.get(id).assessment === "Midterm"));

const goodMid = source.lecture(bank, [midTitles[0]])[0];
const goodFinal = source.lecture(bank, [finalTitles[0]])[0];
save(goodMid, { mode: "lecture-mix", lecture: null, assessment: null });
c.appState.quiz.questionIds.push(oldCrossListed.id, goodFinal.id);
c.resumeNavigation();
assertResumeState(goodMid);
assert.equal(c.appState.navigation.mode, "lecture-mix");
assert.deepEqual(Array.from(c.appState.quiz.questionIds), [goodMid.id, oldCrossListed.id, goodFinal.id], "Legacy mixer changed the valid saved order");

console.log("PASS: Both lecture groups combine verified MID and Final questions by newest batch; mixers and verified references agree; 982 original entries and saved positions remain intact.");
