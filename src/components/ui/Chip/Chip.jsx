import { Link } from '@/lib/router';

import { cn } from '@/lib/cn';

import styles from './Chip.module.css';

/**
 * Rounded label. Becomes a link when `to` is provided.
 *
 * @param {Object} props
 * @param {'default'|'outline'|'dark'|'highlight'} [props.tone]
 */
export function Chip({ to, tone = 'default', className, children, ...rest }) {
  const classes = cn(styles.chip, styles[tone], to && styles.interactive, className);

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
