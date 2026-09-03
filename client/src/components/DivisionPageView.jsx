import React, { useState, useEffect } from 'react';
import {
  Compass, Landmark, Utensils, Sparkles, Building2, Droplets, Globe,
  MapPin, ChevronRight, ArrowLeft, Eye, EyeOff, X, ExternalLink,
  ChevronLeft, Trees, Award, Mountain, Navigation, Moon, Sun, Check, Camera, Image as ImageIcon
} from 'lucide-react';

const MARKER_TYPES = {
  river: { label: 'River / Waterway', labelBn: 'নদী ও জলপথ', icon: Droplets, color: '#38bdf8' },
  bridge: { label: 'Bridge / Engineering', labelBn: 'সেতু ও সংযোগ', icon: Navigation, color: '#f59e0b' },
  heritage: { label: 'Heritage Landmark', labelBn: 'ঐতিহাসিক নিদর্শন', icon: Landmark, color: '#f43f5e' },
  nature: { label: 'Natural Reserve', labelBn: 'প্রাকৃতিক সৌন্দর্য', icon: Trees, color: '#10b981' },
  district: { label: 'Urban / Stadium', labelBn: 'নগর ও স্থাপনা', icon: Building2, color: '#a855f7' },
};

function CleanMarker({ marker, isBengali, isActive, onClick }) {
  const mtype = MARKER_TYPES[marker.type] || MARKER_TYPES.heritage;
  const Icon = mtype.icon;

  return (
    <div
      className="absolute group cursor-pointer select-none transition-all duration-200 hover:scale-110 z-30"
      style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={(e) => { e.stopPropagation(); onClick(marker); }}
    >
      <div
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl transition-all duration-200"
        style={{
          background: isActive ? marker.color : 'rgba(10, 15, 30, 0.88)',
          backdropFilter: 'blur(16px)',
          border: `1.5px solid ${isActive ? '#ffffff' : marker.color}`,
          boxShadow: isActive ? `0 0 22px ${marker.color}` : '0 4px 15px rgba(0,0,0,0.6)',
        }}
      >
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: isActive ? 'rgba(0,0,0,0.3)' : marker.color }}
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
      className="absolute bottom-6 right-4 sm:right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in"
      style={{
        background: isNightMode ? 'rgba(10,15,30,0.96)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${marker.color}50`,
        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 25px ${marker.color}40`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${marker.color}25` }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: marker.color }}>
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
            ? `${marker.labelBn} এই অঞ্চলের অন্যতম প্রধান গৌরব ও আকর্ষণ। এটি প্রাকৃতিক ও স্থাপত্য বৈশিষ্ট্যের অপূর্ব নিদর্শন।`
            : `${marker.label} is an iconic geographic hallmark of this division, celebrated for its unique engineering, heritage, and scenic prominence.`}
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
                type: marker.type,
                description: `${marker.label} is a prominent landmark of this division.`,
                descriptionBn: `${marker.labelBn} এই বিভাগের একটি প্রধান নিদর্শন।`,
              })}
              className="inline-flex items-center gap-1 text-[11px] font-bold hover:underline"
              style={{ color: marker.color }}
            >
              <span>{isBengali ? 'বিস্তারিত দেখুন' : 'Learn More'}</span>
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

  const gallery = division.gallery && division.gallery.length > 0
    ? division.gallery
    : [isNightMode ? division.nightImage : division.dayImage];

  const currentImg = gallery[selectedImgIndex] || (isNightMode ? division.nightImage : division.dayImage);

  useEffect(() => {
    setSelectedImgIndex(isNightMode && gallery.length > 1 ? 1 : 0);
    setActiveMarker(null);
    setActiveSection('overview');
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

  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const sub = isNightMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isNightMode ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm';

  const divisionDistricts = districts.filter(d => d.divisionId === division.id || d.division === division.name);
  const markers = (division.visualMarkers || []).filter(m => activeTypes.has(m.type));

  const portalTabs = [
    { id: 'overview', label: 'Overview & Atlas', labelBn: 'সামগ্রিক রূপরেখা', icon: Compass },
    { id: 'heritage', label: 'Heritage & Landmarks', labelBn: 'ঐতিহাসিক নিদর্শন', icon: Landmark, count: division.landmarks?.length },
    { id: 'delicacies', label: 'Famous Food & Sweets', labelBn: 'ঐতিহ্যবাহী খাবার ও মিষ্টি', icon: Utensils, count: division.delicacies?.length },
    { id: 'culture', label: 'Festivals & Culture', labelBn: 'উৎসব, মেলা ও সংস্কৃতি', icon: Sparkles, count: (division.festivals?.length || 0) + (division.traditions?.length || 0) },
    { id: 'districts', label: 'Districts of Division', labelBn: 'বিভাগীয় জেলাসমূহ', icon: Building2, count: divisionDistricts.length },
    { id: 'rivers', label: 'Rivers & Geography', labelBn: 'নদীনালা ও ভৌগোলিক রূপ', icon: Droplets },
    { id: 'gallery', label: 'Multi-Angle Gallery', labelBn: 'বহু-কোণিক আলোকচিত্র', icon: Camera, count: gallery.length },
    { id: 'traveler', label: "Traveler's Guide", labelBn: 'ভ্রমণ নির্দেশিকা', icon: Globe },
  ];

  return (
    <div className={`w-full min-h-screen ${bg} pt-32 pb-24 px-4 sm:px-8 transition-colors duration-500`} onClick={() => setActiveMarker(null)}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Breadcrumb & Controls */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105 border shadow-sm"
            style={{
              background: isNightMode ? 'rgba(30,41,59,0.8)' : '#ffffff',
              borderColor: isNightMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>{isBengali ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </button>

          {/* Marker Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl border shadow-sm overflow-x-auto no-scrollbar"
            style={{
              background: isNightMode ? 'rgba(30,41,59,0.8)' : '#ffffff',
              borderColor: isNightMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
          >
            {Object.entries(MARKER_TYPES).map(([typeKey, cfg]) => {
              const isActive = activeTypes.has(typeKey);
              const Icon = cfg.icon;
              return (
                <button
                  key={typeKey}
                  onClick={() => toggleType(typeKey)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
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

        {/* ═══ DEDICATED PANORAMA STAGE (100% VISIBLE, NO TEXT BLOCKING PHOTO) ═══ */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 h-[52vh] sm:h-[65vh] lg:h-[72vh] min-h-[460px] max-h-[760px] select-none bg-slate-950">

          {/* Master Image */}
          <img
            src={currentImg}
            alt={division.name}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />

          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* ── CLEAN STATIC MARKERS (NO TEXT BLOCKING) ── */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {markers.map(marker => (
              <CleanMarker
                key={marker.id}
                marker={marker}
                isBengali={isBengali}
                isActive={activeMarker?.id === marker.id}
                onClick={(m) => setActiveMarker(m)}
              />
            ))}
          </div>

          {/* Active Marker Popup Card */}
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

          {/* Bottom Floating Angle Thumbnail Dock on the Photo */}
          {gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
              <span className="text-[10px] font-bold text-white/70 px-2 uppercase tracking-wider flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-rose-400" />
                <span>{isBengali ? 'কোণ' : 'View'}</span>
              </span>
              {gallery.map((gImg, idx) => (
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

        {/* ═══ DIVISION OVERVIEW CARD (PLACED CLEANLY BELOW THE PHOTO) ═══ */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${cardBg} space-y-4`}
          style={{ borderLeft: `6px solid ${division.color || '#e11d48'}` }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-xs font-black text-white bg-rose-600 shadow-sm">
                  {division.stats?.districts || divisionDistricts.length} {isBengali ? 'জেলা' : 'Districts'}
                </span>
                <span className="text-xs font-semibold text-emerald-500">
                  {division.stats?.area || 'Area'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
                {isBengali ? division.nameBn : division.name}
                <span className="text-rose-500 font-normal ml-3 text-2xl sm:text-3xl">
                  {isBengali ? 'বিভাগ' : 'Division'}
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-center min-w-[100px]">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'জনসংখ্যা' : 'Population'}</p>
                <p className="text-base font-black text-sky-500 mt-0.5">{division.stats?.population || '--'}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-center min-w-[100px]">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'উপজেলা' : 'Upazilas'}</p>
                <p className="text-base font-black text-amber-500 mt-0.5">{division.stats?.upazilas || '--'}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-center min-w-[120px]">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'প্রধান নদী' : 'Main River'}</p>
                <p className="text-base font-black text-blue-500 mt-0.5">{division.stats?.majorRivers ? division.stats.majorRivers[0] : 'River'}</p>
              </div>
            </div>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed ${sub}`}>
            {isBengali ? division.descriptionBn : division.description}
          </p>
        </div>

        {/* ═══ TAB NAVIGATION ═══ */}
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
              <h2 className="text-xl font-black font-display text-rose-500">
                {isBengali ? 'ভৌগোলিক ও ঐতিহাসিক তাৎপর্য' : 'Geographic & Cultural Prominence'}
              </h2>
              <p className={`text-sm leading-relaxed ${sub}`}>
                {isBengali ? division.descriptionBn : division.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'জেলা সংখ্যা' : 'Districts'}</p>
                  <p className="text-lg font-black mt-0.5 text-rose-500">{division.stats?.districts || divisionDistricts.length}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'আয়তন' : 'Area'}</p>
                  <p className="text-lg font-black mt-0.5 text-emerald-500">{division.stats?.area || '--'}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'মোট জনসংখ্যা' : 'Population'}</p>
                  <p className="text-lg font-black mt-0.5 text-sky-500">{division.stats?.population || '--'}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{isBengali ? 'উপজেলা' : 'Upazilas'}</p>
                  <p className="text-lg font-black mt-0.5 text-amber-500">{division.stats?.upazilas || '--'}</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border ${cardBg} space-y-4`}>
              <h3 className="text-base font-black flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{isBengali ? 'অনন্য বৈশিষ্ট্য' : 'Division Highlights'}</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>{isBengali ? 'নদীমাতৃক সংযোগ:' : 'Waterways:'}</strong> {division.stats?.majorRivers?.join(', ') || 'Padma, Meghna'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>{isBengali ? 'অর্থনৈতিক স্তম্ভ:' : 'Economy:'}</strong> {isBengali ? 'শিল্প, কৃষি, বাণিজ্য ও নদীপথ' : 'Industry, Agriculture & Commerce'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>{isBengali ? 'দর্শনীয় স্থান:' : 'Heritage Sites:'}</strong> {division.landmarks ? division.landmarks.slice(0, 3).map(l => l.name).join(', ') : '--'}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ═══ TAB 2: HERITAGE & LANDMARKS (CLICKABLE AND OPENS DETAIL MODAL) ═══ */}
        {activeSection === 'heritage' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-rose-500">
                {isBengali ? 'ঐতিহাসিক ও স্থাপত্য নিদর্শনকোষ' : 'Historical & Architectural Landmarks'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'নিদর্শনসমূহের ওপর ক্লিক করে বিস্তারিত ইতিহাস ও বিবরণ জানুন' : 'Click on any landmark card to view comprehensive history and architecture details'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className={`group rounded-3xl overflow-hidden border cursor-pointer ${cardBg} hover:-translate-y-1.5 transition-all duration-300 p-6 space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-500">
                      {landmark.type || 'LANDMARK'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{landmark.district || ''}</span>
                  </div>
                  <h3 className="text-lg font-black font-display group-hover:text-rose-500 transition-colors">
                    {isBengali ? (landmark.nameBn || landmark.name) : landmark.name}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-3 ${sub}`}>
                    {isBengali ? (landmark.descriptionBn || landmark.description) : landmark.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-rose-500 border-t border-slate-100 dark:border-white/5">
                    <span>{isBengali ? 'পূর্ণ বিবরণ দেখতে ক্লিক করুন' : 'Click for Full Details'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 3: DELICACIES ═══ */}
        {activeSection === 'delicacies' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(division.delicacies || []).map((item, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${cardBg} space-y-3`}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-500/20 text-amber-500">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-amber-400">
                  {isBengali ? (item.nameBn || item.name) : item.name}
                </h3>
                <p className={`text-xs leading-relaxed ${sub}`}>
                  {isBengali ? (item.descriptionBn || item.description) : item.description}
                </p>
                {item.district && (
                  <p className="text-[10px] font-semibold text-slate-400">
                    {isBengali ? 'উৎস জেলা:' : 'Origin District:'} {item.district}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ TAB 4: CULTURE & FESTIVALS ═══ */}
        {activeSection === 'culture' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black">{isBengali ? 'উৎসব ও মেলা' : 'Festivals & Fairs'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(division.festivals || []).map((f, i) => (
                <div key={i} className={`p-5 rounded-3xl border ${cardBg} space-y-2`}>
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h4 className="text-sm font-black">{isBengali ? (f.nameBn || f.name) : f.name}</h4>
                  <p className={`text-xs leading-relaxed ${sub}`}>{isBengali ? (f.descriptionBn || f.description) : f.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-black pt-4">{isBengali ? 'লোকঐতিহ্য ও সাংস্কৃতিক রীতি' : 'Folk Heritage & Traditions'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(division.traditions || []).map((t, i) => (
                <div key={i} className={`p-5 rounded-3xl border ${cardBg} space-y-2`}>
                  <Award className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-black">{isBengali ? (t.titleBn || t.title) : t.title}</h4>
                  <p className={`text-xs leading-relaxed ${sub}`}>{isBengali ? (t.descriptionBn || t.description) : t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 5: DISTRICTS (CLEAN NON-PHOTO DISTRICT DETAIL) ═══ */}
        {activeSection === 'districts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {divisionDistricts.map((dist) => (
              <div
                key={dist.id}
                onClick={() => onSelectDistrict && onSelectDistrict(dist)}
                className={`p-5 rounded-3xl border cursor-pointer ${cardBg} hover:-translate-y-1 transition-all space-y-2`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {dist.area || 'District'}
                  </span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-base font-black">{isBengali ? dist.nameBn : dist.name}</h3>
                <p className="text-[11px] text-slate-400">{dist.hq ? `HQ: ${dist.hq}` : ''}</p>
                <p className={`text-xs line-clamp-2 ${sub}`}>
                  {isBengali ? dist.overviewBn : dist.overview}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-rose-500">
                  <span>{isBengali ? 'বিস্তারিত দেখুন' : 'View Encyclopedia'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ TAB 6: RIVERS ═══ */}
        {activeSection === 'rivers' && (
          <div className={`p-8 rounded-3xl border ${cardBg} space-y-4`}>
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-black">{isBengali ? 'নদীনালা ও ভৌগোলিক জলপথ' : 'River Systems & Waterways'}</h3>
            </div>
            <p className={`text-sm leading-relaxed ${sub}`}>
              {isBengali
                ? `${division.nameBn} বিভাগটি প্রমত্তা নদ-নদী দ্বারা পরিবেষ্টিত। এ অঞ্চলের প্রধান নদীসমূহ: ${division.stats?.majorRivers?.join(', ') || 'নদীপথ'}। নদীমাতৃক এই ভূমি বাংলাদেশের কৃষি, জীবিকা ও যোগাযোগের প্রাণকেন্দ্র।`
                : `${division.name} Division is blessed with vibrant river systems including: ${division.stats?.majorRivers?.join(', ') || 'Major Rivers'}. These waterways shape the geography, agriculture, and lifestyle of the people.`}
            </p>
          </div>
        )}

        {/* ═══ TAB 7: PHOTO GALLERY & ALTERNATE ANGLES (SHOWS ALL PHOTOS) ═══ */}
        {activeSection === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-rose-500">
                {isBengali ? 'বহু-কোণিক উচ্চ-রেজোলিউশন আলোকচিত্র' : 'Multi-Angle High-Definition Showcase'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'যেকোনো ছবিতে ক্লিক করে ওপরের প্রধান প্যানোরামা স্টেজ পরিবর্তন করুন' : 'Click on any photo below to load it into the master panorama viewer above'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  onClick={() => {
                    setSelectedImgIndex(gIdx);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`group rounded-3xl overflow-hidden border cursor-pointer ${cardBg} hover:-translate-y-1.5 transition-all shadow-lg ${
                    selectedImgIndex === gIdx ? 'ring-4 ring-rose-500' : ''
                  }`}
                >
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={imgUrl}
                      alt={`Angle ${gIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-md">
                      {isBengali ? `কোণ ${gIdx + 1}` : `Angle ${gIdx + 1}`}
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">{isBengali ? 'স্টেজে লোড করতে ক্লিক করুন' : 'Click to View on Stage'}</span>
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB 8: TRAVELER'S GUIDE ═══ */}
        {activeSection === 'traveler' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border ${cardBg} space-y-3`}>
              <h3 className="text-base font-black text-emerald-400">{isBengali ? 'ভ্রমণের সেরা সময়' : 'Best Time to Visit'}</h3>
              <p className={`text-xs leading-relaxed ${sub}`}>
                {isBengali
                  ? 'অক্টোবর থেকে মার্চ মাস (শীতকালীন ও বসন্তকাল) ভ্রমণের জন্য সবচেয়ে উপযুক্ত। আবহাওয়া শুষ্ক, মৃদু ও মনোরম থাকে।'
                  : 'October to March (Autumn and Winter) offers pleasant, mild weather ideal for outdoor exploration.'}
              </p>
            </div>
            <div className={`p-6 rounded-3xl border ${cardBg} space-y-3`}>
              <h3 className="text-base font-black text-rose-400">{isBengali ? 'যাতায়াত ব্যবস্থা' : 'Transportation & Access'}</h3>
              <p className={`text-xs leading-relaxed ${sub}`}>
                {isBengali
                  ? 'ঢাকা থেকে সড়ক, রেল ও নদীপথে সরাসরি উন্নত যোগাযোগ ব্যবস্থা রয়েছে।'
                  : 'Accessible via well-connected national expressways, rail networks, and riverine launch vessels.'}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
