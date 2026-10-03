import { Container, GuaranteeSeal, Reveal, Section } from '@/components/ui';
import { company } from '@/data/company';

import styles from './AboutSection.module.css';

/**
 * Company story beside a portrait of the founder at work.
 *
 * The copy comes first in the DOM — it carries the heading the section is
 * labelled by — while the grid places the portrait on the left at desktop
 * widths.
 */
export function AboutSection() {
  return (
    <Section id="about" tone="dark" aria-labelledby="about-title">
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.copy} delay={80}>
            <h2 id="about-title" className={styles.title}>
              We Built AAO to End the Guesswork in Power &amp; Security
            </h2>

            <p>
              Too many Nigerian homes and businesses waste money on oversized inverters, undersized
              solar systems, and fake security cameras that offer zero protection. {company.name}{' '}
              was founded by <strong>{company.founder}</strong> to change that story.
            </p>
            <p>
              We began with a simple promise:{' '}
              <strong>measure first, install right, and use only original products.</strong> Today,
              we’ve completed <strong>200+ installations</strong> across Lagos and beyond—built on
              three non-negotiables:
            </p>
            <ul className={styles.principles}>
              <li>
                <strong>A – Accountability:</strong> We take responsibility for every job, from
                first call to final switch-on.
              </li>
              <li>
                <strong>A – Authenticity:</strong> Original products only. Warranty always. No
                exceptions.
              </li>
              <li>
                <strong>O – Outstanding Service:</strong> Neat work, honest advice, and support that
                doesn’t disappear after payment.
              </li>
            </ul>
            <p>
              From load audits to solar, CCTV to smart gates, we’re not just installers. We’re your
              energy and security partner.
            </p>
          </Reveal>

          <Reveal className={styles.media}>
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
                <GuaranteeSeal
                  className={styles.seal}
                  monogram={company.shortName}
                  since={company.foundedYear}
                  label={`${company.guarantee} by ${company.name}`}
                />
                <span className={styles.credit}>
                  <span className={styles.name}>{company.founder}</span>
                  <span className={styles.role}>
                    {company.founderRole} of <b>{company.name}</b>
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
