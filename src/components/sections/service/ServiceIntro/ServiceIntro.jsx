import { Button, Container, Eyebrow, Marquee, Reveal, Section } from '@/components/ui';
import { certifications, company } from '@/data/company';

import styles from './ServiceIntro.module.css';

/** Motto + partner marquees, then the long-form service description. */
export function ServiceIntro({ service }) {
  return (
    <>
      <div className={styles.motto}>
        <Marquee speed={26}>
          <span className={styles.mottoText}>
            Accountability <b>✦</b> Authenticity <b>✦</b> Outstanding Service <b>✦</b>
          </span>
        </Marquee>
      </div>

      <div className={styles.badges}>
        <Marquee speed={32}>
          {certifications.map((name) => (
            <span key={name} className={styles.badge}>
              <i className={styles.dot} />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <Section aria-labelledby="service-intro-title">
        <Container className={styles.grid}>
          <Reveal>
            <Eyebrow>The service</Eyebrow>
            <h2 id="service-intro-title" className={styles.title}>
              {service.title}
            </h2>
            <p className={styles.body}>{service.intro}</p>

            <div className={styles.cta}>
              <Button href={company.phone.href} variant="volt">
                Call {company.phone.display}
              </Button>
              <span className={styles.note}>Free site inspection, zero pressure.</span>
            </div>
          </Reveal>

          <Reveal className={styles.image} delay={100}>
            <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
