import Link from 'next/link';

import { Button, Container, Eyebrow } from '@/components/ui';
import { company } from '@/data/company';
import { services } from '@/data/services';
import { anchors, paths } from '@/routes/paths';

import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for has moved.',
  robots: { index: false, follow: false },
};

/**
 * 404 page with useful onward journeys.
 *
 * Next serves this with a real HTTP 404 for any unmatched route, and for the
 * `notFound()` calls in the slug routes — the SPA could only ever answer 200.
 */
export default function NotFound() {
  return (
    <Container className={styles.wrapper}>
      <Eyebrow>Error 404</Eyebrow>
      <h1 className={styles.title}>We couldn’t find that page.</h1>
      <p className={styles.body}>
        It may have moved or never existed. Try one of our most requested services, or call{' '}
        <a href={company.phone.href}>{company.phone.display}</a> and we will point you in the right
        direction.
      </p>

      <div className={styles.actions}>
        <Button to={paths.home}>Back to home</Button>
        <Button to={anchors.contact} variant="ghost">
          Book a free site inspection
        </Button>
      </div>

      <ul className={styles.links}>
        {services.slice(0, 6).map((service) => (
          <li key={service.slug}>
            <Link href={paths.service(service.slug)}>{service.title} →</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
