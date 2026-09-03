import React from 'react';
import { Home } from 'lucide-react';

export default function DivisionSubHeader({
  divisions = [],
  currentDivision,
  onSelectDivision,
  activeTab,
  onGoHome,
  isNightMode,
  isBengali
}) {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center px-3 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto max-w-5xl rounded-full backdrop-blur-xl px-2.5 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-lg transition-all duration-300 ${
          isNightMode
            ? 'bg-slate-950/75 border border-white/10 shadow-black/40 text-slate-200'
            : 'bg-white/85 border border-slate-200/90 shadow-slate-200/50 text-slate-800'
        }`}
      >
        {/* All Bangladesh / Home Button */}
        <button
          onClick={onGoHome}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'home'
              ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-600/30'
              : isNightMode
                ? 'bg-white/6 hover:bg-white/12 text-slate-300 border border-white/5'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>{isBengali ? '🇧🇩 সমগ্র দেশ' : '🇧🇩 All BD'}</span>
        </button>

        <div className={`h-4 w-px mx-0.5 flex-shrink-0 ${isNightMode ? 'bg-white/15' : 'bg-slate-300'}`} />

        {/* 8 Divisions Direct Buttons */}
        <div className="flex items-center space-x-1 flex-nowrap">
          {divisions.map((div) => {
            const isSelected = activeTab === 'division' && currentDivision?.id === div.id;
            return (
              <button
                key={div.id}
                onClick={() => onSelectDivision(div)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
                  isSelected
                    ? 'text-white font-bold shadow-md'
                    : isNightMode
                      ? 'bg-white/5 hover:bg-white/12 text-slate-300 hover:text-white border border-white/5'
                      : 'bg-slate-100/90 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200'
                }`}
                style={isSelected ? {
                  background: `linear-gradient(135deg, ${div.themeColor || '#e11d48'}, ${div.themeColor || '#e11d48'}dd)`,
                  boxShadow: `0 4px 12px ${div.themeColor || '#e11d48'}50`
                } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: div.themeColor || '#e11d48' }}
                />
                <span className="whitespace-nowrap">{isBengali ? div.nameBn : div.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
