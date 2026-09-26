/**
 * Service catalogue.
 *
 * Every service page, navigation entry and cross-link on the site is generated
 * from this list, so adding a service is a one-file change. Query helpers live
 * in `src/lib/services.js`.
 *
 * @typedef {Object} ServiceBenefit
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} Service
 * @property {string} slug        URL segment, e.g. `/services/solar-inverter`.
 * @property {string} category    Grouping used by the navigation and index page.
 * @property {string} title       Canonical service name.
 * @property {string} headline    Hero headline for the detail page.
 * @property {string} summary     One-line promise used in cards and meta tags.
 * @property {string} image       Path to the hero image (served from /public).
 * @property {string} intro       Long-form description of the service.
 * @property {string[]} signs     "When to consider this" symptoms.
 * @property {string[]} approach  What AAO does about it.
 * @property {ServiceBenefit[]} benefits
 * @property {{question: string, answer: string}} faq Service specific question.
 */

export const serviceCategories = [
  { id: 'solar-power', name: 'Solar & Power' },
  { id: 'security', name: 'Security & Surveillance' },
  { id: 'access-automation', name: 'Access Control & Automation' },
  { id: 'ict', name: 'ICT & Networking' },
];

/** @type {Service[]} */
export const services = [
  {
    slug: 'solar-inverter',
    category: 'Solar & Power',
    title: 'Solar & Inverter Installation',
    headline: 'Silent, steady power for your home — designed around your real load.',
    summary: 'Dependable home power, sized from a professional load audit and installed to last.',
    image: '/images/ion-home1.jpg',
    intro:
      'From the first load audit to the final switch-over, we design and install hybrid solar and inverter systems that carry your home through every outage. Original panels, reliable hybrid inverters and lithium batteries — installed neatly, labelled clearly, and backed by warranty.',
    signs: [
      'You spend heavily on fuel or grid power every month',
      'Outages interrupt your rest, work or family time',
      "Your current inverter trips, overheats or can't carry your load",
      'You want clean, silent power with zero fumes or noise',
    ],
    approach: [
      'Professional electrical load audit of your home',
      'A system sized to your actual consumption — not guesswork',
      'Original panels, hybrid inverter and lithium battery',
      'Neat installation, full testing and commissioning',
      'Warranty papers and responsive after-sales support',
    ],
    benefits: [
      {
        title: 'Right-sized system',
        description: 'No overspending, no undersizing — your design is based on measured load.',
      },
      {
        title: 'Original products',
        description: 'Warranty-backed panels, inverters and batteries only.',
      },
      {
        title: 'Certified technicians',
        description: 'Trained installers and tidy, labelled workmanship.',
      },
      {
        title: 'Real after-sales',
        description: 'Support that picks up long after installation day.',
      },
    ],
    faq: {
      question: 'How long does a home installation take?',
      answer:
        'Most residential solar and inverter installations are completed within 2–5 days depending on system size. We confirm your exact timeline after the site inspection.',
    },
  },
  {
    slug: 'commercial-solar',
    category: 'Solar & Power',
    title: 'Commercial Solar & Inverter Installation',
    headline: 'Cut fuel costs and keep your business running through every outage.',
    summary: 'Cut fuel costs and keep your business running through every outage.',
    image: '/images/project-commercial.jpg',
    intro:
      'We design commercial hybrid systems that slash diesel spend, protect your equipment and keep your doors open when the grid fails — with minimal disruption to your operations.',
    signs: [
      'Generator fuel is eating into your margins',
      'Outages interrupt operations or customer experience',
      'Equipment is at risk from unstable supply',
      'You want predictable, auditable energy costs',
    ],
    approach: [
      'Industrial load audit & energy mapping',
      'System engineering sized for your peak demand',
      'Phased installation planned around business hours',
      'Monitoring, maintenance and staff training',
      'Documentation and warranty for every component',
    ],
    benefits: [
      { title: 'Lower monthly cost', description: 'Reduced energy spend from day one.' },
      {
        title: 'Built for heavy loads',
        description: 'Systems engineered for real commercial demand.',
      },
      { title: 'Zero disruption', description: 'Installation planned around your business hours.' },
      { title: 'Full documentation', description: 'Warranty papers for every component.' },
    ],
    faq: {
      question: 'Will installation disrupt my business?',
      answer:
        'We plan work in phases and can execute after hours or on weekends so your business keeps running.',
    },
  },
  {
    slug: 'load-audit',
    category: 'Solar & Power',
    title: 'Electrical Load Audit',
    headline: 'Know exactly what your property consumes — before you spend a naira on solutions.',
    summary: 'Know exactly what your property consumes — before you spend a naira on solutions.',
    image: '/images/aao-electrical.jpg',
    intro:
      'Our domestic and industrial load audits map every circuit and appliance to build a measured picture of your consumption, so every recommendation is based on reality, not guesswork.',
    signs: [
      "Bills are high but you can't see where the power goes",
      'Breakers trip or wiring heats up under load',
      "You're planning solar and need accurate sizing data",
      "You've added ACs or machines since the original wiring",
    ],
    approach: [
      'On-site inspection of circuits and appliances',
      'Measured consumption profile and peak-demand report',
      'Written, prioritised recommendations',
      'Clear upfront pricing for any follow-up work',
      'A report you can act on at your own pace',
    ],
    benefits: [
      { title: 'Measured data', description: 'Decisions based on readings, not estimates.' },
      { title: 'Safety first', description: 'Risks identified before they become faults.' },
      { title: 'Right-sized solar', description: 'Accurate sizing for inverter and battery.' },
      { title: 'Actionable report', description: 'A written plan with clear pricing.' },
    ],
    faq: {
      question: 'Do I get a report after the audit?',
      answer:
        'Yes — you receive a clear written summary of your load profile, risks and recommended next steps with pricing.',
    },
  },
  {
    slug: 'electrical',
    category: 'Solar & Power',
    title: 'Electrical Installation',
    headline: 'Safe, neat, code-compliant electrical work — from rewires to new builds.',
    summary: 'Safe, neat, code-compliant electrical work — from rewires to new builds.',
    image: '/images/aao-electrical.jpg',
    intro:
      "From full rewiring and distribution boards to earthing, surge protection and finishing, our technicians install electrical systems the way we'd want them in our own properties: safe, labelled and neat.",
    signs: [
      'Flickering lights, hot switches or buzzing outlets',
      "Old wiring that can't carry modern appliances",
      "You're building or renovating and need full electrical works",
      "You've been told your earthing or DB needs correction",
    ],
    approach: [
      'Full inspection and safe isolation',
      'New wiring, DBs, earthing and surge protection',
      'Neat termination and clear labelling',
      'Testing, certification and handover documentation',
      'Original materials with warranty',
    ],
    benefits: [
      { title: 'Safety standards', description: 'Workmanship that meets regulations.' },
      { title: 'Neat & labelled', description: 'Installations future technicians can service.' },
      { title: 'Original materials', description: 'Quality components backed by warranty.' },
      { title: 'Certified handover', description: 'Testing and documentation on completion.' },
    ],
    faq: {
      question: 'Can you work with my existing wiring?',
      answer:
        "Where it's safe and compliant, yes. We inspect first and only recommend replacement where it's truly necessary.",
    },
  },
  {
    slug: 'power-gen',
    category: 'Solar & Power',
    title: 'Power Generation',
    headline:
      'Reliable on-site generation — solar, hybrid and generator integration done properly.',
    summary: 'Reliable on-site generation — solar, hybrid and generator integration done properly.',
    image: '/images/hero-solar.jpg',
    intro:
      'We design and integrate dependable generation setups: solar arrays, hybrid inverter systems and generator changeovers that work together seamlessly, so your property always has a source it can trust.',
    signs: [
      'Your generator runs too many hours every day',
      'Changeover between sources is manual and stressful',
      'You need redundancy for critical loads',
      'You want to reduce generation cost without losing reliability',
    ],
    approach: [
      'Assessment of all existing generation sources',
      'Hybrid design combining solar, battery and generator',
      'Automatic changeover and protection systems',
      'Maintenance plan for every source on site',
      'One team accountable for your whole power stack',
    ],
    benefits: [
      { title: 'Seamless switching', description: 'Automatic changeover between sources.' },
      { title: 'Lower fuel burn', description: 'Reduced generator runtime and cost.' },
      { title: 'Protected equipment', description: 'Stable supply for sensitive loads.' },
      { title: 'Single accountability', description: 'One team for your entire power stack.' },
    ],
    faq: {
      question: 'Can you integrate my existing generator?',
      answer:
        'In most cases, yes. We assess its condition and size, then integrate it with solar and storage for automatic, efficient operation.',
    },
  },
  {
    slug: 'cctv',
    category: 'Security & Surveillance',
    title: 'CCTV Systems',
    headline: 'See everything, from anywhere — CCTV systems built around your property.',
    summary: 'See everything, from anywhere — CCTV built around your property.',
    image: '/images/aao-cctv.jpg',
    intro:
      'We design and install Hikvision-grade CCTV systems with remote phone viewing, night vision and secure recording — positioned to cover what actually matters on your property.',
    signs: [
      "You can't see what happens at home when you're away",
      'Blind spots around gates, entrances or corridors',
      'You need evidence-grade footage for incidents',
      'Staff or property supervision is a concern',
    ],
    approach: [
      'Site survey to map every critical angle',
      'Camera plan with coverage and storage sizing',
      'Neat cabling with concealed conduits',
      'Remote viewing setup on your phone',
      'User training for everyone who needs it',
    ],
    benefits: [
      { title: 'Clear footage', description: 'Crystal-clear day and night recording.' },
      { title: 'Remote viewing', description: 'Watch from your phone, anywhere.' },
      { title: 'Original equipment', description: 'Hikvision-grade hardware with warranty.' },
      { title: 'Neat installation', description: 'Concealed, labelled, serviceable cabling.' },
    ],
    faq: {
      question: 'Can I view my cameras from my phone?',
      answer:
        'Yes. Every system we install includes remote viewing setup on your phone and training for everyone who needs it.',
    },
  },
  {
    slug: 'security-install',
    category: 'Security & Surveillance',
    title: 'Security System Installation',
    headline: 'Layered protection — alarms, sensors and deterrents that actually deter.',
    summary: 'Layered protection — alarms, sensors and deterrents that actually deter.',
    image: '/images/aao-cctv.jpg',
    intro:
      'We combine motion sensors, door and window contacts, alarms and monitoring deterrents into one coherent security layer designed around how your property is actually used.',
    signs: [
      'You rely on a single lock or one guard for security',
      'Neighbourhood incidents are increasing',
      'You want alerts before an intruder gets inside',
      'Your current alarm is dead, outdated or ignored',
    ],
    approach: [
      'Security walk-through and risk assessment',
      'Layered design: deter, detect, alert',
      'Original sensors, alarms and control panels',
      'Testing of every zone',
      'User training for home or staff',
    ],
    benefits: [
      { title: 'Early warning', description: 'Alerts before incidents escalate.' },
      { title: 'Matched design', description: 'Built around your real weak points.' },
      { title: 'Original hardware', description: 'Warranty-backed sensors and panels.' },
      { title: 'Everyone trained', description: 'So the system is actually used.' },
    ],
    faq: {
      question: 'Will the alarm work during a power cut?',
      answer: 'Yes — our systems include battery backup so protection continues through outages.',
    },
  },
  {
    slug: 'cctv-maintenance',
    category: 'Security & Surveillance',
    title: 'CCTV Maintenance',
    headline: 'Bring your existing CCTV back to full health — or upgrade it properly.',
    summary: 'Bring your existing CCTV back to full health — or upgrade it properly.',
    image: '/images/aao-cctv.jpg',
    intro:
      "Foggy domes, dead channels, full hard disks, lost passwords — we service, repair, relocate and upgrade existing CCTV systems, even ones we didn't install.",
    signs: [
      'Cameras are foggy, dark or offline',
      'Recording gaps or a failing hard disk',
      "You've lost access to your NVR or passwords",
      "You're moving office or extending coverage",
    ],
    approach: [
      'Full system health check and cleaning',
      'Repairs, replacements and firmware updates',
      'Storage and backup verification',
      'Relocation or expansion of coverage',
      'Clear fault report with fixed pricing',
    ],
    benefits: [
      { title: 'Any brand', description: "We service systems we didn't install." },
      { title: 'Clear reporting', description: 'You see every fault and fix.' },
      { title: 'Original parts', description: 'Quality replacements where needed.' },
      { title: 'Budget planning', description: 'Upgrades phased around your budget.' },
    ],
    faq: {
      question: 'Can you fix a system another company installed?',
      answer:
        'Yes. We service and upgrade existing installations from most major brands, starting with a full health check.',
    },
  },
  {
    slug: 'smart-locks',
    category: 'Access Control & Automation',
    title: 'Smart Door Locks',
    headline: "Keys you can't lose, copy or forget — smart access to your doors.",
    summary: "Keys you can't lose, copy or forget — smart access to your doors.",
    image: '/images/aao-gate.jpg',
    intro:
      'We supply and install smart door locks with fingerprint, PIN, card and app access — fitted cleanly to your doors and configured for everyone who needs entry.',
    signs: [
      'Keys get lost, copied or left under mats',
      'You manage staff, tenants or guest access',
      'You want to know who entered and when',
      'Your current lock is worn or unreliable',
    ],
    approach: [
      'Door assessment for the right lock type',
      'Supply of original smart locks with warranty',
      'Clean fitting without damaging your door',
      'User setup: PINs, fingerprints and cards',
      'Training and emergency-access walkthrough',
    ],
    benefits: [
      { title: 'No key worries', description: 'No copying, no lockouts.' },
      { title: 'Grant & revoke', description: 'Access changes in seconds.' },
      { title: 'Audit trail', description: 'See who entered, and when.' },
      { title: 'Never locked out', description: 'Battery alerts plus emergency overrides.' },
    ],
    faq: {
      question: 'What happens if the battery dies?',
      answer:
        'Every lock we install includes low-battery alerts plus an emergency power or key override, and we show you how to use them.',
    },
  },
  {
    slug: 'access-control',
    category: 'Access Control & Automation',
    title: 'Access Control',
    headline: 'The right people, in the right places, at the right times.',
    summary: 'The right people, in the right places, at the right times.',
    image: '/images/aao-gate.jpg',
    intro:
      'From card readers and biometrics to turnstiles and time-and-attendance, we design access control that protects restricted areas without slowing your people down.',
    signs: [
      'Sensitive areas need restricted entry',
      'You need attendance records for staff',
      "Keys and pads can't track who went where",
      'Your current system is outdated or bypassed',
    ],
    approach: [
      'Access mapping for zones and user groups',
      'Biometric, card or PIN readers as appropriate',
      'Controller and software setup with reporting',
      'Staff onboarding and admin training',
      'Integration-ready with alarms and CCTV',
    ],
    benefits: [
      { title: 'Zone control', description: 'Granular permissions per area.' },
      { title: 'Audit logs', description: 'Full records of who went where.' },
      { title: 'Scalable', description: 'Grows with your team or site.' },
      { title: 'Integrated', description: 'Works with your alarms and CCTV.' },
    ],
    faq: {
      question: 'Can access control integrate with our CCTV?',
      answer:
        'Yes — we design systems that work together so events on one are visible on the other.',
    },
  },
  {
    slug: 'auto-gates',
    category: 'Access Control & Automation',
    title: 'Automatic Gates',
    headline: 'Gates that open before you honk — automatic, safe, and reliable.',
    summary: 'Gates that open before you honk — automatic, safe, and reliable.',
    image: '/images/aao-gate.jpg',
    intro:
      'We install sliding and swing automatic gates with remotes, safety sensors and battery backup, so your entrance is effortless at midnight and during outages alike.',
    signs: [
      'You wait in the car for a manual gate to open',
      'Guards or gatekeepers are a recurring cost',
      'You worry about gates being forced or tailgated',
      'Your existing motor is dead or unreliable',
    ],
    approach: [
      'Gate assessment: weight, track and power',
      'Correct motor sizing with safety sensors',
      'Remote, keypad or app access options',
      'Battery backup for outage operation',
      'Neat, serviceable installation with warranty',
    ],
    benefits: [
      { title: 'Effortless entry', description: 'In all weather and at all hours.' },
      { title: 'Safety sensors', description: 'Protect people and vehicles.' },
      { title: 'Outage-proof', description: 'Battery backup keeps it moving.' },
      { title: 'Warranty-backed', description: 'Neat, serviceable installation.' },
    ],
    faq: {
      question: 'Will the gate work during a power cut?',
      answer: "Yes — we include battery backup so your gate keeps operating when the grid doesn't.",
    },
  },
  {
    slug: 'intercom',
    category: 'Access Control & Automation',
    title: 'Intercom Systems',
    headline: "Know who's at the gate before anyone opens it.",
    summary: "Know who's at the gate before anyone opens it.",
    image: '/images/aao-gate.jpg',
    intro:
      'Audio and video intercom systems that let you verify visitors from the comfort of your living room or from your phone — integrated with gates and locks where needed.',
    signs: [
      'You shout through the gate to identify visitors',
      'Staff open the gate without verifying guests',
      'You want video proof of every visitor',
      'Multiple entrances need one point of control',
    ],
    approach: [
      'Assessment of entrances and distances',
      'Video or audio intercom sizing',
      'Integration with gates and smart locks',
      'Clean cabling and discreet monitors',
      'User training for the whole household',
    ],
    benefits: [
      { title: 'Verify first', description: 'See visitors before opening.' },
      { title: 'Visitor records', description: 'Video entries on supported models.' },
      { title: 'One control point', description: 'Multiple entrances, one screen.' },
      { title: 'Original equipment', description: 'Warranty-backed hardware.' },
    ],
    faq: {
      question: 'Can I answer the intercom from my phone?',
      answer:
        'On video intercom systems we install, yes — you can see and speak to visitors and release the gate remotely.',
    },
  },
  {
    slug: 'home-automation',
    category: 'Access Control & Automation',
    title: 'Home Automation',
    headline: 'A home that responds — lighting, security and power under one intelligent roof.',
    summary: 'A home that responds — lighting, security and power under one intelligent roof.',
    image: '/images/warm-living.jpg',
    intro:
      'We connect your lighting, curtains, security, entertainment and power into scenes and schedules you control from your phone or voice — designed around your routines, not a showroom demo.',
    signs: [
      'You juggle five remotes and ten switches',
      'You want lights and security on schedules',
      "You're building or renovating and can plan ahead",
      'You want energy use you can see and control',
    ],
    approach: [
      'Automation plan mapped to your daily routines',
      'Original controllers, switches and sensors',
      'Scene and schedule configuration',
      'Simple wall controls as physical backup',
      'Family training and documentation',
    ],
    benefits: [
      { title: 'One app', description: 'Lights, security and more in one place.' },
      { title: 'Auto savings', description: 'Schedules that cut waste.' },
      { title: 'Scenes', description: 'Movie night, sleep and away modes.' },
      { title: 'Nobody locked out', description: 'Physical backups for basics.' },
    ],
    faq: {
      question: 'Does automation still work if the internet is down?',
      answer:
        'Yes — we design local control first, so your home keeps responding on your own network even without internet.',
    },
  },
  {
    slug: 'network',
    category: 'ICT & Networking',
    title: 'Network Installation',
    headline: 'Structured cabling and Wi-Fi that simply works, in every room.',
    summary: 'Structured cabling and Wi-Fi that simply works, in every room.',
    image: '/images/aao-network.jpg',
    intro:
      'We design and install structured network cabling, racks, access points and switching for homes and offices — terminated, labelled and tested for speed and stability.',
    signs: [
      'Wi-Fi dies in half the building',
      'Video calls buffer at the worst moments',
      'Cables run across floors like spaghetti',
      "You're moving into a new office or home",
    ],
    approach: [
      'Site survey with coverage heat-mapping',
      'Structured cabling and neat rack termination',
      'Enterprise-grade routers, switches and APs',
      'Testing, labelling and documentation',
      'Support plan for future changes',
    ],
    benefits: [
      { title: 'Full coverage', description: 'Strong signal in every room.' },
      { title: 'Neat cabling', description: 'Labelled and serviceable racks.' },
      { title: 'Enterprise gear', description: 'Original, reliable equipment.' },
      { title: 'Documentation', description: 'Any technician can follow it.' },
    ],
    faq: {
      question: 'Can you improve Wi-Fi without new cabling?',
      answer:
        'Sometimes, but cabled backhaul is what makes multi-AP setups truly stable — we recommend the minimum that solves it properly.',
    },
  },
  {
    slug: 'ict',
    category: 'ICT & Networking',
    title: 'ICT Solutions',
    headline: 'Practical ICT solutions that keep your business running and growing.',
    summary: 'Practical ICT solutions that keep your business running and growing.',
    image: '/images/aao-network.jpg',
    intro:
      'From workstations and servers to backups, security and support, we help small and medium businesses use technology confidently — with one accountable partner.',
    signs: [
      'Computers and tools fail at critical moments',
      "Data isn't backed up or protected",
      'Staff lose hours to slow or ageing systems',
      'You need technology planning but no IT team',
    ],
    approach: [
      'ICT assessment of systems and risks',
      'Hardware, backup and security roadmap',
      'Supply and setup of original equipment',
      'Data protection and backup verification',
      'Ongoing support and maintenance options',
    ],
    benefits: [
      { title: 'One partner', description: 'Accountable for all your technology.' },
      { title: 'Original hardware', description: 'With real warranty behind it.' },
      { title: 'Verified backups', description: 'Protection you can test.' },
      { title: 'Real support', description: 'Answers when things break.' },
    ],
    faq: {
      question: 'Do you offer ongoing support contracts?',
      answer:
        'Yes — flexible maintenance and support plans keep your systems healthy and your team productive.',
    },
  },
];

/** Slug of the service used when no valid slug is supplied. */
export const DEFAULT_SERVICE_SLUG = 'solar-inverter';

/**
 * Services featured in the home page showcase carousel, in display order.
 * Each entry re-labels the underlying service for the marketing headline.
 */
export const featuredServices = [
  {
    slug: 'solar-inverter',
    label: 'Solar & Inverter Installation',
    image: '/images/ion-home1.jpg',
    alt: 'Residential solar and inverter installation',
    description:
      'Dependable power for homes and businesses — sized from a professional load audit, installed neatly, and backed by warranty.',
  },
  {
    slug: 'cctv',
    label: 'CCTV & Surveillance',
    image: '/images/aao-cctv.jpg',
    alt: 'CCTV camera installation',
    description:
      "Evidence-grade cameras with night vision and remote phone viewing — positioned around your property's real blind spots.",
  },
  {
    slug: 'electrical',
    label: 'Electrical Installation & Audits',
    image: '/images/aao-electrical.jpg',
    alt: 'Neat electrical installation',
    description:
      "Safe, neat, code-compliant wiring, distribution boards and load audits — installed like it's our own property.",
  },
  {
    slug: 'auto-gates',
    label: 'Access Control & Automation',
    image: '/images/aao-gate.jpg',
    alt: 'Automatic gate and intercom',
    description:
      'Automatic gates, smart locks and intercoms that open for the right people — and no one else.',
  },
  {
    slug: 'network',
    label: 'ICT & Networking',
    image: '/images/aao-network.jpg',
    alt: 'Network rack installation',
    description:
      'Structured cabling, full-coverage Wi-Fi and ICT solutions that simply work — in every room and on every desk.',
  },
];
