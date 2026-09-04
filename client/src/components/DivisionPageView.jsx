import React, { useState, useEffect } from 'react';
import {
  Compass, Landmark, Utensils, Sparkles, Building2, Droplets, Globe,
  MapPin, ChevronRight, ArrowLeft, Eye, EyeOff, X, ExternalLink,
  ChevronLeft, Trees, Award, Mountain, Navigation, Moon, Sun, Check, Camera,
  Waves, Anchor, Info, Maximize2, Minimize2
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
          background: isActive ? marker.color : 'rgba(10, 15, 30, 0.82)',
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
        <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-md">
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
      className="absolute bottom-16 right-4 sm:right-8 z-50 w-80 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in"
      style={{
        background: isNightMode ? 'rgba(10,15,30,0.96)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(24px)',
        border: `1.5px solid ${marker.color}60`,
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
  const [activeTypes, setActiveTypes] = useState(new Set(['river', 'bridge', 'heritage', 'nature', 'district']));
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [fitMode, setFitMode] = useState('cover'); // 'cover' or 'contain'

  const gallery = division.gallery && division.gallery.length > 0
    ? division.gallery
    : [isNightMode ? division.nightImage : division.dayImage];

  const currentImg = gallery[selectedImgIndex] || (isNightMode ? division.nightImage : division.dayImage);

  // Dynamic day/night marker coordinates
  const currentMarkers = isNightMode && division.visualMarkersNight && division.visualMarkersNight.length > 0
    ? division.visualMarkersNight
    : (division.visualMarkersDay || division.visualMarkers || []);

  const visibleMarkers = currentMarkers.filter(m => activeTypes.has(m.type));

  useEffect(() => {
    setSelectedImgIndex(isNightMode && gallery.length > 1 ? 1 : 0);
    setActiveMarker(null);
  }, [division.id, isNightMode]);

  const toggleType = (type) => {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const nextAngle = () => {
    setSelectedImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevAngle = () => {
    setSelectedImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Image error fallback
  const handleImageError = (e) => {
    const src = e.target.src;
    if (src.endsWith('.jpg')) {
      e.target.src = src.replace('.jpg', '.png');
    } else if (src.endsWith('.png')) {
      e.target.src = src.replace('.png', '.jpg');
    }
  };

  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const sub = isNightMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isNightMode ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm';

  const divisionDistricts = districts.filter(d => d.divisionId === division.id || d.division === division.name);
  const geo = division.geography || {};

  const portalTabs = [
    { id: 'overview', label: 'Overview & Atlas', labelBn: 'সামগ্রিক রূপরেখা', icon: Compass },
    { id: 'rivers', label: 'Rivers & Geography', labelBn: 'নদীনালা ও ভৌগোলিক রূপরেখা', icon: Droplets, highlight: true },
    { id: 'heritage', label: 'Heritage & Landmarks', labelBn: 'ঐতিহাসিক নিদর্শন', icon: Landmark, count: division.landmarks?.length || 8 },
    { id: 'delicacies', label: 'Famous Food & Sweets', labelBn: 'ঐতিহ্যবাহী খাবার ও মিষ্টি', icon: Utensils, count: division.delicacies?.length },
    { id: 'culture', label: 'Festivals & Culture', labelBn: 'উৎসব, মেলা ও সংস্কৃতি', icon: Sparkles, count: (division.festivals?.length || 0) + (division.traditions?.length || 0) },
    { id: 'districts', label: 'Districts of Division', labelBn: 'বিভাগীয় জেলাসমূহ', icon: Building2, count: divisionDistricts.length },
    { id: 'gallery', label: 'Multi-Angle Gallery', labelBn: 'বহু-কোণিক আলোকচিত্র', icon: Camera, count: gallery.length },
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

      {/* ═══ PANORAMIC STAGE (CALIBRATED FOR 100% SCREEN ZOOM FIT) ═══ */}
      <section
        className="relative w-full h-[62vh] sm:h-[72vh] lg:h-[76vh] min-h-[460px] max-h-[760px] overflow-hidden select-none bg-slate-950 border-b border-white/10"
      >
        {/* Master Panoramic Image with Error Fallback and Fit Toggle */}
        <img
          src={currentImg}
          alt={division.name}
          onError={handleImageError}
          className={`w-full h-full object-center transition-all duration-700 ${
            fitMode === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        />

        {/* Ambient Overlay Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

        {/* Top Controls: Back Button, Filters & Fit-to-Screen Toggle */}
        <div className="absolute top-28 left-4 right-4 sm:left-8 sm:right-8 z-40 flex items-center justify-between gap-3 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); onBack(); }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105 border shadow-xl bg-black/60 text-white backdrop-blur-xl border-white/20"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>{isBengali ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Fit / Cover Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFitMode(m => m === 'cover' ? 'contain' : 'cover');
              }}
              className="pointer-events-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-[11px] font-bold border shadow-xl bg-black/60 text-white backdrop-blur-xl border-white/20 hover:bg-black/80 transition-all"
              title={fitMode === 'cover' ? 'Switch to Full Unclipped View' : 'Switch to Fill View'}
            >
              {fitMode === 'cover' ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{fitMode === 'cover' ? (isBengali ? 'সম্পূর্ণ ছবি (নো-ক্রপ)' : 'Fit Whole Image') : (isBengali ? 'স্ক্রিন ফিল' : 'Fill Screen')}</span>
            </button>

            {/* Marker Filter Buttons */}
            <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl border shadow-xl bg-black/60 backdrop-blur-xl border-white/20 overflow-x-auto no-scrollbar">
              {Object.entries(MARKER_TYPES).map(([typeKey, cfg]) => {
                const isActive = activeTypes.has(typeKey);
                const Icon = cfg.icon;
                return (
                  <button
                    key={typeKey}
                    onClick={(e) => { e.stopPropagation(); toggleType(typeKey); }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                    style={{ background: isActive ? cfg.color : 'transparent' }}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{isBengali ? cfg.labelBn.split(' ')[0] : cfg.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── FLOATING VISUAL MARKERS (DAY/NIGHT CALIBRATED POSITIONS) ── */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {visibleMarkers.map(marker => (
            <FloatingMarker
              key={marker.id}
              marker={marker}
              isBengali={isBengali}
              isActive={activeMarker?.id === marker.id}
              onClick={(m) => setActiveMarker(m)}
            />
          ))}
        </div>

        {/* Active Marker Detail Card Popup */}
        {activeMarker && (
          <MarkerDetailCard
            marker={activeMarker}
            isNightMode={isNightMode}
            isBengali={isBengali}
            onClose={() => setActiveMarker(null)}
            onOpenDetails={onOpenDetails}
          />
        )}

        {/* Left & Right Angle Switcher Arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevAngle(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white bg-black/60 hover:bg-rose-600 backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110"
              title="Previous Angle"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextAngle(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white bg-black/60 hover:bg-rose-600 backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110"
              title="Next Angle"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Bottom Dock on Photo: Division Badge & Angle Switcher */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 z-30 flex items-center justify-between gap-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: division.color || '#e11d48' }} />
            <span className="text-xs font-black text-white font-display">
              {isBengali ? division.nameBn : division.name} {isBengali ? 'বিভাগ' : 'Division'}
            </span>
            <span className="text-white/40">·</span>
            <button
              onClick={(e) => { e.stopPropagation(); nextAngle(); }}
              className="text-[11px] text-yellow-300 font-bold hover:underline flex items-center gap-1"
            >
              <Camera className="w-3 h-3" />
              <span>{isBengali ? 'কোণ পরিবর্তন করুন' : 'Click to Swap Angle'}</span>
            </button>
          </div>

          {gallery.length > 1 && (
            <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
              <span className="text-[10px] text-white/70 font-bold px-1.5 uppercase tracking-wider">{isBengali ? 'কোণ' : 'View'}</span>
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedImgIndex === idx
                      ? 'bg-rose-600 text-white shadow-lg scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CONTENT AREA (BELOW THE PANORAMA) ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* ── MINIMAL DIVISION OVERVIEW (CLEAN & CONCISE) ── */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border shadow-lg ${cardBg} space-y-3`}
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
                {geo.basinName && (
                  <span className="hidden md:inline-block text-xs font-semibold text-blue-400">
                    · {isBengali ? geo.basinNameBn : geo.basinName}
                  </span>
                )}
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

          <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${sub}`}>
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg scale-105'
                    : tab.highlight
                      ? isNightMode
                        ? 'bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:bg-blue-900/60'
                        : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
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

        {/* ═══ TAB: RIVERS & GEOGRAPHY (AUTHORITATIVE MASTERCLASS ATLAS) ═══ */}
        {activeSection === 'rivers' && (
          <div className="space-y-8 animate-in fade-in duration-300">

            {/* Basin Headline Banner */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${cardBg} relative overflow-hidden`}
              style={{
                background: isNightMode
                  ? 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(14,165,233,0.1))'
                  : 'linear-gradient(135deg, #f8fafc, #e0f2fe)'
              }}
            >
              <div className="max-w-4xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black text-white bg-blue-600 shadow-md">
                  <Waves className="w-3.5 h-3.5" />
                  <span>{isBengali ? 'নদীমাতৃক ভৌগোলিক মানচিত্রায়ন ও অববাহিকা' : 'Riverine Basin & Geomorphology Matrix'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-blue-500">
                  {isBengali ? (geo.basinNameBn || 'নদীনালা ও ভৌগোলিক অববাহিকা') : (geo.basinName || 'River Basin Network')}
                </h2>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-400 font-bold">
                    📍 {isBengali ? geo.terrainTypeBn : geo.terrainType}
                  </span>
                  {geo.elevation && (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
                      ⛰️ {isBengali ? geo.elevationBn : geo.elevation}
                    </span>
                  )}
                </div>
                <p className={`text-sm sm:text-base leading-relaxed pt-2 ${sub}`}>
                  {isBengali ? geo.geologicalSummaryBn : geo.geologicalSummary}
                </p>
              </div>
            </div>

            {/* Major River Index Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black font-display text-blue-400 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>{isBengali ? 'প্রধান নদ-নদীসমূহ ও প্রবাহ বিন্যাস' : 'Key River Systems & Flow Architecture'}</span>
                  </h3>
                  <p className={`text-xs mt-0.5 ${sub}`}>
                    {isBengali ? 'উৎস, বিস্তার, নিষ্কাশন এবং অর্থনৈতিক ও পরিবেশগত তাৎপর্য' : 'Origin, path, outflow, and ecological-agrarian importance'}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                  {geo.riverList?.length || 0} {isBengali ? 'নদী নথিভুক্ত' : 'Rivers Indexed'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(geo.riverList || []).map((river, rIdx) => (
                  <div
                    key={rIdx}
                    className={`p-6 rounded-3xl border ${cardBg} space-y-4 hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-2xl`}
                    style={{ borderTop: '4px solid #38bdf8' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 uppercase tracking-wider block w-fit mb-1.5">
                          {isBengali ? river.typeBn : river.type}
                        </span>
                        <h4 className="text-lg font-black font-display text-blue-400">
                          {isBengali ? river.nameBn : river.name}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 whitespace-nowrap bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
                        {river.length}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-semibold min-w-[50px]">{isBengali ? 'উৎস:' : 'Origin:'}</span>
                        <span className="font-medium text-slate-200">{isBengali ? river.originBn : river.origin}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-semibold min-w-[50px]">{isBengali ? 'পতন:' : 'Outflow:'}</span>
                        <span className="font-medium text-slate-300">{river.outflow}</span>
                      </div>
                    </div>

                    <p className={`text-xs leading-relaxed pt-2 border-t border-slate-100 dark:border-white/5 ${sub}`}>
                      {isBengali ? river.significanceBn : river.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wetlands, Haors & Lakes Showcase */}
            {geo.wetlands && geo.wetlands.length > 0 && (
              <div className="space-y-4 pt-4">
                <div>
                  <h3 className="text-xl font-black font-display text-emerald-400 flex items-center gap-2">
                    <Anchor className="w-5 h-5 text-emerald-500" />
                    <span>{isBengali ? 'হাওর, বিল, দীঘি ও অনন্য জলাভূমি' : 'Iconic Wetlands, Haors & Lakes'}</span>
                  </h3>
                  <p className={`text-xs mt-0.5 ${sub}`}>
                    {isBengali ? 'রামসার সাইট, মিঠাপানির বিল ও প্রাকৃতিক মৎস্য প্রজননক্ষেত্র' : 'Ramsar sanctuaries, freshwater marshlands, and biodiversity habitats'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {geo.wetlands.map((wet, wIdx) => (
                    <div
                      key={wIdx}
                      className={`p-6 rounded-3xl border ${cardBg} space-y-3`}
                      style={{ borderLeft: '4px solid #10b981' }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-black text-emerald-400">
                          {isBengali ? wet.nameBn : wet.name}
                        </h4>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                          {wet.area}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        📍 {wet.district}
                      </span>
                      <p className={`text-xs leading-relaxed ${sub}`}>
                        {isBengali ? wet.descBn : wet.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ═══ TAB: OVERVIEW ═══ */}
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

        {/* ═══ TAB: HERITAGE & LANDMARKS ═══ */}
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

        {/* ═══ TAB: DELICACIES ═══ */}
        {activeSection === 'delicacies' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(division.delicacies || []).map((item, idx) => (
              <div key={idx} className={`p-5 rounded-3xl border ${cardBg} space-y-2.5`}>
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center bg-amber-500/20 text-amber-500">
                  <Utensils className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-amber-400">
                  {isBengali ? (item.nameBn || item.name) : item.name}
                </h3>
                <p className={`text-xs leading-relaxed ${sub}`}>
                  {isBengali ? (item.descriptionBn || item.description) : item.description}
                </p>
                {item.district && (
                  <p className="text-[10px] font-semibold text-slate-400">
                    {isBengali ? 'উৎস জেলা:' : 'Origin:'} {item.district}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ TAB: CULTURE & FESTIVALS ═══ */}
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

        {/* ═══ TAB: DISTRICTS ═══ */}
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

        {/* ═══ TAB: PHOTO GALLERY & ALTERNATE ANGLES ═══ */}
        {activeSection === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-rose-500">
                {isBengali ? 'বহু-কোণিক উচ্চ-রেজোলিউশন আলোকচিত্র' : 'Multi-Angle High-Definition Showcase'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'যেকোনো ছবিতে ক্লিক করে ওপরের প্রধান প্যানোরামা স্টেজ পরিবর্তন করুন' : 'Click any image to load it onto the stage above'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  onClick={() => {
                    setSelectedImgIndex(gIdx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group rounded-3xl overflow-hidden border cursor-pointer ${cardBg} hover:-translate-y-1.5 transition-all shadow-md ${
                    selectedImgIndex === gIdx ? 'ring-4 ring-rose-500' : ''
                  }`}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={imgUrl}
                      alt={`Angle ${gIdx + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-md">
                      {isBengali ? `কোণ ${gIdx + 1}` : `Angle ${gIdx + 1}`}
                    </div>
                  </div>
                  <div className="p-3.5 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">{isBengali ? 'স্টেজে দেখতে ক্লিক করুন' : 'Click to View on Stage'}</span>
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: TRAVELER'S GUIDE ═══ */}
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
