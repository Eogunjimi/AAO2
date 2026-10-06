import { company } from '@/data/company';

import { absoluteUrl } from './structuredData';

/**
 * Page metadata builder for the App Router.
 *
 * Replaces the hand-rolled `<Seo />` component the SPA used: Next renders all
 * of this into the served HTML, so crawlers and link unfurlers (WhatsApp,
 * Facebook, X — none of which run JavaScript) see real tags instead of an
 * empty shell.
 *
 * Every route exports either a `metadata` object or a `generateMetadata`
 * function built from this helper, so titles, canonicals and social cards stay
 * consistent across the site.
 *
 * @param {Object} options
 * @param {string} options.title     Page title, without the brand suffix.
 * @param {string} options.path      Root-relative path, used for the canonical.
 * @param {string} [options.description]
 * @param {string} [options.image]   Root-relative or absolute social image.
 * @param {boolean} [options.noIndex]
 * @param {boolean} [options.absoluteTitle] Skip the `— AAO …` title template.
 * @param {'website'|'article'} [options.type]
 * @param {Object} [options.article] `publishedTime`, `section` … for articles.
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  title,
  path,
  description,
  image,
  noIndex = false,
  absoluteTitle = false,
  type = 'website',
  article,
}) {
  const resolvedDescription = description ?? company.description;
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image ?? '/images/og-default.jpg');

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: resolvedDescription,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type,
      title,
      description: resolvedDescription,
      url,
      siteName: company.name,
      locale: 'en_NG',
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
      ...article,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: resolvedDescription,
      images: [socialImage],
    },
  };
}
