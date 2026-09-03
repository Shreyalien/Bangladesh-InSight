import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import HotspotMarker from './HotspotMarker.jsx';
import InspectorCard from './InspectorCard.jsx';
import BottomCarousel from './BottomCarousel.jsx';

export default function PanoramicViewer({
  division,
  activeCategory = 'all',
  isNightMode,
  isBengali,
  onOpenDetails
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedHotspot, setSelectedHotspot] = useState(division?.hotspots?.[0] || null);

  const containerRef = useRef(null);

  useEffect(() => {
    if (division?.hotspots?.length) {
      setSelectedHotspot(division.hotspots[0]);
    }
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [division]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.7));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const currentImage = isNightMode 
    ? (division?.nightImage || division?.dayImage) 
    : division?.dayImage;

  const filteredHotspots = (division?.hotspots || []).filter(h => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'bridges') return h.category?.toLowerCase().includes('transport') || h.category?.toLowerCase().includes('bridge');
    if (activeCategory === 'palaces') return h.category?.toLowerCase().includes('heritage') || h.category?.toLowerCase().includes('palace') || h.category?.toLowerCase().includes('fort');
    if (activeCategory === 'heritage') return h.category?.toLowerCase().includes('archaeology') || h.category?.toLowerCase().includes('religion') || h.category?.toLowerCase().includes('mosque') || h.category?.toLowerCase().includes('temple');
    if (activeCategory === 'nature') return h.category?.toLowerCase().includes('nature') || h.category?.toLowerCase().includes('forest') || h.category?.toLowerCase().includes('park') || h.category?.toLowerCase().includes('beach');
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] overflow-hidden bg-slate-950 select-none">
      
      {/* City View Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={isDragging ? 'w-full h-full relative overflow-hidden cursor-grabbing' : 'w-full h-full relative overflow-hidden cursor-grab'}
      >
        <div
          className="w-full h-full absolute inset-0 transition-transform duration-100 ease-out will-change-transform flex items-center justify-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={currentImage}
            alt={division?.name}
            className="w-full h-full object-cover min-w-[1000px] min-h-[600px] pointer-events-none transition-all duration-700"
          />

          {/* Night Moon Halo Effect */}
          {isNightMode && (
            <div className="absolute top-[8%] right-[18%] w-16 h-16 rounded-full bg-amber-100/20 blur-xl pointer-events-none animate-pulse"></div>
          )}

          {/* Interactive Hotspots */}
          {filteredHotspots.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              isActive={selectedHotspot?.id === hotspot.id}
              onSelect={(h) => setSelectedHotspot(h)}
              isBengali={isBengali}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>
      </div>

      {/* Top Left Title Card */}
      <div className="absolute top-4 left-4 sm:left-20 lg:left-80 z-20 pointer-events-auto">
        <div className="glass-panel rounded-2xl p-3.5 shadow-2xl border border-white/15 max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-rose-600/90 text-white shadow-sm">
              {isBengali ? (isNightMode ? '🌙 রাতের সিটি ভিউ' : '☀️ দিনের সিটি ভিউ') : (isNightMode ? '🌙 Night City View' : '☀️ Day City View')}
            </span>
            <span className="text-xs text-slate-300 font-mono">
              {filteredHotspots.length} {isBengali ? 'টি নিদর্শন' : 'Landmarks'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isBengali ? division?.nameBn : division?.name} {isBengali ? 'বিভাগ' : 'Division'}
          </h2>
          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
            {isBengali ? division?.taglineBn : division?.tagline}
          </p>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 pointer-events-auto">
        <div className="glass-panel rounded-2xl p-1.5 flex flex-col space-y-1 shadow-xl border border-white/15">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-white transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-white transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-white transition-all"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Floating Inspector Card */}
      <div className="absolute top-20 right-4 z-20 hidden lg:block pointer-events-auto max-h-[calc(100vh-16rem)] overflow-y-auto">
        <InspectorCard
          hotspot={selectedHotspot}
          division={division}
          onOpenDetails={onOpenDetails}
          isBengali={isBengali}
        />
      </div>

      {/* Bottom Places Carousel */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-20 lg:left-80 lg:right-96 z-20 pointer-events-auto">
        <BottomCarousel
          places={division?.iconicPlaces || []}
          activePlaceId={selectedHotspot?.id}
          onSelect={(place) => {
            const found = division?.hotspots?.find(h => h.id === place.id);
            if (found) setSelectedHotspot(found);
          }}
          isBengali={isBengali}
          divisionImage={currentImage}
        />
      </div>

    </div>
  );
}
