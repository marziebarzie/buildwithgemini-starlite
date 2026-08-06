import React, { useState } from 'react';
import { Camera, Smartphone, Sparkles, Sliders, Info, ShieldCheck, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { GEAR_DATASET } from '../data/astroDataset';

export default function GearCalculator({ selectedLocation }) {
  const [deviceType, setDeviceType] = useState('camera'); // 'camera' or 'phone'

  // CAMERA STATE
  const [selectedBrand, setSelectedBrand] = useState(GEAR_DATASET.cameraBrands[0]);
  const [selectedModel, setSelectedModel] = useState(GEAR_DATASET.cameraBrands[0].models[0]);
  const [selectedLens, setSelectedLens] = useState(GEAR_DATASET.lenses[0]);
  const [bortleScale, setBortleScale] = useState(selectedLocation ? selectedLocation.bortle : 2);

  // PHONE STATE
  const [selectedOs, setSelectedOs] = useState(GEAR_DATASET.smartphones[0]);
  const [selectedPhone, setSelectedPhone] = useState(GEAR_DATASET.smartphones[0].devices[0]);

  // NPF & 500 RULE CALCULATIONS FOR CAMERA
  const calculate500Rule = (focalLength, sensorType) => {
    const cropFactor = sensorType.includes('APS-C') ? 1.5 : sensorType.includes('Micro 4/3') ? 2.0 : 1.0;
    return (500 / (focalLength * cropFactor)).toFixed(1);
  };

  const calculateNPFRule = (focalLength, aperture, pixelPitch) => {
    const maxShutter = ((35 * aperture) + (30 * (pixelPitch || 5.0))) / focalLength;
    return maxShutter.toFixed(1);
  };

  const recommendISO = (bortle) => {
    if (bortle <= 2) return "ISO 3200 - 6400 (Pristine Dark)";
    if (bortle <= 4) return "ISO 1600 - 3200 (Rural Sky)";
    return "ISO 800 - 1600 (City Sky Glow)";
  };

  const shutter500 = calculate500Rule(selectedLens.focalLength, selectedModel.sensor);
  const shutterNPF = calculateNPFRule(selectedLens.focalLength, selectedLens.maxAperture, selectedModel.pixelPitch);

  return (
    <div className="space-y-3 text-slate-100 h-full flex flex-col justify-between">
      {/* HEADER & TOGGLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shrink-0">
        <div>
          <h2 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" /> Best Practice Gear & Exposure Engine
          </h2>
          <p className="text-[10px] text-slate-400">Curated Astrophotography Parameters for Cameras & Phones</p>
        </div>

        {/* DEVICE SELECTOR TOGGLE */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceType('camera')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              deviceType === 'camera'
                ? 'btn-sky-light text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Camera
          </button>
          <button
            onClick={() => setDeviceType('phone')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              deviceType === 'phone'
                ? 'btn-sky-light text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Phone Pro
          </button>
        </div>
      </div>

      {/* DEVICE TYPE = CAMERA */}
      {deviceType === 'camera' ? (
        <div className="space-y-2.5 flex-1 flex flex-col justify-between">
          {/* SELECTION GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* BRAND */}
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Camera Brand
              </label>
              <select
                value={selectedBrand.brand}
                onChange={(e) => {
                  const brand = GEAR_DATASET.cameraBrands.find(b => b.brand === e.target.value);
                  setSelectedBrand(brand);
                  setSelectedModel(brand.models[0]);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-400 font-medium"
              >
                {GEAR_DATASET.cameraBrands.map(b => (
                  <option key={b.brand} value={b.brand}>{b.brand}</option>
                ))}
              </select>
            </div>

            {/* MODEL */}
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Camera Model
              </label>
              <select
                value={selectedModel.name}
                onChange={(e) => {
                  const model = selectedBrand.models.find(m => m.name === e.target.value);
                  setSelectedModel(model);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-400 font-medium"
              >
                {selectedBrand.models.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.sensor})</option>
                ))}
              </select>
            </div>

            {/* LENS */}
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Target Lens
              </label>
              <select
                value={selectedLens.name}
                onChange={(e) => {
                  const lens = GEAR_DATASET.lenses.find(l => l.name === e.target.value);
                  setSelectedLens(lens);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-400 font-medium"
              >
                {GEAR_DATASET.lenses.map(l => (
                  <option key={l.name} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CALCULATED EXPOSURE RESULTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* NPF RULE (RECOMMENDED) */}
            <div className="glass-card p-3 border-sky-500/50 bg-sky-950/30 relative overflow-hidden">
              <span className="absolute top-1.5 right-2 text-[9px] bg-sky-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">
                NPF Limit
              </span>
              <span className="text-[11px] font-semibold text-sky-300 block mb-0.5">NPF Shutter Limit</span>
              <div className="text-2xl font-extrabold font-mono text-white mb-0.5">
                {shutterNPF}s
              </div>
              <p className="text-[10px] text-slate-300 leading-tight">
                Max shutter speed before star trailing ({selectedModel.pixelPitch}µm pitch & f/{selectedLens.maxAperture}).
              </p>
            </div>

            {/* 500 RULE */}
            <div className="glass-card p-3">
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Classic 500-Rule</span>
              <div className="text-2xl font-extrabold font-mono text-slate-200 mb-0.5">
                {shutter500}s
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Standard rule formula ({selectedLens.focalLength}mm on {selectedModel.sensor}).
              </p>
            </div>

            {/* ISO RECOMMENDATION */}
            <div className="glass-card p-3">
              <span className="text-[11px] font-semibold text-emerald-400 block mb-0.5">Recommended ISO</span>
              <div className="text-xs font-bold text-white mb-0.5 font-mono">
                {recommendISO(bortleScale)}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Bortle {bortleScale} sky with ISO invariance threshold of {selectedModel.isoInvarianceThreshold}.
              </p>
            </div>
          </div>

          {/* BEST PRACTICE FIELD TIPS */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <h4 className="text-[11px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Focus & Field Setup Best Practices
            </h4>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>Set camera to <strong>Manual Exposure (M)</strong> and <strong>Manual Focus (MF)</strong>.</li>
              <li>Use 10x Live View Magnification on Jupiter or a bright star to focus to a pinpoint.</li>
              <li>Tape the focus ring down with gaffer tape so cold weather does not shift focus.</li>
              <li>Set White Balance to <strong>K 3800K - 4200K</strong> for natural dark sky tones.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* DEVICE TYPE = SMARTPHONE */
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* PHONE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Operating System
              </label>
              <select
                value={selectedOs.os}
                onChange={(e) => {
                  const os = GEAR_DATASET.smartphones.find(s => s.os === e.target.value);
                  setSelectedOs(os);
                  setSelectedPhone(os.devices[0]);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-400 font-medium"
              >
                {GEAR_DATASET.smartphones.map(s => (
                  <option key={s.os} value={s.os}>{s.os}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Smartphone Model (Pro/Max)
              </label>
              <select
                value={selectedPhone.name}
                onChange={(e) => {
                  const phone = selectedOs.devices.find(d => d.name === e.target.value);
                  setSelectedPhone(phone);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-400 font-medium"
              >
                {selectedOs.devices.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PHONE SPEC HIGHLIGHTS */}
          <div className="glass-card p-3 border-sky-500/30">
            <div className="flex justify-between items-center mb-1.5">
              <h3 className="font-bold text-white text-xs">{selectedPhone.name}</h3>
              <span className="text-[10px] badge-sky-light px-2 py-0.5 rounded font-mono font-semibold">
                {selectedPhone.version}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-0.5 mb-2">
              <p><strong>Lenses:</strong> {selectedPhone.lenses.join(' • ')}</p>
              <p><strong>Max Shutter:</strong> <span className="text-emerald-400 font-bold">{selectedPhone.maxNightModeShutter}</span></p>
            </div>

            {/* STEP-BY-STEP NIGHT MODE GUIDE */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Astrophotography Setup Guide
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                {selectedPhone.guide}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
