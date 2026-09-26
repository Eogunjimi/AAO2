import { Link } from 'react-router-dom';

import { Chip, Container, Eyebrow, Reveal } from '@/components/ui';
import { trustChips } from '@/data/company';
import { paths } from '@/routes/paths';

import styles from './ServiceHero.module.css';

const HERO_CHIPS = trustChips.filter((chip) =>
  ['google', 'facebook', 'installs', 'technicians'].includes(chip.id),
);

/** Service detail hero with breadcrumb, headline and supporting image. */
export function ServiceHero({ service }) {
  return (
    <section className={styles.hero} aria-labelledby="service-title">
      <Container className={styles.grid}>
        <Reveal>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link to={paths.home}>Home</Link>
              </li>
              <li>
                <Link to={paths.services}>Services</Link>
              </li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <Eyebrow>{service.category}</Eyebrow>
          <h1 id="service-title" className={styles.title}>
            {service.headline}
          </h1>
          <p className={styles.summary}>{service.summary}</p>

          <ul className={styles.chips}>
            {HERO_CHIPS.map((chip) => (
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

        <Reveal className={styles.image} delay={100}>
          <img src={service.image} alt={service.title} loading="eager" decoding="async" />
        </Reveal>
      </Container>
    </section>
  );
}
