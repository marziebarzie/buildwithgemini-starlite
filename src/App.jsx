import React, { useState } from 'react';
import { Map, Camera, Sliders, Activity, MessageSquare, Bookmark, Bot, Sparkles, Navigation, Moon, Stars } from 'lucide-react';
import { DARK_SKY_LOCATIONS } from './data/astroDataset';
import AstroMap from './components/AstroMap';
import GearCalculator from './components/GearCalculator';
import AuroraForecast from './components/AuroraForecast';
import CommunityNotes from './components/CommunityNotes';
import SavedSpots from './components/SavedSpots';
import PhotoGallery from './components/PhotoGallery';
import AssistantChat from './components/AssistantChat';

export default function App() {
  const [locations, setLocations] = useState(DARK_SKY_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState(DARK_SKY_LOCATIONS[0]);
  const [activeTab, setActiveTab] = useState('gear'); // 'gallery', 'gear', 'aurora', 'notes', 'saved', 'assistant'
  const [savedSpots, setSavedSpots] = useState([]);

  // SAVE SPOT HANDLER WITH MANDATORY DAY/YEAR/TIMESTAMP
  const handleSaveSpot = (loc) => {
    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    const newSaved = {
      ...loc,
      savedId: `saved-${Date.now()}`,
      savedTimestamp: timestamp
    };

    setSavedSpots(prev => [newSaved, ...prev]);
    setActiveTab('saved');
  };

  const handleDeleteSpot = (savedId) => {
    setSavedSpots(prev => prev.filter(s => s.savedId !== savedId));
  };

  return (
    <div className="h-screen w-screen bg-[#030712] text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* APP NAVBAR (PROMINENT H1 "STARLITE" WITH SUBORDINATE SECONDARY INFO) */}
      <header className="bg-slate-950/90 border-b border-slate-800/80 shrink-0 z-50 backdrop-blur-md px-4 py-2">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <Stars className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {/* H1 IS STARLITE */}
                <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wider leading-none">
                  STARLITE
                </h1>
                <span className="text-[10px] font-medium text-sky-300 badge-sky-light px-2 py-0.5 rounded-full font-sans tracking-normal leading-tight border border-sky-500/30">
                  Astrophotography & Northern Lights
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
                Dark Sky Mapping • Camera & Phone Engine • Community Spot Intel
              </p>
            </div>
          </div>

          {/* RIGHT NAVBAR QUICK STATS */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Aurora Index: <strong>Kp 3.5</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Coverage: <strong>100 Dark Sky Spots (NA & Europe)</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT: MAP ON LEFT, BANKED CONTROL TABS ON RIGHT */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* LEFT COLUMN: INTERACTIVE MAP (7 COLS) */}
        <section className="lg:col-span-7 h-full relative flex flex-col min-h-0">
          <AstroMap
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onSaveSpot={handleSaveSpot}
          />
        </section>

        {/* RIGHT COLUMN: BANKED CONTROL TABS (5 COLS) */}
        <section className="lg:col-span-5 h-full flex flex-col glass-panel rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl min-h-0">
          {/* BANKED TABS HEADER */}
          <div className="bg-slate-950/90 border-b border-slate-800 p-2 grid grid-cols-6 gap-1 text-center shrink-0">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition ${
                activeTab === 'gallery'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Regional Photo Gallery"
            >
              <Camera className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('gear')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition ${
                activeTab === 'gear'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Camera vs Phone Best Practice Engine"
            >
              <Sliders className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">Gear</span>
            </button>

            <button
              onClick={() => setActiveTab('aurora')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition ${
                activeTab === 'aurora'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Aurora Forecast & Naked Eye Engine"
            >
              <Activity className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">Aurora</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition ${
                activeTab === 'notes'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Community Field Notes & Spot Intel"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition relative ${
                activeTab === 'saved'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Saved Spots & Timestamps"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">Saved</span>
              {savedSpots.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition ${
                activeTab === 'assistant'
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="AI Field Assistant"
            >
              <Bot className="w-4 h-4" />
              <span className="text-[10px] hidden sm:block">AI Help</span>
            </button>
          </div>

          {/* TAB CONTENT AREA */}
          <div className="p-4 flex-1 min-h-0 overflow-y-auto">
            {activeTab === 'gallery' && (
              <PhotoGallery locations={locations} selectedLocation={selectedLocation} />
            )}
            {activeTab === 'gear' && (
              <GearCalculator selectedLocation={selectedLocation} />
            )}
            {activeTab === 'aurora' && (
              <AuroraForecast />
            )}
            {activeTab === 'notes' && (
              <CommunityNotes selectedLocation={selectedLocation} locations={locations} />
            )}
            {activeTab === 'saved' && (
              <SavedSpots savedSpots={savedSpots} onDeleteSpot={handleDeleteSpot} />
            )}
            {activeTab === 'assistant' && (
              <AssistantChat />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
