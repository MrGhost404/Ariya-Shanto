import { TreatmentCase, SymptomTriageItem } from '../types';

export const TREATMENT_CASES: TreatmentCase[] = [
  {
    id: 'case-downer-cow-recovery',
    titleBn: 'জীবন আর মৃত্যুর ঠিক মাঝখান থেকে ফিরে আসা: অবলা গাভীর অভূতপূর্ব নিরাময়',
    titleEn: 'Brought Back from the Brink of Death: Miracle Recovery of a Recumbent Cow',
    tagBn: 'বিশেষ কেস স্টাডি • মিল্ক ফিভার ও নার্ভ পক্ষাঘাত',
    tagEn: 'Special Case Study • Downer Cow Syndrome & Milk Fever',
    animalType: 'উন্নত জাতের দুধেল ফ্রিজিয়ান ক্রস গাভী (High-yield Friesian Cross)',
    location: 'সিরাজগঞ্জ দুগ্ধাঞ্চল (Shahjadpur, Sirajganj)',
    ownerName: 'মো. আনোয়ার হোসেন (দুগ্ধ খামারি)',
    criticalQuoteBn: 'জীবন আর মৃত্যুর ঠিক মাঝখানে দাঁড়িয়ে থাকা একটি অবলা প্রাণী... যখন ওঠার ন্যূনতম ক্ষমতাটুকুও ছিল না, মালিকও হয়তো আশা ছেড়ে দিয়েছিলেন। কিন্তু সঠিক চিকিৎসা, সঠিক ওষুধ আর ভালোবাসার কাছে হার মানল সেই কষ্টও! অ্যানিমেল ডক্টর শান্ত-এর চিকিৎসায় আজ গরুটি সম্পূর্ণ সুস্থ এবং নিজের পায়ে দাঁড়িয়ে আছে। অবলা প্রাণীদের সেবায় আমরা সব সময় আপনার পাশে।',
    storyBn: 'গাভীটি প্রসবের পরপরই হঠাৎ মাটিতে লুটিয়ে পড়ে। ঘাড় বেঁকে বুকের সাথে আটকে ছিল (S-curve deformity), শরীরের তাপমাত্রা বিপজ্জনকভাবে কমে ৯৭°F-এ নেমে যায়, জাবর কাটা পুরোপুরি বন্ধ ছিল। কৃষক ভেবেছিলেন গরুটি আর বাঁচবে না। কিন্তু অ্যানিমেল ডক্টর শান্তর সময়োচিত সঠিক ডায়াগনোসিস, নার্ভ সাপোর্ট এবং নিবিড় নার্সিংয়ে গরুটি পুনরায় উঠে দাঁড়ায়।',
    storyEn: 'Immediately post-calving, this prized dairy cow collapsed into severe sternal recumbency, unable to lift her neck. Body temperature plummeted to 97°F with hypocalcemic paralysis. The devastated farmer feared the worst. Dr. Shanto immediately intervened with precision IV mineral replenishment, nerve therapy, and caring round-the-clock nursing—resulting in complete recovery.',
    initialConditionBn: 'সম্পূর্ণ অসাড় অবস্থা, ৪ দিন ধরে উঠতে অক্ষম, হাইপোক্যালসেমিয়া (Milk Fever) জনিত স্নায়বিক চাপ (Downer Cow Syndrome)। চোখের মণি স্থির, চরম পানিশূন্যতা।',
    initialConditionEn: 'Complete recumbency, unable to stand for days, advanced hypocalcemia (Milk Fever) with sciatic/obturator nerve compression, subnormal temperature and dehydration.',
    treatmentStepsBn: [
      'ধীরগতিতে হৃৎপিণ্ডের স্পন্দন পর্যবেক্ষণ করে শিরায় (IV) ক্যালসিয়াম বোরোগ্লুকোনেট ও ফসফরাস ইনফিউশন',
      'স্নায়ুর অসাড়তা দূর করতে মিথাইলকোবালামিন ও নিউরোবিয়ন ইনজেকশন থেরাপি',
      'মাংসপেশির রক্তসঞ্চালন সচল রাখতে বিশেষ ভেষজ লিনিমেন্ট ম্যাসাজ ও প্রতি ৪ ঘণ্টা পর পর পাশ পরিবর্তন',
      'রুমেটোল বোলাস ও ইলেক্ট্রোলাইট ওরাল রিহাইড্রেশন দিয়ে জাবর কাটা দ্রুত সক্রিয়করণ',
      'নরম শুকনো খড়ের পুরু বিছানায় রেখে স্লিং সহায়তায় ধাপে ধাপে নিজের পায়ে দাঁড় করানোর বিশেষ ড্রিল'
    ],
    treatmentStepsEn: [
      'Slow IV infusion of Calcium Borogluconate 25% + Phosphorus & Magnesium with cardiac monitoring',
      'Neurotropic injection therapy (Methylcobalamin & B-Complex) to restore nerve conduction',
      'Deep muscular therapeutic liniment massage and posture rotation every 4 hours to prevent bedsores',
      'Rumen microflora stimulants and electrolyte fluid balance to restore digestion',
      'Guided sling assisted standing exercises on soft dry straw bedding until natural weight-bearing'
    ],
    recoveryResultBn: 'চিকিৎসার ৩৬ ঘণ্টার মাথায় গরুটি প্রথমবারের মতো নিজ শক্তিতে উঠে দাঁড়ায়। ৪৮ ঘণ্টার মধ্যে স্বাভাবিকভাবে খড় ও ঘাস খাওয়া শুরু করে এবং দুধের উৎপাদন পূর্বাবস্থায় ফিরে আসে।',
    recoveryResultEn: 'At 36 hours of intensive treatment, the cow stood up on her own strength. Within 48 hours she resumed normal grazing and restored regular milk yield.',
    timeToRecovery: '৩৬-৪৮ ঘণ্টা (Full Recovery)',
    isFeatured: true,
    iconType: 'cow'
  },
  {
    id: 'case-bloat-tympany',
    titleBn: 'তীব্র পেট ফাঁপা (Acute Frothy Bloat) থেকে ষাঁড়ের জরুরি জীবন রক্ষা',
    titleEn: 'Emergency Relief from Acute Frothy Bloat in Prize Bull',
    tagBn: 'জরুরি সার্জিক্যাল সেবা • পেট ফাঁপা',
    tagEn: 'Emergency Triage • Frothy Bloat',
    animalType: 'শাহীওয়াল ক্রস ষাঁড় (Sahiwal Cross Bull)',
    location: 'পাবনা সদর (Pabna)',
    ownerName: 'হাজী মোজাম্মেল হক',
    criticalQuoteBn: 'পেট ফুলে ঢোল হয়ে শ্বাস বন্ধ হয়ে আসছিল, মুখ দিয়ে ফেনা ঝরছিল। ডক্টর শান্তর দ্রুত হস্তক্ষেপে মিনিটেই গ্যাস মুক্ত হয়।',
    storyBn: 'অতিরিক্ত কচি ভেজা ঘাস খাওয়ার ফলে রুমেনে তীব্র গ্যাস জমে ফুসফুসে চাপ পড়ে দম বন্ধ হওয়ার উপক্রম হয়েছিল। জরুরি ক্যানুলাইজেশন ও অ্যান্টি-ফোমিং এজেন্টে তাৎক্ষণিক বিপদ মুক্ত হয়।',
    storyEn: 'Severe ruminal tympany caused extreme abdominal distension and asphyxiation risk. Emergency decompression and anti-foaming carminative intervention saved the animal within minutes.',
    initialConditionBn: 'বাম পাশের পেট অস্বাভাবিক ফোলা, মুখ হা করে শ্বাস নেয়া, চোখের রঙ লালচে ও অস্থির ছটফটানি।',
    initialConditionEn: 'Severely distended left paralumbar fossa, respiratory distress with open-mouth breathing.',
    treatmentStepsBn: [
      'জরুরি স্টমাক টিউব ও ক্যানুলার মাধ্যমে জমে থাকা বিষাক্ত গ্যাস দ্রুত নিঃসরণ',
      'অ্যান্টি-ফোমিং ব্লট-রিলিফ ড্রেঞ্চ ও সিম্পল কার্বোনেটস প্রবেশ করানো',
      'রুমেটিক ব্যথানাশক ও অ্যান্টিস্পাজমোডিক ইনজেকশন প্রদান'
    ],
    treatmentStepsEn: [
      'Emergency decompression via stomach tube and cannula to vent trapped gas',
      'Administration of simethicone anti-bloat drench and digestive buffering agents',
      'Analgesic and antispasmodic injection to alleviate severe ruminal colic'
    ],
    recoveryResultBn: '১ ঘণ্টার মধ্যেই পেটের ফোলাভাব মিলিয়ে যায় এবং ষাঁড়টি শান্ত হয়ে স্বাভাবিক জাবর কাটতে শুরু করে।',
    recoveryResultEn: 'Abdominal distension resolved within 1 hour; the bull calmed down and resumed normal rumination.',
    timeToRecovery: '১ ঘণ্টা (Immediate Relief)',
    iconType: 'cow'
  },
  {
    id: 'case-goat-pneumonia',
    titleBn: 'ব্লাক বেঙ্গল ছাগলের তীব্র নিউমোনিয়া ও শ্বাসকষ্ট নিরাময়',
    titleEn: 'Recovery of Black Bengal Goat from Severe Pneumonia & Hypothermia',
    tagBn: 'ছাগলের চিকিৎসা • নিউমোনিয়া',
    tagEn: 'Caprine Medicine • Severe Pneumonia',
    animalType: 'ব্ল্যাক বেঙ্গল ছাগল (Black Bengal Goat)',
    location: 'কুষ্টিয়া (Kushtia)',
    ownerName: 'রোকেয়া বেগম',
    criticalQuoteBn: 'শীতের রাতে বাচ্চার মতো কাঁপছিল, নিশ্বাস নিতে পারছিল না। ডক্টর শান্তর ওষুধে আজ ছাগলটি মাঠে দৌড়াদৌড়ি করছে।',
    storyBn: 'অতিরিক্ত ঠান্ডাজনিত কারণে ছাগলের ফুসফুসে তীব্র সংক্রমণ হয়, বুক ধড়ফড় করছিল এবং নাক দিয়ে ঘন পুঁজ বের হচ্ছিল। সঠিক অ্যান্টিবায়োটিক ডোজ ও নেবুলাইজেশনে ৩ দিনে সম্পূর্ণ সুস্থ হয়।',
    storyEn: 'Severe cold-induced bacterial bronchopneumonia with high fever and purulent nasal discharge. Targeted bronchodilators, warmth therapy, and antibiotic protocol restored vital health.',
    initialConditionBn: '১০৫°F তীব্র জ্বর, দ্রুত ও কষ্টকর শ্বাসপ্রশ্বাস, খেতে না পারা ও বুক চেপে শুয়ে থাকা।',
    initialConditionEn: '105°F fever, labored tachypnea, severe anorexia, and purulent nasal discharge.',
    treatmentStepsBn: [
      'রেসপিরেটরি ব্রঙ্কোডাইলেটর নেবুলাইজেশন ও অক্সিজেনেশন সাপোর্ট',
      'ফুসফুসের ব্যাকটেরিয়াল সংক্রমণ রোধে আধুনিক অ্যান্টিবায়োটিক কোর্স',
      'জ্বর উপশমে নিরাপদ অ্যান্টিপাইরেটিক ও ভিটামিন সি ইমিউন বুস্টার'
    ],
    treatmentStepsEn: [
      'Steam & bronchodilator inhalation to open airway passages',
      'Culture-guided broad-spectrum caprine antibacterial therapy',
      'Antipyretic injections and high-dose ascorbic acid immune support'
    ],
    recoveryResultBn: '৩ দিনে জ্বর স্বাভাবিক হয়ে আসে এবং নাক পরিষ্কার হয়ে ছাগলটি সক্রিয়ভাবে খাবার খাওয়া শুরু করে।',
    recoveryResultEn: 'Fever returned to normal by day 3; lungs cleared and goat returned to hearty appetite.',
    timeToRecovery: '৩ দিন (3 Days)',
    iconType: 'goat'
  },
  {
    id: 'case-mastitis-cure',
    titleBn: 'দুধেল গাভীর ওলান পাকা (Acute Mastitis) সফলভাবে নিরাময় ও দুধের মান রক্ষা',
    titleEn: 'Successful Reversal of Acute Clinical Mastitis in High-producing Cow',
    tagBn: 'দুগ্ধ খামার সুরক্ষা • ওলান ফোলা',
    tagEn: 'Dairy Protection • Clinical Mastitis',
    animalType: 'হলস্টাইন ফ্রিজিয়ান সংকর গাভী (HF Cross)',
    location: 'নাটোর (Natore)',
    ownerName: 'তারেক মাহমুদ',
    criticalQuoteBn: 'একটি বাট দিয়ে রক্তমিশ্রিত হলুদ পানি আসছিল। ভাবছিলাম গাভীটার বাট বুঝি চিরতরে নষ্ট হয়ে গেল। শান্ত ভাইয়ের চিকিৎসায় বাটটি বেঁচে গেল।',
    storyBn: 'প্রসবের ১০ দিন পর গাভীর বাঁট হঠাৎ শক্ত পাথর হয়ে যায়, দুধের বদলে পানির মতো পাতলা তরল বের হচ্ছিল। ইন্ট্রাম্যামারি ইনফিউশন ও ঠান্ডা পানির কম্প্রেশনে ওলান সম্পূর্ণরূপে স্বাভাবিক হয়।',
    storyEn: 'One quarter became stone-hard with clot-filled discolored milk post-parturition. Intensive targeted intramammary infusion and anti-inflammatory therapy prevented tissue necrosis and restored lactation.',
    initialConditionBn: 'ওলানের পেছনের বাঁট তীব্র গরম, ফোলা ও ব্যথায় স্পর্শ করতে দিচ্ছিল না। দুধের সাথে রক্তের ছোপ।',
    initialConditionEn: 'Severe localized inflammation, stony induration, blood-tinged serous secretion.',
    treatmentStepsBn: [
      'ওলান সম্পূর্ণ খালি করে ইন্ট্রাম্যামারি অ্যান্টিবায়োটিক টিউব প্রয়োগ',
      'তীব্র প্রদাহ ও ব্যথা প্রশমনে নন-স্টেরয়েডাল অ্যান্টি-ইনফ্ল্যামেটরি থেরাপি',
      'ঠান্ডা পানির শেক ও অ্যান্টিসেপটিক টিট ডিপিং দিয়ে বাহ্যিক জীবাণুমুক্তকরণ'
    ],
    treatmentStepsEn: [
      'Frequent stripping of affected quarter and targeted intramammary antibiotic infusion',
      'Non-steroidal anti-inflammatory and proteolytic enzyme therapy to soften tissue',
      'Cold compress and post-milking antiseptic barrier dipping'
    ],
    recoveryResultBn: '৫ম দিনে ওলান নরম হয়ে স্বাভাবিক দুধে ফিরে আসে এবং কোনো বাট নষ্ট হওয়া ছাড়াই খামারটি রক্ষা পায়।',
    recoveryResultEn: 'Full quarter recovery by day 5; somatic cell count normalized and full milking capability restored.',
    timeToRecovery: '৫ দিন (5 Days)',
    iconType: 'cow'
  }
];

export const SYMPTOM_TRIAGE_LIST: SymptomTriageItem[] = [
  {
    id: 'triage-downer',
    category: 'cattle',
    nameBn: 'গরু মাটিতে পড়ে থাকা ও উঠতে না পারা (Downer / Milk Fever)',
    nameEn: 'Cow down, unable to stand (Downer Cow / Milk Fever)',
    severity: 'critical',
    firstAidBn: [
      'গরুর মাথা ও ঘাড় সোজা রাখুন; বুকের ওপর ভর দিয়ে (Sternal position) বসিয়ে রাখুন, কাত হয়ে যেন না থাকে।',
      'জোরপূর্বক পানি বা তরল ওষুধ খাওয়াবেন না (ফুসফুসে গিয়ে দম বন্ধ হয়ে ড্রেনচিং নিউমোনিয়া হতে পারে)।',
      'নরম শুকনো খড় বা বালির ওপর রাখুন যাতে হাড়ে চাপ না পড়ে।',
      'অবিলম্বে ডক্টর শান্তর সাথে যোগাযোগ করুন (01301326704) কারণ শিরায় ক্যালসিয়াম ও নার্ভ ইনজেকশন দেওয়া জরুরি।'
    ],
    firstAidEn: [
      'Maintain sternal posture (sitting upright on chest); do not let the cow lie flat on its side.',
      'DO NOT forcefully drench fluids as this can cause fatal aspiration pneumonia.',
      'Provide thick dry bedding of straw or sand to prevent nerve ischemia.',
      'Call Dr. Shanto immediately at 01301326704 for IV calcium and neuro-restorative therapy.'
    ],
    warningBn: 'প্রতিটি মিনিট মূল্যবান! ২৪ ঘণ্টার বেশি শুয়ে থাকলে পেছনের পায়ের পেশি স্থায়ীভাবে নষ্ট হয়ে যেতে পারে।',
    warningEn: 'Time-critical! Prolonged recumbency causes irreversible muscle and nerve necrosis.'
  },
  {
    id: 'triage-bloat',
    category: 'cattle',
    nameBn: 'পেট ফুলে ঢোল হওয়া ও তীব্র অস্বস্তি (Tympany / Bloat)',
    nameEn: 'Severe abdominal bloating and distress (Tympany / Bloat)',
    severity: 'critical',
    firstAidBn: [
      'গরুর মুখে আড়াআড়ি শক্ত কাঠের টুকরো বা দড়ি দিয়ে বেঁধে দিন যাতে মুখ খোলা থাকে এবং ঢেকুর ওঠে।',
      'প্রাণীটিকে সামনের দিক উঁচু রেখে দাঁড় করিয়ে রাখুন।',
      'আধা লিটার সয়াবিন বা সরিষার তেল ও সোডা পানি সাবধানে খাওয়াতে পারেন (যদি গিলতে সক্ষম হয়)।',
      'পেট অত্যন্ত শক্ত হলে ও শ্বাস বন্ধ হয়ে আসার উপক্রম হলে জরুরি ভিত্তিতে কল করুন: 01301326704।'
    ],
    firstAidEn: [
      'Place a smooth wooden stick bit in the mouth to stimulate continuous chewing and belching.',
      'Keep the animal standing with forequarters elevated to release pressure on the diaphragm.',
      'Administer 300-500ml vegetable/mustard oil with mild sodium bicarbonate if animal can swallow.',
      'If bloat is suffocating, immediate trocarization by vet is required: Call 01301326704.'
    ],
    warningBn: 'শ্বাসকষ্ট চরম আকার ধারণ করলে ফুসফুস ফেটে প্রাণহানি ঘটতে পারে। দেরি করবেন না।',
    warningEn: 'Suffocation risk from diaphragm compression. Requires urgent veterinary care.'
  },
  {
    id: 'triage-fever',
    category: 'cattle',
    nameBn: 'তীব্র জ্বর (>১০৪°F) ও নাক-মুখ দিয়ে লালা ঝরা (High Fever & Salivation)',
    nameEn: 'High Fever (>104°F), Salivation & Anorexia',
    severity: 'urgent',
    firstAidBn: [
      'গরুর মাথায় এবং শরীরে ঠান্ডা পানি ঢালুন এবং ছায়াযুক্ত ও বাতাস চলাচলযুক্ত স্থানে রাখুন।',
      'খাবারের জন্য জোর করবেন না; হালকা ঠান্ডা পানির সাথে গুড় ও স্যালাইন মিশিয়ে খেতে দিন।',
      'খুরা বা মুখে ঘা (FMD) কিংবা এলএসডির কোনো গুটি আছে কিনা লক্ষ করুন।',
      'ডাক্তারের প্রেসক্রিপশন ছাড়া ইচ্ছেমতো অ্যান্টিবায়োটিক প্রয়োগ করবেন না। কল করুন: 01301326704।'
    ],
    firstAidEn: [
      'Pour cold water over head and back; move animal to a well-ventilated, shaded shelter.',
      'Do not force hard feed; offer cool water with electrolytes or molasses.',
      'Inspect for foot lesions, mouth blisters (FMD), or skin nodules (LSD).',
      'Avoid unprescribed antibiotics; contact Dr. Shanto at 01301326704 for targeted diagnosis.'
    ],
    warningBn: 'উচ্চ জ্বরে গর্ভবতী গাভীর গর্ভপাতের ঝুঁকি থাকে।',
    warningEn: 'Prolonged high fever carries acute risk of abortion in pregnant dairy cattle.'
  },
  {
    id: 'triage-goat-diarrhea',
    category: 'goat_sheep',
    nameBn: 'ছাগলের পাতলা পায়খানা ও দুর্বলতা (Diarrhea & Dehydration in Goats)',
    nameEn: 'Severe watery diarrhea and lethargy in goats',
    severity: 'urgent',
    firstAidBn: [
      'সবুজ কচি ঘাস বন্ধ রাখুন এবং শুধুমাত্র শুকনো নরম খড় দিন।',
      'আধা ঘণ্টা পর পর খাবার স্যালাইন (Oral Saline) অল্প অল্প করে সিরিঞ্জ দিয়ে খাওয়ান।',
      'ছাগলকে শুকনো ও উষ্ণ স্থানে রাখুন যাতে ঠান্ডা না লাগে।',
      'পায়খানার সাথে রক্ত বা তীব্র দুর্গন্ধ থাকলে অবিলম্বে ডক্টর শান্তকে জানান: 01301326704।'
    ],
    firstAidEn: [
      'Stop succulent green feed immediately; offer dry soft clean hay.',
      'Administer oral electrolyte rehydration solution in small frequent doses.',
      'Keep the goat in a warm, dry, draft-free shelter.',
      'If stool is bloody or foul-smelling, immediate medical intervention is required: 01301326704.'
    ],
    warningBn: 'ছাগলের পানিশূন্যতা খুব দ্রুত মৃত্যু ঘটাতে পারে। স্যালাইন চালিয়ে যাওয়া সবচেয়ে গুরুত্বপূর্ণ।',
    warningEn: 'Dehydration in small ruminants escalates within hours. Hydration is vital.'
  },
  {
    id: 'triage-pet-poison',
    category: 'pets',
    nameBn: 'কুকুর বা বিড়ালের বিষক্রিয়া বা বমি (Pet Suspected Toxicity / Vomiting)',
    nameEn: 'Pet Acute Poisoning or Continuous Vomiting',
    severity: 'critical',
    firstAidBn: [
      'কী খেয়েছে (ইঁদুর মারার বিষ, কীটনাশক, চকলেট বা ওষুধ) তা চিহ্নিত করুন এবং প্যাকেট সঙ্গে রাখুন।',
      'নিজ থেকে লবণ-পানি খাইয়ে বমি করানোর চেষ্টা করবেন না (এটি ফুসফুসে ক্ষতি করতে পারে)।',
      'মুখের চারপাশের লালা বা ক্ষতিকর পদার্থ পরিষ্কার কাপড় দিয়ে মুছে দিন।',
      'তাৎক্ষণিক অ্যান্টিডোট ও স্যালাইনের জন্য দ্রুত ডক্টর শান্তকে কল করুন: 01301326704।'
    ],
    firstAidEn: [
      'Identify the ingested substance (rodenticide, insecticide, toxic plants) and keep the label.',
      'Do not induce vomiting with salt water without veterinary instruction.',
      'Gently clean excess frothy saliva from the muzzle with a damp cloth.',
      'Call emergency hotline 01301326704 immediately for antidote and charcoal stabilization.'
    ],
    warningBn: 'বিষ রক্তে মিশে গেলে লিভার ও কিডনি অকেজো হতে পারে। দ্রুত চিকিৎসা নিন।',
    warningEn: 'Toxins cause rapid organ failure without prompt veterinary intervention.'
  }
];

export const VACCINE_SCHEDULE = [
  {
    diseaseBn: 'খুরা রোগ (FMD - Foot and Mouth Disease)',
    diseaseEn: 'Foot and Mouth Disease (FMD)',
    targetBn: 'গরু, মহিষ, ছাগল ও ভেড়া',
    targetEn: 'Cattle, Buffalo, Goat, Sheep',
    ageBn: '৪ মাস বয়স থেকে শুরু',
    intervalBn: 'প্রতি ৬ মাস পর পর',
    seasonBn: 'সাধারণত বর্ষা ও শীতের প্রাক্কালে',
    importanceBn: 'উচ্চ অগ্রাধিকার (খামার ধ্বংসকারী মহামারী রোগ)'
  },
  {
    diseaseBn: 'বাদলা রোগ (Black Quarter - BQ)',
    diseaseEn: 'Black Quarter (BQ)',
    targetBn: 'গরু ও মহিষ (বিশেষত যুবতী ও তরতাজা ষাঁড়)',
    targetEn: 'Cattle & Buffalo (especially fast-growing young stock)',
    ageBn: '৬ মাস বয়স থেকে',
    intervalBn: 'প্রতি বছর ১ বার',
    seasonBn: 'বর্ষার শুরুতে মে-জুন মাসে',
    importanceBn: 'জরুরি (পেশি পচে আকস্মিক মৃত্যু ঘটায়)'
  },
  {
    diseaseBn: 'তড়কা রোগ (Anthrax)',
    diseaseEn: 'Anthrax',
    targetBn: 'গরু, মহিষ, ছাগল',
    targetEn: 'Cattle, Buffalo, Goat',
    ageBn: '৬ মাস বয়স থেকে',
    intervalBn: 'প্রতি বছর ১ বার',
    seasonBn: 'মার্চ-এপ্রিল মাসে',
    importanceBn: 'জীবন রক্ষাকারী জুরুরি টিকা (মানুষেও ছড়াতে পারে)'
  },
  {
    diseaseBn: 'লাম্পি স্কিন ডিজিজ (LSD)',
    diseaseEn: 'Lumpy Skin Disease (LSD)',
    targetBn: 'গরু ও বাছুর',
    targetEn: 'Cattle & Calves',
    ageBn: '৩ মাস বয়স থেকে',
    intervalBn: 'প্রতি বছর ১ বার',
    seasonBn: 'মশা-মাছির উপদ্রব শুরুর পূর্বে (বসন্তকাল)',
    importanceBn: 'চামড়ার গুটি, পুঁজ ও চরম ওজনহানি রোধে'
  },
  {
    diseaseBn: 'পিপিআর রোগ (PPR - Peste des Petits Ruminants)',
    diseaseEn: 'Peste des Petits Ruminants (PPR)',
    targetBn: 'ছাগল ও ভেড়া',
    targetEn: 'Goats & Sheep',
    ageBn: '৪ মাস বয়স থেকে',
    intervalBn: '১ বার দিলে ৩ বছর সুরক্ষা থাকে',
    seasonBn: 'বছরের যেকোনো সময়',
    importanceBn: 'ছাগলের প্লেগখ্যাত মারাত্মক মড়ক রোগ'
  }
];
