import { ReviewsCarousel } from '@/components/sections/shared/ReviewsCarousel';
import { Container, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
import { reviews } from '@/data/reviews';

import styles from './ReviewsSection.module.css';

/** Sliding wall of customer reviews. */
export function ReviewsSection() {
  return (
    <Section id="reviews" tone="wash" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          id="reviews-title"
          align="center"
          className={styles.heading}
          eyebrow="Reviews"
          title={
            <>
              See Why Clients <em>Choose</em> {company.shortName} Engineering
            </>
          }
        />

        <ReviewsCarousel reviews={reviews} />
      </Container>
    </Section>
  );
}
