import React, { useState } from 'react';
import { Map, Search, Utensils, Waves, ArrowUpRight } from 'lucide-react';

export default function DistrictEncyclopedia({
  districts = [],
  divisions = [],
  onSelectDistrict,
  isBengali,
  isNightMode
}) {
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDistricts = districts.filter(d => {
    const matchesDiv = selectedDivision === 'all' || d.divisionId.toLowerCase() === selectedDivision.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      d.name.toLowerCase().includes(q) ||
      d.nameBn.includes(q) ||
      d.delicacy.toLowerCase().includes(q) ||
      d.landmarks.some(l => l.toLowerCase().includes(q)) ||
      d.rivers.some(r => r.toLowerCase().includes(q));

    return matchesDiv && matchesQuery;
  });

  return (
    <div className={isNightMode ? 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 min-h-screen' : 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 min-h-screen'}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <Map className="w-3.5 h-3.5" />
            <span>{isBengali ? 'সার্বভৌম ৬৪ জেলা ডায়েরি' : 'Official 64 Districts Atlas'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-slate-900 dark:text-white">
            {isBengali ? 'বাংলাদেশের ৬৪ জেলার সম্পূর্ণ বিশ্বকোষ' : 'Encyclopedia of 64 Districts'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isBengali 
              ? 'প্রতিটি জেলার ইতিহাস, নদ-নদী, বিখ্যাত ঐতিহাসিক স্থান এবং খাঁটি ঐতিহ্যবাহী খাবার সম্পর্কে বিস্তারিত জানুন' 
              : 'Explore historical background, river systems, iconic attractions, and authentic cultural delicacies across all 64 districts.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className={isNightMode 
          ? 'bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4' 
          : 'bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4'}>
          
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBengali ? 'জেলা, খাবার, নদী বা দর্শনীয় স্থান খুঁজুন...' : 'Search by district, food, river, landmark...'}
              className={isNightMode
                ? 'w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500'
                : 'w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500'}
            />
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedDivision('all')}
              className={selectedDivision === 'all'
                ? 'px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : (isNightMode 
                    ? 'px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-white/10'
                    : 'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200')}
            >
              {isBengali ? 'সকল জেলা (৬৪)' : 'All Districts (64)'}
            </button>

            {divisions.map((div) => {
              const isSelected = selectedDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={isSelected
                    ? 'px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : (isNightMode 
                        ? 'px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-white/10'
                        : 'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200')}
                >
                  {isBengali ? div.nameBn : div.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Districts Grouped by Division */}
        {(() => {
          const divisionsInOrder = selectedDivision === 'all'
            ? divisions
            : divisions.filter(d => d.id.toLowerCase() === selectedDivision.toLowerCase());

          return divisionsInOrder.map((div) => {
            const districtsInDiv = filteredDistricts.filter(d => d.divisionId.toLowerCase() === div.id.toLowerCase());
            if (districtsInDiv.length === 0) return null;

            return (
              <div key={div.id} className="space-y-4">
                {/* Division Header */}
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-6 rounded-full flex-shrink-0"
                    style={{ backgroundColor: div.themeColor || '#e11d48' }}
                  ></span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                    {isBengali ? div.nameBn : div.name}
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 ml-2">
                      {isBengali ? 'বিভাগ · ' + districtsInDiv.length + ' জেলা' : 'Division · ' + districtsInDiv.length + ' Districts'}
                    </span>
                  </h2>
                </div>

                {/* Districts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {districtsInDiv.map((dist) => (
                    <div
                      key={dist.id}
                      onClick={() => onSelectDistrict(dist)}
                      className={isNightMode 
                        ? 'group bg-slate-800/80 backdrop-blur-lg rounded-3xl p-5 border border-white/10 hover:border-rose-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between' 
                        : 'group bg-white rounded-3xl p-5 border border-slate-200 hover:border-rose-500/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between'}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-rose-600/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              {dist.divisionId.toUpperCase()} DIVISION
                            </span>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 group-hover:text-rose-600 transition-colors">
                              {isBengali ? dist.nameBn : dist.name}
                            </h3>
                          </div>
                          <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-white group-hover:bg-rose-600 transition-all shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-[11px] mb-3.5">
                          <div>
                            <span className="text-slate-500 dark:text-slate-400">{isBengali ? 'আয়তন: ' : 'Area: '}</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{dist.area}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400">{isBengali ? 'জনসংখ্যা: ' : 'Pop: '}</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{dist.population}</span>
                          </div>
                        </div>

                        {/* Famous Delicacy */}
                        <div className="flex items-start space-x-2 text-xs text-amber-600 dark:text-amber-300 mb-2.5">
                          <Utensils className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
                          <span className="line-clamp-1"><strong className="text-slate-600 dark:text-slate-300 font-medium">{isBengali ? 'ঐতিহ্যবাহী খাবার: ' : 'Famous: '}</strong>{dist.delicacy}</span>
                        </div>

                        {/* Rivers */}
                        <div className="flex items-start space-x-2 text-xs text-sky-600 dark:text-sky-300 mb-3">
                          <Waves className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-sky-500" />
                          <span className="line-clamp-1"><strong className="text-slate-600 dark:text-slate-300 font-medium">{isBengali ? 'প্রধান নদী: ' : 'Rivers: '}</strong>{dist.rivers.join(', ')}</span>
                        </div>

                        {/* Landmarks */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {dist.landmarks.slice(0, 3).map((lm, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                              {lm}
                            </span>
                          ))}
                          {dist.landmarks.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-rose-500">
                              +{dist.landmarks.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Travel Tip */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                        {dist.touristTips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          });
        })()}

        {filteredDistricts.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            {isBengali ? 'কোনো জেলা পাওয়া যায়নি।' : 'No districts found.'}
          </div>
        )}

      </div>
    </div>
  );
}
