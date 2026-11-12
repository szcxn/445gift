(function () {
  "use strict";

  const HISTORY_KEY = "gift445-mistakes-v1";
  const REVIEW_KEY = "gift445-mistake-review-v1";

  function answerMap(value) {
    return Object.assign(Object.create(null), Object.fromEntries(Object.entries(value || {})
      .filter(([id, answer]) => id && typeof answer === "string" && answer)));
  }

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch (_) { return null; }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function loadHistory() {
    const history = Object.create(null);
    const saved = read(HISTORY_KEY);
    if (saved?.version !== 1 || !saved.entries) return history;
    for (const [id, entry] of Object.entries(saved.entries)) {
      if (!Number.isSafeInteger(entry?.misses) || entry.misses < 1) continue;
      history[id] = {
        misses: entry.misses,
        retries: Number.isSafeInteger(entry.retries) && entry.retries >= 0 ? entry.retries : 0,
        mastered: entry.mastered === true,
        lastMissedAt: Number(entry.lastMissedAt) || 0
      };
    }
    return history;
  }

  function saveHistory(history) {
    return write(HISTORY_KEY, { version: 1, entries: history });
  }

  function record(history, id, correct, retry = false, now = Date.now()) {
    const previous = history[id];
    if (correct && (!retry || !previous)) return false;
    history[id] = {
      misses: (previous?.misses || 0) + Number(!correct),
      retries: (previous?.retries || 0) + Number(retry),
      mastered: correct,
      lastMissedAt: correct ? previous.lastMissedAt : now
    };
    return true;
  }

  function commitHistory(updates) {
    const applyUpdates = () => {
      const history = loadHistory();
      for (const { id, correct, retry, now, seed } of updates) {
        if (!seed || !history[id]) record(history, id, correct, retry, now);
      }
      return saveHistory(history);
    };
    const locks = typeof navigator !== "undefined" ? navigator.locks : null;
    return locks?.request
      ? locks.request(HISTORY_KEY, applyUpdates).catch(applyUpdates)
      : applyUpdates();
  }

  function loadReview() {
    const saved = read(REVIEW_KEY);
    if (saved?.version !== 1 || !Array.isArray(saved.ids)) return null;
    const ids = [...new Set(saved.ids.filter(id => typeof id === "string" && id))];
    if (!ids.length) return null;
    const index = Number.isSafeInteger(saved.index) ? Math.max(0, Math.min(saved.index, ids.length - 1)) : 0;
    return { ids, index, answers: answerMap(saved.answers) };
  }

  function saveReview(review) {
    return write(REVIEW_KEY, { version: 1, ...review });
  }

  function summarize(questions, answers, gradingFor) {
    const result = { correct: 0, incorrect: 0, ungraded: 0, unanswered: [], missed: [] };
    for (const question of questions) {
      const { options, correct } = gradingFor(question);
      if (!correct.size) {
        result.ungraded += 1;
        continue;
      }
      const answer = answers[question.id];
      if (!options.has(answer)) {
        result.unanswered.push(question.id);
      } else if (correct.has(answer)) {
        result.correct += 1;
      } else {
        result.incorrect += 1;
        result.missed.push(question.id);
      }
    }
    result.scored = result.correct + result.incorrect + result.unanswered.length;
    result.complete = questions.length > 0 && result.unanswered.length === 0;
    return result;
  }

  window.GIFT445_STUDY_TRACKING = {
    HISTORY_KEY, REVIEW_KEY, answerMap, loadHistory, commitHistory, record, loadReview, saveReview, summarize
  };
}());
