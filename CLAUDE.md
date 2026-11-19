# CLAUDE.md — DigitalHouse Growth Studio · new design (branch `new-design`)

Read at the start of every Claude Code session. Follow it strictly.

## 1. The project
Marketing website for **DigitalHouse Growth Studio**, a business, brand and digital consultancy
(*"No vendemos estética. Vendemos crecimiento."*). On this branch the site is rebuilt to copy the
**structure, section rhythm, motion and interactions of https://two26.studio**, with Digital House's
own brand, logo, copy and content. Never copy two26's text, logo, illustrations, photos, videos or
project names. The old one-page site stays on `main` until the new design is approved.

**Instruction files:**
- This file: rules and decisions.
- `docs/NEW-DESIGN.md`: the approved plan (animation map, file tree, content schema, phases),
  open questions and the progress log. Read it before any work on this branch.

If they disagree, STOP and ask. The old `docs/phase-*.txt` files and `PLAN.md` describe the old site:
history only, never instructions.

## 2. Working rules
1. **Don't assume.** If something is ambiguous or contradictory, stop, list the doubt with options, and wait.
2. **One phase at a time** (P1–P6 in `docs/NEW-DESIGN.md`). At the end: progress-log entry in
   `docs/NEW-DESIGN.md`, lint and build pass, summary, open questions, STOP. Never start the next
   phase without approval.
3. **Scope discipline.** Change only what the task needs. No drive-by refactors. Re-read a file before
   editing it; never rewrite from memory.
4. **Dependencies approved:** `gsap` (with its free plugins: ScrollTrigger, SplitText, DrawSVG,
   CustomEase), `@gsap/react`, `lenis`, `next-intl`, `sharp` (dev, asset scripts). Anything else: ask first
   (name, purpose, size, alternatives).
5. **Never invent content.** No fake clients, projects, testimonials, metrics, prices or contact data.
   Missing content → visible `[PENDIENTE: …]` placeholder + a note in the progress log. Playful
   micro-copy (pills, captions, closing line) may be drafted, but is marked as a draft for approval.
6. **Never publish confidential information** (§4.4).
7. If you need a file, image or answer you don't have, ask for it by name.

## 3. Confirmed decisions (new design)
| # | Decision |
|---|---|
| N1 | Reference = two26.studio: replicate layout, section order, timings and interactions as closely as possible, with our own content. (2026-11-19) |
| N2 | Pages: Home, `/proyectos` (+ `/proyectos/[slug]`), `/nosotros`. English: `/en`, `/en/work` (+ `/en/work/[slug]`), `/en/about`. Spanish is the main language (no prefix). |
| N3 | `/proyectos` has **both** the two26 card stack grid and a text-only project list with a cursor-following preview image. |
| N4 | Route changes use a short **wipe** made from the loader's exit strokes (two26 has none; our addition). |
| N5 | Headlines: **Anton** (condensed, all caps) via `next/font`. Body: Manrope. Buttons and labels: Satoshi. |
| N6 | The header has no office hours. Its **"Hablemos"** CTA (and every "let's talk" CTA) opens the **contact overlay**. |
| N7 | The **floating WhatsApp button** stays: visible at all times, every page and breakpoint, never hidden by the menu, overlays or footer; `aria-label="Escríbenos por WhatsApp"`; brand colors; respects iOS safe-area insets. |
| N8 | Logo animation = the "dH" lettering from the user's reference artifact, rebuilt with GSAP: strokes write "d" then "H", then the fill settles. Plays in the loader, as a short replay on header-logo hover, static in the footer. |
| N9 | No global custom cursor (two26 has none); only contextual ones (testimonial arrow, project cursor pills, list preview), fine pointers only. |

## 4. Brand and content rules
### 4.1 Names and voice
- Brand name in text: **"DigitalHouse Growth Studio"**. Instagram: `@digitalhouse.gs`.
- Spanish uses **tú**, consistently (never voseo, never usted).
- English is a translation of the approved Spanish. Never write English copy that has no Spanish source.

### 4.2 Content rules
- No promised results, deadlines or prices. Never the word "gratuita".
- Specialists are not presented as staff (Matias Rossel is an ally: production and merchandising).
- "Technogym" appears **only** as a client logo/name (Credentials-type uses).
- Copy lives in `src/content/` as typed data (ES + EN), UI strings in `src/messages/*.json`;
  never hard-coded in components.
- Service areas (5): Consultoría y Estrategia (incluye Business Intelligence) · Marketing, Contenido
  multimedia y Producción audiovisual · Desarrollo de soluciones digitales · Merchandising · Eventos.

### 4.3 Contact data (one file only: `src/content/contact.ts`)
WhatsApp, email and Instagram come only from `contact.ts`. WhatsApp links open in a new tab with
`rel="noopener noreferrer"` and the pre-filled text
**"Hola, quiero más información sobre DigitalHouse Growth Studio."** (URL-encoded `?text=`).

### 4.4 Confidential: NEVER publish
From the internal business-model PDF: revenue splits (60/40, 50/50), "Nivel 1 / Nivel 2", specialist
fees, the 10–15% coordination fee, the exchange-rate argument ("sale más barato"), "los clientes
locales no son el foco", the internal roadmap phases (Credibilidad / Alcance / Educación), "Fair Play
Elite está por cerrar", "Elaborado por…", "Documento interno", "(por ahora)" / "se incorporará un
especialista", "todóloga", "argumento de venta".

### 4.5 Logos
- Never redraw or re-typeset the official DigitalHouse wordmark; use the files in `public/brand/`.
  The animated "dH" mark comes from the user's reference artifact (N8).
- Client logos: the processed ivory lettering files in `public/clients/` (made by
  `tools/client_logos.py`). Fair Play Élite and VIDA have no file: set them as text.

## 5. Design system
- **Colors:** `src/styles/tokens.css` (ivory, beige, burgundy deep, burgundy, charcoal, warm gray;
  yellow and sky as small accents). Until the user defines roles: ivory background, **burgundy as
  the "hot" accent** (strokes, footer, panels), charcoal / burgundy deep for headlines and sticker
  pills. Text must pass WCAG AA.
- **Fonts:** see N5, all through `next/font`.
- **Style:** bold and playful: huge all-caps headlines, small rotated "sticker" pills, thick looping
  stroke lines, springy pops, lots of breathing room, video-heavy sections, cheeky micro-copy.
  Buttons: pills. No gradients on UI, no neon, no glassmorphism.
- **Motion:** GSAP (+ ScrollTrigger, SplitText, DrawSVG) through `useGSAP` (automatic cleanup);
  Lenis smooth scroll synced to ScrollTrigger through `gsap.ticker`. Timings follow two26 (see the
  animation map). Every effect has a `prefers-reduced-motion` fallback (finished state, no smooth
  scroll, no pin/scrub) and degrades gracefully on touch (no magnetic/hover-only effects, swipe
  where needed). Animate `transform` and `opacity` where possible.

## 6. Tech conventions
- Next.js 16 (App Router; middleware is called **proxy** — `src/proxy.ts`), React 19, TypeScript,
  Tailwind v4, next-intl. Structure: `src/app/[locale]`, `src/components/{brand,layout,motion,ui,home,work,about}`,
  `src/content`, `src/messages`, `src/i18n`, `src/lib`, `src/styles`, `public/`, `tools/`.
- Images: `next/image` (AVIF/WebP). Videos: muted, autoplay, loop, `playsInline`, with posters,
  lazy below the fold. Hero video ≤ 3 MB.
- Accessibility: semantic HTML, keyboard reachable, visible focus, focus trap in overlays, Esc closes,
  alt text, `lang` per locale.
- Quality bar: Lighthouse mobile ≥ 90 performance / 100 accessibility / 100 SEO; metadata + OG per
  page, sitemap with both locales, JSON-LD Organization.
- Commands: `npm run dev`, `npm run lint`, `npm run build`. Lint and build must pass to close a phase.
- Dev server: Claude may start it only for its own tests and must stop it afterwards; the user runs it themselves.
- Deploy: Vercel. A commercial site needs the **Pro** plan. Production URL until a domain is
  connected: `https://digital-house-site-indol.vercel.app`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
