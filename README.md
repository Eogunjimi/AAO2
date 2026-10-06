# AAO Engineering Services — Website

Marketing site for AAO Engineering Services (Lagos): solar & inverter systems, electrical
installations, CCTV & security, access control, automation and ICT networking.

Originally a set of hand-written HTML files, then a React + Vite single-page application,
the site is now a **Next.js (App Router)** project with a component library, centralised
content data and a test suite. Every route is prerendered to static HTML at build time.

```
Accountability · Authenticity · Outstanding Service
```

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script               | What it does                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Next dev server (Turbopack) with Fast Refresh |
| `npm run build`      | Production build into `.next/`                |
| `npm run start`      | Serve the production build locally            |
| `npm run lint`       | ESLint (React, hooks, a11y, import hygiene)   |
| `npm run format`     | Prettier write                                |
| `npm run test`       | Vitest unit/component tests                   |
| `npm run test:watch` | Vitest in watch mode                          |

Requires Node 22.12+.

---

## Architecture

```
src/
├── app/                     # App Router: one folder per route
│   ├── layout.jsx           # <html>, fonts, site-wide metadata, SiteLayout shell
│   ├── page.jsx             # /
│   ├── services/            # /services and /services/[slug]
│   ├── service-areas/[slug] # /service-areas/…
│   ├── blog/                # /blog and /blog/[slug]
│   ├── projects/            # /projects
│   ├── team|career|academy|shop/   # announced-but-unbuilt placeholders
│   ├── not-found.jsx        # 404 (real HTTP 404)
│   ├── error.jsx            # route-level error boundary
│   ├── loading.jsx          # streaming fallback
│   ├── sitemap.js           # sitemap.xml, generated from the content data
│   └── robots.js            # robots.txt
├── assets/fonts/            # self-hosted woff2, loaded by next/font/local
├── routes/paths.js          # single source of truth for URLs and #anchors
├── components/
│   ├── ui/                  # design-system primitives (Button, Section, Reveal…)
│   ├── layout/              # Header, MobileNav, Footer, SiteLayout
│   ├── forms/               # QuoteForm, ContactForm, FormField, FormSuccess
│   ├── common/              # JsonLd, ComingSoon, PageLoader
│   └── sections/            # page sections: home/, service/, area/, shared/
├── data/                    # all copy & content as plain JS modules
├── hooks/                   # useCarousel, useInView, useMediaQuery, useLeadForm…
├── lib/                     # pure helpers: services, validation, leads, metadata, schema.org
├── styles/                  # tokens.css, base.css, animations.css
└── test/                    # setup + stubs for next/link, next/navigation, next/font
```

**Rules of the codebase**

1. **No content in components.** Every string a visitor reads lives in `src/data/*.js`.
   Adding a service is a data change, not a code change — see below.
2. **Styling is CSS Modules + design tokens.** No inline style blocks, no utility soup.
   Colours, spacing, radii, shadows and typography come from `src/styles/tokens.css`.
3. **Primitives before markup.** If two sections need the same visual, it becomes a
   component in `src/components/ui/` (or `sections/shared/`) rather than a copy-paste.
4. **Behaviour lives in hooks.** Carousels, autoplay, scroll locking, intersection reveals
   and form state are hooks, so sections stay declarative.
5. **Props are documented with JSDoc**, not `prop-types` (removed in React 19).
6. **Server Components by default.** `'use client'` appears only where a component
   genuinely needs state, effects or event handlers — currently 16 of them. Everything
   else renders on the server and ships no JavaScript.

### Routing

File-based, under `src/app/`. Every route below is prerendered to static HTML — 44 pages
at the last build.

| Route                                | File                           | Notes                                    |
| ------------------------------------ | ------------------------------ | ---------------------------------------- |
| `/`                                  | `app/page.jsx`                 | Landing page                             |
| `/services`                          | `app/services/page.jsx`        | Catalogue grouped by category            |
| `/services/[slug]`                   | `app/services/[slug]/page.jsx` | One page per entry in `data/services.js` |
| `/projects`                          | `app/projects/page.jsx`        | Filterable gallery                       |
| `/blog`, `/blog/[slug]`              | `app/blog/…`                   | One page per entry in `data/posts.js`    |
| `/service-areas/[slug]`              | `app/service-areas/[slug]/…`   | One page per Lagos neighbourhood         |
| `/team` `/career` `/academy` `/shop` | `app/<name>/page.jsx`          | Placeholders, `noindex`                  |
| anything else                        | `app/not-found.jsx`            | Real HTTP 404 with onward links          |

Slug routes list their pages with `generateStaticParams()`, so adding a service, post or
area to `src/data/` creates its page, its sitemap entry and its nav link with no routing
change. Unknown slugs call `notFound()` and get a genuine 404 status — the SPA could only
answer 200 and redirect on the client.

Next handles scroll restoration and `#hash` targets natively (`base.css` supplies
`scroll-behavior: smooth`), so there is no `ScrollManager`.

### Content model

`src/data/services.js` drives navigation, the catalogue, the mega-menu, every service page
and the enquiry form's dropdown. One entry looks like this:

```js
{
  slug: 'cctv',
  title: 'CCTV Systems',
  category: 'Security & Surveillance',
  summary: '…',        // cards and meta description
  headline: '…',       // <h1> on the detail page
  intro: '…',
  image: '/images/cctv.jpg',
  signs: ['…'],        // "signs you need this" list
  approach: ['…'],     // how AAO delivers it
  benefits: [{ title: '…', description: '…' }],
  faq: { question: '…', answer: '…' },
}
```

Add an object there, list its slug in `src/data/navigation.js` if it should appear in the
menu, drop an image in `public/images/` — the new page, route, nav entry, related-service
suggestions and form option all appear automatically.

### SEO

This is the main reason the site runs on Next. Titles, descriptions, canonicals, Open
Graph/Twitter cards and JSON-LD are all in the HTML the server sends, so crawlers and link
unfurlers (WhatsApp, Facebook, X — none of which run JavaScript) see a complete page.

- `src/lib/metadata.js` — `buildMetadata()`, used by every route's `metadata` export or
  `generateMetadata()`. Canonicals and social images are absolute, derived from
  `NEXT_PUBLIC_SITE_URL`.
- `src/components/common/JsonLd` — renders schema.org payloads as inline
  `application/ld+json`, server-side.
- `src/lib/structuredData.js` — builds `LocalBusiness`, `Service`, `BlogPosting`,
  `BreadcrumbList` and `FAQPage` schemas from the same data the pages render, so structured
  data cannot drift from the copy.
- `src/app/sitemap.js` and `src/app/robots.js` — generated from the content data at build
  time; `sitemap.xml` can never list a page that does not exist.

### Fonts

Manrope and Inter are **self-hosted**: the latin variable woff2 files live in
`src/assets/fonts/` (~73 kB together) and are loaded with `next/font/local`. That removes the
render-blocking round-trip to fonts.googleapis.com, removes a third-party request from every
visit, and keeps builds reproducible offline — `next/font/google` re-fetches from Google on
every cold build, which fails in air-gapped CI.

### Accessibility

Skip link, single `<h1>` per page, labelled landmarks, `aria-expanded`/`aria-controls` on the
accordion and mega-menu, focus-visible rings, `aria-live` on the process stepper and form
status, `prefers-reduced-motion` honoured by `Reveal` and the marquee, and carousels that are
fully operable from the keyboard. `eslint-plugin-jsx-a11y` runs in CI.

### Lead capture

Forms validate with `src/lib/validation.js` and submit through `src/lib/leads.js`, which posts
to `NEXT_PUBLIC_LEAD_ENDPOINT` when configured and otherwise resolves locally so the UI can be
demoed without a backend. Copy `.env.example` to `.env.local` to point it at a real endpoint.
To keep the endpoint private, add a Route Handler at `src/app/api/leads/route.js` and point
the forms at `/api/leads` instead.

---

## Testing

Vitest + Testing Library, jsdom environment, configured in `vitest.config.mjs` with setup in
`src/test/setup.jsx`:

```bash
npm run test
```

Covers the service selectors and data integrity, form validation, the carousel hook, the
accordion's ARIA contract, the quote form's submit path, every route's rendering, the
generated metadata and sitemap, and the `notFound()` path for unknown slugs.

Next's own modules are not runnable outside a Next build, so `next/link`, `next/navigation`
and `next/font/local` resolve to small stubs in `src/test/stubs/` (aliased in
`vitest.config.mjs`). App Router pages are plain functions returning JSX, so
`src/test/serverComponent.jsx` awaits one and hands the result to Testing Library.

## Deployment

```bash
npm run build     # → .next/
npm run start     # serve it locally
```

Vercel needs no configuration beyond `vercel.json` (already present): it detects Next and
serves the prerendered pages from the edge.

Nothing in the app renders per-request, so if you would rather deploy plain files to
Netlify, Cloudflare Pages or S3 + CloudFront, add `output: 'export'` to `next.config.mjs`
and `npm run build` writes a static `out/` directory instead. No SPA rewrite rule is needed
either way — every route is a real HTML file.

## `legacy/`

`legacy/prototype/` keeps the original HTML files for reference. They are excluded from the
build, ESLint and Prettier, and can be deleted once the React site is signed off.
