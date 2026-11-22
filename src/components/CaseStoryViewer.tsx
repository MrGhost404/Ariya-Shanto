import React, { useState } from 'react';
import { TREATMENT_CASES } from '../data/cases';
import { TreatmentCase } from '../types';
import {
  Heart,
  Activity,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Clock,
  Sparkles,
  Phone,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface CaseStoryViewerProps {
  language: 'bn' | 'en';
  onOpenVoice: () => void;
}

export const CaseStoryViewer: React.FC<CaseStoryViewerProps> = ({ language, onOpenVoice }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-downer-cow-recovery');
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);

  const selectedCase =
    TREATMENT_CASES.find((c) => c.id === selectedCaseId) || TREATMENT_CASES[0];

  const timelineStages = [
    {
      stageBn: 'পর্যায় ১: সংকটাপন্ন অবস্থা (Day 0)',
      stageEn: 'Stage 1: Critical Recumbency (Day 0)',
      descBn:
        'গরুটি মাটিতে শুয়ে নিথর পড়ে ছিল। মাথা সোজা করার ন্যূনতম শক্তিও ছিল না। তাপমাত্রা নেমে যায় ৯৭°F-এ। খামারি প্রায় আশা ছেড়ে দিয়েছিলেন।',
      descEn:
        'The cow was completely recumbent, unable to raise her neck, subnormal temperature at 97°F. Owner feared complete loss.',
      icon: '🚨',
      statusColor: 'text-red-600 bg-red-50 border-red-200',
    },
    {
      stageBn: 'পর্যায় ২: জরুরি চিকিৎসা ও থেরাপি (Hour 12)',
      stageEn: 'Stage 2: Emergency Intervention (Hour 12)',
      descBn:
        'ডক্টর শান্তর নিবিড় তত্ত্বাবধানে ধীরগতিতে হৃদস্পন্দন মেপে শিরায় ক্যালসিয়াম-ফসফরাস ইনফিউশন ও নার্ভের ক্ষতি রোধে মিথাইলকোবালামিন প্রয়োগ।',
      descEn:
        'Slow IV Calcium Borogluconate and neuro-restorative injection therapy under strict cardiac rhythm monitoring.',
      icon: '💉',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      stageBn: 'পর্যায় ৩: পেশি সচলকরণ ও যত্ন (Hour 24)',
      stageEn: 'Stage 3: Muscular Mobilization (Hour 24)',
      descBn:
        'শুকনো খড়ের ওপর প্রতি ৪ ঘণ্টা অন্তর পাশ বদল, ভেষজ লিনিমেন্ট ম্যাসাজ এবং ওরাল ইলেক্ট্রোলাইট সাপোর্ট দিয়ে জাবর কাটা সক্রিয় করা।',
      descEn:
        'Bedding rotation every 4 hours, therapeutic deep tissue massage, and rumen stimulants.',
      icon: '🌿',
      statusColor: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      stageBn: 'পর্যায় ৪: নিজের পায়ে দাঁড়ানো ও মুক্তি (Hour 48)',
      stageEn: 'Stage 4: Standing & Full Health (Hour 48)',
      descBn:
        'সঠিক ওষুধ আর মমতাময়ী ভালোবাসার শক্তিতে গরুটি নিজ পায়ে শক্ত হয়ে দাঁড়িয়ে পড়ে। খামারির চোখে মুখে আনন্দের অশ্রু!',
      descEn:
        'Under caring supervision and restored nerve conduction, the cow stood up unassisted and resumed hearty appetite.',
      icon: '✨',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{language === 'bn' ? 'বাস্তব সফল চিকিৎসার গল্প' : 'Documented Recovery Stories'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'ভালোবাসা ও সঠিক চিকিৎসার অনন্য বিজয়'
              : 'The Power of Proper Medicine & Compassionate Care'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'bn'
              ? 'ডাক্তার শান্তর হাতে সুস্থ হয়ে ওঠা অবলা প্রাণীদের অনুপ্রেরণাদায়ী চিকিৎসা কাহিনী।'
              : 'Real livestock lives brought back from life-threatening conditions.'}
          </p>
        </div>

        {/* Case Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TREATMENT_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCaseId(item.id);
                setActiveTimelineStage(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                selectedCaseId === item.id
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>{item.iconType === 'cow' ? '🐄' : item.iconType === 'goat' ? '🐐' : '🐾'}</span>
              <span>{language === 'bn' ? item.titleBn.split(':')[0] : item.titleEn.split(':')[0]}</span>
              {item.isFeatured && (
                <span className="bg-yellow-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded font-black">
                  প্রধান কেস
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Featured Story Showcase Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Top banner highlighting the user's memorable text */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="bg-yellow-400/20 border border-yellow-300/40 text-yellow-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'bn' ? selectedCase.tagBn : selectedCase.tagEn}
              </span>
              <div className="flex items-center gap-3 text-xs text-emerald-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-yellow-300" />
                  {selectedCase.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-yellow-300" />
                  {selectedCase.ownerName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-yellow-300" />
                  {selectedCase.timeToRecovery}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
              {language === 'bn' ? selectedCase.titleBn : selectedCase.titleEn}
            </h3>

            {/* The user's exact quote highlighted */}
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/10 text-emerald-100 text-sm sm:text-base italic leading-relaxed">
              "{selectedCase.criticalQuoteBn}"
            </div>
          </div>

          {/* Main Case Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Timeline & Progression */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'bn'
                      ? 'চিকিৎসার অগ্রগতি ও আরোগ্য লাভের সময়রেখা (Timeline)'
                      : 'Recovery Progression Timeline'}
                  </span>
                </h4>

                {/* Timeline Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {timelineStages.map((stage, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTimelineStage(idx)}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col items-start gap-1 ${
                        activeTimelineStage === idx
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-lg">{stage.icon}</span>
                      <span className="text-xs font-bold leading-tight">
                        {language === 'bn' ? `ধাপ ${idx + 1}` : `Stage ${idx + 1}`}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Stage Detail Card */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    timelineStages[activeTimelineStage].statusColor
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    <span>{timelineStages[activeTimelineStage].icon}</span>
                    <span>
                      {language === 'bn'
                        ? timelineStages[activeTimelineStage].stageBn
                        : timelineStages[activeTimelineStage].stageEn}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {language === 'bn'
                      ? timelineStages[activeTimelineStage].descBn
                      : timelineStages[activeTimelineStage].descEn}
                  </p>
                </div>
              </div>

              {/* Initial Condition */}
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  {language === 'bn' ? 'রোগের প্রাথমিক অবস্থা:' : 'Initial Critical Presentation:'}
                </h5>
                <p className="text-xs sm:text-sm text-red-950 leading-relaxed">
                  {language === 'bn' ? selectedCase.initialConditionBn : selectedCase.initialConditionEn}
                </p>
              </div>

              {/* Recovery Result */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {language === 'bn' ? 'চূড়ান্ত ফলাফল ও সুস্থতা:' : 'Final Recovery Result:'}
                </h5>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  {language === 'bn' ? selectedCase.recoveryResultBn : selectedCase.recoveryResultEn}
                </p>
              </div>
            </div>

            {/* Right Column: Medical Steps & Immediate Call Action */}
            <div className="lg:col-span-5 space-y-6">
              {/* Doctor's Intervention Checklist */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>
                    {language === 'bn'
                      ? 'ডাক্তার শান্তর প্রয়োগকৃত চিকিৎসা ধাপসমূহ:'
                      : "Dr. Shanto's Clinical Protocol:"}
                  </span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {(language === 'bn' ? selectedCase.treatmentStepsBn : selectedCase.treatmentStepsEn).map(
                    (step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Call-to-action Card for Farmers */}
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-lg space-y-3 text-center sm:text-left">
                <h5 className="font-bold text-sm text-white">
                  {language === 'bn'
                    ? 'আপনার গবাদিপশুও কি এমন ঝুঁকিতে পড়েছে?'
                    : 'Is your animal facing a similar emergency?'}
                </h5>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  {language === 'bn'
                    ? 'সময়ক্ষেপণ করবেন না। সঠিক সময়ে অভিজ্ঞ চিকিৎসকের সেবা আপনার অবলা প্রাণীর জীবন রক্ষা করতে পারে।'
                    : 'Every minute matters. Timely professional treatment can save your precious animal.'}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href="tel:01301326704"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>01301326704</span>
                  </a>
                  <button
                    onClick={onOpenVoice}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{language === 'bn' ? 'ভয়েস পরামর্শ' : 'Voice Consult'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
