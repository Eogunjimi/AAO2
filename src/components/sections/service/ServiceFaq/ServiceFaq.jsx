import { Accordion, Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors } from '@/routes/paths';

import styles from './ServiceFaq.module.css';

/**
 * Service-specific question followed by the general enquiries everyone asks.
 *
 * @param {Object} props
 * @param {Array<{id: string, question: string, answer: string}>} props.faqs
 */
export function ServiceFaq({ faqs }) {
  return (
    <Section tone="wash" aria-labelledby="service-faq-title">
      <Container>
        <SectionHeading
          id="service-faq-title"
          align="center"
          eyebrow="FAQ"
          title="Questions about this service"
        />

        <Reveal>
          <Accordion items={faqs} defaultOpenId={faqs[0]?.id} />
        </Reveal>

        <div className={styles.footer}>
          <Button to={anchors.contact}>Talk to an AAO Expert</Button>
        </div>
      </Container>
    </Section>
  );
}
