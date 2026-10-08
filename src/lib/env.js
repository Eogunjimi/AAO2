/**
 * Tiny environment-variable adapter so the app works the same way in Next.js
 * as it did under Vite.
 *
 * - In Vite, client-reachable variables were prefixed `VITE_`.
 * - In Next.js (App Router), client-reachable variables must be prefixed
 *   `NEXT_PUBLIC_`. Server-side code (server components, Route Handlers,
 *   generateMetadata) reads unprefixed variables too.
 *
 * This helper accepts both prefixes so existing `.env` files and deployments
 * keep working, with `NEXT_PUBLIC_` winning when both are set.
 */

function read(name) {
  // process.env is available in both server components and client components
  // (Next.js inlines only the `NEXT_PUBLIC_*` keys into the client bundle).
  const nextPublic = process.env[`NEXT_PUBLIC_${name}`];
  if (nextPublic !== undefined) return nextPublic;

  const vite = process.env[`VITE_${name}`];
  if (vite !== undefined) return vite;

  return undefined;
}

/** `true` when running in a dev server (Next.js dev or Vitest). */
export const isDev = process.env.NODE_ENV !== 'production';

/** Lead-submission endpoint (see .env.example). Empty string = demo mode. */
export const LEAD_ENDPOINT = read('LEAD_ENDPOINT') ?? '';

/** Absolute site URL, used for canonical tags and structured data. */
export const SITE_URL = (read('SITE_URL') ?? 'https://www.aaoengineering.com').replace(/\/$/, '');
