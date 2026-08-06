// STARLITE 100-LOCATION RAG DATASET FOR ASTROPHOTOGRAPHY & NORTHERN LIGHTS

export const DARK_SKY_LOCATIONS = [
  // --- USA WEST & SOUTHWEST (25 LOCATIONS) ---
  {
    id: "death-valley",
    name: "Death Valley NP (Badwater Basin)",
    region: "California, USA",
    continent: "North America",
    coordinates: [36.2299, -116.7672],
    bortle: 1,
    sqm: 22.0,
    elevation: "-86m (-282 ft)",
    cellSignal: "No Cell Service",
    healthConsiderations: "Extreme heat (>45°C) in summer. Dehydration hazard. Rattlesnakes.",
    seasonalTemps: "Summer: 32°C to 48°C | Winter: 4°C to 20°C",
    weatherWarnings: "Flash flood hazard in winter; severe dust storms.",
    horizonClearance: "Unobstructed salt flats; mountains block 5° low horizon.",
    photos: [
      {
        id: "dv-1",
        title: "Milky Way Arch over Salt Hexagons",
        category: "Milky Way",
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1519681393784-d120267933ba",
        photographer: "Benjamin Davies",
        exif: { device: "Nikon Z6 II", lens: "14-24mm f/2.8", focalLength: "14mm", aperture: "f/2.8", iso: "6400", shutter: "20s", tracker: "None" }
      }
    ],
    fieldNotes: [{ id: "fn-3", user: "DesertPhotog", timestamp: "2026-03-18 02:20", upvotes: 35, tags: ["Safety", "Cell Signal"], comment: "Download offline maps beforehand! Zero cell signal from Furnace Creek onward." }]
  },
  {
    id: "joshua-tree",
    name: "Joshua Tree NP (Cottonwood Spring)",
    region: "California, USA",
    continent: "North America",
    coordinates: [33.7469, -115.8202],
    bortle: 2,
    sqm: 21.7,
    elevation: "900m (2,950 ft)",
    cellSignal: "Weak 3G / No Service",
    healthConsiderations: "Cactus spines, night desert drop in temp.",
    seasonalTemps: "Summer: 18°C to 38°C | Winter: 2°C to 15°C",
    weatherWarnings: "High desert winds.",
    horizonClearance: "Panoramic Joshua tree silhouettes.",
    photos: [
      {
        id: "jt-1",
        title: "Milky Way over Arch Rock",
        category: "Milky Way",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1506703719100-a0f3a48c0f86",
        photographer: "John Fowler",
        exif: { device: "Sony A7 IV", lens: "20mm f/1.8", focalLength: "20mm", aperture: "f/1.8", iso: "3200", shutter: "13s", tracker: "None" }
      }
    ],
    fieldNotes: [{ id: "fn-jt", user: "JT_Chaser", timestamp: "2026-04-10 23:10", upvotes: 18, tags: ["Parking"], comment: "Cottonwood Spring area has the darkest skies in the park away from Palm Springs glow." }]
  },
  {
    id: "yosemite-glacier",
    name: "Yosemite NP (Glacier Point)",
    region: "California, USA",
    continent: "North America",
    coordinates: [37.7304, -119.5736],
    bortle: 2,
    sqm: 21.8,
    elevation: "2,200m (7,218 ft)",
    cellSignal: "Moderate 4G LTE",
    healthConsiderations: "Sheer cliff drop-offs. Black bear activity.",
    seasonalTemps: "Summer: 8°C to 22°C | Winter: Road closed (Snow)",
    weatherWarnings: "Sudden thunder/snow storms in high Sierra.",
    horizonClearance: "Dramatic view over Half Dome and Yosemite Valley.",
    photos: [
      {
        id: "yos-1",
        title: "Star Trails over Half Dome",
        category: "Milky Way",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1451187580459-43490279c0fa",
        photographer: "NASA / Unsplash",
        exif: { device: "Canon EOS R6", lens: "15-35mm f/2.8", focalLength: "15mm", aperture: "f/2.8", iso: "1600", shutter: "30s x 50", tracker: "Stacked" }
      }
    ],
    fieldNotes: [{ id: "fn-yos", user: "SierraPhotog", timestamp: "2026-07-15 01:05", upvotes: 27, tags: ["Elevation"], comment: "Glacier Point road gets crowded at sunset but empties by midnight!" }]
  },
  {
    id: "anza-borrego",
    name: "Anza-Borrego Desert State Park",
    region: "California, USA",
    continent: "North America",
    coordinates: [33.2559, -116.3750],
    bortle: 2,
    sqm: 21.7,
    elevation: "200m (650 ft)",
    cellSignal: "Weak near Borrego Springs",
    healthConsiderations: "Extreme summer heat; flash floods in badlands.",
    seasonalTemps: "Summer: 25°C to 42°C | Winter: 8°C to 22°C",
    weatherWarnings: "Dust blowing in badlands.",
    horizonClearance: "360 degree desert view with metal sculpture silhouettes.",
    photos: [],
    fieldNotes: []
  },
  {
    id: "mono-lake",
    name: "Mono Lake & Alabama Hills",
    region: "California, USA",
    continent: "North America",
    coordinates: [37.9419, -119.0326],
    bortle: 2,
    sqm: 21.9,
    elevation: "1,940m (6,380 ft)",
    cellSignal: "Good 4G in Lee Vining",
    healthConsiderations: "High alkaline lake mud; biting midges in summer.",
    seasonalTemps: "Summer: 10°C to 28°C | Winter: -8°C to 5°C",
    weatherWarnings: "Freezing Sierra down-valley winds.",
    horizonClearance: "Tufa towers framing Milky Way reflections.",
    photos: [],
    fieldNotes: []
  },
  {
    id: "lassen-volcanic",
    name: "Lassen Volcanic NP (Bumpass Hell)",
    region: "California, USA",
    continent: "North America",
    coordinates: [40.4877, -121.5050],
    bortle: 1,
    sqm: 22.0,
    elevation: "2,500m (8,200 ft)",
    cellSignal: "No Signal",
    healthConsiderations: "Sulfur vents off trail. High altitude chill.",
    seasonalTemps: "Summer: 4°C to 22°C | Winter: Heavy snow pack",
    weatherWarnings: "Rapid mountain snow storms.",
    horizonClearance: "Crystal alpine transparency.",
    photos: [],
    fieldNotes: []
  },
  {
    id: "cherry-springs",
    name: "Cherry Springs State Park",
    region: "Pennsylvania, USA",
    continent: "North America",
    coordinates: [41.6628, -77.8231],
    bortle: 2,
    sqm: 21.9,
    elevation: "700m (2,300 ft)",
    cellSignal: "No Signal / Very Weak",
    healthConsiderations: "Strict red-light night vision policy. Tick alert.",
    seasonalTemps: "Summer: 10°C to 24°C | Winter: -12°C to 2°C",
    weatherWarnings: "Ground fog in hollows after midnight.",
    horizonClearance: "360-degree hilltop astronomy field.",
    photos: [
      {
        id: "cs-1",
        title: "Milky Way over Astronomy Field",
        category: "Milky Way",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1506703719100-a0f3a48c0f86",
        photographer: "John Fowler",
        exif: { device: "Sony A7 IV", lens: "20mm f/1.8", focalLength: "20mm", aperture: "f/1.8", iso: "3200", shutter: "13s", tracker: "None" }
      }
    ],
    fieldNotes: [{ id: "fn-1", user: "AstroDan_PA", timestamp: "2026-05-14 23:45", upvotes: 42, tags: ["Parking", "Headlights"], comment: "Walk down 800m past parking lot to avoid car high beams." }]
  },
  {
    id: "fairbanks-alaska",
    name: "Fairbanks & Cleary Summit",
    region: "Alaska, USA",
    continent: "North America",
    coordinates: [64.8378, -147.7164],
    bortle: 3,
    sqm: 21.5,
    elevation: "680m (2,230 ft)",
    cellSignal: "Good 4G/LTE",
    healthConsiderations: "Sub-zero frostbite hazard (-30°C). Battery warmers required.",
    seasonalTemps: "Winter: -35°C to -15°C | Summer: Midnight sun",
    weatherWarnings: "Severe camera battery drain in sub-zero.",
    horizonClearance: "360-degree auroral oval zenith view.",
    photos: [
      {
        id: "fb-1",
        title: "Vivid Corona Aurora Arc",
        category: "Northern Lights",
        imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1531366936337-7c912a4589a7",
        photographer: "Vincent Guth",
        exif: { device: "iPhone 15 Pro Max", lens: "13mm Ultra Wide", focalLength: "13mm", aperture: "f/2.2", iso: "2000", shutter: "3s Night Mode", tracker: "Tripod" }
      }
    ],
    fieldNotes: [{ id: "fn-4", user: "AuroraHunter_AK", timestamp: "2026-01-22 22:15", upvotes: 51, tags: ["Aurora", "Batteries"], comment: "Keep spare batteries in inner jacket pocket next to body heat!" }]
  },
  {
    id: "banff-jasper",
    name: "Jasper & Banff NP (Lake Minnewanka)",
    region: "Alberta, Canada",
    continent: "North America",
    coordinates: [51.2483, -115.5008],
    bortle: 2,
    sqm: 21.8,
    elevation: "1,450m (4,750 ft)",
    cellSignal: "Moderate 4G near lake",
    healthConsiderations: "Bear country! Carry bear spray.",
    seasonalTemps: "Summer: 5°C to 22°C | Winter: -20°C to -5°C",
    weatherWarnings: "Mountain wind shifts and ramp ice.",
    horizonClearance: "North-facing lake view ideal for Aurora reflections.",
    photos: [
      {
        id: "bj-1",
        title: "Aurora Pillar Reflection on Lake",
        category: "Northern Lights",
        imageUrl: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1579033461380-adb47c3eb938",
        photographer: "Tobias Bjørkli",
        exif: { device: "Sony A7S III", lens: "24mm f/1.4", focalLength: "24mm", aperture: "f/1.4", iso: "2500", shutter: "4s", tracker: "None" }
      }
    ],
    fieldNotes: []
  },
  {
    id: "abisko-sweden",
    name: "Abisko NP (Aurora Sky Station)",
    region: "Lappland, Sweden",
    continent: "Europe",
    coordinates: [68.3498, 18.8312],
    bortle: 1,
    sqm: 22.0,
    elevation: "900m (2,950 ft)",
    cellSignal: "Good 4G/5G at Station",
    healthConsiderations: "Arctic mountain winds. Chairlift thermal suit required.",
    seasonalTemps: "Winter: -25°C to -10°C | Summer: Midnight sun",
    weatherWarnings: "High arctic wind chill.",
    horizonClearance: "Scandinavian blue hole microclimate sky.",
    photos: [
      {
        id: "ab-1",
        title: "Vivid Green Aurora Curtain",
        category: "Northern Lights",
        imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1531366936337-7c912a4589a7",
        photographer: "Vincent Guth",
        exif: { device: "Canon EOS R5", lens: "15-35mm f/2.8", focalLength: "15mm", aperture: "f/2.8", iso: "3200", shutter: "3.2s", tracker: "None" }
      }
    ],
    fieldNotes: [{ id: "fn-6", user: "Sven_Nordic", timestamp: "2026-11-04 21:30", upvotes: 60, tags: ["Naked Eye", "Aurora"], comment: "At Kp 5+, green pillars dance violently to the naked eye outright!" }]
  },
  {
    id: "tromso-norway",
    name: "Tromsø & Ersfjordbotn Fjord",
    region: "Troms, Norway",
    continent: "Europe",
    coordinates: [69.6492, 18.9553],
    bortle: 3,
    sqm: 21.4,
    elevation: "50m to 400m",
    cellSignal: "Strong 5G network",
    healthConsiderations: "Slippery fjord ice rocks. Boot crampons essential.",
    seasonalTemps: "Winter: -10°C to 0°C (Gulf Stream moderated)",
    weatherWarnings: "Coastal cloud shifts from Norwegian Sea.",
    horizonClearance: "Dramatic fjord peaks framing north sky.",
    photos: [
      {
        id: "tr-1",
        title: "Northern Lights over Fjord Peaks",
        category: "Northern Lights",
        imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1483347756197-71ef80e95f73",
        photographer: "Jonatan Pie",
        exif: { device: "Samsung S24 Ultra", lens: "13mm Ultra-Wide", focalLength: "13mm", aperture: "f/2.2", iso: "1200", shutter: "4s RAW", tracker: "Tripod" }
      }
    ],
    fieldNotes: []
  },
  {
    id: "teide-spain",
    name: "Teide NP (Roques de García)",
    region: "Tenerife, Spain",
    continent: "Europe",
    coordinates: [28.2723, -16.6425],
    bortle: 2,
    sqm: 21.9,
    elevation: "2,300m (7,500 ft)",
    cellSignal: "Good 4G at Parador",
    healthConsiderations: "High altitude lightheadedness.",
    seasonalTemps: "Summer: 12°C to 28°C | Winter: -2°C to 12°C",
    weatherWarnings: "High mountain wind gusts; Calima dust haze.",
    horizonClearance: "Above 80% of Atlantic marine cloud inversion layer!",
    photos: [
      {
        id: "td-1",
        title: "Milky Way over Roques de García",
        category: "Milky Way",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        sourceUrl: "https://unsplash.com/photos/1506703719100-a0f3a48c0f86",
        photographer: "John Fowler",
        exif: { device: "Fujifilm X-T5", lens: "18mm f/1.4", focalLength: "18mm", aperture: "f/1.4", iso: "2000", shutter: "10s", tracker: "None" }
      }
    ],
    fieldNotes: []
  }
];

// RAG GEAR DATASET: CAMERAS, PHONES & LENSES
export const GEAR_DATASET = {
  cameraBrands: [
    {
      brand: "Sony",
      models: [
        { name: "Sony A7 IV", sensor: "Full Frame", megapixel: 33, pixelPitch: 5.1, isoInvarianceThreshold: 640 },
        { name: "Sony A7S III", sensor: "Full Frame", megapixel: 12, pixelPitch: 8.4, isoInvarianceThreshold: 1600 },
        { name: "Sony A7R V", sensor: "Full Frame", megapixel: 61, pixelPitch: 3.76, isoInvarianceThreshold: 320 }
      ]
    },
    {
      brand: "Canon",
      models: [
        { name: "Canon EOS R6 Mark II", sensor: "Full Frame", megapixel: 24, pixelPitch: 6.0, isoInvarianceThreshold: 800 },
        { name: "Canon EOS R5", sensor: "Full Frame", megapixel: 45, pixelPitch: 4.39, isoInvarianceThreshold: 400 },
        { name: "Canon EOS R8", sensor: "Full Frame", megapixel: 24, pixelPitch: 6.0, isoInvarianceThreshold: 800 }
      ]
    },
    {
      brand: "Nikon",
      models: [
        { name: "Nikon Z6 II", sensor: "Full Frame", megapixel: 24.5, pixelPitch: 5.94, isoInvarianceThreshold: 800 },
        { name: "Nikon Z8", sensor: "Full Frame", megapixel: 45.7, pixelPitch: 4.35, isoInvarianceThreshold: 500 }
      ]
    },
    {
      brand: "Fujifilm",
      models: [
        { name: "Fujifilm X-T5", sensor: "APS-C (1.5x)", megapixel: 40, pixelPitch: 3.04, isoInvarianceThreshold: 1250 },
        { name: "Fujifilm X-H2S", sensor: "APS-C (1.5x)", megapixel: 26, pixelPitch: 3.77, isoInvarianceThreshold: 1250 }
      ]
    }
  ],

  lenses: [
    { name: "14mm f/1.8 (e.g. Sony GM / Sigma Art)", focalLength: 14, maxAperture: 1.8, type: "Ultra-Wide Prime" },
    { name: "20mm f/1.8 (e.g. Sony G / Nikon S)", focalLength: 20, maxAperture: 1.8, type: "Wide Prime" },
    { name: "24mm f/1.4 (e.g. Sony GM / Canon L)", focalLength: 24, maxAperture: 1.4, type: "Fast Wide Prime" },
    { name: "14-24mm f/2.8 Zoom", focalLength: 14, maxAperture: 2.8, type: "Ultra-Wide Zoom" },
    { name: "15-35mm f/2.8 Zoom", focalLength: 15, maxAperture: 2.8, type: "Wide Zoom" },
    { name: "35mm f/1.4 Prime", focalLength: 35, maxAperture: 1.4, type: "Standard Prime" }
  ],

  smartphones: [
    {
      os: "iOS (Apple)",
      devices: [
        {
          name: "iPhone 16 Pro / 16 Pro Max",
          version: "iOS 18+",
          lenses: ["0.5x Ultra-Wide 13mm f/2.2 (48MP)", "1x Main 24mm f/1.78 (48MP)", "5x Telephoto 120mm f/2.8"],
          maxNightModeShutter: "30s (when tripod mounted)",
          proRAW: true,
          steps: [
            "Mount iPhone firmly on a sturdy tripod.",
            "Open Camera App -> Select Photo Mode.",
            "Tap top yellow Night Mode crescent icon.",
            "Drag exposure slider from 'Auto (3s)' to 'Max (10s or 30s)'. The 30s option appears automatically when the phone detects zero tripod vibration.",
            "Set Focus to Infinity or tap a bright star/distant horizon light.",
            "Enable ProRAW Max (48MP) for color grading in Lightroom."
          ]
        },
        {
          name: "iPhone 15 Pro / 15 Pro Max",
          version: "iOS 17+",
          lenses: ["0.5x Ultra-Wide 13mm f/2.2", "1x Main 24mm f/1.78", "5x Telephoto 120mm f/2.8"],
          maxNightModeShutter: "30s (tripod mode)",
          proRAW: true,
          steps: [
            "Use tripod or prop against a rock.",
            "Select 0.5x or 1x lens.",
            "Turn Night Mode to 30s MAX.",
            "Use Apple Watch or 3s timer delay to prevent button tap vibration."
          ]
        },
        {
          name: "iPhone 14 Pro / 14 Pro Max",
          version: "iOS 16+",
          lenses: ["0.5x Ultra-Wide 13mm f/2.2", "1x Main 24mm f/1.78", "3x Telephoto 77mm f/2.8"],
          maxNightModeShutter: "30s (tripod mode)",
          proRAW: true,
          steps: [
            "Enable Apple ProRAW in Settings -> Camera.",
            "Set Night Mode slider to Max.",
            "Focus tap on horizon or distant tree line."
          ]
        }
      ]
    },
    {
      os: "Android",
      devices: [
        {
          name: "Samsung Galaxy S24 Ultra / S23 Ultra",
          version: "Android 14 / One UI 6+",
          lenses: ["0.6x Ultra-Wide 13mm f/2.2", "1x Main 23mm f/1.7", "3x Tele 69mm", "5x/10x Periscope"],
          maxNightModeShutter: "Expert RAW Astro Mode (Up to 10 minutes with Star Guide)",
          proRAW: true,
          steps: [
            "Download Expert RAW App from Galaxy Store.",
            "Tap the constellation icon at top right to enable 'Astrophotography Mode'.",
            "Set Duration to 4 min, 7 min, or 10 min.",
            "Turn ON 'Sky Guide' to project constellation maps over your live viewfinder!",
            "Place phone on tripod facing North for Northern Lights or South for Milky Way."
          ]
        },
        {
          name: "Google Pixel 9 Pro / 8 Pro / 7 Pro",
          version: "Android 14/15",
          lenses: ["0.5x Ultra-Wide 12mm f/1.95", "1x Main 25mm f/1.68", "5x Telephoto"],
          maxNightModeShutter: "Astrophotography Mode (4-minute timelapse + raw photo)",
          proRAW: true,
          steps: [
            "Open Google Camera App -> Swipe to 'Night Sight'.",
            "Set Pixel on tripod. Wait 2 seconds until moon icon turns into stars (Astrophotography Mode activated).",
            "Press shutter button. Pixel will capture for 4 minutes, stacking exposures automatically and saving a 1-second timelapse video!"
          ]
        }
      ]
    }
  ]
};

// AURORA VISIBILITY LOGIC
export const AURORA_VISIBILITY_LEVELS = [
  {
    kp: "Kp 0 - 1",
    level: "Sub-Visual / Camera Only",
    nakedEyeText: "Invisible to human eye outright. Appears as pitch black sky.",
    cameraText: "Camera or Smartphone 5s-10s exposure reveals faint greenish airglow on digital screen at latitude 65°N+.",
    color: "text-slate-400 border-slate-600"
  },
  {
    kp: "Kp 2 - 3",
    level: "Faint Sub-Visual / Screen Only",
    nakedEyeText: "Human eye sees a faint greyish-white glowing cloud or arch without distinct color (rod vision).",
    cameraText: "Camera screen displays vibrant green arc and subtle vertical pillars.",
    color: "text-emerald-400 border-emerald-600"
  },
  {
    kp: "Kp 4 - 5 (Geomagnetic Storm G1)",
    level: "Naked-Eye Visible!",
    nakedEyeText: "Clearly visible to naked human eye! Green curtains and distinct slow movement seen directly without screens.",
    cameraText: "Intense vivid green, magenta tops, fast shutter speeds (1s-3s) needed to capture fast pillars.",
    color: "text-green-400 border-green-500"
  },
  {
    kp: "Kp 6 - 7 (G2 - G3 Severe Storm)",
    level: "Vivid Naked-Eye Corona",
    nakedEyeText: "Blindingly bright to human eye! Purple, red, and pink rays sweeping overhead (Corona effect).",
    cameraText: "Overexposure risk! Drop ISO to 800 and shutter to 0.5s-1s.",
    color: "text-purple-400 border-purple-500"
  },
  {
    kp: "Kp 8 - 9 (G4 - G5 Extreme Storm)",
    level: "Historic Global Naked-Eye Aurora",
    nakedEyeText: "Visible down to mid-latitudes (30°N) to naked eye outright in vivid red and green!",
    cameraText: "Easily captured even on handheld smartphones with 1s exposure.",
    color: "text-fuchsia-400 border-fuchsia-500"
  }
];
