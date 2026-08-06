import React, { useState } from 'react';
import { Eye, Smartphone, Zap, Compass, AlertTriangle, ShieldCheck, Activity, Info } from 'lucide-react';
import { AURORA_VISIBILITY_LEVELS } from '../data/astroDataset';

export default function AuroraForecast() {
  const [currentKp, setCurrentKp] = useState(3.5); // Default Kp = 3.5 (Active)
  const [userLatitude, setUserLatitude] = useState(55); // Default latitude = 55°N

  const getVisibilityStatus = (kp) => {
    if (kp < 2) return AURORA_VISIBILITY_LEVELS[0];
    if (kp < 4) return AURORA_VISIBILITY_LEVELS[1];
    if (kp < 6) return AURORA_VISIBILITY_LEVELS[2];
    if (kp < 8) return AURORA_VISIBILITY_LEVELS[3];
    return AURORA_VISIBILITY_LEVELS[4];
  };

  const status = getVisibilityStatus(currentKp);

  // CALCULATE REQUIRED KP FOR LATITUDE
  const requiredKpForLatitude = (lat) => {
    if (lat >= 66) return { required: 1, desc: "High Arctic — Visible even at quiet Kp 1!" };
    if (lat >= 60) return { required: 2, desc: "Scandinavia / Alaska / North Canada — Visible at Kp 2+" };
    if (lat >= 54) return { required: 4, desc: "Scotland / South Canada / North US — Visible at Kp 4+" };
    if (lat >= 48) return { required: 6, desc: "Central US / Central Europe — Requires G2 Storm (Kp 6+)" };
    return { required: 8, desc: "Mid-Latitudes — Requires Severe Storm (Kp 8+)" };
  };

  const latRequirement = requiredKpForLatitude(userLatitude);

  return (
    <div className="space-y-6 text-slate-100">
      {/* HEADER & KP SIMULATOR */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" /> Northern Lights (Aurora) Real-Time Forecast
            </h2>
            <p className="text-xs text-slate-400">NOAA Space Weather Prediction & Visibility Calculator</p>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Kp Simulator
          </span>
        </div>

        {/* KP SLIDER */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Geomagnetic Activity Index:</span>
            <span className="text-emerald-400 font-mono text-sm font-bold">Kp {currentKp}</span>
          </div>
          <input
            type="range"
            min="0"
            max="9"
            step="0.5"
            value={currentKp}
            onChange={(e) => setCurrentKp(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Kp 0 (Quiet)</span>
            <span>Kp 3 (Unsettled)</span>
            <span>Kp 5 (G1 Storm)</span>
            <span>Kp 7 (G3 Severe)</span>
            <span>Kp 9 (Extreme)</span>
          </div>
        </div>
      </div>

      {/* NAKED EYE VS CAMERA / SCREEN ONLY VISIBILITY BOX */}
      <div className={`glass-card p-5 border ${status.color} bg-slate-900/80 space-y-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Visibility Category</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-950 border border-slate-700 font-mono">
              {status.kp}
            </span>
          </div>
          <h3 className="text-base font-extrabold font-heading text-white">{status.level}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NAKED EYE PERCEPTION */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-4 h-4" /> Human Naked Eye Perception
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {status.nakedEyeText}
            </p>
          </div>

          {/* CAMERA / SCREEN PERCEPTION */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Smartphone className="w-4 h-4" /> Camera / Digital Screen View
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {status.cameraText}
            </p>
          </div>
        </div>
      </div>

      {/* LATITUDE VISIBILITY THRESHOLD CALCULATOR */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-indigo-400" /> Latitude Visibility Threshold Checker
        </h3>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <label className="text-xs text-slate-400 font-semibold shrink-0">Your Latitude (°N):</label>
          <input
            type="number"
            min="30"
            max="75"
            value={userLatitude}
            onChange={(e) => setUserLatitude(parseInt(e.target.value) || 50)}
            className="w-20 bg-slate-900 text-white text-xs font-mono font-bold p-1.5 rounded-lg border border-slate-700 text-center"
          />
          <div className="text-xs text-slate-300 font-medium line-clamp-1">
            {latRequirement.desc}
          </div>
        </div>
      </div>

      {/* EDUCATIONAL GUIDE: WHY AURORA LOOKS DIFFERENT IN PHOTOS VS REAL LIFE */}
      <div className="bg-indigo-950/20 p-4 rounded-2xl border border-indigo-900/40 text-xs text-indigo-200 space-y-2">
        <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-400" /> Why Aurora Looks Different in Photos vs. Real Life
        </h4>
        <p className="leading-relaxed text-slate-300 text-[11px]">
          Human night vision relies on <strong>rod cells</strong> in the eye retina, which prioritize light sensitivity over color perception in low-light environments. At Kp 1–3, auroras appear to naked human eyes as a milky white/greyish fog or arch. Modern digital cameras and smartphone sensors collect light over several seconds (3s–15s long exposure), accumulating enough photon data to reveal rich green nitrogen/oxygen excitation wavelengths on the LCD screen!
        </p>
      </div>
    </div>
  );
}
