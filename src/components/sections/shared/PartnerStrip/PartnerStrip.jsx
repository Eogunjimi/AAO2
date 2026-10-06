'use client';

import { useState } from 'react';

import { Marquee } from '@/components/ui';
import { certifications } from '@/data/company';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

import styles from './PartnerStrip.module.css';

/**
 * One mark in the strip.
 *
 * Shows the real logo when the data carries one and falls back to the
 * wordmark lockup otherwise — including when the file fails to load. That
 * second case matters: logo artwork arrives piecemeal and often has to be
 * re-exported, and a wrong path should degrade to legible text rather than a
 * broken-image icon sitting in the middle of the trust strip.
 *
 * @param {Object} props
 * @param {{id: string, name: string, descriptor: string, logo: ?string}} props.partner
 */
function PartnerMark({ partner }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(partner.logo) && !logoFailed;

  return (
    <span className={styles.mark}>
      {showLogo ? (
        <img
          className={styles.logo}
          src={partner.logo}
          alt={`${partner.name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <>
          <b className={styles.wordmark}>{partner.name}</b>
          <span className={styles.descriptor}>{partner.descriptor}</span>
        </>
      )}
    </span>
  );
}

/**
 * Scrolling strip of accreditations and partner brands.
 *
 * The marquee is decorative, so the names are repeated in a visually hidden
 * list for assistive tech, and the animation is held while the strip is
 * off-screen.
 *
 * @param {Object} props
 * @param {Array} [props.partners]
 * @param {number} [props.speed] Seconds per loop.
 */
export function PartnerStrip({ partners = certifications, speed = 38, className }) {
  const [ref, inView] = useInView({ threshold: 0 });

  return (
    <div ref={ref} className={cn(styles.strip, className)}>
      <Marquee speed={speed} paused={!inView} className={styles.marquee}>
        {partners.map((partner) => (
          <PartnerMark key={partner.id} partner={partner} />
        ))}
      </Marquee>

      <ul className={styles.srOnly}>
        {partners.map((partner) => (
          <li key={partner.id}>{`${partner.name} — ${partner.descriptor}`}</li>
        ))}
      </ul>
    </div>
  );
}
