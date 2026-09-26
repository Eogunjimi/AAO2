import styles from './RadialBackdrop.module.css';

/**
 * Decorative concentric rings + glow used behind the contact and service-area
 * bands. Purely presentational, hidden from assistive technology.
 */
export function RadialBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <span className={styles.ring} />
      <span className={`${styles.ring} ${styles.ringTwo}`} />
      <span className={`${styles.ring} ${styles.ringThree}`} />
      <span className={styles.glow} />
    </div>
  );
}
