// Original-bank occurrence repairs, checked against native DOCX paragraphs.
// Import arrays remain intact; the live bank separates copies whose options or keys differ.
(() => {
  const repairs = [
  {
    "baseId": "medicine-midterm-438-git-hepatobiliary-q056",
    "subjectId": "medicine",
    "base": {
      "stem": "Patient with dysphagia to solids and liquids with choking and nasal reqauragation",
      "options": [
        {
          "id": "A",
          "text": "achalasia"
        },
        {
          "id": "B",
          "text": "scleroderma"
        },
        {
          "id": "C",
          "text": "Esophageal adenocarcinoma"
        },
        {
          "id": "D",
          "text": "CVS"
        }
      ],
      "sourceAnswer": null,
      "sourceAnswerNote": "Not provided",
      "sourceLocations": [
        {
          "assessment": "Midterm",
          "batch": "438",
          "questionNumber": 56
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Copy of MID.docx",
        "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752",
        "paragraphStart": 2492,
        "paragraphEnd": 2498,
        "questionNumber": 56
      }
    },
    "variantId": "medicine-source-438-midterm-q057",
    "variant": {
      "stem": "Patient with dysphagia to solids and liquids with choking and nasal reqauragation",
      "options": [
        {
          "id": "A",
          "text": "achalasia"
        },
        {
          "id": "B",
          "text": "scleroderma"
        },
        {
          "id": "C",
          "text": "cerebrovascular disease"
        },
        {
          "id": "D",
          "text": "esophageal adenocarcinoma"
        }
      ],
      "sourceAnswer": "C",
      "sourceAnswerNote": "C",
      "sourceLocations": [
        {
          "assessment": "Midterm",
          "batch": "438",
          "questionNumber": 57
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Copy of MID.docx",
        "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752",
        "paragraphStart": 2499,
        "paragraphEnd": 2505,
        "questionNumber": 57
      }
    },
    "review": {
      "answers": [
        "C"
      ],
      "confidence": "supported",
      "basis": "lecture",
      "explanation": "Choking and nasal regurgitation point to oropharyngeal swallowing dysfunction. The lecture lists stroke among its neurological causes. In this version, C explicitly says cerebrovascular disease, so it fits the symptoms and agrees with the recorded Gift answer.",
      "objection": "",
      "evidence": {
        "pdfId": "1KtPBFP9GmjyqXXMjasa5lxn5aJxFRZkO",
        "title": "Esophageal diseases",
        "page": 10,
        "quote": "Systemic Neurologic (Such as Stroke) or Myopathic (Such as dermatomyositis) Syndromes.",
        "relation": "teaching",
        "sourceSha256": "98b01fcd3930af47831d7b196ace4a513e9069cac3559c635b7b5474dce6d93f",
        "pageTextSha256": "a93dbc56bd1a84f76596cd7948a35a08d07f985f868582c312a00ed4f0e3c951",
        "textKind": "flowText",
        "url": "https://drive.google.com/file/d/1KtPBFP9GmjyqXXMjasa5lxn5aJxFRZkO/view?usp=drivesdk",
        "image": "lecture-media/medicine-mid/1KtPBFP9GmjyqXXMjasa5lxn5aJxFRZkO-010.jpg",
        "imageSha256": "e791f8a6601451c97bcb34530287771e311a73311e59ad3dadc5ca93a7660537"
      },
      "references": []
    }
  },
  {
    "baseId": "medicine-midterm-436-git-hepatobiliary-q069",
    "subjectId": "medicine",
    "base": {
      "stem": "Which one of the following is a feature of Ulcerative colitis rather than crohn's disease?",
      "options": [
        {
          "id": "A",
          "text": "Crypt abscesses"
        },
        {
          "id": "B",
          "text": "Transmural inflammation"
        }
      ],
      "sourceAnswer": "A",
      "sourceAnswerNote": "A",
      "sourceLocations": [
        {
          "assessment": "Midterm",
          "batch": "436",
          "questionNumber": 69
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Copy of MID.docx",
        "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752",
        "paragraphStart": 3392,
        "paragraphEnd": 3396,
        "questionNumber": 69
      }
    },
    "variantId": "medicine-source-436-midterm-q081",
    "variant": {
      "stem": "Which of the following is seen in ulcerative colitis but not in crohns?",
      "options": [
        {
          "id": "A",
          "text": "Crypt abscess"
        },
        {
          "id": "B",
          "text": "Transmural"
        },
        {
          "id": "C",
          "text": "Granulomatous"
        },
        {
          "id": "D",
          "text": "Non-bloody stool"
        }
      ],
      "sourceAnswer": "A",
      "sourceAnswerNote": "A",
      "sourceLocations": [
        {
          "assessment": "Midterm",
          "batch": "436",
          "questionNumber": 81
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Copy of MID.docx",
        "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752",
        "paragraphStart": 3461,
        "paragraphEnd": 3467,
        "questionNumber": 81
      }
    },
    "review": {
      "answers": [
        "A"
      ],
      "confidence": "supported",
      "basis": "lecture",
      "explanation": "Crypt abscesses are a classic feature of ulcerative colitis, making A the intended answer. Transmural inflammation and granulomas favor Crohn disease. Crypt abscesses are not exclusive to UC, but they are the best choice in this teaching comparison.",
      "objection": "",
      "evidence": {
        "pdfId": "1Qriuhbb34zoe496wiWlOMtZSxmVe-Tze",
        "title": "Abdominal Pain Including IBS",
        "page": 32,
        "quote": "PMNs accumulate in the crypts of the colon causing crypt abscesses.",
        "relation": "teaching",
        "sourceSha256": "7b0a33852bb8c3de4fbf630c4e2ae9048e285fecff42081ce15ef07fbcc9e2ad",
        "pageTextSha256": "dc0fe71448855e046b89cf1f5916d999fa634465de70881c3d212129c831a649",
        "textKind": "flowText",
        "url": "https://drive.google.com/file/d/1Qriuhbb34zoe496wiWlOMtZSxmVe-Tze/view?usp=drivesdk",
        "image": "lecture-media/medicine-mid/1Qriuhbb34zoe496wiWlOMtZSxmVe-Tze-032.jpg",
        "imageSha256": "d55946c5c867dd5f77fdab329d0293ea55a20951c5f63476e0a1ed6e51330537"
      },
      "references": []
    }
  },
  {
    "baseId": "medicine-final-442-infectious-diseases-q039",
    "subjectId": "medicine",
    "base": {
      "stem": "Which one of the following neurological complications of syphilis can commonly be seen in early infection?",
      "options": [
        {
          "id": "A",
          "text": "Meningovascular disease"
        },
        {
          "id": "B",
          "text": "General paresis"
        },
        {
          "id": "C",
          "text": "Syphilitic amyotrophy"
        },
        {
          "id": "D",
          "text": "Syphilic cerebellar ataxia"
        }
      ],
      "sourceAnswer": "A",
      "sourceAnswerNote": "A",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "442",
          "questionNumber": 39
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Medicine Final - All Years MCQs_.docx",
        "sha256": "47caf163ea492698d1afa0ab562b2e52c77cf167aed3425ac8c813fd70af99b6",
        "paragraphStart": 1062,
        "paragraphEnd": 1069,
        "questionNumber": 39
      }
    },
    "variantId": "medicine-source-442-final-q044",
    "variant": {
      "stem": "Which one of the following neurological complications of syphilis can commonly be seen in early infection?",
      "options": [
        {
          "id": "A",
          "text": "General paresis"
        },
        {
          "id": "B",
          "text": "Meningovascular disease"
        },
        {
          "id": "C",
          "text": "Syphilitic amyotrophy"
        },
        {
          "id": "D",
          "text": "Syphilitic cerebellar ataxia"
        }
      ],
      "sourceAnswer": "B",
      "sourceAnswerNote": "B",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "442",
          "questionNumber": 44
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "Medicine Final - All Years MCQs_.docx",
        "sha256": "47caf163ea492698d1afa0ab562b2e52c77cf167aed3425ac8c813fd70af99b6",
        "paragraphStart": 1116,
        "paragraphEnd": 1123,
        "questionNumber": 44
      }
    },
    "review": null
  },
  {
    "baseId": "surgery-midterm-q0151",
    "subjectId": "surgery",
    "base": {
      "stem": "According to the Glasgow Coma Scale (GCS), a verbal score of 4 indicates which of the following?",
      "options": [
        {
          "id": "A",
          "text": "No response"
        },
        {
          "id": "B",
          "text": "Confused response"
        },
        {
          "id": "C",
          "text": "Incomprehensible response"
        },
        {
          "id": "D",
          "text": "Inappropriate response"
        }
      ],
      "sourceAnswer": "B",
      "sourceAnswerNote": "B",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "437",
          "questionNumber": 2,
          "sourceType": "Gift",
          "originalAssessment": "Final"
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "surgery-final.docx",
        "sha256": "fb6a390293bd688ed04b0ad2af0a6b48b7148da747462ea7b2dbf5c8c173c75e",
        "paragraphStart": 1418,
        "paragraphEnd": 1424,
        "questionNumber": 2
      }
    },
    "variantId": "surgery-source-437-final-q048",
    "variant": {
      "stem": "According to the Glasgow Coma Scale (GCS), a verbal score of 4 indicates which of the following?",
      "options": [
        {
          "id": "A",
          "text": "Confused response"
        },
        {
          "id": "B",
          "text": "Inappropriate response"
        },
        {
          "id": "C",
          "text": "Incomprehensible response"
        },
        {
          "id": "D",
          "text": "No response"
        }
      ],
      "sourceAnswer": null,
      "sourceAnswerNote": "Not provided",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "437",
          "questionNumber": 48,
          "sourceType": "Gift",
          "originalAssessment": "Final"
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "surgery-final.docx",
        "sha256": "fb6a390293bd688ed04b0ad2af0a6b48b7148da747462ea7b2dbf5c8c173c75e",
        "paragraphStart": 1781,
        "paragraphEnd": 1787,
        "questionNumber": 48
      }
    },
    "review": {
      "answers": [
        "A"
      ],
      "confidence": "supported",
      "basis": "lecture",
      "explanation": "A verbal GCS of 4 means confused conversation. In this version it is option A. Inappropriate words score 3, incomprehensible sounds score 2, and no response scores 1. The original Gift key is blank, so this answer is a lecture-based explanation and the question is not scored.",
      "objection": "",
      "evidence": {
        "pdfId": "1KO2nKtdVPsLFzbt6BNnCOiShPYxymJic",
        "title": "Team 444 · L1) Trauma",
        "page": 9,
        "quote": "Glasgow Coma Scale (GCS) score (Important for traumas) by calculating: eye-opening response + verbal response + motor response",
        "relation": "teaching",
        "sourceSha256": "633d43306efcb7b935f3ffd7d1ef2e068c46274371d629db1646e45d5fffa2dd",
        "pageTextSha256": "1d3a6cfff088e30fe6d11332962027ecdb88bd15bb482791ede0b0534fe3b8d5",
        "textKind": "flowText",
        "url": "https://drive.google.com/file/d/1KO2nKtdVPsLFzbt6BNnCOiShPYxymJic/view?usp=drivesdk",
        "image": "lecture-media/surgery-mid/1KO2nKtdVPsLFzbt6BNnCOiShPYxymJic-009.jpg",
        "imageSha256": "0b215f29665d86eb48a44b9119f91d1972ca087ce1f6d98abd008b0e034cc005"
      },
      "references": []
    }
  },
  {
    "baseId": "surgery-midterm-q0880",
    "subjectId": "surgery",
    "base": {
      "stem": "A 67 year old male admitted to the vascular ward with little toe gangrene secondary to peripheral arterial disease (PAD). One of the following is a clinical presentation of Critical Lower Limb Ischemia.",
      "options": [
        {
          "id": "A",
          "text": "Rest pain"
        },
        {
          "id": "B",
          "text": "Cold limb"
        },
        {
          "id": "C",
          "text": "Darker skin at the shin"
        },
        {
          "id": "D",
          "text": "Intermittent claudication"
        }
      ],
      "sourceAnswer": "A",
      "sourceAnswerNote": "A",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "437",
          "questionNumber": 28,
          "sourceType": "Gift",
          "originalAssessment": "Final"
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "surgery-final.docx",
        "sha256": "fb6a390293bd688ed04b0ad2af0a6b48b7148da747462ea7b2dbf5c8c173c75e",
        "paragraphStart": 1626,
        "paragraphEnd": 1632,
        "questionNumber": 28
      }
    },
    "variantId": "surgery-source-437-final-q088",
    "variant": {
      "stem": "A-67-year-old male admitted to the vascular ward with little toe gangrene secondary to peripheral arterial disease (PAD). One of the following is a clinical presentation of critical lower limb ischemia:",
      "options": [
        {
          "id": "A",
          "text": "Darker skin at the shin"
        },
        {
          "id": "B",
          "text": "Cold limb"
        },
        {
          "id": "C",
          "text": "intermittent claudication"
        },
        {
          "id": "D",
          "text": "Rest pain"
        }
      ],
      "sourceAnswer": null,
      "sourceAnswerNote": "Not provided",
      "sourceLocations": [
        {
          "assessment": "Final",
          "batch": "437",
          "questionNumber": 88,
          "sourceType": "Gift",
          "originalAssessment": "Final"
        }
      ],
      "sourceOccurrenceIntegrity": {
        "filename": "surgery-final.docx",
        "sha256": "fb6a390293bd688ed04b0ad2af0a6b48b7148da747462ea7b2dbf5c8c173c75e",
        "paragraphStart": 2142,
        "paragraphEnd": 2148,
        "questionNumber": 88
      }
    },
    "review": {
      "answers": [
        "D"
      ],
      "confidence": "supported",
      "basis": "lecture",
      "explanation": "Ischemic pain at rest indicates inadequate blood supply even without exercise. Together with toe gangrene, it fits chronic limb-threatening ischemia. Rest pain is option D in this version. The original Gift key is blank, so this is the explained answer and the question is not scored.",
      "objection": "",
      "evidence": {
        "pdfId": "1NzTkTWyZmtT3GdvxBeU5whfRthnSHRAJ",
        "title": "Team 444 · L9) Arterial Diseases",
        "page": 8,
        "quote": "It presents with ischemic rest pain and ulcers, and carries a high risk of limb loss, making revascularization indicated.",
        "relation": "teaching",
        "sourceSha256": "404dbae9b0a8662333a359813f09d3a1ac3ea329e331742b44e5eb88512459af",
        "pageTextSha256": "ea301feee1bc3c4f4eabb246d183d978ce0c264066271626341cdac44c62e0dd",
        "textKind": "flowText",
        "url": "https://drive.google.com/file/d/1NzTkTWyZmtT3GdvxBeU5whfRthnSHRAJ/view?usp=drivesdk",
        "image": "lecture-media/surgery-mid/1NzTkTWyZmtT3GdvxBeU5whfRthnSHRAJ-008.jpg",
        "imageSha256": "e0e6271ddb204738af1e56faf5d90f60ca9cbd5214ae3b4460c41bcc366c6b01"
      },
      "references": []
    }
  }
];
  window.GIFT445_BATCH_SOURCE_COUNTS = {
  "research": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 30
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 26
    },
    {
      "assessment": "Midterm",
      "batch": "441",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 35
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 38
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 38
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 23
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 41
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 50
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 40
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 39
    },
    {
      "assessment": "Final",
      "batch": "441",
      "count": 40
    },
    {
      "assessment": "Final",
      "batch": "439",
      "count": 51
    },
    {
      "assessment": "Final",
      "batch": "438",
      "count": 50
    },
    {
      "assessment": "Final",
      "batch": "437",
      "count": 20
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 34
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 50
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 47
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 49
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 43
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 43
    }
  ],
  "radiology": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 36
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 41
    },
    {
      "assessment": "Midterm",
      "batch": "441",
      "count": 35
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 79
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 92
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 55
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 72
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 62
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 32
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 28
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 34
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 23
    },
    {
      "assessment": "Midterm",
      "batch": "430",
      "count": 39
    },
    {
      "assessment": "Final",
      "batch": "443",
      "count": 30
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 34
    },
    {
      "assessment": "Final",
      "batch": "441",
      "count": 58
    },
    {
      "assessment": "Final",
      "batch": "439",
      "count": 80
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 31
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 25
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 15
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 56
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 33
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 55
    },
    {
      "assessment": "Final",
      "batch": "430",
      "count": 26
    }
  ],
  "community": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 13
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 32
    },
    {
      "assessment": "Midterm",
      "batch": "441",
      "count": 25
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 61
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 59
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 33
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 35
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 57
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 39
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 52
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 60
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 2
    },
    {
      "assessment": "Final",
      "batch": "439",
      "count": 29
    },
    {
      "assessment": "Final",
      "batch": "438",
      "count": 73
    },
    {
      "assessment": "Final",
      "batch": "437",
      "count": 22
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 14
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 23
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 45
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 34
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 30
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 14
    },
    {
      "assessment": "Final",
      "batch": "430",
      "count": 59
    }
  ],
  "informatics": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 23
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 37
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 34
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 38
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 36
    },
    {
      "assessment": "Midterm",
      "batch": "430",
      "count": 40
    },
    {
      "assessment": "Final",
      "batch": "443",
      "count": 39
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 31
    },
    {
      "assessment": "Final",
      "batch": "441",
      "count": 17
    },
    {
      "assessment": "Final",
      "batch": "438",
      "count": 38
    },
    {
      "assessment": "Final",
      "batch": "437",
      "count": 60
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 31
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 30
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 54
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 60
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 36
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 35
    }
  ],
  "medicine": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 60
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 48
    },
    {
      "assessment": "Midterm",
      "batch": "441",
      "count": 60
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 60
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 60
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 36
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 85
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 55
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 46
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 48
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 34
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 58
    },
    {
      "assessment": "Midterm",
      "batch": "430",
      "count": 45
    },
    {
      "assessment": "Final",
      "batch": "443",
      "count": 73
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 80
    },
    {
      "assessment": "Final",
      "batch": "441",
      "count": 80
    },
    {
      "assessment": "Final",
      "batch": "439",
      "count": 72
    },
    {
      "assessment": "Final",
      "batch": "438",
      "count": 40
    },
    {
      "assessment": "Final",
      "batch": "437",
      "count": 58
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 42
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 68
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 55
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 51
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 42
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 44
    },
    {
      "assessment": "Final",
      "batch": "429",
      "count": 60
    }
  ],
  "surgery": [
    {
      "assessment": "Midterm",
      "batch": "443",
      "count": 46
    },
    {
      "assessment": "Midterm",
      "batch": "442",
      "count": 40
    },
    {
      "assessment": "Midterm",
      "batch": "441",
      "count": 58
    },
    {
      "assessment": "Midterm",
      "batch": "439",
      "count": 70
    },
    {
      "assessment": "Midterm",
      "batch": "438",
      "count": 77
    },
    {
      "assessment": "Midterm",
      "batch": "437",
      "count": 41
    },
    {
      "assessment": "Midterm",
      "batch": "436",
      "count": 63
    },
    {
      "assessment": "Midterm",
      "batch": "435",
      "count": 50
    },
    {
      "assessment": "Midterm",
      "batch": "434",
      "count": 36
    },
    {
      "assessment": "Midterm",
      "batch": "433",
      "count": 45
    },
    {
      "assessment": "Midterm",
      "batch": "432",
      "count": 44
    },
    {
      "assessment": "Midterm",
      "batch": "431",
      "count": 32
    },
    {
      "assessment": "Midterm",
      "batch": "430",
      "count": 56
    },
    {
      "assessment": "Final",
      "batch": "442",
      "count": 44
    },
    {
      "assessment": "Final",
      "batch": "441",
      "count": 23
    },
    {
      "assessment": "Final",
      "batch": "439",
      "count": 55
    },
    {
      "assessment": "Final",
      "batch": "438",
      "count": 50
    },
    {
      "assessment": "Final",
      "batch": "437",
      "count": 91
    },
    {
      "assessment": "Final",
      "batch": "436",
      "count": 34
    },
    {
      "assessment": "Final",
      "batch": "435",
      "count": 2
    },
    {
      "assessment": "Final",
      "batch": "434",
      "count": 19
    },
    {
      "assessment": "Final",
      "batch": "433",
      "count": 46
    },
    {
      "assessment": "Final",
      "batch": "432",
      "count": 25
    },
    {
      "assessment": "Final",
      "batch": "431",
      "count": 48
    },
    {
      "assessment": "Final",
      "batch": "430",
      "count": 41
    },
    {
      "assessment": "Midterm",
      "batch": "444",
      "count": 104
    },
    {
      "assessment": "Final",
      "batch": "444",
      "count": 38
    }
  ]
};
  window.GIFT445_REPAIR_BANK = questions => {
    const byId = new Map(questions.map(question => [question.id, question]));
    const replacements = new Map();
    const variants = [];
    for (const repair of repairs) {
      const original = byId.get(repair.baseId);
      if (!original) continue;
      const base = { ...original, ...repair.base };
      if (repair.subjectId === 'medicine' && original.assessment === 'Final') {
        base.verification = 'source-only';
        base.explanation = 'The original Gift answer for this occurrence is A: Meningovascular disease. Individual medical verification is pending.';
      }
      replacements.set(base.id, base);
      const variant = { ...original, ...repair.variant, id: repair.variantId, sourceOccurrenceVariantOf: original.id };
      if ('sourceOrder' in variant) variant.sourceOrder = repair.variant.sourceLocations[0].questionNumber;
      delete variant.medicineSourceIntegrity;
      delete variant.surgerySourceIntegrity;
      if (repair.review) {
        variant[repair.subjectId === 'medicine' ? 'medicineReview' : 'surgeryReview'] = repair.review;
        variant.aiAnswer = repair.review.answers[0] || null;
        variant.explanation = repair.review.explanation;
        variant.reviewOpinion = repair.review.explanation;
        variant.aiSuggestion = null;
        variant.giftReview = {
          policy: 'gift-key-first',
          gradingAnswers: variant.sourceAnswer ? [variant.sourceAnswer] : [],
          possibleAnswers: [...repair.review.answers],
          ungradedReason: variant.sourceAnswer ? '' : 'No Gift answer was recorded; the explained answer is not used for scoring.'
        };
      } else {
        variant.verification = 'source-only';
        variant.explanation = 'The original Gift answer for this occurrence is B: Meningovascular disease. Individual medical verification is pending.';
      }
      variants.push(variant);
    }
    return [...questions.map(question => replacements.get(question.id) || question), ...variants];
  };
})();
