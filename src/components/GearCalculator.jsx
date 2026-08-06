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
    // Simplified NPF Formula: Shutter = (35 * aperture + 30 * pixelPitch) / focalLength
    const maxShutter = ((35 * aperture) + (30 * (pixelPitch || 5.0))) / focalLength;
    return maxShutter.toFixed(1);
  };

  const recommendISO = (bortle) => {
    if (bortle <= 2) return "ISO 3200 - 6400 (Pristine Dark Sky)";
    if (bortle <= 4) return "ISO 1600 - 3200 (Rural Transition)";
    return "ISO 800 - 1600 (Higher ISO causes sky glow oversaturation)";
  };

  const shutter500 = calculate500Rule(selectedLens.focalLength, selectedModel.sensor);
  const shutterNPF = calculateNPFRule(selectedLens.focalLength, selectedLens.maxAperture, selectedModel.pixelPitch);

  return (
    <div className="space-y-6 text-slate-100">
      {/* HEADER & TOGGLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" /> Best Practice Gear & Exposure Engine
          </h2>
          <p className="text-xs text-slate-400">RAG-Curated Astrophotography Parameters for Cameras & Phones</p>
        </div>

        {/* DEVICE SELECTOR TOGGLE */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceType('camera')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              deviceType === 'camera'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" /> Mirrorless / DSLR
          </button>
          <button
            onClick={() => setDeviceType('phone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              deviceType === 'phone'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Smartphone Pro
          </button>
        </div>
      </div>

      {/* DEVICE TYPE = CAMERA */}
      {deviceType === 'camera' ? (
        <div className="space-y-5">
          {/* SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* BRAND */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Camera Brand
              </label>
              <select
                value={selectedBrand.brand}
                onChange={(e) => {
                  const brand = GEAR_DATASET.cameraBrands.find(b => b.brand === e.target.value);
                  setSelectedBrand(brand);
                  setSelectedModel(brand.models[0]);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {GEAR_DATASET.cameraBrands.map(b => (
                  <option key={b.brand} value={b.brand}>{b.brand}</option>
                ))}
              </select>
            </div>

            {/* MODEL */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Camera Model
              </label>
              <select
                value={selectedModel.name}
                onChange={(e) => {
                  const model = selectedBrand.models.find(m => m.name === e.target.value);
                  setSelectedModel(model);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {selectedBrand.models.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.sensor})</option>
                ))}
              </select>
            </div>

            {/* LENS */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Target Lens
              </label>
              <select
                value={selectedLens.name}
                onChange={(e) => {
                  const lens = GEAR_DATASET.lenses.find(l => l.name === e.target.value);
                  setSelectedLens(lens);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {GEAR_DATASET.lenses.map(l => (
                  <option key={l.name} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CALCULATED EXPOSURE RESULTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* NPF RULE (RECOMMENDED) */}
            <div className="glass-card p-4 border-indigo-500/50 bg-indigo-950/30 relative overflow-hidden">
              <span className="absolute top-2 right-2 text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                Most Accurate
              </span>
              <span className="text-xs font-semibold text-indigo-300 block mb-1">NPF Rule Limit</span>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">
                {shutterNPF}s
              </div>
              <p className="text-[11px] text-slate-300">
                Max shutter speed before star trailing based on {selectedModel.pixelPitch}µm pixel pitch & f/{selectedLens.maxAperture}.
              </p>
            </div>

            {/* 500 RULE */}
            <div className="glass-card p-4">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Classic 500-Rule</span>
              <div className="text-3xl font-extrabold font-mono text-slate-200 mb-1">
                {shutter500}s
              </div>
              <p className="text-[11px] text-slate-400">
                Standard rule formula ({selectedLens.focalLength}mm on {selectedModel.sensor}).
              </p>
            </div>

            {/* ISO RECOMMENDATION */}
            <div className="glass-card p-4">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">Recommended ISO</span>
              <div className="text-sm font-bold text-white mb-1 font-mono">
                {recommendISO(bortleScale)}
              </div>
              <p className="text-[11px] text-slate-400">
                Optimized for Bortle {bortleScale} sky with ISO invariance threshold of {selectedModel.isoInvarianceThreshold}.
              </p>
            </div>
          </div>

          {/* BEST PRACTICE FIELD TIPS */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Focus & Field Setup Best Practices
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Set camera to <strong>Manual Exposure (M)</strong> and <strong>Manual Focus (MF)</strong>.</li>
              <li>Use 10x Live View Magnification on a bright star (e.g. Vega or Jupiter) and adjust focus ring until star is pin-point sharp.</li>
              <li>Tape down the focus ring with gaffer tape so focus does not shift in cold night temperatures.</li>
              <li>Set White Balance to <strong>K 3800K - 4200K</strong> for natural dark sky tones.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* DEVICE TYPE = SMARTPHONE */
        <div className="space-y-5">
          {/* PHONE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Operating System
              </label>
              <select
                value={selectedOs.os}
                onChange={(e) => {
                  const os = GEAR_DATASET.smartphones.find(s => s.os === e.target.value);
                  setSelectedOs(os);
                  setSelectedPhone(os.devices[0]);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {GEAR_DATASET.smartphones.map(s => (
                  <option key={s.os} value={s.os}>{s.os}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Smartphone Model (Pro/Max)
              </label>
              <select
                value={selectedPhone.name}
                onChange={(e) => {
                  const phone = selectedOs.devices.find(d => d.name === e.target.value);
                  setSelectedPhone(phone);
                }}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {selectedOs.devices.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PHONE SPEC HIGHLIGHTS */}
          <div className="glass-card p-4 border-indigo-500/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-white text-sm">{selectedPhone.name}</h3>
              <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-md font-mono">
                {selectedPhone.version}
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-1 mb-3">
              <p><strong>Available Lenses:</strong> {selectedPhone.lenses.join(' • ')}</p>
              <p><strong>Max Night Exposure:</strong> <span className="text-emerald-400 font-bold">{selectedPhone.maxNightModeShutter}</span></p>
            </div>

            {/* STEP-BY-STEP NIGHT MODE GUIDE */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Step-by-Step Astrophotography Mode Instructions
              </h4>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
                {selectedPhone.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
