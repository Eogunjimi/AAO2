import { posts } from '@/data/posts';

/** Selectors for the blog. Components ask these instead of filtering `posts`. */

/** @returns {import('@/data/posts').Post | undefined} */
export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function isValidPostSlug(slug) {
  return posts.some((post) => post.slug === slug);
}

/**
 * Further reading: posts in the same category first, then the rest.
 *
 * @param {string} slug
 * @param {number} [limit]
 */
export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return posts.slice(0, limit);

  const sameCategory = posts.filter(
    (post) => post.category === current.category && post.slug !== slug,
  );
  const others = posts.filter((post) => post.category !== current.category && post.slug !== slug);

  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Long-form date for the byline, e.g. "12 August 2026".
 *
 * @param {string} isoDate
 */
export function formatPostDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
