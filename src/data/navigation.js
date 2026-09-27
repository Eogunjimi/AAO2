import { serviceAreaPages } from '@/data/areas';
import { getServicesByCategory } from '@/lib/services';
import { anchors, paths } from '@/routes/paths';

/**
 * Navigation model.
 *
 * `primaryNav` is the single source of truth for the header and the mobile
 * drawer, and the services menu is generated from the service catalogue so it
 * can never drift from the pages that actually exist.
 */

/** Categories offered in the services menu, in this order. */
const SERVICE_MENU_CATEGORIES = ['solar-power', 'security', 'access-automation'];

/** Entries in the About menu. */
export const aboutMenu = [
  { id: 'about', label: 'About AAO', to: anchors.about },
  { id: 'blog', label: 'Blog', to: anchors.insights },
  { id: 'team', label: 'Team', to: paths.team },
  { id: 'career', label: 'Career', to: paths.career },
  { id: 'academy', label: 'Academy', to: paths.academy },
  { id: 'shop', label: 'Shop', to: paths.shop },
];

/** Entries in the Service Areas menu, one per neighbourhood page. */
export const areaMenu = serviceAreaPages.map((area) => ({
  id: area.slug,
  label: area.name,
  to: paths.serviceArea(area.slug),
}));

export const primaryNav = [
  { id: 'home', label: 'Home', to: paths.home },
  { id: 'about', label: 'About', to: anchors.about, menu: 'about' },
  { id: 'services', label: 'Services', to: paths.services, menu: 'services' },
  { id: 'areas', label: 'Service Areas', to: anchors.areas, menu: 'areas' },
  { id: 'projects', label: 'Projects', to: paths.projects },
  { id: 'contact', label: 'Contact Us', to: anchors.contact },
];

/**
 * Service groups rendered inside the mega-menu and the mobile drawer.
 *
 * ICT & Networking is deliberately absent — those services stay reachable from
 * the catalogue at /services. Add its id above to bring it into the menu.
 */
export function getServiceMenuGroups() {
  return getServicesByCategory()
    .filter((group) => SERVICE_MENU_CATEGORIES.includes(group.id))
    .map((group) => ({
      id: group.id,
      title: group.name,
      links: group.services
        .filter((service) => !service.hiddenFromMenu)
        .map((service) => ({
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
      { id: 'about', label: 'About', to: anchors.about },
      { id: 'services', label: 'Services', to: paths.services },
      { id: 'areas', label: 'Service Areas', to: anchors.areas },
      { id: 'projects', label: 'Projects', to: paths.projects },
      { id: 'contact', label: 'Contact Us', to: anchors.contact },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'blog', label: 'Blog', to: anchors.insights },
      { id: 'team', label: 'Team', to: paths.team },
      { id: 'career', label: 'Career', to: paths.career },
      { id: 'academy', label: 'Academy', to: paths.academy },
      { id: 'shop', label: 'Shop', to: paths.shop },
      { id: 'faq', label: 'FAQ', to: anchors.faq },
    ],
  },
];
