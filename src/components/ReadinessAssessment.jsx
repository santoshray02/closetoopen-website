import React, { useState } from 'react';
import { Compass, CheckCircle2, RotateCcw, ArrowRight, Calendar, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/portfolioData';

export default function ReadinessAssessment({ onOpenBooking }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (option) => {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas context issue
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate score & persona recommendation
  const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
  const maxPossibleScore = 100;
  const percentage = Math.min(100, Math.round((totalScore / maxPossibleScore) * 100));

  const getRecommendation = (scorePct) => {
    if (scorePct >= 80) {
      return {
        level: "High Growth Potential",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
        summary: "You have strong fundamentals! Your primary focus should be executive positioning, strategic deal structuring, and rapid revenue scaling.",
        focusAreas: ["Executive Personal Branding", "Strategic Stakeholder Alignment", "Scaling Operating Systems"]
      };
    } else if (scorePct >= 50) {
      return {
        level: "Mid-Stage Accelerator Needed",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
        summary: "You possess good execution capabilities, but may be hitting mid-career plateaus or operational bottlenecks that slow your growth trajectory.",
        focusAreas: ["Career Trajectory Audit", "GTM Strategy Refinement", "Negotiation & Influence"]
      };
    } else {
      return {
        level: "Foundational Pivot Blueprint Required",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
        summary: "You are ready for a major strategic reset! Let's close your current execution roadblocks and build a clear 90-day action plan.",
        focusAreas: ["1-on-1 Mentorship Roadmap", "Core Skill Alignment", "Actionable Goals Setting"]
      };
    }
  };

  const resultInfo = getRecommendation(percentage);

  return (
    <section id="scorecard" className="py-20 relative bg-[#0B0F19] border-y border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Tool</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Calculate Your <span className="gradient-text">Growth & Readiness Score</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Take this 60-second assessment to evaluate your career & business alignment and get instant personalized strategic recommendations from Ram Kishor Jha.
          </p>
        </div>

        {/* Diagnostic Card Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {!isCompleted ? (
            <div className="space-y-8">
              
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="font-mono text-blue-400 font-semibold">
                    {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question title */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3.5">
                {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="w-full p-4 rounded-xl glass-card text-left flex items-center justify-between group hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-blue-600/30 text-slate-400 group-hover:text-blue-400 border border-slate-700 flex items-center justify-center font-bold text-sm transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white">
                        {option.text}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 text-center sm:text-left">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${resultInfo.badgeColor}`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{resultInfo.level}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    Diagnostic Score: <span className="gradient-text-gold">{percentage} / 100</span>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                    {resultInfo.summary}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-1 flex-shrink-0 shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white font-heading">{percentage}%</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Score</span>
                  </div>
                </div>
              </div>

              {/* Recommended Focus Areas */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Recommended Strategic Focus Areas for You:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {resultInfo.focusAreas.map((area, index) => (
                    <div key={index} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Discuss Your Score with Ram Kishor Jha</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
