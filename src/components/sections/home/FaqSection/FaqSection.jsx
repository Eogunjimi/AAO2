import { Accordion, Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { generalFaqs } from '@/data/faqs';
import { anchors } from '@/routes/paths';

import styles from './FaqSection.module.css';

/** Home page FAQ list. */
export function FaqSection() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <SectionHeading
          id="faq-title"
          align="center"
          eyebrow="FAQ"
          title="Got questions? We’ve got answers."
        />

        <Reveal>
          <Accordion items={generalFaqs} />
        </Reveal>

        <Reveal className={styles.footer}>
          <p className={styles.title}>Still have questions?</p>
          <p className={styles.copy}>
            Talk to our team and get the answers you need before making a decision.
          </p>
          <Button to={anchors.contact}>Talk to an AAO Expert</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
