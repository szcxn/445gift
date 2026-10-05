# Gift 445 Medical Question Bank

A responsive question bank for Medicine, Surgery, and Community Medicine.

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
- `surgery-data.js` — Surgery questions
- `surgery-catalog.js` — Surgery lecture structure
- `surgery-reference-overrides.js` — Surgery source labels and reference corrections
- `community-data.js` — Community Medicine questions
- `community-catalog.js` — Community Medicine lecture structure
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

The four Medicine cycles (Cardiology, Pulmonology, Nephrology, Gastroenterology) include **MID 444 · Lecture Review**. It follows the 444 lecture sequence and then PDF-page order, with source answers kept separate from medical opinions. Review covers 663 MID questions: 656 have related lecture-page anchors and 7 older-bank topics are explicitly outside these lectures. Final questions and other subjects are not part of this update. Page numbers include the cover; caveats identify partial teaching support and external evidence. Items with insufficient information, missing options/labs, or non-unique choices are not marked correct or incorrect.

Nephrology/Gastroenterology adds 283 question-specific English explanations: 201 supported, 15 conflicts, and 67 needing review. All four blocks use English medical reviews, evidence notes and interface labels. The original imported keys and stable question IDs remain unchanged. Related IBD and diabetic-CKD items have been moved to the lecture that actually teaches their concept. Detailed audit reports are maintained separately from the published site.

The final explanation audit covers all **687 Medicine MID questions** already present in the bank: 663 in the four current blocks and 24 older questions filed in other blocks. 244 generic or pending imported explanations were replaced with explicit clinical rationales. Older items use external references without invented 444 lecture pages. Further ambiguity checks leave 115 current-block questions needing review; original keys, IDs, ordering, source images and Final questions are preserved. Ehsan donation text remains Arabic.

The update strip is at the top of `index.html`. It highlights user-facing study features without internal review counts or workflow details. Keep future updates brief and scoped to the relevant subject and assessment.

Review validation: `node tests/medicine-mid-444-review.test.cjs`.
Integration validation: `node tests/medicine-mid-444-renal-gi-review.test.cjs` (all 663 reviewed MID items, preserved prior reviews/source keys, bounded pages, and neutral grading for uncertain questions).
Release validation: `node tests/medicine-mid-publish.test.cjs` (all 687 Medicine MID explanations and final grading behavior). Lecture-page checks use the portable manifest in `tests/fixtures/`.

## Local preview

Serve the repository with any static web server, for example:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.
