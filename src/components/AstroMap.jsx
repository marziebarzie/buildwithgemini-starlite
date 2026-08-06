import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Eye, Wifi, ShieldAlert, Thermometer, Wind, Mountain, BookmarkPlus, Camera, Sparkles, ChevronRight, Search, Filter, X } from 'lucide-react';

// Glitch-Free Leaflet Pin Marker — Static outer container prevents touchpad flicker
const createCustomIcon = (bortle, isSelected) => {
  const colorMap = {
    1: '#8b5cf6', // Violet (Bortle 1)
    2: '#10b981', // Green (Bortle 2)
    3: '#f59e0b', // Yellow (Bortle 3)
    4: '#f97316', // Orange (Bortle 4)
    5: '#ef4444', // Red (Bortle 5)
  };
  const color = colorMap[bortle] || '#ef4444';

  const htmlContent = `
    <div class="pin-wrapper ${isSelected ? 'pin-selected-glow' : ''}" style="width: 36px; height: 46px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="36" height="46">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="${color}" opacity="${isSelected ? '1' : '0.95'}"/>
        <rect x="6" y="6" width="20" height="20" rx="3" fill="#0f172a"/>
        <text x="16" y="20" font-size="11" font-weight="bold" fill="${color}" text-anchor="middle">B${bortle}</text>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: htmlContent,
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -42]
  });
};

// Map Recenter Helper
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom || map.getZoom());
  return null;
}

export default function AstroMap({ locations, selectedLocation, onSelectLocation, onSaveSpot }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All'); // 'All', 'North America', 'Europe', 'Bortle 1', 'Aurora'

  // GEOGRAPHIC BOUNDS CONSTRAINED TO NORTH AMERICA & EUROPE
  const mapBounds = [
    [10.0, -170.0], // South-West (Hawaii, US, Caribbean)
    [78.0, 45.0]    // North-East (Svalbard, Scandinavia, Europe)
  ];

  // FILTERED LOCATIONS
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            loc.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            loc.continent.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (regionFilter === 'North America') return loc.continent === 'North America';
      if (regionFilter === 'Europe') return loc.continent === 'Europe';
      if (regionFilter === 'Bortle 1') return loc.bortle === 1;
      if (regionFilter === 'Aurora') return loc.coordinates[0] >= 60; // 60°N or higher latitude
      return true;
    });
  }, [locations, searchQuery, regionFilter]);

  const currentCenter = selectedLocation ? selectedLocation.coordinates : [50.0, -30.0];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl flex flex-col">
      {/* MAP OVERLAY LAYER 1: SEARCH BAR & REGION CHIPS */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-col sm:flex-row gap-2 pointer-events-none">
        {/* SEARCH INPUT */}
        <div className="relative flex-1 pointer-events-auto">
          <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={`Search across ${locations.length} Dark Sky spots (e.g. Death Valley, Abisko, Banff)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/95 text-white text-xs pl-10 pr-9 h-10 rounded-xl border border-sky-500/40 shadow-xl backdrop-blur-md focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 font-medium transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* REGION FILTER CHIPS */}
        <div className="flex bg-slate-950/95 p-1 rounded-xl border border-sky-500/30 shadow-xl backdrop-blur-md pointer-events-auto gap-1 overflow-x-auto text-[11px] h-10 items-center shrink-0">
          {['All', 'North America', 'Europe', 'Bortle 1', 'Aurora'].map(f => (
            <button
              key={f}
              onClick={() => setRegionFilter(f)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-all duration-150 h-8 flex items-center justify-center ${
                regionFilter === f
                  ? 'btn-sky-light font-bold shadow-md'
                  : 'text-slate-300 hover:text-sky-300 hover:bg-slate-900'
              }`}
            >
              {f === 'All' ? `All (${filteredLocations.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* MAP OVERLAY LAYER 2: BORTLE SCALE LEGEND */}
      <div className="absolute top-16 left-3 z-10 glass-panel p-2.5 rounded-xl border border-sky-500/30 max-w-xs shadow-xl hidden xl:block pointer-events-auto">
        <h3 className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-400" /> Bortle Dark Sky Scale
        </h3>
        <div className="grid grid-cols-5 gap-1 text-[9px] text-center font-bold font-mono">
          <div className="bortle-1 p-1 rounded-sm shadow-sm">B1 Violet</div>
          <div className="bortle-2 p-1 rounded-sm shadow-sm">B2 Green</div>
          <div className="bortle-3 p-1 rounded-sm shadow-sm">B3 Yellow</div>
          <div className="bortle-4 p-1 rounded-sm shadow-sm">B4 Orange</div>
          <div className="bortle-5 p-1 rounded-sm shadow-sm">B5 Red</div>
        </div>
      </div>

      {/* BASEMAP CONTAINER — MIN ZOOM & MAX BOUNDS CONSTRAINED TO US & EUROPE */}
      <MapContainer
        center={currentCenter}
        zoom={3}
        minZoom={3}
        maxZoom={18}
        maxBounds={mapBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <ChangeView center={currentCenter} zoom={selectedLocation ? 6 : 3} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* ZOOM CONTROL ISOLATED IN BOTTOM RIGHT */}
        <ZoomControl position="bottomright" />

        {filteredLocations.map((loc) => {
          const isSelected = selectedLocation && selectedLocation.id === loc.id;
          return (
            <Marker
              key={loc.id}
              position={loc.coordinates}
              icon={createCustomIcon(loc.bortle, isSelected)}
              eventHandlers={{
                click: () => onSelectLocation(loc)
              }}
            >
              <Popup className="material-popup">
                <div className="p-2.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-sm border bortle-${loc.bortle}`}>
                      Bortle {loc.bortle}
                    </span>
                    <span className="text-xs text-sky-300 font-mono">SQM {loc.sqm}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-sm">{loc.name}</h4>
                  <p className="text-xs text-slate-300">{loc.region}</p>
                  <button
                    onClick={() => onSelectLocation(loc)}
                    className="mt-2 w-full text-xs font-semibold btn-sky-light py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
                  >
                    Inspect Spot <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* MAP OVERLAY LAYER 3: MATERIAL DESIGN FLYOUT CARD */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md max-h-[55vh] overflow-y-auto z-20 material-flyout p-5 text-slate-100 transition-all duration-300 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-sm border bortle-${selectedLocation.bortle}`}>
                  Class {selectedLocation.bortle} — {selectedLocation.bortle <= 2 ? 'Pristine Dark Sky' : 'Rural Dark Sky'}
                </span>
                <span className="text-xs badge-sky-light font-mono px-2 py-0.5 rounded-sm font-semibold">
                  SQM {selectedLocation.sqm}
                </span>
              </div>
              <h2 className="text-xl font-bold font-heading text-white">{selectedLocation.name}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" /> {selectedLocation.region} ({selectedLocation.continent})
              </p>
            </div>
            <button
              onClick={() => onSelectLocation(null)}
              className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition shrink-0"
              title="Close flyout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SPOT INTEL GRID */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Wifi className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Cell Signal</span>
                <span className="text-slate-200 font-medium text-[11px] line-clamp-1">{selectedLocation.cellSignal}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Mountain className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Elevation</span>
                <span className="text-slate-200 font-medium text-[11px]">{selectedLocation.elevation}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Thermometer className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Temps</span>
                <span className="text-slate-200 font-medium text-[11px] line-clamp-1">{selectedLocation.seasonalTemps}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Health & Hazards</span>
                <span className="text-slate-200 font-medium text-[11px] line-clamp-1">{selectedLocation.healthConsiderations}</span>
              </div>
            </div>
          </div>

          {/* HORIZON & WEATHER */}
          <div className="bg-sky-950/30 p-3 rounded-xl border border-sky-800/40 text-xs text-sky-200 mb-4 flex items-start gap-2.5">
            <Wind className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sky-300 text-[11px]">Horizon & Local Weather:</span>
              <p className="text-[11px] text-slate-300 leading-snug">{selectedLocation.weatherWarnings} — {selectedLocation.horizonClearance}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button
              onClick={() => onSaveSpot(selectedLocation)}
              className="flex-1 h-11 btn-sky-light font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <BookmarkPlus className="w-4 h-4" /> Save Favorite & Gear Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
