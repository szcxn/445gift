/* Medicine Final: original Word source repairs, and individual review of
   Final Batches 438 and 441–443, alongside targeted older-batch corrections. */
(() => {
  "use strict";

  const sourcePatches = {
  "medicine-final-442-neurology-q024": {
    "sourceTables": [
      {
        "rows": [
          [
            "Test ",
            "Patient value ",
            "Normal value "
          ],
          [
            "Hemoglobin ",
            "15",
            "14-18 g/dl"
          ],
          [
            "Leukocytes ",
            "4.5",
            "3.5-12X10^9 /L"
          ],
          [
            "Platelet ",
            "390",
            "150-400X10^9/L"
          ],
          [
            "Creatinine ",
            "92",
            "50-110 UMOL/L"
          ],
          [
            "AST",
            "67",
            "7-40 IU/L"
          ],
          [
            "ALT",
            "91",
            "5-35 IU/L"
          ],
          [
            "CK",
            "763",
            "20-215 IU/L"
          ],
          [
            "LDH",
            "482",
            "45-90 IU/L"
          ]
        ],
        "afterParagraph": 928
      }
    ]
  },
  "batch-medicine-final-442-p927-q24": {
    "sourceTables": [
      {
        "rows": [
          [
            "Test ",
            "Patient value ",
            "Normal value "
          ],
          [
            "Hemoglobin ",
            "15",
            "14-18 g/dl"
          ],
          [
            "Leukocytes ",
            "4.5",
            "3.5-12X10^9 /L"
          ],
          [
            "Platelet ",
            "390",
            "150-400X10^9/L"
          ],
          [
            "Creatinine ",
            "92",
            "50-110 UMOL/L"
          ],
          [
            "AST",
            "67",
            "7-40 IU/L"
          ],
          [
            "ALT",
            "91",
            "5-35 IU/L"
          ],
          [
            "CK",
            "763",
            "20-215 IU/L"
          ],
          [
            "LDH",
            "482",
            "45-90 IU/L"
          ]
        ],
        "afterParagraph": 928
      }
    ]
  },
  "medicine-final-442-endocrinology-q054": {
    "sourceTables": [
      {
        "rows": [
          [
            "Free T4: 29.7 pmol/L (reference range: 11.5-19.7)"
          ],
          [
            "Free T3: 11.o pmol/L (reference range: 3.5-6.5)"
          ],
          [
            "TSH: <0.01 mU/L (reference range: 0.35-5.5)"
          ],
          [
            "TSH receptor antibody: Negative "
          ],
          [
            "RAIU scan: Increased uptake showing a right-sided nodule"
          ],
          [
            "She was counseled for RAI therapy "
          ]
        ],
        "afterParagraph": 1207
      }
    ]
  },
  "batch-medicine-final-442-p1206-q54": {
    "sourceTables": [
      {
        "rows": [
          [
            "Free T4: 29.7 pmol/L (reference range: 11.5-19.7)"
          ],
          [
            "Free T3: 11.o pmol/L (reference range: 3.5-6.5)"
          ],
          [
            "TSH: <0.01 mU/L (reference range: 0.35-5.5)"
          ],
          [
            "TSH receptor antibody: Negative "
          ],
          [
            "RAIU scan: Increased uptake showing a right-sided nodule"
          ],
          [
            "She was counseled for RAI therapy "
          ]
        ],
        "afterParagraph": 1207
      }
    ]
  },
  "medicine-final-442-endocrinology-q056": {
    "sourceTables": [
      {
        "rows": [
          [
            "TSH",
            "0.1 (0.5-4.4)"
          ],
          [
            "Free T4",
            "4 (10-22)"
          ],
          [
            "LH and FSH",
            "Low"
          ],
          [
            "Prolactin",
            "Normal"
          ],
          [
            "IGF-1",
            "Low"
          ]
        ],
        "afterParagraph": 1227
      }
    ]
  },
  "batch-medicine-final-442-p1226-q56": {
    "sourceTables": [
      {
        "rows": [
          [
            "TSH",
            "0.1 (0.5-4.4)"
          ],
          [
            "Free T4",
            "4 (10-22)"
          ],
          [
            "LH and FSH",
            "Low"
          ],
          [
            "Prolactin",
            "Normal"
          ],
          [
            "IGF-1",
            "Low"
          ]
        ],
        "afterParagraph": 1227
      }
    ]
  },
  "medicine-final-442-endocrinology-q066": {
    "sourceTables": [
      {
        "rows": [
          [
            "RBG",
            "370 mg/dl"
          ],
          [
            "Na",
            "130 mmol/l"
          ],
          [
            "K",
            "4 mmol/l"
          ],
          [
            "HCO3",
            "14"
          ],
          [
            "Cl",
            "90 mmol/l"
          ],
          [
            "Cr",
            "140"
          ],
          [
            "Arterial PH",
            "7.25"
          ],
          [
            "Urine ketone ",
            "positive"
          ]
        ],
        "afterParagraph": 1312
      }
    ]
  },
  "batch-medicine-final-442-p1311-q66": {
    "sourceTables": [
      {
        "rows": [
          [
            "RBG",
            "370 mg/dl"
          ],
          [
            "Na",
            "130 mmol/l"
          ],
          [
            "K",
            "4 mmol/l"
          ],
          [
            "HCO3",
            "14"
          ],
          [
            "Cl",
            "90 mmol/l"
          ],
          [
            "Cr",
            "140"
          ],
          [
            "Arterial PH",
            "7.25"
          ],
          [
            "Urine ketone ",
            "positive"
          ]
        ],
        "afterParagraph": 1312
      }
    ]
  },
  "medicine-final-442-endocrinology-q078": {
    "sourceTables": [
      {
        "rows": [
          [
            "Hemoglobin",
            "8.0 g/dL"
          ],
          [
            "Mean Corpuscular Volume (MICV)",
            "72 fl"
          ],
          [
            "Reticulocyte count",
            "1.5%"
          ],
          [
            "Serum ferritin",
            "8 ng/mL"
          ],
          [
            "Transferrin saturation",
            "12%"
          ]
        ],
        "afterParagraph": 1424
      }
    ]
  },
  "batch-medicine-final-442-p1423-q78": {
    "sourceTables": [
      {
        "rows": [
          [
            "Hemoglobin",
            "8.0 g/dL"
          ],
          [
            "Mean Corpuscular Volume (MICV)",
            "72 fl"
          ],
          [
            "Reticulocyte count",
            "1.5%"
          ],
          [
            "Serum ferritin",
            "8 ng/mL"
          ],
          [
            "Transferrin saturation",
            "12%"
          ]
        ],
        "afterParagraph": 1424
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q001": {
    "sourceTables": [
      {
        "rows": [
          [
            "Investigations:"
          ],
          [
            "FSH 30 U/L (follicular 0.5-5, midcycle 8-33, luteal 2-8)"
          ],
          [
            "LH: 76 U/L (follicular 3-12, midcycle 20-80, luteal 3-16)"
          ],
          [
            "Oestradiol 18 pmol/L (follicular 17-260, luteal 180-1100)"
          ],
          [
            "IGF-1 34 nmol/L (16-118)"
          ],
          [
            "Prolactin 902 mU/L (45-375)"
          ],
          [
            "FT4: 8.2 pmol/L (11.5-22.7)"
          ],
          [
            "TSH: 44 mU/L (0.35-5.5)"
          ],
          [
            "Urine for pregnancy test negative"
          ]
        ],
        "afterParagraph": 1454
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q002": {
    "sourceTables": [
      {
        "rows": [
          [
            "Investigations:"
          ],
          [
            "24 urine free cortisol/24 hours 268 nmol/24 hours"
          ],
          [
            "11 p.m. salivary cortisol 6.5 nmol/L"
          ],
          [
            "Adrenocorticotropic hormone 56.7 ng/t"
          ]
        ],
        "afterParagraph": 1464
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q022": {
    "sourceTables": [
      {
        "rows": [
          [
            "Lab Value",
            "Result"
          ],
          [
            "24 hrs Urine Free Cortisol",
            "3x Upper limit of normal"
          ],
          [
            "Late night Serum Cortisol",
            "16 mcg/dL"
          ],
          [
            "Plasma ACTH level",
            "<5 pg/mL"
          ]
        ],
        "afterParagraph": 1638
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q028": {
    "sourceTables": [
      {
        "rows": [
          [
            "Prolactin: 550 mU/L"
          ],
          [
            "Free T4 16.5 pmol/L"
          ],
          [
            "TSH: 0.6 mU/L"
          ],
          [
            "MRI pituitary showed large sellar and suprasellar mass of 1 X 2.5 cm in size"
          ]
        ],
        "afterParagraph": 1690
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q034": {
    "sourceTables": [
      {
        "rows": [
          [
            "CBC wbc 12 x 10(9)/L"
          ],
          [
            "RBC 4 2 cells/mcL"
          ],
          [
            "Hb 7 g/dl"
          ],
          [
            "MCV 67 f"
          ],
          [
            "MCH 21 picograms/cell"
          ],
          [
            "Platelet 250.000"
          ],
          [
            "Retic count 8%"
          ]
        ],
        "afterParagraph": 1744
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q046": {
    "sourceTables": [
      {
        "rows": [
          [
            "Fasting plasma glucose was 300 mg/dl (16.6 mmol/l)"
          ],
          [
            "HBA1C 9.7%"
          ],
          [
            "C-peptide low"
          ],
          [
            "Urinalysis was positive for glucose, trace ketones and white blood cell"
          ],
          [
            "Glutamic acid decarboxylase auto antibodies (GAD antibodies) are positive"
          ]
        ],
        "afterParagraph": 1850
      }
    ]
  },
  "medicine-final-441-hematology-oncology-q080": {
    "sourceTables": [
      {
        "rows": [
          [
            "WBC 11 x 10*9/L"
          ],
          [
            "RBC 4.30 cells/mcL"
          ],
          [
            "HB 7 g/dl (MCV 65, MCH p20)"
          ],
          [
            "Platelet count 200,000"
          ]
        ],
        "afterParagraph": 2151
      }
    ],
    "stem": "A 55-year-old male, Heavy smoker, presented to emergency department compliant of sudden onsets of shortens of breath, headache, and weight loss of 10 Kg over 3 months\nOn Physical examination Look tried, pale no jaundice, no splenomegaly CBC result:\nWhich one of the following is the best next step?"
  },
  "medicine-final-435-neurology-q056": {
    "sourceTables": [
      {
        "rows": [
          [
            "Temperature ",
            "38.1˚C"
          ],
          [
            "BP ",
            "120/70 mmHg"
          ],
          [
            "Pulse rate ",
            "80 per min"
          ],
          [
            "Respiratory rate ",
            "16 per min"
          ]
        ],
        "afterParagraph": 4241
      }
    ],
    "medicineNativeSourceNote": "The Gift document records this case and its vital signs, but gives no question prompt, choices, or answer key.",
    "medicineNativeIncomplete": true,
    "giftReview": {
      "policy": "gift-key-first",
      "gradingAnswers": [],
      "possibleAnswers": [],
      "ungradedReason": "The Gift document records this case and its vital signs, but gives no question prompt, choices, or answer key."
    },
    "options": [],
    "batchReview": {
      "answers": [],
      "confidence": "unresolved",
      "basis": "pending",
      "explanation": "An explanation has not been prepared for this original batch question.",
      "objection": ""
    }
  },
  "batch-medicine-final-435-p3930-q6": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Symmetrical narrowing of the lateral and medial compartments of the knee joint.",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Narrowing of the medial compartment of the knee joint.",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Subchondral bone cysts",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Periarticular bone erosions",
        "images": []
      }
    ],
    "giftReview": {
      "policy": "gift-key-first",
      "gradingAnswers": [
        "B"
      ],
      "possibleAnswers": [],
      "ungradedReason": ""
    }
  },
  "batch-medicine-final-435-p4041-q20": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Lumbar Puncture and the first dose of antibiotics",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Lumbar Puncture then wait for abnormal results and then start antibiotics",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Head CT",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Start empirical antibiotics",
        "images": []
      }
    ],
    "images": [],
    "answerImages": [
      "question-media/medicine/d57b1959fa2bf941260cb4e80b3c61f62c47d1b70be7f5cd3079bea24f23a2c8.png"
    ]
  },
  "batch-medicine-final-435-p4074-q23": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Arrange for urgent CT-scan brain",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Perform urgent LP and if CSF is abnormal, start antibiotics",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Start urgent combination of antibiotic and arrange for CSF study next day",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Urgent CSF study and start the first dose of antibiotics",
        "images": []
      }
    ],
    "giftReview": {
      "policy": "gift-key-first",
      "gradingAnswers": [
        "D"
      ],
      "possibleAnswers": [],
      "ungradedReason": ""
    }
  },
  "batch-medicine-final-433-p5088-q34": {
    "options": [
      {
        "id": "A",
        "text": "CT scan if normal do LP if CSF abnormal start combination antibiotics",
        "images": []
      },
      {
        "id": "B",
        "text": "Urgent LP if abnormal CSF start combination antibiotics.",
        "images": []
      },
      {
        "id": "C",
        "text": "Urgent LP and start combination antibiotics.",
        "images": []
      },
      {
        "id": "D",
        "text": "Start antiviral therapy",
        "images": []
      }
    ],
    "stem": "A 23 year old male complaining of fever and headache. Examination shows temp 38 and neck stiffness. Neural examination and funduscopic examinations are normal. Which one of  the following is the appropriate step?"
  },
  "batch-medicine-final-431-p5623-q7": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Dermatitis secondary to skin contact with a chemical gent",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Direct contact with a patient who has viral infection",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Reactivation of an old virus that was dormant in the dorsal nerve root ganglion",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Reactivation of an old fungal infection that was dormant in the skin",
        "images": []
      }
    ]
  },
  "medicine-final-441-rheumatology-q074": {
    "stem": "A 30-year-old woman has had joint pain and swelling in her hands and feet for four weeks. She also had pain and swelling in her large joints, and rash on the face. Her symptoms have partially responded to nonsteroidal anti-inflammatory drugs. She has not had back pain, chest pain, shortness of breath, nor neurologic symptoms. On physical examination, temperature is 37 °C (98.6 F), pulse rate is 82 per minute, and blood pressure is 112/76 mmHg. Weight is 79 kg (175 lbs.). Cardiopulmonary and neurologic examinations are normal. The hands and feet have multiple swollen joints. A diagnosis of systemic lupus erythematosus was made based on the above, lymphopenia, thrombocytopenia, positive antinuclear antibodies and Deoxyribonucleic acid.\nWhich one of the following is your next treatment for her condition?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Belimumab 200mg subcutaneously once weekly",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Hydroxychloroquine 400mg daily",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Prednisolone 40 mg once daily",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "NSAIDS xxxxx mg xxxx",
        "images": []
      }
    ]
  },
  "medicine-final-441-infectious-diseases-q076": {
    "stem": "A 28-year-old female is admitted to the hospital with fever, malaise, and diffuse joint pain. She had a mechanical mitral valve placed 3 years ago. 1. Her initial blood culture revealed Methicillin Resistant Staphylococcus Aureus.\nWhich one of the following isolation precautions should be applied to the patient?"
  },
  "medicine-final-441-endocrinology-q078": {
    "stem": "A 46-year-old man is evaluated for a right lateral neck mass. He first noted the mass while shaving 2 weeks ago. He does not have hoarseness or difficulty swallowing. Medical history is significant only for hypertension. His only medication is hydrochlorothiazide. On physical examination, blood pressure is 165/95 mmHg, pulse rate is 88/min, and respiration rate is 12/min. There is a firm 2-cm mass in the right lateral neck and a mobile 1-cm right thyroid nodule. Ultrasound of the neck reveals a hypoechoic thyroid nodule with micro-calcifications measuring 1.6 cm. There is a 2.2-cm mass with internal calcifications in the area of the palpable abnormality.\nTSH 4 pU/mL. (0.5-5)\nWhich one of the following is the most appropriate next step in management?"
  },
  "medicine-final-435-infectious-diseases-q020": {
    "images": [],
    "answerImages": [
      "question-media/medicine/final-435-q020.png"
    ]
  },
  "batch-medicine-final-435-p4241-q56": {
    "medicineNativeSourceNote": "The Gift document records this case and its vital signs, but gives no question prompt, choices, or answer key.",
    "medicineNativeIncomplete": true,
    "giftReview": {
      "policy": "gift-key-first",
      "gradingAnswers": [],
      "possibleAnswers": [],
      "ungradedReason": "The Gift document records this case and its vital signs, but gives no question prompt, choices, or answer key."
    }
  },
  "medicine-final-443-infectious-diseases-q032": {
    "stem": "A 30-year-old man returning from Malaysia 2 weeks ago presented to the emergency room with fever for 2 days with confusion over the past 6 hours and a witnessed episode of tonic clonic seizure. Vital signs: T 39.6°C, P 127, RR 25, BP 80/50 mmg. Looks unwell, obtunded, no neck stiffness, no neurological deficit, abdominal exam showed positive Castell's sign. Which one of the following is the most likely organism causing his illness?"
  },
  "batch-medicine-final-443-p338-q32": {
    "stem": "A 30-year-old man returning from Malaysia 2 weeks ago presented to the emergency room with fever for 2 days with confusion over the past 6 hours and a witnessed episode of tonic clonic seizure. Vital signs: T 39.6°C, P 127, RR 25, BP 80/50 mmg. Looks unwell, obtunded, no neck stiffness, no neurological deficit, abdominal exam showed positive Castell's sign. Which one of the following is the most likely organism causing his illness?"
  },
  "medicine-final-443-rheumatology-q012": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "no pain at night",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "1> hour back pain",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "increase with exercise",
        "images": []
      },
      {
        "id": "B2",
        "sourceLabel": "B",
        "text": "relief with rest",
        "images": []
      }
    ]
  },
  "medicine-final-443-endocrinology-q038": {
    "options": []
  },
  "medicine-final-443-endocrinology-q046": {
    "sourceAnswer": "A"
  },
  "medicine-final-443-neurology-q062": {
    "sourceAnswer": null,
    "sourceAnswerNote": "C? , not sure about the whole question"
  },
  "medicine-final-442-neurology-q023": {
    "stem": "Which one of the following are these cerebral spinal fluid patterns consistent with?"
  },
  "batch-medicine-final-441-p1897-q51": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Gabapentin",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Phenobarbital",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Sodium valproate",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Lamotrigine",
        "images": []
      }
    ]
  },
  "medicine-final-441-mixed-medicine-q051": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Gabapentin",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Phenobarbital",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Sodium valproate",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Lamotrigine",
        "images": []
      }
    ],
    "stem": "The chances of severe life-threatening skin reactions such as Stevens-Johnson syndrome are greatest with which one of the following anticonvulsant medications?"
  },
  "medicine-final-441-mixed-medicine-q013": {
    "options": []
  },
  "medicine-final-439-endocrinology-q025": {
    "sourceAnswer": "A"
  },
  "medicine-final-439-hematology-oncology-q059": {
    "sourceAnswer": "B"
  },
  "batch-medicine-final-434-p4413-q1": {
    "sourceAnswer": "A"
  },
  "medicine-final-434-rheumatology-q001": {
    "sourceAnswer": "A"
  },
  "batch-medicine-final-437-p3186-q13": {
    "options": [
      {
        "id": "A",
        "text": "C-section with IV Acyclovir"
      },
      {
        "id": "B",
        "text": "Vaginal delivery"
      },
      {
        "id": "C",
        "text": "Oral Acyclovir and delivery her at 42 weeks"
      },
      {
        "id": "D",
        "text": "C-section only"
      }
    ]
  },
  "medicine-final-429-pulmonary-q007": {
    "stem": "A 19 year old boy with a history of IV drug abuse developed fever. Diagnosed to have subacute bacterial endocarditis. What is the most common causative organism in this case?",
    "options": [
      {
        "id": "A",
        "text": "Staph aureus",
        "images": []
      },
      {
        "id": "B",
        "text": "Enterococcus",
        "images": []
      },
      {
        "id": "C",
        "text": "H. influenza",
        "images": []
      },
      {
        "id": "D",
        "text": "Strep.viridans",
        "images": []
      }
    ]
  },
  "batch-medicine-final-429-p5976-q7": {
    "stem": "A 19 year old boy with a history of IV drug abuse developed fever. Diagnosed to have subacute bacterial endocarditis. What is the most common causative organism in this case?",
    "options": [
      {
        "id": "A",
        "text": "Staph aureus",
        "images": []
      },
      {
        "id": "B",
        "text": "Enterococcus",
        "images": []
      },
      {
        "id": "C",
        "text": "H. influenza",
        "images": []
      },
      {
        "id": "D",
        "text": "Strep.viridans",
        "images": []
      }
    ]
  },
  "medicine-final-429-pulmonary-q012": {
    "stem": "A 40 years old man, known to have HIV infection for many years, presented to ER complaining of progressive shortness of breath, dry cough for 2 months. He lost about 10 kg of weight in the last 4 months. On examination found to be febrile. Respiratory rate 25/ min chest examination revealed scattered fine crepitations, chest X-ray shows diffuse bilateral interstitial infiltrates. O2 saturation on room air was 89%. The most likely diagnosis of the patient condition is:",
    "options": [
      {
        "id": "A",
        "text": "Pneumococcal pneumonia",
        "images": []
      },
      {
        "id": "B",
        "text": "CMV pneumonia",
        "images": []
      },
      {
        "id": "C",
        "text": "Pneumocystis jiroveci (carinii) pneumonia",
        "images": []
      },
      {
        "id": "D",
        "text": "Pulmonary tuberculosis",
        "images": []
      }
    ],
    "sourceAnswer": "C",
    "sourceAnswerNote": "C"
  },
  "batch-medicine-final-429-p6012-q12": {
    "stem": "A 40 years old man, known to have HIV infection for many years, presented to ER complaining of progressive shortness of breath, dry cough for 2 months. He lost about 10 kg of weight in the last 4 months. On examination found to be febrile. Respiratory rate 25/ min chest examination revealed scattered fine crepitations, chest X-ray shows diffuse bilateral interstitial infiltrates. O2 saturation on room air was 89%. The most likely diagnosis of the patient condition is:",
    "options": [
      {
        "id": "A",
        "text": "Pneumococcal pneumonia",
        "images": []
      },
      {
        "id": "B",
        "text": "CMV pneumonia",
        "images": []
      },
      {
        "id": "C",
        "text": "Pneumocystis jiroveci (carinii) pneumonia",
        "images": []
      },
      {
        "id": "D",
        "text": "Pulmonary tuberculosis",
        "images": []
      }
    ],
    "sourceAnswer": "C",
    "sourceAnswerNote": "C"
  },
  "medicine-final-429-endocrinology-q016": {
    "stem": "A 55 year old lady medically free presented to the outpatient clinic with a long standing history of bone pain especially at the back . Her routine labs included a bone profile that was normal, and an Xray spine that showed osteopenia with wedge fracture at L4. What is the next most appropriate diagnostic test?",
    "options": [
      {
        "id": "A",
        "text": "Vit D level",
        "images": []
      },
      {
        "id": "B",
        "text": "Spine MRI",
        "images": []
      },
      {
        "id": "C",
        "text": "Dexa spine",
        "images": []
      }
    ]
  },
  "batch-medicine-final-429-p6044-q16": {
    "stem": "A 55 year old lady medically free presented to the outpatient clinic with a long standing history of bone pain especially at the back . Her routine labs included a bone profile that was normal, and an Xray spine that showed osteopenia with wedge fracture at L4. What is the next most appropriate diagnostic test?",
    "options": [
      {
        "id": "A",
        "text": "Vit D level",
        "images": []
      },
      {
        "id": "B",
        "text": "Spine MRI",
        "images": []
      },
      {
        "id": "C",
        "text": "Dexa spine",
        "images": []
      }
    ]
  },
  "medicine-final-429-neurology-q040": {
    "stem": "A 18year old female presents with a history of SOB on exertion , fatigue and palpitation. She was previously well and there is no family history of blood disorders . O/E she was found to have pallor . mild tinge of jaundice . The tip of the spleen is palpable on abdominal examination.\nCBC showed: WBC 10.3 (normal differential ). Hb 7.6, MCV 101 fl. and platelets 388\nreticulocytes count high 6.\nWhat is the most likely diagnosis?",
    "options": [
      {
        "id": "A",
        "text": "Acute leukemia",
        "images": []
      },
      {
        "id": "B",
        "text": "Hemolytic anemia",
        "images": []
      }
    ]
  },
  "batch-medicine-final-429-p6231-q40": {
    "stem": "A 18year old female presents with a history of SOB on exertion , fatigue and palpitation. She was previously well and there is no family history of blood disorders . O/E she was found to have pallor . mild tinge of jaundice . The tip of the spleen is palpable on abdominal examination.\nCBC showed: WBC 10.3 (normal differential ). Hb 7.6, MCV 101 fl. and platelets 388\nreticulocytes count high 6.\nWhat is the most likely diagnosis?",
    "options": [
      {
        "id": "A",
        "text": "Acute leukemia",
        "images": []
      },
      {
        "id": "B",
        "text": "Hemolytic anemia",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q032": {
    "sourceAnswer": "B",
    "sourceAnswerNote": "B"
  },
  "batch-medicine-final-432-p5464-q32": {
    "sourceAnswer": "B",
    "sourceAnswerNote": "B",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Bone metastasis with an unknown primary",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Primary hyperparathyroidism with brown tumors",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Severe vitamin D deficiency with secondary hyperparathyroidism",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Unknown diagnosis of chronic renal failure with renal osteodystrophy",
        "images": []
      }
    ]
  },
  "medicine-final-433-infectious-diseases-q010": {
    "stem": "What is the most likely organism that would infect a person after eating shawarma?",
    "options": [
      {
        "id": "A",
        "text": "E Coli",
        "images": []
      },
      {
        "id": "B",
        "text": "Salmonella",
        "images": []
      },
      {
        "id": "C",
        "text": "Staphylococcus Aureus",
        "images": []
      },
      {
        "id": "D",
        "text": "S. Pneumonia",
        "images": []
      }
    ]
  },
  "medicine-final-433-infectious-diseases-q017": {
    "stem": "Which of the following can be used in case of uncomplicated falciparum infection?",
    "options": [
      {
        "id": "A",
        "text": "Atovaquone-proguanil",
        "images": []
      },
      {
        "id": "B",
        "text": "Chloroquine",
        "images": []
      },
      {
        "id": "C",
        "text": "Hydroxychloroquine",
        "images": []
      },
      {
        "id": "D",
        "text": "Penicillin G",
        "images": []
      }
    ]
  },
  "medicine-final-433-endocrinology-q022": {
    "stem": "Which ONE of the following is the best initial management for patient with acromegaly?",
    "options": [
      {
        "id": "A",
        "text": "Bromocriptine",
        "images": []
      },
      {
        "id": "B",
        "text": "Radiotherapy",
        "images": []
      },
      {
        "id": "C",
        "text": "Surgical removal of the adenoma",
        "images": []
      },
      {
        "id": "D",
        "text": "Chemotherapy",
        "images": []
      }
    ]
  },
  "medicine-final-433-endocrinology-q023": {
    "stem": "What's the most common chronic complication of DM in Saudi Arabia?",
    "options": [
      {
        "id": "A",
        "text": "Neuropathy",
        "images": []
      },
      {
        "id": "B",
        "text": "Nephropathy",
        "images": []
      },
      {
        "id": "C",
        "text": "Retinopathy",
        "images": []
      },
      {
        "id": "D",
        "text": "Vasculopathy",
        "images": []
      }
    ]
  },
  "medicine-final-433-endocrinology-q024": {
    "stem": "What is the most common side effect of insulin in type 1 diabetic patients?",
    "options": [
      {
        "id": "A",
        "text": "Lipohypertrophy",
        "images": []
      },
      {
        "id": "B",
        "text": "Lower limb edema",
        "images": []
      },
      {
        "id": "C",
        "text": "Skin Allergy",
        "images": []
      },
      {
        "id": "D",
        "text": "Skin hyperpigmentation",
        "images": []
      }
    ]
  },
  "medicine-final-433-endocrinology-q031": {
    "stem": "A 30 year old female patient came to the clinic with truncal obesity, purple striae,  hypertension, diabetes and amenorrhea. What is the most common cause of her presentation?",
    "options": [
      {
        "id": "A",
        "text": "Adrenal cortical adenoma",
        "images": []
      },
      {
        "id": "B",
        "text": "Anterior pituitary adenoma",
        "images": []
      },
      {
        "id": "C",
        "text": "Ectopic ACTH producing tumor",
        "images": []
      },
      {
        "id": "D",
        "text": "Steroid or cortisone therapy",
        "images": []
      }
    ]
  },
  "medicine-final-433-endocrinology-q032": {
    "stem": "A 28‐year­‐old female Patient presented with hyperprolactinemia, what is the management?",
    "options": [
      {
        "id": "A",
        "text": "Dopamine agonist",
        "images": []
      },
      {
        "id": "B",
        "text": "Conservatives",
        "images": []
      },
      {
        "id": "C",
        "text": "Surgery",
        "images": []
      },
      {
        "id": "D",
        "text": "Dopamine antagonist",
        "images": []
      }
    ]
  },
  "medicine-final-433-neurology-q038": {
    "stem": "Which of the following is the drug of choice in case of absent seizure?",
    "options": [
      {
        "id": "A",
        "text": "Ethosuximide",
        "images": []
      },
      {
        "id": "B",
        "text": "Valproate",
        "images": []
      },
      {
        "id": "C",
        "text": "Lamotrigine",
        "images": []
      },
      {
        "id": "D",
        "text": "Phenytoin + Valproate",
        "images": []
      }
    ]
  },
  "medicine-final-433-neurology-q041": {
    "stem": "Patient with ptosis and Ach receptors autoantibodies, what is the diagnosis?",
    "options": [
      {
        "id": "A",
        "text": "Myasthenia Gravis",
        "images": []
      },
      {
        "id": "B",
        "text": "Hashimoto thyroiditis",
        "images": []
      },
      {
        "id": "C",
        "text": "Motor neuron disease",
        "images": []
      },
      {
        "id": "D",
        "text": "Multiple sclerosis",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q023": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Arrange for urgent CT-scan brain",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Perform urgent LP and if CSF is abnormal, start antibiotics",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Start urgent combination of antibiotic and arrange for CSF study next day",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Urgent CSF study and start the first dose of antibiotics",
        "images": []
      }
    ],
    "stem": "A16 year-old male patient who presented with a 3-day history of high grade fever and  severe headache. Examination revealed Temperature: 39°C and positive neck stiffness, otherwise  fully conscious and has no neurological deficit.\nWhich ONE of the following management plans is the most appropriate in the first 24 hours?"
  },
  "batch-medicine-final-435-p4256-q59": {
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Anterior part of superior temporal gyrus",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Left middle frontal gyrus",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Posterior part of inferior frontal gyrus in the dominant hemisphere",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Transcortical motor fibers to middle frontal gyrus in the dominant hemisphere",
        "images": []
      }
    ],
    "sourceAnswer": "C",
    "sourceAnswerNote": "C"
  },
  "medicine-final-441-mixed-medicine-q048": {
    "stem": "A 64-year-old man in the evaluated because of abnormal thyroid function tests done during routine checkup. On physical examination, temperature is 36.8°C (101.8°F), blood pressure is 105/60 mmHg, and pulse rate is 80/min. The skin is warm and dry. There is no proptosis. Examination of the neck shows a normal-sized thyroid without nodules. Cardiovascular examination reveals regular HR of 70. On neurologic examination, reflexes are slightly delayed.\nTSH 7 uU/mL (0.5-5)\nFT4: 13 pmol/L (9-22)\nWhich one of the following is the most appropriate diagnosis?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Subclinical hyperthyroidism",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Subclinical hypothyroidism",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Hypothyroidism",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Hyperthyroidism",
        "images": []
      }
    ]
  },
  "medicine-final-441-neurology-q075": {
    "stem": "A 60-year-old woman presents with a 1-year history of gradually progressing difficulty talking. She pauses frequently when she talks and drops words from sentences making her speech non-fluent. She frequently mispronounces words and has difficulty repeating sentences. Her comprehension appears to be intact, and her memory is normal.\nWhich one of the following on neuroimaging you would expect to find?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Occipital and parietal atrophy on the left",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Bilateral temporal and parietal atrophy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Left frontal atrophy",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Both, cortical and basal ganglia atrophy",
        "images": []
      }
    ]
  },
  "medicine-final-439-rheumatology-q005": {
    "stem": "A 50-year-old Filipino male diagnosed with gout came to the hospital with tophi. Which of the following is the first line urate lowering agent ?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Allopurinol",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Probenecid",
        "images": []
      }
    ]
  },
  "medicine-final-439-rheumatology-q007": {
    "stem": "36-year-old patient with gradual back pain. Which one of the following is an inflammatory feature of back pain?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Worse with exercise",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Worse with sitting",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Stiffness that lasts for less than 20 minutes",
        "images": []
      }
    ]
  },
  "medicine-final-439-rheumatology-q010": {
    "stem": "A 40 year old lady with systemic sclerosis for the last 10 years. She has a limited type complicated by digital ulcers and pulmonary hypertension. She has a new ulcer. Which of the following is the most appropriate treatment?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Sildenafil",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Enalapril",
        "images": []
      }
    ]
  },
  "medicine-final-439-infectious-diseases-q011": {
    "stem": "A patient came to you for advice on the vaccines required prior  to traveling to Cameroon. Which vaccine would you recommend?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Yellow fever",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Meningococcal",
        "images": []
      }
    ],
    "sourceAnswer": [
      "A",
      "B"
    ],
    "sourceAnswerNote": "A&B (Both are correct)"
  },
  "medicine-final-439-infectious-diseases-q017": {
    "stem": "A 75 y/o inpatient woman had a grade I bedsore. It was not discharging pus. Microbiological analysis is evident for MRSA. The patient does not have a fever and appears to be well. What is the next step in her management?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Surgical debridement",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Vancomycin",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Contact precautions",
        "images": []
      }
    ]
  },
  "medicine-final-439-infectious-diseases-q022": {
    "stem": "Another similar question (positive castell’s sign + tonic clonic seizure) but instead of asking about the agent they asked about the treatment",
    "options": []
  },
  "medicine-final-439-endocrinology-q029": {
    "stem": "Which one of the following psychological diseases is associated with high LDL?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Depressions",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Anorexia nervosa",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Anxiety",
        "images": []
      }
    ]
  },
  "medicine-final-439-neurology-q037": {
    "stem": "A patient presenting to the ER with neck stiffness, and sensitivity  to light. Upon examination, he shows no signs of neurological symptoms. What is the most appropriate next step?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "IV broad-spectrum antibiotics",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Perform LP",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Perform CT",
        "images": []
      }
    ],
    "sourceAnswer": [
      "A",
      "B"
    ],
    "sourceAnswerNote": "A&B (Both are correct)"
  },
  "medicine-final-439-neurology-q041": {
    "stem": "A left-handed 46-year-old man presents with a troublesome resting tremor of his left hand. The tremor is evident in his writing. He has also noticed his writing is smaller than it used to be. He complains of falling frequently before his tremor started. When he gets out of bed in the morning he feels a little woozy,  but  this  resolves after a while. Which of the following features indicates poor prognosis in his case?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Age",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Early falls",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Tremors",
        "images": []
      }
    ]
  },
  "medicine-final-439-neurology-q043": {
    "stem": "A 32 year old lady experienced neck pain after minor trauma. 3 days later she developed right side weakness and numbness and broca’s aphasia. Which of the following statements is most appropriate to this case?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Carotid dissection followed by embolus to the MCA",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Thrombolytics are absolute contraindications because of the recent trauma",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Start thrombolytic therapy",
        "images": []
      }
    ]
  },
  "medicine-final-439-neurology-q050": {
    "stem": "Patient presented with 2 months of right leg pain. He also has back pain. On physical examination he had muscle power of 4/5 in dorsiflexion, eversion and inversion. And had 5/5 in ankle flexion, knee flexion and extension, hip flexion and extension, and hip adduction.  He also showed sensory deficits with the pinprick test but had a normal vibration test. What is the most likely diagnosis?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "L5 radiculopathy",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "S1 radiculopathy",
        "images": []
      }
    ]
  },
  "medicine-final-439-hematology-oncology-q056": {
    "stem": "A lady presented with mucocutaneous bleeding and heavy  menstrual periods Platelet counts were normal and the PTT was  elevated while PT was normal. What's the next step in diagnosis?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Von Willebrand",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Mixing study",
        "images": []
      }
    ]
  },
  "medicine-final-439-hematology-oncology-q064": {
    "stem": "A 30-year-old woman came to the clinic complaining of a mass in her left breast, after examination of the breast there was no clinical finding (the breast is normal). Ultrasound and mammogram were normal. What would you do next",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Reassure the patient",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Obtain a biopsy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Do genetic study braca",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q011": {
    "stem": "What is the most common organism causing vascular line infection?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Coagulase negative staphylococcus",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Staph aureus",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Streptococcus viridans",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Streptococcus epidermis",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q018": {
    "stem": "A 21-year-old Patient case about Recurrent herpes labialis. What is the treatment?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Acyclovir",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Ganciclovir",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Amoxicillin",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Ribavirin",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q019": {
    "stem": "The best treatment for patient present with rash in one side of mouth and ear and chest",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Acyclovir",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "famciclovir",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Ganciclovir",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Ribavirin",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q024": {
    "stem": "Which ONE of the following tumors is linked with Epstein-Barr virus?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Burkitt's lymphoma",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Cutaneous lymphoma",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Follicular lymphoma",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Multiple myeloma",
        "images": []
      }
    ]
  },
  "medicine-final-435-infectious-diseases-q025": {
    "stem": "Which ONE of the following cells are the target for the HIV virus?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "CD7 receptor containing cells",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "CD4 receptor containing cells",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "CD8 receptor containing cells",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "CD20 receptor containing cells",
        "images": []
      }
    ]
  },
  "medicine-final-435-endocrinology-q038": {
    "stem": "Which of the following drugs is known to cause hyperprolactinemia?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Phenothiazine",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Atenolol",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "hydrochlorothiazide",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "propranolol",
        "images": []
      }
    ]
  },
  "medicine-final-435-endocrinology-q044": {
    "stem": "Which ONE of the following is an original precursor of norepinephrine?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "cholesterol",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Dehydroepiandrosterone",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Epinephrine",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Tyrosine",
        "images": []
      }
    ]
  },
  "medicine-final-435-endocrinology-q045": {
    "stem": "Which ONE of the following is the most common cause of Cushing syndrome?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "ACTH secreting pituitary adenoma",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Cortisol secreting Adrenal adenoma",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Iatrogenic",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Idiopathic",
        "images": []
      }
    ]
  },
  "medicine-final-435-endocrinology-q047": {
    "stem": "A 38-year-old male patient presented with headache and visual field deficit. Investigation showed a large (macro) pituitary adenoma and high IGF-1. Growth hormone was not suppressed by oral glucose tolerance test. He was diagnosed with acromegaly. Which ONE of the following is the treatment of choice in acromegaly?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Dopamine agonists",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Radiotherapy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Somatostatin analog",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Surgery",
        "images": []
      }
    ]
  },
  "medicine-final-435-neurology-q055": {
    "stem": "A patient came into the ER with a mild neck stiffness and 6 cranial nerve palsy. CSF analysis showed WBC 100 cells/µL with 90%  lymphocytes, normal protein and glucose, negative gram stain. AFB smear is negative, TB PCR is  negative.\nWhich ONE of the following empirical antimicrobial combinations would you start?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Ceftriaxone and vancomycin.",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Ceftriaxone, vancomycin and dexamethasone.",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Doxycycline, rifampin and ciprofloxacin.",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "INH, rifampin, pyrazinamide, ethambutol and dexamethasone.",
        "images": []
      }
    ]
  },
  "medicine-final-435-neurology-q057": {
    "stem": "Which ONE of the following complications is associated with thrombolysis for acute stroke?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Intracranial Hemorrhage",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Difficulty to wean off sedation",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Vascular dissection caused by mechanical thrombectomy",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Worsening of cytotoxic edema",
        "images": []
      }
    ]
  },
  "medicine-final-435-hematology-oncology-q062": {
    "stem": "40-year male has irritable bowel syndrome with chronic constipation, intestinal TB, which  one of the following is a risk factor for developing colon cancer?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Intestinal TB",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Chronic constipation",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "IBS",
        "images": []
      },
      {
        "id": "D2",
        "sourceLabel": "D",
        "text": "His age",
        "images": []
      }
    ]
  },
  "medicine-final-434-rheumatology-q003": {
    "stem": "Which one of the following autoantibodies is associated with dermatomyositis?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Anti-centromere",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Anti-Jo-1",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Anti-Smith",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Anti-SSA",
        "images": []
      }
    ]
  },
  "medicine-final-434-rheumatology-q004": {
    "stem": "Which one of the following rashes is pathognomonic for dermatomyositis?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Gottron’s rash",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Malar rash",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Photosensitive rash",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Purpuric rash",
        "images": []
      }
    ]
  },
  "medicine-final-434-infectious-diseases-q014": {
    "stem": "HIV is spread in Saudi Arabia through which one of the following routes?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Drug abusers",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Sexual",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Blood products",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Vertical",
        "images": []
      }
    ]
  },
  "medicine-final-434-endocrinology-q016": {
    "stem": "What is the MOST COMMON adverse event of insulin in type 1 diabetes?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Hypoglycemia",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Lipohypertrophy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Skin allergy",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "hypercoagulability",
        "images": []
      }
    ]
  },
  "medicine-final-434-hematology-oncology-q042": {
    "stem": "A 35 years old patient presented with intra-abdominal bleeding. He had a history of  frequent trips intramuscular bleeding since childhood. His laboratory data was significant with  prolonged Activated Partial Thromboplastin (APTT) clotting at 100 seconds with normal  prothrombin time (PT) and INR, CBC are normal.\nWhich one of the following is the most appropriate next investigation to order?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Manual platelet count",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Mixing study",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Peripheral blood morphology",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Platelet function test",
        "images": []
      }
    ]
  },
  "medicine-final-432-infectious-diseases-q006": {
    "stem": "Which one of the following malarial species is associated with the highest mortality?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Falciparum",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Vivax",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Ovale",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Malariae",
        "images": []
      }
    ]
  },
  "medicine-final-432-infectious-diseases-q007": {
    "stem": "Which one of the following viruses is the cause of Kaposi sarcoma?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "HIV",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "HHV8",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "EBV",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "CMV",
        "images": []
      }
    ]
  },
  "medicine-final-432-infectious-diseases-q008": {
    "stem": "Which one of the following presents with a rash in all the developmental stages?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Chicken pox",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Measles",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Rubella",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Rift Valley hemorrhagic fever",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q012": {
    "stem": "What is the best predictive value of chronic complication in diabetic patients?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Glycated hemoglobin.",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "high fasting blood glucose level",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Urine dipstick 5g/dl",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Start using insulin",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q013": {
    "stem": "Which of the following is the commonest complication of type II diabetes?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Neuropathy",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Nephropathy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Vasculopathy",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Retinopathy",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q014": {
    "stem": "Which ONE of the following is a pathological feature of type 1 diabetes mellitus?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Insulin destruction",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Insulin resistance",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Destruction of beta cells",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Glucose disposal in the liver",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q017": {
    "stem": "Which ONE of the following is the best initial management for patients with acromegaly?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Bromocriptine",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Radiotherapy",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Surgical removal of the adenoma",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Chemotherapy",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q019": {
    "stem": "Which ONE of the following is the best determinant of Energy expenditure?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Amount of food",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Basal metabolic rate",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Body temperature",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Leptin release",
        "images": []
      }
    ]
  },
  "medicine-final-432-endocrinology-q031": {
    "stem": "Decreased level of consciousness with hypothermia is a feature of what?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Adrenal crisis",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Infection",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Diabetic ketoacidosis",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Pheochromocytoma",
        "images": []
      }
    ]
  },
  "medicine-final-431-rheumatology-q001": {
    "stem": "Which one of the following is a characteristic skin manifestation of SLE?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Heliotrope rash.",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Telangiectasia.",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Malar rash.",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Palpable purpura.",
        "images": []
      }
    ]
  },
  "medicine-final-431-infectious-diseases-q005": {
    "stem": "Which one of the following is a poor prognostic indicator in Falciparum malaria ?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Increasing serum creatinine",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Low bilirubin serum level",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "High alkaline phosphatase",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Hypocalcemia",
        "images": []
      }
    ]
  },
  "medicine-final-431-endocrinology-q013": {
    "stem": "Which ONE of the following is the most common endocrine causes of obesity?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Growth hormone deficiency.",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Cushing syndrome.",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Excessive caloric intake.",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Adrenal insufficiency .",
        "images": []
      }
    ]
  },
  "medicine-final-431-endocrinology-q019": {
    "stem": "Which of the following is the most common metabolic complications of obesity ?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Osteoarthritis .",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Obstructive sleep apnea .",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Colon cancer.",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Diabetes mellitus.",
        "images": []
      }
    ]
  },
  "medicine-final-431-endocrinology-q021": {
    "stem": "Which ONE of the following is the commonest visual defect in acromegaly?",
    "options": [
      {
        "id": "A",
        "sourceLabel": "A",
        "text": "Bitemporal hemianopia",
        "images": []
      },
      {
        "id": "B",
        "sourceLabel": "B",
        "text": "Homonymous hemianopia",
        "images": []
      },
      {
        "id": "C",
        "sourceLabel": "C",
        "text": "Tunnel vision",
        "images": []
      },
      {
        "id": "D",
        "sourceLabel": "D",
        "text": "Amaurosis fugax",
        "images": []
      }
    ]
  }
};
  const references = {
  "pleural": {
    "title": "ESC/ERS Guideline on Acute Pulmonary Embolism",
    "url": "https://academic.oup.com/eurheartj/article/41/4/543/5556136"
  },
  "celiac": {
    "title": "British Society of Gastroenterology 2026 Coeliac Disease Guideline",
    "url": "https://doi.org/10.1136/gutjnl-2025-337747"
  },
  "ra": {
    "title": "American College of Rheumatology 2021 Rheumatoid Arthritis Guideline",
    "url": "https://doi.org/10.1002/acr.24596"
  },
  "fda-jak": {
    "title": "FDA Drug Safety Communication on JAK Inhibitors",
    "url": "https://www.fda.gov/safety/medical-product-safety-information/janus-kinase-jak-inhibitors-drug-safety-communication-fda-requires-warnings-about-increased-risk"
  },
  "axspa": {
    "title": "NICE Spondyloarthritis Diagnosis and Management",
    "url": "https://www.nice.org.uk/guidance/ng65/chapter/recommendations"
  },
  "asas": {
    "title": "ASAS Imaging Referral Recommendations",
    "url": "https://ard.bmj.com/content/83/12/1636"
  },
  "ssc": {
    "title": "ACR/EULAR Systemic Sclerosis Classification Criteria",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3930146/"
  },
  "ssc-ild": {
    "title": "ACR/CHEST Guideline for Screening and Monitoring Rheumatic Disease–Associated ILD",
    "url": "https://doi.org/10.1002/acr.25347"
  },
  "ra-class": {
    "title": "ACR/EULAR Rheumatoid Arthritis Classification Criteria",
    "url": "https://doi.org/10.1002/art.27584"
  },
  "ra-hla": {
    "title": "Raychaudhuri et al. Genetic Association Study of Seropositive Rheumatoid Arthritis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22286218/"
  },
  "sle": {
    "title": "EULAR/ACR Classification Criteria for Systemic Lupus Erythematosus",
    "url": "https://doi.org/10.1002/art.40930"
  },
  "lupus-kidney": {
    "title": "KDIGO 2024 Lupus Nephritis Guideline, Diagnosis of Kidney Involvement",
    "url": "https://kdigo.org/wp-content/uploads/2024/01/KDIGO-2024-Lupus-Nephritis-Guideline.pdf"
  },
  "tb": {
    "title": "CDC Clinical Symptoms of Tuberculosis",
    "url": "https://www.cdc.gov/tb/hcp/clinical-signs-and-symptoms/index.html"
  },
  "cauti": {
    "title": "CDC Guideline for Prevention of Catheter-Associated Urinary Tract Infections",
    "url": "https://www.cdc.gov/infection-control/hcp/cauti/summary-of-recommendations.html"
  },
  "clabsi-old": {
    "title": "CDC Epidemiology and Microbiology of Catheter-Related Infection",
    "url": "https://www.cdc.gov/infection-control/hcp/intravascular-catheter-related-infection/epidemiology-microbiology.html"
  },
  "clabsi-new": {
    "title": "CDC NHSN Adult CLABSI Pathogens by Location, 2018–2021",
    "url": "https://www.cdc.gov/nhsn/hai-report/data-tables-adult/table-4.html"
  },
  "vap": {
    "title": "SHEA/IDSA/APIC 2022 Strategies to Prevent Ventilator-Associated Pneumonia",
    "url": "https://doi.org/10.1017/ice.2022.88"
  },
  "typhoid": {
    "title": "CDC Yellow Book, Typhoid and Paratyphoid Fever",
    "url": "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/typhoid-and-paratyphoid-fever.html"
  },
  "brucellosis": {
    "title": "CDC Clinical Overview of Brucellosis",
    "url": "https://www.cdc.gov/brucellosis/hcp/clinical-overview/"
  },
  "dengue": {
    "title": "CDC Clinical Testing Guidance for Dengue",
    "url": "https://www.cdc.gov/dengue/hcp/diagnosis-testing/"
  },
  "leish": {
    "title": "IDSA/ASTMH Clinical Practice Guidelines for Leishmaniasis",
    "url": "https://doi.org/10.1093/cid/ciw670"
  },
  "mers": {
    "title": "CDC Clinical Overview of Middle East Respiratory Syndrome",
    "url": "https://www.cdc.gov/mers/hcp/clinical-overview/index.html"
  },
  "ghana": {
    "title": "CDC Travelers’ Health, Ghana Entry Requirements",
    "url": "https://wwwnc.cdc.gov/travel/destinations/traveler/none/Ghana"
  },
  "melioidosis": {
    "title": "Anunnatsiri et al. Mycotic Aneurysm in Northeast Thailand",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18937581/"
  },
  "malaria": {
    "title": "CDC Clinical Guidance for Malaria Evaluation and Diagnosis",
    "url": "https://www.cdc.gov/malaria/hcp/clinical-guidance/evaluation-diagnosis.html"
  },
  "knowlesi": {
    "title": "Malaysia Ministry of Health, Management Guidelines of Malaria",
    "url": "https://www.moh.gov.my/moh/resources/Penerbitan/Garis%20Panduan/Pengurusan%20KEsihatan%20%26%20kawalan%20pykit/Management_Guidelines_of_Malaria_in_Malaysia_%28Final%29.pdf"
  },
  "saudihiv": {
    "title": "Alrajhi et al. Mode of Transmission of HIV-1 in Saudi Arabia",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15199329/"
  },
  "hivtest": {
    "title": "CDC HIV Testing Window Periods",
    "url": "https://www.cdc.gov/hiv/testing/index.html"
  },
  "art": {
    "title": "NIH Adult and Adolescent HIV Guidelines, Initiation of Antiretroviral Therapy",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/initiation-antiretroviral-therapy"
  },
  "art-regimen": {
    "title": "NIH Adult and Adolescent HIV Guidelines, Initial Combination Regimens",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/what-start-initial-combination-regimens"
  },
  "pep": {
    "title": "CDC 2025 Nonoccupational HIV Postexposure Prophylaxis Recommendations",
    "url": "https://www.cdc.gov/mmwr/volumes/74/rr/rr7401a1.htm"
  },
  "pregnancy-ra": {
    "title": "EULAR 2024 Recommendations for Antirheumatic Drugs in Reproduction and Pregnancy",
    "url": "https://pubmed.ncbi.nlm.nih.gov/40287311/"
  },
  "diet": {
    "title": "American Heart Association Diet and Lifestyle Recommendations",
    "url": "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/aha-diet-and-lifestyle-recommendations"
  },
  "ppgl": {
    "title": "Endocrine Society Guideline on Pheochromocytoma and Paraganglioma",
    "url": "https://doi.org/10.1210/jc.2014-1498"
  },
  "phpt": {
    "title": "Fifth International Workshop Guidelines for Primary Hyperparathyroidism",
    "url": "https://doi.org/10.1002/jbmr.4677"
  },
  "thyroid": {
    "title": "American Thyroid Association Thyroid Nodule Guideline",
    "url": "https://doi.org/10.1089/thy.2015.0020"
  },
  "diabetes": {
    "title": "ADA Standards of Care 2026, Diagnosis and Classification",
    "url": "https://doi.org/10.2337/dc26-s002"
  },
  "diabetes-meds": {
    "title": "ADA Standards of Care 2026, Pharmacologic Treatment",
    "url": "https://doi.org/10.2337/dc26-s009"
  },
  "diabetes-weight": {
    "title": "ADA Standards of Care 2026, Weight Management",
    "url": "https://doi.org/10.2337/dc26-s008"
  },
  "aldosterone": {
    "title": "Endocrine Society 2025 Primary Aldosteronism Guideline",
    "url": "https://www.endocrine.org/clinical-practice-guidelines/primary-aldosteronism-2"
  },
  "adrenal": {
    "title": "Endocrine Society Primary Adrenal Insufficiency Guideline",
    "url": "https://doi.org/10.1210/jc.2015-1710"
  },
  "pituitary": {
    "title": "Endocrine Society Guideline on Hormone Replacement in Hypopituitarism",
    "url": "https://doi.org/10.1210/jc.2016-2118"
  },
  "prolactinoma": {
    "title": "Pituitary Society Consensus Statement on Prolactin-Secreting Adenomas",
    "url": "https://doi.org/10.1038/s41574-023-00886-5"
  },
  "diabetes-screen": {
    "title": "USPSTF Screening Recommendation for Prediabetes and Type 2 Diabetes",
    "url": "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-for-prediabetes-and-type-2-diabetes"
  },
  "lipid": {
    "title": "ACC/AHA 2026 Guideline on Management of Dyslipidemia",
    "url": "https://doi.org/10.1161/CIR.0000000000001423"
  },
  "tg": {
    "title": "ACC Expert Consensus Pathway for Persistent Hypertriglyceridemia",
    "url": "https://doi.org/10.1016/j.jacc.2021.06.011"
  },
  "pd-dyskinesia": {
    "title": "AAN Practice Guideline on Dopaminergic Therapy in Early Parkinson Disease",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8672433/"
  },
  "pd": {
    "title": "Movement Disorder Society Clinical Diagnostic Criteria for Parkinson’s Disease",
    "url": "https://escholarship.org/uc/item/1zd719dv"
  },
  "stroke": {
    "title": "AHA/ASA 2026 Guideline for Early Management of Acute Ischemic Stroke",
    "url": "https://doi.org/10.1161/STR.0000000000000513"
  },
  "ilae": {
    "title": "International League Against Epilepsy 2025 Seizure Classification",
    "url": "https://doi.org/10.1111/epi.18338"
  },
  "epilepsy-preg": {
    "title": "AAN/AES/SMFM Guideline on Antiseizure Medication in Pregnancy",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11175651/"
  },
  "saudi-stroke": {
    "title": "Subtypes of Ischemic Stroke, Arabian Gulf Registry",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20875650/"
  },
  "lhermitte": {
    "title": "Lhermitte’s Sign in Multiple Sclerosis, Clinical Survey",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC491365/"
  },
  "huntington": {
    "title": "European Huntington’s Disease Network International Treatment Guideline",
    "url": "https://doi.org/10.3389/fneur.2019.00710"
  },
  "meningitis": {
    "title": "WHO Guidelines on Meningitis Diagnosis, Treatment and Care",
    "url": "https://www.who.int/publications/i/item/9789240108042"
  },
  "neck-pain": {
    "title": "Clinical Practice Guideline for Nonspecific Neck Pain",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12620902/"
  },
  "apl": {
    "title": "European LeukemiaNet Recommendations for Acute Promyelocytic Leukemia",
    "url": "https://doi.org/10.1182/BLOOD-2019-01-894980"
  },
  "itp": {
    "title": "Updated International Consensus on Primary Immune Thrombocytopenia",
    "url": "https://doi.org/10.1182/bloodadvances.2019000812"
  },
  "lung-screen": {
    "title": "USPSTF Lung Cancer Screening Recommendation",
    "url": "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/lung-cancer-screening"
  },
  "thrombophilia": {
    "title": "ASH 2023 Guideline on Thrombophilia Testing in Venous Thromboembolism",
    "url": "https://doi.org/10.1182/bloodadvances.2023010177"
  },
  "pleural-infection": {
    "title": "British Thoracic Society 2023 Guideline for Pleural Disease",
    "url": "https://doi.org/10.1136/thorax-2022-219784"
  },
  "gn": {
    "title": "KDIGO Clinical Practice Guideline for Glomerular Diseases",
    "url": "https://kdigo.org/wp-content/uploads/2021/10/KDIGO-2021-Guideline-for-the-Management-of-Glomerular-Diseases.pdf"
  },
  "tremor": {
    "title": "International Parkinson and Movement Disorder Society Consensus on Tremor",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6530552/"
  },
  "memory": {
    "title": "Alzheimer’s Association Guideline on Diagnostic Evaluation of Cognitive Symptoms",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12173843/"
  },
  "gbs": {
    "title": "European Academy of Neurology and Peripheral Nerve Society Guillain–Barré Guideline",
    "url": "https://doi.org/10.1111/ene.16073"
  },
  "vascular-cognition": {
    "title": "VASCOG Criteria for Vascular Cognitive Disorders",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4139434/"
  },
  "ppa": {
    "title": "Consensus Classification of Primary Progressive Aphasia and Its Variants",
    "url": "https://doi.org/10.1212/WNL.0b013e31821103e6"
  },
  "ebv": {
    "title": "Bjornevik et al. Longitudinal Study of Epstein–Barr Virus and Multiple Sclerosis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35025605/"
  },
  "delirium": {
    "title": "NICE Guideline on Delirium, Diagnosis and Management",
    "url": "https://www.nice.org.uk/guidance/cg103/chapter/recommendations"
  },
  "ssc-paht": {
    "title": "ESC/ERS Pulmonary Hypertension Guideline",
    "url": "https://doi.org/10.1093/eurheartj/ehac237"
  },
  "oa": {
    "title": "American College of Rheumatology and Arthritis Foundation Osteoarthritis Guideline",
    "url": "https://doi.org/10.1002/acr.24131"
  },
  "axspa-treatment": {
    "title": "ASAS/EULAR Recommendations for the Management of Axial Spondyloarthritis",
    "url": "https://doi.org/10.1136/ard-2022-223296"
  },
  "syphilis": {
    "title": "CDC Syphilis Treatment Guidance",
    "url": "https://www.cdc.gov/std/treatment-guidelines/syphilis.htm"
  },
  "severe-malaria": {
    "title": "CDC Treatment of Severe Malaria",
    "url": "https://www.cdc.gov/malaria/hcp/clinical-guidance/iv-artesunate-us.html"
  },
  "dengue-vector": {
    "title": "CDC Dengue Transmission",
    "url": "https://www.cdc.gov/dengue/transmission/"
  },
  "baricitinib-zoster": {
    "title": "Long-Term Extension Study of Baricitinib Safety in Rheumatoid Arthritis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8862028/"
  },
  "knowlesi-study": {
    "title": "Rajahram et al. Knowlesi Malaria in Sabah, Malaysia",
    "url": "https://wwwnc.cdc.gov/eid/article/22/1/15-1305_article"
  },
  "ata-pregnancy": {
    "title": "American Thyroid Association 2026 Pregnancy and Postpartum Guideline",
    "url": "https://doi.org/10.1177/10507256261445624"
  },
  "obesity-endocrine": {
    "title": "European Society of Endocrinology Guideline for Endocrine Work-up in Obesity",
    "url": "https://academic.oup.com/ejendo/article/182/1/G1/6653910"
  },
  "bariatric": {
    "title": "ASMBS/IFSO Indications for Metabolic and Bariatric Surgery",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9834364/"
  },
  "weight-adapt": {
    "title": "Leibel et al. Controlled Study of Weight Change and Energy Expenditure",
    "url": "https://doi.org/10.1056/NEJM199503093321001"
  },
  "cushing": {
    "title": "Endocrine Society Guideline on Diagnosis of Cushing Syndrome",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2386281/"
  },
  "lipemia": {
    "title": "Clinical Image Report of Lipemia Retinalis",
    "url": "https://doi.org/10.1056/NEJM199906243402506"
  },
  "dka": {
    "title": "ISPAD Guideline for Diabetic Ketoacidosis in Children and Adolescents",
    "url": "https://doi.org/10.1111/pedi.13406"
  },
  "insulin-peds": {
    "title": "ISPAD 2024 Guideline for Insulin Therapy in Children and Adolescents",
    "url": "https://www.ispad.org/static/3b8e00b2-9f33-43a5-a84f9eda1accef64/ICPCG-Chapter-9-2024.pdf"
  },
  "breast-pain": {
    "title": "ACR Appropriateness Criteria for Breast Pain",
    "url": "https://gravitas.acr.org/ACPortal/GetDataForOneTopic?topicId=204"
  },
  "aml": {
    "title": "European LeukemiaNet Recommendations for Adult Acute Myeloid Leukemia",
    "url": "https://doi.org/10.1182/blood.2022016867"
  },
  "aplastic": {
    "title": "British Society for Haematology 2024 Guideline for Adult Aplastic Anaemia",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38247114/"
  },
  "iron": {
    "title": "ASH 2026 Guideline for Diagnosis of Iron Deficiency",
    "url": "https://doi.org/10.1182/bloodadvances.2025015950"
  },
  "septic-joint": {
    "title": "EBJIS Guideline for Septic Arthritis in Native Joints (SANJO)",
    "url": "https://jbji.copernicus.org/articles/8/29/2023/"
  },
  "asb": {
    "title": "IDSA Guideline for Asymptomatic Bacteriuria",
    "url": "https://www.idsociety.org/practice-guideline/asymptomatic-bacteriuria/"
  },
  "diabetes-ckd": {
    "title": "ADA Standards of Care 2026, Chronic Kidney Disease and Risk Management",
    "url": "https://doi.org/10.2337/dc26-s011"
  },
  "af": {
    "title": "ESC 2024 Atrial Fibrillation Management Guideline",
    "url": "https://doi.org/10.1093/eurheartj/ehae176"
  },
  "hypocalcemia": {
    "title": "Society for Endocrinology Emergency Guidance for Acute Hypocalcaemia",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5314808/"
  },
  "secondary-htn": {
    "title": "ESC 2024 Guideline on Elevated Blood Pressure and Hypertension",
    "url": "https://doi.org/10.1093/eurheartj/ehae178"
  },
  "neuropathy": {
    "title": "American Diabetes Association Position Statement on Peripheral Neuropathy",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6977405/"
  },
  "cmt": {
    "title": "Clinical Practice Guideline for Charcot–Marie–Tooth Disease",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38431252/"
  },
  "adem": {
    "title": "International Pediatric Multiple Sclerosis Study Group Revised Definitions",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23572237/"
  },
  "ane": {
    "title": "Poyiadji et al. Imaging of Acute Hemorrhagic Necrotizing Encephalopathy",
    "url": "https://doi.org/10.1148/radiol.2020201187"
  },
  "radial": {
    "title": "Han et al. Study of Wrist Drop After Compressive Radial Neuropathy",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4024814/"
  },
  "optic": {
    "title": "Optic Neuritis Study Group, Clinical Profile of Acute Optic Neuritis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/1841573/"
  },
  "dermatomyositis": {
    "title": "EULAR/ACR Idiopathic Inflammatory Myopathy Classification Criteria",
    "url": "https://doi.org/10.1002/art.40320"
  },
  "aphasia": {
    "title": "American Speech-Language-Hearing Association Aphasia Classification",
    "url": "https://www.asha.org/practice-portal/clinical-topics/aphasia/"
  },
  "carpal": {
    "title": "American Academy of Orthopaedic Surgeons Carpal Tunnel Syndrome Guideline",
    "url": "https://www.aaos.org/ctscpg"
  },
  "sle-clinical": {
    "title": "American College of Rheumatology Overview of Lupus Symptoms",
    "url": "https://rheumatology.org/patients/lupus"
  },
  "ms-relapse": {
    "title": "NICE Multiple Sclerosis Guideline, Recognition of a Relapse",
    "url": "https://www.nice.org.uk/guidance/ng220/chapter/recommendations"
  },
  "crc-risk": {
    "title": "American Cancer Society Colorectal Cancer Risk Factors",
    "url": "https://www.cancer.org/cancer/types/colon-rectal-cancer/causes-risks-prevention/risk-factors.html"
  },
  "constipation-cohort": {
    "title": "Nurses’ Health Study and Health Professionals Follow-up Study on Bowel Habits and Colorectal Cancer",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23456271/"
  },
  "acromegaly": {
    "title": "Endocrine Society Clinical Practice Guideline on Acromegaly",
    "url": "https://doi.org/10.1210/jc.2014-2700"
  },
  "obesity-inflammation": {
    "title": "Hotamisligil et al. Experimental Study of Adipose Tumor Necrosis Factor and Insulin Resistance",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7678183/"
  },
  "lymphoma-treatment": {
    "title": "National Cancer Institute Professional Summary on Adult Hodgkin Lymphoma",
    "url": "https://www.cancer.gov/types/lymphoma/hp/adult-hodgkin-treatment-pdq"
  },
  "lymphoma-dx": {
    "title": "Lugano Classification Recommendations for Lymphoma Evaluation",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25113753/"
  },
  "cancer-vte": {
    "title": "AHA/ACC Multisociety 2026 Guideline for Acute Pulmonary Embolism",
    "url": "https://doi.org/10.1016/j.jacc.2025.11.005"
  },
  "fap": {
    "title": "ACG Guideline on Adenomatous Colorectal Polyposis Syndromes",
    "url": "https://doi.org/10.14309/ajg.0000000000004105"
  },
  "microcytosis": {
    "title": "Thalassaemia International Federation Diagnostic and Management Guidelines",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9345633/"
  },
  "breast-risk": {
    "title": "National Cancer Institute Professional Summary on Breast Cancer Prevention",
    "url": "https://www.cancer.gov/types/breast/hp/breast-prevention-pdq"
  },
  "all": {
    "title": "European LeukemiaNet 2024 Recommendations for Diagnosis of Adult Acute Lymphoblastic Leukemia",
    "url": "https://ashpublications.org/blood/article/143/19/1891/514792/Diagnosis-prognostic-factors-and-assessment-of-ALL"
  },
  "all-nccn": {
    "title": "NCCN Adult Acute Lymphoblastic Leukemia, Version 2.2025",
    "url": "https://jnccn.org/downloadpdf/view/journals/jnccn/23/2/article-p41.pdf"
  },
  "pancreas-risk": {
    "title": "National Cancer Institute Pancreatic Cancer Risk Factors",
    "url": "https://www.cancer.gov/types/pancreatic/causes-risk-factors"
  },
  "bmi": {
    "title": "CDC Body Mass Index and Its Limitations",
    "url": "https://www.cdc.gov/bmi/about/index.html"
  },
  "warfarin": {
    "title": "DailyMed Warfarin Sodium Prescribing Information, Mechanism of Action",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7fdfd870-e72d-4d88-b6d9-1d711b66d09f"
  },
  "diabetic-foot": {
    "title": "ADA Standards of Care 2026, Neuropathy and Foot Care",
    "url": "https://doi.org/10.2337/dc26-s012"
  },
  "sle-treatment": {
    "title": "EULAR 2023 Recommendations for Systemic Lupus Erythematosus Management",
    "url": "https://doi.org/10.1136/ard-2023-224762"
  },
  "mrsa": {
    "title": "CDC Infection Control Guidance for MRSA in Healthcare Facilities",
    "url": "https://www.cdc.gov/mrsa/hcp/infection-control/index.html"
  },
  "transfusion": {
    "title": "2023 AABB International Red Blood Cell Transfusion Guidelines",
    "url": "https://doi.org/10.1001/jama.2023.12914"
  },
  "critical-covid": {
    "title": "WHO Living Guideline on Drugs for COVID-19 — treatment in critical illness",
    "url": "https://www.bmj.com/content/370/bmj.m3379"
  },
  "htn-retina": {
    "title": "Multicenter study of serous retinal detachment in malignant hypertension",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31089238/"
  },
  "skin-tumor": {
    "title": "NCI Melanoma Treatment PDQ — stage III regional nodal disease",
    "url": "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq"
  },
  "iron-gi": {
    "title": "AGA Guideline on Gastrointestinal Evaluation of Iron Deficiency Anemia",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33387528/"
  },
  "nmosd": {
    "title": "International NMOSD Diagnostic Criteria — serum AQP4-IgG",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26092914/"
  },
  "all-febrile": {
    "title": "SEIFEM prospective study of febrile events in adult ALL",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29411126/"
  },
  "ms-criteria": {
    "title": "2024 McDonald Criteria for Multiple Sclerosis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/40975101/"
  },
  "lamotrigine": {
    "title": "DailyMed Lamotrigine — boxed warning on serious skin reactions",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=811188be-d231-4b58-8d7a-b01b236fab51"
  },
  "saudi-cancer": {
    "title": "IARC GLOBOCAN 2022 Saudi Arabia — incidence by sex",
    "url": "https://gco.iarc.who.int/media/globocan/factsheets/populations/682-saudi-arabia-fact-sheet.pdf"
  },
  "lewy": {
    "title": "DLB Consortium Consensus Report — diagnosis of dementia with Lewy bodies",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28592453/"
  },
  "asbestos": {
    "title": "WHO Asbestos — related malignancies",
    "url": "https://www.who.int/news-room/fact-sheets/detail/asbestos"
  },
  "cauti-rank": {
    "title": "CDC NHSN — CAUTI pathogens reported in adults by location, 2018–2021",
    "url": "https://www.cdc.gov/nhsn/hai-report/data-tables-adult/table-5.html"
  },
  "cdiff-hands": {
    "title": "CDC Hand Hygiene in Healthcare — C. difficile and outbreaks",
    "url": "https://www.cdc.gov/clean-hands/hcp/clinical-safety/"
  },
  "prolactin-2023": {
    "title": "Pituitary Society International Consensus on Prolactinomas (2023)",
    "url": "https://www.nature.com/articles/s41574-023-00886-5"
  },
  "cushing-local": {
    "title": "Pituitary Society Consensus on Diagnosis and Management of Cushing's Disease",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8743006/"
  },
  "gout": {
    "title": "ACR Gout Management Guideline — first-line flare therapy",
    "url": "https://doi.org/10.1002/acr.24180"
  },
  "ssc-cancer": {
    "title": "Systemic Sclerosis Autoantibodies and Cancer Timing — Johns Hopkins cohort",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25605296/"
  },
  "subclinical-thyroid": {
    "title": "European Thyroid Association Guidance on Subclinical Hypothyroidism",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3923601/"
  },
  "lymphoma-who": {
    "title": "WHO Classification of Haematolymphoid Tumours — lymphoid neoplasms",
    "url": "https://www.nature.com/articles/s41375-022-01620-2"
  },
  "med445-svt": {
    "title": "MED445 Team · L1 Arrhythmia, PDF page 7 · Acute stable SVT",
    "url": "https://drive.google.com/file/d/1oiXZeZR0sMo5rux0Su_GM34EA9MqDsT9/view#page=7"
  },
  "med445-pe": {
    "title": "MED445 Team · L4 Pulmonary Embolism, PDF page 3 · Source of thrombus",
    "url": "https://drive.google.com/file/d/100IrSHb3kq2ix4PODXfV77VYND6sNen2/view#page=3"
  },
  "med445-les": {
    "title": "MED445 · Esophageal Diseases, slide 5 · Related LES anatomy",
    "url": "https://drive.google.com/file/d/1ASGJ6coz5zjKw-RcJC9z-9i_A_yMBwnJ/view#page=5"
  },
  "med445-gerd": {
    "title": "MED445 · Esophageal Diseases, slide 15 · Alarm symptoms and endoscopy",
    "url": "https://drive.google.com/file/d/1ASGJ6coz5zjKw-RcJC9z-9i_A_yMBwnJ/view#page=15"
  },
  "les-study": {
    "title": "Mittal et al. · Manometric and anatomical study of LES and crural diaphragm",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28572086/"
  },
  "gerd-acg": {
    "title": "ACG GERD Guideline · Evaluation of alarm symptoms",
    "url": "https://doi.org/10.14309/ajg.0000000000001538"
  },
  "ssi": {
    "title": "CDC Guideline for Prevention of Surgical-Site Infection",
    "url": "https://stacks.cdc.gov/view/cdc/79361"
  },
  "encephalitis": {
    "title": "IDSA Guideline for Management of Encephalitis",
    "url": "https://www.idsociety.org/practice-guideline/encephalitis/"
  },
  "bcg": {
    "title": "WHO BCG Vaccine Position Paper · Evidence relating to meningeal and miliary disease",
    "url": "https://www.who.int/docs/default-source/immunization/position_paper_documents/tuberculosis-%28bcg%29/pp-bcg-references-2018.pdf"
  },
  "cll": {
    "title": "International Workshop on CLL Guidelines · FISH findings",
    "url": "https://doi.org/10.1182/blood-2017-09-806398"
  },
  "pza": {
    "title": "DailyMed Pyrazinamide · Hyperuricemia and gout",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f1d97cb1-8072-4503-84c6-fe7f2fd3fd48"
  },
  "thyrotoxicosis": {
    "title": "American Thyroid Association Guideline on Hyperthyroidism and Thyrotoxicosis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27521067/"
  },
  "stroke-subtypes": {
    "title": "Lille Stroke Registry · Severity and outcome of ischemic stroke subtypes",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38723923/"
  },
  "sjogren": {
    "title": "EULAR Recommendations for Management of Sjögren Syndrome",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31672775/"
  },
  "svt-ehra": {
    "title": "European Heart Rhythm Association Consensus on Supraventricular Arrhythmias",
    "url": "https://academic.oup.com/europace/article/19/3/465/2631183"
  },
  "pd-treatment": {
    "title": "American Academy of Neurology Guideline on Dopaminergic Therapy in Early Parkinson Disease",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34782410/"
  },
  "polypectomy": {
    "title": "National Polyp Study · Long-Term Colorectal Cancer Prevention After Polypectomy",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22356322/"
  },
  "tocilizumab": {
    "title": "DailyMed ACTEMRA · IL-6 receptor mechanism of action",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13"
  },
  "enoxaparin": {
    "title": "DailyMed Lovenox · Factor Xa and Factor IIa activity",
    "url": "https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=3d263380-4f44-4fd8-aa2a-e69702ab258f&type=display"
  },
  "bronchiectasis-ers": {
    "title": "ERS 2025 Guideline for Management of Adult Bronchiectasis",
    "url": "https://doi.org/10.1183/13993003.01126-2025"
  },
  "pancreatitis-acg": {
    "title": "ACG Guideline for Management of Acute Pancreatitis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38857482/"
  },
  "iga-kdigo": {
    "title": "KDIGO 2025 Guideline on IgA Nephropathy — biopsy-based diagnosis",
    "url": "https://kdigo.org/wp-content/uploads/2025/09/KDIGO-2025-IgAN-IgAV-Guideline.pdf"
  },
  "copeptin": {
    "title": "Prospective Multicenter Study on Differentiating Diabetes Insipidus and Primary Polydipsia",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30067922/"
  },
  "nephrotic-child": {
    "title": "KDIGO Clinical Guideline for Nephrotic Syndrome in Children",
    "url": "https://kdigo.org/guidelines/nephrotic-syndrome-in-children/"
  },
  "cm429-felty": {
    "title": "QJM · Clinical Report of Rheumatoid Arthritis With Felty Syndrome",
    "url": "https://doi.org/10.1093/qjmed/hcad222"
  },
  "cm429-oa-nice": {
    "title": "NICE · Osteoarthritis Diagnosis and Management",
    "url": "https://www.nice.org.uk/guidance/ng226/chapter/recommendations"
  },
  "cm429-tb-cause": {
    "title": "CDC · Clinical Overview of Tuberculosis",
    "url": "https://www.cdc.gov/tb/hcp/clinical-overview/"
  },
  "cm429-ie445": {
    "title": "MED445 · L6 Infective Endocarditis, PDF page 5",
    "url": "https://drive.google.com/file/d/1cGRWA7UUq9GVswbmSwvuOnMhUgdaAr59/view#page=5"
  },
  "cm429-meningococcal": {
    "title": "CDC · Meningococcal Disease, Chemoprophylaxis of Close Contacts",
    "url": "https://www.cdc.gov/surv-manual/php/table-of-contents/chapter-8-meningococcal-disease.html"
  },
  "cm429-pcp": {
    "title": "NIH · Pneumocystis Pneumonia in People With HIV",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis"
  },
  "cm429-aids": {
    "title": "CDC · HIV Infection Surveillance Case Definition",
    "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6303a1.htm"
  },
  "cm429-transplant-uti": {
    "title": "American Society of Transplantation · Urinary Tract Infections in Solid Organ Transplant Recipients",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30793386/"
  },
  "cm429-dxa": {
    "title": "Bone Health and Osteoporosis Foundation · Clinician’s Guide to Osteoporosis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9546973/"
  },
  "cm429-myxedema": {
    "title": "Society for Endocrinology · Joint Consensus Statement on Myxoedema Coma",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13452032/"
  },
  "cm429-hypothyroid": {
    "title": "NICE · Thyroid Disease Assessment and Management",
    "url": "https://www.nice.org.uk/guidance/ng145/chapter/recommendations"
  },
  "cm429-hypoglycemia": {
    "title": "ADA Standards of Care 2026 · Glycemic Goals and Hypoglycemia",
    "url": "https://doi.org/10.2337/dc26-s006"
  },
  "cm429-nph": {
    "title": "Japanese Society of Normal Pressure Hydrocephalus · Clinical Guidelines",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  "cm429-ms-onset": {
    "title": "Suknjaja et al. · Early Onset of Multiple Sclerosis, Clinical Features",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11827390/"
  },
  "cm429-ms-visual": {
    "title": "Multicenter Study · Initial Clinical Symptoms and Time to Multiple Sclerosis Diagnosis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12406396/"
  },
  "cm429-absence": {
    "title": "ILAE · Typical Absence Seizure Overview",
    "url": "https://www.epilepsydiagnosis.org/seizure/absence-typical-overview.html"
  },
  "cm429-pons": {
    "title": "Pontine Infarct Resulting in Millard-Gubler Syndrome · Clinical Case and Localization",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10010748/"
  },
  "cm429-migraine": {
    "title": "ARIC Cohort · Ischemic Stroke Subtypes and Migraine With Visual Aura",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27956563/"
  },
  "cm429-icp": {
    "title": "ABN Consensus · Signs of Raised Intracranial Pressure",
    "url": "https://jnnp.bmj.com/content/89/10/1088"
  },
  "cm429-ipi": {
    "title": "International Non-Hodgkin Lymphoma Prognostic Factors Project · Original IPI Study",
    "url": "https://doi.org/10.1056/NEJM199309303291402"
  },
  "cm429-neutropenic": {
    "title": "European Conference on Infections in Leukaemia · Empirical Antimicrobial Therapy for Febrile Neutropenia",
    "url": "https://www.sciencedirect.com/science/article/pii/S147330992500619X"
  },
  "cm429-vwd": {
    "title": "ASH/ISTH/NHF/WFH · Diagnosis of von Willebrand Disease",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7805340/"
  },
  "cm429-hemolysis": {
    "title": "ARUP Consult · Hemolytic Anemias and Laboratory Findings",
    "url": "https://arupconsult.com/content/hemolytic-anemias"
  },
  "cm429-g6pd": {
    "title": "British Society for Haematology · Laboratory Diagnosis of G6PD Deficiency",
    "url": "https://doi.org/10.1111/bjh.16366"
  },
  "cm429-cll": {
    "title": "European Hematology Association · Chronic Lymphocytic Leukemia Guidelines",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13254007/"
  },
  "cm429-iron-inflammation": {
    "title": "Blood · Anemia of Inflammation, Laboratory Evaluation",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6536698/"
  },
  "r-pcp": {
    "title": "NIH · Pneumocystis Pneumonia in Adults and Adolescents With HIV",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis"
  },
  "r-shingles": {
    "title": "CDC · Clinical Overview of Herpes Zoster",
    "url": "https://www.cdc.gov/shingles/hcp/clinical-overview/"
  },
  "r-travel": {
    "title": "CDC Yellow Book · Malaria and Prevention in Travelers",
    "url": "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/malaria.html"
  },
  "r-acromegaly": {
    "title": "Acromegaly Consensus Group · Criteria for Diagnosis and Remission",
    "url": "https://pubmed.ncbi.nlm.nih.gov/37923946/"
  },
  "r-thyrotox": {
    "title": "American Thyroid Association · Guidelines for Hyperthyroidism and Thyrotoxicosis",
    "url": "https://doi.org/10.1089/thy.2016.0229"
  },
  "r-hypothy": {
    "title": "American Thyroid Association · Guidelines for Treatment of Hypothyroidism",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25266247/"
  },
  "r-neurop": {
    "title": "ADA Standards of Care 2026 · Retinopathy, Neuropathy, and Foot Care",
    "url": "https://doi.org/10.2337/dc26-s012"
  },
  "r-tbdiag": {
    "title": "ATS, CDC and IDSA · Diagnosis of Tuberculosis in Adults and Children",
    "url": "https://www.idsociety.org/practice-guideline/diagnosis-of-tb-in-adults-and-children/"
  },
  "r-hodgkin": {
    "title": "NCI · Hodgkin Lymphoma Staging and Treatment",
    "url": "https://www.cancer.gov/types/lymphoma/hp/adult-hodgkin-treatment-pdq"
  },
  "r-menses": {
    "title": "ACOG · Heavy Menstrual Bleeding in Adolescents",
    "url": "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2019/09/screening-and-management-of-bleeding-disorders-in-adolescents-with-heavy-menstrual-bleeding"
  },
  "r-sickle": {
    "title": "GeneReviews · Sickle Cell Disease",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK1377/"
  },
  "r-tnm": {
    "title": "NCI · Cancer Staging and TNM",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/staging"
  },
  "r-myosit": {
    "title": "EULAR and ACR · Criteria for Idiopathic Inflammatory Myopathies",
    "url": "https://doi.org/10.1002/art.40320"
  },
  "r-sjogren": {
    "title": "Sjögren Foundation · Guideline for Peripheral Nervous System Manifestations",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13313102/"
  },
  "r-sjogren-cns": {
    "title": "Original Cohort · CNS Demyelinating Events in Primary Sjögren Syndrome",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36873454/"
  },
  "r-ebv": {
    "title": "CDC · Clinical Overview of Epstein–Barr Virus",
    "url": "https://www.cdc.gov/epstein-barr/hcp/clinical-overview/index.html"
  },
  "r-breast": {
    "title": "NCI · Inflammatory Breast Cancer",
    "url": "https://www.cancer.gov/types/breast/breast-cancer-types/inflammatory"
  },
  "r-cmt": {
    "title": "GeneReviews · Charcot–Marie–Tooth Hereditary Neuropathy",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK1358/"
  },
  "r-encephalitis": {
    "title": "IDSA · Management of Encephalitis",
    "url": "https://www.idsociety.org/practice-guideline/encephalitis/"
  },
  "r-cll": {
    "title": "International Workshop on CLL · Diagnostic Guidelines",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29540348/"
  },
  "r-ich": {
    "title": "AHA and ASA · Guideline for Spontaneous Intracerebral Hemorrhage",
    "url": "https://doi.org/10.1161/STR.0000000000000407"
  },
  "r-germ-cell": {
    "title": "NCI · Testicular Cancer Treatment",
    "url": "https://www.cancer.gov/types/testicular/hp/testicular-treatment-pdq"
  },
  "r-hemo": {
    "title": "World Federation of Hemophilia · Management of Hemophilia Guidelines",
    "url": "https://guidelines.wfh.org/guidelines/about-the-wfh-guidelines/"
  },
  "r-ra-neck": {
    "title": "Original surgical cohort · Cervical spine subluxation in rheumatoid arthritis",
    "url": "https://doi.org/10.1136/ard.2005.042135"
  },
  "low-back-acr": {
    "title": "ACR Appropriateness Criteria for Low Back Pain — low-velocity trauma and elderly patients",
    "url": "https://acsearch.acr.org/list/TopicNarrativePdf?topicId=141"
  },
  "kaposi": {
    "title": "National Cancer Institute · Kaposi Sarcoma PDQ",
    "url": "https://www.cancer.gov/types/soft-tissue-sarcoma/hp/kaposi-treatment-pdq"
  },
  "varicella": {
    "title": "CDC · Clinical Features of Varicella",
    "url": "https://www.cdc.gov/chickenpox/hcp/clinical-signs/index.html"
  },
  "t2-complications": {
    "title": "DISCOVER study · Microvascular and macrovascular outcomes across type 2 diabetes populations",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34666013/"
  },
  "basal-metabolism": {
    "title": "FAO/WHO/UNU Expert Consultation · Human Energy Requirements",
    "url": "https://www.fao.org/4/Y5686E/y5686e04.htm"
  },
  "leptin": {
    "title": "Farooqi et al. · Physiologic Effects of Leptin Replacement in Congenital Leptin Deficiency",
    "url": "https://pubmed.ncbi.nlm.nih.gov/12393845/"
  },
  "myxedema": {
    "title": "Joint Endocrine Society Consensus on Management of Myxoedema Coma",
    "url": "https://pubmed.ncbi.nlm.nih.gov/42466568/"
  },
  "dmd": {
    "title": "NCBI GeneReviews · Dystrophinopathies, mode of inheritance",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK1119/"
  },
  "hodgkin-nci": {
    "title": "NCI · Hodgkin Lymphoma PDQ, symptoms and staging",
    "url": "https://www.cancer.gov/types/lymphoma/hp/adult-hodgkin-treatment-pdq"
  },
  "neutropenic-fever": {
    "title": "ASCO/IDSA Guideline on Fever and Neutropenia in Adults With Cancer",
    "url": "https://www.idsociety.org/practice-guideline/fever-and-neutropenia-in-adults-with-cancer/"
  },
  "cm433-ra-cspine": {
    "title": "López-Olivo et al. · Cervical Spine Radiographs in Rheumatoid Arthritis Undergoing Anesthesia",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22334269/"
  },
  "cm433-zoster": {
    "title": "WHO · Shingles Clinical Features and Treatment",
    "url": "https://www.who.int/news-room/fact-sheets/detail/shingles-%28herpes-zoster%29"
  },
  "cm433-shawarma": {
    "title": "Public Health Agency of Canada · Salmonella Outbreak Associated With Chicken Shawarma",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29770089/"
  },
  "cm433-tb-air": {
    "title": "CDC · Airborne Precautions and Negative-Pressure Isolation",
    "url": "https://www.cdc.gov/infection-control/hcp/isolation-precautions/precautions.html"
  },
  "cm433-men-preg": {
    "title": "WHO · Empiric Antibiotics for Bacterial Meningitis and Listeria Risk",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK614844/"
  },
  "cm433-hiv-preg": {
    "title": "British HIV Association · HIV in Pregnancy and Postpartum",
    "url": "https://doi.org/10.1111/hiv.70091"
  },
  "cm433-tb-hiv": {
    "title": "NIH · Tuberculosis and HIV Coinfection",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/coinfections-tuberculosis-hiv"
  },
  "cm433-malaria-treat": {
    "title": "CDC · Treatment of Uncomplicated Falciparum Malaria",
    "url": "https://www.cdc.gov/malaria/hcp/clinical-guidance/treatment-of-uncomplicated-malaria.html"
  },
  "cm433-malaria-travel": {
    "title": "CDC Yellow Book · Malaria Chemoprophylaxis",
    "url": "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/malaria.html"
  },
  "cm433-malaria-severe": {
    "title": "CDC · Malaria Diagnosis and Treatment Quick Reference",
    "url": "https://www.cdc.gov/malaria/php/surveillance/diagnosis-treatment-quick-reference.html"
  },
  "cm433-brucellosis-regimen": {
    "title": "Ariza et al. · Comparative Trial of Brucellosis Combination Regimens",
    "url": "https://pubmed.ncbi.nlm.nih.gov/1596044/"
  },
  "cm433-malaria-smear": {
    "title": "CDC DPDx · Clinical Malaria Microscopy",
    "url": "https://www.cdc.gov/dpdx/malaria/index.html"
  },
  "cm433-saudi-diabetes": {
    "title": "Saudi Council of Health Insurance · Type 2 Diabetes Clinical Review",
    "url": "https://www.chi.gov.sa/Style%20Library/IDF_Branding/Indication/256%20-%20Type%202%20Diabetes%20Mellitus_Updated%20Indication_DDF_Ed.9.pdf"
  },
  "cm433-insulin-effects": {
    "title": "ISPAD Clinical Practice Guideline · Insulin Therapy and Injection-Site Effects",
    "url": "https://www.ispad.org/static/3b8e00b2-9f33-43a5-a84f9eda1accef64/ISPCG-Chapter-9-2024.pdf"
  },
  "cm433-hypothyroid": {
    "title": "NICE · Thyroid Disease Assessment and Management",
    "url": "https://www.nice.org.uk/guidance/ng145/chapter/recommendations"
  },
  "cm433-graves": {
    "title": "American Thyroid Association · Clinical Features of Graves Disease",
    "url": "https://www.thyroid.org/graves-disease/"
  },
  "cm433-preg-breast": {
    "title": "American College of Radiology · Breast Imaging During Pregnancy",
    "url": "https://acsearch.acr.org/docs/3199448/Narrative/"
  },
  "cm433-fh": {
    "title": "JACC Scientific Expert Panel · Clinical Genetic Testing for Familial Hypercholesterolemia",
    "url": "https://doi.org/10.1016/j.jacc.2018.05.044"
  },
  "cm433-diplopia": {
    "title": "NSW Agency for Clinical Innovation · Eye Emergency Manual, Sixth Cranial Nerve Palsy",
    "url": "https://www.aci.health.nsw.gov.au/__data/assets/pdf_file/0013/155011/ACI-Eye-Emergency-Manual.pdf"
  },
  "cm433-uhthoff": {
    "title": "Study of Heat Sensitivity and Temporary Worsening of Multiple Sclerosis Symptoms",
    "url": "https://pubmed.ncbi.nlm.nih.gov/36669245/"
  },
  "cm433-neurobehcet": {
    "title": "International Consensus Recommendations · Neuro-Behçet Disease",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4155170/"
  },
  "cm433-absence": {
    "title": "Glauser et al. · Randomized Trial of Initial Therapy for Typical Absence Epilepsy",
    "url": "https://doi.org/10.1056/NEJMoa0902014"
  },
  "cm433-mca": {
    "title": "NCBI Bookshelf · Ischemic Stroke, Middle Cerebral Artery Territory",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK499997/"
  },
  "cm433-mg": {
    "title": "Association of British Neurologists · Myasthenia Gravis Management Guidelines",
    "url": "https://doi.org/10.1136/pn-2025-004655"
  },
  "cm433-factor13": {
    "title": "UKHCDO · Guideline for Rare Coagulation Disorders",
    "url": "https://doi.org/10.1111/bjh.13058"
  },
  "cm433-peds-itp": {
    "title": "American Society of Hematology · Immune Thrombocytopenia Clinical Practice Guideline",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6963252/"
  },
  "cm435-cervical-ra": {
    "title": "Kwek et al. · Preoperative Cervical Radiographs in Rheumatoid Arthritis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/7889704/"
  },
  "cm435-ro": {
    "title": "ACR · Reproductive Health in Rheumatic and Musculoskeletal Disease",
    "url": "https://doi.org/10.1002/art.41191"
  },
  "cm435-src": {
    "title": "EULAR · Systemic Sclerosis Treatment and Renal Crisis",
    "url": "https://doi.org/10.1136/ard-2024-226430"
  },
  "cm435-knee": {
    "title": "American College of Radiology · Knee Osteoarthritis Radiographic Grading",
    "url": "https://www.acr.org/-/media/ACR/Files/Peer-Learning-Summit/Multidisciplinary-OA-Grading-Resource.pdf"
  },
  "cm435-aa": {
    "title": "Lachmann et al. · Natural History and Outcome in Systemic AA Amyloidosis",
    "url": "https://doi.org/10.1056/NEJMoa070265"
  },
  "cm435-sjogren": {
    "title": "EULAR · Management of Sjögren Syndrome",
    "url": "https://doi.org/10.1136/annrheumdis-2019-216114"
  },
  "cm435-hhv8": {
    "title": "NIH · Human Herpesvirus-8 Disease and Kaposi Sarcoma",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/human-herpesvirus"
  },
  "cm435-hav": {
    "title": "CDC · Clinical Symptoms of Hepatitis A",
    "url": "https://www.cdc.gov/hepatitis-a/signs-symptoms/index.html"
  },
  "cm435-brucella-regimen": {
    "title": "Ariza et al. · Randomized Comparison of Brucellosis Antibiotic Regimens",
    "url": "https://pubmed.ncbi.nlm.nih.gov/1596044/"
  },
  "cm435-zoster": {
    "title": "CDC · Clinical Overview of Herpes Zoster",
    "url": "https://www.cdc.gov/shingles/hcp/clinical-overview/"
  },
  "cm435-endolab": {
    "title": "Endocrine Society · Diagnosis and Treatment of Hyperprolactinemia",
    "url": "https://academic.oup.com/jcem/article/96/2/273/2709487"
  },
  "cm435-thyca": {
    "title": "Endotext · Approach to Hypercalcemia, Endocrine Causes",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK279129/"
  },
  "cm435-empyema": {
    "title": "Wong et al. · Diffusion-Weighted MRI in Subdural Empyema",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7975646/"
  },
  "cm435-listeria": {
    "title": "CDC · Clinical Management of Listeriosis",
    "url": "https://www.cdc.gov/listeria/hcp/clinical-care/"
  },
  "cm435-dystrophin": {
    "title": "GeneReviews · Duchenne and Becker Dystrophinopathies",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK1119/"
  },
  "cm435-tbm": {
    "title": "International TBM Consortium · Clinical Practice Guideline for Tuberculous Meningitis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12419961/"
  },
  "cm435-breast-preg": {
    "title": "American College of Radiology · Breast Imaging During Pregnancy",
    "url": "https://acsearch.acr.org/docs/3199448/Narrative"
  },
  "cm435-tumor-markers": {
    "title": "NCI · Tumor Marker Tests in Common Use",
    "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-markers-list"
  },
  "cm435-leuk-support": {
    "title": "ISTH · Management of Hemostatic Complications in Acute Leukemia",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7909744/"
  },
  "cm435-hep-malaria": {
    "title": "CDC · Malaria Treatment for Uncomplicated or Severe Infection",
    "url": "https://www.cdc.gov/malaria/hcp/clinical-guidance/index.html"
  },
  "cm435-catechol": {
    "title": "Endotext · Catecholamine Biosynthesis",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK27988/"
  },
  "cm435-ibm": {
    "title": "International ENMC Workshop · Inclusion Body Myositis Diagnostic Criteria",
    "url": "https://www.nmd-journal.com/article/S0960-8966%2824%2900054-3/fulltext"
  },
  "cm435-cml": {
    "title": "European LeukemiaNet · 2025 Chronic Myeloid Leukemia Guideline",
    "url": "https://www.nature.com/articles/s41375-025-02664-w"
  },
  "cm435-crc-screen": {
    "title": "ACG · Colorectal Cancer Screening Guideline, First-Degree Relatives",
    "url": "https://doi.org/10.14309/AJG.0000000000001122"
  },
  "cm435-desmoid": {
    "title": "NCI · Desmoid Tumor and Local Invasion",
    "url": "https://www.cancer.gov/pediatric-adult-rare-tumor/rare-tumors/rare-soft-tissue-tumors/desmoid-tumor"
  },
  "cm435-hemophilia": {
    "title": "CDC · X-Linked Inheritance of Hemophilia",
    "url": "https://www.cdc.gov/hemophilia/testing/how-hemophilia-is-inherited.html"
  },
  "cm435-hpv": {
    "title": "NCI · Cervical Cancer Causes and Prevention",
    "url": "https://www.cancer.gov/types/cervical/causes-risk-prevention"
  },
  "cm435-vwf": {
    "title": "ASH/ISTH/NHF/WFH · Diagnosis of von Willebrand Disease",
    "url": "https://doi.org/10.1182/bloodadvances.2020003265"
  },
  "cm435-angio": {
    "title": "NCI · Angiogenesis Inhibitors and Tumor Blood Supply",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/angiogenesis-inhibitors-fact-sheet"
  },
  "r-ibp": {
    "title": "ASAS · Assessment Criteria for Inflammatory Back Pain",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19147614/"
  },
  "r-airborne": {
    "title": "CDC · Isolation Precautions for Pulmonary Tuberculosis",
    "url": "https://www.cdc.gov/infection-control/hcp/isolation-precautions/appendix-a-type-duration.html"
  },
  "r-prophylax": {
    "title": "ASHP, IDSA, SIS and SHEA · Surgical Antimicrobial Prophylaxis",
    "url": "https://doi.org/10.2146/ajhp120568"
  },
  "r-malpreg": {
    "title": "CDC · Malaria Treatment During Pregnancy",
    "url": "https://www.cdc.gov/malaria/hcp/clinical-guidance/pregnant-women.html"
  },
  "r-ghrelin": {
    "title": "Randomized Crossover Trial · Ghrelin, Appetite and Food Intake",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11739476/"
  },
  "r-brown": {
    "title": "NEJM Clinical Image · Brown–Séquard Syndrome",
    "url": "https://doi.org/10.1056/NEJM199901283400406"
  },
  "r-absence": {
    "title": "NICE · Treatment of Absence Seizures",
    "url": "https://www.nice.org.uk/guidance/ng217/chapter/5-Treating-epileptic-seizures-in-children-young-people-and-adults"
  },
  "r-temporal": {
    "title": "ILAE · Temporal Lobe Seizures",
    "url": "https://www.epilepsydiagnosis.org/seizure/temporal-overview.html"
  },
  "r-lewy": {
    "title": "DLB Consortium · Diagnosis and Management of Dementia With Lewy Bodies",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28592453/"
  },
  "r-sah": {
    "title": "AHA and ASA · Guideline for Aneurysmal Subarachnoid Hemorrhage",
    "url": "https://doi.org/10.1161/STR.0000000000000436"
  },
  "r-ms2024": {
    "title": "International Panel · 2024 Revised McDonald Criteria",
    "url": "https://pubmed.ncbi.nlm.nih.gov/40975101/"
  },
  "r-mds": {
    "title": "European LeukemiaNet · Diagnosis and Treatment of Primary Myelodysplastic Syndromes",
    "url": "https://doi.org/10.1182/blood-2013-03-492884"
  },
  "r-screen": {
    "title": "USPSTF · Breast Cancer Screening Recommendation",
    "url": "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening"
  },
  "cm437-psa": {
    "title": "EULAR · Pharmacological Management of Psoriatic Arthritis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103320/"
  },
  "cm437-myopathy-lung": {
    "title": "ERS/ACR · Inflammatory Myopathy Respiratory Muscle Involvement",
    "url": "https://publications.ersnet.org/content/errev/24/136/216"
  },
  "cm437-dengue": {
    "title": "CDC · Clinical Features of Dengue",
    "url": "https://www.cdc.gov/dengue/hcp/clinical-signs/"
  },
  "cm437-hiv": {
    "title": "NIH HIVinfo · HIV Transmission",
    "url": "https://hivinfo.nih.gov/understanding-hiv/fact-sheets/understanding-hiv-transmission"
  },
  "cm437-labialis": {
    "title": "Spruance et al. · Randomized Trials of Topical Acyclovir for Herpes Labialis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC127288/"
  },
  "cm437-vl": {
    "title": "NIH · Plasma HIV-1 RNA and CD4 Monitoring During ART",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/plasma-hiv-1-rna-cd4-monitoring"
  },
  "cm437-tst": {
    "title": "CDC · Tuberculin Skin Test Interpretation",
    "url": "https://www.cdc.gov/tb/hcp/testing-diagnosis/tuberculin-skin-test.html"
  },
  "cm437-hsv-labor": {
    "title": "CDC · Herpes Simplex Treatment During Pregnancy and Labor",
    "url": "https://www.cdc.gov/std/treatment-guidelines/herpes.htm"
  },
  "cm437-ssi": {
    "title": "ASHP/IDSA/SIS/SHEA · Antimicrobial Prophylaxis in Surgery",
    "url": "https://academic.oup.com/ajhp/article/70/3/195/5112717"
  },
  "cm437-id-skin": {
    "title": "IDSA · Skin and Soft Tissue Infections, Surgical Site Infection",
    "url": "https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/"
  },
  "cm437-ca-emerg": {
    "title": "Society for Endocrinology · Emergency Management of Adult Hypercalcaemia",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5314807/"
  },
  "cm437-gh": {
    "title": "Wideman et al. · Exercise Duration and Growth Hormone Secretion",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16946030/"
  },
  "cm437-l5": {
    "title": "Burakgazi et al. · Proximal Muscle Sensitivity for L5 Radiculopathy",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22581544/"
  },
  "cm437-rasch": {
    "title": "Stanford Medicine 25 · Pupillary Responses and Afferent Defects",
    "url": "https://stanfordmedicine25.stanford.edu/the25/pupillary.html"
  },
  "cm437-meningo": {
    "title": "CDC · Clinical Overview of Meningococcal Disease",
    "url": "https://www.cdc.gov/meningococcal/hcp/clinical/index.html"
  },
  "cm437-dlb": {
    "title": "DLB Consortium · Diagnosis and Management of Dementia With Lewy Bodies",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/"
  },
  "cm437-epidural": {
    "title": "Brain Trauma Foundation · Acute Epidural Hematoma and Surgical Assessment",
    "url": "https://braintrauma.org/coma/guidelines/surgical"
  },
  "cm437-lems": {
    "title": "Hatanaka et al. · Postexercise Facilitation in Lambert–Eaton Syndrome",
    "url": "https://pubmed.ncbi.nlm.nih.gov/18288711/"
  },
  "cm437-mg-crisis": {
    "title": "International Consensus Guidance · Management of Myasthenia Gravis and Crisis",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4977114/"
  },
  "cm437-sah": {
    "title": "AHA/ASA · Aneurysmal Subarachnoid Hemorrhage Guideline",
    "url": "https://doi.org/10.1161/STR.0000000000000436"
  },
  "cm437-ich": {
    "title": "AHA/ASA · Spontaneous Intracerebral Hemorrhage Guideline",
    "url": "https://www.ahajournals.org/doi/10.1161/STR.0000000000000407"
  },
  "cm437-nsclc": {
    "title": "NCI · Non-Small Cell Lung Cancer Staging and Treatment",
    "url": "https://www.cancer.gov/types/lung/hp/non-small-cell-lung-treatment-pdq"
  },
  "cm437-cbe": {
    "title": "IARC · Clinical Reference Chart for Clinical Breast Examination",
    "url": "https://learning.iarc.fr/edp/courses/visual-chart-clinical-reference-chart-for-clinical-breast-examination/"
  },
  "cm437-men-cohort": {
    "title": "van de Beek et al. · Prospective Adult Bacterial Meningitis Cohort",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26652862/"
  },
  "cm437-weber": {
    "title": "Clinico-Radiological Correlation of Weber Syndrome",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10839420/"
  },
  "cm437-uhthoff": {
    "title": "Davis et al. · Thermoregulation and Heat Sensitivity in MS",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2980380/"
  },
  "cm438-cdiff": {
    "title": "CDC · C. difficile Infection Prevention in Acute Care",
    "url": "https://www.cdc.gov/c-diff/hcp/clinical-guidance/index.html"
  },
  "cm438-an-ldl": {
    "title": "Hussain et al. · Lipid and Lipoprotein Concentrations in Anorexia Nervosa",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6842568/"
  },
  "cm438-hiv-cd4": {
    "title": "NIH HIVinfo · HIV and CD4 T Cells",
    "url": "https://hivinfo.nih.gov/understanding-hiv/fact-sheets/hiv-life-cycle"
  },
  "cm438-preg-dvt": {
    "title": "American Society of Hematology · Venous Thromboembolism in Pregnancy",
    "url": "https://www.hematology.org/-/media/hematology/files/clinicians/guidelines/vte/ash-teaching-slide-setvtepregnancypdffinal71923.pdf"
  },
  "cm438-anaemia": {
    "title": "American Society of Hematology · Anemia of Inflammation",
    "url": "https://doi.org/10.1182/blood-2018-06-856500"
  },
  "cm438-gastric-malt": {
    "title": "ESMO · Lymphoma Clinical Practice Guideline",
    "url": "https://doi.org/10.1016/j.annonc.2025.07.014"
  },
  "cm438-mg": {
    "title": "Association of British Neurologists · Myasthenia Gravis Management Guideline 2025",
    "url": "https://doi.org/10.1136/pn-2025-004655"
  },
  "cm438-uveitis": {
    "title": "Aumont et al. · Acute Anterior Uveitis in Axial Spondyloarthritis",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38454194/"
  },
  "cm438-hyperca-ecg": {
    "title": "Sonoda et al. · Electrocardiographic Changes in Hypercalcemia",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6931523/"
  },
  "cm438-covid-ipc": {
    "title": "CDC · SARS-CoV-2 Healthcare Infection Control Guidance",
    "url": "https://www.cdc.gov/covid/hcp/infection-control/"
  },
  "cm438-sarcoma": {
    "title": "National Cancer Institute · Adult Soft Tissue Sarcoma Staging",
    "url": "https://www.cancer.gov/types/soft-tissue-sarcoma/hp/adult-soft-tissue-treatment-pdq"
  },
  "cm438-step1": {
    "title": "STEP 1 Randomized Trial · Semaglutide for Adults With Overweight or Obesity",
    "url": "https://doi.org/10.1056/NEJMoa2032183"
  },
  "cm438-cvt": {
    "title": "American Heart Association · Diagnosis and Management of Cerebral Venous Thrombosis",
    "url": "https://doi.org/10.1161/STR.0000000000000456"
  },
  "cm438-hiv-intrapartum": {
    "title": "New York City Perinatal HIV Study · Timing of Maternal-Infant Transmission",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9084789/"
  },
  "cm438-hiv-perinatal": {
    "title": "NIH · Preventing HIV Transmission During Infant Feeding",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/perinatal/preventing-hiv-transmission-during-infant-feeding"
  },
  "cm438-post-thyroid": {
    "title": "NICE · Thyroid Disease Assessment and Management",
    "url": "https://www.nice.org.uk/guidance/ng145/chapter/recommendations"
  },
  "cm438-oa-nice": {
    "title": "NICE · Osteoarthritis Management, Pharmacological Options",
    "url": "https://www.nice.org.uk/guidance/ng226/chapter/Recommendations"
  },
  "cm438-stroke-prevention": {
    "title": "American Heart Association · 2024 Guideline for Primary Prevention of Stroke",
    "url": "https://doi.org/10.1161/STR.0000000000000475"
  },
  "cm438-diagnostic-breast": {
    "title": "American College of Radiology · Palpable Breast Masses",
    "url": "https://acsearch.acr.org/docs/69495/Narrative/"
  },
  "cm438-absence": {
    "title": "Childhood Absence Epilepsy Randomized Trial · Ethosuximide, Valproate and Lamotrigine",
    "url": "https://doi.org/10.1056/NEJMoa0902014"
  },
  "r-gout": {
    "title": "ACR · Guideline for Management of Gout",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10563586/"
  },
  "r-digital": {
    "title": "EULAR · 2023 Update on Treatment of Systemic Sclerosis",
    "url": "https://doi.org/10.1136/ard-2024-226430"
  },
  "r-cameroon": {
    "title": "CDC Travelers' Health · Cameroon",
    "url": "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cameroon"
  },
  "r-hiv-tb": {
    "title": "NIH · Mycobacterium Tuberculosis in Adults and Adolescents With HIV",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/mycobacterium"
  },
  "r-hiv-birth": {
    "title": "NIH Perinatal HIV Guidelines · Infant Exposure and Antiretroviral Management",
    "url": "https://clinicalinfo.hiv.gov/en/guidelines/perinatal/management-infants-utero-intrapartum-breastfeeding-hiv-exposure"
  },
  "r-contact": {
    "title": "CDC · Isolation Precautions for Selected Infections and Conditions",
    "url": "https://www.cdc.gov/infection-control/hcp/isolation-precautions/appendix-a-type-duration.html"
  },
  "r-ltbi": {
    "title": "CDC · Treatment for Latent Tuberculosis Infection",
    "url": "https://www.cdc.gov/tb/hcp/treatment/latent-tuberculosis-infection.html"
  },
  "r-hands": {
    "title": "CDC · Clinical Safety and Hand Hygiene for Healthcare Workers",
    "url": "https://www.cdc.gov/clean-hands/hcp/clinical-safety/index.html"
  },
  "r-glut": {
    "title": "De Vos et al. · Glucose Transporter Expression in Human and Rat Beta Cells",
    "url": "https://www.jci.org/articles/view/118308"
  },
  "r-lina": {
    "title": "DailyMed · Linagliptin Prescribing Information",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dfe327e8-f6ab-41e5-bdef-d520118cd83a"
  },
  "r-edmd": {
    "title": "GeneReviews · Emery–Dreifuss Muscular Dystrophy",
    "url": "https://www.ncbi.nlm.nih.gov/books/NBK1436/"
  },
  "r-tics": {
    "title": "AAN · Treatment of Tics in Tourette Syndrome and Chronic Tic Disorders",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31061208/"
  },
  "r-carotid": {
    "title": "AHA · Cervical Artery Dissection Scientific Statement",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38299330/"
  },
  "r-front": {
    "title": "ILAE · Frontal Lobe Seizures",
    "url": "https://www.epilepsydiagnosis.org/seizure/frontal-overview.html"
  },
  "r-lems": {
    "title": "Validation Study · Electrophysiological Criteria for Lambert–Eaton Syndrome",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16003742/"
  },
  "r-trauma": {
    "title": "ACR · Head Trauma",
    "url": "https://acsearch.acr.org/docs/69481/Narrative"
  },
  "r-cml": {
    "title": "European LeukemiaNet · Management of Chronic Myeloid Leukemia",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12310532/"
  },
  "r-chemoprev": {
    "title": "USPSTF · Medications to Reduce Breast Cancer Risk",
    "url": "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-medications-for-risk-reduction"
  },
  "r-lymphclass": {
    "title": "WHO Classification, Fifth Edition · Lymphoid Neoplasms",
    "url": "https://doi.org/10.1038/s41375-022-01620-2"
  },
  "r-breastmass": {
    "title": "ACR · Palpable Breast Masses",
    "url": "https://acsearch.acr.org/docs/69495/Narrative/"
  },
  "r-l5": {
    "title": "Robblee and Katzberg · Clinical Localization of Radiculopathies and Mononeuropathies",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4942461/"
  }
};
  const entries = [
    {"ids": ["batch-medicine-final-443-p79-q1", "medicine-final-443-cardiology-q001"], "answers": [], "ungradedReason": "All four choices and the answer key are blank in the source.", "confidence": "tentative", "references": ["pleural"], "explanation": "Pleuritic chest pain describes pain worsened by inspiration. Pulmonary embolism, pneumonia and pneumothorax are among the possibilities. The fragment gives no features that distinguish them."},
    {"ids": ["batch-medicine-final-443-p88-q2", "medicine-final-443-git-hepatobiliary-q002"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["celiac"], "explanation": "Chronic diarrhea, weight loss and type 1 diabetes make celiac disease a priority. Start with tissue transglutaminase IgA and total IgA while the patient still eats gluten. Low calcium and low hemoglobin add to the concern for malabsorption."},
    {"ids": ["batch-medicine-final-443-p106-q3", "medicine-final-443-rheumatology-q003"], "answers": ["C", "D"], "ungradedReason": "Two oral JAK inhibitors fit the route requirement. The original wording asks for a biologic, which neither oral option is.", "confidence": "tentative", "references": ["ra", "fda-jak"], "explanation": "Tofacitinib and baricitinib are oral targeted synthetic DMARDs. Abatacept and rituximab are biologics given by injection or infusion. A decision to add a JAK inhibitor depends on prior therapy and individual cardiovascular, thrombotic, malignancy and infection risks."},
    {"ids": ["batch-medicine-final-443-p114-q4", "medicine-final-443-rheumatology-q004"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["axspa"], "explanation": "Inflammatory back pain plus dactylitis supports spondyloarthritis. A normal X-ray can precede visible structural damage. A sacroiliac MRI using an inflammatory protocol can identify active inflammation and support the diagnosis."},
    {"ids": ["batch-medicine-final-443-p122-q5", "medicine-final-443-rheumatology-q005"], "answers": ["C"], "ungradedReason": "The stem gives features shared by limited and diffuse disease, and both listed systemic sclerosis antibodies contribute to classification.", "confidence": "tentative", "references": ["ssc"], "explanation": "Raynaud phenomenon, sclerodactyly and telangiectasias support systemic sclerosis. Anti-Scl-70 is the Gift pick and favors diffuse disease, but anticentromere antibodies are also systemic sclerosis-associated and commonly occur in limited disease."},
    {"ids": ["batch-medicine-final-443-p130-q6", "medicine-final-443-rheumatology-q006"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc", "ssc-ild"], "explanation": "Skin involvement proximal to the elbows and across the chest favors diffuse cutaneous systemic sclerosis. Anti-topoisomerase I, also called anti-Scl-70, is associated with this pattern and with higher risk of interstitial lung disease."},
    {"ids": ["batch-medicine-final-443-p138-q7", "medicine-final-443-rheumatology-q007"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc-ild"], "explanation": "Anti-topoisomerase I is the antibody associated with higher risk of systemic sclerosis-related interstitial lung disease. Progressive dyspnea, dry cough and the CT findings already support lung involvement in this case."},
    {"ids": ["batch-medicine-final-443-p146-q8", "medicine-final-443-rheumatology-q008"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ra-class"], "explanation": "Early rheumatoid arthritis can present as symmetric inflammatory polyarthritis with negative RF and anti-CCP and no radiographic erosions. Duration, joint distribution and the absence of a better explanation still matter, especially when distinguishing persistent RA from viral arthritis."},
    {"ids": ["batch-medicine-final-443-p154-q9", "medicine-final-443-rheumatology-q009"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["sle"], "explanation": "ANA is the most sensitive option for initial SLE evaluation in this vignette. Anti-dsDNA and anti-Smith help support specificity. A positive ANA by itself cannot establish the diagnosis."},
    {"ids": ["batch-medicine-final-443-p162-q10", "medicine-final-443-rheumatology-q010"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["sle"], "explanation": "With a clinical suspicion of SLE, ANA is a reasonable initial screening test. A positive result is interpreted with the exam and additional testing. Swollen knees alone can have several causes, and test costs vary by setting."},
    {"ids": ["batch-medicine-final-443-p170-q11", "medicine-final-443-rheumatology-q011"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ra-hla"], "explanation": "HLA-DR4 includes multiple HLA-DRB1 shared-epitope alleles linked to RA risk, particularly seropositive disease. The association is genetic background, so HLA typing is unnecessary for routine diagnosis."},
    {"ids": ["batch-medicine-final-443-p179-q12", "medicine-final-443-rheumatology-q012"], "answers": ["B"], "ungradedReason": "The source prints B twice, and the duration option is malformed.", "confidence": "tentative", "references": ["axspa", "asas"], "explanation": "The pattern is inflammatory back pain: prolonged morning stiffness, improvement with exercise and lack of relief with rest. In addition, night pain can occur. The duration in the stem is clearer than the typography in the recorded choice."},
    {"ids": ["batch-medicine-final-443-p186-q13", "medicine-final-443-rheumatology-q013"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["lupus-kidney"], "explanation": "A urine dipstick is the simplest listed screen for proteinuria in SLE. A positive result needs quantification with a urine protein-to-creatinine ratio. Kidney surveillance also includes serum creatinine or eGFR and evaluation of urine sediment."},
    {"ids": ["batch-medicine-final-443-p195-q14", "medicine-final-443-infectious-diseases-q014"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["tb"], "explanation": "Hemoptysis with fever and night sweats after travel raises suspicion for pulmonary tuberculosis. Cervical adenopathy can accompany TB, but this brief history is not diagnostic. Chest imaging and appropriate sputum testing help distinguish it from other causes."},
    {"ids": ["batch-medicine-final-443-p203-q15", "medicine-final-443-infectious-diseases-q015"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cauti"], "explanation": "A prevention bundle emphasizes aseptic insertion, hand hygiene and early catheter removal. Routine daily replacement is unnecessary. Replace a catheter for a clinical indication such as obstruction, infection or a break in the closed system."},
    {"ids": ["batch-medicine-final-443-p211-q16", "medicine-final-443-infectious-diseases-q016"], "answers": ["C"], "ungradedReason": "The most frequent pathogen varies by surveillance population and time period.", "confidence": "tentative", "references": ["clabsi-old", "clabsi-new"], "explanation": "Coagulase-negative staphylococci ranked first in adult ICUs in the cited 2018–2021 NHSN data. Staphylococcus aureus ranked first on adult hospital wards, and E. coli ranked first in adult oncology units. The case gives no setting to distinguish these choices."},
    {"ids": ["batch-medicine-final-443-p219-q17", "medicine-final-443-infectious-diseases-q017"], "answers": ["A", "D"], "ungradedReason": "Both head-of-bed elevation and minimizing sedation can contribute to prevention in appropriate patients.", "confidence": "tentative", "references": ["vap"], "explanation": "Head-of-bed elevation to 30–45° reduces aspiration risk when feasible. Strategies that minimize sedation, including an appropriate daily awakening protocol, can shorten ventilation exposure. Frequent circuit changes and routine prophylactic antibiotics do not explain the benefit."},
    {"ids": ["batch-medicine-final-443-p227-q18", "medicine-final-443-infectious-diseases-q018"], "answers": ["A"], "ungradedReason": "Susceptibility and travel region are missing, so ciprofloxacin cannot be endorsed as routine empiric therapy.", "confidence": "tentative", "references": ["typhoid"], "explanation": "Ciprofloxacin is appropriate for a fluoroquinolone-susceptible isolate. Resistance among travel-associated isolates can make it unsuitable empirically. Destination, severity and susceptibility results guide the choice."},
    {"ids": ["batch-medicine-final-443-p235-q19", "medicine-final-443-infectious-diseases-q019"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["brucellosis"], "explanation": "Doxycycline plus rifampin is a standard combination for uncomplicated brucellosis in a suitable nonpregnant adult. Deep-seated infection and pregnancy require different treatment considerations."},
    {"ids": ["batch-medicine-final-443-p243-q20", "medicine-final-443-infectious-diseases-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["dengue"], "explanation": "Early dengue can be detected with NS1 antigen or a nucleic acid test. During the first week, CDC recommends pairing a direct test with IgM testing. A negative NS1 alone does not rule out dengue."},
    {"ids": ["batch-medicine-final-443-p251-q21", "medicine-final-443-infectious-diseases-q021"], "answers": [], "ungradedReason": "The source gives no established diagnosis, lesion features or species. These details determine treatment.", "confidence": "tentative", "references": ["leish"], "explanation": "A chronic leg ulcer has many infectious and noninfectious causes. If cutaneous leishmaniasis is suspected, confirm it and consider the species, lesion burden, location and host status before choosing local or systemic therapy. The recorded itraconazole key is unsupported by this stem."},
    {"ids": ["batch-medicine-final-443-p259-q22", "medicine-final-443-infectious-diseases-q022"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["mers"], "explanation": "Camel exposure and a febrile respiratory illness raise concern for MERS-CoV. Negative bacterial cultures add little by themselves. Compatible exposure and virologic testing are needed to establish the diagnosis."},
    {"ids": ["batch-medicine-final-443-p267-q23", "medicine-final-443-infectious-diseases-q023"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ghana"], "explanation": "Yellow fever is the relevant entry requirement for Ghana in the cited CDC country guidance. The cited guidance lists proof of vaccination for arriving travelers aged 9 months or older."},
    {"ids": ["batch-medicine-final-443-p275-q24", "medicine-final-443-infectious-diseases-q024"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["melioidosis"], "explanation": "Prolonged fever with an infected infrarenal aortic pseudoaneurysm after rice-field exposure in Thailand is compatible with melioidosis. The geographic exposure and vascular infection point toward Burkholderia pseudomallei among these options. Blood or tissue culture establishes the organism."},
    {"ids": ["batch-medicine-final-443-p282-q25", "medicine-final-443-infectious-diseases-q025"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["malaria"], "explanation": "Fever, shock, confusion and seizures after travel are compatible with severe malaria, making falciparum the strongest listed choice. Travel alone cannot establish the species, so urgent malaria blood testing is needed."},
    {"ids": ["batch-medicine-final-443-p290-q26", "medicine-final-443-infectious-diseases-q026"], "answers": ["C"], "ungradedReason": "The source omits the surveillance period. The available Saudi study is historical.", "confidence": "tentative", "references": ["saudihiv"], "explanation": "Heterosexual exposure was the leading reported category in a 2004 study of 410 Saudi patients, accounting for 189 cases. This supports the historical recall answer. Contemporary proportions depend on the surveillance period and handling of unknown exposures."},
    {"ids": ["batch-medicine-final-443-p298-q27", "medicine-final-443-infectious-diseases-q027"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["hivtest"], "explanation": "An HIV nucleic acid test detects infection earlier than antibody-only testing. CDC gives a usual detection window of 10–33 days for a nucleic acid test, so day seven is early even for this option. A negative test at that point is insufficient to rule out acquisition and should be followed by repeat testing as indicated."},
    {"ids": ["batch-medicine-final-443-p306-q28", "medicine-final-443-infectious-diseases-q028"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["art"], "explanation": "Confirmed HIV warrants rapid initiation of combination antiretroviral therapy even in an asymptomatic person. Obtain baseline CD4 count, viral load and resistance testing while arranging treatment. Specific opportunistic infections can change timing."},
    {"ids": ["batch-medicine-final-443-p314-q29", "medicine-final-443-infectious-diseases-q029"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pep"], "explanation": "Start indicated HIV post-exposure prophylaxis as soon as possible and within 72 hours of exposure. This is an upper time limit, so earlier assessment and treatment are preferable."},
    {"ids": ["batch-medicine-final-443-p322-q30", "medicine-final-443-infectious-diseases-q030"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["art", "art-regimen"], "explanation": "Rapid treatment is appropriate once HIV is confirmed. Bictegravir/emtricitabine/tenofovir alafenamide is one recommended initial regimen for most suitable adults. Selection also considers resistance, renal function, hepatitis B and prior long-acting PrEP exposure."},
    {"ids": ["batch-medicine-final-443-p330-q31", "medicine-final-443-infectious-diseases-q031"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["pep"], "explanation": "The usual outer limit for starting HIV post-exposure prophylaxis is 72 hours. Start as soon as possible when the exposure warrants treatment."},
    {"ids": ["batch-medicine-final-443-p338-q32", "medicine-final-443-infectious-diseases-q032"], "answers": ["A"], "ungradedReason": "The source prints “Plasmodium malaria,” which is ambiguous between malaria generically and the species P. malariae.", "confidence": "tentative", "references": ["malaria", "knowlesi"], "explanation": "The travel history, fever, shock and impaired consciousness raise concern for severe malaria. Urgent thick and thin smears and species identification are needed. Falciparum and knowlesi can cause severe illness, whereas the wording cannot establish the species named in the option."},
    {"ids": ["batch-medicine-final-443-p346-q33", "medicine-final-443-infectious-diseases-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["pregnancy-ra"], "explanation": "A TNF inhibitor can be an appropriate option during pregnancy when needed for disease control. The agent, timing and placental transfer matter, with certolizumab having minimal transfer. Methotrexate, leflunomide and mycophenolate need preconception planning and are unsuitable choices here."},
    {"ids": ["batch-medicine-final-443-p356-q34", "medicine-final-443-endocrinology-q034"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diet"], "explanation": "Saturated fat is the least favorable choice listed for LDL cholesterol. Replacing it with unsaturated fat improves the intended comparison. The stem asks about the supplied choices and does not list industrial trans fat."},
    {"ids": ["batch-medicine-final-443-p364-q35", "medicine-final-443-endocrinology-q035"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ppgl"], "explanation": "Alpha-adrenergic blockade is the key preoperative preparation for a functional pheochromocytoma in the indicated setting. If beta blockade is needed for tachycardia, establish alpha blockade first to avoid unopposed alpha stimulation."},
    {"ids": ["batch-medicine-final-443-p372-q36", "medicine-final-443-endocrinology-q036"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["phpt"], "explanation": "Hypercalcemia with low phosphate favors a PTH-mediated process, since PTH increases renal phosphate loss. Check corrected or ionized calcium with intact PTH. An inappropriately normal or high PTH supports primary hyperparathyroidism in the right setting."},
    {"ids": ["batch-medicine-final-443-p381-q37", "medicine-final-443-endocrinology-q037"], "answers": ["C"], "ungradedReason": "Both childhood radiation and first-degree family history increase risk. The exposure and family history are too poorly characterized to rank them for this patient.", "confidence": "tentative", "references": ["thyroid"], "explanation": "Childhood head or neck irradiation is a recognized thyroid cancer risk factor. A first-degree relative with thyroid carcinoma also matters. The risk history informs the nodule evaluation, with ultrasound features and size guiding decisions about biopsy."},
    {"ids": ["batch-medicine-final-443-p390-q38", "medicine-final-443-endocrinology-q038"], "answers": [], "ungradedReason": "The original source records letter A but omits all choices.", "confidence": "tentative", "references": ["diabetes"], "explanation": "Common diagnostic thresholds include A1c at least 6.5%, fasting plasma glucose at least 126 mg/dL and two-hour plasma glucose at least 200 mg/dL after a 75 g oral glucose load. Random plasma glucose at least 200 mg/dL is diagnostic with classic symptoms or crisis. Otherwise abnormal testing usually needs confirmation. The missing options prevent comparison with the recorded A."},
    {"ids": ["batch-medicine-final-443-p399-q39", "medicine-final-443-endocrinology-q039"], "answers": ["A", "C"], "ungradedReason": "No A1c, complications, weight goal or treatment history are supplied to choose a single first-line medicine.", "confidence": "tentative", "references": ["diabetes-meds", "diabetes-weight"], "explanation": "A GLP-1 receptor agonist is reasonable when meaningful weight loss is a priority and the drug is appropriate, accessible and tolerated. Metformin remains a suitable initial option in many patients. Clinical goals and comorbidities matter, so BMI alone cannot settle the choice."},
    {"ids": ["batch-medicine-final-443-p407-q40", "medicine-final-443-endocrinology-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes results from immune-mediated loss of pancreatic beta-cell function, causing insulin deficiency. Insulin resistance and increased hepatic glucose production are not the defining initial mechanism."},
    {"ids": ["batch-medicine-final-443-p415-q41", "medicine-final-443-endocrinology-q041"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Insulin resistance in muscle, liver and adipose tissue is a major feature of type 2 diabetes. Hyperglycemia develops as beta cells fail to compensate sufficiently. Excess hepatic glucose output contributes to hyperglycemia but does not describe the core defect as completely as the selected choice."},
    {"ids": ["batch-medicine-final-443-p423-q42", "medicine-final-443-endocrinology-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ppgl", "aldosterone"], "explanation": "Episodic headache, palpitations and sweating with hypertension suggest catecholamine excess among the available choices. Hypokalemia is not a defining feature of pheochromocytoma. Hypertension with persistent unexplained hypokalemia also warrants evaluation for primary aldosteronism."},
    {"ids": ["batch-medicine-final-443-p430-q43", "medicine-final-443-endocrinology-q043"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Suspected adrenal crisis with hypotension requires immediate parenteral hydrocortisone and isotonic fluids. Hydrocortisone directly treats the cortisol deficiency and is the best disease-specific choice. Diagnostic sampling should not delay treatment."},
    {"ids": ["batch-medicine-final-443-p440-q44", "medicine-final-443-endocrinology-q044"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pituitary"], "explanation": "Low free T4 with inappropriately low TSH supports central hypothyroidism. Low gonadotropins and IGF-1 point toward broader pituitary dysfunction, so pituitary MRI is appropriate. Assess the adrenal axis before starting thyroid hormone."},
    {"ids": ["batch-medicine-final-443-p455-q45", "medicine-final-443-endocrinology-q045"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Marked hyperprolactinemia with a large pituitary mass and amenorrhea–galactorrhea supports a macroprolactinoma. A dopamine agonist, usually cabergoline, can lower prolactin and reduce tumor size. Chiasmal involvement also needs prompt visual assessment."},
    {"ids": ["batch-medicine-final-443-p465-q46", "medicine-final-443-endocrinology-q046"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Autoimmune loss of pancreatic beta cells is the defining mechanism of type 1 diabetes. Progressive weight gain is not an explanation. Gift records A for the displayed option order in Batch 443 Q46 and Batch 442 Q64. Batch 441 Q27 places the same mechanism at C."},
    {"ids": ["batch-medicine-final-441-p1682-q27"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Autoimmune loss of pancreatic beta cells is the defining mechanism of type 1 diabetes. Progressive weight gain is not an explanation. Gift records A for the displayed option order in Batch 443 Q46 and Batch 442 Q64. Batch 441 Q27 places the same mechanism at C."},
    {"ids": ["batch-medicine-final-443-p474-q47", "medicine-final-443-endocrinology-q047"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "In a stable patient, measure morning serum cortisol and plasma ACTH together. Elevated ACTH in the setting of deficient cortisol suggests primary adrenal insufficiency, and stimulation testing can confirm it. If the patient is unstable, draw samples if possible and start treatment without delay."},
    {"ids": ["batch-medicine-final-443-p481-q48", "medicine-final-443-endocrinology-q048"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Cabergoline is usually first-line for a macroprolactinoma, including many large lesions, because it shrinks the tumor and lowers prolactin. Visual field assessment and specialist involvement are important with possible chiasmal compression."},
    {"ids": ["batch-medicine-final-443-p489-q49", "medicine-final-443-endocrinology-q049"], "answers": ["B"], "ungradedReason": "No Gift key is recorded, and more than one adult reaches the ADA age-based testing threshold.", "confidence": "tentative", "references": ["diabetes", "diabetes-screen"], "explanation": "The adult with obesity and sedentary behavior has the highest apparent screening priority among the supplied cases. Under ADA age-based screening, the 45-year-old also qualifies even with normal BMI. The original bank notes that the choices were reconstructed."},
    {"ids": ["batch-medicine-final-443-p496-q50", "medicine-final-443-endocrinology-q050"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["aldosterone"], "explanation": "Hypertension with hypokalemia, weakness and polyuria or nocturia suggests aldosterone excess. Screen with aldosterone and renin interpreted together, accounting for medication effects and potassium status."},
    {"ids": ["batch-medicine-final-443-p505-q51", "medicine-final-443-endocrinology-q051"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ppgl"], "explanation": "Hypertension with episodic headache, sweating and palpitations warrants biochemical evaluation for pheochromocytoma or paraganglioma. Fractionated urinary metanephrines are an appropriate first test. Plasma free metanephrines are another accepted option when collected correctly."},
    {"ids": ["batch-medicine-final-443-p513-q52", "medicine-final-443-endocrinology-q052"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["pituitary"], "explanation": "Low free T4 with a low TSH suggests central hypothyroidism in this setting. Levothyroxine is the indicated replacement after excluding or replacing adrenal insufficiency. Once treated, follow free T4 because TSH is not a reliable treatment target in central disease."},
    {"ids": ["batch-medicine-final-443-p527-q53", "medicine-final-443-endocrinology-q053"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "Tendon xanthomas together with markedly elevated LDL and premature cardiovascular disease in the family point to familial hypercholesterolemia. The findings support evaluation for an inherited LDL disorder and screening of relatives."},
    {"ids": ["batch-medicine-final-443-p536-q54", "medicine-final-443-endocrinology-q054"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["lipid", "tg"], "explanation": "Pancreatitis with triglycerides around 1,500 mg/dL is compatible with severe hypertriglyceridemia. Of the listed drugs, a fibrate is the best choice for triglyceride lowering once appropriate for oral therapy. Supportive acute pancreatitis care and addressing secondary causes are also important."},
    {"ids": ["batch-medicine-final-443-p544-q55", "medicine-final-443-endocrinology-q055"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "If LDL remains above the relevant threshold despite a maximally tolerated statin, ezetimibe is an established add-on in familial hypercholesterolemia. Further therapy may be required based on LDL level and cardiovascular risk."},
    {"ids": ["batch-medicine-final-443-p554-q56", "medicine-final-443-neurology-q056"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["pd-dyskinesia"], "explanation": "New involuntary movements after starting levodopa suggest levodopa-associated dyskinesia. Ask how the movements relate to each dose because they can occur at peak effect or during changes in drug effect."},
    {"ids": ["batch-medicine-final-443-p564-q57", "medicine-final-443-neurology-q057"], "answers": ["A"], "ungradedReason": "The recalled stem omits the tremor pattern and does not establish true bradykinesia.", "confidence": "supported", "references": ["pd"], "explanation": "True bradykinesia with a rest tremor supports parkinsonism, making Parkinson disease a reasonable alternative to the Gift key. Essential tremor is usually an action tremor. The recorded slowness and absence of gaze palsy or falls are insufficient to make either diagnosis confidently."},
    {"ids": ["batch-medicine-final-443-p572-q58", "medicine-final-443-neurology-q058"], "answers": [], "ungradedReason": "The stem omits the treatment window, measured blood pressure and explicit exclusion of hemorrhage.", "confidence": "tentative", "references": ["stroke"], "explanation": "Early ischemic stroke can have a normal noncontrast CT. Activate stroke evaluation, confirm that hemorrhage is excluded and assess eligibility for reperfusion. Blood pressure targets depend on planned therapy and other indications. Hypertension alone does not justify the recorded IV-treatment answer."},
    {"ids": ["batch-medicine-final-443-p580-q59", "medicine-final-443-neurology-q059"], "answers": [], "ungradedReason": "The focal-looking motor sign and nonspecific generalized EEG description do not establish a single seizure type.", "confidence": "tentative", "references": ["ilae"], "explanation": "Unilateral arm movement with impaired awareness can suggest focal onset. Some generalized seizures can look asymmetric, so determine whether the generalized spike–wave pattern was ictal and correlate it with the observed event. The provided description cannot reliably establish absence seizure."},
    {"ids": ["batch-medicine-final-443-p590-q60", "medicine-final-443-neurology-q060"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ilae"], "explanation": "Sudden bilateral loss of tone with a limp fall is typical of an atonic seizure. A recording of the actual event would help distinguish it from tonic or myoclonic drop attacks and nonepileptic falls."},
    {"ids": ["batch-medicine-final-443-p599-q61", "medicine-final-443-neurology-q061"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["epilepsy-preg"], "explanation": "Lamotrigine is associated with a lower rate of major congenital malformations than several listed alternatives and is a reasonable choice when effective for the patient’s seizure type. Preconception planning should prioritize seizure control and account for changing drug levels during pregnancy."},
    {"ids": ["batch-medicine-final-443-p607-q62", "medicine-final-443-neurology-q062"], "answers": [], "ungradedReason": "The source marks the key as uncertain, and no specific reference population or stroke classification is supplied.", "confidence": "tentative", "references": ["saudi-stroke"], "explanation": "The question mixes broad stroke categories with etiologic subtypes. Cardioembolic frequency depends on the population, time period and method used to classify ischemic stroke. The cited Gulf registry is useful context but does not support a general rule that cardioembolic stroke is uniquely more common in Saudi Arabia."},
    {"ids": ["batch-medicine-final-443-p613-q63", "medicine-final-443-neurology-q063"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["lhermitte"], "explanation": "An electric shock sensation triggered by neck flexion is Lhermitte phenomenon. It localizes concern to the cervical spinal cord and can occur with demyelinating, compressive or metabolic disease. It does not establish multiple sclerosis without other evidence."},
    {"ids": ["batch-medicine-final-443-p622-q64", "medicine-final-443-neurology-q064"], "answers": [], "ungradedReason": "The case lacks the family history, progressive course and examination needed to identify Huntington disease or to classify the movement confidently.", "confidence": "tentative", "references": ["huntington"], "explanation": "Irregular jerks and speech or swallowing symptoms can occur in choreiform disorders. A task-specific or distractible movement can have other causes. The history raises several possibilities and is insufficient to diagnose Huntington disease."},
    {"ids": ["batch-medicine-final-443-p630-q65", "medicine-final-443-neurology-q065"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Fever, neck stiffness and altered consciousness support meningitis. After imaging when indicated, perform lumbar puncture promptly if safe to obtain CSF. Empiric antibiotics should not be delayed for imaging or lumbar puncture."},
    {"ids": ["batch-medicine-final-443-p638-q66", "medicine-final-443-neurology-q066"], "answers": [], "ungradedReason": "Neck pain on flexion alone is nonspecific and lacks evidence of demyelination.", "confidence": "tentative", "references": ["neck-pain", "lhermitte"], "explanation": "Isolated pain with neck flexion differs from an electric shock radiating down the spine. A musculoskeletal cause is plausible, but the source gives too few findings to diagnose a specific cause or justify the recorded multiple sclerosis key."},
    {"ids": ["batch-medicine-final-443-p647-q67", "medicine-final-443-neurology-q067"], "answers": ["C"], "ungradedReason": "The source omits neuroimaging and onset time. The Gift answer presumes a blood pressure indication that the stem does not establish.", "confidence": "supported", "references": ["stroke"], "explanation": "Sudden focal weakness and headache require immediate stroke activation and emergency neuroimaging. Stroke activation does not automatically mean thrombolysis. Blood-pressure treatment depends on stroke subtype, treatment eligibility and other clinical indications."},
    {"ids": ["batch-medicine-final-443-p656-q68", "medicine-final-443-neurology-q068"], "answers": ["C"], "ungradedReason": "The recall does not describe the movement well enough to rule out other action-induced involuntary movements.", "confidence": "tentative", "references": ["huntington"], "explanation": "Chorea is a plausible pattern if the movements are irregular, flowing and nonrhythmic. Jerks that occur during activity can also represent myoclonus. Direct observation and the course of illness are needed to distinguish them."},
    {"ids": ["batch-medicine-final-443-p667-q69", "medicine-final-443-hematology-oncology-q069"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["apl"], "explanation": "The likely intended wording is Auer rods and suspected acute promyelocytic leukemia. Start all-trans retinoic acid as soon as APL is suspected while arranging rapid genetic confirmation and evaluating coagulopathy. The original spelling is retained in the question."},
    {"ids": ["batch-medicine-final-443-p675-q70", "medicine-final-443-hematology-oncology-q070"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["itp"], "explanation": "Severe thrombocytopenia with mucosal bleeding and no schistocytes is consistent with immune thrombocytopenia, especially if it is isolated. Review the remaining blood count, medications and secondary causes. Absence of schistocytes helps the comparison with a thrombotic microangiopathy but is not definitive by itself."},
    {"ids": ["batch-medicine-final-443-p683-q71", "medicine-final-443-hematology-oncology-q071"], "answers": ["A"], "ungradedReason": "The source omits age, smoking exposure and time since quitting, so screening eligibility cannot be established.", "confidence": "tentative", "references": ["lung-screen"], "explanation": "Annual low-dose CT is the supported lung-cancer screening method for eligible high-risk adults. For instance, USPSTF uses age 50–80, at least 20 pack-years and current smoking or quitting within 15 years. Diabetes alone does not determine lung screening eligibility."},
    {"ids": ["batch-medicine-final-443-p691-q72", "medicine-final-443-hematology-oncology-q072"], "answers": ["C"], "ungradedReason": "No Gift key is recorded. The information supports a stroke alert, but cannot determine immediate drug treatment.", "confidence": "supported", "references": ["stroke"], "explanation": "A new focal deficit with headache is an emergency requiring stroke assessment and rapid brain imaging to distinguish ischemia from hemorrhage. A blood pressure reading of 180/110 alone cannot choose between subsequent treatment pathways."},
    {"ids": ["batch-medicine-final-443-p699-q73", "medicine-final-443-hematology-oncology-q073"], "answers": ["C"], "ungradedReason": "The original note is tentative and the description lacks enough movement detail for a confident classification.", "confidence": "tentative", "references": ["huntington"], "explanation": "Chorea is possible when abnormal movements are flowing, irregular and nonrhythmic. The brief description also allows action-related myoclonus or another movement disorder, and swallowing or speech involvement alone does not settle the classification."},
    {"ids": ["batch-medicine-final-442-p711-q1", "medicine-final-442-cardiology-q001"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["af"], "explanation": "Oral anticoagulation reduces thromboembolic stroke risk in atrial fibrillation. Hypertension and age 70 give this patient a CHA₂DS₂-VA score of 2, meeting the ESC recommendation for anticoagulation. Absence of symptoms and satisfactory rate control do not lower that score."},
    {"ids": ["batch-medicine-final-442-p720-q2", "medicine-final-442-cardiology-q002"], "answers": ["C"], "ungradedReason": "The source does not address anticoagulation duration or establish a compelling hereditary pattern.", "confidence": "tentative", "references": ["thrombophilia"], "explanation": "A young patient with possible familial venous thrombosis raises the question of inherited thrombophilia, and C is the only investigation directed at that issue. Routine testing after an unprovoked DVT is generally unnecessary if the result would not change treatment. The grandmother’s history is also not a confirmed diagnosis."},
    {"ids": ["batch-medicine-final-442-p729-q3", "medicine-final-442-cardiology-q003"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["hypocalcemia"], "explanation": "Severe hypocalcemia prolongs the QT interval, predominantly by lengthening the ST segment. A peaked T wave points more toward hyperkalemia. The original document repeats the same T-wave distractor in A and B."},
    {"ids": ["batch-medicine-final-442-p737-q4", "medicine-final-442-cardiology-q004"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["pleural"], "explanation": "Systolic pressure of 80 mmHg in confirmed PE suggests high-risk hemodynamic instability if sustained and attributable to the embolus. Reperfusion, often systemic thrombolysis when appropriate, is considered in this setting. Bilateral clot burden alone is insufficient."},
    {"ids": ["batch-medicine-final-442-p747-q5", "medicine-final-442-pulmonary-q005"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pleural-infection"], "explanation": "Turbid fluid, loculation, low glucose and pleural pH of 7.1 support a complicated parapneumonic effusion or pleural infection. Drain the accessible collection with an intercostal tube and continue appropriate antibiotics."},
    {"ids": ["batch-medicine-final-442-p758-q6", "medicine-final-442-nephrology-q006"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["gn"], "explanation": "Dysmorphic red cells and red-cell casts localize the bleeding to glomeruli. Active sediment with a new decline in renal function raises concern for proliferative glomerulonephritis and supports urgent nephrology assessment and consideration of biopsy. The source creatinine unit appears malformed."},
    {"ids": ["batch-medicine-final-442-p767-q7", "medicine-final-442-nephrology-q007"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["phpt"], "explanation": "Hydrochlorothiazide reduces urinary calcium excretion and can increase serum calcium. Persistent hypercalcemia merits evaluation for another contributor such as primary hyperparathyroidism."},
    {"ids": ["batch-medicine-final-442-p776-q8", "medicine-final-442-nephrology-q008"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["secondary-htn"], "explanation": "Marked hypertension at age 20 should be confirmed and evaluated for secondary causes. The family history in choice A could separately warrant hereditary pheochromocytoma counseling or surveillance, but that choice does not document hypertension."},
    {"ids": ["batch-medicine-final-442-p786-q9"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["celiac"], "explanation": "Type 1 diabetes, chronic diarrhea and weight loss raise the probability of celiac disease. Begin with tissue transglutaminase IgA and total IgA while the patient is consuming gluten."},
    {"ids": ["batch-medicine-final-442-p800-q10", "medicine-final-442-neurology-q010"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "This presentation strongly suggests bacterial meningitis. Give empiric IV antibiotics promptly and obtain blood cultures and CSF when feasible without delaying treatment. CT was already obtained, and a safe lumbar puncture remains important."},
    {"ids": ["batch-medicine-final-442-p809-q11", "medicine-final-442-neurology-q011"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["tremor"], "explanation": "Long-standing bilateral upper-limb action tremor that is present during posture and movement, with no other neurologic findings, fits essential tremor. The examined phenotype and functional triggers carry more weight than the spiral drawing alone."},
    {"ids": ["batch-medicine-final-442-p818-q12", "medicine-final-442-neurology-q012"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["memory"], "explanation": "Repeatedly forgetting a recent conversation while retaining remote events and object knowledge points to impaired learning or retention of new episodic memories. Working memory instead involves temporarily holding and manipulating information during a task."},
    {"ids": ["batch-medicine-final-442-p827-q13", "medicine-final-442-neurology-q013"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["neuropathy"], "explanation": "Pinprick and thermal perception use small sensory fibers. Vibration and joint position rely mainly on large myelinated fibers. Impairment in both sets of modalities supports mixed-fiber neuropathy even with preserved strength and reflexes early on."},
    {"ids": ["batch-medicine-final-442-p836-q14", "medicine-final-442-neurology-q014"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["gbs"], "explanation": "Progressive bilateral weakness, areflexia and facial weakness following a diarrheal illness point to Guillain–Barré syndrome. The rapid evolution distinguishes it from a chronic inherited neuropathy. Respiratory and autonomic function require close monitoring."},
    {"ids": ["batch-medicine-final-442-p845-q15", "medicine-final-442-neurology-q015"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cmt"], "explanation": "Childhood-onset distal weakness, loss of ankle reflexes, sensory loss, pes cavus and an affected sibling favor an inherited motor and sensory neuropathy such as Charcot–Marie–Tooth disease. The family pattern supports inheritance but alone does not identify the gene."},
    {"ids": ["batch-medicine-final-442-p854-q16", "medicine-final-442-neurology-q016"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["adem"], "explanation": "Encephalopathy accompanying an acute multifocal demyelinating illness is a key feature favoring ADEM. Spinal cord and white-matter involvement also occur in multiple sclerosis. Recurrent typical demyelinating attacks instead favor MS or another relapsing disorder."},
    {"ids": ["batch-medicine-final-442-p862-q17", "medicine-final-442-neurology-q017"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ane"], "explanation": "Acute encephalopathy with symmetric hemorrhagic thalamic lesions is characteristic of acute necrotizing encephalopathy. The bilateral pattern after a viral illness supports that syndrome more than a single primary hemorrhage."},
    {"ids": ["batch-medicine-final-442-p874-q18", "medicine-final-442-neurology-q018"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["vascular-cognition"], "explanation": "Executive slowing, pyramidal signs and multiple vascular risk factors make a vascular cognitive disorder the strongest listed possibility. Brain imaging and clinical history are needed to show a plausible relationship to cerebrovascular disease, since mixed pathology is possible."},
    {"ids": ["batch-medicine-final-442-p883-q19", "medicine-final-442-neurology-q019"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ppa"], "explanation": "A slowly progressive language disorder that dominates the early functional decline is characteristic of primary progressive aphasia. The vignette supports the syndrome without enough language testing to assign a particular variant."},
    {"ids": ["batch-medicine-final-442-p892-q20", "medicine-final-442-neurology-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ebv"], "explanation": "A large longitudinal study found a strong association between Epstein–Barr virus seroconversion and subsequent multiple sclerosis. EBV exposure is very common, so this association does not by itself diagnose or predict MS in an individual."},
    {"ids": ["batch-medicine-final-442-p900-q21", "medicine-final-442-neurology-q021"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["radial"], "explanation": "Compression at the humeral spiral groove weakens wrist and finger extension and can cause dorsal first-web-space sensory loss. Preserved triceps strength places the lesion distal to its major radial motor branches, favoring the groove over the axilla."},
    {"ids": ["batch-medicine-final-442-p909-q22", "medicine-final-442-neurology-q022"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["optic"], "explanation": "Pain on eye movement with subacute monocular blurred vision suggests optic neuritis of the optic nerve. A remote episode affecting both legs raises concern for demyelination, but does not by itself establish multiple sclerosis."},
    {"ids": ["batch-medicine-final-442-p919-q23", "medicine-final-442-neurology-q023"], "answers": [], "ungradedReason": "The source lists the answer options and key but does not include the CSF results referred to in the stem.", "confidence": "tentative", "references": ["meningitis"], "explanation": "Typical bacterial meningitis CSF has increased neutrophils and protein with low glucose relative to blood. Those patterns explain why A might have been intended, but no source values are available to compare in this question."},
    {"ids": ["batch-medicine-final-442-p927-q24", "medicine-final-442-neurology-q024"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["dermatomyositis"], "explanation": "Symmetric proximal weakness, an eyelid heliotrope rash and Gottron papules support dermatomyositis. A biopsy may show perivascular or perimysial inflammation and perifascicular atrophy. Endomysial CD8-predominant inflammation and rimmed vacuoles favor other myopathies."},
    {"ids": ["batch-medicine-final-442-p938-q25", "medicine-final-442-neurology-q025"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["aphasia"], "explanation": "Fluent speech together with poor comprehension and poor repetition is Wernicke aphasia. Conduction aphasia also impairs repetition but leaves comprehension relatively preserved. Broca aphasia is typically nonfluent."},
    {"ids": ["batch-medicine-final-442-p947-q26", "medicine-final-442-neurology-q026"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["delirium"], "explanation": "An abrupt change in attention and awareness that fluctuates over hours or days supports delirium. Dementia usually develops more gradually, though underlying dementia can increase the risk of delirium."},
    {"ids": ["batch-medicine-final-442-p954-q27", "medicine-final-442-neurology-q027"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "Noncontrast head CT is performed immediately to exclude intracranial hemorrhage before considering reperfusion treatment. Early ischemic changes may be absent, so a CT without obvious infarction does not exclude an acute ischemic stroke."},
    {"ids": ["batch-medicine-final-442-p965-q28", "medicine-final-442-rheumatology-q028"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ssc", "ssc-paht"], "explanation": "Raynaud phenomenon, abnormal nailfold capillaries and skin thickening limited to the distal fingers indicate limited cutaneous systemic sclerosis. Pulmonary arterial hypertension is a classic association and can occur across subsets. Screening is important because early disease can be clinically silent."},
    {"ids": ["batch-medicine-final-442-p974-q29", "medicine-final-442-rheumatology-q029"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["oa"], "explanation": "Exercise is a core intervention for knee osteoarthritis. Quadriceps strengthening can improve pain and function; the regimen should be adapted to the patient’s symptoms and mobility."},
    {"ids": ["batch-medicine-final-442-p982-q30", "medicine-final-442-rheumatology-q030"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["axspa-treatment"], "explanation": "With symptomatic axial disease and no peripheral arthritis, use an NSAID if safe and combine this with exercise or physiotherapy. Conventional DMARDs such as methotrexate and sulfasalazine are not first-line therapy for isolated axial disease."},
    {"ids": ["batch-medicine-final-442-p991-q31", "medicine-final-442-rheumatology-q031"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["axspa-treatment"], "explanation": "Persistent symptoms after adequate NSAID trials with an elevated CRP support escalation to a biologic or targeted therapy after specialist assessment. Psoriasis and other comorbidities can affect choice of class."},
    {"ids": ["batch-medicine-final-442-p1000-q32", "medicine-final-442-rheumatology-q032"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["axspa"], "explanation": "Long morning stiffness, enthesitis and dactylitis support spondyloarthritis despite a normal X-ray. MRI with an inflammatory sacroiliac protocol can detect changes before they become visible on radiographs."},
    {"ids": ["batch-medicine-final-442-p1009-q33", "medicine-final-442-rheumatology-q033"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pregnancy-ra"], "explanation": "Adalimumab is an anti-TNF treatment that can be appropriate during pregnancy if needed. Choice and timing depend on disease control and placental transfer. Methotrexate is contraindicated and tofacitinib is generally avoided."},
    {"ids": ["batch-medicine-final-442-p1018-q34", "medicine-final-442-rheumatology-q034"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ra-class", "carpal"], "explanation": "Sensory loss affecting the palmar first three digits and symptoms relieved by shaking suggest carpal tunnel syndrome. Prolonged bilateral morning stiffness points to an inflammatory arthritis such as RA, which can compress the median nerve through wrist synovitis."},
    {"ids": ["batch-medicine-final-442-p1027-q35", "medicine-final-442-rheumatology-q035"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["sle-clinical"], "explanation": "Fatigue and arthralgias are common symptoms of active SLE. Serositis, including pleuritis or pericarditis, can also occur but is less typical as the most common presenting cluster. Fatigue and joint pain remain nonspecific."},
    {"ids": ["batch-medicine-final-442-p1035-q36", "medicine-final-442-rheumatology-q036"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["axspa-treatment"], "explanation": "Bilateral grade 3 sacroiliitis with inflammatory axial symptoms supports radiographic axial spondyloarthritis. An NSAID is the first listed drug option if suitable, alongside nonpharmacologic treatment. Conventional DMARDs have little effect on purely axial symptoms."},
    {"ids": ["batch-medicine-final-442-p1044-q37", "medicine-final-442-rheumatology-q037"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ssc-ild"], "explanation": "Rheumatoid arthritis is the inflammatory arthritis with the strongest established link to interstitial lung disease among these options. Risk rises with factors such as older age, smoking and high-titer autoantibodies."},
    {"ids": ["batch-medicine-final-442-p1052-q38", "medicine-final-442-rheumatology-q038"], "answers": ["A", "C"], "ungradedReason": "The source does not identify the criteria edition. More than one listed feature appears in the current framework.", "confidence": "tentative", "references": ["sle"], "explanation": "Malar rash contributes to acute cutaneous lupus. The 2019 EULAR/ACR criteria also include nonscarring alopecia, so the broad choice “alopecia” can overlap that definition. The historic ACR classification emphasized malar rash, helping explain the recorded key."},
    {"ids": ["batch-medicine-final-442-p1062-q39", "medicine-final-442-infectious-diseases-q039"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["syphilis"], "explanation": "Meningovascular disease is an early neurologic manifestation of syphilis among the choices. General paresis and tabes dorsalis are classically later manifestations. Neurologic involvement can occur at any stage."},
    {"ids": ["batch-medicine-final-442-p1070-q40", "medicine-final-442-infectious-diseases-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["severe-malaria"], "explanation": "Fever, seizures, impaired consciousness and shock after travel raise concern for severe malaria. IV artesunate is preferred for severe malaria, while urgent blood testing and stabilization are undertaken. Chloroquine and oral atovaquone regimens are unsuitable first choices for a critically ill patient."},
    {"ids": ["batch-medicine-final-442-p1089-q41", "medicine-final-442-infectious-diseases-q041"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["dengue-vector"], "explanation": "Retro-orbital pain, myalgia, rash and cytopenias after exposure in an area with dengue are characteristic clues. Dengue is primarily transmitted by bites of infected Aedes mosquitoes, especially Aedes aegypti."},
    {"ids": ["batch-medicine-final-442-p1098-q42", "medicine-final-442-infectious-diseases-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["baricitinib-zoster"], "explanation": "JAK inhibitors, including baricitinib, carry an increased herpes zoster risk. The patient’s age and past episodes make that history relevant to drug choice and vaccination review."},
    {"ids": ["batch-medicine-final-442-p1107-q43", "medicine-final-442-infectious-diseases-q043"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Fever, altered consciousness and nuchal rigidity suggest acute bacterial meningitis. Streptococcus pneumoniae is a leading adult cause and the best epidemiologic choice here. Age and presentation alone cannot establish the organism, so obtain microbiologic confirmation when safe."},
    {"ids": ["batch-medicine-final-442-p1116-q44", "medicine-source-442-final-q044"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["syphilis"], "explanation": "Meningovascular syphilis can occur earlier than parenchymal forms such as general paresis. The same clinical answer appears at A in Batch 442 Q39, where the choices are reordered."},
    {"ids": ["batch-medicine-final-442-p1124-q45", "medicine-final-442-infectious-diseases-q045"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ms-relapse"], "explanation": "An intercurrent infection can transiently worsen previous MS deficits and cause a pseudo-relapse. Address influenza and reassess after fever and infection resolve. Persistent new objective deficits after the infection clears warrant evaluation for a true relapse."},
    {"ids": ["batch-medicine-final-442-p1133-q46", "medicine-final-442-infectious-diseases-q046"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "knowlesi-study"], "explanation": "Return from Malaysia with fever, splenomegaly and severe systemic illness raises suspicion for malaria. Plasmodium knowlesi is an important Malaysian cause and the strongest listed option. Urgent testing and reliable species identification are needed, since the travel history does not establish the species."},
    {"ids": ["batch-medicine-final-442-p1142-q47", "medicine-final-442-infectious-diseases-q047"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "Fever, hypotension and splenomegaly in pregnancy after travel are concerning for severe malaria. Falciparum is the strongest listed species, but microscopy or appropriate additional testing is needed. This presentation requires urgent assessment and treatment."},
    {"ids": ["batch-medicine-final-442-p1152-q48", "medicine-final-442-endocrinology-q048"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ata-pregnancy"], "explanation": "Early postpartum thyrotoxicosis with improving symptoms and a normal current heart rate favors the transient thyrotoxic phase of postpartum thyroiditis. Repeat TSH and free T4 to document the course and detect later hypothyroidism. Thionamides do not help destructive thyroiditis."},
    {"ids": ["batch-medicine-final-442-p1161-q49", "medicine-final-442-endocrinology-q049"], "answers": ["B"], "ungradedReason": "The recorded constipation key is not supported as an established colorectal cancer risk factor in this case.", "confidence": "supported", "references": ["crc-risk", "constipation-cohort"], "explanation": "Type 2 diabetes is associated with a higher risk of colorectal cancer. Long-standing constipation, by itself, is not an established equivalent risk factor. New bowel symptoms still require separate evaluation when clinically indicated."},
    {"ids": ["batch-medicine-final-442-p1170-q50", "medicine-final-442-endocrinology-q050"], "answers": ["D"], "ungradedReason": "Thyroid evaluation and a discussion of eligibility for bariatric surgery are both reasonable. The stem mixes initial evaluation with treatment.", "confidence": "tentative", "references": ["obesity-endocrine", "bariatric"], "explanation": "Checking thyroid function can be part of a structured obesity evaluation. With BMI 42, referral for a bariatric surgery discussion is also appropriate in many guidelines. Surgery does not replace initial assessment and shared treatment planning."},
    {"ids": ["batch-medicine-final-442-p1179-q51", "medicine-final-442-endocrinology-q051"], "answers": ["B", "D"], "ungradedReason": "Both HbA1c and fasting plasma glucose are accepted screening tests.", "confidence": "tentative", "references": ["diabetes"], "explanation": "HbA1c is convenient because it does not require fasting. Fasting plasma glucose is also a recommended test. The 1-hour 50 g load is a pregnancy screening test, and random glucose alone is not the usual test for asymptomatic screening."},
    {"ids": ["batch-medicine-final-442-p1188-q52", "medicine-final-442-endocrinology-q052"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["weight-adapt"], "explanation": "A lower body mass reduces energy needs, and adaptive thermogenesis can further decrease energy expenditure during weight maintenance. Among these choices, a fall in resting metabolic rate best explains why a previously successful intake may no longer produce a deficit."},
    {"ids": ["batch-medicine-final-442-p1197-q53"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Markedly elevated prolactin with a large pituitary lesion supports a macroprolactinoma. Cabergoline is usually the initial dopamine agonist, with visual field assessment when the optic chiasm may be involved."},
    {"ids": ["batch-medicine-final-442-p1206-q54", "medicine-final-442-endocrinology-q054"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ata-pregnancy"], "explanation": "Guidance advises avoiding conception for at least 6 months after radioactive iodine treatment for hyperthyroidism and confirming stable thyroid function before attempting pregnancy. That makes the 6–12 month range the best listed answer."},
    {"ids": ["batch-medicine-final-442-p1217-q55", "medicine-final-442-endocrinology-q055"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-weight", "bariatric"], "explanation": "Begin with an individualized lifestyle program covering nutrition, physical activity and behavior support. At BMI 36, medication and bariatric referral can also be appropriate after discussion, depending on the person and local eligibility. Lifestyle support remains relevant across those choices."},
    {"ids": ["batch-medicine-final-442-p1226-q56", "medicine-final-442-endocrinology-q056"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pituitary"], "explanation": "The restored lab table shows low free T4 with an inappropriately low TSH, plus abnormalities in other pituitary axes. This supports possible hypopituitarism and pituitary MRI. Check adrenal function before giving levothyroxine."},
    {"ids": ["batch-medicine-final-442-p1237-q57", "medicine-final-442-endocrinology-q057"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds"], "explanation": "Semaglutide is a GLP-1 receptor agonist. In this regimen, metformin is the biguanide and dapagliflozin is the SGLT2 inhibitor."},
    {"ids": ["batch-medicine-final-442-p1246-q58", "medicine-final-442-endocrinology-q058"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Amenorrhea, galactorrhea and infertility make serum prolactin the key listed test. Also consider a pregnancy test, medications, TSH and other causes when interpreting a raised prolactin."},
    {"ids": ["batch-medicine-final-442-p1254-q59", "medicine-final-442-endocrinology-q059"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Hypotension, hyperpigmentation, hyponatremia and hyperkalemia suggest primary adrenal insufficiency. Loss of cortisol feedback raises ACTH. Adrenal tuberculosis is a possible cause in this setting, but the history does not establish adrenal involvement."},
    {"ids": ["batch-medicine-final-442-p1263-q60", "medicine-final-442-endocrinology-q060"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lipid", "tg"], "explanation": "Hypothyroidism is a reversible secondary contributor to dyslipidemia. Thyroid function tests are the best listed investigation, alongside assessment of other contributors such as diabetes, alcohol and medications."},
    {"ids": ["batch-medicine-final-442-p1271-q61", "medicine-final-442-endocrinology-q061"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Proximal muscle weakness and easy bruising are more discriminatory for Cushing syndrome than common features such as obesity, diabetes and hypertension. The clinical findings raise suspicion and require appropriate biochemical testing."},
    {"ids": ["batch-medicine-final-442-p1279-q62", "medicine-final-442-endocrinology-q062"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Very low morning cortisol together with markedly elevated ACTH supports primary adrenal insufficiency. Increased POMC-derived melanocortin activity explains the expected hyperpigmentation, particularly in skin creases and mucosa."},
    {"ids": ["batch-medicine-final-442-p1287-q63", "medicine-final-442-endocrinology-q063"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lipemia"], "explanation": "Marked chylomicronemia can make retinal vessels look creamy because of high circulating triglycerides. The classic name is lipemia retinalis. Its absence would not rule out severe hypertriglyceridemia."},
    {"ids": ["batch-medicine-final-442-p1295-q64"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Immune-mediated pancreatic beta-cell destruction causes insulin deficiency in type 1 diabetes. The selected mechanism is A in this bank. An older bank places the same mechanism at C."},
    {"ids": ["batch-medicine-final-442-p1303-q65", "medicine-final-442-endocrinology-q065"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "Progressive enlargement of hands and feet, coarsened facial features, sweating and headache strongly suggest acromegaly. Serum IGF-1 is an appropriate first biochemical assessment in a patient with these features."},
    {"ids": ["batch-medicine-final-442-p1311-q66", "medicine-final-442-endocrinology-q066"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["dka", "insulin-peds"], "explanation": "The restored blood tests show hyperglycemia, metabolic acidosis and positive ketones, supporting diabetic ketoacidosis. After stabilization, a multiple-dose insulin regimen is the appropriate listed discharge treatment. Obesity and family history alone do not establish type 2 diabetes."},
    {"ids": ["batch-medicine-final-442-p1323-q67", "medicine-final-442-endocrinology-q067"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["obesity-inflammation"], "explanation": "Inflammatory signaling from adipose tissue can interfere with normal insulin action. The expected change is reduced insulin sensitivity and, in insulin-responsive tissues, impaired glucose uptake."},
    {"ids": ["batch-medicine-final-442-p1332-q68", "medicine-final-442-endocrinology-q068"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["breast-pain"], "explanation": "Age and unilateral symptoms make diagnostic mammography with targeted ultrasound a reasonable listed approach if the pain is persistent, focal and noncyclic. Diffuse or cyclical pain without another suspicious finding may not need diagnostic imaging beyond routine screening."},
    {"ids": ["batch-medicine-final-442-p1344-q69", "medicine-final-442-endocrinology-q069"], "answers": ["A", "D"], "ungradedReason": "Both cure in selected lymphomas and systemic disease control are possible. The question does not specify subtype or ask for the greatest potential effect.", "confidence": "tentative", "references": ["lymphoma-treatment"], "explanation": "Systemic treatment can cure some lymphomas, including many Hodgkin lymphomas, and can provide systemic control or palliation in other settings. Histologic subtype, stage and regimen influence the goal and result."},
    {"ids": ["batch-medicine-final-442-p1353-q70", "medicine-final-442-endocrinology-q070"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["aml"], "explanation": "Auer rods are abnormal azurophilic inclusions in myeloid blasts and support myeloid differentiation. They are not present in every AML case. Reed–Sternberg cells point to a different disease."},
    {"ids": ["batch-medicine-final-442-p1361-q71", "medicine-final-442-endocrinology-q071"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pep", "hivtest"], "explanation": "Ten days is beyond the usual 72-hour window for starting nonoccupational HIV PEP. Obtain baseline testing and arrange follow-up because even a negative nucleic acid test this early can miss infection. CD4 count is not a diagnostic HIV test."},
    {"ids": ["batch-medicine-final-442-p1370-q72", "medicine-final-442-endocrinology-q072"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["aplastic"], "explanation": "Pancytopenia combined with a markedly low reticulocyte count points to reduced bone marrow production. Acute blood loss or hemolysis usually produces a compensatory reticulocyte response after time for marrow recovery. The cause of marrow failure still requires evaluation."},
    {"ids": ["batch-medicine-final-442-p1379-q73", "medicine-final-442-endocrinology-q073"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-dx"], "explanation": "FDG avidity and imaging location do not determine histology. Obtain tissue from the mediastinal mass or another suitable site before choosing specific therapy. A suspected lymphoma requires enough tissue for classification."},
    {"ids": ["batch-medicine-final-442-p1388-q74", "medicine-final-442-endocrinology-q074"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cancer-vte"], "explanation": "Weight loss, jaundice and hepatomegaly suggest an underlying hepatobiliary malignancy among the choices. Active cancer can create a hypercoagulable state that provokes venous thromboembolism. The symptoms require investigation rather than proving the cause of this embolus."},
    {"ids": ["batch-medicine-final-442-p1397-q75", "medicine-final-442-endocrinology-q075"], "answers": ["C"], "ungradedReason": "The source does not establish a hereditary syndrome or explain how testing would alter treatment.", "confidence": "tentative", "references": ["thrombophilia"], "explanation": "The patient's young age and reported family history explain why the bank favors thrombophilia testing. In current practice, first establish whether the DVT was provoked and whether a test would change anticoagulation or family counseling."},
    {"ids": ["batch-medicine-final-442-p1406-q76", "medicine-final-442-endocrinology-q076"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["fap"], "explanation": "A family history of familial adenomatous polyposis warrants genetic evaluation and endoscopic surveillance. Colonoscopy with removal of amenable polyps is the best listed intervention. Confirmed FAP often requires colectomy depending on polyp burden and other features."},
    {"ids": ["batch-medicine-final-442-p1414-q77", "medicine-final-442-endocrinology-q077"], "answers": ["A"], "ungradedReason": "The recorded sickle-cell key is not supported by microcytosis alone. The stem lacks iron studies and hemoglobin analysis.", "confidence": "tentative", "references": ["microcytosis"], "explanation": "Microcytosis is compatible with thalassemia among the listed conditions. A reduced RBC count and nonspecific anemia symptoms do not prove it, and iron deficiency is a common alternative absent from the choices. Sickle-cell disease cannot be identified from these indices alone."},
    {"ids": ["batch-medicine-final-442-p1423-q78", "medicine-final-442-endocrinology-q078"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["iron"], "explanation": "The restored table shows microcytic anemia, ferritin of 8 ng/mL and low transferrin saturation. Together with heavy menstrual bleeding, this strongly supports iron deficiency from chronic blood loss."},
    {"ids": ["batch-medicine-final-442-p1434-q79", "medicine-final-442-endocrinology-q079"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["breast-risk"], "explanation": "Atypical hyperplasia is an established breast cancer risk factor. Family history can also increase risk, particularly with close or multiple relatives, but the choice “any relative” lacks the required precision. Later menarche and earlier menopause generally reduce lifetime estrogen exposure."},
    {"ids": ["batch-medicine-final-442-p1442-q80", "medicine-final-442-endocrinology-q080"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ssc"], "explanation": "Raynaud phenomenon, fingertip pitting scars, telangiectasias and skin thickening support systemic sclerosis. If the reported arm involvement extends proximal to the elbows, it is diffuse cutaneous disease. Thickening confined to the forearms and hands would fit the limited subset."},
    {"ids": ["batch-medicine-final-439-p2376-q25", "medicine-final-439-endocrinology-q025"], "answers": [], "ungradedReason": "The options omit ultrasound assessment, and the other batch gives a different choice set and a different key.", "confidence": "tentative", "references": ["thyroid"], "explanation": "Normal TSH and free T4 suggest a euthyroid goiter. If a nodule is known or suspected, ultrasound findings and its size determine whether fine-needle aspiration is indicated. The 439 choice C means thyroidectomy, while 438 choice C means reassessment. Those letters describe different actions."},
    {"ids": ["batch-medicine-final-438-p2930-q18"], "answers": [], "ungradedReason": "The recalled choices omit ultrasound assessment and the description does not indicate whether a focal nodule is present.", "confidence": "tentative", "references": ["thyroid"], "explanation": "An asymptomatic euthyroid goiter does not justify automatic aspiration. Ultrasound is appropriate when a thyroid nodule is suspected, and biopsy then depends on sonographic pattern and size. Follow-up can suit an evaluated low-risk finding, but the question omits the information needed to make that choice confidently."},
    {"ids": ["batch-medicine-final-439-p2675-q59", "medicine-final-439-hematology-oncology-q059"], "answers": ["B"], "ungradedReason": "Thresholds depend on the protocol and whether the distinction is leukemia versus lymphoblastic lymphoma.", "confidence": "tentative", "references": ["all", "all-nccn"], "explanation": "The Gift uses 20% as its threshold, option B in this version. Some adult protocols use a higher threshold for distinguishing marrow-predominant ALL from lymphoblastic lymphoma. Diagnosis also requires proof of lymphoid lineage and classification studies."},
    {"ids": ["batch-medicine-final-437-p3529-q56"], "answers": ["A"], "ungradedReason": "Thresholds depend on the protocol and whether the distinction is leukemia versus lymphoblastic lymphoma.", "confidence": "tentative", "references": ["all", "all-nccn"], "explanation": "The Gift explicitly uses 20% for its recall and mentions a higher cutoff for comparison with lymphoblastic lymphoma. Option A is 20% in this version. Contemporary classification also depends on disease distribution, immunophenotype and genetic findings."},
    {"ids": ["batch-medicine-final-437-p3330-q31", "medicine-final-437-endocrinology-q031"], "answers": ["A", "B"], "ungradedReason": "The original source accepts both smoking and diabetes, so the single-best-answer stem is underspecified.", "confidence": "tentative", "references": ["pancreas-risk"], "explanation": "Both tobacco smoking and diabetes are recognized risk factors for pancreatic cancer. The recall cites a lecture preference for smoking, but the question does not give a criterion to exclude diabetes."},
    {"ids": ["batch-medicine-final-435-p4130-q42", "medicine-final-435-endocrinology-q042"], "answers": ["A"], "ungradedReason": "The bank also allows raw weight, and the question does not clarify which measurement it wants.", "confidence": "tentative", "references": ["bmi"], "explanation": "BMI adjusts weight for height and is widely used as a screening surrogate for adiposity. Weight alone ignores height. Neither measurement directly quantifies fat mass or separates fat from lean tissue."},
    {"ids": ["batch-medicine-final-434-p4413-q1", "medicine-final-434-rheumatology-q001"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["septic-joint"], "explanation": "A hot, swollen single joint with fever and leukocytosis raises concern for septic arthritis. Perform arthrocentesis promptly for cell count, Gram stain, culture and crystal analysis. Blood cultures can supplement joint sampling when bacteremia is suspected."},
    {"ids": ["batch-medicine-final-434-p4591-q27", "medicine-final-434-endocrinology-q027"], "answers": ["A", "D"], "ungradedReason": "The original records both abnormal protein measurements as answers to a single-choice question.", "confidence": "tentative", "references": ["diabetes-ckd"], "explanation": "An albumin-to-creatinine ratio of 250 mg/g is moderately elevated and compatible with diabetic kidney disease. Proteinuria of 5 g/day is also significant but is nephrotic-range and prompts consideration of additional renal causes. Persistence and clinical assessment are needed to attribute the abnormality."},
    {"ids": ["batch-medicine-final-433-p4915-q11", "medicine-final-433-infectious-diseases-q011"], "answers": ["D"], "ungradedReason": "The recorded A-or-C key is conditional and differs from guidance for the asymptomatic state suggested here.", "confidence": "supported", "references": ["asb"], "explanation": "Routine culture without urinary symptoms six months after renal transplant suggests asymptomatic bacteriuria. IDSA advises against screening or treating this after the first postoperative month. If symptoms or systemic features develop, reassess for symptomatic infection and select treatment accordingly."},
    {"ids": ["batch-medicine-final-441-p2062-q70", "medicine-final-441-mixed-medicine-q070"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Fever, photophobia, neck stiffness and lethargy suggest acute bacterial meningitis. Start empiric IV antibiotics promptly. Blood cultures, cranial imaging when indicated and CSF evaluation should be arranged without delaying treatment."},
    {"ids": ["batch-medicine-final-441-p2071-q71", "medicine-final-441-mixed-medicine-q071"], "answers": ["C"], "ungradedReason": "The recorded constipation answer treats a symptom as an established causal risk factor.", "confidence": "supported", "references": ["crc-risk", "constipation-cohort"], "explanation": "Smoking is an established colorectal cancer risk factor among the listed choices. Weight loss and altered bowel habits are reasons for diagnostic evaluation. Constipation alone does not carry the same established causal evidence as smoking."},
    {"ids": ["batch-medicine-final-441-p2080-q72", "medicine-final-441-mixed-medicine-q072"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["warfarin"], "explanation": "Warfarin inhibits vitamin K epoxide reductase, decreasing the activation of clotting factors II, VII, IX and X and proteins C and S. This differs from direct factor Xa and direct thrombin inhibition."},
    {"ids": ["batch-medicine-final-441-p2088-q73", "medicine-final-441-endocrinology-q073"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetic-foot"], "explanation": "Poor glycemic control combined with smoking and hypertension gives the highest risk among these options for neuropathic or vascular foot complications. In practice assess loss of protective sensation, peripheral arterial disease and history of ulceration or amputation directly."},
    {"ids": ["batch-medicine-final-441-p2096-q74", "medicine-final-441-rheumatology-q074"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["sle-treatment"], "explanation": "Inflammatory arthritis and a rash without an acute organ-threatening manifestation support hydroxychloroquine as foundational SLE treatment. Individualize the dose by actual body weight and retinal risk. The blood count and organ assessment still matter when deciding on additional therapy."},
    {"ids": ["batch-medicine-final-441-p2105-q75", "medicine-final-441-neurology-q075"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ppa"], "explanation": "Progressive effortful, nonfluent speech with relative preservation of comprehension and memory suggests nonfluent or agrammatic primary progressive aphasia. The expected imaging pattern includes left posterior frontal and insular atrophy rather than predominant occipital changes."},
    {"ids": ["batch-medicine-final-441-p2114-q76", "medicine-final-441-infectious-diseases-q076"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["mrsa"], "explanation": "CDC recommends Contact Precautions for acute-care inpatients with MRSA infection or colonization, in addition to Standard Precautions. MRSA bacteremia in a patient with a prosthetic valve also warrants prompt evaluation for endocarditis."},
    {"ids": ["batch-medicine-final-441-p2123-q77", "medicine-final-441-neurology-q077"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pd"], "explanation": "Vertical supranuclear gaze palsy suggests an atypical parkinsonian syndrome such as progressive supranuclear palsy. Downward supranuclear gaze palsy or selective slowing of downward saccades is an exclusion feature for typical Parkinson disease in MDS criteria. Hyposmia and REM sleep behavior disorder can accompany Parkinson disease."},
    {"ids": ["batch-medicine-final-441-p2132-q78", "medicine-final-441-endocrinology-q078"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["thyroid"], "explanation": "Microcalcifications in a hypoechoic 1.6 cm thyroid nodule and a calcified lateral cervical node raise concern for thyroid cancer with nodal disease. Ultrasound-guided sampling of the suspicious node and thyroid nodule is the best listed approach."},
    {"ids": ["batch-medicine-final-441-p2142-q79", "medicine-final-441-hematology-oncology-q079"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["all"], "explanation": "Among acute leukemias, Philadelphia chromosome t(9;22), producing BCR::ABL1, is strongly associated with a subset of B-cell acute lymphoblastic leukemia. It is also characteristic of chronic myeloid leukemia, which is outside the acute-leukemia comparison."},
    {"ids": ["batch-medicine-final-441-p2150-q80", "medicine-final-441-hematology-oncology-q080"], "answers": ["D"], "ungradedReason": "The case asks for one next step but does not report stability or clearly separate diagnostic evaluation from acute management.", "confidence": "tentative", "references": ["iron", "transfusion"], "explanation": "The restored blood count shows severe microcytic anemia. Iron studies are appropriate to identify the cause, with investigation for blood loss or malignancy as indicated. At hemoglobin 7 g/dL with acute dyspnea, decisions about stabilization and transfusion depend on the patient's symptoms, circulation, comorbidities and ongoing bleeding."},
    {"ids": ["batch-medicine-final-441-p1454-q1", "medicine-final-441-mixed-medicine-q001"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactin-2023"], "explanation": "The source table shows TSH 44 mU/L and low free T4, establishing primary hypothyroidism. Increased hypothalamic TRH can stimulate prolactin release and explain the galactorrhoea. Treating hypothyroidism can normalize prolactin. A pituitary workup is appropriate if the elevation persists."},
    {"ids": ["batch-medicine-final-441-p1464-q2", "medicine-final-441-mixed-medicine-q002"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cushing", "cushing-local"], "explanation": "The source includes two cortisol measurements and a detectable ACTH. If the cortisol results are above the assay’s reference limits and endogenous ACTH-dependent Cushing syndrome is confirmed, pituitary MRI is the first localization study among these choices. Petrosal sinus sampling is reserved for indeterminate situations such as negative or very small MRI findings. Verify the assay limits before interpreting the recalled numbers."},
    {"ids": ["batch-medicine-final-441-p1498-q6", "medicine-final-441-mixed-medicine-q006"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Hyperpigmentation, low blood pressure, hyponatremia and hyperkalemia together point to primary adrenal insufficiency. Low adrenal cortisol removes feedback inhibition, so pituitary ACTH rises. A history of tuberculosis offers a possible adrenal cause without proving it."},
    {"ids": ["batch-medicine-final-441-p1541-q11", "medicine-final-441-mixed-medicine-q011"], "answers": [], "ungradedReason": "The Gift keys C. WHO advises against routinely starting remdesivir in critical COVID-19, including the already ventilated patient in this recall. No listed drug is the standard answer for this stage.", "confidence": "tentative", "references": ["critical-covid"], "explanation": "Remdesivir is the SARS-CoV-2 antiviral among the choices, which explains the historical key. Treatment depends on disease stage. In critical COVID-19 already requiring invasive ventilation, corticosteroids are part of guideline-based treatment and other supportive or anti-inflammatory therapy is selected according to the presentation."},
    {"ids": ["batch-medicine-final-441-p1559-q13", "medicine-final-441-mixed-medicine-q013"], "answers": [], "ungradedReason": "The native Word source has the recorded letter D and no recoverable answer choices.", "confidence": "tentative", "references": ["diabetes"], "explanation": "Diagnostic diabetes cutoffs include A1C at least 6.5%, fasting plasma glucose at least 126 mg/dL, or 2-hour plasma glucose at least 200 mg/dL during a 75-g oral glucose tolerance test. In a patient with classic symptoms or hyperglycemic crisis, a random plasma glucose of at least 200 mg/dL is diagnostic. Otherwise confirm an abnormal result with a second abnormal test."},
    {"ids": ["batch-medicine-final-441-p1568-q14", "medicine-final-441-mixed-medicine-q014"], "answers": ["C"], "ungradedReason": "The Gift points to urinary protein, but an isolated triglyceride result does not establish that every patient needs 24-hour urine collection.", "confidence": "tentative", "references": ["tg"], "explanation": "Secondary causes of marked hypertriglyceridemia include diabetes, hypothyroidism, kidney disease and medications. Nephrotic syndrome can produce pronounced dyslipidemia with heavy proteinuria, making a urine protein assessment the only relevant option. In practice initial quantification can often be performed with a spot urine sample."},
    {"ids": ["batch-medicine-final-441-p1586-q16", "medicine-final-441-mixed-medicine-q016"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc-cancer"], "explanation": "Anti-RNA polymerase III antibodies are associated with cancers diagnosed close to systemic-sclerosis onset. They also identify a subgroup at higher risk of scleroderma renal crisis. Anti-centromere and anti-topoisomerase I antibodies are associated with other disease patterns."},
    {"ids": ["batch-medicine-final-441-p1629-q21", "medicine-final-441-mixed-medicine-q021"], "answers": ["D"], "ungradedReason": "The Gift records D. The weak stem gives no blood pressure or eye findings and repeats ischemic bowel as both A and B.", "confidence": "tentative", "references": ["htn-retina"], "explanation": "Malignant hypertension can occasionally cause a serous retinal detachment through choroidal vascular injury. This is the possible association represented by D. Ordinary uncontrolled hypertension alone does not make retinal detachment the expected complication."},
    {"ids": ["batch-medicine-final-441-p1638-q22", "medicine-final-441-mixed-medicine-q022"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cushing", "cushing-local"], "explanation": "The restored investigation table reports urine free cortisol three times the upper limit of normal, elevated late-night cortisol and ACTH below 5 pg/mL. In confirmed endogenous hypercortisolism, suppressed ACTH suggests an adrenal source, making adrenal CT the appropriate localization step. If the cortisol and ACTH tests had not already been performed, imaging would be premature."},
    {"ids": ["batch-medicine-final-441-p1648-q23", "medicine-final-441-mixed-medicine-q023"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Easy bruising, proximal weakness, weight gain and facial or dorsocervical fat accumulation raise suspicion of Cushing syndrome. Twenty-four-hour urine free cortisol is one accepted initial test, usually with at least two measurements. A random serum cortisol does not have the same diagnostic role. The recalled abdominal finding is unspecified and is unnecessary to choose C."},
    {"ids": ["batch-medicine-final-441-p1690-q28", "medicine-final-441-mixed-medicine-q028"], "answers": ["C"], "ungradedReason": "The Gift records C. A 2.5 cm mass with only a modest prolactin rise is insufficient to diagnose a macroprolactinoma from this case alone.", "confidence": "tentative", "references": ["prolactin-2023"], "explanation": "Dopamine agonist treatment is first-line for most confirmed macroprolactinomas. Here visual symptoms need prompt formal assessment. The restored findings raise two alternatives to a straightforward prolactinoma: stalk compression causing a modest prolactin rise, and a falsely low assay from the high-dose hook effect. Repeat prolactin on a diluted sample before committing to tumor-specific therapy."},
    {"ids": ["batch-medicine-final-441-p1744-q34", "medicine-final-441-mixed-medicine-q034"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["microcytosis"], "explanation": "The source table reports hemoglobin 7 g/dL, MCV 67 fL and reticulocytes 8%. Jaundice and the reticulocyte response support hemolysis, while microcytosis leaves thalassemia and mixed hemoglobinopathies in the differential. Hemoglobin fractionation is the best listed diagnostic test. Assess symptoms and stability separately when deciding whether transfusion is needed."},
    {"ids": ["batch-medicine-final-441-p1771-q37", "medicine-final-441-mixed-medicine-q037"], "answers": ["B"], "ungradedReason": "Intra-articular corticosteroid is reasonable, but dose-adjusted colchicine or other first-line therapy may also fit, depending on renal function, interactions and time course.", "confidence": "tentative", "references": ["gout", "septic-joint"], "explanation": "A glucocorticoid injection can treat a single inflamed knee while limiting systemic exposure, provided septic arthritis has been adequately excluded. The reported percent is not a standard creatinine-clearance unit. Reduced renal function may affect the safety of colchicine or oral NSAIDs, but the stem does not give enough clinical detail to rule out every alternative."},
    {"ids": ["batch-medicine-final-441-p1780-q38", "medicine-final-441-mixed-medicine-q038"], "answers": [], "ungradedReason": "Regional nodal involvement alone does not determine a complete treatment plan. The stem does not give the histology that would guide staging and systemic treatment.", "confidence": "tentative", "references": ["skin-tumor"], "explanation": "Ipsilateral axillary nodes are regional drainage for a left arm tumor. Nodal spread is distinct from distant metastasis. The key A appears to capture regional disease, but its local-treatment-only wording is too narrow. For example, resectable node-positive melanoma may need surgery plus systemic therapy, and other cancers have different pathways."},
    {"ids": ["batch-medicine-final-441-p1806-q41", "medicine-final-441-mixed-medicine-q041"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["iron-gi"], "explanation": "Marked weight loss with new anemia in an older patient warrants prompt investigation for malignancy. Colonoscopy is the best listed test because it can identify and biopsy a colorectal lesion. Confirm iron deficiency and consider upper as well as lower endoscopy when indicated. A negative family history and tumor markers cannot exclude colorectal cancer."},
    {"ids": ["batch-medicine-final-441-p1815-q42", "medicine-final-441-mixed-medicine-q042"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["nmosd"], "explanation": "Severe optic neuritis followed by longitudinally extensive myelitis is a characteristic pattern of NMOSD. Serum AQP4-IgG, preferably by a cell-based assay, is the appropriate first antibody test. A negative result does not exclude all inflammatory demyelinating disease and can prompt MOG-IgG testing in a compatible case."},
    {"ids": ["batch-medicine-final-441-p1824-q43", "medicine-final-441-mixed-medicine-q043"], "answers": ["D"], "ungradedReason": "ALL mortality depends on age, treatment phase, regimen and relapse status. The question gives none of these and does not establish a universal leading cause.", "confidence": "tentative", "references": ["all-febrile", "all"], "explanation": "Infection is a major cause of treatment-related death during neutropenia, making D a plausible intended answer. Relapse or refractory leukemia may dominate mortality in other groups, and the options overlap because infection is a treatment-related complication. This item is better used to review infection risk during induction than to memorize a single all-patient ranking."},
    {"ids": ["batch-medicine-final-441-p1832-q44", "medicine-final-441-mixed-medicine-q044"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Hyperpigmentation and hypotension suggest primary adrenal insufficiency. After stabilization, morning serum cortisol with ACTH is the best listed screening approach, with corticotropin stimulation used for confirmation when appropriate. In suspected adrenal crisis, do not delay emergency glucocorticoids or fluids for diagnostic testing."},
    {"ids": ["batch-medicine-final-441-p1850-q46", "medicine-final-441-mixed-medicine-q046"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "The restored values include low C-peptide and positive GAD antibodies after symptomatic hyperglycemia. These two findings support deficient endogenous insulin production from autoimmune beta-cell destruction. A family history of type 2 diabetes does not outweigh this combination."},
    {"ids": ["batch-medicine-final-441-p1859-q47", "medicine-final-441-mixed-medicine-q047"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ms-criteria"], "explanation": "Periventricular lesions and a short spinal cord lesion suggest central demyelination. CSF-restricted oligoclonal bands support multiple sclerosis in the appropriate clinical setting. This finding is not universal or by itself specific, so the full criteria and alternatives still matter."},
    {"ids": ["batch-medicine-final-441-p1868-q48", "medicine-final-441-mixed-medicine-q048"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["subclinical-thyroid"], "explanation": "TSH is above the listed range and free T4 remains normal, the biochemical pattern of subclinical primary hypothyroidism. Overt primary hypothyroidism would have low free T4. The contradictory Celsius and Fahrenheit figures are present in the source and do not affect the thyroid test interpretation."},
    {"ids": ["batch-medicine-final-441-p1879-q49", "medicine-final-441-mixed-medicine-q049"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["tg"], "explanation": "Eruptive xanthomas are sudden crops of small yellow-red papules in severe hypertriglyceridemia, especially when chylomicrons accumulate. Tendon xanthomas and premature corneal arcus more strongly suggest severe LDL elevation."},
    {"ids": ["batch-medicine-final-441-p1897-q51", "medicine-final-441-mixed-medicine-q051"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lamotrigine"], "explanation": "The original option D is lamotrigine. Its prescribing information carries a boxed warning for severe reactions including Stevens–Johnson syndrome and toxic epidermal necrolysis. Rapid escalation and concurrent valproate increase risk. Other antiseizure drugs can also cause severe rash, so read the answer as the classic warning being tested, not a universal risk ranking."},
    {"ids": ["batch-medicine-final-441-p1933-q55", "medicine-final-441-mixed-medicine-q055"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["saudi-cancer"], "explanation": "In IARC’s Saudi Arabia 2022 estimates, breast cancer had the most new diagnoses among females and colorectal cancer had the most among males. The question tests incidence in that reporting period. Rankings can vary by year, age group, source population or whether deaths are counted instead of diagnoses."},
    {"ids": ["batch-medicine-final-441-p1985-q61", "medicine-final-441-mixed-medicine-q061"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lewy"], "explanation": "Recurrent formed visual hallucinations, dream enactment consistent with REM sleep behavior disorder, and parkinsonism occurring alongside cognitive decline are core features of dementia with Lewy bodies. The history does not describe established Parkinson disease for years before cognitive symptoms."},
    {"ids": ["batch-medicine-final-441-p2010-q64", "medicine-final-441-mixed-medicine-q064"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["asbestos"], "explanation": "Asbestos exposure increases lung cancer risk and can also cause malignant mesothelioma. Lung cancer is the asbestos-associated malignancy among the four choices. Asbestosis is the fibrotic lung disease caused by exposure, so the causal exposure is asbestos itself."},
    {"ids": ["batch-medicine-final-441-p2018-q65", "medicine-final-441-mixed-medicine-q065"], "answers": ["D"], "ungradedReason": "D was the most reported organism in the cited adult NHSN data, but C is also commonly associated. The stem says commonly associated, not most common.", "confidence": "tentative", "references": ["cauti", "cauti-rank"], "explanation": "Escherichia coli and Pseudomonas aeruginosa are both established CAUTI pathogens. E. coli ranked first across the named adult settings in the CDC report. In a catheterized patient, compatible symptoms and the absence of another cause matter, since a positive culture alone may represent asymptomatic bacteriuria."},
    {"ids": ["batch-medicine-final-441-p2035-q67", "medicine-final-441-mixed-medicine-q067"], "answers": ["B"], "ungradedReason": "The key is compatible with removal of spores, particularly during outbreaks. The scenario alone does not define an outbreak or a facility-wide hand-hygiene policy.", "confidence": "tentative", "references": ["cdiff-hands"], "explanation": "Soap and water physically remove C. difficile spores better than relying on alcohol to kill them. Gloves and gowns are central when caring for suspected or confirmed cases. CDC encourages soap and water as an extra precaution during outbreaks and generally prefers alcohol-based hand rub for routine care when hands are not visibly soiled."},
    {"ids": ["batch-medicine-final-441-p2044-q68", "medicine-final-441-mixed-medicine-q068"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-who"], "explanation": "Large B-cell morphology with CD20 expression fits diffuse large B-cell lymphoma best among the listed types. MYC and BCL-2 protein positivity can indicate double expression, but it does not prove gene rearrangements. Molecular testing is needed to determine whether the tumor meets a separate rearrangement-defined category."},
    {"ids": ["batch-medicine-final-441-p1474-q3", "medicine-final-441-mixed-medicine-q003"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "Coarsening facial features, widely spaced teeth, larger hands and feet, carpal tunnel syndrome and worsening glycemia suggest acromegaly. Begin with an age-adjusted IGF-1 level. Confirm or investigate equivocal biochemical findings before pituitary imaging."},
    {"ids": ["batch-medicine-final-441-p1482-q4", "medicine-final-441-mixed-medicine-q004"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["oa"], "explanation": "Regular therapeutic exercise improves pain and function in osteoarthritis. Strengthening and aerobic or aquatic activity can be adapted to the joint and the patient. Passive treatments can supplement exercise, but exercise has the strongest role in routine care among these choices."},
    {"ids": ["batch-medicine-final-441-p1489-q5", "medicine-final-441-mixed-medicine-q005"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["med445-svt", "svt-ehra"], "explanation": "For a stable regular narrow-complex SVT that persists after a vagal maneuver, IV adenosine briefly blocks AV-node conduction and can terminate AV-node-dependent reentry. The MED445 Team summarizes vagal maneuvers and adenosine for stable SVT. Hemodynamic instability would favor synchronized cardioversion instead."},
    {"ids": ["batch-medicine-final-441-p1507-q7", "medicine-final-441-mixed-medicine-q007"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["med445-pe"], "explanation": "The MED445 diagram traces a thrombotic PE from deep veins of the lower limb or pelvis into the pulmonary arteries. A fragment travels through the inferior vena cava and right heart before lodging in the lung. Proximal leg veins are a much more typical origin than superficial leg veins or either cardiac chamber."},
    {"ids": ["batch-medicine-final-441-p1515-q8", "medicine-final-441-mixed-medicine-q008"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["epilepsy-preg"], "explanation": "Valproate has the greatest established teratogenic risk among the listed drugs, with particular concern for neural tube defects and other major malformations. Neurodevelopmental risks also matter. Lamotrigine and levetiracetam generally have lower malformation rates. Any medication change in pregnancy requires supervision because uncontrolled seizures also carry risk."},
    {"ids": ["batch-medicine-final-441-p1523-q9", "medicine-final-441-mixed-medicine-q009"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["typhoid"], "explanation": "Prolonged fever with constipation, hepatosplenomegaly, rash and a pulse lower than expected for the temperature suggests enteric fever after travel. Blood cultures help confirm typhoid. Malaria should still be assessed promptly if the itinerary permits exposure. The recalled blood-pressure format is corrupted and does not determine the answer."},
    {"ids": ["batch-medicine-final-441-p1533-q10", "medicine-final-441-mixed-medicine-q010"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ssi"], "explanation": "When prophylaxis is indicated, administering it before incision reduces bacterial contamination at the operative site. This is the relevant prevention measure among the options. Purulent drainage and systemic illness a week later support established infection, but the scenario does not prove prophylaxis was omitted or explain every cause of infection."},
    {"ids": ["batch-medicine-final-441-p1550-q12", "medicine-final-441-mixed-medicine-q012"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["severe-malaria", "malaria"], "explanation": "High parasitemia after African travel with impaired consciousness and kidney injury fits severe falciparum malaria. P. falciparum is the leading likely species from these choices. The case already establishes malaria by smear, and laboratory speciation is still necessary. Organ dysfunction and parasitemia support urgent treatment."},
    {"ids": ["batch-medicine-final-441-p1577-q15", "medicine-final-441-mixed-medicine-q015"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Polyuria, polydipsia and blurry vision suggest hyperglycemia. Severe obesity and acanthosis nigricans point toward insulin resistance, making type 2 diabetes most likely. Confirm with plasma glucose or A1C. Urinary infection does not explain the combination of thirst, blurred vision and insulin-resistance features."},
    {"ids": ["batch-medicine-final-441-p1594-q17", "medicine-final-441-mixed-medicine-q017"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes requires replacement of basal and mealtime insulin. Rapid-acting with long-acting insulin is a common injection regimen, so B is the best listed plan. Pumps can deliver both basal and bolus insulin with rapid-acting insulin. Nutrition and exercise complement insulin and cannot replace it."},
    {"ids": ["batch-medicine-final-441-p1602-q18", "medicine-final-441-mixed-medicine-q018"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["encephalitis"], "explanation": "Fever, behavior change, disorientation and a seizure point to encephalitis involving brain tissue. IV acyclovir should be started promptly for possible HSV encephalitis while diagnostic testing proceeds. A delay for lumbar puncture or PCR should not postpone treatment when HSV is suspected."},
    {"ids": ["batch-medicine-final-441-p1611-q19", "medicine-final-441-mixed-medicine-q019"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Fever, meningism and altered consciousness suggest acute bacterial meningitis. Pneumococcus is a leading cause of community-acquired bacterial meningitis in middle-aged adults. This is an epidemiology question. Individual pathogen identification still requires microbiologic testing, and emergency empiric treatment cannot wait for results."},
    {"ids": ["batch-medicine-final-441-p1620-q20", "medicine-final-441-mixed-medicine-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-ckd"], "explanation": "A first-degree family history of diabetic kidney disease signals greater susceptibility than the normal blood pressure, BMI or absent retinopathy listed. Risk assessment does not replace screening. Check urinary albumin-to-creatinine ratio and estimated filtration rate and manage glycemia and blood pressure."},
    {"ids": ["batch-medicine-final-441-p1657-q24", "medicine-final-441-mixed-medicine-q024"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["bcg"], "explanation": "BCG provides its most consistent protection against severe childhood tuberculosis, particularly tuberculous meningitis and disseminated disease. Protection against pulmonary disease and infection is more variable. This explains why meningeal disease in infants is the best listed answer."},
    {"ids": ["batch-medicine-final-441-p1665-q25", "medicine-final-441-mixed-medicine-q025"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cll"], "explanation": "The FISH abnormalities commonly seen in CLL include deletions of 13q, 11q and 17p, along with trisomy 12. The Philadelphia translocation is characteristic of other leukemias and is not the expected CLL finding. The Gift author expressed doubt, while the iwCLL guideline supports D."},
    {"ids": ["batch-medicine-final-441-p1673-q26", "medicine-final-441-mixed-medicine-q026"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["hivtest", "saudihiv"], "explanation": "An HIV nucleic acid test detects viral RNA earlier than tests that rely on antibodies. Around day 10, testing is at the beginning of the detection window, so A is the best listed early test. A negative result this soon cannot rule out infection. Follow-up testing should follow the assay window and local protocol."},
    {"ids": ["batch-medicine-final-441-p1700-q29", "medicine-final-441-mixed-medicine-q029"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["itp"], "explanation": "A platelet count of 3,000 with mucosal bleeding requires prompt therapy to raise the count. Corticosteroids reduce immune platelet destruction and IVIG can raise platelets more rapidly. Platelet transfusion can be added for critical or life-threatening bleeding and is not the sole treatment for ordinary mucosal bleeding."},
    {"ids": ["batch-medicine-final-441-p1708-q30", "medicine-final-441-mixed-medicine-q030"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "Hemianopsia can occur with either MCA or PCA infarction. Marked contralateral weakness favors involvement of MCA-supplied motor cortex or related pathways. A hemispheric MCA stroke can cause gaze toward the affected hemisphere, so the contralateral gaze wording is not the better choice."},
    {"ids": ["batch-medicine-final-441-p1717-q31", "medicine-final-441-mixed-medicine-q031"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ilae"], "explanation": "The rising epigastric feeling, déjà vu and oral automatisms point to a focal temporal seizure. Altered awareness identifies a focal impaired-awareness seizure, previously termed a complex partial seizure. These stereotyped features are more specific for temporal onset than for syncope or arrhythmia."},
    {"ids": ["batch-medicine-final-441-p1726-q32", "medicine-final-441-mixed-medicine-q032"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["pza"], "explanation": "Pyrazinamide raises serum urate by reducing its renal excretion and can precipitate gout. The timing after starting tuberculosis therapy supports this choice. An acutely inflamed joint still warrants assessment for infection if the clinical setting raises concern."},
    {"ids": ["batch-medicine-final-441-p1735-q33", "medicine-final-441-mixed-medicine-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["pd", "pd-treatment"], "explanation": "Bradykinesia with asymmetric rest tremor and cogwheel rigidity fits Parkinson disease. Levodopa with carbidopa is the strongest option for motor symptoms that interfere with daily life. Entacapone is an adjunct to levodopa for motor fluctuations, and anticholinergic adverse effects are a concern at this age."},
    {"ids": ["batch-medicine-final-441-p1754-q35", "medicine-final-441-mixed-medicine-q035"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["med445-les", "les-study"], "explanation": "The intrinsic lower esophageal sphincter is smooth muscle, as shown on the MED445 anatomy slide. Measured pressure at the esophagogastric junction also includes an external contribution from the skeletal muscles of the crural diaphragm. The manometry study establishes this second contribution, which makes D the complete option."},
    {"ids": ["batch-medicine-final-441-p1763-q36", "medicine-final-441-mixed-medicine-q036"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["phpt"], "explanation": "Most sporadic primary hyperparathyroidism is due to one overactive parathyroid adenoma. Multigland hyperplasia and multiple adenomas occur less often. The biochemical diagnosis is inappropriately nonsuppressed PTH in a patient with hypercalcemia, with imaging reserved for preoperative localization."},
    {"ids": ["batch-medicine-final-441-p1789-q39", "medicine-final-441-mixed-medicine-q039"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "LDL cholesterol of 5.5 mmol/L is about 213 mg/dL and indicates severe hypercholesterolemia. A brother's myocardial infarction at 40 strengthens concern for familial hypercholesterolemia. Initiate high-intensity LDL-lowering treatment and assess secondary causes and family risk. A fibrate mainly targets triglycerides."},
    {"ids": ["batch-medicine-final-441-p1798-q40", "medicine-final-441-mixed-medicine-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["polypectomy"], "explanation": "Colonoscopy can detect and remove premalignant adenomas before they become invasive, so polypectomy is the direct preventive intervention among the choices. Physical activity and diet also contribute to prevention, but do not remove existing lesions. Screening choice depends on age and risk."},
    {"ids": ["batch-medicine-final-441-p1841-q45", "medicine-final-441-mixed-medicine-q045"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["thyrotoxicosis"], "explanation": "Heat intolerance, tachycardia and a diffuse thyroid with a bruit suggest Graves hyperthyroidism. Start biochemical evaluation with TSH, usually with free T4 and T3 when suspicion is high. If thyrotoxicosis is confirmed, TSH-receptor antibodies or an appropriate uptake study can help determine the cause."},
    {"ids": ["batch-medicine-final-441-p1888-q50", "medicine-final-441-mixed-medicine-q050"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["adem"], "explanation": "A child with postinfectious encephalopathy, multifocal neurological signs and widespread CNS demyelination followed by a monophasic recovery fits acute disseminated encephalomyelitis. Encephalopathy is an important discriminator from a typical first MS attack. Guillain–Barré syndrome affects peripheral nerves and does not explain these brain lesions."},
    {"ids": ["batch-medicine-final-441-p1905-q52", "medicine-final-441-mixed-medicine-q052"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-dx"], "explanation": "A very FDG-avid anterior mediastinal mass requires tissue diagnosis. PET measures metabolic activity and distribution, but does not identify lymphoma subtype or exclude other mediastinal tumors. Plan a biopsy that supplies enough tissue for morphology and immunophenotyping, with attention to airway or vascular compression."},
    {"ids": ["batch-medicine-final-441-p1914-q53", "medicine-final-441-mixed-medicine-q053"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["malaria"], "explanation": "Fever soon after Sudan travel with splenomegaly and bilirubin elevation makes malaria the most likely listed diagnosis. These clues warrant urgent thick and thin blood smears or rapid testing rather than assuming a species from the history. Repeat testing if initial testing is negative and suspicion remains high."},
    {"ids": ["batch-medicine-final-441-p1923-q54", "medicine-final-441-mixed-medicine-q054"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["axspa"], "explanation": "Prolonged inflammatory back symptoms in a young adult with psoriasis and previous uveitis suggest axial spondyloarthritis. The sacroiliac joints are the characteristic early site of axial inflammation. Involvement can extend to the spine later."},
    {"ids": ["batch-medicine-final-441-p1941-q56", "medicine-final-441-mixed-medicine-q056"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["art", "saudihiv"], "explanation": "A reactive donor screening test needs diagnostic confirmation. Once HIV is confirmed, offer combination antiretroviral treatment promptly, regardless of CD4 count or viral load. Baseline labs guide clinical care and selection of therapy, but CD4 below 200 or a viral load cutoff is not a prerequisite for treatment."},
    {"ids": ["batch-medicine-final-441-p1950-q57", "medicine-final-441-mixed-medicine-q057"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["tocilizumab"], "explanation": "Tocilizumab blocks the interleukin-6 receptor. Adalimumab targets TNF, rituximab targets CD20-positive B cells, and baricitinib inhibits JAK signaling. These mechanisms identify D without assuming that the options are interchangeable indications."},
    {"ids": ["batch-medicine-final-441-p1958-q58", "medicine-final-441-mixed-medicine-q058"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["med445-gerd", "gerd-acg"], "explanation": "Progressive or persistent solid-food dysphagia suggests a structural lesion and is an alarm symptom even without weight loss or anemia. The MED445 slide lists alarm symptoms as an indication for endoscopy. EGD can evaluate a stricture, malignancy or mucosal disease and obtain biopsies where appropriate."},
    {"ids": ["batch-medicine-final-441-p1967-q59", "medicine-final-441-mixed-medicine-q059"], "answers": ["A"], "ungradedReason": "A is appropriate if the left-sided pain is focal and persistent. The stem gives neither the focality nor duration needed to apply that imaging recommendation confidently.", "confidence": "tentative", "references": ["breast-pain"], "explanation": "At age 35, unexplained focal noncyclical breast pain warrants diagnostic imaging, and lactation does not prevent ultrasound or mammography. Diffuse or cyclical pain with a normal examination is assessed differently. Ending lactation or ordering serum tumor markers is not a diagnostic workup."},
    {"ids": ["batch-medicine-final-441-p1976-q60", "medicine-final-441-mixed-medicine-q060"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis", "encephalitis"], "explanation": "Papilledema and markedly reduced alertness raise concern for elevated intracranial pressure or a mass effect. Arrange head CT before lumbar puncture and do not proceed solely because access to imaging is available. In suspected serious CNS infection, blood cultures and prompt empiric treatment should not wait for imaging or puncture."},
    {"ids": ["batch-medicine-final-441-p1994-q62", "medicine-final-441-mixed-medicine-q062"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["axspa", "asas"], "explanation": "Inflammatory back pain and recurrent anterior uveitis support axial spondyloarthritis. HLA-B27 adds evidence among these choices, while a negative test cannot exclude the diagnosis. A normal spine MRI does not rule out sacroiliitis. Dedicated sacroiliac imaging is often more informative but is not offered."},
    {"ids": ["batch-medicine-final-441-p2002-q63", "medicine-final-441-mixed-medicine-q063"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "A right hemispheric MCA stroke commonly produces left hemispatial neglect. The patient may underattend to the left side of the body or environment even when primary vision and sensation do not fully explain it. Neglect interferes with mobility, self-care and safety during rehabilitation."},
    {"ids": ["batch-medicine-final-441-p2027-q66", "medicine-final-441-mixed-medicine-q066"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["stroke-subtypes"], "explanation": "A cardiac embolus can obstruct a large cerebral artery and cause a large territorial infarct. The cited registry found more severe presentation and higher mortality in cardioembolic stroke. This is a group-level tendency. Large-artery atherosclerosis and dissection can also produce severe stroke in individual patients."},
    {"ids": ["batch-medicine-final-441-p2053-q69", "medicine-final-441-mixed-medicine-q069"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["sjogren"], "explanation": "Pilocarpine stimulates muscarinic receptors and can improve saliva production when residual gland function remains. Persistent dry mouth despite local measures is the clue that favors it. Continue treating ocular and vaginal dryness according to symptoms, since those sites may require separate treatment."},
    {"ids": ["batch-medicine-final-439-p2421-q30", "medicine-final-439-endocrinology-q030"], "answers": ["B"], "ungradedReason": "Fenofibrate can prevent pancreatitis in the setting of severe hypertriglyceridemia. The question omits the cause or triglyceride level.", "confidence": "tentative", "references": ["tg", "lipid"], "explanation": "The mechanism being tested is lowering very high triglycerides to reduce risk of triglyceride-associated pancreatitis. Fenofibrate is the relevant drug among these options in that setting. There is no general role for taking fenofibrate to prevent acute pancreatitis regardless of cause."},
    {"ids": ["batch-medicine-final-439-p2446-q33", "medicine-final-439-endocrinology-q033"], "answers": [], "ungradedReason": "The reported serum osmolality of 235 mOsm/kg does not support a single choice. It is low, not high, in the original source.", "confidence": "tentative", "references": ["copeptin"], "explanation": "Head injury followed by dilute polyuria can suggest central diabetes insipidus, but a serum osmolality of 235 is not the expected clue for a water-loss state without adequate replacement. Verify paired serum sodium and osmolality, confirm urine volume and interpret urine osmolality. Polyuria-polydipsia may require a supervised diagnostic evaluation to distinguish its cause."},
    {"ids": ["batch-medicine-final-439-p2702-q62", "medicine-final-439-hematology-oncology-q062"], "answers": ["C"], "ungradedReason": "The native Gift keys B. Prothrombin is the precursor of thrombin, and the description in B is imprecise. C is closer to the predominant action.", "confidence": "supported", "references": ["enoxaparin"], "explanation": "Enoxaparin potentiates antithrombin and inhibits factor Xa more strongly than factor IIa, which is thrombin. Choice C corresponds to that predominant anti-Xa activity. Enoxaparin does not act by blocking vitamin K-dependent factor synthesis."},
    {"ids": ["batch-medicine-final-439-p2797-q72", "medicine-final-439-hematology-oncology-q072"], "answers": [], "ungradedReason": "A serum IgA level does not diagnose IgA nephropathy, and the options omit the needed renal evaluation.", "confidence": "tentative", "references": ["iga-kdigo"], "explanation": "Dysmorphic erythrocytes point to a glomerular source of bleeding without identifying the disease. Quantify proteinuria and check renal function. Consider nephrology evaluation and kidney biopsy when indicated. Ultrasound can assess structure but cannot diagnose IgA nephropathy."},
    {"ids": ["batch-medicine-final-431-p5638-q9", "medicine-final-431-infectious-diseases-q009"], "answers": ["A", "B"], "ungradedReason": "Ciprofloxacin may treat a susceptible acute Pseudomonas exacerbation, while prevention of repeated exacerbations is a different treatment question.", "confidence": "tentative", "references": ["bronchiectasis-ers"], "explanation": "Four exacerbations and repeated Pseudomonas cultures indicate high-risk bronchiectasis. If there is a current exacerbation, choose an antibiotic using prior cultures and clinical severity. For chronic prevention, the ERS guideline supports inhaled antibiotics for chronic Pseudomonas infection and long-term macrolides for selected high-risk patients, after appropriate assessment."},
    {"ids": ["batch-medicine-final-431-p5889-q44", "medicine-final-431-hematology-oncology-q044"], "answers": ["B"], "ungradedReason": "The original key C points to a proton pump inhibitor. Fluids and analgesia in B address acute pancreatitis.", "confidence": "supported", "references": ["pancreatitis-acg"], "explanation": "Characteristic epigastric pain with lipase more than three times normal meets diagnostic criteria for acute pancreatitis. Begin supportive care with analgesia and reassessed IV crystalloid resuscitation. Lactated Ringer solution is generally preferred where appropriate. Normal saline with analgesia is the best listed option; a PPI does not treat pancreatic inflammation."},
    {"ids": ["batch-medicine-final-433-p4869-q5", "medicine-final-433-rheumatology-q005"], "answers": [], "ungradedReason": "An isolated creatinine increase does not establish active lupus nephritis or automatically justify the historical steroid key.", "confidence": "tentative", "references": ["lupus-kidney"], "explanation": "A rise in creatinine in SLE requires prompt evaluation with urine sediment, protein quantification, renal function trend and assessment for other causes of AKI. Kidney biopsy often guides treatment where active nephritis is suspected. Glucocorticoids are used according to diagnosis and severity, and none of the options supplies the required initial evaluation."},
    {"ids": ["batch-medicine-final-433-p5178-q46", "medicine-final-433-hematology-oncology-q046"], "answers": [], "ungradedReason": "The original platelet threshold is written as less than 400 without a unit and includes normal counts if read as 400 thousand per microliter. No listed option accurately states the guideline threshold.", "confidence": "tentative", "references": ["stroke"], "explanation": "For IV thrombolysis of acute ischemic stroke, a known platelet count below 100,000 per microliter is a major exclusion in the AHA/ASA guideline. A normal CT without hemorrhage or a normal blood pressure does not itself preclude treatment. Use the actual platelet count and clinical setting rather than extrapolating from the corrupted cutoff."},
    {"ids": ["batch-medicine-final-432-p5439-q28", "medicine-final-432-endocrinology-q028"], "answers": ["A", "C"], "ungradedReason": "The source keys high HDL. Low LDL also lowers risk, and the question mixes a risk marker with a proven treatment target.", "confidence": "supported", "references": ["lipid"], "explanation": "A higher HDL level can be a favorable epidemiologic marker. Lowering LDL reduces cardiovascular events and is an established treatment goal. Drugs that raise HDL have not, by that fact alone, been shown to prevent events. The stem does not distinguish these two ideas."},
    {"ids": ["batch-medicine-final-432-p5451-q30", "medicine-final-432-endocrinology-q030"], "answers": ["D"], "ungradedReason": "The ratio is appropriate for screening after urgent assessment of severe hypokalemia, but the source's supine collection conflicts with current guideline technique.", "confidence": "tentative", "references": ["aldosterone"], "explanation": "A potassium of 2.3 mmol/L calls for immediate clinical and ECG assessment and potassium correction. Hypertension with hypokalemia then raises suspicion of primary aldosteronism. The guideline measures aldosterone and renin in the morning with the patient seated, taking potassium and medication effects into account. Low potassium may falsely lower aldosterone."},
    {"ids": ["batch-medicine-final-432-p5536-q41", "medicine-final-432-hematology-oncology-q041"], "answers": ["A"], "ungradedReason": "Radiotherapy is appropriate in some localized cases but does not replace the usual initial H. pylori assessment and treatment. Stage and infection status are missing.", "confidence": "tentative", "references": ["cm438-gastric-malt"], "explanation": "For localized gastric MALT lymphoma, assess H. pylori and consider eradication before further lymphoma-directed treatment. Radiotherapy can be a definitive option if disease persists or when antibiotics are not suitable. The question omits H. pylori therapy and does not establish the stage."},
    {"ids": ["batch-medicine-final-429-p6365-q55", "medicine-final-429-nephrology-q055"], "answers": ["B", "D"], "ungradedReason": "The stem asks for any supporting feature. Both heavy proteinuria and low serum albumin support the diagnosis.", "confidence": "supported", "references": ["nephrotic-child", "gn"], "explanation": "In a child with edema, nephrotic-range proteinuria is the essential finding and hypoalbuminemia commonly accompanies it. Both B and D fit the wording. Serum protein is not elevated and hyperlipidemia, not hypolipidemia, is the usual lipid pattern."},
    {"ids": ["batch-medicine-final-429-p5931-q1", "medicine-final-429-rheumatology-q001"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["sle", "sle-clinical"], "explanation": "Photosensitive malar rash, alopecia, inflammatory polyarthritis and thrombocytopenia together point to systemic lupus erythematosus. Rheumatoid arthritis can cause symmetric inflammatory joints but does not usually explain the full skin and blood findings."},
    {"ids": ["batch-medicine-final-429-p5938-q2", "medicine-final-429-rheumatology-q002"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-felty"], "explanation": "Long-standing deforming rheumatoid arthritis with leukopenia and splenomegaly is the classic presentation of Felty syndrome, particularly if a differential count confirms neutropenia. Methotrexate toxicity and large granular lymphocytic leukemia remain alternatives to evaluate."},
    {"ids": ["batch-medicine-final-429-p5945-q3", "medicine-final-429-rheumatology-q003"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["oa", "cm429-oa-nice"], "explanation": "Pain that worsens with use, bony enlargement of the distal interphalangeal joints, osteophytes, joint-space narrowing and subchondral sclerosis all fit osteoarthritis. The distal finger enlargements are Heberden nodes."},
    {"ids": ["batch-medicine-final-429-p5952-q4", "medicine-final-429-rheumatology-q004"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ra-class", "sle-clinical"], "explanation": "An ulnar styloid erosion is the most useful clue here because rheumatoid arthritis commonly produces marginal erosions. Typical lupus arthritis is usually nonerosive. Both can cause symmetric arthritis, and rheumatoid factor alone does not reliably distinguish them."},
    {"ids": ["batch-medicine-final-429-p5969-q6", "medicine-final-429-infectious-diseases-q006"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-tb-cause"], "explanation": "Pulmonary is the best answer because the lungs are the usual initial site of tuberculosis after inhalation. Tuberculosis may also be extrapulmonary, including meningeal or visceral disease."},
    {"ids": ["batch-medicine-final-429-p5976-q7", "medicine-final-429-pulmonary-q007"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-ie445"], "explanation": "Staphylococcus aureus is the strongest organism association with infective endocarditis in a person who injects drugs. The lecture links this exposure to S. aureus, and the tricuspid valve is often involved. The word “subacute” by itself is a weaker clue here."},
    {"ids": ["batch-medicine-final-429-p5983-q8", "medicine-final-429-pulmonary-q008"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-tb-cause"], "explanation": "A roommate of a patient with active pulmonary TB has the clearest prolonged shared-air exposure. Isolated bone, meningeal or pleural TB generally poses less airborne risk unless there is concurrent pulmonary or laryngeal disease."},
    {"ids": ["batch-medicine-final-429-p5998-q10", "medicine-final-429-pulmonary-q010"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-meningococcal"], "explanation": "Fever, meningism and petechiae suggest invasive meningococcal disease. A pregnant household contact needs prompt prophylaxis. A single dose of intramuscular ceftriaxone is the appropriate listed option for this adult contact."},
    {"ids": ["batch-medicine-final-429-p6005-q11", "medicine-final-429-pulmonary-q011"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["brucellosis"], "explanation": "When brucellosis is suspected, detecting the organism in a blood specimen can establish the diagnosis. A single serologic result requires clinical interpretation, and the value given in B does not establish infection. The clinical team should tell the laboratory when brucellosis is suspected."},
    {"ids": ["batch-medicine-final-429-p6012-q12", "medicine-final-429-pulmonary-q012"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-pcp"], "explanation": "Progressive breathlessness, dry cough, hypoxemia and bilateral interstitial infiltrates in a patient with longstanding HIV favor Pneumocystis jirovecii pneumonia. The Gift's original third option is Pneumocystis pneumonia. The clinical pattern supports the diagnosis, which still requires appropriate testing."},
    {"ids": ["batch-medicine-final-429-p6019-q13", "medicine-final-429-pulmonary-q013"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "Fever with altered consciousness and hypotension after recent travel to a malaria-risk area makes severe malaria a leading etiologic possibility. Shock is part of the syndrome and does not identify its cause. Urgent blood films and rapid testing help distinguish malaria from other severe infections."},
    {"ids": ["batch-medicine-final-429-p6029-q14", "medicine-final-429-pulmonary-q014"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-aids"], "explanation": "A CD4 count of 151 cells/µL is the only option below the adult stage 3 threshold of 200 cells/µL in confirmed HIV infection. A stage 3–defining illness can also establish AIDS even when the CD4 count is higher."},
    {"ids": ["batch-medicine-final-429-p6036-q15", "medicine-final-429-pulmonary-q015"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-transplant-uti"], "explanation": "Urinary tract infection is a frequent complication in kidney transplant recipients, including later during long-term immunosuppression. The other listed infections can occur but are less directly associated with this typical transplant setting."},
    {"ids": ["batch-medicine-final-429-p6044-q16", "medicine-final-429-endocrinology-q016"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-dxa"], "explanation": "DXA is the listed test for quantifying bone mineral density after an osteopenic vertebral compression fracture. It usually includes the hip and lumbar spine. A fragility vertebral fracture can itself support an osteoporosis diagnosis even if the DXA score is above the osteoporosis threshold."},
    {"ids": ["batch-medicine-final-429-p6051-q17", "medicine-final-429-endocrinology-q017"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "HbA1c of at least 6.5% is a diagnostic threshold for diabetes. Without unequivocal symptomatic hyperglycemia, a second abnormal result is needed. The Gift uses “greater than 6.5%,” which still selects an acceptable value, but exactly 6.5% also meets the threshold."},
    {"ids": ["batch-medicine-final-429-p6058-q18", "medicine-final-429-endocrinology-q018"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-myxedema"], "explanation": "Avoid active peripheral rewarming in myxedema coma. Peripheral vasodilation can worsen hypotension in a severely hypothyroid and vasoconstricted patient. Passive warming, monitored supportive care, thyroid hormone replacement and empiric glucocorticoid coverage are usual components of treatment."},
    {"ids": ["batch-medicine-final-429-p6066-q19", "medicine-final-429-endocrinology-q019"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-hypothyroid"], "explanation": "Fatigue, weight gain, constipation, dry skin and muscle weakness suggest hypothyroidism. Thyroid function testing starts with TSH, with free T4 measured when TSH is abnormal or central disease is suspected."},
    {"ids": ["batch-medicine-final-429-p6074-q20", "medicine-final-429-endocrinology-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Weight loss despite appetite, thirst and frequent urination are characteristic of diabetes mellitus. Hyperglycemia causes osmotic diuresis, and genital itching can accompany candidiasis. Plasma glucose or HbA1c is needed to confirm the diagnosis."},
    {"ids": ["batch-medicine-final-429-p6088-q22", "medicine-final-429-endocrinology-q022"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-hypoglycemia"], "explanation": "Glyburide continues to stimulate insulin release and can cause hypoglycemia. A premeal glucose around 4 mmol/L is close to the alert threshold, so another drop is the immediate concern. Retinopathy and nephropathy are chronic complications."},
    {"ids": ["batch-medicine-final-429-p6103-q23", "medicine-final-429-endocrinology-q023"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "A statin is the appropriate first lipid-lowering therapy for a 55-year-old with diabetes and hypertension. The reported LDL is elevated, though the printed units and total/LDL values are internally inconsistent. Repeat the lipid panel to guide intensity if needed."},
    {"ids": ["batch-medicine-final-429-p6110-q24", "medicine-final-429-endocrinology-q024"], "answers": [], "ungradedReason": "The original Gift states that the actual question was not recalled.", "confidence": "tentative", "references": ["acromegaly", "cushing-local"], "explanation": "Transsphenoidal surgery can be first-line treatment for a pituitary adenoma causing acromegaly or confirmed pituitary Cushing disease. Treatment depends on the actual diagnosis, tumor and question, none of which the recall establishes."},
    {"ids": ["batch-medicine-final-429-p6117-q25", "medicine-final-429-endocrinology-q025"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-hypothyroid"], "explanation": "A high TSH with low free T4 is the pattern of overt primary hypothyroidism, despite the printed TSH unit. Constipation is a typical symptom. Palpitations, weight loss and tremor are much more typical of excess thyroid hormone."},
    {"ids": ["batch-medicine-final-429-p6125-q26", "medicine-final-429-neurology-q026"], "answers": ["B"], "ungradedReason": "The stem asks for confirmation, but CT alone cannot confirm normal-pressure hydrocephalus and the listed CSF investigation is unspecified.", "confidence": "tentative", "references": ["cm429-nph"], "explanation": "CT or MRI can demonstrate enlarged ventricles and evaluate alternative causes. In a patient with the characteristic gait, cognitive or urinary findings, a large-volume CSF tap test can help predict benefit from shunting. A CT finding alone is insufficient for a definitive diagnosis."},
    {"ids": ["batch-medicine-final-429-p6132-q27", "medicine-final-429-neurology-q027"], "answers": ["A"], "ungradedReason": "The source keys optic neuritis, but the relative frequency varies by population, age and how first symptoms are classified.", "confidence": "tentative", "references": ["cm429-ms-onset", "cm429-ms-visual"], "explanation": "Sensory disturbance is often the most common initial symptom in adult multiple sclerosis cohorts. Optic neuritis is an important and sometimes the most frequent presentation in specific cohorts, especially when visual symptoms are grouped. The unqualified wording cannot establish one universal ranking."},
    {"ids": ["batch-medicine-final-429-p6140-q28", "medicine-final-429-neurology-q028"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ilae", "cm429-absence"], "explanation": "Many brief episodes of abrupt behavioral arrest with impaired responsiveness and no memory of the event are typical absence seizures. The supporting EEG finding is generalized spike-and-wave activity. “Petit mal” is the historical term for this seizure type."},
    {"ids": ["batch-medicine-final-429-p6147-q29", "medicine-final-429-neurology-q029"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "Obtain urgent noncontrast head CT to exclude intracranial hemorrhage before intravenous thrombolysis. The sudden focal deficit and two-hour onset make this time-sensitive. Carotid imaging and echocardiography can help define the cause but should not delay the initial head scan."},
    {"ids": ["batch-medicine-final-429-p6154-q30", "medicine-final-429-neurology-q030"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-pons"], "explanation": "Weakness of the entire right face localizes to the right facial nucleus or nerve fascicle. Left arm and leg weakness indicates damage to the descending motor tract above its crossing. These findings localize together to the right pons."},
    {"ids": ["batch-medicine-final-429-p6161-q31", "medicine-final-429-neurology-q031"], "answers": [], "ungradedReason": "Migraine with aura is linked to ischemic stroke overall, but the choices do not give that general answer and the specific large-artery key is unsupported.", "confidence": "tentative", "references": ["cm429-migraine"], "explanation": "Migraine with aura is associated with increased ischemic stroke risk. That does not identify an individual stroke mechanism or establish a specific large-artery subtype. A prospective cohort analysis linked visual aura most strongly to cardioembolic stroke among the subtypes examined."},
    {"ids": ["batch-medicine-final-429-p6169-q32", "medicine-final-429-neurology-q032"], "answers": ["A"], "ungradedReason": "The original answer reflects an earlier time window, while the current standard 4.5-hour cutoff is absent and selected cases can be treated later.", "confidence": "tentative", "references": ["stroke"], "explanation": "Three hours is within the standard window, but it is no longer the general outer limit. Eligible patients can receive intravenous thrombolysis within 4.5 hours of onset or last known well. Selected patients with favorable advanced imaging can receive treatment beyond 4.5 hours, up to 9 hours in the guideline scenarios."},
    {"ids": ["batch-medicine-final-429-p6176-q33", "medicine-final-429-neurology-q033"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-icp"], "explanation": "Papilledema, headache, drowsiness and bilateral limitation of abduction are explained by increased intracranial pressure. Stretch of both sixth nerves can produce horizontal diplopia without localizing the cause to the pons. The underlying cause needs urgent assessment."},
    {"ids": ["batch-medicine-final-429-p6184-q34", "medicine-final-429-neurology-q034"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["aml", "apl"], "explanation": "A high reported blast count with fever, bruising and thrombocytopenia points to acute leukemia. Prolonged coagulation tests can reflect a secondary coagulopathy, including DIC in acute promyelocytic leukemia. The reported blood count units are incomplete and the leukemia subtype needs confirmation."},
    {"ids": ["batch-medicine-final-429-p6191-q35", "medicine-final-429-neurology-q035"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-ipi"], "explanation": "Serum LDH is part of the International Prognostic Index for aggressive non-Hodgkin lymphoma. The other components are age, disease stage, performance status and the number of extranodal sites. Counting involved lymph nodes alone is not an IPI component."},
    {"ids": ["batch-medicine-final-429-p6205-q37", "medicine-final-429-neurology-q037"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-neutropenic"], "explanation": "Fever with profound leukopenia one week after chemotherapy is high-risk febrile neutropenia. Start intravenous antipseudomonal coverage promptly and obtain cultures without delaying therapy. B is the only suitable IV option here. Amikacin is added selectively according to severity and resistance risk."},
    {"ids": ["batch-medicine-final-429-p6212-q38", "medicine-final-429-neurology-q038"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-vwd"], "explanation": "Mucosal bleeding with a normal platelet count and a prolonged aPTT can occur in von Willebrand disease. Von Willebrand factor supports platelet adhesion and stabilizes factor VIII. Current confirmation uses von Willebrand factor antigen, activity and factor VIII testing rather than the older bleeding-time test."},
    {"ids": ["batch-medicine-final-429-p6219-q39", "medicine-final-429-neurology-q039"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["itp"], "explanation": "Post-viral bruising and gum bleeding with isolated severe thrombocytopenia and large platelets favor immune thrombocytopenia. The preserved hemoglobin and white cell count oppose marrow failure, and the lack of hemolysis argues against TTP. The printed platelet unit is incomplete."},
    {"ids": ["batch-medicine-final-429-p6231-q40", "medicine-final-429-neurology-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-hemolysis"], "explanation": "Jaundice, splenomegaly and raised reticulocytes in a patient with anemia point to hemolysis. Reticulocytes are larger than mature red cells, so a slightly high MCV is compatible. Bilirubin, LDH, haptoglobin, smear and immune testing help confirm the mechanism."},
    {"ids": ["batch-medicine-final-429-p6241-q41", "medicine-final-429-neurology-q041"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-neutropenic"], "explanation": "Chemotherapy followed by fever with a very low white-cell count suggests febrile neutropenia. Bacterial infection is the leading immediate concern. Invasive fungal infection becomes more likely with prolonged neutropenia or persistent fever. Many episodes have no microbiologically confirmed cause."},
    {"ids": ["batch-medicine-final-429-p6248-q42", "medicine-final-429-neurology-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-g6pd"], "explanation": "Recurrent jaundice and dark urine after an infection or antibiotic exposure suggest oxidant-triggered hemolysis due to G6PD deficiency. Measure red-cell G6PD activity. A result taken during acute hemolysis can be falsely normal, so repeat testing after recovery if suspicion remains."},
    {"ids": ["batch-medicine-final-429-p6262-q44", "medicine-final-429-neurology-q044"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-cll"], "explanation": "Generalized adenopathy, splenomegaly and approximately 14 × 10⁹/L mature lymphocytes in an older adult favor chronic lymphocytic leukemia. A single count of all lymphocytes does not establish the diagnosis. Flow cytometry must confirm a clonal B-cell population."},
    {"ids": ["batch-medicine-final-429-p6269-q45", "medicine-final-429-neurology-q045"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm429-iron-inflammation"], "explanation": "Low serum iron with low iron-binding capacity and preserved ferritin in active rheumatoid arthritis favors anemia of inflammation. Iron deficiency more often lowers ferritin and increases binding capacity. A mixed deficiency remains possible because ferritin rises with inflammation."},
    {"ids": ["batch-medicine-final-431-p5572-q1", "medicine-final-431-rheumatology-q001"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["sle"], "explanation": "Malar rash is the classic facial pattern of acute cutaneous lupus, often spreading over the cheeks and nasal bridge. Heliotrope rash instead points toward dermatomyositis."},
    {"ids": ["batch-medicine-final-431-p5578-q2", "medicine-final-431-rheumatology-q002"], "answers": [], "ungradedReason": "The stated frequencies and “most common” claims do not match a defensible statement among these options.", "confidence": "tentative", "references": ["sle", "lupus-kidney"], "explanation": "Kidney disease is important in SLE and may already be present at diagnosis, but the stem's claim that clinical nephritis is present in more than 60% at presentation is too broad. The other choices also overstate the prevalence of vasculitic rash, seizures or pulmonary hemorrhage."},
    {"ids": ["batch-medicine-final-431-p5586-q3", "medicine-final-431-rheumatology-q003"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc-paht"], "explanation": "Progressive dyspnea, severe Raynaud phenomenon, anticentromere antibodies and signs of right ventricular pressure loading suggest pulmonary arterial hypertension in systemic sclerosis. Right-heart catheterization measures pulmonary pressures and resistance and confirms the hemodynamic diagnosis."},
    {"ids": ["batch-medicine-final-431-p5594-q4", "medicine-final-431-infectious-diseases-q004"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-pcp"], "explanation": "Weeks of progressive breathlessness, dry cough and fever with diffuse bilateral infiltrates in a person with longstanding HIV strongly suggest Pneumocystis pneumonia. The illness often progresses more gradually than ordinary bacterial lobar pneumonia. Respiratory sampling can confirm the diagnosis."},
    {"ids": ["batch-medicine-final-431-p5605-q5", "medicine-final-431-infectious-diseases-q005"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["severe-malaria"], "explanation": "A rising creatinine signals renal injury. Acute kidney injury is a severe organ complication of falciparum malaria, so this change is more concerning than the other isolated laboratory findings offered."},
    {"ids": ["batch-medicine-final-431-p5611-q6", "medicine-final-431-infectious-diseases-q006"], "answers": [], "ungradedReason": "The options omit current preferred treatment and do not clearly establish whether severe malaria is present.", "confidence": "tentative", "references": ["malaria", "severe-malaria", "r-travel"], "explanation": "Fever after travel to Kenya without prophylaxis warrants urgent malaria testing and assessment for severe disease. For severe malaria, use IV artesunate under current guidance. Quinine plus doxycycline is an older alternative regimen for uncomplicated chloroquine-resistant malaria and cannot be selected here without species, parasitemia and severity context."},
    {"ids": ["batch-medicine-final-431-p5623-q7", "medicine-final-431-infectious-diseases-q007"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-shingles"], "explanation": "Unilateral pain and grouped vesicles along a thoracic dermatome indicate shingles. After chickenpox, varicella-zoster virus remains latent in sensory ganglia and can reactivate during immunosuppression."},
    {"ids": ["batch-medicine-final-431-p5629-q8", "medicine-final-431-infectious-diseases-q008"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-travel"], "explanation": "When travel to a chloroquine-resistant area cannot be avoided during pregnancy, mefloquine is the recommended prophylaxis option listed here. Primaquine is contraindicated because fetal G6PD status is unknown. Avoiding or deferring travel is preferable when possible."},
    {"ids": ["batch-medicine-final-431-p5645-q10", "medicine-final-431-endocrinology-q010"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-thyrotox"], "explanation": "Palpitations, tremor, heat intolerance and weight loss suggest thyrotoxicosis. Excess circulating thyroid hormone suppresses pituitary TSH through negative feedback. Low TSH with high free T4 and T3 fits the observed syndrome."},
    {"ids": ["batch-medicine-final-431-p5652-q11", "medicine-final-431-endocrinology-q011"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-acromegaly"], "explanation": "Increasing shoe size and coarsening facial features with sweating, hypertension and diabetes suggest acromegaly. Start with serum IGF-1 interpreted against an age-adjusted reference range. Random GH varies with pulsatile secretion."},
    {"ids": ["batch-medicine-final-431-p5659-q12", "medicine-final-431-endocrinology-q012"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Galactorrhea, amenorrhea and a pituitary mass with genuinely elevated prolactin suggest a macroprolactinoma. A dopamine agonist, usually cabergoline, lowers prolactin and often shrinks the tumor. With a large lesion and only mild elevation, confirm the assay result and consider stalk effect or a hook effect."},
    {"ids": ["batch-medicine-final-431-p5666-q13", "medicine-final-431-endocrinology-q013"], "answers": [], "ungradedReason": "The historical key describes a possible but uncommon endocrine cause. No option establishes a most common endocrine cause.", "confidence": "tentative", "references": ["obesity-endocrine", "cushing"], "explanation": "Cushing syndrome can cause central adiposity, but it is an uncommon explanation for obesity. Energy excess is a common contributor to obesity and is not an endocrine disorder. Evaluate specific endocrine features when present."},
    {"ids": ["batch-medicine-final-431-p5671-q14", "medicine-final-431-endocrinology-q014"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes generally reflects autoimmune destruction of pancreatic beta cells. Genetic susceptibility, especially in HLA regions, raises risk. These variants do not by themselves establish beta-cell autoimmunity."},
    {"ids": ["batch-medicine-final-431-p5678-q15", "medicine-final-431-endocrinology-q015"], "answers": [], "ungradedReason": "Diabetes duration alone does not establish a unique complication in this individual.", "confidence": "tentative", "references": ["r-neurop", "diabetes-ckd"], "explanation": "Neuropathy is common after many years of diabetes and can be asymptomatic, but retinopathy, kidney disease and cardiovascular disease are also possible. Sensory examination, retinal screening and urine albumin and kidney-function testing distinguish the complications."},
    {"ids": ["batch-medicine-final-431-p5691-q17", "medicine-final-431-endocrinology-q017"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-thyrotox"], "explanation": "Diffuse goiter with a bruit, orbitopathy and pretibial myxedema strongly points to Graves disease. Stimulating TSH-receptor antibodies increase thyroid hormone production throughout the gland."},
    {"ids": ["batch-medicine-final-431-p5698-q18", "medicine-final-431-endocrinology-q018"], "answers": [], "ungradedReason": "The question does not specify whether this is initial counseling or escalation after prior treatment.", "confidence": "tentative", "references": ["diabetes-weight", "bariatric"], "explanation": "Structured nutrition, physical activity and behavioral support underpin obesity treatment. With BMI 34 and type 2 diabetes, drug therapy can be added and metabolic surgery may also be considered in appropriate patients. A history of previous treatment and patient preferences affect the choice."},
    {"ids": ["batch-medicine-final-431-p5708-q19", "medicine-final-431-endocrinology-q019"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-weight"], "explanation": "Obesity increases insulin resistance and the risk of type 2 diabetes, the metabolic complication listed. Sleep apnea, osteoarthritis and cancer are also associated with obesity but describe other categories of complication."},
    {"ids": ["batch-medicine-final-431-p5714-q20", "medicine-final-431-endocrinology-q020"], "answers": [], "ungradedReason": "There is no universal ranking of atherogenicity per particle in this stem.", "confidence": "tentative", "references": ["lipid"], "explanation": "Small dense LDL is associated with atherogenic metabolic patterns, which explains the historical key. Other apoB-containing particles, including LDL, IDL and VLDL remnants, can also contribute. Clinical risk depends partly on the total burden of atherogenic particles."},
    {"ids": ["batch-medicine-final-431-p5721-q21", "medicine-final-431-endocrinology-q021"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-acromegaly", "pituitary"], "explanation": "A pituitary tumor extending above the sella can compress the optic chiasm and injure crossing nasal-retinal fibers. That causes loss of the temporal field in both eyes. Acromegaly without chiasmal compression does not cause this field defect."},
    {"ids": ["batch-medicine-final-431-p5727-q22", "medicine-final-431-endocrinology-q022"], "answers": [], "ungradedReason": "The stem does not establish the time, magnitude or validity of the low cortisol result.", "confidence": "tentative", "references": ["pituitary", "adrenal"], "explanation": "Hypotension and possible cortisol deficiency require prompt treatment if adrenal crisis is suspected. For a stable patient with an uncertain diagnosis, obtain properly timed morning cortisol and ACTH or dynamic testing as indicated. With confirmed central adrenal insufficiency and low or inappropriately normal ACTH, pituitary imaging looks for the cause."},
    {"ids": ["batch-medicine-final-431-p5734-q23", "medicine-final-431-endocrinology-q023"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Metoclopramide blocks dopamine D2 receptors. Dopamine normally restrains prolactin release, so blocking it can cause hyperprolactinemia and sometimes galactorrhea or menstrual disturbance."},
    {"ids": ["batch-medicine-final-431-p5741-q24", "medicine-final-431-endocrinology-q024"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "A dopamine agonist is usual first-line treatment for a symptomatic microprolactinoma or one causing hypogonadism or infertility. Selected asymptomatic patients can be monitored and surgery is an option in selected situations."},
    {"ids": ["batch-medicine-final-431-p5748-q25", "medicine-final-431-endocrinology-q025"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-hypothy"], "explanation": "Cold intolerance, goiter, periorbital puffiness and slow relaxation of reflexes support hypothyroidism. Levothyroxine replaces T4 once the diagnosis is confirmed with thyroid function testing."},
    {"ids": ["batch-medicine-final-431-p5756-q26", "medicine-final-431-neurology-q026"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-tbdiag", "meningitis"], "explanation": "Subacute headache with a lymphocyte-predominant CSF, elevated protein and CSF glucose only about 38% of concurrent blood glucose favors tuberculous meningitis among the choices. A malar rash does not establish CNS lupus as the cause. Obtain appropriate microbiologic testing for TB and assess other chronic meningitides."},
    {"ids": ["batch-medicine-final-431-p5765-q27", "medicine-final-431-hematology-oncology-q027"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-hodgkin"], "explanation": "Stage I can refer to involvement of one lymph-node region, such as unilateral cervical nodes, and “A” means no qualifying B symptoms. CNS spread would represent advanced extranodal disease. Leukopenia and LDH do not define the stage."},
    {"ids": ["batch-medicine-final-431-p5772-q28", "medicine-final-431-hematology-oncology-q028"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-menses"], "explanation": "Low ferritin with chronic heavy menstrual loss supports iron deficiency. Oral iron is appropriate for a stable adolescent able to tolerate it, alongside treatment of the bleeding source. The older two- or three-times-daily schedule is not required, and transfusion depends on instability or symptoms as well as hemoglobin."},
    {"ids": ["batch-medicine-final-431-p5779-q29", "medicine-final-431-hematology-oncology-q029"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-hodgkin"], "explanation": "Firm cervical lymphadenopathy with weight loss and a mediastinal mass in a young adult strongly suggests lymphoma. Hodgkin lymphoma commonly involves the cervical and mediastinal nodes. Tissue is required to establish the subtype."},
    {"ids": ["batch-medicine-final-431-p5787-q30", "medicine-final-431-hematology-oncology-q030"], "answers": [], "ungradedReason": "The original omits the MCV value and provides no reticulocyte count or folate measurement.", "confidence": "tentative", "references": ["r-sickle"], "explanation": "Baseline hemolytic anemia can explain a low hemoglobin in sickle cell disease. A high MCV, if present, could reflect hydroxyurea, reticulocytosis or folate deficiency, while a low reticulocyte count would raise concern for marrow suppression. The missing MCV cannot be inferred."},
    {"ids": ["batch-medicine-final-431-p5794-q31", "medicine-final-431-hematology-oncology-q031"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-tnm"], "explanation": "T describes the primary tumor's size or local extent, using organ-specific definitions. N describes regional lymph-node involvement and M describes distant spread."},
    {"ids": ["batch-medicine-final-434-p4427-q3", "medicine-final-434-rheumatology-q003"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-myosit"], "explanation": "Anti–Jo-1 is a myositis-specific antibody associated with antisynthetase syndrome. It can occur in inflammatory myopathy with or without classic dermatomyositis skin findings. The other antibodies are more typical of other connective-tissue diseases."},
    {"ids": ["batch-medicine-final-434-p4433-q4", "medicine-final-434-rheumatology-q004"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-myosit"], "explanation": "Gottron papules or Gottron sign are characteristic dermatomyositis lesions over the extensor surfaces of joints. Photosensitivity alone is less specific, and a malar rash suggests a broader differential."},
    {"ids": ["batch-medicine-final-434-p4439-q5", "medicine-final-434-rheumatology-q005"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-sjogren-cns"], "explanation": "Sjögren disease can be associated with inflammatory CNS demyelination that resembles multiple sclerosis or overlaps with neuromyelitis optica spectrum disease. The association is uncommon and the exact syndrome needs its own work-up."},
    {"ids": ["batch-medicine-final-434-p4445-q6", "medicine-final-434-rheumatology-q006"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ssc-paht"], "explanation": "A parasternal heave suggests increased right ventricular workload. In systemic sclerosis, progressive dyspnea with a clear chest makes pulmonary hypertension a key concern. Echocardiography assesses probability, and right-heart catheterization confirms the diagnosis."},
    {"ids": ["batch-medicine-final-434-p4452-q7", "medicine-final-434-rheumatology-q007"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-ra-neck"], "explanation": "Longstanding erosive rheumatoid arthritis can affect the cervical spine, including occult atlantoaxial instability. That matters before neck manipulation for anesthesia. Imaging is selected by risk, symptoms and airway plan, with cervical radiographs an appropriate initial investigation among these choices."},
    {"ids": ["batch-medicine-final-434-p4459-q8", "medicine-final-434-rheumatology-q008"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ra"], "explanation": "Ten swollen joints and positive anti-CCP support clinically active rheumatoid arthritis even without erosions. Methotrexate is the preferred conventional first-line DMARD for many patients with moderate or high activity when there is no contraindication."},
    {"ids": ["batch-medicine-final-434-p4483-q11", "medicine-final-434-infectious-diseases-q011"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-ebv"], "explanation": "Fever and sore throat with atypical lymphocytes in an adolescent fit infectious mononucleosis caused by Epstein–Barr virus. The reactive atypical cells are predominantly activated T lymphocytes responding to infection."},
    {"ids": ["batch-medicine-final-434-p4490-q12", "medicine-final-434-infectious-diseases-q012"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-tbdiag", "tb"], "explanation": "Hemoptysis, constitutional symptoms, travel and cervical adenopathy raise concern for tuberculosis involving the lungs and possibly cervical lymph nodes. The tender node and short history alone are nonspecific. Respiratory and lymph-node testing distinguish TB from other infection or malignancy."},
    {"ids": ["batch-medicine-final-434-p4496-q13", "medicine-final-434-infectious-diseases-q013"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-shingles"], "explanation": "Painful vesicles in a unilateral band on the chest fit thoracic shingles. Acyclovir is the antiviral among the listed choices that treats varicella-zoster virus. Timing, severity and immune status determine the regimen."},
    {"ids": ["batch-medicine-final-434-p4503-q14", "medicine-final-434-infectious-diseases-q014"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["saudihiv"], "explanation": "Sexual transmission was the leading route in the cited historical Saudi HIV cohort. Vertical, bloodborne and injection-related transmission are also possible. The item asks about the route commonly reported in its setting."},
    {"ids": ["batch-medicine-final-434-p4511-q15", "medicine-final-434-endocrinology-q015"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Most type 1 diabetes results from immune-mediated destruction of pancreatic beta cells. Genes and environmental exposures can modify susceptibility, but autoimmunity is the direct process asked for."},
    {"ids": ["batch-medicine-final-434-p4518-q16", "medicine-final-434-endocrinology-q016"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["insulin-peds"], "explanation": "Insulin can lower blood glucose below the level needed for normal function, especially when the dose exceeds carbohydrate intake or activity changes. Hypoglycemia is the common acute treatment complication. Lipohypertrophy is a local repeated-injection complication."},
    {"ids": ["batch-medicine-final-434-p4524-q17", "medicine-final-434-endocrinology-q017"], "answers": [], "ungradedReason": "The frequency of chronic complications varies with diabetes type, duration, population and screening method.", "confidence": "tentative", "references": ["r-neurop", "diabetes-ckd"], "explanation": "Retinopathy is a major microvascular complication, but prevalence comparisons with neuropathy and kidney disease require a defined population. The stem gives no way to establish a universally most common chronic complication."},
    {"ids": ["batch-medicine-final-434-p4550-q21", "medicine-final-434-endocrinology-q021"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "HLA DR3 and DR4 haplotypes are classic genetic associations with autoimmune type 1 diabetes. Risk depends on combinations with HLA-DQ and other loci. These alleles are neither necessary nor sufficient for diagnosis."},
    {"ids": ["batch-medicine-final-434-p4557-q22", "medicine-final-434-endocrinology-q022"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds"], "explanation": "An HbA1c above 10% can justify considering insulin, particularly with symptoms or catabolism. Premixed insulin is the only insulin option listed, but the value does not mandate premixed therapy. The starting regimen depends on judgment, glucose pattern and the patient's circumstances."},
    {"ids": ["batch-medicine-final-434-p4564-q23", "medicine-final-434-endocrinology-q023"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-thyrotox"], "explanation": "High free T4 with suppressed TSH shows thyrotoxicosis. Radionuclide uptake can separate increased hormone production from destructive thyroiditis when the cause is unclear and pregnancy is excluded. Ultrasound characterizes nodule or gland structure."},
    {"ids": ["batch-medicine-final-434-p4578-q25", "medicine-final-434-endocrinology-q025"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-breast"], "explanation": "Peau d’orange reflects skin edema from impaired lymphatic drainage. It is a breast cancer warning sign when paired with a new mass, even though inflammatory or infectious conditions can mimic it."},
    {"ids": ["batch-medicine-final-434-p4585-q26", "medicine-final-434-endocrinology-q026"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-acromegaly"], "explanation": "In a clinically typical case, serum IGF-1 interpreted against age-specific reference values is the initial biochemical test. GH suppression after an oral glucose load can help with equivocal results."},
    {"ids": ["batch-medicine-final-434-p4598-q28", "medicine-final-434-endocrinology-q028"], "answers": [], "ungradedReason": "The offered lifestyle-only choice leaves out appropriate glucose-lowering treatment and no standard initial drug choice is offered.", "confidence": "tentative", "references": ["diabetes", "diabetes-meds"], "explanation": "Two measurements of HbA1c 8.5% establish persistent diabetic-range glycemia. Start lifestyle support with individualized glucose-lowering therapy. This HbA1c alone does not make immediate basal–bolus insulin mandatory in an asymptomatic patient without catabolism."},
    {"ids": ["batch-medicine-final-434-p4605-q29", "medicine-final-434-endocrinology-q029"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["tg", "lipid"], "explanation": "A triglyceride concentration of 36.3 mmol/L is extreme and carries pancreatitis risk. Fenofibrate is the best lipid-lowering option listed for that immediate problem, alongside a very-low-fat diet and assessment of secondary causes. Statin intensity addresses a different long-term risk."},
    {"ids": ["batch-medicine-final-434-p4619-q32", "medicine-final-434-endocrinology-q032"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Amenorrhea and galactorrhea with a pituitary microadenoma suggest a symptomatic prolactinoma once prolactin and secondary causes are assessed. A dopamine agonist reduces prolactin and often shrinks the adenoma."},
    {"ids": ["batch-medicine-final-434-p4628-q33", "medicine-final-434-neurology-q033"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Vancomycin can provide empiric coverage for Streptococcus pneumoniae with reduced susceptibility to penicillins or third-generation cephalosporins, depending on local resistance. Listeria coverage requires an agent such as ampicillin when indicated."},
    {"ids": ["batch-medicine-final-434-p4635-q34", "medicine-final-434-neurology-q034"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-sjogren"], "explanation": "Multimodal sensory loss and sensory incoordination with areflexia but preserved power suggest a sensory neuronopathy. Non-length-dependent involvement of both arms and legs favors dorsal root ganglia. Nerve-conduction studies help distinguish it from a distal sensory polyneuropathy."},
    {"ids": ["batch-medicine-final-434-p4642-q35", "medicine-final-434-neurology-q035"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-cmt"], "explanation": "A slowly progressive distal sensorimotor neuropathy beginning young with pes cavus and absent reflexes strongly suggests an inherited neuropathy such as Charcot–Marie–Tooth disease. The chronic foot deformity helps distinguish it from many acquired causes."},
    {"ids": ["batch-medicine-final-434-p4649-q36", "medicine-final-434-neurology-q036"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-encephalitis"], "explanation": "Fever, encephalopathy, seizure and a focal sign suggest encephalitis. CSF studies including HSV PCR are needed once lumbar puncture is safe. A normal CT does not exclude encephalitis, and empiric acyclovir should not await the PCR result if HSV is suspected."},
    {"ids": ["batch-medicine-final-434-p4656-q37", "medicine-final-434-hematology-oncology-q037"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-cll"], "explanation": "Peripheral blood smear and flow cytometry detect and classify the clonal circulating B cells typical of CLL. Bone marrow biopsy is generally unnecessary just to establish the diagnosis when blood criteria are met."},
    {"ids": ["batch-medicine-final-434-p4663-q38", "medicine-final-434-hematology-oncology-q038"], "answers": [], "ungradedReason": "Routine platelet transfusion is unsafe to teach from the supplied information, which does not mention emergency neurosurgery or thrombocytopenia.", "confidence": "tentative", "references": ["r-ich"], "explanation": "With spontaneous intracranial hemorrhage in a patient taking aspirin, routine platelet transfusion in the absence of emergency surgery can cause harm. The patient needs acute hemorrhage care and assessment for neurosurgical indications. No option describes the general next step."},
    {"ids": ["batch-medicine-final-434-p4670-q39", "medicine-final-434-hematology-oncology-q039"], "answers": ["A"], "ungradedReason": "Gift records D, but severe isolated thrombocytopenia supports immune thrombocytopenia among the offered choices.", "confidence": "supported", "references": ["itp"], "explanation": "Marked isolated thrombocytopenia with petechiae and mucosal bleeding suggests immune thrombocytopenia after excluding other causes. Von Willebrand disease usually leaves the platelet count normal. Type 2B can reduce the count, but this presentation and degree favor ITP."},
    {"ids": ["batch-medicine-final-434-p4677-q40", "medicine-final-434-hematology-oncology-q040"], "answers": ["C"], "ungradedReason": "Gift records A, but germ-cell tumors are the classic potentially curable solid malignancy with systemic therapy in these choices.", "confidence": "supported", "references": ["r-germ-cell", "r-cll"], "explanation": "Cisplatin-based chemotherapy can cure even metastatic testicular germ-cell tumors in many patients. Standard systemic treatment of CLL is generally disease control. Rhabdomyosarcoma may be curable with multimodal therapy that includes local treatment."},
    {"ids": ["batch-medicine-final-434-p4684-q41", "medicine-final-434-hematology-oncology-q041"], "answers": ["A"], "ungradedReason": "Gift gives a loss of exactly 10%; formal B-symptom definitions normally require more than 10%.", "confidence": "tentative", "references": ["r-hodgkin"], "explanation": "The weight-loss B symptom is unexplained loss of more than 10% of usual body weight over six months. Six kilograms is exactly 10% of 60 kg. Drenching night sweats and otherwise unexplained fever are the other qualifying patterns, and the remaining choices do not describe them."},
    {"ids": ["batch-medicine-final-434-p4694-q42", "medicine-final-434-hematology-oncology-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-hemo"], "explanation": "An isolated prolonged aPTT with deep bleeding raises concern for an intrinsic pathway factor deficiency or an inhibitor. A mixing study tests whether normal plasma corrects the aPTT, guiding factor assays and inhibitor testing."},
    {"ids": ["batch-medicine-final-432-p5253-q1", "medicine-final-432-rheumatology-q001"], "answers": ["B", "C"], "ungradedReason": "The criteria include qualifying nonscarring alopecia and proteinuria. The stem does not specify the type of alopecia or ask for the most strongly weighted choice.", "confidence": "tentative", "references": ["sle", "lupus-kidney"], "explanation": "Renal proteinuria and nonscarring alopecia can both contribute to SLE classification when no better explanation exists. Nephrotic-range proteinuria is above the renal protein threshold, but is not unique to lupus. Routine normocytic anemia and extensor scaly plaques are not the corresponding classification features."},
    {"ids": ["batch-medicine-final-432-p5260-q2", "medicine-final-432-rheumatology-q002"], "answers": ["A"], "ungradedReason": "The source keys anemia. No isolated CBC finding confirms lupus, and the wording omits the qualifiers for lupus-related cytopenias.", "confidence": "tentative", "references": ["sle"], "explanation": "Unexplained leukopenia is the best listed CBC criterion for SLE classification. Generic anemia does not count by itself. Autoimmune hemolysis is a more specific feature and requires supporting findings. Interpret the CBC with autoantibodies and the rest of the systemic presentation."},
    {"ids": ["batch-medicine-final-432-p5267-q3", "medicine-final-432-rheumatology-q003"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ssc"], "explanation": "Puffy hands, reflux and dyspnea suggest systemic sclerosis, with possible esophageal and pulmonary involvement. Anti-topoisomerase I, usually written anti-Scl-70, is the intended option B. The number in the recalled choice appears mistyped. Anti-Jo-1 is associated with antisynthetase syndrome."},
    {"ids": ["batch-medicine-final-432-p5274-q4", "medicine-final-432-rheumatology-q004"], "answers": ["B"], "ungradedReason": "Paracetamol can be an option for short-term pain relief in selected patients, but current guidance does not identify it as the universal treatment of choice.", "confidence": "tentative", "references": ["oa", "cm438-oa-nice"], "explanation": "Osteoarthritis management starts with exercise and weight management when relevant. Topical NSAIDs are often preferred for knee pain, followed where appropriate by other options. Paracetamol is the only reasonable general pain reliever listed, but it has limited average benefit and is generally reserved for selected situations."},
    {"ids": ["batch-medicine-final-432-p5281-q5", "medicine-final-432-rheumatology-q005"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["low-back-acr"], "explanation": "New back pain with low-energy exertion at age 80 raises concern for a vertebral compression fracture. Lumbar radiographs are a reasonable initial test among these options. MRI is useful when there are neurologic deficits, persistent suspicion after negative initial imaging or a need to distinguish other causes."},
    {"ids": ["batch-medicine-final-432-p5293-q6", "medicine-final-432-infectious-diseases-q006"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "P. falciparum is associated with the greatest risk of severe disease and death among these human malaria species. It can cause high parasite burdens and microvascular sequestration with organ dysfunction. Other species can also cause serious malaria, so suspected cases still need prompt assessment."},
    {"ids": ["batch-medicine-final-432-p5299-q7", "medicine-final-432-infectious-diseases-q007"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["kaposi"], "explanation": "Human herpesvirus 8, also called Kaposi sarcoma-associated herpesvirus, is the causative viral association. HIV increases the risk by impairing immune control but is not the virus identified in Kaposi tumor tissue as the driver."},
    {"ids": ["batch-medicine-final-432-p5305-q8", "medicine-final-432-infectious-diseases-q008"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["varicella"], "explanation": "Varicella lesions appear in successive crops, so macules, papules, vesicles and crusts can coexist on examination. That mixture of stages is the clue favoring chickenpox over a uniform maculopapular exanthem such as measles or rubella."},
    {"ids": ["batch-medicine-final-432-p5318-q10", "medicine-final-432-infectious-diseases-q010"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["vap"], "explanation": "Keeping the head of the bed elevated reduces the risk of aspiration in mechanically ventilated patients when feasible and safe. Routine daily ventilator circuit changes and prophylactic intravenous or nebulized antibiotics are not the general prevention step tested by the question."},
    {"ids": ["batch-medicine-final-432-p5325-q11", "medicine-final-432-infectious-diseases-q011"], "answers": [], "ungradedReason": "The original keys mesothelioma without any documented asbestos exposure, compatible pleural imaging or biopsy. No tumor is established by the brief symptom history.", "confidence": "tentative", "references": ["asbestos", "pleural"], "explanation": "Long occupational exposure can be relevant, but cement work alone does not identify the exposure or distinguish among lung and pleural diagnoses. Mesothelioma typically raises concern with confirmed asbestos exposure and a pleural process. One week of unspecified respiratory symptoms cannot establish malignancy or its histology."},
    {"ids": ["batch-medicine-final-432-p5333-q12", "medicine-final-432-endocrinology-q012"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "A1C reflects average glycemia over approximately two to three months and is more useful than a single fasting value for tracking long-term glycemic exposure. That makes A the best listed marker of glycemia-related chronic complication risk. Overall risk also depends on diabetes duration, blood pressure, kidney status and other factors."},
    {"ids": ["batch-medicine-final-432-p5339-q13", "medicine-final-432-endocrinology-q013"], "answers": [], "ungradedReason": "The most frequent complication varies with the population, duration of diabetes and how each outcome is screened. The question supplies none of these.", "confidence": "tentative", "references": ["t2-complications", "diabetes"], "explanation": "Neuropathy, kidney disease and retinopathy are all common microvascular complications of type 2 diabetes. Retinopathy is important and can already be present at diagnosis, but it is not universally the most frequent. Screen for each relevant complication according to clinical guidance."},
    {"ids": ["batch-medicine-final-432-p5345-q14", "medicine-final-432-endocrinology-q014"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "The characteristic lesion of type 1 diabetes is progressive immune-mediated destruction of pancreatic beta cells, producing severe insulin deficiency. Insulin resistance is prominent in type 2 diabetes and can coexist with type 1, but it does not describe the defining pathology in this item."},
    {"ids": ["batch-medicine-final-432-p5351-q15", "medicine-final-432-endocrinology-q015"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "Extremely high LDL with normal triglycerides in a young adult and a first-degree relative with premature coronary disease strongly suggests familial hypercholesterolemia. Impaired LDL receptor function is the classic mechanism among the choices. Lipoprotein lipase or apo C-II defects instead cause marked triglyceride elevation."},
    {"ids": ["batch-medicine-final-432-p5358-q16", "medicine-final-432-endocrinology-q016"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["prolactin-2023"], "explanation": "Excess prolactin explains the combination of galactorrhea and amenorrhea by suppressing the reproductive axis. Headache raises suspicion for a pituitary lesion but does not show its cause. Check prolactin and assess pregnancy, medications and thyroid disease before assuming a prolactinoma."},
    {"ids": ["batch-medicine-final-432-p5365-q17", "medicine-final-432-endocrinology-q017"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "For most patients with a resectable GH-secreting pituitary adenoma, transsphenoidal surgery is the preferred initial definitive treatment. Medical therapy is important for persistent disease or when surgery is unsuitable. Radiotherapy usually follows selected cases rather than serving as the routine first treatment."},
    {"ids": ["batch-medicine-final-432-p5370-q18", "medicine-final-432-endocrinology-q018"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["tg", "lipid"], "explanation": "Assuming the triglycerides are 6.3 mmol/L, this is roughly 560 mg/dL, a range where pancreatitis prevention becomes important. Confirm the fasting result and address secondary causes and diet. A fibrate such as fenofibrate is a reasonable choice among the listed drugs if the severe elevation persists."},
    {"ids": ["batch-medicine-final-432-p5377-q19", "medicine-final-432-endocrinology-q019"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["basal-metabolism"], "explanation": "Basal metabolic rate measures energy used at rest for essential body functions and is usually the largest part of total daily energy expenditure. Physical activity and digestion make up other components. The largest component differs from the most variable one, which is often physical activity."},
    {"ids": ["batch-medicine-final-432-p5383-q20", "medicine-final-432-endocrinology-q020"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["leptin"], "explanation": "Leptin is released by adipose tissue and signals energy stores to the hypothalamus. It normally reduces appetite, an effect supported by leptin replacement studies in congenital deficiency. Glycogen is a carbohydrate store rather than an appetite hormone."},
    {"ids": ["batch-medicine-final-432-p5390-q21", "medicine-final-432-endocrinology-q021"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "If the reported glucose is fasting and in mmol/L, 6.8 is above normal but below the diagnostic diabetes cutoff of 7.0. Lifestyle measures are the best listed initial treatment to discuss while confirming glycemia with a diagnostic test. A single reading with no fasting status or units cannot establish diabetes or justify committing to drug treatment."},
    {"ids": ["batch-medicine-final-432-p5397-q22", "medicine-final-432-endocrinology-q022"], "answers": ["B"], "ungradedReason": "B is the intended choice only if it means growth hormone measured for failure to suppress during a glucose tolerance test. A random GH measurement is inadequate.", "confidence": "tentative", "references": ["acromegaly"], "explanation": "IGF-1 is the usual first biochemical test for suspected acromegaly. Where additional confirmation is needed, failure of growth hormone to suppress after oral glucose supports the diagnosis. The source note specifies this dynamic test, while the option itself just says GH level."},
    {"ids": ["batch-medicine-final-432-p5404-q23", "medicine-final-432-endocrinology-q023"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactin-2023"], "explanation": "A dopamine agonist is first-line for a confirmed symptomatic microprolactinoma and can reduce both prolactin and tumor size. Galactorrhea plus a 3 mm lesion is suggestive but the lesion can be incidental. Confirm elevated prolactin and exclude secondary causes before choosing treatment."},
    {"ids": ["batch-medicine-final-432-p5411-q24", "medicine-final-432-endocrinology-q024"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "Cardiovascular disease is a major cause of illness and death in acromegaly. Longstanding excess GH and IGF-1 can contribute to hypertension, cardiomyopathy and metabolic risk. Bone and joint disease contributes to morbidity but is not the best explanation for mortality among these choices."},
    {"ids": ["batch-medicine-final-432-p5418-q25", "medicine-final-432-endocrinology-q025"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["bariatric"], "explanation": "A BMI of 48.8 with diabetes and hypertension clearly warrants evaluation for metabolic and bariatric surgery. Referral begins a discussion of benefits, risks and long-term follow-up and does not replace lifestyle support. Snoring and daytime sleepiness also warrant separate evaluation for obstructive sleep apnea."},
    {"ids": ["batch-medicine-final-432-p5425-q26", "medicine-final-432-endocrinology-q026"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Insulin can lower glucose below the safe range, especially when dose, food intake and activity do not match. Hypoglycemia is the most common important adverse effect among the options. Local allergy is uncommon and hypercalcemia is not the expected effect."},
    {"ids": ["batch-medicine-final-432-p5432-q27", "medicine-final-432-endocrinology-q027"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["myxedema"], "explanation": "Cold intolerance, weight gain and menorrhagia suggest hypothyroidism. Severe untreated hypothyroidism can rarely decompensate into myxedema coma, often with altered alertness, hypothermia and a precipitating illness. Pretibial myxedema is a separate finding associated with Graves disease."},
    {"ids": ["batch-medicine-final-432-p5458-q31", "medicine-final-432-endocrinology-q031"], "answers": [], "ungradedReason": "Hypothermia with impaired consciousness is nonspecific, and the classic endocrine emergency is myxedema coma, which the choices omit.", "confidence": "tentative", "references": ["myxedema", "dka", "adrenal"], "explanation": "Severe hypothyroidism classically causes altered mental status with hypothermia. DKA can alter consciousness and occasionally coexist with hypothermia, but requires ketonemia and metabolic acidosis. Sepsis or adrenal crisis can also cause an abnormal temperature and mental status. The stem does not support a unique diagnosis."},
    {"ids": ["batch-medicine-final-432-p5464-q32", "medicine-final-432-endocrinology-q032"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["phpt"], "explanation": "High calcium with a high rather than suppressed PTH suggests primary hyperparathyroidism. Severe PTH excess can cause osteitis fibrosa cystica and lytic brown tumors, weakening bone enough to fracture with minimal trauma. The calcium pattern and normal vitamin D are less consistent with vitamin-D-deficiency secondary hyperparathyroidism."},
    {"ids": ["batch-medicine-final-432-p5471-q33", "medicine-final-432-neurology-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-mg"], "explanation": "Ptosis and diplopia with fatigability point to myasthenia gravis. Acetylcholine receptor antibodies support the diagnosis in a compatible presentation. A negative result does not exclude disease, especially when symptoms are mainly ocular, and neurophysiology or additional antibody testing may be needed."},
    {"ids": ["batch-medicine-final-432-p5478-q34", "medicine-final-432-neurology-q034"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["dmd"], "explanation": "Duchenne muscular dystrophy results from pathogenic variants in the dystrophin gene on the X chromosome and follows X-linked inheritance, classically described as X-linked recessive. It typically affects boys. Female carriers may have manifestations, particularly cardiac disease or weakness."},
    {"ids": ["batch-medicine-final-432-p5495-q36", "medicine-final-432-neurology-q036"], "answers": ["B"], "ungradedReason": "The keyed site is correct for myasthenia gravis, but it is peripheral. No listed central nervous system structure is its primary site.", "confidence": "tentative", "references": ["cm438-mg"], "explanation": "Myasthenia gravis is a disorder of transmission at the peripheral neuromuscular junction, usually from antibodies directed at postsynaptic proteins. That produces fluctuating weakness without a primary cerebral or spinal cord lesion. The anatomical premise in the stem is incorrect."},
    {"ids": ["batch-medicine-final-432-p5502-q37", "medicine-final-432-neurology-q037"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ilae"], "explanation": "A rising epigastric aura and oral automatisms suggest temporal lobe onset, often mesial temporal. Dystonic posturing can occur during the seizure. Its side sometimes helps lateralize a focus, but the question asks for the lobe and the temporal signs provide the strongest localization."},
    {"ids": ["batch-medicine-final-432-p5509-q38", "medicine-final-432-neurology-q038"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-absence"], "explanation": "Ethosuximide is a first-line choice for typical absence seizures when absence is the only seizure type. Valproate can treat absence with other generalized seizures but has additional risks. Carbamazepine can worsen absence seizures."},
    {"ids": ["batch-medicine-final-432-p5517-q39", "medicine-final-432-hematology-oncology-q039"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["hodgkin-nci"], "explanation": "Painless cervical lymphadenopathy is a classic presentation of Hodgkin lymphoma. The A suffix means no defined B symptoms, making unexplained fever or drenching night sweats less consistent with stage IIA. Stage II refers to the nodal distribution on one side of the diaphragm."},
    {"ids": ["batch-medicine-final-432-p5529-q40", "medicine-final-432-hematology-oncology-q040"], "answers": [], "ungradedReason": "The original keys CT, but none of the choices is a tissue diagnostic test.", "confidence": "tentative", "references": ["lymphoma-dx"], "explanation": "Lymphoma diagnosis requires adequate tissue for morphology, immunophenotyping and additional testing. CT and PET can show disease distribution, identify a biopsy site and assist staging or response assessment. Imaging alone cannot diagnose or subtype lymphoma."},
    {"ids": ["batch-medicine-final-432-p5543-q42", "medicine-final-432-hematology-oncology-q042"], "answers": ["B"], "ungradedReason": "CBC with differential is needed to establish neutropenia, and prompt blood cultures are also required. The stem does not specify whether it asks for confirmation or the infectious workup.", "confidence": "tentative", "references": ["neutropenic-fever"], "explanation": "Fever ten days after chemotherapy raises concern for febrile neutropenia. A CBC with differential determines the absolute neutrophil count. Obtain blood cultures promptly as part of the initial infection assessment, with other tests guided by symptoms, and avoid delaying empiric antibiotics in suspected high-risk cases."},
    {"ids": ["batch-medicine-final-433-p4840-q1", "medicine-final-433-rheumatology-q001"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["oa"], "explanation": "Gradual painful bony swelling confined to distal interphalangeal joints without prolonged morning stiffness favors hand osteoarthritis. Rheumatoid arthritis more often affects the MCP and PIP joints, while an acute crystal flare usually starts abruptly."},
    {"ids": ["batch-medicine-final-433-p4847-q2", "medicine-final-433-rheumatology-q002"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["sle"], "explanation": "Low C3 or C4 is a characteristic laboratory finding in active systemic lupus erythematosus, particularly with immune-complex involvement. Complement consumption can occur in other diseases, but SLE is the strongest association among the listed options."},
    {"ids": ["batch-medicine-final-433-p4855-q3", "medicine-final-433-rheumatology-q003"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-ra-cspine"], "explanation": "Long-standing rheumatoid arthritis can destabilize the upper cervical spine. Cervical imaging can inform airway planning if instability is suspected or intubation is planned. Routine imaging is not required before every endoscopy, and suspected active GI bleeding still needs timely evaluation."},
    {"ids": ["batch-medicine-final-433-p4862-q4", "medicine-final-433-rheumatology-q004"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["axspa", "asas"], "explanation": "Back pain that improves with movement, morning stiffness and a family history of psoriasis suggest axial spondyloarthritis. HLA-B27 is the associated allele among the choices. It is a risk marker and does not by itself diagnose the condition."},
    {"ids": ["batch-medicine-final-433-p4889-q8", "medicine-final-433-rheumatology-q008"], "answers": ["A"], "ungradedReason": "Isolated Raynaud phenomenon does not establish systemic sclerosis or predict a specific antibody.", "confidence": "tentative", "references": ["ssc"], "explanation": "Anti-topoisomerase I can support systemic sclerosis when Raynaud phenomenon occurs with other suggestive findings such as skin thickening or abnormal nailfold vessels. Raynaud phenomenon alone is frequently primary. The stem does not make any one antibody expected."},
    {"ids": ["batch-medicine-final-433-p4898-q9", "medicine-final-433-infectious-diseases-q009"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-zoster"], "explanation": "A one-sided thoracic vesicular eruption that stops at the midline is characteristic of herpes zoster. Acyclovir is the appropriate antiviral among these options. Antibiotics and antifungals do not treat uncomplicated shingles."},
    {"ids": ["batch-medicine-final-433-p4905-q10", "medicine-final-433-infectious-diseases-q010"], "answers": ["B"], "ungradedReason": "The food exposure alone cannot establish a likely pathogen without incubation, symptoms or an outbreak investigation.", "confidence": "tentative", "references": ["cm433-shawarma"], "explanation": "Salmonella is a plausible intended answer, and outbreaks have been traced to contaminated chicken shawarma. Several pathogens can contaminate the same meal, so the food type alone cannot establish the cause."},
    {"ids": ["batch-medicine-final-433-p4922-q12", "medicine-final-433-infectious-diseases-q012"], "answers": ["A"], "ungradedReason": "The stem omits the rash morphology, distribution details and associated findings needed to identify herpes infection.", "confidence": "tentative", "references": ["cm433-zoster"], "explanation": "Acyclovir is appropriate if the mouth or ear lesions are confirmed as a herpes eruption. Grouped vesicles, a dermatomal pattern, ear pain or facial weakness would help establish that possibility. An unspecified rash developing after treatment does not by itself justify this diagnosis."},
    {"ids": ["batch-medicine-final-433-p4930-q13", "medicine-final-433-infectious-diseases-q013"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-tb-air"], "explanation": "Cough, an abnormal chest X-ray and a positive acid-fast smear raise concern for infectious pulmonary tuberculosis. Use airborne precautions in a negative-pressure airborne infection isolation room while the diagnosis is investigated."},
    {"ids": ["batch-medicine-final-433-p4937-q14", "medicine-final-433-infectious-diseases-q014"], "answers": [], "ungradedReason": "The keyed amoxicillin alone does not provide appropriate empiric treatment for suspected bacterial meningitis in pregnancy.", "confidence": "tentative", "references": ["meningitis", "cm433-men-preg"], "explanation": "Gram-positive diplococci in CSF suggest pneumococcal meningitis. In pregnancy, empiric coverage includes an appropriate intravenous third-generation cephalosporin and additional Listeria coverage, with other agents guided by local resistance. Amoxicillin can be part of that regimen and is inadequate alone here."},
    {"ids": ["batch-medicine-final-433-p4949-q15", "medicine-final-433-infectious-diseases-q015"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-hiv-preg"], "explanation": "Start combination antiretroviral therapy promptly in pregnancy. Viral suppression protects maternal health and reduces perinatal transmission, regardless of the starting CD4 count. Partner testing is also appropriate but does not replace immediate maternal treatment."},
    {"ids": ["batch-medicine-final-433-p4956-q16", "medicine-final-433-infectious-diseases-q016"], "answers": ["D"], "ungradedReason": "D is closest because it treats both infections, but current guidance starts TB treatment first and introduces ART soon afterward, rather than mandating identical timing.", "confidence": "tentative", "references": ["cm433-tb-hiv"], "explanation": "Start treatment for active pulmonary TB promptly, then add ART early. NIH guidance uses treatment within two weeks of TB therapy when CD4 is below 50 cells/µL and within two to eight weeks at 50 or above. Drug interactions and possible TB meningitis can affect timing."},
    {"ids": ["batch-medicine-final-433-p4963-q17", "medicine-final-433-infectious-diseases-q017"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-malaria-treat"], "explanation": "Atovaquone-proguanil is an accepted option for uncomplicated falciparum malaria and the best listed choice when chloroquine resistance is possible. Artemisinin-based combination treatment is generally preferred where available. Chloroquine only fits a reliably chloroquine-sensitive infection."},
    {"ids": ["batch-medicine-final-433-p4969-q18", "medicine-final-433-infectious-diseases-q018"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-malaria-travel"], "explanation": "Atovaquone-proguanil is an appropriate prophylactic choice for travelers to areas with chloroquine-resistant malaria. Selection still depends on the exact destination and patient factors. Doxycycline can be an alternative, but the option lists tetracycline."},
    {"ids": ["batch-medicine-final-433-p4976-q19", "medicine-final-433-infectious-diseases-q019"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-malaria-severe"], "explanation": "Hyperbilirubinemia can accompany severe falciparum malaria and is the concerning finding among these options. Jaundice with other signs of organ dysfunction carries greater significance. A normal glucose does not have the adverse prognostic implication of hypoglycemia."},
    {"ids": ["batch-medicine-final-433-p4985-q20", "medicine-final-433-infectious-diseases-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-brucellosis-regimen", "brucellosis"], "explanation": "Doxycycline with streptomycin is an established combination for uncomplicated adult brucellosis and the best listed regimen. Doxycycline with rifampin is another accepted approach. The infection site and complications affect the choice."},
    {"ids": ["batch-medicine-final-433-p4992-q21", "medicine-final-433-infectious-diseases-q021"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-malaria-smear"], "explanation": "Mature peripheral trophozoites are least typical of P. falciparum because mature infected red cells tend to sequester in the microvasculature. Peripheral falciparum smears more often show delicate rings or crescent gametocytes. Mature forms are uncommon, rather than impossible."},
    {"ids": ["batch-medicine-final-433-p5000-q22", "medicine-final-433-endocrinology-q022"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "Transsphenoidal removal of a resectable growth hormone–secreting pituitary adenoma is the usual initial treatment for acromegaly. Medication is used when surgery is unsuitable or disease persists. Radiotherapy is generally reserved for selected cases."},
    {"ids": ["batch-medicine-final-433-p5006-q23", "medicine-final-433-endocrinology-q023"], "answers": ["A"], "ungradedReason": "The source does not specify a Saudi dataset, population or date, and reported complication rankings vary with definitions and sampling.", "confidence": "tentative", "references": ["cm433-saudi-diabetes", "diabetic-foot"], "explanation": "Neuropathy is a frequent chronic complication of diabetes and is the intended answer in the Saudi teaching comparison. A national “most common” claim depends on who was screened, which complications were measured and how each was defined."},
    {"ids": ["batch-medicine-final-433-p5012-q24", "medicine-final-433-endocrinology-q024"], "answers": ["A"], "ungradedReason": "The wording asks about all insulin adverse effects, but the expected hypoglycemia option is absent.", "confidence": "tentative", "references": ["cm433-insulin-effects"], "explanation": "Lipohypertrophy is a common injection-site complication, especially when injections are repeatedly given in the same place. Hypoglycemia is a common systemic adverse effect of insulin and is missing from the options. A fits only if the question means local effects."},
    {"ids": ["batch-medicine-final-433-p5024-q25", "medicine-final-433-endocrinology-q025"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-hypothyroid"], "explanation": "High TSH with low free T4 indicates primary hypothyroidism. A small goiter in this setting favors Hashimoto thyroiditis, which can be supported by thyroid peroxidase antibodies. Pituitary causes typically yield low or inappropriately normal TSH."},
    {"ids": ["batch-medicine-final-433-p5031-q26", "medicine-final-433-endocrinology-q026"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-graves"], "explanation": "Weight loss, palpitations and a toxic goiter indicate hyperthyroidism, while exophthalmos strongly favors Graves disease. Thyroiditis and a toxic adenoma do not usually cause the characteristic Graves orbitopathy."},
    {"ids": ["batch-medicine-final-433-p5038-q27", "medicine-final-433-endocrinology-q027"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-preg-breast"], "explanation": "New nipple retraction during pregnancy needs diagnostic assessment even without a palpable mass. Targeted retroareolar ultrasound is the best initial option listed. Diagnostic mammography can be added depending on the findings, age and persistence of concern."},
    {"ids": ["batch-medicine-final-433-p5061-q30", "medicine-final-433-endocrinology-q030"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ata-pregnancy"], "explanation": "Propylthiouracil is the preferred listed antithyroid drug when treatment is required early in pregnancy, generally through 16 weeks. Later drug choice is individualized. Radioactive iodine is contraindicated during pregnancy, and surgery is reserved for selected cases."},
    {"ids": ["batch-medicine-final-433-p5068-q31", "medicine-final-433-endocrinology-q031"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Exogenous glucocorticoid exposure is the most common cause of Cushing syndrome overall, so ask about steroid use first. If the syndrome is endogenous, a pituitary ACTH-secreting adenoma is a common cause. The physical findings alone do not identify the source of excess cortisol."},
    {"ids": ["batch-medicine-final-433-p5074-q32", "medicine-final-433-endocrinology-q032"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "A dopamine agonist, usually cabergoline, is first-line treatment for most symptomatic prolactinomas. An elevated prolactin result alone first requires evaluation for pregnancy, medications, hypothyroidism and other causes. Treatment depends on the cause and symptoms."},
    {"ids": ["batch-medicine-final-433-p5080-q33", "medicine-final-433-endocrinology-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-fh"], "explanation": "Premature myocardial infarction in a close relative raises suspicion for familial hypercholesterolemia. Pathogenic LDL receptor variants are the most common genetic cause. Reduced receptor function impairs LDL clearance, but the family history alone does not establish this patient's genotype."},
    {"ids": ["batch-medicine-final-433-p5088-q34", "medicine-final-433-neurology-q034"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis", "cm433-men-preg"], "explanation": "Fever, headache and neck stiffness strongly suggest meningitis. With no reported focal signs or indication for pre-LP imaging, perform lumbar puncture promptly if safe and start empiric antibiotics without waiting for the CSF result. Antibiotics must not be delayed if LP needs to wait."},
    {"ids": ["batch-medicine-final-433-p5098-q35", "medicine-final-433-neurology-q035"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-diplopia"], "explanation": "Horizontal diplopia that worsens looking right and at distance points to weakness of right-eye abduction. The right lateral rectus abducts the right eye and is supplied by the sixth cranial nerve."},
    {"ids": ["batch-medicine-final-433-p5105-q36", "medicine-final-433-neurology-q036"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-uhthoff"], "explanation": "Exercise and a hot shower raise body temperature and can temporarily worsen previously established multiple sclerosis symptoms. This is Uhthoff phenomenon, related to impaired conduction in demyelinated pathways. Symptoms usually improve as the body cools."},
    {"ids": ["batch-medicine-final-433-p5112-q37", "medicine-final-433-neurology-q037"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-neurobehcet"], "explanation": "Orogenital ulcer history together with diplopia and pyramidal weakness favors parenchymal neuro-Behçet disease, which often involves the brainstem or long tracts. A complete history, MRI and exclusion of infection are needed before confirming the diagnosis."},
    {"ids": ["batch-medicine-final-433-p5119-q38", "medicine-final-433-neurology-q038"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-absence"], "explanation": "Ethosuximide is a first-line treatment when typical absence seizures are the only seizure type. Valproate can be considered if generalized tonic-clonic seizures also occur. Phenytoin can worsen absence seizures."},
    {"ids": ["batch-medicine-final-433-p5125-q39", "medicine-final-433-neurology-q039"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-mca"], "explanation": "Sudden weakness with aphasia localizes to the dominant cerebral hemisphere, usually in the middle cerebral artery territory. This artery supplies much of the lateral motor cortex and the major cortical language areas."},
    {"ids": ["batch-medicine-final-433-p5135-q40", "medicine-final-433-neurology-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ms-criteria"], "explanation": "Separate neurologic episodes suggest a possible central demyelinating process. MRI of the brain, with spinal imaging when indicated, can show characteristic lesions and guide further evaluation. The history alone does not confirm multiple sclerosis."},
    {"ids": ["batch-medicine-final-433-p5142-q41", "medicine-final-433-neurology-q041"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-mg"], "explanation": "Ptosis with acetylcholine receptor autoantibodies is characteristic of myasthenia gravis in a compatible clinical setting. The antibodies impair signaling at the neuromuscular junction, causing fatigable weakness that can involve the eyelids."},
    {"ids": ["batch-medicine-final-433-p5149-q42", "medicine-final-433-hematology-oncology-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-treatment"], "explanation": "A 12-cm mediastinal mass is bulky disease. Chemotherapy followed by involved-site radiotherapy is a standard option for early-stage bulky classic Hodgkin lymphoma. Modern plans may adapt treatment to interim PET response and the expected long-term risks of radiation."},
    {"ids": ["batch-medicine-final-433-p5163-q44", "medicine-final-433-hematology-oncology-q044"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm433-factor13"], "explanation": "Factor XIII cross-links fibrin after the initial clot forms. PT and aPTT therefore may remain normal despite a clot-stabilization defect. The bleeding history makes factor XIII deficiency the best listed answer, and an activity assay is needed to confirm it."},
    {"ids": ["batch-medicine-final-433-p5171-q45", "medicine-final-433-hematology-oncology-q045"], "answers": [], "ungradedReason": "The listed treatments omit appropriate first-line therapy for pediatric immune thrombocytopenia with mucosal bleeding.", "confidence": "tentative", "references": ["cm433-peds-itp", "itp"], "explanation": "Severe isolated thrombocytopenia with mucosal bleeding favors immune thrombocytopenia. A short corticosteroid course is often used for non-life-threatening mucosal bleeding, and IVIG can be used when clinically appropriate. Fresh frozen plasma and vitamin K do not correct immune platelet destruction."},
    {"ids": ["batch-medicine-final-435-p3890-q1", "medicine-final-435-rheumatology-q001"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-cervical-ra"], "explanation": "Severe longstanding rheumatoid arthritis can cause clinically silent atlantoaxial instability, which matters during airway manipulation. Cervical evaluation with appropriate radiographs is the best listed preoperative investigation for this high-risk history. Abnormal symptoms or imaging can prompt further assessment."},
    {"ids": ["batch-medicine-final-435-p3897-q2", "medicine-final-435-rheumatology-q002"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-ro"], "explanation": "Maternal anti-Ro/SSA antibodies can cross the placenta and cause neonatal lupus with congenital heart block. A previously affected child increases recurrence risk. Anti-La/SSB frequently accompanies anti-Ro but is not among the options."},
    {"ids": ["batch-medicine-final-435-p3904-q3", "medicine-final-435-rheumatology-q003"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-src"], "explanation": "New hypertension in systemic sclerosis raises concern for scleroderma renal crisis, even before a markedly elevated reading. Check renal function and assess urgently. If renal crisis is suspected, start an ACE inhibitor promptly. Lisinopril is the listed ACE inhibitor. Glucocorticoids can increase renal-crisis risk."},
    {"ids": ["batch-medicine-final-435-p3911-q4", "medicine-final-435-rheumatology-q004"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-src"], "explanation": "Marked new hypertension, acute kidney dysfunction, anemia and pulmonary congestion in systemic sclerosis strongly suggest renal crisis. Start ACE inhibition promptly; captopril allows short-interval titration. Dialysis, volume control and respiratory support may also be necessary, but they do not replace ACE inhibition."},
    {"ids": ["batch-medicine-final-435-p3923-q5", "medicine-final-435-rheumatology-q005"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["oa", "cm435-knee"], "explanation": "Bony enlargement of DIP and PIP joints together with only five minutes of morning stiffness fits hand osteoarthritis. Heberden and Bouchard nodes correspond to these joints. RA usually spares the DIPs and tends to cause more prolonged stiffness."},
    {"ids": ["batch-medicine-final-435-p3930-q6", "medicine-final-435-rheumatology-q006"], "answers": ["B"], "ungradedReason": "The course key describes compartment-specific narrowing, but the earliest radiographic finding may be a marginal osteophyte. The original Word B choice also needs a restored split.", "confidence": "tentative", "references": ["cm435-knee"], "explanation": "Knee OA commonly causes asymmetric joint-space narrowing, often in the medial tibiofemoral compartment. Symmetric narrowing and periarticular erosions favor other conditions. Early marginal osteophytes may precede definite narrowing, so B is the best available listed pattern rather than a universal earliest finding."},
    {"ids": ["batch-medicine-final-435-p3936-q7", "medicine-final-435-rheumatology-q007"], "answers": ["A"], "ungradedReason": "Edema and longstanding RA suggest AA amyloidosis, but urine protein and confirmatory evaluation are missing.", "confidence": "tentative", "references": ["cm435-aa"], "explanation": "Years of inflammatory disease can drive serum amyloid A deposition in the kidneys. Renal AA amyloidosis commonly causes heavy proteinuria and edema. In this patient, check urinalysis and quantify urine protein before attributing edema to amyloidosis."},
    {"ids": ["batch-medicine-final-435-p3943-q8", "medicine-final-435-rheumatology-q008"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-sjogren"], "explanation": "Dry eyes and dental caries suggest Sjögren-related gland dysfunction. Pilocarpine can stimulate residual salivary function when xerostomia persists and the patient can tolerate it. Lubricants and dental preventive care remain important, while systemic immunosuppression is not routine for isolated sicca."},
    {"ids": ["batch-medicine-final-435-p3951-q9", "medicine-final-435-infectious-diseases-q009"], "answers": ["A"], "ungradedReason": "The question omits geographic treatment protocol details and other severe-malaria criteria; 4% is below the CDC standalone 5% threshold.", "confidence": "tentative", "references": ["severe-malaria", "cm435-hep-malaria"], "explanation": "Artesunate is the appropriate drug among these choices for severe falciparum malaria. Clinical organ dysfunction can establish severity even below 5% parasitemia; otherwise uncomplicated resistant falciparum infection usually needs an effective combination regimen rather than artesunate monotherapy. Route and regimen depend on severity and local protocol."},
    {"ids": ["batch-medicine-final-435-p3960-q10", "medicine-final-435-infectious-diseases-q010"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-hhv8"], "explanation": "In uncontrolled HIV, violaceous papules or plaques with possible lymphatic obstruction and scrotal edema suggest Kaposi sarcoma. Human herpesvirus 8 is the causal virus. Lesions may require biopsy to distinguish lookalikes and confirm the diagnosis."},
    {"ids": ["batch-medicine-final-435-p3968-q11", "medicine-final-435-infectious-diseases-q011"], "answers": ["A"], "ungradedReason": "The most frequently reported vascular-line pathogen varies by patient population, line type and surveillance definition.", "confidence": "tentative", "references": ["clabsi-old", "clabsi-new"], "explanation": "Coagulase-negative staphylococci are a classic cause of catheter-related bloodstream infection because skin flora adhere to catheter material and can form biofilm. S. aureus is also important and can predominate in some settings. A single positive culture may represent contamination, so culture patterns and the clinical context matter."},
    {"ids": ["batch-medicine-final-435-p3975-q12", "medicine-final-435-infectious-diseases-q012"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-tst"], "explanation": "A 15 mm tuberculin skin-test reaction meets the CDC positive threshold regardless of BCG vaccination. Assess symptoms and obtain chest radiography to evaluate for active TB before starting latent tuberculosis treatment. BCG does not justify ignoring the result."},
    {"ids": ["batch-medicine-final-435-p3983-q13", "medicine-final-435-infectious-diseases-q013"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-hav"], "explanation": "An acute gastrointestinal prodrome with right upper quadrant discomfort and possible jaundice or dark urine suggests acute viral hepatitis. Hepatitis A is the best listed fit for an acute enteric exposure pattern. Serum anti-HAV IgM is used to confirm recent infection."},
    {"ids": ["batch-medicine-final-435-p3991-q14", "medicine-final-435-infectious-diseases-q014"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-hsv-labor"], "explanation": "Acyclovir is the appropriate listed antiviral for genital herpes. Active lesions during labor support the cesarean already arranged. The antiviral route and timing depend on severity and the suspected timing of maternal acquisition, with IV treatment reserved for severe disease."},
    {"ids": ["batch-medicine-final-435-p3999-q15", "medicine-final-435-infectious-diseases-q015"], "answers": ["D"], "ungradedReason": "The source provides no confirming testing or severity and lists more than one accepted brucellosis combination.", "confidence": "tentative", "references": ["brucellosis", "cm435-brucella-regimen"], "explanation": "Raw camel milk exposure with epididymo-orchitis suggests focal brucellosis. Doxycycline plus streptomycin is an established combination, while doxycycline plus rifampin is another recognized regimen in some cases. Confirm the diagnosis and tailor agent choice and duration to focal disease and patient factors."},
    {"ids": ["batch-medicine-final-435-p4007-q16", "medicine-final-435-infectious-diseases-q016"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "Recent travel in Africa, confusion, anemia, thrombocytopenia and ring forms with 25% parasitemia strongly favor Plasmodium falciparum. The marked parasite burden and neurologic involvement make this a medical emergency. Immediate severe-malaria treatment is required."},
    {"ids": ["batch-medicine-final-435-p4022-q17", "medicine-final-435-infectious-diseases-q017"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["asb"], "explanation": "The patient is asymptomatic six months after kidney transplantation and no infection finding is supplied. Do not prescribe antibiotics empirically. Even if screening identified asymptomatic bacteriuria in an otherwise stable patient more than one month after transplant, routine antibiotic treatment is not recommended."},
    {"ids": ["batch-medicine-final-435-p4029-q18", "medicine-final-435-infectious-diseases-q018"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-labialis"], "explanation": "Acyclovir is active against herpes simplex virus and is the appropriate antiviral among the options for recurrent herpes labialis. Treatment works best when started early. Topical or oral treatment depends on severity, timing and recurrence frequency."},
    {"ids": ["batch-medicine-final-435-p4035-q19", "medicine-final-435-infectious-diseases-q019"], "answers": [], "ungradedReason": "The locations, lesion description and severity are insufficient to diagnose localized herpes zoster or distinguish acyclovir from famciclovir.", "confidence": "tentative", "references": ["cm435-zoster"], "explanation": "If this is unilateral dermatomal zoster, acyclovir and famciclovir are both recognized antivirals. The mention of mouth, ear and chest does not establish a single dermatome. Suspected eye or cranial nerve involvement, dissemination, or severe immunocompromise changes evaluation and treatment."},
    {"ids": ["batch-medicine-final-435-p4041-q20", "medicine-final-435-infectious-diseases-q020"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Give prompt empiric antibiotics when bacterial meningitis is suspected, ideally after obtaining blood cultures without delay. The supplied algorithm routes patients with drowsiness or focal signs to CT before lumbar puncture if indicated. Absence of papilledema alone does not make immediate LP safe in the presence of concerning neurologic signs."},
    {"ids": ["batch-medicine-final-435-p4060-q21", "medicine-final-435-infectious-diseases-q021"], "answers": ["B"], "ungradedReason": "Both malaria prophylaxis and effective insect bite precautions are appropriate travel advice, and mefloquine suitability is individual.", "confidence": "tentative", "references": ["ghana"], "explanation": "Travel to Ghana warrants malaria chemoprophylaxis plus bite prevention. Mefloquine is one listed preventive option if there are no relevant contraindications; atovaquone–proguanil and doxycycline may also be options. Repellent and a treated bed net remain necessary despite medication."},
    {"ids": ["batch-medicine-final-435-p4067-q22", "medicine-final-435-infectious-diseases-q022"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-zoster"], "explanation": "Localized pain preceding a unilateral vesicular rash in the same region is characteristic of reactivation of varicella-zoster virus. Primary varicella usually causes a generalized rash in different stages. Local prodromal pain and a dermatomal distribution are the key clues."},
    {"ids": ["batch-medicine-final-435-p4074-q23", "medicine-final-435-infectious-diseases-q023"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "For suspected bacterial meningitis in an alert patient without focal deficits or other contraindications, obtain CSF urgently if it can be done without treatment delay and start empiric antibiotics promptly. Routine CT is unnecessary in this described presentation. If LP is delayed, treat immediately after blood cultures when feasible."},
    {"ids": ["batch-medicine-final-435-p4080-q24", "medicine-final-435-infectious-diseases-q024"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-who"], "explanation": "Epstein–Barr virus is strongly associated with endemic Burkitt lymphoma. The association is less consistent in sporadic cases. The tumor is also characterized by a MYC rearrangement, which is distinct from demonstrating EBV."},
    {"ids": ["batch-medicine-final-435-p4090-q25", "medicine-final-435-infectious-diseases-q025"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-hiv-cd4"], "explanation": "HIV uses the CD4 receptor and a coreceptor to enter susceptible cells. Loss of CD4 helper T cells is central to progressive immunodeficiency. CD7, CD8 and CD20 do not define the principal cell target."},
    {"ids": ["batch-medicine-final-435-p4097-q37", "medicine-final-435-endocrinology-q037"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["neuropathy"], "explanation": "Axonal degeneration represents structural loss and can leave lasting diabetic neuropathic deficits. Normalizing glucose helps limit additional damage and may improve some early dysfunction, but established neuronal injury is not reliably reversed."},
    {"ids": ["batch-medicine-final-435-p4104-q38", "medicine-final-435-endocrinology-q038"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-endolab"], "explanation": "Phenothiazines can block dopamine D2 receptors. Dopamine normally restrains prolactin release, so blocking its effect increases prolactin. The other listed antihypertensives are not classic causes of drug-induced hyperprolactinemia."},
    {"ids": ["batch-medicine-final-435-p4110-q39", "medicine-final-435-endocrinology-q039"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-thyca"], "explanation": "Thyrotoxicosis accelerates bone turnover and can produce mild hypercalcemia, usually with suppressed PTH. Furosemide instead increases urinary calcium excretion, and the other listed conditions do not characterize this mechanism."},
    {"ids": ["batch-medicine-final-435-p4117-q40", "medicine-final-435-endocrinology-q040"], "answers": ["A"], "ungradedReason": "The key names melanocyte-stimulating hormone, while excess ACTH and related melanocortin signaling are central. The options overlap mechanistically.", "confidence": "tentative", "references": ["adrenal"], "explanation": "Loss of cortisol feedback raises pituitary POMC production and ACTH. Excess ACTH can activate melanocortin receptors on melanocytes, producing hyperpigmentation. Related melanocortin peptides participate in the same pathway, which explains the wording of the Gift key."},
    {"ids": ["batch-medicine-final-435-p4124-q41", "medicine-final-435-endocrinology-q041"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-post-thyroid"], "explanation": "High TSH with low free T4 indicates overt primary hypothyroidism and explains bradycardia and weight gain. Levothyroxine replaces thyroid hormone. Radioiodine and antithyroid drugs treat excess thyroid function."},
    {"ids": ["batch-medicine-final-435-p4137-q43", "medicine-final-435-endocrinology-q043"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["pituitary"], "explanation": "Severe postpartum hemorrhage and hypotension can infarct the enlarged pituitary, causing Sheehan syndrome. Resulting gonadotropin failure explains persistent amenorrhea. Evaluate other pituitary axes, particularly adrenal function, and ask about failure to lactate."},
    {"ids": ["batch-medicine-final-435-p4144-q44", "medicine-final-435-endocrinology-q044"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-catechol"], "explanation": "Tyrosine is the original catecholamine precursor. It is converted to L-DOPA, then dopamine, then norepinephrine by dopamine beta-hydroxylase. Epinephrine is made downstream from norepinephrine."},
    {"ids": ["batch-medicine-final-435-p4150-q45", "medicine-final-435-endocrinology-q045"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Exposure to prescribed glucocorticoids is the most common cause of Cushing syndrome overall. An ACTH-secreting pituitary adenoma is the most common endogenous cause when exogenous exposure has been excluded."},
    {"ids": ["batch-medicine-final-435-p4156-q46", "medicine-final-435-endocrinology-q046"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactin-2023"], "explanation": "Marked hyperprolactinemia, amenorrhea and galactorrhea with a pituitary lesion support a prolactinoma. A dopamine agonist, usually cabergoline, is the standard first treatment in most cases because it lowers prolactin and shrinks the lesion. Surgery may be considered when medication fails or by informed patient preference in selected cases."},
    {"ids": ["batch-medicine-final-435-p4168-q47", "medicine-final-435-endocrinology-q047"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "High IGF-1 and failure of GH suppression after oral glucose support acromegaly. Transsphenoidal surgery is generally first-line for an operable pituitary macroadenoma, particularly with visual field compromise from mass effect. Medical therapy can follow if disease persists."},
    {"ids": ["batch-medicine-final-435-p4175-q48", "medicine-final-435-neurology-q048"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["gbs"], "explanation": "Ascending symmetric weakness with diminished reflexes and sensory loss after infection suggests Guillain–Barré syndrome. The pattern localizes to multiple peripheral nerves and roots. Pure anterior horn cell disease or a neuromuscular-junction disorder does not explain sensory loss."},
    {"ids": ["batch-medicine-final-435-p4182-q49", "medicine-final-435-neurology-q049"], "answers": ["C"], "ungradedReason": "Gift keys contrast CT, which can detect empyema, but diffusion-weighted MRI with ADC is more informative for distinguishing purulent fluid when available.", "confidence": "tentative", "references": ["cm435-empyema"], "explanation": "Suspected intracranial empyema is usually evaluated with contrast-enhanced MRI including diffusion and ADC sequences. Purulent material often restricts diffusion with low ADC. Contrast CT can detect a collection and may be used rapidly if MRI is unavailable, but a less impressive CT does not exclude empyema."},
    {"ids": ["batch-medicine-final-435-p4189-q50", "medicine-final-435-neurology-q050"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-listeria", "meningitis"], "explanation": "Gram-positive bacilli in blood and CSF in a pregnant patient with encephalopathy and fever suggest Listeria monocytogenes meningitis. Ampicillin is the appropriate listed drug. Third-generation cephalosporins do not reliably treat Listeria."},
    {"ids": ["batch-medicine-final-435-p4202-q51", "medicine-final-435-neurology-q051"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-l5"], "explanation": "Weak dorsiflexion and eversion could reflect peroneal dysfunction, but weak inversion and hip abduction involve muscles outside the peroneal nerve. Together with lower back pain, this supports an L5 radiculopathy affecting several peripheral nerve territories."},
    {"ids": ["batch-medicine-final-435-p4209-q52", "medicine-final-435-neurology-q052"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["stroke", "aphasia"], "explanation": "Aphasia indicates dominant hemispheric involvement, usually on the left. Contralateral right-sided weakness points to the same side. A left middle cerebral artery stroke best explains this language and motor pattern."},
    {"ids": ["batch-medicine-final-435-p4217-q53", "medicine-final-435-neurology-q053"], "answers": [], "ungradedReason": "The pedigree has no symbol legend and appears to include a father and son with the same marking. It cannot establish a unique inheritance pattern.", "confidence": "tentative", "references": ["cm435-dystrophin"], "explanation": "Years of progressive proximal weakness fit Becker muscular dystrophy or a limb-girdle muscular dystrophy. Becker is X-linked and cannot be transmitted directly from father to son. If the X marks in this pedigree denote affected status rather than death, a male-to-male pair argues for an alternative diagnosis."},
    {"ids": ["batch-medicine-final-435-p4225-q54", "medicine-final-435-neurology-q054"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-ibm"], "explanation": "Of the choices, inclusion body myositis is the best fit for slowly progressive asymmetric weakness with distal involvement. Finger flexors and quadriceps are characteristic sites. Age and the detailed distribution would help establish the diagnosis, which often requires muscle evaluation and biopsy."},
    {"ids": ["batch-medicine-final-435-p4232-q55", "medicine-final-435-neurology-q055"], "answers": [], "ungradedReason": "The CSF and cranial nerve finding do not select a unique empiric regimen. A negative smear or TB PCR alone cannot exclude TB meningitis.", "confidence": "tentative", "references": ["cm435-tbm", "meningitis"], "explanation": "A sixth-nerve palsy with lymphocytic CSF raises concern for basilar meningitis, including TB. Normal glucose and protein are less typical of established TB meningitis, and viral or other causes are possible. Clinical tempo, imaging, targeted microbiology and exposure risk guide empiric therapy and urgent specialist assessment."},
    {"ids": ["batch-medicine-final-435-p4241-q56", "medicine-final-435-neurology-q056"], "answers": [], "ungradedReason": "The original Word records only the presentation and vital signs, without a question prompt, options or Gift key.", "confidence": "tentative", "references": ["cm435-tbm", "meningitis"], "explanation": "Weeks of headache with fever and diplopia warrant evaluation for a subacute meningitis or other intracranial process. The source table documents a temperature of 38.1°C and otherwise stable recorded vital signs. The history alone cannot identify the cause, and the original does not state what the student must answer."},
    {"ids": ["batch-medicine-final-435-p4243-q57", "medicine-final-435-neurology-q057"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "Symptomatic intracranial hemorrhage is a major risk of IV thrombolysis for ischemic stroke. Eligibility assessment, brain imaging and blood pressure management reduce avoidable harm. A device-related vascular dissection is a procedural complication of thrombectomy rather than the main thrombolytic risk."},
    {"ids": ["batch-medicine-final-435-p4249-q58", "medicine-final-435-neurology-q058"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["stroke"], "explanation": "Acute speech disturbance and lateralized weakness after recent trauma require urgent stroke evaluation despite a migraine history. Head and neck vascular imaging can detect arterial dissection or large-vessel occlusion. Activate the stroke pathway and obtain urgent noncontrast CT with vascular imaging as appropriate."},
    {"ids": ["batch-medicine-final-435-p4256-q59", "medicine-final-435-neurology-q059"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["aphasia"], "explanation": "Broca aphasia classically relates to the posterior inferior frontal gyrus in the dominant hemisphere. Speech production is nonfluent and effortful, with relatively better comprehension. The superior temporal region is more closely associated with fluent aphasia."},
    {"ids": ["batch-medicine-final-435-p4263-q60", "medicine-final-435-hematology-oncology-q060"], "answers": ["C"], "ungradedReason": "BCR::ABL1 can also occur in acute lymphoblastic leukemia. CML is the classic defining association, but the question’s wording permits both.", "confidence": "tentative", "references": ["cm435-cml", "all"], "explanation": "The BCR::ABL1 fusion, usually created by the Philadelphia chromosome translocation, defines chronic myeloid leukemia. It also occurs in a subset of B-cell acute lymphoblastic leukemia. The exam likely seeks CML, but it is not the only leukemia associated with this fusion."},
    {"ids": ["batch-medicine-final-435-p4271-q61", "medicine-final-435-hematology-oncology-q061"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["warfarin"], "explanation": "Warfarin inhibits vitamin K epoxide reductase, reducing the activated forms of factors II, VII, IX and X and proteins C and S. The choice describes inhibition of vitamin K–dependent clotting factor synthesis. It does not directly inhibit thrombin."},
    {"ids": ["batch-medicine-final-435-p4278-q62", "medicine-final-435-hematology-oncology-q062"], "answers": [], "ungradedReason": "No listed feature establishes a strong individual colorectal cancer risk factor. The original also prints D twice.", "confidence": "tentative", "references": ["crc-risk", "constipation-cohort", "cm435-crc-screen"], "explanation": "Inflammatory bowel disease, family history, hereditary syndromes and increasing age are established colorectal cancer risk factors. IBS and ordinary constipation are not equivalent to inflammatory colitis and have not established a causal risk in this situation. The stem does not make age 40 or intestinal TB a clear high-risk determinant."},
    {"ids": ["batch-medicine-final-435-p4285-q63", "medicine-final-435-hematology-oncology-q063"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-crc-screen"], "explanation": "The patient has a first-degree relative diagnosed with colorectal cancer before age 60. Colonoscopy is the preferred listed test. Screening begins at age 40 or ten years before the relative’s diagnosis, whichever is earlier. At 55 he is already due."},
    {"ids": ["batch-medicine-final-435-p4292-q64", "medicine-final-435-hematology-oncology-q064"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-who"], "explanation": "EBV is strongly associated with endemic Burkitt lymphoma and appears in a variable proportion of sporadic or immunodeficiency-associated cases. An EBV association does not replace the typical morphology and MYC testing used to establish the diagnosis."},
    {"ids": ["batch-medicine-final-435-p4299-q65", "medicine-final-435-hematology-oncology-q065"], "answers": ["A"], "ungradedReason": "Ferritin and RDW alone do not establish thalassemia, and inflammation can raise ferritin despite iron deficiency.", "confidence": "tentative", "references": ["microcytosis"], "explanation": "Marked microcytosis with a normal ferritin in a young adult makes thalassemia trait a reasonable leading possibility. Review the RBC count and full iron studies and consider hemoglobin analysis. An increased RDW is nonspecific, so the result is a suspicion rather than a confirmed diagnosis."},
    {"ids": ["batch-medicine-final-435-p4306-q66", "medicine-final-435-hematology-oncology-q066"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-desmoid"], "explanation": "A locally aggressive tumor infiltrates surrounding tissue and can recur locally without distant metastasis. Desmoid-type fibromatosis is a standard example. Its local behavior can still cause major disease despite lack of metastatic spread."},
    {"ids": ["batch-medicine-final-435-p4312-q67", "medicine-final-435-hematology-oncology-q067"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-breast-preg"], "explanation": "New unilateral nipple retraction during pregnancy deserves prompt diagnostic evaluation. Targeted breast ultrasound is the appropriate listed first step. Add diagnostic mammography or biopsy when indicated by imaging or continuing clinical concern; pregnancy alone does not justify delayed workup."},
    {"ids": ["batch-medicine-final-435-p4319-q68", "medicine-final-435-hematology-oncology-q068"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-diagnostic-breast"], "explanation": "A persistent patient-reported focal lump warrants targeted assessment even if the clinician does not feel a mass. At age 30, targeted ultrasound and diagnostic mammography can both be appropriate, depending on the setting and clinical findings. A one-year delay without correlation is inappropriate."},
    {"ids": ["batch-medicine-final-435-p4326-q69", "medicine-final-435-hematology-oncology-q069"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-leuk-support"], "explanation": "Septic shock can trigger disseminated intravascular coagulation. Consumption of platelets and clotting factors produces thrombocytopenia and prolonged clotting times. Check fibrinogen, D-dimer and trends in conjunction with the underlying illness; isolated platelet disorders usually do not prolong both PT and aPTT."},
    {"ids": ["batch-medicine-final-435-p4333-q70", "medicine-final-435-hematology-oncology-q070"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-cml"], "explanation": "Splenomegaly, very high leukocyte count, relatively preserved platelet count and a BCR::ABL1 fusion are a classic pattern of chronic myeloid leukemia. Differential count, marrow assessment and molecular characterization establish disease phase and guide therapy."},
    {"ids": ["batch-medicine-final-435-p4340-q71", "medicine-final-435-hematology-oncology-q071"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["lymphoma-dx"], "explanation": "FDG-PET is the appropriate test among the listed options to assess metabolic activity in a residual Hodgkin lymphoma mass. Residual tissue may be fibrosis even when still visible on CT. PET findings are interpreted by standardized criteria and sometimes require biopsy or follow-up."},
    {"ids": ["batch-medicine-final-435-p4346-q72", "medicine-final-435-hematology-oncology-q072"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-vwf"], "explanation": "Von Willebrand factor promotes platelet adhesion by bridging exposed subendothelial collagen to platelet glycoprotein Ib. It also carries and stabilizes factor VIII. Platelet adhesion is the main primary-hemostasis function tested here."},
    {"ids": ["batch-medicine-final-435-p4353-q73", "medicine-final-435-hematology-oncology-q073"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-angio"], "explanation": "Many malignant tumors induce angiogenesis by releasing signals that recruit nearby host endothelial cells. This creates blood supply that supports tumor growth. The tumor does not necessarily turn its own cells into blood vessels; the option uses a shorthand for inducing new vessels."},
    {"ids": ["batch-medicine-final-435-p4360-q74", "medicine-final-435-hematology-oncology-q074"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-hpv"], "explanation": "Persistent infection with high-risk human papillomavirus, particularly types such as 16 and 18, causes most cervical cancers. HIV increases the risk that HPV infection persists but is not itself the main causal virus in this question."},
    {"ids": ["batch-medicine-final-435-p4368-q75", "medicine-final-435-hematology-oncology-q075"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["itp"], "explanation": "With platelets around 3,000/µL and mucosal bleeding from known ITP, corticosteroids plus IVIG can raise platelets rapidly. Major or life-threatening bleeding can additionally require platelet transfusion and other urgent measures. Platelet transfusion alone has a short-lived effect in ITP."},
    {"ids": ["batch-medicine-final-435-p4376-q76", "medicine-final-435-hematology-oncology-q076"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-tumor-markers"], "explanation": "CEA is commonly used to follow colorectal cancer, and CA 19-9 can be used in selected pancreatic or biliary cancers. These markers support monitoring in appropriate settings but are not reliable standalone screening tests or proof of malignancy."},
    {"ids": ["batch-medicine-final-435-p4384-q77", "medicine-final-435-hematology-oncology-q077"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm435-hemophilia"], "explanation": "Hemophilia A is usually an X-linked disorder caused by pathogenic variants in F8 and deficient factor VIII activity. Hemophilia B is factor IX deficiency. An acquired inhibitor, when present, is a different mechanism from inherited factor deficiency."},
    {"ids": ["batch-medicine-final-435-p4394-q78", "medicine-final-435-hematology-oncology-q078"], "answers": ["B"], "ungradedReason": "Gift keys immediate chemotherapy, but active bleeding and possible infection require stabilization before an unspecified induction regimen.", "confidence": "tentative", "references": ["apl", "cm435-leuk-support"], "explanation": "Circulating blasts suggest acute leukemia, but fever and mucosal bleeding with platelets of 6,000/µL demand immediate supportive care and urgent hematology assessment. Promptly treat suspected serious infection and provide platelet support as indicated. If acute promyelocytic leukemia is suspected, begin disease-specific emergency treatment while confirming it."},
    {"ids": ["batch-medicine-final-435-p4402-q79", "medicine-final-435-hematology-oncology-q079"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["aml", "aplastic"], "explanation": "Epistaxis with both thrombocytopenia and leukopenia suggests a marrow or systemic process rather than isolated ITP. Review a peripheral blood smear promptly to assess platelets, abnormal leukocytes or blasts. Manage active bleeding and determine whether marrow evaluation is needed."},
    {"ids": ["batch-medicine-final-436-p3558-q1", "medicine-final-436-rheumatology-q001"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["sle"], "explanation": "SLE susceptibility reflects several genes together with environmental and immune factors. A family history increases risk but does not make SLE a Mendelian disorder or determine that a child will develop it."},
    {"ids": ["batch-medicine-final-436-p3565-q2", "medicine-final-436-rheumatology-q002"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ssc", "ssc-ild"], "explanation": "Anti–topoisomerase I, also called anti-Scl-70, is associated with systemic sclerosis–related interstitial lung disease. Anticentromere antibodies are more typical of limited cutaneous disease and indicate a different risk profile. Pulmonary symptoms still need objective testing."},
    {"ids": ["batch-medicine-final-436-p3572-q3", "medicine-final-436-rheumatology-q003"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-ibp"], "explanation": "Pain that improves with exercise points to inflammatory back pain. The pattern also commonly includes no improvement with rest and night pain that eases on getting up. Radiation or numbness alone suggests a neurologic component."},
    {"ids": ["batch-medicine-final-436-p3579-q4", "medicine-final-436-rheumatology-q004"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["axspa", "cm438-uveitis"], "explanation": "Acute anterior uveitis is the characteristic extra-musculoskeletal manifestation of ankylosing spondylitis. Enthesitis is a manifestation at tendon or ligament insertions, rather than an extra-musculoskeletal organ finding."},
    {"ids": ["batch-medicine-final-436-p3586-q5", "medicine-final-436-rheumatology-q005"], "answers": [], "ungradedReason": "The question says “exclude” even though the keyed low count is compatible with osteoarthritis, and no WBC count by itself establishes or excludes it.", "confidence": "tentative", "references": ["oa", "septic-joint"], "explanation": "Osteoarthritis commonly has noninflammatory synovial fluid with a low leukocyte count. A higher count should prompt consideration of crystal disease, inflammatory arthritis or infection. A count above 50,000 supports concern for septic arthritis but a lower count cannot rule it out."},
    {"ids": ["batch-medicine-final-436-p3594-q6", "medicine-final-436-rheumatology-q006"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ra-class", "sle"], "explanation": "Marginal erosions support rheumatoid arthritis. Typical lupus arthritis may also be symmetric and stiff but is usually nonerosive, with erosive overlap possible. That makes erosions the most useful discriminator among these choices."},
    {"ids": ["batch-medicine-final-436-p3601-q7", "medicine-final-436-rheumatology-q007"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["phpt"], "explanation": "Sustained excess PTH increases bone resorption and can weaken bone, causing fragility or pathological fractures. In practice, a low-energy hip-region fracture also requires evaluation for common causes such as osteoporosis."},
    {"ids": ["batch-medicine-final-436-p3609-q8", "medicine-final-436-infectious-diseases-q008"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-airborne"], "explanation": "Cough, hemoptysis and an apical cavity raise concern for infectious pulmonary TB. Use airborne precautions in an airborne infection isolation room with negative pressure. Droplet precautions alone do not provide the required protection."},
    {"ids": ["batch-medicine-final-436-p3616-q9", "medicine-final-436-infectious-diseases-q009"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-prophylax"], "explanation": "Perioperative IV prophylaxis, when indicated, is timed to achieve effective tissue levels at incision, usually within the preceding 60 minutes. The case supports the timing of B. Choice of gentamicin or another agent depends on operation and local protocol."},
    {"ids": ["batch-medicine-final-436-p3623-q10", "medicine-final-439-infectious-diseases-q019"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["brucellosis"], "explanation": "Farm exposure with fever and back pain can suggest brucellosis, including possible spinal involvement, particularly after unpasteurized dairy or animal exposure. Streptomycin plus doxycycline is the only plausible anti-Brucella combination listed. Confirm the diagnosis and site before deciding on regimen and duration."},
    {"ids": ["batch-medicine-final-436-p3633-q11", "medicine-final-436-infectious-diseases-q011"], "answers": [], "ungradedReason": "The stem gives no destination, examination, CD4 count, exposures or localizing symptoms.", "confidence": "tentative", "references": ["malaria", "r-pcp", "tb"], "explanation": "Two days of fever in a traveler with HIV cannot distinguish TB, typical pneumonia or an opportunistic cause on its own. A compatible travel history also warrants prompt evaluation for malaria, which is omitted from the options."},
    {"ids": ["batch-medicine-final-436-p3647-q13", "medicine-final-436-infectious-diseases-q013"], "answers": [], "ungradedReason": "The reported CD4 count and nonspecific perihilar findings leave multiple possibilities.", "confidence": "tentative", "references": ["r-pcp"], "explanation": "Pneumocystis can cause diffuse or perihilar opacities with fever and dyspnea, but is substantially less likely with CD4 450 unless there are other risk factors. The symptoms and film do not distinguish it from the broader pneumonia option."},
    {"ids": ["batch-medicine-final-436-p3654-q14", "medicine-final-436-infectious-diseases-q014"], "answers": [], "ungradedReason": "Acute treatment and liver-stage eradication differ. The original target of therapy is unclear and the patient is pregnant.", "confidence": "tentative", "references": ["r-malpreg"], "explanation": "Chloroquine treats the acute blood-stage infection from chloroquine-sensitive P. ovale. Primaquine eradicates dormant liver forms but is contraindicated during pregnancy. The unusual word “hypnotic” in the recall leaves the intended target unclear; if it meant hypnozoites, none of the choices is suitable during pregnancy."},
    {"ids": ["batch-medicine-final-436-p3662-q15", "medicine-final-436-endocrinology-q015"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Persistent hypotension with hyperpigmentation supports primary adrenal insufficiency. Adrenal cortical failure can reduce both cortisol and aldosterone. Increased ACTH explains pigmentation, and mineralocorticoid deficiency contributes to volume depletion."},
    {"ids": ["batch-medicine-final-436-p3673-q16", "medicine-final-436-endocrinology-q016"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-ghrelin"], "explanation": "Ghrelin rises before meals and stimulates appetite. Leptin instead signals longer-term energy stores and generally reduces food intake through hypothalamic pathways."},
    {"ids": ["batch-medicine-final-436-p3680-q17", "medicine-final-436-endocrinology-q017"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-acromegaly"], "explanation": "Excess GH and IGF-1 can enlarge soft tissues around the carpal tunnel, compressing the median nerve. Carpal tunnel symptoms are a recognized manifestation alongside acral growth and coarse facial features."},
    {"ids": ["batch-medicine-final-436-p3687-q18", "medicine-final-436-endocrinology-q018"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-thyrotox"], "explanation": "High T4 with suppressed TSH already establishes biochemical thyrotoxicosis. TSH-receptor antibodies help confirm Graves disease as its cause when the cause is what needs confirmation."},
    {"ids": ["batch-medicine-final-436-p3694-q19", "medicine-final-436-endocrinology-q019"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma", "pituitary"], "explanation": "Low libido, infertility and erectile dysfunction can reflect hypogonadism caused by elevated prolactin. Check prolactin as part of the hormonal evaluation rather than proceeding directly to surgery. Testosterone and gonadotropins help determine the level of dysfunction."},
    {"ids": ["batch-medicine-final-436-p3710-q21", "medicine-final-436-endocrinology-q021"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-thyrotox"], "explanation": "Biochemical thyrotoxicosis together with true exophthalmos and other characteristic eye signs strongly supports Graves disease. TSH-receptor antibodies can clarify uncertain cases, and pregnancy or treatment planning may create separate reasons for testing."},
    {"ids": ["batch-medicine-final-436-p3717-q22", "medicine-final-436-endocrinology-q022"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Easy bruising is a discriminating clue to cortisol excess when combined with central obesity, hypertension, diabetes and menstrual disturbance. Metabolic syndrome shares several features but does not explain the bruising as readily."},
    {"ids": ["batch-medicine-final-436-p3724-q23", "medicine-final-439-endocrinology-q034"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-neurop"], "explanation": "Adults with type 1 diabetes should have an initial dilated eye examination within five years of onset. In type 2 diabetes, screen at diagnosis because hyperglycemia may already have been present for years."},
    {"ids": ["batch-medicine-final-436-p3731-q24", "medicine-final-436-endocrinology-q024"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds"], "explanation": "Hypoglycemia occurs when available insulin exceeds the body's glucose supply or needs. That is the main acute safety issue, especially with missed meals, exercise or dosing errors."},
    {"ids": ["batch-medicine-final-436-p3738-q25", "medicine-final-436-endocrinology-q025"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes", "dka"], "explanation": "Polyuria and polydipsia followed by deep rapid breathing and altered consciousness suggest diabetic ketoacidosis. This favors severe insulin deficiency and type 1 diabetes in a young adult, though ketoacidosis can occur in other diabetes types. Glucose, ketones and acid–base testing confirm the acute syndrome."},
    {"ids": ["batch-medicine-final-436-p3755-q27", "medicine-final-436-endocrinology-q027"], "answers": [], "ungradedReason": "The generic wording does not define a population in which one chronic complication can be ranked first.", "confidence": "tentative", "references": ["r-neurop", "diabetes-ckd"], "explanation": "Retinopathy, neuropathy and kidney disease are all major chronic diabetic complications. Their observed frequency varies with duration, diabetes type and how each is measured. Use the individual's findings or a defined population for a defensible comparison."},
    {"ids": ["batch-medicine-final-436-p3762-q28", "medicine-final-437-endocrinology-q029"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes results from loss of insulin-producing beta cells, usually through autoimmunity. Insulin resistance can coexist but is the central mechanism of type 2 diabetes rather than the primary lesion asked for here."},
    {"ids": ["batch-medicine-final-436-p3770-q29", "medicine-final-436-neurology-q029"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-brown"], "explanation": "A right-sided cord hemisection interrupts crossed pain and temperature fibers from the left side below the lesion. Damage to the right corticospinal tract and dorsal columns instead causes ipsilateral motor and proprioceptive deficits. The exact upper-limb sensory level depends on the injury level."},
    {"ids": ["batch-medicine-final-436-p3777-q30", "medicine-final-436-neurology-q030"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-absence"], "explanation": "Brief stereotyped staring spells with abrupt recovery can represent absence seizures. Ethosuximide is first-line for isolated absence seizures. Witness history and EEG are important here because staring alone can also represent focal seizures or nonepileptic events."},
    {"ids": ["batch-medicine-final-436-p3789-q31", "medicine-final-436-neurology-q031"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-temporal"], "explanation": "A rising epigastric sensation and déjà vu are classic mesial temporal seizure symptoms. They favor a temporal-lobe onset over an occipital onset with primary visual symptoms."},
    {"ids": ["batch-medicine-final-436-p3796-q32", "medicine-final-436-neurology-q032"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["ilae", "r-temporal"], "explanation": "Stereotyped unilateral dystonic activity with impaired awareness and postictal drowsiness favors a focal seizure with impaired consciousness. The source uses the older term “complex focal.” The drowsiness and focal motor sign are atypical for a brief absence seizure."},
    {"ids": ["batch-medicine-final-436-p3803-q33", "medicine-final-436-neurology-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-lewy"], "explanation": "Visual hallucinations, REM sleep behavior disorder and spontaneous parkinsonism suggest Lewy body disease. Dopamine-blocking antipsychotics can provoke marked sensitivity. Cholinesterase inhibitors may help cognitive or neuropsychiatric symptoms when appropriate."},
    {"ids": ["batch-medicine-final-436-p3810-q34", "medicine-final-436-neurology-q034"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis", "r-encephalitis"], "explanation": "Fever, seizure and meningism raise concern for CNS infection. Obtain CSF by lumbar puncture once safe, even with a normal CT, and avoid delaying empiric treatment when meningitis or encephalitis is suspected."},
    {"ids": ["batch-medicine-final-436-p3817-q35", "medicine-final-436-neurology-q035"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-sah"], "explanation": "When suspicion of subarachnoid hemorrhage remains after a negative CT, lumbar puncture can detect blood breakdown products, particularly with delayed presentation or a new neurologic deficit. A high-quality early CT in a carefully selected patient may be sufficient under some protocols."},
    {"ids": ["batch-medicine-final-436-p3826-q36", "medicine-final-436-neurology-q036"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-temporal"], "explanation": "Epigastric aura and oral automatisms strongly suggest temporal-lobe onset. Unilateral dystonia can help lateralize seizure onset to the opposite side but does not by itself identify the affected lobe."},
    {"ids": ["batch-medicine-final-436-p3833-q37", "medicine-final-436-neurology-q037"], "answers": [], "ungradedReason": "The MRI summary does not provide enough lesion detail to apply diagnostic criteria.", "confidence": "tentative", "references": ["r-ms2024"], "explanation": "A first typical optic neuritis episode without enough supporting criteria is a clinically isolated syndrome. Some patients can meet current multiple sclerosis criteria at their first presentation if MRI distribution or other biomarkers are sufficient. “Multiple lesions” alone does not establish that."},
    {"ids": ["batch-medicine-final-436-p3841-q38", "medicine-final-436-hematology-oncology-q038"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["aml"], "explanation": "Anemia, thrombocytopenia and concerning peripheral blood findings call for marrow evaluation to assess leukemia or another marrow disorder. The source supplies only one meaningful option and does not establish the specific marrow diagnosis."},
    {"ids": ["batch-medicine-final-436-p3848-q39", "medicine-final-436-hematology-oncology-q039"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-mds"], "explanation": "Macrocytosis and multilineage cytopenias in an older adult with relatively cellular marrow suggest a myelodysplastic neoplasm. Confirm dysplasia or defining genetics and exclude mimics, including vitamin B12 deficiency. Aplastic anemia usually has markedly hypocellular marrow."},
    {"ids": ["batch-medicine-final-436-p3862-q41", "medicine-final-436-hematology-oncology-q041"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-screen"], "explanation": "An average-risk 52-year-old is eligible for screening mammography. The question's interval is internally inconsistent; the USPSTF recommends every two years from ages 40 to 74. A clinical visit or self-examination alone is not an equivalent screening option."},
    {"ids": ["batch-medicine-final-436-p3869-q42", "medicine-final-436-hematology-oncology-q042"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-ebv"], "explanation": "Cervical lymphadenopathy and elevated aminotransferases during a febrile mononucleosis-like illness support EBV among these options. CMV can also cause a similar syndrome, so EBV serology is useful if the clinical diagnosis is uncertain."},
    {"ids": ["batch-medicine-final-437-p3098-q1", "medicine-final-437-rheumatology-q001"], "answers": [], "ungradedReason": "“Most common” depends on whether the question means axial spondyloarthritis manifestations generally or manifestations of psoriatic arthritis specifically.", "confidence": "tentative", "references": ["axspa-treatment", "cm437-psa"], "explanation": "Uveitis is a common extra-musculoskeletal manifestation of axial spondyloarthritis. Nail psoriasis is also characteristic when the disease is psoriatic arthritis, and Achilles enthesitis is musculoskeletal. This history supports overlapping categories, and the question does not name the population needed for a single frequency ranking."},
    {"ids": ["batch-medicine-final-437-p3105-q2", "medicine-final-437-rheumatology-q002"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["axspa", "asas"], "explanation": "Inflammatory back pain plus psoriasis and peripheral synovitis suggests axial spondyloarthritis. Radiographs can be normal early because active sacroiliac inflammation can precede structural damage. Obtain MRI of the sacroiliac joints with an inflammatory back pain protocol."},
    {"ids": ["batch-medicine-final-437-p3112-q3", "medicine-final-437-rheumatology-q003"], "answers": ["B"], "ungradedReason": "The source calls colchicine prophylaxis, though the immediate need is flare treatment and urate lowering need not always wait.", "confidence": "tentative", "references": ["gout"], "explanation": "Acute first metatarsophalangeal pain and prior episodes suggest a gout flare. With renal impairment and poorly controlled hypertension, avoid a routine full-dose NSAID regimen. Consider an appropriate colchicine or glucocorticoid regimen based on kidney function and interactions, and establish long-term urate lowering with flare prophylaxis when indicated."},
    {"ids": ["batch-medicine-final-437-p3119-q4", "medicine-final-437-rheumatology-q004"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-myopathy-lung"], "explanation": "Restriction with preserved DLCO points toward extrapulmonary restriction from weak respiratory muscles in this patient with inflammatory myopathy. Interstitial lung disease usually reduces diffusion as well. The case does not localize the weakness specifically to the diaphragm. Respiratory muscle testing can help quantify it."},
    {"ids": ["batch-medicine-final-437-p3125-q5", "medicine-final-437-rheumatology-q005"], "answers": ["A"], "ungradedReason": "The underlying pattern is compatible with RA, but the specific mechanism of numbness and its distribution are missing.", "confidence": "tentative", "references": ["ra-class", "carpal"], "explanation": "Prolonged morning stiffness and difficulty gripping suggest inflammatory arthritis such as RA. Synovitis around the wrist can compress the median nerve and cause numbness. The vignette omits the sensory distribution and physical findings needed to confirm carpal tunnel or another neuropathy."},
    {"ids": ["batch-medicine-final-437-p3132-q6", "medicine-final-437-rheumatology-q006"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ra-class"], "explanation": "Typical RA favors the wrists, metacarpophalangeal joints, proximal interphalangeal joints and metatarsophalangeal joints. The distal interphalangeal joints are usually spared. Predominant DIP disease suggests a different pattern, such as osteoarthritis or psoriatic arthritis."},
    {"ids": ["batch-medicine-final-437-p3140-q7", "medicine-final-437-infectious-diseases-q007"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-dengue", "dengue"], "explanation": "Acute fever, headache, severe musculoskeletal pain and rash with leukopenia and thrombocytopenia favor dengue after travel in a plausible exposure setting. During the first week, use nucleic acid or NS1 testing together with IgM as appropriate to the illness day."},
    {"ids": ["batch-medicine-final-437-p3147-q8", "medicine-final-437-infectious-diseases-q008"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "Recent East African exposure, confusion and very high parasitemia with circulating ring forms favor falciparum malaria. The confusion and parasite burden indicate severe disease requiring emergency treatment. Microscopy should characterize the species, but urgent treatment should not wait for a definitive specification in a severely ill patient."},
    {"ids": ["batch-medicine-final-437-p3158-q9", "medicine-final-437-infectious-diseases-q009"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-hiv"], "explanation": "Bloodborne exposure can transmit HIV, so B is the listed route. Sexual exposure and transmission during pregnancy, delivery or breastfeeding are also possible. HIV is not spread through ordinary respiratory droplets or the airborne route."},
    {"ids": ["batch-medicine-final-437-p3165-q10", "medicine-final-437-infectious-diseases-q010"], "answers": ["A"], "ungradedReason": "Mild cold sores can be treated topically, but the stem gives no severity or recurrence information to exclude oral antiviral therapy.", "confidence": "tentative", "references": ["cm437-labialis"], "explanation": "The intended condition is herpes labialis. Topical acyclovir cream gives modest benefit when used early for uncomplicated recurrent cold sores. Oral antiviral therapy is also an option for selected early, severe or recurrent episodes. Routine IV acyclovir and steroid monotherapy are inappropriate here."},
    {"ids": ["batch-medicine-final-437-p3172-q11", "medicine-final-437-infectious-diseases-q011"], "answers": ["B"], "ungradedReason": "The primary response test, HIV RNA viral load, is absent. CD4 is the best available immune-response marker.", "confidence": "tentative", "references": ["cm437-vl"], "explanation": "Plasma HIV RNA is the main test used to judge virologic response to antiretroviral therapy. CD4 count measures immune recovery and helps guide opportunistic-infection prevention. A rise in CD4 is the best listed choice, but it is not a substitute for documenting viral suppression."},
    {"ids": ["batch-medicine-final-437-p3179-q12", "medicine-final-437-infectious-diseases-q012"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-tst"], "explanation": "An 18 mm induration is significant even with prior BCG vaccination under the usual thresholds. Evaluate for active TB with symptom review and chest radiography before treating latent infection. A repeat skin test does not replace that evaluation."},
    {"ids": ["batch-medicine-final-437-p3186-q13", "medicine-final-437-infectious-diseases-q013"], "answers": ["D"], "ungradedReason": "The source keys cesarean with IV acyclovir. Cesarean is indicated for active lesions at labor, but routine IV acyclovir is not established by this vignette.", "confidence": "tentative", "references": ["cm437-hsv-labor"], "explanation": "Genital herpetic lesions during labor warrant cesarean delivery to lower neonatal transmission risk. IV acyclovir is reserved for severe or disseminated maternal infection and is not an automatic addition for otherwise uncomplicated genital lesions. The timing and severity of infection also guide antiviral and newborn evaluation."},
    {"ids": ["batch-medicine-final-437-p3194-q14", "medicine-final-437-infectious-diseases-q014"], "answers": ["B"], "ungradedReason": "Both topical and oral antiviral treatments can be appropriate. There is insufficient clinical detail to choose the only valid route.", "confidence": "tentative", "references": ["cm437-labialis"], "explanation": "For an uncomplicated recurrent HSV-1 cold sore, early topical acyclovir cream can modestly shorten symptoms. Oral antiviral treatment is also reasonable for selected severe or frequent episodes. The source calls the topical formulation ointment, while the cited herpes labialis trials used cream."},
    {"ids": ["batch-medicine-final-437-p3201-q15", "medicine-final-437-infectious-diseases-q015"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-ssi"], "explanation": "Give most surgical prophylactic antibiotics within 60 minutes before incision so adequate levels are present when contamination can occur. Some agents require starting earlier for infusion, and prolonged cases can require redosing. Routine multi-day antibiotic courses are not recommended for prophylaxis alone."},
    {"ids": ["batch-medicine-final-437-p3208-q16", "medicine-final-437-infectious-diseases-q016"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["asb", "cauti"], "explanation": "Cloudy urine and positive culture in a chronically catheterized patient without urinary or systemic symptoms indicate asymptomatic bacteriuria. Remove the catheter if it is no longer needed and avoid antibiotics solely for this culture. Prior to selected urologic procedures, separate treatment indications can apply."},
    {"ids": ["batch-medicine-final-437-p3216-q17", "medicine-final-437-infectious-diseases-q017"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-id-skin"], "explanation": "Among the listed antibiotics, linezolid provides appropriate MRSA activity when clindamycin, TMP–SMX and tetracycline resistance are documented. A postoperative joint or graft infection still requires surgical evaluation and source control. A wound antibiotic alone is not a complete treatment plan."},
    {"ids": ["batch-medicine-final-437-p3225-q18", "medicine-final-437-endocrinology-q018"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Galactorrhea, menstrual irregularity and markedly elevated prolactin warrant evaluation for a pituitary cause. Check pregnancy, medication exposure and relevant secondary causes. With substantial unexplained hyperprolactinemia and normal TSH, contrast-enhanced pituitary MRI is the next listed investigation."},
    {"ids": ["batch-medicine-final-437-p3234-q19", "medicine-final-437-endocrinology-q019"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds", "insulin-peds"], "explanation": "Type 1 diabetes requires continuous basal insulin and mealtime insulin. Among the injection regimens listed, rapid-acting and long-acting insulin provide both components. Nutrition education, exercise and glucose monitoring support treatment. An insulin pump can deliver basal and bolus doses with rapid-acting insulin."},
    {"ids": ["batch-medicine-final-437-p3241-q20", "medicine-final-437-endocrinology-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "Higher HDL cholesterol is associated with lower cardiovascular risk in many populations and is the protective risk marker intended here. Raising HDL concentration itself has not established cardiovascular benefit. Preventive treatment addresses atherogenic lipoproteins and overall risk."},
    {"ids": ["batch-medicine-final-437-p3248-q21", "medicine-final-437-endocrinology-q021"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds"], "explanation": "HbA1c rose despite lifestyle measures, so pharmacologic treatment is required. When kidney function permits and there is no stated indication to prioritize another drug, metformin is the most appropriate listed next step. Comorbid heart or kidney disease and the patient’s glycemic target can change the regimen."},
    {"ids": ["batch-medicine-final-437-p3260-q22", "medicine-final-437-endocrinology-q022"], "answers": ["A"], "ungradedReason": "The stated calcium of 12 mmol/L is unsafe to interpret as moderate hypercalcemia. The usual teaching stem likely intended 12 mg/dL.", "confidence": "tentative", "references": ["phpt", "cm437-ca-emerg"], "explanation": "Recurrent kidney stones and confirmed hypercalcemia suggest primary hyperparathyroidism. If the intended calcium is 12 mg/dL, measure intact PTH after confirming the result. A genuine value of 12 mmol/L would be extreme and requires emergency confirmation and management rather than treating the case as an outpatient diagnostic sequence."},
    {"ids": ["batch-medicine-final-437-p3267-q23", "medicine-final-437-endocrinology-q023"], "answers": ["C"], "ungradedReason": "Both 24-hour urinary free cortisol and a properly specified overnight 1 mg dexamethasone suppression test are recommended initial tests.", "confidence": "tentative", "references": ["cushing"], "explanation": "A 24-hour collection for urinary free cortisol is an appropriate first screen for endogenous cortisol excess. The overnight 1 mg dexamethasone suppression test is another first-line option, and the stem lists its dose without naming measurement or timing. ACTH is used to investigate the cause after excess cortisol is established."},
    {"ids": ["batch-medicine-final-437-p3274-q24", "medicine-final-437-endocrinology-q024"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-gh"], "explanation": "Exercise produces a physiological rise in growth hormone, affected by intensity and duration. Somatostatin suppresses secretion. An oral glucose load ordinarily suppresses growth hormone, which is the physiology used in confirmatory testing for acromegaly."},
    {"ids": ["batch-medicine-final-437-p3281-q25", "medicine-final-437-endocrinology-q025"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["lipid"], "explanation": "Very high LDL with relatively normal triglycerides and a first-degree relative with MI at age 32 strongly suggests familial hypercholesterolemia. Apo C-II and lipoprotein lipase deficiency produce marked triglyceride elevations rather than the predominantly LDL pattern here."},
    {"ids": ["batch-medicine-final-437-p3294-q26", "medicine-final-437-endocrinology-q026"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["dka"], "explanation": "The diagnostic combination in this symptomatic adolescent is hyperglycemia, ketosis and metabolic acidosis, usually with a raised anion gap. Hyperglycemia and hyperosmolality alone suggest a different hyperglycemic emergency. Direct blood beta-hydroxybutyrate and acid-base assessment support the diagnosis."},
    {"ids": ["batch-medicine-final-437-p3301-q27", "medicine-final-437-endocrinology-q027"], "answers": ["D"], "ungradedReason": "The source gives mg/L for a ratio normally reported as mg/g creatinine or mg/mmol. The intended range is evident, but the unit is incorrect.", "confidence": "tentative", "references": ["diabetes-ckd"], "explanation": "A urine albumin-to-creatinine ratio of 30–300 mg/g reflects moderately increased albuminuria and can detect early diabetic kidney disease before eGFR falls. Repeat testing confirms persistence. A value over 300 mg/g indicates more severe albuminuria."},
    {"ids": ["batch-medicine-final-437-p3308-q28", "medicine-final-437-endocrinology-q028"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["hypocalcemia"], "explanation": "Low extracellular calcium prolongs ventricular repolarization, typically lengthening the ST segment and therefore the QT interval. A shortened QT is the classic direction with hypercalcemia."},
    {"ids": ["batch-medicine-final-437-p3315-q29"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes usually results from autoimmune destruction of pancreatic beta cells, producing severe insulin deficiency. Alpha cells make glucagon, while insulin resistance is a defining contribution to type 2 diabetes rather than the typical initiating mechanism of type 1 diabetes."},
    {"ids": ["batch-medicine-final-437-p3322-q30", "medicine-final-437-endocrinology-q030"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["lipid", "diet"], "explanation": "At age 29 with normal LDL and no other stated major risk factor, lifestyle measures are appropriate and no preventive statin or aspirin is indicated from this case alone. A reported short-term ASCVD percentage should not be applied outside the validated age range of the equation used."},
    {"ids": ["batch-medicine-final-437-p3337-q32", "medicine-final-437-endocrinology-q032"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["celiac", "diabetes"], "explanation": "Type 1 diabetes increases the likelihood of celiac disease. Chronic diarrhea with microcytic anemia suggests malabsorption of iron. Start celiac evaluation while the patient is eating gluten, usually with tTG-IgA and total IgA, and use gastroenterology referral to confirm the diagnosis when indicated."},
    {"ids": ["batch-medicine-final-437-p3344-q33", "medicine-final-437-endocrinology-q033"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["dka"], "explanation": "Restore circulation with isotonic IV fluid first and assess potassium. In pediatric DKA, insulin infusion follows initial fluid therapy, and severe hypokalemia must be corrected before insulin. Dextrose is added later as glucose falls so insulin can continue to clear ketones."},
    {"ids": ["batch-medicine-final-437-p3352-q34", "medicine-final-437-neurology-q034"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["memory"], "explanation": "Repeatedly asking the same question suggests failure to form or retain recent episodic memories. Preserved recall of older events and ability to name objects suggest relatively preserved remote and semantic memory. Working memory refers to holding and manipulating information over a brief interval."},
    {"ids": ["batch-medicine-final-437-p3363-q35", "medicine-final-437-neurology-q035"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-l5"], "explanation": "Tensor fasciae latae receives L5 input through the superior gluteal nerve, outside the common peroneal nerve. Weakness there supports an L5-root pattern over isolated peroneal neuropathy. Tibialis anterior and extensor hallucis longus are both supplied by the deep peroneal nerve and cannot make that distinction alone."},
    {"ids": ["batch-medicine-final-437-p3370-q36", "medicine-final-437-neurology-q036"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-men-cohort", "meningitis"], "explanation": "Streptococcus pneumoniae is a leading and generally the most common cause of community-acquired bacterial meningitis in adults in studied populations. Meningococcus remains an important alternative, especially in younger patients with close-contact outbreaks. Organism frequencies vary by setting and immunization history."},
    {"ids": ["batch-medicine-final-437-p3377-q37", "medicine-final-437-neurology-q037"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["epilepsy-preg"], "explanation": "Lamotrigine is among the preferred options when suitable for the seizure type in a patient who is pregnant or may become pregnant because of its lower risk of major congenital malformations. Avoid valproate where feasible. An effective antiseizure medication should not be abruptly withdrawn during pregnancy."},
    {"ids": ["batch-medicine-final-437-p3384-q38", "medicine-final-437-neurology-q038"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["dermatomyositis"], "explanation": "Weakness in tasks such as combing hair and rising from bed reflects a proximal pattern. Symmetric proximal weakness with preserved sensation and reflexes favors a myopathy. A neuromuscular-junction disorder is more suggested by fatigability, fluctuation, or prominent ocular or bulbar involvement."},
    {"ids": ["batch-medicine-final-437-p3398-q39", "medicine-final-437-neurology-q039"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-absence"], "explanation": "Ethosuximide is first-line for typical childhood absence seizures when they are the only seizure type. The comparative trial found it effective with fewer attentional adverse effects than valproate. When generalized tonic–clonic seizures coexist, a broader-spectrum medication may be needed."},
    {"ids": ["batch-medicine-final-437-p3405-q40", "medicine-final-437-neurology-q040"], "answers": [], "ungradedReason": "Ischemic CT appearances overlap widely in time. A single image cannot establish 12 hours or another exact interval.", "confidence": "tentative", "references": ["stroke"], "explanation": "The scan shows asymmetric hemispheric hypoattenuation and loss of sulcal definition, consistent with developed ischemic change. Early CT can be nearly normal, but visibility depends on infarct burden, reperfusion and technique. The onset time needed for treatment decisions comes from history or appropriate imaging protocols."},
    {"ids": ["batch-medicine-final-437-p3414-q41", "medicine-final-437-neurology-q041"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["nmosd"], "explanation": "AQP4-IgG is the characteristic antibody associated with neuromyelitis optica spectrum disorder, particularly in severe or recurrent optic neuritis. A serum cell-based assay is preferred. A negative result does not exclude a related optic neuritis syndrome and may prompt evaluation for MOG-IgG or other causes."},
    {"ids": ["batch-medicine-final-437-p3421-q42", "medicine-final-437-neurology-q042"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-meningo"], "explanation": "A meningitis syndrome with rash and similar acute illnesses among close dormitory contacts points to meningococcal disease. Neisseria meningitidis commonly spreads in close-contact settings and can cause petechiae or purpura with invasive infection. Clinicians should treat suspected cases promptly and notify public health."},
    {"ids": ["batch-medicine-final-437-p3428-q43", "medicine-final-437-neurology-q043"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-rasch"], "explanation": "Both pupils constrict when light shines in the patient's left eye. They enlarge when the beam moves to the right eye, indicating reduced afferent input from the right. This is a right relative afferent pupillary defect. Of the nerve options, the right optic nerve is implicated."},
    {"ids": ["batch-medicine-final-437-p3435-q44", "medicine-final-437-neurology-q044"], "answers": [], "ungradedReason": "None of the choices states prompt antibiotics and early lumbar puncture when safe, without routine CT or waiting for CSF results.", "confidence": "tentative", "references": ["meningitis"], "explanation": "Suspect bacterial meningitis and obtain blood cultures plus a prompt lumbar puncture if it can be done safely without delaying treatment. This alert patient has no described focal deficit or signs requiring routine CT before LP. Start empiric antibiotics promptly and do not wait for CSF results if that would cause delay."},
    {"ids": ["batch-medicine-final-437-p3442-q45", "medicine-final-437-neurology-q045"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-dlb"], "explanation": "Cognitive decline accompanied by visual hallucinations, REM sleep behavior disorder and parkinsonism strongly suggests dementia with Lewy bodies. If the question targets disabling motor symptoms, cautious low-dose levodopa is the best listed option and may worsen hallucinations. Cholinesterase inhibitors can be useful, and antipsychotics require particular caution."},
    {"ids": ["batch-medicine-final-437-p3450-q46", "medicine-final-437-neurology-q046"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-epidural"], "explanation": "The supplied image is a CT, despite the stem calling it an X-ray. It shows a hyperdense biconvex extra-axial collection next to the fractured skull, the classic pattern of an acute epidural hematoma. A subdural hematoma more often has a crescentic shape."},
    {"ids": ["batch-medicine-final-437-p3459-q47", "medicine-final-437-neurology-q047"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-weber"], "explanation": "Left ptosis, mydriasis and impaired movements localize to the left oculomotor fascicles. Right-sided upper motor neuron weakness indicates involvement of the corticospinal tract above its decussation. Together they identify the left ventral midbrain, the classic Weber syndrome pattern."},
    {"ids": ["batch-medicine-final-437-p3466-q48", "medicine-final-439-neurology-q053"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-lems"], "explanation": "Proximal leg weakness and reduced reflexes with brief improvement after repeated contraction point to Lambert–Eaton myasthenic syndrome. Repetitive activation can transiently increase presynaptic acetylcholine release. Electrodiagnostic testing confirms characteristic facilitation, and an associated malignancy should be considered in an adult."},
    {"ids": ["batch-medicine-final-437-p3473-q49", "medicine-final-437-neurology-q049"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-mg-crisis"], "explanation": "Myasthenic crisis threatens ventilation and requires urgent respiratory assessment and support. Plasma exchange or IV immunoglobulin can produce rapid improvement in severe weakness. Of these options only plasma exchange is the appropriate rapid disease-directed therapy."},
    {"ids": ["batch-medicine-final-437-p3480-q50", "medicine-final-437-neurology-q050"], "answers": [], "ungradedReason": "Aneurysm site, rupture status, anatomy and patient factors are absent, so no single procedure is best.", "confidence": "tentative", "references": ["cm437-sah"], "explanation": "Endovascular coiling and microsurgical clipping can both secure selected intracranial aneurysms. The choice depends on rupture status, location, neck and branch anatomy, patient factors and local expertise. The source favors coiling without supplying those details."},
    {"ids": ["batch-medicine-final-437-p3489-q51", "medicine-final-437-neurology-q051"], "answers": ["A"], "ungradedReason": "The stem conflates subarachnoid hemorrhage and a thalamic hematoma, which are anatomically different.", "confidence": "tentative", "references": ["cm437-ich", "cm437-sah"], "explanation": "If the intended finding is a deep intraparenchymal thalamic hemorrhage, chronic hypertension is the best listed cause through small-vessel arteriopathy. A true subarachnoid hemorrhage with thunderclap headache needs assessment for an aneurysmal or other vascular source. The site wording cannot reliably describe both."},
    {"ids": ["batch-medicine-final-437-p3497-q52", "medicine-final-437-neurology-q052"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm437-uhthoff", "ms-relapse"], "explanation": "Heat from exercise or a hot shower can transiently reduce conduction in previously demyelinated fibers, reproducing old symptoms. This is Uhthoff phenomenon. Rapid improvement after cooling argues against a new inflammatory relapse, which is persistent."},
    {"ids": ["batch-medicine-final-437-p3504-q53", "medicine-final-437-neurology-q053"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ilae"], "explanation": "Déjà vu plus a rising epigastric sensation is a typical temporal-lobe aura. Impaired responsiveness and incomplete recall support a focal seizure with impaired consciousness, historically called a complex partial seizure. The stereotyped aura makes syncope a poorer fit."},
    {"ids": ["batch-medicine-final-437-p3511-q54", "medicine-final-437-neurology-q054"], "answers": ["B"], "ungradedReason": "A narrow neck makes coiling plausible, but the MCA location, branch anatomy and hemorrhage details determine suitability of coiling versus clipping.", "confidence": "tentative", "references": ["cm437-sah"], "explanation": "Sudden worst headache with hemorrhage and an identified aneurysm requires urgent specialist treatment to secure the rupture site. A narrow neck can favor coiling. For an MCA aneurysm, clipping can be appropriate if branches arise from the aneurysm or hematoma evacuation is required. Anticoagulation or aspirin is not an answer to this bleed."},
    {"ids": ["batch-medicine-final-437-p3522-q55", "medicine-final-437-hematology-oncology-q055"], "answers": ["B"], "ungradedReason": "The source lacks the nodal station, histologic nodal confirmation, laterality and metastatic staging needed to select definitive treatment.", "confidence": "tentative", "references": ["cm437-nsclc"], "explanation": "If the enlarged para-aortic nodes refer to a regional mediastinal station and there is no distant spread, combined local and systemic treatment may be appropriate for locally advanced NSCLC. CT enlargement alone is not proof of nodal involvement. Complete staging and resectability assessment determine the regimen."},
    {"ids": ["batch-medicine-final-437-p3536-q57", "medicine-final-437-hematology-oncology-q057"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-gastric-malt"], "explanation": "H. pylori eradication is the usual initial therapy for localized gastric MALT lymphoma, especially if H. pylori is present. Endoscopic surveillance with biopsies checks for response. Persistent or disseminated disease may need a different lymphoma-directed treatment."},
    {"ids": ["batch-medicine-final-437-p3543-q58", "medicine-final-437-hematology-oncology-q058"], "answers": ["B"], "ungradedReason": "The order of palpation is a clinical technique convention; the key requirement is a systematic bilateral examination.", "confidence": "tentative", "references": ["cm437-cbe", "cm438-diagnostic-breast"], "explanation": "Starting with the asymptomatic left breast lets the clinician compare normal tissue before examining the reported right-sided mass. Inspect and palpate both breasts and regional nodes systematically. The order alone does not establish whether the examination is adequate, and a palpable mass also needs age-appropriate imaging."},
    {"ids": ["batch-medicine-final-438-p2809-q1", "medicine-final-438-mixed-medicine-q001"], "answers": ["A"], "ungradedReason": "The original Gift has no recorded key.", "confidence": "tentative", "references": ["cm438-cdiff"], "explanation": "Recent hospitalization for an infection followed by frequent new diarrhea raises concern for C. difficile, particularly if she received antibiotics. Begin contact precautions while evaluating the cause. Standard precautions alone do not cover suspected C. difficile."},
    {"ids": ["batch-medicine-final-438-p2817-q2", "medicine-final-438-mixed-medicine-q002"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-an-ldl"], "explanation": "Patients with anorexia nervosa can have elevated LDL cholesterol despite restricted intake and low body weight. A pooled comparison found higher LDL in acutely ill patients than in healthy controls. Hyperthyroidism usually lowers LDL."},
    {"ids": ["batch-medicine-final-438-p2824-q3", "medicine-final-438-mixed-medicine-q003"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-hiv-cd4"], "explanation": "CD4 helper T cells are HIV's principal immune-cell target. Loss of these cells impairs coordination of immune responses and increases the risk of opportunistic infection."},
    {"ids": ["batch-medicine-final-438-p2831-q4", "medicine-final-438-mixed-medicine-q004"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["sle", "sle-clinical"], "explanation": "The combination of a malar rash, discoid lesions and proteinuria is particularly characteristic of SLE. It points to cutaneous and possible renal involvement. Lupus arthritis is usually nonerosive, so prominent erosions favor a different or overlapping diagnosis."},
    {"ids": ["batch-medicine-final-438-p2838-q5", "medicine-final-438-mixed-medicine-q005"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-preg-dvt"], "explanation": "Unilateral pain, swelling and redness at 36 weeks suggest lower-extremity DVT. Compression ultrasound is the first investigation. If it is negative while suspicion remains high, include assessment of the iliac veins and consider serial ultrasound or MR venography."},
    {"ids": ["batch-medicine-final-438-p2845-q6", "medicine-final-438-mixed-medicine-q006"], "answers": ["B"], "ungradedReason": "The Gift key says hemolysis, but the case lacks evidence of hemolysis and does not fully establish the cause of the anemia.", "confidence": "supported", "references": ["cm438-anaemia"], "explanation": "Anemia of chronic disease is more plausible among the choices in a patient with chronic illness and normocytic anemia, but renal function and a reticulocyte count are missing. Hemolysis would require supporting evidence such as raised LDH or indirect bilirubin, low haptoglobin or reticulocytosis. The reference range also appears to mix g/dL values with g/L units."},
    {"ids": ["batch-medicine-final-438-p2852-q7", "medicine-final-438-mixed-medicine-q007"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-gastric-malt"], "explanation": "H. pylori eradication with appropriate antibiotics plus acid suppression is usual initial treatment of localized gastric MALT lymphoma, particularly when H. pylori is present. Endoscopic biopsies assess response. Persistent disease can require radiotherapy or another lymphoma-directed treatment."},
    {"ids": ["batch-medicine-final-438-p2859-q8", "medicine-final-438-mixed-medicine-q008"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["ms-criteria", "nmosd"], "explanation": "Painful monocular visual loss suggests optic neuritis. A separate sensory episode plus periventricular and brainstem lesions, with one enhancing lesion and CSF oligoclonal bands, strongly supports relapsing-remitting multiple sclerosis. A negative AQP4 result adds context but alone cannot exclude all alternative demyelinating disorders."},
    {"ids": ["batch-medicine-final-438-p2866-q9", "medicine-final-438-mixed-medicine-q009"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-mg"], "explanation": "Fatigable ocular, bulbar and limb weakness is characteristic of generalized myasthenia gravis. A positive acetylcholine receptor antibody in this clinical setting strongly supports the diagnosis. Chest CT evaluates for thymoma, while abnormal neurophysiology is useful in seronegative cases."},
    {"ids": ["batch-medicine-final-438-p2873-q10"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["aphasia"], "explanation": "Fluent speech with poor comprehension and impaired repetition is Wernicke aphasia. Conduction aphasia also impairs repetition but usually preserves comprehension. Broca and global aphasia produce nonfluent speech."},
    {"ids": ["batch-medicine-final-438-p2880-q11", "medicine-final-438-mixed-medicine-q011"], "answers": ["A"], "ungradedReason": "The source keys Crohn disease, but the question does not establish it or clearly define the spondyloarthritis subtype.", "confidence": "supported", "references": ["cm438-uveitis", "axspa"], "explanation": "Acute anterior uveitis is the most common extra-musculoskeletal manifestation of axial spondyloarthritis, the pattern suggested by inflammatory back pain. Crohn disease can coexist but is less common. Achilles tendon inflammation is enthesitis, a musculoskeletal sign, while nail psoriasis can accompany the recorded skin disease."},
    {"ids": ["batch-medicine-final-438-p2887-q12", "medicine-final-438-mixed-medicine-q012"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["aplastic"], "explanation": "Anemia, leukopenia and thrombocytopenia together indicate pancytopenia. The very low reticulocyte count indicates poor marrow production, making marrow failure the best option. Bone marrow examination and other tests determine whether the cause is aplastic anemia or another marrow disorder."},
    {"ids": ["batch-medicine-final-438-p2894-q13", "medicine-final-438-mixed-medicine-q013"], "answers": [], "ungradedReason": "The characteristic short QT is missing and two choices repeat peaked T waves.", "confidence": "tentative", "references": ["cm438-hyperca-ecg", "hypocalcemia"], "explanation": "Severe hypercalcemia characteristically shortens the QT interval, often by shortening the ST segment. The keyed prolonged QT is associated with hypocalcemia. The available ECG crop does not resolve the incorrect key or the duplicated choices."},
    {"ids": ["batch-medicine-final-438-p2902-q14", "medicine-final-438-mixed-medicine-q014"], "answers": [], "ungradedReason": "The Gift has no recorded key, and the choices do not specify a complete precaution protocol.", "confidence": "tentative", "references": ["cm438-covid-ipc"], "explanation": "Hypoxemia with new loss of taste and smell raises suspicion for COVID-19. In healthcare, follow the applicable protocol. CDC guidance calls for a respirator, eye protection, gown and gloves for suspected cases, with an airborne infection isolation room for aerosol-generating procedures when available."},
    {"ids": ["batch-medicine-final-438-p2909-q15", "medicine-final-438-mixed-medicine-q015"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["ilae"], "explanation": "The rising epigastric sensation and déjà vu suggest a focal temporal onset. Oral automatisms with impaired awareness and later amnesia point to a focal impaired-awareness seizure, the current term for the listed “complex partial seizure.”"},
    {"ids": ["batch-medicine-final-438-p2916-q16", "medicine-final-438-nephrology-q016"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["secondary-htn", "ppgl"], "explanation": "A blood pressure of 165/95 at age 20 warrants confirmation and evaluation for secondary hypertension. A family history of pheochromocytoma can independently justify targeted genetic or endocrine assessment, but that option says nothing about the person's blood pressure."},
    {"ids": ["batch-medicine-final-438-p2923-q17", "medicine-final-438-mixed-medicine-q017"], "answers": [], "ungradedReason": "The original omits histology, size, grade and adequate nodal staging and has no recorded answer.", "confidence": "tentative", "references": ["cm438-sarcoma"], "explanation": "Lymphovascular invasion means tumor cells are seen in lymphatic or vascular spaces at the primary site. It does not by itself prove lymph-node or distant spread. Staging a suspected extremity soft-tissue sarcoma requires the histologic subtype, size, grade and nodal and distant findings."},
    {"ids": ["batch-medicine-final-438-p2937-q19", "medicine-final-438-mixed-medicine-q019"], "answers": ["A"], "ungradedReason": "The original Gift has no recorded key.", "confidence": "tentative", "references": ["sle", "ra-class"], "explanation": "Lymphopenia and thrombocytopenia point toward SLE when distinguishing it from uncomplicated rheumatoid arthritis. Symmetric inflammatory arthritis, morning stiffness and normocytic anemia can occur in either condition. Cytopenias and other systemic findings provide the stronger clue."},
    {"ids": ["batch-medicine-final-438-p2944-q20", "medicine-final-438-mixed-medicine-q020"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cushing", "cushing-local"], "explanation": "The failure to suppress cortisol after dexamethasone plus elevated ACTH suggests ACTH-dependent hypercortisolism. After confirming endogenous hypercortisolism, pituitary MRI is the relevant next localization test among the choices. A normal, small or equivocal MRI can require further endocrine testing to distinguish pituitary from ectopic ACTH production."},
    {"ids": ["batch-medicine-final-438-p2951-q21", "medicine-final-438-mixed-medicine-q021"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["carpal"], "explanation": "Nocturnal symptoms, paresthesia in the median-nerve distribution, weak thumb abduction and thenar wasting point to bilateral median nerve compression at the carpal tunnels. The ring finger may be involved on its radial side. Ulnar neuropathy more often affects the little finger and ulnar side of the ring finger."},
    {"ids": ["batch-medicine-final-438-p2958-q22", "medicine-final-438-mixed-medicine-q022"], "answers": ["A", "C"], "ungradedReason": "Both smoking and a history of diabetes are supported risk factors, and the stem does not ask specifically for the major modifiable exposure.", "confidence": "supported", "references": ["pancreas-risk"], "explanation": "Smoking is the intended answer and a major modifiable pancreatic cancer risk factor. Type 2 diabetes also increases risk, and diabetes diagnosed recently may sometimes reflect early pancreatic cancer. Prior gallstones do not explain this risk comparison."},
    {"ids": ["batch-medicine-final-438-p2965-q23", "medicine-final-438-mixed-medicine-q023"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Fever, neck stiffness and altered consciousness suggest acute bacterial meningitis. Pneumococcus is the most frequent cause of community-acquired bacterial meningitis in adults and the best listed answer at this age. The organism still requires microbiologic testing."},
    {"ids": ["batch-medicine-final-438-p2972-q24", "medicine-final-438-mixed-medicine-q024"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-step1"], "explanation": "Some anti-obesity medications can produce weight loss near 15% when added to lifestyle treatment. In STEP 1, semaglutide plus lifestyle support produced an average 14.9% loss at 68 weeks. Individual results and medication suitability vary."},
    {"ids": ["batch-medicine-final-438-p2979-q25", "medicine-final-438-mixed-medicine-q025"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-cvt"], "explanation": "The important medication-related risk factor for cerebral venous sinus thrombosis is use of an estrogen-containing oral contraceptive. Estrogen increases thrombotic risk, which fits sagittal sinus thrombosis and venous infarction. The other listed medicines do not have this established association."},
    {"ids": ["batch-medicine-final-438-p2986-q26", "medicine-final-439-infectious-diseases-q015"], "answers": ["D"], "ungradedReason": "The timing comparison depends on antiretroviral treatment and breastfeeding exposure, neither of which is specified.", "confidence": "tentative", "references": ["cm438-hiv-intrapartum", "cm438-hiv-perinatal"], "explanation": "Historically, without effective prevention, labor and delivery accounted for a large share of transmissions among infants who were not breastfed. Transmission can also occur in utero and during breastfeeding. Maternal viral suppression greatly lowers risk, so delivery cannot be ranked first for every population."},
    {"ids": ["batch-medicine-final-438-p2993-q27", "medicine-final-438-mixed-medicine-q027"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-post-thyroid"], "explanation": "TSH of 100 with low free T4 after total thyroidectomy indicates overt primary hypothyroidism. Levothyroxine replaces the missing thyroid hormone. In thyroid cancer the treating team determines the long-term TSH goal based on recurrence risk and response."},
    {"ids": ["batch-medicine-final-438-p3001-q28", "medicine-final-438-mixed-medicine-q028"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "severe-malaria"], "explanation": "Fever, splenomegaly and hypotension after travel to a malaria-risk area raise concern for severe malaria. P. falciparum is the leading likely species among the choices in this setting. Urgent blood microscopy and rapid testing are needed because travel history and symptoms alone cannot identify the species."},
    {"ids": ["batch-medicine-final-438-p3008-q29", "medicine-final-438-mixed-medicine-q029"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-step1", "bariatric"], "explanation": "With a BMI of 36, a structured lifestyle program plus a suitable anti-obesity medication is a reasonable first approach. A GLP-1 receptor agonist is a highly effective option when appropriate. Orlistat is another option with a smaller average effect, and surgery may also be discussed depending on the patient's goals and assessment."},
    {"ids": ["batch-medicine-final-438-p3017-q30", "medicine-final-438-mixed-medicine-q030"], "answers": ["B"], "ungradedReason": "Current guidance favors a suitable oral NSAID after an inadequate topical response if the patient's risk profile allows it. The source does not specify a reason to prefer acetaminophen.", "confidence": "supported", "references": ["oa", "cm438-oa-nice"], "explanation": "An oral NSAID such as diclofenac is more effective for knee osteoarthritis pain when topical therapy gives inadequate relief, provided GI, kidney and cardiovascular risks permit it. Acetaminophen has limited average benefit and can be considered when NSAIDs are unsuitable. The case does not provide the comorbidity information needed for an individualized choice."},
    {"ids": ["batch-medicine-final-438-p3024-q31", "medicine-final-438-mixed-medicine-q031"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["dermatomyositis"], "explanation": "“Gottorn’s” refers to Gottron papules, raised pink-to-violaceous lesions over the extensor surfaces of the finger joints. This characteristic distribution points to dermatomyositis much more specifically than photosensitivity or a malar rash."},
    {"ids": ["batch-medicine-final-438-p3031-q32", "medicine-final-438-mixed-medicine-q032"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-stroke-prevention"], "explanation": "Improving blood pressure control is a major stroke prevention intervention in a patient with uncontrolled hypertension. Smoking cessation, diabetes care and weight management also lower cardiovascular risk and should be addressed. The question asks which intervention to prioritize among the choices."},
    {"ids": ["batch-medicine-final-438-p3038-q33", "medicine-final-438-mixed-medicine-q033"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-diagnostic-breast"], "explanation": "A persistent self-detected focal breast lump at age 35 warrants diagnostic imaging even when it is hard to reproduce on examination. Targeted ultrasound and diagnostic mammography are appropriate choices in this age group. A serum tumor marker or genetic test cannot evaluate the lump itself."},
    {"ids": ["batch-medicine-final-438-p3045-q34", "medicine-final-438-mixed-medicine-q034"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-absence"], "explanation": "Ethosuximide is a first-line choice for typical absence seizures when absence is the only seizure type. Carbamazepine and phenytoin may worsen absence seizures. Other seizure types require a drug with broader coverage."},
    {"ids": ["batch-medicine-final-438-p3052-q35", "medicine-final-438-mixed-medicine-q035"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 1 diabetes typically results from immune-mediated destruction of pancreatic beta cells, leading to severe insulin deficiency. Environmental factors may contribute to susceptibility, but beta-cell destruction is the direct mechanism."},
    {"ids": ["batch-medicine-final-438-p3060-q36", "medicine-final-438-mixed-medicine-q036"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["axspa-treatment"], "explanation": "Grade 3 bilateral sacroiliitis with inflammatory back pain supports radiographic axial spondyloarthritis. NSAIDs are first-line drug treatment for pain and stiffness, along with exercise. Methotrexate and sulfasalazine do not treat purely axial disease effectively."},
    {"ids": ["batch-medicine-final-438-p3067-q37", "medicine-final-438-mixed-medicine-q037"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["acromegaly"], "explanation": "Acromegaly is associated with an increased prevalence of colonic adenomas and polyps. Excess growth hormone and IGF-1 promote tissue growth. The Endocrine Society guideline suggests colonoscopy at diagnosis."},
    {"ids": ["batch-medicine-final-438-p3074-q38", "medicine-final-438-mixed-medicine-q038"], "answers": ["D"], "ungradedReason": "The original Gift has no recorded key.", "confidence": "tentative", "references": ["cushing"], "explanation": "Proximal muscle weakness and easy bruising are relatively discriminating findings for Cushing syndrome. Central obesity and diabetes are common but less specific. Hyperpigmentation of the buccal mucosa with nausea instead points toward primary adrenal insufficiency."},
    {"ids": ["batch-medicine-final-438-p3081-q39", "medicine-final-438-mixed-medicine-q039"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Type 2 diabetes develops when pancreatic beta-cell insulin secretion no longer compensates for insulin resistance. The result is relative insulin deficiency with gradual loss of beta-cell function. Absolute insulin deficiency from beta-cell destruction is characteristic of type 1 diabetes."},
    {"ids": ["batch-medicine-final-438-p3088-q40", "medicine-final-439-rheumatology-q008"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc", "ssc-paht"], "explanation": "Anticentromere antibodies are characteristic of limited cutaneous systemic sclerosis, which can be complicated by pulmonary arterial hypertension. Anti-topoisomerase I is especially associated with interstitial lung disease, and anti-RNA polymerase III is associated with diffuse disease and renal crisis."},
    {"ids": ["batch-medicine-final-439-p2165-q1", "medicine-final-439-rheumatology-q001"], "answers": [], "ungradedReason": "Oral NSAIDs, colchicine and glucocorticoids can each be first-line. The stem gives no comorbidity or other feature that separates them.", "confidence": "tentative", "references": ["r-gout"], "explanation": "An oral NSAID is reasonable for an acute gout flare when kidney function, cardiovascular risk and GI risk allow it. Oral colchicine or a glucocorticoid is also appropriate in selected patients. Aspirin is not the usual anti-inflammatory treatment for a gout flare."},
    {"ids": ["batch-medicine-final-439-p2175-q2", "medicine-final-439-rheumatology-q002"], "answers": [], "ungradedReason": "The question omits the affected joint, prior treatment and safety factors needed to select an initial oral medicine.", "confidence": "tentative", "references": ["oa"], "explanation": "Exercise and joint-specific measures are core treatment for osteoarthritis. Topical NSAIDs can be preferred for some joints before oral therapy. At age 70, an oral NSAID's GI, renal and cardiovascular risks matter. Acetaminophen is sometimes used when NSAIDs are unsuitable."},
    {"ids": ["batch-medicine-final-439-p2184-q3", "medicine-final-439-rheumatology-q003"], "answers": [], "ungradedReason": "The question does not specify whether it asks about axial spondyloarthritis generally or psoriasis-related nail disease.", "confidence": "tentative", "references": ["axspa", "cm438-uveitis"], "explanation": "Acute anterior uveitis is a classic extra-musculoskeletal manifestation of axial spondyloarthritis. Nail psoriasis supports a psoriatic phenotype and may be common in people with psoriasis. Achilles tendon involvement is usually enthesitis. The stem's mixed wording permits different interpretations."},
    {"ids": ["batch-medicine-final-439-p2192-q4", "medicine-final-439-rheumatology-q004"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["septic-joint"], "explanation": "A hot swollen joint with fever in someone receiving a biologic should be treated as possible septic arthritis. Aspirate urgently for cell count, crystals, Gram stain and culture. In a stable patient collect samples before antibiotics if feasible; suspected sepsis requires prompt treatment."},
    {"ids": ["batch-medicine-final-439-p2200-q5", "medicine-final-439-rheumatology-q005"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-gout"], "explanation": "Tophi are a clear indication for urate-lowering therapy. Allopurinol is generally preferred first line, started at a low dose and titrated to a urate target. Appropriate flare prophylaxis and individual consideration of serious cutaneous reaction risk are needed."},
    {"ids": ["batch-medicine-final-439-p2208-q6", "medicine-final-439-rheumatology-q006"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["oa"], "explanation": "Bony enlargement of distal interphalangeal joints with very brief morning stiffness is typical of hand osteoarthritis. Rheumatoid arthritis usually favors MCP and PIP joints and produces longer inflammatory stiffness."},
    {"ids": ["batch-medicine-final-439-p2217-q7", "medicine-final-439-rheumatology-q007"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-ibp"], "explanation": "Inflammatory back pain can worsen during prolonged rest, including sitting, and typically improves with movement. Worsening with exercise and very brief morning stiffness are less supportive of an inflammatory pattern."},
    {"ids": ["batch-medicine-final-439-p2226-q8"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["ssc"], "explanation": "Anticentromere antibodies are characteristic of limited cutaneous systemic sclerosis and are often found in patients monitored for pulmonary arterial hypertension. Anti–topoisomerase I is more strongly associated with interstitial lung disease."},
    {"ids": ["batch-medicine-final-439-p2235-q9", "medicine-final-439-rheumatology-q009"], "answers": [], "ungradedReason": "Longstanding deforming symmetric small-joint arthritis suggests RA, but no RA-specific antibody is offered and the question gives no systemic sclerosis findings.", "confidence": "tentative", "references": ["ra-class", "ssc-ild"], "explanation": "Pulmonary fibrosis can complicate rheumatoid arthritis, particularly with compatible joint disease. RF and anti-CCP are the relevant serologic tests. Anti–topoisomerase I would support systemic sclerosis–related ILD in a different case."},
    {"ids": ["batch-medicine-final-439-p2244-q10", "medicine-final-439-rheumatology-q010"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-digital"], "explanation": "A phosphodiesterase-5 inhibitor such as sildenafil is one treatment option for ischemic digital ulcers in systemic sclerosis. The new ulcer also needs assessment for infection or threatened tissue, with treatment individualized to severity."},
    {"ids": ["batch-medicine-final-439-p2255-q11", "medicine-final-439-infectious-diseases-q011"], "answers": [], "ungradedReason": "The Gift records two answers and the trip details that determine meningococcal need are absent.", "confidence": "tentative", "references": ["r-cameroon"], "explanation": "Yellow fever vaccination is particularly relevant for Cameroon. Meningococcal vaccination depends on travel in the meningitis belt, time of year and itinerary. These serve different indications and the broad recall does not narrow them to one."},
    {"ids": ["batch-medicine-final-439-p2264-q12", "medicine-final-439-infectious-diseases-q012"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-hiv-tb"], "explanation": "Untreated HIV sharply increases progression from TB infection to active disease, historically on the order of several percent per year in high-risk cohorts. B captures the intended annual risk rather than a low lifetime risk. This patient's abnormal radiograph and very low CD4 count also warrant evaluation for active TB before preventive therapy."},
    {"ids": ["batch-medicine-final-439-p2273-q13", "medicine-final-439-infectious-diseases-q013"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["malaria", "r-malpreg"], "explanation": "Fever, shock, splenomegaly and plausible exposure in pregnancy make severe malaria a concern. P. falciparum is the most likely species among the choices when severe malaria is suspected, but microscopy or another specific test is needed for species confirmation."},
    {"ids": ["batch-medicine-final-439-p2282-q14", "medicine-final-439-infectious-diseases-q014"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["typhoid"], "explanation": "Prolonged fever, abdominal symptoms and possible rose spots after travel fit enteric fever. Blood culture is the preferred confirmatory test among the options and can guide therapy based on susceptibility."},
    {"ids": ["batch-medicine-final-439-p2291-q15"], "answers": [], "ungradedReason": "The relative risk by transmission stage depends on viral suppression, infant feeding and the amount of time at risk.", "confidence": "tentative", "references": ["r-hiv-birth"], "explanation": "Transmission can occur before birth, during labor or through breastfeeding. In older settings without effective treatment and before counting prolonged breastfeeding exposure, intrapartum transmission was an important route. A single highest-risk route cannot be assumed without specifying the treatment and feeding context."},
    {"ids": ["batch-medicine-final-439-p2300-q16", "medicine-final-439-infectious-diseases-q016"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-contact"], "explanation": "Gown and gloves are the usual personal protective equipment for contact precautions. An N95 respirator addresses airborne exposure when indicated."},
    {"ids": ["batch-medicine-final-439-p2309-q17", "medicine-final-439-infectious-diseases-q017"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-contact"], "explanation": "A positive surface culture without purulence, systemic illness or other signs of infection may represent MRSA colonization. Use appropriate precautions under local policy and manage the pressure injury. The culture alone does not justify vancomycin or debridement."},
    {"ids": ["batch-medicine-final-439-p2317-q18", "medicine-final-439-infectious-diseases-q018"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-ltbi"], "explanation": "After excluding active TB, four months of rifampin is a recommended shorter regimen for many HIV-negative people with latent TB infection. Check drug interactions and exposure susceptibility before selecting it."},
    {"ids": ["batch-medicine-final-439-p2325-q19"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["brucellosis"], "explanation": "Fever and back pain after farm exposure raise concern for brucellosis, including possible vertebral involvement. Doxycycline plus streptomycin is the plausible Brucella regimen among these options. Confirm exposure, diagnosis and site, which influence the regimen and duration."},
    {"ids": ["batch-medicine-final-439-p2333-q20", "medicine-final-439-infectious-diseases-q020"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-hands"], "explanation": "Healthcare workers' hands can carry organisms between patients or from contaminated surfaces to a patient. That makes hand hygiene central to infection prevention. Catheters also cause device-specific infections, so the item is best understood as asking about a common route of transmission."},
    {"ids": ["batch-medicine-final-439-p2341-q21", "medicine-final-439-infectious-diseases-q021"], "answers": [], "ungradedReason": "Splenomegaly, seizure and shock do not identify a species and the original travel or exposure details are missing.", "confidence": "tentative", "references": ["malaria", "knowlesi-study"], "explanation": "The positive Castell sign suggests an enlarged spleen. Severe malaria is one possible cause of fever with neurologic impairment and shock, but the vignette neither establishes malaria nor distinguishes P. knowlesi from other species. Urgent testing and stabilization would be necessary."},
    {"ids": ["batch-medicine-final-439-p2349-q22", "medicine-final-439-infectious-diseases-q022"], "answers": [], "ungradedReason": "The original recall has no options, confirmed diagnosis, species or recorded answer key.", "confidence": "tentative", "references": ["malaria", "severe-malaria"], "explanation": "Splenomegaly and a seizure are insufficient to select treatment. If severe malaria is confirmed or strongly suspected, current guidance supports urgent parenteral artesunate, with testing and evaluation for other causes. The original question supplies too little to determine that this is the intended scenario."},
    {"ids": ["batch-medicine-final-439-p2367-q24", "medicine-final-439-endocrinology-q024"], "answers": ["A"], "ungradedReason": "Gift records rodent-style GLUT2 physiology. Human beta cells predominantly use GLUT1 and GLUT3; GLUT1 is the closest listed human answer.", "confidence": "supported", "references": ["r-glut"], "explanation": "GLUT2 is classically emphasized in rodent beta cells. Studies in human beta cells show predominance of other transporters, including GLUT1, with much lower GLUT2 expression. The species distinction changes the answer."},
    {"ids": ["batch-medicine-final-439-p2385-q26", "medicine-final-439-endocrinology-q026"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["adrenal"], "explanation": "Hyperpigmentation with hypotension suggests primary adrenal insufficiency. Morning cortisol with simultaneous ACTH is an appropriate initial biochemical sample; dynamic testing may be needed later. If adrenal crisis is suspected, draw samples promptly if feasible and do not delay hydrocortisone or resuscitation."},
    {"ids": ["batch-medicine-final-439-p2395-q27", "medicine-final-439-endocrinology-q027"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-lina"], "explanation": "Linagliptin is largely eliminated by nonrenal routes and generally does not require a renal dose adjustment. This distinguishes it from several other DPP-4 inhibitors listed."},
    {"ids": ["batch-medicine-final-439-p2404-q28", "medicine-final-439-endocrinology-q028"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes-meds", "dka"], "explanation": "SGLT2 inhibitors can be associated with ketoacidosis even with glucose below typical DKA ranges. A clinician should still check ketones and acid–base status when symptoms fit, especially with illness, fasting or inadequate insulin."},
    {"ids": ["batch-medicine-final-439-p2413-q29", "medicine-final-439-endocrinology-q029"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["cm438-an-ldl"], "explanation": "LDL may be elevated during active anorexia nervosa despite restricted intake. The lipid pattern can shift with nutritional rehabilitation. Elevated LDL alone does not establish an eating disorder."},
    {"ids": ["batch-medicine-final-439-p2429-q31", "medicine-final-439-endocrinology-q031"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["prolactinoma"], "explanation": "Galactorrhea, amenorrhea and markedly high prolactin with a 9-mm pituitary lesion support a symptomatic microprolactinoma. A dopamine agonist usually lowers prolactin and shrinks the adenoma."},
    {"ids": ["batch-medicine-final-439-p2438-q32", "medicine-final-439-endocrinology-q032"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["diabetes"], "explanation": "Young age, a lean phenotype and progression to insulin make type 1 diabetes plausible among these choices. Metformin failure alone is insufficient. Islet autoantibodies and C-peptide in context help distinguish autoimmune diabetes from type 2 diabetes or MODY."},
    {"ids": ["batch-medicine-final-439-p2455-q34"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-neurop"], "explanation": "Adults with type 1 diabetes should receive an initial dilated examination within five years of onset. In type 2 diabetes, screen at diagnosis because hyperglycemia can predate recognition."},
    {"ids": ["batch-medicine-final-439-p2472-q36", "medicine-final-439-endocrinology-q036"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["cushing"], "explanation": "Proximal muscle weakness and easy bruising are more specific clues to cortisol excess than common findings such as obesity and diabetes. Ask about prescribed glucocorticoids before considering testing for endogenous Cushing syndrome."},
    {"ids": ["batch-medicine-final-439-p2481-q37", "medicine-final-439-neurology-q037"], "answers": [], "ungradedReason": "The source records two keys. LP timing versus antibiotic timing depends on whether LP can be done promptly and safely.", "confidence": "tentative", "references": ["meningitis"], "explanation": "Neck stiffness and photophobia warrant assessment for meningitis. Perform LP promptly if safe, ideally before antibiotics when that causes no meaningful delay. Start empiric therapy without waiting if LP or imaging will delay treatment."},
    {"ids": ["batch-medicine-final-439-p2491-q38", "medicine-final-439-neurology-q038"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-edmd"], "explanation": "Emery–Dreifuss muscular dystrophy can cause early conduction disease, arrhythmia and cardiomyopathy. Cardiac surveillance includes ECG, ambulatory monitoring and echocardiography. The disease can have different inheritance patterns, including X-linked forms."},
    {"ids": ["batch-medicine-final-439-p2499-q39", "medicine-final-439-neurology-q039"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-myosit"], "explanation": "A violaceous upper-eyelid heliotrope rash, sometimes with periorbital edema, is characteristic of dermatomyositis. Gottron lesions are another high-specificity skin clue; malar rash and general photosensitivity are less specific."},
    {"ids": ["batch-medicine-final-439-p2508-q40", "medicine-final-439-neurology-q040"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-tics"], "explanation": "Brief recurrent movements beginning in childhood, with a premonitory urge and ability to suppress or repeat them, are typical of tics. Chorea is more flowing and random, while dystonia produces longer postures or sustained twisting."},
    {"ids": ["batch-medicine-final-439-p2517-q41", "medicine-final-439-neurology-q041"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["pd"], "explanation": "Early recurrent falls are atypical for uncomplicated early idiopathic Parkinson disease. In someone with parkinsonism they raise concern for a different syndrome. Rest tremor and small handwriting support parkinsonism but do not carry the same warning."},
    {"ids": ["batch-medicine-final-439-p2526-q42", "medicine-final-439-neurology-q042"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-encephalitis"], "explanation": "Acute personality change and meningism suggest encephalitis, including HSV. Early empiric IV acyclovir improves outcomes in HSV encephalitis and should not wait for HSV PCR when suspicion is sufficient. Possible bacterial meningitis still requires its own assessment."},
    {"ids": ["batch-medicine-final-439-p2536-q43", "medicine-final-439-neurology-q043"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-carotid"], "explanation": "Neck pain after minor trauma followed by right weakness and aphasia suggests left carotid artery dissection with ischemia in the left MCA territory. CTA or MRA can test the vascular diagnosis. Thrombolysis decisions depend on timing and contraindications."},
    {"ids": ["batch-medicine-final-439-p2544-q44", "medicine-final-439-neurology-q044"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-ms2024"], "explanation": "Periventricular lesions are a classic MRI location in MS. Lesions can also occur in cortical or juxtacortical, infratentorial and spinal regions, so periventricular location is the characteristic option rather than the only possible site."},
    {"ids": ["batch-medicine-final-439-p2553-q45", "medicine-final-439-neurology-q045"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["meningitis"], "explanation": "Pneumococcus is an important cause of community-acquired bacterial meningitis in this adult age group. Meningococcus is also possible. Age and clinical findings guide empiric coverage, while cultures or PCR identify the organism."},
    {"ids": ["batch-medicine-final-439-p2561-q46", "medicine-final-439-neurology-q046"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["epilepsy-preg"], "explanation": "Lamotrigine is often a preferred antiseizure medication in pregnancy when appropriate for the patient's epilepsy, with lower fetal risk than valproate. Do not abruptly stop or substitute effective therapy without assessing seizure control. Levels may change across pregnancy."},
    {"ids": ["batch-medicine-final-439-p2569-q47", "medicine-final-439-neurology-q047"], "answers": ["D"], "ungradedReason": "", "confidence": "supported", "references": ["r-front"], "explanation": "Brief nocturnal hypermotor seizures with repetitive pedaling or bicycling movements often arise in frontal networks. Similar patterns can occasionally originate elsewhere, so observed semiology guides but does not prove localization."},
    {"ids": ["batch-medicine-final-439-p2576-q48", "medicine-final-439-neurology-q048"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["delirium"], "explanation": "A sudden decline over days with abnormal arousal and impaired thinking is typical of delirium. A chronic dementia does not by itself explain such rapid change. Identify precipitating infection, medication, metabolic disturbances or other acute illness."},
    {"ids": ["batch-medicine-final-439-p2584-q49", "medicine-final-439-neurology-q049"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-cmt"], "explanation": "Longstanding symptoms dating to childhood with distal weakness and sensory loss support a chronic length-dependent sensorimotor neuropathy, such as an inherited neuropathy. Distal symmetric sensory loss with weakness best describes the pattern."},
    {"ids": ["batch-medicine-final-439-p2592-q50", "medicine-final-439-neurology-q050"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-l5"], "explanation": "Weak dorsiflexion, inversion and eversion with associated back and leg pain can localize to L5. Inversion weakness matters because an isolated common fibular neuropathy usually spares the tibialis posterior. S1 involvement would more often weaken plantarflexion."},
    {"ids": ["batch-medicine-final-439-p2600-q51", "medicine-final-439-neurology-q051"], "answers": [], "ungradedReason": "The vignette does not establish a cause of meningitis. The source asks for treatment specific to TB without enough clinical support.", "confidence": "tentative", "references": ["r-tbdiag", "meningitis"], "explanation": "A cranial nerve palsy and lymphocytic CSF can occur in TB meningitis, but they are not diagnostic. Negative early testing does not completely exclude TB, and normal glucose and protein weaken the classic pattern. If clinical suspicion is high after further work-up, TB-directed therapy with corticosteroids may be indicated."},
    {"ids": ["batch-medicine-final-439-p2609-q52", "medicine-final-439-neurology-q052"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["stroke", "vascular-cognition"], "explanation": "Left visual-field and body deficits localize to the right hemisphere. A right hemispheric lesion more often causes left hemispatial neglect, in which the patient fails to attend to stimuli on that side even beyond the primary field defect."},
    {"ids": ["batch-medicine-final-439-p2619-q53"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-lems"], "explanation": "Proximal leg weakness and reduced reflexes with marked brief improvement after repeated effort point to Lambert–Eaton myasthenic syndrome. This facilitation reflects increased transmitter release with activity. Electrodiagnostic testing and evaluation for associated malignancy are appropriate."},
    {"ids": ["batch-medicine-final-439-p2628-q54", "medicine-final-439-neurology-q054"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-trauma"], "explanation": "A dense extra-axial collection confined by skull sutures favors an epidural hemorrhage. An anterior collection can cross the midline at the superior sagittal region. The shape and full CT series add certainty; meningeal symptoms alone do not localize the blood."},
    {"ids": ["batch-medicine-final-439-p2636-q55", "medicine-final-439-neurology-q055"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["nmosd"], "explanation": "Aquaporin-4 IgG is the characteristic biomarker of AQP4-positive NMOSD. Severe optic neuritis raises this possibility, and a cell-based assay helps distinguish it from other inflammatory optic neuropathies."},
    {"ids": ["batch-medicine-final-439-p2648-q56", "medicine-final-439-hematology-oncology-q056"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["r-hemo"], "explanation": "With a prolonged aPTT but normal PT, a mixing study can help distinguish a factor deficiency from an inhibitor after confirming the result. Mucocutaneous bleeding also warrants evaluation for von Willebrand disease, which may lower factor VIII."},
    {"ids": ["batch-medicine-final-439-p2657-q57", "medicine-final-439-hematology-oncology-q057"], "answers": ["D"], "ungradedReason": "The wording says associated, and a subset of ALL also carries this fusion. CML is the characteristic association.", "confidence": "tentative", "references": ["r-cml"], "explanation": "The BCR::ABL1 fusion is the defining molecular feature of chronic myeloid leukemia in a compatible clinical setting. It also occurs in a subset of acute lymphoblastic leukemia, so the fusion alone does not establish the disease lineage."},
    {"ids": ["batch-medicine-final-439-p2666-q58", "medicine-final-439-hematology-oncology-q058"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-chemoprev"], "explanation": "A selective estrogen receptor modulator given to an eligible high-risk person to lower future breast cancer incidence is risk-reducing medication, also called chemoprevention. A negative mammogram alone does not finish evaluation of concerning nipple changes."},
    {"ids": ["batch-medicine-final-439-p2684-q60", "medicine-final-439-hematology-oncology-q060"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-lymphclass"], "explanation": "CD30 and CD15 together support classic Hodgkin lymphoma when the biopsy has characteristic Reed–Sternberg cells and appropriate architecture. MYC expression alone does not define the lineage or establish Burkitt lymphoma."},
    {"ids": ["batch-medicine-final-439-p2693-q61", "medicine-final-439-hematology-oncology-q061"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-lymphclass"], "explanation": "Large CD20-positive B cells with an aggressive presentation support diffuse large B-cell lymphoma among the options. MYC and BCL2 protein positivity does not prove a double rearrangement. Cytogenetic or FISH testing can distinguish relevant high-grade categories."},
    {"ids": ["batch-medicine-final-439-p2712-q63", "medicine-final-439-hematology-oncology-q063"], "answers": ["C"], "ungradedReason": "", "confidence": "supported", "references": ["r-breastmass"], "explanation": "A painful lump should not be dismissed because breast cancer can be painful or painless. At age 38, targeted ultrasound and diagnostic mammography can both be appropriate depending on the examination and risk. The listed imaging option is preferable to reassurance without evaluation or tumor markers."},
    {"ids": ["batch-medicine-final-439-p2721-q64", "medicine-final-439-hematology-oncology-q064"], "answers": ["A"], "ungradedReason": "", "confidence": "supported", "references": ["r-breastmass"], "explanation": "Normal examination and concordant negative ultrasound and mammography can be reassuring if clinical concern is low. Give follow-up instructions and reassess if the apparent lump persists, grows or remains clinically suspicious."},
    {"ids": ["batch-medicine-final-439-p2739-q66", "medicine-final-439-hematology-oncology-q066"], "answers": ["B"], "ungradedReason": "", "confidence": "supported", "references": ["iron"], "explanation": "The original CBC shows hemoglobin 9.7, MCV 69.7 and an elevated RDW of 18.4, supporting microcytic anemia with variable cell size. Iron deficiency is the best fit among these choices. Ferritin and iron studies help distinguish iron deficiency from thalassemia or other causes."},
  ];
  const byId = new Map(entries.flatMap(review => review.ids.map(id => [id, review])));

  window.GIFT445_AUDIT_MEDICINE_FINAL = bank => bank.map(source => {
    if (source.subjectId !== "medicine" || source.assessment !== "Final") return source;
    const patch = sourcePatches[source.id];
    const review = byId.get(source.id);
    if (!review) return patch ? { ...source, ...patch } : source;

    const question = patch ? { ...source, ...patch } : source;
    const { answers, confidence, explanation, ungradedReason } = review;
    const { objection, ...previousReview } = question.medicineReview || {};
    const key = [].concat(question.sourceAnswer || []).filter(Boolean);
    const gradingAnswers = ungradedReason ? [] : key;
    return {
      ...question,
      medicineFinalAudit: true,
      verification: ungradedReason ? "needs-review" : "supported",
      giftReview: {
        ...question.giftReview,
        policy: "gift-key-first",
        gradingAnswers,
        possibleAnswers: answers,
        ungradedReason
      },
      medicineReview: {
        ...previousReview,
        basis: previousReview.evidence ? previousReview.basis : "clinical",
        answers,
        confidence,
        explanation,
        references: review.references.map(id => references[id])
      }
    };
  });
})();
