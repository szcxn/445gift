const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const code = fs.readFileSync(path.join(__dirname, '..', 'study-tracking.js'), 'utf8');
const copy = value => JSON.parse(JSON.stringify(value));

function boot(storage = new Map(), locks) {
  const context = {
    window: {},
    navigator: { locks },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value)
    }
  };
  vm.runInNewContext(code, context);
  return context.window.GIFT445_STUDY_TRACKING;
}

test('completion counts only usable keys, supports equivalent choices and ignores ungraded records', () => {
  const tracking = boot();
  const questions = [
    { id: 'wrong', key: ['A'], choices: ['A', 'B'] },
    { id: 'equivalent', key: ['B', 'C'], choices: ['A', 'B', 'C'] },
    { id: 'no-key', key: [], choices: ['A', 'B'] },
    { id: 'absent-correct-choice', key: ['B'], choices: ['A'] }
  ];
  const grade = question => ({
    options: new Set(question.choices),
    correct: new Set(question.key.filter(key => question.choices.includes(key)))
  });
  const partial = copy(tracking.summarize(questions, {wrong:'B', equivalent:'Z'}, grade));
  assert.deepEqual(partial, {
    correct:0, incorrect:1, ungraded:2, unanswered:['equivalent'], missed:['wrong'], scored:2, complete:false
  });
  const complete = copy(tracking.summarize(questions, {wrong:'B', equivalent:'C', 'no-key':'A'}, grade));
  assert.deepEqual(complete, {
    correct:1, incorrect:1, ungraded:2, unanswered:[], missed:['wrong'], scored:2, complete:true
  });
  assert.equal(tracking.summarize([], {}, grade).complete, false);
});

test('mistake counts merge across two tabs and mastery persists independently from quiz progress', async () => {
  const storage = new Map([['gift445-progress-v1', 'existing normal progress']]);
  let queue = Promise.resolve();
  const locks = {request: (key, fn) => {
    assert.equal(key, 'gift445-mistakes-v1');
    const next = queue.then(fn);
    queue = next.catch(() => {});
    return next;
  }};
  const a = boot(storage, locks);
  const b = boot(storage, locks);
  await Promise.all([
    a.commitHistory([{id:'q1', correct:false, now:1}, {id:'q2', correct:false, now:1}]),
    b.commitHistory([{id:'q1', correct:false, now:2}])
  ]);
  await a.commitHistory([{id:'q1', correct:false, now:3, seed:true}]);
  assert.equal(a.loadHistory().q1.misses, 2, 'Migration should never double-count a saved mistake');
  assert.equal(a.loadHistory().q2.misses, 1);
  await b.commitHistory([{id:'q1', correct:true, now:4}]);
  assert.equal(a.loadHistory().q1.mastered, false, 'Changing a revealed answer is not mastery');
  await b.commitHistory([{id:'q1', correct:true, retry:true, now:5}]);
  a.saveReview({ids:['q1','q2'], index:1, answers:{q1:'A'}});
  const reloaded = boot(storage, locks);
  assert.deepEqual(copy(reloaded.loadHistory().q1), {misses:2,retries:1,mastered:true,lastMissedAt:2});
  assert.deepEqual(copy(reloaded.loadReview()), {ids:['q1','q2'],index:1,answers:{q1:'A'}});
  assert.equal(storage.get('gift445-progress-v1'), 'existing normal progress');
  await a.commitHistory([{id:'q1', correct:false, retry:true, now:6}]);
  assert.deepEqual(copy(reloaded.loadHistory().q1), {misses:3,retries:2,mastered:false,lastMissedAt:6});
});
