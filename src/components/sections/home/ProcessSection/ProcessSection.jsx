import { Button, Chip, Container, Reveal, Section, SectionHeading } from '@/components/ui';
import { processSteps as defaultSteps } from '@/data/process';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';
import { anchors } from '@/routes/paths';

import styles from './ProcessSection.module.css';

const AUTOPLAY_MS = 4000;

/**
 * Auto-advancing delivery timeline.
 *
 * Shared between the home page and the service pages: pass `steps` to describe
 * a single service, and drop the footer to keep that version focused on the
 * process alone.
 *
 * @param {Object} props
 * @param {Array} [props.steps]
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.subtitle] Bold line under the title.
 * @param {string} [props.id]
 * @param {boolean} [props.showFooter] Median line and call-to-action links.
 */
export function ProcessSection({
  steps = defaultSteps,
  title = (
    <>
      How We Work, <em>Start to Finish</em>
    </>
  ),
  subtitle = 'From site visit to switch-on — with no surprises',
  id = 'process',
  showFooter = true,
}) {
  const isDesktop = useMediaQuery('(min-width: 901px)');
  const [timelineRef, inView] = useInView({ threshold: 0.3 });
  const { index, goTo } = useCarousel({
    length: steps.length,
    autoPlayMs: AUTOPLAY_MS,
    active: inView,
  });

  const activeStep = steps[index];

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading
          id={`${id}-title`}
          align="center"
          title={title}
          subtitle={subtitle}
          className={styles.heading}
        />

        <Reveal>
          <ol className={styles.row} ref={timelineRef}>
            {steps.map((step, stepIndex) => {
              const isActive = stepIndex === index;
              return (
                <li key={step.id} className={cn(styles.step, isActive && styles.stepActive)}>
                  <button
                    type="button"
                    className={styles.stepButton}
                    aria-current={isActive}
                    onClick={() => goTo(stepIndex)}
                    onMouseEnter={() => isDesktop && goTo(stepIndex)}
                  >
                    <span className={styles.top}>
                      <span className={styles.number}>{step.number}</span>
                      <span className={styles.line} aria-hidden="true" />
                    </span>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span className={styles.duration}>{step.duration}</span>
                    <span className={styles.tagWrap}>
                      <Chip tone={step.tag.highlight ? 'highlight' : 'default'}>
                        {step.tag.label}
                      </Chip>
                    </span>
                    <span className={styles.bar} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <p key={activeStep.id} className={styles.description} aria-live="polite">
          <b>{activeStep.number}</b> · {activeStep.description}
        </p>

        {showFooter ? (
          <>
            <p className={styles.median}>
              Median: same-week site visit · 3-day installation · 200+ homes and business powered
            </p>

            <div className={styles.links}>
              <Button to={anchors.contact}>Book Your Free Site Visit</Button>
            </div>
          </>
        ) : null}
      </Container>
    </Section>
  );
}
