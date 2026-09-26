import { Button, Container, Icon, Reveal, Section, SectionHeading } from '@/components/ui';
import { differentiators } from '@/data/differentiators';
import { anchors } from '@/routes/paths';

import styles from './WhyChooseSection.module.css';

/** Five reasons customers pick AAO. */
export function WhyChooseSection() {
  return (
    <Section tone="wash" aria-labelledby="why-title">
      <Container>
        <SectionHeading
          id="why-title"
          eyebrow="Why Choose Us"
          title="Why homes & businesses choose AAO"
          description="Our customers choose us because we take the time to understand their needs, recommend what actually works, and stand behind the quality of our work. Here’s what sets AAO apart:"
        />

        <ul className={styles.grid}>
          {differentiators.map((item, index) => (
            <Reveal as="li" key={item.id} className={styles.card} delay={index * 60}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </Reveal>
          ))}
        </ul>

        <div className={styles.footer}>
          <Button to={anchors.contact}>Book Your Free Site Inspection</Button>
        </div>
      </Container>
    </Section>
  );
}
