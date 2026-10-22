/**
 * Pure helpers that turn page metadata into static <head> markup for the
 * pre-renderer. They mirror what `useDocumentMeta` sets in the browser, so a
 * crawler that does not run JavaScript sees the same title, description,
 * canonical, social tags and JSON-LD as a visitor.
 *
 * Plain JS with no aliases so the Node build script can import it.
 */

/** Meta/link tags the pre-renderer owns. Any of these in the template is replaced. */
const MANAGED_META_NAMES = [
  'description',
  'robots',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'og:title',
  'og:description',
  'og:type',
  'og:image',
  'og:url',
];

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**
 * @param {Object} meta
 * @param {string} meta.title Final document title (brand suffix already applied).
 * @param {string} [meta.description]
 * @param {string} [meta.canonical] Absolute URL.
 * @param {string} [meta.image] Absolute URL.
 * @param {boolean} [meta.noIndex]
 * @param {Array<Object>} [meta.jsonLd]
 * @returns {string} HTML for the inside of <head>.
 */
export function buildHeadTags({ title, description, canonical, image, noIndex, jsonLd } = {}) {
  const tags = [];
  const meta = (attribute, key, value) => {
    if (value) tags.push(`<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  };

  if (title) tags.push(`<title>${escapeHtml(title)}</title>`);
  meta('name', 'description', description);
  meta('property', 'og:title', title);
  meta('property', 'og:description', description);
  meta('property', 'og:type', 'website');
  meta('property', 'og:image', image);
  meta('property', 'og:url', canonical);
  meta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
  meta('name', 'twitter:title', title);
  meta('name', 'twitter:description', description);
  meta('name', 'twitter:image', image);
  meta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
  if (canonical) tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);

  for (const payload of jsonLd ?? []) {
    // Escape "<" so no string in the payload can close the script tag early.
    const json = JSON.stringify(payload).replaceAll('<', '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join('\n    ');
}

/**
 * Removes the static title, description, social, robots and canonical tags
 * from the built index.html, so the per-page values are the only ones left.
 *
 * @param {string} template
 * @returns {string}
 */
export function stripManagedHead(template) {
  const managedMeta = new RegExp(
    `<meta\\s[^>]*?\\b(?:name|property)="(?:${MANAGED_META_NAMES.join('|')})"[^>]*>\\s*`,
    'g',
  );

  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(managedMeta, '')
    .replace(/<link\s[^>]*rel="canonical"[^>]*>\s*/g, '');
}
