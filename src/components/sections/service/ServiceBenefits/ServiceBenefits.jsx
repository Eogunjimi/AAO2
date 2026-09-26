import { Container, Reveal, Section, SectionHeading } from '@/components/ui';

import styles from './ServiceBenefits.module.css';

/** Four-up benefit grid for the current service. */
export function ServiceBenefits({ benefits }) {
  return (
    <Section aria-labelledby="benefits-title">
      <Container>
        <SectionHeading
          id="benefits-title"
          eyebrow="Benefits"
          title="Benefits of working with AAO on this"
        />

        <ul className={styles.grid}>
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} className={styles.card} delay={index * 60}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{benefit.title}</h3>
              <p className={styles.description}>{benefit.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
