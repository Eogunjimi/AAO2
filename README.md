# AAO Engineering Services — Website

Marketing site for AAO Engineering Services (Lagos): solar & inverter systems, electrical
installations, CCTV & security, access control, automation and ICT networking.

Originally a set of hand-written HTML files, the site is now a **React + Vite** single-page
application with a component library, centralised content data and a test suite.

```
Accountability · Authenticity · Outstanding Service
```

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script               | What it does                                |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                    |
| `npm run build`      | Production build into `dist/`               |
| `npm run preview`    | Serve the production build locally          |
| `npm run lint`       | ESLint (React, hooks, a11y, import hygiene) |
| `npm run format`     | Prettier write                              |
| `npm run test`       | Vitest unit/component tests                 |
| `npm run test:watch` | Vitest in watch mode                        |

Requires Node 20+.

---

## Architecture

```
src/
├── main.jsx                 # entry: mounts <App /> into #root
├── App.jsx                  # ErrorBoundary → BrowserRouter → AppRoutes
├── routes/
│   ├── paths.js             # single source of truth for URLs and #anchors
│   └── AppRoutes.jsx        # route table, lazy-loads everything but Home
├── pages/                   # one folder per route, composes sections only
├── components/
│   ├── ui/                  # design-system primitives (Button, Section, Reveal…)
│   ├── layout/              # Header, MobileNav, Footer, SiteLayout, ScrollManager
│   ├── forms/               # QuoteForm, ContactForm, FormField, FormSuccess
│   ├── common/              # Seo, ErrorBoundary, PageLoader
│   └── sections/            # page sections: home/, service/, shared/
├── data/                    # all copy & content as plain JS modules
├── hooks/                   # useCarousel, useInView, useMediaQuery, useLeadForm…
├── lib/                     # pure helpers: services, validation, leads, schema.org
└── styles/                  # tokens.css, base.css, animations.css
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

### Routing

| Route             | Page                | Notes                                        |
| ----------------- | ------------------- | -------------------------------------------- |
| `/`               | `HomePage`          | In the main bundle — it is the landing route |
| `/services`       | `ServicesPage`      | Catalogue grouped by category, lazy-loaded   |
| `/services/:slug` | `ServiceDetailPage` | Data-driven; unknown slugs redirect to 404   |
| `*`               | `NotFoundPage`      | 404 with onward links                        |

`ScrollManager` restores scroll on navigation and smooth-scrolls to `#hash` targets.
`public/_redirects` rewrites every path to `index.html` so deep links work on static hosts.

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

`<Seo />` sets the title, description, canonical, Open Graph/Twitter tags and injects
JSON-LD. `src/lib/structuredData.js` builds `LocalBusiness`, `Service` and `FAQPage` schemas
from the same data the pages render, so structured data can never drift from the copy.

### Accessibility

Skip link, single `<h1>` per page, labelled landmarks, `aria-expanded`/`aria-controls` on the
accordion and mega-menu, focus-visible rings, `aria-live` on the process stepper and form
status, `prefers-reduced-motion` honoured by `Reveal` and the marquee, and carousels that are
fully operable from the keyboard. `eslint-plugin-jsx-a11y` runs in CI.

### Lead capture

Forms validate with `src/lib/validation.js` and submit through `src/lib/leads.js`, which posts
to `VITE_LEAD_ENDPOINT` when configured and otherwise resolves locally so the UI can be
demoed without a backend. Copy `.env.example` to `.env.local` to point it at a real endpoint.

---

## Testing

Vitest + Testing Library, jsdom environment, setup in `src/test/setup.js`:

```bash
npm run test
```

Covers the service selectors and data integrity, form validation, the carousel hook, the
accordion's ARIA contract, the quote form's submit path, service-detail rendering and routing
(including the 404 redirect).

## Deployment

```bash
npm run build     # → dist/
```

Any static host works (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront). The SPA fallback
is already declared in `public/_redirects`; on other hosts rewrite all routes to `/index.html`.

## `legacy/`

`legacy/prototype/` keeps the original HTML files for reference. They are excluded from the
build, ESLint and Prettier, and can be deleted once the React site is signed off.
