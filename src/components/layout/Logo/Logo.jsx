import { useState } from 'react';
import { Link } from 'react-router-dom';

import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

import styles from './Logo.module.css';

import { Img } from '@/components/ui/Img';

/**
 * Brand artwork, linking home, with a text fallback if the image is unavailable.
 *
 * @param {Object} props
 * @param {'default'|'inverse'} [props.tone]
 */
export function Logo({ tone = 'default', className }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      to={paths.home}
      className={cn(styles.logo, styles[tone], className)}
      aria-label={`${company.name} — home`}
    >
      {imageFailed ? (
        <span className={styles.mark} aria-hidden="true">
          {company.shortName}
        </span>
      ) : (
        <Img
          className={styles.artwork}
          src="https://i.postimg.cc/FHPBJyKm/AAO-engineering-logo.png"
          // Matches the fixed 48px box in Logo.module.css (object-fit: contain), so the
          // browser reserves the same space it already uses. Rendering is unchanged.
          width={48}
          height={48}
          alt=""
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}
      <span className={styles.text}>
        {company.shortName}
        <small className={styles.sub}>Engineering Services</small>
      </span>
    </Link>
  );
}
