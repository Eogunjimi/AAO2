import Link from 'next/link';

import { Button, Container, Eyebrow, Reveal, Section } from '@/components/ui';
import { seasonalOffer } from '@/data/offer';
import { anchors, paths } from '@/routes/paths';

import styles from './OfferSection.module.css';

/** Seasonal solar promotion band. */
export function OfferSection() {
  return (
    <Section tone="ink" aria-labelledby="offer-title">
      <Container className={styles.grid}>
        <Reveal>
          <p className={styles.badge}>{seasonalOffer.badge}</p>
          <Eyebrow tone="volt">{seasonalOffer.eyebrow}</Eyebrow>
          <h2 id="offer-title" className={styles.title}>
            {seasonalOffer.title}
          </h2>
          <p className={styles.description}>
            {seasonalOffer.description.map((segment, index) =>
              typeof segment === 'string' ? segment : <em key={index}>{segment.em}</em>,
            )}
          </p>

          <ul className={styles.perks}>
            {seasonalOffer.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>

          <Button to={anchors.contact} variant="volt">
            {seasonalOffer.ctaLabel}
          </Button>
          <p className={styles.urgencyNote}>
            <em>{seasonalOffer.urgencyNote}</em>
          </p>

          <ul className={styles.packages}>
            {seasonalOffer.packages.map((item) => (
              <li key={item.title}>
                <Link href={paths.service(item.slug)} className={styles.package}>
                  {item.title}
                  <small>{item.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.image} delay={120}>
          <img
            src={seasonalOffer.image.src}
            alt={seasonalOffer.image.alt}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
