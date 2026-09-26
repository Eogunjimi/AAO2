import { anchors, paths } from '@/routes/paths';

import { getServicesByCategory } from '@/lib/services';

/**
 * Navigation model.
 *
 * The services mega-menu is generated from the service catalogue so menus can
 * never drift from the pages that actually exist.
 */

export const companyLinks = [
  { id: 'about', label: 'About', to: anchors.about },
  { id: 'blog', label: 'Blog', to: anchors.insights },
  { id: 'career', label: 'Career', to: anchors.contact },
  { id: 'academy', label: 'Academy', to: anchors.contact },
  { id: 'shop', label: 'Shop', to: anchors.contact },
  { id: 'engineers', label: 'Engineers', to: anchors.about },
];

export const primaryNav = [
  { id: 'home', label: 'Home', to: paths.home },
  { id: 'services', label: 'Services', to: paths.services, menu: 'services' },
  { id: 'work', label: 'Past Work', to: anchors.work },
  { id: 'company', label: 'Company', to: anchors.about, menu: 'company' },
  { id: 'blog', label: 'Blog', to: anchors.insights },
  { id: 'contact', label: 'Contact', to: anchors.contact },
];

/** Service groups rendered inside the mega-menu and the mobile drawer. */
export function getServiceMenuGroups() {
  return getServicesByCategory().map((group) => ({
    id: group.id,
    title: group.name,
    links: group.services.map((service) => ({
      id: service.slug,
      label: service.title,
      to: paths.service(service.slug),
    })),
  }));
}

export const footerMenus = [
  {
    id: 'main',
    title: 'Main Menu',
    links: [
      { id: 'home', label: 'Home', to: paths.home },
      { id: 'services', label: 'Services', to: paths.services },
      { id: 'work', label: 'Past Work', to: anchors.work },
      { id: 'about', label: 'About', to: anchors.about },
      { id: 'blog', label: 'Blog', to: anchors.insights },
      { id: 'contact', label: 'Contact', to: anchors.contact },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'career', label: 'Career', to: anchors.contact },
      { id: 'academy', label: 'Academy', to: anchors.contact },
      { id: 'shop', label: 'Shop', to: anchors.contact },
      { id: 'engineers', label: 'Engineers', to: anchors.about },
      { id: 'privacy', label: 'Privacy Policy', to: anchors.contact },
      { id: 'terms', label: 'Terms of Service', to: anchors.contact },
    ],
  },
];
