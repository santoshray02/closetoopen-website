import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles, Filter, Bookmark } from 'lucide-react';
import { ARTICLES } from '../data/portfolioData';

export default function KnowledgeHub({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Career Strategy', 'Business Growth', 'Negotiation & Mindset'];

  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <section id="insights" className="py-24 relative bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CloseToOpen Insights & Guides</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Thought Leadership & <span className="gradient-text">Playbooks</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Practical strategies, business frameworks, and career growth tactical guides written by Ram Kishor Jha.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-blue-400 font-mono">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-heading group-hover:text-blue-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{article.date}</span>
                
                <button
                  onClick={() => setActiveArticle(article)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-10 space-y-6 relative text-slate-100 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono font-semibold">
                  {activeArticle.category}
                </span>
                <span className="text-slate-400 font-mono">{activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-snug">
                {activeArticle.title}
              </h2>

              <p className="text-xs text-slate-400 border-b border-slate-800 pb-4">
                Published by Ram Kishor Jha • CloseToOpen.in
              </p>
            </div>

            <div className="prose prose-invert prose-sm max-w-none space-y-4 text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Want to apply these principles to your career or business?
              </span>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg"
              >
                Discuss With Ram Kishor Jha
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
