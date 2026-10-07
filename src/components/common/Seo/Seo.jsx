'use client';

import React from 'react';
import { company } from '@/data/company';

/**
 * Client-side SEO helper.
 *
 * In the Next.js App Router, static metadata (title, description, canonical,
 * Open Graph, robots) is delivered from the server via the route's
 * `export const metadata` / `generateMetadata`. Page components in `src/views/*`
 * also render this `<Seo />` to:
 *
 *   1. set document.title on the client (useful for client navigations and
 *      unit tests, which don't exercise Next's server metadata), and
 *   2. inject per-page JSON-LD scripts into the document head at runtime,
 *      which is what the existing tests assert against.
 *
 * In production the JSON-LD is also rendered as an inline <script> in the
 * server HTML by each route, so crawlers always see it even without JS.
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {boolean} [props.noIndex]
 * @param {Array<Object>} [props.jsonLd]
 */
export function Seo({ title, noIndex = false, jsonLd }) {
  const fullTitle = title
    ? title.includes(company.name)
      ? title
      : `${title} — ${company.name}`
    : undefined;

  React.useEffect(() => {
    if (!fullTitle) return undefined;
    const previousTitle = document.title;
    document.title = fullTitle;
    return () => {
      document.title = previousTitle;
    };
  }, [fullTitle]);

  React.useEffect(() => {
    if (!noIndex) return undefined;

    let meta = document.querySelector('meta[name="robots"]');
    const created = !meta;
    const previous = meta?.getAttribute('content') ?? null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (created) meta.remove();
      else if (previous !== null) meta.setAttribute('content', previous);
      else meta.remove();
    };
  }, [noIndex]);

  React.useEffect(() => {
    if (!jsonLd?.length) return undefined;

    const nodes = jsonLd.map((payload) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.managed = 'seo';
      script.textContent = JSON.stringify(payload);
      document.head.appendChild(script);
      return script;
    });

    return () => nodes.forEach((node) => node.remove());
  }, [jsonLd]);

  return null;
}
