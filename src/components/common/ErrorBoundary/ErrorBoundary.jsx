import { Component } from 'react';

import { Button, Container } from '@/components/ui';
import { company } from '@/data/company';
import { paths } from '@/routes/paths';

import styles from './ErrorBoundary.module.css';

/**
 * Catches render-time errors so a single broken section cannot blank the site.
 * In production this is where a Sentry/LogRocket call would live.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (!error) return children;
    if (fallback) return fallback;

    return (
      <Container className={styles.wrapper}>
        <p className={styles.eyebrow}>Something went wrong</p>
        <h1 className={styles.title}>We hit an unexpected error.</h1>
        <p className={styles.body}>
          Please refresh the page. If it keeps happening, call our team on{' '}
          <a href={company.phone.href}>{company.phone.display}</a> and we will help you straight
          away.
        </p>
        <div className={styles.actions}>
          <Button onClick={() => window.location.reload()}>Reload the page</Button>
          <Button to={paths.home} variant="ghost" onClick={this.handleReset}>
            Back to home
          </Button>
        </div>
      </Container>
    );
  }
}
