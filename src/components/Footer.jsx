import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Heart } from 'lucide-react';
import { LinkedInIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

export default function Footer({ onOpenBooking, onOpenDeploymentGuide }) {
  return (
    <footer className="bg-[#060911] text-slate-400 text-sm border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-[2px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-lg">
                  C2O
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg font-heading">CloseToOpen.in</span>
                <span className="text-xs text-slate-400">Strategic Career & Business Ecosystem</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              CloseToOpen by <strong className="text-slate-200">Ram Kishor Jha</strong> empowers ambitious professionals, managers, and startup founders to close career & business plateaus and open high-impact growth paths.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PROFILE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-[#0A66C2] text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Ecosystem Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Ram Kishor Jha</a></li>
              <li><a href="#advisory" className="hover:text-blue-400 transition-colors">1-on-1 Advisory Solutions</a></li>
              <li><a href="#scorecard" className="hover:text-blue-400 transition-colors">Growth Readiness Scorecard</a></li>
              <li><a href="#milestones" className="hover:text-blue-400 transition-colors">Career & Leadership Journey</a></li>
              <li><a href="#insights" className="hover:text-blue-400 transition-colors">Playbooks & Thought Leadership</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Client & Mentee Proof</a></li>
            </ul>
          </div>

          {/* Contact / Consultation Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Direct Contact & Advisory
            </h4>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">{PROFILE.domain}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{PROFILE.location}</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
              >
                Book Private Session
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">CloseToOpen.in</strong> by Ram Kishor Jha. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PROFILE.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
