# Gift 445 Medical Question Bank

A responsive question bank for Medicine, Surgery, and Community Medicine.

## Features

- Subject, batch, cycle, and lecture navigation
- Complete-subject and complete-cycle practice
- Light and dark themes
- Per-device progress and answer saving
- Mobile-first, static hosting with no account required
- Duplicate protection using stable question IDs, source locations, and normalized stems

## Project structure

- `index.html` — interface, navigation, and quiz behavior
- `medicine-data.js` — Medicine questions
- `surgery-data.js` — Surgery questions
- `community-data.js` — Community Medicine questions
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

## Local preview

Serve the repository with any static web server, for example:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.
