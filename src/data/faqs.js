/** Frequently asked questions. */

/** Shown on the home page. */
export const generalFaqs = [
  {
    id: 'sizing',
    question: 'How do I know which solar or inverter system is right for me?',
    answer:
      "We start with a professional load audit to understand your energy needs before recommending a system. This helps you avoid paying for an oversized system or struggling with one that's too small.",
  },
  {
    id: 'inspection',
    question: 'Do you offer free site inspections?',
    answer:
      'Yes. AAO Engineering Services offers free site inspections to assess your property and determine the right solution for your power or security needs.',
  },
  {
    id: 'original-products',
    question: 'Do you use original products?',
    answer:
      'Yes. We prioritize original, quality products backed by warranty to give you greater reliability and peace of mind.',
  },
  {
    id: 'after-sales',
    question: 'Do you offer after-sales support?',
    answer:
      'Yes. Our service continues after installation with responsive after-sales support, troubleshooting, and maintenance when needed.',
  },
  {
    id: 'payment-plans',
    question: 'Do you offer flexible payment plans?',
    answer:
      'Yes. Flexible payment options are available to help make reliable power and security solutions more accessible. Contact us to discuss the options available for your project.',
  },
  {
    id: 'other-services',
    question: 'What services do you provide besides solar installation?',
    answer:
      'We provide electrical installations, domestic and industrial load audits, CCTV systems, smart door locks, access control, automatic gates, intercom systems, home automation, and ICT/networking solutions.',
  },
  {
    id: 'clients',
    question: 'Do you work with both homes and businesses?',
    answer:
      'Yes. We serve residential and commercial clients, including homes, offices, shops, schools, hospitals, and industrial facilities.',
  },
  {
    id: 'duration',
    question: 'How long does an installation take?',
    answer:
      'Installation time depends on the type and size of your project. After assessing your site, our team will explain the scope of work and provide an estimated timeline.',
  },
  {
    id: 'getting-started',
    question: 'How do I get started?',
    answer:
      "Simply call, message, or submit our contact form to book your site inspection. We'll assess your needs, recommend the right solution, provide a quote, and schedule your installation.",
  },
];

/**
 * Appended after the service-specific question on every service page.
 *
 * Derived from the list above so the answers can never drift apart; the `svc-`
 * prefix keeps the generated element ids unique when both lists are rendered.
 */
export const serviceFaqs = ['original-products', 'inspection', 'payment-plans', 'after-sales'].map(
  (id) => {
    const faq = generalFaqs.find((entry) => entry.id === id);
    return { ...faq, id: `svc-${faq.id}` };
  },
);

/** Asked about the work itself, on the projects page. */
export const projectFaqs = [
  {
    id: 'project-timeline',
    question: 'How long does a typical project take?',
    answer:
      'A home solar and inverter installation runs two to five days, CCTV and access control usually one to two, and a full rewire depends on the size of the building. We give you the timeline in writing after the site inspection and work to it.',
  },
  {
    id: 'project-similar',
    question: 'Can I see a job similar to mine before I commit?',
    answer:
      'Yes. Tell us what you are planning and we will point you to the closest match we have completed, including what it cost to achieve. Where the client agrees, we can arrange for you to see the work in person.',
  },
  {
    id: 'project-areas',
    question: 'Which parts of Lagos do you cover?',
    answer:
      'We work across Lagos — Ikoyi, Victoria Island, Lekki, Banana Island, Oniru, VGC, Chevron, Ajah, Magodo GRA, Ikeja GRA and Yaba among them — and we travel beyond Lagos for larger commercial projects.',
  },
  {
    id: 'project-scope',
    question: 'Do you handle both homes and businesses?',
    answer:
      'Both. The projects here range from single-family homes to shops, offices and industrial premises. The difference is the load and the scheduling, not the standard of the work.',
  },
  {
    id: 'project-start',
    question: 'How do I get a project like these started?',
    answer:
      'Book a free site inspection. We measure and assess first, recommend what the numbers justify, quote it in writing, then schedule the installation — usually within the same week as the visit.',
  },
];
