import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Search, Home, Landmark, Map, BookOpen, HelpCircle, Globe, Award, Sparkles } from 'lucide-react';

export default function Navbar({
  isNationalHome, onGoNationalHome, isNightMode, onToggleDayNight,
  isAudioPlaying, onToggleAudio, isBengali, onToggleLanguage,
  onOpenSearch, activeTab, onSelectTab
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = isNightMode
    ? scrolled
      ? 'bg-slate-950/95 border border-white/10 shadow-2xl shadow-black/50'
      : 'bg-slate-950/70 border border-white/8 shadow-xl shadow-black/30'
    : scrolled
      ? 'bg-white/95 border border-slate-200 shadow-xl shadow-slate-200/80'
      : 'bg-white/75 border border-white/60 shadow-lg shadow-slate-100/60';

  const tabs = [
    { id: 'home', label: 'Home', labelBn: 'হোম', icon: Home, iconColor: 'text-rose-500', action: onGoNationalHome },
    { id: 'landmarks', label: 'Landmarks', labelBn: 'নিদর্শনকোষ', icon: Landmark, iconColor: 'text-amber-500', action: () => onSelectTab('landmarks') },
    { id: 'districts', label: '64 Districts', labelBn: '৬৪ জেলা', icon: Map, iconColor: 'text-emerald-500', action: () => onSelectTab('districts') },
    { id: 'gk', label: 'UNESCO & Records', labelBn: 'ঐতিহ্য ও রেকর্ডস', icon: Award, iconColor: 'text-yellow-400', action: () => onSelectTab('gk') },
    { id: 'planner', label: 'Tour Planner', labelBn: 'ট্যুর প্ল্যানার', icon: BookOpen, iconColor: 'text-sky-500', action: () => onSelectTab('planner') },
    { id: 'quiz', label: 'Quiz', labelBn: 'কুইজ', icon: HelpCircle, iconColor: 'text-purple-500', action: () => onSelectTab('quiz') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-7xl rounded-2xl backdrop-blur-xl transition-all duration-500 ${navBg}`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">

          {/* Unique Custom Brand Icon & Title */}
          <div
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            onClick={onGoNationalHome}
          >
            {/* Bespoke Royal Emblem: Emerald Circle with Red Sun, Shapla & 360 Compass */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-700 shadow-xl group-hover:scale-105 transition-transform duration-300 border border-emerald-400/50 overflow-hidden">
              {/* Emerald Background with Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-900" />
              {/* Crimson Red Sun of Bangladesh Flag */}
              <div className="absolute w-6 h-6 rounded-full bg-rose-600 shadow-inner" />
              {/* Golden Shapla (Water Lily) & 360 Compass Overlay */}
              <svg viewBox="0 0 32 32" className="w-7 h-7 relative z-10 text-white drop-shadow" fill="none">
                {/* Central Petals */}
                <path d="M16 8 C14 13 14 18 16 23 C18 18 18 13 16 8 Z" fill="#fef08a" />
                <path d="M16 11 C11 14 9 18 11 22 C13 20 15 17 16 11 Z" fill="#facc15" opacity="0.9" />
                <path d="M16 11 C21 14 23 18 21 22 C19 20 17 17 16 11 Z" fill="#facc15" opacity="0.9" />
                {/* Outer Delicate Petals */}
                <path d="M16 14 C9 16 6 20 8 23 C11 22 14 19 16 14 Z" fill="#ffffff" opacity="0.85" />
                <path d="M16 14 C23 16 26 20 24 23 C21 22 18 19 16 14 Z" fill="#ffffff" opacity="0.85" />
                {/* 360 Degree Ring */}
                <circle cx="16" cy="16" r="14" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              </svg>
            </div>

            <div className="hidden sm:block">
              <div className={`text-base font-black tracking-tight font-display group-hover:text-rose-600 transition-colors ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                {isBengali ? 'বাংলাদেশ ইনসাইট' : 'Bangladesh InSight'}
              </div>
              <div className={`text-[10px] font-medium hidden lg:block ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isBengali ? '৮ বিভাগ · ৬৪ জেলা · বিশ্বস্বীকৃত ঐতিহ্য' : '8 Divisions · 64 Districts · UNESCO Heritage Atlas'}
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-0.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={tab.action}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : isNightMode
                        ? 'text-slate-300 hover:text-white hover:bg-white/8'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.iconColor}`} />
                  <span>{isBengali ? tab.labelBn : tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                ${isNightMode ? 'text-slate-300 hover:text-white hover:bg-white/8 border border-white/8' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'}`}
              title="Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden xl:inline">{isBengali ? 'খুঁজুন' : 'Search'}</span>
              <kbd className={`hidden sm:inline-block px-1 py-0.5 text-[9px] rounded font-mono ${isNightMode ? 'bg-slate-800 text-slate-400 border border-white/10' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>⌘K</kbd>
            </button>

            {/* Day / Night Toggle */}
            <button
              onClick={onToggleDayNight}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300
                ${isNightMode
                  ? 'bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-900'
                  : 'bg-amber-50 border border-amber-300 text-amber-700 hover:bg-amber-100'
                }`}
            >
              {isNightMode
                ? <><Moon className="w-3.5 h-3.5 text-indigo-300" /><span className="hidden sm:inline">{isBengali ? 'রাত' : 'Night'}</span></>
                : <><Sun className="w-3.5 h-3.5 text-amber-500" /><span className="hidden sm:inline">{isBengali ? 'দিন' : 'Day'}</span></>
              }
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl transition-all border text-xs
                ${isAudioPlaying
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                  : isNightMode
                    ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/8'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black border transition-all
                ${isNightMode ? 'bg-slate-800 border-white/10 text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'}`}
            >
              <Globe className="w-3 h-3" />
              {isBengali ? 'EN' : 'বাং'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
