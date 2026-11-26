const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const context = vm.createContext({ window: {} });
const plain = value => JSON.parse(JSON.stringify(value));

for (const [, script] of html.matchAll(/<script src="([^"?]+)[^"]*"><\/script>/g)) {
  vm.runInContext(fs.readFileSync(path.join(root, script), "utf8"), context, { filename: script });
}

function loadFunction(name) {
  const start = html.indexOf(`    function ${name}(`);
  assert.ok(start >= 0, name);
  vm.runInContext(html.slice(start, html.indexOf("\n    }\n", start) + 6), context);
}

loadFunction("deduplicateQuestions");
const bankStart = html.indexOf("    const QUESTION_BANK =");
const bankDeclaration = html.slice(bankStart, html.indexOf("\n\n", bankStart));
const readSurgeryBank = () => vm.runInContext(
  `(() => { ${bankDeclaration} return QUESTION_BANK.filter(question => question.subjectId === "surgery"); })()`,
  context
);

const reviewSite = context.window.GIFT445_REVIEW_SITE_CONTENT;
assert.equal(typeof reviewSite, "function");
delete context.window.GIFT445_REVIEW_SITE_CONTENT;
const baseline = readSurgeryBank();
context.window.GIFT445_REVIEW_SITE_CONTENT = reviewSite;
const reviewed = readSurgeryBank();
const byId = new Map(reviewed.map(question => [question.id, question]));
assert.deepEqual(Array.from(reviewed, question => question.id), Array.from(baseline, question => question.id));

const sourceFields = ["stem", "options", "images", "answerImages", "sourceAnswer", "sourceAnswerNote", "sourceLocations", "sourceTranscript", "sourceTables", "batchSource"];
const checkedAssets = new Set();
for (const original of baseline) {
  const question = byId.get(original.id);
  for (const field of sourceFields) assert.equal(JSON.stringify(question[field]), JSON.stringify(original[field]), `${question.id} ${field}`);
  const review = question.surgeryReview || question.midterm444Review;
  assert.ok(review?.explanation, question.id);
  if (original.surgeryReview || original.midterm444Review) continue;
  const evidence = review.evidence;
  assert.ok(evidence || review.references.length, question.id);
  if (!evidence || checkedAssets.has(evidence.image)) continue;
  assert.ok(evidence.quote && evidence.page > 0, question.id);
  const image = fs.readFileSync(path.join(root, evidence.image));
  assert.equal(crypto.createHash("sha256").update(image).digest("hex"), evidence.imageSha256, evidence.image);
  checkedAssets.add(evidence.image);
}
assert.ok(checkedAssets.size > 0);

Object.assign(context, {
  QUESTION_BANK: reviewed,
  SUBJECTS: [{ id: "surgery", name: "Surgery" }],
  appState: { navigation: { mode: "batch", assessment: "Final", batch: "434" }, quiz: {} },
  escapeHtml: value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]),
  persistState() {},
  captureAnalytics() {},
  quizAnalyticsProperties: () => ({}),
  completedQuizKeys: new Set(),
  currentQuizKey: () => "surgery-repair",
  workspaceElement: {
    querySelector(selector) {
      if (selector.includes("data-question-card")) {
        return { querySelectorAll: () => [], querySelector: () => ({ classList: { add() {} } }) };
      }
      return null;
    }
  }
});
loadFunction("batchDisplayName");
vm.runInContext(html.slice(html.indexOf("    function renderQuestion(question,"), html.indexOf("    function questionCountLabel(")), context);

const parkland = byId.get("surgery-final-q0950");
assert.equal(parkland.sourceAnswer, "A");
assert.deepEqual(plain(parkland.surgeryReview.answers), ["C"]);
assert.equal(context.quizScoreGrading(parkland).correct.size, 0);

const acidosis = byId.get("batch-surgery-midterm-434-q3-s448");
assert.equal(acidosis.sourceAnswer, null);
assert.deepEqual(plain(context.window.GIFT445_DISPLAY_REVIEWED_QUESTION(acidosis).sourceAnswer), ["B", "C"]);
const renalMass = byId.get("surgery-final-q1044");
assert.equal(context.window.GIFT445_DISPLAY_REVIEWED_QUESTION(renalMass).options[3].text, "Angiomyolipoma");
assert.equal(context.quizScoreGrading(renalMass).correct.has("B"), true);

const restored = reviewed.filter(question => question.surgeryReview?.sourceText);
assert.ok(restored.length >= 11);
for (const raw of restored) {
  context.appState.quiz = { answers: {}, questionIds: [raw.id], currentIndex: 0 };
  const question = context.window.GIFT445_DISPLAY_REVIEWED_QUESTION(raw);
  const ids = [...context.quizScoreGrading(raw).options];
  const card = context.renderQuestion(raw, 0, 1);
  assert.equal((card.match(/class="option-button/g) || []).length, ids.length, raw.id);
  assert.ok(question.sourceAnswer, raw.id);
  context.answerQuestion(raw.id, ids.at(-1));
  assert.equal(context.appState.quiz.answers[raw.id], ids.at(-1), raw.id);
  assert.match(context.renderQuestion(raw, 0, 1), /answer-panel visible[\s\S]*Gift answer:/, raw.id);
}

console.log(`PASS: Surgery source fields, review coverage, ${checkedAssets.size} lecture images and ${restored.length} restored question displays.`);
