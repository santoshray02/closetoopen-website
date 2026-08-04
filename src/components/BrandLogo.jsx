import React from 'react';

export default function BrandLogo({ className = "h-9", showTagline = true }) {
  return (
    <div className="flex items-center gap-3 group">
      
      {/* 2026 Kinetic Portal Aperture Icon Mark */}
      <div className="relative w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700/80 p-1.5 shadow-xl shadow-blue-600/10 group-hover:border-blue-500/50 group-hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="logoGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="portalGradNav" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Outer Closing Arc C */}
          <path d="M 58 24 C 38 24, 24 38, 24 50 C 24 62, 38 76, 58 76" stroke="url(#logoGradNav)" strokeWidth="10" strokeLinecap="round" fill="none" />
          
          {/* Inner Opening Portal O */}
          <path d="M 44 50 C 44 38, 52 30, 64 30 C 76 30, 84 38, 84 50 C 84 62, 76 70, 64 70" stroke="url(#portalGradNav)" strokeWidth="8" strokeLinecap="round" strokeDasharray="45 15" fill="none" />
          
          {/* Upward Growth Vector */}
          <circle cx="64" cy="50" r="6" fill="#38BDF8" />
          <path d="M 64 50 L 78 36 M 78 36 L 68 36 M 78 36 L 78 46" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Wordmark Typography */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold tracking-tight text-white font-heading">
          <span>Close</span>
          <span className="gradient-text font-black">ToOpen</span>
        </div>

        {showTagline && (
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-semibold">
            Ram Kishor Jha
          </span>
        )}
      </div>

    </div>
  );
}
