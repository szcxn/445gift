(() => {
  const reproductionReference = {
    title: "United Nations Statistics Division · Gross and Net Reproduction Rates",
    url: "https://unstats.un.org/unsd/Demographic/products/dyb/DYBNat/NotesNatStatTab03.htm"
  };
  const abdominalWallReference = {
    title: "Gray et al. · Abdominal Wall Tenderness and Carnett’s Sign",
    url: "https://pubmed.ncbi.nlm.nih.gov/1826626/"
  };
  const coughReference = {
    title: "CHEST · Adult Cough Classification and Management Algorithms",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6689094/"
  };
  const references = new Map([
    ["medicine-midterm-439-nephrology-q056", abdominalWallReference],
    ["batch-medicine-midterm-439-p2020-q56", abdominalWallReference],
    ["batch-medicine-midterm-431-p5338-q48", coughReference],
    ["batch-medicine-final-431-p5822-q34", coughReference],
    ["batch-medicine-midterm-438-p2222-q20", {
      title: "ATS, CDC and IDSA · Diagnosis of Tuberculosis in Adults and Children",
      url: "https://www.idsociety.org/practice-guideline/diagnosis-of-tb-in-adults-and-children/"
    }],
    ["batch-medicine-midterm-430-p5475-q16", {
      title: "KMBARC Registry · Clinical Characteristics of Post-Tuberculosis Bronchiectasis",
      url: "https://pubmed.ncbi.nlm.nih.gov/34640560/"
    }],
    ["community-mid-global-demography-concepts-and-popul-bfc5c50c", reproductionReference],
    ["community-mid-global-demography-concepts-and-popul-97ac15e0", reproductionReference],
    ["community-mid-prevention-and-control-of-infectious-14b09e55", {
      title: "CDC · How Infections Spread",
      url: "https://www.cdc.gov/children-and-school-preparedness/infection-prevention/appendix-a.html"
    }],
    ["community-mid-surveillance-and-screening-510d4ac0", {
      title: "CDC · Surveillance of Notifiable Infectious and Noninfectious Conditions",
      url: "https://www.cdc.gov/nndss/noninfectious-disease/about-data.html"
    }],
    ["research-midterm-435-q011", {
      title: "CDC ACIP GRADE Handbook · Defining the Population in a PICO Question",
      url: "https://www.cdc.gov/acip-grade-handbook/hcp/chapter-4-formulating-pico-questions/index.html"
    }],
    ["research-midterm-435-q038", {
      title: "Johns Hopkins Institutional Review Board · Deception and Incomplete Disclosure in Research",
      url: "https://www.hopkinsmedicine.org/institutional-review-board/guidelines-policies/guidelines/use-of-deception-and-incomplete-disclosure--in-research"
    }]
  ]);

  window.GIFT445_ADD_EXISTING_CONCEPT_REFERENCES = bank => bank.map(question => {
    const reference = references.get(question.id);
    if (!reference) return question;
    const reviewField = question.subjectId + "Review";
    const review = question[reviewField];
    if (!review || review.references?.some(item => item.url === reference.url)) return question;

    return {
      ...question,
      [reviewField]: { ...review, references: [...(review.references || []), reference] }
    };
  });
})();
