import React from 'react';
import { 
  Landmark, Layers, ShieldCheck, Compass, Map, BookOpen, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Sidebar({
  currentDivision,
  activeCategory,
  onSelectCategory,
  activeTab,
  onSelectTab,
  isBengali,
  isCollapsed,
  onToggleCollapse
}) {
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-72';

  const divisionCategories = [
    { id: 'all', label: 'All Monuments', labelBn: 'সকল নিদর্শন', icon: Landmark },
    { id: 'bridges', label: 'Bridges & Engineering', labelBn: 'সেতু ও মেগা স্থাপত্য', icon: Layers },
    { id: 'palaces', label: 'Palaces & Forts', labelBn: 'রাজবাড়ি ও কেল্লা', icon: Landmark },
    { id: 'heritage', label: 'Ancient Mosques & Viharas', labelBn: 'প্রাচীন মসজিদ ও বিহার', icon: ShieldCheck },
    { id: 'nature', label: 'Nature & Landscape', labelBn: 'প্রকৃতি ও পর্যটন', icon: Compass }
  ];

  return (
    <aside className={'fixed left-4 top-20 bottom-6 z-30 flex flex-col glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl transition-all duration-300 ' + sidebarWidth}>
      
      {/* Division Header Card */}
      {!isCollapsed ? (
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900/60 to-slate-900/40 border border-rose-500/20 mb-3 text-center">
          <div className="w-10 h-10 mx-auto rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-black text-sm mb-1.5 shadow-md">
            🏛️
          </div>
          <h2 className="text-base font-extrabold text-white leading-tight">
            {isBengali ? currentDivision?.nameBn : currentDivision?.name} {isBengali ? 'বিভাগ' : 'Division'}
          </h2>
          <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
            {isBengali ? currentDivision?.taglineBn : currentDivision?.tagline}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-white/10 text-[10px] text-slate-400 font-mono">
            <span>{currentDivision?.stats?.districts} {isBengali ? 'জেলা' : 'Districts'}</span>
            <span>•</span>
            <span>{currentDivision?.stats?.population}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 mb-2 font-bold text-rose-400 text-xs">
          {currentDivision?.name?.slice(0, 3)}
        </div>
      )}

      {/* Collapse Toggle Bar */}
      <div className="flex items-center justify-between px-1 mb-2">
        {!isCollapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
            {isBengali ? 'বিভাগীয় নিদর্শন ক্যাটাগরি' : 'Division Categories'}
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Division-Specific Category Filters */}
      <div className="space-y-1 overflow-y-auto no-scrollbar mb-3">
        {divisionCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === 'cityview' && activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectTab('cityview');
                onSelectCategory(cat.id);
              }}
              className={isActive 
                ? 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-rose-600 text-white shadow-md shadow-rose-600/30 text-left'
                : 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-300 hover:bg-slate-800 hover:text-white text-left'}
              title={isBengali ? cat.labelBn : cat.label}
            >
              <Icon className="w-4 h-4 flex-shrink-0 text-rose-400" />
              {!isCollapsed && (
                <span className="truncate">
                  {isBengali ? cat.labelBn : cat.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Global Quick Navigation Links */}
      <div className="pt-2 border-t border-white/10 space-y-1">
        
        <button
          onClick={() => onSelectTab('landmarks')}
          className={activeTab === 'landmarks'
            ? 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-rose-600 text-white shadow-md text-left'
            : 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-300 hover:bg-slate-800 hover:text-white text-left'}
        >
          <Landmark className="w-4 h-4 text-rose-400 flex-shrink-0" />
          {!isCollapsed && <span>{isBengali ? 'সকল ঐতিহাসিক নিদর্শন' : 'All Landmarks'}</span>}
        </button>

        <button
          onClick={() => onSelectTab('districts')}
          className={activeTab === 'districts'
            ? 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-600 text-white shadow-md text-left'
            : 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-300 hover:bg-slate-800 hover:text-white text-left'}
        >
          <Map className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {!isCollapsed && <span>{isBengali ? '৬৪ জেলা এনসাইক্লোপিডিয়া' : '64 Districts Atlas'}</span>}
        </button>

        <button
          onClick={() => onSelectTab('planner')}
          className={activeTab === 'planner'
            ? 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-sky-600 text-white shadow-md text-left'
            : 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-300 hover:bg-slate-800 hover:text-white text-left'}
        >
          <BookOpen className="w-4 h-4 text-sky-400 flex-shrink-0" />
          {!isCollapsed && <span>{isBengali ? 'নিদর্শন ট্যুর প্ল্যানার' : 'Tour Planner'}</span>}
        </button>

        <button
          onClick={() => onSelectTab('quiz')}
          className={activeTab === 'quiz'
            ? 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-purple-600 text-white shadow-md text-left'
            : 'w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-slate-300 hover:bg-slate-800 hover:text-white text-left'}
        >
          <HelpCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
          {!isCollapsed && <span>{isBengali ? 'ঐতিহ্য কুইজ চ্যালেঞ্জ' : 'Heritage Quiz'}</span>}
        </button>

      </div>

      {!isCollapsed && (
        <div className="mt-auto pt-2 text-[10px] text-slate-400 text-center border-t border-white/5">
          <p className="font-semibold text-slate-300">{isBengali ? 'গণপ্রজাতন্ত্রী বাংলাদেশ' : 'Republic of Bangladesh'}</p>
        </div>
      )}

    </aside>
  );
}
