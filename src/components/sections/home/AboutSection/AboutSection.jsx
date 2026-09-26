import { Container, Eyebrow, Reveal, Section } from '@/components/ui';
import { company, promises } from '@/data/company';

import styles from './AboutSection.module.css';

/** Company story plus the three AAO promises. */
export function AboutSection() {
  return (
    <Section id="about" tone="dark" aria-labelledby="about-title">
      <Container>
        <Reveal>
          <Eyebrow tone="volt">About Us</Eyebrow>
          <h2 id="about-title" className={styles.title}>
            Built on trust. Engineered to last.
          </h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <p>
              {company.name} was built to solve two problems homes and businesses face every day:
              unreliable power and security systems they can’t depend on.
            </p>
            <p>
              Led by {company.founder}, our team takes a different approach. We don’t simply sell
              you an inverter, install a few cameras, and move on. We assess your property,
              understand your actual needs, and recommend a solution that makes sense for your home,
              business, and budget.
            </p>
            <p>
              That approach has helped us complete 200+ solar and inverter installations while
              building our reputation around original products, neat workmanship, warranty-backed
              solutions, and dependable after-sales support.
            </p>
            <p>
              Because when it comes to powering your property or protecting what matters, getting it
              almost right isn’t good enough.
            </p>
            <p>That’s why every AAO project is built around three promises:</p>
          </Reveal>

          <Reveal as="ul" className={styles.promises} delay={100}>
            {promises.map((promise) => (
              <li key={promise.id} className={styles.promise}>
                <b>{promise.title}</b>
                <span>{promise.description}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
