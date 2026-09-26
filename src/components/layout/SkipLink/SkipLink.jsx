import styles from './SkipLink.module.css';

/** Keyboard shortcut past the navigation, visible only when focused. */
export function SkipLink({ targetId = 'main-content' }) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
