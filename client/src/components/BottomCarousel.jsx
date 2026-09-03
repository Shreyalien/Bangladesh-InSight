import React from 'react';
import { Landmark, ArrowUpRight } from 'lucide-react';

export default function BottomCarousel({ places = [], activePlaceId, onSelect, isBengali, divisionImage }) {
  return (
    <div className="w-full glass-panel rounded-3xl p-3 border border-white/15 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
          {isBengali ? 'বিভাগীয় প্রধান দর্শনীয় ও প্রত্নতাত্ত্বিক স্থান' : 'Division Iconic Landmarks & Heritage'}
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          {places.length} {isBengali ? 'স্থান' : 'Places'}
        </span>
      </div>

      <div className="flex items-center space-x-3 overflow-x-auto pb-1 no-scrollbar">
        {places.map((place) => {
          const isSelected = activePlaceId === place.id;
          return (
            <div
              key={place.id}
              onClick={() => onSelect(place)}
              className={`flex-shrink-0 flex items-center space-x-2.5 p-2 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-rose-600/90 border-rose-400 text-white shadow-lg shadow-rose-600/40 scale-105'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-200 border-white/10 hover:border-rose-400/40'
              }`}
              style={{ width: '220px' }}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 relative">
                <img 
                  src={place.image || divisionImage || '/panoramas/dhaka_day.png'} 
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold truncate leading-tight">
                  {isBengali ? place.nameBn : place.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {place.type}
                </p>
              </div>

              <div className="p-1 rounded-lg bg-white/10 text-white flex-shrink-0">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
