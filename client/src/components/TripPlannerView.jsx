import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Navigation, Clock, Sparkles } from 'lucide-react';

export default function TripPlannerView({ districts = [], divisions = [], isBengali, isNightMode }) {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [selectedDivisions, setSelectedDivisions] = useState(['dhaka']);
  const [selectedTheme, setSelectedTheme] = useState('heritage');
  const [itinerary, setItinerary] = useState(null);

  const durationOptions = [1, 2, 3, 5, 7, 10];

  const themes = [
    { id: 'heritage', labelBn: '🏛️ প্রত্নতত্ত্ব ও প্রাচীন ঐতিহ্য', labelEn: 'Heritage & Archaeology' },
    { id: 'nature', labelBn: '🌿 নদী, বন ও পাহাড়', labelEn: 'Rivers, Hills & Forest' },
    { id: 'engineering', labelBn: '🌉 মেগা সেতু ও আধুনিক সিটি', labelEn: 'Mega Bridges & City' },
    { id: 'culture', labelBn: '🎨 সাহিত্য, সংস্কৃতি ও লোকশিল্প', labelEn: 'Culture & Folklore' }
  ];

  const handleToggleDivision = (id) => {
    if (selectedDivisions.includes(id)) {
      if (selectedDivisions.length > 1) {
        setSelectedDivisions(selectedDivisions.filter(d => d !== id));
      }
    } else {
      setSelectedDivisions([...selectedDivisions, id]);
    }
  };

  const handleGenerate = () => {
    const activeDivs = divisions.filter(d => selectedDivisions.includes(d.id));
    const allHotspots = activeDivs.flatMap(d => (d.hotspots || []).map(h => ({ ...h, divName: d.name, divNameBn: d.nameBn })));
    
    const days = [];
    for (let i = 1; i <= selectedDuration; i++) {
      const morningSpot = allHotspots[(i * 3 - 3) % allHotspots.length];
      const noonSpot = allHotspots[(i * 3 - 2) % allHotspots.length];
      const eveningSpot = allHotspots[(i * 3 - 1) % allHotspots.length];

      days.push({
        day: i,
        titleBn: 'দিন ' + i + ': ' + (morningSpot?.divNameBn || 'বিভাগীয়') + ' দর্শন ও ঐতিহাসিক ভ্রমণ',
        titleEn: 'Day ' + i + ': ' + (morningSpot?.divName || 'Division') + ' Exploration',
        morning: {
          time: '০৮:০০ AM',
          spot: morningSpot,
          activityBn: (morningSpot?.titleBn || 'ঐতিহাসিক স্থান') + ' পরিদর্শনের মধ্য দিয়ে দিনের সূচনা',
          activityEn: 'Morning sightseeing at ' + (morningSpot?.title || 'Heritage spot')
        },
        noon: {
          time: '০১:৩০ PM',
          spot: noonSpot,
          activityBn: 'দুপুরের ঐতিহ্যবাহী খাবার ও ' + (noonSpot?.titleBn || 'দর্শনীয় স্থান') + ' ভ্রমণ',
          activityEn: 'Traditional regional lunch & visit to ' + (noonSpot?.title || 'Landmark')
        },
        evening: {
          time: '০৫:৩০ PM',
          spot: eveningSpot,
          activityBn: 'মনোরম সূর্যাস্ত উপভোগ ও ' + (eveningSpot?.titleBn || 'সান্ধ্য স্থান') + ' পরিদর্শন',
          activityEn: 'Sunset horizon & exploring ' + (eveningSpot?.title || 'Evening spot')
        }
      });
    }

    setItinerary({
      titleBn: selectedDuration + ' দিনের কাস্টমাইজড বাংলাদেশ ভ্রমণ পরিকল্পনা',
      titleEn: selectedDuration + '-Day Customized Bangladesh Expedition',
      days
    });
  };

  return (
    <div className={isNightMode ? 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 min-h-screen' : 'w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 min-h-screen'}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
            <Navigation className="w-3.5 h-3.5" />
            <span>{isBengali ? 'ঐতিহাসিক নিদর্শনভিত্তিক ট্যুর প্ল্যানার' : 'Smart Heritage Tour Planner'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-slate-900 ">
            {isBengali ? 'আপনার স্বপ্নের বাংলাদেশ ভ্রমণ পরিকল্পনা করুন' : 'Craft Your Tailored Bangladesh Tour'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 ">
            {isBengali ? 'দিন সংখ্যা ও পছন্দের বিভাগ বেছে নিন — নিমেষেই পেয়ে যান স্বয়ংক্রিয় নিখুঁত ঐতিহাসিক ও দর্শনীয় ট্রাভেল রুট।' : 'Select duration and desired divisions to generate a detailed day-by-day landmark expedition.'}
          </p>
        </div>

        {/* Configuration Card */}
        <div className={isNightMode 
          ? 'bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6' 
          : 'bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6'}>
          
          {/* Step 1: Duration Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
              ১. ভ্রমণের সময়কাল (দিন) / Select Duration (Days)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {durationOptions.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDuration(d)}
                  className={selectedDuration === d
                    ? 'px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105 transition-all'
                    : (isNightMode 
                        ? 'px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5 transition-all'
                        : 'px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all')}
                >
                  {isBengali ? d + ' দিন' : d + ' Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Divisions Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
              ২. ভ্রমণ করতে চাওয়া বিভাগসমূহ / Select Target Divisions
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {divisions.map(div => {
                const isSelected = selectedDivisions.includes(div.id);
                return (
                  <button
                    key={div.id}
                    onClick={() => handleToggleDivision(div.id)}
                    className={isSelected
                      ? 'p-3 rounded-2xl text-xs font-bold flex items-center justify-between bg-emerald-600 text-white shadow-md shadow-emerald-600/30 transition-all'
                      : (isNightMode 
                          ? 'p-3 rounded-2xl text-xs font-medium flex items-center justify-between bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-white/5 transition-all'
                          : 'p-3 rounded-2xl text-xs font-semibold flex items-center justify-between bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all')}
                  >
                    <span>{isBengali ? div.nameBn : div.name}</span>
                    <CheckCircle className={'w-4 h-4 ' + (isSelected ? 'opacity-100' : 'opacity-20')} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Themes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
              ৩. ভ্রমণের মূল আকর্ষণ ও থিম / Select Travel Theme
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={selectedTheme === t.id
                    ? 'p-3 rounded-2xl text-xs font-bold bg-purple-600 text-white shadow-md shadow-purple-600/30 transition-all text-left'
                    : (isNightMode 
                        ? 'p-3 rounded-2xl text-xs font-medium bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-white/5 transition-all text-left'
                        : 'p-3 rounded-2xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all text-left')}
                >
                  {isBengali ? t.labelBn : t.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100  flex justify-center">
            <button
              onClick={handleGenerate}
              className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/40 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBengali ? 'সম্পূর্ণ ট্যুর প্ল্যান তৈরি করুন' : 'Generate Full Itinerary'}</span>
            </button>
          </div>

        </div>

        {/* Generated Itinerary Output */}
        {itinerary && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-display text-slate-900 ">
                {isBengali ? itinerary.titleBn : itinerary.titleEn}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {itinerary.days.map((day) => (
                <div 
                  key={day.day}
                  className={isNightMode 
                    ? 'bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-xl' 
                    : 'bg-white rounded-3xl p-6 border border-slate-200 shadow-md'}
                >
                  <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-100 ">
                    <span className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                      {day.day}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 ">
                      {isBengali ? day.titleBn : day.titleEn}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    
                    {/* Morning */}
                    <div className="p-4 rounded-2xl bg-amber-50 /60 border border-amber-200  space-y-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                        🌅 {isBengali ? 'সকাল' : 'Morning'} ({day.morning.time})
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 ">
                        {isBengali ? day.morning.spot?.titleBn : day.morning.spot?.title}
                      </h4>
                      <p className="text-slate-600 ">
                        {isBengali ? day.morning.activityBn : day.morning.activityEn}
                      </p>
                    </div>

                    {/* Noon */}
                    <div className="p-4 rounded-2xl bg-emerald-50 /60 border border-emerald-200  space-y-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                        ☀️ {isBengali ? 'দুপুর' : 'Afternoon'} ({day.noon.time})
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 ">
                        {isBengali ? day.noon.spot?.titleBn : day.noon.spot?.title}
                      </h4>
                      <p className="text-slate-600 ">
                        {isBengali ? day.noon.activityBn : day.noon.activityEn}
                      </p>
                    </div>

                    {/* Evening */}
                    <div className="p-4 rounded-2xl bg-purple-50 /60 border border-purple-200  space-y-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-200 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200">
                        🌆 {isBengali ? 'সন্ধ্যা' : 'Evening'} ({day.evening.time})
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 ">
                        {isBengali ? day.evening.spot?.titleBn : day.evening.spot?.title}
                      </h4>
                      <p className="text-slate-600 ">
                        {isBengali ? day.evening.activityBn : day.evening.activityEn}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
