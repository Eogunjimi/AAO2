import { serviceFaqs } from '@/data/faqs';
import { processSteps } from '@/data/process';
import { servicePages } from '@/data/servicePages';
import { DEFAULT_SERVICE_SLUG, serviceCategories, services } from '@/data/services';

/**
 * Selectors for the service catalogue. Components ask these helpers for data
 * instead of filtering the raw array, so the shape of the catalogue can change
 * in one place.
 */

/** @returns {import('@/data/services').Service | undefined} */
export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

/** Resolve a slug to a service, falling back to the default service. */
export function getServiceOrDefault(slug) {
  return getServiceBySlug(slug) ?? getServiceBySlug(DEFAULT_SERVICE_SLUG);
}

export function isValidServiceSlug(slug) {
  return services.some((service) => service.slug === slug);
}

/** Services grouped in the canonical category order, skipping empty groups. */
export function getServicesByCategory() {
  return serviceCategories
    .map((category) => ({
      ...category,
      services: services.filter((service) => service.category === category.name),
    }))
    .filter((category) => category.services.length > 0);
}

/**
 * Sibling services from the same category, then others, capped at `limit`.
 *
 * @param {string} slug
 * @param {number} [limit]
 */
export function getRelatedServices(slug, limit = 3) {
  const current = getServiceBySlug(slug);
  if (!current) return services.slice(0, limit);

  const sameCategory = services.filter(
    (service) => service.category === current.category && service.slug !== slug,
  );
  const others = services.filter(
    (service) => service.category !== current.category && service.slug !== slug,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

/** Options for the "service you're interested in" form select. */
export function getServiceOptions() {
  return services.map((service) => ({ value: service.slug, label: service.title }));
}

/** Icons used when a service has no bespoke "what you get" cards yet. */
const FALLBACK_ICONS = ['clipboard', 'medal', 'shield', 'support'];

/**
 * Everything a service page renders, merged with catalogue fallbacks so a
 * service without a long-form entry still produces a complete page.
 *
 * @param {import('@/data/services').Service} service
 */
export function getServicePage(service) {
  const page = servicePages[service.slug] ?? {};

  const faqs = page.faqs ?? [{ id: `${service.slug}-faq`, ...service.faq }, ...serviceFaqs];

  return {
    heroTitle: page.heroTitle ?? service.headline,
    heroSubtitle: page.heroSubtitle ?? service.summary,
    heroImage: page.heroImage ?? service.image,

    introTitle: page.introTitle ?? `Professional ${service.title} You Can Rely On`,
    introImage: page.introImage ?? service.image,
    introBody: page.introBody ?? [service.intro],

    includedTitle: page.includedTitle ?? { lead: "What's Included In", accent: 'Every Job' },
    included:
      page.included ??
      service.benefits.map((benefit, index) => ({
        id: `${service.slug}-benefit-${index}`,
        icon: FALLBACK_ICONS[index % FALLBACK_ICONS.length],
        ...benefit,
      })),

    processTitle: page.processTitle ?? { lead: 'How We Handle', accent: service.title },
    process: page.process ?? processSteps,

    /** The template shows five at most. */
    faqs: faqs.slice(0, 5),
  };
}
