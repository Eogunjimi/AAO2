import Link from 'next/link';

import { Container, Eyebrow, Icon, Reveal, Stars } from '@/components/ui';
import { trustChips } from '@/data/company';

import styles from './PageHero.module.css';

const INSTALLS = trustChips.find((chip) => chip.id === 'installs');

const REVIEW_BADGES = [
  { id: 'google', label: 'Google Reviews' },
  { id: 'facebook', label: 'Facebook Reviews' },
];

/**
 * The headline with its leading keyword picked out, e.g.
 * "**Solar & Inverter Installation** in Ikoyi That Runs Without the Generator".
 * The full string stays intact for search engines and screen readers.
 */
function Headline({ title, keyword }) {
  if (!keyword || !title.startsWith(keyword)) return title;

  return (
    <>
      <em>{keyword}</em>
      {title.slice(keyword.length)}
    </>
  );
}

/**
 * Full-bleed hero shared by the service, service-area and projects pages:
 * a photograph, the headline, a one-line promise and the proof badges.
 *
 * @param {Object} props
 * @param {string} props.id        Id for the heading, used by aria-labelledby.
 * @param {string} props.title
 * @param {string} [props.keyword] Leading phrase of the title, accented.
 * @param {string} props.subtitle
 * @param {string} props.image
 * @param {string} [props.eyebrow]
 * @param {Array<{label: string, to?: string}>} [props.breadcrumb]
 */
export function PageHero({ id, title, keyword, subtitle, image, eyebrow, breadcrumb }) {
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <img className={styles.backdrop} src={image} alt="" aria-hidden="true" />
      <span className={styles.scrim} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal>
          {breadcrumb ? (
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol>
                {breadcrumb.map((crumb) => (
                  <li key={crumb.label} aria-current={crumb.to ? undefined : 'page'}>
                    {crumb.to ? <Link href={crumb.to}>{crumb.label}</Link> : crumb.label}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? <Eyebrow tone="volt">{eyebrow}</Eyebrow> : null}

          <h1 id={id} className={styles.title}>
            <Headline title={title} keyword={keyword} />
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>

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
