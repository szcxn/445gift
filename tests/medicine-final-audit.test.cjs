const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const context = vm.createContext({ window: {} });
const plain = value => JSON.parse(JSON.stringify(value));

for (const [, script] of html.matchAll(/<script src="([^"?]+)/g)) {
  // Compare Medicine's new audit against the complete pre-audit bank.
  if (script === "site-content-review.js") continue;
  vm.runInContext(fs.readFileSync(path.join(root, script), "utf8"), context, { filename: script });
}
if (!context.window.GIFT445_AUDIT_MEDICINE_FINAL) {
  vm.runInContext(fs.readFileSync(path.join(root, "medicine-final-audit.js"), "utf8"), context);
}

const loadFunction = name => {
  const start = html.indexOf(`    function ${name}(`);
  const end = html.indexOf("\n    }\n", start) + 6;
  assert.ok(start >= 0, name);
  vm.runInContext(html.slice(start, end), context);
};
for (const name of ["deduplicateQuestions", "gradingAnswersForQuestion", "sourceAnswers"]) loadFunction(name);

const bankStart = html.indexOf("    const QUESTION_BANK =");
const baseline = vm.runInContext(html.slice(bankStart, html.indexOf("\n\n", bankStart)) + "\nQUESTION_BANK", context);
const reviewed = context.window.GIFT445_AUDIT_MEDICINE_FINAL(baseline);
const byId = new Map(reviewed.map(q => [q.id, q]));
const originalIndex = context.window.GIFT445_ORIGINAL_BATCH_INDEX.medicine;
const originals = Object.values(originalIndex).flat().map(id => byId.get(id));
const correctedKeyParsing = new Map([
  ["batch-medicine-final-434-p4413-q1", "A"], // The narrative repeated A.
  ["batch-medicine-final-429-p6012-q12", "C"], // The original answer prefix was misspelled.
  ["batch-medicine-final-432-p5464-q32", "B"], // The original key followed option D on the same line.
  ["batch-medicine-final-435-p4256-q59", "C"]
]);

assert.equal(reviewed.length, baseline.length);
assert.equal(byId.size, reviewed.length);
for (const [index, q] of baseline.entries()) {
  const actual = reviewed[index];
  assert.equal(actual.id, q.id);
  assert.deepEqual(plain(actual.sourceLocations), plain(q.sourceLocations), q.id);
  if (q.subjectId !== "medicine" || q.assessment !== "Final") assert.equal(actual, q);
  if (q.batchOnly) {
    assert.deepEqual(actual.sourceAnswer, correctedKeyParsing.get(q.id) ?? q.sourceAnswer, q.id);
  }
}

assert.equal(originals.length, 1493);
assert.deepEqual(["443", "442", "441", "438"].map(batch => originalIndex[`Final|${batch}`].length), [73, 80, 80, 40]);
for (const batch of ["443", "442", "441", "438"]) {
  for (const id of originalIndex[`Final|${batch}`]) assert.equal(byId.get(id).medicineFinalAudit, true, id);
}
const audited = reviewed.filter(q => q.medicineFinalAudit);
assert.equal(audited.length, 1359);
assert.equal(originals.filter(q => q.medicineFinalAudit).length, 686);
assert.equal(audited.filter(q => !context.gradingAnswersForQuestion(q).length).length, 329);
const finalOriginals = originals.filter(q => q.assessment === "Final");
assert.equal(finalOriginals.length, 765);
assert.ok(finalOriginals.every(q => q.medicineReview.explanation.length >= 90));
assert.equal(finalOriginals.filter(q => !context.gradingAnswersForQuestion(q).length).length, 168);
for (const q of audited) {
  assert.ok(q.medicineReview.explanation.length >= 90, q.id);
  assert.ok(q.medicineReview.references.length > 0, q.id);
  for (const { url } of q.medicineReview.references) assert.equal(new URL(url).protocol, "https:", q.id);
  for (const answer of q.medicineReview.answers) assert.ok(q.options.some(o => o.id === answer && o.text.trim()), q.id);
  const gradingAnswers = plain(context.gradingAnswersForQuestion(q));
  assert.deepEqual(gradingAnswers, plain(q.giftReview.gradingAnswers), q.id);
  if (gradingAnswers.length) assert.deepEqual(gradingAnswers, plain(context.sourceAnswers(q)), q.id);
  else assert.ok(q.giftReview.ungradedReason, q.id);
}

const csf = byId.get("medicine-final-442-neurology-q023");
assert.equal(csf.stem, byId.get("batch-medicine-final-442-p919-q23").stem);
assert.equal(csf.sourceAnswer, "A");
assert.match(csf.giftReview.ungradedReason, /does not include the CSF results/);
assert.deepEqual(plain(context.gradingAnswersForQuestion(csf)), []);

const type1 = byId.get("medicine-final-443-endocrinology-q046");
assert.deepEqual(plain(context.gradingAnswersForQuestion(type1)), ["A"]);
assert.match(type1.options.find(o => o.id === "A").text, /destruction/);
const reordered = originals.find(q => q.assessment === "Final" && q.sourceBatch === "441" && q.sourceLocations[0].questionNumber === 27);
assert.deepEqual(plain(context.gradingAnswersForQuestion(reordered)), ["C"]);
assert.match(reordered.options.find(o => o.id === "C").text, /destruction/);

for (const id of ["medicine-final-441-mixed-medicine-q051", "batch-medicine-final-441-p1897-q51"]) {
  const lamotrigine = byId.get(id);
  assert.match(lamotrigine.options.find(o => o.id === "C").text, /^Sodium valproate$/);
  assert.match(lamotrigine.options.find(o => o.id === "D").text, /^Lamotrigine$/);
  assert.doesNotMatch(lamotrigine.stem, /Lamotrigine/);
  assert.deepEqual(plain(context.gradingAnswersForQuestion(lamotrigine)), ["D"]);
}
const missingDiabetesOptions = byId.get("medicine-final-441-mixed-medicine-q013");
assert.equal(missingDiabetesOptions.sourceAnswer, "D");
assert.equal(missingDiabetesOptions.options.length, 0);
assert.deepEqual(plain(context.gradingAnswersForQuestion(missingDiabetesOptions)), []);
const corticosteroid = byId.get("medicine-final-441-mixed-medicine-q011");
assert.equal(corticosteroid.sourceAnswer, "C");
assert.match(corticosteroid.medicineReview.explanation, /invasive ventilation/);
assert.deepEqual(plain(context.gradingAnswersForQuestion(corticosteroid)), []);

for (const [id, letter, originalChoice] of [
  ["medicine-final-432-infectious-diseases-q006", "A", /^Falciparum$/],
  ["medicine-final-434-rheumatology-q003", "B", /^Anti-Jo-1$/],
  ["medicine-final-431-rheumatology-q001", "C", /^Malar rash\.$/],
  ["batch-medicine-final-429-p6012-q12", "C", /^Pneumocystis jiroveci/],
  ["batch-medicine-final-432-p5464-q32", "B", /^Primary hyperparathyroidism/],
  ["batch-medicine-final-435-p4256-q59", "C", /^Posterior part of inferior frontal gyrus/]
]) {
  const question = byId.get(id);
  assert.match(question.options.find(option => option.id === letter).text, originalChoice, id);
  assert.deepEqual(plain(context.gradingAnswersForQuestion(question)), [letter], id);
}
for (const id of ["batch-medicine-final-432-p5464-q32", "batch-medicine-final-435-p4256-q59"]) {
  const question = byId.get(id);
  assert.doesNotMatch(question.options.find(option => option.id === "D").text, /Answer:/, id);
}
assert.doesNotMatch(byId.get("medicine-final-432-infectious-diseases-q006").stem, /Falciparum/);

const stroke = byId.get("medicine-final-443-neurology-q067");
assert.equal(stroke.sourceAnswer, "D");
assert.deepEqual(plain(stroke.medicineReview.answers), ["C"]);
assert.deepEqual(plain(context.gradingAnswersForQuestion(stroke)), []);

const goiter = byId.get("medicine-final-439-endocrinology-q025");
assert.equal(goiter.sourceAnswer, "A");
assert.match(goiter.options.find(o => o.id === "C").text, /Thyroidectomy/);
assert.deepEqual(plain(context.gradingAnswersForQuestion(goiter)), []);

for (const id of ["medicine-final-438-mixed-medicine-q013", "batch-medicine-final-438-p2894-q13"]) {
  const ecg = byId.get(id);
  assert.equal(ecg.sourceAnswer, "A");
  assert.match(ecg.medicineReview.explanation, /shortens the QT interval/);
  assert.deepEqual(plain(context.gradingAnswersForQuestion(ecg)), []);
  assert.ok(ecg.images.length && ecg.images.every(image => fs.existsSync(path.join(root, image))));
}

const missedLabs = byId.get("batch-medicine-final-442-p1311-q66").sourceTables[0].rows;
assert.ok(missedLabs.some(row => row.join(" ") === "RBG 370 mg/dl"));
assert.ok(missedLabs.some(row => row.join(" ").trim() === "Arterial PH 7.25"));
const missing = byId.get("medicine-final-435-neurology-q056");
assert.equal(missing.options.length, 0);
assert.ok(missing.medicineNativeIncomplete);
assert.deepEqual(plain(context.gradingAnswersForQuestion(missing)), []);

const moved = byId.get("batch-medicine-final-435-p4041-q20");
assert.equal(moved.images.length, 0);
assert.ok(moved.answerImages.length > 0);
assert.ok(moved.answerImages.every(image => fs.existsSync(path.join(root, image))));

const meds444 = Object.values(originalIndex["Midterm|444"]).map(id => byId.get(id));
assert.equal(meds444.length, 33);
for (const [item, page, supportRole] of [[8, 7, "related"], [11, 6, "direct"], [22, 50, "related"], [23, 49, "direct"]]) {
  const question = meds444.find(q => q.sourceLocations[0].questionNumber === item);
  const [source] = question.midterm444Review.evidence;
  assert.equal(source.pdfPage, page);
  assert.equal(source.supportRole, supportRole);
  assert.match(source.sourceSection, /^MED445/);
  assert.ok(fs.existsSync(path.join(root, source.image)));
}
assert.deepEqual(plain(context.gradingAnswersForQuestion(meds444[21])), []);
assert.deepEqual(plain(meds444[21].midterm444Review.answers), ["A", "B"]);
assert.deepEqual(plain(context.gradingAnswersForQuestion(meds444[22])), ["B"]);

console.log("PASS: all 765 Final originals have individual reviews, with 686 new or corrected explanations, original answer positions and reconstructed source materials.");
