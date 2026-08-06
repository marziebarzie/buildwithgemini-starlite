import React, { useState } from 'react';
import { Camera, Layers, Info, Filter, Sparkles, ExternalLink, User } from 'lucide-react';

export default function PhotoGallery({ locations, selectedLocation }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // AGGREGATE ALL PHOTOS FROM LOCATIONS WITH VALID WORKING SOURCE URLS
  const allPhotos = locations.flatMap(loc =>
    loc.photos.map(p => {
      // Build a clean, guaranteed working Unsplash source URL if missing or malformed
      let cleanSourceUrl = p.sourceUrl;
      if (!cleanSourceUrl || !cleanSourceUrl.startsWith('http')) {
        cleanSourceUrl = `https://unsplash.com/s/photos/${encodeURIComponent(`${p.title} ${p.category}`)}`;
      } else if (cleanSourceUrl.includes('unsplash.com/photos/') && !cleanSourceUrl.includes('photo-') && !cleanSourceUrl.includes('/s/photos/')) {
        // Fix Unsplash photo ID formatting (e.g. photos/1519681393784-d120267933ba -> photos/photo-1519681393784-d120267933ba)
        const photoId = cleanSourceUrl.split('/photos/')[1];
        cleanSourceUrl = `https://unsplash.com/photos/photo-${photoId}`;
      }

      return {
        ...p,
        locationName: loc.name,
        region: loc.region,
        sourceUrl: cleanSourceUrl,
        photographer: p.photographer || 'Community Astrophotographer'
      };
    })
  );

  const categories = ['All', 'Milky Way', 'Northern Lights', 'Deep Sky'];

  const filteredPhotos = allPhotos.filter(p =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <div className="space-y-4 text-slate-100">
      {/* HEADER & CATEGORY FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-sky-400" /> Regional Community Astrophotography Gallery
          </h2>
          <p className="text-[10px] text-slate-400">Curated Shots with EXIF Parameters & Original Photo Sources</p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-sky-500/30 flex-wrap gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                activeCategory === cat
                  ? 'btn-sky-light font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="glass-card overflow-hidden group border-slate-800 hover:border-sky-500/50 transition duration-300 flex flex-col justify-between">
            <div>
              {/* IMAGE CONTAINER */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold bg-slate-950/85 text-sky-300 border border-sky-700/60 rounded backdrop-blur-md">
                  {photo.category}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-mono bg-black/85 text-slate-300 rounded backdrop-blur-md">
                  {photo.locationName}
                </span>
              </div>

              {/* PHOTO DETAILS & EXIF */}
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-xs">{photo.title}</h3>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3 text-sky-400 shrink-0" /> Photo by <strong>{photo.photographer}</strong>
                    </p>
                  </div>

                  {/* LINK TO ORIGINAL SOURCE */}
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] bg-slate-950 hover:bg-sky-950/80 text-sky-300 border border-sky-600/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold transition shrink-0 hover:border-sky-400 shadow"
                    title="Open original high-res photo source on Unsplash"
                  >
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-sky-300 font-bold border-b border-slate-800 pb-1 text-[10px]">
                    <span className="line-clamp-1">📷 {photo.exif.device}</span>
                    <span className="line-clamp-1">🔭 {photo.exif.lens}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-slate-300 text-center font-bold">
                    <span>⏱ {photo.exif.shutter}</span>
                    <span>⭕ {photo.exif.aperture}</span>
                    <span>⚡ {photo.exif.iso}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
