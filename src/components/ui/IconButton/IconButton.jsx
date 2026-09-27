import { cn } from '@/lib/cn';

import styles from './IconButton.module.css';

/**
 * Round control used by carousels and sliders.
 *
 * @param {Object} props
 * @param {string} props.label Accessible name — never optional.
 * @param {'outline'|'floating'|'volt'} [props.variant]
 */
export function IconButton({ label, variant = 'outline', className, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(styles.button, styles[variant], className)}
      {...rest}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
