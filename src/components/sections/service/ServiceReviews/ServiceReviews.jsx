import { ReviewsGrid } from '@/components/sections/shared/ReviewsGrid';
import { Container, Section, SectionHeading } from '@/components/ui';
import { reviews } from '@/data/reviews';

/** Social proof for the service pages. */
export function ServiceReviews() {
  return (
    <Section aria-labelledby="service-reviews-title">
      <Container>
        <SectionHeading
          id="service-reviews-title"
          eyebrow="Reviews"
          title="What customers say about our work"
        />
        <ReviewsGrid reviews={reviews} showSource={false} align="start" />
      </Container>
    </Section>
  );
}
