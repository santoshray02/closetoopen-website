import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function AiMentorWidget({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Greetings! I am Ram Kishor Jha's AI Advisory Assistant. How can I assist your career acceleration or business strategy today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const samplePrompts = [
    "How to break a mid-career salary plateau?",
    "What is the CloseToOpen business scaling blueprint?",
    "How to prepare for an executive interview?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const qLower = query.toLowerCase();

      if (qLower.includes('career') || qLower.includes('plateau') || qLower.includes('promotion') || qLower.includes('salary')) {
        reply = `The CloseToOpen framework for career growth relies on 3 pillars:\n1. Transitioning from tactical execution to executive business storytelling.\n2. Auditing your strategic network inside and outside your enterprise.\n3. Position your value against business revenue and risk mitigation.\n\nRam Kishor Jha provides 1-on-1 career trajectory audits to help you navigate your exact situation.`;
      } else if (qLower.includes('business') || qLower.includes('scale') || qLower.includes('startup') || qLower.includes('revenue')) {
        reply = `For business scaling, Ram Kishor Jha emphasizes unit profitability and direct founder sales loops over premature cash burn:\n• Validate willingness-to-pay before scaling features.\n• Automate operational bottlenecks using modern AI workflows.\n• Build pitch decks grounded in clear unit economics.\n\nWould you like to schedule a 1-on-1 business advisory call with Ram Kishor Jha?`;
      } else if (qLower.includes('interview') || qLower.includes('resume') || qLower.includes('brand')) {
        reply = `Executive interview preparation requires shifting from answering questions to leading strategic discussions. Frame your experience around measurable business impact, cross-functional leadership, and organizational resilience.`;
      } else {
        reply = `Great question! Ram Kishor Jha specializes in closing career bottlenecks and opening scalable business opportunities through tailored 1-on-1 advisory sessions. I recommend booking a private strategy session to dive deep into your specific goals!`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all duration-300 border border-blue-400/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <span>Ask Ram Kishor AI</span>
          <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-mono font-bold tracking-wider uppercase">
            AI Persona
          </span>
        </button>
      ) : (
        /* Chat Window */
        <div className="w-[90vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#0F172A] border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative text-slate-100 backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-blue-400 font-bold text-xs">
                  AI
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-heading">
                  Ram Kishor Jha AI
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>CloseToOpen Advisory Persona</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Bot className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                <span>Thinking strategic guidance...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Sample Prompts */}
          {messages.length < 3 && (
            <div className="px-4 pb-2 flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-400 font-mono">Suggested Questions:</span>
              <div className="flex flex-wrap gap-1">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Banner inside Chat */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Need personalized advice?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Book Call</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a career or business question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
