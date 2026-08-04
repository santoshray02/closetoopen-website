import React from 'react';
import { Star, Quote, ShieldCheck, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Client & Mentee Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Stories of <span className="gradient-text">Transformation</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Real feedback from executives, managers, and founders who closed their growth bottlenecks with Ram Kishor Jha.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between relative group hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="space-y-6">
                
                {/* Quote icon & stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-slate-700 group-hover:text-blue-500/30 transition-colors" />
                </div>

                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>

              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 font-extrabold text-white font-heading flex items-center justify-center text-sm shadow">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.role} • <span className="text-blue-400">{t.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
