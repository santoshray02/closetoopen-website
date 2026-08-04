import React, { useState } from 'react';
import { Mic, Play, Radio, Users, Award, ExternalLink, Sparkles, Globe, Compass } from 'lucide-react';
import ramKishorJhaKeynote from '../assets/ram_kishor_jha_keynote.jpg';
import ramKishorJhaEpycLeague from '../assets/ram_kishor_jha_epyc_league.jpg';
import ramKishorJhaTableMountain from '../assets/ram_kishor_jha_table_mountain.jpg';
import ramKishorJhaSunCity from '../assets/ram_kishor_jha_sun_city.jpg';
import ramKishorJhaWorkshopCollage from '../assets/ram_kishor_jha_workshop_collage.jpg';
import ramKishorJhaWhiteboard from '../assets/ram_kishor_jha_whiteboard.jpg';
import podcastStudioSvg from '../assets/ram_kishor_jha_podcast_studio.svg';

export default function MediaShowcase({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('all');

  const mediaItems = [
    {
      id: 1,
      type: 'keynote',
      title: 'HPE EPYC League 2025 Keynote Stage Address',
      category: 'Keynote Speech',
      image: ramKishorJhaKeynote,
      badge: 'Live Stage',
      desc: 'Ram Kishor Jha addressing enterprise leaders on high-availability architecture and operational resilience.'
    },
    {
      id: 2,
      type: 'keynote',
      title: 'HPE | AMD | Microsoft EPYC League 2025 Summit',
      category: 'Executive Summit',
      image: ramKishorJhaEpycLeague,
      badge: 'Official Sponsor Stage',
      desc: 'Ram Kishor Jha representing CloseToOpen enterprise strategy at the HPE AMD Microsoft Summit.'
    },
    {
      id: 3,
      type: 'advisory',
      title: 'Global Leadership & Strategic Executive Summit',
      category: 'Global Presence',
      image: ramKishorJhaTableMountain,
      badge: 'Cape Town Summit',
      desc: 'High-impact global leadership retreats and international strategic advisory sessions.'
    },
    {
      id: 4,
      type: 'workshop',
      title: 'Enterprise Storage & Strategy Masterclass Series',
      category: 'Corporate Workshop',
      image: ramKishorJhaWorkshopCollage,
      badge: '150+ Attendees',
      desc: 'Interactive executive alignment sessions conducted across enterprise business units.'
    },
    {
      id: 5,
      type: 'advisory',
      title: 'Whiteboard Architecture & Strategy Alignment',
      category: '1-on-1 Mentorship',
      image: ramKishorJhaWhiteboard,
      badge: 'Hands-on Session',
      desc: 'Deep-dive whiteboard breakdown of career positioning and startup unit economics.'
    },
    {
      id: 6,
      type: 'podcast',
      title: 'The CloseToOpen Leadership Podcast',
      category: 'Podcast & Media',
      image: podcastStudioSvg,
      badge: '50+ Episodes',
      desc: 'Weekly conversations on closing mid-career plateaus and scaling sustainable enterprises.'
    }
  ];

  const filteredItems = activeTab === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.type === activeTab);

  return (
    <section className="py-24 relative bg-[#0B0F19] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            <span>Media, Keynotes & Live Presence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Executive <span className="gradient-text">Stage & Media Presence</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Highlights from Ram Kishor Jha's live keynotes, corporate masterclasses, whiteboard sessions, and podcast episodes.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'keynote', label: 'Keynotes & Live Stage' },
            { id: 'workshop', label: 'Corporate Workshops' },
            { id: 'advisory', label: '1-on-1 Strategy' },
            { id: 'podcast', label: 'Podcasts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 group hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-90" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-mono font-semibold text-blue-400">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 font-mono">Ram Kishor Jha</span>
                  <button
                    onClick={onOpenBooking}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>Inquire for Speaking / Advisory</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
