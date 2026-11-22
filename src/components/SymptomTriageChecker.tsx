import React, { useState } from 'react';
import { SYMPTOM_TRIAGE_LIST } from '../data/cases';
import { AnimalCategory, SymptomTriageItem } from '../types';
import {
  AlertTriangle,
  ShieldAlert,
  Phone,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';

interface SymptomTriageCheckerProps {
  language: 'bn' | 'en';
  onOpenVoice: () => void;
}

export const SymptomTriageChecker: React.FC<SymptomTriageCheckerProps> = ({
  language,
  onOpenVoice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AnimalCategory>('cattle');
  const [selectedTriage, setSelectedTriage] = useState<SymptomTriageItem>(SYMPTOM_TRIAGE_LIST[0]);

  const filteredItems = SYMPTOM_TRIAGE_LIST.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'bn' ? 'জরুরি লক্ষণ ও প্রাথমিক প্রতিবিধান' : 'Emergency Triage & First Aid'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'ডাক্তার পৌঁছানোর আগে কী করবেন?'
              : 'What to Do While Waiting for Doctor Shanto'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'bn'
              ? 'আপনার পশুর জরুরি লক্ষণ নির্বাচন করুন এবং সঠিক প্রাথমিক পদক্ষেপ গ্রহণ করে জীবন রক্ষা করুন।'
              : 'Select your animal symptoms to access immediate veterinary first-aid and precautions.'}
          </p>
        </div>

        {/* Animal Category Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setSelectedCategory('cattle');
                const first = SYMPTOM_TRIAGE_LIST.find((i) => i.category === 'cattle');
                if (first) setSelectedTriage(first);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedCategory === 'cattle'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🐄</span>
              <span>{language === 'bn' ? 'গরু ও মহিষ (Cattle)' : 'Cattle & Dairy'}</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('goat_sheep');
                const first = SYMPTOM_TRIAGE_LIST.find((i) => i.category === 'goat_sheep');
                if (first) setSelectedTriage(first);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedCategory === 'goat_sheep'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🐐</span>
              <span>{language === 'bn' ? 'ছাগল ও ভেড়া (Goats)' : 'Goats & Sheep'}</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('pets');
                const first = SYMPTOM_TRIAGE_LIST.find((i) => i.category === 'pets');
                if (first) setSelectedTriage(first);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedCategory === 'pets'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🐕</span>
              <span>{language === 'bn' ? 'পোষা প্রাণী (Pets)' : 'Dogs & Cats'}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Triage Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Symptom List Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {language === 'bn' ? 'লক্ষণ নির্বাচন করুন:' : 'Select Symptom Presentation:'}
            </h3>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTriage(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  selectedTriage.id === item.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.severity === 'critical'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {item.severity === 'critical'
                        ? language === 'bn'
                          ? 'জরুরি বিপদ'
                          : 'Critical'
                        : language === 'bn'
                        ? 'দ্রুত পদক্ষেপ'
                        : 'Urgent'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'bn' ? item.nameBn : item.nameEn}
                  </h4>
                </div>
                <ChevronRight
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    selectedTriage.id === item.id
                      ? 'text-emerald-700 translate-x-1'
                      : 'text-slate-400'
                  }`}
                />
              </div>
            ))}

            {/* AI Voice Prompt Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between gap-3 shadow-md mt-4">
              <div className="text-xs space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-yellow-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'অন্য কোনো লক্ষণ?' : 'Different symptoms?'}
                </span>
                <p className="text-emerald-200">
                  {language === 'bn'
                    ? 'এআই ভয়েস অ্যাসিস্ট্যান্টকে বাংলায় মুখে বলুন'
                    : 'Ask our Live Voice AI directly in speech'}
                </p>
              </div>
              <button
                onClick={onOpenVoice}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition flex-shrink-0"
              >
                {language === 'bn' ? 'ভয়েস অন' : 'Voice Consult'}
              </button>
            </div>
          </div>

          {/* Right Column: Detailed First-Aid Guide */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Header of selected item */}
            <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase inline-block mb-2 ${
                    selectedTriage.severity === 'critical'
                      ? 'bg-red-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {selectedTriage.severity === 'critical'
                    ? language === 'bn'
                      ? 'জরুরি ইমার্জেন্সি প্রোটোকল'
                      : 'Critical Emergency Protocol'
                    : language === 'bn'
                    ? 'দ্রুত পদক্ষেপ নির্দেশিকা'
                    : 'Urgent Care Guidelines'}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {language === 'bn' ? selectedTriage.nameBn : selectedTriage.nameEn}
                </h3>
              </div>
            </div>

            {/* Warning Alert */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-red-800 uppercase tracking-wide block">
                  {language === 'bn' ? 'বিশেষ সতর্কতা ও ঝুঁকি:' : 'Critical Precaution:'}
                </strong>
                <p className="text-xs sm:text-sm text-red-950 mt-0.5">
                  {language === 'bn' ? selectedTriage.warningBn : selectedTriage.warningEn}
                </p>
              </div>
            </div>

            {/* Actionable First-Aid steps */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'bn'
                    ? 'অবিলম্বে করণীয় পদক্ষেপসমূহ (First-Aid):'
                    : 'Immediate Recommended Actions:'}
                </span>
              </h4>
              <ul className="space-y-2.5">
                {(language === 'bn'
                  ? selectedTriage.firstAidBn
                  : selectedTriage.firstAidEn
                ).map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Call Dr. Shanto Action */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  {language === 'bn' ? 'চিকিৎসকের সরাসরি সহযোগিতা প্রয়োজন?' : 'Need doctor on site?'}
                </p>
                <p>
                  {language === 'bn'
                    ? 'অবিলম্বে ডক্টর শান্তর সাথে যোগাযোগ করুন'
                    : 'Call Dr. Shanto immediately for assistance'}
                </p>
              </div>
              <a
                href="tel:01301326704"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition shadow-md"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>01301326704</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
