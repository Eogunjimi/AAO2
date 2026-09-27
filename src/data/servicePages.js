/**
 * Long-form page content for individual services.
 *
 * `services.js` stays the catalogue — name, category, summary, imagery — while
 * everything a service *page* needs to read well lives here, keyed by slug.
 * A service without an entry still renders the full page template: the
 * selectors in `src/lib/services.js` fall back to its catalogue copy.
 *
 * @typedef {Object} ServicePage
 * @property {string} heroTitle       Detailed H1. Rendered in caps.
 * @property {string} [heroKeyword]   Leading phrase of the H1, picked out in the accent.
 * @property {string} heroSubtitle    One-line promise under the H1.
 * @property {string} heroImage       Background photograph for the hero.
 * @property {string} introTitle      Section heading. Rendered in caps.
 * @property {string} introImage
 * @property {string[]} introBody     Paragraphs: the problem, the cost, our answer.
 * @property {{lead: string, accent: string}} includedTitle Two-tone heading.
 * @property {Array<{id: string, icon: string, title: string, description: string}>} included
 * @property {{lead: string, accent: string}} processTitle
 * @property {Array<Object>} process  Steps in the shape the process widget expects.
 * @property {Array<{id: string, question: string, answer: string}>} faqs Five at most.
 */

/** @type {Record<string, ServicePage>} */
export const servicePages = {
  'solar-inverter': {
    heroTitle: 'Solar & Inverter Installation in Lagos That Carries Your Real Load',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Sized from a professional load audit — not from guesswork.',
    heroImage: '/images/ion-home2.jpg',

    introTitle:
      'Professional Solar & Inverter Installation For Homes That Cannot Afford Another Blackout',
    introImage: '/images/ion-home1.jpg',
    introBody: [
      'Most solar and inverter systems in Lagos are sold before anybody measures anything. A salesperson asks how many rooms you have, quotes a size from memory, and moves on to the next customer.',
      'Then the bill arrives. You pay for capacity you never use, or you watch the system trip every time the pressing iron comes on. The batteries die early. The warranty papers, if they ever existed, belong to somebody else.',
      'AAO Engineering Services designs every solar and inverter installation from a professional load audit. Every system is sized against measured consumption. Every panel, inverter and battery is original and warranty-backed. Every installation is labelled, tested and handed over by technicians who still answer the phone months later.',
    ],

    includedTitle: { lead: "What's Included In", accent: 'Every Installation' },
    included: [
      {
        id: 'audit',
        icon: 'clipboard',
        title: 'Free site visit + load audit',
        description:
          'We measure every circuit and appliance before quoting, so your system is sized against real consumption instead of a rule of thumb.',
      },
      {
        id: 'original',
        icon: 'medal',
        title: 'Original, warranty-backed kit',
        description:
          'Panels, hybrid inverter and lithium batteries from brands we install every week — supplied with the warranty documents in your name.',
      },
      {
        id: 'workmanship',
        icon: 'bolt',
        title: 'Neat, labelled workmanship',
        description:
          'Proper cable management, correctly rated breakers and a clearly labelled changeover, so any engineer after us can read your system at a glance.',
      },
      {
        id: 'support',
        icon: 'support',
        title: 'Handover and after-sales',
        description:
          'We commission the system with you, show you how it behaves on a cloudy week, and stay reachable for adjustments and maintenance.',
      },
    ],

    processTitle: { lead: 'How We Install', accent: 'Your Solar System' },
    process: [
      {
        id: 'visit',
        number: '01',
        title: 'Free Site Visit',
        duration: 'Same week',
        tag: { label: '100% Free', highlight: true },
        description:
          'We come to the property, look at your roof, your panel board and where the batteries can live safely.',
      },
      {
        id: 'audit',
        number: '02',
        title: 'Professional Load Audit',
        duration: '30–60 min',
        tag: { label: 'AAO engineers' },
        description:
          'Every appliance is measured and logged, giving us your true daily consumption and peak demand.',
      },
      {
        id: 'design',
        number: '03',
        title: 'System Design & Quote',
        duration: '24–48 hrs',
        tag: { label: 'Clear pricing', highlight: true },
        description:
          'You get a sized design — panels, inverter, battery bank — with one written price and no hidden extras.',
      },
      {
        id: 'install',
        number: '04',
        title: 'Installation & Commissioning',
        duration: '2–5 days',
        tag: { label: 'Certified crew' },
        description:
          'Mounting, wiring, changeover and testing, finished neatly and handed over with your warranty papers.',
      },
    ],

    faqs: [
      {
        id: 'size',
        question: 'What size of solar and inverter system do I need?',
        answer:
          'That is exactly what the load audit answers. We measure what your home draws through the day and at peak, then size the panels, inverter and battery bank around it — so you are not paying for capacity you never use or struggling with a system that trips.',
      },
      {
        id: 'duration',
        question: 'How long does a home installation take?',
        answer:
          'Most residential installations are completed in two to five days depending on system size and roof access. We confirm your exact timeline after the site inspection, and we work to it.',
      },
      {
        id: 'run',
        question: 'Will it run my air conditioner and freezer?',
        answer:
          'It can, provided the system is designed for it. Heavy loads like air conditioners change the inverter and battery sizing significantly, so we agree during the audit which appliances the system must carry and price accordingly.',
      },
      {
        id: 'warranty',
        question: 'What warranty do I get?',
        answer:
          'Every panel, inverter and battery we install is original and comes with the manufacturer warranty, issued in your name. We hand over the documents at commissioning rather than leaving you to chase them.',
      },
      {
        id: 'payment',
        question: 'Can I pay in instalments?',
        answer:
          'Yes. Flexible payment options are available to make a properly sized system affordable. Tell us your budget at the site visit and we will show you what is realistic, and what can be added in a second phase.',
      },
    ],
  },

  'commercial-solar': {
    heroTitle: 'Commercial Solar & Inverter Installation in Lagos That Ends the Diesel Cycle',
    heroKeyword: 'Commercial Solar & Inverter Installation',
    heroSubtitle: 'Engineered for your peak demand. Installed around your trading hours.',
    heroImage: '/images/project-commercial.jpg',

    introTitle:
      'Commercial Solar & Inverter Installation For Businesses That Cannot Close When the Grid Fails',
    introImage: '/images/hero-solar.jpg',
    introBody: [
      'For most Lagos businesses the generator stopped being a backup years ago. It is the main supply, and diesel has quietly become one of the largest lines in the accounts.',
      'The usual answer is a bigger generator, which makes the bill bigger too. Your margins suffer. Your compressors, servers and point-of-sale equipment suffer. And every outage in front of a customer costs you something the ledger never shows.',
      'AAO Engineering Services engineers commercial solar and inverter systems around measured peak demand. Every design is built on an industrial load audit. Every installation is phased around your trading hours, after close or over a weekend. Every component arrives with documentation your finance team can file.',
    ],

    includedTitle: { lead: "What's Included In", accent: 'Every Commercial Build' },
    included: [
      {
        id: 'audit',
        icon: 'clipboard',
        title: 'Industrial load audit',
        description:
          'We map consumption across your operating day, including start-up surges, so the design holds under real working conditions.',
      },
      {
        id: 'phased',
        icon: 'bolt',
        title: 'Phased, out-of-hours install',
        description:
          'Work is sequenced around your trading hours. Nobody sends your customers home because the electricians arrived.',
      },
      {
        id: 'documentation',
        icon: 'shield',
        title: 'Full documentation',
        description:
          'Single-line drawings, component warranties and commissioning records — everything your facility or finance team needs on file.',
      },
      {
        id: 'monitoring',
        icon: 'support',
        title: 'Monitoring and maintenance',
        description:
          'Remote monitoring, staff training on the changeover, and a maintenance schedule that keeps the savings where they should be.',
      },
    ],

    processTitle: { lead: 'How We Deliver', accent: 'Commercial Power' },
    process: [
      {
        id: 'survey',
        number: '01',
        title: 'Site Survey',
        duration: 'Same week',
        tag: { label: '100% Free', highlight: true },
        description:
          'We walk the premises with your facility contact, review your bills and look at roof or ground space.',
      },
      {
        id: 'audit',
        number: '02',
        title: 'Industrial Load Audit',
        duration: '1–2 days',
        tag: { label: 'AAO engineers' },
        description:
          'Consumption is logged across a full operating cycle so the design is built on data, not on nameplate ratings.',
      },
      {
        id: 'engineer',
        number: '03',
        title: 'Engineering & Proposal',
        duration: '3–5 days',
        tag: { label: 'Costed payback', highlight: true },
        description:
          'You receive a sized design with a projected monthly saving and payback period alongside the price.',
      },
      {
        id: 'deploy',
        number: '04',
        title: 'Phased Installation',
        duration: 'Planned with you',
        tag: { label: 'Zero downtime' },
        description:
          'Installation, changeover and commissioning staged around your hours, then staff training before we leave.',
      },
    ],

    faqs: [
      {
        id: 'disruption',
        question: 'Will installation disrupt my business?',
        answer:
          'No. We plan the work in phases and carry out the disruptive stages after hours or at weekends. The schedule is agreed with you in writing before anyone starts.',
      },
      {
        id: 'savings',
        question: 'How much will this actually save me?',
        answer:
          'That depends on your current diesel and grid spend, which the load audit measures. We put a projected monthly saving and a payback period in the proposal so you can judge it as an investment rather than a purchase.',
      },
      {
        id: 'generator',
        question: 'Can it work alongside my existing generator?',
        answer:
          'Yes. Most of our commercial systems are hybrid: solar and batteries carry the load, the grid charges when available, and the generator becomes a last resort instead of a daily habit.',
      },
      {
        id: 'scale',
        question: 'Can we start small and expand later?',
        answer:
          'Yes, and it is often the right call. We design the system so a second phase can be added without replacing what you already bought — that plan is part of the proposal.',
      },
      {
        id: 'maintain',
        question: 'Who maintains the system afterwards?',
        answer:
          'We do. Commercial installations come with a maintenance schedule and remote monitoring, so faults are identified before they interrupt your operations.',
      },
    ],
  },

  'load-audit': {
    heroTitle: 'Electrical Load Audits in Lagos That Tell You What You Need Before You Spend',
    heroKeyword: 'Electrical Load Audits',
    heroSubtitle: 'Measured consumption, written findings, no product attached.',
    heroImage: '/images/about-engineer.jpg',

    introTitle: 'Domestic & Industrial Load Audits For People Who Refuse To Buy Blind',
    introImage: '/images/aao-electrical.jpg',
    introBody: [
      'Almost every oversized and undersized inverter in Lagos starts the same way: nobody measured the load. The size is estimated from the number of rooms, or copied from whatever the neighbour installed, and the bill follows the guess.',
      'The guess is expensive. Batteries die in eighteen months because the bank was too small for the nightly draw. Money sits idle in capacity you never use. Circuits stay quietly overloaded because nothing was ever balanced.',
      'AAO Engineering Services measures instead. Every significant appliance and circuit is logged, including the surges that decide your inverter rating. Every electrical load audit ends in a written report of your true daily consumption and peak demand. Every recommendation is yours to keep — even if you buy the system somewhere else.',
    ],

    includedTitle: { lead: 'What You Get From', accent: 'Every Load Audit' },
    included: [
      {
        id: 'measured',
        icon: 'clipboard',
        title: 'Appliance-level measurement',
        description:
          'Each significant load is measured rather than estimated, including the surges that decide your inverter rating.',
      },
      {
        id: 'report',
        icon: 'quote',
        title: 'A written report',
        description:
          'Daily consumption, peak demand and circuit balance, set out plainly enough to take to any other installer.',
      },
      {
        id: 'sizing',
        icon: 'bolt',
        title: 'Honest sizing advice',
        description:
          'A recommended system size with the reasoning behind it — including the cheaper option when the cheaper option is right.',
      },
      {
        id: 'risks',
        icon: 'warning',
        title: 'Safety findings',
        description:
          'Overloaded circuits, undersized cabling and dangerous joints flagged clearly, with what it will take to correct them.',
      },
    ],

    processTitle: { lead: 'How We Audit', accent: 'Your Power' },
    process: [
      {
        id: 'book',
        number: '01',
        title: 'Book the Visit',
        duration: 'Same week',
        tag: { label: '100% Free visit', highlight: true },
        description:
          'Call or send a message and we schedule a time that suits the household or the shift pattern.',
      },
      {
        id: 'measure',
        number: '02',
        title: 'Measure Every Load',
        duration: '30–90 min',
        tag: { label: 'AAO engineers' },
        description:
          'We work through the property with instruments, logging each appliance, circuit and start-up surge.',
      },
      {
        id: 'report',
        number: '03',
        title: 'Written Findings',
        duration: '24–48 hrs',
        tag: { label: 'Yours to keep', highlight: true },
        description:
          'You receive your consumption profile, peak demand and any safety issues we found, in writing.',
      },
      {
        id: 'advise',
        number: '04',
        title: 'Sizing Recommendation',
        duration: 'With the report',
        tag: { label: 'No pressure' },
        description:
          'We explain what system the numbers justify, what it would cost, and what you can safely leave for later.',
      },
    ],

    faqs: [
      {
        id: 'what',
        question: 'What exactly is an electrical load audit?',
        answer:
          'It is a measurement of what your property actually consumes. We record each appliance and circuit, capture start-up surges, and turn that into a daily consumption figure and a peak demand figure — the two numbers any honest system design starts from.',
      },
      {
        id: 'why',
        question: 'Why not just estimate from my appliances?',
        answer:
          'Nameplate ratings and real usage rarely match, and estimates ignore how long each appliance actually runs. That gap is why so many inverters are oversized or undersized. Measuring costs a single visit and usually saves far more than it costs.',
      },
      {
        id: 'duration',
        question: 'How long does it take?',
        answer:
          'A typical home takes thirty to ninety minutes on site, with the written report following within a day or two. Industrial audits are logged across a full operating cycle and take longer.',
      },
      {
        id: 'obligation',
        question: 'Am I obliged to buy a system from you afterwards?',
        answer:
          'No. The findings are yours to keep and to compare against other quotes. We would rather you make an informed decision than a rushed one.',
      },
      {
        id: 'industrial',
        question: 'Do you audit businesses as well as homes?',
        answer:
          'Yes. We carry out both domestic and industrial audits, including offices, shops, schools, hospitals and production facilities where phase balance and surge behaviour matter as much as total consumption.',
      },
    ],
  },

  electrical: {
    heroTitle: 'Electrical Installation in Lagos Done Neat, Safe and to Standard',
    heroKeyword: 'Electrical Installation',
    heroSubtitle: 'Balanced circuits, labelled boards, work you can inspect.',
    heroImage: '/images/service-electrical.jpg',

    introTitle: 'Electrical Installation & Rewiring For Buildings That Deserve To Be Done Once',
    introImage: '/images/aao-electrical.jpg',
    introBody: [
      'Bad electrical work is easy to hide. Behind a finished wall, an undersized cable, an unbalanced board and a twisted joint look exactly like good work.',
      'They stop looking the same later. A breaker that will not hold. A socket that discolours. A distribution board nobody can read, quietly aging inside a building full of people.',
      'AAO Engineering Services wires buildings to be inspected. Every circuit is sized to the load it will actually carry. Every board is balanced, protected and labelled way by way. Every electrical installation is tested in front of you before we call it finished.',
    ],

    includedTitle: { lead: 'What Comes With', accent: 'Every Installation' },
    included: [
      {
        id: 'design',
        icon: 'clipboard',
        title: 'Circuits sized to the load',
        description:
          'We calculate before we pull cable, so every circuit and breaker matches what will actually run on it.',
      },
      {
        id: 'board',
        icon: 'bolt',
        title: 'A board you can read',
        description:
          'Balanced phases, correctly rated protection and a legible label on every way — not a mystery box on the wall.',
      },
      {
        id: 'safety',
        icon: 'shield',
        title: 'Tested and certified',
        description:
          'Continuity, insulation and earthing tested and demonstrated to you at handover, with the results written down.',
      },
      {
        id: 'finish',
        icon: 'medal',
        title: 'A finish that matches the building',
        description:
          'Straight conduit runs, tidy chasing and made-good surfaces. Neat work is part of the job, not an extra.',
      },
    ],

    processTitle: { lead: 'How We Wire', accent: 'Your Building' },
    process: [
      {
        id: 'inspect',
        number: '01',
        title: 'Site Inspection',
        duration: 'Same week',
        tag: { label: '100% Free', highlight: true },
        description:
          'We walk the building, review drawings or existing wiring, and agree what the installation has to support.',
      },
      {
        id: 'plan',
        number: '02',
        title: 'Circuit Plan & Quote',
        duration: '24–48 hrs',
        tag: { label: 'Clear pricing', highlight: true },
        description:
          'You get a circuit schedule and a written price, including anything existing that we recommend correcting.',
      },
      {
        id: 'install',
        number: '03',
        title: 'First & Second Fix',
        duration: 'Scheduled with you',
        tag: { label: 'Certified crew' },
        description:
          'Conduit, cabling and board work carried out in stages that fit around occupation or other trades on site.',
      },
      {
        id: 'test',
        number: '04',
        title: 'Testing & Handover',
        duration: 'Before we leave',
        tag: { label: 'Documented' },
        description:
          'Every circuit is tested and energised with you present, then labelled and documented for whoever comes next.',
      },
    ],

    faqs: [
      {
        id: 'rewire',
        question: 'How do I know whether my building needs a rewire?',
        answer:
          'Breakers that trip without an obvious cause, warm or discoloured sockets, lights that dim when a heavy appliance starts, and a distribution board nobody has labelled are the usual signs. The site inspection tells you whether it is a repair or a rewire.',
      },
      {
        id: 'occupied',
        question: 'Can you work while the building is occupied?',
        answer:
          'Yes. We stage first fix and second fix around occupation and isolate one area at a time, so power is not lost across the whole building for days.',
      },
      {
        id: 'audit',
        question: 'Do I need a load audit as well?',
        answer:
          'For a rewire or a new build, it is worth it. Knowing the real load lets us size circuits properly and gives you a system that is ready for solar or an inverter later without a second round of work.',
      },
      {
        id: 'certificate',
        question: 'Will I get test results and documentation?',
        answer:
          'Yes. We record the tests carried out at handover and label the board so any electrician after us can work on the installation safely.',
      },
      {
        id: 'small',
        question: 'Do you take on small jobs?',
        answer:
          'We do — additional circuits, board upgrades, socket and lighting work. The same standards apply whether it is one circuit or a whole building.',
      },
    ],
  },

  'power-gen': {
    heroTitle: 'Power Generation & Changeover Systems in Lagos That Start When the Grid Stops',
    heroKeyword: 'Power Generation & Changeover Systems',
    heroSubtitle: 'Correctly sized, properly installed, safely switched.',
    heroImage: '/images/service-power-gen.jpg',

    introTitle: 'Generator Supply, Installation & Changeover For Premises That Cannot Go Dark',
    introImage: '/images/project-commercial.jpg',
    introBody: [
      'A generator is only as good as the installation around it. We are called out constantly to sets that are the wrong size for the load, wired through a changeover nobody trusts, sitting in an enclosure that traps its own heat and fumes.',
      'So the fuel burns carrying almost nothing. The set struggles the moment a compressor starts. And the switchover depends on somebody being awake, nearby and willing to walk out in the rain.',
      'AAO Engineering Services sizes every set against a measured load. Every installation gets proper earthing, cable sizing and ventilation. Every changeover, manual or automatic, is interlocked, labelled and tested under real load while you watch.',
    ],

    includedTitle: { lead: "What's Included In", accent: 'Every Installation' },
    included: [
      {
        id: 'sizing',
        icon: 'clipboard',
        title: 'Sizing against real load',
        description:
          'The set is matched to measured demand and starting surges, so it is not oversized, idling and burning fuel.',
      },
      {
        id: 'changeover',
        icon: 'bolt',
        title: 'Clean changeover',
        description:
          'Manual or automatic transfer, correctly interlocked so grid and generator can never meet, and clearly labelled.',
      },
      {
        id: 'install',
        icon: 'shield',
        title: 'Safe installation',
        description:
          'Proper earthing, cable sizing, ventilation and exhaust routing — the parts that decide whether a set lasts.',
      },
      {
        id: 'service',
        icon: 'support',
        title: 'Testing and servicing',
        description:
          'Commissioned under load in front of you, with a service interval agreed so it still starts in six months.',
      },
    ],

    processTitle: { lead: 'How We Install', accent: 'Backup Power' },
    process: [
      {
        id: 'visit',
        number: '01',
        title: 'Site Visit',
        duration: 'Same week',
        tag: { label: '100% Free', highlight: true },
        description:
          'We look at where the set can sit safely, how the exhaust will run and how the cable route reaches your board.',
      },
      {
        id: 'size',
        number: '02',
        title: 'Load Measurement',
        duration: '30–90 min',
        tag: { label: 'AAO engineers' },
        description:
          'The load you need to carry is measured, including motor starting surges, before any set is recommended.',
      },
      {
        id: 'quote',
        number: '03',
        title: 'Specification & Quote',
        duration: '24–48 hrs',
        tag: { label: 'Clear pricing', highlight: true },
        description:
          'You get the set rating, changeover type and installation scope in one written price.',
      },
      {
        id: 'commission',
        number: '04',
        title: 'Install & Load Test',
        duration: '1–3 days',
        tag: { label: 'Tested with you' },
        description:
          'Installation, earthing, changeover wiring, then a live test that proves the transfer under real load.',
      },
    ],

    faqs: [
      {
        id: 'size',
        question: 'What size of generator do I need?',
        answer:
          'Enough for your measured load plus the starting surge of your heaviest motor — usually less than people expect. We measure first, because an oversized set costs more to buy and burns fuel carrying very little.',
      },
      {
        id: 'ats',
        question: 'Should I fit an automatic changeover?',
        answer:
          'If an outage costs you money or someone has to be present to switch over, yes. An automatic transfer switch starts the set and transfers the load on its own, then hands back to the grid when it returns.',
      },
      {
        id: 'solar',
        question: 'Can a generator work with solar and inverters?',
        answer:
          'Yes, and it is the arrangement we recommend most. Solar and batteries carry the day-to-day load, and the generator becomes the last resort for long, heavy or cloudy periods instead of running every evening.',
      },
      {
        id: 'noise',
        question: 'Can you reduce the noise and fumes?',
        answer:
          'Placement, enclosure and exhaust routing make most of the difference, and we plan all three during the site visit rather than after the set arrives.',
      },
      {
        id: 'service',
        question: 'Do you service generators you did not install?',
        answer:
          'Yes. We service and repair existing sets, and we will tell you honestly when a set is worth maintaining and when replacing it is the cheaper decision.',
      },
    ],
  },

  cctv: {
    heroTitle: 'CCTV Installation in Lagos That Shows You What Actually Happened',
    heroKeyword: 'CCTV Installation',
    heroSubtitle: 'Coverage planned around entry points, recorded and verified.',

    introTitle: 'Professional CCTV Installation For Homes And Businesses That Need Real Evidence',
    introBody: [
      'Most CCTV in Lagos is sold on the number of cameras. Eight sounds safer than four, so eight go up — pointed at corners, roofs and empty walls, recording to a box nobody has ever opened.',
      'Then something happens at the gate, and the footage is grainy, or overwritten, or the drive stopped recording in March. The cameras were never the point. Coverage was.',
      'AAO Engineering Services plans CCTV coverage around entry points, not corners. Every camera is original, warranty-backed equipment rather than the counterfeit kit that fills the market. Every system is configured for remote viewing on your phone. Every handover ends with your household or staff trained on the app.',
    ],
  },

  'security-install': {
    heroTitle: 'Security System Installation in Lagos That Covers Every Entry Point',
    heroKeyword: 'Security System Installation',
    heroSubtitle: 'One system, every entry point, commissioned and explained.',

    introTitle: 'Complete Security System Installation For Premises That Cannot Rely On Luck',
    introBody: [
      'Security is usually bought one panic at a time. An alarm after a break-in, a camera after a scare, a sensor somebody had spare — and none of them talking to each other.',
      'What you end up with is cover on paper. Gaps where the pieces meet. Alerts nobody receives. A system so awkward to arm that it quietly stops being armed at all.',
      'AAO Engineering Services designs the whole perimeter as one system. Every entry point is assessed before anything is quoted. Every device is original and warranty-backed. Every security system installation is commissioned, tested and explained to the people who will actually use it.',
    ],
  },

  'cctv-maintenance': {
    heroTitle: 'CCTV Maintenance in Lagos That Keeps Your Cameras Actually Recording',
    heroKeyword: 'CCTV Maintenance',
    heroSubtitle: 'Checked, cleaned, tested — and proven to be recording.',

    introTitle: 'CCTV Maintenance And Repair For Systems That Have To Be Working',
    introBody: [
      'Cameras get installed and then forgotten. Lenses film over in harmattan dust, a drive fills up, a power supply gives out in the rain — and nobody notices, because nobody watches a screen that shows nothing happening.',
      'You find out when it matters. The one night you need footage is the night you learn the system stopped recording months ago. The investment is still on the wall, doing nothing.',
      'AAO Engineering Services keeps CCTV systems working. Every maintenance visit checks recording, retention, storage health and camera alignment. Every fault is reported in writing with what it will cost to put right. Every visit ends with the system proven to be recording, not assumed to be.',
    ],
  },

  'smart-locks': {
    heroTitle: 'Smart Door Lock Installation in Lagos That Ends the Spare-Key Problem',
    heroKeyword: 'Smart Door Lock Installation',
    heroSubtitle: 'Codes, cards and fingerprints instead of keys you cannot trace.',

    introTitle: 'Smart Door Lock Installation For Buildings Where Keys Have Stopped Being Secure',
    introBody: [
      'Keys are the weakest part of most Lagos homes and offices. They get copied at the junction, lent to workmen, lost by tenants, and inherited by whoever held them before you.',
      'Changing the lock means changing everybody’s key, so it never quite happens. The old keys stay out there, and you have no way of knowing who still holds one.',
      'AAO Engineering Services installs smart door locks that replace keys with codes, cards and fingerprints. Every lock is original equipment with a warranty and a mechanical override. Every installation is fitted to the door you already have. Every user is set up individually — and removed in seconds when they leave.',
    ],
  },

  'access-control': {
    heroTitle: 'Access Control Systems in Lagos That Prove Who Came Through the Door',
    heroKeyword: 'Access Control Systems',
    heroSubtitle: 'Every door mapped, every entry logged, every credential revocable.',

    introTitle: 'Access Control Installation For Premises That Need To Know Who Was Where',
    introBody: [
      'Most premises still run on trust and a signing book. Staff share one code, visitors are waved through, and the only record of who entered is whatever somebody remembered to write down.',
      'It works until it matters. Something goes missing, someone is somewhere they should not be, and there is no way to prove who was where and when.',
      'AAO Engineering Services installs access control that answers that question. Every door, gate and zone is mapped before a quote is written. Every user gets their own credential, revocable the day they leave. Every entry is logged and searchable, on equipment that comes with a warranty.',
    ],
  },

  'auto-gates': {
    heroTitle: 'Automatic Gate Installation in Lagos That Opens Before You Step Out',
    heroKeyword: 'Automatic Gate Installation',
    heroSubtitle: 'Motors matched to your gate, with safety stops and manual release.',

    introTitle: 'Automatic Gate Installation For Compounds That Should Not Be Waiting In The Road',
    introBody: [
      'The gate is where every arrival starts, and in most compounds it still needs somebody to walk out into the rain, or a gateman who cannot be in two places at once.',
      'Meanwhile the traffic builds behind you in the road, the gate drags on its own track, and a motor that was never matched to the weight of the gate burns out inside a year.',
      'AAO Engineering Services installs automatic gates that suit the gate you already have. Every motor is sized to the weight and travel it has to move. Every installation includes safety stops, manual release and remote or keypad entry. Every gate is finished neatly enough to look like it came with the house.',
    ],
  },

  intercom: {
    heroTitle: 'Intercom Systems in Lagos That Let You See Who Is at the Gate',
    heroKeyword: 'Intercom Systems',
    heroSubtitle: 'See and speak to your visitor before the gate ever opens.',

    introTitle: 'Video Intercom Installation For Homes That Answer The Gate Safely',
    introBody: [
      'Answering the gate in most homes still means walking to it — at night, in the rain, with no idea who is standing on the other side.',
      'So the gate gets opened before anybody is identified, or visitors stand outside shouting your name. Neither is secure, and neither is convenient.',
      'AAO Engineering Services installs video intercom systems that bring the gate to a screen indoors or to your phone. Every installation is wired around the layout of your compound. Every unit is original equipment with a warranty. Every handover includes showing the household how to answer, release and record a visit.',
    ],
  },

  'home-automation': {
    heroTitle: 'Home Automation in Lagos That Still Works When the Power Does Not',
    heroKeyword: 'Home Automation',
    heroSubtitle: 'Built around your inverter, your network and your gate.',

    introTitle: 'Home Automation Built For Nigerian Power, Not For A Showroom',
    introBody: [
      'Home automation is usually sold as a gadget — an app, a speaker, a light that changes colour. Then the grid goes down, the router reboots, and none of it answers.',
      'Automation that assumes perfect power and perfect internet is decoration. In Lagos it has to survive an outage, a changeover and a slow network before it is worth paying for.',
      'AAO Engineering Services installs home automation designed around Nigerian conditions. Every system is planned with your power supply in mind, inverter and changeover included. Every device is original and warranty-backed. Every installation is integrated with the lighting, gates, locks and cameras you already own.',
    ],
  },

  network: {
    heroTitle: 'Network Installation in Lagos That Holds Up With the Whole Office Online',
    heroKeyword: 'Network Installation',
    heroSubtitle: 'Surveyed, certified, labelled and documented.',

    introTitle: 'Structured Network Installation For Offices That Cannot Afford Dropouts',
    introBody: [
      'Office networks are usually grown rather than designed. A router here, an extender there, cables run wherever they reached — until twenty people are sharing a setup that was fine for five.',
      'So calls drop, the CCTV upload stalls, and somebody reboots the router twice a day as a matter of routine. The bandwidth is rarely the problem. The cabling and the layout are.',
      'AAO Engineering Services installs structured networks properly. Every cable run is surveyed and tested rather than guessed. Every rack is patched, labelled and documented. Every network installation is built so the next person to touch it can read exactly what we did.',
    ],
  },

  ict: {
    heroTitle: 'ICT Solutions in Lagos That Keep Your Business Running Every Day',
    heroKeyword: 'ICT Solutions',
    heroSubtitle: 'Surveyed, installed, documented — and yours to keep.',

    introTitle: 'ICT Solutions For Businesses That Need Their Systems To Simply Work',
    introBody: [
      'Most growing businesses in Lagos buy IT in pieces. A laptop here, a printer there, a CCTV recorder on its own network, and nobody owning how any of it fits together.',
      'The result works only while nothing goes wrong. One failure and the office stops, because nothing was documented and nobody knows how it was wired in the first place.',
      'AAO Engineering Services treats ICT as infrastructure. Every deployment starts with a survey of what you have and what you actually need. Every system and device is installed, labelled and documented. Every client keeps that documentation, so you are never held hostage by whoever touched it last.',
    ],
  },
};
