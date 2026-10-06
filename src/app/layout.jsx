import localFont from 'next/font/local';

import { SiteLayout } from '@/components/layout/SiteLayout';
import { company } from '@/data/company';
import { SITE_URL } from '@/lib/structuredData';

import '@/styles/index.css';

/**
 * Fonts are served from our own origin by `next/font/local`.
 *
 * The SPA pulled Manrope and Inter from fonts.googleapis.com with a
 * render-blocking `<link>`: two extra DNS lookups and TLS handshakes before
 * any text could paint, plus a third-party request on every visit. The woff2
 * files now live in `src/assets/fonts` (latin subsets of the variable cuts,
 * ~73 kB together), so there is no third-party request at runtime *or* at
 * build time — `next/font/google` would re-fetch them on every cold build,
 * which breaks offline and air-gapped CI.
 *
 * Next hashes, preloads and `font-display: swap`s them, and generates a
 * size-adjusted fallback so swapping in the real face causes no layout shift.
 * Each exposes a CSS variable that `tokens.css` reads, keeping the design
 * tokens the single source of truth.
 */
const manrope = localFont({
  src: '../assets/fonts/manrope-latin-wght-normal.woff2',
  // One variable file covering the whole axis the design uses.
  weight: '200 800',
  style: 'normal',
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const inter = localFont({
  src: '../assets/fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

/**
 * Site-wide metadata defaults. Individual routes override the title and
 * description; anything they omit falls back to these.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Power & Security Solutions in Lagos`,
    // Every page title gains the brand suffix unless it opts out with
    // `title: { absolute: … }`.
    template: `%s — ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name, url: SITE_URL }],
  creator: company.name,
  publisher: company.name,
  openGraph: {
    type: 'website',
    siteName: company.name,
    locale: 'en_NG',
    url: SITE_URL,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og-default.jpg'] },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  formatDetection: { telephone: true, address: true },
};

export const viewport = {
  themeColor: '#0c2b28',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <SiteLayout>{children}</SiteLayout>
        <noscript>
          AAO Engineering Services — solar, electrical, CCTV and security installations in Lagos.
          Please enable JavaScript, or call (810) 574-3694 to reach our team.
        </noscript>
      </body>
    </html>
  );
}
