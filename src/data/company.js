/**
 * Company profile: the single source of truth for every piece of business
 * information rendered on the site (header, footer, forms, structured data).
 */

export const company = {
  name: 'AAO Engineering Services',
  shortName: 'AAO',
  legalName: 'AAO Engineering Services',
  tagline: 'Accountability. Authenticity. Outstanding Service.',
  description:
    'Professionally designed solar, electrical, CCTV and security systems for homes and businesses that demand reliability. 200+ installations across Lagos.',
  founder: 'Adebayo Aina',
  foundedYear: 2019,
  phone: {
    display: '(810) 574-3694',
    href: 'tel:+2348105743694',
    whatsapp: 'https://wa.me/2348105743694',
  },
  email: 'aaoengineeringservices@gmail.com',
  address: {
    locality: 'Lagos',
    region: 'Lagos State',
    country: 'Nigeria',
    display: 'Lagos, Nigeria',
  },
  hours: 'Mon – Sat, 8:00 – 18:00',
  responseTime: 'We reply within 24 hours',
  socials: [
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { id: 'google', label: 'Google Business Profile', href: 'https://google.com', icon: 'google' },
  ],
  credit: {
    label: 'PowerGrowthz',
    href: 'https://powergrowthz.com',
  },
};

/** Headline proof points shown in the hero and service pages. */
export const trustChips = [
  { id: 'installs', label: 'Installations', value: '200+' },
  { id: 'technicians', label: 'Certified Technicians' },
  { id: 'products', label: 'Original Products + Warranty' },
  { id: 'cac', label: 'CAC Certified' },
  { id: 'experience', label: 'Years of Experience' },
  { id: 'google', label: 'Google Reviews', starred: true },
  { id: 'facebook', label: 'Facebook Reviews', starred: true },
];

/** The three promises behind every AAO project. */
export const promises = [
  {
    id: 'accountability',
    title: 'Accountability.',
    description:
      'We own every project from assessment to after-sales — one team, one point of contact, no excuses.',
  },
  {
    id: 'authenticity',
    title: 'Authenticity.',
    description:
      'Original products, honest recommendations, and upfront pricing. You get what actually works for you.',
  },
  {
    id: 'outstanding-service',
    title: 'Outstanding Service.',
    description:
      'Neat workmanship, certified technicians, and support that continues long after installation day.',
  },
];

/** Accreditations and manufacturer partners shown in the badge marquee. */
export const certifications = [
  'CAC',
  'COREN',
  'NEMSA',
  'NSE',
  'REAN',
  'Felicity Solar',
  'Luminous',
  'Growatt',
  'Deye',
  'Hikvision',
];

/** Lagos neighbourhoods covered by the team. */
export const serviceAreas = [
  'Ikoyi',
  'Victoria Island',
  'Lekki Phase 1',
  'Banana Island',
  'Oniru',
  'Victoria Garden City (VGC)',
  'Chevron / Lekki Conservation Area',
  'Ajah',
  'Magodo GRA',
  'Ikeja GRA',
  'Yaba',
];
