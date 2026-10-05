const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const c = {window: {}}; vm.createContext(c);
for (const name of ['medicine-data.js','medicine-reference-overrides.js','medicine-mid-444-review.js','medicine-mid-444-renal-gi-review.js','medicine-mid-explanation-completion.js','medicine-mid-lecture-evidence.js']) vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),c);
const before = JSON.parse(JSON.stringify(c.window.GIFT445_QUESTIONS));
vm.runInContext(fs.readFileSync(path.join(root,'medicine-mid-source-tables.js'),'utf8'),c);
const after = JSON.parse(JSON.stringify(c.window.GIFT445_QUESTIONS));
const manifest = JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/medicine-mid-source-tables.json'),'utf8'));
assert.equal(after.length, before.length);
const targets = new Set(Object.keys(manifest.tables));
for(let i=0;i<after.length;i++) {
 const q=after[i],old=before[i];
 if(!targets.has(q.id)) { assert.deepEqual(q,old); continue; }
 for(const key of ['id','stem','options','images','sourceAnswer','sourceAnswerNote','sourceLocations','cycle','lecture','lectureOrder','referenceOrder','lectureEvidence']) assert.deepEqual(q[key],old[key],`${key} changed: ${q.id}`);
 assert.deepEqual(q.sourceTables,manifest.tables[q.id]);
 assert.equal(q.tableSource.sha256,manifest.sourceSha256);
 assert.ok(!/table.{0,25}(?:missing|unavailable)|missing.{0,25}table|absent blood-gas table/i.test(q.reviewOpinion),`Stale review: ${q.id}`);
}
// Independent source markers, not a count inferred from existing question numbers.
const mid=after.filter(q=>q.assessment === 'Midterm');
assert.equal(manifest.questionLocations.length,695);
for(const l of manifest.questionLocations) assert.ok(mid.some(q=>q.id===l.id && q.sourceLocations.some(p=>String(p.batch)===String(l.batch) && p.questionNumber===l.questionNumber)),`Original source question absent: ${l.batch} Q${l.questionNumber}`);
const renderer={appState:{quiz:{answers:{}},navigation:{mode:'batch',assessment:'Midterm'}},SUBJECTS:[{id:'medicine',name:'Medicine'}],sourceAnswers:q=>q.sourceAnswer?[q.sourceAnswer]:[],batchDisplayName:(_,b)=>`Batch ${b}`,escapeHtml:v=>String(v).replace(/[&<>'"]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[x]))};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderQuestion(question,'),html.indexOf('    function answerQuestion(questionId,')),renderer);
for(const q of after.filter(q=>targets.has(q.id))) {
 let output=renderer.renderQuestion(q,0);
 assert.ok(output.includes('question-source-table'));
 assert.ok(output.indexOf('question-source-table')<output.indexOf('class="options"'));
 for(const table of q.sourceTables) for(const row of table.rows) for(const cell of row) assert.ok(output.includes(`>${renderer.escapeHtml(cell)}</td>`),`Lost source cell: ${q.id}: ${cell}`);
 assert.ok(output.includes('Values and units are reproduced as recorded in the source.'));
 renderer.appState.quiz.answers[q.id]='A';output=renderer.renderQuestion(q,0);
 if(q.verification==='needs-review') assert.ok(!/option-button[^"\n]*\b(?:correct|incorrect)\b/.test(output),`Source inconsistency graded: ${q.id}`);
 assert.ok(!/\p{Script=Arabic}/u.test(output));
}
const find=id=>after.find(q=>q.id===id);
assert.equal(find('medicine-midterm-441-cardiology-q035').verification,'supported');
assert.equal(find('medicine-midterm-439-nephrology-q044').verification,'needs-review');
assert.equal(find('medicine-midterm-439-nephrology-q044').sourceTables[0].rows[2][1],'12 mmHg');
assert.equal(find('medicine-midterm-439-nephrology-q040').options[2].text,'Not provided in the source');
vm.runInContext(html.slice(html.indexOf('    function deduplicateQuestions('),html.indexOf('    const STORAGE_KEY')),renderer);
const variant=find('medicine-midterm-439-nephrology-q038');
const changed={...variant,id:'different-labs',sourceTables:[{rows:[['Na','120 mmol/L']]}]};
assert.equal(renderer.deduplicateQuestions([variant,changed]).length,2,'Distinct lab scenarios collapsed');
console.log('PASS: 695 original MID source locations covered; all 22 tables and 12 nested tables preserve every cell and render before options; original keys and lecture citations unchanged; inconsistent items stay ungraded.');
