const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures", "medicine-native-repairs.json"), "utf8"));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const plain = value => JSON.parse(JSON.stringify(value));

function siteBank(withRepairs) {
  const context = vm.createContext({ window: {} });
  for (const script of html.matchAll(/<script src="([^"?]+)/g)) {
    if (script[1] === "midterm-444.js") continue;
    if (!withRepairs && script[1] === "medicine-native-repairs.js") continue;
    vm.runInContext(fs.readFileSync(path.join(root, script[1]), "utf8"), context);
  }
  const dedupStart = html.indexOf("    function deduplicateQuestions(");
  const dedupEnd = html.indexOf("\n    }\n", dedupStart) + 6;
  vm.runInContext(html.slice(dedupStart, dedupEnd), context);
  const bankStart = html.indexOf("    const QUESTION_BANK =");
  const bankEnd = html.indexOf("\n\n", bankStart);
  vm.runInContext(html.slice(bankStart, bankEnd).replace("const QUESTION_BANK", "QUESTION_BANK"), context);
  return { bank: plain(context.QUESTION_BANK), batches: plain(context.window.GIFT445_ORIGINAL_BATCH_INDEX.medicine) };
}

const before = siteBank(false);
const after = siteBank(true);
assert.deepEqual(after.batches, before.batches);
assert.equal(Object.values(after.batches).flat().length, 1460);
assert.deepEqual(after.bank.map(question => question.id), before.bank.map(question => question.id));
const byId = new Map(after.bank.map(question => [question.id, question]));
const scoped = question => question.subjectId === "medicine" &&
  (question.assessment === "Midterm" || Boolean(byId.get(question.studyQuestionId || question.id).medicineMidLecture));
const changed = [];
for (const old of before.bank) {
  const current = byId.get(old.id);
  if (JSON.stringify(old) === JSON.stringify(current)) continue;
  assert.ok(scoped(current), `Edited an out-of-scope question: ${current.id}`);
  for (const field of ["sourceAnswer", "sourceAnswerNote", "sourceLocations", "assessment"]) {
    assert.deepEqual(current[field], old[field], `${current.id}: changed original ${field}`);
  }
  changed.push(current.id);
}
assert.deepEqual(changed.sort(), fixture.patchIds);
const counts = {};
for (const [key, ids] of Object.entries(after.batches)) {
  const assessment = key.split("|")[0];
  counts[assessment] = (counts[assessment] || 0) + ids.filter(id => scoped(byId.get(id))).length;
}
assert.deepEqual(counts, fixture.scopedBatchOccurrences);
assert.equal(fixture.sourceTables.length, 24);
assert.equal(fixture.sourceTables.reduce((sum, item) => sum + item.nestedCount, 0), 12);
for (const table of fixture.sourceTables) {
  for (const id of table.ids) {
    const question = byId.get(id);
    assert.ok(question.sourceLocations.some(location =>
      [location.assessment, location.batch, location.questionNumber].join("|") === table.location.join("|")));
    const cells = [...new Set(question.sourceTables.flatMap(source =>
      source.rows.flatMap(row => row.map(cell => cell.normalize("NFKC").trim()).filter(Boolean))))].sort();
    assert.equal(sha256(JSON.stringify(cells)), table.cellsSha256, id);
  }
}
for (const image of fixture.clinicalImages) {
  for (const id of image.ids) {
    const hashes = byId.get(id).images.map(source => sha256(fs.readFileSync(path.join(root, source))));
    assert.ok(hashes.includes(image.sha256), id);
  }
}
assert.match(byId.get("medicine-443-mid-arrhythmia-q12").stem, /QTc was normal.+HbA1c of 7%/);
assert.match(byId.get("medicine-443-mid-ie-q05").stem, /no “stigmata” of infective endocarditis/);
const missing = byId.get("medicine-midterm-436-pulmonary-q046");
assert.equal(missing.sourceAnswer, "A");
assert.deepEqual(missing.giftReview.gradingAnswers, []);
assert.match(missing.medicineNativeSourceNote, /image is missing/);
const repeated = ["medicine-final-443-git-hepatobiliary-q002", "batch-medicine-final-443-p88-q2", "batch-medicine-final-442-p786-q9"];
for (const id of repeated) {
  const rows = byId.get(id).sourceTables[0].rows;
  assert.ok(rows.some(row => row[0] === "PTH" && row[1] === "9.9 pmol/l (N:1-6.9)"));
  assert.equal(byId.get(id).sourceAnswer, "C");
}
const tables = byId.get("medicine-midterm-441-git-hepatobiliary-q057").sourceTables;
assert.ok(tables.some(table => table.rows.flat().includes("301 x 10³/L")));
console.log("PASS: native Medicine MID scope, 842 original occurrences, 24 table occurrences, 12 nested tables, 3 clinical images, 17 focused repairs, unchanged IDs, keys, and Final-only records.");
