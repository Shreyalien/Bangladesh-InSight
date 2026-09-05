import React, { useState, useEffect } from 'react';
import {
  Compass, Landmark, Utensils, Sparkles, Building2, Droplets, Globe,
  MapPin, ChevronRight, ArrowLeft, Eye, EyeOff, X, ExternalLink,
  ChevronLeft, Trees, Award, Mountain, Navigation, Moon, Sun, Check, Camera,
  Waves, Anchor, Info, Calendar
} from 'lucide-react';

const MARKER_TYPES = {
  river: { label: 'River / Waterway', labelBn: 'নদী ও জলপথ', icon: Droplets, color: '#38bdf8' },
  bridge: { label: 'Bridge / Engineering', labelBn: 'সেতু ও সংযোগ', icon: Navigation, color: '#f59e0b' },
  heritage: { label: 'Heritage Landmark', labelBn: 'ঐতিহাসিক নিদর্শন', icon: Landmark, color: '#ef4444' },
  nature: { label: 'Natural Reserve', labelBn: 'প্রাকৃতিক সৌন্দর্য', icon: Trees, color: '#10b981' },
  district: { label: 'Urban / Monument', labelBn: 'নগর ও স্মারক', icon: Building2, color: '#a855f7' },
};

function FloatingMarker({ marker, isBengali, isActive, onClick }) {
  const mtype = MARKER_TYPES[marker.type] || MARKER_TYPES.heritage;
  const Icon = mtype.icon;

  return (
    <div
      className="absolute group cursor-pointer select-none z-30 transition-transform duration-300 hover:scale-115"
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
        transform: 'translate(-50%, -50%)',
        animation: 'markerFloat 3.5s ease-in-out infinite'
      }}
      onClick={(e) => { e.stopPropagation(); onClick(marker); }}
    >
      <div
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-xl"
        style={{
          background: isActive ? marker.color : 'rgba(10, 15, 30, 0.88)',
          border: `1.5px solid ${isActive ? '#ffffff' : marker.color}`,
          boxShadow: isActive
            ? `0 0 25px ${marker.color}, 0 0 50px ${marker.color}80`
            : `0 8px 25px rgba(0,0,0,0.6), 0 0 15px ${marker.color}40`,
        }}
      >
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: isActive ? 'rgba(0,0,0,0.35)' : marker.color }}
        >
          <Icon className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap drop-shadow-md">
          {isBengali ? marker.labelBn : marker.label}
        </span>
      </div>
    </div>
  );
}

function MarkerDetailCard({ marker, isNightMode, isBengali, onClose, onOpenDetails }) {
  if (!marker) return null;
  const mtype = MARKER_TYPES[marker.type] || MARKER_TYPES.heritage;
  const Icon = mtype.icon;

  return (
    <div
      className="absolute bottom-10 right-4 sm:right-10 z-50 w-80 sm:w-96 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in"
      style={{
        background: isNightMode ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(24px)',
        border: `1.5px solid ${marker.color}70`,
        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px ${marker.color}40`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${marker.color}25` }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: marker.color }}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: marker.color }}>
              {isBengali ? mtype.labelBn : mtype.label}
            </p>
            <h3 className={`text-sm font-black ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {isBengali ? marker.labelBn : marker.label}
            </h3>
          </div>
        </div>
        <button onClick={onClose} className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isNightMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <p className={`text-xs leading-relaxed ${isNightMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {isBengali
            ? `${marker.labelBn} এই অঞ্চলের অন্যতম প্রধান ভৌগোলিক ও ঐতিহাসিক নিদর্শন।`
            : `${marker.label} is an iconic hallmark of this division, celebrated for its unique engineering and geographic prominence.`}
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" style={{ color: marker.color }} />
            <span className={`text-[10px] font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isBengali ? 'ভৌগোলিক মার্কার' : 'Geographic Pin'}
            </span>
          </div>
          {onOpenDetails && (
            <button
              onClick={() => onOpenDetails({
                name: marker.label,
                nameBn: marker.labelBn,
                title: marker.label,
                titleBn: marker.labelBn,
                type: marker.type,
                description: `${marker.label} is a prominent landmark of this division.`,
                descriptionBn: `${marker.labelBn} এই অঞ্চলের অন্যতম প্রধান নিদর্শন।`,
              })}
              className="inline-flex items-center gap-1 text-[11px] font-bold hover:underline"
              style={{ color: marker.color }}
            >
              <span>{isBengali ? 'পূর্ণ বিবরণ' : 'Full Details'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DivisionPageView({
  division,
  districts = [],
  isNightMode,
  isBengali,
  onOpenDetails,
  onSelectDistrict,
  onBack
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  const gallery = division.gallery && division.gallery.length > 0
    ? division.gallery
    : [isNightMode ? division.nightImage : division.dayImage];

  const currentImg = gallery[selectedImgIndex] || (isNightMode ? division.nightImage : division.dayImage);

  // Dynamic day/night marker coordinates
  const currentMarkers = isNightMode && division.visualMarkersNight && division.visualMarkersNight.length > 0
    ? division.visualMarkersNight
    : (division.visualMarkersDay || division.visualMarkers || []);

  useEffect(() => {
    setSelectedImgIndex(isNightMode && gallery.length > 1 ? 1 : 0);
    setActiveMarker(null);
  }, [division.id, isNightMode]);

  const nextAngle = () => {
    setSelectedImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const sub = isNightMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isNightMode ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm';

  const divisionDistricts = districts.filter(d => d.divisionId === division.id || d.division === division.name);

  const portalTabs = [
    { id: 'overview', label: 'Overview & Atlas', labelBn: 'সামগ্রিক রূপরেখা', icon: Compass },
    { id: 'heritage', label: 'Heritage & Landmarks', labelBn: 'ঐতিহাসিক নিদর্শন', icon: Landmark, count: division.landmarks?.length || 8 },
    { id: 'delicacies', label: 'Famous Food & Sweets', labelBn: 'ঐতিহ্যবাহী খাবার ও মিষ্টি', icon: Utensils, count: division.delicacies?.length || 8 },
    { id: 'rivers', label: 'Rivers & Geography', labelBn: 'নদীনালা ও ভৌগোলিক রূপ', icon: Droplets, count: division.majorRiversDetailed?.length || 5 },
    { id: 'districts', label: 'Districts of Division', labelBn: 'বিভাগীয় জেলাসমূহ', icon: Building2, count: divisionDistricts.length },
    { id: 'culture', label: 'Festivals & Culture', labelBn: 'উৎসব, মেলা ও সংস্কৃতি', icon: Sparkles, count: (division.festivals?.length || 0) + (division.traditions?.length || 0) },
    { id: 'traveler', label: "Traveler's Guide", labelBn: 'ভ্রমণ নির্দেশিকা', icon: Globe },
  ];

  return (
    <div className={`w-full min-h-screen ${bg} transition-colors duration-500`} onClick={() => setActiveMarker(null)}>

      {/* Embedded CSS for floating keyframe */}
      <style>{`
        @keyframes markerFloat {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, -56%); }
        }
      `}</style>

      {/* ═══ TRUE FULLSCREEN PANORAMA (ONLY FLOATING INDICATORS ON PHOTO) ═══ */}
      <section
        onClick={nextAngle}
        className="relative w-full h-screen overflow-hidden select-none cursor-pointer bg-slate-950 flex items-center justify-center"
        title={isBengali ? 'ছবির ওপর ক্লিক করে কোণ / ছবি পরিবর্তন করুন' : 'Click on photo to cycle view angles'}
      >
        {/* The Fullscreen Photograph */}
        <img
          src={currentImg}
          alt={division.name}
          className="w-full h-full object-cover object-center select-none transition-all duration-700"
        />

        {/* Subtle Edge Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* ── ONLY FLOATING INDICATORS ON THE PHOTO ── */}
        <div className="absolute inset-0 pointer-events-auto">
          {currentMarkers.map(marker => (
            <FloatingMarker
              key={marker.id}
              marker={marker}
              isBengali={isBengali}
              isActive={activeMarker?.id === marker.id}
              onClick={(m) => setActiveMarker(m)}
            />
          ))}
        </div>

        {/* Marker Detail Card Popup (if an indicator is clicked) */}
        {activeMarker && (
          <MarkerDetailCard
            marker={activeMarker}
            isNightMode={isNightMode}
            isBengali={isBengali}
            onClose={() => setActiveMarker(null)}
            onOpenDetails={onOpenDetails}
          />
        )}
      </section>

      {/* ═══ BELOW THE PHOTO: NAVIGATION BAR, STATS & DETAILS ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* Top Control Bar: Back to Home & Angle Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all hover:scale-105 border shadow-md bg-rose-600 hover:bg-rose-700 text-white border-rose-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBengali ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </button>

          {/* Photo Angle Switcher (Cleanly placed below the photo) */}
          {gallery.length > 1 && (
            <div className={`flex items-center gap-2 p-1.5 rounded-2xl border ${cardBg} shadow-sm`}>
              <Camera className="w-4 h-4 text-rose-500 ml-1.5" />
              <span className="text-xs font-bold text-slate-400 mr-1">
                {isBengali ? 'কোণ পরিবর্তন:' : 'Switch Angle:'}
              </span>
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImgIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedImgIndex === idx
                      ? 'bg-rose-600 text-white shadow-md scale-105'
                      : isNightMode
                        ? 'text-slate-400 hover:text-white hover:bg-white/10'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isBengali ? `কোণ ${idx + 1}` : `Angle ${idx + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── MINIMAL DIVISION OVERVIEW (COMPACT & CLEAN) ── */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border shadow-lg ${cardBg} space-y-3`}
          style={{ borderLeft: `5px solid ${division.color || '#e11d48'}` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full text-xs font-black text-white bg-rose-600">
                  {division.stats?.districts || divisionDistricts.length} {isBengali ? 'জেলা' : 'Districts'}
                </span>
                <span className="text-xs font-semibold text-emerald-500">
                  {division.stats?.area || 'Area'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
                {isBengali ? division.nameBn : division.name}
                <span className="text-rose-500 font-normal ml-2 text-xl sm:text-2xl">
                  {isBengali ? 'বিভাগ' : 'Division'}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'জনসংখ্যা' : 'Pop'}</p>
                <p className="text-sm font-black text-sky-500">{division.stats?.population || '--'}</p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'উপজেলা' : 'Upazilas'}</p>
                <p className="text-sm font-black text-amber-500">{division.stats?.upazilas || '--'}</p>
              </div>
            </div>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${sub}`}>
            {isBengali ? division.descriptionBn : division.description}
          </p>
        </div>

        {/* ── TAB NAVIGATION ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/10 no-scrollbar">
          {portalTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg scale-105'
                    : isNightMode
                      ? 'bg-slate-900 border border-white/8 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isBengali ? tab.labelBn : tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-rose-500/15 text-rose-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══ TAB 1: OVERVIEW ═══ */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-3xl border md:col-span-2 ${cardBg} space-y-4`}>
              <h2 className="text-lg font-black font-display text-rose-500">
                {isBengali ? 'ভৌগোলিক ও ঐতিহাসিক তাৎপর্য' : 'Geographic & Cultural Prominence'}
              </h2>
              <p className={`text-sm leading-relaxed ${sub}`}>
                {isBengali ? division.descriptionBn : division.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'জেলা' : 'Districts'}</p>
                  <p className="text-base font-black mt-0.5 text-rose-500">{division.stats?.districts || divisionDistricts.length}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'আয়তন' : 'Area'}</p>
                  <p className="text-base font-black mt-0.5 text-emerald-500">{division.stats?.area || '--'}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'জনসংখ্যা' : 'Pop'}</p>
                  <p className="text-base font-black mt-0.5 text-sky-500">{division.stats?.population || '--'}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'উপজেলা' : 'Upazilas'}</p>
                  <p className="text-base font-black mt-0.5 text-amber-500">{division.stats?.upazilas || '--'}</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border ${cardBg} space-y-3`}>
              <h3 className="text-sm font-black flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{isBengali ? 'অনন্য বৈশিষ্ট্য' : 'Division Highlights'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>{isBengali ? 'নদীমাতৃক সংযোগ:' : 'Rivers:'}</strong> {division.stats?.majorRivers?.join(', ') || 'Waterways'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>{isBengali ? 'প্রধান ঐতিহ্য:' : 'Heritage:'}</strong> {division.landmarks ? division.landmarks.slice(0, 2).map(l => l.name).join(', ') : '--'}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ═══ TAB 2: HERITAGE & LANDMARKS ═══ */}
        {activeSection === 'heritage' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-rose-500">
                {isBengali ? 'ঐতিহাসিক ও স্থাপত্য নিদর্শনকোষ' : 'Historical & Architectural Landmarks Archive'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'যেকোনো নিদর্শনে ক্লিক করে এর সুনির্দিষ্ট ইতিহাস, সাল ও স্থাপত্যশৈলী জানুন' : 'Click on any landmark to open detailed historical facts, year, and architecture'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(division.landmarks || []).map((landmark, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (onOpenDetails) {
                      onOpenDetails({
                        name: landmark.name,
                        nameBn: landmark.nameBn,
                        title: landmark.name,
                        titleBn: landmark.nameBn,
                        type: landmark.type || 'HERITAGE SITE',
                        district: landmark.district,
                        details: landmark.description,
                        detailsBn: landmark.descriptionBn,
                        image: landmark.image
                      });
                    }
                  }}
                  className={`group rounded-3xl border cursor-pointer ${cardBg} hover:-translate-y-1.5 transition-all duration-300 p-5 space-y-3 shadow-md hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                      {landmark.type || 'HERITAGE'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-bold">{landmark.district || ''}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black font-display group-hover:text-rose-500 transition-colors">
                      {isBengali ? (landmark.nameBn || landmark.name) : landmark.name}
                    </h3>
                    {landmark.est && (
                      <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">
                        {isBengali ? `প্রতিষ্ঠাকাল: ${landmark.est}` : `Est: ${landmark.est}`}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed line-clamp-3 ${sub}`}>
                    {isBengali ? (landmark.descriptionBn || landmark.description) : landmark.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-rose-500 border-t border-slate-100 dark:border-white/5">
                    <span>{isBengali ? 'বিস্তারিত বিবরণ' : 'Full Details'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 3: WIDELY EXPANDED FOOD & DELICACIES ═══ */}
        {activeSection === 'delicacies' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-amber-500 flex items-center gap-2">
                <Utensils className="w-6 h-6" />
                <span>{isBengali ? 'বিভাগীয় ঐতিহ্যবাহী খাবার, মিষ্টি ও রন্ধনশিল্প' : 'Celebrated Regional Delicacies & Culinary Heritage'}</span>
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali
                  ? 'গভীর গবেষণার মাধ্যমে সংগৃহীত প্রতিটি জেলার আদি ও বিশ্বখ্যাত খাবারসমূহ—ইতিহাস ও স্বাদ প্রোফাইল।'
                  : 'Extensively researched signature culinary masterworks representing the authentic flavors and sweets of each district.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(division.delicacies || []).map((item, idx) => (
                <div key={idx} className={`p-5 rounded-3xl border ${cardBg} space-y-3 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                      {item.district || 'Origin'}
                    </span>
                    <Utensils className="w-3.5 h-3.5 text-amber-500/60" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-amber-400">
                      {isBengali ? (item.nameBn || item.name) : item.name}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed ${sub}`}>
                    {isBengali ? (item.descriptionBn || item.description) : item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span>{isBengali ? 'উৎস জেলা:' : 'Origin District:'}</span>
                    <span className="text-amber-500 font-bold">{item.district}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 4: COMPREHENSIVE RIVERS & GEOGRAPHY ═══ */}
        {activeSection === 'rivers' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-sky-400 flex items-center gap-2">
                <Waves className="w-6 h-6" />
                <span>{isBengali ? 'নদীনালা, জলবিজ্ঞান ও ভৌগোলিক ভূপ্রকৃতি' : 'Rivers, Hydrology & Physical Geography'}</span>
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali
                  ? 'উৎস, বিস্তার, দৈর্ঘ্য ও অর্থনৈতিক ভূমিকা সহ প্রতিটি বিভাগের পূর্ণাঙ্গ জলতাত্ত্বিক বিবরণী।'
                  : 'Comprehensive hydrologic and geographic breakdown including origins, paths, lengths, and economic lifelines.'}
              </p>
            </div>

            {/* Geographic & Terrain Topography Card */}
            {division.geography && (
              <div className={`p-6 sm:p-7 rounded-3xl border ${cardBg} space-y-3 bg-gradient-to-r from-sky-500/10 via-transparent to-blue-500/10`}>
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-black text-sky-400">
                    {isBengali ? 'ভৌগোলিক অববাহিকা ও ভূমিরূপ:' : 'Geographic Basin & Terrain Profile:'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                  {isBengali ? division.geography.overviewBn : division.geography.overview}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-sky-500/20 text-sky-300 font-bold">
                    {isBengali ? 'ভূমিরূপ:' : 'Terrain:'} {isBengali ? division.geography.terrainBn : division.geography.terrain}
                  </span>
                </div>
              </div>
            )}

            {/* Major Rivers Detailed Grid */}
            <h3 className="text-base font-black flex items-center gap-2 pt-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>{isBengali ? 'প্রধান নদীসমূহ ও তাদের ভূমিকা' : 'Major River Channels & Basin Roles'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(division.majorRiversDetailed || []).map((river, rIdx) => (
                <div key={rIdx} className={`p-5 rounded-3xl border ${cardBg} space-y-3 shadow-md hover:shadow-xl transition-all`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400">
                      {river.length ? river.length : 'River Basin'}
                    </span>
                    <Anchor className="w-3.5 h-3.5 text-sky-400/70" />
                  </div>

                  <div>
                    <h4 className="text-base font-black text-sky-400">
                      {isBengali ? river.nameBn : river.name}
                    </h4>
                    {river.origin && (
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        <strong>{isBengali ? 'উৎস:' : 'Origin:'}</strong> {river.origin}
                      </p>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed ${sub}`}>
                    {isBengali ? river.roleBn : river.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 5: DISTRICTS ═══ */}
        {activeSection === 'districts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {divisionDistricts.map((dist) => (
              <div
                key={dist.id}
                onClick={() => onSelectDistrict && onSelectDistrict(dist)}
                className={`p-4 rounded-3xl border cursor-pointer ${cardBg} hover:-translate-y-1 transition-all space-y-1.5`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {dist.area || 'District'}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <h3 className="text-sm font-black">{isBengali ? dist.nameBn : dist.name}</h3>
                <p className="text-[10px] text-slate-400">{dist.hq ? `HQ: ${dist.hq}` : ''}</p>
                <p className={`text-xs line-clamp-2 ${sub}`}>
                  {isBengali ? dist.overviewBn : dist.overview}
                </p>
                <div className="pt-1 flex items-center justify-between text-xs font-bold text-rose-500">
                  <span>{isBengali ? 'বিস্তারিত দেখুন' : 'View Encyclopedia'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ TAB 6: CULTURE & FESTIVALS ═══ */}
        {activeSection === 'culture' && (
          <div className="space-y-6">
            <h3 className="text-base font-black">{isBengali ? 'উৎসব ও মেলা' : 'Festivals & Fairs'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(division.festivals || []).map((f, i) => (
                <div key={i} className={`p-4 rounded-3xl border ${cardBg} space-y-1.5`}>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-black">{isBengali ? (f.nameBn || f.name) : f.name}</h4>
                  <p className={`text-xs leading-relaxed ${sub}`}>{isBengali ? (f.descriptionBn || f.description) : f.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-black pt-2">{isBengali ? 'লোকঐতিহ্য ও সাংস্কৃতিক রীতি' : 'Folk Traditions'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(division.traditions || []).map((t, i) => (
                <div key={i} className={`p-4 rounded-3xl border ${cardBg} space-y-1.5`}>
                  <Award className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-black">{isBengali ? (t.titleBn || t.title) : t.title}</h4>
                  <p className={`text-xs leading-relaxed ${sub}`}>{isBengali ? (t.descriptionBn || t.description) : t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 7: TRAVELER'S GUIDE ═══ */}
        {activeSection === 'traveler' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className={`p-5 rounded-3xl border ${cardBg} space-y-2`}>
              <h3 className="text-sm font-black text-emerald-400">{isBengali ? 'ভ্রমণের সেরা সময়' : 'Best Time to Visit'}</h3>
              <p className={`text-xs leading-relaxed ${sub}`}>
                {isBengali
                  ? 'অক্টোবর থেকে মার্চ মাস (শীতকালীন ও বসন্তকাল) ভ্রমণের জন্য সবচেয়ে উপযুক্ত। আবহাওয়া শুষ্ক ও মনোরম থাকে।'
                  : 'October to March offers pleasant, mild weather ideal for outdoor exploration.'}
              </p>
            </div>
            <div className={`p-5 rounded-3xl border ${cardBg} space-y-2`}>
              <h3 className="text-sm font-black text-rose-400">{isBengali ? 'যাতায়াত ব্যবস্থা' : 'Transportation'}</h3>
              <p className={`text-xs leading-relaxed ${sub}`}>
                {isBengali
                  ? 'সড়ক, রেল ও নদীপথে সরাসরি উন্নত যোগাযোগ ব্যবস্থা রয়েছে।'
                  : 'Accessible via well-connected national expressways, rail networks, and riverine vessels.'}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
