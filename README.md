# Gift 445 Medical Question Bank

A responsive question bank for Medicine, Surgery, Community Medicine, Informatics, and Research.

## Features

- Subject, batch, cycle, and lecture navigation
- Complete-subject and complete-cycle practice
- Light and dark themes
- Per-device progress and answer saving
- Mobile-first, static hosting with no account required
- Duplicate protection using stable question IDs, source locations, and normalized stems
- Concise Arabic update strip highlighting new study features
- Permanent Arabic reminder to refresh the page periodically for updates

## Project structure

- `index.html` — interface, navigation, and quiz behavior
- `medicine-data.js` — Medicine questions
- `medicine-reference-overrides.js` — reviewed Medicine corrections, references, ordering, and source images
- `medicine-mid-444-review.js` — MID Cardiology/Pulmonology lecture-page links, 444 lecture order, and independent medical review notes
- `medicine-mid-444-renal-gi-review.js` — MID Nephrology/Gastroenterology concept-page anchors, English explanations, reviewed choices, and current external sources
- `medicine-mid-explanation-completion.js` — explicit rationales for remaining imported MID placeholders and older-bank items; ambiguity checks and external references
- `medicine-mid-gift-first-review.js` — final Medicine MID practice policy, tentative interpretations, management qualifications and verified replacement lecture excerpts
- `medicine-mid-study-review.js` — current Medicine MID explanations, independently reviewed answers, and exact original-page evidence; preserves the Gift grading policy
- `medicine-final-mid-review.js` — original Final-source questions linked to MID lectures, with the same study feedback and separate exam keys
- `lecture-media/medicine-mid/` — expandable original lecture page images used by the current MID explanations
- `surgery-data.js` — Surgery questions
- `surgery-catalog.js` — Surgery lecture structure
- `surgery-reference-overrides.js` — Surgery source labels and reference corrections
- `surgery-mid-study-review.js` — individual Surgery MID explanations, verified original slide excerpts, source reconstruction and Gift-first grading
- `lecture-media/surgery-mid/` — original supporting Surgery lecture pages, opened on request
- `community-data.js` — Community Medicine questions
- `community-catalog.js` — Community Medicine lecture structure
- `informatics-data.js` — 376 Midterm question occurrences, preserving Gift keys and source locations
- `informatics-catalog.js` — five original Midterm lectures in teaching order
- `research-catalog.js` — the Research tracking sheet's 33 MID sessions and 20 Final session names
- `research-data.js` — individually explained MID-topic questions from both original Gift banks, retaining each source exam and key
- `lecture-media/research-mid/` — verified original PDF pages, expanded on request; PowerPoint evidence uses original slide numbers
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

Medicine MID and reviewed Surgery MID questions have a separate practice policy: `giftReview.gradingAnswers` follows the recorded Gift key. Both initial rendering and click feedback use the same grading helper. Do not use `aiAnswer` or an independently reviewed answer to overwrite this grading policy. Other subjects and assessments retain their existing behavior.

The Surgery MID study layer covers 970 existing questions: 934 primary Midterm records and 36 existing Final-source records already used in MID lecture practice. Of these, 463 explanations use directly matching lecture teaching and 507 are explicitly clinical explanations. There are 55 unresolved questions whose available information does not establish a unique reviewed choice. Every question has an individual English explanation using the same compact feedback layout as Medicine: the original bank answer, a reviewed alternative only when needed, one explanation, and optional slide evidence. The available source inventory contains 33 complete original PDFs (604 pages), labelled by their actual team or lecturer. A lecture citation requires an exact quotation on the stated original PDF page. Related background slides are distinguished from direct answer support; a topic match alone is not evidence. Clinical explanations are labelled explicitly when matching teaching is unavailable. Missing pediatric or infection teaching is not replaced with unrelated lecture citations.

Source reconstruction is restricted to documented importer defects checked against the original DOCX hashes and exact paragraphs: swallowed question/option text, dropped parts of multi-answer notes, and a floating hiatal-hernia image previously attached to colorectal screening. Restored keys match the original source; they are separate from medical objections. Blank or placeholder options are hidden, and incomplete or explicitly uncertain source questions are not scored. Corrected topic placement preserves original assessment, batch, source locations and stable progress IDs. An obsolete reference-label filter is removed for 68 reviewed Breast, Neck and Perioperative questions so they are accessible in their lecture groups. The nine previously excluded Nutrition records remain excluded, and unselected Final records are untouched. This correction work adds no public update announcement.

Build the Surgery layer with `scripts/build-surgery-mid-study-review.py` using the private reviewed inputs and original files outside the repository. The builder independently re-extracts cited PDF pages and verifies original bank paragraphs, image bytes, quotation text and published slide-image hashes. The public audit fixture is `tests/fixtures/surgery-mid-study-review.json`. `node tests/surgery-mid-study-review.test.cjs` checks all 970 reviews, source repairs, original grading, every answer click and revisited feedback, exact slide assets, stable displayed IDs, and unchanged other subjects and Final scope.

The current MID explanation layer is `medicine-mid-study-review.js`, loaded after the grading policy. All 687 questions show the Gift answer and a concise, question-specific explanation. A reviewed alternative appears only when it differs, with a clear reason for any disagreement or source limitation. The review covers all 27 available Teamwork 444 lecture PDFs (637 pages), including physician notes: 604 explanations use matching lecture teaching and 83 are explicitly labelled clinical explanations. There are 26 unresolved items whose missing or conflicting source details prevent a unique answer; they still have explanations. Original keys, grading, stems, options, tables, media, IDs, order and saved progress remain unchanged.

The supporting evidence opens on request: exact original wording, the PDF page number (cover = 1), the original page image, and the full lecture link. Clinical explanations may include a related slide, clearly distinguished from direct answer support. Every quoted page was independently re-extracted from the original PDF and matched to its file hash; 244 unique page images are loaded lazily. `scripts/build-medicine-study-review.py` builds this layer from private authored reviews and originals outside the repository. `tests/fixtures/medicine-mid-study-review.json` records source hashes, coverage and checked pages. Validate the current live layer with `node tests/medicine-mid-study-review.test.cjs`; run all checks with `node --test tests/*.test.cjs`.

The Final-to-MID layer inventories the complete original Medicine Final DOCX: 765 source occurrences across 13 batches, represented by 750 pre-existing canonical records. It links 146 Final questions (147 occurrences) to matching MID lectures: Cardiology 30, Pulmonology 38, Nephrology 50, and Gastroenterology 28. Each has an individual explanation: 80 use matching lecture teaching and 66 are explicitly clinical extensions. Nine source defects or ambiguities prevent a unique reviewed answer; their explanations state the limitation. Related Final questions appear in the relevant lectures, lecture mixes and cycle MID lecture review, retaining their original Final assessment, batch and question number. The standalone Midterm exam collection remains 687 questions.

Source reconstruction restores 13 option sets whose first choice was swallowed into the stem, preserves a duplicated original option label, and restores the exact original answer notes where the earlier import dropped a key or supplied an unrecorded one. Three exam-specific variants keep differing source choices or keys separate; existing MID answers, grading and explanations are preserved. All 765 Final occurrences remain accessible, now as 751 Final-linked records within 1,424 Medicine questions. Reviewed Final records retain their IDs through display deduplication. Older Final labels without a reviewed MID mapping are excluded from MID lecture groups, while their original Final bank entries remain available. Empty source choices do not create blank buttons; entirely unanswerable records show their explanation immediately.

`scripts/build-medicine-final-mid-review.py` validates the original DOCX hash, source answer prefixes, exact PDF-page quotations and image hashes before building the overlay. Its private source inventory, reconstruction inputs and authored reviews remain outside the repository. `tests/medicine-final-mid-review.test.cjs` checks the full live script order, all source occurrences, source reconstructions, exam-specific variants, lecture membership, mixed-quiz exam labels, every answer choice and reload behavior. The earlier MID tests run their respective review stages; the Final integration test checks their preserved reviews in the complete live site. No public update announcement is added for this review.

The stage-specific counts and tests below describe earlier review layers, which remain as provenance and grading inputs. Their old multi-section feedback is superseded by the current MID explanation layer. Correction work does not add a public update announcement.

The four Medicine cycles (Cardiology, Pulmonology, Nephrology, Gastroenterology) include **MID 444 · Lecture Review** and preserve the original bank answers. Original lecture text is displayed separately from clinical interpretation and external sources. PDF pages count the cover as page 1. A topic match is never presented as proof of an answer.

Nephrology/Gastroenterology adds 283 question-specific English explanations: 201 supported, 15 conflicts, and 67 needing review. All four blocks use English medical reviews, evidence notes and interface labels. The original imported keys and stable question IDs remain unchanged. Related IBD and diabetic-CKD items have been moved to the lecture that actually teaches their concept. Detailed audit reports are maintained separately from the published site.

The final explanation audit covers all **687 Medicine MID questions** already present in the bank: 663 in the four current blocks and 24 older questions filed in other blocks. 244 generic or pending imported explanations were replaced with explicit clinical rationales. Older items use external references without invented 444 lecture pages. Further ambiguity checks leave 115 current-block questions needing review; original keys, IDs, ordering, source images and Final questions are preserved. Ehsan donation text remains Arabic.

The update strip is at the top of `index.html`. It highlights user-facing study features without internal review counts or workflow details. Keep future updates brief, in Arabic, and scoped to the relevant subject and assessment. Use RTL layout for the update strip while retaining English medical explanations.

Review validation: `node tests/medicine-mid-444-review.test.cjs`.
Integration validation: `node tests/medicine-mid-444-renal-gi-review.test.cjs` (all 663 reviewed MID items, preserved prior reviews/source keys, bounded pages, and neutral grading for uncertain questions).
Release validation: `node tests/medicine-mid-publish.test.cjs` (all 687 Medicine MID explanations and final grading behavior) and `node tests/medicine-mid-lecture-evidence.test.cjs` (final provenance and rendering).

Original-PDF evidence audit: 622 questions have checked original-page excerpts: 443 teaching passages and 179 explicitly marked background-only passages. 37 current-block questions have no verified supporting passage and show no lecture page claim; 28 older or unassigned questions also have no verified passage. Two excerpts are visually checked figure labels. Text quotations retain original wording with whitespace normalization only. Topic-only citations from earlier review stages are replaced at runtime by `medicine-mid-lecture-evidence.js`; they are not displayed as verified evidence. Original PDFs, full extracted page text, and the independent PDF validation script remain in the private reference directory outside the published site. Source-file hashes and page limits are recorded in the portable manifest in `tests/fixtures/`.

## Local preview

### Research MID (2026-10-20)

The Research tab of the linked 445 tracking sheet determines the scope: 22 theory sessions and 11 tutorials for MID, plus 11 theory and 9 tutorial names for Final. The Final catalog is names only with no active question collection. MID practice contains 640 original source occurrences: 440 from the MID bank and 200 matching questions from the Final bank. Their original assessment, batch, question number, options, answer annotations and Gift keys remain intact. The 266 Final-only questions and one unreconstructable MID topic reminder remain outside the published question bank.

Every included occurrence has an individual English explanation, independently checked against its stem, options and numerical data. 539 explanations use direct lecture teaching; 101 are labelled concept explanations with the limits of related evidence made clear. Reviewed alternatives appear separately from Gift. Nineteen questions cannot establish a unique reviewed answer; they still have explanations. Missing choices, contradictory data, equivalent options and other source defects receive neutral feedback where appropriate. Normal scoring follows the original Gift key.

Available sources comprise 29 original PDFs (394 pages) and five original PowerPoint presentations (217 slides), including physician notes. Their Drive parent is MED444, not a falsely labelled Team445 source; the current 445 tracking sheet controls assessment scope. No dedicated References Manager slide file was found. Citations use the actual PDF page or original PowerPoint slide number. The builder independently verifies source hashes, re-extracts every cited passage, and renders 94 original PDF pages for lazy loading; PowerPoint text is verified directly in the original slide/linked SmartArt XML and links to the source deck. All 27 native question tables and five question-image occurrences are preserved, including explicit shared-case placement.

`scripts/audit-research-source.py` verifies all 907 source occurrences directly against the native MID document and original Final DOCX. `scripts/build-research-mid.py` uses the private source files and authored reviews in `../work/research-mid-review`, publishing only MID-topic questions. `tests/research-mid.test.cjs` checks the complete production script order, all 640 source records, original grading and all 2,518 answer click/revisit, the 53 catalog names, empty Final practice, source quotations and assets, and unchanged existing subjects. The portable proof is `tests/fixtures/research-mid.json`; full bank originals and deferred question content remain private. Existing update-strip wording is preserved.

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

Grading-policy stage validation: `node tests/medicine-mid-gift-first.test.cjs` checks all 687 questions and every option before the current study overlay for consistent click/reload grading, source preservation, neutral feedback for source defects, English-only medical notes, and unchanged behavior outside Medicine MID. The current-layer test above checks the complete live script order and feedback. Do not interpret green bank-based feedback as proof that a disputed key is the current clinical recommendation; the source key and lecture discrepancy remain visible together.

### Informatics Final source and practice scope

The linked Final bank contains **431 question occurrences** across 11 batches (443, 442, 441, 438–431), rather than its stale 301-question index. All occurrences retain their original Final assessment, batch, numbering, stems, options and Gift keys. Repeated numbers 20–24 in batch 436 remain distinct paragraph-based IDs; batch 438 lacks Q22–23. An embedded paragraph containing 436 Q2–Q4 is split into its three original questions. The confusion-table image anchored near 435 Q20 is displayed with the actual table question Q21. Missing image/options/keys and source uncertainty are visible and not scored.

**240 Final-source questions** also appear in the five Midterm lecture groups, with individual English explanations, exact original-slide passages/page images and a separate slide-answer panel. This includes 126 directly supported concepts and 114 related passages with explicit limits. Midterm practice therefore has **616 occurrences** (376 original Midterm + 240 Final-source), while the complete Final-bank sequence still has 431. The remaining **191 Final questions have no authored explanations**, as requested. Final topic groups contain 200 original occurrences, including 9 shared Midterm concepts; a mixed quiz counts each source ID once.

The Final catalog links actual Drive lecture files 6–9: Telemedicine/mHealth/Wearables, Patient Safety, Precision Medicine, and Privacy/Confidentiality/Security. Consumer Health, advanced Information Retrieval/EBM, Computer-based Learning/Mobile Applications, Dental Informatics, Imaging/Technical Standards, and Ethics are explicitly **pending topics, not verified lecture files**. Final questions on Midterm topics are available in their Midterm lecture groups and remain labelled `Final · Batch …`, including mixed quizzes. The 72 previously deferred occurrences from the Midterm source remain hidden; they have not been relabelled as confirmed Final-source questions.

`node tests/informatics-final.test.cjs` checks immutable source records, scope membership, repeated numbering, image placement, all-choice Gift grading, preserved source labels, deferred explanations, direct conflicts and the four ordered lecture-file links. Other subjects remain unchanged. No deployment is performed by these source builders.

Informatics cleanup (2026-10-08): AI now has 23 primary questions (17 Midterm-source and 6 Final-source). All 28 cross-listed occurrences remain under their original primary lectures. Explanations show the question-specific reasoning before the exact slide evidence, with repeated administrative wording removed. Precision Medicine questions 443 Q39 and 442 Q6 remain Final-only; their draft notes are retained privately for the later Final review.
