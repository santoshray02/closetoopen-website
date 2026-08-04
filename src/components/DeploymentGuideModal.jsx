import React, { useState } from 'react';
import { X, Globe, Terminal, ExternalLink, Check, Copy, ShieldCheck } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { PROFILE } from '../data/portfolioData';

export default function DeploymentGuideModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `cd /home/santosh/projects/experiments/closetoopen
git init
git add .
git commit -m "Initial commit for CloseToOpen.in portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/closetoopen.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative text-slate-100 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/30">
            <Globe className="w-3.5 h-3.5" />
            <span>GoDaddy Domain & Netlify Deployment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Deployment Guide for <span className="gradient-text font-mono">closetoopen.in</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            Follow this 3-step guide to push your code to GitHub, deploy live on Netlify, and connect your GoDaddy domain.
          </p>
        </div>

        {/* Step 1: GitHub Repository Setup */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <GitHubIcon className="w-5 h-5 text-purple-400" />
              <span>Step 1: Push Code to GitHub Repository</span>
            </h3>
            
            <button
              onClick={() => copyToClipboard(gitCommands, 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 font-mono"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Copied!' : 'Copy Commands'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Create a new repository named <code className="text-blue-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">closetoopen</code> on GitHub, then run these commands in your terminal:
          </p>

          <pre className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
            {gitCommands}
          </pre>
        </div>

        {/* Step 2: Netlify Deployment */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span>Step 2: Deploy to Netlify</span>
          </h3>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
            <li>Log into your <strong className="text-white">Netlify account</strong> (<a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">app.netlify.com</a>).</li>
            <li>Click <strong className="text-white">"Add new site"</strong> &rarr; <strong className="text-white">"Import an existing project"</strong> &rarr; Select <strong className="text-white">GitHub</strong>.</li>
            <li>Choose your <code className="text-blue-300 font-mono">closetoopen</code> repository.</li>
            <li>Set the build settings:
              <ul className="pl-6 pt-1 space-y-1 font-mono text-[11px] text-purple-300">
                <li>• Build Command: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-400">npm run build</code></li>
                <li>• Publish Directory: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-400">dist</code></li>
              </ul>
            </li>
            <li>Click <strong className="text-white">"Deploy site"</strong>. Netlify will build your site live in 30 seconds!</li>
          </ol>
        </div>

        {/* Step 3: GoDaddy Domain Setup */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Step 3: Point GoDaddy Domain (<span className="font-mono text-emerald-400">closetoopen.in</span>)</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <p>
              1. In Netlify Site Settings &rarr; <strong className="text-white">Domain Management</strong> &rarr; Click <strong className="text-white">"Add custom domain"</strong> and type <code className="text-emerald-400 font-mono font-bold">closetoopen.in</code>.
            </p>
            <p>
              2. Open your <strong className="text-white">GoDaddy Domain Portfolio</strong> &rarr; Select <code className="text-emerald-400 font-mono">closetoopen.in</code> &rarr; Click <strong className="text-white">DNS Management</strong>.
            </p>
            <p>
              3. Add or update these 2 DNS Records:
            </p>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-2">Type</th>
                    <th className="p-2">Name / Host</th>
                    <th className="p-2">Value / Points To</th>
                    <th className="p-2">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-2 text-blue-400">A Record</td>
                    <td className="p-2 font-bold">@</td>
                    <td className="p-2 text-emerald-400">75.2.60.5</td>
                    <td className="p-2 text-slate-400">1 Hour / Standard</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-purple-400">CNAME</td>
                    <td className="p-2 font-bold">www</td>
                    <td className="p-2 text-emerald-400">YOUR_NETLIFY_SUBDOMAIN.netlify.app</td>
                    <td className="p-2 text-slate-400">1 Hour / Standard</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-1">
              * Netlify automatically generates a free SSL Certificate (HTTPS) for closetoopen.in as soon as DNS propagation completes (usually within 15–30 minutes).
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg"
          >
            Got It!
          </button>
        </div>

      </div>
    </div>
  );
}
