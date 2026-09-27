import { Link } from 'react-router-dom';

import { Container, Eyebrow, Icon, Reveal, Stars } from '@/components/ui';
import { trustChips } from '@/data/company';
import { paths } from '@/routes/paths';

import styles from './ServiceHero.module.css';

const INSTALLS = trustChips.find((chip) => chip.id === 'installs');

const REVIEW_BADGES = [
  { id: 'google', label: 'Google Reviews' },
  { id: 'facebook', label: 'Facebook Reviews' },
];

/**
 * Service hero: the service photograph as a full-bleed background, with the
 * headline, promise and the proof badges over it.
 *
 * @param {Object} props
 * @param {import('@/data/services').Service} props.service
 * @param {ReturnType<typeof import('@/lib/services').getServicePage>} props.page
 */
export function ServiceHero({ service, page }) {
  return (
    <section className={styles.hero} aria-labelledby="service-title">
      <img className={styles.backdrop} src={page.heroImage} alt="" aria-hidden="true" />
      <span className={styles.scrim} aria-hidden="true" />

      <Container className={styles.inner}>
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

          <Eyebrow tone="volt">{service.category}</Eyebrow>

          <h1 id="service-title" className={styles.title}>
            {page.heroTitle}
          </h1>
          <p className={styles.subtitle}>{page.heroSubtitle}</p>

          <ul className={styles.badges}>
            {REVIEW_BADGES.map((badge) => (
              <li key={badge.id} className={styles.badge}>
                <Icon name={badge.id} size={18} />
                <b>5.0</b>
                <Stars rating={5} />
                <span className={styles.badgeLabel}>{badge.label}</span>
              </li>
            ))}

            <li className={styles.badge}>
              <b className={styles.count}>{INSTALLS.value}</b>
              <span className={styles.badgeLabel}>{INSTALLS.label}</span>
            </li>
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
