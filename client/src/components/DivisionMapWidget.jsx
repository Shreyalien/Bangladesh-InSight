import React from 'react';
import { Map, ArrowRight, Compass } from 'lucide-react';

export default function DivisionMapWidget({ division, isBengali, onExploreDistricts }) {
  if (!division) return null;

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/15 w-80 sm:w-88 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-sky-600/30 text-sky-300 border border-sky-500/40">
          {isBengali ? 'ভৌগোলিক মানচিত্র' : 'Geographic Map'}
        </span>
        <span className="text-xs text-slate-400 font-mono">
          {division.stats?.districts} {isBengali ? 'জেলা' : 'Districts'}
        </span>
      </div>

      <h3 className="text-base font-extrabold text-white mb-2 flex items-center space-x-2">
        <Map className="w-4 h-4 text-sky-400" />
        <span>{isBengali ? division.nameBn : division.name} {isBengali ? 'বিভাগীয় ভূচিত্র' : 'Regional Territory'}</span>
      </h3>

      {/* SVG Map Representation */}
      <div className="w-full h-44 rounded-2xl bg-slate-900/80 border border-white/10 relative overflow-hidden flex items-center justify-center p-3 mb-3">
        <svg viewBox="0 0 200 160" className="w-full h-full text-emerald-500/30 filter drop-shadow">
          <path
            d="M 40,20 Q 80,10 130,25 Q 180,40 170,90 Q 160,140 100,150 Q 50,145 30,100 Q 15,60 40,20 Z"
            fill="currentColor"
            stroke="rgba(16, 185, 129, 0.6)"
            strokeWidth="2"
          />
          {/* Main City Hub node */}
          <circle cx="100" cy="80" r="7" fill="#f43f5e" className="animate-ping-slow" />
          <circle cx="100" cy="80" r="4" fill="#ffffff" />
          
          {/* Sub nodes */}
          <circle cx="65" cy="50" r="3" fill="#38bdf8" />
          <circle cx="140" cy="65" r="3" fill="#38bdf8" />
          <circle cx="80" cy="115" r="3" fill="#38bdf8" />
          <circle cx="130" cy="110" r="3" fill="#38bdf8" />
        </svg>

        <div className="absolute bottom-2 left-3 text-[10px] text-slate-300 font-mono bg-slate-950/70 px-2 py-0.5 rounded-md border border-white/10">
          📍 {division.majorCities?.[0]?.name || division.name} HQ
        </div>
      </div>

      {/* Highlights List */}
      <div className="space-y-1.5 mb-4 text-xs">
        <div className="flex items-center justify-between text-slate-300 p-2 rounded-xl bg-slate-900/40">
          <span className="text-slate-400">{isBengali ? 'বিভাগীয় আয়তন:' : 'Total Area:'}</span>
          <span className="font-semibold text-white font-mono">{division.stats?.area}</span>
        </div>
        <div className="flex items-center justify-between text-slate-300 p-2 rounded-xl bg-slate-900/40">
          <span className="text-slate-400">{isBengali ? 'উপজেলা সংখ্যা:' : 'Total Upazilas:'}</span>
          <span className="font-semibold text-white font-mono">{division.stats?.upazilas}</span>
        </div>
      </div>

      <button
        onClick={onExploreDistricts}
        className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all group"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>{isBengali ? 'বিভাগের জেলাসমূহ দেখুন' : 'Explore All Districts'}</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
