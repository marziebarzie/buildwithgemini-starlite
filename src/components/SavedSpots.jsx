import React from 'react';
import { Bookmark, Clock, Camera, MapPin, Trash2, Calendar, Sparkles } from 'lucide-react';

export default function SavedSpots({ savedSpots, onDeleteSpot }) {
  if (savedSpots.length === 0) {
    return (
      <div className="glass-card p-6 text-center space-y-2.5">
        <Bookmark className="w-8 h-8 text-sky-400 mx-auto opacity-60" />
        <h3 className="text-sm font-bold text-white font-heading">No Favorite Dark Sky Spots Saved Yet</h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
          Explore locations on the interactive map on the left and click <strong>"Save Favorite & Gear Profile"</strong> to record custom shooting settings and timestamp data!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 text-slate-100 h-full flex flex-col justify-between overflow-hidden no-scrollbar">
      <div className="flex justify-between items-center bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shrink-0">
        <div>
          <h2 className="text-xs font-bold font-heading text-white flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-sky-400" /> Saved Favorites & Gear Profiles
          </h2>
          <p className="text-[10px] text-slate-400">Locations with Mandatory Day, Year & Timestamp Records</p>
        </div>
        <span className="text-[10px] badge-sky-light px-2.5 py-0.5 rounded font-mono font-bold">
          {savedSpots.length} Saved
        </span>
      </div>

      <div className="space-y-2 flex-1 min-h-0 overflow-y-auto no-scrollbar">
        {savedSpots.map((spot) => (
          <div key={spot.savedId} className="glass-card p-2.5 space-y-1.5 border-sky-500/30 hover:border-sky-500/60 transition">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded border bortle-${spot.bortle}`}>
                    Class {spot.bortle} (SQM {spot.sqm})
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-sky-400" /> {spot.region}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white font-heading">{spot.name}</h3>
              </div>

              <button
                onClick={() => onDeleteSpot(spot.savedId)}
                className="text-slate-400 hover:text-rose-400 p-1 rounded-lg bg-slate-950 hover:bg-rose-950/50 transition shrink-0"
                title="Remove spot"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* MANDATORY TIMESTAMP DATA */}
            <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-sky-300">
              <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="line-clamp-1">
                <strong>Saved:</strong> {spot.savedTimestamp}
              </span>
            </div>

            {/* RECOMMENDED GEAR SPEC */}
            <div className="bg-sky-950/30 p-1.5 rounded-lg border border-sky-900/40 text-[10px] space-y-0.5">
              <span className="font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                <Camera className="w-3 h-3" /> Target Gear Profile:
              </span>
              <p className="text-slate-200 leading-tight">
                {spot.bortle <= 2 ? 'Full Frame 14mm/20mm f/1.8 @ ISO 3200 (NPF ~13s shutter)' : 'Wide Lens f/2.8 @ ISO 1600'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
