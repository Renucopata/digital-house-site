# CLAUDE.md — Digital House · Growth Studio (website)

This file is read at the start of every Claude Code session. Follow it strictly.

## 1. Project in one paragraph
Marketing website for **Digital House — Growth Studio**, a business/brand/digital consultancy.
Positioning: *"No vendemos estética. Vendemos crecimiento."* and
*"Entendemos tu negocio primero. Todo lo demás — marca, contenido, sistema — nace de ahí."*
Public-facing site, Spanish copy, focused on attracting international clients (100% remote service).
Built with **Next.js (App Router)**. The full phased plan lives in `PLAN.md`.

## 1.1 Confirmed decisions (by the user, 2026-10-13)
| # | Decision |
|---|---|
| D1 | Style = identity A (images: cream + burgundy). **No light blue, no yellow** anywhere. |
| D2 | Brand name as written on the site: **"DigitalHouse Growth Studio"** (logo itself = provided images). |
| D3 | **Single landing page** with anchor navigation (no `/servicios/[slug]` routes). |
| D4 | All copy in **Spanish**. Voseo from the PDFs must be rewritten (form tú vs usted: see Pending). |
| D5 | The business-model PDF is context only; §5 confidentiality list stands. |
| D6 | WhatsApp: **+591 65999740** → `https://wa.me/59165999740`. A **floating WhatsApp button is visible at all times** (every scroll position, every breakpoint) and opens the chat. |
| D7 | Email: **r.rengel99@gmail.com** (`mailto:` link). |
| D8 | Logo = the logo files provided in the images (crop/extract from them; do not redraw or re-typeset). |
| D9 | Hosting: **Vercel**. |
| D10 | Fix source typos: "Estratega digita" → "Estratega digital"; client name spelled consistently. |

### Confirmed after Phase 0 (by the user, 2026-10-13 — details in `docs/phase-0-discovery.txt`)
| # | Decision |
|---|---|
| D11 | Domain: none registered → use the Vercel-provided `*.vercel.app` domain for now. Instagram: `@digitalhouse.gs`. |
| D12 | Spanish form = **tú**, used consistently (rewrite all voseo: "trabajás" → "trabajas", "querés" → "quieres"). |
| D13 | Client names may be shown, as a text-only line (e.g. "Han confiado en nosotros: Fair Play Élite · VIDA") — no logos, no results/metrics. Spelling: **Fair Play Élite**, **VIDA**. |
| D14 | Team: Nicole Pantoja, Nicole Vidaurre, **Rene Rengel** (no accent). Initials avatars (NP · NV · RR) until photos arrive. Rene's title: **"Herramientas digitales"**. |
| D15 | No official font files. Approved: **Bodoni Moda** (display serif) + **Poppins** (all sans: 800 strong headlines, 500–600 headline lines, 400 body, 400 uppercase labels @ ~0.35em). |
| D16 | **Tailwind CSS: yes.** **No contact form.** Contact = WhatsApp (floating button + CTAs) + email `mailto:` link kept. |
| D17 | Pre-filled WhatsApp message: **"Hola, quiero más información sobre DigitalHouse Growth Studio."** |
| D18 | `brand-assets/` stays as-is (flat folder, WhatsApp filenames) — reference only. |
| D19 | Approved palette = measured values in §4.2. |
| D20 | Official logos: the **cream-on-burgundy wordmark** lockup ("digitalHOUSE", centered "GROWTH STUDIO") and the **"dH" monogram**. No vector files yet. Header (cream) uses that same lockup **recolored burgundy-on-cream** (pixel recolor only, no redraw) — show it to the user before use. |
| D21 | Publishable from the internal PDF (not on the §5 list): credentials (Nicole Pantoja ex Directora de Marketing de Technogym; Nicole Vidaurre freelance with clients abroad) and the longer value-card / pillar / bio descriptions — rewritten in tú, never including §5 items. |
| D22 | Images allowed on the site: Sony-camera story and the "Ctrl + N" post. The laptop-on-sneakers screenshot is **not** used. More assets will come later. |
| D23 | (Phase 1→2, 2026-10-13) The four processed logo files in `public/brand/` are **approved**. The header logo has a slow continuous **"breathing" animation** (scale 1 → 1.03 → 1, 5 s, sine easing), paused on hover and disabled with `prefers-reduced-motion`. Analysis scripts live in `tools/`. |
| D24 | Vercel production address (until a domain is bought, D11): **https://digital-house-site-indol.vercel.app** — used for metadataBase, Open Graph, sitemap (Phase 6). |
| D25 | Servicios (#servicios) = **stacked blocks**, all five pillars fully visible (option a). The user likes **option c (summary cards + expandable details)** and may want to try it later → recorded in `docs/IDEAS.txt`. **Superseded by D42** (2026-10-28). |

### Web brief (2026-10-23) — `brand-assets/BriefwebDigitalHouseGrowthStudio.docx` (worked on branch `brief-web`, merged into `main` 2026-10-27; all work now happens on `main`)
The brief does **not** override every earlier decision. The user decides item by item; until then,
anything below that is not listed keeps the D1–D25 rule.
| # | Decision |
|---|---|
| D26 | **Colors and fonts follow the brief** (replaces D1 color limits, D15, D19 — see §4.2, §4.3). Yellow and light blue are allowed as small accents (~10 % of the page). |
| D27 | **Every section listed in the brief must be on the page** (Hero, Qué hacemos, ribbon, Cómo trabajamos, Servicios, Equipo, Confían en nosotros, Contacto, footer). Also **keep** the Manifiesto section (D22 image) and the floating WhatsApp button (D6). |
| D28 | Contact form: **UI only** for now (fields, validation, confirmation/error states); real sending decided later. Scheduling ("agendar") = **Google Calendar** (booking link still pending). |
| D29 | Logo: **wait for the official transparent files** from Nicole; keep the current files until then (D20, D23). |
| D30 | Team spelling: **Rene Rengel** (no accent, D14 stands), **Matias Rossel**; closing line uses **"juntos"**. |
| D31 | Clients: keep the current text-only line (D13) — no logo grid until authorized logos arrive. |
| D32 | Hero headline "No vendemos estética. Vendemos crecimiento." comes **first**, set in the brief's headline font; the word **"crecimiento"** is shown as **selected text** (brief "caja de selección": yellow band + line and dot at opposite corners) that is **typed letter by letter**, with the selection growing with the word. |
| D33 | Brief content rules apply: no "Technogym", no "gratuita", no promised results/deadlines/prices, specialists not presented as staff. |
| D34 | (2026-10-25) The hero typing **repeats**: the word types, stays selected for **1 s** (cursor blinking), clears and types again. |
| D35 | (2026-10-25) Quiénes somos cards = "pick cards": hovering a card turns it dark burgundy (like the middle card) and lifts it; only one card is dark at a time. At rest the middle card is the chosen one, slightly raised and gently floating "waiting to be picked". **Superseded by D41** (the section became "Qué hacemos"). |
| D37 | (2026-10-25) Cómo trabajamos: hovering a step fills the connecting line from step 1 to that step with ivory (the color of step 1), smoothly like a progress bar, and fills the dots it passes; leaving empties it. |
| D38 | (2026-10-25) Hero: label = **"GROWTH STUDIO" in an outlined pill**; the paragraph under the headline is **removed**; the image is the user-provided pair `brand-assets/digital-house_background.png` (wall) + `digital-house_foreground.png` (cutout of the laptop on the sneakers), the foreground **sliding up into place with a small wobble** on load. This replaces the camera photo in the hero and lifts D22's exclusion of the laptop image. |
| D39 | (2026-10-26) Equipo = **flip cards** (brief + prototype content). Front (ivory): big initials on a yellow/sky/beige panel (approved photos can replace them later), name, role, phrase. Back (guinda principal `#790B1A`): specialty + "Pídele" list. Turns in 3D (0.6 s) on hover, tap, Enter/Space. Members (user, 2026-10-26): **Nicole Pantoja** (Fundadora · Directora de Estrategia), **Nicole Vidaurre** (Directora Creativa), **Rene Rengel** (Director de Desarrollo y Soluciones Digitales — replaces D14's title), **Matias Rossel** (Aliado · Producción y Merchandising). Title "Un equipo de especialistas. Un solo objetivo: tu crecimiento." with the selection box; closing line "¿Quién participa en tu proyecto? Lo decidimos juntos después de escucharte." **Michelle Vidaurre** (Directora de Eventos y BTL) added as 5th card, between Rene and Matias (user, 2026-10-26); job titles confirmed as in the brief. Layout: 5 in a row on wide screens. |
| D40 | (2026-10-26) Under the hero, a **"smaller hero"**: "Soluciones digitales para que" + a rotating word in **Playfair Display italic**, guinda principal — order **escalen, te encuentren, funcionen, te elijan, te recuerden**; every 2.3 s the word fades out sliding down and the next fades in sliding up (0.35 s). Plus the brief subtitle "Estrategia, marca y sistemas, con un equipo de especialistas que trabaja contigo." Reduced motion: static first word. |
| D41 | (2026-10-26) **"Quiénes somos" → "Qué hacemos"** (`#que-hacemos`, menu label too): three big phrases, no paragraph — Primero / Entendemos tu negocio. · Después / Lo volvemos estrategia, marca y sistemas. · Y siempre / Lo ejecuta un equipo de especialistas. One stands out at a time (full color, slides right, bar grows on its left; others at 45 %): the first at rest, the hovered one with a mouse. Beige band with the dH camera photo beside it (brief). Replaces the pick cards (D35). Google Calendar: **not implemented for now** (D28 scheduling postponed). |
| D42 | (2026-10-28) **Servicios** (`#servicios`, menu label unchanged) = the brief/prototype "Áreas de trabajo · Seis áreas. Un solo equipo.": six vertical panels in a row **like books on a shelf** — one open, the others closed with the name on the spine; hovering (wide screens) or clicking/tapping a panel opens it and the others make room (0.65 s). Areas, colors, icons and texts from the brief table: Entender, Que se note, Que funcione, Que se mida, Que se viva, Que se toque; closing "No eliges de un menú. Nos cuentas tu negocio y armamos la propuesta." Below lg the panels stack and open downwards. **Replaces D25** (5 stacked pillars removed). |
| D36 | Prototype referenced by the brief: https://claude.ai/artifact/73cUyYw6yvsBw6b4RRnodk — reference for interactions/timings; **the brief wins** where they differ. |

## 2. Working rules (non-negotiable)
1. **Do not assume.** If anything in a request, the PDFs, the images or this file is ambiguous or
   contradictory, STOP and ask the user before writing code. List the doubt, propose options, wait.
2. **One phase at a time.** Only work on the phase the user tells you to. At the end of each phase:
   write the phase documentation (see §6), summarize what changed, list open questions, and STOP.
   Do not start the next phase without explicit approval.
3. **Files you did not create in this session are unchanged** unless the user says they edited them.
   Re-read a file before editing it; never rewrite a file from memory.
4. **Scope discipline.** Change only what the current task needs. No drive-by refactors, no new
   dependencies without asking (state name, purpose, size/alternatives).
5. **Never invent content.** No fake testimonials, client logos, metrics, prices, phone numbers,
   emails or case-study results. Missing data → visible placeholder `[PENDIENTE: …]` + note in the phase doc.
6. **Internal information must never appear on the public site** (see §5).
7. If you need a file, image or answer you don't have, ask for it by name.

## 3. Source material (provided by the user)
In `/brand-assets/` (flat folder, kept as-is for reference — D18):
- `Digital_House_Modelo_de_Negocio.pdf` — **INTERNAL** business model (Sept 2026). Use only to
  understand the business. Most of it is confidential (see §5; exceptions in D21).
- `DigitalHouse_Portafolio_Servicios.pptx.pdf` — **PUBLIC** services portfolio (11 slides). Main content source.
- `WhatsApp Image 2026-10-07 at 7.21.04 PM*.jpeg` — brand images (Ctrl + N post, laptop screenshot,
  Sony camera story, "dH" monogram, wordmark burgundy-on-cream, wordmark cream-on-burgundy).
Exact filename ↔ content mapping (IMG-0…IMG-5) is in `docs/phase-0-discovery.txt` §5.1.

## 4. Design system — source of truth
### 4.1 Which identity wins (CONFIRMED — D1; colors and fonts now from the web brief, D26)
- **A. Brand identity (images)** — cream/ivory + deep burgundy, editorial, didone serif + heavy
  geometric sans, natural-light photography. → **The only style source for the website.**
- **B. PDF deck styling** (light blue, pale yellow, yellow script) → **never use**. PDFs = content only.

### 4.2 Color tokens (web brief brand board — D26; replaces the Phase 0 palette of D19)
| Token | Value | Brief name | Use |
|---|---|---|---|
| `--burgundy-deep` | `#4A0710` | Guinda oscuro | **Predominant**: dark bands, headlines, buttons, text accents on ivory |
| `--burgundy` | `#790B1A` | Guinda principal | Details only (team card backs, rotating hero word) |
| `--ivory` | `#F7F3EA` | Marfil | Main background; text on dark bands |
| `--beige` | `#E5DCCF` | Beige neutro | Secondary backgrounds |
| `--charcoal` | `#262322` | Carbón | Body text |
| `--warm-gray` | `#A7A19A` | Gris cálido | Lines; secondary text **on dark only** (2.3:1 on ivory fails AA) |
| `--yellow` | `#FCE7A6` | Amarillo bebé | Accent (~10 %): selection box, active step |
| `--sky` | `#D7E8F7` | Celeste bebé | Small touch: completed steps, details |
Secondary text on light backgrounds = charcoal softened toward ivory (`color-mix`), so it keeps AA
contrast. Old token names (`--cream`, `--ink`, `--sand`…) are kept as aliases so existing components
keep working. No pure black / pure white backgrounds. Contrast must pass WCAG AA.

### 4.3 Typography
- **Logo: never re-typeset.** Use the logos from the provided images (D8, D20): official lockup =
  cream-on-burgundy wordmark (plus its burgundy-on-cream recolor for the header) and the "dH" monogram.
  Crop them, export optimized PNG/WebP at 2x, and place each only on a background matching its own
  (cream logo on burgundy, burgundy logo on cream). If you can produce a transparent version cleanly,
  show it to the user for approval before using it. Official transparent files are coming (D29).
- Fonts (web brief, D26 — replaces Bodoni Moda + Poppins of D15):
  - **Manrope** 600–800 → headlines and key phrases; Manrope 400–500 → body text and menu.
  - **Satoshi** 400–900 → buttons, labels, short highlighted texts (self-hosted from Fontshare,
    Manrope as fallback).
  - **Playfair Display italic** → only the rotating hero word (brief); the only serif on the site.
- Handwritten annotations (arrows, "Creando nuevas estrategias") → prefer **SVG hand-drawn assets**;
  if a font is needed, ask first (candidate: *Caveat*). Use sparingly — accents only.
Fonts are loaded with `next/font`. Final choices are recorded in `docs/phase-1-*.txt`.

### 4.4 Visual motifs (from the images)
- Generous whitespace, centered/symmetric compositions, calm editorial feel ("quiet luxury").
- Soft **window/leaf shadow (gobo)** overlays on cream backgrounds — subtle, low opacity.
- Light **paper/kraft grain texture** on some sections (very subtle noise, never busy).
- Real objects as frames for the brand: laptop screen, digital camera screen, keyboard keys
  ("Ctrl + N" = new ideas). Product mockups only from provided images.
- Hand-drawn burgundy marker accents: underline swooshes under key words, curved arrows,
  4-point sparkle star ✦, asterisk/burst, small "energy" lines.
- **Instagram pill component**: tiny tracked label "SÍGUENOS EN" above an outlined pill
  (1–1.5px burgundy border, fully rounded), IG icon │ thin vertical divider │ `@digitalhouse.gs`.
- Headline pattern: first lines bold burgundy, last line regular ink, one key phrase underlined
  with a hand-drawn swoosh (as in "Nuevas ideas. / Más estrategia. / Misma pasión por…").
- Buttons: pill-shaped, either burgundy fill + cream text, or outlined burgundy. No gradients,
  no heavy drop shadows, no neon, no glassmorphism.
- Motion: slow, subtle (fade/translate 8–16px, 400–700ms ease-out). Respect `prefers-reduced-motion`.

## 5. Confidential — NEVER publish
From `modelo-de-negocio.pdf`: revenue split percentages (60/40, 50/50), "Nivel 1 / Nivel 2" structure,
specialist fixed fees, the 10–15% coordination fee, the exchange-rate argument ("sale más barato"),
"los clientes locales no son el foco", internal roadmap phases (Credibilidad / Alcance / Educación),
"Fair Play Elite está por cerrar", "Elaborado por…", "Documento interno", "(por ahora)" /
"se incorporará un especialista", "todóloga", "argumento de venta".
Client names (Fair Play Élite, VIDA) are approved only as described in D13.

## 6. Documentation rule (every phase)
At the end of each phase create `docs/phase-<N>-<slug>.txt` (plain text, UTF-8) using this template:
```
PHASE <N> — <NAME>
Date: <YYYY-MM-DD>   Status: <completed | partial>
1. GOAL
2. DECISIONS (with who confirmed them)
3. STRUCTURE — files/folders created or modified (path + one-line purpose)
4. SECTIONS / COMPONENTS — name, location, props, variants, which content it shows
5. STYLES — tokens used/added, fonts, spacing, breakpoints, motion
6. CONTENT — copy used and its source (PDF page/slide or user message)
7. ASSETS — images used, where they live, how they were processed
8. HOW TO RUN / TEST
9. PENDING / OPEN QUESTIONS / PLACEHOLDERS
10. CHANGELOG (bullet list)
```
Keep `docs/README.txt` as an index of all phase docs.

## 7. Tech conventions (confirm in Phase 0 / Phase 1)
- Next.js latest stable, App Router, TypeScript, ESLint. Record exact versions in phase-1 doc.
- Styling: Tailwind CSS (confirmed, D16) with design tokens as CSS variables.
- Images via `next/image`; fonts via `next/font`; metadata via the Metadata API.
- Structure: `src/app`, `src/components/{layout,sections,ui}`, `src/content` (copy as typed data,
  never hard-coded inside components), `src/styles`, `public/brand`.
- Mobile-first; breakpoints recorded in the phase doc. Accessibility: semantic HTML, alt text,
  focus states, AA contrast, `lang="es"`.
- Commands: `npm run dev`, `npm run build`, `npm run lint` must pass before closing a phase.
- Deploy target: Vercel (D9). Commercial site → needs Vercel **Pro** plan (Hobby is non-commercial only).
- Floating WhatsApp button (D6): fixed bottom-right, burgundy circle + cream WhatsApp icon (brand
  colors, not WhatsApp green unless the user asks), `aria-label="Escríbenos por WhatsApp"` (tú, D12),
  opens `https://wa.me/59165999740` with the D17 pre-filled text (URL-encoded `?text=`) in a new tab with `rel="noopener noreferrer"`, never hidden by
  the mobile menu, footer or cookie bars, respects safe-area insets on iOS.
- Contact constants live in ONE file: `src/content/contact.ts` (phone, wa.me URL, email, Instagram).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
