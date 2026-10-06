import { cn } from '@/lib/cn';

import styles from './FormSuccess.module.css';

/**
 * Confirmation panel shown in place of a form after a successful submission.
 *
 * @param {Object} props
 * @param {'light'|'dark'} [props.tone] Match the surface the form sits on.
 */
export function FormSuccess({
  title = 'Thank you! ✓',
  message = 'An AAO expert will contact you within 24 hours.',
  reference,
  onReset,
  tone = 'light',
  className,
}) {
  return (
    <div
      className={cn(styles.success, styles[tone], className)}
      role="status"
      aria-live="polite"
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {reference ? (
        <p className={styles.reference}>
          Your reference: <b>{reference}</b>
        </p>
      ) : null}
      {onReset ? (
        <button type="button" className={styles.reset} onClick={onReset}>
          Send another request
        </button>
      ) : null}
    </div>
  );
}
