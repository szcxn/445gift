const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const name of ["medicine-data.js", "medicine-reference-overrides.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, name), "utf8"), context);
}
const before = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
vm.runInContext(fs.readFileSync(path.join(root, "medicine-mid-444-review.js"), "utf8"), context);
const after = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
assert.equal(after.length, before.length);
const isTarget = q => q.subjectId === "medicine" && q.assessment === "Midterm" && ["Cardiology", "Pulmonology"].includes(q.cycle);
for (let i = 0; i < after.length; i++) {
  assert.equal(after[i].id, before[i].id);
  assert.deepEqual(after[i].sourceAnswer, before[i].sourceAnswer, `Source key changed: ${after[i].id}`);
  if (!isTarget(after[i])) assert.deepEqual(after[i], before[i], `Out-of-scope edit: ${after[i].id}`);
}
const target = after.filter(isTarget);
assert.equal(target.length, 380);
const manifest = JSON.parse(fs.readFileSync(path.join(root, "tests/fixtures/medicine-mid-444-manifest.json"), "utf8"));
for (const q of target) {
  assert.ok(q.lectureEvidence, `Missing lecture coverage: ${q.id}`);
  if (!q.lectureEvidence.outside) {
    const lecture = manifest.lectures.find(l => q.lectureEvidence.url.includes(l.id));
    assert.ok(lecture, `Unknown PDF: ${q.id}`);
    assert.ok(Number.isInteger(q.lectureEvidence.page) && q.lectureEvidence.page >= 3 && q.lectureEvidence.page <= lecture.pageCount);
  }
  for (const answer of Array.isArray(q.aiAnswer) ? q.aiAnswer : q.aiAnswer ? [q.aiAnswer] : []) {
    assert.ok(q.options.some(o => o.id === answer), `Invalid answer: ${q.id}`);
  }
  if (q.reviewOpinion) assert.ok(q.references?.length, `Review has no external reference: ${q.id}`);
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(html.indexOf('src="medicine-mid-444-review.js') > html.indexOf('src="medicine-reference-overrides.js'));
for (const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
const renderSource = html.slice(html.indexOf("    function renderQuestion(question,"), html.indexOf("    function answerQuestion(questionId,"));
const renderer = {
  appState: { quiz: { answers: {} }, navigation: { mode: "cycle", assessment: "Midterm" } },
  SUBJECTS: [{ id: "medicine", name: "Medicine" }],
  sourceAnswers: q => Array.isArray(q.sourceAnswer) ? q.sourceAnswer : q.sourceAnswer ? [q.sourceAnswer] : [],
  batchDisplayName: (_, batch) => `Batch ${batch}`,
  escapeHtml: value => String(value).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[ch])
};
vm.createContext(renderer);
vm.runInContext(renderSource, renderer);
for (const q of target) {
  renderer.appState.quiz.answers[q.id] = q.options[0].id;
  const output = renderer.renderQuestion(q, 0, 380);
  assert.ok(output.includes("lecture-evidence"));
  if ((q.verification === "conflict" && !q.aiAnswer) || q.verification === "needs-review") {
    assert.ok(!/option-button[^"\n]*\bcorrect\b/.test(output), `Uncertain item was graded: ${q.id}`);
    assert.ok(!/option-button[^"\n]*\bincorrect\b/.test(output), `Uncertain choice was graded: ${q.id}`);
  }
}
const corrected = target.find(q => q.id === "medicine-midterm-436-pulmonary-q025");
assert.equal(corrected.sourceAnswer, "D");
assert.equal(corrected.aiAnswer, "C");
assert.equal(corrected.verification, "conflict");
assert.ok(renderer.renderQuestion(corrected, 0).includes('option-button correct'));
console.log("PASS: 380 items rendered; source keys and out-of-scope questions preserved; lecture pages bounded; uncertain items not graded.");
console.log(context.window.GIFT445_MID_444_REVIEW_COUNTS);
if (process.env.MID_REVIEW_EXPORT) fs.writeFileSync(process.env.MID_REVIEW_EXPORT, JSON.stringify(target, null, 2));
