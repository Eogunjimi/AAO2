import { QuoteForm } from '@/components/forms/QuoteForm';
import { Button, Chip, Container, Eyebrow, ImageSlider, Reveal } from '@/components/ui';
import { company, trustChips } from '@/data/company';
import { heroSlides } from '@/data/projects';
import { anchors, paths } from '@/routes/paths';

import styles from './HeroSection.module.css';

/** Above-the-fold value proposition, imagery and quick quote form. */
export function HeroSection() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <Container className={styles.grid}>
        <Reveal>
          <Eyebrow>
            {company.name} — {company.address.display}
          </Eyebrow>
          <h1 id="hero-title" className={styles.title}>
            Power &amp; Security Solutions for Homes and Businesses That Demand <em>Reliability</em>
          </h1>
          <p className={styles.subtitle}>
            Professionally designed solar, electrical, CCTV, and security systems built to give you
            dependable power, better protection, and lasting peace of mind.
          </p>

          <div className={styles.actions}>
            <Button to={anchors.contact} variant="volt">
              Get Your Free Site Inspection
            </Button>
            <Button to={paths.services} variant="ghost">
              Explore Services
            </Button>
          </div>

          <ul className={styles.chips}>
            {trustChips.map((chip) => (
              <li key={chip.id}>
                <Chip>
                  {chip.starred ? (
                    <span className="star" aria-hidden="true">
                      ★
                    </span>
                  ) : null}
                  {chip.value ? <b>{chip.value}</b> : null} {chip.label}
                </Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <ImageSlider
            slides={heroSlides}
            label="Recent AAO installations"
            showDots
            loading="eager"
          />
          <QuoteForm />
        </Reveal>
      </Container>
    </section>
  );
}
