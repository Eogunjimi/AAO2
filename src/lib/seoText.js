/**
 * Length rules for search snippets. Titles are kept under the width search
 * results display; descriptions stay within the 120–160 character range that
 * fits the snippet.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 160;

/** Standard closing sentences, longest first. Used to pad short descriptions. */
export const DESCRIPTION_PADDING = [
  ' Free site inspection in Lagos, original products and a warranty on every job.',
  ' Free site inspection in Lagos, original products and warranty.',
  ' Replies within 24 hours.',
];

/**
 * Adds the brand suffix only when the whole title still fits, so the brand is
 * never truncated away. Titles that already contain the brand are left alone.
 */
export function formatTitle(title, { brand, suffix }) {
  if (!title) return title;
  if (brand && title.includes(brand)) return title;
  const full = `${title}${suffix}`;
  return full.length <= TITLE_MAX ? full : title;
}

/**
 * Normalises a meta description: collapses whitespace, pads short text with a
 * standard closing sentence, and cuts long text at a word boundary with an
 * ellipsis.
 */
export function fitDescription(text, { padding = DESCRIPTION_PADDING } = {}) {
  let value = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!value) return value;

  // Add padding sentences in order, stopping once the text is long enough and
  // never going over the maximum.
  for (const extra of padding) {
    if (value.length >= DESCRIPTION_MIN) break;
    if (value.length + extra.length <= DESCRIPTION_MAX) value += extra;
  }

  if (value.length > DESCRIPTION_MAX) {
    const cut = value.slice(0, DESCRIPTION_MAX - 1);
    const lastSpace = cut.lastIndexOf(' ');
    const trimmed = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—-]+$/, '');
    value = `${trimmed}…`;
  }

  return value;
}
