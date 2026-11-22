import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Phone,
  X,
  Sparkles,
  AlertTriangle,
  Send,
  Radio,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { floatTo16BitPCM, arrayBufferToBase64, pcm24kToAudioBuffer } from '../utils/audio';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'bn' | 'en';
}

interface Message {
  role: 'user' | 'model';
  text: string;
  audioUrl?: string;
  timestamp: string;
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({ isOpen, onClose, language }) => {
  const [activeMode, setActiveMode] = useState<'live' | 'chat'>('live');
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Text/Audio Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text:
        language === 'bn'
          ? 'আসসালামু আলাইকুম! আমি অ্যানিমেল ডক্টর শান্তর এআই ভেটেরিনারি অ্যাসিস্ট্যান্ট। আপনার গবাদিপশু বা পোষা প্রাণীর কী সমস্যা হচ্ছে? কথা বলে বা লিখে জানান।'
          : "Hello! I am Dr. Shanto's AI Veterinary Assistant. How can I assist with your livestock or pet health today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Audio References for Live API
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Audio player for TTS
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Quick farmer prompts
  const quickPrompts = [
    {
      bn: 'আমার গরুটি শুয়ে পড়েছে, উঠতে পারছে না (Downer Cow)',
      en: 'My cow collapsed and cannot stand up',
      category: 'জরুরি',
    },
    {
      bn: 'গরুর পেট ফুলে ঢোল হয়ে গেছে, শ্বাসকষ্ট (Bloat)',
      en: 'Severe abdominal bloating and distress',
      category: 'জরুরি',
    },
    {
      bn: 'দুধেল গাভীর ওলান শক্ত ও দুধ লালচে (Mastitis)',
      en: 'Hard udder and blood-tinged milk',
      category: 'গুরুত্বপূর্ণ',
    },
    {
      bn: 'ছাগলের তীব্র সর্দি, কাশি ও জ্বর (Pneumonia)',
      en: 'Goat has high fever and severe coughing',
      category: 'চিকিৎসা',
    },
    {
      bn: 'বাছুর দুধ খাচ্ছে না ও পাতলা পায়খানা (Diarrhea)',
      en: 'Calf refusing milk with watery stool',
      category: 'চিকিৎসা',
    },
  ];

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Clean up on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      stopLiveSession();
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
    }
  }, [isOpen]);

  const startLiveSession = async () => {
    try {
      setConnectionStatus('connecting');

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      mediaStreamRef.current = stream;

      // Audio contexts
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioCtxRef.current = new AudioCtx({ sampleRate: 16000 });
      outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      nextPlayTimeRef.current = outputAudioCtxRef.current.currentTime;

      // Connect WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[Live] WebSocket connected');
        setConnectionStatus('connected');
        setIsLiveActive(true);
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.interrupted) {
            // Stop playing current chunks
            if (outputAudioCtxRef.current) {
              nextPlayTimeRef.current = outputAudioCtxRef.current.currentTime;
            }
            setIsSpeaking(false);
          }

          if (data.audio && outputAudioCtxRef.current) {
            setIsSpeaking(true);
            const ctx = outputAudioCtxRef.current;
            const audioBuffer = pcm24kToAudioBuffer(ctx, data.audio);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);

            const startTime = Math.max(ctx.currentTime, nextPlayTimeRef.current);
            source.start(startTime);
            nextPlayTimeRef.current = startTime + audioBuffer.duration;

            source.onended = () => {
              if (ctx.currentTime >= nextPlayTimeRef.current - 0.05) {
                setIsSpeaking(false);
              }
            };
          }
        } catch (err) {
          console.error('[Live] Message handling error:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('[Live] WS Error:', err);
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        console.log('[Live] WS Closed');
        setIsLiveActive(false);
        setConnectionStatus('idle');
      };

      // Set up mic processing
      const source = inputAudioCtxRef.current.createMediaStreamSource(stream);
      const processor = inputAudioCtxRef.current.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!isLiveActive && ws.readyState !== WebSocket.OPEN) return;
        if (isMuted) return;

        const inputData = e.inputBuffer.getChannelData(0);

        // Simple volume threshold check
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += Math.abs(inputData[i]);
        }
        const avg = sum / inputData.length;
        setIsUserTalking(avg > 0.02);

        const pcmBuffer = floatTo16BitPCM(inputData);
        const base64Audio = arrayBufferToBase64(pcmBuffer);

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ audio: base64Audio }));
        }
      };

      source.connect(processor);
      processor.connect(inputAudioCtxRef.current.destination);
    } catch (err) {
      console.error('[Live] Error starting live audio:', err);
      setConnectionStatus('error');
      alert(
        language === 'bn'
          ? 'মাইক্রোফোন অ্যাক্সেস করতে সমস্যা হয়েছে। অনুগ্রহ করে মাইক্রোফোনের অনুমতি দিন অথবা চ্যাট মোড ব্যবহার করুন।'
          : 'Could not access microphone. Please grant mic permission or switch to Chat mode.'
      );
    }
  };

  const stopLiveSession = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsLiveActive(false);
    setIsSpeaking(false);
    setIsUserTalking(false);
    setConnectionStatus('idle');
  };

  // Chat consultation with Gemini 3.8 Flash + TTS
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: language,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'জরুরি চিকিৎসার জন্য ডক্টর শান্তর সাথে যোগাযোগ করুন: 01301326704';

      const modelMessage: Message = {
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);

      // Automatically synthesize spoken audio for the reply
      playTtsAudio(reply);
    } catch (err) {
      console.error('Consultation error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'পরামর্শ প্রদান করতে সমস্যা হয়েছে। জরুরি সাহায্যের জন্য সরাসরি কল করুন: 01301326704',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const playTtsAudio = async (text: string) => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.audioUrl) {
        if (currentAudioElementRef.current) {
          currentAudioElementRef.current.pause();
        }
        const audio = new Audio(data.audioUrl);
        currentAudioElementRef.current = audio;
        audio.play().catch((e) => console.log('Audio autoplay prevented:', e));
      }
    } catch (e) {
      console.error('TTS error:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-yellow-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {language === 'bn'
                    ? 'ডক্টর শান্ত এআই লাইভ ভয়েস কনসালটেশন'
                    : 'Dr. Shanto Live Voice & AI Consult'}
                </h3>
                <span className="text-[10px] bg-emerald-600/70 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider text-yellow-300">
                  Gemini Live
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                {language === 'bn'
                  ? 'গবাদিপশুর স্বাস্থ্য ও জরুরি চিকিৎসা সহায়তায় সর্বদা পাশে'
                  : 'Real-time veterinary triage & emergency assistance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('live')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 border-b-2 transition ${
              activeMode === 'live'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? 'লাইভ ভয়েস কল (gemini-3.8-live)' : 'Real-time Live Audio'}</span>
          </button>
          <button
            onClick={() => setActiveMode('chat')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 border-b-2 transition ${
              activeMode === 'chat'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? 'প্রশ্নোত্তর ও ভয়েস নোট (Flash + TTS)' : 'Q&A & Voice Notes'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMode === 'live' ? (
            /* Live Audio Mode */
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-5">
              {/* Visual Waveform / Pulse Container */}
              <div className="relative flex items-center justify-center w-40 h-40">
                {isLiveActive && (
                  <>
                    <div
                      className={`absolute inset-0 rounded-full bg-emerald-500/20 animate-ping ${
                        isSpeaking ? 'opacity-75' : 'opacity-25'
                      }`}
                    />
                    <div
                      className={`absolute -inset-4 rounded-full border-2 border-emerald-400/40 animate-pulse`}
                    />
                  </>
                )}

                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 ${
                    isLiveActive
                      ? isSpeaking
                        ? 'bg-gradient-to-br from-amber-500 to-emerald-600 text-white scale-105'
                        : isUserTalking
                        ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white scale-105'
                        : 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isLiveActive ? (
                    isSpeaking ? (
                      <Volume2 className="w-12 h-12 animate-bounce" />
                    ) : (
                      <Mic className="w-12 h-12" />
                    )
                  ) : (
                    <MicOff className="w-12 h-12" />
                  )}
                </div>
              </div>

              {/* Status Message */}
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  {connectionStatus === 'connecting'
                    ? language === 'bn'
                      ? 'লাইভ সেশনে যুক্ত হচ্ছে...'
                      : 'Connecting to Gemini Live...'
                    : isLiveActive
                    ? isSpeaking
                      ? language === 'bn'
                        ? '🗣️ ডাক্তার এআই উত্তর দিচ্ছেন...'
                        : 'Doctor AI is speaking...'
                      : isUserTalking
                      ? language === 'bn'
                        ? '🎙️ আপনার কথা শুনছি...'
                        : 'Listening to your voice...'
                      : language === 'bn'
                      ? '🟢 আপনি এখন কথা বলতে পারেন'
                      : 'Live Connected • Speak freely'
                    : language === 'bn'
                    ? 'লাইভ ভয়েস কথা শুরু করতে নিচের বোতামে চাপ দিন'
                    : 'Press button below to start real-time voice'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {language === 'bn'
                    ? 'গরু, বাছুর, ছাগল বা পোষা প্রাণীর যে কোনো অসুস্থতার লক্ষণ বাংলায় মুখে বলুন। এআই সরাসরি কথা বলে জরুরি পরামর্শ দেবে।'
                    : 'Speak symptoms naturally in Bengali or English. The assistant will respond instantly.'}
                </p>
              </div>

              {/* Sound Bars animation */}
              {isLiveActive && (
                <div className="flex items-center gap-1.5 h-8">
                  {[...Array(7)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 rounded-full ${
                        isSpeaking
                          ? 'bg-amber-500 sound-bar'
                          : isUserTalking
                          ? 'bg-emerald-500 sound-bar'
                          : 'bg-emerald-200 h-2'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Live Action Controls */}
              <div className="flex items-center gap-3">
                {!isLiveActive ? (
                  <button
                    onClick={startLiveSession}
                    disabled={connectionStatus === 'connecting'}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-sm"
                  >
                    <Mic className="w-5 h-5 text-yellow-300" />
                    <span>
                      {connectionStatus === 'connecting'
                        ? language === 'bn'
                          ? 'সংযুক্ত হচ্ছে...'
                          : 'Connecting...'
                        : language === 'bn'
                        ? 'লাইভ কথা বলুন (Start Live)'
                        : 'Start Voice Call'}
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-xl border transition ${
                        isMuted
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                      title={isMuted ? 'আনমিউট করুন' : 'মিউট করুন'}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={stopLiveSession}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl shadow-md transition text-sm"
                    >
                      <VolumeX className="w-4 h-4" />
                      <span>{language === 'bn' ? 'কল শেষ করুন' : 'End Call'}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Doctor Referral Card */}
              <div className="w-full bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-left flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-900 font-medium">
                    {language === 'bn'
                      ? 'অত্যন্ত আশঙ্কাজনক বা জরুরি অবস্থায় সরাসরি ডক্টর শান্তকে কল করুন:'
                      : 'For critical or life-threatening cases, call Dr. Shanto directly:'}
                  </span>
                </div>
                <a
                  href="tel:01301326704"
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-bold font-mono text-xs flex-shrink-0 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> 01301326704
                </a>
              </div>
            </div>
          ) : (
            /* Chat Mode */
            <div className="space-y-4">
              {/* Message List */}
              <div className="space-y-3 min-h-[220px]">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-emerald-700 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/10 text-[10px] opacity-75">
                        <span>{msg.timestamp}</span>
                        {msg.role === 'model' && (
                          <button
                            onClick={() => playTtsAudio(msg.text)}
                            className="flex items-center gap-1 hover:text-emerald-700 transition"
                            title="আবার অডিও শুনুন"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>শুনুন</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-fit">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>{language === 'bn' ? 'ডাক্তার এআই পরামর্শ প্রস্তুত করছেন...' : 'Consulting veterinary AI...'}</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Prompts */}
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'দ্রুত পরামর্শ নির্বাচন করুন:' : 'Suggested quick inquiries:'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(language === 'bn' ? p.bn : p.en)}
                      className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-left transition"
                    >
                      {language === 'bn' ? p.bn : p.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={
                    language === 'bn'
                      ? 'অসুস্থতার লক্ষণ বা প্রশ্ন লিখুন...'
                      : 'Type animal symptoms or question...'
                  }
                  className="flex-1 text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-xl disabled:opacity-50 transition shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Emergency Hotline */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>
              {language === 'bn'
                ? 'ডক্টর শান্ত সার্বক্ষণিক জরুরি সেবায় উপস্থিত'
                : 'Dr. Shanto on 24/7 emergency alert'}
            </span>
          </div>
          <a
            href="tel:01301326704"
            className="flex items-center gap-1 font-bold text-red-600 hover:text-red-700 font-mono text-sm"
          >
            <Phone className="w-3.5 h-3.5" /> 01301326704
          </a>
        </div>
      </div>
    </div>
  );
};
