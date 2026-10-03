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
          align="center"
          title={
            <>
              Why homes &amp; businesses <em>trust</em> AAO
            </>
          }
          description="We take the time to understand your needs, recommend the right solutions, and deliver quality work you can count on. That’s what sets us apart."
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
