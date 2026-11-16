# STUDIO.md — DigitalHouse Growth Studio: "The Studio" redesign

Version 3 · 15 Nov 2026 · The single source for the redesign: concept, assets, phases, open decisions, ideas and progress.
Update it every time a decision changes or a phase ends. Rules live in `CLAUDE.md`.

---

## 1. The idea in one paragraph

The visitor is a camera. The site loads behind a camera lens. When it's ready, the shutter opens and the visitor passes through the lens into the DigitalHouse studio: a small, warm, illustrated room (2.5D, with depth layers). Each service area of the agency is a station in that room. Clicking a station makes the camera zoom into it. Some stations have a second zoom level into a specific object (a phone, a camera, a sticky note) that explains one service. The whole site lives inside this one room, so it feels like visiting the studio, not reading a web page.

---

## 2. Key decisions

| Topic | Decision |
|---|---|
| Visual style | 2.5D flat editorial illustration with depth layers (parallax). Front view, one-point perspective, cutaway room like a theater stage. |
| Palette | Brand tokens: ivory `#f7f3ea`, beige `#e5dccf`, burgundy deep `#4a0710`, charcoal `#262322`, small accents of yellow `#fce7a6` and sky `#d7e8f7`. |
| Signature light | Window on the back wall casting window and leaf shadows, the same motif as the brand photos. Shadows are a separate overlay layer, not baked into the art. |
| Art tool | ChatGPT (Pro) for all illustrated pieces. Claude reviews every piece. Claude Code builds the site and draws the animated effects in code. |
| Video tool | Higgsfield: test only (free plan). Candidate for the "through the lens" intro transition. |
| Languages | Spanish (main, at `/`) and English (at `/en`). |
| Stack | Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, GSAP (+ ScrollTrigger if needed), next-intl. No Three.js. |
| Areas | 5 service areas: Consulting & Strategy (includes Business Intelligence), Marketing / Content / Audiovisual, Digital Solutions, Events, Merchandising. |
| Removed sections | Sections of the old one-page site that aren't in this concept are dropped. |
| Text in images | Never. All texts, logos and screen contents are added in code. |
| Originals | `brand-assets/area/` (not served). Optimized versions go to `public/studio/`. |

---

## 3. Intro sequence

1. **Loader.** A camera lens seen from the front. Its rings and aperture blades fill up following **real** loading progress (maximum ~4 s).
2. **Shutter.** At 100% the aperture opens, with an optional click sound (sound is off by default).
3. **Through the lens.** The camera moves through the lens into the studio. This can be built in code, or as a short pre-rendered video (Higgsfield test) that crossfades into the live room.
4. **Lights on.** The studio lights switch on one by one, and the stations highlight briefly.
5. **Idle.** The room is alive with subtle loops. The window shadows move gently.

Returning visitors get a shortened or skippable intro. With `prefers-reduced-motion`, the room appears directly.

---

## 4. The room

**Layout (front view):**

| | Left | Center | Right |
|---|---|---|---|
| **Back wall** | Credentials (glass shelves) | Window with tree | Consulting (glass wall) |
| **Middle floor** | Marketing (film set) | Events (scale model) | Digital (dev desk) |
| **Front** | Merch shelf | Director's chair | Reception desk |
| **Foreground** | Plants (left) | | Plants (right) |

**Depth layers (far → near):** room shell → back-wall stations → window-shadow overlay → middle stations → front stations → foreground plants. Near layers move more with the mouse or device tilt.

**Reference image:** `brand-assets/area/00-master.png`, the layout reference only. In the final assembly each station is a separate piece, positioned in code with space between them.

---

## 5. Stations

### 5.1 Director's chair + clapperboard: "¡Acción!"
- **Seen as:** a director's chair facing **away from the viewer, looking at the room**. The visitor sees its backrest.
- **Clapperboard:** drawn **in code (SVG)**, matching the illustration style. It works as a **button**.
- **On click:** the clapstick snaps shut ("clack") and the **whole studio comes alive for a few seconds**: every station plays its animation at once (lights, code typing, REC blinking, icons jumping, the phone ringing...). Then the room returns to idle.
- **The chair itself:** interaction to be defined.
- **Open:** where the intro content ("No vendemos estética. Vendemos crecimiento." and the 3 Qué hacemos lines) lives now.

### 5.2 Credentials: glass trophy shelves
- **Seen as:** a wall-mounted glass trophy cabinet with three shelves and spotlights. Instead of trophies, its 15 plinths hold the **client brands as icons**; each plinth's plaque can show the brand name (in code).
- **Idle:** each brand icon has its own small animation: breathing (slow scale) or little jumps, out of sync so the shelf feels alive.
- **On zoom:** the shelves fill the screen. Clicking a brand shows that client's photos and videos.
- **Content:** the 15 brands in `home.ts`, plus the client photos and videos.
- **Build note:** each icon is a separate element so it can animate on its own. Either the brand's logo files are placed in code on empty plinths drawn by the AI, or each logo is turned into a small 3D object in ChatGPT. To be decided.

### 5.3 Consulting & Strategy: glass wall
- **Seen as:** a glass wall with sticky notes and a hand-drawn rising chart. A strategist **with glasses** points at it.
- **Idle:** subtle. The chart line pulses, a sticky note flutters.
- **On hover:** the chart line draws upward.
- **On zoom:** the glass wall fills the screen.
- **Second zoom:** **extra zoom into individual sticky notes**. Each note opens the description of the area and its services:
  - Consultoría de negocio: diagnóstico del modelo de negocio, estrategia y ruta de trabajo, concepto de marca.
  - Business Intelligence: tableros de KPIs, medición de ROI, reportes ejecutivos.
  - The process (Diagnóstico → Estrategia → Ejecución → Medición → Optimización) can also live on the notes.

### 5.4 Marketing, Content & Audiovisual: film set
- **Seen as:** a film set corner with an ivory backdrop, two softboxes, a video camera on a tripod, a ring light with a phone, and a woman with headphones checking a small monitor.
- **Idle:** the REC light blinks, and the ring light glows softly.
- **On hover:** the softboxes switch on, and the corner brightens.
- **On zoom:** the film set fills the screen.
- **Second zooms (one per object):**
  - **Phone on the ring light** → zoom into the phone. Its screen shows the **Redes sociales** service description.
  - **Video camera** → zoom into the camera's screen. It shows the **content creation / filming / audiovisual production** service description.
  - **The woman's small monitor** → description to be defined by Rene.
- **Content still needed:** texts for social media, for audiovisual production, and for the small monitor.
- **Status:** piece `10-film-set.png` done.

### 5.5 Events: architectural scale model
- **Seen as:** a **miniature model of an event**, like an architect's mock-up, on a display table: a small DJ booth, tiny people, a few cocktail tables. It is not a concert stage.
- **Animations:** to be defined once the image exists.
- **Content:** Eventos y BTL. Diseño de eventos y activaciones, negociación de auspicios, logística.

### 5.6 Digital Solutions: dev desk
- **Seen as:** a developer at a desk with two monitors, keyboard, mug.
- **Idle:** **the code on the monitors moves as if someone were typing it live.** The screens are blank in the art, and the code is rendered and animated in code.
- **On zoom:** the desk fills one side of the screen, and **the description appears next to it** (no second zoom).
- **Content:** Sistemas digitales. Webs, CRMs, apps y herramientas a medida; implementación de herramientas existentes; capacitación a tu equipo; desarrollo a medida.

### 5.7 Merchandising: shelf
- **Seen as:** a shelf with a cap, a t-shirt, mugs, pens, mouse pads and a tote bag.
- **On hover:** items lift slightly.
- **On zoom / interaction:** the visitor **picks up an item**. It lifts off the shelf toward the camera, and the description of everything the area does appears.
- **Content:** Producción y merchandising. Impresos y material de marca, merchandising, piezas para eventos.

### 5.8 Contact: reception desk
- **Seen as:** a reception desk with a clipboard (paper form), a small desk calendar, a vase with flowers, and a vintage phone (separate piece).
- **Three ways to contact:**
  1. **Paper form:** fill in your contact details on a form styled as paper on the desk. Needs a backend to send it.
  2. **Vintage phone:** it rings on hover. Clicking it opens **WhatsApp** to talk now.
  3. **Desk calendar:** opens a booking flow to **schedule an appointment**, connected to the agency's Google Calendar.
- **Content:** `contact.ts` (WhatsApp, email, Instagram).

### 5.9 Plants
- No interaction. Foreground parallax layers only.

---

## 6. Asset list

| # | Piece | Status | Notes |
|---|---|---|---|
| 00 | Master (layout reference) | ✅ Done | Redesigned with all changes |
| 01 | Empty room | ✅ Done | Shadows came baked in; walls lean peach. Review in the assembly test |
| 10 | Film set | ✅ Done | Backdrop drifted to peach; fix color later |
| 11 | Credentials trophy cabinet | ✅ Done | Glass cabinet, 15 plinths with plaques; icons method to be decided |
| 12 | Consulting | ✅ Done | |
| 13 | Events scale model | ✅ Done | |
| 14 | Dev desk | ✅ Done | Code drawn on screens; live code covers it |
| 15 | Merch shelf | ✅ Done | Later: picked-up item as separate piece + shelf without it |
| 16 | Director's chair | ✅ Done | |
| 17 | Reception desk | 🔁 Redo | Phone came baked in; regenerate without it |
| 18 | Vintage phone | ✅ Done | |
| 19 | Plants | ✅ Done | |
| — | Clapperboard | Code | SVG |
| — | Effects | Code | Light beams, REC light, glows, screen contents, window shadows |

All pieces except 01: transparent background, flat lighting, no shadows, no text. Final step for all pieces: upscale (Upscayl), then export optimized WebP.

---

## 7. Technical approach

- **Routes:** every station is a real page (e.g. `/consultoria`, `/marketing`, `/desarrollo`, `/eventos`, `/merchandising`, `/credenciales`, `/contacto`, plus English equivalents). Second-level zooms are also URLs (e.g. `/marketing/redes-sociales`), so they're shareable and indexable and the back button works.
- **Persistent stage:** the studio lives in a shared layout that stays mounted between routes. The route only tells the camera where to go, so zooms animate instead of reloading.
- **Camera:** GSAP scales and moves the layered stage. Parallax comes from the mouse or device tilt.
- **Effects:** CSS/GSAP/SVG layers on top of the illustrations.
- **"¡Acción!" mode:** one GSAP timeline that triggers every station's animation together for a few seconds.
- **Contact form:** Next.js server action plus an email service, with spam protection.
- **Booking:** Google Calendar appointment schedule (booking page), opened or embedded from the desk calendar.
- **Progressive enhancement:** the site works as a normal, readable site without the animation, which also serves SEO and accessibility.

---

## 8. Best practices (rules for the whole project)

1. Every station and sub-zoom is a real URL.
2. Normal site first, animation on top.
3. The loader is honest (real progress) and short (≤ 4 s); returning visitors can skip it.
4. Performance budget: optimized WebP/AVIF, lazy-loaded videos, 60 fps target.
5. Mobile is its own design: lighter stage, tap instead of hover, a menu to jump to any station.
6. Accessibility: keyboard-reachable hotspots, `prefers-reduced-motion`, sound off by default, real text.
7. One phase at a time, on the `redesign-studio` branch, checked on the Vercel preview, with a Playwright check before merging.
8. Client permission confirmed before showing each logo and video.

---

## 9. Phases

Branch `redesign-studio`. Each phase ends with: `npm run lint` + `npm run build` passing, a check on
the Vercel preview URL, a progress-log entry (§12), a summary, and a STOP for approval.

### Phase 0 — Foundations ✅
Branch `redesign-studio`, project audit, content map, concept document, rewritten CLAUDE.md, docs reduced to CLAUDE.md + docs/STUDIO.md + README.md.

### Phase 1 — Art direction ✅
Style guide prompt, master image (`brand-assets/area/00-master.png`), room layout.

### Phase 2 — Illustration pieces (in progress)
All pieces generated in ChatGPT and checked (transparency, color drift, no text).
Pending: reception desk without the telephone; later, the merch item that is "picked up" as a
separate piece plus a shelf without it.

### Phase 3 — Asset pipeline + assembly test
1. `tools/` script (sharp): from `brand-assets/area/` → `public/studio/`. Clamp near-opaque alpha,
   trim margins, split the plants sheet, export WebP in two widths, generate
   `src/content/studio-assets.ts` (paths + sizes).
2. Hidden, noindex **layout editor** page: the empty room with the master as a semi-transparent guide;
   drag and resize each piece; save positions to `src/content/studio-layout.ts`.
3. Static stage (no animation) rendering the room from that layout, scaled to the viewport.
4. Test zoom sharpness on desktop and retina → decide whether pieces need upscaling (Upscayl) and
   whether the room color needs correcting.

### Phase 4 — Skeleton: routes, languages, persistent stage
`next-intl` (ES at `/`, EN at `/en`), one route per station plus second-level routes, real content
from `src/content/` on each route (no animation yet), shared layout keeping the stage mounted.
The old one-page components are removed here, once the new home replaces them.

### Phase 5 — The room comes alive
Depth groups and parallax (mouse / device tilt), window-shadow overlay, idle loops per station,
hotspots (hover/focus states, labels), keyboard navigation between stations.

### Phase 6 — Zoom system
Camera = GSAP transform of the stage to a target rectangle per station and per sub-zoom; synced with
routes and the back button; HTML text panels outside the stage; reduced-motion = instant cuts.

### Phase 7 — Loader + lens intro
Lens loader tied to real asset progress (≤ 4 s), shutter, through-the-lens transition (code, or the
Higgsfield video if the test is approved), lights-on sequence, shortened intro for returning visitors.

### Phase 8 — Stations (one mini-phase each, in this order)
8a Consulting (sticky-note sub-zooms, chart) · 8b Marketing film set (phone / camera / monitor
sub-zooms, softboxes, REC) · 8c Digital (live-typing code, side description) · 8d Events (scale
model; animation to be defined) · 8e Merch (pick-up item).

### Phase 9 — Credentials
Brand icons on the cabinet plinths (each animated), brand names on the plaques, glass reflection
layer, client photo/video viewer.

### Phase 10 — Contact
Paper form (UI + sending, method to be decided), vintage phone → WhatsApp, desk calendar → Google
Calendar booking, phone ringing animation.

### Phase 11 — "¡Acción!" + polish
Clapperboard SVG button and the whole-studio animation timeline, director's chair interaction,
mobile version (lighter stage, tap, station menu), reduced motion, optional sound, details.

### Phase 12 — SEO, performance, QA, launch
Metadata per route and locale (hreflang), sitemap, Lighthouse, Playwright checks on all breakpoints,
link check, merge to `main` on approval, award submissions.

---

## 10. Open decisions

Ask before the phase that needs them. When one is decided, move it into the right section above and delete the row.
| # | Question | Needed by |
|---|---|---|
| O1 | Upscale pieces? Correct the room color? | Phase 3 (after the test) |
| O2 | Floating WhatsApp button: keep it on top of the studio, or only the phone at the reception desk? | Phase 4 |
| O3 | Where does the intro content live ("No vendemos estética…" + the 3 Qué hacemos lines)? | Phase 4 |
| O4 | Texts still missing: social media, audiovisual production, the film-set monitor | Phase 8b |
| O5 | Events station animation (after seeing the scale model) | Phase 8d |
| O6 | Brand icons: real logos placed in code, or 3D icons made in ChatGPT? | Phase 9 |
| O7 | Client photos/videos: which ones, and where they play | Phase 9 |
| O8 | Contact form: how it's sent (email service); Google Calendar booking URL; is the email still shown? | Phase 10 |
| O9 | Director's chair interaction; where the clapperboard sits | Phase 11 |
| O10 | Through-the-lens: code or Higgsfield video | Phase 7 |
| O11 | shadcn: drop the uncommitted devDependency, or use it for the form? | Phase 10 |

---

## 11. Ideas for later (not scheduled)

- **Team as the characters** (open). The people at each station are illustrated versions of the team: Nicole Pantoja at the strategy wall, Nicole Vidaurre on the film set, Rene at the dev desk, Michelle Vidaurre at the events model, Matias Rossel at the merch shelf. Regenerate each character from approved photos; a name tag on hover (HTML).
- **Clapperboard "takes"** (linked to O3). Each clap shows one Qué hacemos line: Toma 1 "Entendemos tu negocio." · Toma 2 "Lo volvemos estrategia, marca y sistemas." · Toma 3 "Lo ejecuta un equipo de especialistas." Chalk text in SVG; could coexist with "¡Acción!".
- **Through-the-lens video** (O10). Higgsfield first/last frame (lens → empty room), then crossfade into the live stage. Needs a paid month to remove the watermark; fallback in code.
- **3D brand icons** (O6). Each client logo uploaded to ChatGPT and turned into a small 3D trophy object; check every result for distortion. Fallback: real logo files placed on the plinths in code.

---

## 12. Progress log

Newest first. A few lines per finished phase: date, what was built, decisions made, what's pending.
Details live in the git commits.

- **2026-11-15 · Phase 1 (art direction) done.** Master image redesigned with all changes (trophy cabinet, scale model, chair facing the room, reception with form and calendar). Illustration pieces generated (Phase 2); the reception desk must be redone without the telephone.
- **2026-11-15 · Phase 0 (foundations) done.** Branch `redesign-studio`; project audit; concept written; CLAUDE.md rewritten; docs reduced to CLAUDE.md + docs/STUDIO.md + README.md; old site docs moved to `docs/archive/`.