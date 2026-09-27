import { cn } from '@/lib/cn';

import styles from './Stars.module.css';

/**
 * Star rating with an accessible text equivalent.
 *
 * @param {Object} props
 * @param {number} [props.rating] 1–5
 */
export function Stars({ rating = 5, className }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className={cn(styles.stars, className)}>
      <span aria-hidden="true">{'★'.repeat(rounded)}</span>
      <span className={styles.srOnly}>{rounded} out of 5 stars</span>
    </span>
  );
}
