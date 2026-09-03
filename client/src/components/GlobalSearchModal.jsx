import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Compass, MapPin, Utensils, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  divisions = [],
  districts = [],
  delicacies = [],
  onSelectDivision,
  onSelectDistrict,
  isBengali
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDivisions = q ? divisions.filter(d => 
    d.name.toLowerCase().includes(q) || d.nameBn.includes(q) || d.tagline.toLowerCase().includes(q)
  ) : [];

  const matchedDistricts = q ? districts.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.nameBn.includes(q) || 
    d.delicacy.toLowerCase().includes(q) ||
    d.landmarks.some(l => l.toLowerCase().includes(q))
  ) : [];

  const matchedDelicacies = q ? delicacies.filter(d => 
    d.name.toLowerCase().includes(q) || d.district.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
  ) : [];

  const hasResults = matchedDivisions.length > 0 || matchedDistricts.length > 0 || matchedDelicacies.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      
      <div 
        className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center mb-4 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isBengali ? 'জেলা, খাবার, নদী বা ঐতিহাসিক নিদর্শন খুঁজুন...' : 'Search any district, delicacy, river, or landmark...'}
            className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder:text-slate-500 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {query && !hasResults && (
            <div className="text-center py-10 text-slate-400 text-sm">
              {isBengali ? 'কোন তথ্য পাওয়া যায়নি। অন্য কিছু দিয়ে চেষ্টা করুন।' : 'No results found. Try searching for a district or famous food.'}
            </div>
          )}

          {/* Matched Divisions */}
          {matchedDivisions.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-2 px-2">
                {isBengali ? 'বিভাগসমূহ' : 'Divisions'}
              </span>
              <div className="space-y-1.5">
                {matchedDivisions.map((div) => (
                  <div
                    key={div.id}
                    onClick={() => {
                      onSelectDivision(div);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 hover:bg-rose-600/30 border border-white/5 hover:border-rose-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{isBengali ? div.nameBn : div.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{div.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Districts */}
          {matchedDistricts.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-2 px-2">
                {isBengali ? 'জেলাসমূহ' : 'Districts'}
              </span>
              <div className="space-y-1.5">
                {matchedDistricts.slice(0, 6).map((dist) => (
                  <div
                    key={dist.id}
                    onClick={() => {
                      onSelectDistrict(dist);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 hover:bg-emerald-600/30 border border-white/5 hover:border-emerald-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{isBengali ? dist.nameBn : dist.name} ({dist.divisionId.toUpperCase()})</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{dist.delicacy}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Delicacies */}
          {matchedDelicacies.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-2 px-2">
                {isBengali ? 'ঐতিহ্যবাহী খাবার ও মিষ্টি' : 'Foods & Delicacies'}
              </span>
              <div className="space-y-1.5">
                {matchedDelicacies.slice(0, 4).map((del) => (
                  <div
                    key={del.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-white/5"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{del.name}</h4>
                        <p className="text-xs text-slate-400">{del.district}, {del.division} • {del.giStatus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!query && (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p className="mb-2">{isBengali ? 'দ্রুত অনুসন্ধানের উদাহরণ:' : 'Quick search suggestions:'}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['বগুড়ার দই', 'সাজেক', 'সুন্দরবন', 'পদ্মা সেতু', 'রসমালাই', 'জাফলং', 'কুয়াকাটা'].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-white/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}