import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { company } from '@/data/company';
import { SITE_URL } from '@/lib/structuredData';
import '@/styles/index.css';

/**
 * Static metadata that applies to every page (overridable per-route via
 * `export const metadata` or `generateMetadata`).
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Power & Security Solutions in Lagos`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: company.name,
    type: 'website',
    url: SITE_URL,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-default.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c2b28',
};

/**
 * Root layout: wraps every route with the shared site chrome
 * (skip link → header → main → footer) inside an error boundary.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are preloaded via next/font's strategy below. We keep the
          preconnect tags because Google Fonts still benefits from them for
          the initial connection handshake.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
        <noscript>
          {`${company.name} — solar, electrical, CCTV and security installations in Lagos. Please enable JavaScript, or call ${company.phone.display} to reach our team.`}
        </noscript>
      </head>
      <body>
        <ErrorBoundary>
          <SiteLayout>{children}</SiteLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
