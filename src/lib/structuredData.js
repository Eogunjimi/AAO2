import { company, serviceAreas } from '@/data/company';
import { services } from '@/data/services';

/** Builders for schema.org JSON-LD payloads rendered by the `<JsonLd />` component. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aaoengineering.com'
).replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    name: company.name,
    description: company.description,
    url: SITE_URL,
    email: company.email,
    // Schema.org wants a dialable international number, not the local display form.
    telephone: company.phone.e164,
    founder: { '@type': 'Person', name: company.founder },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.landmark}, ${company.address.street}`,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    areaServed: serviceAreas.map((area) => ({ '@type': 'Place', name: area })),
    sameAs: company.socials.map((social) => social.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Power & security services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.category,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@type': 'Organization', name: company.name, url: SITE_URL },
    areaServed: { '@type': 'City', name: company.address.locality },
  };
}

/**
 * Article schema for a blog post.
 *
 * @param {import('@/data/posts').Post} post
 */
export function buildArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    articleSection: post.category,
    author: { '@type': 'Organization', name: company.name, url: SITE_URL },
    publisher: { '@type': 'Organization', name: company.name, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
  };
}

/**
 * `BreadcrumbList` for a trail that is already on the page.
 *
 * Takes the exact array `<PageHero breadcrumb>` renders, so the schema is
 * generated from the visible crumbs and cannot drift from them. The final
 * crumb has no `to` (it is the current page) and therefore no `item` — which
 * is what Google expects for the trailing entry.
 *
 * @param {Array<{label: string, to?: string}>} crumbs
 */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.to ? { item: absoluteUrl(crumb.to) } : {}),
    })),
  };
}

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
