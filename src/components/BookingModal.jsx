import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, MessageSquare, Send, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE, ADVISORY_SERVICES } from '../data/portfolioData';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'career-mentorship',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  const handleDownloadICS = () => {
    const title = `Advisory Session with Ram Kishor Jha (${formData.service})`;
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CloseToOpen.in//NONSGML v1.0//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:Strategic Career & Business Advisory Session with Ram Kishor Jha (CloseToOpen.in). Notes: ${formData.notes}`,
      "LOCATION:Google Meet / Zoom",
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `CloseToOpen_Advisory_Session.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Ram Kishor Jha! I would like to book an advisory session via CloseToOpen.in.\n\nName: ${formData.name}\nService: ${formData.service}\nPreferred Date: ${formData.preferredDate} (${formData.preferredTime})\nNotes: ${formData.notes}`
    );
    window.open(`https://wa.me/${PROFILE.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleModalClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative text-slate-100 shadow-2xl my-8">
        
        <button
          onClick={handleModalClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule 1:1 Consultation</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Book Strategy Session
              </h3>
              <p className="text-xs text-slate-400">
                Directly connect with Ram Kishor Jha to discuss your career, business, or advisory needs.
              </p>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Engagement Focus *</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="Corporate Keynote / Institutional Workshop">🎤 Corporate Keynote / Institutional Session (Invite RK Jha Online/Offline)</option>
                  <option value="1-on-1 Executive Mentorship">👤 1-on-1 Executive & Career Mentorship</option>
                  <option value="Startup & Business Scaling Advisory">🚀 Startup & Business Scaling Advisory</option>
                  <option value="Deal & Strategic Growth Readiness">🛡️ Deal & Growth Readiness Audit</option>
                  <option value="General Community Inquiry">💬 Community & General Inquiry</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="10:00 AM">10:00 AM IST</option>
                    <option value="02:00 PM">02:00 PM IST</option>
                    <option value="05:00 PM">05:00 PM IST</option>
                    <option value="08:00 PM">08:00 PM IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Core Challenge or Goal</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe what you'd like to achieve during our session..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Request Slot</span>
            </button>
          </form>
        ) : (
          /* Submission Success View */
          <div className="text-center space-y-6 py-4">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Session Request Reserved!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Ram Kishor Jha's team will confirm your slot via email at <span className="text-blue-400">{formData.email}</span>.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Connect on WhatsApp</span>
              </button>

              <button
                onClick={handleDownloadICS}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Calendar Invite (.ics)</span>
              </button>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="text-xs text-slate-400 hover:text-white pt-2"
            >
              Close Window
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
