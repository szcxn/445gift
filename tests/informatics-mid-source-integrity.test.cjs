const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const repo = path.resolve(__dirname, '..');
const proof = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/informatics-mid-source-integrity.json')));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const c = vm.createContext({window: {}});
for (const file of ['informatics-data.js', 'original-batches.js', 'informatics-mid-source-integrity.js']) {
  vm.runInContext(fs.readFileSync(path.join(repo, file), 'utf8'), c);
}
const original = c.window.GIFT445_EXTEND_BATCH_BANK(c.window.GIFT445_INFORMATICS_QUESTIONS);
const audited = c.window.GIFT445_AUDIT_INFORMATICS_MID(original);
assert.equal(audited.length, original.length);
const byId = new Map(audited.map(q => [q.id, q]));
const parsed = value => JSON.parse(JSON.stringify(value));
for (const [i, q] of audited.entries()) {
  if (q.subjectId !== 'informatics' || q.assessment !== 'Midterm') {
    assert.equal(q, original[i], 'Changed an unrelated source record');
    continue;
  }
  assert.equal(q.giftReview, original[i].giftReview, 'Changed Gift grading');
  assert.deepEqual(parsed(q.sourceLocations), parsed(original[i].sourceLocations));
}
assert.equal(audited.filter(q => q.subjectId === 'informatics' && q.assessment === 'Midterm').length, 448);
assert.equal(proof.questions.length, 448);
assert.equal(new Set(proof.questions.map(q => q.id)).size, 448);
let images = 0;
for (const r of proof.questions) {
  const q = byId.get(r.id);
  assert.ok(q, r.id);
  assert.equal(q.sourceLocations[0].batch, r.batch);
  assert.deepEqual(parsed(q.sourceOccurrenceIntegrity), {
    filename: proof.sourceFilename,
    sha256: proof.sourceSha256,
    paragraphStart: r.start,
    paragraphEnd: r.end,
    questionNumber: r.number,
    exportedPdfPage: r.exportedPdfPage
  });
  assert.equal(sha(JSON.stringify(proof.hashFields.map(k => q[k]))), r.sourceHash, `Changed original question data: ${r.id}`);
  assert.equal(sha(q.sourceTranscript), r.transcriptHash, `Lost native transcript: ${r.id}`);
  assert.doesNotMatch(q.sourceTranscript, /\/Users\/|download_url|storage\.googleapis\.com/);
  for (const [asset, hash] of Object.entries(r.assets || {})) {
    assert.ok(q.images.includes(asset));
    assert.equal(sha(fs.readFileSync(path.join(repo, asset))), hash);
    images++;
  }
}
assert.equal(images, 3);
assert.equal(Object.keys(proof.batches).length, 12);
for (const [key, ids] of Object.entries(proof.batches)) {
  assert.deepEqual(parsed(c.window.GIFT445_ORIGINAL_BATCH_INDEX.informatics[key]), ids, `Gift file order: ${key}`);
  const starts = ids.map(id => byId.get(id).sourceOccurrenceIntegrity.paragraphStart);
  assert.deepEqual(starts, [...starts].sort((a, b) => a - b));
}
const printedNumbers = key => proof.batches[key].map(id => byId.get(id).sourceOccurrenceIntegrity.questionNumber);
assert.deepEqual(printedNumbers('Midterm|443').slice(15, 18), [16, null, 18]);
assert.deepEqual(printedNumbers('Midterm|431').slice(29, 31), [30, 35]);
console.log('PASS: all 448 original MID occurrences preserve content, answer keys, exact native transcripts, images and batch order; unnumbered and missing source numbers were not invented.');
