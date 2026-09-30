# PROMPT — Build SEO-optimised service pages and service-area pages

You are building (or rebuilding) two repeatable page types for a local service business:

- **Service pages** — one per service the business sells.
- **Service-area pages** — one per city, suburb or neighbourhood the business serves.

Both must be **generated from a data model**, not hand-built one file at a time. Adding a
service or a location must be a content change, never a code change. Follow every rule below.

---

## Step 0 — Fill these in before you start

| Variable                    | Meaning                                    | Example                       |
| --------------------------- | ------------------------------------------ | ----------------------------- |
| `BUSINESS_NAME`             | Full legal/trading name                    | AAO Engineering Services      |
| `SHORT_NAME`                | How customers say it                       | AAO                           |
| `PRIMARY_SERVICE`           | The one service that drives location pages | Solar & Inverter Installation |
| `CITY`                      | Primary city for local SEO                 | Lagos                         |
| `SERVICES[]`                | Every service, with a category each        | 15 services in 4 categories   |
| `AREAS[]`                   | Every neighbourhood/suburb to target       | 11 areas                      |
| `SCHEMA_TYPE`               | Most specific schema.org business type     | `ElectricalContractor`        |
| `PRIMARY_CTA`               | The single conversion action               | Book a Free Site Inspection   |
| `PHONE`, `EMAIL`, `ADDRESS` | NAP data, byte-identical everywhere        | —                             |
| `SITE_URL`                  | Absolute origin for canonicals             | `https://www.example.com`     |

Pick the **most specific** `SCHEMA_TYPE` that exists under `LocalBusiness` — `Plumber`,
`RoofingContractor`, `HVACBusiness`, `Electrician`, `Dentist`. Falling back to the generic
`LocalBusiness` throws away free specificity.

---

## Rule 0 — The architecture that makes this scale

**No visitor-facing string may live in a component.** All copy lives in data modules. The
page templates are pure presentation, so 15 services and 11 areas share exactly two templates.

Use a **two-layer content model with graceful fallback**:

1. **Catalogue layer** — short, structured, one entry per service. Drives navigation, the
   index page, cards, cross-links, dropdowns and schema.
2. **Page layer** — long-form copy keyed by the same slug. Everything the _page_ needs to
   read well.
3. **A merge selector** (`getServicePage(service)`) that overlays the page layer on the
   catalogue layer and **fills every gap with a sensible default derived from the catalogue**.

This third point is the most important architectural decision in the whole system. It means
**a service with zero long-form copy still renders a complete, indexable page from day one**,
and copy quality improves incrementally without anyone touching a template. In the reference
implementation, only 5 of 15 services have bespoke `included`, `process` and `faqs` blocks —
the other 10 derive theirs from catalogue fields and are still complete pages.

Build the fallbacks explicitly, for example:

```
heroTitle    ← page.heroTitle    ?? service.headline
heroSubtitle ← page.heroSubtitle ?? service.summary
introTitle   ← page.introTitle   ?? `Professional ${service.title} You Can Rely On`
included     ← page.included     ?? service.benefits.map(withRotatingIcon)
process      ← page.process      ?? globalProcessSteps
faqs         ← page.faqs         ?? [service.faq, ...globalServiceFaqs]
```

Then **cap the FAQ list at 5** (`faqs.slice(0, 5)`) inside the selector, so no page can ever
close on a wall of questions regardless of how much data accumulates.

---

## Content model

### Service — catalogue entry

```
slug        URL segment, kebab-case, keyword-bearing   e.g. solar-inverter
category    Grouping for nav + index page              e.g. Solar & Power
title       Canonical service name                     e.g. Solar & Inverter Installation
headline    Hero H1 fallback
summary     9–14 words. Used in cards AND meta description
image       Hero/card image
intro       One long-form paragraph
signs[]     4–5 "you need this if…" symptoms, customer's words not yours
approach[]  4–5 steps describing what you actually do
benefits[]  4 × { title, description }
faq         { question, answer } — the one question this service always gets
```

### Service — page entry (keyed by slug, every field optional)

```
heroTitle       Full H1. 10–14 words, leads with the exact-match keyword
heroKeyword     The leading phrase of heroTitle, for visual accent (see below)
heroSubtitle    5–11 words. One concrete promise, not a slogan
heroImage
introTitle      H2, 9–14 words
introImage
introBody[]     EXACTLY 3 paragraphs, ~110 words total: problem → cost of problem → your answer
includedTitle   { lead, accent } two-tone heading
included[]      EXACTLY 4 × { icon, title, description } — descriptions 16–23 words
processTitle    { lead, accent }
process[]       EXACTLY 4 × { number, title, duration, tag, description }
faqs[]          EXACTLY 5 × { question, answer } — answers 21–48 words
```

### Service area — shared constants (identical on every area page)

These describe **your offer, not the area**, so repeating them verbatim is correct and not
duplicate-content risk:

```
whatYouGet[]     6 bullets — what every client gets, wherever they are
propertyTypes[]  6 bullets — property types you install for
systemTypes[]    6 bullets — systems/products you supply
```

### Service area — per-area entry (must be genuinely unique)

```
slug, name, shortName
heroTitle      10–13 words. Pattern: "{PRIMARY_SERVICE} in {Area} {specific differentiator}"
heroKeyword    Always "{PRIMARY_SERVICE}" — the accented lead of the H1
heroSubtitle   6–10 words, specific to this area
heroImage      A real photo associated with this area — never the same stock hero everywhere
introImage
intro[]        2 paragraphs, 31–64 words each
why            42–64 words — why owners HERE choose you
trust          31–48 words — why they can trust the install, ending in a colon that
               introduces propertyTypes[]
systems        38–54 words — what you design for THIS area's building stock
localFaqs[]    EXACTLY 2 questions only someone in this area would ask
```

**Target: 298–394 words of unique prose per area page.** Below ~250 the page reads as a
doorway page and will be treated as one.

---

## Page blueprint A — Service detail page

Render these sections in **exactly this order**:

| #   | Section         | Contents                                                                                                                                   |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Page hero**   | Breadcrumb → eyebrow (= category) → **H1** → subtitle → proof badges (review ratings + install count) over a full-bleed photo with a scrim |
| 2   | **Trust strip** | Certifications / licences / guarantees — immediately below the fold                                                                        |
| 3   | **Brief**       | Two-column: sticky **quote form** sidebar + `introTitle` H2, inline image, 3 intro paragraphs, then "What's Included" H2 with 4 icon cards |
| 4   | **Process**     | 4 numbered steps, each with a duration and a tag. Heading names the service: "How We Install _Your Solar System_"                          |
| 5   | **Proof**       | Project marquee / recent work                                                                                                              |
| 6   | **Reviews**     | Carousel of customer reviews                                                                                                               |
| 7   | **Contact**     | Enquiry form with **this service pre-selected** in the dropdown                                                                            |
| 8   | **FAQ**         | 5 questions in an accordion, first one open. Title: "{Service}: Your Questions Answered"                                                   |

## Page blueprint B — Service-area page

| #   | Section          | Contents                                                                                                                      |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Page hero**    | Breadcrumb (Home → Service Areas → {Area}) → eyebrow "Service Area" → **H1** → subtitle → proof badges, over the area photo   |
| 2   | **Trust strip**  | Same component as the service page                                                                                            |
| 3   | **Area intro**   | Sticky quote form + H2 "{PRIMARY_SERVICE} in {Area}" + local photo + 2 local paragraphs + phone CTA                           |
| 4   | **Why us here**  | H2 "Why Homeowners and Businesses Choose {SHORT_NAME} for _{Area}_ {Service}" + `why` prose + `whatYouGet[]` list + phone CTA |
| 5   | **Trust here**   | H2 "Trusted {Service} Installer _{Area}_ Owners Can Rely On" + `trust` prose + `propertyTypes[]` list + phone CTA             |
| 6   | **Systems here** | H2 "{Service} Systems Designed for _{Area}_" + `systems` prose + `systemTypes[]` list + phone CTA                             |
| 7   | **Process**      | H2 "Our _{Area}_ {Service} Process" — same 4 steps, area-named heading                                                        |
| 8   | **Contact**      | Enquiry form, `PRIMARY_SERVICE` pre-selected                                                                                  |
| 9   | **FAQ**          | 5 questions: the 2 local ones **first**, then 3 localised standards                                                           |

Alternate section backgrounds (`light` / `wash`) so the page has visible rhythm: sections
4 and 6 get the tinted tone.

### The 2 + 3 FAQ rule for area pages

Never write 5 unique FAQs per area — you will not sustain it across 50 locations, and the
quality will collapse. Instead compose them in a selector:

- **2 genuinely local questions**, written by hand, that only make sense in that area.
  Reference implementation examples: _"Do you handle estate approvals in Lekki Phase 1?"_,
  _"My building is leased — what does the landlord need from you?"_ (Victoria Island),
  _"Will the panels be visible from the street?"_ (Ikoyi, older prestige properties).
- **3 templated questions with the area name interpolated into both question and answer** —
  cost, "is the visit really free", and duration. These are the three every caller asks.

Generate the 3 standards in code from the area name. Hand-write only the 2 local ones.

---

## The H1 keyword-accent pattern

Store the exact-match keyword as the **leading phrase** of the H1, then visually emphasise
only that prefix while leaving the full string intact in the DOM:

> **Solar & Inverter Installation** in Ikoyi That Runs Without the Generator

Implement it as a guard, not a string split: only apply the accent when
`title.startsWith(keyword)`. If it doesn't match, render the title untouched. This gives you
keyword prominence for readers without ever fragmenting the heading for crawlers or screen
readers.

**One `<h1>` per page. Every section heading is an `<h2>`. Card titles inside a section are
`<h3>`.** Never skip a level for styling — style with classes.

---

## SEO contract

Every route mounts **one** SEO component that sets all of the following. No page may ship
without it.

| Tag                                                           | Rule                                                                                                                        |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `<title>`                                                     | `{Page title} — {BUSINESS_NAME}`, suffix appended automatically unless the title already contains the brand. Under 60 chars |
| `meta description`                                            | Use the service `summary` / area `intro[0]`. 140–160 chars. Never auto-truncate prose mid-sentence                          |
| `link rel=canonical`                                          | Absolute, built from `SITE_URL` + current pathname. Self-referencing on every page                                          |
| `og:title`, `og:description`, `og:image`, `og:url`, `og:type` | `og:image` absolute, ≥1200×630                                                                                              |
| `twitter:card`                                                | `summary_large_image` when an image exists, else `summary`                                                                  |
| `meta robots`                                                 | `index, follow` by default; `noindex, nofollow` only behind an explicit flag                                                |

### Structured data

Emit JSON-LD **built from the same data the page renders** — never hand-maintained, so it
cannot drift from the visible copy. This is a hard rule: if the FAQ accordion shows 5
questions, the `FAQPage` schema is generated from that same array.

| Page                               | Schemas                                                                                                                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site-wide (home)                   | `{SCHEMA_TYPE}` with `address`, `telephone`, `email`, `founder`, `areaServed[]` (every area), `sameAs[]` (socials), and `hasOfferCatalog` listing every service with its URL |
| Service page                       | `Service` (+ `serviceType` = category, `provider`, `areaServed`, `url`) **and** `FAQPage`                                                                                    |
| Area page                          | `FAQPage` — plus `Service` with `areaServed` set to that area                                                                                                                |
| Any page with a visible breadcrumb | `BreadcrumbList`                                                                                                                                                             |

### Sitemap & crawl

- Generate `sitemap.xml` **from the same data arrays** at build time, so a new service or
  area appears automatically. Never hand-maintain it.
- `robots.txt` must `Allow: /` and point to the sitemap's absolute URL.
- **Verify the sitemap the robots.txt advertises actually exists** — a `robots.txt`
  referencing a missing `sitemap.xml` is a common and silent failure.

### Rendering — the decision that outranks everything else here

If metadata and JSON-LD are injected **client-side** after hydration, you are gambling on the
crawler executing your JavaScript. For pages whose entire purpose is organic acquisition,
don't. **Server-render or statically pre-render every service and area page** so the title,
description, canonical, headings, body copy and JSON-LD are present in the initial HTML
response. Use Next.js/Astro/Nuxt static output, or a prerender step in the build.

_(The reference implementation is a client-rendered SPA — this is its single biggest SEO
weakness, and the one thing worth changing if you are rebuilding rather than copying.)_

---

## Copy rules

1. **Write for the buyer's problem, not your product.** The 3-paragraph service intro follows
   a fixed arc: _what everyone else does wrong_ → _what it costs you_ → _what we do instead_.
2. **Specific beats superlative.** "Sized from a professional load audit" outperforms
   "best-in-class quality". Every claim should carry a number, a timeframe or a named
   deliverable.
3. **Keyword placement:** the exact-match phrase belongs in the H1 prefix, the `<title>`, the
   meta description, the first 100 words of body copy, one H2, and the image alt text. That
   is sufficient. Do not stuff it into every heading.
4. **Never write the same paragraph twice across locations.** Interpolating a name into a
   template (`"We serve {Area} with pride"`) is precisely what gets location pages classified
   as doorway pages. Each area's prose must reference something only true there — building
   stock, estate rules, load profile, commercial vs residential mix, roof type, access
   constraints.
5. **Repeating the shared lists verbatim is fine.** `whatYouGet`, `propertyTypes` and
   `systemTypes` describe your offer, which genuinely does not change by suburb. The
   uniqueness requirement applies to prose, not to your service list.
6. **Answer the question in the first sentence** of every FAQ answer, then justify. Keep
   answers 21–48 words.
7. **Admit trade-offs.** The highest-converting copy in the reference build says things like
   _"there is no honest answer before the load is measured"_ and _"even when that is a smaller
   system than you expected, or none at all."_ Hedged, salesy copy reads as untrustworthy.

---

## Internal linking

The link graph is what makes a large set of programmatic pages rank instead of sitting
orphaned. Required edges:

- Home → **every** area page (a chip/pill list of all locations).
- Home + global nav → services index, grouped by category.
- Services index → every service page, grouped by category, each card linking on the whole card.
- Service page → **3 related services**, chosen as _same category first, then others_.
- Area page → the primary service page, and the services index.
- Every page → the contact anchor and a `tel:` link.
- Breadcrumbs on both page types: `Home → Services → {Service}` and
  `Home → Service Areas → {Area}`.

**Define every URL in one central `paths` module** (`service(slug)`, `serviceArea(slug)`) and
never hard-code a URL in a component. A URL scheme change must be a one-file edit.

---

## Routing & technical

- URLs: `/services/{slug}` and `/service-areas/{slug}`. Lowercase, hyphenated, keyword-bearing,
  no dates, no IDs, no trailing slash inconsistency.
- **An unknown slug must redirect to a real 404**, never render an empty template. Rendering a
  shell for any arbitrary slug creates infinite thin pages and soft-404s.
- Lazy-load / code-split page templates; keep the landing route in the main bundle.
- Images: explicit `width`/`height` to reserve layout space, `loading="lazy"` below the fold,
  `loading="eager"` for the hero, `decoding="async"`, and descriptive `alt` that names the
  service and the location (`"A property in Ikoyi running on a solar system installed by X"`).
- Restore scroll on navigation and smooth-scroll to `#hash` targets.
- Static hosts: rewrite all paths to `index.html` (or pre-render each route to its own file).

---

## Conversion layout

- **The enquiry form comes first in the DOM order**, so on a phone it sits directly beneath the
  trust strip — above the long-form copy. On desktop, CSS grid moves it into a **sticky
  sidebar** beside the prose. Reorder with CSS, never by duplicating the form.
- The form's service dropdown is **pre-selected** to the current page's service.
- A phone CTA repeats after every major section on area pages — local-intent traffic calls
  more often than it fills in forms.
- The page closes on the FAQ accordion with a single button to talk to a human.

---

## Accessibility (non-negotiable, and it overlaps with SEO)

- One `<h1>`; no skipped heading levels.
- Every `<section>` labelled with `aria-labelledby` pointing at its heading id.
- Breadcrumb in a `<nav aria-label="Breadcrumb">` with an ordered list; current page carries
  `aria-current="page"`.
- Accordion: `aria-expanded` + `aria-controls` on triggers, keyboard operable.
- Carousels fully keyboard operable, autoplay pausing on hover and focus.
- Decorative images: empty `alt` and `aria-hidden`. Never describe an image whose caption
  already says the same thing.
- Honour `prefers-reduced-motion` for all reveal/marquee animation.
- Skip link to main content; visible focus rings.

---

## Definition of done

Ship nothing until every line is true.

**Data & scale**

- [ ] Adding a service = one catalogue entry + one image. Page, route, nav entry, index card, cross-links, sitemap entry and form option all appear with no code change.
- [ ] Adding an area = one entry + one photo, same automatic result.
- [ ] A service with no long-form entry still renders a complete page via fallbacks.

**Per page**

- [ ] Exactly one `<h1>`, containing the exact-match keyword as its leading phrase.
- [ ] Unique `<title>` (<60 chars) and meta description (140–160 chars).
- [ ] Self-referencing absolute canonical.
- [ ] Valid JSON-LD, generated from rendered data, passing Google's Rich Results Test.
- [ ] Area pages carry 250+ words of prose that appears on no other page.
- [ ] Exactly 5 FAQs, matching the `FAQPage` schema one-for-one.
- [ ] Breadcrumb rendered **and** emitted as `BreadcrumbList`.
- [ ] Enquiry form present, with this page's service pre-selected.
- [ ] 3 related-service links and a link back to the index.

**Site-wide**

- [ ] `sitemap.xml` generated from the data arrays; `robots.txt` points at it; **the file exists**.
- [ ] Unknown slugs 404 rather than rendering a shell.
- [ ] Title, description, canonical, headings and JSON-LD present in the **initial HTML**, verified with JavaScript disabled.
- [ ] NAP identical on every page and matching Google Business Profile byte-for-byte.
- [ ] Lighthouse SEO 100, Accessibility ≥ 95, CLS < 0.1.
- [ ] Automated test asserting every service/area entry has the fields its template renders, and that every image path resolves — so a typo fails CI instead of shipping.
