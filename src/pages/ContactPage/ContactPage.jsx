import { Link } from 'react-router-dom';

import { Seo } from '@/components/common/Seo';
import { ContactForm } from '@/components/forms/ContactForm';
import { RadialBand } from '@/components/sections/shared/RadialBand';
import {
  Accordion,
  Button,
  Container,
  Eyebrow,
  GuaranteeSeal,
  Icon,
  Reveal,
  Section,
  SectionHeading,
  Stars,
} from '@/components/ui';
import { company, officeAddress, trustChips } from '@/data/company';
import { contactFaqs } from '@/data/faqs';
import { buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

import styles from './ContactPage.module.css';

import { Img } from '@/components/ui/Img';

const breadcrumb = [{ label: 'Home', to: paths.home }, { label: 'Contact Us' }];

const INSTALLS = trustChips.find((chip) => chip.id === 'installs');

const REVIEW_BADGES = [
  { id: 'google', label: 'Google Reviews' },
  { id: 'facebook', label: 'Facebook Reviews' },
];

/** The direct channels, beside the form — every one tappable on mobile. */
const CHANNELS = [
  {
    id: 'call',
    icon: 'phone',
    label: 'Call us',
    value: company.phone.display,
    href: company.phone.href,
    note: `${company.hours} · fastest response`,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message us anytime',
    href: company.phone.whatsapp,
    note: 'Send photos of the problem',
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
    note: 'Best for site plans and documents',
  },
  {
    id: 'office',
    icon: 'pin',
    label: 'Visit our office',
    value: officeAddress.lines[0],
    href: officeAddress.mapUrl,
    note: `${officeAddress.lines[1]} · ${officeAddress.lines[2]}`,
  },
];

/** The three-step promise that turns an enquiry into a booked inspection. */
const STEPS = [
  {
    id: 'describe',
    icon: 'clipboard',
    title: 'Tell us what’s going on',
    body: 'Fill in the form or call — it takes about two minutes. Photos of the space or the problem help us size the job before we visit.',
  },
  {
    id: 'reply',
    icon: 'support',
    title: 'An expert replies within 24 hours',
    body: 'We call or message back, ask the right questions and tell you honestly what will fix it — including when the answer is “not yet”.',
  },
  {
    id: 'inspect',
    icon: 'shield',
    title: 'Free inspection, written quote',
    body: 'We visit, assess and quote in writing: clear upfront pricing, original products and a warranty on every installation.',
  },
];

/**
 * Dedicated contact page.
 *
 * The enquiry form is the same <ContactForm /> the home page's contact
 * section uses — same fields, same validation, same lead path — so a
 * visitor who clicks "Contact Us" in the navigation gets the exact
 * conversation starter they were shown on the home page, plus every
 * other way to reach the team around it.
 */
export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us — Solar, Electrical & Security Experts in Lagos"
        description="Talk to AAO Engineering Services about solar, inverter, CCTV, access control or electrical projects in Lagos. Call, WhatsApp, email or send the form — free site inspections, replies within 24 hours."
        image="/images/hero-solar.jpg"
        jsonLd={[buildBreadcrumbSchema(breadcrumb)]}
      />

      {/* Same photo-hero language as the other interior pages, plus the
          two things a contact visitor wants immediately: a headline that
          promises a conversation, and the fastest channels up top. */}
      <section className={styles.hero} aria-labelledby="contact-title">
        <Img className={styles.backdrop} src="/images/hero-solar.jpg" alt="" aria-hidden="true" />
        <span className={styles.scrim} aria-hidden="true" />

        <Container className={styles.heroInner}>
          <Reveal>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol>
                <li>
                  <Link to={paths.home}>Home</Link>
                </li>
                <li aria-current="page">Contact Us</li>
              </ol>
            </nav>

            <Eyebrow tone="volt">Contact Us</Eyebrow>

            <h1 id="contact-title" className={styles.title}>
              <em>Talk to an AAO Engineer</em> Today
            </h1>
            <p className={styles.subtitle}>
              Solar sizing, inverter backup, CCTV coverage or smart access — tell us what you’re
              dealing with and an AAO expert will guide you toward the right solution. No pressure,
              no fake products, no guesswork — and we reply within 24 hours.
            </p>

            <div className={styles.heroActions}>
              <Button href={company.phone.whatsapp} variant="whatsapp">
                <Icon name="whatsapp" size={17} />
                Message us on WhatsApp
              </Button>
              <Button href={company.phone.href} variant="ghost-light">
                <Icon name="phone" size={15} />
                Call {company.phone.display}
              </Button>
            </div>

            <ul className={styles.badges}>
              {REVIEW_BADGES.map((badge) => (
                <li key={badge.id} className={styles.badge}>
                  <Icon name={badge.id} size={18} />
                  <b>5.0</b>
                  <Stars rating={5} />
                  <span className={styles.badgeLabel}>{badge.label}</span>
                </li>
              ))}

              <li className={styles.badge}>
                <b className={styles.count}>{INSTALLS.value}</b>
                <span className={styles.badgeLabel}>{INSTALLS.label}</span>
              </li>
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* The conversion core: every channel on the left, the same
          enquiry form as the home page's contact section on the right. */}
      <RadialBand id="contact" className={styles.contactBand} aria-labelledby="contact-heading">
        <div className={styles.contactGrid}>
          <div className={styles.channels}>
            <Reveal>
              <Eyebrow tone="ember">Reach Us</Eyebrow>
              <h2 id="contact-heading" className={styles.channelTitle}>
                Every way to reach an <em>AAO expert</em>
              </h2>
              <p className={styles.channelSub}>
                Call, WhatsApp, email or drop by the office — whichever suits you. Or write it all
                down in the form and we will take it from there.
              </p>
            </Reveal>

            <ul className={styles.channelList} aria-label="Ways to reach AAO">
              {CHANNELS.map((channel, index) => (
                <Reveal as="li" key={channel.id} delay={index * 60}>
                  <a className={styles.channel} href={channel.href}>
                    <span className={styles.channelIcon} aria-hidden="true">
                      <Icon name={channel.icon} size={20} />
                    </span>
                    <span className={styles.channelBody}>
                      <h3 className={styles.channelLabel}>{channel.label}</h3>
                      <span className={styles.channelValue}>{channel.value}</span>
                      <span className={styles.channelNote}>{channel.note}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal className={styles.urgent} delay={120}>
              <span className={styles.urgentIcon} aria-hidden="true">
                <Icon name="warning" size={18} />
              </span>
              <p>
                <strong>Blackout or security fault right now?</strong> Call{' '}
                <a className={styles.urgentLink} href={company.phone.href}>
                  {company.phone.display}
                </a>{' '}
                — phone and WhatsApp are answered during office hours, and urgent faults jump the
                queue.
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.formColumn} delay={80}>
            <ContactForm source="contact-page" />
          </Reveal>
        </div>

        <Reveal className={styles.actions}>
          <Button href={company.phone.whatsapp} variant="whatsapp">
            <Icon name="whatsapp" size={17} />
            Message us on WhatsApp
          </Button>
          <Button href={company.phone.href} variant="ghost">
            <Icon name="phone" size={15} />
            {company.phone.display}
          </Button>
        </Reveal>

        <Reveal>
          <p className={styles.note}>
            Prefer WhatsApp? <a href={company.phone.whatsapp}>Message us anytime</a> ·{' '}
            {company.responseTime}
          </p>
          <p className={styles.legal}>
            Free site inspections · Clear upfront pricing · Warranty-backed installations
          </p>
        </Reveal>
      </RadialBand>

      {/* Anxiety reducer: what happens after they press send. */}
      <Section
        id="what-happens-next"
        tone="light"
        className={styles.next}
        aria-labelledby="what-happens-title"
      >
        <Container>
          <SectionHeading
            id="what-happens-title"
            align="center"
            eyebrow="What happens next"
            title={
              <>
                From first message to <em>fix, quoted</em>
              </>
            }
            description="No call centres, no ticket queues — the engineers who answer are the ones who quote, and the ones who install."
          />

          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 80} className={styles.step}>
                <span className={styles.stepIcon} aria-hidden="true">
                  <Icon name={step.icon} size={20} />
                </span>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Objection handling, before they have to ask. */}
      <Section id="contact-faq" tone="wash" aria-labelledby="contact-faq-title">
        <Container>
          <SectionHeading
            id="contact-faq-title"
            align="center"
            eyebrow="FAQ"
            title={
              <>
                Before you write, <em>quick answers</em>
              </>
            }
          />

          <Reveal>
            <Accordion items={contactFaqs} defaultOpenId={contactFaqs[0].id} />
          </Reveal>
        </Container>
      </Section>

      {/* Closing push: the human channel, one tap away. */}
      <Section tone="dark" aria-labelledby="closing-title">
        <Container className={styles.closingInner}>
          <Reveal>
            <GuaranteeSeal
              monogram={company.shortName}
              since={company.foundedYear}
              label={`${company.guarantee} by ${company.name}`}
              size={72}
            />
            <h2 id="closing-title" className={styles.closingTitle}>
              Prefer to talk to a <em>human right now?</em>
            </h2>
            <p className={styles.closingSub}>
              {company.hours}. {company.responseTime} — free site inspections, clear upfront
              pricing, warranty-backed installations.
            </p>
            <div className={styles.closingActions}>
              <Button href={company.phone.whatsapp} variant="whatsapp">
                <Icon name="whatsapp" size={17} />
                Message us on WhatsApp
              </Button>
              <Button href={company.phone.href} variant="ghost-light">
                <Icon name="phone" size={15} />
                Call {company.phone.display}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
