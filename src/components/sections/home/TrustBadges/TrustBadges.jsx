import { PartnerStrip } from '@/components/sections/shared/PartnerStrip';
import { Container, Eyebrow } from '@/components/ui';

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

      <PartnerStrip />
    </section>
  );
}
