/**
 * Next.js configuration.
 *
 * The site is wholly static: every route is prerendered at build time, so the
 * output deploys to Vercel (or any static host) without a running server. The
 * App Router is still free to add route handlers or ISR later, which is why we
 * do not force `output: 'export'`.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Cloud IDEs and preview sandboxes serve the dev server from a proxied
  // hostname (e.g. https://3000-<id>.e2b.app). Next blocks cross-origin dev
  // requests unless the origin is allowed here.
  // Linting is a separate CI step (`npm run lint`) rather than part of the
  // build; Next 16 no longer runs ESLint during `next build` at all.
  allowedDevOrigins: ['*.e2b.app', '*.vercel.app'],
};

export default nextConfig;
