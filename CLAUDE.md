# Danni-ba

Landing page for Danni, owner of Lucy's Spa (Tres Sargentos 421, Microcentro, Buenos Aires). A personal alternative to the generic https://www.lucyspa.com.ar/.

- One file, `index.html`, no build. Spanish default with EN toggle; every text appears twice (`lang="es"` and `lang="en"`), so edit both.
- Live at https://sahasand.github.io/danni-ba/ (GitHub Pages from `main`, public repo `sahasand/danni-ba`). Pushing to `main` deploys.
- Look: dark, photo-led luxury spa (Cormorant Garamond + Jost). Already rejected: cream/serif/terracotta ("AI slop") and a green/pink poster ("too loud").
- Photos are Unsplash placeholders. Real files in `fotos/` (`portada.jpg`, `danni.jpg`, `ambiente.jpg`, `sala.jpg`) replace them automatically.
- Facts come from the old site and from Danni (10 years, trained at IDRAET and IDIP). Do not invent credentials.
- Before shipping copy: `~/.claude/skills/style-guard/scripts/check_style.sh neutral index.html`.

## Open loops

- Danni to confirm her story text, the treatment descriptions and the English treatment names.
- Real photos still needed; the hero, portrait, ambience and room shots are all stock.
- When final: remove the `noindex` meta and set `data-notas="off"` on `<html>`.
- The phone layout of the coordinates line was changed after the last screenshot and has not been checked visually.
