'use client';

import { Container, IconButton, PostCard, Reveal, Section, SectionHeading } from '@/components/ui';
import { posts } from '@/data/posts';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

import styles from './InsightsSection.module.css';

/** Editorial rail of guides and comparisons. */
export function InsightsSection() {
  const { ref, scrollNext, scrollPrevious } = useHorizontalScroll();

  return (
    <Section id="insights" tone="dark" aria-labelledby="insights-title" className={styles.section}>
      <Container>
        <SectionHeading
          id="insights-title"
          align="center"
          tone="inverse"
          title="Power &amp; Protection, Simplified"
        />

        <Reveal>
          <ul className={styles.row} ref={ref}>
            {posts.map((post) => (
              <li key={post.id} className={styles.slide}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.controls}>
          <IconButton variant="volt" label="Previous articles" onClick={scrollPrevious}>
            ←
          </IconButton>
          <IconButton variant="volt" label="Next articles" onClick={scrollNext}>
            →
          </IconButton>
        </div>
      </Container>
    </Section>
  );
}
