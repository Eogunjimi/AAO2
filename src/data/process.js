/** The five-step delivery process, shared by the home and service pages. */

export const processSteps = [
  {
    id: 'book',
    number: '01',
    title: 'Book Your Free Site Visit',
    duration: 'Same week',
    tag: { label: '100% Free', highlight: true },
    description:
      "Call or message us and we'll schedule a convenient time — usually within the same week.",
    short: 'Call or message us to schedule a convenient time.',
  },
  {
    id: 'assess',
    number: '02',
    title: 'We Assess Your Needs',
    duration: '30–60 min visit',
    tag: { label: 'AAO engineers' },
    description:
      'We inspect your site, map your load, and determine exactly what you need. No guesswork.',
    short: 'We inspect your site and determine exactly what you need.',
  },
  {
    id: 'solution',
    number: '03',
    title: 'Get the Right Solution',
    duration: '24–48 hrs',
    tag: { label: 'Clear pricing', highlight: true },
    description: 'You get a best-fit recommendation with a clear, upfront quote — no hidden costs.',
    short: 'Best-fit recommendation with clear, upfront pricing.',
  },
  {
    id: 'install',
    number: '04',
    title: 'We Handle the Installation',
    duration: '2–5 days avg',
    tag: { label: 'Certified crew' },
    description:
      'Our technicians install, test, and make sure everything works properly — neatly and on schedule.',
    short: 'Installed, tested, and confirmed working properly.',
  },
  {
    id: 'support',
    number: '05',
    title: 'Enjoy With Confidence',
    duration: 'Lifetime',
    tag: { label: 'After-sales support', highlight: true },
    description:
      'Your installation is backed by warranty and responsive after-sales support that actually answers.',
    short: 'Backed by dependable after-sales support.',
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
