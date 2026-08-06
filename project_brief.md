# My agent: STARLITE
One-liner: A conversational & interactive mapping agent that helps astrophotographers and aurora chasers find dark sky locations, analyze light pollution overlays, explore regional photo galleries with EXIF metadata, calculate camera/lens best practice settings, and view community field notes.

Tool coverage:
- Memory: User camera body, lens specs (focal length, max aperture), smartphone models, preferred location list, and dark sky bookmarks with timestamps.
- Tools: Light pollution Bortle scale query, live NOAA Aurora Kp index & solar wind status, NPF & 500-Rule exposure calculator, dark sky reserve finder, and community spot intel notes.
- Catalog/UI: Interactive dark sky spots, regional astrophotography photo galleries (Milky Way, Northern Lights, Deep Sky, Constellations) with camera/lens EXIF parameters rendered as interactive cards.
- Image gen: Visual preview of expected star fields or simulated aurora intensity for target coordinates.
- Sandbox: Shutter speed limit calculation to prevent star trailing based on pixel pitch, focal length, and declination.

Core rails (everyone): memory, tools, eval, deploy, frontend
My stretch menu (pick later): Banked Material Design tabs, Leaflet light pollution heatmaps, camera vs smartphone best practice calculator.
First eval question: "What shutter speed and ISO should I use for a 20mm f/1.8 lens or iPhone 16 Pro in a Bortle 3 dark sky zone to photograph the aurora borealis without star trails?"
