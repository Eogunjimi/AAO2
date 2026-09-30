/**
 * Editorial posts, shown in the home page's "Insights" rail and on /blog.
 *
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} category
 * @property {string} title
 * @property {string} excerpt
 * @property {string} image
 * @property {string} alt
 */

/** @type {Post[]} */
export const posts = [
  {
    id: 'inverter-sizing',
    category: 'Solar Basics',
    title: 'How to size your inverter & battery bank correctly',
    excerpt:
      'The exact framework we use on every site visit — so you never pay for too much or settle for too little.',
    image: '/images/warm-detail.jpg',
    alt: 'Close-up of solar panel detail',
  },
  {
    id: 'camera-count',
    category: 'Security',
    title: 'How many CCTV cameras does your home really need?',
    excerpt:
      "The #1 mistake homeowners make is covering corners, not entry points. Here's the proper way to plan coverage.",
    image: '/images/aao-cctv.jpg',
    alt: 'CCTV camera mounted on a wall',
  },
  {
    id: 'solar-vs-generator',
    category: 'Comparison',
    title: 'Solar vs generator in Lagos: the 5-year math',
    excerpt:
      'We ran the real numbers on fuel, servicing and downtime. The results will stop you from buying another generator.',
    image: '/images/hero-solar.jpg',
    alt: 'Solar array at dusk',
  },
  {
    id: 'load-audit-signs',
    category: 'Electrical',
    title: '5 signs your property needs a professional load audit',
    excerpt:
      'Tripping breakers, hot switches, rising bills — the warning signs we look for, and what they really mean.',
    image: '/images/aao-electrical.jpg',
    alt: 'Electrical distribution board',
  },
  {
    id: 'gate-checklist',
    category: 'Automation',
    title: "Automatic gates & smart locks: a buyer's checklist",
    excerpt:
      'What to demand before you pay: motor sizing, safety sensors, battery backup and warranty terms.',
    image: '/images/aao-gate.jpg',
    alt: 'Automatic gate at a residence',
  },
  {
    id: 'wifi-fix',
    category: 'ICT',
    title: "Wi-Fi that dies in half the house? Here's the real fix",
    excerpt:
      'Why boosting your router rarely works — and how structured cabling solves it once and for all.',
    image: '/images/aao-network.jpg',
    alt: 'Structured cabling in a network rack',
  },
];
