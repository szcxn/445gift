// Source files define exam membership and order; repeat groups affect practice only.
(() => {
  "use strict";
  const index = window.GIFT445_ORIGINAL_BATCH_INDEX.informatics;
  const orderedIds = Object.values(index).flat();
  const rank = new Map(orderedIds.map((id, position) => [id, position]));
  const originalAssessments = new Map(Object.entries(index).flatMap(([key, ids]) => ids.map(id => [id, key.split("|")[0]])));
  const repeatGroup = new Map((window.GIFT445_INFORMATICS_SOURCE_REPEATS || []).flatMap(ids => ids.map(id => [id, ids[0]])));
  const files = {
    Midterm: "https://docs.google.com/document/d/1s8onKo0AjIhrWAG9ZRqoNRxL7ud8VK4f/edit",
    Final: "https://docs.google.com/document/d/19FIpy6MDjChyYkM1cVeGf8fDo_a5IsKl/edit"
  };
  const bankLookups = new WeakMap();
  const catalog = window.GIFT445_INFORMATICS_CATALOG || [];
  const lectures = new Map(catalog.flatMap(group => group.lectures.map(title => [title, group.assessment])));
  // Original PDF identities, independently checked against the nine source files.
  const originals = new Map([
    ["ce7b9b5b5ffbd5ad1feb6842fd96a43c7a8cf6697024900cc11636578354c282", 11, "Introduction to Medical Informatics", "Midterm"],
    ["929278290c1a2a8e42f4ea2d8407dc13fb8d54d942a5989c6c8d0adffe493040", 11, "Clinical Data and Big Data", "Midterm"],
    ["658eba88789fe5c25c6a15e1dbc52d100d6a038cd674fd75691ef79329f28fb9", 10, "Electronic Health Records", "Midterm"],
    ["6788f6cadc9e9a0e002b463311b8f20f0f08fe7e349cafbf282f5ba47eff510e", 13, "Clinical Decision Support", "Midterm"],
    ["b79239320e3c094d204f81d9b5be20c5018a5343afcd431dd283cb8d254b8469", 24, "AI in Healthcare", "Midterm"],
    ["555e183b2be3d676de187f27b5af89c96369d2102b9ae9befd2d578716572170", 11, "Telemedicine, mHealth and Wearables", "Final"],
    ["f607b9ba2b03dbb84e7fdb7d129dd751a9e937cb3149231c87a0d96418cdf9b0", 18, "Patient Safety in Clinical Informatics", "Final"],
    ["e70d9d3a4071b43b9109a5e2c30ade3a78fbefa22881bd00a881244f5c18e8a8", 10, "Precision Medicine", "Final"],
    ["449057a6f8431827e84a37eab95c03d76ff55beee428d1883ecded271c9dbfa3", 13, "Health Data Privacy, Confidentiality and Security", "Final"]
  ].map(([hash, lastTeachingPage, title, assessment]) => [hash, { lastTeachingPage, title, assessment }]));
  const midSupplements = new Map([
    ["49ebb47c0597eec58536e611f75d50cb79f5d14c7e5913a68874c45d92842d64", [5, 19]],
    ["aabae63b20b3a0be482860869864bb2b2e20984d8546ab8ef97f1068701b454f", [5, 19]],
    ["c4ebd67e28420b13c9248f0d2e3e0e176f87aab8d5862a2b301825ae270502f6", [5, 17]],
    ["2fbbbde2c20b705885893198c10d707bc9c008fb77fd1322a32f80fe7c92742f", [6, 8]]
  ]);

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

  function lectureAssessment(title) {
    return lectures.get(title) ?? null;
  }

  function isLectureQuestion(question) {
    if (question.subjectId !== "informatics" || question.batchOnly && !question.informaticsVerifiedBatchLecture || question.hideFromLecture || !question.lecture) return false;
    const assessment = lectureAssessment(question.lecture);
    if (!assessment || !["Midterm", "Final"].includes(question.assessment) || originalAssessments.get(question.id) !== question.assessment) return false;
    if (question.assessment === "Midterm" && assessment !== "Midterm") return false;
    const passages = question.informaticsBatch445Review?.evidence || question.informaticsFinalReview?.evidence || question.informaticsEvidence || [];
    let ownSource = false;
    for (const passage of passages) {
      const { pdfPage, sourceSha256, sourceKind, quote, quoteParts } = passage;
      const excerpts = quoteParts || [quote];
      if (!Number.isInteger(pdfPage) || pdfPage < 1 || !excerpts.length || excerpts.some(text => typeof text !== "string" || !text.trim())) return false;
      const source = originals.get(sourceSha256);
      if (source) {
        if (question.assessment === "Midterm" && source.assessment !== "Midterm" || pdfPage > source.lastTeachingPage || sourceKind === "study-file") return false;
        if (source.title === question.lecture) ownSource = true;
      } else {
        const limits = midSupplements.get(sourceSha256);
        if (assessment !== "Midterm" || sourceKind !== "study-file" || !limits || pdfPage < limits[0] || pdfPage > limits[1]) return false;
      }
    }
    return ownSource;
  }

  function lectureEntries(questions, titles, assessment = null) {
    const selected = new Set(titles);
    const ordered = order(questions.filter(q => selected.has(q.lecture)
      && q.assessment === (assessment || lectureAssessment(q.lecture)) && isLectureQuestion(q)));
    return assessment === "Final" ? ordered.sort((a, b) => Number(b.sourceBatch) - Number(a.sourceBatch)) : ordered;
  }

  function lecture(questions, titles, assessment = null) {
    return practice(lectureEntries(questions, titles, assessment));
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

  window.GIFT445_INFORMATICS_BANK = { entries, order, practice, lecture, lectureEntries, lectureAssessment, isLectureQuestion, location };
})();
