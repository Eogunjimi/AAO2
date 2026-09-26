import { Container, Eyebrow, Marquee } from '@/components/ui';
import { certifications } from '@/data/company';

import styles from './TrustBadges.module.css';

/** Accreditation + partner marquee directly under the hero. */
export function TrustBadges() {
  return (
    <section className={styles.badges} aria-label="Certifications and partners">
      <Container>
        <Eyebrow className={styles.label}>
          Certified, accredited &amp; partnered with the best
        </Eyebrow>
      </Container>
      <Marquee speed={32}>
        {certifications.map((name) => (
          <span key={name} className={styles.badge}>
            <i className={styles.dot} />
            {name}
          </span>
        ))}
      </Marquee>
      <ul className={styles.srOnly}>
        {certifications.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
