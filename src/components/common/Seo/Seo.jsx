import { useLocation } from 'react-router-dom';

import { company } from '@/data/company';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { fitDescription, formatTitle } from '@/lib/seoText';
import { recordServerHead } from '@/lib/serverHead';
import { absoluteUrl } from '@/lib/structuredData';

/**
 * Declarative page metadata. Drop one `<Seo />` at the top of every route.
 *
 * @param {Object} props
 * @param {string} props.title        Page title. The brand suffix is added when it fits in 60 characters.
 * @param {string} [props.description] Normalised to 120–160 characters (see lib/seoText).
 * @param {string} [props.image]      Absolute or root-relative social image.
 * @param {boolean} [props.noIndex]
 * @param {Array<Object>} [props.jsonLd]
 */
export function Seo({ title, description, image, noIndex = false, jsonLd }) {
  const { pathname } = useLocation();

  const meta = {
    title: formatTitle(title, {
      brand: company.name,
      suffix: ` | ${company.shortName} Engineering`,
    }),
    description: fitDescription(description ?? company.description),
    canonical: absoluteUrl(pathname),
    image: image ? absoluteUrl(image) : undefined,
    noIndex,
    jsonLd,
  };

  // No-op in the browser; lets the build pre-render this page's <head>.
  recordServerHead(meta);
  useDocumentMeta(meta);

  return null;
}
