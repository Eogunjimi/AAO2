import { Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { processSteps } from '@/data/process';
import { anchors } from '@/routes/paths';

import styles from './ServiceProcess.module.css';

/** Static five-card version of the delivery process. */
export function ServiceProcess() {
  return (
    <Section tone="wash" aria-labelledby="service-process-title">
      <Container>
        <SectionHeading
          id="service-process-title"
          align="center"
          eyebrow="Our process"
          title="Getting started is simple"
        />

        <ol className={styles.grid}>
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.id} className={styles.card} delay={index * 60}>
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.short}</p>
            </Reveal>
          ))}
        </ol>

        <div className={styles.footer}>
          <Button to={anchors.contact}>Schedule This Service →</Button>
        </div>
      </Container>
    </Section>
  );
}
