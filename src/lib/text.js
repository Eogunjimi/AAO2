/** Small text helpers shared across components. */

const HONORIFICS = new Set(['mr', 'mrs', 'ms', 'miss', 'dr', 'engr', 'prof', 'chief', 'sir']);

/**
 * Initials for an avatar, ignoring honorifics.
 * "Engr. E. Adeyemi" → "EA", "Mrs. A. Bakare" → "AB".
 *
 * @param {string} name
 * @param {number} [max] Maximum number of letters.
 * @returns {string}
 */
export function initials(name, max = 2) {
  if (!name) return '';

  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .filter((word) => !HONORIFICS.has(word.toLowerCase()))
    .map((word) => word[0].toUpperCase())
    .slice(0, max)
    .join('');
}
