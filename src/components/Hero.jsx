import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Award, Users, TrendingUp, Compass } from 'lucide-react';
import { LinkedInIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';
import ramKishorJhaSvg from '../assets/ram_kishor_jha.svg';

export default function Hero({ onOpenBooking, onStartQuiz }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden glow-bg">
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Personal Career & Business Advisory Ecosystem</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading">
              Close The Gap. <br />
              <span className="gradient-text">Open Your Full Potential.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Transforming ambition into high-impact execution. Managed by <strong className="text-white font-semibold">Ram Kishor Jha</strong>, <span className="text-blue-400 font-medium">CloseToOpen.in</span> bridges mid-career plateaus and guides business founders toward predictable growth.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Book 1:1 Advisory Session</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 transition-all duration-200"
              >
                <Compass className="w-5 h-5 text-purple-400" />
                <span>Calculate Growth Score</span>
              </button>
            </div>

            {/* LinkedIn Verification Link */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
              <a
                href={PROFILE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors bg-slate-900/60 px-3.5 py-1.5 rounded-lg border border-slate-800"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>Connect on LinkedIn</span>
                <span className="text-xs text-slate-500 font-mono">/ram-kishor-jha-92948a9b</span>
              </a>
              
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Mentor</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {PROFILE.stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-3.5 rounded-xl text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-xl animate-pulse-glow" />

              {/* Main Card */}
              <div className="relative glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* Header profile avatar & badge */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 p-0.5 shadow-lg overflow-hidden">
                      <img
                        src="/src/assets/portrait.jpg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = ramKishorJhaSvg;
                        }}
                        alt="Ram Kishor Jha"
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      Ram Kishor Jha
                    </h3>
                    <p className="text-xs text-blue-400 font-medium">
                      Executive Mentor & Business Strategist
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Founder of <span className="text-slate-200 font-medium">CloseToOpen.in</span>
                    </p>
                  </div>
                </div>

                {/* Core Philosophy Box */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
                  <p className="italic text-slate-300">
                    "Every roadblock in career or business is a signal to close outdated paradigms and open high-leverage execution channels."
                  </p>
                </div>

                {/* Key Pillars Badge List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Strategic Pillars
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { title: "Mid-Career Leadership Velocity", icon: TrendingUp },
                      { title: "Startup Zero-to-One Revenue Scaling", icon: Award },
                      { title: "Executive Stakeholder Alignment", icon: Users }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors text-xs font-medium text-slate-200">
                        <item.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Request Private Consultation</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
