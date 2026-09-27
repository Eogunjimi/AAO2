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
    heroSubtitle: 'Sized from a professional load audit — not from guesswork.',
    heroImage: '/images/ion-home2.jpg',

    introTitle:
      'Professional Solar & Inverter Installation For Homes That Cannot Afford Another Blackout',
    introImage: '/images/ion-home1.jpg',
    introBody: [
      'Most inverter systems in Lagos are sold before anybody measures anything. A salesperson asks how many rooms you have, quotes a size, and moves on. You end up paying for capacity you never use, or watching the system trip every time the pressing iron comes on.',
      'Both mistakes cost you. An oversized bank ties up money you could have spent on better batteries; an undersized one dies early because it runs at its limit every night. And when the panels or inverter turn out to be counterfeit, there are no warranty papers to fall back on.',
      'AAO Engineering Services starts with a professional load audit, then designs around what your home actually draws. Original panels, hybrid inverters and lithium batteries with warranty. Neat, labelled installation by trained technicians — and after-sales support that still answers months later.',
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
    heroTitle: 'Commercial Solar & Inverter Systems That End the Diesel Cycle',
    heroSubtitle: 'Engineered for your peak demand. Installed around your trading hours.',
    heroImage: '/images/project-commercial.jpg',

    introTitle:
      'Commercial Solar & Inverter Installation For Businesses That Cannot Close When the Grid Fails',
    introImage: '/images/hero-solar.jpg',
    introBody: [
      'For most Lagos businesses the generator is not a backup any more — it is the main supply, and the fuel bill is quietly one of the largest line items in the business. Every litre is money that never reaches your margin.',
      'The usual fix is a bigger generator, which raises the bill again. Meanwhile unstable supply keeps shortening the life of your compressors, servers and point-of-sale equipment, and every outage in front of a customer costs you something harder to measure.',
      'We engineer hybrid systems around your measured peak demand, then install in phases planned around your trading hours — after close or over a weekend if that is what it takes. Original equipment, full documentation, and monitoring so you can see exactly what the system is saving.',
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
    heroTitle: 'Electrical Load Audits That Tell You What You Need Before You Spend',
    heroSubtitle: 'Measured consumption, written findings, no product attached.',
    heroImage: '/images/about-engineer.jpg',

    introTitle: 'Domestic & Industrial Load Audits For People Who Refuse To Buy Blind',
    introImage: '/images/aao-electrical.jpg',
    introBody: [
      'Almost every oversized or undersized inverter in Lagos has the same origin: nobody measured the load. The size was estimated from the number of rooms, or copied from whatever a neighbour installed, and the bill followed the guess.',
      'The consequences show up later. Batteries that die in eighteen months because the bank was too small for the nightly draw. Capacity sitting idle that could have paid for better components. Circuits quietly overloaded because nothing was ever balanced.',
      'A load audit replaces all of that with numbers. We measure appliance by appliance and circuit by circuit, then give you a written picture of your true daily consumption and peak demand — yours to keep, whether you buy a system from us or not.',
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
    heroTitle: 'Electrical Installations in Lagos Done Neat, Safe and to Standard',
    heroSubtitle: 'Balanced circuits, labelled boards, work you can inspect.',
    heroImage: '/images/service-electrical.jpg',

    introTitle: 'Electrical Installation & Rewiring For Buildings That Deserve To Be Done Once',
    introImage: '/images/aao-electrical.jpg',
    introBody: [
      'Bad electrical work is easy to hide. Behind a finished wall, an undersized cable, an overloaded circuit and a twisted joint all look the same as good work — until a breaker refuses to hold, a socket discolours, or something burns.',
      'It is rarely one dramatic failure. It is a distribution board nobody can read, circuits nobody balanced, and joints nobody would sign their name to, quietly aging inside a building full of people.',
      'We wire buildings the way an engineer should be happy to inspect them. Every circuit sized to its load, the board balanced and clearly labelled, proper terminations throughout, and the installation tested in front of you before we call it finished.',
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
    heroTitle: 'Power Generation & Changeover Systems That Start When the Grid Stops',
    heroSubtitle: 'Correctly sized, properly installed, safely switched.',
    heroImage: '/images/service-power-gen.jpg',

    introTitle: 'Generator Supply, Installation & Changeover For Premises That Cannot Go Dark',
    introImage: '/images/project-commercial.jpg',
    introBody: [
      'A generator is only as good as the installation around it. We are regularly called to sets that are the wrong size for the load, wired through a manual changeover nobody trusts, or sitting in an enclosure that traps heat and fumes.',
      'The results are predictable: fuel burned carrying almost nothing, a set that struggles the moment a compressor starts, and a switchover that depends on somebody being awake and nearby to throw a lever.',
      'We size the set against a measured load, install it with proper ventilation, earthing and cable sizing, and fit a changeover — manual or automatic — that transfers cleanly and safely. Then we test it under load with you watching, not on paper.',
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
};
