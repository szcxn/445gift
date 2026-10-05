/* Medicine MID 444: Nephrology and Gastroenterology, reviewed 2026-10-05.
   Explicit concept anchors; PDF pages include the cover. Original bank keys are immutable.
   Related teaching material is distinguished from exact support in evidence notes.
   Missing labs/options and non-unique choices remain ungraded. */
(() => {
  const lectureFiles = {
  "Hypertension": [
    "1_dy4GfUD6SBHNCumY_HRMbt6cY2_ZXKW",
    "Hypertension"
  ],
  "Acid–Base Disorders": [
    "1O_LvJvUEmy4sP8vzo0L8pid0VKK5ZieV",
    "Acid–Base Disorders"
  ],
  "Sodium Disorders": [
    "1E9_qaYaRC_HFjX4TpKtm8GNe0cjb4kyo",
    "Electrolyte Imbalance I — Sodium Disorders"
  ],
  "Acute Kidney Injury": [
    "1nhXmxlOTe8gHMAfdmaFlpVaf2pQaxc9r",
    "Acute Kidney Injury"
  ],
  "Potassium and Calcium Disorders": [
    "17UACHWXWWZAUiTlKeltN5fYqSjrN_lkt",
    "Electrolyte Imbalance II — Potassium and Calcium"
  ],
  "Chronic Kidney Disease": [
    "1hQTZlWUidirIDofWH03W2EUaLpGYbH1v",
    "Chronic Kidney Injury"
  ],
  "Glomerular Diseases": [
    "17tswsOTMldBxMAoOb7_SL9Ca5MMbbeV-",
    "Glomerular Diseases"
  ],
  "Gastrointestinal Bleeding": [
    "1yPmz7Wr7nMmvXx66n8qtaKKNTD-vy9uE",
    "Gastrointestinal Bleeding"
  ],
  "Abdominal Pain Including IBS": [
    "1Qriuhbb34zoe496wiWlOMtZSxmVe-Tze",
    "Abdominal Pain Including IBS"
  ],
  "Liver Cirrhosis and Complications": [
    "1pvxa6sWYbW_hGJoY25P97bvklm2_tdYj",
    "Liver Cirrhosis and Complications"
  ],
  "Chronic Diarrhea Including Celiac Disease": [
    "1cz5o2-_TM0RqXZBfVet5Ii0Gt9pkgjlr",
    "Chronic Diarrhea Including Celiac Disease"
  ],
  "Non-Alcoholic Fatty Liver": [
    "1GwgVEYGMF_4EodwkOaHLxTWcSvSIewON",
    "Non-Alcoholic Fatty Liver"
  ],
  "Abnormal Liver Enzymes with Selected Common Liver Diseases": [
    "16cjsaT65dFurwEmh8PdIU8S1X1xUCXJz",
    "Abnormal Liver Enzymes with Selected Common Liver Diseases"
  ],
  "Esophageal Diseases": [
    "1KtPBFP9GmjyqXXMjasa5lxn5aJxFRZkO",
    "Esophageal Diseases"
  ]
};
  const lectureSequence = {
  "Nephrology": [
    "Hypertension",
    "Acid–Base Disorders",
    "Sodium Disorders",
    "Acute Kidney Injury",
    "Potassium and Calcium Disorders",
    "Chronic Kidney Disease",
    "Glomerular Diseases"
  ],
  "Gastroenterology": [
    "Gastrointestinal Bleeding",
    "Abdominal Pain Including IBS",
    "Liver Cirrhosis and Complications",
    "Chronic Diarrhea Including Celiac Disease",
    "Non-Alcoholic Fatty Liver",
    "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "Esophageal Diseases"
  ]
};
  const guidelines = {
  "htn": [
    "AHA/ACC 2025 — BP thresholds and cardiovascular risk",
    "https://professional.heart.org/en/guidelines-and-statements/prevent-calculator"
  ],
  "htn-confirm": [
    "NICE — confirming hypertension with ABPM/HBPM",
    "https://www.nice.org.uk/guidance/ng136/chapter/recommendations"
  ],
  "ckd": [
    "KDIGO 2024 — CKD management, RAAS and SGLT2",
    "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
  ],
  "gn": [
    "KDIGO — Glomerular Diseases guidance",
    "https://kdigo.org/guidelines/gd/"
  ],
  "lupus": [
    "KDIGO 2024 — Lupus Nephritis",
    "https://kdigo.org/guidelines/lupus-nephritis/"
  ],
  "sodium": [
    "ESE/ESICM/ERA guideline — hyponatraemia diagnosis and correction",
    "https://academic.oup.com/ejendo/article/170/3/G1/6668028"
  ],
  "potassium": [
    "UK Kidney Association — Hyperkalaemia guideline",
    "https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults-0"
  ],
  "aki": [
    "NICE NG148 — AKI investigation and urgent ultrasound",
    "https://www.nice.org.uk/guidance/ng148/chapter/Recommendations"
  ],
  "anemia": [
    "KDIGO 2026 — Anemia in CKD",
    "https://kdigo.org/wp-content/uploads/2026/01/KDIGO-2026-Anemia-in-CKD-Guideline.pdf"
  ],
  "mbd": [
    "KDIGO 2017 — CKD mineral and bone disorder",
    "https://kdigo.org/wp-content/uploads/2026/04/KDIGO-2017-CKD-MBD-Guideline.pdf"
  ],
  "renal-artery": [
    "ACR — Renovascular Hypertension appropriateness criteria",
    "https://acsearch.acr.org/list/TopicNarrativePdf?topicId=38"
  ],
  "pregnancy-uti": [
    "ACOG 2023 — Urinary Tract Infections in Pregnancy",
    "https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2023/08/urinary-tract-infections-in-pregnant-individuals"
  ],
  "masld": [
    "EASL–EASD–EASO 2024 — MASLD guideline",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC11299976/"
  ],
  "mash-fda": [
    "FDA — Semaglutide approval for MASH, August 2025",
    "https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-treatment-serious-liver-disease-known-mash"
  ],
  "hp": [
    "ACG 2024 — H. pylori treatment and test of cure",
    "https://gi.org/journals-publications/ebgi/schoenfeld_sep2024/"
  ],
  "bleed": [
    "ACG 2021 — Upper Gastrointestinal and Ulcer Bleeding",
    "https://pubmed.ncbi.nlm.nih.gov/33929377/"
  ],
  "variceal": [
    "Baveno VII — Acute variceal bleeding recommendations",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC11090185/"
  ],
  "biliary": [
    "ASGE — Choledocholithiasis guideline",
    "https://www.asge.org/home/resources/publications/guidelines/asge-guideline-on-the-role-of-endoscopy-in-the-evaluation-and-management-of-choledocholithiasis"
  ],
  "pancreatitis": [
    "ACG 2024 — Acute Pancreatitis guideline highlights",
    "https://webfiles.gi.org/links/journals/AJG-Clinical-Guidelines-Highlights-Acute-Pancreatitis-2024-FINAL.pdf"
  ],
  "ibd": [
    "AGA — Medical treatment of perianal fistulizing Crohn’s disease",
    "https://gastro.org/clinical-guidance/medical-management-of-moderate-to-severe-luminal-and-perianal-fistulizing-crohns-disease/"
  ],
  "ibs": [
    "ACG — IBS treatment and soluble fiber",
    "https://ibstreatment.gi.org/Home/TreatmentCheckList"
  ],
  "gerd": [
    "ACG 2022 — GERD diagnosis and management",
    "https://pmc.ncbi.nlm.nih.gov/articles/8754510/"
  ],
  "esophagus-tests": [
    "ACG — Esophageal physiologic testing",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC9468980/"
  ],
  "psc": [
    "AASLD — PSC and cholangiocarcinoma guidance",
    "https://www.aasld.org/practice-guidelines/primary-sclerosing-cholangitis-and-cholangiocarcinoma"
  ],
  "hbv": [
    "CDC — HBV infection and partner immunization",
    "https://www.cdc.gov/std/treatment-guidelines/hbv.htm"
  ],
  "acetaminophen": [
    "NIH LiverTox — Acetaminophen at therapeutic doses",
    "https://www.ncbi.nlm.nih.gov/books/NBK548162/"
  ],
  "celiac": [
    "ACG — Celiac disease testing and gluten-free diet",
    "https://gi.org/topics/celiac-non-celiac-gluten-sensitivity-gluten-free-diets/"
  ],
  "sibo": [
    "ACG 2020 — Small Intestinal Bacterial Overgrowth",
    "https://doi.org/10.14309/ajg.0000000000000501"
  ],
  "acid": [
    "NEJM 2014 — Physiological Assessment of Acid–Base Disturbances",
    "https://anest.ufl.edu/wordpress/files/2021/06/AcidBase2.pdf"
  ],
  "ibd-eim": [
    "ECCO 2024 — Extraintestinal Manifestations in IBD",
    "https://academic.oup.com/ecco-jcc/article/18/1/1/7205776"
  ],
  "uc": [
    "ACG 2025 — Ulcerative Colitis guideline update",
    "https://doi.org/10.14309/ajg.0000000000003463"
  ]
};
  const reviews = {
  "medicine-midterm-443-nephrology-q034": {
    "lecture": "Hypertension",
    "page": 9,
    "topic": "Hypertensive emergency",
    "status": "supported",
    "answer": "C",
    "opinion": "Visual symptoms and headache with severe hypertension require urgent assessment for acute organ injury. IV labetalol is appropriate if a hypertensive emergency is established, rather than for an elevated reading alone.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-443-nephrology-q041": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Stage 1 and lifestyle",
    "status": "supported",
    "answer": "B",
    "opinion": "A low-risk young person with BP 135/85 initially needs lifestyle measures and follow-up after confirming the readings. Later medication depends on persistent elevation and risk.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-443-nephrology-q043": {
    "lecture": "Hypertension",
    "page": 8,
    "topic": "Adherence and home readings",
    "status": "supported",
    "answer": "C",
    "opinion": "Antihypertensives should be taken regularly as prescribed, rather than only when an isolated reading is high. Education and regular home monitoring support control."
  },
  "medicine-midterm-441-nephrology-q042": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "Diabetes and RAAS blockade",
    "status": "needs-review",
    "answer": "D",
    "opinion": "An ARB is suitable for hypertension, with RAAS blockade particularly relevant when albuminuria is present. The referenced laboratory table is unavailable; albuminuria must not be assumed.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-439-nephrology-q031": {
    "lecture": "Hypertension",
    "page": 9,
    "topic": "Confirming hypertension",
    "status": "supported",
    "answer": "B",
    "opinion": "An elevated reading at a first visit requires confirmation with home measurements or ABPM. This reading alone does not establish sustained hypertension or justify indefinite treatment."
  },
  "medicine-midterm-439-nephrology-q034": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Diabetic BP target",
    "status": "supported",
    "answer": "B",
    "opinion": "The usual BP target in diabetes is below 130/80 if tolerated, using accurate measurement and balancing symptoms and adverse effects."
  },
  "medicine-midterm-438-nephrology-q040": {
    "lecture": "Hypertension",
    "page": 7,
    "topic": "Ambulatory BP thresholds",
    "status": "supported",
    "answer": "C",
    "opinion": "A 24-hour mean of 137/75 exceeds the lecture's ABPM systolic threshold of 130. Heart rate monitor in the stem appears to be a transcription error for BP monitoring."
  },
  "medicine-midterm-438-nephrology-q043": {
    "lecture": "Hypertension",
    "page": 10,
    "topic": "Hypertensive heart disease",
    "status": "supported",
    "answer": "A",
    "opinion": "Chronic hypertension promotes cardiac hypertrophy, atrial enlargement and AF risk. AF is the best listed option."
  },
  "medicine-midterm-436-nephrology-q051": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Stage 1 risk-based care",
    "status": "supported",
    "answer": "C",
    "opinion": "BP 139/87 falls within Stage 1 under the US classification. Lifestyle measures are a suitable starting point at low risk, with follow-up and assessment of medication needs.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-436-nephrology-q053": {
    "lecture": "Hypertension",
    "page": 9,
    "topic": "Confirmation and organ assessment",
    "status": "needs-review",
    "answer": null,
    "opinion": "AV nicking and S4 suggest chronic effects and warrant organ assessment. There is no rule requiring exactly three visits; appropriate BP confirmation should precede the decision.",
    "sources": [
      "htn-confirm"
    ]
  },
  "medicine-midterm-436-nephrology-q054": {
    "lecture": "Hypertension",
    "page": 6,
    "topic": "RAAS and BP",
    "status": "supported",
    "answer": "A",
    "opinion": "RAAS activation increases vascular resistance and sodium and water retention, raising BP. This matches the mechanism in the recorded option."
  },
  "medicine-midterm-436-nephrology-q055": {
    "lecture": "Hypertension",
    "page": 13,
    "topic": "Cardiovascular risk assessment",
    "status": "supported",
    "answer": "C",
    "opinion": "Stage 1 hypertension requires cardiovascular risk assessment, lifestyle measures and confirmation of readings. Risk and comorbidities guide the timing of medication.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-436-nephrology-q056": {
    "lecture": "Hypertension",
    "page": 6,
    "topic": "RAAS and BP",
    "status": "needs-review",
    "answer": "B",
    "opinion": "B, increased RAAS activity, raises BP. Reduced heart rate and increased parasympathetic activity do not explain the elevation. Parts of the stem and options are corrupted.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-436-nephrology-q058": {
    "lecture": "Hypertension",
    "page": 4,
    "topic": "Secondary hypertension",
    "status": "supported",
    "answer": "B",
    "opinion": "Kidney disease is an important cause of secondary hypertension. Evaluation uses the history, urinalysis, kidney function and imaging when indicated."
  },
  "medicine-midterm-436-nephrology-q060": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Medication threshold",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Confirmed repeated systolic BP of 140 warrants medication plus lifestyle measures under AHA/ACC 2025 guidance. C is a valid component of care; D is a possible drug choice but not the only mandatory class. The must-do wording does not provide one complete plan.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-436-nephrology-q065": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Diabetic BP target",
    "status": "supported",
    "answer": "A",
    "opinion": "BP 150/100 with diabetes requires control. The usual target is below 130/80 when safely achievable, with home BP follow-up."
  },
  "medicine-midterm-436-git-hepatobiliary-q075": {
    "lecture": "Hypertension",
    "page": 4,
    "topic": "Secondary hypertension",
    "status": "supported",
    "answer": "A",
    "opinion": "Kidney disease is a recognized cause of secondary hypertension, unlike primary hypertension risk factors such as obesity and inactivity."
  },
  "medicine-midterm-435-cardiology-q005": {
    "lecture": "Hypertension",
    "page": 10,
    "topic": "Hypertension complications",
    "status": "supported",
    "answer": "A",
    "opinion": "Chronic hypertension can cause ventricular hypertrophy and atrial enlargement, increasing AF risk. AF is the best listed option rather than PE or DVT."
  },
  "medicine-midterm-435-nephrology-q033": {
    "lecture": "Hypertension",
    "page": 5,
    "topic": "Secondary hypertension",
    "status": "supported",
    "answer": "B",
    "opinion": "Conn's syndrome, primary aldosteronism, causes secondary hypertension through sodium retention and may produce hypokalemia. Evaluate with an aldosterone-to-renin ratio when appropriate."
  },
  "medicine-midterm-435-nephrology-q034": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "Diuretic electrolyte monitoring",
    "status": "conflict",
    "answer": null,
    "opinion": "Thiazide monitoring requires serum sodium, potassium and creatinine. Urine Na/K is not equivalent; no option specifies the complete required blood monitoring.",
    "sources": [
      "htn"
    ]
  },
  "medicine-midterm-435-nephrology-q035": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Diabetic BP target",
    "status": "supported",
    "answer": "C",
    "opinion": "Different office and home readings require accurate repeated measurements. The usual diabetes target is below 130/80 when tolerated."
  },
  "medicine-midterm-434-cardiology-q021": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Diabetic BP target",
    "status": "supported",
    "answer": "B",
    "opinion": "The lecture gives 130/80 as the usual treatment target in diabetes. Distinguish a treatment target from the diagnostic threshold for hypertension."
  },
  "medicine-midterm-434-nephrology-q035": {
    "lecture": "Hypertension",
    "page": 9,
    "topic": "Confirming hypertension",
    "status": "conflict",
    "answer": "A",
    "opinion": "Hypertension is confirmed by repeated BP measurements or ABPM/HBPM. Urinalysis evaluates renal injury or causes; it does not itself confirm elevated BP.",
    "sources": [
      "htn-confirm"
    ]
  },
  "medicine-midterm-434-nephrology-q036": {
    "lecture": "Hypertension",
    "page": 15,
    "topic": "Combination therapy",
    "status": "supported",
    "answer": "D",
    "opinion": "A thiazide plus an ACE inhibitor is a reasonable listed combination. Drug selection also depends on kidney function, albuminuria, tolerance and comorbidities."
  },
  "medicine-midterm-434-nephrology-q037": {
    "lecture": "Hypertension",
    "page": 10,
    "topic": "Hypertension complications",
    "status": "supported",
    "answer": "A",
    "opinion": "Chronic hypertension increases AF risk through cardiac injury and atrial enlargement. AF is the best option; hypertension alone does not usually cause pericardial effusion."
  },
  "medicine-midterm-433-nephrology-q034": {
    "lecture": "Hypertension",
    "page": 12,
    "topic": "Young-onset secondary hypertension",
    "status": "supported",
    "answer": "C",
    "opinion": "Persistent hypertension at age 25 warrants evaluation for secondary causes. Kidney function, urinalysis and targeted assessment should precede an assumption of primary hypertension."
  },
  "medicine-midterm-433-nephrology-q035": {
    "lecture": "Hypertension",
    "page": 5,
    "topic": "Secondary hypertension",
    "status": "supported",
    "answer": "D",
    "opinion": "Conn's syndrome, primary aldosteronism, causes secondary hypertension through sodium retention and may produce hypokalemia. Evaluate with an aldosterone-to-renin ratio when appropriate."
  },
  "medicine-midterm-433-nephrology-q038": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "Kidney protection and BP control",
    "status": "supported",
    "answer": "B",
    "opinion": "BP control slows proteinuric kidney disease. An ACE inhibitor or ARB is often selected with albuminuria, with potassium and creatinine monitoring."
  },
  "medicine-midterm-432-cardiology-q010": {
    "lecture": "Hypertension",
    "page": 4,
    "topic": "Secondary hypertension",
    "status": "supported",
    "answer": "D",
    "opinion": "Obstructive sleep apnea is a cause of secondary hypertension. Snoring, sleepiness and obesity guide its evaluation."
  },
  "medicine-midterm-432-cardiology-q012": {
    "lecture": "Hypertension",
    "page": 10,
    "topic": "Hypertensive heart disease",
    "status": "supported",
    "answer": "A",
    "opinion": "Chronic hypertension, cardiac hypertrophy and atrial enlargement increase AF risk. Aortic dissection is a possible vascular complication, but not the requested pattern of hypertensive heart disease."
  },
  "medicine-midterm-432-nephrology-q028": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "Diabetes with proteinuria",
    "status": "supported",
    "answer": "A",
    "opinion": "An ACE inhibitor is appropriate for diabetes with hypertension and proteinuria. Monitor kidney function and potassium after initiation or dose escalation."
  },
  "medicine-midterm-432-nephrology-q029": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "CKD and RAAS blockade",
    "status": "supported",
    "answer": "A",
    "opinion": "An ACE inhibitor is useful particularly in CKD with albuminuria, rather than in every case of renal failure. Consider AKI and hyperkalemia and monitor creatinine.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-431-cardiology-q005": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "Asthma and antihypertensive selection",
    "status": "supported",
    "answer": "D",
    "opinion": "Amlodipine is suitable for hypertension in asthma. Beta-blockers, especially nonselective agents, may affect the airways; furosemide is not a routine first-line choice without congestion."
  },
  "medicine-midterm-431-cardiology-q006": {
    "lecture": "Hypertension",
    "page": 4,
    "topic": "Coarctation assessment",
    "status": "supported",
    "answer": "A",
    "opinion": "Hypertension in a young woman with an interscapular murmur suggests aortic coarctation. Compare upper- and lower-limb BP and assess the femoral pulses."
  },
  "medicine-midterm-431-cardiology-q012": {
    "lecture": "Hypertension",
    "page": 16,
    "topic": "ACE inhibitor cough",
    "status": "supported",
    "answer": "D",
    "opinion": "ACE inhibitors can cause dry cough through bradykinin accumulation. Review medication and exclude other causes before attributing the cough to the drug."
  },
  "medicine-midterm-431-nephrology-q036": {
    "lecture": "Hypertension",
    "page": 5,
    "topic": "Renovascular hypertension imaging",
    "status": "needs-review",
    "answer": null,
    "opinion": "Unequal kidney sizes and a bruit suggest renal artery stenosis. Initial evaluation is usually noninvasive with Doppler or suitable CTA/MRA; catheter angiography is reserved for selected cases.",
    "sources": [
      "renal-artery"
    ]
  },
  "medicine-midterm-430-cardiology-q007": {
    "lecture": "Hypertension",
    "page": 14,
    "topic": "Confirmed severe hypertension",
    "status": "supported",
    "answer": "C",
    "opinion": "Repeated BP of 200/100 warrants treatment and assessment for organ injury. Emergency IV treatment depends on acute injury, rather than the number alone."
  },
  "medicine-midterm-443-nephrology-q035": {
    "lecture": "Sodium Disorders",
    "page": 14,
    "topic": "Hyponatremia after brain injury",
    "status": "supported",
    "answer": "A",
    "opinion": "Urine osmolality helps evaluate hyponatremia after brain injury alongside serum osmolality and volume status. Hyponatremia does not fit the usual DI presentation."
  },
  "medicine-midterm-443-nephrology-q036": {
    "lecture": "Sodium Disorders",
    "page": 9,
    "topic": "Pseudohyponatremia",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Sodium 121 with normal measured osmolality suggests pseudohyponatremia. Check proteins, lipids and the sodium measurement method before confirming it.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-443-nephrology-q044": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Severe symptomatic hyponatremia",
    "status": "supported",
    "answer": "C",
    "opinion": "Seizures with established hyponatremia after excessive water intake warrant controlled 3% saline with monitoring. Initial improvement does not justify rapid normalization of sodium."
  },
  "medicine-midterm-442-nephrology-q032": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Exercise-associated hyponatremia",
    "status": "needs-review",
    "answer": null,
    "opinion": "Collapse and a seizure after a marathon do not by themselves establish hyponatremia. Missing sodium, glucose and water-intake details prevent confirming 3% saline as the answer.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-442-nephrology-q034": {
    "lecture": "Sodium Disorders",
    "page": 12,
    "topic": "SIADH criteria",
    "status": "supported",
    "answer": "B",
    "opinion": "Hypotonic hyponatremia with inappropriately concentrated urine and high urine sodium supports SIADH after assessing volume status and excluding adrenal and thyroid insufficiency."
  },
  "medicine-midterm-442-nephrology-q035": {
    "lecture": "Sodium Disorders",
    "page": 9,
    "topic": "Protein-related pseudohyponatremia",
    "status": "supported",
    "answer": "D",
    "opinion": "Normal osmolality and elevated serum protein without symptoms support pseudohyponatremia. Confirm with direct sodium measurement when needed."
  },
  "medicine-midterm-441-nephrology-q040": {
    "lecture": "Sodium Disorders",
    "page": 17,
    "topic": "Insufficient free water",
    "status": "supported",
    "answer": "A",
    "opinion": "Tube feeding with little free water and gradually rising sodium without marked polyuria supports inadequate water intake, rather than automatically indicating DI."
  },
  "medicine-midterm-441-nephrology-q043": {
    "lecture": "Sodium Disorders",
    "page": 17,
    "topic": "Central diabetes insipidus",
    "status": "supported",
    "answer": "A",
    "opinion": "A rise in urine osmolality exceeding 50% after vasopressin supports central ADH deficiency. Renal resistance does not produce this clear response."
  },
  "medicine-midterm-441-nephrology-q044": {
    "lecture": "Sodium Disorders",
    "page": 12,
    "topic": "SIADH criteria",
    "status": "needs-review",
    "answer": null,
    "opinion": "Smoking history alone does not establish SIADH. The referenced serum and urine osmolality and sodium table is missing, so the diagnosis cannot be confirmed.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-441-nephrology-q045": {
    "lecture": "Sodium Disorders",
    "page": 10,
    "topic": "Effective osmolality versus urea",
    "status": "conflict",
    "answer": "B",
    "opinion": "Urea is an ineffective osmole for tonicity. With urea 18 mmol/L, estimated tonicity is 280−18=262: this is hypotonic hyponatremia, rather than isotonic hyponatremia as the key states.",
    "sources": [
      "sodium"
    ],
    "note": "This page classifies hyponatremia by tonicity. The distinction between measured osmolality and urea's ineffective osmotic contribution is explained in the review and external reference; the bank key is not accepted automatically."
  },
  "medicine-midterm-441-git-hepatobiliary-q052": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Seizure with missing sodium result",
    "status": "needs-review",
    "answer": null,
    "opinion": "3% saline is appropriate if severe hyponatremia is established as the cause of the seizure. The laboratory table is missing; alcohol use and a seizure alone do not establish that cause.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-439-nephrology-q030": {
    "lecture": "Sodium Disorders",
    "page": 9,
    "topic": "Lipemic pseudohyponatremia",
    "status": "supported",
    "answer": "C",
    "opinion": "A lipemic specimen can produce pseudohyponatremia. Serum osmolality and direct sodium measurement distinguish it from true hyponatremia."
  },
  "medicine-midterm-439-nephrology-q033": {
    "lecture": "Sodium Disorders",
    "page": 17,
    "topic": "Impaired thirst and water access",
    "status": "supported",
    "answer": "D",
    "opinion": "Poor skin turgor and sodium 168 in a nursing-home resident support water deficit from impaired thirst or access. Also assess fluid losses and urine findings."
  },
  "medicine-midterm-439-nephrology-q035": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Volume-depleted hyponatremia",
    "status": "supported",
    "answer": "B",
    "opinion": "Vomiting, poor skin turgor and orthostatic hypotension support hypovolemia. Isotonic saline is appropriate to restore circulation, with sodium monitoring."
  },
  "medicine-midterm-439-nephrology-q036": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Seizure with missing sodium result",
    "status": "needs-review",
    "answer": null,
    "opinion": "The key assumes severe symptomatic hyponatremia, but the referenced values are absent. 3% saline cannot be endorsed definitively without them.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-439-nephrology-q039": {
    "lecture": "Sodium Disorders",
    "page": 17,
    "topic": "Dilute urine in hypernatremia",
    "status": "supported",
    "answer": "A",
    "opinion": "Very dilute urine with polyuria and elevated sodium suggests impaired ADH effect or DI. Distinguishing central from nephrogenic DI requires further testing."
  },
  "medicine-midterm-439-nephrology-q040": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Fluid restriction with missing labs",
    "status": "needs-review",
    "answer": null,
    "opinion": "Water restriction may treat SIADH, but the sodium and osmolality table and two options are missing. The history alone does not confirm the plan.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-438-nephrology-q032": {
    "lecture": "Sodium Disorders",
    "page": 11,
    "topic": "Hyponatremia in shock and fluid overload",
    "status": "needs-review",
    "answer": null,
    "opinion": "Shock and fluid retention can increase ADH and reduce water excretion. Saline administration and limited urine output alone do not establish the mechanism of hyponatremia; the table is missing.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-438-nephrology-q034": {
    "lecture": "Sodium Disorders",
    "page": 17,
    "topic": "Insufficient free water",
    "status": "supported",
    "answer": "A",
    "opinion": "Limited free water during tube feeding explains hypernatremia and hypovolemia. Restore perfusion first if unstable, then replace the water deficit cautiously."
  },
  "medicine-midterm-436-nephrology-q050": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Ascites and low effective volume",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Ascites does not exclude intravascular volume depletion. Saline may be appropriate for genuine hypovolemia, but assess congestion and the cause before administering it automatically.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-436-nephrology-q062": {
    "lecture": "Sodium Disorders",
    "page": 3,
    "topic": "Isotonic crystalloid distribution",
    "status": "supported",
    "answer": "C",
    "opinion": "In the teaching model, 2 L of saline remains extracellular after equilibration: approximately 0.5 L intravascular and 1.5 L interstitial. Ongoing hemorrhage does not always follow these fixed proportions."
  },
  "medicine-midterm-434-cardiology-q007": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Hypovolemic shock resuscitation",
    "status": "supported",
    "answer": "B",
    "opinion": "Diarrhea with severe hypotension requires an isotonic crystalloid to restore circulation. Hypotonic solutions are not initial resuscitation fluids."
  },
  "medicine-midterm-432-nephrology-q025": {
    "lecture": "Sodium Disorders",
    "page": 15,
    "topic": "Safe sodium correction limit",
    "status": "conflict",
    "answer": null,
    "opinion": "Raising Na from 114 to 126 is a 12 mmol/L increase in 24 hours, exceeding the European limit of 10 on day one and 8 thereafter. No option gives the appropriate limit; 118 may represent an initial symptom-relief target only.",
    "sources": [
      "sodium"
    ]
  },
  "medicine-midterm-442-nephrology-q039": {
    "lecture": "Acid–Base Disorders",
    "page": 9,
    "topic": "Diabetic ketoacidosis",
    "status": "needs-review",
    "answer": "C",
    "opinion": "Diabetes with polyuria, abdominal pain and deep breathing suggests DKA with high-anion-gap metabolic acidosis. Glucose, ketones and blood gases are required for confirmation.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-439-nephrology-q037": {
    "lecture": "Acid–Base Disorders",
    "page": 13,
    "topic": "Diuretic metabolic alkalosis",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Thiazides and furosemide can cause metabolic alkalosis through volume and chloride depletion. The absent blood-gas table prevents checking compensation or a mixed disorder.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-439-nephrology-q038": {
    "lecture": "Acid–Base Disorders",
    "page": 9,
    "topic": "Diabetic ketoacidosis",
    "status": "needs-review",
    "answer": "C",
    "opinion": "The symptoms in type 1 diabetes support DKA, but the referenced blood-gas values are missing. The anion gap and compensation cannot be calculated from this stem.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-439-nephrology-q041": {
    "lecture": "Acid–Base Disorders",
    "page": 10,
    "topic": "Acetazolamide bicarbonate loss",
    "status": "supported",
    "answer": "D",
    "opinion": "Acetazolamide increases bicarbonate loss and causes normal-anion-gap metabolic acidosis. Hypokalemia may accompany it."
  },
  "medicine-midterm-439-nephrology-q043": {
    "lecture": "Acid–Base Disorders",
    "page": 6,
    "topic": "Hypoventilation and respiratory acidosis",
    "status": "needs-review",
    "answer": "B",
    "opinion": "Obesity-related hypoventilation causes CO2 retention and respiratory acidosis. Without the blood-gas table, acute, chronic and mixed disorders cannot be distinguished.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-439-nephrology-q044": {
    "lecture": "Acid–Base Disorders",
    "page": 13,
    "topic": "Vomiting and metabolic alkalosis",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Vomiting causes gastric acid loss and may produce metabolic alkalosis. The missing blood-gas values are needed to verify the diagnosis and compensation.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-438-nephrology-q036": {
    "lecture": "Acid–Base Disorders",
    "page": 10,
    "topic": "Normal-gap metabolic acidosis",
    "status": "supported",
    "answer": "B",
    "opinion": "AG=134−(106+17)=11. Bicarbonate loss with acetazolamide causes normal-anion-gap metabolic acidosis, rather than high-anion-gap acidosis."
  },
  "medicine-midterm-438-nephrology-q038": {
    "lecture": "Acid–Base Disorders",
    "page": 16,
    "topic": "Mixed respiratory and metabolic acidosis",
    "status": "conflict",
    "answer": null,
    "opinion": "Elevated CO2 with low HCO3 and acidemia is not compensation for respiratory acidosis, which raises HCO3. This is a mixed acidosis; no such option is listed.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-437-nephrology-q026": {
    "lecture": "Acid–Base Disorders",
    "page": 17,
    "topic": "Anion gap and Winter formula",
    "status": "supported",
    "answer": "D",
    "opinion": "Elevated glucose, low bicarbonate and a raised anion gap support DKA. Compare PaCO2 with Winter's formula to assess compensation."
  },
  "medicine-midterm-436-nephrology-q052": {
    "lecture": "Acid–Base Disorders",
    "page": 4,
    "topic": "Internally inconsistent blood gas",
    "status": "needs-review",
    "answer": null,
    "opinion": "pH 7.49, PCO2 12 and HCO3 49 are inconsistent with the Henderson–Hasselbalch equation. Correct the printed values before classifying the disorder.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-436-nephrology-q057": {
    "lecture": "Acid–Base Disorders",
    "page": 8,
    "topic": "Acute respiratory alkalosis",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Acute hyperventilation lowers CO2 and slightly lowers HCO3, making D the closest answer. The printed pH is not fully consistent with the CO2/HCO3 values and requires checking.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-436-nephrology-q059": {
    "lecture": "Acid–Base Disorders",
    "page": 18,
    "topic": "Septic lactic acidosis",
    "status": "supported",
    "answer": "C",
    "opinion": "Septic shock with HCO3=8 and a raised anion gap suggests lactic metabolic acidosis. PaCO2=19 is close to the Winter's formula prediction of 20±2."
  },
  "medicine-midterm-436-nephrology-q061": {
    "lecture": "Acid–Base Disorders",
    "page": 18,
    "topic": "Septic lactic acidosis",
    "status": "supported",
    "answer": "C",
    "opinion": "AG=139−(99+8)=32. PaCO2=19 falls within the expected 20±2, supporting high-anion-gap metabolic acidosis with appropriate compensation."
  },
  "medicine-midterm-435-nephrology-q040": {
    "lecture": "Acid–Base Disorders",
    "page": 6,
    "topic": "Sedative-induced respiratory acidosis",
    "status": "supported",
    "answer": "D",
    "opinion": "Opioids and sedatives can suppress ventilation and raise CO2. Acute respiratory acidosis causes only a small bicarbonate increase."
  },
  "medicine-midterm-430-nephrology-q027": {
    "lecture": "Acid–Base Disorders",
    "page": 17,
    "topic": "DKA with compensation check",
    "status": "supported",
    "answer": "B",
    "opinion": "Glucose 24 and an anion gap of 26 support DKA. HCO3=13 predicts PaCO2 about 27.5±2 by Winter's formula; CO2=32 is higher, and the printed pH is inconsistent. This should not be called normal compensation.",
    "sources": [
      "acid"
    ]
  },
  "medicine-midterm-443-nephrology-q037": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 8,
    "topic": "Reduced renal potassium excretion",
    "status": "supported",
    "answer": "A",
    "opinion": "CKD reduces renal potassium excretion. K=6.2 with peaked T waves requires urgent treatment and medication review, even when the question asks only about the cause."
  },
  "medicine-midterm-443-nephrology-q039": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 12,
    "topic": "Vitamin D malabsorption",
    "status": "supported",
    "answer": "C",
    "opinion": "Crohn's disease and bowel resection can cause vitamin D malabsorption and hypocalcemia. Chvostek and Trousseau signs support this."
  },
  "medicine-midterm-443-nephrology-q042": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 6,
    "topic": "Thiazide-induced potassium loss",
    "status": "supported",
    "answer": "B",
    "opinion": "Thiazides increase distal sodium delivery and potassium loss, explaining hypokalemia better than ACE inhibitors or ARBs, which can raise potassium."
  },
  "medicine-midterm-437-nephrology-q024": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 8,
    "topic": "Calcium for ECG changes",
    "status": "supported",
    "answer": "A",
    "opinion": "IV calcium protects the heart in hyperkalemia with ECG changes. It does not lower K; intracellular shifting and potassium removal are also needed.",
    "sources": [
      "potassium"
    ]
  },
  "medicine-midterm-434-nephrology-q034": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 5,
    "topic": "Insulin and potassium shift",
    "status": "supported",
    "answer": "C",
    "opinion": "Insulin activates Na/K-ATPase and shifts potassium into cells. Give glucose as appropriate and monitor blood glucose; insulin does not remove potassium from the body."
  },
  "medicine-midterm-433-nephrology-q031": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 12,
    "topic": "Hypocalcemia after parathyroidectomy",
    "status": "supported",
    "answer": "A",
    "opinion": "Low PTH after parathyroidectomy can cause hypocalcemia; hungry bone syndrome may also contribute. The brief stem does not distinguish the mechanisms."
  },
  "medicine-midterm-433-nephrology-q032": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 5,
    "topic": "Insulin and Na/K-ATPase",
    "status": "supported",
    "answer": "D",
    "opinion": "Insulin activates the Na/K-ATPase pump, shifting K into cells. Gate in the question refers to the pump."
  },
  "medicine-midterm-433-nephrology-q036": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 4,
    "topic": "Beta-2 potassium shift",
    "status": "supported",
    "answer": "B",
    "opinion": "Salbutamol shifts K into cells through β2 stimulation and may cause hypokalemia. This is a temporary redistribution rather than total-body potassium loss."
  },
  "medicine-midterm-433-git-hepatobiliary-q042": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 12,
    "topic": "Vitamin D deficiency",
    "status": "supported",
    "answer": "C",
    "opinion": "Vitamin D deficiency reduces intestinal calcium absorption and can cause hypocalcemia with compensatory PTH elevation."
  },
  "medicine-midterm-433-git-hepatobiliary-q048": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 13,
    "topic": "Hypocalcemia ECG",
    "status": "supported",
    "answer": "D",
    "opinion": "Hypocalcemia usually prolongs QT through ST-segment prolongation. Hypercalcemia tends to shorten QT."
  },
  "medicine-midterm-432-nephrology-q027": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 8,
    "topic": "Urgent cardiac stabilization",
    "status": "supported",
    "answer": "A",
    "opinion": "K=8 with peaked T waves warrants prompt IV calcium gluconate for cardiac protection, alongside potassium-lowering measures and preparation for dialysis.",
    "sources": [
      "potassium"
    ]
  },
  "medicine-midterm-431-pulmonary-q031": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 4,
    "topic": "Beta-2 potassium shift",
    "status": "supported",
    "answer": "D",
    "opinion": "Salbutamol can cause hypokalemia by shifting K into cells. Distinguish this from diuretics, which increase urinary potassium loss."
  },
  "medicine-midterm-431-nephrology-q034": {
    "lecture": "Potassium and Calcium Disorders",
    "page": 8,
    "topic": "Urgent cardiac stabilization",
    "status": "supported",
    "answer": "C",
    "opinion": "Missed dialysis with K=7 and ECG changes requires calcium gluconate first for cardiac protection, followed by potassium reduction and dialysis. Some units in the stem are incorrect.",
    "sources": [
      "potassium"
    ]
  },
  "medicine-midterm-443-nephrology-q040": {
    "lecture": "Acute Kidney Injury",
    "page": 22,
    "topic": "Cholesterol embolization after angiography",
    "status": "supported",
    "answer": "D",
    "opinion": "Delayed AKI after catheterization with blue toe supports cholesterol embolization. Its timing differs from the usual early rise after contrast exposure."
  },
  "medicine-midterm-442-nephrology-q033": {
    "lecture": "Acute Kidney Injury",
    "page": 22,
    "topic": "Delayed post-angiography AKI",
    "status": "supported",
    "answer": "A",
    "opinion": "AKI appearing after 14 days favors atheroembolism among the options. Timing alone does not establish it without skin findings or other evidence."
  },
  "medicine-midterm-442-nephrology-q036": {
    "lecture": "Acute Kidney Injury",
    "page": 10,
    "topic": "NSAID-associated hemodynamic AKI",
    "status": "conflict",
    "answer": null,
    "opinion": "Ibuprofen can reduce renal perfusion through prostaglandin inhibition. Bland urine does not establish ATN; the hemodynamic/prerenal mechanism is not listed, so key A is not accepted.",
    "sources": [
      "aki"
    ]
  },
  "medicine-midterm-436-nephrology-q064": {
    "lecture": "Acute Kidney Injury",
    "page": 14,
    "topic": "Excluding urinary obstruction",
    "status": "conflict",
    "answer": "B",
    "opinion": "In unexplained oliguric AKI, renal and urinary-tract ultrasound evaluates treatable obstruction. Urine sodium does not exclude a postrenal cause.",
    "sources": [
      "aki"
    ]
  },
  "medicine-midterm-435-nephrology-q039": {
    "lecture": "Acute Kidney Injury",
    "page": 22,
    "topic": "Cholesterol embolization after angiography",
    "status": "supported",
    "answer": "D",
    "opinion": "Blue toe and rising creatinine after catheterization favor cholesterol embolization. Pulses may remain palpable; the reported absent pulse also requires evaluation for a larger-vessel obstruction."
  },
  "medicine-midterm-431-cardiology-q018": {
    "lecture": "Acute Kidney Injury",
    "page": 27,
    "topic": "Uremic pericarditis and dialysis",
    "status": "supported",
    "answer": "D",
    "opinion": "A pericardial rub in severe AKI raises concern for uremic pericarditis, an indication for urgent dialysis. Address oxygenation and electrolyte disturbances in parallel."
  },
  "medicine-midterm-430-nephrology-q024": {
    "lecture": "Acute Kidney Injury",
    "page": 23,
    "topic": "Rhabdomyolysis and myoglobinuria",
    "status": "supported",
    "answer": "B",
    "opinion": "Muscle pain, dark urine and positive heme without RBCs suggest myoglobinuria/rhabdomyolysis. Measure CK and assess causes and medications."
  },
  "medicine-midterm-430-nephrology-q025": {
    "lecture": "Acute Kidney Injury",
    "page": 11,
    "topic": "Prerenal AKI and water deficit",
    "status": "supported",
    "answer": "B",
    "opinion": "Hypotension, hypernatremia and urine Na=8 support volume depletion and prerenal AKI. The elevated sodium reflects water deficit rather than azotemia itself."
  },
  "medicine-midterm-442-nephrology-q038": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Renoprotection with mismatched stem",
    "status": "needs-review",
    "answer": null,
    "opinion": "The stem describes GI bleeding in an older patient, whereas the options concern kidney protection. Empagliflozin cannot be connected to this presentation as the best bleeding treatment.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-441-nephrology-q041": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "SGLT2 kidney protection",
    "status": "needs-review",
    "answer": "C",
    "opinion": "Adding empagliflozin may protect kidneys in T2DM with CKD despite maximal ARB therapy. Confirm suitable eGFR, volume status and absence of contraindications; the laboratory table is missing.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-439-nephrology-q042": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Diabetic kidney protection with missing labs",
    "status": "needs-review",
    "answer": null,
    "opinion": "The stem describes T1DM with oral medications and requires an unavailable table. RAAS blockade may help with albuminuria, but this version does not establish a definitive plan.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-438-nephrology-q033": {
    "lecture": "Chronic Kidney Disease",
    "page": 13,
    "topic": "Hyperphosphatemia management",
    "status": "supported",
    "answer": "A",
    "opinion": "Dietary phosphate reduction and binders taken with meals are appropriate for elevated phosphate in CKD. Interpret calcium and PTH using repeated trends rather than an isolated value.",
    "sources": [
      "mbd"
    ]
  },
  "medicine-midterm-438-nephrology-q037": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Albuminuria and incomplete options",
    "status": "needs-review",
    "answer": "B",
    "opinion": "The ACE inhibitor in B may reduce albuminuria. The other options contain only letters, so this remains a provisional choice until the complete wording is restored.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-438-nephrology-q039": {
    "lecture": "Chronic Kidney Disease",
    "page": 14,
    "topic": "Iron deficiency before ESA",
    "status": "supported",
    "answer": "A",
    "opinion": "Hb=8, TSAT=10% and ferritin=20 support iron deficiency. Replace iron before ESA therapy. IV iron is reasonable, but route selection and investigation of the cause require dialysis and tolerance details.",
    "sources": [
      "anemia"
    ]
  },
  "medicine-midterm-437-nephrology-q025": {
    "lecture": "Chronic Kidney Disease",
    "page": 13,
    "topic": "Phosphate binder choice",
    "status": "supported",
    "answer": "A",
    "opinion": "Sevelamer lowers phosphate without increasing calcium load and is a reasonable choice. Calcium carbonate remains possible in selected cases and is not universally incorrect.",
    "sources": [
      "mbd"
    ]
  },
  "medicine-midterm-437-nephrology-q028": {
    "lecture": "Chronic Kidney Disease",
    "page": 13,
    "topic": "CKD mineral-bone disease",
    "status": "needs-review",
    "answer": null,
    "opinion": "Assess calcium, phosphate, PTH and vitamin D together over time. The description does not mandate calcium carbonate for every patient without specifying severity, CKD stage and current treatment.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-436-nephrology-q063": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Blood pressure and CKD progression",
    "status": "supported",
    "answer": "B",
    "opinion": "BP and proteinuria control slow CKD progression. Correcting anemia alone is not an established means of preventing kidney failure."
  },
  "medicine-midterm-435-nephrology-q037": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Albuminuric diabetic CKD",
    "status": "supported",
    "answer": "D",
    "opinion": "An ACE inhibitor is appropriate for increasing albuminuria in diabetes, with K and creatinine monitoring. Glipizide 400 mg appears to be a transcription error and must not be copied as a treatment dose.",
    "sources": [
      "ckd"
    ]
  },
  "medicine-midterm-434-nephrology-q032": {
    "lecture": "Chronic Kidney Disease",
    "page": 12,
    "topic": "Dialysis for uremic pericarditis",
    "status": "supported",
    "answer": "A",
    "opinion": "Uremic pericarditis is an indication to start dialysis; reaching a particular creatinine value alone is not."
  },
  "medicine-midterm-433-nephrology-q030": {
    "lecture": "Chronic Kidney Disease",
    "page": 16,
    "topic": "CKD mineral-bone disease",
    "status": "supported",
    "answer": "C",
    "opinion": "Reduced calcitriol and phosphate retention in CKD can cause hypocalcemia and secondary hyperparathyroidism. These values are not inevitable at every stage."
  },
  "medicine-midterm-431-nephrology-q037": {
    "lecture": "Chronic Kidney Disease",
    "page": 10,
    "topic": "Assessing renal function",
    "status": "supported",
    "answer": "C",
    "opinion": "Creatinine with calculated eGFR and urinalysis assess kidney function. Symptoms alone do not establish CKD; persistence for more than three months must be documented."
  },
  "medicine-midterm-430-nephrology-q029": {
    "lecture": "Chronic Kidney Disease",
    "page": 16,
    "topic": "Secondary hyperparathyroidism",
    "status": "supported",
    "answer": "A",
    "opinion": "Chronic PTH stimulation in CKD can cause osteitis fibrosa cystica. This differs from low-turnover adynamic bone disease."
  },
  "medicine-midterm-443-nephrology-q038": {
    "lecture": "Glomerular Diseases",
    "page": 21,
    "topic": "Synpharyngitic IgA nephropathy",
    "status": "supported",
    "answer": "A",
    "opinion": "Hematuria within days of a sore throat favors IgA nephropathy. Kidney biopsy demonstrates mesangial deposits when indicated."
  },
  "medicine-midterm-442-nephrology-q037": {
    "lecture": "Glomerular Diseases",
    "page": 16,
    "topic": "Membranous disease with missing pathology",
    "status": "needs-review",
    "answer": null,
    "opinion": "Proteinuria of 5 g/day establishes a nephrotic pattern, but urinary retention does not establish prostate cancer. The biopsy report is missing; membranous nephropathy secondary to cancer cannot be concluded with certainty.",
    "sources": [
      "gn"
    ]
  },
  "medicine-midterm-439-nephrology-q032": {
    "lecture": "Glomerular Diseases",
    "page": 20,
    "topic": "Active glomerular sediment",
    "status": "supported",
    "answer": "A",
    "opinion": "Hematuria and casts with impaired creatinine and a rash warrant GN evaluation. Kidney biopsy can identify the type and activity to guide treatment."
  },
  "medicine-midterm-438-nephrology-q031": {
    "lecture": "Glomerular Diseases",
    "page": 21,
    "topic": "Synpharyngitic IgA nephropathy",
    "status": "supported",
    "answer": "A",
    "opinion": "Onset close to a URI favors IgA nephropathy. Post-streptococcal GN usually occurs later; assess complement, urinalysis and kidney function."
  },
  "medicine-midterm-438-nephrology-q035": {
    "lecture": "Glomerular Diseases",
    "page": 24,
    "topic": "Lupus nephritis class",
    "status": "needs-review",
    "answer": "C",
    "opinion": "A nephrotic pattern in SLE may fit class V membranous disease. Hematuria and absence of casts do not establish the class; biopsy determines classification.",
    "sources": [
      "lupus"
    ]
  },
  "medicine-midterm-437-nephrology-q027": {
    "lecture": "Glomerular Diseases",
    "page": 10,
    "topic": "Fibrosis and FSGS prognosis",
    "status": "supported",
    "answer": "B",
    "opinion": "Interstitial fibrosis and tubular atrophy indicate chronic injury and correlate with progression. FSGS alone does not determine how quickly ESRD will develop.",
    "note": "The lecture discusses FSGS and links persistent proteinuria to tubular fibrosis on page 10. Favoring interstitial fibrosis as a prognostic marker also draws on kidney-disease assessment, rather than a direct statement on this page."
  },
  "medicine-midterm-437-nephrology-q029": {
    "lecture": "Glomerular Diseases",
    "page": 15,
    "topic": "Adult nephrotic evaluation",
    "status": "needs-review",
    "answer": null,
    "opinion": "Biopsy to identify the cause and an ACE inhibitor to reduce proteinuria are different steps that may both be appropriate. Next step wording and a dual key do not establish one answer.",
    "sources": [
      "gn"
    ]
  },
  "medicine-midterm-436-nephrology-q066": {
    "lecture": "Glomerular Diseases",
    "page": 24,
    "topic": "Lupus nephritis biopsy",
    "status": "supported",
    "answer": "D",
    "opinion": "Proteinuria and RBC casts in SLE suggest lupus nephritis. Quantify albuminuria, assess kidney function and consider biopsy. Creatinine +3 appears to be a transcription error."
  },
  "medicine-midterm-435-nephrology-q036": {
    "lecture": "Glomerular Diseases",
    "page": 10,
    "topic": "Fibrosis and FSGS prognosis",
    "status": "supported",
    "answer": "B",
    "opinion": "Interstitial fibrosis and tubular atrophy are important markers of chronic injury and progression. Also consider proteinuria, kidney function and treatment response.",
    "note": "The lecture discusses FSGS and links persistent proteinuria to tubular fibrosis on page 10. Favoring interstitial fibrosis as a prognostic marker also draws on kidney-disease assessment, rather than a direct statement on this page."
  },
  "medicine-midterm-435-nephrology-q038": {
    "lecture": "Glomerular Diseases",
    "page": 21,
    "topic": "Synpharyngitic IgA nephropathy",
    "status": "supported",
    "answer": "A",
    "opinion": "Hematuria concurrent with a recent upper respiratory infection supports IgA nephropathy. This timing helps distinguish it from delayed PSGN."
  },
  "medicine-midterm-434-nephrology-q033": {
    "lecture": "Glomerular Diseases",
    "page": 11,
    "topic": "Proteinuria and RAAS blockade",
    "status": "supported",
    "answer": "A",
    "opinion": "ACE inhibitors reduce intraglomerular pressure and proteinuria in diabetes. Confirm UACR and monitor K and kidney function; do not combine an ACE inhibitor with an ARB."
  },
  "medicine-midterm-433-nephrology-q037": {
    "lecture": "Glomerular Diseases",
    "page": 16,
    "topic": "Solid malignancy and membranous disease",
    "status": "supported",
    "answer": "B",
    "opinion": "Solid tumors can be associated with membranous nephropathy, making B the closest answer. A lung mass and +3 proteinuria alone do not establish the histological diagnosis."
  },
  "medicine-midterm-431-nephrology-q035": {
    "lecture": "Glomerular Diseases",
    "page": 21,
    "topic": "Synpharyngitic IgA nephropathy",
    "status": "supported",
    "answer": "B",
    "opinion": "Hematuria within days of a URI favors IgA nephropathy among the options. Biopsy may be needed depending on severity, proteinuria and kidney function."
  },
  "medicine-midterm-431-nephrology-q038": {
    "lecture": "Glomerular Diseases",
    "page": 8,
    "topic": "Nephrotic protein threshold",
    "status": "supported",
    "answer": "D",
    "opinion": "The teaching threshold for nephrotic proteinuria is approximately 3.5 g/day. The 3–5 option is closest but includes values below that threshold; do not memorize 3 as the cutoff."
  },
  "medicine-midterm-431-git-hepatobiliary-q054": {
    "lecture": "Glomerular Diseases",
    "page": 16,
    "topic": "Insufficient data for membranous diagnosis",
    "status": "needs-review",
    "answer": null,
    "opinion": "Sudden edema with normal creatinine does not distinguish MN from MCD or other causes. Urinalysis, protein quantification, albumin and etiological clues are missing.",
    "sources": [
      "gn"
    ]
  },
  "medicine-midterm-431-git-hepatobiliary-q055": {
    "lecture": "Glomerular Diseases",
    "page": 14,
    "topic": "Minimal change EM finding",
    "status": "supported",
    "answer": "D",
    "opinion": "MCD usually has normal light microscopy and diffuse foot-process effacement on electron microscopy. D is therefore appropriate."
  },
  "medicine-midterm-431-git-hepatobiliary-q056": {
    "lecture": "Glomerular Diseases",
    "page": 9,
    "topic": "Nephrotic lipiduria",
    "status": "supported",
    "answer": "B",
    "opinion": "Nephrotic syndrome causes lipiduria, oval fat bodies and fatty casts, with heavy proteinuria and low albumin. This fits B."
  },
  "medicine-midterm-430-nephrology-q022": {
    "lecture": "Glomerular Diseases",
    "page": 18,
    "topic": "Nephritic syndrome",
    "status": "supported",
    "answer": "C",
    "opinion": "Hematuria, hypertension, oliguria and impaired kidney function after infection support nephritic syndrome. Heavy proteinuria is the more prominent feature of nephrotic syndrome."
  },
  "medicine-midterm-430-nephrology-q026": {
    "lecture": "Glomerular Diseases",
    "page": 8,
    "topic": "Nephrotic proteinuria",
    "status": "supported",
    "answer": "B",
    "opinion": "Heavy proteinuria with edema characterizes nephrotic syndrome. Periorbital swelling alone is insufficient without urine and blood testing."
  },
  "medicine-midterm-430-nephrology-q028": {
    "lecture": "Glomerular Diseases",
    "page": 18,
    "topic": "Dysmorphic glomerular hematuria",
    "status": "supported",
    "answer": "C",
    "opinion": "Dysmorphic RBCs indicate a glomerular source. IgA nephropathy is the closest listed option, but this finding alone does not establish the specific GN type."
  },
  "medicine-midterm-439-nephrology-q029": {
    "lecture": "Chronic Kidney Disease",
    "page": 8,
    "topic": "Family history and diabetic CKD",
    "status": "supported",
    "answer": "D",
    "opinion": "Family history of kidney disease increases diabetic kidney-disease risk. BP, glucose and albuminuria control address modifiable factors."
  },
  "medicine-midterm-438-nephrology-q041": {
    "lecture": "Chronic Kidney Disease",
    "page": 11,
    "topic": "Albuminuric CKD protection",
    "status": "supported",
    "answer": "A",
    "opinion": "An ARB can reduce albuminuria and progression of proteinuric kidney disease when appropriate. Monitor potassium and creatinine; do not combine it with an ACE inhibitor."
  },
  "medicine-midterm-438-nephrology-q042": {
    "lecture": "Chronic Kidney Disease",
    "page": 8,
    "topic": "Family history and diabetic CKD",
    "status": "supported",
    "answer": "C",
    "opinion": "A family history of ESRD from diabetic nephropathy is a risk factor. It does not make ESRD inevitable; controlling modifiable factors remains important."
  },
  "medicine-midterm-430-nephrology-q023": {
    "lecture": "Other renal topics (outside MID 444 lectures)",
    "page": 0,
    "topic": "UTI in pregnancy",
    "status": "needs-review",
    "answer": "C",
    "opinion": "Nitrofurantoin is an option for cystitis in pregnancy based on culture and safety. It does not treat pyelonephritis; consider G6PD status and gestational timing. The options and context do not mandate a single drug.",
    "sources": [
      "pregnancy-uti"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q045": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 8,
    "topic": "FIB-4 components",
    "status": "supported",
    "answer": "B",
    "opinion": "FIB-4 uses age, AST, ALT and platelets: age×AST/(platelets×√ALT). It does not include ALP, bilirubin or INR."
  },
  "medicine-midterm-443-git-hepatobiliary-q047": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 11,
    "topic": "Weight loss and MASH endpoints",
    "status": "needs-review",
    "answer": "D",
    "opinion": "A 10% weight-loss target is important for fibrosis improvement; 7–10% may improve inflammation/MASH and 5% steatosis. The question does not specify the outcome, so D is not a universal threshold for every benefit.",
    "sources": [
      "masld"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q048": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 13,
    "topic": "MASH drug indication and date",
    "status": "needs-review",
    "answer": null,
    "opinion": "The lecture selects resmetirom, but worsening steatosis alone does not establish MASH with F2–F3 fibrosis. Semaglutide received approval for this group in August 2025, so it should not now be described as unapproved.",
    "sources": [
      "mash-fda",
      "masld"
    ],
    "note": "This page contains a similar question keyed to resmetirom when the lecture was prepared. The review explains the required fibrosis stage and subsequent semaglutide approval."
  },
  "medicine-midterm-443-git-hepatobiliary-q055": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 9,
    "topic": "Fibrosis assessment modality",
    "status": "needs-review",
    "answer": null,
    "opinion": "MRE and VCTE both assess liver stiffness; mildly elevated enzymes do not identify one required test. Risk assessment often starts with FIB-4 followed by elastography. Two options are missing.",
    "sources": [
      "masld"
    ]
  },
  "medicine-midterm-442-git-hepatobiliary-q046": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 11,
    "topic": "Lifestyle in low fibrosis risk",
    "status": "supported",
    "answer": "B",
    "opinion": "FIB-4=1 and reassuring stiffness assessment support lifestyle measures and weight loss with risk follow-up. Vitamin E is not automatically required in a patient with diabetes."
  },
  "medicine-midterm-441-git-hepatobiliary-q054": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 8,
    "topic": "FIB-4 before advanced testing",
    "status": "supported",
    "answer": "C",
    "opinion": "With hepatic steatosis and metabolic risk factors, assess fibrosis initially using a noninvasive test such as FIB-4. Mild enzyme elevation alone is not an indication for routine biopsy."
  },
  "medicine-midterm-441-git-hepatobiliary-q060": {
    "lecture": "Non-Alcoholic Fatty Liver",
    "page": 3,
    "topic": "Normal enzymes do not exclude MASH",
    "status": "supported",
    "answer": "C",
    "opinion": "Normal liver enzymes do not exclude MASH or fibrosis. Fibrosis stage is more important for prognosis, and cardiovascular mortality is important in this population."
  },
  "medicine-midterm-443-git-hepatobiliary-q046": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Upper GI bleeding differential",
    "status": "needs-review",
    "answer": null,
    "opinion": "Longstanding epigastric pain with hematemesis suggests an ulcerative or erosive cause but does not distinguish erosion from ulcer. One option and the endoscopy findings are missing.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q051": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Hematemesis with incomplete diagnosis",
    "status": "needs-review",
    "answer": null,
    "opinion": "Heartburn and vomiting with hematemesis require endoscopy and bleeding assessment. They do not establish GERD or a neuroendocrine tumor; the A/B key does not resolve the cause.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-442-git-hepatobiliary-q042": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss after retching",
    "status": "supported",
    "answer": "B",
    "opinion": "Repeated vomiting followed by blood in pregnancy favors a Mallory–Weiss tear at the gastroesophageal junction. Hyperemesis explains the vomiting rather than the source of bleeding itself."
  },
  "medicine-midterm-441-git-hepatobiliary-q047": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 13,
    "topic": "Cardiovascular disease and transfusion",
    "status": "needs-review",
    "answer": "C",
    "opinion": "Cardiac disease may justify a transfusion threshold above 7, often around 8, but the current Hb is missing. Cross-matching does not automatically establish a need for transfusion or a fixed target.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q048": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 21,
    "topic": "Acute variceal bleeding bundle",
    "status": "conflict",
    "answer": "D",
    "opinion": "Vasoactive therapy starts immediately and usually continues for 2–5 days, rather than only 24 hours. Antibiotic prophylaxis in D is correct within a bundle including resuscitation, early endoscopy and vasoactive treatment.",
    "sources": [
      "variceal"
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q049": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss after retching",
    "status": "supported",
    "answer": "B",
    "opinion": "Repeated vomiting followed by fresh blood supports a Mallory–Weiss tear. Semaglutide may cause nausea but does not establish an ulcer or tumor."
  },
  "medicine-midterm-439-nephrology-q047": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss endoscopic tear",
    "status": "supported",
    "answer": "B",
    "opinion": "A bleeding linear tear near the gastroesophageal junction after retching directly fits Mallory–Weiss syndrome, rather than an ulcer or GAVE."
  },
  "medicine-midterm-439-nephrology-q051": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 13,
    "topic": "Transfusion target versus threshold",
    "status": "needs-review",
    "answer": "C",
    "opinion": "A target Hb of 11 is not routine for stable GI bleeding. Cardiac disease calls for an individualized strategy around an 8 g/dL threshold. The listed 9 is closer but not a mandatory target; mg/dL is a printed unit error.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-438-git-hepatobiliary-q045": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss after retching",
    "status": "supported",
    "answer": "B",
    "opinion": "Nonbloody vomiting becoming fresh blood after repeated episodes favors a Mallory–Weiss tear. Variceal disease is not established without liver-related evidence."
  },
  "medicine-midterm-437-git-hepatobiliary-q036": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss after retching",
    "status": "supported",
    "answer": "C",
    "opinion": "Repeated vomiting in pregnancy can cause a mucosal tear at the gastroesophageal junction. Subsequent bleeding favors Mallory–Weiss syndrome."
  },
  "medicine-midterm-436-git-hepatobiliary-q072": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 18,
    "topic": "PPI after high-risk ulcer hemostasis",
    "status": "needs-review",
    "answer": [
      "B",
      "D"
    ],
    "opinion": "After endoscopic hemostasis of an ulcer with a visible vessel, give high-dose PPI for three days. B and D have identical wording, so one cannot fairly be marked wrong.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-435-git-hepatobiliary-q047": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 7,
    "topic": "Mallory-Weiss after retching",
    "status": "supported",
    "answer": "B",
    "opinion": "Blood after two vomiting episodes supports a Mallory–Weiss tear. Gastritis is possible, but retching followed by bleeding is more suggestive here."
  },
  "medicine-midterm-435-git-hepatobiliary-q049": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 13,
    "topic": "Initial UGIB resuscitation",
    "status": "supported",
    "answer": "A",
    "opinion": "Hypotension and tachycardia with melena require IV access, resuscitation and assessment for transfusion, followed by endoscopy after stabilization. Endoscopy should not precede resuscitation."
  },
  "medicine-midterm-435-git-hepatobiliary-q050": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 13,
    "topic": "Restrictive transfusion in cirrhosis",
    "status": "supported",
    "answer": "A",
    "opinion": "Hb around 7 g/dL generally fits a restrictive strategy in variceal bleeding, with an approximate target of 7–8, adjusted for bleeding, stability and cardiac disease."
  },
  "medicine-midterm-431-git-hepatobiliary-q040": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 13,
    "topic": "Initial UGIB resuscitation",
    "status": "supported",
    "answer": "C",
    "opinion": "BP 88/48 with tachycardia and melena indicates instability. Establish IV access and resuscitate first, while preparing blood and assessing transfusion needs."
  },
  "medicine-midterm-431-git-hepatobiliary-q041": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 25,
    "topic": "Iron deficiency and occult GI bleeding",
    "status": "supported",
    "answer": "A",
    "opinion": "Microcytic anemia with occult blood in an older patient requires investigation of a GI source, particularly the colon. Corrupted values and units do not remove the need to investigate the cause."
  },
  "medicine-midterm-430-git-hepatobiliary-q033": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 20,
    "topic": "Portal hypertension and variceal bleeding",
    "status": "supported",
    "answer": "A",
    "opinion": "Melena with jaundice and ascites raises concern for upper variceal bleeding from portal hypertension. Endoscopy after resuscitation confirms and localizes the source."
  },
  "medicine-midterm-430-git-hepatobiliary-q036": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 12,
    "topic": "Hemodynamic assessment before endoscopy",
    "status": "supported",
    "answer": "D",
    "opinion": "BP, pulse and orthostatic changes help assess bleeding. D is the best listed assessment step, but it does not replace IV access, laboratory testing, risk assessment or endoscopy when indicated."
  },
  "medicine-midterm-430-git-hepatobiliary-q045": {
    "lecture": "Gastrointestinal Bleeding",
    "page": 3,
    "topic": "Lower GI bleeding investigation",
    "status": "supported",
    "answer": "C",
    "opinion": "Endoscopy identifies the source after stabilization and bowel preparation. Ongoing substantial bleeding affecting circulation favors CTA for localization before some interventions.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q049": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 36,
    "topic": "IBS question with displaced source letter",
    "status": "conflict",
    "answer": "C",
    "opinion": "The same case appears among the lecture questions: defecation-related pain and stress without alarm features support IBS. IBS is C in the bank, whereas D is missing. The original key is preserved and the answer corrected to C.",
    "sources": [
      "ibs"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q056": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 8,
    "topic": "Imaging needs pain localization",
    "status": "needs-review",
    "answer": null,
    "opinion": "Imaging depends on pain location, examination and pregnancy possibility. Ultrasound is appropriate for suspected biliary disease, but nonspecific pain and mild fever do not automatically confirm A."
  },
  "medicine-midterm-443-git-hepatobiliary-q058": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "PUD with melena",
    "status": "conflict",
    "answer": "A",
    "opinion": "Epigastric pain with melena favors peptic ulcer disease over GERD among the options. Bleeding is an alarm feature requiring assessment rather than treatment as uncomplicated heartburn.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q059": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "NSAID gastropathy",
    "status": "supported",
    "answer": "B",
    "opinion": "Epigastric pain after starting diclofenac suggests NSAID-related gastric injury. Symptoms alone do not distinguish inflammation, erosions and an ulcer without appropriate assessment."
  },
  "medicine-midterm-442-git-hepatobiliary-q048": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 19,
    "topic": "BISAP pancreatitis risk score",
    "status": "supported",
    "answer": "C",
    "opinion": "BISAP assesses pancreatitis risk using BUN, impaired consciousness, SIRS, age over 60 and pleural effusion. Tokyo addresses biliary disease, Alvarado appendicitis and SAAG ascites."
  },
  "medicine-midterm-441-git-hepatobiliary-q050": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Functional dyspepsia",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Chronic epigastric pain without alarm features fits dyspepsia. Functional dyspepsia requires exclusion of an organic cause through appropriate assessment; pain alone does not establish it.",
    "note": "The citation covers dyspepsia/epigastric pain and organic differential diagnoses. Full functional dyspepsia and PDS criteria are not explained in the specified MID lectures."
  },
  "medicine-midterm-441-git-hepatobiliary-q051": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 24,
    "topic": "H. pylori testing off PPI",
    "status": "supported",
    "answer": "B",
    "opinion": "PPI use can affect breath and stool-antigen tests. Stop it for about two weeks before testing when feasible. Antibody testing is not preferred to establish active infection or eradication.",
    "sources": [
      "hp"
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q055": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "NSAID-related peptic ulcer bleeding",
    "status": "supported",
    "answer": "C",
    "opinion": "NSAID and aspirin use followed by coffee-ground emesis and melena favors bleeding peptic ulcer disease. This requires resuscitation, assessment and endoscopy rather than treatment as uncomplicated GERD."
  },
  "medicine-midterm-441-git-hepatobiliary-q056": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 26,
    "topic": "Dyspepsia alarm anemia",
    "status": "supported",
    "answer": "D",
    "opinion": "Hb 98 g/L with microcytosis is an alarm feature in dyspepsia and supports upper endoscopy to identify the cause. H. pylori testing alone is insufficient in this setting."
  },
  "medicine-midterm-441-git-hepatobiliary-q057": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 15,
    "topic": "Biliary imaging first step",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Recurrent upper abdominal pain may suggest a biliary cause and initial ultrasound. The laboratory table is missing, so proven obstruction or inflammation must not be assumed.",
    "sources": [
      "biliary"
    ]
  },
  "medicine-midterm-441-git-hepatobiliary-q058": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 24,
    "topic": "H. pylori first-line eradication",
    "status": "conflict",
    "answer": "A",
    "opinion": "A is bismuth quadruple therapy. ACG 2024 guidance prefers a 14-day course when susceptibility is unknown and does not endorse empirical clarithromycin triple therapy without confirmed susceptibility.",
    "sources": [
      "hp"
    ]
  },
  "medicine-midterm-439-nephrology-q048": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Uncomplicated dyspepsia trial",
    "status": "supported",
    "answer": "C",
    "opinion": "A PPI trial is appropriate for dyspepsia after negative H. pylori testing and without alarm features. Oxycodone-related constipation needs concurrent treatment and does not justify routine CT.",
    "note": "The citation covers dyspepsia/epigastric pain and organic differential diagnoses. Full functional dyspepsia and PDS criteria are not explained in the specified MID lectures."
  },
  "medicine-midterm-439-nephrology-q052": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 24,
    "topic": "H. pylori test of cure",
    "status": "supported",
    "answer": "C",
    "opinion": "Symptom improvement does not establish H. pylori eradication. Confirm with breath or stool testing at least four weeks after antibiotics and after withholding PPI for two weeks.",
    "sources": [
      "hp"
    ]
  },
  "medicine-midterm-439-nephrology-q056": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 4,
    "topic": "Abdominal wall pain",
    "status": "supported",
    "answer": "D",
    "opinion": "Pain increasing with abdominal-wall contraction and tenderness at an old scar support an abdominal-wall source through Carnett's sign, rather than a visceral source such as the pancreas."
  },
  "medicine-midterm-439-nephrology-q057": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 17,
    "topic": "MRCP versus therapeutic ERCP",
    "status": "needs-review",
    "answer": "B",
    "opinion": "MRCP is appropriate for intermediate suspicion of a duct stone. Sludge without dilation alone does not mandate it; missing laboratory results make B a conditional choice.",
    "sources": [
      "biliary"
    ]
  },
  "medicine-midterm-438-git-hepatobiliary-q044": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 26,
    "topic": "Dyspepsia alarm weight loss",
    "status": "supported",
    "answer": "D",
    "opinion": "Unintentional weight loss is an alarm feature prompting organic evaluation and endoscopy as appropriate. It should not simply be attributed to functional dyspepsia."
  },
  "medicine-midterm-438-git-hepatobiliary-q053": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Postprandial distress syndrome",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Early satiety and postprandial fullness/bloating fit PDS. Dyspepsia is intended rather than the printed dysplasia; the stated duration may not meet the full temporal criteria.",
    "note": "The citation covers dyspepsia/epigastric pain and organic differential diagnoses. Full functional dyspepsia and PDS criteria are not explained in the specified MID lectures."
  },
  "medicine-midterm-438-git-hepatobiliary-q059": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 19,
    "topic": "Pancreatitis diagnostic criteria",
    "status": "needs-review",
    "answer": "B",
    "opinion": "Typical pain suggests pancreatitis, but amylase 130 and its printed reference range are unclear. Neither a level ≥3×ULN nor imaging is established, so this version does not confirm the diagnosis.",
    "sources": [
      "pancreatitis"
    ]
  },
  "medicine-midterm-437-git-hepatobiliary-q035": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 27,
    "topic": "Colonoscopy in context",
    "status": "needs-review",
    "answer": "B",
    "opinion": "Colonoscopy may be appropriate for screening according to age and local policy, or for alarm features. An affected grandfather is not a first-degree relative; constipation alone does not automatically require colonoscopy.",
    "sources": [
      "ibs"
    ]
  },
  "medicine-midterm-436-git-hepatobiliary-q071": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Missing option texts in ulcer vignette",
    "status": "needs-review",
    "answer": null,
    "opinion": "NSAID exposure and pain suggest PUD, but all four choices are missing. A key of C does not permit inventing its wording or automatically grading it.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-436-git-hepatobiliary-q076": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "NSAID-related PUD",
    "status": "supported",
    "answer": "A",
    "opinion": "Melena with ibuprofen use and epigastric pain favors peptic ulcer disease. Radiation to the back does not automatically make the cause biliary."
  },
  "medicine-midterm-436-git-hepatobiliary-q082": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Suspected nonvariceal upper GI bleed",
    "status": "needs-review",
    "answer": "B",
    "opinion": "PPI may be part of treatment, but 72 hours of high-dose therapy is particularly indicated after hemostasis of a high-risk lesion. Without endoscopy findings or stability details, this is not a complete plan.",
    "sources": [
      "bleed"
    ]
  },
  "medicine-midterm-436-git-hepatobiliary-q083": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 28,
    "topic": "IBS treatment and missing options",
    "status": "needs-review",
    "answer": "A",
    "opinion": "The symptoms fit IBS; soluble fiber may help, especially with constipation. B has no text, and lansoprazole is not routine IBS treatment, so the final key cannot be accepted.",
    "sources": [
      "ibs"
    ]
  },
  "medicine-midterm-435-git-hepatobiliary-q045": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 24,
    "topic": "H. pylori test of cure",
    "status": "supported",
    "answer": "A",
    "opinion": "A urea breath test is noninvasive and confirms eradication when timed appropriately. Antibodies can remain positive after cure and are unsuitable for this purpose.",
    "sources": [
      "hp"
    ]
  },
  "medicine-midterm-434-git-hepatobiliary-q044": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 27,
    "topic": "IBS alarm iron deficiency",
    "status": "supported",
    "answer": "B",
    "opinion": "Iron-deficiency anemia is an alarm feature requiring further evaluation. Do not attribute it to IBS without investigating bleeding, malabsorption and other causes."
  },
  "medicine-midterm-434-git-hepatobiliary-q046": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 27,
    "topic": "IBS symptom pattern",
    "status": "supported",
    "answer": "C",
    "opinion": "Defecation-related pain and changes in stool form without clear alarm features support IBS. Modern criteria specify duration and frequency, with assessment tailored to the context."
  },
  "medicine-midterm-433-git-hepatobiliary-q039": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 23,
    "topic": "Initial NSAID-related UGIB care",
    "status": "supported",
    "answer": "B",
    "opinion": "Melena with NSAID use and tachycardia requires IV access, circulatory assessment and resuscitation as needed. Transfusion depends on bleeding severity and Hb; an H2 blocker is not preferred for ulcer bleeding."
  },
  "medicine-midterm-433-git-hepatobiliary-q043": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 27,
    "topic": "IBS symptom pattern",
    "status": "supported",
    "answer": "A",
    "opinion": "Pain relieved by defecation, chronic diarrhea and reassuring tests support IBS after checking for alarm features and completing appropriate evaluation."
  },
  "medicine-midterm-431-git-hepatobiliary-q043": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "Ulcerative colitis pattern",
    "status": "supported",
    "answer": "D",
    "opinion": "Chronic bloody diarrhea, urgency and inflammatory cells favor UC among the options. Exclude infection and confirm with endoscopy and biopsies."
  },
  "medicine-midterm-431-git-hepatobiliary-q058": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 22,
    "topic": "Acute pancreatitis supportive care",
    "status": "supported",
    "answer": "B",
    "opinion": "Pain with lipase 600 well above the upper limit supports pancreatitis. Fluids and analgesia are the key listed treatments, often favoring LR with repeated assessment to avoid fluid overload.",
    "sources": [
      "pancreatitis"
    ]
  },
  "medicine-midterm-430-git-hepatobiliary-q031": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "Ulcerative colitis pattern",
    "status": "supported",
    "answer": "C",
    "opinion": "Chronic bloody diarrhea, lower abdominal pain and joint symptoms support IBD/UC. Exclude infection and confirm through endoscopy and biopsy."
  },
  "medicine-midterm-430-git-hepatobiliary-q038": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 21,
    "topic": "Pancreatic enzymes",
    "status": "supported",
    "answer": "C",
    "opinion": "Amylase is the appropriate listed test for suspected pancreatitis. Lipase is often preferable in practice but is not offered; do not infer universal superiority of amylase.",
    "sources": [
      "pancreatitis"
    ]
  },
  "medicine-midterm-430-git-hepatobiliary-q043": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 27,
    "topic": "Historical Rome criteria",
    "status": "supported",
    "answer": "C",
    "opinion": "Pain related to altered stool frequency is part of the historical Rome II criteria cited in the question. Modern criteria use updated duration and frequency requirements."
  },
  "medicine-midterm-443-git-hepatobiliary-q050": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 15,
    "topic": "Cardiac ascites versus refractory cirrhotic ascites",
    "status": "needs-review",
    "answer": "B",
    "opinion": "A high SAAG may fit cardiac ascites but does not establish refractory ascites. Failure of spironolactone alone, without dose details, a loop diuretic or optimized HF therapy, does not mandate large-volume paracentesis."
  },
  "medicine-midterm-443-git-hepatobiliary-q057": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 18,
    "topic": "Persistent hepatic encephalopathy",
    "status": "supported",
    "answer": "B",
    "opinion": "Rifaximin is an appropriate addition for persistent or recurrent HE despite treatment. Check lactitol dosing and investigate constipation, infection, bleeding and metabolic triggers."
  },
  "medicine-midterm-442-git-hepatobiliary-q041": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 14,
    "topic": "Low-SAAG ascites",
    "status": "supported",
    "answer": "D",
    "opinion": "SAAG 0.9 is below 1.1 and favors a non-portal-hypertensive cause such as peritoneal malignancy. It does not establish cancer without fluid evaluation and clinical context."
  },
  "medicine-midterm-436-git-hepatobiliary-q079": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 18,
    "topic": "Encephalopathy in decompensation",
    "status": "supported",
    "answer": "D",
    "opinion": "Confusion may indicate HE in advanced liver disease. Exclude other causes such as medications, infection, glucose disturbances and hypoxia."
  },
  "medicine-midterm-435-git-hepatobiliary-q055": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 18,
    "topic": "Asterixis and encephalopathy",
    "status": "supported",
    "answer": "C",
    "opinion": "Asterixis supports encephalopathy in advanced liver disease but is not liver-specific. It also occurs in uremia and hypercapnia."
  },
  "medicine-midterm-434-git-hepatobiliary-q038": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 14,
    "topic": "Low-SAAG ascites",
    "status": "supported",
    "answer": "C",
    "opinion": "Peritoneal malignancy, including lymphoma, may cause a low SAAG. HF, Budd–Chiari syndrome and cirrhosis usually produce a high SAAG."
  },
  "medicine-midterm-434-git-hepatobiliary-q043": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 14,
    "topic": "Nephrotic low-SAAG ascites",
    "status": "supported",
    "answer": "C",
    "opinion": "Severe hypoalbuminemia in nephrotic syndrome can produce a low SAAG. Interpretation depends on the underlying clinical cause rather than appearance alone."
  },
  "medicine-midterm-433-git-hepatobiliary-q040": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 14,
    "topic": "Two correct low-SAAG causes",
    "status": "needs-review",
    "answer": [
      "C",
      "D"
    ],
    "opinion": "Membranous nephropathy through nephrotic syndrome and peritoneal carcinomatosis can both lower SAAG. C/D is consistent, but the question does not have one answer."
  },
  "medicine-midterm-431-git-hepatobiliary-q045": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 14,
    "topic": "Ascitic albumin and SAAG",
    "status": "supported",
    "answer": "D",
    "opinion": "Ascitic albumin with a simultaneous serum albumin allows SAAG calculation. Cell count, culture and other tests are also requested according to context."
  },
  "medicine-midterm-430-git-hepatobiliary-q040": {
    "lecture": "Liver Cirrhosis and Complications",
    "page": 15,
    "topic": "SBP ascitic neutrophils",
    "status": "supported",
    "answer": "B",
    "opinion": "Fluid cell count with differential is the key test. PMN ≥250/µL supports SBP even with a negative culture; fever in cirrhosis warrants prompt paracentesis."
  },
  "medicine-midterm-436-git-hepatobiliary-q070": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 5,
    "topic": "Acute liver failure prognosis",
    "status": "supported",
    "answer": "D",
    "opinion": "The cause of acute liver failure is an important determinant of recovery among the options. Prognosis also depends on encephalopathy, INR and other factors rather than etiology alone.",
    "note": "This section explains causes of acute injury and liver failure. It does not rank prognostic factors in detail."
  },
  "medicine-midterm-443-git-hepatobiliary-q052": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 8,
    "topic": "Physiological ALP in adolescence",
    "status": "needs-review",
    "answer": "C",
    "opinion": "Mild isolated ALP elevation with otherwise normal liver enzymes during growth may reflect physiological bone activity. C is favored; bone disease is not established without further evidence."
  },
  "medicine-midterm-443-git-hepatobiliary-q053": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 5,
    "topic": "Drug-related enzyme elevation and duplicated options",
    "status": "needs-review",
    "answer": null,
    "opinion": "Acetaminophen and paracetamol are the same drug and may raise ALT even at therapeutic doses; some NSAIDs can too. A/B are duplicates, and the stem does not identify one drug.",
    "sources": [
      "acetaminophen"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q054": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 6,
    "topic": "Biliary dilation and ERCP indication",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Duct dilation alone does not mandate ERCP. Look for cholangitis, a visible stone or bilirubin above 4 with dilation; otherwise MRCP/EUS may be appropriate. A appears to be misspelled MRCP, and information is incomplete.",
    "sources": [
      "biliary"
    ]
  },
  "medicine-midterm-443-git-hepatobiliary-q060": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 14,
    "topic": "Resolved natural HBV infection",
    "status": "supported",
    "answer": "C",
    "opinion": "Negative HBsAg with positive anti-HBc and anti-HBs indicates previous natural infection with immunity. Vaccination alone does not produce anti-HBc."
  },
  "medicine-midterm-442-git-hepatobiliary-q040": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 8,
    "topic": "Pregnancy-related ALP",
    "status": "supported",
    "answer": "A",
    "opinion": "Isolated ALP elevation in pregnancy may arise from the placenta. Normal other enzymes support a physiological explanation, considering symptoms and gestational stage."
  },
  "medicine-midterm-442-git-hepatobiliary-q044": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 19,
    "topic": "Autoimmune hepatitis IgG",
    "status": "supported",
    "answer": "B",
    "opinion": "ANA/ASMA with the appropriate pattern support AIH, usually associated with elevated IgG rather than the IgM more typical of PBC. Antibodies alone are insufficient."
  },
  "medicine-midterm-442-git-hepatobiliary-q045": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 6,
    "topic": "Ascending cholangitis",
    "status": "supported",
    "answer": "C",
    "opinion": "RUQ pain, jaundice and fever form Charcot's triad and support ascending cholangitis. Prompt treatment and assessment for biliary drainage are required."
  },
  "medicine-midterm-439-nephrology-q058": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 28,
    "topic": "Ischemic hepatitis after shock",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Septic shock makes ischemic hepatitis an important possibility, but AST/ALT values are missing. The pattern and exclusion of other causes cannot be confirmed from the history alone."
  },
  "medicine-midterm-438-git-hepatobiliary-q046": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 3,
    "topic": "Synthetic function in acute liver injury",
    "status": "supported",
    "answer": "C",
    "opinion": "INR reflects rapid changes in clotting-factor synthesis better than long-lived albumin. Encephalopathy with elevated INR in acute liver injury requires urgent liver-failure assessment."
  },
  "medicine-midterm-438-git-hepatobiliary-q049": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 6,
    "topic": "Cholestatic workup ultrasound first",
    "status": "supported",
    "answer": "B",
    "opinion": "Raised ALP with pruritus warrants ultrasound to exclude duct obstruction before further AMA testing and evaluation of intrahepatic causes. Negative ASMA does not exclude all autoimmune disease."
  },
  "medicine-midterm-438-git-hepatobiliary-q050": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 22,
    "topic": "PSC versus AMA testing",
    "status": "conflict",
    "answer": null,
    "opinion": "UC with a cholestatic pattern suggests PSC, evaluated with MRCP after initial assessment. AMA indicates PBC rather than confirming PSC; MRCP is not listed.",
    "sources": [
      "psc"
    ]
  },
  "medicine-midterm-438-git-hepatobiliary-q055": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 4,
    "topic": "Hepatocellular workup with incomplete data",
    "status": "needs-review",
    "answer": null,
    "opinion": "ALT/AST disproportionately higher than ALP suggest a hepatocellular pattern. Missing ULNs, other tests and option D prevent selecting ultrasound or biopsy as a definitive next step."
  },
  "medicine-midterm-437-git-hepatobiliary-q031": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 5,
    "topic": "Hepatitis E risk in pregnancy",
    "status": "supported",
    "answer": "B",
    "opinion": "HEV can be more severe in pregnancy, particularly in endemic areas or after travel. B answers the prognostic comparison, but the history alone does not identify the virus."
  },
  "medicine-midterm-437-git-hepatobiliary-q032": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 4,
    "topic": "Hepatocellular versus cholestatic pattern",
    "status": "needs-review",
    "answer": null,
    "opinion": "ALT 1200 does not exclude transient obstruction but also raises concern for acute liver injury. Without ALP/GGT values, reference limits and imaging, obstruction cannot be distinguished from acute hepatitis."
  },
  "medicine-midterm-436-git-hepatobiliary-q067": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 10,
    "topic": "HBV partner vaccination and immunity",
    "status": "conflict",
    "answer": null,
    "opinion": "Screen and vaccinate the partner, documenting anti-HBs 1–2 months after completing the appropriate schedule. There is no fixed medical rule permitting marriage six weeks after three injections. Sexual precautions continue until immunity is documented.",
    "sources": [
      "hbv"
    ]
  },
  "medicine-midterm-436-git-hepatobiliary-q073": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 6,
    "topic": "Biliary obstruction first imaging",
    "status": "supported",
    "answer": "A",
    "opinion": "Ultrasound is suitable initial imaging for suspected biliary obstruction. Subsequent MRCP/EUS or therapeutic ERCP depends on results and the probability of stones or cholangitis."
  },
  "medicine-midterm-436-git-hepatobiliary-q077": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 4,
    "topic": "Direct bilirubin with cholestasis",
    "status": "supported",
    "answer": "D",
    "opinion": "Marked ALP/GGT elevation with predominantly direct bilirubin fits jaundice with a cholestatic pattern. It does not establish the cause of obstruction itself."
  },
  "medicine-midterm-436-git-hepatobiliary-q084": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 5,
    "topic": "Acute liver failure encephalopathy",
    "status": "supported",
    "answer": "C",
    "opinion": "Altered consciousness in acute liver injury is a danger sign and may represent HE. Assess INR, glucose and other causes; high enzymes alone do not define liver failure."
  },
  "medicine-midterm-436-git-hepatobiliary-q085": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 4,
    "topic": "Direct bilirubin with cholestasis",
    "status": "supported",
    "answer": "D",
    "opinion": "Predominant ALP/GGT elevation with raised direct bilirubin indicates hyperbilirubinemia with a cholestatic pattern. Mild AST/ALT elevations do not make it hepatocellular."
  },
  "medicine-midterm-435-git-hepatobiliary-q044": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 9,
    "topic": "Acute HAV IgM",
    "status": "supported",
    "answer": "A",
    "opinion": "IgM anti-HAV supports acute HAV infection. IgG indicates previous exposure or vaccination and does not establish current disease."
  },
  "medicine-midterm-435-git-hepatobiliary-q051": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 20,
    "topic": "AIH interface hepatitis",
    "status": "supported",
    "answer": "C",
    "opinion": "Interface hepatitis with a plasma-cell-rich infiltrate supports AIH. Onion-skin fibrosis is associated with PSC and a florid duct lesion with PBC."
  },
  "medicine-midterm-435-git-hepatobiliary-q054": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 13,
    "topic": "Acute HBV serology with ambiguous wording",
    "status": "needs-review",
    "answer": "A",
    "opinion": "If acute HBV is intended, IgM anti-HBc supports it. HBV IgM is imprecise; elevated ALT and GI symptoms alone do not identify HBV, and HAV is not offered."
  },
  "medicine-midterm-434-git-hepatobiliary-q039": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 9,
    "topic": "HAV transmission with nonspecific vignette",
    "status": "needs-review",
    "answer": "A",
    "opinion": "HAV is possible among the options, but travel with prodromal symptoms alone does not establish hepatitis A. Appropriate exposure, liver tests and IgM testing are needed when suspected."
  },
  "medicine-midterm-433-git-hepatobiliary-q041": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 13,
    "topic": "HBV replication markers",
    "status": "supported",
    "answer": "B",
    "opinion": "HBsAg with HBeAg supports infection with replication, but chronicity requires persistence beyond six months. HBV DNA assesses replication more accurately and can be elevated despite negative HBeAg."
  },
  "medicine-midterm-432-git-hepatobiliary-q031": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 25,
    "topic": "Anemia in alcohol-related liver disease",
    "status": "needs-review",
    "answer": "B",
    "opinion": "Anemia can result from iron, B12 or folate deficiency, bleeding or hemolysis. Missing MCV and iron studies prevent selecting B12 as the single best test; absence of melena does not exclude occult bleeding."
  },
  "medicine-midterm-431-git-hepatobiliary-q044": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 13,
    "topic": "HBsAg screening and printed INR",
    "status": "supported",
    "answer": "A",
    "opinion": "HBsAg is the appropriate listed test to establish HBV infection, but does not alone establish chronicity. INR 10, if genuine, is extremely concerning and requires urgent assessment; it may be a transcription error for 1.0."
  },
  "medicine-midterm-430-git-hepatobiliary-q032": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 16,
    "topic": "HCV transmission",
    "status": "supported",
    "answer": "C",
    "opinion": "HCV is primarily bloodborne. Contaminated food is not its usual transmission route, unlike the fecal-oral transmission of HAV/HEV."
  },
  "medicine-midterm-430-git-hepatobiliary-q037": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 7,
    "topic": "Hepatocellular enzyme evaluation",
    "status": "supported",
    "answer": "B",
    "opinion": "Persistent ALT/AST elevation requires assessment for viral, autoimmune, metabolic/iron and drug causes. Absence of reported risk factors neither excludes viral disease nor automatically justifies delaying evaluation."
  },
  "medicine-midterm-430-git-hepatobiliary-q041": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 10,
    "topic": "Chronic viral liver disease",
    "status": "supported",
    "answer": "B",
    "opinion": "HBV can cause chronic infection and cirrhosis; HAV does not cause chronic infection. Laboratory testing is needed to identify the virus, but B is the best listed option."
  },
  "medicine-midterm-430-git-hepatobiliary-q042": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 16,
    "topic": "HCV antibody then RNA",
    "status": "supported",
    "answer": "A",
    "opinion": "Anti-HCV/ELISA is the usual initial test. A positive result requires RNA to confirm current infection; RNA may be used directly after recent exposure or in immunocompromise."
  },
  "medicine-midterm-441-cardiology-q020": {
    "lecture": "Esophageal Diseases",
    "page": 15,
    "topic": "Eosinophilic esophagitis",
    "status": "supported",
    "answer": "D",
    "opinion": "Solid-food dysphagia with atopy and a biopsy showing over 80 eosinophils/hpf supports EoE. The usual histological threshold is ≥15 with appropriate context and exclusion of other causes."
  },
  "medicine-midterm-441-git-hepatobiliary-q046": {
    "lecture": "Esophageal Diseases",
    "page": 11,
    "topic": "Zenker diverticulum",
    "status": "supported",
    "answer": "B",
    "opinion": "Dysphagia in an older person with neck gurgling and regurgitation of undigested food fits Zenker's diverticulum. Barium swallow demonstrates it; consider the risks of unguided endoscopy."
  },
  "medicine-midterm-441-git-hepatobiliary-q053": {
    "lecture": "Esophageal Diseases",
    "page": 10,
    "topic": "Oropharyngeal dysphagia",
    "status": "supported",
    "answer": "A",
    "opinion": "Difficulty initiating swallowing, choking and nasal regurgitation indicate oropharyngeal dysphagia, potentially from a CVA. This is not the usual achalasia pattern."
  },
  "medicine-midterm-441-git-hepatobiliary-q059": {
    "lecture": "Esophageal Diseases",
    "page": 7,
    "topic": "Dysphagia alarm in GERD",
    "status": "supported",
    "answer": "C",
    "opinion": "Dysphagia is an alarm feature warranting upper endoscopy, even when antacids improve heartburn. PPI alone does not complete the evaluation.",
    "sources": [
      "gerd"
    ]
  },
  "medicine-midterm-439-nephrology-q046": {
    "lecture": "Esophageal Diseases",
    "page": 12,
    "topic": "Plummer-Vinson syndrome",
    "status": "supported",
    "answer": "D",
    "opinion": "Iron deficiency with solid-food dysphagia in a young woman favors an esophageal web/Plummer–Vinson syndrome. Appropriate investigations are needed to document the cause."
  },
  "medicine-midterm-439-nephrology-q050": {
    "lecture": "Esophageal Diseases",
    "page": 7,
    "topic": "Uncomplicated GERD PPI trial",
    "status": "supported",
    "answer": "C",
    "opinion": "Heartburn and regurgitation without alarm features support an initial PPI trial. Endoscopy or manometry is not required for every patient with this pattern."
  },
  "medicine-midterm-439-nephrology-q053": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Adenocarcinoma after chronic GERD",
    "status": "supported",
    "answer": "C",
    "opinion": "Progressive solid-food dysphagia and weight loss in an older patient with GERD raise concern for esophageal cancer, particularly adenocarcinoma. Confirm with endoscopy and biopsy."
  },
  "medicine-midterm-439-nephrology-q059": {
    "lecture": "Esophageal Diseases",
    "page": 7,
    "topic": "Reflux monitoring with normal endoscopy",
    "status": "supported",
    "answer": "B",
    "opinion": "Normal endoscopy does not exclude GERD. Ambulatory pH or impedance-pH monitoring documents reflux when the diagnosis remains unproven, usually off PPI in this setting.",
    "sources": [
      "esophagus-tests"
    ]
  },
  "medicine-midterm-439-nephrology-q060": {
    "lecture": "Esophageal Diseases",
    "page": 16,
    "topic": "Bisphosphonate pill esophagitis",
    "status": "supported",
    "answer": "B",
    "opinion": "Odynophagia after starting osteoporosis medication suggests bisphosphonate-induced injury. Medication timing and administration technique support the diagnosis."
  },
  "medicine-midterm-438-git-hepatobiliary-q047": {
    "lecture": "Esophageal Diseases",
    "page": 4,
    "topic": "LES and crural diaphragm",
    "status": "supported",
    "answer": "A",
    "opinion": "The antireflux barrier combines circular smooth muscle in the LES with striated diaphragmatic muscle. Diaphragmatic muscle is not smooth muscle."
  },
  "medicine-midterm-438-git-hepatobiliary-q054": {
    "lecture": "Esophageal Diseases",
    "page": 11,
    "topic": "Zenker diverticulum",
    "status": "supported",
    "answer": "B",
    "opinion": "Undigested-food regurgitation and gurgling with chronic dysphagia favor Zenker's diverticulum over achalasia. Two missing options do not remove these clues but prevent a complete comparison."
  },
  "medicine-midterm-438-git-hepatobiliary-q056": {
    "lecture": "Esophageal Diseases",
    "page": 10,
    "topic": "Oropharyngeal dysphagia and typo",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Choking and nasal regurgitation favor a neurological oropharyngeal cause. D may intend CVA but is printed CVS; an ambiguous abbreviation cannot establish the diagnosis."
  },
  "medicine-midterm-438-git-hepatobiliary-q058": {
    "lecture": "Esophageal Diseases",
    "page": 15,
    "topic": "Eosinophilic esophagitis",
    "status": "supported",
    "answer": "C",
    "opinion": "Asthma and atopy with solid-food dysphagia and over 80 eosinophils/hpf support EoE despite missing option D. Interpret biopsy findings in their clinical context."
  },
  "medicine-midterm-438-git-hepatobiliary-q060": {
    "lecture": "Esophageal Diseases",
    "page": 7,
    "topic": "Dysphagia alarm in GERD",
    "status": "supported",
    "answer": "B",
    "opinion": "Dysphagia warrants endoscopy despite improvement of heartburn with antacids. Response to acid treatment does not exclude a tumor or stricture.",
    "sources": [
      "gerd"
    ]
  },
  "medicine-midterm-437-git-hepatobiliary-q033": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Mass versus Barrett metaplasia",
    "status": "conflict",
    "answer": null,
    "opinion": "A lower-esophageal mass with dysphagia suggests a tumor requiring biopsy. Barrett's is a mucosal change and risk factor, not a label for any mass; adenocarcinoma is absent from the options.",
    "sources": [
      "gerd"
    ]
  },
  "medicine-midterm-437-git-hepatobiliary-q034": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Barrett adenocarcinoma precursor",
    "status": "supported",
    "answer": "B",
    "opinion": "Barrett's can precede adenocarcinoma in chronic GERD, making B appropriate if the question asks about a predisposing cause. The mass itself requires biopsy and should not directly be called Barrett's."
  },
  "medicine-midterm-435-git-hepatobiliary-q043": {
    "lecture": "Esophageal Diseases",
    "page": 15,
    "topic": "Distal esophageal spasm",
    "status": "supported",
    "answer": "A",
    "opinion": "A corkscrew appearance with chest pain and intermittent solid- and liquid-food dysphagia supports distal esophageal spasm. Manometry confirms the motility pattern."
  },
  "medicine-midterm-434-git-hepatobiliary-q045": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Esophageal cancer staging",
    "status": "supported",
    "answer": "B",
    "opinion": "EUS helps assess tumor depth and nodes after cancer is established. CT or other appropriate imaging evaluates metastases; EUS alone is not the entire staging assessment.",
    "note": "This section explains Barrett's and adenocarcinoma risk. It does not detail the CT/EUS staging sequence."
  },
  "medicine-midterm-432-git-hepatobiliary-q034": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Esophageal cancer staging",
    "status": "supported",
    "answer": "B",
    "opinion": "After diagnosing esophageal cancer, perform appropriate imaging for staging before selecting surgery or other treatment. CT is suitable among the options.",
    "note": "This section explains Barrett's and adenocarcinoma risk. It does not detail the CT/EUS staging sequence."
  },
  "medicine-midterm-431-git-hepatobiliary-q057": {
    "lecture": "Esophageal Diseases",
    "page": 13,
    "topic": "Achalasia bird-beak",
    "status": "supported",
    "answer": "C",
    "opinion": "Esophageal dilation with smooth tapering and solid- and liquid-food dysphagia favors achalasia. Manometry confirms it, and endoscopy excludes an obstructing lesion or tumor mimic."
  },
  "medicine-midterm-430-git-hepatobiliary-q034": {
    "lecture": "Esophageal Diseases",
    "page": 6,
    "topic": "Typical GERD symptoms",
    "status": "supported",
    "answer": "A",
    "opinion": "Heartburn and regurgitation are among the common GERD symptoms. Dysphagia is an alarm feature rather than the most common symptom."
  },
  "medicine-midterm-430-git-hepatobiliary-q035": {
    "lecture": "Esophageal Diseases",
    "page": 13,
    "topic": "Achalasia pattern",
    "status": "supported",
    "answer": "C",
    "opinion": "Solid- and liquid-food dysphagia from the outset with normal endoscopy suggests a motility disorder such as achalasia. Manometry is needed for confirmation."
  },
  "medicine-midterm-430-git-hepatobiliary-q039": {
    "lecture": "Esophageal Diseases",
    "page": 8,
    "topic": "Progressive solid dysphagia alarm",
    "status": "supported",
    "answer": "A",
    "opinion": "Progressive solid-food dysphagia in an older woman raises concern for obstruction or cancer. Endoscopy and biopsy are needed; absence of GERD does not exclude cancer."
  },
  "medicine-midterm-430-git-hepatobiliary-q044": {
    "lecture": "Esophageal Diseases",
    "page": 7,
    "topic": "GERD acid suppression",
    "status": "supported",
    "answer": "B",
    "opinion": "PPI is appropriate initial treatment for heartburn and regurgitation without alarm features, alongside lifestyle measures and further assessment if symptoms persist."
  },
  "medicine-midterm-442-git-hepatobiliary-q043": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 12,
    "topic": "Celiac serology with dermatitis",
    "status": "supported",
    "answer": "C",
    "opinion": "Chronic diarrhea, iron-deficiency anemia and a dermatitis-herpetiformis-like rash suggest celiac disease. Start with tTG-IgA and total IgA while the patient is consuming gluten."
  },
  "medicine-midterm-442-git-hepatobiliary-q047": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 12,
    "topic": "Celiac serology and villous atrophy",
    "status": "supported",
    "answer": "B",
    "opinion": "Villous atrophy with iron deficiency and autoimmune thyroid disease supports celiac disease. tTG-IgA with total IgA complements symptoms and biopsy findings."
  },
  "medicine-midterm-439-nephrology-q045": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 20,
    "topic": "Exocrine pancreatic insufficiency",
    "status": "supported",
    "answer": "A",
    "opinion": "Steatorrhea, pain radiating to the back, alcohol exposure/diabetes and reassuring intestinal tests favor EPI from chronic pancreatitis. Fecal elastase and pancreatic assessment are useful."
  },
  "medicine-midterm-439-nephrology-q054": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 15,
    "topic": "Whipple prolonged antibiotics",
    "status": "supported",
    "answer": "B",
    "opinion": "PAS-positive macrophages with steatorrhea and joint symptoms support Whipple's disease, which requires prolonged antimicrobial therapy. Specialist assessment determines the precise regimen and duration."
  },
  "medicine-midterm-439-nephrology-q055": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 17,
    "topic": "SIBO versus ileal bile-acid loss",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Bloating, low B12 and preserved folate may support SIBO and antibiotic treatment. Ileal resection can also cause bile-acid loss; missing resection length and investigations prevent a definitive correction to A.",
    "sources": [
      "sibo"
    ]
  },
  "medicine-midterm-435-git-hepatobiliary-q042": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 13,
    "topic": "Celiac villous atrophy",
    "status": "supported",
    "answer": "A",
    "opinion": "Diarrhea, bloating and anemia with villous atrophy favor celiac disease among the options. Confirm using serology and context because villous atrophy is not exclusive to celiac disease."
  },
  "medicine-midterm-435-git-hepatobiliary-q046": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 17,
    "topic": "SIBO nutrient pattern",
    "status": "needs-review",
    "answer": "D",
    "opinion": "Bloating with low B12 and normal/high folate after surgery fits SIBO among the options. Ileal resection itself can also cause B12 deficiency and bile-acid problems.",
    "sources": [
      "sibo"
    ]
  },
  "medicine-midterm-435-git-hepatobiliary-q048": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 14,
    "topic": "Whipple PAS-positive macrophages",
    "status": "supported",
    "answer": "A",
    "opinion": "PAS-positive foamy macrophages on small-bowel biopsy with steatorrhea favor Whipple's disease. PCR can confirm the organism when needed because PAS alone is not fully specific."
  },
  "medicine-midterm-435-git-hepatobiliary-q053": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 12,
    "topic": "Celiac testing after gluten avoidance",
    "status": "needs-review",
    "answer": "A",
    "opinion": "The usual test is tTG-IgA with total IgA, but a gluten-free diet may produce a false-negative result. Plan a supervised gluten challenge or other investigations before excluding celiac disease.",
    "sources": [
      "celiac"
    ]
  },
  "medicine-midterm-434-git-hepatobiliary-q041": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 12,
    "topic": "Celiac in chronic diarrhea",
    "status": "supported",
    "answer": "A",
    "opinion": "Celiac serology is appropriate in chronic diarrhea, including IBS-like symptoms not improved by lactose avoidance. Endoscopy depends on the results and alarm features."
  },
  "medicine-midterm-434-git-hepatobiliary-q042": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 12,
    "topic": "Celiac multisystem clues",
    "status": "supported",
    "answer": "C",
    "opinion": "An elbow rash, anemia and hypocalcemia with GI symptoms suggest celiac disease/dermatitis herpetiformis. Start serology while the patient is consuming gluten."
  },
  "medicine-midterm-430-git-hepatobiliary-q030": {
    "lecture": "Chronic Diarrhea Including Celiac Disease",
    "page": 4,
    "topic": "Osmotic lactose diarrhea",
    "status": "supported",
    "answer": "C",
    "opinion": "Lactase deficiency leaves lactose as an intestinal osmole, causing osmotic diarrhea that improves with fasting or trigger avoidance. Cholera causes a secretory pattern."
  },
  "medicine-midterm-438-git-hepatobiliary-q048": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "Fistulizing Crohn biologic treatment",
    "status": "conflict",
    "answer": "A",
    "opinion": "Infliximab, an anti-TNF agent, supports fistula closure. Ciprofloxacin may be an adjunct but is not the best treatment alone; exclude or drain an abscess.",
    "sources": [
      "ibd"
    ],
    "note": "The citation is to the IBD treatment section. Detailed fistula recommendations/TNF mechanisms are explained in the review and its sources; this is not a claim that the exact question is printed there."
  },
  "medicine-midterm-438-git-hepatobiliary-q051": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 31,
    "topic": "Crohn skip lesions",
    "status": "supported",
    "answer": "D",
    "opinion": "Skip lesions and ileal/small-bowel involvement support Crohn's disease, unlike the usually continuous colonic involvement of UC."
  },
  "medicine-midterm-436-git-hepatobiliary-q068": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 33,
    "topic": "Activity-linked extraintestinal manifestations",
    "status": "needs-review",
    "answer": [
      "B",
      "D"
    ],
    "opinion": "Erythema nodosum and type 1 peripheral arthritis can both track intestinal disease activity. Having both B and D prevents a single-answer interpretation.",
    "sources": [
      "ibd-eim"
    ],
    "note": "This section lists extraintestinal IBD manifestations. The relationship to activity and arthritis subtype is detailed in the external ECCO reference."
  },
  "medicine-midterm-436-git-hepatobiliary-q069": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "UC versus Crohn histology",
    "status": "needs-review",
    "answer": "A",
    "opinion": "Crypt abscesses favor UC in the teaching comparison, whereas transmural inflammation favors Crohn's. Abscesses are not entirely UC-specific, and two options are missing."
  },
  "medicine-midterm-436-git-hepatobiliary-q074": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "Infliximab mechanism",
    "status": "supported",
    "answer": "A",
    "opinion": "Infliximab is an antibody that binds TNF-α and inhibits its effects. It is not a folate inhibitor, phospholipase inhibitor or 5-ASA agent.",
    "note": "The citation is to the IBD treatment section. Detailed fistula recommendations/TNF mechanisms are explained in the review and its sources; this is not a claim that the exact question is printed there."
  },
  "medicine-midterm-436-git-hepatobiliary-q078": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 33,
    "topic": "Erythema nodosum and disease activity",
    "status": "supported",
    "answer": "A",
    "opinion": "Erythema nodosum often tracks IBD activity. Uveitis and PSC may follow courses more independent of intestinal activity.",
    "sources": [
      "ibd-eim"
    ],
    "note": "This section lists extraintestinal IBD manifestations. The relationship to activity and arthritis subtype is detailed in the external ECCO reference."
  },
  "medicine-midterm-434-git-hepatobiliary-q040": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 31,
    "topic": "Crohn perianal fistula",
    "status": "supported",
    "answer": "C",
    "opinion": "A perianal fistula supports Crohn's more than UC, which is usually limited to the mucosa and does not produce this fistulizing pattern."
  },
  "medicine-midterm-433-git-hepatobiliary-q049": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "IBD-associated colorectal cancer risk",
    "status": "supported",
    "answer": "C",
    "opinion": "Longstanding colonic IBD increases colorectal cancer risk according to duration, inflammatory extent and associated factors. Constipation alone is not the most important listed risk factor."
  },
  "medicine-midterm-432-git-hepatobiliary-q032": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 32,
    "topic": "pANCA association not diagnosis",
    "status": "needs-review",
    "answer": "A",
    "opinion": "pANCA is more associated with UC than ASCA but is not sufficiently specific to diagnose it. The question overstates specificity; endoscopy and biopsies are central to assessment.",
    "sources": [
      "uc"
    ],
    "note": "The lecture describes UC and its features. External ACG recommendations explain the limitations of pANCA as a diagnostic test."
  },
  "medicine-midterm-432-git-hepatobiliary-q033": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 31,
    "topic": "Crohn granuloma",
    "status": "supported",
    "answer": "D",
    "opinion": "Noncaseating granulomas support Crohn's when present but are absent in many cases. Continuous colitis and crypt abscesses favor UC in the teaching comparison."
  },
  "medicine-midterm-438-git-hepatobiliary-q052": {
    "lecture": "Abnormal Liver Enzymes with Selected Common Liver Diseases",
    "page": 22,
    "topic": "PSC cholangiographic beading",
    "status": "needs-review",
    "answer": "A",
    "opinion": "UC with multifocal duct narrowing and dilation on MRCP supports PSC. Positive ANA/ASMA is not required; the remaining options are missing.",
    "sources": [
      "psc"
    ]
  },
  "medicine-midterm-435-git-hepatobiliary-q041": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 9,
    "topic": "Acute gastroenteritis and shock",
    "status": "supported",
    "answer": "A",
    "opinion": "Acute diarrhea with BP 75/45 requires monitored IV resuscitation with isotonic fluid. The citation covers the acute abdominal-pain differential rather than a fluid protocol.",
    "note": "This section lists gastroenteritis within the acute abdominal-pain differential. Resuscitation fluid selection depends on shock and dehydration rather than the chronic-diarrhea topic."
  },
  "medicine-midterm-431-git-hepatobiliary-q042": {
    "lecture": "Abdominal Pain Including IBS",
    "page": 9,
    "topic": "Acute gastroenteritis and shock",
    "status": "supported",
    "answer": "A",
    "opinion": "BP 70/50 with dehydration in an older woman warrants admission and IV resuscitation. Oral rehydration with discharge is inappropriate while unstable.",
    "note": "This section lists gastroenteritis within the acute abdominal-pain differential. Resuscitation fluid selection depends on shock and dehydration rather than the chronic-diarrhea topic."
  }
};

  const counts = { total: 0, lectureAnchored: 0, outsideLecture: 0, conflict: 0, needsReview: 0 };
  for (const question of window.GIFT445_QUESTIONS || []) {
    if (question.subjectId !== "medicine" || question.assessment !== "Midterm" ||
        !["Nephrology", "Gastroenterology"].includes(question.cycle)) continue;
    const review = reviews[question.id];
    if (!review) continue;
    counts.total++;
    const oldOrder = question.referenceOrder ?? 999;
    question.lecture = review.lecture;
    const sequenceIndex = lectureSequence[question.cycle].indexOf(review.lecture);
    question.lectureOrder = sequenceIndex >= 0 ? sequenceIndex + 1 : 999;
    const file = lectureFiles[review.lecture];
    if (file && Number.isInteger(review.page) && review.page > 0) {
      question.lectureEvidence = {
        title: file[1], page: review.page,
        url: `https://drive.google.com/file/d/${file[0]}/view?usp=drivesdk`,
        topic: review.topic,
        note: review.note || "Related teaching material in the Teamwork 444 lecture. The PDF page number includes the cover and does not necessarily identify the verbatim question."
      };
      question.referenceOrder = review.page * 1000 + oldOrder;
      counts.lectureAnchored++;
    } else {
      question.lectureEvidence = { outside: true, topic: review.topic,
        note: "This older MID-bank question concerns UTI in pregnancy, which is outside the specified Teamwork 444 Nephrology MID lectures. An external reference accompanies the review; no lecture citation has been invented." };
      question.referenceOrder = 999000 + oldOrder;
      counts.outsideLecture++;
    }
    question.aiAnswer = review.answer;
    question.verification = review.status;
    question.reviewOpinion = review.opinion;
    question.reviewedOn = "2026-10-05";
    question.aiSuggestion = review.answer ? null :
      "The available stem/options do not establish a single defensible answer; see the medical review below.";
    const refs = (review.sources || []).map(key => guidelines[key]).filter(Boolean)
      .map(([title, url]) => ({ title, url }));
    // Replace inherited generic references for this newly audited scope with question-specific sources.
    question.references = refs;
    if (question.verification === "conflict") counts.conflict++;
    if (question.verification === "needs-review") counts.needsReview++;
  }
  window.GIFT445_MID_444_RENAL_GI_REVIEW_COUNTS = counts;
  const all = (window.GIFT445_QUESTIONS || []).filter(question => question.subjectId === "medicine" &&
    question.assessment === "Midterm" && ["Cardiology", "Pulmonology", "Nephrology", "Gastroenterology"].includes(question.cycle));
  window.GIFT445_MID_444_REVIEW_COUNTS = {
    total: all.length,
    lectureAnchored: all.filter(question => question.lectureEvidence && !question.lectureEvidence.outside).length,
    outsideLecture: all.filter(question => question.lectureEvidence?.outside).length,
    conflict: all.filter(question => question.verification === "conflict").length,
    needsReview: all.filter(question => question.verification === "needs-review").length
  };
})();
