/** The five-step delivery process, shared by the home and service pages. */

export const processSteps = [
  {
    id: 'book',
    number: '01',
    title: 'Reach Out',
    duration: 'Same week',
    tag: { label: '100% Free', highlight: true },
    description: 'Call, text, or fill out our form. We listen first.',
    short: 'Call, text, or fill out our form. We listen first.',
  },
  {
    id: 'assess',
    number: '02',
    title: 'Free Site Inspection & Load Audit',
    duration: '30–60 min visit',
    tag: { label: 'AAO engineers' },
    description:
      'We visit, measure your power demand or security gaps, and assess the property.',
    short: 'We visit, measure your demand or security gaps, and assess the property.',
  },
  {
    id: 'solution',
    number: '03',
    title: 'Transparent Recommendation & Quote',
    duration: '24–48 hrs',
    tag: { label: 'Clear pricing', highlight: true },
    description:
      'You get a right-sized system, honest pricing, and product warranties in writing.',
    short: 'A right-sized system, honest pricing, and product warranties in writing.',
  },
  {
    id: 'install',
    number: '04',
    title: 'Professional Installation',
    duration: '2–5 days avg',
    tag: { label: 'Certified crew' },
    description:
      'Certified technicians install neatly, test everything, and hand over a clean, working system.',
    short: 'Certified technicians install, test, and hand over a clean, working system.',
  },
  {
    id: 'support',
    number: '05',
    title: 'Ongoing Support',
    duration: 'Lifetime',
    tag: { label: 'After-sales support', highlight: true },
    description: '24/7 after-sales access, maintenance, and guidance for the life of your system.',
    short: '24/7 after-sales access, maintenance, and guidance for the life of your system.',
  },
];

/** Steps of the "foolproof solution process" listed on service pages. */
export const solutionProcess = [
  'Free site inspection & professional assessment',
  'Clear written quote — no hidden costs',
  'Original, warranty-backed products only',
  'Professional installation, testing & handover',
  'After-sales support that actually answers',
];
