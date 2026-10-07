import { company } from '@/data/company';
import { SITE_URL, absoluteUrl } from '@/lib/structuredData';

/**
 * Build a Next.js `Metadata` object from the same props the legacy `<Seo />`
 * component used to accept. This keeps per-page SEO declarations terse and
 * lets us switch metadata between routes the same way we always did, while
 * handing Next.js the static metadata shape it needs to render tags in the
 * server HTML.
 *
 * @param {Object} props
 * @param {string} props.title        Page title (the brand suffix is added here).
 * @param {string} [props.description]
 * @param {string} [props.image]      Absolute or root-relative social image.
 * @param {string} [props.pathname]   This page's path, used for canonical + og:url.
 * @param {boolean} [props.noIndex]
 */
export function buildMetadata({ title, description, image, pathname = '/', noIndex = false }) {
  const fullTitle = title.includes(company.name) ? title : `${title} — ${company.name}`;
  const desc = description ?? company.description;
  const ogImage = image ? absoluteUrl(image) : absoluteUrl('/images/og-default.jpg');
  const url = absoluteUrl(pathname);

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    // Note: themeColor is declared in the root `viewport` export (app/layout.jsx)
    // because Next.js 15 requires viewport-related metadata there.
    openGraph: {
      siteName: company.name,
      title: fullTitle,
      description: desc,
      type: 'website',
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'en_NG',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    metadataBase: new URL(SITE_URL),
  };
}
