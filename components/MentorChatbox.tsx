'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function MentorChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Sampurasun! Saya Kang Mentor UMKM Cigondewah Hilir. Ada yang bisa saya bantu untuk kelancaran jualan online Anda hari ini?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Gimana cara foto baju biar warnanya mirip aslinya?',
    'Kapan jam terbaik upload video ke TikTok?',
    'Bagaimana cara buat pesan otomatis di WA Business?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMessages = [...messages, { role: 'user' as const, content: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: 'Maaf, terjadi masalah. Coba tanyakan lagi ya.' },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Koneksi terganggu. Silakan periksa internet Anda.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="chat-section" className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-700 hover:bg-primary-800 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 font-bold text-base transition transform hover:scale-105 border-2 border-yellow-300"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="hidden md:inline">Tanya Kang Mentor AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary-600 w-[92vw] max-w-[400px] h-[550px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white text-primary-700 p-2 rounded-full">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">Kang Mentor UMKM</h3>
                <p className="text-xs text-primary-200">Siap membantu 24 jam</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-primary-800 p-1 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-base max-w-[80%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border shadow-sm rounded-bl-none'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-500 italic text-center py-2">
                Kang Mentor sedang mengetik jawaban...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="p-2 bg-white border-t space-y-1 overflow-x-auto">
            <p className="text-xs font-bold text-slate-500 px-1">Pertanyaan Cepat:</p>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="text-xs bg-slate-100 hover:bg-primary-100 text-slate-700 font-medium px-2 py-1 rounded-full whitespace-nowrap border shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Tulis pertanyaan Anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2.5 border rounded-xl focus:border-primary-600 text-base"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="bg-primary-700 hover:bg-primary-800 text-white p-2.5 rounded-xl transition disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
