import { serviceAreaPages } from '@/data/areas';
import { posts } from '@/data/posts';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

/**
 * Build-time sitemap.
 *
 * Replaces the bespoke Vite plugin with Next's convention. Every indexable
 * route is still derived from the content data, so the file cannot drift from
 * the real pages. The coming-soon placeholders are deliberately absent — they
 * render `noindex`.
 *
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  const entries = [
    { path: paths.home, priority: 1 },
    { path: paths.services, priority: 0.9 },
    ...services.map((service) => ({ path: paths.service(service.slug), priority: 0.8 })),
    { path: paths.projects, priority: 0.7 },
    { path: paths.blog, priority: 0.7 },
    ...posts.map((post) => ({
      path: paths.blogPost(post.slug),
      lastModified: new Date(post.publishedAt),
      priority: 0.6,
    })),
    ...serviceAreaPages.map((area) => ({ path: paths.serviceArea(area.slug), priority: 0.8 })),
  ];

  return entries.map(({ path, lastModified, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
