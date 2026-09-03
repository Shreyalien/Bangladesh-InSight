import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Compass, MapPin, Landmark, ArrowRight, Droplets } from 'lucide-react';

export default function GlobalSearchModal({
  isOpen,
  onClose,
  divisions = [],
  districts = [],
  onSelectDivision,
  onSelectDistrict,
  onSelectLandmark,
  isBengali
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Aggregate all landmarks across divisions
  const allLandmarks = useMemo(() => {
    const list = [];
    divisions.forEach(div => {
      if (Array.isArray(div.landmarks)) {
        div.landmarks.forEach(l => {
          list.push({
            ...l,
            divisionId: div.id,
            divisionName: div.name,
            divisionNameBn: div.nameBn
          });
        });
      }
    });
    return list;
  }, [divisions]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDivisions = q ? divisions.filter(d =>
    (d.name && d.name.toLowerCase().includes(q)) ||
    (d.nameBn && d.nameBn.includes(q)) ||
    (d.tagline && d.tagline.toLowerCase().includes(q))
  ) : [];

  const matchedDistricts = q ? districts.filter(d =>
    (d.name && d.name.toLowerCase().includes(q)) ||
    (d.nameBn && d.nameBn.includes(q)) ||
    (d.delicacy && d.delicacy.toLowerCase().includes(q)) ||
    (d.hq && d.hq.toLowerCase().includes(q)) ||
    (Array.isArray(d.rivers) && d.rivers.some(r => typeof r === 'string' && r.toLowerCase().includes(q))) ||
    (Array.isArray(d.landmarks) && d.landmarks.some(l => typeof l === 'string' && l.toLowerCase().includes(q)))
  ) : [];

  const matchedLandmarks = q ? allLandmarks.filter(l =>
    (l.name && l.name.toLowerCase().includes(q)) ||
    (l.nameBn && l.nameBn.includes(q)) ||
    (l.district && l.district.toLowerCase().includes(q)) ||
    (l.type && l.type.toLowerCase().includes(q)) ||
    (l.description && l.description.toLowerCase().includes(q))
  ) : [];

  const hasResults = matchedDivisions.length > 0 || matchedDistricts.length > 0 || matchedLandmarks.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-4 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isBengali ? 'বিভাগ, জেলা, ঐতিহাসিক নিদর্শন, নদী বা মিষ্টি খুঁজুন...' : 'Search divisions, districts, landmarks, rivers, delicacies...'}
            className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder:text-slate-500 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[62vh] overflow-y-auto space-y-4 pr-1">
          {query && !hasResults && (
            <div className="text-center py-12 text-slate-400 text-sm">
              {isBengali ? 'কোন তথ্য পাওয়া যায়নি। অন্য কিছু দিয়ে অনুসন্ধান করুন।' : 'No results found. Try searching for a landmark or district name.'}
            </div>
          )}

          {!query && (
            <div className="text-center py-8 text-slate-500 text-xs">
              {isBengali ? 'উপরে টাইপ করুন (যেমন: পদ্মা সেতু, লালবাগ কেল্লা, সিলেট, রসমালাই, বানিয়াচং)' : 'Type above (e.g. Padma Bridge, Lalbagh, Sylhet, Somapura, Baniachong)'}
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
                      if (onSelectDivision) onSelectDivision(div);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-rose-600/30 border border-white/5 hover:border-rose-500/40 cursor-pointer transition-all"
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

          {/* Matched Landmarks */}
          {matchedLandmarks.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-2 px-2">
                {isBengali ? 'ঐতিহাসিক ও দর্শনীয় নিদর্শন' : 'Landmarks & Heritage Sites'}
              </span>
              <div className="space-y-1.5">
                {matchedLandmarks.slice(0, 6).map((lm, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (onSelectLandmark) {
                        onSelectLandmark(lm);
                      } else if (onSelectDistrict) {
                        onSelectDistrict(lm);
                      }
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-amber-600/30 border border-white/5 hover:border-amber-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{isBengali ? (lm.nameBn || lm.name) : lm.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                            {lm.district}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {isBengali ? lm.descriptionBn : lm.description}
                        </p>
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
                {matchedDistricts.slice(0, 8).map((dist) => (
                  <div
                    key={dist.id}
                    onClick={() => {
                      if (onSelectDistrict) onSelectDistrict(dist);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-emerald-600/30 border border-white/5 hover:border-emerald-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {isBengali ? dist.nameBn : dist.name}
                          <span className="text-xs font-normal text-slate-400 ml-2">
                            ({dist.division || dist.divisionId || ''})
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {dist.delicacy ? `খাবার: ${dist.delicacy}` : dist.overview}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
