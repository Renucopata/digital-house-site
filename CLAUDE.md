# CLAUDE.md — DigitalHouse Growth Studio · "The Studio" website

Read at the start of every Claude Code session. Follow it strictly.

## 1. The project
Marketing website for **DigitalHouse Growth Studio**, a business, brand and digital consultancy
(*"No vendemos estética. Vendemos crecimiento."*). The site is being rebuilt as **"The Studio"**: the
visitor is a camera that enters an illustrated 2.5D studio, where each service area is a station
you zoom into. The old one-page site stays live on `main` until the redesign is approved.

**Only two instruction files:**
- This file: rules and decisions.
- `docs/STUDIO.md`: the concept, stations and animations, assets, phases and status, open decisions,
  ideas, progress log. Read it before any redesign work.

If they disagree, STOP and ask. `docs/archive/` holds the old site's docs: history only, never instructions.

## 2. Working rules
1. **Don't assume.** If something is ambiguous or contradictory, stop, list the doubt with options, and wait.
2. **One phase at a time.** Work only on the phase the user names. At the end: add a progress-log entry to
   `docs/STUDIO.md` (§12 there), update the phase status, summarize, list open questions, STOP. Never start the next phase without approval.
3. **Scope discipline.** Change only what the task needs. No drive-by refactors. Re-read a file before
   editing it; never rewrite from memory. Files you didn't create this session are unchanged unless
   the user says otherwise.
4. **Dependencies:** approved for the redesign: `gsap`, `next-intl`, `sharp` (dev, asset scripts).
   Anything else: ask first (name, purpose, size, alternatives).
5. **Never invent content.** No fake clients, metrics, prices, testimonials or contact data. Missing
   text → visible `[PENDIENTE: …]` placeholder plus a note in the progress log.
6. **Never publish confidential information** (§4.4).
7. If you need a file, image or answer you don't have, ask for it by name.

## 3. Confirmed decisions
| # | Decision |
|---|---|
| S1 | Concept = "The Studio" as described in `docs/STUDIO.md`. |
| S2 | **Real routes**, one per station, plus second-level zooms (e.g. `/marketing/redes-sociales`). Replaces the old single-page rule. |
| S3 | **Spanish (main, `/`) + English (`/en`)** with `next-intl`. Replaces "Spanish only". |
| S4 | Visual style: 2.5D flat editorial illustration with depth layers. Pieces made in ChatGPT; **no text or logos baked into images**. All text, logos and screen contents are added in code. |
| S5 | 5 service areas: Consulting & Strategy (includes Business Intelligence), Marketing / Content / Audiovisual, Digital Solutions, Events, Merchandising. Plus Credentials, Contact, and the director's chair / clapperboard ("¡Acción!"). |
| S6 | Old sections not in the concept (Equipo, Manifiesto, the old hero, the marquee...) are dropped. |
| S7 | Work happens on branch **`redesign-studio`**. Every phase is checked on its Vercel preview URL. Merge to `main` only with the user's approval. |
| S8 | No Three.js. Stage = layered images positioned in code; camera, parallax and animations with GSAP; effects in CSS/SVG. |
| S9 | Contact = paper form + vintage phone (WhatsApp) + desk calendar (Google Calendar booking). How the form is sent is **pending** (open decisions in `docs/STUDIO.md`). |

## 4. Brand and content rules
### 4.1 Names and voice
- Brand name in text: **"DigitalHouse Growth Studio"**. Instagram: `@digitalhouse.gs`.
- Spanish uses **tú**, consistently (never voseo, never usted).
- English is a translation of the approved Spanish. Never write English copy that has no Spanish source.

### 4.2 Content rules
- No promised results, deadlines or prices. Never the word "gratuita".
- Specialists are not presented as staff (Matias Rossel is an ally: production and merchandising).
- "Technogym" appears **only** as a client logo/name in Credentials.
- Copy lives in `src/content/` as typed data, never hard-coded in components.

### 4.3 Contact data (one file only: `src/content/contact.ts`)
- WhatsApp: **+591 65999740** → `https://wa.me/59165999740`, pre-filled text
  **"Hola, quiero más información sobre DigitalHouse Growth Studio."** (URL-encoded `?text=`),
  opened in a new tab with `rel="noopener noreferrer"`.
- Email: **r.rengel99@gmail.com**.

### 4.4 Confidential: NEVER publish
From the internal business-model PDF: revenue splits (60/40, 50/50), "Nivel 1 / Nivel 2", specialist
fees, the 10–15% coordination fee, the exchange-rate argument ("sale más barato"), "los clientes
locales no son el foco", the internal roadmap phases (Credibilidad / Alcance / Educación), "Fair Play
Elite está por cerrar", "Elaborado por…", "Documento interno", "(por ahora)" / "se incorporará un
especialista", "todóloga", "argumento de venta".

### 4.5 Logos
- Never redraw or re-typeset the DigitalHouse logo; use the provided files in `public/brand/`.
  Official transparent files may still arrive; ask before replacing.
- Client logos: the processed ivory lettering files in `public/clients/` (made by
  `tools/client_logos.py`). Fair Play Élite and VIDA have no file: set them as text.

## 5. Design system
- **Colors:** `src/styles/tokens.css` (ivory, beige, burgundy deep, burgundy, charcoal, warm gray;
  yellow and sky as small accents only). Text must pass WCAG AA.
- **Fonts** (`next/font`): Manrope (headlines 600–800, body 400–500), Satoshi (buttons, labels,
  self-hosted), Playfair Display italic (rare accent only).
- **Illustrations:** originals in `brand-assets/area/` (not served). Optimized WebP in `public/studio/`
  (made by a script in `tools/`). Never edit originals.
- **Motion:** no fixed duration limits. Cinematic camera moves are expected. Rules that always apply:
  every animation has a `prefers-reduced-motion` fallback (instant, no camera moves); sound is off by
  default; idle loops stay subtle and out of sync; animate only `transform` and `opacity` where possible.
- Buttons: pill-shaped, burgundy fill + ivory text, or burgundy outline. No gradients on UI, no neon,
  no glassmorphism.

## 6. Tech conventions
- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. Structure: `src/app`,
  `src/components`, `src/content`, `src/styles`, `public/`, `tools/` (scripts, not in the build).
- **Persistent stage:** the studio lives in a shared layout that stays mounted between routes.
  The route tells the camera where to go; it never reloads the stage.
- **Stage coordinates:** pieces and hotspots are positioned in one fixed design coordinate space,
  stored as data (e.g. `src/content/studio-layout.ts`), never as magic numbers inside components.
- **Text panels are HTML outside the scaled stage**, so they stay sharp, translatable and indexable.
- **Progressive enhancement:** every route renders its real content even without JS/animation.
- Accessibility: semantic HTML, keyboard-reachable hotspots with visible focus, alt text,
  `lang` per locale.
- Images: WebP/AVIF, sized for their largest zoom, lazy-loaded when off-stage.
- Commands: `npm run dev`, `npm run lint`, `npm run build`. Lint and build must pass to close a phase.
- Deploy: Vercel. A commercial site needs the **Pro** plan. Production URL until a domain is
  connected: `https://digital-house-site-indol.vercel.app`.

## 7. Documentation
- No separate phase files. When a phase ends, add a short entry to the progress log in `docs/STUDIO.md`
  (date, what was built, decisions, pending) and update the phase status there.
- When a decision is made, write it where it belongs in `docs/STUDIO.md` and remove it from the open decisions.
- Keep `README.md` current for people (run, structure, deploy). It is not an instruction file.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->