import React from 'react';
import { Landmark, ArrowRight, Calendar, User, MapPin } from 'lucide-react';

export default function InspectorCard({ hotspot, division, onOpenDetails, isBengali }) {
  if (!hotspot) {
    return (
      <div className="glass-panel rounded-3xl p-5 border border-white/15 w-80 shadow-2xl animate-in fade-in">
        <p className="text-xs text-slate-400 text-center">
          {isBengali ? 'প্যানোরামার হটস্পটে ক্লিক করে তথ্য দেখুন' : 'Click on any hotspot to inspect heritage details'}
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/15 w-80 sm:w-88 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-rose-600/30 text-rose-300 border border-rose-500/40">
          {hotspot.category || 'HISTORIC SITE'}
        </span>
        <div className="flex items-center space-x-1 text-slate-400 text-[11px] font-mono">
          <MapPin className="w-3 h-3 text-rose-400" />
          <span>{isBengali ? division?.nameBn : division?.name}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-white leading-tight mb-2">
        {isBengali ? hotspot.titleBn : hotspot.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
        {hotspot.details}
      </p>

      {/* Meta Specs */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-900/60 border border-white/5 text-[11px] mb-4">
        {hotspot.est && (
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{hotspot.est}</span>
          </div>
        )}
        {hotspot.builtBy && (
          <div className="flex items-center space-x-1.5 text-slate-300">
            <User className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span className="truncate">{hotspot.builtBy}</span>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onOpenDetails(hotspot)}
        className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all group"
      >
        <span>{isBengali ? 'বিস্তারিত ঐতিহাসিক তথ্য' : 'Explore Full Details'}</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
