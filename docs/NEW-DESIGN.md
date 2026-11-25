# Digital House — "two26-style" rebuild (branch `new-design`)

## Context
Rebuild the Digital House site so it copies the **structure, section rhythm, motion and interactions** of https://two26.studio, using Digital House's own brand, logo, copy and content. Their text, logo, illustrations, photos, videos and project names are never copied.

The branch `new-design` currently holds the old one-page site:
- Next 16.3.8, React 19, Tailwind v4.
- Tokens are in `src/styles/tokens.css`.
- Copy lives in `src/content/*.ts`.
- There is no GSAP, Lenis or i18n yet.

**Decisions from you (this session):**
- **/work:** build both: the real two26 card grid **and** your text list with a hover preview.
- **Route changes:** add a wipe built from the loader's exit strokes.
- **CLAUDE.md:** rewrite it for this design in P1 and keep the floating WhatsApp button.
- **Headlines:** add a condensed display font for headlines only.

## How I studied two26
I opened `/`, `/work`, `/about` and `/work/heygluco` in Playwright on desktop (1440) and mobile (390), and took screenshots of every section, the contact overlay and the mobile menu.

I also read the site's own animation scripts. Its stack is Webflow + **GSAP 3.15** (SplitText, ScrollTrigger, DrawSVG, MotionPath, CustomEase, CustomBounce) + **Lenis 1.1.20**. That means the timings below are their real values, not guesses.

Their visual signature:
- huge condensed all-caps headlines
- small rotated black "sticker" pills over the headlines
- thick looping brush-stroke SVG lines
- `back.out` springy pops everywhere
- one hot accent color on a pale background

---

## 1. Animation map: everything found on two26 → how we build it
Unless a row says otherwise, everything is GSAP via `useGSAP` (auto `gsap.context` cleanup).
- "Lines" = SplitText lines, each wrapped in an overflow-hidden mask.
- "Pill pop" = shell `scale .4→1`, `back.out(2.5)`, `.55s`, then the inner text slides up from its mask (`y 105%→0`, `back.out(1.6)`, `.5s`).

| # | Effect on two26 (real values) | Our build |
|---|---|---|
| 1 | **Loader.** Two giant strokes (3000px wide, accent + pale) cover the screen. The logo draws itself (tracer ribbon, then strokes, then letters pop with `back.out(3)`, stagger .1, timeline ×1.25). Exit waits for **both** logo-done and `window.load` (6 s safety). Exit: hold .2 s, pale stroke sweeps off down-right (`.65s power2.inOut`, width→1000, x900/y1800), logo fades at 20 %, accent stroke sweeps off down-left starting at 25 %. Then a `loaderComplete` event starts the hero. **Skipped on internal navigation** (sessionStorage flag) unless it's a reload; skipped under reduced motion. Scroll is locked meanwhile. | `<Loader>` with the same logic and the same exit, in our colors. The logo part is our **dH write-on** (§2). A `loaderDone` store replaces their DOM event, and heroes subscribe to it. |
| 2 | **Hero entrance** (home, work, about). Heading lines `y→0, opacity`, `.85s back.out(1.4)`, stagger .12. Pills pop. Decorative swirl strokes `drawSVG 0→100%` + `strokeWidth 0→orig`, `.9s power2.out`. Work/about also: illustration `scale .65, rot -6° → 1/0`, `back.out(2.2)`, then paragraph lines. Whole timeline at ×0.75. Media = an autoplay video (home). | `<HeroIntro>` wrapper + `useHeroTimeline()`. It plays after `loaderDone`. |
| 3 | **Hero ribbon marquee.** Text on a **curved SVG path** (`<textPath>`) loops at a constant speed (path length / 75 px·s⁻¹). On scroll in (`top 85%`), the ribbon and its text mask draw right→left (`1.3s power2.out`). The mask is then removed for performance. It does **not** react to scroll velocity. | `<RibbonMarquee>`: SVG `textPath` + DrawSVG reveal, exactly as on two26. The scroll-velocity behaviour you asked for lives in effects 5 and 22, which is where two26 has it. |
| 4 | **About teaser (pinned read-along).** The section pins for 2200 px (tablet 1550 / mobile 1150), scrub .8. Paragraph chars: `scale 1.12` + random tilt ±4° + accent color, then settle to `1 / 0°` / text color, so they "light up" as you scroll. Three tagline pills pop at 35 %, 72 % and 96 % of the pin (`back.out(2)`). | `<PinnedReadAlong>` (ScrollTrigger pin + SplitText chars). |
| 5 | **Showcase gallery.** Infinite horizontal strip of videos and images. Idle speed 1.5 px/frame. **Direction flips with scroll direction**, and the speed boosts with velocity `min(v/220, 10)`. Slides scale .95 at the center to 1 at the sides. | `<VelocityStrip>`: `gsap.ticker` loop plus ScrollTrigger velocity, cloned sets measured for a seamless wrap. Covers your 6-item gallery. |
| 6 | **Selected-works cards (home).** Clip reveal `inset(42.5%)` + 36px radius → `inset(0)` / 0. Inner media `scale 1.45, rotX 25°`, small Y/Z tilt → 0. `1.25s power3.out`, `top 85%`, plays once (stays revealed on scroll up). | `<ProjectCard reveal>` |
| 7 | **Card hover.** A brush stroke draws over the image top→bottom (`.95s`). A mask stroke then reveals a **second (hover) image** (`1.05s`, +.35 s). The arrow kicks −45° then springs back (`elastic.out(1.15,.35)`). Leaving reverses the timeline at ×1.3. | `<ProjectCard>` hover timeline. Desktop-only; touch shows the base image. |
| 8 | **"See all" block.** Big line-split statement, 3 rotated pills, CTA. `top 80%`, ×0.75. | `<StatementCTA>` |
| 9 | **Services.** One long winding stroke draws with scroll (`scrub 1.2`, `top 70%`→`bottom 70%`); there is a separate mobile path. When the line reaches each service, its icon pops (`scale 0→1`, `back.out(3.5)`) and its description bubble pops with a −5° tilt. | `<ServicesPath>` for our **5 areas**. The path is our own SVG, with a desktop and a mobile variant. |
| 10 | **Testimonials = stacked deck.** Tilted cards sit on an accent panel. Click/tap or swipe up/down: the top card flies up (`yPercent −140`, `.38s power2.inOut`) and drops to the bottom of the pile; the next one straightens. Side tick indicator. On desktop a custom **arrow cursor** points up or down depending on which half you hover (quickTo .15). | `<TestimonialDeck>` with keyboard support (buttons + arrow keys) added. |
| 11 | **FAQ.** One item is always open. Open: the question pill shrinks to 50 % width (75 % on mobile) and gains a border (`.45s`). The answer bubble grows from `height 0, scale 0` (`.5s back.out(1.6)`). A logo badge pops, then the text fades up. Close is the reverse (`.22–.45s`). | `<Faq>` built on `<button aria-expanded>` + region. |
| 12 | **Closing CTA + footer.** "Okay, that's enough website" heading lines (`.8s back.out(1.6)`, stagger .1). Accent footer with a looping-stroke texture. The **giant logo at the bottom stretches** `scaleY .15→1.35` with scroll velocity and settles with `elastic.out(1.2,.35)` (1.4 s) at the very bottom. Footer links and email: per-letter **kinetic hover** (`scale 1.14`, random tilt ±7°, `back.out(1.8)`). | `<ClosingCTA>` + `<Footer>` + `<StretchLogo>` (our dH/wordmark) + `<KineticText>` |
| 13 | **CTA buttons** (pill with an arrow circle). Hover: a fill circle scales ×10 (`.55s`), the arrow loops (−25° / 0 with `back.out(2.5)`), **magnetic** follow (`.3s`) with inner parallax. Leaving springs back with `elastic.out(1.1,.4)` (.8 s). | `<CtaButton>` (magnetic only with a fine pointer) |
| 14 | **Nav pills.** An SVG outline draws around the pill on hover (`.5s power1.inOut`), reverses at ×1.4. | `<NavPill>` |
| 15 | **Mobile menu.** The toggle icon morphs (curve → ×, rotate 45°, `.85s power3.inOut`). Overlay fades in (.4 s). Link pills pop from `scale .4` + random tilt ±10° (`.75s back.out(2.2)`). Close: `scale .8`, stagger .04, then fade. Scroll is locked. | `<MobileMenu>` + focus trap + Esc |
| 16 | **Contact overlay.** Opened by every "Let's talk" CTA. A stroke draws and its width grows to 1600 px to flood the screen (`.9s power2.inOut`). Then: logo pops, close pill pops, the big heading's **letters pop with a tilt**, paragraph lines, email labels (word slide), emails (kinetic letters), social pills, and an illustration pops in last. Close: fade .3 s, then the stroke reverses (.45 s). Esc closes it. | `<ContactOverlay>` + `ContactProvider`. Contents: big split headline, channels (WhatsApp, email, Instagram from `contact.ts`), socials, illustration. Focus trap, Esc, backdrop close and `inert` page. |
| 17 | **Smooth scroll.** Lenis, duration 1.7 (touch 1.1), `syncTouch:false`. `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker` drives `lenis.raf`, `lagSmoothing(0)`. | `<SmoothScroll>` on window scroll (no wrapper div): reset to top + `ScrollTrigger.refresh()` on every route change; off under reduced motion. |
| 18 | **/work grid stack.** As the next row scrolls up, the previous card scales to .75 with an alternating ±2.5–4.5° tilt while a paint-stroke cover wipes over it (`scrub .6`). Desktop: the project's name and category **pills follow the cursor** (lerp .16, each pill trailing a bit more). | `<WorkStack>` |
| 19 | **/work text list with a floating preview** (your brief, not on two26). Hovering a row shows a preview image that follows the cursor (quickTo, slight rotation by velocity) and crossfades between rows. Touch: no preview; rows are plain links. | `<WorkList>` |
| 20 | **/about story → team.** A thick scroll stroke (100/75/50 px) draws through the story blocks (`scrub .8`), then its width explodes to flood the team section into the accent color. Story blocks: tag fade, heading lines (`back.out(1.7)`), paragraph lines, illustration pop. | `<StoryPath>` |
| 21 | **Team cards → popup.** Clicking a card expands it into a modal (scale from the card's box, `.65s back.out(1.4)`). Bio and socials stagger in; the close button spins in. Esc and the backdrop close it. | `<TeamCard>` + `<TeamDialog>` (native `<dialog>`) |
| 22 | **Behind-the-scenes moodboard.** Two infinite photo rows moving in opposite directions. **Both flip with scroll direction**, with a velocity boost (`min(v/220,8)`, damped ×.92 per frame). On desktop hover they **ease to a stop** (.7 s). | Same `<VelocityStrip>` with `reverse` and `pauseOnHover` |
| 23 | **Office rules (numbered).** Sticky stacked cards (top 5em, +5em each; +3em on mobile), each with a scrubbed progress bar (`scaleX`). Heading letters `back.out(1.7)`, stagger .025; paragraph lines. | `<RulesStack>` |
| 24 | **Route change.** None on two26 (the loader just skips). | **Our addition:** `<PageTransition>`. Clicking an internal link sweeps in two thick strokes (the loader's exit in reverse, ~.5 s); then `router.push`; when the new page is ready they sweep out and the hero plays. |
| 25 | **Custom cursor.** two26 has **no global custom cursor**, only the contextual ones in 10, 18 and 19. | Contextual cursors only (fine pointers only). |

**Not seen clearly, so I won't invent them (questions below):**
- the capabilities ("we've got range") tag cloud: no script found
- the case-study page: no unique animation besides card hover and Lenis
- the header on scroll: it stays fixed; no hide/show seen

Their console also showed errors and some fallback code; we won't replicate those.

**Reduced motion everywhere:**
- no loader drawing (finished logo shown)
- no Lenis
- no pin or scrub
- strips static and wrapped
- reveals shown instantly
- overlays fade only
- implemented with `gsap.matchMedia()`

**Touch:**
- magnetic, cursors and hover previews are off
- the testimonial deck uses swipe
- strips keep the auto-scroll

## 2. dH logo that writes itself
**Source:** your artifact. I read its code.
- It is a `viewBox 0 0 1000 1000` mark made of **filled shapes**:
  - **d**: elliptical ring bowl (evenodd) + stem with a hooked top
  - **H**: three rects
- **Animation:** one continuous **pen path** traces a squiggle lead-in → d bowl → d stem → H left stem → crossbar → right stem → exit tail. A 170-wide **mask stroke** follows 220 units behind and reveals the fill. It runs 2.1 s with cosine easing, then a curtain rises.
- It is hand-rolled with rAF in the artifact's own colors (#d63b36 / #630a2a), not ours.

**Finishing (my proposal; tell me if "unfinished" meant something else):**
1. Port it to **GSAP** with two strokes: pen `drawSVG` with a moving window, and mask `drawSVG 0→100%`. Order: **d first, then H**.
2. Add a **fill settle** at the end: the pen fades, the fill color tweens from pen color to brand color, and there is a small `back.out` scale pop. This doesn't exist yet.
3. Trim the off-canvas lead-in and tail so the mark centers properly at small sizes.
4. Check where the mask under-covers corners (the H right stem is 144 wide, the d hook) and widen it where needed.
5. Use the repo colors.

`<DhLogo mode="write" | "replay" | "static">`:
- **write** = loader
- **replay** = a short ~0.8 s redraw on header-logo hover
- **static** = footer
- reduced motion → static

## 3. File tree (new / changed)
```
src/
  proxy.ts                         next-intl locale routing (Next 16 renamed middleware → proxy; check node_modules/next/dist/docs first)
  i18n/{routing.ts,request.ts,navigation.ts}
  messages/{es.json,en.json}       UI strings (buttons, labels, aria)
  app/
    [locale]/layout.tsx            fonts, providers, Header, Footer, overlays, Loader, PageTransition, WhatsAppFloat
    [locale]/page.tsx              home
    [locale]/(work)/proyectos|work/page.tsx, .../[slug]/page.tsx   (localized pathnames)
    [locale]/nosotros|about/page.tsx
    sitemap.ts robots.ts           updated (all routes, both locales, hreflang)
  content/                         typed data, ES+EN (schema §5)
    site.ts contact.ts (kept)  home.ts about.ts projects.ts services.ts testimonials.ts faq.ts team.ts
  lib/gsap.ts                      register ScrollTrigger, SplitText, DrawSVG, CustomEase; shared eases
  components/
    motion/  SmoothScroll Loader PageTransition SplitLines KineticText RibbonMarquee VelocityStrip PinnedReadAlong RevealMedia
    brand/   DhLogo StretchLogo
    layout/  Header NavPill MobileMenu ContactOverlay ContactProvider LanguageSwitch Footer ClosingCTA WhatsAppFloat(kept) SkipLink(kept) StructuredData(updated)
    ui/      CtaButton Pill SectionLabel
    home/    Hero AboutTeaser Showcase SelectedWorks ProjectCard StatementCTA ServicesPath TestimonialDeck Faq
    work/    WorkHero WorkStack WorkList CaseHero CaseBlocks CaseMediaGrid NextProject
    about/   AboutHero StoryPath TeamCards TeamDialog Moodboard RulesStack Capabilities
styles/tokens.css                  + new tokens (§4); old aliases kept until the old sections are deleted
```
**Removed in P3** (replaced by the new home):
- the old `components/sections/*`
- `AreasShelf`, `SelectionBox`, `RotatingWord`, `TeamCard`, `LogoMarquee`, `RevealObserver`
- old `home.ts` keys

**Kept / reused:**
- `contact.ts` as the single source (current values: WhatsApp +591 79559006, email digitalhouse.gs@gmail.com; note CLAUDE.md lists older numbers, and I'll follow `contact.ts`)
- `site.ts`
- `public/brand/*`
- `public/clients/*` (available for a client strip if you want one)
- `StructuredData` (extended)
- Satoshi / Manrope

**New dependencies** (all free; GSAP's plugins are free since 3.13):
- `gsap`
- `@gsap/react`
- `lenis`
- `next-intl`

Plus one Google font via `next/font` (Anton or Bebas Neue; you pick).

## 4. Design tokens (from the repo, as CSS variables)
- **Colors** (`tokens.css`):

  | Token | Value |
  |---|---|
  | `--burgundy-deep` | `#4A0710` |
  | `--burgundy` | `#790B1A` |
  | `--ivory` | `#F7F3EA` |
  | `--beige` | `#E5DCCF` |
  | `--charcoal` | `#262322` |
  | `--warm-gray` | `#A7A19A` |
  | `--yellow` | `#FCE7A6` |
  | `--sky` | `#D7E8F7` |

  **Proposed mapping to two26's roles until you fill in the colors TODO:**
  - page background = ivory (their pale pink)
  - **hot accent = burgundy (#790B1A)** for strokes, the footer and the testimonials panel (their orange)
  - headlines and sticker pills = charcoal / burgundy-deep
  - yellow and sky as tiny accents
- **Fonts:** condensed display (new) for headlines in all caps; Manrope for body; Satoshi for labels and buttons. Playfair is dropped unless you want it.
- **Motion tokens** (`lib/gsap.ts`):
  - eases: `power3.out`, `expo.out`, `back.out(1.4 / 2.5)`, `elastic.out(1.1,.4)`
  - durations: .55 / .85 / 1.25
  - hero timeScale .75
- **Layout:** existing `--gutter` and `--section-space`. Pills: `rounded-full`, 1–1.5px border, small rotated stickers.

## 5. Content schema (ES/EN)
`type L = { es: string; en: string }`. Content stays typed in `src/content/`; UI strings go in `messages/*.json`.
```ts
Project     { slug: L; client: string; category: L; year?: number; caption: L /* playful */; summary: L;
              cover: Media; hoverImage?: Media; featured: boolean; order: number;
              blocks: ({kind:'text'; title: L; body: L} | {kind:'media'; items: Media[]; layout:'full'|'half'|'grid'})[] }
Service     { id: 'consultoria'|'marketing'|'digital'|'merchandising'|'eventos'; title: L /* 2 words, stacked */;
              blurb: L; icon: string /* svg id */ }
Testimonial { quote: L; body: L; author: string; role: L; company: string; photo?: Media; consent: true }
Faq         { q: L; a: L }
Media       { type:'image'|'video'; src: string; poster?: string; alt: L; width: number; height: number }
TeamMember  { name: string; role: L; bio: L; photo: Media; socials: {label:string; url:string}[] }
```
Services are your 5 areas:
- Consultoría & Estrategia (incl. BI)
- Marketing, Contenido multimedia & Producción audiovisual
- Desarrollo de soluciones digitales
- Merchandising
- Eventos

## 6. Phases (each ends runnable with `npm run dev`, plus lint, build, and a check of the Vercel preview)
- **P1 Foundation.** ✅ (2026-11-19)
  - Rewrite CLAUDE.md for this branch, keeping brand, content, confidentiality, contact and WhatsApp rules.
  - Install deps; tokens + display font.
  - next-intl skeleton (ES at `/`, EN at `/en`) with empty pages.
  - Header (nav pills, logo slot, "Hablemos" CTA; no office hours, N6).
  - Footer + closing CTA.
  - Contact overlay (working open/close, focus trap, Esc, no fancy motion yet).
  - Mobile menu (basic).
  - WhatsAppFloat moved into the locale layout.
- **P2 dH logo + loader.** ✅ (2026-11-19)
  - `DhLogo` (write / replay / static), `Loader` with the two-stroke exit, `loaderDone` store.
  - Skip on internal navigation; reduced-motion path.
- **P3 Home sections** ✅ layout + content (2026-11-19). **Changed by the user:** all content now comes from the reference artifact, in its order: hero (centered "Crecer se ve muy bien" + pills Growth studio / Hecho en Bolivia / Cero improvisación + walkers illustration), ribbon, about, selected works (8), client logos, services (7), how we work, team, FAQ, closing CTA. No testimonials and no video gallery (not in the artifact). Old one-page sections deleted.
- **P4 Motion layer.** ✅ (2026-11-19) Lenis + ScrollTrigger sync; every effect in §1 for global and home; buttons (magnetic, kinetic); overlay and menu choreography; page transition wipe. Reduced-motion and touch fallbacks.
- **P5 Pages.** ✅ (2026-11-20)
  - `/work`: hero + illustration, stack grid, text list with hover preview, closing CTA.
  - `/work/[slug]` case study: hero, cover media, text blocks, media grid, next project.
  - `/about`: hero + illustration, story path, team cards + dialog, behind-the-scenes moodboard, numbered rules, capabilities, closing CTA.
- **P6 i18n, SEO, perf, a11y, deploy.**
  - EN copy (translations of approved ES).
  - Per-page metadata + OG, hreflang, sitemap, JSON-LD Organization.
  - Images: AVIF/WebP; videos lazy below the fold with posters; hero video ≤ 3 MB.
  - GSAP and Lenis loaded only client-side.
  - Lighthouse mobile ≥ 90 / 100 / 100.
  - axe pass; Vercel deploy.

**Risk to watch:** the loader and LCP. The page renders under the loader, so the hero headline still paints for LCP. I'll keep the loader ≤ ~2.5 s and skip it on repeat navigation.

## 7. Verification (every phase)
- `npm run lint` and `npm run build` pass.
- Playwright on my own dev server (stopped after the test) at 1440×900 and 390×844:
  - screenshots of each new section
  - scripted checks: overlay open/close + Esc + focus return, menu, FAQ, deck swipe/click, route change with wipe, loader skipped on internal navigation
  - the same with `prefers-reduced-motion` emulated
- P6: Lighthouse mobile on the production build (`next start`), axe, and the Vercel preview URL.

## 8. Questions and missing assets
1. **Colors:** your TODO. Until you fill it in, I use the mapping in §4 (burgundy as the hot accent).
2. **Logo:** which parts are "unfinished" for you? I listed my proposed finish in §2. Is the official wordmark (`public/brand`) still used anywhere, e.g. the giant footer logo? Two26 uses its wordmark there.
3. **Real content.** CLAUDE.md forbids inventing it, so without these the sections show `[PENDIENTE]`:
   - **Projects:** 6+ projects with cover, hover image, category, case-study text and media. Which clients may be shown?
   - **Testimonials:** quotes with author, role and company, and their permission.
   - **FAQ:** questions and answers. I can draft them for your approval.
   - **Team:** bios, photos and socials.
   - **About:** story text, office rules and the capabilities list.
4. **Video and photos:**
   - hero video (≤ 3 MB + poster)
   - 6 showcase items
   - behind-the-scenes photos
5. **Illustrations:** two26 leans heavily on illustrations (hero, contact overlay, work/about heroes, story). Do you have or will you make some in the brand style? If not, should we use photos and the dH mark in those slots?
6. **Copy tone:** may I draft the cheeky micro-copy in Spanish (pills, captions, "ya fue suficiente sitio web"-style closing line) for your approval?
7. ~~Route slugs~~ → answered (N2): localized.
8. ~~Header details~~ → answered (N6): no office hours; "Hablemos" opens the overlay.
9. **Not seen clearly on two26:** capabilities tag cloud animation and case-study page animations. Copy their static look with our standard reveals, or do you have a reference?
10. ~~Display font~~ → answered (N5): Anton.

## 9. Answers (2026-11-19)
- /proyectos: both the card stack grid and the text list with hover preview (N3).
- Route changes: wipe made from the loader's exit strokes (N4).
- CLAUDE.md rewritten for this design; floating WhatsApp button kept (N7).
- Headlines: Anton (N5).
- Routes localized: ES `/`, `/proyectos`, `/proyectos/[slug]`, `/nosotros`; EN `/en`, `/en/work`, `/en/work/[slug]`, `/en/about` (N2).
- Header: no office hours; "Hablemos" opens the contact overlay (N6).

## 10. Progress log
- **2026-11-19 · P1 Foundation done.**
  - CLAUDE.md rewritten for this branch (decisions N1–N9; brand, content, confidentiality, contact and WhatsApp rules kept). This file holds the plan and the log.
  - Dependencies: gsap 3.15.1, @gsap/react 2.1.2, lenis 1.3.27, next-intl 4.15.3 (installed, GSAP/Lenis not used yet). Anton added through `next/font` (headlines); Playfair dropped from the layout.
  - i18n: `src/i18n/{routing,request,navigation}.ts`, `src/proxy.ts` (Next 16 proxy), `src/messages/{es,en}.json`. Localized paths: `/`, `/proyectos`, `/nosotros` · `/en`, `/en/work`, `/en/about` (wrong-language paths such as `/en/proyectos` redirect). next-intl remembers the chosen language in a cookie and also reads the browser language, so a visitor whose browser is in English is sent from `/` to `/en`.
  - App: `src/app/[locale]/layout.tsx` is now the root layout (fonts, providers, header, footer, overlay, WhatsApp button). Removed: old `src/app/layout.tsx`, the old one-page route `src/app/(site)/` and the old internal `/styleguide` page (it documented the previous design and depended on the removed root layout). The old section components are still in the repo, unused, until P3.
  - Layout: Header (nav pills, monogram logo placeholder, language switch, "Hablemos" CTA), MobileMenu (full screen, focus trap, Esc), ContactOverlay + ContactProvider (every CTA opens it; focus trap, Esc, backdrop click, page behind inert, focus returns to the CTA), Footer with closing line, CTA, email, menu, socials and a looping-stroke texture, CtaButton, NavPill, LanguageSwitch, PagePlaceholder, `lib/useModal.ts`. WhatsApp button moved to z 1600 so the overlay and the menu never hide it (N7).
  - Tokens: `--hot` (= burgundy) as the two26 "hot accent" until the color roles are defined; `--font-display` = Anton.
  - Draft copy for approval: overlay headline "Cuéntanos tu negocio / o solo saluda, también vale", closing line "Ok, suficiente scroll por hoy" (EN drafts translated from these).
  - Checked with Playwright (1440 and 390): every route and redirect, overlay open/Esc/focus trap/focus return/inert page, WhatsApp button on top of the overlay, language switch both ways, mobile menu (Esc, focus return, CTA closes the menu and opens the overlay). Fixed during the check: the menu CTA did not open the overlay (closed the menu in the capture phase), and the header CTA showed on phones. A stale Turbopack dev cache of the removed `(site)` route made the dev server reload in a loop; clearing `.next/dev` fixed it (if you see a reload loop after pulling, delete `.next`).
  - Pending: color roles (§4), dH logo (P2), real content (§8). Footer and header still use the PNG logos (P2 swaps in the dH SVG).
- **2026-11-19 · P2 dH logo + loader done.**
  - `src/lib/gsap.ts`: registers GSAP plugins once (useGSAP, ScrollTrigger, SplitText, DrawSVG, CustomEase), shared motion values, `prefersReducedMotion()`. Import GSAP from here.
  - `src/lib/loaderStore.ts`: "loader finished" store (`useLoaderDone`, `onLoaderDone`, `markLoaderDone`), replacing two26's loaderComplete event. Heroes (P3) start from it.
  - `src/components/brand/DhLogo.tsx`: the artifact's dH (same shapes and pen route) rebuilt with GSAP + DrawSVG. Pen line writes d → H with a 600-unit window, a 170-wide mask trails it by 220 units (2.1 s, sine.inOut). **Finishing done (my proposal, §2, since "unfinished" was not specified):** GSAP instead of hand-rolled rAF; lead-in and exit tail shortened so the mark stays centered (tighter viewBox); new "settle" at the end (fill turns from `--hot` to the logo color, pop 0.94 → 1 with back.out(3)); unique mask/clip ids so several logos can share a page; colors from the tokens (fill = currentColor). Modes: write (loader), replay (header, 0.8 s redraw on hover), static (footer). Reduced motion → static.
  - `src/components/motion/Loader.tsx`: two26's loader logic and exit. Two 3000-wide strokes (beige over burgundy) cover the screen; the dH writes itself; when the logo is done **and** `window.load` has fired (6 s cap), hold .2 s, the beige stroke sweeps off down-right (.65 s, width → 1000), the logo fades at 20 %, the burgundy stroke sweeps off down-left from 25 %. Scroll is locked meanwhile. Plays once per full page load (lives in the layout, so client-side navigation never replays it). Reduced motion: hidden by CSS and marked done at once. No JS: hidden by a `<noscript>` style. CSS fail-safe hides it after 7 s.
  - Header logo = dH (replay on hover); footer = large static dH in ivory (the PNG wordmark is no longer used on this branch).
  - Checked with Playwright: frame-by-frame loader capture (≈4.2 s from DOMContentLoaded in dev, including hydration), scroll lock on/off, no replay after client navigation, header hover replay, footer mark, reduced motion (no loader, no lock); no console errors.
  - To decide: the loader takes ≈3.6 s after hydration (two26 ≈3.5 s). Shorten the write to ~1.6 s if it feels long. The loader covers the WhatsApp button while it is up (≤ ~4 s).
- **2026-11-19 · P2 adjustments + P3 (content and layout) done.** User feedback on P2: loader OK, covering the WhatsApp button is fine.
  - Loader: the burgundy screen now holds 0.45 s longer after the beige sweep, then sweeps off over 0.8 s (was 0.65 s, started at 25 % of the first sweep). After the write-on, the dH glides to the left while "digital HOUSE" wipes in beside it: the full logo, centered, before the exit. Fail-safe raised to 9 s.
  - Full logo: `Lockup` = the artifact's lettering ("digital" Bodoni Moda, "HOUSE" Montserrat Black), added through `next/font`. Used in the loader, header (dH + lettering, centered) and footer.
  - Content: everything now comes from the reference artifact (re-read 2026-11-19); the old copy is gone. `src/content/home.ts` rewritten (ES from the artifact, EN = draft translations for approval). Overlay ("¿Tienes un negocio con ganas de crecer? / o solo pasa a saludar", WhatsApp, correo, Instagram), nav (Trabajos, Nosotros, Servicios), footer ("Nuevas ideas. Más estrategia. La misma pasión.", "Bolivia © 2026 …") from the artifact.
  - Home sections (`src/components/home/`): Hero (walkers illustration inlined from the artifact, colors mapped to our tokens, its walk/spiral animations kept, still under reduced motion), Ribbon, About, Works (8 cards, artifact grid), Clients (two opposite marquee rows with our ivory logos on a dark band), Services (7, artifact icons, staggered), Process (4 steps + Meta), Team (carousel 1/5, initials avatars, "Hablar con …" WhatsApp links), Faq (one always open), Closing. Static layout; the two26 motion comes in P4.
  - Deleted: the old one-page sections, old UI helpers (Logo PNG component, AreasShelf, SelectionBox, RotatingWord, TeamCard, LogoMarquee, Button, Eyebrow, HandDrawn, SectionHeading, InstagramPill), RevealObserver, Container, Section, WindowShadow, `content/navigation.ts`.
  - Fixed during checks: sideways scroll from the tilted ribbon, logos loading a 1920 px image each, "digital HOUSE" visible before hydration, about paragraph too narrow.
  - Pending: project photos (the artifact references img/*.jpg that are not in the repo → `[PENDIENTE]` boxes), team portraits (the artifact draws line-art stickers in JS; initials for now), contact overlay illustration, approval of the EN drafts. My own additions: the client band's screen-reader label and the team arrows' labels. The artifact header shows office hours ("Lun–Vie 9:00–18:00"), which are left out because of decision N6; confirm. Card links go to /proyectos until the case-study pages exist (P5). Colors: the artifact highlights in red vs. dark velvet; with our tokens burgundy vs. burgundy-deep the highlight is subtle until the color roles are defined.
- **2026-11-19 · Header, loader exit and language fixes (user feedback).**
  - Header: logo at the top left, sections (Trabajos, Nosotros, Servicios) + EN + "Hablemos" on the right; no office hours; no longer fixed, it scrolls away with the page (CLAUDE.md N6).
  - Loader exit: replaced the two-stroke sweep with one smooth slide up (1 s, power3.inOut) of the beige screen with a curved burgundy edge trailing it; no hold on the color. The hero is marked ready the moment the slide starts, so the page shows from below as it moves (N4).
  - Language: `localeDetection: false`, so `/` is always Spanish. Before, a NEXT_LOCALE=en cookie (set after clicking EN) or an English browser redirected `/` and `/es` to `/en`. `/es` → `/` is expected (Spanish has no prefix). Checked with an English cookie + English browser: `/`, `/es`, `/proyectos` stay Spanish; `/en`, `/en/work` English.
  - Colors: confirmed that only this project's tokens are used (N10).
- **2026-11-19 · P4 Motion layer done.**
  - `SmoothScroll` (Lenis on the window, duration 1.7 / touch 1.1, native touch, gsap.ticker + ScrollTrigger sync, top/anchor + refresh on route change) and `lib/lenis.ts` (counted scroll locks used by the loader, mobile menu and overlay).
  - `Reveals` (layout-wide, re-runs per route): `data-reveal` = lines (SplitText masked lines, back.out(1.4)), fade, pop (pills), card (clip window 42.5 % + 36px radius → 0, inner scale 1.45 + tilt, 1.25 s power3.out), ribbon (draws in from the right); hero = one timeline at ×0.75 started when the loader begins to slide; all scroll reveals are created after the loader so nothing plays hidden. `data-kinetic` = per-letter hover pop (footer links and email).
  - `VelocityMarquee`: ribbon text and both client rows drift, flip direction when scrolling up and speed up with scroll velocity (damped).
  - About: pinned read-along (2200 / 1550 / 1150 px, scrub .8 / .6): letters light up with a small pop and tilt, keyword pills pop at 18 / 42 / 64 / 84 %.
  - Services: winding line measured from the real icon positions, drawn with scrub 1.2; icons and bubbles pop with back.out(3.5) as it passes (rebuilt on resize).
  - Process: route fills with scroll, step numbers pop. Team: card shuffles in from the side you move to. FAQ: answer bubble grows from its corner (back.out(1.6)), text rises.
  - Footer: phrase lines rise, kinetic link letters, `StretchLogo` (scaleY .15 → grows with scroll and velocity → elastic settle at the bottom).
  - CTA buttons: burgundy burst ×10 from the arrow circle, looping arrow kick, magnetic pull with trailing content, elastic return (mouse only). Nav pills: outline draws on hover.
  - Contact overlay: thick burgundy stroke draws and floods the screen (.9 s), close pill pops, headline letters pop with tilt, channels rise; closing fades content and undraws the stroke before unmounting. Mobile menu: panel fades, pills pop tilted.
  - `PageTransition` (N4): internal links slide a curved burgundy curtain up (.5 s), the page changes behind it, the curtain keeps sliding up and off (.6 s). Same-page anchors, new tabs and modified clicks behave normally.
  - Reduced motion: no Lenis, no pin/scrub, nothing hidden (checked: 0 hidden elements), overlay/menu instant, plain navigation.
  - Checked with Playwright (1440 and 390 touch): loader → hero, scroll through every section, pin, services line, overlay open/Esc/focus return, route transition to /proyectos, mobile menu, no sideways overflow, no console errors.
  - Not done / waiting: card hover brush + second image (needs the project photos), team sticker portraits, contact illustration. The two26 curved-path ribbon was not used: the artifact's straight tilted ribbon is kept (content follows the artifact).
- **2026-11-20 · First production launch.** GitHub `main` (which had gained PR #2 from redesign-studio: .gitignore lines, CLAUDE.md and copy edits for the old site) merged into `new-design`; our CLAUDE.md and content kept, main's .gitignore additions kept. Unfinished parts hidden for launch through `src/content/launch.ts` (all four switches off): Trabajos / Nosotros links scroll to the home sections instead of opening the P5 placeholder pages (those pages are noindex), the EN switch is hidden, no "[PENDIENTE]" text (neutral boxes for the missing project photos, no overlay note), "Ver proyectos" hidden. Then `new-design` was merged into `main` and pushed; Vercel deploys `main` to production.
- **2026-11-20 · P5 Pages done (on `main`).** Content rule (user): reuse the artifact's copy only. Office rules = the 5 team mottos (explained by each person's bio); story = the artifact's "growth studio" statement, the "Un poco de nosotros" statement and "Cómo trabajamos"; capabilities = 7 services + team specialties. New UI labels (drafts): "Las reglas de la casa", "Volver a trabajos", "El contexto", "La solución", "Siguiente proyecto". Content in `src/content/pages.ts`.
  - `/proyectos`: PageHero (label, "Marcas que confiaron", pills, intro), `WorkStack` (sticky cards; the covered card shrinks to .75 with an alternating tilt while a burgundy paint stroke wipes over it, scrub .6; cursor-following name + category pills on desktop), `WorkList` (text list; the preview follows the cursor and tilts with its speed; burgundy card with the client name while photos are pending), Closing.
  - `/proyectos/[slug]` (8 × 2 languages, static): back pill, giant client name + pill + category, cover (client name while the photo is pending), context / solution blocks only with `launch.placeholders`, next project, Closing.
  - `/nosotros`: PageHero with the walkers illustration, `StoryTeam` (3 story blocks; a thick line drawn with the scroll through them; once the story has scrolled away it swells and floods the team section burgundy; 5 team cards opening a native `<dialog>` that grows from the card, with bio, specialties, WhatsApp and portfolio links), `Moodboard` (two scroll-reactive photo strips, hidden until behind-the-scenes photos exist), `RulesStack` (sticky stacked cards with scrubbed progress bars, motto letters rise in), `Capabilities` (pill cloud), Closing.
  - Fix for the whole site: SplitText masks are now removed after each reveal (hero lines, scroll headings, rule mottos); with the tight Anton leading they clipped accents (É, Í, Á).
  - Checked with Playwright (1440 and 390 touch, reduced motion): every new section, card stack scale/tilt, cursor pills, list preview at the cursor, transition into a case study, story → flood → team, dialog open/Esc, rules stacking, accents, no sideways overflow, nothing hidden with reduced motion, no console errors.
  - Still hidden on production (`launch.ts`: workPage / aboutPage false, pages noindex). Pending for launch: project photos, case-study texts, team portraits, behind-the-scenes photos.
- **2026-11-20 · Project photos, artifact colors, services line.** (User: just these changes.)
  - Photos: `tools/works_images.mjs` (`npm run works:images`) turns `brand-assets/new-design/works/<folder>/imgN.*` into `public/works/<slug>/NN.webp` (max 1800 px, q82, numbered order kept) and generates `src/content/work-images.ts`. Folders: canel_rol → canel-roll (9), fury_cup (6), vida (5), zaleriz → zareliz (9). img1 = cover (home cards, /proyectos stack, list preview), with the artifact's hover (scale 1.05, −0.6°). Bosque Sur, Guinness, Carabao, Bendita: no photos yet.
  - Case studies now follow the artifact's project pages (re-read 2026-11-20): sticky bar (black "Volver a trabajos" pill + count), category label, giant name, meta row (Cliente · Rubro · Qué hicimos), intro, photos in numbered order in a 2-column grid with the artifact's full / half pattern per position, paprika "Siguiente proyecto" band. Texts (client, field, services, intro) copied from the artifact (`cases` in pages.ts, artifact order; EN = draft translations). The artifact's Fury Cup sponsor logos are not included (no files).
  - Colors = the artifact's palette (tokens.css, same token names): salt #eadfdb background, salt-2 #e0d2ca, velvet #630a2a text and dark sections, paprika #d63b36 accent, ink #111 pills, cream #fdf1e0 on dark. Section colors as in the artifact: ribbon paprika with salt text, services light with salt icons/bubbles and velvet icon strokes, process velvet, closing CTA paprika, footer velvet. Accessibility adjustments: small accent text uses #b83030 (4.6:1 on salt; the artifact's paprika is 3.5:1, fine only for big type); process heading and step numbers are cream instead of paprika (paprika on velvet is 2.8:1); text on the paprika closing band is set large/bold (cream on paprika 4.2:1 passes only as large text). `SectionLabel` has a dark variant.
  - Services line: the artifact's `buildSvcLine` recipe (enter from the top right; between two icons the line leaves sideways, swings out, curls once in a full loop of radius clamp(26, 3.5 % width, 56), then comes into the next icon); same scroll-drawn animation and pops as before; rounded joins, ghost line 16 %.
- **2026-11-20 · Remaining project photos connected.** bosque_sur (6), guinness (5), carabao (5), bendita (3) added to `tools/works_images.mjs` and converted; all 8 projects now have covers and case-study photos. Bosque Sur and Carabao have fewer photos than the artifact (8 and 6): the full/half pattern is applied to the photos that exist, and the half-width images still pair up.
- **2026-11-20 · New hero walkers (two26 style).** Our own drawing (not two26's characters) in two26's illustration style: thin, slightly wobbly ink lines (SVG displacement filter), grainy riso/crayon fills (noise-punched paprika and speckled ink), cream boards with crayon letters. The man has dark curly hair, a paprika hoodie and black sneakers, and holds a board with "d"; the woman wears glasses, has long wavy paprika hair, wide paprika / ink pants, and holds "H". Drawn mid-stride; the walk animation (legs ±7°, bob, sign wiggle, hair sway, spirals drawing) is kept, still with reduced motion. Source: `tools/illustrations/walkers.svg`, regenerate with `node tools/illustrations/make-walkers.mjs tools/illustrations/walkers.svg src/components/home/walkers.svg.ts`. Used on the home hero and /nosotros.
- **2026-11-21 · Services on phones (user screenshots ej1 = ours, ej2 = artifact).** Below md the services follow the artifact's mobile layout: 90px between services, 60 / 80px room above / below for the line, each service keeps 40 % of its desktop indent (zigzag), the title breaks after the icon ("BRAND ▢" / "STRATEGY"), bubbles max ~30ch with no indent and alternating ±1.5° tilts, icons alternate +5° / −6°. Desktop unchanged.
- **2026-11-21 · Team tap, works pages on, about pills on phones.**
  - Team (home): tap the card for the next person, or swipe it (left = next, right = previous); the visible arrows are gone (keyboard-only buttons appear on focus). Links inside the card (WhatsApp, portfolio) keep working.
  - Works: the project pages are switched on (`launch.workPage = true`): every home card opens its case study, "Trabajos" in the menus opens /proyectos, and those pages are no longer noindex. Before, the cards pointed back to their own section, so a tap seemed to do nothing.
  - About ("Un poco de nosotros"): on phones the four floating pills were showing on top of the four pills under the text (the `hidden` class lost to the pill's own `inline-block`); the floating set now uses a phone-only hide rule, so only one set of four shows.
  - Pending for P6: the sitemap still lists only the home page (/proyectos and the case studies should be added now that they are public).
- **2026-11-23 · Sitemap.** `src/app/sitemap.ts` lists only public pages, driven by `launch.ts`: home, /proyectos and the 8 case studies (workPage on); /nosotros joins when aboutPage is on; English URLs and hreflang alternates are added when english is on. URLs come from next-intl's `getPathname`, so localized paths stay right.
- **2026-11-23 · About pills on phones, corrected.** The user wanted the floating pills (scattered over the text, as in the artifact) on phones, not the row under the text. The floating pills now show on every size and the extra phone row is removed; one set of four everywhere.
- **2026-11-23 · P6 (in progress): SEO, accessibility, performance.**
  - Metadata per page (`src/lib/seo.ts`): description, canonical, Open Graph / Twitter title + description + share image on every page; case studies use the client name and intro, home the hero statement; noindex pages follow `launch.ts`; hreflang alternates are ready and switch on with `launch.english`.
  - Share image `public/share/og.png` (old OG image recolored to velvet / cream by `tools/share_image.mjs`; official wordmark untouched); the old `src/app/opengraph-image.png` / `twitter-image.png` are removed. JSON-LD uses the hero statement and the new image.
  - Accessibility (Lighthouse 92 → fixes): SplitText pieces are `aria: "hidden"` (screen readers read a clean copy; no aria-label on `<p>`); small accent text and the "Fundadora" badges use `--accent-text`; the header logo link is named by its visible text plus a hidden ", inicio".
  - Performance: the hero stays painted under the loader and its entrance is built only when the loader starts to leave (the 8 s LCP came from the hero being hidden at load). Images served as AVIF, then WebP. About 500 lines of old-site CSS and 4 unused old images removed; Lenis base CSS added.
  - Not yet done: re-audit (Lighthouse + axe) on a production build — paused because the machine was low on memory; English copy approval; deploy.
- **2026-11-24 · Client logos in their original colors.** User decision: complete logos (symbol + name), original colors, no background, on a light band (salt, with thin top/bottom lines). `tools/client_logos.py` rewritten: per-pixel coverage against the image background plus color recovery (no halo of the old background); seals/badges that contain the background color are kept whole (UCB seal, SP circle, La Suprema oval, Burguesa medallion); small sub-lines and ®/™ cut (Technogym's ® kept, it sits inside the badge); pure-white lettering made for dark backgrounds turns black (Fury Cup, Totto, Carabao's name and "Energy Drink"; Carabao's skull stays white on its red disc). Each logo has its own display height for an even visual weight (`h` in `home.ts`, 75 % on phones). Files moved to `public/client-logos/` so no cache serves the old ivory versions. VIDA is still text (no file).
- **2026-11-24 · Fury Cup sponsors.** The artifact's "Las marcas que se sumaron" section on the Fury Cup case study: "Patrocinadores" label, heading, centered wrapping row of the 8 sponsor logos (DXT Magazine, La República Ginebra, Check · Crediseguro, Bagó, Fury Energy, Amstel, Tigo Sports, Powerade) in the artifact's order and per-logo heights, 6 % zoom on hover (user chose the artifact's hover, no selection effect). Files from `brand-assets/new-design/works/fury_cup/sponsors/sp1–8.png` → `public/works/fury-cup/sponsors/<name>.png`; data in `cases["fury-cup"].sponsors` (`pages.ts`), so any other case can get the section by adding a list. EN label/heading are draft translations.
- **2026-11-24 · Case-study pages: no footer, white back button.** Case studies now end with the "next project" band; the site footer is hidden there by one CSS rule (`body:has([data-case-study]) #site-footer`), so it also works on in-site navigation. The "Volver a trabajos" text uses cream (`text-ivory`): `text-white` did nothing because the theme has no white color, so it showed in velvet.
