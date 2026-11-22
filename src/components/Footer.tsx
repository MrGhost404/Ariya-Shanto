import React from 'react';
import { Phone, Heart, ShieldCheck, Sparkles, Stethoscope, MapPin, MessageSquare } from 'lucide-react';

interface FooterProps {
  language: 'bn' | 'en';
  onOpenVoice: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenVoice, onOpenBooking }) => {
  const doctorPhone = '01301326704';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 py-10 px-4 border-b border-emerald-800/40 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === 'bn'
                ? 'অবলা প্রাণীদের সেবায় আমরা সব সময় আপনার পাশে'
                : 'Always by Your Side in Service of Innocent Lives'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {language === 'bn'
                ? 'সঠিক চিকিৎসা, সঠিক ওষুধ আর ভালোবাসার মাধ্যমে যে কোনো জটিল ও সংকটাপন্ন গবাদিপশুর চিকিৎসায় যোগাযোগ করুন ডক্টর শান্তর সাথে।'
                : 'Combining proper medical science, timely therapeutics, and compassionate nursing.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${doctorPhone}`}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black px-6 py-3.5 rounded-xl text-base shadow-xl transition transform active:scale-95"
            >
              <Phone className="w-5 h-5 animate-pulse text-yellow-300" />
              <span>{doctorPhone}</span>
            </a>
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-3.5 rounded-xl text-sm shadow-lg transition"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{language === 'bn' ? 'এআই ভয়েস সহকারী' : 'Live Voice AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs sm:text-sm">
        {/* Col 1: Identity */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-yellow-300 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-white">
                অ্যানিমেল ডক্টর শান্ত (Animal Doctor Shanto)
              </h4>
              <p className="text-xs text-emerald-400">গবাদিপশু স্বাস্থ্য ও জরুরি ভেটেরিনারি সেবা</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            {language === 'bn'
              ? 'দুধেল গাভীর ডাউনার কাউ সিনড্রোম, মিল্ক ফিভার, ওলান পাকা (Mastitis), পেট ফাঁপা (Bloat), বাছুরের চিকিৎসা এবং ছাগল-ভেড়ার মহামারী রোগ প্রতিরোধে নিবেদিত সেবা।'
              : 'Specialized clinical care for dairy cattle, recumbency management, rumen surgery, and comprehensive preventative medicine in Bangladesh.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>সরাসরি মাঠ পর্যায়ে খামার পরিদর্শন ও চিকিৎসা সেবা</span>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="md:col-span-4 space-y-2">
          <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
            {language === 'bn' ? 'বিশেষ চিকিৎসা সেবাসমূহ' : 'Clinical Specialties'}
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• শুয়ে পড়া গরুর উঠে দাঁড়ানোর বিশেষ নার্ভ থেরাপি</li>
            <li>• প্রসব পরবর্তী মিল্ক ফিভার ও ক্যালসিয়াম ঘাটতি পূরণ</li>
            <li>• তীব্র পেট ফাঁপা ও রুমিনাল ইম্প্যাকশন সার্জারি</li>
            <li>• ওলান পাকা ও বাঁট বন্ধের আধুনিক ইন্ট্রাম্যামারি চিকিৎসা</li>
            <li>• খামারের এফএমডি, এলএসডি ও পিপিআর টিকাদান কর্মসূচি</li>
          </ul>
        </div>

        {/* Col 3: Direct Contact */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-2">
            {language === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Contact'}
          </h5>
          <div className="space-y-2">
            <a
              href={`tel:${doctorPhone}`}
              className="flex items-center gap-2 text-emerald-300 hover:text-white font-mono font-bold text-base"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>{doctorPhone}</span>
            </a>
            <a
              href={`https://wa.me/88${doctorPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 px-3 py-1.5 rounded-lg text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp মেসেজ করুন</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-500 pt-2">
            ২৪ ঘণ্টা সার্বক্ষণিক জরুরি অন-কল টেলিমেডিসিন ও খামার ভিজিট।
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-5 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span>© {new Date().getFullYear()} অ্যানিমেল ডক্টর শান্ত। সর্বস্বত্ব সংরক্ষিত।</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <span>মানবতা ও অবলা প্রাণীদের প্রতি অকৃত্রিম মমতায় নিবেদিত</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        </div>
      </div>
    </footer>
  );
};
