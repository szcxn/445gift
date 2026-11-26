(() => {
  const changedOptions = new Map();

  function optionContent(option) {
    return JSON.stringify([
      String(option.text || "").normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase(),
      option.images || []
    ]);
  }

  function rememberOldOptions(oldQuestion, reviewedQuestion) {
    const { options } = window.GIFT445_DISPLAY_REVIEWED_QUESTION(reviewedQuestion);
    const oldOptions = oldQuestion.options;
    const current = options.map(option => [option.id, optionContent(option)]);
    const previous = oldOptions.map(option => [option.id, optionContent(option)]);
    if (JSON.stringify(current) === JSON.stringify(previous)) return;

    const remap = new Map();
    for (const [id, content] of previous) {
      const matches = current.filter(([, candidate]) => candidate === content);
      const previousMatches = previous.filter(([, candidate]) => candidate === content);
      remap.set(id, matches.length === 1 && previousMatches.length === 1 ? matches[0][0] : null);
    }
    changedOptions.set(oldQuestion.id, remap);
  }

  window.GIFT445_MIGRATE_SAVED_ANSWERS = answers => Object.fromEntries(
    Object.entries(answers).flatMap(([id, answer]) => {
      const changes = changedOptions.get(id);
      const migrated = changes?.has(answer) ? changes.get(answer) : answer;
      return migrated ? [[id, migrated]] : [];
    })
  );

  window.GIFT445_REVIEW_SITE_CONTENT = bank => {
    const reviews = [
      window.GIFT445_AUDIT_MEDICINE_FINAL,
      window.GIFT445_REVIEW_MEDICINE_MID_BATCH,
      window.GIFT445_REVIEW_SURGERY_CONTENT,
      window.GIFT445_REVIEW_COMMUNITY_BATCHES,
      window.GIFT445_REVIEW_RESEARCH_CONTENT,
      window.GIFT445_REVIEW_RADIOLOGY_CONTENT,
      window.GIFT445_ADD_RADIOLOGY_REFERENCES,
      window.GIFT445_ADD_EXISTING_CONCEPT_REFERENCES,
      window.GIFT445_APPLY_CHECKED_REFERENCES
    ];
    const reviewed = reviews.filter(Boolean).reduce((questions, review) => review(questions), bank);
    changedOptions.clear();
    const originals = new Map(bank.map(question => [question.id, question]));
    return reviewed.map(question => {
      const original = originals.get(question.id);
      if (original && (original.options !== question.options || question.medicineMidSourceDisplay || question.surgeryReview?.sourceText)) {
        rememberOldOptions(original, question);
      }
      if (question.subjectId === "informatics" || question.giftReview?.policy !== "gift-key-first") return question;
      const review = question.midterm444Review || question[question.subjectId + "Review"] || question.batchReview;
      const gradingAnswers = question.giftReview.gradingAnswers;
      if (review?.confidence !== "supported" || !review.answers?.length || !gradingAnswers.length
        || review.answers.some(answer => gradingAnswers.includes(answer))) return question;
      return {
        ...question,
        giftReview: {
          ...question.giftReview,
          gradingAnswers: [],
          ungradedReason: "The supported reviewed answer differs from the recorded Gift key."
        }
      };
    });
  };

  window.GIFT445_DISPLAY_REVIEWED_QUESTION = question => {
    if (question.medicineMidSourceDisplay) {
      const { note, ...transcription } = question.medicineMidSourceDisplay;
      return { ...question, ...transcription, reviewedDisplayNote: note };
    }
    if (question.subjectId === "surgery" && window.GIFT445_SURGERY_DISPLAY_QUESTION) {
      return window.GIFT445_SURGERY_DISPLAY_QUESTION(question);
    }
    // The original Word file anchors both pictures in Q41. Q42 describes the mammogram.
    const shiftedMammogram = "question-media/radiology/95711d78c96f5117ff3c350dc4719dda3146a47a229116d3766501b5920c8e18.png";
    if (question.id === "batch-radiology-final-441-q041") {
      return {
        ...question,
        images: question.images.filter(path => path !== shiftedMammogram),
        reviewedDisplayNote: "The next question shows the mammogram that was attached here in the Gift."
      };
    }
    if (question.id === "batch-radiology-final-441-q042") {
      return {
        ...question,
        images: [shiftedMammogram],
        reviewedDisplayNote: "This mammogram was attached to Q41 in the original Gift file."
      };
    }
    return question;
  };
})();
