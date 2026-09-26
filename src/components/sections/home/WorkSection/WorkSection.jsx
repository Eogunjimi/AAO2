import { Button, Container, ImageSlider, Reveal, Section, SectionHeading } from '@/components/ui';
import { projects } from '@/data/projects';
import { anchors } from '@/routes/paths';

import styles from './WorkSection.module.css';

/** Completed project slider. */
export function WorkSection() {
  return (
    <Section id="work" tone="wash" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          align="center"
          eyebrow="Our Work"
          title="Our work speaks for itself"
          description="200+ Installations • Neat Workmanship • Reliable Results"
        />

        <Reveal>
          <ImageSlider
            slides={projects}
            label="Completed AAO projects"
            autoPlayMs={6000}
            ratio="16/7.5"
            className={styles.slider}
          />
        </Reveal>

        <div className={styles.footer}>
          <Button to={anchors.contact} variant="ghost">
            Explore Our Projects
          </Button>
        </div>
      </Container>
    </Section>
  );
}
