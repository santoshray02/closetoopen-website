import React, { useState } from 'react';
import { Award, ArrowUpRight, TrendingUp, CheckCircle, Sparkles, X, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const CASE_STUDIES = [
  {
    id: "executive-pivot",
    title: "Senior Lead to Vice President of Product",
    client: "Tech Enterprise Leader",
    industry: "Enterprise SaaS",
    metric: "+45% Salary Hike",
    badge: "Career Mentorship",
    summary: "Overcame a 3-year mid-career plateau by shifting from tactical execution to executive business storytelling and stakeholder influence.",
    challenge: "Stuck in a lateral manager role despite consistently delivering high-quality project outputs.",
    solution: "Ram Kishor Jha conducted a 360-degree positioning audit, restructured executive communications, and built an internal sponsorship roadmap.",
    results: [
      "Promoted to VP of Product Strategy within 120 days",
      "Secured a 45% annual compensation package increase",
      "Assumed board-level presentation responsibilities"
    ]
  },
  {
    id: "founder-scaling",
    title: "Zero to Seed Round: B2B Fintech Blueprint",
    client: "Early-Stage Co-Founders",
    industry: "Fintech & Payments",
    metric: "$650K Raised",
    badge: "Business Advisory",
    summary: "Transformed early product traction into predictable unit economics and an investor-ready pitch narrative.",
    challenge: "Struggling with customer acquisition costs and investor pitch rejections due to complex technical explanations.",
    solution: "Hands-on GTM advisory with Ram Kishor Jha to refine target customer avatars, simplify revenue modeling, and optimize unit margins.",
    results: [
      "Closed $650,000 Seed Round from prominent angel networks",
      "Reduced Customer Acquisition Cost (CAC) by 38%",
      "Achieved 3.2x Monthly Recurring Revenue (MRR) growth in 6 months"
    ]
  },
  {
    id: "corporate-transformation",
    title: "High-Performance Culture Overhaul",
    client: "Global Business Services",
    industry: "Corporate Services",
    metric: "98% Team Alignment",
    badge: "Keynote & Workshop",
    summary: "Aligned mid-level management across 4 business units around the 'Close To Open' execution framework.",
    challenge: "Siloed communication, high employee burnout, and missed cross-functional project deadlines.",
    solution: "Delivered a custom 2-day CloseToOpen Masterclass and quarterly execution accountability checks.",
    results: [
      "98% satisfaction rating across 150+ corporate attendees",
      "35% reduction in cross-department project delivery timelines",
      "Established a sustainable internal mentorship framework"
    ]
  }
];

export default function CaseStudies({ onOpenBooking }) {
  const [activeStudy, setActiveStudy] = useState(null);

  return (
    <section className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Transformation Impact</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Deep dive into real-world strategic interventions and measurable ROI achieved by Ram Kishor Jha's mentees and advisory clients.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="glass-card rounded-3xl p-7 border border-slate-800 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold">
                    {study.badge}
                  </span>
                  
                  <span className="text-sm font-extrabold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                    {study.metric}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-blue-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {study.client} • <span className="text-slate-300">{study.industry}</span>
                  </p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {study.summary}
                </p>

                {/* Key result bullet points */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {study.results.slice(0, 2).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer Button */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveStudy(study);
                  }}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-10 space-y-6 relative text-slate-100 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveStudy(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-semibold">
                  {activeStudy.badge}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
                  Impact: {activeStudy.metric}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {activeStudy.title}
              </h2>
              <p className="text-xs text-slate-400">
                {activeStudy.client} • Industry: {activeStudy.industry}
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-800 text-sm">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">The Challenge</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{activeStudy.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-blue-300 text-xs uppercase tracking-wider">The Strategic Intervention</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{activeStudy.solution}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Key Measurable Outcomes</h4>
                <div className="space-y-2">
                  {activeStudy.results.map((r, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setActiveStudy(null);
                  onOpenBooking();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg"
              >
                Book Similar Transformation Call
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
