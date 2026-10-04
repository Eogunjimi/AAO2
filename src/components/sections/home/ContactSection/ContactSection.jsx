import { ContactForm } from '@/components/forms/ContactForm';
import { RadialBand } from '@/components/sections/shared/RadialBand';
import { Button, Eyebrow, Icon, Reveal } from '@/components/ui';
import { company } from '@/data/company';

import styles from './ContactSection.module.css';

/** Primary conversion band: full enquiry form plus direct contact options. */
export function ContactSection({ defaultService = '' }) {
  return (
    <RadialBand id="contact" aria-labelledby="contact-title">
      <Reveal>
        <Eyebrow tone="ember">Contact Us</Eyebrow>
        <h2 id="contact-title">
          Let’s Fix Your <em>Power &amp; Security</em>, Starting with a Conversation*
        </h2>
        <p className={styles.subtitle}>
          Have questions about solar sizing, inverter backup, CCTV coverage, or smart access? Tell
          us what you’re dealing with, and an AAO expert will guide you toward the right
          solution—with no pressure, no fake products, and no guesswork.
        </p>
      </Reveal>

      <Reveal>
        <ContactForm defaultService={defaultService} />
      </Reveal>

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
  );
}
