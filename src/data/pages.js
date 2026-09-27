/**
 * Copy for the sections announced in the navigation that do not have full
 * pages yet. Replace an entry with a real page as soon as it is ready — the
 * route and the menu item already point at it.
 */
export const upcomingPages = {
  team: {
    title: 'Team',
    heading: 'Meet the engineers behind every install',
    body: 'We are putting together profiles of the certified engineers and technicians who design, install and maintain your systems — the same people who show up for the site inspection.',
    points: [
      'Certified engineers and technicians',
      'Named project lead on every install',
      'Ongoing training and safety standards',
    ],
  },
  career: {
    title: 'Career',
    heading: 'Build your career with AAO',
    body: 'We are always interested in solar technicians, electricians, CCTV installers and project coordinators who care about neat, honest work. Open roles will be listed here.',
    points: [
      'Solar and inverter technicians',
      'Electricians and load-audit engineers',
      'CCTV, access control and network installers',
    ],
  },
  academy: {
    title: 'Academy',
    heading: 'Learn the trade, properly',
    body: 'AAO Academy will offer hands-on training in solar sizing and installation, inverter systems, and CCTV and access control — taught on real equipment by working engineers.',
    points: [
      'Practical solar and inverter training',
      'CCTV and access control fundamentals',
      'Certificates on completion',
    ],
  },
  shop: {
    title: 'Shop',
    heading: 'Original equipment, warranty backed',
    body: 'Our online store is on the way. In the meantime, tell us what you need and we will quote original panels, inverters, batteries, cameras and accessories with warranty papers.',
    points: [
      'Panels, inverters and batteries',
      'Cameras, smart locks and access control',
      'Warranty documents with every unit',
    ],
  },
};
