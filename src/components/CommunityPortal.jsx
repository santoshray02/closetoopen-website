import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, Heart, MessageSquare, Bookmark, Share2, 
  PlusCircle, Search, Award, CheckCircle2, Star, 
  Send, Lightbulb, X, TrendingUp, RefreshCw
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { 
  INITIAL_REFLECTIONS, 
  FEATURED_MONTHLY_PROMPT, 
  AI_BOOK_PRESETS, 
  COMMUNITY_STATS 
} from '../data/communityData';
import { 
  fetchReflections, 
  createReflection, 
  addCommentToReflection, 
  toggleLikeReflection,
  subscribeToCommunityUpdates 
} from '../services/communityApi';

export default function CommunityPortal({ onOpenBooking, currentUser, onOpenAuth }) {
  // Load reflections from backend / local fallback
  const [reflections, setReflections] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('likes'); // 'likes', 'recent', 'featured'
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('closetoopen_bookmarked_reflections');
    return saved ? JSON.parse(saved) : [];
  });
  const [likedIds, setLikedIds] = useState(() => {
    const saved = localStorage.getItem('closetoopen_liked_reflections');
    return saved ? JSON.parse(saved) : [];
  });

  // Active comment drawer ID
  const [activeCommentDrawerId, setActiveCommentDrawerId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  // AI Catalyst Assistant state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Form submission state
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    category: 'Mindset',
    quote: '',
    realLifeConnection: '',
    takeaway1: '',
    takeaway2: '',
    takeaway3: '',
    impactRating: 5,
    readerName: currentUser?.user_metadata?.full_name || '',
    readerRole: currentUser?.user_metadata?.role || 'Verified Member',
    tags: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        readerName: currentUser.user_metadata?.full_name || currentUser.email.split('@')[0],
        readerRole: currentUser.user_metadata?.role || 'Verified Member'
      }));
    }
  }, [currentUser]);

  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    const data = await fetchReflections();
    setReflections(data);
    setIsLoadingData(false);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToCommunityUpdates(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('closetoopen_bookmarked_reflections', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('closetoopen_liked_reflections', JSON.stringify(likedIds));
  }, [likedIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLike = async (id) => {
    soundManager.playClick();
    const deviceId = localStorage.getItem('closetoopen_device_id') || 'dev-' + Math.random();
    localStorage.setItem('closetoopen_device_id', deviceId);

    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(item => item !== id));
      setReflections(reflections.map(r => r.id === id ? { ...r, likes: Math.max(0, r.likes - 1) } : r));
    } else {
      setLikedIds([...likedIds, id]);
      setReflections(reflections.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
      soundManager.playSuccess();
      showToast("❤️ You resonated with this book reflection!");
      await toggleLikeReflection(id, deviceId);
    }
  };

  const handleToggleBookmark = (id) => {
    soundManager.playClick();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(item => item !== id));
      showToast("Removed from saved reflections.");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast("🔖 Saved reflection to your bookmarks!");
    }
  };

  const handleShareQuote = (reflection) => {
    soundManager.playClick();
    const shareText = `"${reflection.quote}" — ${reflection.bookTitle} by ${reflection.author}\n\nReal-life application shared by ${reflection.readerName} on CloseToOpen Community Portal.`;
    navigator.clipboard.writeText(shareText);
    showToast("📋 Reflection quote copied to clipboard!");
  };

  const handleAddComment = async (reflectionId) => {
    if (!newCommentText.trim()) return;
    soundManager.playClick();
    
    const commentText = newCommentText.trim();
    setNewCommentText('');

    const newCommentObj = {
      id: 'c-' + Date.now(),
      author: 'You (Book Reader)',
      text: commentText,
      date: 'Just now'
    };

    setReflections(reflections.map(r => {
      if (r.id === reflectionId) {
        return {
          ...r,
          comments: [...(r.comments || []), newCommentObj]
        };
      }
      return r;
    }));

    showToast("💬 Comment added to discussion!");
    await addCommentToReflection(reflectionId, newCommentObj);
  };

  const handleSubmitReflection = async (e) => {
    e.preventDefault();
    if (!formData.bookTitle || !formData.quote || !formData.realLifeConnection || !formData.readerName) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }

    soundManager.playSuccess();

    const newReflection = {
      id: 'user-refl-' + Date.now(),
      bookTitle: formData.bookTitle,
      author: formData.author || 'Unknown Author',
      category: formData.category,
      quote: formData.quote,
      realLifeConnection: formData.realLifeConnection,
      actionableTakeaways: [formData.takeaway1, formData.takeaway2, formData.takeaway3].filter(Boolean),
      impactRating: Number(formData.impactRating),
      readerName: formData.readerName,
      readerRole: formData.readerRole || 'Book Community Reader',
      readerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      likes: 1,
      comments: [],
      createdAt: new Date().toISOString().split('T')[0],
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [formData.category],
      featured: false
    };

    setReflections([newReflection, ...reflections]);
    setIsSubmitModalOpen(false);
    setFormData({
      bookTitle: '',
      author: '',
      category: 'Mindset',
      quote: '',
      realLifeConnection: '',
      takeaway1: '',
      takeaway2: '',
      takeaway3: '',
      impactRating: 5,
      readerName: '',
      readerRole: '',
      tags: ''
    });

    showToast("🎉 Your book-to-life reflection has been published!");
    await createReflection(newReflection);
  };

  const handleAskAi = (questionText) => {
    const q = questionText || aiQuestion;
    if (!q.trim()) return;

    soundManager.playClick();
    setIsAiLoading(true);

    setTimeout(() => {
      // Find closest matching preset or generate a dynamic response
      const matched = AI_BOOK_PRESETS.find(p => p.prompt.toLowerCase().includes(q.toLowerCase().slice(0, 15))) 
        || AI_BOOK_PRESETS[Math.floor(Math.random() * AI_BOOK_PRESETS.length)];

      setAiResponse({
        question: q,
        book: matched.book,
        advice: matched.advice,
        quote: "Real transformation happens when books become mental models for daily action."
      });
      setIsAiLoading(false);
      soundManager.playSuccess();
    }, 600);
  };

  const categories = ['All', 'Productivity', 'Negotiation', 'Mindset', 'Leadership', 'Finance', 'Psychology'];

  // Filter reflections logic
  const filteredReflections = reflections.filter(r => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      r.bookTitle.toLowerCase().includes(q) || 
      r.author.toLowerCase().includes(q) || 
      r.quote.toLowerCase().includes(q) || 
      r.realLifeConnection.toLowerCase().includes(q) ||
      r.readerName.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <section id="community" className="py-24 relative overflow-hidden bg-[#090D16]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-blue-500/50 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Portal Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>CloseToOpen Community Portal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Life Between Lines <br />
            <span className="gradient-text">Book Readers Real-Life Insights</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A dedicated portal for ambitious readers to share how timeless book concepts translate into real-world career moves, business decisions, habit breakthroughs, and daily life.
          </p>
        </div>

        {/* Community Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl text-center border border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Monthly Prompt / Challenge Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-amber-950/20 via-slate-900/80 to-slate-900">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{FEATURED_MONTHLY_PROMPT.title}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Ends {FEATURED_MONTHLY_PROMPT.deadline}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                📖 {FEATURED_MONTHLY_PROMPT.bookTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                "{FEATURED_MONTHLY_PROMPT.question}"
              </p>
              <div className="text-xs text-slate-400 pt-1">
                🔥 <span className="text-amber-300 font-semibold">{FEATURED_MONTHLY_PROMPT.participantsCount} readers</span> have shared their reflection for this challenge.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setFormData(prev => ({ ...prev, bookTitle: "Atomic Habits", author: "James Clear", category: "Productivity" }));
                  setIsSubmitModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
              >
                Respond to Challenge
              </button>
            </div>
          </div>
        </div>

        {/* AI Book-to-Life Catalyst Section */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl mb-12 border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">AI Book-to-Life Advisor</h3>
              <p className="text-xs sm:text-sm text-slate-400">Type any real-world challenge or goal to discover the exact book concept & action plan.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="e.g. How do I stop procrastinating on difficult business decisions?"
                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
            <button
              onClick={() => handleAskAi()}
              disabled={isAiLoading}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30"
            >
              {isAiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              <span>Ask AI Advisor</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 font-medium">Quick Prompts:</span>
            {AI_BOOK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAiQuestion(preset.prompt);
                  handleAskAi(preset.prompt);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors text-left"
              >
                "{preset.prompt.slice(0, 38)}..."
              </button>
            ))}
          </div>

          {/* AI Response Card */}
          {aiResponse && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/40 animate-fade-in space-y-3">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Recommended Book: <strong className="text-white">{aiResponse.book}</strong>
                </span>
                <span className="text-slate-500">AI Catalyst Insight</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                💡 <strong className="text-amber-300">Actionable Advice:</strong> {aiResponse.advice}
              </p>
            </div>
          )}
        </div>

        {/* Filter, Search & Action Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search title, quote, reader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="likes">Most Resonated ❤️</option>
              <option value="recent">Latest Insights 🕒</option>
              <option value="featured">Featured First ⭐</option>
            </select>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsSubmitModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Reflection</span>
            </button>
          </div>
        </div>

        {/* Reflections Grid */}
        {filteredReflections.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-300">No reflections found matching your criteria</h4>
            <p className="text-sm text-slate-500 mt-1">Be the first book reader to share an observation for this category!</p>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold"
            >
              Share First Reflection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReflections.map((reflection) => {
              const isLiked = likedIds.includes(reflection.id);
              const isBookmarked = bookmarkedIds.includes(reflection.id);

              return (
                <div 
                  key={reflection.id}
                  className={`glass-card p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${
                    reflection.featured ? 'border-amber-500/40 bg-slate-900/70 shadow-lg shadow-amber-500/5' : 'border-slate-800/90'
                  }`}
                >
                  {/* Card Top: Category & Featured Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold">
                        {reflection.category}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {reflection.featured && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/80 text-[10px] font-bold">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Featured
                          </span>
                        )}
                        <button
                          onClick={() => handleToggleBookmark(reflection.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isBookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                          title="Save reflection"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {reflection.bookTitle}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        by <span className="text-slate-300">{reflection.author}</span>
                      </p>
                    </div>

                    {/* Book Quote */}
                    <blockquote className="p-4 rounded-2xl bg-slate-950/80 border-l-4 border-blue-500 mb-4 text-xs sm:text-sm text-slate-300 italic font-serif leading-relaxed">
                      "{reflection.quote}"
                    </blockquote>

                    {/* Real-Life Connection */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                        <TrendingUp className="w-4 h-4" />
                        <span>Real-Life Application</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30">
                        {reflection.realLifeConnection}
                      </p>
                    </div>

                    {/* Takeaways List */}
                    {reflection.actionableTakeaways && reflection.actionableTakeaways.length > 0 && (
                      <div className="mb-4 space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">Key Action Takeaways:</span>
                        {reflection.actionableTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Reader Profile & Actions */}
                  <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3">
                    
                    {/* Reader Profile */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={reflection.readerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} 
                          alt={reflection.readerName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-200">{reflection.readerName}</div>
                          <div className="text-[10px] text-slate-400">{reflection.readerRole}</div>
                        </div>
                      </div>

                      {/* Impact Score Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                        {[...Array(reflection.impactRating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Action Toolbar */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleLike(reflection.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                            isLiked 
                              ? 'bg-rose-950/80 text-rose-400 border-rose-800/80 shadow-sm' 
                              : 'bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                          <span>{reflection.likes}</span>
                        </button>

                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActiveCommentDrawerId(activeCommentDrawerId === reflection.id ? null : reflection.id);
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/40 text-slate-400 border border-slate-700/60 hover:text-white transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{reflection.comments?.length || 0}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleShareQuote(reflection)}
                        className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Copy reflection link/quote"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Comment Drawer Expandable */}
                    {activeCommentDrawerId === reflection.id && (
                      <div className="mt-3 pt-3 border-t border-slate-800/90 space-y-3 animate-fade-in">
                        <div className="text-xs font-bold text-slate-300">Reader Discussions & Experience Replies:</div>
                        
                        {/* Existing Comments */}
                        {reflection.comments && reflection.comments.length > 0 ? (
                          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                            {reflection.comments.map((c, idx) => (
                              <div key={idx} className="p-2.5 rounded-xl bg-slate-950 text-xs space-y-1">
                                <div className="flex items-center justify-between text-slate-400 font-semibold text-[10px]">
                                  <span>{c.author}</span>
                                  <span>{c.date}</span>
                                </div>
                                <p className="text-slate-200">{c.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500 italic">No comments yet. Start the conversation!</p>
                        )}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Share your real-life response..."
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(reflection.id)}
                            className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleAddComment(reflection.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reader Community CTA Bottom */}
        <div className="mt-16 text-center glass-panel p-8 sm:p-12 rounded-3xl border border-blue-500/30">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Want to Discuss a Book 1-on-1 with Ram Kishor Jha?
          </h3>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Book a personalized advisory session to turn strategic literature into executive execution for your career or business.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenBooking();
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-105 transition-all"
            >
              Book Strategic Mentorship Call
            </button>
          </div>
        </div>

      </div>

      {/* Share Reflection Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-blue-500/40 relative shadow-2xl my-8">
            
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Share Your Book-to-Life Reflection</h3>
                <p className="text-xs text-slate-400">Tell fellow readers how a book changed your real-life actions.</p>
              </div>
            </div>

            <form onSubmit={handleSubmitReflection} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thinking, Fast and Slow"
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Author *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniel Kahneman"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Mindset">Mindset</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Finance">Finance</option>
                    <option value="Psychology">Psychology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Impact Rating (1 to 5 Stars)</label>
                  <select
                    value={formData.impactRating}
                    onChange={(e) => setFormData({ ...formData, impactRating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐ (Life Changing)</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐ (Very High Value)</option>
                    <option value={3}>3 Stars ⭐⭐⭐ (Good Insights)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Favorite Book Quote / Concept *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter the passage or mental model that stood out to you..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">How This Related to Your Real Life *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the exact real-life situation, decision, career move, or habit change inspired by this book..."
                  value={formData.realLifeConnection}
                  onChange={(e) => setFormData({ ...formData, realLifeConnection: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Actionable Takeaways (Up to 3)</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Takeaway 1: e.g. Design friction-free morning environments"
                    value={formData.takeaway1}
                    onChange={(e) => setFormData({ ...formData, takeaway1: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Takeaway 2: e.g. Focus on identity over goals"
                    value={formData.takeaway2}
                    onChange={(e) => setFormData({ ...formData, takeaway2: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.readerName}
                    onChange={(e) => setFormData({ ...formData, readerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Role / Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. VP of Product / Tech Leader"
                    value={formData.readerRole}
                    onChange={(e) => setFormData({ ...formData, readerRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Publish Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
