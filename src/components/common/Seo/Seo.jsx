import { useLocation } from 'react-router-dom';

import { company } from '@/data/company';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { absoluteUrl } from '@/lib/structuredData';

/**
 * Declarative page metadata. Drop one `<Seo />` at the top of every route.
 *
 * @param {Object} props
 * @param {string} props.title        Page title (the brand suffix is added here).
 * @param {string} [props.description]
 * @param {string} [props.image]      Absolute or root-relative social image.
 * @param {boolean} [props.noIndex]
 * @param {Array<Object>} [props.jsonLd]
 */
export function Seo({ title, description, image, noIndex = false, jsonLd }) {
  const { pathname } = useLocation();

  useDocumentMeta({
    title: title.includes(company.name) ? title : `${title} — ${company.name}`,
    description: description ?? company.description,
    canonical: absoluteUrl(pathname),
    image: image ? absoluteUrl(image) : undefined,
    noIndex,
    jsonLd,
  });

  return null;
}
