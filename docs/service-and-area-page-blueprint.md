# Service & Service-Area Page Blueprint — background notes

> ## ➡️ The prompt itself is in [`PROMPT-service-and-area-pages.md`](./PROMPT-service-and-area-pages.md)
>
> That file contains **nothing but the prompt**. Open it, copy the whole thing, fill in the
> variable table in Step 0, and hand it over. This file is only the background on where the
> prompt came from — you do not need to send it to anyone.

This document records how the service detail pages (`/services/:slug`) and service-area pages
(`/service-areas/:slug`) in this repository are structured, and what was changed when that
structure was converted into a portable prompt.

The numbers in the prompt are not invented — they are measured from this codebase:
15 services, 11 service areas, 3-paragraph service intros averaging ~110 words, 4 "what's
included" cards, 4 process steps, exactly 5 FAQs per page, and 298–394 words of genuinely
unique prose per area page.

## Where the prompt corrects the source

The prompt is not a pure description — four of its requirements started life as fixes for gaps
in this repository. Treat them as part of the spec, not optional extras. Three have since been
closed; one remains:

| Requirement in the prompt                    | Status here                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pre-rendered HTML for metadata and JSON-LD   | **Still missing.** This is a client-rendered SPA; every meta tag and schema is injected after hydration. The biggest weakness. |
| `sitemap.xml` generated from the data arrays | **Done.** `sitemapPlugin()` in `vite.config.js` emits it at build time from `services`, `posts` and `serviceAreaPages`.        |
| `BreadcrumbList` schema                      | **Done.** `buildBreadcrumbSchema()` takes the same array `<PageHero breadcrumb>` renders, so the two cannot drift.             |
| 3 related-service links per service page     | **Done.** `<RelatedServices />` calls `getRelatedServices()` and closes the link graph, plus a route back to the index.        |

Everything else in the prompt is a faithful extraction of patterns that are working in this
codebase today.

### Closing the last gap

Pre-rendering is the one item left, and it is the one the prompt says "outranks everything else".
The shape of the fix in this codebase: add a build step that walks the same route list the
sitemap plugin already derives, renders each with `react-dom/server`, and writes one HTML file
per route so the title, description, canonical, headings and JSON-LD are in the initial
response. The data layer and `<Seo />` already make every page a pure function of its slug, so
nothing in `src/` has to change to support it.
