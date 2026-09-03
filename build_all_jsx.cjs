const fs = require('fs');
const path = require('path');

function save(rel, content) {
  const p = path.join(__dirname, 'client', 'src', rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Saved ' + rel);
}

save('App.jsx', import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import NationalHome from './components/NationalHome.jsx';
import PanoramicViewer from './components/PanoramicViewer.jsx';
import DistrictEncyclopedia from './components/DistrictEncyclopedia.jsx';
import CulinaryHeritageView from './components/CulinaryHeritageView.jsx';
import TripPlannerView from './components/TripPlannerView.jsx';
import HeritageQuizView from './components/HeritageQuizView.jsx';
import GlobalSearchModal from './components/GlobalSearchModal.jsx';
import DetailModal from './components/DetailModal.jsx';
import { soundEngine } from './utils/audioSynthesis.js';

import initialDivisions from './data/divisions.json';
import initialDistricts from './data/districts.json';
import initialDelicacies from './data/delicacies.json';
import initialQuizData from './data/quizData.json';
import initialNationalData from './data/national.json';

export default function App() {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [districts, setDistricts] = useState(initialDistricts);
  const [delicacies, setDelicacies] = useState(initialDelicacies);
  const [quizData, setQuizData] = useState(initialQuizData);
  const [nationalData, setNationalData] = useState(initialNationalData);

  const [currentDivision, setCurrentDivision] = useState(initialDivisions[0]);
  const [isNationalHome, setIsNationalHome] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState('panorama');
  const [isNightMode, setIsNightMode] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBengali, setIsBengali] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  useEffect(() => {
    fetch('/api/divisions').then(r => r.json()).then(d => { if (Array.isArray(d)) setDivisions(d); }).catch(() => {});
    fetch('/api/districts').then(r => r.json()).then(d => { if (Array.isArray(d)) setDistricts(d); }).catch(() => {});
    fetch('/api/delicacies').then(r => r.json()).then(d => { if (Array.isArray(d)) setDelicacies(d); }).catch(() => {});
  }, []);

  const handleToggleDayNight = () => {
    const nextMode = !isNightMode;
    setIsNightMode(nextMode);
    if (isAudioPlaying) soundEngine.play(nextMode ? 'night' : 'day');
  };

  const handleToggleAudio = () => {
    const playing = soundEngine.toggle(isNightMode ? 'night' : 'day');
    setIsAudioPlaying(playing);
  };

  const handleSelectDivision = (div) => {
    setCurrentDivision(div);
    setIsNationalHome(false);
    setActiveTab('panorama');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoNationalHome = () => {
    setIsNationalHome(true);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') setIsNationalHome(true);
    else if (tabId === 'panorama') setIsNationalHome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={isNightMode ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-slate-900 text-slate-100'}>
      <Navbar
        divisions={divisions}
        currentDivision={currentDivision}
        onSelectDivision={handleSelectDivision}
        isNationalHome={isNationalHome}
        onGoNationalHome={handleGoNationalHome}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(v => v === 'panorama' ? 'map' : 'panorama')}
        isNightMode={isNightMode}
        onToggleDayNight={handleToggleDayNight}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        isBengali={isBengali}
        onToggleLanguage={() => setIsBengali(b => !b)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />
      <div className= flex w-full>
        {!isNationalHome && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            isBengali={isBengali}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(c => !c)}
          />
        )}
        <main className={!isNationalHome ? (isSidebarCollapsed ? 'flex-1 pl-20 transition-all' : 'flex-1 pl-0 sm:pl-72 transition-all') : 'flex-1 transition-all'}>
          {isNationalHome && (
            <NationalHome
              nationalData={nationalData}
              divisions={divisions}
              onSelectDivision={handleSelectDivision}
              isNightMode={isNightMode}
              isBengali={isBengali}
              onNavigateTab={handleSelectTab}
            />
          )}
          {!isNationalHome && activeTab === 'panorama' && (
            <PanoramicViewer
              division={currentDivision}
              isNightMode={isNightMode}
              isBengali={isBengali}
              viewMode={viewMode}
              onOpenDetails={(item) => setSelectedDetailItem(item)}
              onExploreDistricts={() => setActiveTab('districts')}
            />
          )}
          {activeTab === 'districts' && (
            <DistrictEncyclopedia
              districts={districts}
              divisions={divisions}
              onSelectDistrict={(d) => setSelectedDetailItem(d)}
              isBengali={isBengali}
            />
          )}
          {activeTab === 'delicacies' && (
            <CulinaryHeritageView
              delicacies={delicacies}
              isBengali={isBengali}
            />
          )}
          {activeTab === 'planner' && (
            <TripPlannerView
              districts={districts}
              isBengali={isBengali}
            />
          )}
          {activeTab === 'quiz' && (
            <HeritageQuizView
              quizData={quizData}
              isBengali={isBengali}
            />
          )}
          {activeTab === 'landmarks' && (
            <div className=max-w-7xl mx-auto px-4 py-8 animate-in fade-in>
              <div className=mb-8 text-center max-w-2xl mx-auto>
                <h2 className=text-3xl font-extrabold text-white mb-2>
                  {isBengali ? '???????????? ???????? ???????? ? ???????' : 'Historic Landmarks & Heritage'}
                </h2>
                <p className=text-sm text-slate-300>
                  {isBengali ? '?????????? ???????? ???????? ??????? ? ??????? ????????????' : 'UNESCO World Heritage sites and sacred monuments across Bangladesh.'}
                </p>
              </div>
              <div className=grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6>
                {divisions.map((div) => (
                  <div key={div.id} className=glass-panel rounded-3xl p-5 border border-white/10>
                    <div className=h-40 rounded-2xl overflow-hidden mb-4 relative>
                      <img src={div.dayImage} alt={div.name} className=w-full h-full object-cover />
                      <div className=absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent></div>
                      <h3 className=absolute bottom-3 left-3 text-lg font-bold text-white>{isBengali ? div.nameBn : div.name}</h3>
                    </div>
                    <div className=space-y-2>
                      {div.hotspots?.map((h) => (
                        <div key={h.id} onClick={() => setSelectedDetailItem(h)} className=p-2.5 rounded-xl bg-slate-900/60 hover:bg-rose-600/30 border border-white/5 cursor-pointer flex items-center justify-between transition-all>
                          <span className=text-xs font-semibold text-white>{isBengali ? h.titleBn : h.title}</span>
                          <span className=text-[10px] text-rose-400 font-mono>{h.est}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        divisions={divisions}
        districts={districts}
        delicacies={delicacies}
        onSelectDivision={handleSelectDivision}
        onSelectDistrict={(dist) => setSelectedDetailItem(dist)}
        isBengali={isBengali}
      />
      <DetailModal
        item={selectedDetailItem}
        division={currentDivision}
        onClose={() => setSelectedDetailItem(null)}
        isBengali={isBengali}
      />
    </div>
  );
}
);
