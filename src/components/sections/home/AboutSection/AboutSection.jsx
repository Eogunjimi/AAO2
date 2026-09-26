import { Container, Eyebrow, Icon, Reveal, Section } from '@/components/ui';
import { company } from '@/data/company';

import styles from './AboutSection.module.css';

/** Company story, paired with a portrait of the team at work. */
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
            <p className={styles.motto}>{company.tagline}</p>
          </Reveal>

          <Reveal className={styles.media} delay={100}>
            <figure className={styles.figure}>
              <img
                src="/images/about-engineer.jpg"
                alt={`${company.founder}, ${company.founderRole} of ${company.name}, testing a household inverter and distribution board with a multimeter`}
                loading="lazy"
                decoding="async"
                width="922"
                height="1152"
              />

              <figcaption className={styles.plate}>
                <p className={styles.name}>
                  {company.founder}
                  <span className={styles.role}>{company.founderRole}</span>
                </p>
                <span className={styles.badge}>
                  <Icon name="shield" size={14} />
                  {company.guarantee}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
