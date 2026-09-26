import styles from './PageLoader.module.css';

/** Suspense fallback for lazily loaded routes. */
export function PageLoader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>Loading…</span>
    </div>
  );
}
