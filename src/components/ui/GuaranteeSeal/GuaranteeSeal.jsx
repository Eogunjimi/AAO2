import { useId } from 'react';

import { cn } from '@/lib/cn';

import styles from './GuaranteeSeal.module.css';

/** Beaded edge of the medal, laid out once at module scope. */
const BEAD_COUNT = 26;
const BEADS = Array.from({ length: BEAD_COUNT }, (_, index) => {
  const angle = (index / BEAD_COUNT) * 2 * Math.PI - Math.PI / 2;
  return {
    cx: Number((32 + 29.4 * Math.cos(angle)).toFixed(2)),
    cy: Number((32 + 29.4 * Math.sin(angle)).toFixed(2)),
  };
});

/**
 * Gold guarantee medal. Drawn as an SVG so it stays crisp at any size and
 * picks up the brand colours from the design tokens.
 *
 * @param {Object} props
 * @param {string} props.monogram Short mark in the middle, e.g. "AAO".
 * @param {string} props.label    Accessible name for the medal.
 * @param {number|string} [props.since]  Year printed under the monogram.
 * @param {string} [props.banner] Word on the ribbon.
 * @param {number} [props.size]
 */
export function GuaranteeSeal({
  monogram,
  label,
  since,
  banner = 'Guaranteed',
  size = 64,
  className,
}) {
  const gradientId = `${useId()}-gold`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={cn(styles.seal, className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0.1" y1="0" x2="0.75" y2="1">
          <stop offset="0%" className={styles.stopLight} />
          <stop offset="45%" className={styles.stopMid} />
          <stop offset="100%" className={styles.stopDeep} />
        </linearGradient>
      </defs>

      <g fill={`url(#${gradientId})`}>
        {BEADS.map((bead) => (
          <circle key={`${bead.cx}-${bead.cy}`} cx={bead.cx} cy={bead.cy} r="2.25" />
        ))}
        <circle cx="32" cy="32" r="29.4" />
      </g>

      <circle cx="32" cy="32" r="26.4" className={styles.rim} />
      <circle cx="32" cy="32" r="20.6" className={styles.field} />
      <circle cx="32" cy="32" r="18.4" className={styles.fieldRing} />

      <text x="32" y={since ? 31.5 : 35.5} className={styles.monogram}>
        {monogram}
      </text>
      {since ? (
        <text x="32" y="39.5" className={styles.since}>
          Est. {since}
        </text>
      ) : null}

      <path
        d="M3.5 45.5 L60.5 45.5 L54.5 50.2 L60.5 55 L3.5 55 L9.5 50.2 Z"
        className={styles.ribbon}
      />
      <text x="32" y="52.1" className={styles.banner}>
        {banner}
      </text>
    </svg>
  );
}
