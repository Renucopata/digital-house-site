# PLAN.md — DigitalHouse Growth Studio website (phased)

Single landing page with anchors (D3). Spanish only (D4). Style = cream + burgundy (D1).
Each phase ends with: `npm run build` + `npm run lint` passing (from Phase 1 on), the phase `.txt`
doc in `docs/`, a summary to the user, and a STOP for approval. See CLAUDE.md §1.1, §2 and §6.

---

## Phase 0 — Discovery & confirmation (no app code)
1. Inventory `/brand-assets/` (filenames, dimensions, formats, backgrounds).
2. Read both PDFs. Build a content map: PUBLIC (portfolio) vs INTERNAL (business model, context only).
3. Extract the exact color palette from the brand images with a script (e.g. Python + Pillow).
   Compare with CLAUDE.md §4.2 and report.
4. Compare the logo lettering with the font candidates in CLAUDE.md §4.3 and report best matches.
5. Plan how to extract the 3 logos from the images (crop boxes, output sizes).
6. Ask the user ONLY the items still pending in CLAUDE.md §1.1 (P1–P7) plus any new doubt found.
   Do not re-ask confirmed decisions D1–D10.
Deliverable: `docs/phase-0-discovery.txt`.

## Phase 1 — Project setup & design system
1. Create the Next.js app (latest stable, App Router, TS, ESLint) — show the exact command first.
2. Folder structure from CLAUDE.md §7. Extracted, optimized logos in `public/brand/`.
3. Design tokens (colors, type scale, spacing, radii, motion) as CSS variables (+ Tailwind mapping
   if P6 = yes). Section themes: light (cream), dark (burgundy), sand.
4. Fonts via `next/font` with the approved families.
5. UI primitives: `Button` (filled / outline pill), `Eyebrow`, `SectionHeading`, `HandUnderline`,
   `HandArrow`, `Sparkle`, `InstagramPill`, `Container`, `Section` (theme + optional grain / window
   shadow overlay), `WhatsAppFloat`.
6. `src/content/contact.ts` with the confirmed contact data (D6, D7).
7. A hidden `/styleguide` route (noindex) rendering all tokens and primitives for review.
Deliverable: `docs/phase-1-setup-design-system.txt`.

## Phase 2 — Layout & global elements
1. Root layout: `lang="es"`, default metadata, favicon/app icon from the "dH" monogram.
2. Header (sticky): logo, anchor nav (Quiénes somos · Cómo trabajamos · Servicios · Equipo ·
   Contacto), CTA pill → WhatsApp, accessible mobile menu. Active-section highlight on scroll.
3. **Floating WhatsApp button — always visible** (D6), above every other layer.
4. Footer: cream logo on burgundy, tagline, InstagramPill, WhatsApp + email links, ©.
5. Smooth scrolling with header offset (`scroll-margin-top`), skip-to-content link.
Deliverable: `docs/phase-2-layout.txt`.

## Phase 3 — Landing sections, part 1 (copy from the public portfolio, rewritten per D4/P2)
Each section has an `id` for the anchors.
1. `#inicio` **Hero** — "No vendemos estética. *Vendemos crecimiento.*" + "Lo digital es el motor…"
   + CTA (WhatsApp) + subtle window-shadow; optional brand mockup image.
2. `#quienes-somos` — 3 cards: Mentalidad de negocio (no solo visual) · Lo digital al centro
   (no como canal aparte) · Equipo de especialistas (no una sola persona).
3. `#como-trabajamos` — "Un proceso, no una improvisación": Diagnóstico → Estrategia → Ejecución →
   Medición → Optimización with their descriptions (horizontal desktop / vertical mobile).
Deliverable: `docs/phase-3-sections-part-1.txt`.

## Phase 4 — Landing sections, part 2
4. `#servicios` — "5 pilares de servicio": 5 blocks (01–05) each with title, tagline, "Incluye"
   chips and "Entregable" — all on the same page (expandable cards/accordion or stacked blocks;
   propose the pattern to the user before building). Content from portfolio slides 06–10.
5. `#equipo` — Nicole Pantoja, Nicole Vidaurre, René (+ Eventos & Patrocinios band), per P4.
6. Manifesto block — "Nuevas ideas. Más estrategia. Misma pasión por hacer crecer tu negocio."
   with hand-drawn underline + Ctrl+N image.
7. `#contacto` — "Entendamos tu negocio primero." + WhatsApp CTA + email + Instagram
   (+ form only if P6 = yes).
Deliverable: `docs/phase-4-sections-part-2.txt`.

## Phase 5 — Motion, responsive & accessibility polish
Scroll reveals (reduced-motion safe), hover/focus states, test at 360 / 768 / 1024 / 1440 px,
keyboard navigation, contrast audit, alt texts, check the WhatsApp button never overlaps critical
content, Lighthouse accessibility ≥ 95.
Deliverable: `docs/phase-5-polish.txt`.

## Phase 6 — SEO, performance & Vercel deploy
Metadata, Open Graph image (brand-styled), sitemap.xml, robots.txt, JSON-LD (Organization /
ProfessionalService with the confirmed contact data), image optimization, Lighthouse performance
≥ 90, README with run/deploy steps, Vercel checklist (project import, domain P1, Pro plan note).
Deliverable: `docs/phase-6-seo-deploy.txt` and final `docs/README.txt` index.
