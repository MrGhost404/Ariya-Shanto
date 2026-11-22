import React, { useState } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { HeroSection } from './components/HeroSection';
import { CaseStoryViewer } from './components/CaseStoryViewer';
import { SymptomTriageChecker } from './components/SymptomTriageChecker';
import { VaccinationGuide } from './components/VaccinationGuide';
import { DoctorCallModal } from './components/DoctorCallModal';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { Footer } from './components/Footer';
import {
  Phone,
  Sparkles,
  Stethoscope,
  Heart,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Radio,
  Volume2,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const doctorPhone = '01301326704';

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. Top Emergency Hotline Banner */}
      <EmergencyBanner
        language={language}
        onLanguageToggle={toggleLanguage}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenCallBooking={() => setIsBookingModalOpen(true)}
      />

      {/* 2. Main Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-10 sm:top-10 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-yellow-300 flex items-center justify-center shadow-md border border-emerald-600/30">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  {language === 'bn' ? 'অ্যানিমেল ডক্টর শান্ত' : 'Animal Doctor Shanto'}
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  ভেটেরিনারি সেবা
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn'
                  ? 'গবাদিপশুর স্বাস্থ্য ও জরুরি খামার পরিদর্শন'
                  : 'Livestock Health, Dairy Care & Emergency Farm Visits'}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {/* Live Voice AI Quick Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>{language === 'bn' ? 'লাইভ ভয়েস কথা বলুন' : 'Live Voice AI'}</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${doctorPhone}`}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition transform active:scale-95"
            >
              <Phone className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span className="font-mono">{doctorPhone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section with Featured Quote and Direct Actions */}
      <main className="flex-1">
        <HeroSection
          language={language}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 4. Live Voice Interactive Feature Spotlight Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 text-white py-5 px-4 shadow-inner border-y border-emerald-700">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Volume2 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    {language === 'bn'
                      ? 'নতুন ফিচার: জেমিনাই লাইভ ভয়েস কনভারসেশন (Gemini 3.8 Live)'
                      : 'New Feature: Real-time Live Voice AI with Gemini 3.8 Live'}
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.2 rounded-full uppercase">
                    Live
                  </span>
                </div>
                <p className="text-xs text-emerald-200">
                  {language === 'bn'
                    ? 'টাইপ করার প্রয়োজন নেই! বাংলায় মুখে কথা বলে পশুর অসুস্থতার লক্ষণ জানান এবং তাৎক্ষণিক অডিও পরামর্শ শুনুন।'
                    : 'Speak naturally in Bengali or English to receive instant audio diagnosis & first aid triage.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{language === 'bn' ? 'ভয়েস সেশন শুরু করুন' : 'Start Voice Call'}</span>
            </button>
          </div>
        </div>

        {/* 5. Documented Recovery Story Showcase (Features the User's Story!) */}
        <CaseStoryViewer
          language={language}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
        />

        {/* 6. Emergency Symptom Triage Checker */}
        <SymptomTriageChecker
          language={language}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
        />

        {/* 7. Vaccination and Deworming Guide */}
        <VaccinationGuide language={language} />

        {/* 8. Farmer Testimonials Section */}
        <section className="py-16 px-4 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                খামারিদের আস্থা ও ভালোবাসা
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {language === 'bn'
                  ? 'ডক্টর শান্তর চিকিৎসায় ফিরে পাওয়া পশুর মুখে হাসি'
                  : 'Farmer Trust & Real Testimonials'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {language === 'bn'
                  ? 'দুগ্ধ খামারি ও পশু মালিকদের বাস্তব অভিজ্ঞতা ও কৃতজ্ঞতা বার্তা।'
                  : 'Direct words from farmers whose livelihood was protected through timely veterinary intervention.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "আমার ফ্রিজিয়ান গাভীটা বাচ্চা দিয়ে আর দাঁড়াতে পারছিল না। ৩ দিন ধরে শুয়ে ছিল, সবাই বলছিল জবাই করে দিতে। শান্ত ভাই এসে শিরায় স্যালাইন ও বিশেষ ইনজেকশন দেওয়ার পর আজ গরুটি হেঁটে খাচ্ছে। উনার মতো দরদী ডাক্তার আমি দেখিনি।"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">আনোয়ার হোসেন</h4>
                    <p className="text-slate-500">শাহজাদপুর, সিরাজগঞ্জ</p>
                  </div>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    ডাউনার কাউ আরোগ্য
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "কোরবানির ষাঁড়ের হঠাৎ পেট ফুলে দম আটকে মারা যাওয়ার অবস্থা। রাত ১টায় শান্ত ভাইকে ফোন দিতেই দ্রুত এসে ক্যানুলা দিয়ে গ্যাস বের করে ওষুধ দিলেন। আধা ঘণ্টার মধ্যে ষাঁড়টা সুস্থ হয়ে ওঠে। 01301326704 নম্বরটি আমার কাছে জীবন বাঁচানোর নম্বর।"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">হাজী মোজাম্মেল হক</h4>
                    <p className="text-slate-500">পাবনা সদর</p>
                  </div>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    তীব্র পেট ফাঁপা চিকিৎসা
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★★★★★'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "ওলান পেকে এক বাট দিয়ে হলুদ পুঁজ বের হচ্ছিল। দুধের মান পুরোপুরি নষ্ট হয়ে গিয়েছিল। শান্ত ভাইয়ের সঠিক অ্যান্টিবায়োটিক টিউব আর পরিচর্যায় ৫ দিনে ওলান নরম হয়ে আগের মতো ১৫ লিটার দুধ দেওয়া শুরু করেছে।"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">তারেক মাহমুদ</h4>
                    <p className="text-slate-500">দুগ্ধ খামারি, নাটোর</p>
                  </div>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    ম্যাসটাইটিস নিরাময়
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Floating Emergency Action Orb on Mobile */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Voice Button */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs border-2 border-white"
        >
          <Sparkles className="w-4 h-4 text-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">লাইভ ভয়েস কথা বলুন</span>
          <span className="sm:hidden">ভয়েস AI</span>
        </button>

        {/* Floating Call Doctor Button */}
        <a
          href={`tel:${doctorPhone}`}
          className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm border-2 border-white"
          title="জরুরি কল করুন: 01301326704"
        >
          <Phone className="w-5 h-5 text-yellow-300 animate-bounce" />
          <span className="font-mono">{doctorPhone}</span>
        </a>
      </div>

      {/* 10. Modals */}
      <LiveVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
      />

      <DoctorCallModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        language={language}
      />

      {/* 11. Footer */}
      <Footer
        language={language}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />
    </div>
  );
}
