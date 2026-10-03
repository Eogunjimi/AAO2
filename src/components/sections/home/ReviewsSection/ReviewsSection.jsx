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
          title="Rated 5 Stars by Lagos Homes & Businesses"
          description="Don’t just take our word for it. See why clients across Lagos trust AAO with their power and security—then add your own story to the list."
        />

        <ReviewsCarousel reviews={reviews} />
      </Container>
    </Section>
  );
}
