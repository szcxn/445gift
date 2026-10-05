const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const ctx = {window:{}}; vm.createContext(ctx);
for (const name of ['medicine-data.js','medicine-reference-overrides.js','medicine-mid-444-review.js','medicine-mid-444-renal-gi-review.js','medicine-mid-explanation-completion.js']) vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx);
const before=JSON.parse(JSON.stringify(ctx.window.GIFT445_QUESTIONS));
vm.runInContext(fs.readFileSync(path.join(root,'medicine-mid-lecture-evidence.js'),'utf8'),ctx);
const after=JSON.parse(JSON.stringify(ctx.window.GIFT445_QUESTIONS));
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/medicine-mid-original-evidence-manifest.json'),'utf8'));
const sources=new Map(manifest.sources.map(s=>[s.id,s]));
let checked=0, background=0, withdrawn=0, outside=0;
for(let i=0;i<after.length;i++){
 const old=before[i], q=after[i];
 const target=q.subjectId==='medicine'&&q.assessment==='Midterm';
 if(!target){assert.deepEqual(q,old);continue;}
 const {lectureEvidence:oldEvidence,...original}=old;
 const {lectureEvidence:e,...current}=q;
 assert.deepEqual(current,original,`Evidence patch changed source or clinical content: ${q.id}`);
 assert.ok(e&&typeof e.verified==='boolean',`Missing explicit provenance: ${q.id}`);
 assert.ok(!/\p{Script=Arabic}/u.test(JSON.stringify(e)),`Non-English evidence: ${q.id}`);
 if(e.verified){
  checked++; background+=e.relation==='background';
  const s=sources.get(e.pdfId); assert.ok(s,`Unknown original: ${q.id}`);
  assert.equal(e.sourceSha256,s.sha256);assert.equal(e.title,s.title);assert.equal(e.url,s.url);
  assert.ok(Number.isInteger(e.page)&&e.page>=1&&e.page<=s.pageCount,`Invalid page: ${q.id}`);
  assert.ok(e.quote&&e.statement&&e.note); assert.ok(['teaching','background'].includes(e.relation));
  if(e.relation==='background')assert.match(e.note,/Background only:/);
  if(e.extraction==='visually-checked-original-page-figure'){
   const manual=manifest.manualFigureTranscriptions.find(x=>x.questionId===q.id);
   assert.ok(manual);assert.deepEqual(e.quoteParts,manual.quoteParts);assert.equal(e.renderedPageSha256,manual.renderedPageSha256);
  }else{
   assert.equal(e.extraction,'pdfplumber-text-flow-whitespace-only');assert.match(e.pageTextSha256,/^[a-f0-9]{64}$/);
  }
 }else{
  outside+=e.outside;withdrawn+=!e.outside;
  for(const key of ['page','url','quote','pdfId','sourceSha256'])assert.equal(e[key],undefined,`Unverified reference still claims ${key}: ${q.id}`);
 }
}
assert.equal(checked,622);assert.equal(background,179);assert.equal(withdrawn,37);assert.equal(outside,28);
assert.deepEqual(JSON.parse(JSON.stringify(ctx.window.GIFT445_MID_LECTURE_EVIDENCE_COUNTS)),manifest.counts);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.ok(html.indexOf('src="medicine-mid-lecture-evidence.js')>html.indexOf('src="medicine-mid-explanation-completion.js'));
const renderer={escapeHtml:value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))};
vm.createContext(renderer);vm.runInContext(html.slice(html.indexOf('    function renderLectureEvidence(question)'),html.indexOf('    function answerQuestion(questionId,')),renderer);
for(const q of after.filter(x=>x.subjectId==='medicine'&&x.assessment==='Midterm')){
 const output=renderer.renderLectureEvidence(q), e=q.lectureEvidence;
 assert.ok(!/\p{Script=Arabic}/u.test(output));
 if(e.verified){assert.ok(output.includes(`PDF page ${e.page} `));assert.ok(output.includes(renderer.escapeHtml(e.quote)));assert.ok(output.includes(renderer.escapeHtml(e.url)));if(e.relation==='background')assert.match(output,/background only/);}
 else{assert.ok(!output.includes('href=')&&!output.includes('PDF page')&&!output.includes('lecture-quote'));assert.ok(output.includes(renderer.escapeHtml(e.note)));}
}
assert.ok(!renderer.renderLectureEvidence({lectureEvidence:{title:'Stale topic citation',page:9,url:'https://example.com'}}).includes('href='));
const byIndex=idx=>after.find(q=>q.id===before.filter(x=>x.subjectId==='medicine'&&x.assessment==='Midterm')[idx-1].id).lectureEvidence;
assert.equal(byIndex(293).page,17); // STEMI reperfusion window, previously an unrelated page.
assert.equal(byIndex(639).page,15); // Actual minimal-change microscopy page.
assert.equal(byIndex(133).pdfId,'1DMww5BoHJaKpKLmsYP-QOaa12IleGTDO'); // Pleural-biopsy evidence is in lung investigations.
for(const idx of [180,411,418,476,480,547,568,595,652,658])assert.equal(byIndex(idx).verified,false);
console.log('PASS: 687 MID provenance decisions; 622 original-page passages (179 background only), 37 unsupported page claims withdrawn, 28 older or unassigned questions without verified passages; clinical/source data unchanged and unsupported references hidden.');
