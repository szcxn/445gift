/* Medicine MID explanation completion, reviewed 2026-10-05.
   Explicit rationales replace generic/import placeholders; original questions and bank keys remain intact.
   Older MID questions outside the four current blocks receive explanations without invented lecture citations. */
(() => {
  const sources = {
  "pe": [
    "2026 AHA/ACC acute pulmonary embolism guideline",
    "https://www.acc.org/about-acc/press-releases/2026/02/19/19/27/first-ahaacc-acute-pulmonary-embolism-guideline-prompt-diagnosis-and-treatment-are-key"
  ],
  "acs": [
    "2025 AHA/ACC acute coronary syndromes guideline",
    "https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009"
  ],
  "valves": [
    "2025 ESC/EACTS valvular heart disease guideline",
    "https://academic.oup.com/eurheartj/article/46/44/4635/8234488"
  ],
  "hf": [
    "2022 AHA/ACC/HFSA heart failure guideline",
    "https://professional.heart.org/en/science-news/2022-guideline-for-the-management-of-heart-failure"
  ],
  "ie": [
    "2023 ESC infective endocarditis guideline",
    "https://academic.oup.com/eurheartj/article/44/39/3948/7243107"
  ],
  "dental": [
    "AHA: Prevention of infective endocarditis",
    "https://www.heart.org/-/media/files/health-topics/infective-endocarditis/infective-endocarditis-wallet-card.pdf"
  ],
  "pleural": [
    "2023 BTS pleural disease guideline",
    "https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/"
  ],
  "copd": [
    "GOLD 2026 COPD report",
    "https://goldcopd.org/2026-gold-report-and-pocket-guide/"
  ],
  "bronchiectasis": [
    "2025 ERS adult bronchiectasis guideline",
    "https://publications.ersnet.org/content/erj/66/6/2501126"
  ],
  "cf": [
    "Cystic Fibrosis Foundation: Fertility in men with CF",
    "https://www.cff.org/managing-cf/fertility-men-cf"
  ],
  "pcd": [
    "ATS: Diagnosis of primary ciliary dyskinesia",
    "https://www.thoracic.org/statements/resources/pldd/PCD-full-length.pdf"
  ],
  "asthma": [
    "GINA 2026 asthma strategy",
    "https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf"
  ],
  "cap": [
    "ATS/IDSA community-acquired pneumonia guideline",
    "https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/"
  ],
  "lung": [
    "NICE: Lung cancer diagnosis and staging",
    "https://www.nice.org.uk/guidance/ng122/chapter/Diagnosis-and-staging"
  ],
  "ild": [
    "ATS/ERS/JRS/ALAT: Diagnosis of idiopathic pulmonary fibrosis",
    "https://www.thoracic.org/statements/resources/interstitial-lung-disease/diagnosis-IPF-full-length.pdf"
  ],
  "tb": [
    "CDC: TB transmission and pathogenesis",
    "https://www.cdc.gov/tb/media/pdfs/Self_Study_Module_1_Transmission_and_Pathogenesis_of_Tuberculosis.pdf"
  ],
  "ethambutol": [
    "CDC: Adverse events during TB treatment",
    "https://www.cdc.gov/tb/hcp/treatment/adverse-events.html"
  ],
  "mers": [
    "CDC: Infection control for hospitalized MERS patients",
    "https://www.cdc.gov/mers/hcp/infection-control/index.html"
  ],
  "lipids": [
    "2026 ACC/AHA dyslipidemia guideline",
    "https://www.ahajournals.org/doi/pdf/10.1161/CIR.0000000000001423"
  ],
  "ckd": [
    "KDIGO 2024 CKD guideline",
    "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
  ],
  "lupus": [
    "KDIGO: Lupus nephritis guideline",
    "https://kdigo.org/guidelines/lupus-nephritis/"
  ],
  "celiac": [
    "ACG: Celiac disease",
    "https://gi.org/topics/celiac-disease/"
  ],
  "uc": [
    "ACG 2025 ulcerative colitis guideline",
    "https://doi.org/10.14309/ajg.0000000000003463"
  ],
  "uti": [
    "NICE: Acute pyelonephritis antimicrobial prescribing",
    "https://www.nice.org.uk/guidance/ng111/chapter/Recommendations"
  ],
  "sickle": [
    "ASH: Sickle cell disease cardiopulmonary and kidney disease guideline",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC6963257/"
  ],
  "syncope": [
    "Cough syncope: clinical review",
    "https://publications.ersnet.org/content/breathe/17/4/210094"
  ],
  "osa": [
    "AHA: Obstructive sleep apnea and cardiovascular disease",
    "https://professional.heart.org/en/guidelines-statements/obstructive-sleep-apnea-and-cardiovascular-disease-a-scientific-statement-fromcir0000000000000988"
  ],
  "vaccines": [
    "CDC: Adult immunization schedule notes",
    "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-notes.html"
  ],
  "af": [
    "2023 AHA/ACC atrial fibrillation guideline",
    "https://professional.heart.org/en/science-news/2023-guideline-for-the-diagnosis-and-management-of-atrial-fibrillation"
  ],
  "rf": [
    "WHO: Rheumatic fever and rheumatic heart disease guideline",
    "https://www.who.int/publications/i/item/9789240100077"
  ]
};
  const reviews = {
  "medicine-midterm-443-pulmonary-q018": {
    "explanation": "Milky pleural fluid suggests chylothorax from thoracic-duct obstruction. Lymphoma is the best listed cause, especially with fever, night sweats and anorexia. Confirm chyle with pleural triglycerides/chylomicrons; appearance alone is not definitive.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-443-pulmonary-q020": {
    "explanation": "Hemodynamically stable PE without an anticoagulation contraindication is treated with anticoagulation. A DOAC is an appropriate listed choice. Thrombolysis is reserved for selected patients with severe deterioration, and an IVC filter is not routine when anticoagulation is possible.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-443-pulmonary-q021": {
    "explanation": "Vomiting, a seizure and confusion impair airway protection and allow gastric contents to enter the lungs, supporting aspiration pneumonia. The temporal relationship to aspiration distinguishes this from pneumonia classified solely by its place of acquisition.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-443-pulmonary-q025": {
    "explanation": "Chronic productive cough with infertility raises suspicion for a mucociliary disorder. HRCT assesses bronchiectasis, while low nasal nitric oxide supports further evaluation for primary ciliary dyskinesia. Neither the symptoms nor nasal nitric oxide alone establishes the diagnosis.",
    "sources": [
      "pcd",
      "cf"
    ]
  },
  "medicine-midterm-443-pulmonary-q026": {
    "explanation": "During a bronchiectasis exacerbation, sputum culture identifies organisms and susceptibility to guide antibiotics. HRCT characterizes structural disease but does not identify the pathogen responsible for the current deterioration.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-443-pulmonary-q031": {
    "explanation": "Smoking cessation reduces ongoing smoke injury and slows COPD progression; influenza vaccination reduces preventable infections and exacerbations. Steam inhalation and chronic oral steroids do not offer equivalent preventive benefit.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-443-pulmonary-q032": {
    "explanation": "Pleural-fluid cytology looks for malignant cells and can establish malignant pleural involvement. A negative result does not exclude cancer; persistent suspicion may require pleural biopsy. Culture evaluates infection rather than confirming a tumor.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-442-cardiology-q003": {
    "explanation": "An immediate 12-lead ECG identifies STEMI and other ischemic changes that determine urgent treatment. Troponin is also needed, but waiting for it must not delay recognition of an ECG-defined reperfusion emergency.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-442-cardiology-q006": {
    "explanation": "A three-hour transfer prevents timely primary PCI. For STEMI within 12 hours, prompt fibrinolysis is appropriate when there are no contraindications, followed by transfer for a pharmacoinvasive strategy. The bank's 30-minute target is a traditional arrival-to-needle benchmark, not a reason to wait.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-442-cardiology-q009": {
    "explanation": "A pansystolic lower-left-sternal-border murmur that becomes louder on inspiration indicates tricuspid regurgitation. Increased right-sided venous return explains the inspiratory response; edema and hepatic discomfort support systemic venous congestion.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-442-cardiology-q010": {
    "explanation": "Duroziez sign is a to-and-fro femoral arterial murmur associated with significant aortic regurgitation. It reflects the large pulse-pressure and flow changes of the regurgitant lesion, rather than aortic stenosis.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-442-cardiology-q012": {
    "explanation": "The initial ECG rapidly assesses chest pain for acute ischemia and STEMI. Troponin complements the evaluation but should not delay the ECG; chest imaging is guided by the differential diagnosis afterward.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-442-cardiology-q014": {
    "explanation": "Confusion, age over 65, RR 30 and diastolic BP 55 indicate high-risk pneumonia; BUN may add another criterion depending on its units. Hospital care and urgent critical-care assessment are appropriate. Antibiotic breadth should be tailored to severity and resistance risks rather than the score alone.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-442-cardiology-q015": {
    "explanation": "Orthopnea and basal crackles indicate pulmonary congestion. Furosemide relieves fluid overload promptly. Beta-blockers and ACE inhibitors may contribute to longer-term treatment but are not substitutes for initial decongestion.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-442-cardiology-q017": {
    "explanation": "Symptomatic severe aortic stenosis requires valve-intervention assessment because medical treatment does not remove the fixed obstruction. Valve replacement is the appropriate listed definitive option; the valve team selects surgical or transcatheter treatment.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-442-pulmonary-q019": {
    "explanation": "A harsh crescendo-decrescendo systolic murmur at the right upper sternal border radiating to the carotids is characteristic of aortic stenosis. Exertional angina, syncope and dyspnea reinforce the diagnosis.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-442-pulmonary-q021": {
    "explanation": "Smoking cessation, appropriate inhaled therapy and vaccination address progression, symptoms and preventable exacerbations. Oxygen is prescribed for qualifying hypoxemia rather than routinely for every COPD patient.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-442-pulmonary-q022": {
    "explanation": "The postoperative presentation suggests PE, but V/Q mismatch is a physiological mechanism, not a named investigation. A V/Q scan may be intended by D, while CTPA is absent. The wording therefore does not support grading D as an unambiguous diagnostic test.",
    "sources": [
      "pe"
    ],
    "status": "needs-review",
    "answer": null
  },
  "medicine-midterm-442-pulmonary-q026": {
    "explanation": "Pneumonia with a moderate effusion and poor response to antibiotics warrants diagnostic thoracentesis to assess pH, glucose, LDH, Gram stain and culture. This identifies complicated infection that may require drainage in addition to antibiotics.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-442-pulmonary-q027": {
    "explanation": "An elevated D-dimer does not confirm PE. CTPA directly demonstrates pulmonary arterial filling defects and is the appropriate confirmatory test among these options when contrast is suitable.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-442-pulmonary-q028": {
    "explanation": "Recent surgery, new dyspnea, pleuritic pain and unilateral leg pain favor venous thromboembolism. A normal cardiopulmonary examination does not exclude PE; probability assessment and appropriate imaging are required.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-442-pulmonary-q029": {
    "explanation": "Dry cough, progressive dyspnea, fine inspiratory crackles and reticular/cystic basal changes suggest interstitial lung disease. HRCT defines the distribution and fibrosis pattern more precisely than ultrasound or blood gases.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-441-cardiology-q001": {
    "explanation": "Positive cardiac biomarkers indicate myocardial injury in an ischemic presentation. Isolated 0.5-mm ST elevation does not satisfy usual STEMI criteria; NSTEMI is the best listed diagnosis rather than unstable angina, which lacks acute necrosis.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-441-cardiology-q002": {
    "explanation": "Head nodding and an early diastolic decrescendo murmur suggest aortic regurgitation. The additional mid-diastolic rumble in a patient with rheumatic disease makes associated mitral stenosis plausible. Echocardiography distinguishes true mitral stenosis from an Austin Flint rumble due to severe AR.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-441-cardiology-q004": {
    "explanation": "Dental exposure and a previously damaged native valve make oral viridans streptococci a plausible cause of subacute endocarditis. This is a context-specific answer, not a claim that viridans is the most common organism overall. Blood cultures identify the pathogen.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-441-cardiology-q005": {
    "explanation": "Arthritis and a new apical pansystolic murmur after a sore throat suggest rheumatic fever with carditis. Salicylates address inflammatory symptoms and penicillin eradicates streptococcal infection; secondary prophylaxis is also needed.",
    "sources": [
      "rf"
    ]
  },
  "medicine-midterm-441-cardiology-q006": {
    "explanation": "Age 75, hypertension and diabetes confer substantial embolic risk in AF despite an asymptomatic, controlled ventricular rate. Anticoagulation is therefore appropriate. Apixaban dose depends on renal function, body weight and other dose-reduction criteria; a normal QTc does not remove AF-related stroke risk.",
    "sources": [
      "af"
    ]
  },
  "medicine-midterm-441-cardiology-q007": {
    "explanation": "The universal HF definition requires symptoms/signs from structural or functional cardiac abnormality corroborated by elevated natriuretic peptides or objective congestion. The printed naturopathic peptide should read natriuretic peptide; EF need not be below 40% in every HF phenotype.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-441-cardiology-q009": {
    "explanation": "A wide pulse pressure, hyperdynamic apex and a decrescendo diastolic murmur at the lower left sternal border indicate aortic regurgitation. A bicuspid valve can cause AR as well as stenosis; the diastolic timing distinguishes the lesions.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-441-cardiology-q010": {
    "explanation": "An aortic-area murmur with exertional syncope suggests aortic stenosis, whose ejection murmur commonly radiates to the carotids. A pure pansystolic murmur would instead suggest a regurgitant lesion.",
    "sources": [
      "valves"
    ],
    "status": "needs-review",
    "answer": [
      "A",
      "C"
    ]
  },
  "medicine-midterm-441-cardiology-q012": {
    "explanation": "Anterior ST elevation establishes a STEMI pattern, while EF 30% indicates reduced systolic function. The combination fits STEMI with HFrEF rather than preserved-EF failure or isolated right ventricular failure from PE.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-441-cardiology-q013": {
    "explanation": "Typical angina is provoked by exertion through increased myocardial oxygen demand. Reproducibility on palpation, pleuritic quality and positional variation favor alternative causes, although no single pain feature excludes ACS.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-441-cardiology-q016": {
    "explanation": "Aspirin plus clopidogrel is the standard listed antiplatelet combination with fibrinolysis. Two P2Y12 inhibitors are not combined, and prasugrel is not the routine initial adjunct to fibrinolytic treatment.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-441-cardiology-q017": {
    "explanation": "The key assumes mitral stenosis with pulmonary hypertension: a mobile stenotic mitral valve may produce a loud S1 and pulmonary hypertension a loud P2. Dyspnea, edema and hepatic discomfort alone do not establish that lesion; the missing valve and murmur findings make this a provisional explanation.",
    "sources": [
      "valves"
    ],
    "status": "needs-review",
    "answer": "C"
  },
  "medicine-midterm-441-cardiology-q018": {
    "explanation": "The lower-left-sternal-border location favors tricuspid regurgitation. Inspiration increases right-sided venous return and usually makes its pansystolic murmur louder; expiration more often accentuates left-sided murmurs.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-441-cardiology-q019": {
    "explanation": "For a patient presenting directly to a PCI-capable hospital, the conventional goal is device activation within 90 minutes of first medical contact. A transfer pathway uses a 120-minute goal. Reperfusion should occur as soon as possible rather than waiting for the limit.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-441-cardiology-q024": {
    "explanation": "Recurrent infections and copious morning sputum after a severe prior infection suggest bronchiectasis. Thin-section/high-resolution CT confirms abnormal bronchial dilation; spirometry describes functional impairment but does not establish the structural diagnosis.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-441-cardiology-q025": {
    "explanation": "A lymphocyte-predominant effusion in a patient from a TB-endemic setting raises concern for pleural TB. Pleural tissue can provide histology and culture when fluid studies are inconclusive. Negative cytology alone does not exclude malignancy, and ADA/culture findings should also inform the decision.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-441-cardiology-q027": {
    "explanation": "A moderate parapneumonic effusion requires sampling despite IV antibiotics. Thoracentesis distinguishes uncomplicated fluid from empyema or a complicated effusion that needs drainage; antibiotics alone may not control an infected pleural collection.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-441-cardiology-q028": {
    "explanation": "Post-bronchodilator FEV1/FVC below 0.7 establishes persistent airflow obstruction. FEV1 48% predicted falls in GOLD grade 3/severe airflow limitation. Symptom/exacerbation groups require separate information.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-441-cardiology-q030": {
    "explanation": "Smoking cessation removes the major ongoing cause of COPD injury and slows the accelerated decline in lung function. Bronchodilators and rehabilitation improve symptoms and function but do not replace cessation.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-441-cardiology-q031": {
    "explanation": "A first PE provoked by recent knee surgery is generally treated with a finite anticoagulation course of about three months when the provoking factor has resolved. Recurrent events, ongoing risks and bleeding risk can change that decision.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-441-cardiology-q032": {
    "explanation": "Persistent hypotension or shock indicates hemodynamic compromise and is the strongest listed trigger for urgent reperfusion assessment in PE. RV strain or hypoxemia alone warrants risk stratification but does not automatically mandate systemic thrombolysis.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-441-cardiology-q035": {
    "explanation": "Fever, dyspnea and an effusion after pneumonia raise concern for pleural infection. However, the stem omits the stated thoracentesis results. Empyema needs supporting pus, microbiology or a compatible fluid profile; it cannot be confirmed from this version alone.",
    "sources": [
      "pleural"
    ],
    "status": "needs-review",
    "answer": "A"
  },
  "medicine-midterm-439-cardiology-q006": {
    "explanation": "Injection drug use, fever and a lower-sternal pansystolic murmur favor tricuspid valve endocarditis. S. aureus is the classic organism in this setting; S. epidermidis is more associated with prosthetic-material infection.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-439-cardiology-q007": {
    "explanation": "As mitral stenosis becomes more severe, higher left atrial pressure opens the valve earlier after A2, shortening the A2-to-opening-snap interval. Echocardiographic valve area and gradients quantify severity; murmur loudness alone is unreliable.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-439-cardiology-q008": {
    "explanation": "Orthopnea, edema and exertional dyspnea indicate congestion despite EF 55%, making HFpEF the best listed diagnosis. Hypertension and diabetes predispose to impaired ventricular relaxation; objective filling-pressure or structural evidence supports confirmation.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-439-cardiology-q009": {
    "explanation": "Once HF is recognized, establishing its cause guides disease-specific treatment, such as treating ischemia or valve disease. Echocardiography is important; neither a chest radiograph nor ECG alone fully characterizes HF. Symptom treatment proceeds alongside etiological evaluation.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-439-cardiology-q010": {
    "explanation": "A prosthetic mitral valve is a high-risk condition qualifying for prophylaxis before relevant dental procedures. Remote uncomplicated ASD repair, isolated MVP and native aortic stenosis do not by themselves meet the same indication.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-439-cardiology-q011": {
    "explanation": "A slow-rising carotid pulse and late-peaking systolic murmur suggest significant aortic stenosis. Cardiology/echo assessment before elective surgery establishes severity and perioperative risk; automatically proceeding or permanently canceling without assessment is inappropriate.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-439-cardiology-q012": {
    "explanation": "Wedge pressure estimates left atrial pressure and approximates LV end-diastolic pressure when there is no important intervening mitral obstruction or other confounder. It is not a direct measurement of ventricular volume or compliance.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-439-pulmonary-q017": {
    "explanation": "Lifelong productive cough, familial disease, infertility, malabsorption and insulin-treated diabetes suggest cystic fibrosis. Exocrine pancreatic disease distinguishes this pattern from an isolated ciliary disorder; sweat chloride/genetic assessment confirms it.",
    "sources": [
      "cf"
    ]
  },
  "medicine-midterm-439-pulmonary-q018": {
    "explanation": "An unexplained unilateral effusion with weight loss warrants diagnostic thoracentesis after imaging confirmation. Fluid chemistry, cell counts, microbiology and cytology help identify infection or malignancy rather than assuming the cause.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-439-pulmonary-q021": {
    "explanation": "Loculation, turbid fluid and pleural pH 7.1 indicate complicated pleural infection. Chest-tube drainage plus antibiotics is required; continuing antibiotics alone does not adequately address the infected collection.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-439-pulmonary-q022": {
    "explanation": "Persistent pneumonia symptoms with stony dullness and reduced basal breath sounds suggest an associated effusion. Chest radiography is the best listed initial test to identify consolidation and fluid before planning further investigation.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-439-pulmonary-q024": {
    "explanation": "FEV1/FVC below 0.7 indicates obstruction, and post-bronchodilator FEV1 32% predicted is GOLD grade 3, severe airflow limitation. It is not very severe/grade 4 unless FEV1 is below 30%.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-439-pulmonary-q027": {
    "explanation": "Fine basal crackles with reticular and cystic changes suggest fibrotic interstitial lung disease. HRCT characterizes the pattern and extent; simple spirometry cannot determine the structural cause.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-439-pulmonary-q028": {
    "explanation": "Lymphocyte-predominant bloody pleural fluid and TB exposure raise suspicion for pleural TB. Pleural biopsy can provide histology and culture when fluid studies are insufficient. Bloody fluid is not TB-specific, so malignancy remains a differential diagnosis.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-438-cardiology-q001": {
    "explanation": "NSTEMI and unstable angina may have similar symptoms and ECG changes. An acute troponin rise/fall indicating necrosis distinguishes NSTEMI; unstable angina lacks biomarker evidence of acute myocardial injury.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-438-cardiology-q008": {
    "explanation": "Nitrates reduce preload and myocardial oxygen demand, relieving anginal symptoms. Aspirin, clopidogrel and statins address vascular events or disease progression but are not immediate symptom-relief equivalents.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-438-cardiology-q010": {
    "explanation": "Carvedilol is a reasonable listed addition for selected HF patients who are stable. EF above 40% does not establish HFrEF, so its mortality benefit cannot be assumed across all such patients. Exact EF, rhythm, congestion and HF phenotype are needed to finalize therapy.",
    "sources": [
      "hf"
    ],
    "status": "needs-review",
    "answer": "C"
  },
  "medicine-midterm-438-pulmonary-q017": {
    "explanation": "In cystic fibrosis with chronic respiratory symptoms, HRCT evaluates bronchiectasis and parenchymal complications. Spirometry is useful for function, but it does not define the structural changes asked about here.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-438-pulmonary-q019": {
    "explanation": "Failure to improve with antibiotics and a moderate effusion warrant thoracentesis to assess pleural infection and drainage needs. Reassurance or spirometry would not evaluate an infected pleural collection.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-438-pulmonary-q022": {
    "explanation": "Copious morning sputum and recurrent symptoms years after TB favor postinfectious bronchiectasis. Thin-section CT confirms it. Smoking exposure may coexist but does not make COPD the best explanation for this sputum pattern.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-438-pulmonary-q029": {
    "explanation": "Dullness with increased tactile/vocal fremitus suggests consolidation, because solidified lung transmits sound better. Chest radiography is the initial listed test; pleural fluid usually reduces fremitus instead.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-437-cardiology-q001": {
    "explanation": "ST elevation with raised troponin after resuscitated cardiac arrest indicates a reperfusion emergency. Urgent PCI is the preferred listed definitive intervention when available; warfarin or symptom treatment alone does not reopen the culprit artery.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-437-cardiology-q003": {
    "explanation": "Aortic stenosis causing left-sided HF raises pulmonary venous pressure and produces bibasal crackles. Raised JVP and peripheral edema can occur later with right-sided involvement but are less direct signs of initial pulmonary congestion.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-437-cardiology-q004": {
    "explanation": "A loud S1 and diastolic rumble indicate mitral stenosis. Elevated left atrial pressure and enlargement predispose to AF, explaining the irregularly irregular rhythm; pregnancy can worsen symptoms through increased circulatory demand.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-437-cardiology-q005": {
    "explanation": "Echocardiography evaluates valve obstruction and ventricular function when exertional dyspnea and chest pressure suggest structural disease despite a normal ECG/CXR. The stem provides limited examination findings, so ischemia testing may still be needed according to the full assessment.",
    "sources": [
      "valves"
    ],
    "status": "needs-review",
    "answer": "C"
  },
  "medicine-midterm-437-cardiology-q006": {
    "explanation": "Typical positive blood cultures and imaging evidence of endocardial involvement are major endocarditis criteria. Osler nodes are minor immunological findings; ECG changes and arthritis do not replace a major imaging criterion.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-437-cardiology-q007": {
    "explanation": "Mitral stenosis is suggested by a loud S1, opening snap and diastolic rumble. A beta-blocker slows the heart rate, lengthening diastolic filling and reducing symptoms. Anticoagulation requires a separate indication such as AF, embolism or atrial thrombus.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-437-cardiology-q008": {
    "explanation": "Fibrinolysis is generally considered within 12 hours of STEMI symptom onset when timely PCI is unavailable and there are no contraindications. The arrival-to-needle target is a different clock; treatment should be as early as possible.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-437-pulmonary-q009": {
    "explanation": "Heavy smoking, chronic productive cough and FEV1/FVC 0.51 support COPD. Persistent obstruction fits the diagnosis, but limited reversibility alone does not exclude asthma; appropriate post-bronchodilator spirometry and clinical assessment are needed.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-437-pulmonary-q010": {
    "explanation": "Legionella is an atypical CAP pathogen among the choices and may cause extrapulmonary symptoms. Pneumococcus and S. aureus are typical bacterial causes; organism identification requires appropriate testing when clinically indicated.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-437-pulmonary-q011": {
    "explanation": "Reduced expansion, diminished breath sounds and dullness over the lower right chest fit a right pleural effusion. Imaging confirms fluid; weight loss requires investigation of its cause, including malignancy.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-437-pulmonary-q012": {
    "explanation": "Weight loss with a protein-rich unilateral effusion makes malignancy a plausible listed cause. Protein above 30 g/L alone does not prove an exudate or cancer; use paired serum/pleural Light's criteria and cytology, with biopsy when needed.",
    "sources": [
      "pleural"
    ],
    "status": "needs-review",
    "answer": "A"
  },
  "medicine-midterm-437-pulmonary-q014": {
    "explanation": "The classic S1Q3T3 pattern is a deep S in lead I, Q wave in III and T-wave inversion in III. It reflects acute right-heart strain but is neither sensitive nor specific for PE and cannot confirm the diagnosis.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-437-pulmonary-q016": {
    "explanation": "Pleural infection typically lowers pH and glucose while raising LDH through inflammatory metabolism and cell injury. pH below 7.2 in a compatible parapneumonic effusion supports drainage assessment, alongside antibiotics.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-436-cardiology-q002": {
    "explanation": "Pulmonary crackles, elevated JVP, edema and LV hypertrophy indicate HF with congestion. EF 55% suggests a preserved-EF phenotype rather than excluding HF; longstanding severe hypertension is a plausible contributor.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-436-cardiology-q003": {
    "explanation": "Crackles, raised JVP and peripheral edema support HF despite EF 55%. Preserved EF does not exclude elevated filling pressures or diastolic dysfunction; COPD alone does not explain the combined congestion findings.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-436-cardiology-q004": {
    "explanation": "Chronic rheumatic mitral regurgitation repeatedly returns blood to the left atrium and ventricle, causing volume overload. Chordal rupture and AR from acute dissection more typically cause acute regurgitation; stenosis primarily produces pressure overload.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-436-cardiology-q007": {
    "explanation": "A mechanical valve qualifies for dental endocarditis prophylaxis. The usual regimen is a single antibiotic dose 30–60 minutes before the procedure, not routine repeated postprocedure doses. Anticoagulation management is a separate decision.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-436-cardiology-q008": {
    "explanation": "Sickle cell disease promotes thrombosis through endothelial activation, inflammation and a hypercoagulable state. Hemophilia and vitamin K deficiency primarily predispose to bleeding; liver disease has complex rebalanced hemostasis and is not uniformly protective from thrombosis.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-436-cardiology-q009": {
    "explanation": "The usual STEMI fibrinolysis eligibility window is within 12 hours of symptom onset when timely PCI is unavailable. This is separate from the shorter arrival-to-treatment goal; administer promptly after checking contraindications.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-436-cardiology-q010": {
    "explanation": "ACS is initially divided by the presence or absence of persistent ST elevation on ECG. Troponin then helps distinguish NSTEMI from unstable angina within non-ST-elevation presentations; risk factors alone do not classify the acute event.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-436-cardiology-q011": {
    "explanation": "An acute troponin rise/fall with at least one value above the reference limit plus evidence of ischemia supports MI. Ischemic symptoms provide that evidence here. Elevated troponin alone can reflect nonischemic myocardial injury.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-436-cardiology-q012": {
    "explanation": "A loud S1 in mitral stenosis implies leaflets still capable of moving and closing abruptly. Heavily calcified immobile valves may have a soft S1; loudness is not a reliable direct measure of stenosis severity.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-436-cardiology-q014": {
    "explanation": "A mechanical valve is a high-risk condition for endocarditis. Relevant dental procedures require a single prophylactic dose 30–60 minutes beforehand, rather than the day before or routine doses afterward.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-436-cardiology-q017": {
    "explanation": "Aortic stenosis produces an ejection systolic crescendo-decrescendo murmur from flow across the obstructed valve. A diastolic murmur suggests regurgitation or an atrioventricular stenotic lesion instead.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-436-cardiology-q018": {
    "explanation": "Chronic mitral regurgitation causes repeated regurgitant volume and dilation of the left atrium/ventricle. Chordal rupture or acute aortic dissection generally produces acute overload, while aortic stenosis produces pressure overload.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-436-cardiology-q019": {
    "explanation": "A prosthetic valve qualifies for prophylaxis before tooth extraction. The usual adult regimen, when appropriate and without allergy, is one dose 30–60 minutes beforehand. A routine day-before or postprocedure regimen is not required.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-436-cardiology-q020": {
    "explanation": "Evidence-based beta-blockers reduce mortality in stable HFrEF. Furosemide primarily relieves congestion; calcium-channel blockers and routine chronic inotropes do not provide equivalent HFrEF survival benefit. The statement should not be generalized to every preserved-EF case.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-436-cardiology-q021": {
    "explanation": "Rheumatic mitral regurgitation produces chronic left-sided volume overload. Ruptured chordae and AR from acute dissection are typically acute causes, whereas pulmonary stenosis is principally a pressure-overload lesion.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-436-pulmonary-q022": {
    "explanation": "Consolidated lung transmits centrally generated sounds, producing bronchial breathing and often increased fremitus. Stony dullness with reduced fremitus is more typical of pleural effusion.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-436-pulmonary-q024": {
    "explanation": "Bronchial breath sounds over peripheral lung indicate enhanced sound transmission through consolidation. Reduced fremitus favors pleural fluid or air; transmural inflammation is not a lung examination sign.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-436-pulmonary-q026": {
    "explanation": "If 0.6 and 0.7 are pleural-to-serum protein and LDH ratios, both meet Light's exudate thresholds. SLE is the most plausible inflammatory cause listed. If these are absolute concentrations instead, units and paired serum values are required.",
    "sources": [
      "pleural"
    ],
    "status": "needs-review",
    "answer": "D"
  },
  "medicine-midterm-436-pulmonary-q030": {
    "explanation": "Infertility, chronic airway disease and malabsorption improved by pancreatic enzymes suggest cystic fibrosis with exocrine pancreatic insufficiency. Pancreatic insufficiency alone does not explain the full respiratory and reproductive syndrome.",
    "sources": [
      "cf"
    ]
  },
  "medicine-midterm-436-pulmonary-q033": {
    "explanation": "Chronic productive cough with infertility and apparent pancreatic-enzyme use suggests CF-associated bronchiectasis. Bronchiectasis is the best listed pulmonary consequence, but the unnamed pill and incomplete history do not independently establish CF.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-436-pulmonary-q035": {
    "explanation": "Fine crackles, clubbing and basal reticular/cystic changes suggest fibrotic ILD. HRCT defines the fibrosis pattern and extent; blood gases and spirometry evaluate consequences rather than characterizing the morphology.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-436-pulmonary-q038": {
    "explanation": "Longstanding productive cough with very heavy smoking is compatible with COPD/chronic bronchitis. New hemoptysis and basal infiltrates are not adequately explained by COPD alone and require evaluation for malignancy, bronchiectasis and infection.",
    "sources": [
      "bronchiectasis"
    ],
    "status": "needs-review",
    "answer": "D"
  },
  "medicine-midterm-436-pulmonary-q040": {
    "explanation": "HRCT characterizes bronchiectasis and parenchymal changes in cystic fibrosis. Spirometry measures airflow limitation but does not define bronchial structural abnormalities.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-436-pulmonary-q042": {
    "explanation": "Aspiration is the classic association with anaerobic pneumonia, particularly with abscess or necrotizing infection. This association does not mean routine anaerobic antibiotic coverage is indicated for every aspiration episode.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-436-pulmonary-q045": {
    "explanation": "Recurrent airway infections from childhood with impaired fertility suggest primary ciliary dyskinesia. Infertility can reflect abnormal sperm motility; impotence is an imprecise term here. Specialized ciliary testing confirms the diagnosis.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-436-pulmonary-q048": {
    "explanation": "Decades of productive cough with morning hemoptysis and basal abnormalities favor bronchiectasis. HRCT confirms bronchial dilation; new or worsening bleeding still requires assessment for infection and other causes.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-435-cardiology-q001": {
    "explanation": "Aortic stenosis imposes a fixed outflow obstruction and can reduce cardiac output. Fever, Paget's disease and dialysis arteriovenous shunts more typically create high-output circulatory states.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-435-cardiology-q003": {
    "explanation": "Erythromycin is the conventional listed alternative for secondary rheumatic-fever prophylaxis in penicillin allergy. This is prolonged recurrence prevention, distinct from a single dental-procedure prophylactic dose; allergy severity and local prescribing guidance matter.",
    "sources": [
      "rf"
    ]
  },
  "medicine-midterm-435-cardiology-q004": {
    "explanation": "A diastolic apical murmur with prior recurrent pharyngitis suggests rheumatic mitral stenosis. A parasternal heave may reflect secondary pulmonary hypertension and right ventricular pressure load; echocardiography confirms the lesion.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-435-cardiology-q007": {
    "explanation": "With more severe aortic stenosis, ventricular ejection lasts longer and the murmur tends to peak later in systole. Echo velocity, gradients and valve area establish severity; murmur intensity alone is unreliable.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-435-cardiology-q008": {
    "explanation": "New HF near the end of pregnancy or early postpartum with reduced EF suggests peripartum cardiomyopathy after excluding other causes. Mild MR can be secondary to ventricular dilation rather than the primary cause.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-435-cardiology-q009": {
    "explanation": "Age-related calcific degeneration stiffens the aortic cusps and produces aortic stenosis. Rheumatic disease is a more typical explanation for mitral stenosis than isolated age-related aortic cusp calcification.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-435-cardiology-q011": {
    "explanation": "Manipulation of gingival tissue can introduce oral bacteria into the bloodstream and is a relevant prophylaxis procedure in high-risk cardiac patients. Routine GI/GU procedures do not automatically require endocarditis prophylaxis without another indication.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-435-cardiology-q013": {
    "explanation": "A harsh, late-peaking systolic murmur in an older adult favors calcific aortic stenosis. Aortic regurgitation is diastolic, and mitral regurgitation is typically pansystolic rather than an ejection murmur.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-435-cardiology-q014": {
    "explanation": "ST elevation is the intended listed early ECG change in an evolving STEMI. It is not universal for all MI, and hyperacute T waves may precede it; NSTEMI may instead show ST depression or T-wave inversion.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-435-pulmonary-q015": {
    "explanation": "Pseudomonas is an important pathogen in established CF lung disease, particularly later in life. S. aureus and other organisms are also possible; sputum culture guides treatment rather than the CF label alone identifying the current infection.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-435-pulmonary-q021": {
    "explanation": "Diabetes increases the risk of respiratory-infection complications. Pneumococcal vaccination and annual influenza vaccination are appropriate preventive measures, with the precise pneumococcal schedule determined by age and prior doses.",
    "sources": [
      "vaccines"
    ]
  },
  "medicine-midterm-435-pulmonary-q022": {
    "explanation": "Advanced COPD can have systemic effects, including cachexia and osteoporosis. These reflect chronic illness, inactivity and other risk factors; coarse crackles or age above a specified threshold alone are not defining systemic features.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-435-pulmonary-q023": {
    "explanation": "HF increases hydrostatic pressure, producing a transudative pleural effusion. TB and malignancy usually cause exudates through inflammation or impaired lymphatic drainage; use fluid studies and context when the diagnosis is uncertain.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-435-pulmonary-q026": {
    "explanation": "Paroxysmal coughing can transiently reduce cerebral perfusion through raised intrathoracic pressure, reduced venous return and reflex vasodilation. The bank's vasovagal label is a simplified explanation of cough syncope; exclude arrhythmia and other causes rather than diagnosing it from one episode alone.",
    "sources": [
      "syncope"
    ]
  },
  "medicine-midterm-435-pulmonary-q029": {
    "explanation": "Prior stroke, impaired swallowing and prolonged immobility increase aspiration risk. Fever, cough and acute dyspnea therefore favor aspiration pneumonia; being chronically bedbound alone does not establish hospital-acquired pneumonia.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-435-pulmonary-q030": {
    "explanation": "COPD hyperinflation increases chest volume, flattens the diaphragm and displaces the liver inferiorly. Bronchial breathing and coarse crackles are not the usual explanation for uncomplicated emphysematous hyperinflation.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-434-cardiology-q001": {
    "explanation": "Snoring, witnessed choking and daytime sleepiness suggest OSA. Intermittent hypoxia and sympathetic activation are associated with hypertension and cardiovascular disease, making ischemic heart disease the best listed complication. Symptoms require sleep-study confirmation.",
    "sources": [
      "osa"
    ]
  },
  "medicine-midterm-434-cardiology-q003": {
    "explanation": "HF symptoms with EF 55% in a chronically hypertensive patient fit HFpEF. Increased ventricular stiffness can raise filling pressure despite preserved systolic EF; hypertension alone does not establish an endocrine cause.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-434-cardiology-q004": {
    "explanation": "Gingival manipulation is a relevant dental exposure for viridans bacteremia. Prophylaxis applies to selected high-risk cardiac patients rather than every cardiac condition or every invasive procedure.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-434-cardiology-q005": {
    "explanation": "PND indicates HF from severe aortic stenosis and historically carries a poorer untreated prognosis than isolated angina or syncope. Modern symptomatic severe AS warrants prompt valve-intervention assessment regardless of which symptom appears first.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-434-cardiology-q006": {
    "explanation": "Persistent ST elevation separates STEMI from non-ST-elevation ACS initially. Troponin then identifies acute myocardial injury; risk factors and pain characteristics inform suspicion but do not replace this classification.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-434-cardiology-q008": {
    "explanation": "Aortic stenosis restricts forward flow and can produce low output. Anemia, fever and thyrotoxicosis more often cause increased circulatory demand and high-output states.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-434-cardiology-q009": {
    "explanation": "The symptoms suggest OSA, which is associated with hypertension and cardiac dysfunction and can contribute to HF. The shortened stem does not establish a specific ventricular phenotype or make LV failure inevitable; sleep and cardiac assessment are needed.",
    "sources": [
      "osa"
    ]
  },
  "medicine-midterm-434-cardiology-q011": {
    "explanation": "Inflammatory cells weaken a coronary plaque's fibrous cap through proteolytic activity. A large lipid-rich core and a thin cap favor rupture; a thick intact cap is relatively more stable.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-434-cardiology-q012": {
    "explanation": "Prosthetic valves confer a high risk of serious endocarditis complications. This is why they qualify for relevant dental prophylaxis; uncomplicated atrial septal defects do not carry the same indication.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-434-cardiology-q015": {
    "explanation": "Degenerative calcification of the aortic cusps causes progressive aortic stenosis with aging. A regurgitant lesion would instead primarily impair valve closure.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-434-cardiology-q019": {
    "explanation": "PCWP approximates left atrial pressure and, in suitable conditions, LV end-diastolic pressure. Mitral stenosis can dissociate these pressures; it is not a direct measure of circulating blood volume.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-434-pulmonary-q022": {
    "explanation": "Hyperinflation in COPD flattens the diaphragm and lowers the liver edge, often with a barrel-shaped chest. Blunted costophrenic angles instead suggest pleural fluid, and bronchial breathing suggests consolidation.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-434-pulmonary-q023": {
    "explanation": "Pseudomonas is a major CF airway pathogen, especially in older patients with established bronchiectasis. Age and culture history affect the organism distribution; obtain sputum cultures to identify the actual infection.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-434-pulmonary-q027": {
    "explanation": "Clubbing supports bronchiectasis more than uncomplicated COPD. Wheeze and crackles can overlap, while hyperinflation is compatible with COPD. New clubbing in a smoker also requires evaluation for malignancy or ILD.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-434-pulmonary-q029": {
    "explanation": "A lung mass with hemoptysis and weight loss requires tissue diagnosis. Bronchoscopy can obtain biopsy for an accessible central lesion; CT defines anatomy and may favor a percutaneous route for a peripheral lesion.",
    "sources": [
      "lung"
    ]
  },
  "medicine-midterm-434-pulmonary-q030": {
    "explanation": "Post-bronchodilator spirometry confirms persistent airflow obstruction in suspected COPD. Hyperinflation and smoking history support the clinical suspicion, but a chest radiograph or ABG alone does not establish the airflow criterion.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-434-pulmonary-q031": {
    "explanation": "Pleural pH below 7.2 in a compatible parapneumonic effusion indicates a high risk of complicated infection and supports drainage. The listed glucose threshold of 150 mg/dL is insufficiently specific compared with the low-pH criterion.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-433-cardiology-q001": {
    "explanation": "Two major modified Duke criteria can establish definite clinical endocarditis. Alternative combinations include one major plus three minor or five minor criteria; one major plus one minor is insufficient.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-433-cardiology-q002": {
    "explanation": "ST elevation is the intended early finding among these options for STEMI, while pathological Q waves often appear later. It is not the first change in every MI; hyperacute T waves or non-ST-elevation patterns may occur.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-433-cardiology-q004": {
    "explanation": "Ischemic chest pain with elevated troponin and T-wave inversion without diagnostic ST elevation fits NSTEMI. Unstable angina lacks acute biomarker evidence of necrosis; the printed troponin units should be checked.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-433-cardiology-q005": {
    "explanation": "MI impairs myocardial contractility and can produce low-output HF. Anemia, thyrotoxicosis and thiamine deficiency are classic causes of high-output failure through increased demand or reduced vascular resistance.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-433-cardiology-q007": {
    "explanation": "When prophylaxis is indicated for a relevant dental procedure, oral amoxicillin 2 g as a single dose 30–60 minutes beforehand is the standard adult listed regimen. Allergy or inability to take oral medication changes the agent.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-433-cardiology-q008": {
    "explanation": "An acute troponin rise/fall above the reference threshold plus evidence of ischemia supports MI. Ischemic symptoms satisfy the second component in A; isolated elevated troponin can be nonischemic myocardial injury.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-433-cardiology-q009": {
    "explanation": "Roth spots are retinal hemorrhages with pale centers and may occur in endocarditis. Osler nodes involve digits, Janeway lesions the palms/soles and splinter hemorrhages the nails. The described diastolic murmur radiating to the axilla is inconsistent and should be checked.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-433-cardiology-q010": {
    "explanation": "Myxomatous degeneration causes mitral leaflet redundancy/prolapse and can produce chronic MR in a middle-aged otherwise asymptomatic patient. Echocardiography distinguishes this from ischemic tethering or rheumatic damage; prevalence varies by population.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-433-cardiology-q011": {
    "explanation": "MR is an apical pansystolic murmur, often better appreciated in the left lateral position. Inspiration preferentially augments right-sided murmurs; handgrip can increase left-sided regurgitant murmurs.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-433-cardiology-q012": {
    "explanation": "A prosthetic valve is an explicit high-risk endocarditis condition. Isolated MR or uncomplicated MVP does not automatically qualify for prophylaxis; cardiac anomaly is too nonspecific without further details.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-433-cardiology-q013": {
    "explanation": "A large lipid core with a thin inflamed fibrous cap makes an atherosclerotic plaque vulnerable to rupture. A thick cap and less inflammation favor relative stability; aspirin is treatment rather than the causative plaque change.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-433-cardiology-q014": {
    "explanation": "PE can acutely increase RV afterload, producing a right-heart-strain ECG pattern. ECG supports risk assessment but cannot confirm PE; sinus tachycardia is more common than the classic S1Q3T3 pattern.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-433-cardiology-q015": {
    "explanation": "Tearing chest pain radiating to the interscapular back with an aortic diastolic murmur suggests aortic dissection involving the valve/root. Urgent aortic imaging is required; pain pattern alone does not establish the diagnosis.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-433-pulmonary-q016": {
    "explanation": "CHF raises hydrostatic pressure and commonly causes a transudate. Pneumonia, SLE pleuritis and malignancy usually produce inflammatory or lymphatic exudates; classify using Light's criteria and the clinical setting.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-433-pulmonary-q018": {
    "explanation": "Bilateral effusions without fever make CHF plausible, but clear yellow fluid is not diagnostic. Assess congestion, cardiac function and pleural chemistry; appearance alone cannot exclude malignancy or other causes.",
    "sources": [
      "pleural"
    ],
    "status": "needs-review",
    "answer": "B"
  },
  "medicine-midterm-433-pulmonary-q019": {
    "explanation": "Copious sputum, coarse crackles and hemoptysis years after TB support postinfectious bronchiectasis. HRCT confirms dilation; weight loss and hemoptysis also warrant assessment for recurrent TB or malignancy.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-433-pulmonary-q021": {
    "explanation": "SLE causes inflammatory pleuritis and an exudative effusion. CHF, cirrhosis and nephrotic syndrome more typically alter hydrostatic/oncotic pressures and cause transudates.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-433-pulmonary-q022": {
    "explanation": "Legionella is an atypical CAP pathogen. Pneumococcus, S. aureus and H. influenzae are conventional typical bacterial pathogens; the classification is not a substitute for microbiological testing.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-433-pulmonary-q023": {
    "explanation": "Clubbing is compatible with bronchiectasis and is unusual in uncomplicated COPD. Wheeze and crackles can occur in both; clubbing also prompts assessment for malignancy and fibrotic lung disease.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-433-pulmonary-q024": {
    "explanation": "Confusion and BP 80/60 indicate severe illness and possible sepsis/shock. Urgent resuscitation, IV antibiotics and critical-care assessment are appropriate; oral outpatient treatment or ED discharge is unsafe.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-433-pulmonary-q029": {
    "explanation": "ST elevation may appear early in STEMI and is the intended answer. MI does not always produce ST elevation, and hyperacute T waves may precede it. Obtain immediate and serial ECGs with troponin as indicated.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-433-git-hepatobiliary-q044": {
    "explanation": "Exertional chest pain, reduced carotid pulse volume and a single/soft S2 favor severe aortic stenosis. The semi-coma wording is unclear and must not be treated as a specific AS sign; echocardiography confirms severity.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-433-git-hepatobiliary-q045": {
    "explanation": "A prosthetic mitral valve is the highest-risk listed condition for serious endocarditis. VSD can confer risk, but uncomplicated ASD does not carry the same risk category or prophylaxis indication.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-432-cardiology-q001": {
    "explanation": "A diastolic rumble and loud S1 indicate mitral stenosis. Left atrial enlargement predisposes to AF, producing the irregularly irregular rapid pulse; pregnancy can unmask hemodynamic symptoms.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-432-cardiology-q002": {
    "explanation": "The history suggests OSA. Recurrent hypoxia and sympathetic activation are associated with cardiovascular disease, making ischemic heart disease the best listed complication. OSA requires objective sleep assessment and does not make CAD inevitable.",
    "sources": [
      "osa"
    ]
  },
  "medicine-midterm-432-cardiology-q006": {
    "explanation": "Aspirin reduces platelet-mediated thrombosis and mortality in acute MI. Furosemide treats pulmonary congestion, while digoxin and nifedipine are not substitutes for evidence-based antithrombotic and reperfusion care.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-432-cardiology-q007": {
    "explanation": "Orthopnea, PND, crackles and edema indicate HF despite normal systolic function. Hypertension, diabetes and obesity support a preserved-EF/diastolic phenotype. Wheeze can accompany cardiac congestion and need not represent asthma alone.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-432-cardiology-q008": {
    "explanation": "Prosthetic valves predispose to endocarditis and serious complications. The other lesions have differing risks, but a prosthetic mitral valve is the clearest high-risk listed condition.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-432-cardiology-q009": {
    "explanation": "Oxacillin is an antistaphylococcal penicillin appropriate for susceptible staphylococcal endocarditis. Actual treatment depends on allergy, valve type and susceptibility; benzathine penicillin is not appropriate therapy for MSSA endocarditis.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-432-cardiology-q011": {
    "explanation": "Ischemic chest pain with raised troponin and deep T-wave inversion without diagnostic ST elevation fits NSTEMI. Unstable angina does not have biomarker evidence of acute myocardial necrosis.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-432-cardiology-q013": {
    "explanation": "Presyncope, a low-volume carotid pulse, systolic murmur and single S2 suggest severe aortic stenosis. AR typically has a wide pulse pressure and a diastolic murmur rather than this obstructive pattern.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-432-cardiology-q014": {
    "explanation": "An apical diastolic murmur with loud S1 suggests mitral stenosis, often rheumatic in this context. Tachycardia worsens filling across the narrowed valve; echo establishes the anatomy and severity.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-432-cardiology-q015": {
    "explanation": "Transthoracic Doppler echocardiography is the initial test for suspected valve disease. It identifies anatomy, stenotic gradients, regurgitation and ventricular consequences; ECG does not directly characterize the lesion.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-432-pulmonary-q016": {
    "explanation": "Complicated parapneumonic effusion requires drainage to control pleural infection, usually through a chest tube plus antibiotics. Hepatic or uncomplicated lupus effusions do not routinely require tube drainage; a lung abscess is a different anatomical process.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-432-pulmonary-q019": {
    "explanation": "Pneumonia produces inflammation and increased pleural permeability, causing a parapneumonic exudate. CHF, liver failure and nephrotic syndrome more typically cause transudates through pressure imbalance.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-432-pulmonary-q020": {
    "explanation": "Spirometry confirms COPD by demonstrating persistent post-bronchodilator airflow obstruction. Smoking history and hyperinflation support suspicion, while ABG evaluates gas exchange rather than establishing the airflow diagnosis.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-432-pulmonary-q021": {
    "explanation": "Progressive dyspnea, clubbing, cyanosis and basal reticulonodular changes favor pulmonary fibrosis/ILD. HRCT evaluates the pattern; uncomplicated COPD does not usually produce clubbing with this imaging pattern.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-432-pulmonary-q022": {
    "explanation": "A parapneumonic effusion with pH around 7.2 warrants drainage assessment and antibiotics because it lies at the high-risk threshold for complicated infection. Immediate decortication is not the usual first drainage step.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-432-pulmonary-q023": {
    "explanation": "HRCT is the relevant CT protocol for characterizing suspected ILD after clinical and radiographic assessment. It identifies fibrosis patterns; spirometry evaluates function but cannot define the structural subtype.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-432-pulmonary-q024": {
    "explanation": "Pleural TB causes inflammatory, commonly lymphocyte-rich exudative fluid. Cirrhosis, CHF and nephrotic syndromes usually cause transudates, although mixed mechanisms can occur.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-431-cardiology-q001": {
    "explanation": "A loud S1, opening snap and rumbling diastolic murmur are characteristic of mitral stenosis. Echo confirms the lesion and quantifies its severity even with a normal ECG.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q002": {
    "explanation": "An ACE inhibitor such as captopril is appropriate after MI when indicated and tolerated, limiting adverse ventricular remodeling and improving outcomes, particularly with LV dysfunction or HF. Check BP, renal function and potassium; routine antiarrhythmic prophylaxis is not equivalent.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-431-cardiology-q003": {
    "explanation": "Fever and new valve findings with painful fingertip lesions in pre-existing valve disease suggest endocarditis. The tender lesions are compatible with Osler nodes; obtain blood cultures and echocardiography.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-431-cardiology-q004": {
    "explanation": "A systolic thrill indicates substantial turbulence and supports a significant valve lesion, making it the best listed sign. It does not independently grade AS severity; Doppler gradients and valve area are required.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q008": {
    "explanation": "Mitral regurgitation can produce a soft S1 because effective mitral closure is impaired, together with an apical pansystolic murmur. Inspiratory accentuation suggests a right-sided lesion; Corrigan's pulse is associated with AR.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q009": {
    "explanation": "Tearing central pain radiating directly to the back and an aortic diastolic murmur suggest aortic dissection with root/valve involvement. Urgent imaging is required; preserved oxygen saturation does not exclude this emergency.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q014": {
    "explanation": "An opening snap with a mid-diastolic murmur suggests mitral stenosis even without symptoms. Echocardiography evaluates valve area, gradients and pulmonary pressure; ASO reflects streptococcal exposure rather than current valve severity.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q015": {
    "explanation": "A decrescendo diastolic left-sternal murmur and wide pulse pressure favor aortic regurgitation. Basal crackles suggest pulmonary congestion from its hemodynamic effects; echo confirms the lesion and ventricular consequences.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-431-cardiology-q017": {
    "explanation": "Fever, night sweats, tender fingertip lesions and microscopic hematuria after dental exposure suggest endocarditis. Multiple blood-culture sets identify the organism and provide major diagnostic evidence; echo is also required for the full evaluation.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-431-pulmonary-q023": {
    "explanation": "Recent surgery, pleuritic pain, dyspnea and leg discomfort raise suspicion for PE. Heparin is the listed anticoagulant and may be started during urgent evaluation when probability is high and bleeding risk is acceptable. It is not a substitute for confirming the diagnosis.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-431-pulmonary-q025": {
    "explanation": "Chest radiography is an appropriate initial imaging test for a stable suspected pneumothorax. Bedside ultrasound can also identify it in suitable settings. Suspected tension pneumothorax with instability requires immediate treatment without waiting for imaging.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-431-pulmonary-q026": {
    "explanation": "Pneumococcus is a common typical CAP pathogen and the intended answer. The organism cannot be confirmed from pneumonia symptoms alone; local epidemiology and microbiological results may change treatment.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-431-pulmonary-q028": {
    "explanation": "Smoking exposure plus persistent obstruction supports COPD. Limited reversibility alone does not establish it or exclude asthma; the exposure history and appropriate spirometry provide the relevant additional evidence.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-431-pulmonary-q029": {
    "explanation": "Reduced expansion, decreased fremitus and breath sounds, and dullness at the right base favor a pleural effusion. Consolidation more typically increases fremitus and produces bronchial breathing; imaging confirms the fluid.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-431-pulmonary-q033": {
    "explanation": "Fine inspiratory crackles, clubbing and chronic dyspnea favor fibrotic ILD/pulmonary fibrosis. Coarse crackles with copious sputum more strongly suggest bronchiectasis; HRCT defines the diagnosis.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-431-git-hepatobiliary-q051": {
    "explanation": "Chronic productive cough with regular sputum expectoration is the usual symptom of bronchiectasis. Hemoptysis and exacerbation-related fever may occur but are not the universal presenting symptom.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-431-git-hepatobiliary-q052": {
    "explanation": "Chronic cough since childhood, recurrent purulent sputum, basal coarse crackles and hemoptysis favor bronchiectasis. Large-volume hemoptysis is an emergency regardless of the underlying diagnosis and requires airway and bleeding-source assessment.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-431-git-hepatobiliary-q053": {
    "explanation": "Recurrent sinus and chest infections with lower-lobe bronchiectasis support PCD, but true azoospermia means absent sperm rather than the impaired motility typical of PCD. CF can cause obstructive azoospermia; the infertility wording prevents a unique confident choice without further evaluation.",
    "sources": [
      "cf",
      "pcd"
    ],
    "status": "needs-review",
    "answer": "C"
  },
  "medicine-midterm-430-cardiology-q002": {
    "explanation": "A prosthetic valve qualifies for dental endocarditis prophylaxis before relevant procedures. Isolated MVP, aortic stenosis or hypertrophic cardiomyopathy does not automatically qualify under the same high-risk criteria.",
    "sources": [
      "dental"
    ]
  },
  "medicine-midterm-430-cardiology-q003": {
    "explanation": "S. aureus is a major cause of endocarditis in injection drug users, often involving the tricuspid valve. Blood cultures are still needed to identify the actual pathogen and susceptibility.",
    "sources": [
      "ie"
    ]
  },
  "medicine-midterm-430-cardiology-q004": {
    "explanation": "Positional chest pain with widespread ST elevation across multiple territories favors acute pericarditis over a single-territory STEMI. Assess ECG morphology, reciprocal changes, troponin and echo; diffuse ST elevation alone is not sufficient to dismiss ACS.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-430-cardiology-q005": {
    "explanation": "ACE inhibitors improve survival in HFrEF by reducing maladaptive RAAS effects and ventricular remodeling. Diuretics and nitrates primarily relieve symptoms; modern HFrEF treatment also includes other disease-modifying drug classes.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-430-cardiology-q006": {
    "explanation": "The usual fibrinolysis window is within 12 hours of STEMI symptoms if timely primary PCI is unavailable and contraindications are absent. Earlier administration gives greater benefit; this is not an instruction to delay until 12 hours.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-430-cardiology-q011": {
    "explanation": "Orthopnea, PND, crackles and edema with EF 65% suggest HFpEF/diastolic dysfunction. Obesity, diabetes and severe hypertension are relevant risk factors; wheeze does not make asthma the sole explanation.",
    "sources": [
      "hf"
    ]
  },
  "medicine-midterm-430-pulmonary-q012": {
    "explanation": "COPD produces airflow obstruction with a reduced post-bronchodilator FEV1/FVC ratio. Emphysema may lower DLCO and increase lung volumes; low TLC instead suggests restriction.",
    "sources": [
      "copd"
    ]
  },
  "medicine-midterm-430-pulmonary-q013": {
    "explanation": "Pleuritic pain, dyspnea and unilateral leg swelling suggest PE. Spiral CT intended as CTPA confirms pulmonary arterial defects when contrast is suitable; D-dimer cannot confirm PE, and catheter angiography is not routine first-line testing.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-430-pulmonary-q015": {
    "explanation": "A substantial effusion following pneumonia warrants sampling and infection assessment, with antibiotics and hospital care as indicated. Sampling informs whether a drain is needed; automatic discharge without assessing pleural infection is inappropriate.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-430-pulmonary-q016": {
    "explanation": "Post-TB upper-lobe bronchiectasis may present with prominent hemoptysis and little sputum, historically termed dry bronchiectasis. Childhood infections are recognized causes; dust exposure is not a general primary bronchiectasis diagnosis.",
    "sources": [
      "bronchiectasis"
    ]
  },
  "medicine-midterm-430-pulmonary-q018": {
    "explanation": "Pleural pH 7.01 is the clearest listed drainage indication in a compatible parapneumonic effusion. Protein/LDH support an exudate and low glucose also indicates infection, but marked acidity identifies a complicated collection requiring drainage assessment.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-430-pulmonary-q019": {
    "explanation": "Bird-derived protein antigens can trigger hypersensitivity pneumonitis; keeping parrots provides a relevant exposure. Coal/silica cause different occupational lung diseases. Exposure history must be integrated with HRCT and other findings to confirm HP.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-439-cardiology-q001": {
    "explanation": "Degenerative calcification is the commonest cause of AS in older adults. Bicuspid valves tend to develop significant disease earlier than tricuspid valves but not usually in infancy; rheumatic disease is not the leading cause in many contemporary adult populations.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-439-cardiology-q002": {
    "explanation": "Edema and hepatic discomfort with a lower-left-sternal pansystolic murmur suggest TR. Inspiration increases venous return to the right heart and accentuates that murmur; left lateral positioning preferentially brings apical mitral findings closer to the chest wall.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-439-pulmonary-q023": {
    "explanation": "Consolidation and acute cough/dyspnea suggest CAP, for which pneumococcus is a common typical pathogen. The examination establishes a consolidation syndrome, not a microbiologically confirmed organism; culture/testing may identify an alternative.",
    "sources": [
      "cap"
    ]
  },
  "medicine-midterm-435-pulmonary-q024": {
    "explanation": "Episodic perfume-triggered wheeze, eczema, hay fever and family history suggest asthma. Spirometry may demonstrate variable/reversible obstruction, although it can be normal between episodes; objective variability supports confirmation.",
    "sources": [
      "asthma"
    ]
  },
  "medicine-midterm-433-git-hepatobiliary-q047": {
    "explanation": "Sudden dyspnea, hypotension and an S1Q3T3 pattern make PE the best listed diagnosis. These ECG changes are not specific, and the trauma history also requires consideration of other acute chest emergencies and appropriate imaging.",
    "sources": [
      "pe"
    ]
  },
  "medicine-midterm-432-cardiology-q005": {
    "explanation": "A new murmur with dyspnea and crackles warrants echo to assess valve pathology and cardiac function. The stem does not clearly identify the suspected diagnosis; echo can clarify structural disease but does not alone confirm every cause of postpneumonia symptoms.",
    "sources": [
      "ie"
    ],
    "status": "needs-review",
    "answer": "A"
  },
  "medicine-midterm-432-pulmonary-q018": {
    "explanation": "Recurrent respiratory infections and infertility raise suspicion for CF or ciliary disease with bronchiectasis, where Pseudomonas is possible. These features do not identify the current pneumonia pathogen; sputum culture is required before calling C definitive.",
    "sources": [
      "bronchiectasis",
      "cf"
    ],
    "status": "needs-review",
    "answer": "C"
  },
  "medicine-midterm-431-cardiology-q007": {
    "explanation": "ST elevation in a compatible ischemic presentation raises urgent concern for STEMI. Q waves usually reflect later necrosis, U waves are not a diagnostic MI criterion, and hyperacute T waves may precede ST elevation.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-431-pulmonary-q021": {
    "explanation": "Chronic variable symptoms with bronchodilator reversibility favor asthma. Smoking does not automatically establish COPD; objective variability, history and appropriate spirometry distinguish the diagnoses.",
    "sources": [
      "asthma"
    ]
  },
  "medicine-midterm-431-git-hepatobiliary-q049": {
    "explanation": "Stony dullness, absent breath sounds and reduced movement indicate pleural fluid separating the lung from the chest wall. Consolidation instead tends to increase sound transmission and fremitus; imaging confirms the effusion.",
    "sources": [
      "pleural"
    ]
  },
  "medicine-midterm-430-cardiology-q008": {
    "explanation": "Exertional presyncope, angina, a basal systolic thrill and single S2 favor significant aortic stenosis. Echo establishes severity; the printed BP 105/160 is internally reversed and should not be interpreted literally.",
    "sources": [
      "valves"
    ]
  },
  "medicine-midterm-430-cardiology-q009": {
    "explanation": "Ischemic chest pain with troponin 4 ng/mL and deep anterior T-wave inversion without diagnostic ST elevation fits NSTEMI. Unstable angina lacks acute biomarker evidence of myocardial necrosis.",
    "sources": [
      "acs"
    ]
  },
  "medicine-midterm-430-pulmonary-q021": {
    "explanation": "Chronic progressive dyspnea, clubbing, hypoxemia and fine inspiratory crackles favor ILD. HRCT defines the pattern; a pleural effusion does not usually explain diffuse fine crackles and clubbing.",
    "sources": [
      "ild"
    ]
  },
  "medicine-midterm-441-cardiology-q023": {
    "explanation": "Recent surgery with new dyspnea, pleuritic pain and leg discomfort favors PE among the options. A normal examination does not exclude it. Assess clinical probability and obtain appropriate confirmatory imaging.",
    "sources": [
      "pe"
    ],
    "status": "supported",
    "answer": "B"
  },
  "medicine-midterm-441-nephrology-q039": {
    "explanation": "Lifestyle measures, weight management and smoking cessation benefit diabetic kidney disease even with HbA1c below 7%. He already receives an ARB and SGLT2 inhibitor; adding an ACE inhibitor to the ARB is not recommended. Normal creatinine does not exclude albuminuric kidney disease.",
    "sources": [
      "ckd"
    ],
    "status": "supported",
    "answer": "C"
  },
  "medicine-midterm-437-pulmonary-q013": {
    "explanation": "CTPA is the usual confirmatory imaging test for suspected PE when contrast is suitable. An ABG may show gas-exchange abnormalities but does not confirm PE; V/Q scanning is an alternative in selected circumstances.",
    "sources": [
      "pe"
    ],
    "status": "supported",
    "answer": "D"
  },
  "medicine-midterm-437-git-hepatobiliary-q030": {
    "explanation": "Chronic diarrhea, weight loss and microcytic anemia suggest malabsorption, including celiac disease. Anti-tissue-transglutaminase IgA with total IgA is the usual initial serology while consuming gluten. ATTG in the option refers to anti-tTG.",
    "sources": [
      "celiac"
    ],
    "status": "supported",
    "answer": "D"
  },
  "medicine-midterm-436-pulmonary-q034": {
    "explanation": "BP 80/40 in confirmed PE raises concern for shock and warrants urgent reperfusion assessment, including thrombolysis when appropriate and without contraindications. DVT, pregnancy or a coincidental pneumothorax alone does not provide the same indication.",
    "sources": [
      "pe"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-436-pulmonary-q041": {
    "explanation": "A single BP of 90/60 does not establish persistent shock, and systolic 90 is not below 90. Repeated readings, perfusion and deterioration determine reperfusion needs. The bank's D should therefore remain provisional rather than an automatic thrombolysis rule.",
    "sources": [
      "pe"
    ],
    "status": "needs-review",
    "answer": "D"
  },
  "medicine-midterm-436-pulmonary-q044": {
    "explanation": "Sickle cell disease can promote thrombosis through endothelial injury and coagulation activation. Hemophilia and vitamin K deficiency primarily cause bleeding. Cirrhosis also has complex thrombosis risk, so it is not universally protective.",
    "sources": [
      "sickle"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-436-git-hepatobiliary-q080": {
    "explanation": "Sickle cell disease is associated with a hypercoagulable state, making A the conventional listed answer. Vitamin K deficiency and hemophilia primarily predispose to bleeding; chronic liver disease can also produce thrombosis in particular settings.",
    "sources": [
      "sickle"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-435-pulmonary-q016": {
    "explanation": "Hemoptysis, weight loss and prolonged cough suggest infection or malignancy but do not predict one specific CXR finding. Calcification can reflect healed granulomatous disease and is not proof of active TB. The provided data do not uniquely support A.",
    "sources": [
      "tb",
      "lung"
    ],
    "status": "needs-review",
    "answer": "A"
  },
  "medicine-midterm-435-pulmonary-q018": {
    "explanation": "Recent cancer surgery with sudden dyspnea and chest pain creates important PE suspicion. CTPA is the best listed confirmatory imaging test when suitable; bronchoscopy and spirometry do not evaluate pulmonary arterial thrombi.",
    "sources": [
      "pe"
    ],
    "status": "supported",
    "answer": "B"
  },
  "medicine-midterm-435-pulmonary-q025": {
    "explanation": "Sickle cell disease can cause functional asplenia and increased infection risk. Pneumococcal vaccination and annual influenza vaccination are appropriate prevention measures. Use age/prior-dose schedules; they do not replace assessment of recurrent infections.",
    "sources": [
      "vaccines",
      "sickle"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-435-pulmonary-q032": {
    "explanation": "Ethambutol can cause optic neuropathy with altered color vision, classically red-green discrimination. New visual symptoms require prompt medication and ophthalmic review rather than continuing treatment without evaluation.",
    "sources": [
      "ethambutol"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-434-cardiology-q016": {
    "explanation": "Severely elevated LDL with premature familial cardiovascular disease warrants high-intensity/maximally tolerated statin assessment regardless of a low short-term risk score, after checking secondary causes. The printed conversion is wrong: 6.1 mmol/L is about 236 mg/dL, not 196; both exceed the severe-hypercholesterolemia threshold.",
    "sources": [
      "lipids"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-434-cardiology-q017": {
    "explanation": "Higher HDL is traditionally associated with lower cardiovascular risk, making A the intended answer. This association does not mean pharmacologically raising HDL itself improves outcomes; LDL and overall risk remain the main treatment targets.",
    "sources": [
      "lipids"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-434-pulmonary-q024": {
    "explanation": "An old stroke with swallowing impairment and chronic immobility increases aspiration risk. New fever, cough and dyspnea favor aspiration pneumonia. Hospital-acquired pneumonia depends on acquisition after admission, rather than simply being chronically bedbound.",
    "sources": [
      "cap"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-434-pulmonary-q025": {
    "explanation": "Camel exposure with a febrile respiratory illness and GI symptoms raises concern for MERS, requiring appropriate infection-control precautions while evaluated. CDC guidance uses standard, contact and airborne precautions with eye protection. Exposure alone does not confirm MERS.",
    "sources": [
      "mers"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-433-pulmonary-q017": {
    "explanation": "A lung mass already demonstrated by CXR/CT requires tissue diagnosis. Bronchoscopy with biopsy is appropriate for an accessible lesion; CT location may instead favor image-guided biopsy. Sputum culture or AFB testing alone does not establish malignancy.",
    "sources": [
      "lung"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-433-pulmonary-q028": {
    "explanation": "Severe hypoxemia despite oxygen requires urgent reassessment and escalation, but alone is not an automatic systemic-thrombolysis indication in PE. Hemodynamics, RV function, deterioration and bleeding risk guide advanced therapy; no option supplies a complete decision rule.",
    "sources": [
      "pe"
    ],
    "status": "needs-review",
    "answer": null
  },
  "medicine-midterm-432-nephrology-q026": {
    "explanation": "New kidney dysfunction with hematuria and urinary casts in SLE raises concern for active lupus nephritis. Quantify proteinuria and assess kidney function; kidney biopsy can establish class/activity before selecting immunosuppression. The +1 protein wording does not quantify a 24-hour protein amount.",
    "sources": [
      "lupus"
    ],
    "status": "supported",
    "answer": "B"
  },
  "medicine-midterm-432-git-hepatobiliary-q030": {
    "explanation": "Diarrhea, weight loss and anemia are alarm features suggesting organic disease, but without bloody stool, endoscopy or other discriminating findings they do not uniquely establish UC over Crohn's or infection. IBS is less consistent with unexplained anemia and weight loss.",
    "sources": [
      "uc"
    ],
    "status": "needs-review",
    "answer": "A"
  },
  "medicine-midterm-431-pulmonary-q022": {
    "explanation": "Copious sputum, coarse crackles and hemoptysis after prior TB favor postinfectious bronchiectasis. HRCT confirms the structural disease. Weight loss and hemoptysis also require evaluation for recurrent infection or malignancy.",
    "sources": [
      "bronchiectasis"
    ],
    "status": "supported",
    "answer": "A"
  },
  "medicine-midterm-431-pulmonary-q027": {
    "explanation": "CT pulmonary angiography directly assesses pulmonary arterial thrombi and is the appropriate listed diagnostic test when suitable. HRCT is optimized for parenchymal disease, while CXR cannot exclude or confirm PE.",
    "sources": [
      "pe"
    ],
    "status": "supported",
    "answer": "D"
  },
  "medicine-midterm-431-nephrology-q039": {
    "explanation": "High fever with flank/loin tenderness and nausea favors pyelonephritis rather than uncomplicated cystitis. Urine studies/culture support diagnosis; colicky pain also raises concern for an obstructing infected stone, which needs urgent assessment.",
    "sources": [
      "uti"
    ],
    "status": "supported",
    "answer": "B"
  },
  "medicine-midterm-431-git-hepatobiliary-q047": {
    "explanation": "AFB-positive disease in a systemically unwell patient raises concern for TB and warrants assessment for pulmonary or laryngeal involvement with airborne precautions pending clarification. Isolated lymph-node TB is not itself necessarily airborne; M. marinum skin infection and nonspecific lymphadenopathy do not automatically require respiratory isolation.",
    "sources": [
      "tb"
    ],
    "status": "needs-review",
    "answer": "A"
  }
};
  let completed = 0;
  for (const question of window.GIFT445_QUESTIONS || []) {
    if (question.subjectId !== "medicine" || question.assessment !== "Midterm") continue;
    const review = reviews[question.id];
    if (!review) continue;
    completed++;
    question.explanation = review.explanation;
    question.reviewOpinion = review.explanation;
    question.reviewedOn = "2026-10-05";
    if (review.status) {
      question.verification = review.status;
      question.aiAnswer = review.answer;
    }
    question.aiSuggestion = question.aiAnswer ? null : "No single answer is established by the available wording; see the medical review below.";
    for (const key of review.sources) {
      const [title, url] = sources[key];
      question.references = [...(question.references || []).filter(item => item.url !== url), { title, url }];
    }
  }
  const mid = (window.GIFT445_QUESTIONS || []).filter(q => q.subjectId === "medicine" && q.assessment === "Midterm");
  const scope = mid.filter(q => ["Cardiology", "Pulmonology", "Nephrology", "Gastroenterology"].includes(q.cycle));
  window.GIFT445_MID_EXPLANATION_COUNTS = {
    total: mid.length, completed,
    explained: mid.filter(q => (q.reviewOpinion || q.explanation || "").trim()).length,
    currentBlocks: scope.length,
    legacyOtherBlocks: mid.length - scope.length
  };
  window.GIFT445_MID_444_REVIEW_COUNTS = {
    total: scope.length,
    lectureAnchored: scope.filter(q => q.lectureEvidence && !q.lectureEvidence.outside).length,
    outsideLecture: scope.filter(q => q.lectureEvidence?.outside).length,
    conflict: scope.filter(q => q.verification === "conflict").length,
    needsReview: scope.filter(q => q.verification === "needs-review").length
  };
})();
