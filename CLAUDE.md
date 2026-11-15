# Danni-ba

Landing page for Danni, owner of Lucy's Spa (Tres Sargentos 421, Microcentro, Buenos Aires). A personal alternative to the generic https://www.lucyspa.com.ar/.

- Four self-contained pages, no build: `index.html` (showcase with live previews and links to every version), `oscuro.html` (dark version), `lujo.html` (3D version: a three.js scene of hot stones on water behind the dark content, loaded from the jsDelivr CDN, driven by scroll; falls back to the hero photo without WebGL) and `claro.html` (light version, modelled on the layout of magichands.com.ar at the user's request; no logo, photos or text taken from it). Same content, WhatsApp number and `fotos/` files; a content change must be made in all three. The user has not picked one yet.
- `claro.html` embeds a 20-second programmatic video, one MP4 per language in `media/`. Source is the Remotion project in `video/` (`cd video && npm install && npm run render`). It uses copies of the photos in `video/public/`, so it must be re-rendered when real photos arrive. Remotion's bundled headless browser hangs on this Mac, so `video/remotion.config.ts` points at the installed Chrome.
- Spanish default with EN toggle; every text appears twice (`lang="es"` and `lang="en"`), so edit both.
- Live at https://sahasand.github.io/danni-ba/ (GitHub Pages from `main`, public repo `sahasand/danni-ba`). Pushing to `main` deploys.
- Looks: `oscuro.html` is dark, photo-led luxury spa (Cormorant Garamond + Jost); `claro.html` is cream and deep green (Marcellus + Figtree). Already rejected: cream/serif/terracotta with empty photo boxes ("AI slop") and a green/pink poster ("too loud").
- Photos are Unsplash placeholders. Real files in `fotos/` (`portada.jpg`, `danni.jpg`, `ambiente.jpg`, `sala.jpg`) replace them automatically.
- Facts come from the old site and from Danni (10 years, trained at IDRAET and IDIP). Do not invent credentials.
- Before shipping copy: `~/.claude/skills/style-guard/scripts/check_style.sh neutral index.html oscuro.html claro.html lujo.html`.

## Open loops

- Pick a version (user and Danni). The winner becomes `index.html` and the showcase and the other versions are deleted.
- `lujo.html` was checked in desktop Chrome and at phone width in an iframe, not on a real phone. Its no-WebGL fallback and reduced-motion path are untested.
- Danni to confirm her story text, the treatment descriptions and the English treatment names.
- Real photos still needed; the hero, portrait, ambience and room shots are all stock. The video uses the same stock shots.
- Video: the user typed "profeamtic video"; it was read as "programmatic" and not yet confirmed. The video section of `claro.html` has not been checked at phone width.
- When final: remove the `noindex` meta and set `data-notas="off"` on `<html>` (all pages carry both today).
- `oscuro.html`: the phone layout of the coordinates line was changed after the last screenshot and has not been checked visually.
