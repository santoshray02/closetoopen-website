import React from 'react';
import { ShieldCheck, Target, Award, Compass, CheckCircle } from 'lucide-react';
import { LinkedInIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden">
              
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-1 shadow-2xl mx-auto lg:mx-0">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center text-4xl font-black text-white font-heading">
                  RKJ
                </div>
              </div>

              <div className="space-y-2 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white font-heading">
                  Ram Kishor Jha
                </h3>
                <p className="text-sm text-blue-400 font-medium">
                  {PROFILE.title}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-400">
                  <span>📍 {PROFILE.location}</span>
                </div>
              </div>

              {/* Badges list */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                {[
                  "15+ Years Enterprise Strategy & Mentorship",
                  "Verified Executive Coach & Business Advisor",
                  "Founder & Brand Steward of CloseToOpen.in",
                  "Cross-Industry Advisory Experience"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* LinkedIn Button */}
              <a
                href={PROFILE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold text-xs transition-colors shadow-lg"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>View Full Professional LinkedIn Profile</span>
              </a>

            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Leadership & Brand Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
              Why <span className="gradient-text">CloseToOpen</span> Was Built
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Throughout 15+ years in high-stakes corporate management, operations, and business consulting, <strong className="text-white">Ram Kishor Jha</strong> recognized a recurring pattern: ambitious professionals and founders often get stuck not because of a lack of effort, but because they are holding onto outdated operating models.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>The CloseToOpen Methodology</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-blue-300">CLOSE</strong> the doors on legacy habits, plateaued career tactics, and inefficient business workflows. <strong className="text-purple-300">OPEN</strong> new channels of high-margin strategy, executive positioning, and compounding revenue.
              </p>
            </div>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
                <h5 className="text-sm font-bold text-white font-heading">Pragmatic & Actionable</h5>
                <p className="text-xs text-slate-400">No theoretical jargon—only zero-fluff, battle-tested frameworks tailored to your real-world goals.</p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
                <h5 className="text-sm font-bold text-white font-heading">Empathetic Leadership</h5>
                <p className="text-xs text-slate-400">Deep understanding of corporate dynamics, career anxieties, and founder pressure points.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
