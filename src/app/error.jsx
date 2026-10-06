'use client';

import { useEffect } from 'react';

import { Button, Container } from '@/components/ui';
import { company } from '@/data/company';
import { paths } from '@/routes/paths';

import styles from './error.module.css';

/**
 * Route-level error boundary — the App Router's replacement for the SPA's
 * `<ErrorBoundary />` class component. Next renders it in place of the page
 * when a render throws, keeping the header, footer and navigation alive.
 *
 * @param {Object} props
 * @param {Error} props.error
 * @param {() => void} props.reset Re-renders the segment.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // In production this is where a Sentry/LogRocket call would live.
    console.error('[app/error]', error);
  }, [error]);

  return (
    <Container className={styles.wrapper}>
      <p className={styles.eyebrow}>Something went wrong</p>
      <h1 className={styles.title}>We hit an unexpected error.</h1>
      <p className={styles.body}>
        Please try again. If it keeps happening, call our team on{' '}
        <a href={company.phone.href}>{company.phone.display}</a> and we will help you straight away.
      </p>
      <div className={styles.actions}>
        <Button onClick={reset}>Try again</Button>
        <Button to={paths.home} variant="ghost">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
