import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { serviceAreaPages } from './src/data/areas.js';
import { posts } from './src/data/posts.js';
import { services } from './src/data/services.js';

/**
 * Vite configuration.
 *
 * `VITE_HMR_CLIENT_PORT` lets the dev server run behind an HTTPS reverse proxy
 * (cloud IDEs, preview sandboxes) where the browser reaches the app on a port
 * that differs from the one Vite listens on.
 */
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT) || undefined;

/** Escape a URL for safe inclusion in XML. */
function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * Build-time sitemap generator. Every indexable route is derived from the
 * content data, so the file can never drift from the real pages. Coming-soon
 * placeholders are deliberately excluded (they render `noindex`).
 *
 * @param {string} siteUrl Absolute origin, no trailing slash.
 */
function sitemapPlugin(siteUrl) {
  const lastmod = (date) => `<lastmod>${date}</lastmod>`;

  const entries = [
    { path: '/' },
    { path: '/services' },
    ...services.map((service) => ({ path: `/services/${service.slug}` })),
    { path: '/projects' },
    { path: '/blog' },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastmod: lastmod(post.publishedAt),
    })),
    ...serviceAreaPages.map((area) => ({ path: `/service-areas/${area.slug}` })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>${
        entry.lastmod ? `\n    ${entry.lastmod}` : ''
      }\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return {
    name: 'aao-sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Mirrors the default in src/lib/structuredData.js — one source of truth
  // would be nicer, but the config runs in Node before the app bundle exists.
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://www.aaoengineering.com').replace(/\/$/, '');

  return {
    plugins: [react(), sitemapPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5173,
      strictPort: true,
      // Allow proxied preview hostnames (e.g. https://5173-<id>.e2b.app).
      allowedHosts: true,
      hmr: hmrClientPort ? { clientPort: hmrClientPort, protocol: 'wss' } : true,
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      allowedHosts: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          // Keep third-party code in its own long-lived cache entry.
          manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined),
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
      css: true,
      include: ['src/**/*.test.{js,jsx}'],
    },
  };
});
