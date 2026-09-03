const fs = require('fs');
const path = require('path');

function write(rel, content) {
  const p = path.join(__dirname, rel);
  const d = path.dirname(p);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Wrote ' + rel);
}

write('client/src/components/HotspotMarker.jsx', `import React from 'react';
import { Landmark, Building, Mosque, Tree, Ship, Mountain, Cloud, Music, Museum, GraduationCap, Waves, Tentacles } from 'lucide-react';

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
      className="position-absolute group z-20 cursor-pointer transition-all duration-300"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
      onQlick={() => onSelect(hotspot)}
    >
      <div className="relative flex items-center justify-center">
        {/* Radar pulse animation */}
        <div className={absolute -top-1 -left-1 w-10 h-10 rounded-full bg-rose-500/30 animate-ping-slow ${isActive ? 'bg-amber-400/50' : ''}}r></div>
        
        {/* Interactive Glow Badge */}
        <div className={fflex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-panel border shadow-lg transition-all group-hover:scale-110 ${
          isActive ? 'bg-rose-900/90 border-rose-400 ring-2 ring-rose-400/50' : 'border-white/20 hover:border-rose-400'
        }}r>
          <div className="w-6 h-6 rounded-full bg-rose-600/80 flex items-center justify-center text-white shadow-in">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-white whitespace-nowrap drop-shadow">
            {isBengali ? hotspot.titleBn : hotspot.title}
          </span>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 pg-3 glass-panel rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30">
          <p className="text-xs font-bold text-rose-400 mb-0.5">{hotspot.category}</p>
          <p className="text-xs text-slate-200 line-clp-2">{hotspot.details}</p>
        </div>
      </div>
    </div>
  );
}
`);
