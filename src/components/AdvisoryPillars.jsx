import React, { useState } from 'react';
import { TrendingUp, Rocket, Users, ShieldCheck, Check, ArrowRight, X, Sparkles } from 'lucide-react';
import { ADVISORY_SERVICES } from '../data/portfolioData';
import careerGrowthSvg from '../assets/career_growth_illustration.svg';
import businessScaleSvg from '../assets/business_scale_illustration.svg';
import frameworkDiagramSvg from '../assets/closetoopen_framework_diagram.svg';

const iconMap = {
  TrendingUp: TrendingUp,
  Rocket: Rocket,
  Users: Users,
  ShieldCheck: ShieldCheck
};

export default function AdvisoryPillars({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="advisory" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advisory Solutions</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            How We Partner With <span className="gradient-text">You</span>
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Tailored mentorship frameworks and strategic advisory solutions designed to close operational gaps and open high-margin growth opportunities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ADVISORY_SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || TrendingUp;
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-slate-800 relative group overflow-hidden"
              >
                {/* Background glow hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all duration-300 pointer-events-none" />

                <div className="space-y-6">
                  
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-medium">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-heading group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-400">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Visual Illustration Diagram for Layman Understanding */}
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 my-2">
                    <img
                      src={
                        service.id === 'career-mentorship'
                          ? careerGrowthSvg
                          : service.id === 'business-advisory'
                          ? businessScaleSvg
                          : frameworkDiagramSvg
                      }
                      alt={`${service.title} Visual Blueprint`}
                      className="w-full h-auto rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="space-y-2.5 pt-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mt-0.5 flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer Button */}
                <div className="pt-8 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all duration-200"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal for Service Deep Dive */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative text-slate-100 shadow-2xl">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono">
                {selectedService.badge} Solution
              </span>
              <h3 className="text-2xl font-bold text-white font-heading">
                {selectedService.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Deliverables & Scope
              </h4>
              <div className="space-y-2">
                {selectedService.features.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenBooking();
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg text-center"
              >
                Book This Advisory
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
