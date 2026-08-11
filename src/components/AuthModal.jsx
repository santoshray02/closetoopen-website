import React, { useState } from 'react';
import { X, Sparkles, LogIn, Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { 
  signInWithGoogle, 
  signInWithLinkedIn, 
  signInWithEmail, 
  signUpWithEmail 
} from '../services/authService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Verified Member');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const handleOAuthLogin = async (provider) => {
    soundManager.playClick();
    setLoading(true);
    setErrorMessage('');

    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'linkedin') {
        await signInWithLinkedIn();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'OAuth sign in failed. Please try email login.');
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    soundManager.playClick();
    setLoading(true);
    setErrorMessage('');

    try {
      if (isSignUp) {
        const res = await signUpWithEmail(email, password, fullName, role);
        soundManager.playSuccess();
        if (res?.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setMagicLinkSent(true);
        }
      } else {
        const res = await signInWithEmail(email, password);
        soundManager.playSuccess();
        if (res?.user) {
          onAuthSuccess(res.user);
          onClose();
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Authentication failed. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-blue-500/40 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Authentication</span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            {isSignUp ? 'Join CloseToOpen Ecosystem' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-400">
            {isSignUp 
              ? 'Create a verified profile to post book reflections & access mentorship.' 
              : 'Sign in to sync your reflections, bookmarks & strategy sessions.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Magic Link Sent Alert */}
        {magicLinkSent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Check Your Email</h4>
            <p className="text-xs text-slate-300">
              We sent a verification link to <strong className="text-white">{email}</strong>. Click the link to complete sign in!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* 1-Click Social OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-semibold transition-all shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('linkedin')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/50 text-white text-xs font-semibold transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.95 1.48 1.48 0 0 0 0-2.95Z"/>
                </svg>
                <span>LinkedIn Login</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">or email access</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Role / Community Badge</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Verified Reader & Member">Verified Reader & Member</option>
                      <option value="Executive Leader">Executive Leader</option>
                      <option value="Startup Founder">Startup Founder</option>
                      <option value="Management Consultant">Management Consultant</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>{isSignUp ? 'Create Verified Account' : 'Sign In to Account'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                {isSignUp 
                  ? 'Already have an account? Sign In' 
                  : 'New to CloseToOpen? Create a free verified profile'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
