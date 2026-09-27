import { Seo } from '@/components/common/Seo';
import { ContactSection } from '@/components/sections/home';
import { Button, Chip, Container, Eyebrow, Reveal, Section } from '@/components/ui';
import { primaryCtaLabel } from '@/data/company';
import { projects } from '@/data/projects';
import { paths } from '@/routes/paths';

import styles from './ProjectsPage.module.css';

/** Gallery of completed installations. */
export default function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects — completed solar, security and electrical installations"
        description="See completed AAO Engineering Services installations across Lagos: solar and inverter systems, CCTV, electrical rewires, automatic gates and commercial hybrid power."
      />

      <Section aria-labelledby="projects-title">
        <Container>
          <Reveal className={styles.intro}>
            <Eyebrow>Our Work</Eyebrow>
            <h1 id="projects-title" className={styles.title}>
              Our work speaks for itself
            </h1>
            <p className={styles.lead}>
              200+ installations across Lagos — solar and inverter systems, CCTV and access control,
              electrical rewires and automation. Here is a selection of recent jobs.
            </p>
          </Reveal>

          <ul className={styles.grid}>
            {projects.map((project, index) => (
              <Reveal as="li" key={project.id} className={styles.card} delay={index * 70}>
                <article>
                  <div className={styles.media}>
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>

                  <div className={styles.body}>
                    <Chip>{project.category}</Chip>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    <p className={styles.location}>{project.location}</p>
                    <p className={styles.summary}>{project.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className={styles.footer}>
            <p className={styles.footerText}>
              Every job starts the same way: a free site inspection and an honest assessment of what
              you actually need.
            </p>
            <div className={styles.actions}>
              {/* The form is further down this page, so stay on it. */}
              <Button to="#contact">{primaryCtaLabel}</Button>
              <Button to={paths.services} variant="ghost">
                Browse our services
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactSection />
    </>
  );
}
