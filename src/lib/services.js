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
