import React from 'react';
import {
  Phone,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Stethoscope,
  Activity,
  Award,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface HeroSectionProps {
  language: 'bn' | 'en';
  onOpenVoice: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenVoice,
  onOpenBooking,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 text-white pt-10 pb-16 px-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Core Heartfelt Message */}
          <div className="lg:col-span-7 space-y-6">
            {/* Doctor Identity Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-inner">
              <Stethoscope className="w-4 h-4 text-yellow-300" />
              <span>
                {language === 'bn'
                  ? 'অ্যানিমেল ডক্টর শান্ত • গবাদিপশু ও প্রাণিসেবা বিশেষজ্ঞ'
                  : 'Animal Doctor Shanto • Senior Veterinary Specialist'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-snug">
              {language === 'bn' ? (
                <>
                  জীবন আর মৃত্যুর মাঝখানে থাকা{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-emerald-300">
                    অবলা প্রাণীর সুস্থতায়
                  </span>{' '}
                  আমাদের নিবেদিত সেবা
                </>
              ) : (
                <>
                  Dedicated Veterinary Care for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-emerald-300">
                    Innocent Lives on the Brink
                  </span>
                </>
              )}
            </h1>

            {/* Inspiring user quote block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl relative">
              <div className="text-amber-300 text-3xl font-serif absolute -top-4 left-4 leading-none">“</div>
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed pt-1">
                {language === 'bn'
                  ? '“যখন ওঠার ন্যূনতম ক্ষমতাটুকুও ছিল না, মালিকও হয়তো আশা ছেড়ে দিয়েছিলেন। কিন্তু সঠিক চিকিৎসা, সঠিক ওষুধ আর ভালোবাসার কাছে হার মানল সেই কষ্টও! অ্যানিমেল ডক্টর শান্ত-এর চিকিৎসায় আজ গরুটি সম্পূর্ণ সুস্থ এবং নিজের পায়ে দাঁড়িয়ে আছে। অবলা প্রাণীদের সেবায় আমরা সব সময় আপনার পাশে।”'
                  : '"When the animal had no strength left to even lift its head, and the owner had nearly lost all hope... proper diagnosis, modern treatment, and heartfelt love triumphed over suffering! Under Dr. Shanto\'s care, the cow is now fully recovered and standing proudly on its feet. We are always by your side in service of innocent animals."'}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  {language === 'bn' ? 'বাস্তব সফল কেস স্টাডি' : 'Documented Recovery Case'}
                </span>
                <span className="font-semibold text-yellow-300">
                  {language === 'bn' ? 'জরুরি কল: 01301326704' : 'Hotline: 01301326704'}
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Call Hotline */}
              <a
                href="tel:01301326704"
                className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-red-600/30 transition transform active:scale-95 text-base"
              >
                <Phone className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>{language === 'bn' ? 'সরাসরি কল করুন (01301326704)' : 'Call Doctor (01301326704)'}</span>
              </a>

              {/* Live Voice Assistant */}
              <button
                onClick={onOpenVoice}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-5 py-3.5 rounded-xl shadow-lg transition transform active:scale-95 text-sm"
              >
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>{language === 'bn' ? 'লাইভ ভয়েস কথা বলুন (Gemini)' : 'Voice Consult (Gemini Live)'}</span>
              </button>

              {/* Schedule farm visit */}
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-3.5 rounded-xl transition text-sm"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>{language === 'bn' ? 'খামার ভিজিট বুকিং' : 'Book House Call'}</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-yellow-300">১,২০০+</span>
                <span className="text-[11px] text-slate-300">
                  {language === 'bn' ? 'সফল চিকিৎসা কেস' : 'Animals Saved'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-emerald-300">২৪ ঘণ্টা</span>
                <span className="text-[11px] text-slate-300">
                  {language === 'bn' ? 'ইমার্জেন্সি সাপোর্ট' : 'Emergency Coverage'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-amber-300">মাঠ পর্যায়ে</span>
                <span className="text-[11px] text-slate-300">
                  {language === 'bn' ? 'সরাসরি খামার পরিদর্শন' : 'Direct Farm Visits'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Top Banner inside card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-yellow-300">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      {language === 'bn' ? 'ডক্টর শান্তর ভেটেরিনারি সেবা' : 'Dr. Shanto Veterinary Clinic'}
                    </h2>
                    <p className="text-[11px] text-emerald-300">
                      {language === 'bn' ? 'গবাদিপশুর পূর্ণাঙ্গ সুচিকিৎসা' : 'Holistic Livestock Care'}
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Now
                </span>
              </div>

              {/* Service Capabilities Checklist */}
              <div className="space-y-3.5 mb-6 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      {language === 'bn'
                        ? 'পড়ে যাওয়া গরুর বিশেষায়িত চিকিৎসা (Downer Cow Syndrome):'
                        : 'Specialized Downer Cow Intervention:'}
                    </strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {language === 'bn'
                        ? 'মিল্ক ফিভার, নার্ভ কম্প্রেশন ও ক্যালসিয়াম ঘাটতিতে দ্রুত নিজের পায়ে দাঁড় করানোর কার্যকর থেরাপি।'
                        : 'Targeted nerve restorative IV infusions and physical rehabilitation.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      {language === 'bn' ? 'জরুরি পেট ফাঁপা ও রুমিনাল সার্জারি:' : 'Acute Bloat & Gas Triage:'}
                    </strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {language === 'bn'
                        ? 'দম বন্ধ হওয়ার ঝুঁকি থেকে তাৎক্ষণিক ক্যানুলাইজেশন ও অ্যান্টি-ফোমিং রিলিফ।'
                        : 'Immediate decompression preventing catastrophic asphyxiation.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      {language === 'bn' ? 'ওলান পাকা ও দুধের মান রক্ষা (Mastitis Care):' : 'Mastitis Therapy & Teat Preservation:'}
                    </strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {language === 'bn'
                        ? 'বাঁট নষ্ট হওয়া থেকে রক্ষা করে দুগ্ধ খামারের উৎপাদন স্বাভাবিক রাখা।'
                        : 'Early intramammary treatment guarding farm profitability.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      {language === 'bn' ? 'ছাগল ও ভেড়ার পিপিআর ও নিউমোনিয়া:' : 'Goat Pneumonia & PPR Management:'}
                    </strong>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {language === 'bn'
                        ? 'শীতকালীন সর্দি, উচ্চ জ্বর ও শ্বাসকষ্ট নিরাময়ে আধুনিক চিকিৎসা।'
                        : 'Advanced respiratory care for small ruminants.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Call Box */}
              <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <p className="text-slate-300">
                    {language === 'bn' ? 'জরুরি পরামর্শ ও ডক্টর শান্তর ভিজিট:' : 'Immediate Doctor Dispatch:'}
                  </p>
                  <a
                    href="tel:01301326704"
                    className="text-lg font-mono font-extrabold text-yellow-300 hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-4 h-4 text-yellow-300 animate-bounce" /> 01301326704
                  </a>
                </div>
                <a
                  href="tel:01301326704"
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1 shadow-md"
                >
                  <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
