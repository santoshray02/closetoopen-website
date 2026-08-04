import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, DollarSign, Calendar, ArrowRight } from 'lucide-react';

export default function RoiCalculator({ onOpenBooking }) {
  const [currentSalary, setCurrentSalary] = useState(25); // in Lakhs INR (LPA)
  const [targetGrowthPct, setTargetGrowthPct] = useState(40); // 40% growth
  const [timelineMonths, setTimelineMonths] = useState(12);

  // Math calculations
  const projectedSalary = Math.round(currentSalary * (1 + targetGrowthPct / 100));
  const absoluteGain = projectedSalary - currentSalary;
  const monthlyGain = Math.round((absoluteGain * 100000) / 12);

  return (
    <section className="py-20 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Upside Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Project Your <span className="gradient-text-gold">Career & Business Upside</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            See the compounding financial return of structured 1-on-1 strategic advisory and positioning with Ram Kishor Jha.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Current Salary / Revenue Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Current Income / Revenue:</span>
                <span className="text-blue-400 font-mono text-base font-bold">
                  ₹{currentSalary} LPA
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="100"
                step="1"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-800 accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>₹8 Lakhs</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore+</span>
              </div>
            </div>

            {/* Target Growth % Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-300">Target Growth Acceleration:</span>
                <span className="text-emerald-400 font-mono text-base font-bold">
                  +{targetGrowthPct}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="5"
                value={targetGrowthPct}
                onChange={(e) => setTargetGrowthPct(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-800 accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>+15% (Steady)</span>
                <span>+40% (Mentored)</span>
                <span>+100% (Executive Pivot)</span>
              </div>
            </div>

            {/* Timeline Selection Pills */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-300 block">Target Timeline:</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "6 Months", value: 6 },
                  { label: "12 Months", value: 12 },
                  { label: "24 Months", value: 24 }
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTimelineMonths(t.value)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      timelineMonths === t.value
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-700/80 space-y-6 text-center">
            
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                Projected New Annual Value
              </span>
              <div className="text-4xl font-black text-white font-heading gradient-text-gold">
                ₹{projectedSalary} LPA
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Annual Growth Gain</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">+₹{absoluteGain} Lakhs</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Monthly Increase</span>
                <span className="text-lg font-bold text-blue-400 font-mono">+₹{(monthlyGain).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Unlock Your Growth Roadmap</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
