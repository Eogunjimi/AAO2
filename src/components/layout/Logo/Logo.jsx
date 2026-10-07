import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';
import { Link } from '@/lib/router';

import { AaoMark } from './AaoMark';
import styles from './Logo.module.css';

/**
 * Logo lockup — AAO gear/sun mark + wordmark, linking home.
 *
 * The mark is the client's supplied logo (green gear with yellow sun
 * core) served from `/public/images/aao-logo.svg`. The wordmark keeps
 * the "AAO / Engineering Services" text alongside the pictorial mark so
 * the brand name stays legible.
 *
 * @param {Object} props
 * @param {'default'|'inverse'} [props.tone] Toggles wordmark colour for
 *   dark backgrounds (e.g. the footer). The mark SVG carries its own
 *   colours and reads on either background.
 */
export function Logo({ tone = 'default', className }) {
  return (
    <Link
      to={paths.home}
      className={cn(styles.logo, styles[tone], className)}
      aria-label={`${company.name} — home`}
    >
      <span className={styles.mark} aria-hidden="true">
        <AaoMark className={styles.markImage} title="" />
      </span>
      <span className={styles.text}>
        {company.shortName}
        <small className={styles.sub}>Engineering Services</small>
      </span>
    </Link>
  );
}
