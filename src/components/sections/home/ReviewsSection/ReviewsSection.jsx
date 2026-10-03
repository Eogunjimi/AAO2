import { ReviewsCarousel } from '@/components/sections/shared/ReviewsCarousel';
import { Container, Section, SectionHeading } from '@/components/ui';
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
              What Clients
              <br />
              <em>Are Saying?</em>
            </>
          }
        />

        <ReviewsCarousel reviews={reviews} />
      </Container>
    </Section>
  );
}
