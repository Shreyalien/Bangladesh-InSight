import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Compass, Landmark, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Award, Map, BookOpen, Camera, Check } from 'lucide-react';

const DIVISION_SLIDES = [
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা', tagline: 'Capital & 400-Year Mughal Heartland', day: '/panoramas/dhaka_day.jpg', night: '/panoramas/dhaka_night.jpg', color: '#e11d48', pill1: 'Padma Bridge', pill2: 'Buriganga River', pill3: 'Lalbagh Fort' },
  { id: 'chattogram', name: 'Chittagong', nameBn: 'চট্টগ্রাম', tagline: 'Port Gateway & Bay of Bengal Crown', day: '/panoramas/chattogram_day.jpg', night: '/panoramas/chattogram_night.jpg', color: '#0ea5e9', pill1: "Cox's Bazar Beach", pill2: 'Chittagong Port', pill3: 'Karnaphuli River' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী', tagline: 'Silk Metropolis, Ancient Viharas & Mangoes', day: '/panoramas/rajshahi_day.jpg', night: '/panoramas/rajshahi_night.jpg', color: '#f59e0b', pill1: 'Padma River', pill2: 'Somapura Vihara', pill3: 'Silk Weaving' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা', tagline: 'Sundarbans Mangrove & Riverine Delta', day: '/panoramas/khulna_day.jpg', night: '/panoramas/khulna_night.jpg', color: '#10b981', pill1: 'Sundarbans Forest', pill2: 'Rupsha Bridge', pill3: 'Sixty Dome Mosque' },
  { id: 'barishal', name: 'Barishal', nameBn: 'বরিশাল', tagline: 'Venice of Bengal, Riverways & Floating Markets', day: '/panoramas/barishal_day.jpg', night: '/panoramas/barishal_night.jpg', color: '#8b5cf6', pill1: 'Launch Fleet', pill2: 'Kirtankhola River', pill3: 'Kirtankhola Bridge' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট', tagline: 'Emerald Tea Gardens & Sacred Shrines', day: '/panoramas/sylhet_day.jpg', night: '/panoramas/sylhet_night.jpg', color: '#84cc16', pill1: 'Tea Gardens', pill2: 'Surma River', pill3: 'Bholaganj Rock River' },
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর', tagline: 'Palace Heritage of the Northern Plains', day: '/panoramas/rangpur_day.jpg', night: '/panoramas/rangpur_night.jpg', color: '#f97316', pill1: 'Tajhat Palace', pill2: 'Ghaghat River', pill3: 'Barendra Plain' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ', tagline: "Brahmaputra's Folk Ballads & Green Valleys", day: '/panoramas/mymensingh_day.jpg', night: '/panoramas/mymensingh_night.jpg', color: '#06b6d4', pill1: 'Brahmaputra River', pill2: 'Shashi Lodge', pill3: 'Central Park' },
];

const EXTRA_GALLERY_PHOTOS = [
  { title: 'Khulna Master Panorama (Day)', titleBn: 'খুলনা রূপসা ও ম্যানগ্রোভ ডেল্টা (দিন)', src: '/panoramas/khulna_day.jpg', div: 'Khulna' },
  { title: 'Khulna Rupsha Illuminated (Night)', titleBn: 'খুলনা রূপসা সেতু ও রাতের আলো', src: '/panoramas/khulna_night.jpg', div: 'Khulna' },
  { title: 'Khulna River Estuary Alt (Night)', titleBn: 'খুলনা রূপসা রাতের দ্বিতীয় কোণ', src: '/panoramas/khulna_night_alt.jpg', div: 'Khulna' },
  { title: 'Dhaka Grand Heritage (Day)', titleBn: 'ঢাকা ঐতিহাসিক নিদর্শন ও পদ্মা সেতু', src: '/panoramas/dhaka_day.jpg', div: 'Dhaka' },
  { title: 'Dhaka City Lights & Monuments (Night)', titleBn: 'ঢাকা লালবাগ কেল্লা ও রাতের সৌন্দর্য', src: '/panoramas/dhaka_night.jpg', div: 'Dhaka' },
  { title: 'Sylhet Mountain Stream Alt (Night)', titleBn: 'সিলেট সুরমা ও মাজার রাতের দৃশ্য', src: '/panoramas/sylhet_night_alt.jpg', div: 'Sylhet' },
  { title: 'Mymensingh Brahmaputra (Day Alt)', titleBn: 'ময়মনসিংহ ব্রহ্মপুত্র ও শশী লজ বিকল্প কোণ', src: '/panoramas/mymensingh_day_alt.jpg', div: 'Mymensingh' },
  { title: 'Barishal Kirtankhola Moonlit (Night)', titleBn: 'বরিশাল কীর্তনখোলা কেবল সেতু ও পূর্ণিমা', src: '/panoramas/barishal_night.jpg', div: 'Barishal' },
];

const NATIONAL_STATS = [
  { val: '8', label: 'Divisions', labelBn: 'বিভাগ', color: '#e11d48' },
  { val: '64', label: 'Districts', labelBn: 'জেলা', color: '#10b981' },
  { val: '495', label: 'Upazilas', labelBn: 'উপজেলা', color: '#0ea5e9' },
  { val: '700+', label: 'Rivers', labelBn: 'নদী', color: '#3b82f6' },
  { val: '100+', label: 'Landmarks', labelBn: 'নিদর্শন', color: '#8b5cf6' },
  { val: '170M', label: 'Population', labelBn: 'জনসংখ্যা', color: '#f59e0b' },
];

export default function NationalHome({ nationalData, divisions = [], onSelectDivision, isNightMode, isBengali, onNavigateTab }) {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const dragStartX = useRef(0);

  const goToSlide = useCallback((idx) => {
    if (idx < 0) idx = DIVISION_SLIDES.length - 1;
    if (idx >= DIVISION_SLIDES.length) idx = 0;
    setProgress(0);
    setSlide(idx);
  }, []);

  const next = useCallback(() => goToSlide(slide + 1), [slide, goToSlide]);
  const prev = useCallback(() => goToSlide(slide - 1), [slide, goToSlide]);

  // Smooth auto-advance with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const intervalTime = 4500;
    const tickTime = 50;

    const timer = setInterval(next, intervalTime);
    const progressTimer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + (100 / (intervalTime / tickTime))));
    }, tickTime);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [next, isHovered]);

  // Click on Hero to swap: left half = prev, right half = next
  const handleHeroClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      prev();
    } else {
      next();
    }
  };

  // Drag / Swipe handling
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - dragStartX.current;
    if (diff > 40) {
      prev();
    } else if (diff < -40) {
      next();
    }
  };

  const cur = DIVISION_SLIDES[slide];
  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const sub = isNightMode ? 'text-slate-300' : 'text-slate-600';
  const cardBg = isNightMode ? 'bg-slate-800/60 border-white/8 hover:bg-slate-800/90' : 'bg-white border-slate-200 hover:shadow-xl';

  return (
    <div className={`w-full ${bg} transition-colors duration-500`}>

      {/* ═══ CINEMATIC HERO SLIDER STAGE ═══ */}
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleHeroClick}
        className="relative w-full h-screen min-h-[640px] max-h-[920px] overflow-hidden select-none cursor-pointer"
        title={isBengali ? 'ক্লিক করে পরের ছবি দেখুন' : 'Click left or right to switch slides'}
      >
        {/* Render all slides with smooth crossfade */}
        {DIVISION_SLIDES.map((s, idx) => {
          const sImg = isNightMode ? s.night : s.day;
          const isActive = idx === slide;
          return (
            <div
              key={s.id}
              className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={sImg}
                alt={s.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(1.04)',
                }}
              />
            </div>
          );
        })}

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-28 left-4 sm:left-10 z-20 flex items-center gap-2 pointer-events-none">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-xl backdrop-blur-xl"
            style={{ background: 'rgba(0,0,0,0.7)', border: `1.5px solid ${cur.color}` }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: cur.color }} />
            <span className="font-mono text-xs">{slide + 1}/8</span>
            <span className="text-white/40">·</span>
            <span className="font-display tracking-wide">{isBengali ? cur.nameBn : cur.name}</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-white/80 bg-black/50 backdrop-blur-md border border-white/10">
            <span>{isBengali ? 'ক্লিক বা সোয়াইপ করে ছবি পরিবর্তন করুন' : 'Click or swipe to change view'}</span>
          </span>
        </div>

        {/* Location Pills */}
        <div className="absolute bottom-48 left-4 right-4 sm:left-12 z-20 flex flex-wrap gap-2 pointer-events-none">
          {[cur.pill1, cur.pill2, cur.pill3].map((pill, i) => (
            <div
              key={`${slide}-${i}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300"
              style={{
                background: 'rgba(5,10,25,0.75)',
                border: `1.5px solid ${cur.color}70`,
                boxShadow: `0 4px 20px ${cur.color}40`,
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Hero Title & Action Buttons */}
        <div className="absolute bottom-12 left-4 right-4 sm:left-12 sm:right-12 z-20 max-w-4xl" onClick={e => e.stopPropagation()}>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black text-white mb-2.5 tracking-wide shadow-xl"
            style={{ background: cur.color + 'ee', boxShadow: `0 4px 20px ${cur.color}70` }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isBengali ? cur.nameBn + ' বিভাগীয় দৃশ্য' : cur.name + ' Division Panorama'}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-2 drop-shadow-2xl font-display tracking-tight">
            {isBengali ? 'বাংলাদেশ' : 'Bangladesh'}
            <span
              className="block text-3xl sm:text-5xl lg:text-6xl mt-1 font-display"
              style={{ color: cur.color, textShadow: `0 0 35px ${cur.color}90` }}
            >
              {isBengali ? 'ইনসাইট ৩৬০°' : 'InSight 360°'}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/95 max-w-xl leading-relaxed mb-5 drop-shadow-md">
            {isBengali ? `${cur.nameBn} — ${cur.tagline}` : `${cur.name} — ${cur.tagline}`}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { const div = divisions.find(d => d.id === cur.id); if (div) onSelectDivision(div); }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-black shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${cur.color}, ${cur.color}cc)`, boxShadow: `0 8px 25px ${cur.color}70` }}
            >
              <Compass className="w-4 h-4" />
              <span>{isBengali ? 'এই বিভাগ ঘুরে দেখুন' : 'Explore Division Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('landmarks')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white hover:scale-105 transition-all duration-300 shadow-xl"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>{isBengali ? 'জাতীয় নিদর্শনকোষ' : 'Landmarks Archive'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('gk')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white hover:scale-105 transition-all duration-300 shadow-xl"
              style={{ background: 'rgba(16,185,129,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <Award className="w-4 h-4 text-yellow-300" />
              <span>{isBengali ? 'জ্ঞানকোষ ও বিশ্বস্বীকৃত ঐতিহ্য' : 'National GK & UNESCO'}</span>
            </button>
          </div>
        </div>

        {/* Slide Left / Right Arrows */}
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={e => { e.stopPropagation(); next(); }}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Interactive Thumbnail Dock & Progress Strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 max-w-[95vw]" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-2xl bg-black/60 border border-white/15 overflow-x-auto no-scrollbar">
            {DIVISION_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 text-[11px] font-bold whitespace-nowrap ${
                  i === slide
                    ? 'text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  background: i === slide ? s.color : 'transparent',
                  boxShadow: i === slide ? `0 0 15px ${s.color}80` : 'none',
                }}
              >
                <span>{isBengali ? s.nameBn : s.name}</span>
              </button>
            ))}
          </div>

          <div className="w-36 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%`, background: cur.color }}
            />
          </div>
        </div>
      </section>

      {/* ═══ NATIONAL STATS BAR ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 -mt-10 mb-14">
        <div
          className="rounded-3xl p-6 sm:p-8 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center"
          style={{
            background: isNightMode ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(24px)',
            border: isNightMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: isNightMode ? '0 30px 70px rgba(0,0,0,0.7)' : '0 25px 60px rgba(0,0,0,0.1)',
          }}
        >
          {NATIONAL_STATS.map((s, i) => (
            <div key={i} className={`p-3.5 rounded-2xl transition-transform hover:scale-105 ${isNightMode ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: s.color }}>{s.val}</p>
              <p className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isBengali ? s.labelBn : s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 8 DIVISION GATEWAYS ═══ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-8 rounded-full bg-rose-500" />
          <div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight font-display ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {isBengali ? '৮টি বিভাগের প্রবেশদ্বার (ধারাবাহিক ক্রম)' : 'All 8 Division Gateways (Canonical Order)'}
            </h2>
            <p className={`text-sm mt-0.5 ${sub}`}>
              {isBengali ? 'ঢাকা · চট্টগ্রাম · রাজশাহী · খুলনা · বরিশাল · সিলেট · রংপুর · ময়মনসিংহ' : 'Dhaka · Chittagong · Rajshahi · Khulna · Barishal · Sylhet · Rangpur · Mymensingh'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIVISION_SLIDES.map((div, idx) => {
            const divObj = divisions.find(d => d.id === div.id);
            return (
              <div
                key={div.id}
                onClick={() => { if (divObj) onSelectDivision(divObj); }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ border: `1.5px solid ${div.color}25` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={isNightMode ? div.night : div.day}
                    alt={div.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Sequence badge */}
                  <span
                    className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md backdrop-blur-md"
                    style={{ background: div.color }}
                  >
                    {idx + 1}
                  </span>

                  {/* District count badge */}
                  {divObj && (
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
                      style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${div.color}70` }}
                    >
                      {divObj.stats?.districts || '--'} {isBengali ? 'জেলা' : 'Districts'}
                    </span>
                  )}

                  {/* Division name on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-black text-white font-display drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                      {isBengali ? div.nameBn : div.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 line-clamp-1">{div.tagline}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className={`p-4 border-t ${cardBg}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[div.pill1, div.pill2].map((pill, pi) => (
                      <span key={pi} className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${isNightMode ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                        {pill}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex items-center justify-between text-xs font-black"
                    style={{ color: div.color }}
                  >
                    <span>{isBengali ? 'পূর্ণাঙ্গ বিবরণ দেখুন' : 'Explore Full Portal'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ EXTRA MULTI-ANGLE PHOTO SHOWCASE ═══ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Camera className="w-6 h-6 text-rose-500" />
          <div>
            <h2 className={`text-2xl font-black tracking-tight font-display ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {isBengali ? 'বিশেষ আলোকচিত্র ও বহু-কোণিক প্যানোরামা গ্যালারি' : 'Signature Panoramic & Multi-Angle Showcase'}
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${sub}`}>
              {isBengali ? 'খুলনা, ঢাকা, সিলেট, ময়মনসিংহ ও বরিশালের সকল দিনের ও রাতের আলোকচিত্র' : 'All Day, Night, and Alternate Panoramic Angles preserved in high definition'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXTRA_GALLERY_PHOTOS.map((photo, pIdx) => (
            <div
              key={pIdx}
              className={`rounded-3xl overflow-hidden border ${cardBg} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="h-44 overflow-hidden bg-slate-950">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                  {photo.div}
                </span>
                <h4 className="text-xs font-bold mt-2 line-clamp-2">
                  {isBengali ? photo.titleBn : photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NATIONAL EMBLEMS ═══ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div
          className="rounded-3xl p-6 sm:p-10"
          style={{
            background: isNightMode ? 'rgba(15,23,42,0.65)' : 'rgba(248,250,252,1)',
            border: isNightMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <h2 className={`text-2xl font-black mb-2 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
            {isBengali ? 'জাতীয় প্রতীক ও চিরন্তন ঐতিহ্য' : 'National Symbols & Sacred Heritage'}
          </h2>
          <p className={`text-sm mb-8 ${sub}`}>
            {isBengali ? 'বাংলাদেশের সার্বভৌম পরিচয় ও অহংকারের প্রতীকসমূহ।' : 'The timeless emblems defining the soul of Bangladesh.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '🐅', name: nationalData?.nationalSymbols?.animal, nameBn: nationalData?.nationalSymbols?.animalBn, label: 'National Animal', labelBn: 'জাতীয় পশু' },
              { emoji: '🐦', name: nationalData?.nationalSymbols?.bird, nameBn: nationalData?.nationalSymbols?.birdBn, label: 'National Bird', labelBn: 'জাতীয় পাখি' },
              { emoji: '🪷', name: nationalData?.nationalSymbols?.flower, nameBn: nationalData?.nationalSymbols?.flowerBn, label: 'National Flower', labelBn: 'জাতীয় ফুল' },
              { emoji: '🍈', name: nationalData?.nationalSymbols?.fruit, nameBn: nationalData?.nationalSymbols?.fruitBn, label: 'National Fruit', labelBn: 'জাতীয় ফল' },
              { emoji: '🐟', name: nationalData?.nationalSymbols?.fish, nameBn: nationalData?.nationalSymbols?.fishBn, label: 'National Fish', labelBn: 'জাতীয় মাছ' },
              { emoji: '🌳', name: nationalData?.nationalSymbols?.tree, nameBn: nationalData?.nationalSymbols?.treeBn, label: 'National Tree', labelBn: 'জাতীয় গাছ' },
            ].map((sym, i) => (
              <div key={i} className={`p-4 rounded-2xl text-center border ${isNightMode ? 'bg-white/4 border-white/8' : 'bg-white border-slate-100 shadow-sm'}`}>
                <span className="text-3xl mb-2 block">{sym.emoji}</span>
                <p className={`text-xs font-bold ${isNightMode ? 'text-white' : 'text-slate-800'}`}>{isBengali ? sym.nameBn : sym.name}</p>
                <p className={`text-[10px] mt-0.5 ${sub}`}>{isBengali ? sym.labelBn : sym.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={`w-full border-t py-10 px-4 transition-colors ${isNightMode ? 'border-white/10 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-black tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
              <Shield className="w-4 h-4 text-rose-500 inline" />
              <span>Bangladesh InSight · Digital Heritage Atlas of Bangladesh</span>
            </p>
            <p className="text-xs mt-1 text-slate-500">
              © 2026 RimasumIT / Shreyalien. All Rights Reserved. Proprietary Digital Architecture.
            </p>
          </div>
          <div className="text-xs space-x-3 font-semibold">
            <span>Commercial Copying Prohibited</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
