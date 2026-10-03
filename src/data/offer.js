/** Seasonal solar offer band on the home page. */

export const seasonalOffer = {
  badge: 'Limited-Time Offer — Book While Slots Are Available',
  eyebrow: 'Seasonal Offer',
  title: 'This Season, Upgrade Your Power Without Overpaying',
  /**
   * Body copy as segments: plain strings render as-is, `{ em: '…' }` segments
   * render in italic emphasis.
   */
  description: [
    'Our limited-time seasonal installation offer makes properly sized solar and backup systems more affordable than ever. Whether you need home backup, a full commercial setup, or security automation, our free site inspection and load audit ensure you get the ',
    { em: 'right' },
    ' system—not the most expensive one.',
  ],
  ctaLabel: 'Claim Your Free Inspection',
  urgencyNote: 'Offer valid for installations booked this season. Slots are limited.',
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
