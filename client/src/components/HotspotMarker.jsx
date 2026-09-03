import React from 'react';
import { Landmark, Building, TreePine, Ship, Mountain, Cloud, Music, GraduationCap, Waves } from 'lucide-react';

export default function HotspotMarker({ hotspot, isActive, onSelect, isBengali }) {
  return (
    <div 
      className="absolute group z-20 cursor-pointer transition-all duration-300 select-none"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={() => onSelect(hotspot)}
    >
      <div className="relative flex items-center justify-center">
        {/* Radar Pulse */}
        <div className={`absolute -top-2 -left-2 w-12 h-12 rounded-full ${isActive ? 'bg-amber-400/50 animate-ping' : 'bg-rose-500/30 animate-pulse'}`}></div>
        
        {/* Glow Marker Badge */}
        <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-panel border shadow-2xl transition-all duration-200 group-hover:scale-110 ${
          isActive 
            ? 'bg-rose-600 border-rose-300 ring-2 ring-rose-400/60 scale-105 shadow-rose-600/50' 
            : 'border-white/30 hover:border-rose-400 hover:bg-slate-900/90'
        }`}>
          <div className="w-5 h-5 rounded-full bg-rose-600/90 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Landmark className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow">
            {isBengali ? hotspot.titleBn : hotspot.title}
          </span>
        </div>

        {/* Hover / Info Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 glass-panel rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 border border-white/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">{hotspot.category}</span>
            <span className="text-[10px] text-slate-400 font-mono">{hotspot.est}</span>
          </div>
          <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">{hotspot.details}</p>
        </div>
      </div>
    </div>
  );
}
