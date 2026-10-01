/**
 * Editorial posts, shown in the home page's "Insights" rail, on /blog, and as
 * full articles at /blog/:slug.
 *
 * `excerpt` is the card copy and the meta description; `intro`, `sections` and
 * `takeaway` are the article body. Adding a post here creates its card, its
 * page, its route and its sitemap entry — no code change.
 *
 * @typedef {Object} PostSection
 * @property {string} id
 * @property {string} heading      Rendered as an <h2> on the article page.
 * @property {string[]} body       Paragraphs.
 * @property {string[]} [list]     Optional bullets after the paragraphs.
 *
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} slug         URL segment, e.g. /blog/solar-vs-generator-in-lagos.
 * @property {string} category
 * @property {string} title
 * @property {string} excerpt      Card copy and meta description.
 * @property {string} image
 * @property {string} alt
 * @property {string} publishedAt  ISO date, for <time> and Article schema.
 * @property {number} readMinutes
 * @property {string} intro        Standfirst paragraph under the headline.
 * @property {PostSection[]} sections
 * @property {string} takeaway     Closing paragraph before the CTA.
 */

/** @type {Post[]} */
export const posts = [
  {
    id: 'inverter-sizing',
    slug: 'how-to-size-an-inverter-and-battery-bank',
    category: 'Solar Basics',
    title: 'How to size your inverter & battery bank correctly',
    excerpt:
      'The exact framework we use on every site visit — so you never pay for too much or settle for too little.',
    image: '/images/warm-detail.jpg',
    alt: 'Close-up of solar panel detail',
    publishedAt: '2026-08-12',
    readMinutes: 6,
    intro:
      'Almost every undersized system in Lagos was sold the same way: someone asked how many rooms you have, quoted a familiar package, and left. Sizing is arithmetic, not intuition, and the arithmetic is not difficult. Here is the whole method.',
    sections: [
      {
        id: 'load',
        heading: 'Start with what you actually run, not what you own',
        body: [
          'List every appliance you want the system to carry, its wattage, and the hours it runs on a normal day. Wattage is on the rating plate; where it is not, we measure it with a clamp meter during the site visit. Multiply watts by hours to get watt-hours, then add the list up.',
          'The discipline is in the second column. A 1,000W pressing iron that runs twenty minutes a day costs you 333Wh. A 60W fridge that never stops costs you 1,440Wh. People size for the iron and get caught by the fridge.',
        ],
      },
      {
        id: 'peak',
        heading: 'Separate daily energy from peak demand',
        body: [
          'Two different numbers do two different jobs. Total daily watt-hours decide the battery bank and the panel array. The largest number of watts running at the same instant decides the inverter.',
          'Motors make the second number bigger than it looks. An air conditioner, a borehole pump and a fridge compressor all draw a surge several times their running load for a second or two at startup. An inverter sized to the running total will trip on the surge, which is the single most common complaint we are called out to fix.',
        ],
      },
      {
        id: 'battery',
        heading: 'Size the battery for the night you actually have',
        body: [
          'Take your evening and overnight watt-hours — not the full 24-hour figure — and divide by the usable depth of discharge. Lithium gives you around 80–90% of its rated capacity; tubular batteries closer to 50%. A bank rated 10kWh is therefore 8kWh of lithium or 5kWh of tubular in practice.',
          'Then decide how many cloudy days you want to survive without the grid or a generator. Every extra day of autonomy multiplies the bank, and the cost with it. Most Lagos homes settle at one night of full autonomy plus a generator interlock for the rare bad week — that is usually the honest balance between resilience and spend.',
        ],
      },
      {
        id: 'panels',
        heading: 'Size the array to refill the bank, not to look impressive',
        body: [
          'Panels exist to put back what the night took out, with enough margin for harmattan haze and the rainy season. Lagos gives roughly four productive sun-hours a day averaged across the year, so divide your daily watt-hours by four to get the array size, then add 25–30% for losses, soiling and weather.',
          'Check the answer against your roof before you commit. Available, correctly oriented, unshaded roof area is a hard constraint, and it is better to discover it during design than on installation day.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'The five mistakes we find most often',
        body: ['Almost every system we are called to rescue fails on one of these:'],
        list: [
          'Sizing from room count instead of measured load',
          'Ignoring motor surge, so the inverter trips on startup',
          'Quoting battery capacity without stating usable depth of discharge',
          'An array too small to refill the bank, so the batteries slowly die',
          'No headroom for the appliances you will inevitably add later',
        ],
      },
    ],
    takeaway:
      'Sizing is not a dark art. It is a load audit, two sums and an honest conversation about how many bad days you want to ride out. Insist on seeing the numbers before you see a price — any installer who will not show you the arithmetic is guessing with your money.',
  },

  {
    id: 'camera-count',
    slug: 'how-many-cctv-cameras-does-your-home-need',
    category: 'Security',
    title: 'How many CCTV cameras does your home really need?',
    excerpt:
      "The #1 mistake homeowners make is covering corners, not entry points. Here's the proper way to plan coverage.",
    image: '/images/aao-cctv.jpg',
    alt: 'CCTV camera mounted on a wall',
    publishedAt: '2026-07-28',
    readMinutes: 5,
    intro:
      'The honest answer is that camera count is the wrong question. A four-camera system covering every way into the property beats an eight-camera system pointed at scenery. Plan coverage first and the number falls out of the plan by itself.',
    sections: [
      {
        id: 'entry',
        heading: 'Count entry points, then count cameras',
        body: [
          'Walk the perimeter and write down every way a person can get onto the property and then into the building: the gate, the pedestrian door, the back door, the generator house, ground-floor windows facing a wall someone could climb.',
          'Each of those needs to be covered by at least one camera whose job is identification, not atmosphere. Most Lagos homes end up somewhere between four and eight once the list is honest, and the distribution matters more than the total.',
        ],
      },
      {
        id: 'identify',
        heading: 'Know which cameras identify and which only observe',
        body: [
          'A camera at the gate should produce a face you could give to the police. That means it is mounted at head height on the approach, not on the roofline looking down at the top of a cap, and the subject fills a decent portion of the frame.',
          'Wide overview cameras have a role — they tell you what happened and in what order — but they will not identify anyone. Every system needs both, and the mistake is buying six of the second kind and none of the first.',
        ],
      },
      {
        id: 'resolution',
        heading: 'Resolution is about distance, not bragging rights',
        body: [
          'What matters is pixels across the subject, which depends on sensor resolution and how far away the subject is. A 2MP camera identifies a face reliably at a few metres. Push it to fifteen metres down a driveway and it produces a shape in a shirt.',
          'So either move the camera closer to the choke point, or use a higher-resolution sensor or a longer lens. Buying 4K and mounting it badly wastes the money twice: once on the camera and again on the storage it fills.',
        ],
      },
      {
        id: 'night',
        heading: 'Plan for night, because that is when it matters',
        body: [
          'Most incidents happen in the dark, and infrared illuminators have a real working range that is usually shorter than the box claims. Check the range against the distance you actually need, and watch for surfaces near the lens — a wall or gatepost inside the beam will bounce IR back and white out the whole frame.',
          'Where there is ambient light, a camera with good low-light colour performance is worth more than raw resolution. Colour clothing and a colour vehicle are far more useful to an investigation than a grey silhouette.',
        ],
      },
      {
        id: 'recorder',
        heading: 'The recorder and the cabling decide whether any of it works',
        body: ['A system is only as good as the parts nobody looks at:'],
        list: [
          'Retention: 14–30 days of continuous recording, sized deliberately, not left at whatever the box defaults to',
          'The recorder in a locked, ventilated position — not on the shelf by the front door where it can be taken',
          'Proper CAT6 or coax, run in conduit and labelled at both ends',
          'A UPS on the recorder and the router, so an outage is not a blind spot',
          'Remote viewing tested on your phone, on mobile data, before the crew leaves',
        ],
      },
    ],
    takeaway:
      'Plan the coverage, not the quantity. Cover every entry point, make at least one camera per approach an identification camera, size retention deliberately, and put the recorder somewhere an intruder cannot simply walk off with it. Four cameras that do that are worth more than twelve that do not.',
  },

  {
    id: 'solar-vs-generator',
    slug: 'solar-vs-generator-in-lagos-the-5-year-math',
    category: 'Comparison',
    title: 'Solar vs generator in Lagos: the 5-year math',
    excerpt:
      'We ran the real numbers on fuel, servicing and downtime. The results will stop you from buying another generator.',
    image: '/images/hero-solar.jpg',
    alt: 'Solar array at dusk',
    publishedAt: '2026-07-09',
    readMinutes: 7,
    intro:
      'A generator looks cheaper because you pay for it once and the rest arrives quietly, in petrol stations and mechanic visits, spread over years. Put both options on the same five-year footing and the comparison changes shape entirely.',
    sections: [
      {
        id: 'sticker',
        heading: 'The purchase price is the smallest number in the comparison',
        body: [
          'A generator wins on day one and starts losing on day two. Solar and inverter systems cost more upfront and then cost very little: no fuel, no oil, no filters, no rewind, no noise.',
          'The only fair way to compare them is total cost of ownership over the life of the equipment. Five years is a reasonable window — long enough for running costs to dominate, short enough that you can still picture it.',
        ],
      },
      {
        id: 'fuel',
        heading: 'Fuel is the line that decides the argument',
        body: [
          'Work it out for your own household rather than trusting a generic figure. Take your generator litres per hour, multiply by hours run per day, by the current pump price, by 365, by five. That single number is usually larger than the entire cost of a properly sized hybrid system.',
          'Then remember the direction of travel. Fuel prices have not moved downwards in any five-year window in recent memory, and every increase makes the same comparison worse for the generator.',
        ],
      },
      {
        id: 'maintenance',
        heading: 'Servicing, parts and the quiet cost of downtime',
        body: [
          'A generator in daily use needs oil and filters on a schedule, plugs and belts periodically, and at some point a rewind or a replacement. None of those are catastrophic individually; together, over five years, they are a second purchase price.',
          'Downtime is the cost nobody puts in the spreadsheet. When the generator will not start, a shop stops trading, a clinic loses its cold chain, a family loses a night of sleep. Solar with a battery covers the outage silently and instantly, without anybody walking outside to pull a cord.',
        ],
      },
      {
        id: 'solar-costs',
        heading: 'What solar genuinely costs you over the same period',
        body: [
          'Being honest about the other side: panels degrade slowly and carry 20–25 year performance warranties. A good hybrid inverter is a 10-year component. Lithium batteries are rated in cycles and typically give 8–10 years of daily use; tubular batteries considerably less, which is why they often look cheaper and are not.',
          'So across five years a well-specified system usually has no replacement cost at all — the battery is the only part with a foreseeable end of life, and it normally sits beyond the window.',
        ],
      },
      {
        id: 'hybrid',
        heading: 'The answer is usually both, in the right order',
        body: [
          'This is not an argument for throwing the generator away. It is an argument about which one is the main supply. In most of the systems we install, solar and battery carry the daily load, and the generator is retained through an interlocked automatic changeover as a last resort for the genuinely bad week.',
          'That arrangement collapses fuel consumption to a fraction of what it was, removes the noise and fumes from ordinary days, and still leaves you with a backstop. You keep the resilience and stop paying for it daily.',
        ],
      },
    ],
    takeaway:
      'Run your own five-year fuel number before you buy another generator — litres per hour, hours per day, pump price, times five years. Most people are surprised by the total. Then ask what a system sized to your measured load would cost, and compare like with like.',
  },

  {
    id: 'load-audit-signs',
    slug: 'signs-your-property-needs-a-load-audit',
    category: 'Electrical',
    title: '5 signs your property needs a professional load audit',
    excerpt:
      'Tripping breakers, hot switches, rising bills — the warning signs we look for, and what they really mean.',
    image: '/images/aao-electrical.jpg',
    alt: 'Electrical distribution board',
    publishedAt: '2026-06-24',
    readMinutes: 5,
    intro:
      'Electrical faults rarely arrive without warning. They announce themselves for weeks in small ways that are easy to live with and easy to ignore. These are the five we treat as urgent, and what each one is usually telling you.',
    sections: [
      {
        id: 'tripping',
        heading: '1. Breakers that trip at the same time every day',
        body: [
          'A breaker doing its job occasionally is fine. A breaker that goes at the same moment each evening is describing a pattern — a circuit carrying more than it was designed for, at the hour when everything comes on at once.',
          'The dangerous response is a larger breaker. That does not fix the overload; it removes the protection and leaves the cable, which has not changed size, carrying current it was never rated for. The correct response is to measure the circuit and redistribute or upgrade it properly.',
        ],
      },
      {
        id: 'heat',
        heading: '2. Warm switches, sockets or a warm distribution board',
        body: [
          'Electrical accessories should be at room temperature. Warmth means resistance, and resistance at a connection means a loose terminal, a corroded joint or an undersized conductor.',
          'This is the sign we treat most seriously, because heat at a bad connection is progressive — it degrades the joint, which increases resistance, which produces more heat. Any hot accessory or discoloured, smelling board should be inspected without waiting.',
        ],
      },
      {
        id: 'lights',
        heading: '3. Lights that dim when a motor starts',
        body: [
          'A brief dip when the pump or air conditioner kicks in is normal in most homes. A visible, repeated dip across the whole house suggests supply-side voltage drop, an overloaded main, or an undersized cable somewhere between the meter and the board.',
          'Left alone, the same voltage sag shortens the life of every motor and power supply in the building, including the inverter you may be about to buy.',
        ],
      },
      {
        id: 'bills',
        heading: '4. Bills or fuel use climbing with no change in habits',
        body: [
          'When consumption rises while behaviour stays flat, something is drawing power that should not be. Common culprits are a failing fridge compressor, a borehole pump cycling because of a leak, a faulty water heater thermostat, or an old inverter idling badly.',
          'An audit finds it by measurement rather than suspicion, which is usually far cheaper than replacing appliances one at a time hoping to guess right.',
        ],
      },
      {
        id: 'before-solar',
        heading: '5. You are about to buy solar, an inverter or a generator',
        body: [
          'This is the moment an audit pays for itself most obviously. Sizing any backup system without measured consumption is guesswork, and guesswork is expensive in both directions — an oversized system wastes capital, an undersized one trips and dies early.',
          'An audit also finds the faults worth fixing before the new equipment is connected. Putting a good inverter onto a board with a loose neutral simply gives the fault a more expensive victim.',
        ],
      },
    ],
    takeaway:
      'Tripping breakers, warm accessories, dimming lights, unexplained bills, or a pending backup purchase — any one of these justifies measuring the installation properly. Our site inspection and load audit are free, and we would rather tell you nothing is wrong than sell you something you do not need.',
  },

  {
    id: 'gate-checklist',
    slug: 'automatic-gates-and-smart-locks-buyers-checklist',
    category: 'Automation',
    title: "Automatic gates & smart locks: a buyer's checklist",
    excerpt:
      'What to demand before you pay: motor sizing, safety sensors, battery backup and warranty terms.',
    image: '/images/aao-gate.jpg',
    alt: 'Automatic gate at a residence',
    publishedAt: '2026-06-03',
    readMinutes: 5,
    intro:
      'Gate automation is one of the easiest things to buy badly, because everything looks identical once it is installed and the differences only surface months later — usually at night, usually in the rain. Ask these questions before you pay a deposit.',
    sections: [
      {
        id: 'motor',
        heading: 'Is the motor sized to the gate you actually have?',
        body: [
          'Motors are rated by leaf weight and leaf width, and both matter. A heavy wrought-iron sliding gate and a light aluminium one of the same width need different hardware, and a motor running permanently near its limit will fail early and take your patience with it.',
          'Ask for the weight and width the quoted motor is rated for, and check it against your gate. If the installer has not measured or weighed anything, they are picking from habit.',
        ],
      },
      {
        id: 'safety',
        heading: 'Where are the safety devices?',
        body: [
          'A powered gate is a heavy machine that moves where children and cars are. Photocell beams across the opening stop the gate when the path is broken; obstruction detection reverses it when it meets resistance; a flashing lamp warns that it is about to move.',
          'These are not upsells. If a quote does not mention photocells, that is the first thing to query, and the answer will tell you a great deal about the rest of the installation.',
        ],
      },
      {
        id: 'power',
        heading: 'What happens when the power is out?',
        body: [
          'In Lagos this is not an edge case, it is Tuesday. There are two separate answers you need: battery backup so the gate keeps operating through an outage, and a manual release so you can open it by hand when the battery is flat too.',
          "Ask to be shown the manual release and to operate it yourself at handover. A release key that lives in the installer's van is not a release.",
        ],
      },
      {
        id: 'locks',
        heading: 'For smart locks, ask the unglamorous questions',
        body: ['The failure modes are predictable, so check them deliberately:'],
        list: [
          'What happens when the batteries die — is there a physical key override or external power contact?',
          'Does it still unlock if the Wi-Fi or the vendor cloud is down?',
          'How many users and codes can it hold, and can access be revoked individually?',
          'Is the mechanical lock body itself any good, or is a weak latch hiding behind a nice app?',
          'Who holds the administrator account after the installer leaves?',
        ],
      },
      {
        id: 'warranty',
        heading: 'Get the warranty and the handover in writing',
        body: [
          'Establish what is covered, for how long, and by whom — the manufacturer, the importer or the installer. Parts and labour are often different periods, and "one year warranty" without that detail means very little.',
          'At handover you should receive the documents in your name, the remotes and their pairing instructions, the manual release key, and a demonstration of the safety devices actually working. If any of that is missing, the job is not finished.',
        ],
      },
    ],
    takeaway:
      'Sized motor, photocells, battery backup, manual release, documented warranty. Five checks, all of them answerable before you pay a deposit, and together they separate an installation that lasts a decade from one you will be arguing about by next rainy season.',
  },

  {
    id: 'wifi-fix',
    slug: 'wifi-dead-zones-and-the-structured-cabling-fix',
    category: 'ICT',
    title: "Wi-Fi that dies in half the house? Here's the real fix",
    excerpt:
      'Why boosting your router rarely works — and how structured cabling solves it once and for all.',
    image: '/images/aao-network.jpg',
    alt: 'Structured cabling in a network rack',
    publishedAt: '2026-05-19',
    readMinutes: 6,
    intro:
      'The instinct when Wi-Fi fails upstairs is to buy something: a stronger router, an extender, a mesh kit. Sometimes that works. Often it does not, because the problem is not signal strength — it is the walls, and the fact that your phone has to talk back.',
    sections: [
      {
        id: 'physics',
        heading: 'Why a more powerful router usually changes nothing',
        body: [
          'Wi-Fi is a two-way conversation. A high-power router can shout across the building, but your phone is a small battery-powered device with a tiny antenna, and it cannot shout back. Coverage is limited by the weaker side of the link, which is almost always the phone.',
          'Nigerian construction makes this worse. Concrete, blockwork and the steel in reinforced slabs absorb 5GHz badly, and a single floor slab can cost you more signal than the whole ground floor did.',
        ],
      },
      {
        id: 'extenders',
        heading: 'What extenders actually cost you',
        body: [
          'A wireless repeater receives and retransmits on the same radio, which roughly halves throughput for everything behind it. Chain two and you are down to a quarter before congestion is even considered.',
          'Worse, a repeater placed where the signal is already poor faithfully rebroadcasts a poor signal. You get bars on the phone and a connection that still cannot hold a video call — which is the specific frustration most people describe when they call us.',
        ],
      },
      {
        id: 'cabling',
        heading: 'The fix is wire, then wireless at the far end',
        body: [
          'Structured cabling means running CAT6 from a central point to each area that needs coverage, and putting an access point at the end of each run. Every access point then has a full-speed backhaul instead of sharing airtime with the clients it serves.',
          'Two or three well-placed, cabled access points will comfortably outperform an expensive mesh system fighting through a concrete slab, and they will keep performing as you add devices.',
        ],
      },
      {
        id: 'mesh',
        heading: 'When wireless mesh is genuinely the right answer',
        body: [
          'Mesh is not wrong, it is just frequently misapplied. In a single-storey property with light partition walls, or where running cable would mean destroying finished work, a good mesh system with a dedicated backhaul radio is a sensible choice.',
          'The distinction is honest about trade-offs: mesh buys you speed of installation and costs you throughput and predictability. Cable costs you a day of work and gives you a network that stops being a topic of conversation.',
        ],
      },
      {
        id: 'doing-it',
        heading: 'What a proper job looks like',
        body: ['Whoever does the work, this is the standard to hold them to:'],
        list: [
          'A site survey that identifies dead zones by measurement, not by walking around with a phone',
          'CAT6 in conduit, terminated to a patch panel, labelled at both ends',
          'Access points positioned for coverage overlap, ceiling or high-wall mounted',
          'Channels and power levels set deliberately, not left on auto to fight the neighbours',
          'One network name across the property, so devices roam instead of clinging to the far access point',
          'A UPS on the router, switch and access points, so an outage does not take the network with it',
        ],
      },
    ],
    takeaway:
      'If Wi-Fi dies in half the house, stop buying radios and look at the building. Cable to where the people are, put access points at the ends, and configure them deliberately. It is a day of work that ends the problem permanently instead of moving it one room over.',
  },
];
