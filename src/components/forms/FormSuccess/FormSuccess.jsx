import { cn } from '@/lib/cn';

import styles from './FormSuccess.module.css';

/**
 * Confirmation panel shown in place of a form after a successful submission.
 */
export function FormSuccess({
  title = 'Thank you! ✓',
  message = 'An AAO expert will contact you within 24 hours.',
  onReset,
  className,
}) {
  return (
    <div className={cn(styles.success, className)} role="status" aria-live="polite">
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onReset ? (
        <button type="button" className={styles.reset} onClick={onReset}>
          Send another request
        </button>
      ) : null}
    </div>
  );
}
