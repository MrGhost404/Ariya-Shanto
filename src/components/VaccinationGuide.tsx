import React from 'react';
import { VACCINE_SCHEDULE } from '../data/cases';
import { Syringe, ShieldCheck, AlertCircle, Phone, Calendar } from 'lucide-react';

interface VaccinationGuideProps {
  language: 'bn' | 'en';
}

export const VaccinationGuide: React.FC<VaccinationGuideProps> = ({ language }) => {
  return (
    <section className="py-16 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Syringe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'bn' ? 'রোগ প্রতিরোধ ও টিকাদান কর্মসূচি' : 'Vaccine & Preventative Care'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'গবাদিপশুর জরুরি টিকাদান ও কৃমিনাশক নির্দেশিকা'
              : 'Essential Livestock Vaccination Schedule'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {language === 'bn'
              ? 'রোগ হওয়ার পর চিকিৎসার চেয়ে সময়মতো সঠিক টিকা প্রয়োগে অবলা প্রাণীদের সুস্থ রাখা শতগুণ সহজ।'
              : 'Prevent fatal epidemic outbreaks with timely vaccination for dairy cattle and goats.'}
          </p>
        </div>

        {/* Vaccine Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VACCINE_SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.importanceBn}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'bn' ? item.diseaseBn : item.diseaseEn}
                </h3>
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">উপযুক্ত প্রাণী:</span>
                    <span>{language === 'bn' ? item.targetBn : item.targetEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">টিকার বয়স:</span>
                    <span>{item.ageBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">পুনঃপ্রয়োগ (বুস্টার):</span>
                    <span>{item.intervalBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">উপযুক্ত মৌসুম:</span>
                    <span>{item.seasonBn}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href="tel:01301326704"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-2 rounded-xl transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'টিকা প্রয়োগের শিডিউল বুক করুন' : 'Book Vaccination Visit'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Note on Deworming */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-base font-bold text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <span>
                {language === 'bn'
                  ? 'ডক্টর শান্তর বিশেষ পরামর্শ: কৃমিনাশক ও পুষ্টি'
                  : "Dr. Shanto's Note: Deworming & Mineral Balance"}
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {language === 'bn'
                ? 'টিকা প্রয়োগের কমপক্ষে ৭ দিন পূর্বে প্রাণীকে সঠিক মাত্রার কৃমিনাশক (Dewormer) প্রদান করা আবশ্যক। কৃমিমুক্ত শরীরে টিকার অ্যান্টিবডি পূর্ণমাত্রায় তৈরি হয়। বিস্তারিত ডোজ ও ব্যবস্থাপনার জন্য যোগাযোগ করুন।'
                : 'Always administer proper deworming at least 7 days prior to vaccination to ensure maximum immune response and antibody formation.'}
            </p>
          </div>
          <a
            href="tel:01301326704"
            className="flex-shrink-0 flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md"
          >
            <Phone className="w-4 h-4 text-yellow-300" />
            <span>01301326704</span>
          </a>
        </div>
      </div>
    </section>
  );
};
