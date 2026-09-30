/** Centralised route + anchor definitions. Never hard-code a URL in a component. */

export const paths = {
  home: '/',
  services: '/services',
  projects: '/projects',
  blog: '/blog',
  serviceArea: (slug) => `/service-areas/${slug}`,
  service: (slug) => `/services/${slug}`,
  team: '/team',
  career: '/career',
  academy: '/academy',
  shop: '/shop',
  notFound: '/404',
};

/** Anchors to sections that live on the home page. */
export const anchors = {
  top: '/#top',
  services: '/#services',
  about: '/#about',
  work: '/#work',
  process: '/#process',
  reviews: '/#reviews',
  insights: '/#insights',
  faq: '/#faq',
  areas: '/#areas',
  contact: '/#contact',
};
