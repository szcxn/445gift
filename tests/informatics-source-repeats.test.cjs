const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = vm.createContext({window: {}});
for (const file of [
  'informatics-data.js',
  'informatics-final-data.js',
  'original-batches.js',
  'informatics-source-repeats.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
const plain = value => JSON.parse(JSON.stringify(value));
const w = context.window;
const sourceIndex = plain(w.GIFT445_ORIGINAL_BATCH_INDEX.informatics);
const questionById = new Map(plain(w.GIFT445_EXTEND_BATCH_BANK([
  ...w.GIFT445_INFORMATICS_QUESTIONS, ...w.GIFT445_INFORMATICS_FINAL_QUESTIONS
])).filter(q => q.subjectId === 'informatics').map(q => [q.id, q]));
const indexedIds = new Set(Object.values(sourceIndex).flat());
const norm = s => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, ' ').trim();
const options = q => q.options.map(o => JSON.stringify([norm(o.text), o.images || []])).sort();
const keyText = q => {
  const letters = Array.isArray(q.sourceAnswer) ? q.sourceAnswer : [q.sourceAnswer];
  return q.options.filter(o => letters.includes(o.id)).map(o => norm(o.text)).sort();
};
const groupById = new Map();
const groups = plain(w.GIFT445_INFORMATICS_SOURCE_REPEATS);
for (const ids of groups) {
  assert.ok(ids.length > 1);
  const first = questionById.get(ids[0]);
  assert.ok(first, `Unknown source question: ${ids[0]}`);
  for (const id of ids) {
    const member = questionById.get(id);
    assert.ok(member && indexedIds.has(id), `Repeat ID is not an original source position: ${id}`);
    assert.ok(!groupById.has(id), `Repeat groups overlap: ${id}`);
    groupById.set(id, ids[0]);
    assert.deepEqual(options(member), options(first), `Different choice content: ${id}`);
    assert.deepEqual(member.images || [], first.images || [], `Different question images: ${id}`);
    assert.deepEqual(member.sourceTables || [], first.sourceTables || [], `Different question tables: ${id}`);
    assert.ok(keyText(member).length && keyText(member).every(Boolean), `Missing keyed choice: ${id}`);
    assert.deepEqual(keyText(member), keyText(first), `Different keyed answer text: ${id}`);
  }
}

// These cases look similar but must retain their distinct keys and questions.
assert.notEqual(groupById.get('informatics-mid-438-p1255'), groupById.get('informatics-mid-437-p1492'));
assert.ok(!groupById.has('informatics-final-438-p0902-q34')); // Patient-based vs systems approach.
assert.ok(!groupById.has('informatics-final-438-p0710-q05')); // Missing key.
assert.ok(!groupById.has('informatics-final-436-p1473-q13')); // Cholesterol, not heart rate.

const practiceCount = keys => new Set(Object.entries(sourceIndex)
  .filter(([key]) => keys.some(assessment => key.startsWith(assessment + '|')))
  .flatMap(([, ids]) => ids)
  .map(id => groupById.get(id) || id)).size;
assert.equal(indexedIds.size, 879);
assert.equal(practiceCount(['Midterm']), 432);
assert.equal(practiceCount(['Final']), 420);
assert.equal(practiceCount(['Midterm', 'Final']), 838);
assert.equal(groups.length, 36);
console.log('PASS: 36 verified Informatics repeat groups preserve 879 distinct original positions; keyed answer content, options, tables and media agree.');
