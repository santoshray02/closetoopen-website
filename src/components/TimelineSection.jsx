import React from 'react';
import { Award, Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export default function TimelineSection() {
  return (
    <section id="milestones" className="py-24 relative bg-[#090D16]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Track Record & Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Career & Advisory <span className="gradient-text">Journey</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            A timeline of continuous learning, corporate governance, startup consulting, and leadership impact.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              
              {/* Year Chip (placed to left on desktop) */}
              <div className="hidden sm:flex absolute -left-36 top-1.5 w-28 justify-end text-xs font-mono font-bold text-blue-400">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 shadow">
                  {item.year}
                </span>
              </div>

              {/* Node Bullet */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0F172A] border-2 border-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                <Briefcase className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
              </div>

              {/* Mobile Year display */}
              <div className="sm:hidden text-xs font-mono font-bold text-blue-400 mb-1">
                {item.year}
              </div>

              {/* Timeline Card */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xl font-bold text-white font-heading">
                    {item.role}
                  </h3>
                  <span className="text-xs font-semibold text-purple-400">
                    {item.company}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
