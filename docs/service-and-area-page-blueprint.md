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

The prompt is not a pure description — four of its requirements are fixes for gaps in this
repository. Treat them as part of the spec, not optional extras:

| Requirement in the prompt                    | Status here                                                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Pre-rendered HTML for metadata and JSON-LD   | **Missing.** This is a client-rendered SPA; every meta tag and schema is injected after hydration. The single biggest weakness. |
| `sitemap.xml` generated from the data arrays | **Missing.** `robots.txt` advertises `/sitemap.xml`, but the file does not exist.                                               |
| `BreadcrumbList` schema                      | **Missing.** Breadcrumbs render visually on both page types but are never emitted as structured data.                           |
| 3 related-service links per service page     | **Missing.** `getRelatedServices()` is implemented and unit-tested, but no template calls it — service pages are link-leaves.   |

Everything else in the prompt is a faithful extraction of patterns that are working in this
codebase today.
