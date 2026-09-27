import { Accordion, Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors } from '@/routes/paths';

import styles from './FaqBand.module.css';

/**
 * Questions about one topic — five at most, so a page closes on answers
 * rather than a wall of them.
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {Array<{id: string, question: string, answer: string}>} props.faqs
 */
export function FaqBand({ id, title, faqs }) {
  return (
    <Section tone="wash" aria-labelledby={id}>
      <Container>
        <SectionHeading id={id} align="center" eyebrow="FAQ" title={title} />

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
