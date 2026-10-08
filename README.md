# Gift 445 Medical Question Bank

A responsive question bank for Medicine, Surgery, Community Medicine, and Informatics.

## Features

- Subject, batch, cycle, and lecture navigation
- Complete-subject and complete-cycle practice
- Light and dark themes
- Per-device progress and answer saving
- Mobile-first, static hosting with no account required
- Duplicate protection using stable question IDs, source locations, and normalized stems
- Concise English update strip highlighting new study features

## Project structure

- `index.html` — interface, navigation, and quiz behavior
- `medicine-data.js` — Medicine questions
- `medicine-reference-overrides.js` — reviewed Medicine corrections, references, ordering, and source images
- `medicine-mid-444-review.js` — MID Cardiology/Pulmonology lecture-page links, 444 lecture order, and independent medical review notes
- `medicine-mid-444-renal-gi-review.js` — MID Nephrology/Gastroenterology concept-page anchors, English explanations, reviewed choices, and current external sources
- `medicine-mid-explanation-completion.js` — explicit rationales for remaining imported MID placeholders and older-bank items; ambiguity checks and external references
- `medicine-mid-gift-first-review.js` — final Medicine MID practice policy, tentative interpretations, management qualifications and verified replacement lecture excerpts
- `surgery-data.js` — Surgery questions
- `surgery-catalog.js` — Surgery lecture structure
- `surgery-reference-overrides.js` — Surgery source labels and reference corrections
- `community-data.js` — Community Medicine questions
- `community-catalog.js` — Community Medicine lecture structure
- `informatics-data.js` — 376 Midterm question occurrences, preserving Gift keys and source locations
- `informatics-catalog.js` — five original Midterm lectures in teaching order
- `lecture-media/informatics/` — original lecture PDFs and verified page images
- `question-media/` — source images used by questions
- `445-logo.png` — public branding

## Adding questions

Add questions to the matching subject data file. Each file exports an array on `window` and can be updated independently.

```js
{
  id: "subject-batch-topic-q001",
  subjectId: "medicine",
  cycle: "Cardiology",
  lecture: "Acute Coronary Syndromes",
  lectureOrder: 2,
  assessment: "Final",
  sourceBatch: "445",
  stem: "Question text",
  options: [
    { id: "A", text: "Option A" },
    { id: "B", text: "Option B" },
    { id: "C", text: "Option C" },
    { id: "D", text: "Option D" }
  ],
  sourceAnswer: "A",
  explanation: "Concise explanation.",
  sourceLocations: [
    { assessment: "Final", batch: "445", questionNumber: 1 }
  ],
  references: []
}
```

For a subject organized directly by lecture, set `cycle` to `null`. For cycle-based navigation, use a consistent cycle name and lecture titles. Keep every `id` unique and stable so saved progress continues to work after updates.

When correcting a published question, prefer an override file so the imported source bank remains intact. Keep `sourceAnswer` unchanged, place an independently reviewed answer in `aiAnswer`, and use `verification` to distinguish `confirmed`, `supported`, `conflict`, `needs-review`, and `source-only` items.

Medicine MID now has a separate final practice policy: `giftReview.gradingAnswers` follows the recorded Gift key, while `giftReview.possibleAnswers` is a tentative opinion only. Both initial rendering and click feedback use the same grading helper. Do not use `aiAnswer` to overwrite this MID grading policy. Other subjects and assessments retain their existing behavior.

The four Medicine cycles (Cardiology, Pulmonology, Nephrology, Gastroenterology) include **MID 444 · Lecture Review** and preserve the original bank answers. Original lecture text is displayed separately from clinical interpretation and external sources. PDF pages count the cover as page 1. A topic match is never presented as proof of an answer.

Nephrology/Gastroenterology adds 283 question-specific English explanations: 201 supported, 15 conflicts, and 67 needing review. All four blocks use English medical reviews, evidence notes and interface labels. The original imported keys and stable question IDs remain unchanged. Related IBD and diabetic-CKD items have been moved to the lecture that actually teaches their concept. Detailed audit reports are maintained separately from the published site.

The final explanation audit covers all **687 Medicine MID questions** already present in the bank: 663 in the four current blocks and 24 older questions filed in other blocks. 244 generic or pending imported explanations were replaced with explicit clinical rationales. Older items use external references without invented 444 lecture pages. Further ambiguity checks leave 115 current-block questions needing review; original keys, IDs, ordering, source images and Final questions are preserved. Ehsan donation text remains Arabic.

The update strip is at the top of `index.html`. It highlights user-facing study features without internal review counts or workflow details. Keep future updates brief and scoped to the relevant subject and assessment.

Review validation: `node tests/medicine-mid-444-review.test.cjs`.
Integration validation: `node tests/medicine-mid-444-renal-gi-review.test.cjs` (all 663 reviewed MID items, preserved prior reviews/source keys, bounded pages, and neutral grading for uncertain questions).
Release validation: `node tests/medicine-mid-publish.test.cjs` (all 687 Medicine MID explanations and final grading behavior) and `node tests/medicine-mid-lecture-evidence.test.cjs` (final provenance and rendering).

Original-PDF evidence audit: 622 questions have checked original-page excerpts: 443 teaching passages and 179 explicitly marked background-only passages. 37 current-block questions have no verified supporting passage and show no lecture page claim; 28 older or unassigned questions also have no verified passage. Two excerpts are visually checked figure labels. Text quotations retain original wording with whitespace normalization only. Topic-only citations from earlier review stages are replaced at runtime by `medicine-mid-lecture-evidence.js`; they are not displayed as verified evidence. Original PDFs, full extracted page text, and the independent PDF validation script remain in the private reference directory outside the published site. Source-file hashes and page limits are recorded in the portable manifest in `tests/fixtures/`.

## Local preview

Informatics (2026-10-08): Midterm only, with 376 original question occurrences across 12 batches and five lectures. The 72 questions still deferred as presumed Final remain outside the site. One previously deferred SQL question (432 Q27) was restored after finding an explicit SQL database-query example on AI PDF page 65. All 376 visible questions have individual English explanations comparing the question with supplied slide passages: 222 have direct concept evidence and 154 have related context with explicitly identified evidence limits. Unsupported source details are not presented as quotations or established lecture answers. Each explanation now has a separate visible slide-answer panel. It distinguishes a supported choice, a qualified slide-based preference, and no conclusively supported option; bank keys and grading remain unchanged. Original PDFs, PDF page numbers (cover = 1), exact excerpts and expandable slide images accompany the explanations.

Primary lecture counts are Introduction 97, Clinical Data 102, EHR 98, CDS 62 and AI 17. AI contains only questions primarily assigned to that lecture; CDS, Clinical Data and other overlapping topics remain in their own lectures. Source occurrences, text, options, keys, images, neutral source defects and saved IDs remain preserved.

Validation: `node tests/informatics-mid.test.cjs` checks all 376 source records, five-lecture coverage, all completed explanations, excluded IDs, assets and hashes, Gift-first click/reload grading, AI membership and mixed-question uniqueness, and preservation of the three existing subjects. Authored review decisions and reproducible source-page checks are kept outside the public site in `../references/informatics/`.

Serve the repository with any static web server, for example:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

Medicine MID source-table audit (2026-10-05): the available original `Copy of MID.docx` has 695 question occurrences, all matched against existing MID questions by source location and content. It contains 22 question tables, including 12 nested tables in one of them. All cells are restored by `medicine-mid-source-tables.js` and displayed before the answer choices. The preceding text import omitted numerical content from 20 tables and omitted the qualitative table in another question; one table already had its values in the stem. Reviews of all 22 associated questions are updated. Original source units and inconsistent blood gases are preserved and explained rather than silently corrected. This audit establishes coverage for that Medicine MID source, not completeness of every Gift document or other subject.

Table validation: `node tests/medicine-mid-source-tables.test.cjs`. The fixture records the original DOCX hash, independent source-question inventory and exact table cells. Distinct questions with different table data are retained during duplicate filtering.

Question display order (2026-10-05): normal collections, cycles and individual lectures start with the newest batch. Repeated questions use the newest recorded batch for the selected assessment; questions with no numeric batch appear last. Existing order within a batch is stable, batch-specific practice keeps its source question numbers, and mixed lecture quizzes retain their shuffled order. Sorting operates on copies after the existing duplicate filter, preserving question IDs and content. Resuming a saved quiz tracks the current question by ID so a changed display order does not reset the learner's position or answers. Validation: `node tests/newest-batch-order.test.cjs` covers all three subjects and the saved-progress transition.

Gift-first MID update (2026-10-05): all 687 MID items show the recorded bank key separately from a tentative interpretation. 636 items use bank-based feedback; 51 with no key, incomplete choices or identified source inconsistencies remain explicitly ungraded. Multiple recorded keys are retained. In the post-hemostasis PPI question, D repeats B's 72-hour PPI option and is accepted as equivalent without rewriting the original B key. Question IDs, keys, content, tables, media and saved progress remain intact.

44 interpretations were revised, including every existing key/opinion disagreement. Management and next-step candidates have an explicit course-focus note: direct lecture teaching, background only, or no verified passage. Nine replacement evidence records were independently re-extracted from the original PDF pages with `pdfplumber` text flow and `x_tolerance=1`, checked for exact whitespace-normalized quotations, and matched to source SHA-256 hashes. The PE thrombolysis and variceal-bleeding treatment tables were also visually checked. The final policy has 624 verified passages (446 teaching, 178 background only), with 63 items still having no verified lecture passage. Prior test counts describe their individual review stages.

Final policy validation: `node tests/medicine-mid-gift-first.test.cjs` loads the full live script order and checks all 687 questions and every option for consistent click/reload grading, source preservation, neutral feedback for source defects, English-only medical notes, and unchanged behavior outside Medicine MID. Do not interpret green bank-based feedback as proof that a disputed key is the current clinical recommendation; the source key and lecture discrepancy remain visible together.

### Informatics Final source and practice scope

The linked Final bank contains **431 question occurrences** across 11 batches (443, 442, 441, 438–431), rather than its stale 301-question index. All occurrences retain their original Final assessment, batch, numbering, stems, options and Gift keys. Repeated numbers 20–24 in batch 436 remain distinct paragraph-based IDs; batch 438 lacks Q22–23. An embedded paragraph containing 436 Q2–Q4 is split into its three original questions. The confusion-table image anchored near 435 Q20 is displayed with the actual table question Q21. Missing image/options/keys and source uncertainty are visible and not scored.

**240 Final-source questions** also appear in the five Midterm lecture groups, with individual English explanations, exact original-slide passages/page images and a separate slide-answer panel. This includes 126 directly supported concepts and 114 related passages with explicit limits. Midterm practice therefore has **616 occurrences** (376 original Midterm + 240 Final-source), while the complete Final-bank sequence still has 431. The remaining **191 Final questions have no authored explanations**, as requested. Final topic groups contain 200 original occurrences, including 9 shared Midterm concepts; a mixed quiz counts each source ID once.

The Final catalog links actual Drive lecture files 6–9: Telemedicine/mHealth/Wearables, Patient Safety, Precision Medicine, and Privacy/Confidentiality/Security. Consumer Health, advanced Information Retrieval/EBM, Computer-based Learning/Mobile Applications, Dental Informatics, Imaging/Technical Standards, and Ethics are explicitly **pending topics, not verified lecture files**. Final questions on Midterm topics are available in their Midterm lecture groups and remain labelled `Final · Batch …`, including mixed quizzes. The 72 previously deferred occurrences from the Midterm source remain hidden; they have not been relabelled as confirmed Final-source questions.

`node tests/informatics-final.test.cjs` checks immutable source records, scope membership, repeated numbering, image placement, all-choice Gift grading, preserved source labels, deferred explanations, direct conflicts and the four ordered lecture-file links. Other subjects remain unchanged. No deployment is performed by these source builders.

Informatics cleanup (2026-10-08): AI now has 23 primary questions (17 Midterm-source and 6 Final-source). All 28 cross-listed occurrences remain under their original primary lectures. Explanations show the question-specific reasoning before the exact slide evidence, with repeated administrative wording removed. Precision Medicine questions 443 Q39 and 442 Q6 remain Final-only; their draft notes are retained privately for the later Final review.
