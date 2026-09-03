import React, { useState } from 'react';
import { Landmark, Calendar, User, ArrowRight, Search, MapPin } from 'lucide-react';

export default function LandmarksView({
  divisions = [],
  onSelectLandmark,
  isBengali,
  isNightMode
}) {
  const [selectedDivisionId, setSelectedDivisionId] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all hotspots from all divisions
  const allLandmarks = divisions.flatMap(div => 
    (div.hotspots || []).map(h => ({
      ...h,
      divisionName: div.name,
      divisionNameBn: div.nameBn,
      divisionId: div.id,
      divisionColor: div.themeColor
    }))
  );

  const categories = [
    { id: 'all', name: 'All Categories', nameBn: 'সকল ক্যাটাগরি' },
    { id: 'bridges', name: 'Bridges & Mega Engineering', nameBn: 'সেতু ও মেগা স্থাপত্য' },
    { id: 'palaces', name: 'Palaces & Forts', nameBn: 'রাজবাড়ি ও কেল্লা' },
    { id: 'heritage', name: 'Mosques, Temples & Viharas', nameBn: 'মসজিদ, মন্দির ও প্রত্নতত্ত্ব' },
    { id: 'nature', name: 'Nature & Landscapes', nameBn: 'প্রকৃতি ও পর্যটন' }
  ];

  const filteredLandmarks = allLandmarks.filter(l => {
    // Division filter
    if (selectedDivisionId !== 'all' && l.divisionId?.toLowerCase() !== selectedDivisionId.toLowerCase()) {
      return false;
    }
    // Category filter
    if (selectedCategory === 'bridges' && !l.category?.toLowerCase().includes('transport') && !l.category?.toLowerCase().includes('bridge')) return false;
    if (selectedCategory === 'palaces' && !l.category?.toLowerCase().includes('heritage') && !l.category?.toLowerCase().includes('palace') && !l.category?.toLowerCase().includes('fort')) return false;
    if (selectedCategory === 'heritage' && !l.category?.toLowerCase().includes('archaeology') && !l.category?.toLowerCase().includes('religion') && !l.category?.toLowerCase().includes('mosque') && !l.category?.toLowerCase().includes('temple')) return false;
    if (selectedCategory === 'nature' && !l.category?.toLowerCase().includes('nature') && !l.category?.toLowerCase().includes('forest') && !l.category?.toLowerCase().includes('park') && !l.category?.toLowerCase().includes('beach')) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title?.toLowerCase().includes(q) || l.titleBn?.toLowerCase().includes(q);
      const matchDesc = l.details?.toLowerCase().includes(q) || l.detailsBn?.toLowerCase().includes(q);
      const matchDiv = l.divisionName?.toLowerCase().includes(q) || l.divisionNameBn?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDiv) return false;
    }

    return true;
  });

  return (
    <div className={isNightMode ? 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 min-h-screen' : 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-screen'}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
            <Landmark className="w-3.5 h-3.5" />
            <span>{isBengali ? 'জাতীয় ঐতিহাসিক নিদর্শনকোষ' : 'National Historic Monuments Archive'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight font-display ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
            {isBengali ? 'বাংলাদেশের ঐতিহাসিক ও দর্শনীয় নিদর্শনসমূহ' : 'Iconic Landmarks of Bangladesh'}
          </h1>
          <p className={`text-sm sm:text-base ${isNightMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {isBengali ? '৮টি বিভাগের মেগা প্রকৌশল স্থাপত্য, ৪০০ বছরের প্রাচীন রাজবাড়ি, সুলতানি ও মুঘল কেল্লা, প্রাচীন বৌদ্ধ বিহার এবং প্রাকৃতিক স্বর্গ।' : 'Explore mega engineering bridges, 400-year-old palaces, Sultanate & Mughal forts, ancient Buddhist viharas, and natural paradises.'}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className={isNightMode 
          ? 'bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl space-y-4' 
          : 'bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4'}>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isBengali ? 'নিদর্শন বা স্থান খুঁজুন (যেমন: পদ্মা সেতু, লালবাগ কেল্লা, ষাট গম্বুজ...)' : 'Search landmark (e.g. Padma Bridge, Lalbagh Fort, Sixty Dome...)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isNightMode
                ? 'w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500'
                : 'w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500'}
            />
          </div>

          {/* Division Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedDivisionId('all')}
              className={selectedDivisionId === 'all'
                ? 'px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-md shadow-rose-600/30 flex-shrink-0'
                : (isNightMode 
                    ? 'px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5 flex-shrink-0'
                    : 'px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex-shrink-0')}
            >
              {isBengali ? '🇧🇩 সমগ্র বাংলাদেশ' : 'All Divisions'}
            </button>
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionId(div.id)}
                className={selectedDivisionId === div.id
                  ? 'px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-md shadow-rose-600/30 flex-shrink-0'
                  : (isNightMode 
                      ? 'px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5 flex-shrink-0'
                      : 'px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex-shrink-0')}
              >
                {isBengali ? div.nameBn : div.name}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className={`flex items-center space-x-2 overflow-x-auto pt-1 no-scrollbar border-t ${isNightMode ? 'border-white/10' : 'border-slate-100'}`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id
                  ? 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/30 flex-shrink-0'
                  : (isNightMode 
                      ? 'px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/60 hover:bg-slate-700 text-slate-400 border border-white/5 flex-shrink-0'
                      : 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 flex-shrink-0')}
              >
                {isBengali ? cat.nameBn : cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className={`flex items-center justify-between text-xs px-2 font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <span>{isBengali ? 'মোট ' + filteredLandmarks.length + 'টি নিদর্শন প্রদর্শিত হচ্ছে' : 'Showing ' + filteredLandmarks.length + ' historic landmarks'}</span>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandmarks.map((landmark) => (
            <div
              key={landmark.id}
              className={isNightMode
                ? 'group bg-slate-800/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-rose-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between'
                : 'group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-rose-500/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between'}
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img 
                    src={landmark.image || '/panoramas/dhaka_day.png'} 
                    alt={landmark.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                      {landmark.category || 'Historic Site'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-emerald-300 border border-white/10 backdrop-blur-md">
                      {isBengali ? landmark.divisionNameBn : landmark.divisionName}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-black text-white group-hover:text-rose-400 transition-colors drop-shadow">
                      {isBengali ? landmark.titleBn : landmark.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <p className={`text-xs leading-relaxed line-clamp-3 ${isNightMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {isBengali ? (landmark.detailsBn || landmark.details) : landmark.details}
                  </p>

                  <div className={`grid grid-cols-2 gap-2 p-2.5 rounded-2xl border text-[11px] ${isNightMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    {landmark.est && (
                      <div className={`flex items-center space-x-1.5 ${isNightMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Calendar className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className="truncate">{landmark.est}</span>
                      </div>
                    )}
                    {landmark.builtBy && (
                      <div className={`flex items-center space-x-1.5 ${isNightMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <User className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                        <span className="truncate">{landmark.builtBy}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectLandmark(landmark)}
                  className={`w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all ${isNightMode ? 'bg-slate-700 hover:bg-rose-600' : 'bg-slate-800 hover:bg-rose-600'}`}
                >
                  <span>{isBengali ? 'বিস্তারিত জানুন' : 'View Full Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
