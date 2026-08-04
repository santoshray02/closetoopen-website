import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { PROFILE } from '../data/portfolioData';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenBooking, onOpenDeploymentGuide, onOpenLeadMagnet }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Advisory', href: '#advisory' },
    { label: 'Growth Scorecard', href: '#scorecard' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'Insights', href: '#insights' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#">
            <BrandLogo />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenLeadMagnet();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 transition-all shadow-md"
              title="Download Free Executive Blueprint"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free Blueprint</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBooking();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Call</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenBooking}
              className="p-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-6 mt-3 space-y-4">
          <div className="flex flex-col gap-3 font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800 text-base"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1-on-1 Strategy Session</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadMagnet();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-sm font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Get Free Blueprint</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
