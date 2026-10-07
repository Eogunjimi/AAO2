import { serviceAreaPages } from '@/data/areas';
import { posts } from '@/data/posts';
import { services } from '@/data/services';
import { SITE_URL } from '@/lib/structuredData';

/**
 * Next.js sitemap. Every indexable route is derived from the content data, so
 * the file can never drift from the real pages. Coming-soon placeholders are
 * deliberately excluded (they render `noindex`).
 */
export default function sitemap() {
  const now = new Date();

  const entries = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/services`, lastModified: now },
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
    })),
    { url: `${SITE_URL}/projects`, lastModified: now },
    { url: `${SITE_URL}/blog`, lastModified: now },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
    ...serviceAreaPages.map((area) => ({
      url: `${SITE_URL}/service-areas/${area.slug}`,
      lastModified: now,
    })),
  ];

  return entries;
}
