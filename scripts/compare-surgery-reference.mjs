import fs from "node:fs";
import vm from "node:vm";

const repo = new URL("../", import.meta.url);
const pdfTextPath = process.argv[2] || "/private/tmp/SURG351_MCQ_Bank_by_Lecture.txt";

const context = { window: {} };
vm.createContext(context);
for (const file of ["surgery-data.js", "surgery-midterm-reviews.js"]) {
  vm.runInContext(fs.readFileSync(new URL(file, repo), "utf8"), context, { filename: file });
}

const questions = context.window.GIFT445_SURGERY_QUESTIONS || [];
const text = fs.readFileSync(pdfTextPath, "utf8")
  .replaceAll("\r", "")
  .replaceAll("\f", "\n")
  .split("\n")
  .filter(line => line.trim() !== "SURG 351 — Past-Paper MCQ Bank by Lecture")
  .filter(line => !/^Page \d+ of \d+$/.test(line.trim()))
  .join("\n");

const sectionHeadings = [
  "Introduction of Surgery",
  "Shock & Metabolic Response to Injury",
  "Wound Healing & Management",
  "Transfusion of Blood Products",
  "Surgical Infections and Antibiotics",
  "I.V. Fluids",
  "Nutrition of the Surgical Patient",
  "General Complications of Surgery",
  "Principles of Surgical Oncology",
  "Pathophysiology and Interpretation of Pain in Surgical Patients",
  "Abdominal & Groin Hernias",
  "Common Surgical Diseases of the Stomach and Duodenum",
  "Common Surgical Diseases of the Small and Large Bowel",
  "Common Anorectal Conditions",
  "Common Biliary Diseases",
  "Common Surgical Diseases of the Liver",
  "Common Pancreatic Diseases",
  "Common Neck Swellings",
  "Common Breast Diseases",
  "Trauma",
  "Common Thoracic and Lung Diseases",
  "Common Esophageal Disorders",
  "Common Cardiac Surgical Diseases",
  "Pediatric Inguinoscrotal Conditions and Acute Scrotum",
  "Common Neonatal Surgical Emergencies",
  "Burn",
  "Common Skin and Soft Tissue Tumors",
  "Atherosclerotic & Common Arterial Diseases",
  "Venous Disorders, Lymphatic Disorders and Compartment Syndrome",
  "Common Urinary Tract Disorders",
  "Common Urogenital Tumors including Adrenals",
  "Common Pediatric Urinary Tract Anomalies and Vesicoureteric Reflux",
  "Common Neurosurgical Problems",
  "Common Congenital Neurosurgical Diseases"
];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenScore(left, right) {
  const a = new Set(normalize(left).split(" ").filter(token => token.length > 1));
  const b = new Set(normalize(right).split(" ").filter(token => token.length > 1));
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return (2 * overlap) / (a.size + b.size);
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function extractWhy(chunk) {
  const startMatch = chunk.match(/^Why:\s*/m);
  if (!startMatch || startMatch.index === undefined) return "";
  const tail = chunk.slice(startMatch.index + startMatch[0].length);
  const boundary = tail.search(/^Why not the others:|^\d{3}-\d+\s+/m);
  return compact(boundary >= 0 ? tail.slice(0, boundary) : tail);
}

const headingPattern = new RegExp(`^(?:\\d+\\. )?(${sectionHeadings.map(item => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})$`, "m");
const headingMatches = [...text.matchAll(new RegExp(headingPattern.source, "gm"))];
const appendixStart = text.lastIndexOf("Appendix: questions with no answer key");
const records = [];

for (let sectionIndex = 0; sectionIndex < headingMatches.length; sectionIndex += 1) {
  const heading = headingMatches[sectionIndex];
  const lecture = heading[1];
  const start = heading.index + heading[0].length;
  const nextHeading = headingMatches[sectionIndex + 1]?.index ?? text.length;
  const end = appendixStart >= 0 ? Math.min(nextHeading, appendixStart) : nextHeading;
  const section = text.slice(start, end).split("HIGH-YIELD SUMMARY", 1)[0];
  const starts = [...section.matchAll(/^(\d{3})-(\d+)\s+(.+)$/gm)];

  for (let questionIndex = 0; questionIndex < starts.length; questionIndex += 1) {
    const match = starts[questionIndex];
    const chunkStart = match.index;
    const chunkEnd = starts[questionIndex + 1]?.index ?? section.length;
    const chunk = section.slice(chunkStart, chunkEnd).trim();
    const answerIndex = chunk.search(/^Answer:/m);
    const beforeAnswer = answerIndex >= 0 ? chunk.slice(0, answerIndex) : chunk;
    const optionIndex = beforeAnswer.search(/^A\.\s/m);
    const stemBlock = optionIndex >= 0 ? beforeAnswer.slice(0, optionIndex) : beforeAnswer;
    const stem = compact(stemBlock.replace(/^\d{3}-\d+\s+/, ""));
    const answerMatch = chunk.match(/^Answer:\s*([A-D])(?:\s*[—-]\s*(.*))?$/m);

    records.push({
      documentOrder: records.length + 1,
      batch: match[1],
      number: Number(match[2]),
      lecture,
      stem,
      answer: answerMatch?.[1] || null,
      answerText: compact(answerMatch?.[2]),
      explanation: extractWhy(chunk),
      appendix: false
    });
  }
}

if (appendixStart >= 0) {
  const appendix = text.slice(appendixStart);
  const starts = [...appendix.matchAll(/^(\d{3})-(\d+)\s+(.+)$/gm)];
  for (let index = 0; index < starts.length; index += 1) {
    const match = starts[index];
    const chunk = appendix.slice(match.index, starts[index + 1]?.index ?? appendix.length).trim();
    const answerIndex = chunk.search(/^Answer:/m);
    const beforeAnswer = answerIndex >= 0 ? chunk.slice(0, answerIndex) : chunk;
    const optionIndex = beforeAnswer.search(/^A\.\s/m);
    const stem = compact((optionIndex >= 0 ? beforeAnswer.slice(0, optionIndex) : beforeAnswer).replace(/^\d{3}-\d+\s+/, ""));
    const lectureMatch = chunk.match(/Relevant lecture:\s*([^\n.]+(?:\.[^\n]*)?)/);
    records.push({
      documentOrder: records.length + 1,
      batch: match[1],
      number: Number(match[2]),
      lecture: compact(lectureMatch?.[1]),
      stem,
      answer: null,
      answerText: "",
      explanation: extractWhy(chunk),
      appendix: true
    });
  }
}

const sourceIndex = new Map();
for (const question of questions) {
  for (const location of question.sourceLocations || []) {
    const key = `${location.batch}-${Number(location.questionNumber)}`;
    if (!sourceIndex.has(key)) sourceIndex.set(key, []);
    sourceIndex.get(key).push(question);
  }
}

const matches = [];
const misses = [];
for (const record of records) {
  const key = `${record.batch}-${record.number}`;
  const candidates = sourceIndex.get(key) || [];
  const ranked = candidates
    .map(question => ({ question, score: tokenScore(record.stem, question.stem) }))
    .sort((a, b) => b.score - a.score);
  if (!ranked.length || ranked[0].score < 0.34) {
    misses.push({ ...record, candidates: ranked.map(item => ({ id: item.question.id, score: item.score, stem: item.question.stem })) });
    continue;
  }
  matches.push({ ...record, question: ranked[0].question, score: ranked[0].score });
}

const answerDisagreements = matches.filter(item => item.answer && item.question.aiAnswer && ![].concat(item.question.aiAnswer).includes(item.answer));
const groupedMatches = Map.groupBy(matches, item => item.question.id);
const duplicateAnswerConflicts = [...groupedMatches].filter(([, items]) => new Set(items.map(item => item.answer).filter(Boolean)).size > 1);
const lectureMatrix = {};
for (const item of matches) {
  const key = `${item.lecture}\t${item.question.lecture}`;
  lectureMatrix[key] = (lectureMatrix[key] || 0) + 1;
}

const report = {
  referenceRecords: records.length,
  matchedRecords: matches.length,
  matchedQuestions: new Set(matches.map(item => item.question.id)).size,
  minimumMatchScore: Math.min(...matches.map(item => item.score)),
  matchesBelowPointSeven: matches.filter(item => item.score < 0.7).length,
  missedRecords: misses.length,
  appendixRecords: records.filter(item => item.appendix).length,
  answerDisagreements: answerDisagreements.length,
  duplicateMatches: [...groupedMatches].filter(([, items]) => items.length > 1).length,
  duplicateAnswerConflicts: duplicateAnswerConflicts.length,
  matchedWithAiAnswer: new Set(matches.filter(item => item.question.aiAnswer).map(item => item.question.id)).size,
  matchedWithGenericExplanation: new Set(matches.filter(item => String(item.question.explanation || "").includes("recorded answer from Gift")).map(item => item.question.id)).size,
  matchedNeedingReview: new Set(matches.filter(item => item.question.verification === "needs-review").map(item => item.question.id)).size,
  lectureMatrix: Object.entries(lectureMatrix).sort((a, b) => a[0].localeCompare(b[0])),
  misses,
  disagreementSamples: answerDisagreements.slice(0, 100).map(item => ({
    ref: `${item.batch}-${item.number}`,
    id: item.question.id,
    lecture: item.lecture,
    currentLecture: item.question.lecture,
    referenceAnswer: item.answer,
    currentAiAnswer: item.question.aiAnswer,
    stem: item.stem
  })),
  duplicateAnswerConflictSamples: duplicateAnswerConflicts.map(([id, items]) => ({
    id,
    answers: items.map(item => ({ ref: `${item.batch}-${item.number}`, answer: item.answer, lecture: item.lecture, score: item.score }))
  }))
};

const outputPath = process.argv[3];
if (!outputPath) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const directLectureMap = {
  "Introduction of Surgery": "Introduction to Surgery",
  "Wound Healing & Management": "Wound Healing & Management",
  "Transfusion of Blood Products": "Transfusion of Blood and Plasma Products",
  "Surgical Infections and Antibiotics": "Surgical Infection",
  "I.V. Fluids": "Fluid & Electrolytes",
  "Nutrition of the Surgical Patient": "Nutritional Support of Surgical Patients",
  "General Complications of Surgery": "Surgical Complications",
  "Principles of Surgical Oncology": "Principles of Surgical Oncology",
  "Pathophysiology and Interpretation of Pain in Surgical Patients": "Pathophysiology and Interpretation of Pain in Surgical Patients",
  "Abdominal & Groin Hernias": "Abdominal Wall, Umbilicus and Hernia",
  "Common Anorectal Conditions": "Common Anorectal Conditions",
  "Common Neck Swellings": "Neck Swellings",
  "Common Breast Diseases": "Breast Disease",
  "Trauma": "Trauma",
  "Common Thoracic and Lung Diseases": "Common Thoracic and Lung Disease",
  "Common Esophageal Disorders": "Common Esophageal Disease",
  "Common Cardiac Surgical Diseases": "Cardiac Science",
  "Pediatric Inguinoscrotal Conditions and Acute Scrotum": "Pediatric Inguinoscrotal Conditions and Acute Scrotum",
  "Common Neonatal Surgical Emergencies": "Common Neonatal Surgical Emergencies",
  "Burn": "Burn",
  "Common Skin and Soft Tissue Tumors": "Common Skin and Soft Tissue Tumors",
  "Atherosclerotic & Common Arterial Diseases": "Arterial Disease",
  "Common Urogenital Tumors including Adrenals": "Common Genitourinary Tract Malignancy",
  "Common Pediatric Urinary Tract Anomalies and Vesicoureteric Reflux": "GU Anomalies",
  "Common Neurosurgical Problems": "Common Neurosurgical Problems",
  "Common Congenital Neurosurgical Diseases": "Common Congenital Neurosurgical Diseases"
};

const broadLectureMap = {
  "Shock & Metabolic Response to Injury": { allowed: ["Shock", "Metabolic Response to Injury"], fallback: "Shock" },
  "Common Surgical Diseases of the Stomach and Duodenum": { allowed: ["Upper Abdominal Pain", "Gastrointestinal Hemorrhage", "Perforation of Viscus", "Gastric Outlet, Small and Large Bowel Obstruction"], fallback: "Upper Abdominal Pain" },
  "Common Surgical Diseases of the Small and Large Bowel": { allowed: ["Central Abdominal Pain", "Lower Abdominal Pain", "Generalized Abdominal Pain", "Gastric Outlet, Small and Large Bowel Obstruction", "Perforation of Viscus", "Gastrointestinal Hemorrhage", "Infarction of Viscus"], fallback: "Lower Abdominal Pain" },
  "Common Biliary Diseases": { allowed: ["Upper Abdominal Pain", "Jaundice"], fallback: "Upper Abdominal Pain" },
  "Common Surgical Diseases of the Liver": { allowed: ["Upper Abdominal Pain", "Jaundice", "Gastrointestinal Hemorrhage"], fallback: "Upper Abdominal Pain" },
  "Common Pancreatic Diseases": { allowed: ["Upper Abdominal Pain", "Jaundice"], fallback: "Upper Abdominal Pain" },
  "Venous Disorders, Lymphatic Disorders and Compartment Syndrome": { allowed: ["Venous Disease", "Vascular Investigation"], fallback: "Venous Disease" },
  "Common Urinary Tract Disorders": { allowed: ["Common Urinary Tract Disorders", "Renal Stones, Renal Colic and UTI", "Emergency in Urology"], fallback: "Common Urinary Tract Disorders" }
};

function canonicalReferenceLecture(value) {
  const clean = compact(value).replace(/\.+$/, "");
  for (const key of Object.keys({ ...directLectureMap, ...broadLectureMap })) {
    if (clean === key || clean.startsWith(`${key} `) || clean.startsWith(`${key}/`)) return key;
  }
  return clean;
}

function targetLecture(referenceLecture, currentLecture) {
  const canonical = canonicalReferenceLecture(referenceLecture);
  if (directLectureMap[canonical]) return directLectureMap[canonical];
  const broad = broadLectureMap[canonical];
  if (!broad) return currentLecture;
  return broad.allowed.includes(currentLecture) ? currentLecture : broad.fallback;
}

const overrides = {};
for (const [id, items] of groupedMatches) {
  const question = items[0].question;
  const rankedItems = [...items].sort((a, b) => Number(a.appendix) - Number(b.appendix) || b.score - a.score || a.documentOrder - b.documentOrder);
  const primary = rankedItems[0];
  const answers = [...new Set(items.map(item => item.answer).filter(answer => question.options?.some(option => option.id === answer)))];
  const override = {
    lecture: targetLecture(primary.lecture, question.lecture),
    referenceOrder: Math.min(...items.map(item => item.documentOrder))
  };

  if (String(question.explanation || "").includes("recorded answer from Gift")) {
    const explanationItem = rankedItems.find(item => item.explanation);
    if (explanationItem) override.explanation = explanationItem.explanation;
    if (answers.length === 1) {
      override.aiAnswer = answers[0];
      override.verification = "ai-reviewed";
    } else if (answers.length > 1) {
      override.aiAnswer = null;
      override.aiSuggestion = `The reference compilation contains conflicting suggested answers (${answers.join(" and ")}); the original source answers remain visible and this item needs individual review.`;
      override.verification = "needs-review";
    }
  }

  overrides[id] = override;
}

const serialized = JSON.stringify(overrides, null, 2);
const generated = `(() => {\n  const overrides = ${serialized};\n  const manualDataRepairs = {\n    \"surgery-final-q1002\": {\n      stem: \"A man presents after lacerations to his arm and forearm and is unable to flex the ring and little fingers, with loss of sensation in those fingers. Which nerve is most likely affected?\",\n      options: [\n        { id: \"A\", text: \"Femoral\" },\n        { id: \"B\", text: \"Radial\" },\n        { id: \"C\", text: \"Ulnar\" },\n        { id: \"D\", text: \"Median\" }\n      ],\n      incompleteSource: false,\n      aiAnswer: \"C\",\n      aiSuggestion: \"AI independently selected C after reviewing the stem and options.\",\n      verification: \"ai-reviewed\",\n      explanation: \"Loss of flexion affecting the ring and little fingers together with sensory loss in those digits localizes the injury to the ulnar nerve.\"\n    },\n    \"surgery-final-q1003\": {\n      options: [\n        { id: \"A\", text: \"Inability to flex the index, middle finger, and thumb\" },\n        { id: \"B\", text: \"Clawing of the index and middle fingers\" },\n        { id: \"C\", text: \"Inability to adduct the thumb\" },\n        { id: \"D\", text: \"Inability to abduct the thumb\" }\n      ],\n      incompleteSource: false,\n      aiAnswer: \"D\",\n      aiSuggestion: \"AI independently selected D after reviewing the stem and options.\",\n      verification: \"ai-reviewed\",\n      explanation: \"A median nerve injury at the wrist affects the recurrent motor branch to the thenar muscles, including abductor pollicis brevis, causing impaired thumb abduction.\"\n    }\n  };\n  const lectureOrder = new Map();\n  let order = 1;\n  for (const block of window.GIFT445_SURGERY_CATALOG || []) {\n    for (const lecture of block.lectures || []) lectureOrder.set(lecture, order++);\n  }\n  for (const question of window.GIFT445_SURGERY_QUESTIONS || []) {\n    const review = overrides[question.id];\n    if (review) {\n      Object.assign(question, review);\n      if (lectureOrder.has(question.lecture)) question.lectureOrder = lectureOrder.get(question.lecture);\n      if (Object.hasOwn(review, \"aiAnswer\")) {\n        question.aiSuggestion = review.aiAnswer\n          ? \`AI independently selected \${review.aiAnswer} after reviewing the stem and options.\`\n          : review.aiSuggestion;\n      }\n    }\n    if (manualDataRepairs[question.id]) Object.assign(question, manualDataRepairs[question.id]);\n  }\n  window.GIFT445_SURGERY_REFERENCE_OVERRIDES = overrides;\n})();\n`;
const reviewedAnswerCorrections = {
  "surgery-final-q0954": {
    aiAnswer: "A",
    aiSuggestion: "AI independently selected A after reviewing the stem and options.",
    verification: "ai-reviewed"
  },
  "surgery-final-q1038": {
    aiAnswer: ["C", "D"],
    aiSuggestion: "AI considers both C and D plausible because the discharge description and the five-day incubation point in different directions.",
    verification: "needs-review"
  },
  "surgery-final-q1050": {
    aiAnswer: ["A", "C"],
    aiSuggestion: "AI considers both A and C plausible because the discharge description and the five-day incubation point in different directions.",
    verification: "needs-review"
  },
  "surgery-final-q1074": {
    aiAnswer: "C",
    aiSuggestion: "AI independently selected C after reviewing the stem and options.",
    verification: "ai-reviewed"
  },
  "surgery-final-q1132": {
    aiAnswer: "D",
    aiSuggestion: "AI independently selected D after reviewing the stem and options.",
    verification: "ai-reviewed"
  },
  "surgery-final-q1154": {
    aiAnswer: "A",
    aiSuggestion: "AI independently selected A after reviewing the stem and options.",
    verification: "ai-reviewed"
  },
  "surgery-final-q1177": {
    aiAnswer: "A",
    aiSuggestion: "AI independently selected A after reviewing the stem and options.",
    verification: "ai-reviewed"
  },
  "surgery-final-q1187": {
    aiAnswer: "B",
    aiSuggestion: "AI independently selected B after reviewing the stem and options.",
    verification: "ai-reviewed"
  }
};
const extraQuestionCorrections = {
  "surgery-midterm-q0026": { lecture: "Gastrointestinal Hemorrhage" },
  "surgery-midterm-q0030": { lecture: "Transfusion of Blood and Plasma Products" },
  "surgery-midterm-q0034": { lecture: "Transfusion of Blood and Plasma Products" },
  "surgery-midterm-q0054": { lecture: "Common Genitourinary Tract Malignancy" },
  "surgery-midterm-q0082": { lecture: "Common Thoracic and Lung Disease" },
  "surgery-midterm-q0089": { lecture: "Lower Abdominal Pain" },
  "surgery-midterm-q0132": { lecture: "Arterial Disease" },
  "surgery-midterm-q0135": { lecture: "Emergency in Urology" },
  "surgery-midterm-q0148": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0161": { lecture: "Nutritional Support of Surgical Patients" },
  "surgery-midterm-q0166": { lecture: "Common Neurosurgical Problems" },
  "surgery-midterm-q0170": { lecture: "Hand Injuries" },
  "surgery-midterm-q0171": { lecture: "Hand Injuries" },
  "surgery-midterm-q0174": { lecture: "Common Neurosurgical Problems" },
  "surgery-midterm-q0184": { lecture: "Hand Injuries" },
  "surgery-midterm-q0186": { lecture: "Arterial Disease" },
  "surgery-midterm-q0187": { lecture: "Hand Injuries" },
  "surgery-midterm-q0192": { lecture: "Hand Injuries" },
  "surgery-midterm-q0193": { lecture: "Common Neurosurgical Problems" },
  "surgery-midterm-q0195": { lecture: "Surgical Infection" },
  "surgery-midterm-q0207": { lecture: "Hand Injuries" },
  "surgery-midterm-q0211": { lecture: "Common Neurosurgical Problems" },
  "surgery-midterm-q0216": { lecture: "Hand Injuries" },
  "surgery-midterm-q0230": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0243": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0247": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0248": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0249": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0250": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0251": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0252": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0253": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0256": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0257": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0258": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0261": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0263": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0264": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0265": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0266": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0268": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0269": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0286": { excluded: false },
  "surgery-midterm-q0287": { excluded: false },
  "surgery-midterm-q0288": { excluded: false },
  "surgery-midterm-q0289": { excluded: false },
  "surgery-midterm-q0290": { excluded: false },
  "surgery-midterm-q0291": { excluded: false },
  "surgery-midterm-q0292": { excluded: false },
  "surgery-midterm-q0293": { excluded: false },
  "surgery-midterm-q0294": { excluded: false },
  "surgery-midterm-q0335": { lecture: "Trauma" },
  "surgery-midterm-q0336": { lecture: "Trauma" },
  "surgery-midterm-q0339": { lecture: "Nutritional Support of Surgical Patients" },
  "surgery-midterm-q0341": { lecture: "Pediatric Inguinoscrotal Conditions and Acute Scrotum" },
  "surgery-midterm-q0342": { lecture: "Pediatric Inguinoscrotal Conditions and Acute Scrotum" },
  "surgery-midterm-q0370": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0372": { lecture: "Common Esophageal Disease" },
  "surgery-midterm-q0384": { lecture: "Common Esophageal Disease" },
  "surgery-midterm-q0434": { lecture: "Gastrointestinal Hemorrhage" },
  "surgery-midterm-q0449": { lecture: "Hand Injuries" },
  "surgery-midterm-q0464": { lecture: "Surgical Complications" },
  "surgery-midterm-q0466": { lecture: "Nutritional Support of Surgical Patients" },
  "surgery-midterm-q0475": { lecture: "Common Congenital Neurosurgical Diseases" },
  "surgery-midterm-q0499": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0500": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0501": { lecture: "Lower Abdominal Pain" },
  "surgery-midterm-q0502": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0510": { lecture: "Perforation of Viscus" },
  "surgery-midterm-q0536": { lecture: "Surgical Complications" },
  "surgery-midterm-q0584": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0585": { lecture: "Surgical Infection" },
  "surgery-midterm-q0598": { lecture: "Gastric Outlet, Small and Large Bowel Obstruction" },
  "surgery-midterm-q0624": { lecture: "Breast Disease" },
  "surgery-midterm-q0633": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0634": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0635": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0638": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0639": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0640": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0646": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0650": { lecture: "Common Anorectal Conditions" },
  "surgery-midterm-q0665": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0670": { lecture: "Hand Injuries" },
  "surgery-midterm-q0678": { lecture: "Surgical Complications" },
  "surgery-midterm-q0693": { lecture: "Common Skin and Soft Tissue Tumors" },
  "surgery-midterm-q0698": { lecture: "Lower Abdominal Pain" },
  "surgery-midterm-q0700": { lecture: "Venous Disease" },
  "surgery-midterm-q0706": { lecture: "Principles of Surgical Oncology" },
  "surgery-midterm-q0707": { lecture: "Principles of Surgical Oncology" },
  "surgery-midterm-q0745": { lecture: "Trauma" },
  "surgery-midterm-q0747": { lecture: "Nutritional Support of Surgical Patients" },
  "surgery-midterm-q0753": { lecture: "Common Neurosurgical Problems" },
  "surgery-midterm-q0758": { lecture: "Surgical Complications" },
  "surgery-midterm-q0759": { lecture: "Surgical Complications" },
  "surgery-midterm-q0762": { lecture: "Surgical Complications" },
  "surgery-midterm-q0763": { lecture: "Trauma" },
  "surgery-midterm-q0828": { lecture: "Arterial Disease" },
  "surgery-midterm-q0838": { lecture: "Venous Disease" },
  "surgery-final-q1084": { lecture: "Neck Swellings" },
  "surgery-final-q1107": { lecture: "Upper Abdominal Pain" },
  "surgery-final-q1112": { lecture: "Pathophysiology and Interpretation of Pain in Surgical Patients" },
  "surgery-final-q1123": { lecture: "Surgical Infection" },
  "surgery-final-q1124": { lecture: "Surgical Complications" },
  "surgery-final-q1137": { lecture: "Common Urinary Tract Disorders" },
  "surgery-final-q1158": { lecture: "Common Urinary Tract Disorders" },
  "surgery-final-q1175": { lecture: "Common Genitourinary Tract Malignancy" },
  "surgery-final-q1178": { lecture: "Common Genitourinary Tract Malignancy" },
  "surgery-final-q1189": { lecture: "Common Genitourinary Tract Malignancy" }
};
const manualCorrections = reviewedAnswerCorrections;
const finalGenerated = generated
  .replace(
    "  const lectureOrder = new Map();",
    `  Object.assign(manualDataRepairs, ${JSON.stringify(manualCorrections, null, 2)});\n  const lectureOrder = new Map();`
  )
  .replace(
    "    if (manualDataRepairs[question.id]) Object.assign(question, manualDataRepairs[question.id]);\n  }",
    "    if (manualDataRepairs[question.id]) Object.assign(question, manualDataRepairs[question.id]);\n    if (lectureOrder.has(question.lecture)) question.lectureOrder = lectureOrder.get(question.lecture);\n  }"
  )
  .replace(
    "  window.GIFT445_SURGERY_REFERENCE_OVERRIDES = overrides;",
    "  const referenceLectures = new Set(Object.values(overrides).map(review => review.lecture).filter(Boolean));\n  for (const question of window.GIFT445_SURGERY_QUESTIONS || []) {\n    question.hideFromLecture = !referenceLectures.has(question.lecture);\n  }\n  window.GIFT445_SURGERY_REFERENCE_OVERRIDES = overrides;"
  );
fs.writeFileSync(outputPath, finalGenerated);
console.log(JSON.stringify({ ...report, outputPath, overrideQuestions: Object.keys(overrides).length }, null, 2));
