import { serviceAreaPages } from '@/data/areas';

/** Selectors for the service-area pages. */

/** @returns {import('@/data/areas').ServiceArea | undefined} */
export function getAreaBySlug(slug) {
  return serviceAreaPages.find((area) => area.slug === slug);
}

/**
 * Five questions for an area page: the two written for the neighbourhood,
 * then the three every caller asks, localised.
 *
 * @param {import('@/data/areas').ServiceArea} area
 */
export function getAreaFaqs(area) {
  return [
    ...area.localFaqs,
    {
      id: `${area.slug}-cost`,
      question: `What does a solar and inverter system cost in ${area.name}?`,
      answer: `There is no honest answer before the load is measured — the same house can need two very different systems depending on how it is lived in. We inspect the property in ${area.name} free of charge, measure the load, then give you one written price covering equipment, installation and commissioning. Flexible payment options are available.`,
    },
    {
      id: `${area.slug}-visit`,
      question: `Is the site inspection in ${area.name} really free?`,
      answer: `Yes, and there is no obligation attached to it. We visit, measure your load, look at your roof and board, and tell you what the numbers justify — even when that is a smaller system than you expected, or none at all.`,
    },
    {
      id: `${area.slug}-time`,
      question: `How long does an installation in ${area.name} take?`,
      answer: `Most homes are completed in two to five days depending on system size and roof access; commercial work is phased around your operating hours. You get the exact timeline in writing after the inspection, and we work to it.`,
    },
  ].slice(0, 5);
}
