import { Marquee } from '@/components/ui';
import { certifications } from '@/data/company';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

import styles from './PartnerStrip.module.css';

/**
 * Scrolling strip of accreditations and partner brands.
 *
 * Each entry shows its real logo when the data carries one, and a
 * wordmark-plus-descriptor lockup otherwise. The marquee is decorative, so the
 * names are repeated in a visually hidden list for assistive tech, and the
 * animation is held while the strip is off-screen.
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
          <span key={partner.id} className={styles.mark}>
            {partner.logo ? (
              <img
                className={styles.logo}
                src={partner.logo}
                alt={`${partner.name} logo`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <>
                <b className={styles.wordmark}>{partner.name}</b>
                <span className={styles.descriptor}>{partner.descriptor}</span>
              </>
            )}
          </span>
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
