const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
const previous = ["medicine-data.js", "medicine-reference-overrides.js", "medicine-mid-444-review.js", "medicine-mid-444-renal-gi-review.js"];
for (const name of previous) vm.runInContext(fs.readFileSync(path.join(root, name), "utf8"), context);
const before = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
vm.runInContext(fs.readFileSync(path.join(root, "medicine-mid-explanation-completion.js"), "utf8"), context);
const after = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
for (let i = 0; i < after.length; i++) {
  const old = before[i], current = after[i];
  for (const key of ["id", "stem", "options", "sourceAnswer", "sourceAnswerNote", "cycle", "lecture", "lectureOrder", "referenceOrder", "lectureEvidence", "images", "sourceLocations"]) {
    assert.deepEqual(current[key], old[key], `${key} changed: ${current.id}`);
  }
  if (current.assessment !== "Midterm") assert.deepEqual(current, old, `Final question changed: ${current.id}`);
}
const mid = after.filter(q => q.subjectId === "medicine" && q.assessment === "Midterm");
assert.equal(mid.length, 687);
assert.equal(new Set(mid.map(q => q.id)).size, mid.length);
const generic = /verification is pending|keyed option is matched|Valve lesions are distinguished|COPD and bronchiectasis are separated|Acute coronary syndrome decisions depend|Heart failure assessment combines|Pleural effusion is assessed|Infective endocarditis is evaluated|Pneumonia assessment uses|Pulmonary investigations are selected/;
for (const q of mid) {
  const explanation = q.reviewOpinion || q.explanation || "";
  assert.ok(explanation.length >= 90 && !generic.test(explanation), `Missing meaningful explanation: ${q.id}`);
  assert.ok(!/\p{Script=Arabic}/u.test(explanation), `Arabic medical explanation: ${q.id}`);
  for (const answer of Array.isArray(q.aiAnswer) ? q.aiAnswer : q.aiAnswer ? [q.aiAnswer] : []) {
    assert.ok(q.options.some(o => o.id === answer), `Invalid reviewed choice: ${q.id}`);
  }
  for (const image of q.images || []) assert.ok(fs.existsSync(path.join(root, image)), `Missing image: ${q.id}`);
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(html.indexOf('src="medicine-mid-explanation-completion.js') > html.indexOf('src="medicine-mid-444-renal-gi-review.js'));
for (const tag of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  const src = tag[1].match(/src="([^"]+)"/);
  if (src) assert.ok(fs.existsSync(path.join(root, src[1].split("?")[0])), `Missing script ${src[1]}`);
  else new vm.Script(tag[2]);
}
const renderer = {
  appState: { quiz: { answers: {} }, navigation: { mode: "batch", assessment: "Midterm" } },
  SUBJECTS: [{ id: "medicine", name: "Medicine" }],
  sourceAnswers: q => Array.isArray(q.sourceAnswer) ? q.sourceAnswer : q.sourceAnswer ? [q.sourceAnswer] : [],
  batchDisplayName: (_, batch) => `Batch ${batch}`,
  escapeHtml: value => String(value).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[ch])
};
vm.createContext(renderer);
vm.runInContext(html.slice(html.indexOf("    function renderQuestion(question,"), html.indexOf("    function answerQuestion(questionId,")), renderer);
for (const q of mid) {
  renderer.appState.quiz.answers[q.id] = q.options[0].id;
  const output = renderer.renderQuestion(q, 0, 687);
  assert.ok(output.includes(renderer.escapeHtml(q.reviewOpinion || q.explanation)), `Explanation not shown: ${q.id}`);
  assert.ok(output.includes("Clinical interpretation (separate from the lecture text):"), `Clinical/lecture distinction missing: ${q.id}`);
  assert.ok(!/\p{Script=Arabic}/u.test(output), `Medical content is not English: ${q.id}`);
  if (q.verification === "needs-review" || (q.verification === "conflict" && !q.aiAnswer)) {
    assert.ok(!/option-button[^"\n]*\b(?:correct|incorrect)\b/.test(output), `Ambiguous question graded: ${q.id}`);
  }
}
assert.equal(mid.find(q => q.id === "medicine-midterm-442-pulmonary-q022").aiAnswer, null);
assert.equal(mid.find(q => q.id === "medicine-midterm-433-pulmonary-q028").aiAnswer, null);
assert.equal(mid.find(q => q.id === "medicine-midterm-431-git-hepatobiliary-q053").verification, "needs-review");
assert.deepEqual(JSON.parse(JSON.stringify(context.window.GIFT445_MID_EXPLANATION_COUNTS)), { total: 687, completed: 244, explained: 687, currentBlocks: 663, legacyOtherBlocks: 24 });
assert.deepEqual(JSON.parse(JSON.stringify(context.window.GIFT445_MID_444_REVIEW_COUNTS)), { total: 663, lectureAnchored: 656, outsideLecture: 7, conflict: 40, needsReview: 115 });
console.log("PASS: all 687 Medicine MID questions render meaningful English explanations; source keys, question IDs, lectures, media and Final questions are preserved; ambiguous items remain ungraded.");
