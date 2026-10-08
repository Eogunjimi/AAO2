'use client';

import { Button, Container, Marquee, Section, SectionHeading } from '@/components/ui';
import { projects } from '@/data/projects';
import { useInView } from '@/hooks/useInView';
import { paths } from '@/routes/paths';

import styles from './ProjectMarquee.module.css';

/**
 * Self-scrolling strip of completed work.
 *
 * The marquee is decorative — the same jobs are listed properly on the
 * projects page — so the tiles are hidden from assistive tech and the link
 * below carries the journey.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.title
 * @param {string} props.description
 */
export function ProjectMarquee({ title, description }) {
  const [ref, inView] = useInView({ threshold: 0 });

  return (
    <Section tone="wash" aria-labelledby="past-work-title" className={styles.section}>
      <Container>
        <SectionHeading
          id="past-work-title"
          align="center"
          eyebrow="Past Work"
          title={title}
          description={description}
          className={styles.heading}
        />
      </Container>

      <div ref={ref}>
        <Marquee speed={52} paused={!inView} className={styles.rail}>
          {projects.map((project) => (
            <figure key={project.id} className={styles.tile}>
              <img src={project.image} alt="" loading="lazy" decoding="async" />
              <figcaption className={styles.caption}>
                <b>{project.title}</b>
                <span>{project.location}</span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>

      <Container className={styles.footer}>
        <Button to={paths.projects}>Explore Our Projects</Button>
      </Container>
    </Section>
  );
}
