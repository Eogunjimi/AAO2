import { Container, IconButton, Reveal, Section } from '@/components/ui';
import { posts } from '@/data/posts';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { company } from '@/data/company';

import styles from './InsightsSection.module.css';

/** Editorial rail of guides and comparisons. */
export function InsightsSection() {
  const { ref, scrollNext, scrollPrevious } = useHorizontalScroll(324);

  return (
    <Section id="insights" tone="dark" aria-labelledby="insights-title" className={styles.section}>
      <Container>
        <Reveal className={styles.head}>
          <IconButton variant="volt" label="Previous articles" onClick={scrollPrevious}>
            ←
          </IconButton>
          <h2 id="insights-title" className={styles.title}>
            Insights that help
            <br />
            <em>homeowners</em> win power
          </h2>
          <IconButton variant="volt" label="Next articles" onClick={scrollNext}>
            →
          </IconButton>
        </Reveal>
      </Container>

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
    </Section>
  );
}
