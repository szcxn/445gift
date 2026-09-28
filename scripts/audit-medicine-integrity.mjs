import fs from "node:fs";
import vm from "node:vm";

const repo = new URL("../", import.meta.url);
const sourcePaths = {
  Midterm: process.argv[2] || "/private/tmp/medicine-audit/mid.txt",
  Final: process.argv[3] || "/private/tmp/medicine-audit/final.txt"
};

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("medicine-data.js", repo), "utf8"), context, { filename: "medicine-data.js" });
vm.runInContext(fs.readFileSync(new URL("medicine-reference-overrides.js", repo), "utf8"), context, { filename: "medicine-reference-overrides.js" });
const questions = context.window.GIFT445_QUESTIONS || [];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9%+./-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return new Set(normalize(value).split(" ").filter(token => token.length > 1));
}

function similarity(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return (2 * overlap) / (a.size + b.size);
}

function questionLocations(question) {
  return (question.sourceLocations || []).map(location => ({
    assessment: location.assessment || question.assessment,
    batch: String(location.batch || question.sourceBatch),
    questionNumber: Number(location.questionNumber)
  }));
}

function sourceAnswerIncludes(question, optionId) {
  const answers = Array.isArray(question.sourceAnswer) ? question.sourceAnswer : [question.sourceAnswer];
  return answers.filter(Boolean).includes(optionId);
}

function parseSource(assessment, text) {
  const batches = assessment === "Midterm"
    ? ["443", "442", "441", "439", "438", "437", "436", "435", "434", "433", "432", "431", "430"]
    : ["443", "442", "441", "439", "438", "437", "436", "435", "434", "433", "432", "431", "429"];
  const firstQuestionIndex = text.search(/^\s*Q\s*1\s*[:)-]/mi);
  const headings = [];
  let cursor = Math.max(0, firstQuestionIndex - 2000);
  for (const batch of batches) {
    const pattern = new RegExp(`^\\s*${batch}\\s*$`, "gm");
    pattern.lastIndex = cursor;
    const match = pattern.exec(text);
    if (!match) throw new Error(`Could not locate ${assessment} batch ${batch}`);
    headings.push({ batch, index: match.index, length: match[0].length });
    cursor = match.index + match[0].length;
  }

  const records = new Map();
  const explicitKeys = [];
  const allMarkerKeys = [];
  const boundaries = [];
  for (let batchIndex = 0; batchIndex < headings.length; batchIndex += 1) {
    const heading = headings[batchIndex];
    const end = headings[batchIndex + 1]?.index ?? text.length;
    const chunk = text.slice(heading.index + heading.length, end);
    for (const match of chunk.matchAll(/^\s*Q\s*(\d{1,3})\s*(?::|-|\))/gmi)) {
      explicitKeys.push(`${assessment}|${heading.batch}|${Number(match[1])}`);
    }
    for (const match of chunk.matchAll(/^\s*Q\s*(\d{1,3})\s*[:.)-]|^\s*(\d{1,3})\s*[:-]\s/gmi)) {
      allMarkerKeys.push(`${assessment}|${heading.batch}|${Number(match[1] || match[2])}`);
    }
    const knownNumbers = [...new Set(questions.flatMap(question => questionLocations(question))
      .filter(location => location.assessment === assessment && location.batch === heading.batch)
      .map(location => location.questionNumber))].sort((a, b) => a - b);
    const markers = [];
    let searchFrom = 0;
    for (const number of knownNumbers) {
      const explicitPattern = new RegExp(`^\\s*Q\\s*${number}\\s*(?::|\\.|-|\\))`, "gmi");
      explicitPattern.lastIndex = searchFrom;
      let match = explicitPattern.exec(chunk);
      if (!match) {
        const plainPattern = new RegExp(`^\\s*${number}\\s*(?::|-|\\))`, "gmi");
        plainPattern.lastIndex = searchFrom;
        match = plainPattern.exec(chunk);
      }
      if (!match) continue;
      markers.push({ number, index: match.index });
      searchFrom = match.index + match[0].length;
    }
    for (let markerIndex = 0; markerIndex < markers.length; markerIndex += 1) {
      const marker = markers[markerIndex];
      const recordText = chunk.slice(marker.index, markers[markerIndex + 1]?.index ?? chunk.length);
      const key = `${assessment}|${heading.batch}|${marker.number}`;
      records.set(key, {
        assessment,
        batch: heading.batch,
        questionNumber: marker.number,
        text: recordText,
        crossesPage: recordText.includes("\f"),
        pageBreaks: [...recordText.matchAll(/\f/g)].length
      });
    }
  }

  const pages = text.split("\f");
  if (!pages.at(-1)?.trim()) pages.pop();
  for (let index = 0; index < pages.length - 1; index += 1) {
    const leftLines = pages[index].split("\n").map(line => line.trim()).filter(Boolean);
    const rightLines = pages[index + 1].split("\n").map(line => line.trim()).filter(Boolean);
    boundaries.push({
      page: index + 1,
      left: leftLines.slice(-4),
      right: rightLines.slice(0, 4)
    });
  }
  return { records, explicitKeys, allMarkerKeys, boundaries, pageCount: pages.length };
}

const parsed = Object.fromEntries(Object.entries(sourcePaths).map(([assessment, path]) => {
  const text = fs.readFileSync(path, "utf8").replaceAll("\r", "");
  return [assessment, parseSource(assessment, text)];
}));

const locationMap = new Map();
const duplicateSourceLocations = [];
for (const question of questions) {
  for (const location of questionLocations(question)) {
    const key = `${location.assessment}|${location.batch}|${location.questionNumber}`;
    if (locationMap.has(key)) {
      duplicateSourceLocations.push({ key, ids: [locationMap.get(key).id, question.id] });
    } else {
      locationMap.set(key, question);
    }
  }
}

const integrityIssues = [];
for (const question of questions) {
  const options = question.options || [];
  if (!question.stem?.trim()) integrityIssues.push({ type: "blank-stem", id: question.id });
  if (options.length !== 4) integrityIssues.push({ type: "option-count", id: question.id, count: options.length });
  if (options.some(option => !option.text?.trim() || /^[A-D][.)]?$/i.test(option.text.trim()))) {
    integrityIssues.push({ type: "blank-or-placeholder-option", id: question.id });
  }
  if (new Set(options.map(option => option.id)).size !== options.length) {
    integrityIssues.push({ type: "duplicate-option-id", id: question.id });
  }
  if (question.sourceAnswer && !options.some(option => sourceAnswerIncludes(question, option.id))) {
    integrityIssues.push({ type: "answer-not-in-options", id: question.id, sourceAnswer: question.sourceAnswer });
  }
  if (!question.explanation?.trim()) integrityIssues.push({ type: "blank-explanation", id: question.id });
  for (const image of question.images || []) {
    const src = typeof image === "string" ? image : image.src;
    const mediaPath = new URL(src, repo);
    if (!fs.existsSync(mediaPath)) integrityIssues.push({ type: "missing-image-file", id: question.id, src });
  }
}

const missingFromBank = [];
const explicitSourceQuestionsMissingFromBank = [];
const allMarkedSourceQuestionsMissingFromBank = [];
const missingFromSourceParse = [];
const crossPageChecks = [];
const lowTextMatches = [];
for (const [assessment, result] of Object.entries(parsed)) {
  for (const key of result.explicitKeys) {
    if (!locationMap.has(key)) explicitSourceQuestionsMissingFromBank.push(key);
  }
  for (const key of result.allMarkerKeys) {
    if (!locationMap.has(key)) allMarkedSourceQuestionsMissingFromBank.push(key);
  }
  for (const [key, record] of result.records) {
    const question = locationMap.get(key);
    if (!question) {
      missingFromBank.push({ assessment, batch: record.batch, questionNumber: record.questionNumber });
      continue;
    }
    const siteText = [question.stem, ...(question.options || []).map(option => option.text)].join(" ");
    const score = similarity(record.text, siteText);
    if (score < 0.42) lowTextMatches.push({ key, id: question.id, score });
    if (record.crossesPage) {
      crossPageChecks.push({
        key,
        id: question.id,
        pageBreaks: record.pageBreaks,
        optionCount: (question.options || []).length,
        hasPlaceholderOption: (question.options || []).some(option => !option.text?.trim() || /^[A-D][.)]?$/i.test(option.text.trim())),
        sourceAnswer: question.sourceAnswer,
        similarity: score
      });
    }
  }
}

for (const [key, question] of locationMap) {
  const assessment = key.split("|", 1)[0];
  if (!parsed[assessment]?.records.has(key)) missingFromSourceParse.push({ key, id: question.id });
}

const verification = {};
const assessments = {};
for (const question of questions) {
  verification[question.verification || "(missing)"] = (verification[question.verification || "(missing)"] || 0) + 1;
  assessments[question.assessment || "(missing)"] = (assessments[question.assessment || "(missing)"] || 0) + 1;
}

const suspiciousBoundaryStarts = Object.fromEntries(Object.entries(parsed).map(([assessment, result]) => [assessment,
  result.boundaries.filter(boundary => /^(?:[A-D][.)]|Answer\s*:|[a-z])/i.test(boundary.right[0] || ""))
]));

console.log(JSON.stringify({
  questions: questions.length,
  assessments,
  verification,
  sourcePages: Object.fromEntries(Object.entries(parsed).map(([assessment, result]) => [assessment, result.pageCount])),
  parsedSourceRecords: Object.fromEntries(Object.entries(parsed).map(([assessment, result]) => [assessment, result.records.size])),
  integrityIssues,
  duplicateSourceLocations,
  missingFromBank,
  explicitSourceQuestionsMissingFromBank: [...new Set(explicitSourceQuestionsMissingFromBank)],
  allMarkedSourceQuestionsMissingFromBank: [...new Set(allMarkedSourceQuestionsMissingFromBank)],
  missingFromSourceParse,
  crossPageChecks,
  lowTextMatches,
  suspiciousBoundaryStarts
}, null, 2));
