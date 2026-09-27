import { QuoteForm } from '@/components/forms/QuoteForm';
import { Button, Container, Icon, Reveal, Section } from '@/components/ui';
import { company } from '@/data/company';

import styles from './AreaIntro.module.css';

/**
 * Opening block of a service-area page: the quote form, the local
 * introduction and a photograph of a property in the area running on solar.
 *
 * The form is first in the DOM so it sits under the trust strip on a phone;
 * the desktop grid moves it into a sticky sidebar.
 *
 * @param {Object} props
 * @param {import('@/data/areas').ServiceArea} props.area
 */
export function AreaIntro({ area }) {
  return (
    <Section aria-labelledby="area-intro-title">
      <Container className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.formCard}>
            <QuoteForm defaultService="solar-inverter" />
          </div>
        </div>

        <div className={styles.content}>
          <Reveal>
            <h2 id="area-intro-title" className={styles.title}>
              Solar &amp; Inverter Installation in {area.name}
            </h2>

            <figure className={styles.figure}>
              <img
                src={area.introImage}
                alt={`A property in ${area.name} running on a solar and inverter system installed by ${company.name}`}
                loading="lazy"
                decoding="async"
              />
            </figure>

            {area.intro.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <div className={styles.cta}>
              <Button href={company.phone.href}>
                <Icon name="phone" size={16} />
                Call {company.phone.display}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
