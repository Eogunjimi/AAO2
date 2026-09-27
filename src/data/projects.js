/**
 * Completed installations, shown in the home-page slider and on the projects
 * page. The slider caption is built from `title` and `location` so the two
 * views can never describe the same job differently.
 */

export const projects = [
  {
    id: 'lekki-solar',
    image: '/images/ion-home1.jpg',
    alt: 'Completed residential solar installation',
    title: 'Residential Solar + Battery',
    location: 'Lekki Phase 1',
    category: 'Solar & Power',
    summary:
      'A hybrid inverter and battery bank sized from a full load audit, so the house runs through outages without a generator.',
  },
  {
    id: 'magodo-cctv',
    image: '/images/aao-cctv.jpg',
    alt: 'CCTV installation on a residential property',
    title: '8-Camera CCTV + NVR',
    location: 'Magodo GRA',
    category: 'Security & Surveillance',
    summary:
      'Coverage planned around entry points rather than corners, with remote viewing set up and the family trained on the app.',
  },
  {
    id: 'ikeja-rewire',
    image: '/images/aao-electrical.jpg',
    alt: 'Neatly finished electrical distribution board',
    title: 'Full Rewire + Load Audit',
    location: 'Ikeja GRA',
    category: 'Electrical',
    summary:
      'Old circuits replaced and a labelled distribution board installed, with every run measured against the property’s real load.',
  },
  {
    id: 'vgc-gate',
    image: '/images/aao-gate.jpg',
    alt: 'Automatic gate installation',
    title: 'Automatic Gate + Intercom',
    location: 'VGC',
    category: 'Access Control & Automation',
    summary:
      'Motorised gate with intercom entry, finished in three days exactly as quoted and matched to the existing gate work.',
  },
  {
    id: 'ajah-commercial',
    image: '/images/project-commercial.jpg',
    alt: 'Commercial solar array on a rooftop',
    title: 'Commercial Hybrid System',
    location: 'Ajah',
    category: 'Solar & Power',
    summary:
      'A rooftop array and hybrid inverter that cut the shop’s diesel spend by more than half in the first two months.',
  },
];

/** One-line label for a project, used by the slider captions. */
export function projectCaption(project) {
  return `${project.title} — ${project.location}`;
}

/** Hero slider imagery. */
export const heroSlides = [
  {
    id: 'solar',
    image: '/images/ion-hero.jpg',
    alt: 'Solar installation in progress',
    caption: 'Solar & Inverter Installation',
  },
  {
    id: 'cctv',
    image: '/images/aao-cctv.jpg',
    alt: 'CCTV camera installation',
    caption: 'CCTV & Surveillance Systems',
  },
  {
    id: 'electrical',
    image: '/images/aao-electrical.jpg',
    alt: 'Electrical installation work',
    caption: 'Electrical Installation & Audits',
  },
];
