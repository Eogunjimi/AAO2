import { Link } from 'react-router-dom';

import { Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { paths } from '@/routes/paths';

import styles from './RelatedServices.module.css';

/** Cross-links to sibling services so visitors never hit a dead end. */
export function RelatedServices({ services }) {
  if (!services.length) return null;

  return (
    <Section aria-labelledby="related-title" spacing="compact">
      <Container>
        <SectionHeading
          id="related-title"
          eyebrow="Keep exploring"
          title="Related services"
          className={styles.heading}
        />

        <ul className={styles.grid}>
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 60}>
              <Link to={paths.service(service.slug)} className={styles.card}>
                <span className={styles.category}>{service.category}</span>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.summary}>{service.summary}</p>
                <span className={styles.link}>View service →</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
