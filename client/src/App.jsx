import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import DivisionSubHeader from './components/DivisionSubHeader.jsx';
import NationalHome from './components/NationalHome.jsx';
import DivisionPageView from './components/DivisionPageView.jsx';
import DistrictEncyclopedia from './components/DistrictEncyclopedia.jsx';
import LandmarksView from './components/LandmarksView.jsx';
import TripPlannerView from './components/TripPlannerView.jsx';
import HeritageQuizView from './components/HeritageQuizView.jsx';
import BangladeshGKView from './components/BangladeshGKView.jsx';
import GlobalSearchModal from './components/GlobalSearchModal.jsx';
import DetailModal from './components/DetailModal.jsx';
import { soundEngine } from './utils/audioSynthesis.js';
import initialDivisions from './data/divisions.json';
import initialDistricts from './data/districts.json';
import initialQuizData from './data/quizData.json';
import initialNationalData from './data/national.json';

export default function App() {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [districts, setDistricts] = useState(initialDistricts);
  const [quizData, setQuizData] = useState(initialQuizData);
  const [nationalData, setNationalData] = useState(initialNationalData);
  const [currentDivision, setCurrentDivision] = useState(initialDivisions[0]);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'division' | 'landmarks' | 'districts' | 'gk' | 'planner' | 'quiz'
  const [isNightMode, setIsNightMode] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBengali, setIsBengali] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  useEffect(() => {
    fetch('/api/divisions').then(r => r.json()).then(d => { if (Array.isArray(d)) setDivisions(d); }).catch(() => {});
    fetch('/api/districts').then(r => r.json()).then(d => { if (Array.isArray(d)) setDistricts(d); }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleDayNight = () => {
    setIsNightMode(prev => {
      const next = !prev;
      if (isAudioPlaying) {
        soundEngine.playAmbientMode(next ? 'night' : 'day');
      }
      return next;
    });
  };

  const handleToggleAudio = () => {
    setIsAudioPlaying(prev => {
      const next = !prev;
      if (next) {
        soundEngine.playAmbientMode(isNightMode ? 'night' : 'day');
      } else {
        soundEngine.stopAmbient();
      }
      return next;
    });
  };

  const handleSelectDivision = (div) => {
    setCurrentDivision(div);
    setActiveTab('division');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans ${isNightMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} selection:bg-rose-500 selection:text-white transition-colors duration-500`}>

      {/* 1. Universal Top Floating Capsule Navbar */}
      <Navbar
        isNationalHome={activeTab === 'home'}
        onGoNationalHome={handleGoHome}
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

      {/* 2. Sub-Heading Navigation Bar (Direct 8 Division Links) */}
      <DivisionSubHeader
        divisions={divisions}
        currentDivision={currentDivision}
        onSelectDivision={handleSelectDivision}
        activeTab={activeTab}
        onGoHome={handleGoHome}
        isNightMode={isNightMode}
        isBengali={isBengali}
      />

      {/* 3. Main Page Content View */}
      <main className="w-full">
        {activeTab === 'home' && (
          <NationalHome
            nationalData={nationalData}
            divisions={divisions}
            onSelectDivision={handleSelectDivision}
            isNightMode={isNightMode}
            isBengali={isBengali}
            onNavigateTab={handleSelectTab}
          />
        )}
        {activeTab === 'division' && (
          <DivisionPageView
            division={currentDivision}
            districts={districts}
            isNightMode={isNightMode}
            isBengali={isBengali}
            onOpenDetails={(item) => setSelectedDetailItem(item)}
            onSelectDistrict={(dist) => setSelectedDetailItem(dist)}
            onBack={handleGoHome}
          />
        )}
        {activeTab === 'landmarks' && (
          <div className="pt-24">
            <LandmarksView
              divisions={divisions}
              onSelectLandmark={(l) => setSelectedDetailItem(l)}
              isBengali={isBengali}
              isNightMode={isNightMode}
            />
          </div>
        )}
        {activeTab === 'districts' && (
          <div className="pt-24">
            <DistrictEncyclopedia
              districts={districts}
              divisions={divisions}
              onSelectDistrict={(d) => setSelectedDetailItem(d)}
              isBengali={isBengali}
              isNightMode={isNightMode}
            />
          </div>
        )}
        {activeTab === 'gk' && (
          <BangladeshGKView
            districts={districts}
            divisions={divisions}
            isBengali={isBengali}
            isNightMode={isNightMode}
          />
        )}
        {activeTab === 'planner' && (
          <div className="pt-24">
            <TripPlannerView
              districts={districts}
              divisions={divisions}
              isBengali={isBengali}
              isNightMode={isNightMode}
            />
          </div>
        )}
        {activeTab === 'quiz' && (
          <div className="pt-24">
            <HeritageQuizView
              quizData={quizData}
              isBengali={isBengali}
              isNightMode={isNightMode}
            />
          </div>
        )}
      </main>

      {/* 4. Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        divisions={divisions}
        districts={districts}
        delicacies={[]}
        onSelectDivision={handleSelectDivision}
        onSelectDistrict={(dist) => setSelectedDetailItem(dist)}
        isBengali={isBengali}
      />

      <DetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        isNightMode={isNightMode}
        isBengali={isBengali}
      />
    </div>
  );
}
