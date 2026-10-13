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
### 4.1 Which identity wins (CONFIRMED — D1)
- **A. Brand identity (images)** — cream/ivory + deep burgundy, editorial, didone serif + heavy
  geometric sans, natural-light photography. → **The only style source for the website.**
- **B. PDF deck styling** (light blue, pale yellow, yellow script) → **never use**. PDFs = content only.

### 4.2 Color tokens (measured from the images in Phase 0 — approved, D19)
| Token | Value | Use |
|---|---|---|
| `--burgundy` | `#670812` | Logo color, primary text accents, borders, buttons |
| `--burgundy-deep` | `#51020C` | Full-bleed dark sections (cream logo on it) |
| `--cream` | `#F8F4E9` | Main page background |
| `--ivory` | `#F3EBE0` | Text on dark sections, alternate background, cards |
| `--sand` | `#EFE6DC` | Kraft-paper sections, photo-like backgrounds |
| `--sand-deep` | `#E7D8CA` | Brush smears / kraft accents |
| `--ink` | `#481F1E` | Body text (dark warm brown, not pure black) |
| `--ink-soft` | `#6B5552` | Secondary text |
| `--line` | `--burgundy` @ ~30–60% | Hairlines, pill borders |
No light blue, no yellow, no pure black backgrounds, no pure white (#FFF) backgrounds in identity A.
Only two "moods": light (cream + burgundy) and dark (burgundy + cream). Contrast must pass WCAG AA.

### 4.3 Typography
- **Logo: never re-typeset.** Use the logos from the provided images (D8, D20): official lockup =
  cream-on-burgundy wordmark (plus its burgundy-on-cream recolor for the header) and the "dH" monogram.
  Crop them, export optimized PNG/WebP at 2x, and place each only on a background matching its own
  (cream logo on burgundy, burgundy logo on cream). If you can produce a transparent version cleanly,
  show it to the user for approval before using it. No official font files (D15).
- Display / editorial headlines → **Bodoni Moda** (high-contrast didone, lowercase-friendly, light
  weight, like "digital" in the logo).
- Strong headline / emphasis → **Poppins 800**, uppercase allowed (like "HOUSE").
- Labels / eyebrows → **Poppins 400**, UPPERCASE, very wide tracking (~0.35em), small size
  (like "GROWTH STUDIO", "SÍGUENOS EN").
- Body → **Poppins 400**, comfortable line-height (the "Nuevas ideas" post is Poppins).
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
