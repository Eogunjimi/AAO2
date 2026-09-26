/** Seasonal solar offer band on the home page. */

export const seasonalOffer = {
  badge: 'Limited-Time Offer — Book While Slots Are Available',
  eyebrow: 'Seasonal Offer',
  title: 'Save More When You Switch to Solar This Season',
  description:
    'Power your home or business with a solar system properly sized for your energy needs—and take advantage of our limited-time seasonal installation offer.',
  perks: [
    'Free Site Inspection',
    'Professional Load Audit',
    'Warranty-Backed Products',
    'Expert Installation',
  ],
  image: {
    src: '/images/ion-home2.jpg',
    alt: 'Home powered by a solar and battery system',
  },
  packages: [
    {
      slug: 'solar-inverter',
      title: 'Solar Panel Installation',
      description: 'Tier-1 panels, flush & neat',
    },
    {
      slug: 'solar-inverter',
      title: 'Inverter & Battery Systems',
      description: 'Hybrid inverters + lithium storage',
    },
    { slug: 'load-audit', title: 'Solar System Design', description: 'Load audit & system sizing' },
    {
      slug: 'cctv-maintenance',
      title: 'Solar Maintenance & Upgrade',
      description: 'Health checks & capacity upgrades',
    },
  ],
};
