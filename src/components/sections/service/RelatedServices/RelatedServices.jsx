import Link from 'next/link';

import { Button, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { getRelatedServices } from '@/lib/services';
import { paths } from '@/routes/paths';

import styles from './RelatedServices.module.css';

/**
 * Cross-links out of a service page: siblings from the same category first,
 * then the rest of the catalogue, plus a route back to the index.
 *
 * Without this a service page is a link-leaf — crawlers arrive and find no
 * onward path into the other services, which is what leaves large programmatic
 * page sets orphaned.
 *
 * @param {Object} props
 * @param {string} props.slug    Slug of the service being viewed (excluded).
 * @param {number} [props.limit] How many to show.
 */
export function RelatedServices({ slug, limit = 3 }) {
  const related = getRelatedServices(slug, limit);

  if (related.length === 0) return null;

  return (
    <Section tone="wash" aria-labelledby="related-services-title">
      <Container>
        <SectionHeading
          id="related-services-title"
          eyebrow="Related Services"
          title={
            <>
              Often Needed <em>Alongside This</em>
            </>
          }
          description="Most properties we work on need more than one system. These are the jobs that usually come up in the same conversation."
          className={styles.heading}
        />

        <ul className={styles.grid}>
          {related.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 60}>
              <Link href={paths.service(service.slug)} className={styles.card}>
                <span className={styles.thumb}>
                  <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
                </span>
                <span className={styles.body}>
                  <span className={styles.category}>{service.category}</span>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <span className={styles.summary}>{service.summary}</span>
                  <span className={styles.link}>Explore service →</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.footer}>
          <Button to={paths.services} variant="ghost">
            View all services
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
