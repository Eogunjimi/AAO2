import { absoluteUrl, SITE_URL } from '@/lib/structuredData';

/**
 * robots.txt, generated so the sitemap URL always matches the configured site
 * origin instead of being hard-coded in a static file.
 *
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
