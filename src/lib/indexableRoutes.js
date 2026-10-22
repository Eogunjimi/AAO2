import { serviceAreaPages } from '../data/areas.js';
import { posts } from '../data/posts.js';
import { services } from '../data/services.js';

/**
 * Every public, indexable route, derived from the content data.
 *
 * Shared by the sitemap generator and the build-time pre-renderer so the two
 * can never disagree about which pages exist. Coming-soon placeholders and the
 * 404 page are deliberately excluded.
 *
 * `page` is the folder name under src/pages/ that renders the route. It is used
 * to pick the CSS chunk the pre-rendered HTML needs.
 *
 * Plain relative imports (no `@/` alias) so Node can load this file directly.
 *
 * @returns {Array<{path: string, page: string, lastmod?: string}>}
 */
export function getIndexableRoutes() {
  return [
    { path: '/', page: 'HomePage' },
    { path: '/services', page: 'ServicesPage' },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      page: 'ServiceDetailPage',
    })),
    { path: '/projects', page: 'ProjectsPage' },
    { path: '/blog', page: 'BlogPage' },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      page: 'BlogPostPage',
      lastmod: post.publishedAt,
    })),
    ...serviceAreaPages.map((area) => ({
      path: `/service-areas/${area.slug}`,
      page: 'ServiceAreaPage',
    })),
    { path: '/contact', page: 'ContactPage' },
  ];
}
