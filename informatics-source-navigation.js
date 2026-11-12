// Source files define exam membership and order; repeat groups affect practice only.
(() => {
  "use strict";
  const index = window.GIFT445_ORIGINAL_BATCH_INDEX.informatics;
  const orderedIds = Object.values(index).flat();
  const rank = new Map(orderedIds.map((id, position) => [id, position]));
  const repeatGroup = new Map((window.GIFT445_INFORMATICS_SOURCE_REPEATS || []).flatMap(ids => ids.map(id => [id, ids[0]])));
  const files = {
    Midterm: "https://docs.google.com/document/d/1s8onKo0AjIhrWAG9ZRqoNRxL7ud8VK4f/edit",
    Final: "https://docs.google.com/document/d/19FIpy6MDjChyYkM1cVeGf8fDo_a5IsKl/edit"
  };
  const bankLookups = new WeakMap();

  function entries(bank, assessment = null) {
    if (!bankLookups.has(bank)) bankLookups.set(bank, new Map(bank.filter(q => q.subjectId === "informatics").map(q => [q.id, q])));
    const lookup = bankLookups.get(bank);
    const ids = assessment ? Object.entries(index).filter(([key]) => key.startsWith(`${assessment}|`)).flatMap(([, ids]) => ids) : orderedIds;
    return ids.map(id => lookup.get(id)).filter(Boolean);
  }

  function order(questions) {
    return [...questions].sort((a, b) => (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity));
  }

  function practice(questions, preferredId = null) {
    const unique = new Map();
    for (const question of questions) {
      const group = repeatGroup.get(question.id) || question.id;
      if (!unique.has(group) || question.id === preferredId) unique.set(group, question);
    }
    return [...unique.values()];
  }

  function lecture(questions, titles) {
    const selected = new Set(titles);
    return practice(order(questions.filter(q => !q.batchOnly && !q.hideFromLecture && selected.has(q.lecture))));
  }

  function location(question) {
    const source = question.sourceLocations?.[0];
    if (!source || !files[source.assessment]) return null;
    if (source.filename && Number.isInteger(source.pdfPage)) {
      return {
        url: null,
        title: `Gift ${source.assessment} · Batch ${source.batch}`,
        number: `Original Q${source.questionNumber}`,
        paragraph: `${source.filename} · PDF page ${source.pdfPage}${source.pdfPageEnd > source.pdfPage ? `–${source.pdfPageEnd}` : ""}`,
        repeated: repeatGroup.has(question.id)
      };
    }
    const paragraph = source.paragraph ?? source.paragraphIndex;
    return {
      url: files[source.assessment],
      title: `Gift ${source.assessment} · Batch ${source.batch}`,
      number: source.questionNumber == null ? "Unnumbered in source" : `Original Q${source.questionNumber}`,
      paragraph: Number.isInteger(paragraph) ? `Source paragraph index ${paragraph}` : "",
      repeated: repeatGroup.has(question.id)
    };
  }

  window.GIFT445_INFORMATICS_BANK = { entries, order, practice, lecture, location };
})();
