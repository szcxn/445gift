/* Original Gift MID question tables, including nested cells.
   Source units and values are preserved. Clinical interpretations remain separate. */
(() => {
  const patches = {
  "medicine-midterm-442-nephrology-q039": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gasses",
            "pH 7.20"
          ],
          [
            "P02",
            "100 mmHg"
          ],
          [
            "НСОЗ",
            "7mmol/L"
          ],
          [
            "Na",
            "138 mmol/L"
          ],
          [
            "K",
            "3.9 mmol/L"
          ],
          [
            "Cl",
            "95 mmol/L"
          ]
        ],
        "sourceBatch": "442",
        "questionNumber": 39
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "C",
    "verification": "supported",
    "reviewOpinion": "The restored results show acidemia (pH 7.20), bicarbonate 7 mmol/L and an anion gap of 138 - (95 + 7) = 36 mmol/L. This establishes high-anion-gap metabolic acidosis; the diabetic presentation suggests DKA. PaCO2 is not recorded in this source table, so respiratory compensation cannot be checked.",
    "explanation": "The restored results show acidemia (pH 7.20), bicarbonate 7 mmol/L and an anion gap of 138 - (95 + 7) = 36 mmol/L. This establishes high-anion-gap metabolic acidosis; the diabetic presentation suggests DKA. PaCO2 is not recorded in this source table, so respiratory compensation cannot be checked.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-441-cardiology-q035": {
    "sourceTables": [
      {
        "rows": [
          [
            "Fluid analysis"
          ],
          [
            "Color",
            "Pus"
          ],
          [
            "Cell count",
            "17,000 celled mainly polymorph"
          ],
          [
            "pH",
            "7.1"
          ],
          [
            "glucose",
            "20 mg/dl"
          ],
          [
            "protein fluid and serum ratio",
            "0.9"
          ],
          [
            "LDH fluid and serum ratio",
            "1.2"
          ],
          [
            "culture",
            "pending"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 35
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "supported",
    "reviewOpinion": "The restored pleural-fluid table explicitly records pus, confirming empyema. A predominantly polymorphonuclear cell count of 17,000, pH 7.1, glucose 20 mg/dL and high fluid-to-serum protein and LDH ratios also support infected exudative fluid. Empyema is a diagnosis, not an investigation.",
    "explanation": "The restored pleural-fluid table explicitly records pus, confirming empyema. A predominantly polymorphonuclear cell count of 17,000, pH 7.1, glucose 20 mg/dL and high fluid-to-serum protein and LDH ratios also support infected exudative fluid. Empyema is a diagnosis, not an investigation.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "BTS 2023 — Pleural disease guideline",
        "url": "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/"
      }
    ]
  },
  "medicine-midterm-441-nephrology-q041": {
    "sourceTables": [
      {
        "rows": [
          [
            "serum creatinine",
            "100 mmol/L"
          ],
          [
            "serum albumin",
            "36 g/L"
          ],
          [
            "urine albumin/creatinine ratio",
            "1000 mg/g"
          ],
          [
            "HbA1c",
            "8.2%"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 41
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "C",
    "verification": "needs-review",
    "reviewOpinion": "Urine ACR 1000 mg/g establishes severe albuminuria despite maximal irbesartan; HbA1c is 8.2%. Empagliflozin is the expected additional kidney-protective choice in T2DM with CKD if eGFR is suitable. The source records creatinine as 100 mmol/L, an implausible unit/value combination; it is preserved, not silently changed to micromol/L. Confirm kidney function before applying the recommendation.",
    "explanation": "Urine ACR 1000 mg/g establishes severe albuminuria despite maximal irbesartan; HbA1c is 8.2%. Empagliflozin is the expected additional kidney-protective choice in T2DM with CKD if eGFR is suitable. The source records creatinine as 100 mmol/L, an implausible unit/value combination; it is preserved, not silently changed to micromol/L. Confirm kidney function before applying the recommendation.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "KDIGO 2024 — CKD guideline",
        "url": "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
      }
    ]
  },
  "medicine-midterm-441-nephrology-q042": {
    "sourceTables": [
      {
        "rows": [
          [
            "Serum creatinine",
            "70 mcmol/L"
          ],
          [
            "Serum potassium",
            "3.7 mmol/L"
          ],
          [
            "Serum sodium",
            "140 mmol/L"
          ],
          [
            "Urine albumin/creatinine ratio",
            "450 mg/g"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 42
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "D",
    "verification": "supported",
    "reviewOpinion": "Urine ACR 450 mg/g supplies the previously omitted evidence of severe albuminuria. In a patient with diabetes and persistent hypertension, an ARB is the best listed choice for blood pressure and kidney protection. The restored potassium is 3.7 mmol/L; potassium and creatinine require monitoring after starting treatment.",
    "explanation": "Urine ACR 450 mg/g supplies the previously omitted evidence of severe albuminuria. In a patient with diabetes and persistent hypertension, an ARB is the best listed choice for blood pressure and kidney protection. The restored potassium is 3.7 mmol/L; potassium and creatinine require monitoring after starting treatment.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "KDIGO 2024 — CKD guideline",
        "url": "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
      }
    ]
  },
  "medicine-midterm-441-nephrology-q044": {
    "sourceTables": [
      {
        "rows": [
          [
            "Serum sodium",
            "125 mEq/L"
          ],
          [
            "Creatinine",
            "120 μmol/l"
          ],
          [
            "Urine sodium",
            "85 meq/L"
          ],
          [
            "Urine osmolality",
            "600 mOsm/Kg"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 44
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "D",
    "verification": "needs-review",
    "reviewOpinion": "The restored sodium is 125 mEq/L, urine sodium 85 mEq/L and urine osmolality 600 mOsm/kg. In an apparently euvolemic patient, this pattern favors SIADH over water excess or diabetes insipidus. Measured serum osmolality and exclusion of adrenal and thyroid disease are still needed to establish SIADH; smoking alone does not prove it.",
    "explanation": "The restored sodium is 125 mEq/L, urine sodium 85 mEq/L and urine osmolality 600 mOsm/kg. In an apparently euvolemic patient, this pattern favors SIADH over water excess or diabetes insipidus. Measured serum osmolality and exclusion of adrenal and thyroid disease are still needed to establish SIADH; smoking alone does not prove it.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — SIADH",
        "url": "https://www.merckmanuals.com/professional/nephrology/electrolyte-disorders/syndrome-of-inappropriate-adh-secretion-siadh"
      }
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q052": {
    "sourceTables": [
      {
        "rows": [
          [
            "Sodium",
            "108 mmol/l"
          ],
          [
            "creatinine",
            "90 mmol/l"
          ],
          [
            "potassium",
            "3.5 mmol/l"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 52
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "C",
    "verification": "supported",
    "reviewOpinion": "Sodium 108 mmol/L together with a seizure and obtundation establishes severe symptomatic hyponatremia. The best initial listed treatment is 3% saline with urgent monitored correction. Alcohol use and possible malnutrition increase concern for osmotic demyelination. The source creatinine unit is implausible and remains reproduced as recorded.",
    "explanation": "Sodium 108 mmol/L together with a seizure and obtundation establishes severe symptomatic hyponatremia. The best initial listed treatment is 3% saline with urgent monitored correction. Alcohol use and possible malnutrition increase concern for osmotic demyelination. The source creatinine unit is implausible and remains reproduced as recorded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Society for Endocrinology — Emergency management of severe symptomatic hyponatraemia",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5314809/"
      }
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q057": {
    "sourceTables": [
      {
        "rows": [
          [
            "WBC",
            "9 x 10 9 L"
          ],
          [
            "Hb",
            "12.5 pg/dL"
          ],
          [
            "PLT",
            "301 x 10 3 /L"
          ],
          [
            "ALT",
            "61 U/L"
          ],
          [
            "AST",
            "84 U/L"
          ],
          [
            "ALP",
            "130 IU/L"
          ],
          [
            "GGT",
            "Nrmal"
          ],
          [
            "Total bilirubin is Normal"
          ]
        ],
        "sourceBatch": "441",
        "questionNumber": 57
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "supported",
    "reviewOpinion": "The restored table records ALT 61 U/L, AST 84 U/L, ALP 130 IU/L, normal GGT and normal bilirubin. With recurrent severe upper-abdominal pain and no peritonism, initial abdominal ultrasound is the best listed test for a possible biliary cause. Some blood-count units in the source are implausible; these are preserved and should not be interpreted literally.",
    "explanation": "The restored table records ALT 61 U/L, AST 84 U/L, ALP 130 IU/L, normal GGT and normal bilirubin. With recurrent severe upper-abdominal pain and no peritonism, initial abdominal ultrasound is the best listed test for a possible biliary cause. Some blood-count units in the source are implausible; these are preserved and should not be interpreted literally.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "ASGE — Choledocholithiasis guideline",
        "url": "https://www.asge.org/home/resources/publications/guidelines/asge-guideline-on-the-role-of-endoscopy-in-the-evaluation-and-management-of-choledocholithiasis"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q035": {
    "sourceTables": [
      {
        "rows": [
          [
            "Serum sodium",
            "126 mEq/L"
          ],
          [
            "Serum creatinine",
            "175 mEq/L"
          ],
          [
            "Urine osmolality",
            "1000 mOsml/kg"
          ],
          [
            "Urine sodium concentration",
            "4mEq/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 35
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "B",
    "verification": "supported",
    "reviewOpinion": "Sodium 126 mEq/L, urine sodium 4 mEq/L and urine osmolality 1000 mOsm/kg, together with vomiting and orthostatic hypotension, support hypovolemic hyponatremia with appropriate renal sodium conservation. Isotonic 0.9% saline is the best listed treatment. The source creatinine unit is inconsistent and is not corrected by inference.",
    "explanation": "Sodium 126 mEq/L, urine sodium 4 mEq/L and urine osmolality 1000 mOsm/kg, together with vomiting and orthostatic hypotension, support hypovolemic hyponatremia with appropriate renal sodium conservation. Isotonic 0.9% saline is the best listed treatment. The source creatinine unit is inconsistent and is not corrected by inference.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Hyponatremia",
        "url": "https://www.merckmanuals.com/professional/nephrology/electrolyte-disorders/hyponatremia"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q036": {
    "sourceTables": [
      {
        "rows": [
          [
            "Sodium",
            "108 mmol/L"
          ],
          [
            "Creatinine",
            "90 umol/L"
          ],
          [
            "Potassium",
            "3.5 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 36
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "D",
    "verification": "supported",
    "reviewOpinion": "The restored sodium of 108 mmol/L explains the seizure and obtundation as severe symptomatic hyponatremia. Intravenous 3% saline is the best initial listed treatment, with close sodium monitoring and avoidance of excessive correction. Alcohol dependence increases the risk of osmotic demyelination.",
    "explanation": "The restored sodium of 108 mmol/L explains the seizure and obtundation as severe symptomatic hyponatremia. Intravenous 3% saline is the best initial listed treatment, with close sodium monitoring and avoidance of excessive correction. Alcohol dependence increases the risk of osmotic demyelination.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Society for Endocrinology — Emergency management of severe symptomatic hyponatraemia",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5314809/"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q037": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gases",
            "pH 7.47"
          ],
          [
            "PO2",
            "86 mmHg"
          ],
          [
            "PaCO2",
            "45 mmHg"
          ],
          [
            "HCO3",
            "34 mmol/L"
          ],
          [
            "Na",
            "142 mmol/L"
          ],
          [
            "K",
            "3.0 mmol/L"
          ],
          [
            "Cl",
            "85 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 37
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "supported",
    "reviewOpinion": "The restored pH 7.47 and bicarbonate 34 mmol/L demonstrate metabolic alkalosis. Potassium 3.0 mmol/L and chloride 85 mmol/L support diuretic-associated potassium and chloride depletion. PaCO2 45 mmHg is near the expected compensatory range; the primary process is metabolic alkalosis.",
    "explanation": "The restored pH 7.47 and bicarbonate 34 mmol/L demonstrate metabolic alkalosis. Potassium 3.0 mmol/L and chloride 85 mmol/L support diuretic-associated potassium and chloride depletion. PaCO2 45 mmHg is near the expected compensatory range; the primary process is metabolic alkalosis.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q038": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gases",
            "pH 7.20"
          ],
          [
            "PO2",
            "100 mmHg"
          ],
          [
            "PaCO2",
            "20 mmHg"
          ],
          [
            "HCO3",
            "7 mmol/L"
          ],
          [
            "Na",
            "138 mmol/L"
          ],
          [
            "K",
            "3.9 mmol/L"
          ],
          [
            "Cl",
            "95 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 38
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "C",
    "verification": "supported",
    "reviewOpinion": "Bicarbonate 7 mmol/L and pH 7.20 demonstrate metabolic acidosis. The anion gap is 138 - (95 + 7) = 36 mmol/L, so it is a high-anion-gap disorder. Type 1 diabetes and the clinical presentation suggest DKA. PaCO2 20 mmHg is within Winter's expected range of 18.5 +/- 2 mmHg.",
    "explanation": "Bicarbonate 7 mmol/L and pH 7.20 demonstrate metabolic acidosis. The anion gap is 138 - (95 + 7) = 36 mmol/L, so it is a high-anion-gap disorder. Type 1 diabetes and the clinical presentation suggest DKA. PaCO2 20 mmHg is within Winter's expected range of 18.5 +/- 2 mmHg.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q039": {
    "sourceTables": [
      {
        "rows": [
          [
            "Serum Sodium",
            "146 mmol"
          ],
          [
            "Creatinine",
            "75 umol/L"
          ],
          [
            "Urine osmolality",
            "80 mOsmol/kg"
          ],
          [
            "Glucose",
            "11 mmol/l"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 39
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "supported",
    "reviewOpinion": "The source table confirms sodium 146 mmol, urine osmolality 80 mOsmol/kg and glucose 11 mmol/L. Profoundly dilute urine despite an elevated serum sodium favors impaired ADH effect and diabetes insipidus. The glucose elevation does not explain urine this dilute; distinguishing central from nephrogenic DI requires further evaluation.",
    "explanation": "The source table confirms sodium 146 mmol, urine osmolality 80 mOsmol/kg and glucose 11 mmol/L. Profoundly dilute urine despite an elevated serum sodium favors impaired ADH effect and diabetes insipidus. The glucose elevation does not explain urine this dilute; distinguishing central from nephrogenic DI requires further evaluation.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Arginine Vasopressin Deficiency",
        "url": "https://www.merckmanuals.com/professional/endocrine-and-metabolic-disorders/pituitary-disorders/arginine-vasopressin-deficiency-central-diabetes-insipidus"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q040": {
    "sourceTables": [
      {
        "rows": [
          [
            "Sodium concentration",
            "126 mmol/L"
          ],
          [
            "Potassium concentration",
            "3.8 mmol/L"
          ],
          [
            "Chloride concentration",
            "96 mmol/L"
          ],
          [
            "Bicarbonate level",
            "24 mmol/L"
          ],
          [
            "serum urea",
            "2.1 mmol/L"
          ],
          [
            "Glucose and creatinine levels",
            "Normal"
          ],
          [
            "Serum osmolality",
            "258 mOsm/L"
          ],
          [
            "Urinary sodium",
            "56 mEq/L"
          ],
          [
            "Urinary osmolality",
            "360 mOsm/kg"
          ],
          [
            "Thyroid function tests",
            "Within normal limits"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 40
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "Sodium 126 mmol/L and serum osmolality 258 mOsm/L establish hypotonic hyponatremia. Urine osmolality 360 mOsm/kg, urine sodium 56 mEq/L and normal thyroid tests support an SIADH-like pattern, making fluid restriction the expected listed choice. Adrenal disease still needs exclusion, and choices C and D are genuinely absent from this source. The question remains ungraded.",
    "explanation": "Sodium 126 mmol/L and serum osmolality 258 mOsm/L establish hypotonic hyponatremia. Urine osmolality 360 mOsm/kg, urine sodium 56 mEq/L and normal thyroid tests support an SIADH-like pattern, making fluid restriction the expected listed choice. Adrenal disease still needs exclusion, and choices C and D are genuinely absent from this source. The question remains ungraded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — SIADH",
        "url": "https://www.merckmanuals.com/professional/nephrology/electrolyte-disorders/syndrome-of-inappropriate-adh-secretion-siadh"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q041": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gases",
            "pH 7.25"
          ],
          [
            "PO2",
            "101 mmHg"
          ],
          [
            "PaCO2",
            "31 mmHg"
          ],
          [
            "HCO3",
            "17 mmol/L"
          ],
          [
            "Na",
            "134 mmol/L"
          ],
          [
            "K",
            "3.4 mmol/L"
          ],
          [
            "Cl",
            "104 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 41
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "D",
    "verification": "needs-review",
    "reviewOpinion": "The source bicarbonate is 17 mmol/L, chloride 104 mmol/L and sodium 134 mmol/L, giving an anion gap of 13 mmol/L. Acetazolamide-associated bicarbonate loss favors normal-anion-gap metabolic acidosis as the intended answer. However, pH 7.25, PaCO2 31 mmHg and bicarbonate 17 mmol/L are not mutually consistent under the Henderson-Hasselbalch equation. The original values are preserved and the item remains ungraded.",
    "explanation": "The source bicarbonate is 17 mmol/L, chloride 104 mmol/L and sodium 134 mmol/L, giving an anion gap of 13 mmol/L. Acetazolamide-associated bicarbonate loss favors normal-anion-gap metabolic acidosis as the intended answer. However, pH 7.25, PaCO2 31 mmHg and bicarbonate 17 mmol/L are not mutually consistent under the Henderson-Hasselbalch equation. The original values are preserved and the item remains ungraded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q042": {
    "sourceTables": [
      {
        "rows": [
          [
            "Serum Creatinine",
            "68 mmol/L"
          ],
          [
            "Serum Potassium",
            "3.9 mmol/L"
          ],
          [
            "Serum Sodium",
            "138 mmol/L"
          ],
          [
            "Urine albumin/creatinine ratio",
            "350 mg/g (was 100mg/g a year ago)"
          ],
          [
            "HbA1c",
            "6.8%"
          ],
          [
            "LDL",
            "1.8 mmol/L"
          ],
          [
            "Triglyceride",
            "1.2 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 42
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "The restored ACR of 350 mg/g, rising from 100 mg/g, supplies evidence of severe albuminuria and supports an ARB as the expected kidney-protective choice even without high blood pressure. The source simultaneously describes type 1 diabetes and oral diabetes drugs, and records creatinine as 68 mmol/L. These unresolved source inconsistencies are preserved; the item remains ungraded.",
    "explanation": "The restored ACR of 350 mg/g, rising from 100 mg/g, supplies evidence of severe albuminuria and supports an ARB as the expected kidney-protective choice even without high blood pressure. The source simultaneously describes type 1 diabetes and oral diabetes drugs, and records creatinine as 68 mmol/L. These unresolved source inconsistencies are preserved; the item remains ungraded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "KDIGO 2024 — CKD guideline",
        "url": "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q043": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gases",
            "pH 7.21"
          ],
          [
            "PO2",
            "61.5 mmHg"
          ],
          [
            "PaCO2",
            "83 mmHg"
          ],
          [
            "HCO3",
            "34 mmol/L"
          ],
          [
            "Renal panel Na",
            "140 mmol/L"
          ],
          [
            "K",
            "4.7 mmol/L"
          ],
          [
            "Cl",
            "94 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 43
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "B",
    "verification": "needs-review",
    "reviewOpinion": "The restored pH 7.21 and PaCO2 83 mmHg establish respiratory acidosis; bicarbonate 34 mmol/L indicates renal buffering and suggests a chronic component. Obesity hypoventilation fits the context. The time course and exact mixed-disorder assessment cannot be established from this record, and choice D is absent from the original source. B is the expected choice, with grading withheld.",
    "explanation": "The restored pH 7.21 and PaCO2 83 mmHg establish respiratory acidosis; bicarbonate 34 mmol/L indicates renal buffering and suggests a chronic component. Obesity hypoventilation fits the context. The time course and exact mixed-disorder assessment cannot be established from this record, and choice D is absent from the original source. B is the expected choice, with grading withheld.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q044": {
    "sourceTables": [
      {
        "rows": [
          [
            "Arterial blood gases",
            "pH 7.49"
          ],
          [
            "PO2",
            "100 mmHg"
          ],
          [
            "PaCO2",
            "12 mmHg"
          ],
          [
            "HCO3",
            "49 mmol/L"
          ],
          [
            "K",
            "4.7 mmol/L"
          ],
          [
            "Cl",
            "94 mmol/L"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 44
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "Vomiting and the reported bicarbonate of 49 mmol/L favor metabolic alkalosis as the intended answer. However, the source PaCO2 of 12 mmHg and pH 7.49 are incompatible with that bicarbonate under the Henderson-Hasselbalch equation; low PaCO2 also points toward a respiratory alkalosis component. These values are reproduced unchanged. A single primary disturbance cannot be safely graded from this inconsistent set.",
    "explanation": "Vomiting and the reported bicarbonate of 49 mmol/L favor metabolic alkalosis as the intended answer. However, the source PaCO2 of 12 mmHg and pH 7.49 are incompatible with that bicarbonate under the Henderson-Hasselbalch equation; low PaCO2 also points toward a respiratory alkalosis component. These values are reproduced unchanged. A single primary disturbance cannot be safely graded from this inconsistent set.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Acid-Base Disorders",
        "url": "https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q057": {
    "sourceTables": [
      {
        "rows": [
          [
            "WBC: 9x10 9 /L",
            "AST 298 IU/L"
          ],
          [
            "Hemoglobin: 12.5 g/dL",
            "ALP 150 IU/L"
          ],
          [
            "PLT: 301 x 10 9 /L",
            "GGT 150 IU/L"
          ],
          [
            "ALT 150 IU/L",
            "Total bilirubin is normal"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 57
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "B",
    "verification": "supported",
    "reviewOpinion": "The restored table shows AST 298 IU/L, ALT 150 IU/L, ALP 150 IU/L and GGT 150 IU/L, with normal bilirubin. These abnormal liver tests raise intermediate suspicion of a duct stone despite no duct dilation on ultrasound. MRCP is the best listed next investigation; there is no stated cholangitis, imaged duct stone or other high-risk indication for direct ERCP.",
    "explanation": "The restored table shows AST 298 IU/L, ALT 150 IU/L, ALP 150 IU/L and GGT 150 IU/L, with normal bilirubin. These abnormal liver tests raise intermediate suspicion of a duct stone despite no duct dilation on ultrasound. MRCP is the best listed next investigation; there is no stated cholangitis, imaged duct stone or other high-risk indication for direct ERCP.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "ASGE — Choledocholithiasis guideline",
        "url": "https://www.asge.org/home/resources/publications/guidelines/asge-guideline-on-the-role-of-endoscopy-in-the-evaluation-and-management-of-choledocholithiasis"
      }
    ]
  },
  "medicine-midterm-439-nephrology-q058": {
    "sourceTables": [
      {
        "rows": [
          [
            "ALP: 300 IU/L",
            "Direct bilirubin: 50 mg/dL"
          ],
          [
            "GGT: 100 IU/L",
            "WCC: 12 x 10 9 /L"
          ],
          [
            "ALT: 1200 U/L",
            "Hgb: 13 gm/dL"
          ],
          [
            "AST: 900 U/L",
            "PLT: 290"
          ],
          [
            "Total bilirubin: 60 mg/dL"
          ]
        ],
        "sourceBatch": "439",
        "questionNumber": 58
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "supported",
    "reviewOpinion": "The restored ALT 1200 U/L and AST 900 U/L, in the setting of septic shock, support acute hypoxic or ischemic liver injury as the best listed diagnosis. The source also records marked hyperbilirubinemia, which merits assessment for concurrent sepsis-related cholestasis and other causes. Serial results and clinical context are needed to confirm the diagnosis.",
    "explanation": "The restored ALT 1200 U/L and AST 900 U/L, in the setting of septic shock, support acute hypoxic or ischemic liver injury as the best listed diagnosis. The source also records marked hyperbilirubinemia, which merits assessment for concurrent sepsis-related cholestasis and other causes. Serial results and clinical context are needed to confirm the diagnosis.",
    "reviewedOn": "2026-10-05"
  },
  "medicine-midterm-438-pulmonary-q021": {
    "sourceTables": [
      {
        "rows": [
          [
            "Color",
            "Turbid"
          ],
          [
            "Cells",
            "Mostly PMNs"
          ],
          [
            "pH",
            "7.5"
          ],
          [
            "Glucose",
            "20"
          ],
          [
            "Protein fluid to serum ratio",
            "0.8"
          ],
          [
            "LDH fluid to serum ratio",
            "0.9"
          ]
        ],
        "sourceBatch": "438",
        "questionNumber": 21
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "The source now shows turbid, predominantly PMN fluid, glucose 20, protein ratio 0.8 and LDH ratio 0.9, supporting an infected exudate associated with pneumonia. It records pH 7.5, without a glucose unit, frank pus or positive culture. Parapneumonic effusion is the best broad listed category; empyema is not established merely by turbidity. The discordant pH and glucose require reassessment, so the item remains ungraded.",
    "explanation": "The source now shows turbid, predominantly PMN fluid, glucose 20, protein ratio 0.8 and LDH ratio 0.9, supporting an infected exudate associated with pneumonia. It records pH 7.5, without a glucose unit, frank pus or positive culture. Parapneumonic effusion is the best broad listed category; empyema is not established merely by turbidity. The discordant pH and glucose require reassessment, so the item remains ungraded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "BTS 2023 — Pleural disease guideline",
        "url": "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/"
      }
    ]
  },
  "medicine-midterm-438-nephrology-q032": {
    "sourceTables": [
      {
        "rows": [
          [
            "BP",
            "hypotensive"
          ],
          [
            "HR",
            "tachycardia"
          ],
          [
            "Temperature",
            "High"
          ],
          [
            "Sodium",
            "Low"
          ]
        ],
        "sourceBatch": "438",
        "questionNumber": 32
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "The restored table explicitly records hypotension, tachycardia, high temperature and low sodium. With edema and a large positive fluid balance, impaired renal water excretion is the likely intended mechanism of dilutional hyponatremia. The source provides no numerical sodium, serum or urine osmolality, so the precise mechanism cannot be confirmed.",
    "explanation": "The restored table explicitly records hypotension, tachycardia, high temperature and low sodium. With edema and a large positive fluid balance, impaired renal water excretion is the likely intended mechanism of dilutional hyponatremia. The source provides no numerical sodium, serum or urine osmolality, so the precise mechanism cannot be confirmed.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "Merck Manual Professional — Hyponatremia",
        "url": "https://www.merckmanuals.com/professional/nephrology/electrolyte-disorders/hyponatremia"
      }
    ]
  },
  "medicine-midterm-438-nephrology-q041": {
    "sourceTables": [
      {
        "rows": [
          [
            "BP",
            "Normal"
          ],
          [
            "Creatinine",
            "60"
          ],
          [
            "SpO2",
            "97%"
          ],
          [
            "Albumin Creatinine Ratio",
            "450 mg/g"
          ],
          [
            "Na",
            "138"
          ],
          [
            "K",
            "3.9"
          ],
          [
            "HbA1C",
            "6.8%"
          ]
        ],
        "sourceBatch": "438",
        "questionNumber": 41
      }
    ],
    "tableSource": {
      "filename": "Copy of MID.docx",
      "sha256": "46f8c8c07aa2631b71db60d11762f9356e0ad8281037b6da631574665ac21752"
    },
    "aiAnswer": "A",
    "verification": "needs-review",
    "reviewOpinion": "The restored table records normal blood pressure, ACR 450 mg/g, potassium 3.9 and HbA1c 6.8%. Severe albuminuria supports an ARB as the best listed kidney-protective choice even without hypertension. Monitor creatinine and potassium. The creatinine value 60 has no unit and choice D is absent from the original source, so the item remains ungraded.",
    "explanation": "The restored table records normal blood pressure, ACR 450 mg/g, potassium 3.9 and HbA1c 6.8%. Severe albuminuria supports an ARB as the best listed kidney-protective choice even without hypertension. Monitor creatinine and potassium. The creatinine value 60 has no unit and choice D is absent from the original source, so the item remains ungraded.",
    "reviewedOn": "2026-10-05",
    "references": [
      {
        "title": "KDIGO 2024 — CKD guideline",
        "url": "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
      }
    ]
  }
};
  for (const question of window.GIFT445_QUESTIONS || []) {
    if (question.subjectId === "medicine" && question.assessment === "Midterm" && patches[question.id]) Object.assign(question, patches[question.id]);
  }
  window.GIFT445_MID_SOURCE_TABLE_COUNTS = { questions: 22, tables: 22, nestedTables: 12, auditedSourceOccurrences: 695 };
})();
