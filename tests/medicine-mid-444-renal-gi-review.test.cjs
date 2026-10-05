const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const name of ["medicine-data.js", "medicine-reference-overrides.js", "medicine-mid-444-review.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, name), "utf8"), context);
}
const before = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
vm.runInContext(fs.readFileSync(path.join(root, "medicine-mid-444-renal-gi-review.js"), "utf8"), context);
const after = JSON.parse(JSON.stringify(context.window.GIFT445_QUESTIONS));
assert.equal(after.length, before.length);
const isTarget = q => q.subjectId === "medicine" && q.assessment === "Midterm" && ["Nephrology", "Gastroenterology"].includes(q.cycle);
for (let i = 0; i < after.length; i++) {
  assert.equal(after[i].id, before[i].id);
  assert.deepEqual(after[i].sourceAnswer, before[i].sourceAnswer, `Source key changed: ${after[i].id}`);
  if (!isTarget(after[i])) assert.deepEqual(after[i], before[i], `Out-of-scope edit: ${after[i].id}`);
}
const target = after.filter(isTarget);
assert.equal(target.length, 283);
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

}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(html.indexOf('src="medicine-mid-444-renal-gi-review.js') > html.indexOf('src="medicine-mid-444-review.js'));
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
  const output = renderer.renderQuestion(q, 0, 283);
  assert.ok(output.includes("lecture-evidence"));
  if ((q.verification === "conflict" && !q.aiAnswer) || q.verification === "needs-review") {
    assert.ok(!/option-button[^"\n]*\bcorrect\b/.test(output), `Uncertain item was graded: ${q.id}`);
    assert.ok(!/option-button[^"\n]*\bincorrect\b/.test(output), `Uncertain choice was graded: ${q.id}`);
  }
}
const find = suffix => target.find(q => q.id.endsWith(suffix));
assert.equal(find("441-nephrology-q045").sourceAnswer, "C");
assert.equal(find("441-nephrology-q045").aiAnswer, "B");
assert.equal(find("434-nephrology-q035").aiAnswer, "A");
assert.equal(find("443-git-hepatobiliary-q049").sourceAnswer, "D");
assert.equal(find("443-git-hepatobiliary-q049").aiAnswer, "C");
assert.equal(find("432-nephrology-q025").aiAnswer, null);
assert.deepEqual(find("436-git-hepatobiliary-q072").aiAnswer, ["B", "D"]);
assert.equal(find("439-nephrology-q055").verification, "needs-review");
assert.equal(find("439-nephrology-q055").aiAnswer, "D");
assert.equal(find("438-nephrology-q038").aiAnswer, null);
assert.ok(target.every(q => q.reviewOpinion && q.reviewedOn === "2026-10-05"));
assert.ok(target.filter(q => q.verification === "conflict").every(q => q.references?.length));
const counts = JSON.parse(JSON.stringify(context.window.GIFT445_MID_444_REVIEW_COUNTS));
assert.deepEqual(counts, { total: 663, lectureAnchored: 656, outsideLecture: 7, conflict: 40, needsReview: 102 });
assert.ok(html.includes('class="site-updates" lang="en" dir="ltr"'));
assert.ok(html.includes("Medicine MID"));
const donationSection = html.match(/<section class="donation-section"[\s\S]*?<\/section>/)[0];
assert.ok(donationSection.includes('lang="ar" dir="rtl"') && donationSection.includes("اضغط هنا للتبرع عبر إحسان"));
assert.ok(!/\p{Script=Arabic}/u.test(html.replace(donationSection, "")), "The study interface must be in English; Ehsan remains Arabic");
const medicalReviewStyle = html.match(/\.lecture-evidence, \.review-opinion\s*\{([^}]+)\}/)[1];
assert.ok(/direction:\s*ltr/.test(medicalReviewStyle), "English medical reviews must retain LTR styles");
for (const q of after.filter(q => q.lectureEvidence)) {
  renderer.appState.quiz.answers[q.id] = q.options[0].id;
  const output = renderer.renderQuestion(q, 0, 663);
  assert.ok(output.includes("lecture-evidence"));
  assert.ok(!/\p{Script=Arabic}/u.test(output), `Non-English MID review rendered: ${q.id}`);
  assert.ok(output.includes('class="lecture-evidence" lang="en" dir="ltr"'));
  if (q.verification === "needs-review" || (q.verification === "conflict" && !q.aiAnswer)) {
    assert.ok(!/option-button[^"\n]*\b(?:correct|incorrect)\b/.test(output), `Uncertain item graded: ${q.id}`);
  }
}
console.log("PASS: all 663 MID items render; 283 new reviews have bounded pages; source keys, previous reviews and other scopes preserved; ambiguous choices stay ungraded; English update strip is present.");
console.log(counts);
if (process.env.MID_REVIEW_EXPORT) fs.writeFileSync(process.env.MID_REVIEW_EXPORT, JSON.stringify(after.filter(q => q.lectureEvidence), null, 2));
