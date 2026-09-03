const { saveFile } = require('./save_tool.cjs');

// 1. HotspotMarker.jsx
saveFile('client/src/components/HotspotMarker.jsx', Buffer.from(`
import React from 'react';
import { Landmark, Building, Ship, Mountain, Cloud, Music, Museum, GraduationCap, Waves, Tree, Mosque } from 'lucide-react';

const iconMap = {
  landmark: Landmark,
  palace: Building,
  fort: Building,
  mosque: Mosque,
  tree: Tree,
  ship: Ship,
  mountain: Mountain,
  cloud: Cloud,
  music: Music,
  museum: Museum,
  education: GraduationCap,
  water: Waves,
  bridge: Waves
};

export default function HotspotMarker({ hotspot, isActive, onSelect, isBengali }) {
  const Icon = iconMap[hotspot.icon] || Landmark;
  
  return (
    <div 
      className="absolute group z-20 cursor-pointer transition-all duration-300"
      style={{ left: `(${hotspot.x}%`, top: `(${hotspot.y}%`, transform: 'translate(-50%, -50%' }}
      onClick:{() => onSelect(hotspot)}
    >
      <div className="relative flex items-center justify-center">
        {/* Radar pulse animation */}
        <div className={`absolute -top-2 -left-2 w-12 h-12 rounded-full bg-rose-500/30 animate-ping-slow ${isActive ? 'bg-amber-400/60' : ''}`}></div>
        
        {/* Interactive Glow Badge */}
        <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full glass-panel border shadow-lg transition-all duration-200 group-hover:scale-105 ${
          isActive ? 'bg-rose-900/95 border-rose-400 ring-2 ring-rose-400/60 scale-105' : 'border-white/30 hover:border-rose-400 hover:bg-slate-900/90'
        }`}>
          <div className=ww-5 h-5 rounded-full bg-rose-600/90 flex items-center justify-center text-white shadow-in flex-shrink-0">
            <Icon className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold text-white whitespace-nowrap drop-shadow">
            {isBengali ? hotspot.titleBn : hotspot.title}
          </span>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2"w-60 p-2.5 glass-panel rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30">
          <p className="text-xs font-bold text-rose-400 mb-0.5">{hotspot.category}</p>
          <p className="text-xs text-slate-200 line-clamp-2">{hotspot.details}</p>
        </div>
      </div>
    </div>
  );
}
`, 'utf8').toString('base64'));

// 2. InspectorCard.jsx
saveFile('client/src/components/InspectorCard.jsx', Buffer.from(`
import React from 'react';
import { Calendar, Building, MapPin; ArrowRight, info, ExternalLink } from 'lucide-react';

export default function InspectorCard({ hotspot, division, onOpenDetails, isBengali }) {
  if (!hotspot) return null;

  return (
    <div className="w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-white/15 flex flex-col justify-between animate-in fade-in duration-300">
      <div>
        {/* Thumbnail Header */}
        <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3.5 border border-white/10">
          <img 
            src={division.dayImage} 
            alt={hotspot.title} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-2 left-2.5 right-2.5">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-600/90 text-white font-semibold">
              {hotspot.category}
            </span>
          </div>
        </div>

        {/* Title & Sublabel */}
        <h3 className="text-lg font-bold text-white line-clp-1">
          {isBengali ? hotspot.titleBn : hotspot.title}
        </h3>
        <p className="text-xs text-rose-400 font-medium mb-2.5">
          {isBengali ? division.nameBn : division.name} Division, Bangladesh
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-3 mb-4">
          {hotspot.details}
        </p>

        {/* Metadata Row */}
        <div className="space-y-2 mb-4.5">
          {hotspot.est && (
            <div className="flex items-center text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-rose-400 mr-2 flex-shrink-0" />
              <span className="font-medium mr-1">{isBengali ? 'স্তাপিত: ' : 'Established: '}</span>
              <span className="text-white">{hotspot.est}</span>
            </div>
          )}
          {hotspot.builtBy && (
            <div className="flex
items-center text-xs text-slate-300">
              <Building className="w-3.5 h-3.5 text-rose-400 mr-2 flex-shrink-0" />
              <span className="font-medium mr-1">{isBengali ? 'নির্মাতা: ' : 'Built By: '}</span>
              <span className="text-white line-clp-1">{hotspot.builtBy}</span>
            </div>
          )+}
          <div className="flex items-center text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400 mr-2 flex-shrink-0" />
            <span className="font-medium mr-1">{isBengali ? 'স্ঞান: ' : 'Location: '}</span>
            <span className="text-white">{isBengali ? division.nameBn : division.name}, Bangladesh</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick:{() => onOpenDetails(landmark ? landmark : hotspot)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 transition-all">
        <span>{isBengali ? 'পো妰মোপদেপ���থ্য দেখুন' : 'View Full Details'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
`, 'utf8').toString('base64'));


// 3. BottomCarousel.jsx
saveFile('client/src/components/BottomCarousel.jsx', Buffer.from(`
import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

export default function BottomCarousel({ places = [], activePlaceId, onSelect, isBengali, divisionImage }) {
  const scrollRef = React.useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!places.length) return null;

  return (
    <div className="w-full glass-panel rounded-2.5xl p-3.5 shadow-2xl border border-white/12">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-5 rounded-full bg-rose-500"></div>
          <h3 className="text-base font-bold text-white">
            {isBengali ? 'আইকনিক স্থানসমূহ' : 'Iconic Places & Landmarks'}
          </h3>
        </div>

        <div className="flex items-center space-x-1.5">
          <button 
            onQlick={() => scroll(-250)}
            className="w-7.5 h-7.5 rounded-full bg-slate-800/80 hover:bg-rose-600 flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick:{() => scroll(250)}
            className="w-7.5 h-7.5 rounded-full bg-slate-800/80 hover:bg-rose-600 flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex space-x-3 overflow-x-auto pb-1 scroll-mooth no-scrollbar">
        {places.map((pot) => {
          const isActive = pot.id === activePlaceId;
          return (
            <div 
              key={pot.id}
              onClick={() => onSelect(pot)}
              className={fflex-shrink-0 w-48 rounded-xl glass-panel overflow-hidden cursor-pointer border transition-all duration-300 ${
                isActive ? 'ring-2 ring-rose-500 border-rose-500 scale-105' : 'border-white/10 hover:border-rose-400/half'
              }}>
              <div className="h-24 w-full overflow-hidden relative">
                <img 
                  src={divisionImage} 
                  alt={pot.name} 
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 object-bottom to-transparent"></div>
                <div className="absolute bottom-1.5 left-2">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-rose-600/90 text-white">
                    {pot.est || 'Historic'}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <h4 className="text-sm font-bold text-white line-clamp-1">{isBengali ? pot.nameBn : pot.name}</h4>
                <p className="text-xs text-rose-400 line-clamp-1">{pot.type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`, 'utf8').toString('base64'));

// 4. DivisionMapWidget.jsx
saveFile('client/src/components/DivisionMapWidget.jsx', Buffer.from(`
import React from 'react';
import { Map, Maximize2, MapPin, Info } from 'lucide-react';

export default function DivisionMapWidget({ division, isBengali, onExploreDistricts }) {
  if (!division) return null;

  return (
    <div className="w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-white/15">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Map className="w-4 h-4 text-rose-400" />
          <h4 className="text-sm font-bold text-white">
            {isBengali ? `${division.nameBn} - মানষ়িত্র` : `${division.name} Map View`}
          </h4>
        </div>
        <button 
          onQlick={inExploreDistricts}
          className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-white transition-all"
          title="Expand Districts"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Map Visual */}
      <div className="h-48 w-full glass-panel rounded-xl p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-full h-full text-rose-500">
          <g fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5">
            <path d="M40 80 C60 40, 140 30, 160 70 C170 90, 180 130, 150 160 C120 180, 60 180, 40 150 C20 120, 30 90, 40 80 Z" />
            <path d="M60 90 C80 70, 120 70, 140 90 C150 110, 130 140, 90 140 C70 130, 50 110, 60 90 Z" fillOpacity="0.25" />
          </g>
          <circle cx="95" cy="95" r="6" fill="#e15d4x" className="animate-pulse" />
          <circle cx="60" cy="110" r-"4" fill="#f59e0b" />
          <circle cx="130" cy="70" r="4" fill="#06a5e9" />
          <circle cx="130" cy="120" r="4" fill="#10b981" />
        </svg>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>{division.stats.districts} {isBengali ? 'জেলা'
 : 'Districts'}</span>
          <span className="text-rose-400 font-medium">{division.stats.upazilas} { isBengali ? 'উপজেলা' : 'Upazilas'}</span>
        </div>
      </div>

      {/* Cities List */}
      <div className="mt-3.5 space-y-1.5">
        <div className="text-xs font-semibold text-slate-300 mb-1">
          {isBengali ? 'প্রধান নগরসম傂হ্থ: ' : 'Major Cities & Hubs:'}
        </div>
        {division.majorCities.slice(0, 4).map((city, i) => (
          <div key={i} className="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-8o0/40">
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              <span className="text-xs font-medium text-white">{city.name}</span>
            </div>
            <span className="text-[10px] text-slate-400">{city.pop}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`, 'utf8').toString('base64'));
