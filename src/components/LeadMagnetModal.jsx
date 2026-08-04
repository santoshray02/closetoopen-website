import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';

export default function LeadMagnetModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playSuccess();
    setDownloaded(true);
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    } catch (err) {}
  };

  const handleDownloadPdf = () => {
    const blueprintText = `===============================================================
CLOSETOOPEN.IN — EXECUTIVE CAREER & BUSINESS BLUEPRINT
Author: Ram Kishor Jha (https://closetoopen.in)
===============================================================

1. THE MID-CAREER TRANSITION FRAMEWORK
- Shift focus from tactical task execution to executive business outcomes.
- Measure your value in terms of Revenue Impact, Cost Reduction, & Risk Mitigation.
- Build an internal & external advisory network of mentors & sponsors.

2. ZERO-TO-ONE BUSINESS SCALING BLUEPRINT
- Validate paid customer commitments before investing heavy product capital.
- Prioritize customer retention loops: A 5% increase in retention boosts profit up to 95%.
- Implement lean AI automation across customer pipelines.

3. THE 'CLOSE TO OPEN' NEGOTIATION METHODOLOGY
- Objections are requests for clarity, not rejections.
- Isolate constraints: "If budget wasn't an issue, is there any reason we wouldn't collaborate today?"
- Bridge costs to quantifiable ROI.

For 1-on-1 strategy sessions with Ram Kishor Jha, visit https://closetoopen.in
===============================================================`;

    const blob = new Blob([blueprintText], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `CloseToOpen_Executive_Blueprint.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative text-slate-100 shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!downloaded ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                <FileText className="w-3.5 h-3.5" />
                <span>Free Strategic Action Guide</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white font-heading">
                Download the 2026 CloseToOpen Action Blueprint
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Get instant access to Ram Kishor Jha's battle-tested framework for executive career pivots, salary negotiations, and lean business revenue scaling.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Get Free Blueprint Copy</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero spam guarantee. Unsubscribe anytime.</span>
            </p>

          </form>
        ) : (
          /* Download Ready Screen */
          <div className="text-center space-y-6 py-4">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Your Blueprint is Ready!
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you, <strong className="text-white">{name}</strong>. Click below to download your copy of Ram Kishor Jha's Executive Blueprint.
              </p>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Blueprint Document (.txt / PDF format)</span>
            </button>

            <button
              onClick={() => {
                setDownloaded(false);
                onClose();
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close Window
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
