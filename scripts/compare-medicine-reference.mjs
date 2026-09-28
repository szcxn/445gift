import fs from "node:fs";
import vm from "node:vm";

const repo = new URL("../", import.meta.url);
const pdfTextPath = process.argv[2] || "/private/tmp/Internal_Medicine_MCQs_by_Lecture.txt";

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("medicine-data.js", repo), "utf8"), context, { filename: "medicine-data.js" });

const questions = context.window.GIFT445_QUESTIONS || [];
const text = fs.readFileSync(pdfTextPath, "utf8").replaceAll("\r", "");

const sectionHeadings = [
  "Arrhythmias",
  "Acute Coronary Syndrome",
  "Heart Failure",
  "Rheumatic Heart Disease",
  "Heart Failure - Prognosis & Management",
  "Infective Endocarditis",
  "Valvular Heart Diseases",
  "Chronic Obstructive Lung Disease and Bronchiectasis",
  "Community Acquired Pneumonia",
  "Bronchial Asthma",
  "Pulmonary Embolism",
  "Investigation of Lung Diseases",
  "Pleural Effusion",
  "Diabetic Nephropathy",
  "Hypertension",
  "Acid Base Disorders",
  "Electrolyte Imbalance I (Sodium & Water)",
  "Chronic Kidney Failure",
  "Acute Kidney Injury (AKI)",
  "Glomerular Diseases",
  "Electrolyte Imbalance II (Potassium & Calcium)",
  "Liver Cirrhosis & Complications",
  "Abdominal Pain including IBS",
  "Chronic Diarrhea including Celiac Disease",
  "Gastrointestinal Bleeding",
  "Esophageal Diseases",
  "Non-Alcoholic Fatty Liver",
  "Abnormal Liver Enzymes with Selected Common Liver Diseases",
  "Inflammatory Bowel Disease",
  "Additional Topics Not on the Lecture List"
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function stripLayoutNoise(value) {
  return value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && line !== "Internal Medicine — Past-Paper MCQ Bank by Lecture")
    .filter(line => !/^Page \d+$/.test(line))
    .join(" ");
}

function findActualHeading(heading, startAt) {
  const base = heading === "Diabetic Nephropathy" || heading === "Inflammatory Bowel Disease"
    ? `${escapeRegExp(heading)}(?:\\s+\\([^\\n]*\\))?`
    : escapeRegExp(heading);
  const pattern = new RegExp(`^\\s*${base}\\s*$`, "gm");
  pattern.lastIndex = startAt;
  for (const match of text.matchAll(pattern)) {
    if (match.index < startAt) continue;
    const following = text.slice(match.index + match[0].length, match.index + match[0].length + 1200);
    if (/\d+\s+unique questions/.test(following)) return match;
  }
  return null;
}

const firstContentPage = text.indexOf("Page 4");
let cursor = firstContentPage >= 0 ? firstContentPage : 0;
const headingMatches = [];
for (const heading of sectionHeadings) {
  const match = findActualHeading(heading, cursor);
  if (!match) throw new Error(`Could not find the question section for: ${heading}`);
  headingMatches.push({ heading, index: match.index, length: match[0].length });
  cursor = match.index + match[0].length;
}

const records = [];
for (let sectionIndex = 0; sectionIndex < headingMatches.length; sectionIndex += 1) {
  const heading = headingMatches[sectionIndex];
  const end = headingMatches[sectionIndex + 1]?.index ?? text.length;
  const section = text.slice(heading.index + heading.length, end).split(/HIGH-YIELD SUMMARY/, 1)[0];
  const starts = [...section.matchAll(/^\s*Q(\d+)\.\s+\[([^\]]+)\](?:[^\n]*)$/gm)];

  for (let questionIndex = 0; questionIndex < starts.length; questionIndex += 1) {
    const start = starts[questionIndex];
    const chunk = section.slice(start.index, starts[questionIndex + 1]?.index ?? section.length);
    const answerIndex = chunk.search(/^\s*Answer:/m);
    const questionBody = answerIndex >= 0 ? chunk.slice(0, answerIndex) : chunk;
    const optionStart = questionBody.search(/^\s*A\.\s+/m);
    const stemBlock = optionStart >= 0 ? questionBody.slice(0, optionStart) : questionBody;
    let stem = stripLayoutNoise(stemBlock.replace(/^\s*Q\d+\.\s+\[[^\]]+\](?:[^\n]*)$/m, ""));
    const options = [];
    if (optionStart >= 0) {
      const optionBlock = questionBody.slice(optionStart);
      const optionMatches = [...optionBlock.matchAll(/^\s*([A-D])\.\s+(.+)$/gm)];
      for (let optionIndex = 0; optionIndex < optionMatches.length; optionIndex += 1) {
        const option = optionMatches[optionIndex];
        const optionEnd = optionMatches[optionIndex + 1]?.index ?? optionBlock.length;
        options.push({ id: option[1], text: stripLayoutNoise(optionBlock.slice(option.index + option[0].indexOf(option[2]), optionEnd)) });
      }
    }
    if (!stem && options[0]?.id === "A" && /\?$/.test(options[0].text)) {
      stem = options.shift().text;
    }

    records.push({
      documentOrder: records.length + 1,
      lecture: heading.heading,
      lectureQuestion: Number(start[1]),
      batches: [...start[2].matchAll(/\d{3}/g)].map(match => match[0]),
      stem,
      options
    });
  }
}

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "being", "by", "for", "from", "had", "has", "have", "he",
  "her", "his", "in", "is", "it", "most", "of", "on", "one", "patient", "she", "that", "the", "their", "this", "to",
  "was", "were", "what", "which", "who", "with", "would", "year", "years", "old", "following"
]);

function normalizeToken(token) {
  const aliases = {
    haemoglobin: "hemoglobin", haematuria: "hematuria", oedema: "edema", oesophageal: "esophageal",
    organisation: "organization", tumour: "tumor", fibre: "fiber", centre: "center"
  };
  let value = aliases[token] || token;
  if (value.length > 5 && value.endsWith("ies")) value = `${value.slice(0, -3)}y`;
  else if (value.length > 5 && value.endsWith("ing")) value = value.slice(0, -3);
  else if (value.length > 4 && value.endsWith("ed")) value = value.slice(0, -2);
  else if (value.length > 4 && value.endsWith("s")) value = value.slice(0, -1);
  return value;
}

function tokens(value) {
  return compact(value)
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(token => token.length > 1 && !stopWords.has(token))
    .map(normalizeToken);
}

function tokenScore(left, right) {
  const a = new Set(tokens(left));
  const b = new Set(tokens(right));
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return (2 * overlap) / (a.size + b.size);
}

function optionText(options) {
  return (options || []).map(option => option.text).join(" ");
}

function candidateScore(record, question) {
  const stem = tokenScore(record.stem, question.stem);
  const options = tokenScore(optionText(record.options), optionText(question.options));
  return (0.78 * stem) + (0.22 * options);
}

const matches = [];
const misses = [];
for (const record of records) {
  const batchSet = new Set(record.batches);
  const candidates = questions.filter(question => question.assessment === "Midterm"
    && (question.sourceLocations || []).some(location => batchSet.has(String(location.batch))));
  const ranked = candidates
    .map(question => ({ question, score: candidateScore(record, question) }))
    .sort((a, b) => b.score - a.score);
  if (!ranked.length || ranked[0].score < 0.35) {
    misses.push({ ...record, candidates: ranked.slice(0, 5).map(item => ({ id: item.question.id, score: item.score, stem: item.question.stem })) });
    continue;
  }
  matches.push({ ...record, question: ranked[0].question, score: ranked[0].score, runnerUpScore: ranked[1]?.score ?? 0 });
}

const groupedMatches = Map.groupBy(matches, item => item.question.id);
const lectureMatrix = {};
for (const item of matches) {
  const key = `${item.lecture}\t${item.question.cycle || "(none)"}\t${item.question.lecture || "(none)"}`;
  lectureMatrix[key] = (lectureMatrix[key] || 0) + 1;
}
const report = {
  referenceQuestions: records.length,
  matchedRecords: matches.length,
  matchedQuestions: groupedMatches.size,
  missedRecords: misses.length,
  duplicateSiteMatches: [...groupedMatches].filter(([, items]) => items.length > 1).length,
  minimumMatchScore: Math.min(...matches.map(item => item.score)),
  belowPointSeven: matches.filter(item => item.score < 0.7).length,
  narrowMargins: matches.filter(item => item.score - item.runnerUpScore < 0.08).length,
  sectionCounts: Object.fromEntries(sectionHeadings.map(heading => [heading, records.filter(record => record.lecture === heading).length])),
  lectureMatrix: Object.entries(lectureMatrix).sort((a, b) => a[0].localeCompare(b[0])),
  misses,
  lowConfidence: matches
    .filter(item => item.score < 0.7 || item.score - item.runnerUpScore < 0.08)
    .map(item => ({
      lecture: item.lecture,
      lectureQuestion: item.lectureQuestion,
      batches: item.batches,
      id: item.question.id,
      score: item.score,
      margin: item.score - item.runnerUpScore,
      referenceStem: item.stem,
      siteStem: item.question.stem
    }))
};

const outputPath = process.argv[3];
if (!outputPath) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const directLectureMap = {
  "Arrhythmias": { cycle: "Cardiology", lecture: "Arrhythmias" },
  "Acute Coronary Syndrome": { cycle: "Cardiology", lecture: "Acute Coronary Syndromes" },
  "Heart Failure": { cycle: "Cardiology", lecture: "Heart Failure — Pathophysiology and Diagnosis" },
  "Rheumatic Heart Disease": { cycle: "Cardiology", lecture: "Rheumatic Fever and Rheumatic Heart Disease" },
  "Heart Failure - Prognosis & Management": { cycle: "Cardiology", lecture: "Heart Failure — Prognosis and Management" },
  "Infective Endocarditis": { cycle: "Cardiology", lecture: "Infective Endocarditis" },
  "Valvular Heart Diseases": { cycle: "Cardiology", lecture: "Valvular Heart Disease" },
  "Chronic Obstructive Lung Disease and Bronchiectasis": { cycle: "Pulmonology", lecture: "COPD and Bronchiectasis" },
  "Community Acquired Pneumonia": { cycle: "Pulmonology", lecture: "Community-Acquired Pneumonia" },
  "Bronchial Asthma": { cycle: "Pulmonology", lecture: "Asthma" },
  "Pulmonary Embolism": { cycle: "Pulmonology", lecture: "Pulmonary Embolism" },
  "Investigation of Lung Diseases": { cycle: "Pulmonology", lecture: "Investigations of Lung Disease" },
  "Pleural Effusion": { cycle: "Pulmonology", lecture: "Pleural Effusion" },
  "Hypertension": { cycle: "Nephrology", lecture: "Hypertension" },
  "Acid Base Disorders": { cycle: "Nephrology", lecture: "Acid–Base Disorders" },
  "Electrolyte Imbalance I (Sodium & Water)": { cycle: "Nephrology", lecture: "Sodium Disorders" },
  "Chronic Kidney Failure": { cycle: "Nephrology", lecture: "Chronic Kidney Disease" },
  "Acute Kidney Injury (AKI)": { cycle: "Nephrology", lecture: "Acute Kidney Injury" },
  "Glomerular Diseases": { cycle: "Nephrology", lecture: "Glomerular Diseases" },
  "Electrolyte Imbalance II (Potassium & Calcium)": { cycle: "Nephrology", lecture: "Potassium and Calcium Disorders" },
  "Liver Cirrhosis & Complications": { cycle: "Gastroenterology", lecture: "Liver Cirrhosis and Complications" },
  "Abdominal Pain including IBS": { cycle: "Gastroenterology", lecture: "Abdominal Pain Including IBS" },
  "Chronic Diarrhea including Celiac Disease": { cycle: "Gastroenterology", lecture: "Chronic Diarrhea Including Celiac Disease" },
  "Gastrointestinal Bleeding": { cycle: "Gastroenterology", lecture: "Gastrointestinal Bleeding" },
  "Esophageal Diseases": { cycle: "Gastroenterology", lecture: "Esophageal Diseases" },
  "Non-Alcoholic Fatty Liver": { cycle: "Gastroenterology", lecture: "Non-Alcoholic Fatty Liver" },
  "Abnormal Liver Enzymes with Selected Common Liver Diseases": { cycle: "Gastroenterology", lecture: "Abnormal Liver Enzymes with Selected Common Liver Diseases" }
};

const overrides = {};
let lectureChanges = 0;
let cycleChanges = 0;
for (const item of matches) {
  const target = directLectureMap[item.lecture] || { cycle: item.question.cycle, lecture: item.question.lecture };
  if (target.lecture !== item.question.lecture) lectureChanges += 1;
  if (target.cycle !== item.question.cycle) cycleChanges += 1;
  overrides[item.question.id] = {
    cycle: target.cycle,
    lecture: target.lecture,
    referenceOrder: item.documentOrder,
    referenceLecture: item.lecture
  };
}

const generated = `(() => {\n  const overrides = ${JSON.stringify(overrides, null, 2)};\n  const lectureOrder = new Map();\n  for (const question of window.GIFT445_QUESTIONS || []) {\n    if (!question.cycle || !question.lecture || !Number.isInteger(question.lectureOrder)) continue;\n    const key = \`${"${question.cycle}"}|${"${question.lecture}"}\`;\n    lectureOrder.set(key, Math.min(lectureOrder.get(key) ?? Infinity, question.lectureOrder));\n  }\n  for (const question of window.GIFT445_QUESTIONS || []) {\n    const review = overrides[question.id];\n    if (!review) continue;\n    Object.assign(question, review);\n    const key = \`${"${question.cycle}"}|${"${question.lecture}"}\`;\n    if (lectureOrder.has(key)) question.lectureOrder = lectureOrder.get(key);\n  }\n  window.GIFT445_MEDICINE_REFERENCE_OVERRIDES = overrides;\n})();\n`;

fs.writeFileSync(outputPath, generated);
console.log(JSON.stringify({
  ...report,
  outputPath,
  overrideQuestions: Object.keys(overrides).length,
  lectureChanges,
  cycleChanges
}, null, 2));
