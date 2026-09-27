import { Link } from 'react-router-dom';

import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

import styles from './Logo.module.css';

/**
 * Wordmark + monogram, linking home.
 *
 * @param {Object} props
 * @param {'default'|'inverse'} [props.tone]
 */
export function Logo({ tone = 'default', className }) {
  return (
    <Link
      to={paths.home}
      className={cn(styles.logo, styles[tone], className)}
      aria-label={`${company.name} — home`}
    >
      <span className={styles.mark} aria-hidden="true">
        {company.shortName}
      </span>
      <span className={styles.text}>
        {company.shortName}
        <small className={styles.sub}>Engineering Services</small>
      </span>
    </Link>
  );
}
