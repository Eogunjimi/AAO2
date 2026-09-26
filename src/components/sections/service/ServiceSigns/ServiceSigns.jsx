import { Button, Container, Icon, Reveal, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
import { solutionProcess } from '@/data/process';

import styles from './ServiceSigns.module.css';

/** "When to consider this" symptoms plus what AAO does about them. */
export function ServiceSigns({ service }) {
  return (
    <Section tone="wash" aria-labelledby="signs-title">
      <Container>
        <SectionHeading
          id="signs-title"
          eyebrow="When to consider"
          title={`When to consider ${service.title.toLowerCase()}`}
          description="Sound familiar? These are the exact signs we look for during a free site inspection — and exactly what our team resolves."
        />

        <ul className={styles.grid}>
          {service.signs.map((sign, index) => (
            <Reveal as="li" key={sign} className={styles.sign} delay={index * 60}>
              <span className={styles.icon}>
                <Icon name="warning" size={20} />
              </span>
              <p>{sign}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.solve}>
          <div>
            <h3 className={styles.solveTitle}>What we’ll do about it</h3>
            <ul className={styles.checklist}>
              {service.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.solveTitle}>Our foolproof solution process</h3>
            <p className={styles.solveCopy}>
              Every project follows the same disciplined path, so you always know what happens next
              and what it costs.
            </p>
            <ul className={styles.checklist}>
              {solutionProcess.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <div className={styles.cta}>
              <Button href={company.phone.href} variant="volt">
                Call Now — {company.phone.display}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
