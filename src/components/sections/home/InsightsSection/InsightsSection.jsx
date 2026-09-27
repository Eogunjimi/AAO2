import { Container, IconButton, Reveal, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
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
          size="compact"
          align="center"
          tone="inverse"
          title={
            <>
              Insights that help <em>homeowners</em> win power
            </>
          }
        />

        <Reveal>
          <ul className={styles.row} ref={ref}>
            {posts.map((post) => (
              <li key={post.id} className={styles.card}>
                <article>
                  <div className={styles.thumb}>
                    <img src={post.image} alt={post.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.body}>
                    <p className={styles.byline}>
                      By: {company.shortName} Engineering · {post.category}
                    </p>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <span className={styles.link}>Read now…</span>
                  </div>
                </article>
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
