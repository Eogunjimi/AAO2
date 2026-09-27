/**
 * Service-area pages.
 *
 * One page per Lagos neighbourhood we cover. The lists below are the same
 * wherever we work — they describe AAO's offer, not the area — while the
 * prose, the photograph and the first two questions on each page are written
 * for that neighbourhood specifically.
 *
 * @typedef {Object} ServiceArea
 * @property {string} slug
 * @property {string} name          Display name, e.g. "Lekki Phase 1".
 * @property {string} [shortName]   How locals say it, when the name is long.
 * @property {string} heroTitle
 * @property {string} heroKeyword   Leading phrase of the H1, accented.
 * @property {string} heroSubtitle
 * @property {string} heroImage
 * @property {string} introImage    A property in the area running on solar.
 * @property {string[]} intro       Two paragraphs introducing the area.
 * @property {string} why           Why owners here choose AAO.
 * @property {string} trust         Why they can rely on the install.
 * @property {string} systems       What we design for this area.
 * @property {Array<{id: string, question: string, answer: string}>} localFaqs
 */

/** What every client gets, wherever the property is. */
export const whatYouGet = [
  'Free, no-pressure site inspection',
  'A professional load audit before anything is sized',
  'Transparent written quotes with no hidden costs',
  'Original, warranty-backed panels, inverters and batteries',
  'Certified technicians and neat, labelled installation',
  '24/7 after-sales support that actually answers',
];

/** Property types we install for. */
export const propertyTypes = [
  'Detached homes and duplexes',
  'Terraces, semi-detached homes and apartments',
  'Offices and co-working spaces',
  'Shops, supermarkets and retail units',
  'Schools, clinics and places of worship',
  'Light industrial and production premises',
];

/** Systems we design and install. */
export const systemTypes = [
  'Hybrid solar and inverter systems',
  'Inverter and lithium battery backup',
  'Solar panel supply and roof mounting',
  'Automatic and manual changeover systems',
  'Generator supply, installation and servicing',
  'Domestic and industrial electrical load audits',
];

/** @type {ServiceArea[]} */
export const serviceAreaPages = [
  {
    slug: 'ikoyi',
    name: 'Ikoyi',
    heroTitle: 'Solar & Inverter Installation in Ikoyi That Runs Without the Generator',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Discreet installs for established homes, sized on measured load.',
    heroImage: '/images/area-ikoyi.jpg',
    introImage: '/images/area-ikoyi.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Ikoyi for your home or business, AAO Engineering Services is the Lagos team you can call. Ikoyi properties tend to be older and larger than the estates further east, with heavy air-conditioning loads, generator houses in the service quarters, and wiring that has been extended more than once. We design around what is actually there.',
      'Quality solar is more than panels on a roof. It is the load audit that comes first, the original equipment that carries a warranty, the cable runs that stay out of sight, and the handover that leaves you knowing exactly how your system behaves on a cloudy week.',
    ],
    why: 'Ikoyi homeowners come to us because we survey before we sell. We measure the real load of the house — air conditioners, pumps, the kitchen, the boys’ quarters — and design a system that carries it, rather than quoting a package size down the phone. Where the property is listed, gated or managed, we work to the estate’s rules and keep the installation discreet.',
    trust:
      'Trust matters more than price when you are letting a crew into a family home. Our technicians are trained, certified and briefed on the property before they arrive, they work to an agreed schedule, and they leave the site clean. We install in Ikoyi across every property type:',
    systems:
      'Larger Ikoyi homes usually need more battery than panel: the roof area is generous, but the evening load is what decides the design. We size the bank around your night-time consumption and your tolerance for a cloudy stretch, then choose equipment that can be serviced and expanded locally.',
    localFaqs: [
      {
        id: 'ikoyi-existing',
        question: 'Can you work with the inverter and generator I already have in Ikoyi?',
        answer:
          'Usually, yes. Many Ikoyi homes already run an inverter and a standby generator, and a hybrid design can keep both — solar and batteries carrying the daily load, the generator dropping back to a last resort. We assess the existing equipment during the free site inspection and tell you honestly what is worth keeping.',
      },
      {
        id: 'ikoyi-discreet',
        question: 'Will the panels and cabling be visible from the street?',
        answer:
          'We plan the array and the cable routes with the look of the property in mind, keeping runs concealed and equipment in the service area wherever the building allows. On listed or estate-managed properties in Ikoyi we submit the layout for approval before installation day.',
      },
    ],
  },

  {
    slug: 'victoria-island',
    name: 'Victoria Island',
    heroTitle: 'Solar & Inverter Installation on Victoria Island That Ends the Diesel Bill',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Commercial systems installed around your trading hours.',
    heroImage: '/images/area-victoria-island.jpg',
    introImage: '/images/area-victoria-island.jpg',
    intro: [
      'When you need reliable solar and inverter installation on Victoria Island for your office, shop or building, AAO Engineering Services is the Lagos team you can count on. VI runs on diesel more than anywhere else in the city — offices, retail and hospitality all carrying generators that were never meant to be the main supply.',
      'We treat commercial power as an engineering problem, not a product sale. An industrial load audit first, a design sized to your measured peak demand, then a phased installation planned around your trading hours so nobody sends your customers or your staff home.',
    ],
    why: 'Victoria Island businesses choose us because we can show the maths. The proposal carries a projected monthly saving and a payback period alongside the price, so you can judge the system as an investment. We never quote a one-size package: a trading floor, a restaurant and a serviced office have completely different demand curves.',
    trust:
      'Commercial clients need a contractor who turns up when they said they would and documents what they did. Our engineers work to an agreed programme, keep the building management informed, and hand over drawings and warranties at completion. On Victoria Island we install for:',
    systems:
      'Roof space on VI is often shared, leased or already crowded with plant, so commercial designs here lean on high-efficiency panels, hybrid inverters and a battery bank sized to bridge peak tariff hours and outages. Where the roof cannot carry the array, we design around the space that is available and phase the rest.',
    localFaqs: [
      {
        id: 'vi-hours',
        question: 'Can you install without closing my Victoria Island office or shop?',
        answer:
          'Yes. We phase the work and carry out the disruptive stages after hours or at weekends, which is how most of our VI installations are done. The programme is agreed in writing before anyone starts, and the changeover is scheduled for the quietest window you have.',
      },
      {
        id: 'vi-landlord',
        question: 'My building is leased — what does the landlord need from you?',
        answer:
          'Typically a method statement, proof of insurance, the roof loading calculation and a drawing of the proposed layout. We prepare all of it as part of the proposal, and we are used to dealing with facility managers and building committees on Victoria Island.',
      },
    ],
  },

  {
    slug: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    heroTitle: 'Solar & Inverter Installation in Lekki Phase 1 Sized for Your Actual Load',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Estate-friendly installs, measured before they are quoted.',
    heroImage: '/images/area-lekki-phase-1.jpg',
    introImage: '/images/area-lekki-phase-1.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Lekki Phase 1, AAO Engineering Services is the local team you can count on. Phase 1 is dense with newer duplexes and terraces, most of them carrying two or three air conditioners, a borehole pump and a family that works from home — a load profile that punishes an undersized system within months.',
      'We start with a professional load audit, then design around the numbers it produces. Original panels, hybrid inverters and lithium batteries, installed neatly, tested in front of you, and backed by support that still answers after the invoice is paid.',
    ],
    why: 'Lekki Phase 1 homeowners choose us because we refuse to quote blind. Two identical-looking duplexes on the same street routinely need different systems, depending on how the household actually lives. We measure first, recommend what the numbers justify, and tell you plainly when the cheaper option is the right one.',
    trust:
      'Most of Phase 1 is estate-managed, so the crew that arrives matters. Ours are trained, certified and used to working within estate hours, access rules and roof restrictions. We install throughout Lekki Phase 1 for:',
    systems:
      'Roofs here are generally modern, pitched and easy to work with, so the design usually comes down to battery capacity and how much of the load you want to carry overnight. We size the bank around your evening consumption and leave headroom to add panels in a second phase.',
    localFaqs: [
      {
        id: 'lekki-estate',
        question: 'Do you handle estate approvals in Lekki Phase 1?',
        answer:
          'Yes. We prepare the layout drawing and installation details most Phase 1 estates ask for, and we work within the access hours and noise rules the association sets. It is a routine part of the job here, not an extra.',
      },
      {
        id: 'lekki-ac',
        question: 'Can a solar system run my air conditioners in Lekki?',
        answer:
          'It can, but air conditioning changes the sizing substantially, and honestly it is where most Lekki systems are undersized. During the load audit we agree exactly which units the system must carry and for how long each night, then price the panels and battery bank against that.',
      },
    ],
  },

  {
    slug: 'banana-island',
    name: 'Banana Island',
    heroTitle: 'Solar & Inverter Installation on Banana Island Built for Large Homes',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'High-capacity systems, engineered and installed discreetly.',
    heroImage: '/images/area-banana-island.jpg',
    introImage: '/images/area-banana-island.jpg',
    intro: [
      'When you need reliable solar and inverter installation on Banana Island, AAO Engineering Services is the team Lagos homeowners call for the larger jobs. Properties here carry serious load — full-house air conditioning, pools, lifts, staff quarters and backup that has to be invisible as well as instant.',
      'That scale rewards engineering and punishes guesswork. We audit the load circuit by circuit, design a system that can carry the house rather than a part of it, and install with the finish the property deserves.',
    ],
    why: 'Banana Island clients come to us for capacity and discretion in equal measure. We size against measured demand rather than an estimate, specify equipment that can be serviced and expanded, and keep plant, cabling and battery rooms out of the living areas. Every component is original and warranty-backed.',
    trust:
      'On a property of this value, workmanship is the whole decision. Our technicians are certified, briefed and supervised, the installation is labelled and documented, and the system is commissioned in front of you under real load. We work across Banana Island on:',
    systems:
      'Large homes here usually justify a substantial battery bank with a hybrid inverter stack, and often a phased build: the critical circuits first, the rest as the second stage. Generators stay in the design as the final fallback, wired through an interlocked automatic changeover.',
    localFaqs: [
      {
        id: 'banana-capacity',
        question: 'Can a solar system really carry a whole Banana Island house?',
        answer:
          'With the right design, yes — but the honest answer is that it depends on how much air conditioning runs overnight. We measure the full load first and show you two or three options: critical circuits only, most of the house, or everything, each with its own cost and battery footprint.',
      },
      {
        id: 'banana-plant',
        question: 'Where will the batteries and inverters be installed?',
        answer:
          'Usually in a ventilated plant or service room away from living space, which is what we recommend for both safety and battery life. We agree the location during the site inspection and plan cable routes so nothing is visible in the finished areas of the house.',
      },
    ],
  },

  {
    slug: 'oniru',
    name: 'Oniru',
    heroTitle: 'Solar & Inverter Installation in Oniru for Homes, Shops and Short-Lets',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Mixed-use buildings, mixed loads, one measured design.',
    heroImage: '/images/area-oniru.jpg',
    introImage: '/images/area-oniru.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Oniru, AAO Engineering Services is the Lagos team you can count on. Oniru mixes apartments, short-lets and ground-floor retail in the same buildings, which means one roof often has to serve several very different demand patterns.',
      'We audit each load separately, then design a system that serves the building as it is actually used — including the units that run all night and the ones that only draw power at weekends.',
    ],
    why: 'Oniru landlords and business owners choose us because we plan for how the building earns. Short-let guests expect power that never blinks; a ground-floor shop needs its freezers carried through an outage. We map those needs before quoting and design around the ones that cost you money when they fail.',
    trust:
      'Where several tenants share a building, the install has to be orderly and clearly labelled. Our crews work to an agreed schedule, keep the common areas clean, and hand over a system that any competent engineer can read. We install across Oniru for:',
    systems:
      'Coastal air here is hard on hardware, so mounting, enclosures and terminations matter as much as the panels. We specify corrosion-resistant fixings, seal the roof penetrations properly, and size the battery around the loads that genuinely need to ride through an outage.',
    localFaqs: [
      {
        id: 'oniru-shortlet',
        question: 'I run short-lets in Oniru — can each unit have its own backup?',
        answer:
          'Yes. We can design per-unit backup, a shared system with sub-metering, or a hybrid of the two. Which is cheaper depends on how many units you run and how much of the load you want carried, and we set out the options with prices after the audit.',
      },
      {
        id: 'oniru-salt',
        question: 'Does being close to the water affect the installation?',
        answer:
          'It does. Salt-laden air corrodes cheap mounting hardware and poorly finished terminations within a couple of seasons. In Oniru we specify corrosion-resistant fixings and sealed enclosures as standard — it costs slightly more and lasts considerably longer.',
      },
    ],
  },

  {
    slug: 'vgc',
    name: 'Victoria Garden City (VGC)',
    shortName: 'VGC',
    heroTitle: 'Solar & Inverter Installation in VGC That Fits the Estate’s Rules',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Approved layouts, tidy installs, measured sizing.',
    heroImage: '/images/area-vgc.jpg',
    introImage: '/images/area-vgc.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Victoria Garden City, AAO Engineering Services is the team VGC residents call. The estate is uniform in build but not in usage — two identical houses on the same close can differ by half a battery bank depending on who lives in them.',
      'So we measure. A professional load audit, a design sized to the household rather than the house type, original warranty-backed equipment, and an installation that satisfies the estate as well as the owner.',
    ],
    why: 'VGC homeowners choose us because we make the estate process painless. We prepare the drawings and details the association asks for, work within the approved hours, and keep the compound tidy while we are there. The quote is written, itemised and fixed.',
    trust:
      'Word travels quickly in an estate, which suits us — most of our VGC work comes from neighbours who saw the last installation. Our technicians are certified, uniformed and supervised, and every system is tested at handover. We install throughout VGC for:',
    systems:
      'The housing stock here takes standard pitched-roof mounting well, so the engineering effort goes into the battery bank and the changeover. We size for your evening load, wire an interlocked changeover with the estate generator arrangement in mind, and label every way on the board.',
    localFaqs: [
      {
        id: 'vgc-approval',
        question: 'Does VGC require approval before installing solar?',
        answer:
          'The estate generally wants to see the proposed layout and confirmation that the work will be carried out within approved hours. We prepare that documentation as part of the quote — it is a normal step here, and it rarely delays anything.',
      },
      {
        id: 'vgc-neighbour',
        question: 'Can you match a system a neighbour already has?',
        answer:
          'We can, but we will still audit your own load first. Houses that look identical in VGC often use power very differently, and copying a neighbour’s sizing is one of the more common ways people end up with too little battery.',
      },
    ],
  },

  {
    slug: 'chevron',
    name: 'Chevron / Lekki Conservation Area',
    shortName: 'Chevron',
    heroTitle: 'Solar & Inverter Installation Along the Chevron Corridor in Lagos',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Family homes carried through the outage, not just the evening.',
    heroImage: '/images/area-chevron.jpg',
    introImage: '/images/area-chevron.jpg',
    intro: [
      'When you need reliable solar and inverter installation around Chevron and the Lekki Conservation Area, AAO Engineering Services is the local team you can count on. The estates along this corridor are full of working families — long commutes, children at home in the evening, and outages that always seem to land at the worst hour.',
      'We size systems for that reality. The audit measures what the house draws between six and eleven at night, because that is the window a family actually notices, and the design follows the numbers.',
    ],
    why: 'Homeowners along the Chevron corridor choose us for straight advice. If a smaller system plus a better battery serves you more than a bigger array, we will say so. Free site inspection, written quote, flexible payment options, and no pressure to decide on the spot.',
    trust:
      'These are family homes, so the crew matters. Ours arrive when they said they would, work cleanly around the household, and explain the system to whoever is home rather than only to whoever signed the contract. We install across the corridor for:',
    systems:
      'Most homes here need a hybrid inverter and a battery bank sized for the evening peak, with panels added to cut the daytime draw. Where a generator is already installed, we wire it into the changeover as the last resort instead of replacing it.',
    localFaqs: [
      {
        id: 'chevron-evening',
        question: 'Will the system carry my house through the evening peak?',
        answer:
          'That is exactly what we size for. During the audit we log what the house draws between six and eleven at night — lights, television, air conditioning, pumping — and build the battery bank around it, with a margin for a cloudy day.',
      },
      {
        id: 'chevron-response',
        question: 'How quickly can you reach us for support?',
        answer:
          'The Chevron and Lekki Conservation corridor is a routine route for our crews, so service visits are usually scheduled within a day or two of your call, and urgent faults sooner.',
      },
    ],
  },

  {
    slug: 'ajah',
    name: 'Ajah',
    heroTitle: 'Solar & Inverter Installation in Ajah You Can Build Up in Phases',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Start with what matters, expand without replacing it.',
    heroImage: '/images/area-ajah.jpg',
    introImage: '/images/area-ajah.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Ajah, AAO Engineering Services is the Lagos team you can count on. Ajah is still building — new duplexes, young estates, and owners who are managing a budget as carefully as they are managing an outage.',
      'That is a good reason to measure rather than guess. A load audit tells you which parts of the house genuinely need carrying now, and a system designed in phases lets you add capacity later without throwing away what you already bought.',
    ],
    why: 'Ajah homeowners choose us because we are honest about sequencing. Plenty of clients here start with the fans, lights, television and freezer, then add air conditioning in a second phase once the first has paid for itself. We design for that from the beginning, and flexible payment options are available on both stages.',
    trust:
      'Newer neighbourhoods attract plenty of one-van installers and plenty of counterfeit hardware. Everything we install is original and warranty-backed, fitted by certified technicians, labelled and tested. We install across Ajah for:',
    systems:
      'The pragmatic design here is a hybrid inverter with room to grow: enough battery for the critical circuits now, panel capacity added as budget allows, and a changeover wired to accept a generator if you already run one.',
    localFaqs: [
      {
        id: 'ajah-phases',
        question: 'Can I start small in Ajah and expand the system later?',
        answer:
          'Yes, and for many Ajah homes it is the sensible route. We specify an inverter and wiring that can take more panels and more battery later, so phase two is an addition rather than a replacement. The upgrade path is written into the first quote.',
      },
      {
        id: 'ajah-fake',
        question: 'How do I know the panels and batteries are genuine?',
        answer:
          'Because the warranty is issued in your name and we hand you the documents at commissioning. We only supply original equipment from brands we install every week, and we are happy to show you the same units working in other Ajah homes.',
      },
    ],
  },

  {
    slug: 'magodo-gra',
    name: 'Magodo GRA',
    heroTitle: 'Solar & Inverter Installation in Magodo GRA for Homes That Stay Powered',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Quiet, clean installs with security built into the plan.',
    heroImage: '/images/area-magodo-gra.jpg',
    introImage: '/images/area-magodo-gra.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Magodo GRA, AAO Engineering Services is the local team you can count on. Magodo households tend to think about power and security together — the same outage that takes the lights also takes the cameras and the gate motor.',
      'We design for both. The load audit covers your security equipment alongside the household load, so the system that carries your evening also keeps your CCTV recording and your gate working.',
    ],
    why: 'Magodo GRA homeowners choose us because we cover the whole picture. We install solar and inverters, CCTV, access control and automatic gates, which means one team, one design and one point of contact when something needs attention. Free site inspection and a written, itemised quote either way.',
    trust:
      'A quiet residential estate deserves a quiet installation. Our technicians work tidily, protect finishes, and leave the board labelled and the compound as they found it. We install throughout Magodo GRA for:',
    systems:
      'The usual Magodo design is a hybrid inverter with a battery bank sized for the evening, with the security circuits — cameras, recorder, gate motor and intercom — placed on the protected side of the changeover so they never drop.',
    localFaqs: [
      {
        id: 'magodo-security',
        question: 'Can the system keep my CCTV and gate running during an outage?',
        answer:
          'Yes, and we recommend it. Cameras, the recorder, the gate motor and the intercom draw very little, so putting them on the protected circuits costs almost nothing in battery terms and means your security never depends on the grid.',
      },
      {
        id: 'magodo-bundle',
        question: 'Can you handle the solar and the security in one project?',
        answer:
          'We can, and in Magodo we often do. One site inspection, one design and one crew covering the inverter, the cameras, the access control and the gate — which is both cheaper and tidier than coordinating separate contractors.',
      },
    ],
  },

  {
    slug: 'ikeja-gra',
    name: 'Ikeja GRA',
    heroTitle: 'Solar & Inverter Installation in Ikeja GRA for Older Homes and Offices',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Wiring checked and corrected before anything is connected.',
    heroImage: '/images/area-ikeja-gra.jpg',
    introImage: '/images/area-ikeja-gra.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Ikeja GRA, AAO Engineering Services is the Lagos team you can count on. GRA properties are typically older and frequently converted — a residence that became an office, extended twice, with a distribution board nobody has labelled since the eighties.',
      'Connecting a modern hybrid system to wiring like that without checking it first is how problems start. We audit the load and inspect the installation, tell you what needs correcting, and only then design the system.',
    ],
    why: 'Ikeja GRA owners choose us because we are an electrical contractor as well as a solar installer. If your circuits need balancing or your board needs replacing, we can do that work properly rather than working around it. One team, one quote, one standard.',
    trust:
      'Mixed residential and commercial properties need a contractor who can work around tenants and staff. We stage the work, isolate one area at a time, and keep the building running. We install across Ikeja GRA for:',
    systems:
      'The design here usually pairs a hybrid inverter and battery with remedial electrical work: a new board, balanced circuits, proper earthing. For offices we add a changeover that brings the existing generator in behind the batteries rather than in front of them.',
    localFaqs: [
      {
        id: 'ikeja-rewire',
        question: 'My Ikeja GRA property is old — do I need rewiring before solar?',
        answer:
          'Sometimes, and the site inspection will tell you plainly. Undersized cabling, unbalanced circuits and an unlabelled board are common here, and it is far cheaper to correct them during the solar installation than to discover them afterwards.',
      },
      {
        id: 'ikeja-office',
        question: 'Can you install while my office keeps operating?',
        answer:
          'Yes. We stage the work so only one area is isolated at a time and schedule the changeover outside working hours. It is how we handle most of the converted office properties in Ikeja GRA.',
      },
    ],
  },

  {
    slug: 'yaba',
    name: 'Yaba',
    heroTitle: 'Solar & Inverter Installation in Yaba for Offices, Shops and Schools',
    heroKeyword: 'Solar & Inverter Installation',
    heroSubtitle: 'Uptime for the mainland — power, network and cameras together.',
    heroImage: '/images/project-commercial.jpg',
    introImage: '/images/project-commercial.jpg',
    intro: [
      'When you need reliable solar and inverter installation in Yaba, AAO Engineering Services is the mainland team you can count on. Yaba runs on uptime: tech offices, schools, clinics and shops where a dropped supply means dropped calls, lost lessons and idle tills.',
      'We design for continuity rather than for a brochure figure. The audit measures what your operation actually draws through a working day, and the system is built to carry the parts of it that cost you money when they stop.',
    ],
    why: 'Yaba businesses choose us because we cover power and ICT in one contract. The same team that sizes your inverter can structure your network cabling and put your CCTV on protected circuits, so nothing is left to argue about between two contractors.',
    trust:
      'Shared buildings and busy streets make access the hard part of a Yaba installation. We plan deliveries and roof access in advance, work around tenants, and label and document everything we install. We work throughout Yaba for:',
    systems:
      'A typical Yaba design protects the essentials first — servers, routers, cameras, tills and lighting — on a hybrid inverter and battery, with panels sized to whatever roof you control and a changeover that keeps the existing generator as backup.',
    localFaqs: [
      {
        id: 'yaba-ict',
        question: 'Can you handle our network and CCTV as well as the power?',
        answer:
          'Yes. ICT and networking is one of our service lines, so a Yaba project can cover structured cabling, the rack, the cameras and the inverter in a single scope — designed together, documented together, and supported by one team.',
      },
      {
        id: 'yaba-shared',
        question: 'We rent a floor in a shared building — can we still install solar?',
        answer:
          'Often yes, with the landlord’s consent for roof access. Where roof space is not available to you, an inverter and battery system without panels still removes the generator from your day-to-day, and we can add panels later if the building allows it.',
      },
    ],
  },
];
