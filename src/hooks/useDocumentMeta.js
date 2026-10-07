'use client';

import { useEffect } from 'react';

/**
 * Imperatively manage document head tags for the current route.
 *
 * A deliberately small alternative to react-helmet: the site is a CSR SPA with
 * a handful of routes, so a focused effect keeps the dependency graph lean and
 * the behaviour obvious.
 *
 * @param {Object} meta
 * @param {string} meta.title
 * @param {string} [meta.description]
 * @param {string} [meta.canonical]
 * @param {string} [meta.image]
 * @param {boolean} [meta.noIndex]
 * @param {Array<Object>} [meta.jsonLd] schema.org payloads.
 */
export function useDocumentMeta({ title, description, canonical, image, noIndex, jsonLd }) {
  useEffect(() => {
    if (!title) return undefined;
    const previousTitle = document.title;
    document.title = title;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  useEffect(() => {
    const cleanups = [
      setMetaTag('name', 'description', description),
      setMetaTag('property', 'og:title', title),
      setMetaTag('property', 'og:description', description),
      setMetaTag('property', 'og:type', 'website'),
      setMetaTag('property', 'og:image', image),
      setMetaTag('property', 'og:url', canonical),
      setMetaTag('name', 'twitter:card', image ? 'summary_large_image' : 'summary'),
      setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow'),
      setCanonical(canonical),
    ];

    return () => cleanups.forEach((cleanup) => cleanup?.());
  }, [title, description, canonical, image, noIndex]);

  useEffect(() => {
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
}

function setMetaTag(attribute, key, value) {
  if (!value) return undefined;

  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);
  const created = !element;
  const previous = element?.getAttribute('content') ?? null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);

  return () => {
    if (created) element.remove();
    else if (previous !== null) element.setAttribute('content', previous);
  };
}

function setCanonical(href) {
  if (!href) return undefined;

  let link = document.head.querySelector('link[rel="canonical"]');
  const created = !link;
  const previous = link?.getAttribute('href') ?? null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);

  return () => {
    if (created) link.remove();
    else if (previous !== null) link.setAttribute('href', previous);
  };
}
