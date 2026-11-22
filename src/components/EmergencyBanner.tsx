import React, { useState } from 'react';
import { Phone, Clock, MessageSquare, ShieldAlert, Sparkles, Copy, Check } from 'lucide-react';

interface EmergencyBannerProps {
  language: 'bn' | 'en';
  onLanguageToggle: () => void;
  onOpenVoice: () => void;
  onOpenCallBooking: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  language,
  onLanguageToggle,
  onOpenVoice,
  onOpenCallBooking,
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '01301326704';

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-red-700 via-rose-700 to-emerald-800 text-white shadow-md sticky top-0 z-40 border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
        {/* Left: Emergency Status */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-4 h-4 text-yellow-300 hidden sm:inline" />
            <span>
              {language === 'bn'
                ? 'অবলা প্রাণীদের জরুরি চিকিৎসা ও খামার পরিদর্শন সেবা'
                : 'Emergency Livestock Veterinary & Farm House-Call Service'}
            </span>
          </div>
          <span className="bg-red-950/60 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-mono font-semibold hidden md:inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> 24/7 Active
          </span>
        </div>

        {/* Center/Right: Call button & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Direct Phone Link */}
          <div className="flex items-center bg-white/10 hover:bg-white/20 transition-all rounded-lg p-0.5 border border-white/20">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm font-bold tracking-wide text-white hover:text-yellow-200"
              title="সরাসরি ফোন করুন"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span>{phoneNumber}</span>
            </a>
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-white/20 rounded text-slate-200 hover:text-white"
              title="নম্বর কপি করুন"
              aria-label="Copy phone number"
            >
              {copied ? <Check className="w-3 h-3 text-green-300" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/88${phoneNumber}?text=${encodeURIComponent(
              language === 'bn'
                ? 'আসসালামু আলাইকুম ডক্টর শান্ত, আমার পশুর জরুরি চিকিৎসার জন্য পরামর্শ প্রয়োজন।'
                : 'Hello Dr. Shanto, I need emergency veterinary assistance for my animal.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>

          {/* Voice AI Assistant Trigger Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold px-3 py-1 rounded-lg text-xs transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{language === 'bn' ? 'লাইভ ভয়েস কথা বলুন' : 'Live Voice AI'}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={onLanguageToggle}
            className="text-xs bg-black/30 hover:bg-black/50 border border-white/20 px-2 py-1 rounded text-white font-medium transition"
          >
            {language === 'bn' ? 'ENG' : 'বাংলা'}
          </button>
        </div>
      </div>
    </div>
  );
};
