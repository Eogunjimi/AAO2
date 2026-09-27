import { useState } from 'react';

import { Chip, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { projects } from '@/data/projects';
import { serviceCategories } from '@/data/services';
import { cn } from '@/lib/cn';

import styles from './PastWorks.module.css';

const ALL = 'All';

/** Filters offered above the grid: every catalogue category that has work. */
const FILTERS = [
  ALL,
  ...serviceCategories
    .map((category) => category.name)
    .filter((name) => projects.some((project) => project.category === name)),
];

/**
 * Filterable grid of completed installations.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.title
 * @param {string} [props.description]
 */
export function PastWorks({ title, description }) {
  const [filter, setFilter] = useState(ALL);

  const visible =
    filter === ALL ? projects : projects.filter((project) => project.category === filter);

  return (
    <Section id="past-works" aria-labelledby="past-works-title">
      <Container>
        <SectionHeading
          id="past-works-title"
          align="center"
          eyebrow="Past Works"
          title={title}
          description={description}
          className={styles.heading}
        />

        <div className={styles.filters} role="group" aria-label="Filter projects by service">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className={cn(styles.filter, option === filter && styles.filterActive)}
              aria-pressed={option === filter}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <ul className={styles.grid} aria-live="polite">
          {visible.map((project, index) => (
            <Reveal as="li" key={project.id} className={styles.card} delay={index * 60}>
              <article>
                <div className={styles.media}>
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>

                <div className={styles.body}>
                  <Chip>{project.category}</Chip>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.location}>{project.location}</p>
                  <p className={styles.summary}>{project.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
