'use client';

import { Seo } from '@/components/common/Seo';
import { Button, Container, Eyebrow, Icon } from '@/components/ui';
import { company, primaryCtaLabel } from '@/data/company';
import { upcomingPages } from '@/data/pages';
import { anchors } from '@/routes/paths';

import styles from './ComingSoonPage.module.css';

/**
 * Placeholder for a navigation destination that is announced but not built yet.
 *
 * @param {Object} props
 * @param {keyof typeof upcomingPages} props.pageKey
 */
export default function ComingSoonPage({ pageKey }) {
  const page = upcomingPages[pageKey];

  return (
    <>
      <Seo title={`${page.title} — coming soon`} description={page.body} noIndex />

      <Container className={styles.wrapper}>
        <Eyebrow>Coming soon</Eyebrow>
        <h1 className={styles.title}>{page.heading}</h1>
        <p className={styles.body}>{page.body}</p>

        <ul className={styles.points}>
          {page.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button to={anchors.contact}>{primaryCtaLabel}</Button>
          <Button href={company.phone.whatsapp} variant="whatsapp">
            <Icon name="whatsapp" size={17} />
            Chat on WhatsApp
          </Button>
        </div>

        <p className={styles.note}>
          Want to be first to hear? Email <a href={`mailto:${company.email}`}>{company.email}</a> or
          call <a href={company.phone.href}>{company.phone.display}</a>.
        </p>
      </Container>
    </>
  );
}
