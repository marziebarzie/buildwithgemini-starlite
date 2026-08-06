import React from 'react';
import { Bookmark, Clock, Camera, MapPin, Trash2, Calendar, Sparkles } from 'lucide-react';

export default function SavedSpots({ savedSpots, onDeleteSpot }) {
  if (savedSpots.length === 0) {
    return (
      <div className="glass-card p-8 text-center space-y-3">
        <Bookmark className="w-10 h-10 text-indigo-400 mx-auto opacity-50" />
        <h3 className="text-base font-bold text-white font-heading">No Favorite Dark Sky Spots Saved Yet</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore locations on the interactive map on the left and click <strong>"Save Favorite & Gear Profile"</strong> to record custom shooting settings and timestamps!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex justify-between items-center bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-400" /> Saved Spots & Target Gear Profiles
          </h2>
          <p className="text-xs text-slate-400">Bookmarked Locations with Exact Date, Year & Timestamp Data</p>
        </div>
        <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full font-mono font-bold">
          {savedSpots.length} Saved
        </span>
      </div>

      <div className="space-y-4">
        {savedSpots.map((spot) => (
          <div key={spot.savedId} className="glass-card p-4 space-y-3 border-indigo-500/30 hover:border-indigo-500/60 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border bortle-${spot.bortle} mb-1 inline-block`}>
                  Class {spot.bortle} (SQM {spot.sqm})
                </span>
                <h3 className="text-base font-bold text-white font-heading">{spot.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {spot.region}
                </p>
              </div>

              <button
                onClick={() => onDeleteSpot(spot.savedId)}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg bg-slate-950 hover:bg-rose-950/50 transition"
                title="Remove spot"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* MANDATORY TIMESTAMP DATA */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs font-mono text-indigo-300">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong>Saved Date & Time:</strong> {spot.savedTimestamp}
              </span>
            </div>

            {/* RECOMMENDED GEAR SPEC */}
            <div className="bg-indigo-950/30 p-3 rounded-xl border border-indigo-900/40 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" /> Target Gear Profile:
              </span>
              <p className="text-slate-200">
                <strong>Recommended Setup:</strong> {spot.bortle <= 2 ? 'Full Frame 14mm/20mm f/1.8 @ ISO 3200 (NPF ~13s)' : 'Wide Lens f/2.8 @ ISO 1600'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
