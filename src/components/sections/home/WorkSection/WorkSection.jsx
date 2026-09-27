import { Button, Container, ImageSlider, Reveal, Section, SectionHeading } from '@/components/ui';
import { projectCaption, projects } from '@/data/projects';
import { paths } from '@/routes/paths';

import styles from './WorkSection.module.css';

/** Captions are derived once: the data keeps title and location apart. */
const slides = projects.map((project) => ({ ...project, caption: projectCaption(project) }));

/** Completed project slider. */
export function WorkSection() {
  return (
    <Section id="work" tone="wash" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          size="compact"
          align="center"
          title="Our work speaks for itself"
          description="200+ Installations • Neat Workmanship • Reliable Results"
        />

        <Reveal>
          <ImageSlider
            slides={slides}
            label="Completed AAO projects"
            autoPlayMs={6000}
            ratio="16/7.5"
            className={styles.slider}
          />
        </Reveal>

        <div className={styles.footer}>
          <Button to={paths.projects} variant="ghost">
            Explore Our Projects
          </Button>
        </div>
      </Container>
    </Section>
  );
}
