import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/live-ws' });

app.use(express.json({ limit: '10mb' }));

// Doctor information
const DOCTOR_INFO = {
  name: 'অ্যানিমেল ডক্টর শান্ত (Dr. Shanto)',
  title: 'ভেটেরিনারি চিকিৎসক ও গবাদিপশু স্বাস্থ্য বিশেষজ্ঞ',
  phone: '01301326704',
  whatsapp: '01301326704',
  emergencyAvailable: '২৪ ঘণ্টা ইমার্জেন্সি অন-কল সেবা',
  location: 'মাঠ পর্যায়ে সরাসরি খামার ও গৃহ পরিদর্শন (House Calls & Clinic)'
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const VET_SYSTEM_INSTRUCTION = `
You are the expert Veterinary Voice Assistant for "অ্যানিমেল ডক্টর শান্ত" (Animal Doctor Shanto) - a dedicated, compassionate veterinary practitioner in Bangladesh.
Doctor Shanto's Emergency Hotline is: 01301326704.

Your mission:
1. Provide warm, urgent, and accurate veterinary triage and first-aid guidance for livestock (cows, goats, sheep, buffaloes) and pets.
2. Empathize with the emotional bond between the farmer/owner and their animal. Like Dr. Shanto says: "জীবন আর মৃত্যুর ঠিক মাঝখানে দাঁড়িয়ে থাকা অবলা প্রাণীদের সঠিক চিকিৎসা আর ভালোবাসাই ফিরিয়ে আনে নতুন জীবন।"
3. For life-threatening emergencies (e.g., cow unable to get up / Downer cow syndrome / milk fever, acute bloat, uterine prolapse, choking, dystocia, high fever > 105°F, severe bleeding, poisoning):
   - Immediately provide critical DOs and DON'Ts (e.g. keep cow in sternal recumbency, do NOT drench liquids if choking or unconscious to prevent aspiration pneumonia, relieve bloat safely).
   - Strongly urge the farmer to immediately dial Dr. Shanto at 01301326704 for emergency physical intervention.
4. Reply in fluent, natural, caring Bengali (বাংলা) by default, or English if asked. Keep speech clear and easy to understand for rural farmers as well as urban pet owners.
5. Never prescribe dangerous restricted drugs or arbitrary dosages without physical diagnosis; focus on clinical symptoms, safe supportive first-aid, nutritional support, and immediate doctor dispatch.
`;

// REST API: Veterinary Symptom Consultation (Gemini 3.8 Flash)
app.post('/api/consult', async (req, res) => {
  try {
    const { message, history, language = 'bn', animalType } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }],
        });
      }
    }

    const animalContext = animalType ? `[Animal Type: ${animalType}] ` : '';
    contents.push({
      role: 'user',
      parts: [{ text: `${animalContext}${message}` }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: VET_SYSTEM_INSTRUCTION + `\nRespond in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}. Keep tone professional, comforting, and prompt them to call Dr. Shanto at 01301326704 if condition is severe.`,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'ডাক্তার শান্তর পরামর্শের জন্য সরাসরি কল করুন: 01301326704';

    res.json({
      reply: replyText,
      doctorContact: DOCTOR_INFO.phone,
    });
  } catch (error: any) {
    console.error('Error in /api/consult:', error);
    res.status(500).json({
      error: 'পরামর্শ সেবা প্রদানে কিছুটা বিলম্ব হচ্ছে। জরুরি চিকিৎসার জন্য সরাসরি কল করুন: 01301326704',
      phone: DOCTOR_INFO.phone,
    });
  }
});

// REST API: Text-to-Speech using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Truncate to reasonable length for swift TTS response
    const cleanText = text.slice(0, 450);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Gentle, clear, supportive, calm veterinary doctor',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio generated' });
    }

    res.json({
      audioUrl: `data:audio/wav;base64,${base64Audio}`,
    });
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    res.status(500).json({ error: 'TTS synthesis error' });
  }
});

// WebSocket for Gemini Live API (gemini-3.8-live)
wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live WS] Client connected for voice conversation');

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: VET_SYSTEM_INSTRUCTION + '\nThis is an ongoing real-time voice call. Keep responses concise, spoken, empathetic, and spoken in Bengali (বাংলা). Mention Dr. Shanto (01301326704) if emergency.',
      },
      callbacks: {
        onmessage: (message: any) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
      },
    });

    clientWs.send(JSON.stringify({ type: 'connected', message: 'Gemini Live session connected' }));

    clientWs.on('message', (data: any) => {
      try {
        const payload = JSON.parse(data.toString());
        if (payload.audio && session) {
          session.sendRealtimeInput({
            audio: { data: payload.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('[Live WS] Message parse error:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('[Live WS] Client disconnected');
      if (session) {
        try {
          session.close();
        } catch (e) {
          // ignore
        }
      }
    });

    clientWs.on('error', (err) => {
      console.error('[Live WS] Socket error:', err);
      if (session) {
        try {
          session.close();
        } catch (e) {
          // ignore
        }
      }
    });
  } catch (err: any) {
    console.error('[Live WS] Failed to initialize Gemini Live session:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          error: 'Live Voice session failed to initialize. You can also use Tap-to-Talk or call 01301326704.',
        })
      );
    }
  }
});

// Production static files or Vite middleware in dev
async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Animal Doctor Shanto Veterinary Service server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
