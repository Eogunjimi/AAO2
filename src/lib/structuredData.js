import { company, serviceAreas } from '@/data/company';
import { services } from '@/data/services';

/** Builders for schema.org JSON-LD payloads injected by the `<Seo />` component. */

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://www.aaoengineering.com').replace(
  /\/$/,
  '',
);

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
    telephone: company.phone.display,
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
