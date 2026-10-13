# DigitalHouse Growth Studio — website

Single-page marketing site (Spanish) built with Next.js (App Router), TypeScript and Tailwind CSS v4.
Production: https://digital-house-site-indol.vercel.app

## Run locally

Requirements: Node.js 20.9+ (developed on Node 22) and npm.

```bash
npm install
npm run dev      # http://localhost:3000 (development)
npm run lint     # ESLint
npm run build    # production build
npm run start    # serve the production build (after npm run build)
```

`/styleguide` is an internal design-system review page (not linked, `noindex`).

## Where things live

| Path | What |
|---|---|
| `src/content/` | All copy as typed data. Contact data (WhatsApp, email, Instagram) only in `contact.ts`; site URL in `site.ts`. |
| `src/app/` | Routes, root layout + metadata, `sitemap.ts`, `robots.ts`, icons and share image (file conventions). |
| `src/components/{layout,sections,ui}` | Page frame, landing sections, UI primitives. |
| `src/styles/tokens.css` | Brand colors and section themes (CSS variables). |
| `public/brand`, `public/images`, `public/textures` | Logos, approved photos, pre-rendered window shadow. |
| `tools/` | Asset processing scripts (see `tools/README.txt`). Not part of the build. |
| `docs/` | Phase documentation (index: `docs/README.txt`). |

## Deploy (Vercel)

1. Import the Git repository in Vercel. **Application preset:** Next.js. **Root directory:** `./`
   (the repository root, where `package.json` is). Build/output/install commands: defaults.
2. No environment variables are needed.
3. Every push to the production branch deploys automatically.
4. A commercial site needs the Vercel **Pro** plan (Hobby is for non-commercial use only).

### When a custom domain is bought

1. Add it in Vercel → Project → Settings → Domains and follow the DNS instructions.
2. Change `url` in `src/content/site.ts` to the new address (it feeds the canonical URL, Open Graph,
   `sitemap.xml`, `robots.txt` and the structured data), then push.
