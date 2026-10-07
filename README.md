# AAO Engineering Services — Website

Marketing site for AAO Engineering Services (Lagos): solar & inverter systems, electrical
installations, CCTV & security, access control, automation and ICT networking.

The site is a **Next.js 15 (App Router)** React application with a component library,
centralised content data, full static generation (SSG) and a Vitest unit/component test
suite.

```
Accountability · Authenticity · Outstanding Service
```

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build into .next/ (static + SSG routes)
npm start          # Serve the production build
npm test           # Vitest unit/component tests
```

Requires Node 22+.

| Script               | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Next.js dev server with HMR on port 3000              |
| `npm run build`      | Production build, generates static pages into `.next/`|
| `npm start`          | Serve the production build locally                    |
| `npm run format`     | Prettier write                                        |
| `npm run format:check` | Prettier check                                      |
| `npm test`           | Vitest unit/component tests                           |
| `npm run test:watch` | Vitest in watch mode                                  |

---

## Architecture

```
app/                       # Next.js App Router (server components)
├── layout.jsx             # Root layout (html shell, shared chrome, metadata)
├── page.jsx               # Home /
├── services/
│   ├── page.jsx           # /services
│   └── [slug]/page.jsx    # /services/:slug (SSG via generateStaticParams)
├── projects/page.jsx      # /projects
├── blog/
│   ├── page.jsx           # /blog
│   └── [slug]/page.jsx    # /blog/:slug
├── service-areas/
│   └── [slug]/page.jsx    # /service-areas/:slug
├── team | career | academy | shop/page.jsx  # coming-soon placeholders
├── not-found.jsx          # 404 page
├── sitemap.js             # /sitemap.xml (generated from content data)
└── robots.js              # /robots.txt
src/
├── views/                 # Page-level React components (consumed by app/*)
├── components/
│   ├── ui/                # Design-system primitives (Button, Section, Reveal…)
│   ├── layout/            # Header, MobileNav, Footer, SiteLayout, ScrollManager
│   ├── forms/             # QuoteForm, ContactForm, FormField, FormSuccess
│   ├── common/            # Seo, ErrorBoundary
│   └── sections/          # page sections: home/, service/, shared/, area/
├── data/                  # All copy & content as plain JS modules
├── hooks/                 # useCarousel, useInView, useMediaQuery, useLeadForm…
├── lib/                   # Pure helpers + Next/react-router compat shims
├── routes/                # Centralised paths and anchor constants
├── styles/                # tokens.css, base.css
└── test/                  # Vitest setup + responsive guard tests
public/                    # Static assets served at root (favicon, images, …)
```

**Rules of the codebase**

1. **No content in components.** Every string a visitor reads lives in `src/data/*.js`.
2. **Server components first.** Pages in `app/` are server components; interactive bits
   (carousels, forms, dropdowns, scroll-reveal, lead submission) opt into client
   rendering with `'use client'`.
3. **Single source of truth for URLs.** Never hard-code a path — use `paths` / `anchors`
   from `src/routes/paths.js`.
4. **Content drives SEO.** `generateStaticParams`, the `sitemap.js` route and the
   JSON-LD schema builders all derive from the same content data in `src/data/`, so
   new services/posts/areas are picked up automatically.

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable                    | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | POST endpoint that receives contact/quote submissions. Leave blank to run in demo mode. |
| `NEXT_PUBLIC_SITE_URL`      | Absolute site URL, used for canonical tags and structured data.         |

The legacy `VITE_LEAD_ENDPOINT` / `VITE_SITE_URL` names are also honoured by the
`src/lib/env.js` compatibility helper, so existing deployments keep working.
