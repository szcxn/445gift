const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures/informatics-mid-445.json"), "utf8"));
const sha = data => createHash("sha256").update(data).digest("hex");
const plain = value => JSON.parse(JSON.stringify(value));

function loadSite(include445) {
  const c = vm.createContext({ window: {}, appState: { navigation: { mode: "batch", assessment: "Midterm", batch: "445" } } });
  for (const match of html.matchAll(/<script src="([^"?]+)/g)) {
    if (!include445 && match[1] === "informatics-mid-445.js") continue;
    vm.runInContext(fs.readFileSync(path.join(root, match[1]), "utf8"), c, { filename: match[1] });
  }
  for (const match of html.matchAll(/^    function ([A-Za-z_$][\w$]*)\(/gm)) {
    const end = html.indexOf("\n    }\n", match.index) + 6;
    vm.runInContext(html.slice(match.index, end), c, { filename: match[1] });
  }
  const start = html.indexOf("    const QUESTION_BANK =");
  const end = html.indexOf("\n\n", start);
  c.bank = vm.runInContext(html.slice(start, end) + "\nQUESTION_BANK", c);
  c.SUBJECTS = [{ id: "informatics", name: "Informatics" }];
  return c;
}

const before = loadSite(false);
const after = loadSite(true);
const batch = after.questionsForBatch("informatics", "Midterm", "445");
assert.equal(batch.length, 37);
assert.equal(after.bank.length, before.bank.length + 37);
const ids = new Set(batch.map(q => q.id));
assert.equal(ids.size, 37);
assert.equal(JSON.stringify(after.bank.filter(q => !ids.has(q.id))), JSON.stringify(before.bank));

const sourceBank = after.window.GIFT445_INFORMATICS_BANK;
assert.equal(sourceBank.entries(after.bank, "Midterm").length, 485);
assert.equal(sourceBank.entries(after.bank, "Final").length, 431);
assert.equal(sourceBank.entries(after.bank).length, 916);
assert.equal(sourceBank.practice(sourceBank.entries(after.bank, "Midterm")).length, 469);
assert.equal(sourceBank.practice(sourceBank.entries(after.bank)).length, 875);
assert.deepEqual(plain(batch.map(q => q.sourceQuestionNumber)), fixture.questions.map(q => q.number));
const lectureCounts = {};
const usedImages = new Set();
for (const [i, q] of batch.entries()) {
  const row = fixture.questions[i];
  assert.equal(sha(JSON.stringify([q.stem, q.options, q.sourceTranscript])), row.contentSha256);
  assert.deepEqual(plain(q.sourceOccurrenceIntegrity), {
    filename: fixture.filename, sha256: fixture.sha256, questionNumber: row.number, pdfPage: row.page, pdfPageEnd: row.pageEnd
  });
  assert.equal(q.sourceAnswer, row.key);
  const grading = row.number === 34 ? [] : [row.key];
  assert.deepEqual(plain(after.gradingAnswersForQuestion(q)), grading);
  assert.ok(sourceBank.lecture(after.bank.filter(item => item.subjectId === "informatics"), [q.lecture]).some(item => item.id === q.id));
  lectureCounts[q.lecture] = (lectureCounts[q.lecture] || 0) + 1;

  const review = q.informaticsBatch445Review;
  assert.ok(review.explanation.length > 100 && review.evidence.length, q.id);
  for (const e of review.evidence) {
    const source = fixture.assets[e.image];
    assert.equal(e.sourceId, source.sourceId);
    assert.equal(e.sourceSha256, source.sourceSha256);
    assert.equal(e.pdfPage, source.pdfPage);
    assert.equal(sha(fs.readFileSync(path.join(root, e.image))), source.imageSha256);
    if (!e.url.startsWith("https://")) {
      assert.equal(sha(fs.readFileSync(path.join(root, e.url.split("#")[0]))), e.sourceSha256);
    }
    usedImages.add(e.image);
  }

  for (const answer of q.options) {
    const card = after.renderQuestion(q, i, batch.length, answer.id);
    assert.match(card, new RegExp(`Original Q${row.number}\\b`));
    assert.match(card, /Medical Informatics Midterm Gifts\.pdf/);
    assert.doesNotMatch(card, /Original Gift question text/);
    assert.ok(card.includes(after.escapeHtml(review.explanation)));
    assert.ok(card.includes(`data-option="${answer.id}" aria-pressed="true"`));
    if (grading.length) {
      assert.ok(card.includes(`option-button selected ${answer.id === row.key ? "correct" : "incorrect"}`));
    } else {
      assert.doesNotMatch(card, /option-button[^"]*\b(?:correct|incorrect)\b/);
      assert.match(card, /Not scored: The wording points to data mining/);
    }
    assert.ok(review.evidence.every(e => card.includes(e.image)));
  }
}
assert.deepEqual(lectureCounts, {
  "AI in Healthcare": 7, "Introduction to Medical Informatics": 8, "Clinical Decision Support": 9,
  "Electronic Health Records": 6, "Clinical Data and Big Data": 7
});
assert.equal(usedImages.size, Object.keys(fixture.assets).length);
assert.equal(batch[33].sourceAnswer, "A");
assert.deepEqual(plain(batch[33].informaticsBatch445Review.answers), ["B"]);
assert.match(after.renderQuestion(batch[33], 33, 37, "A"), /Suggested answer: B — Data mining/);
console.log("PASS: 37 original Batch 445 MID questions, 148 choices, all five lecture routes, 29 source pages and Gift grading.");
