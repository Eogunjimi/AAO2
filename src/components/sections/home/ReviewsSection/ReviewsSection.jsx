import { ReviewsGrid } from '@/components/sections/shared/ReviewsGrid';
import { Container, Section, SectionHeading } from '@/components/ui';
import { reviews } from '@/data/reviews';

/** Paged grid of customer reviews. */
export function ReviewsSection() {
  return (
    <Section id="reviews" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          id="reviews-title"
          align="center"
          eyebrow="Reviews"
          title="What our customers say"
          description="Real reviews from Google and Facebook — from homes and businesses across Lagos."
        />
        <ReviewsGrid reviews={reviews} />
      </Container>
    </Section>
  );
}
