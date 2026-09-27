import { Accordion, Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors } from '@/routes/paths';

import styles from './ServiceFaq.module.css';

/**
 * Questions about this service only — five at most, so the page closes on
 * answers rather than a wall of them.
 *
 * @param {Object} props
 * @param {Array<{id: string, question: string, answer: string}>} props.faqs
 * @param {import('@/data/services').Service} props.service
 */
export function ServiceFaq({ faqs, service }) {
  return (
    <Section tone="wash" aria-labelledby="service-faq-title">
      <Container>
        <SectionHeading
          id="service-faq-title"
          align="center"
          eyebrow="FAQ"
          title={`${service.title}: Your Questions Answered`}
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
