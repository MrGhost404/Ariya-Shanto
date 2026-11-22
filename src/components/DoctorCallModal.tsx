import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  X,
  MapPin,
  AlertTriangle,
  User,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface DoctorCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
}

export const DoctorCallModal: React.FC<DoctorCallModalProps> = ({ isOpen, onClose, language }) => {
  const [farmerName, setFarmerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [animalType, setAnimalType] = useState('গরু (Dairy Cattle)');
  const [urgency, setUrgency] = useState<'critical' | 'today' | 'routine'>('critical');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const doctorPhone = '01301326704';

  const formatWhatsAppMessage = () => {
    return encodeURIComponent(
      `*জরুরি ভেটেরিনারি সেবা অনুরোধ*\n` +
        `খামারির নাম: ${farmerName || 'নাম উল্লেখ নেই'}\n` +
        `ফোন: ${phoneNumber || 'ফোন নম্বর নেই'}\n` +
        `স্থান/ঠিকানা: ${location || 'ঠিকানা দেওয়া হয়নি'}\n` +
        `প্রাণীর ধরন: ${animalType}\n` +
        `জরুরিতা: ${
          urgency === 'critical'
            ? '🔴 অতি জরুরি (জীবন-মরণ সংকট)'
            : urgency === 'today'
            ? '🟡 আজই ভিজিট প্রয়োজন'
            : '🟢 রুটিন চেকআপ'
        }\n` +
        `সমস্যা: ${notes || 'দ্রুত চিকিৎসকের পরামর্শ প্রয়োজন'}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-white">
              {language === 'bn' ? 'জরুরি খামার ভিজিট ও কল সেবা' : 'Emergency House Call Dispatch'}
            </h3>
            <p className="text-xs text-emerald-200">
              {language === 'bn'
                ? 'ডক্টর শান্তর সাথে সরাসরি যোগাযোগ: 01301326704'
                : 'Direct connection with Dr. Shanto: 01301326704'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'তথ্য প্রস্তুত করা হয়েছে!' : 'Request Details Prepared!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'নিচের বোতামে চাপ দিয়ে সরাসরি ডক্টর শান্তকে ফোন করুন অথবা হোয়াটসঅ্যাপে তাৎক্ষণিক পাঠিয়ে দিন।'
                  : 'Press the buttons below to dial directly or dispatch via WhatsApp.'}
              </p>

              <div className="space-y-2.5 pt-3">
                <a
                  href={`tel:${doctorPhone}`}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-md transition"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>এখনই কল করুন (01301326704)</span>
                </a>
                <a
                  href={`https://wa.me/88${doctorPhone}?text=${formatWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp-এ বিস্তারিত পাঠান</span>
                </a>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-slate-400 hover:text-slate-600 underline pt-2"
              >
                {language === 'bn' ? 'তথ্য পুনরায় সংশোধন করুন' : 'Edit details'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-xs font-medium">
                  {language === 'bn'
                    ? 'জরুরি সংকট মুহূর্তে এক মিনিটও নষ্ট না করে সরাসরি কল করাই শ্রেয়।'
                    : 'In urgent situations, calling directly saves precious minutes.'}
                </span>
              </div>

              {/* Urgency Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {language === 'bn' ? 'জরুরিতার মাত্রা:' : 'Urgency Level:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('critical')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      urgency === 'critical'
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🚨 {language === 'bn' ? 'অতি জরুরি' : 'Critical'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('today')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      urgency === 'today'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ⚠️ {language === 'bn' ? 'আজই ভিজিট' : 'Today'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('routine')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      urgency === 'routine'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🗓️ {language === 'bn' ? 'রুটিন চেক' : 'Routine'}
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder={language === 'bn' ? 'উদা: মো. রফিকুল ইসলাম' : 'e.g. Rafiqul Islam'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Location & Animal Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'ঠিকানা / গ্রাম / এলাকা:' : 'Location / Village / Area:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'bn' ? 'উপজেলা, জেলা ও গ্রাম' : 'Village, Upazila, District'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'আক্রান্ত প্রাণীর ধরন:' : 'Animal Type:'}
                  </label>
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="গরু (Dairy Cattle)">গাভী / বকনা গরু (Cow)</option>
                    <option value="ষাঁড় (Bull / Ox)">ষাঁড় / বলদ (Bull)</option>
                    <option value="বাছুর (Calf)">বাছুর (Calf)</option>
                    <option value="ছাগল (Goat)">ছাগল / খাসি (Goat)</option>
                    <option value="ভেড়া (Sheep)">ভেড়া (Sheep)</option>
                    <option value="মহিষ (Buffalo)">মহিষ (Buffalo)</option>
                    <option value="পোষা কুকুর/বিড়াল (Pet)">কুকুর / বিড়াল (Pet)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'কী লক্ষণ দেখা যাচ্ছে?' : 'Observed Symptoms:'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'উদা: গরুটি হঠাৎ শুয়ে পড়েছে, উঠতে পারছে না, পেট ফুলে গেছে, খাওয়া বন্ধ...'
                      : 'e.g. Cow down and cannot stand, bloat, high fever...'
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl transition shadow-md text-center"
                >
                  {language === 'bn' ? 'তথ্য জমা দিন ও কল করুন' : 'Submit & Connect'}
                </button>
                <a
                  href={`tel:${doctorPhone}`}
                  className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl text-center shadow-md transition"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>01301326704</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
