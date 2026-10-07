'use client';

import { Children, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

import styles from './Marquee.module.css';

/**
 * Infinite horizontal marquee.
 *
 * The children are rendered twice and the track is translated by -50%, which
 * produces a seamless loop without measuring anything. The duplicate is hidden
 * from assistive tech, and the whole strip is decorative by default.
 *
 * `paused` is respected after mount only: during server render and the first
 * client paint the marquee always runs, so the HTML matches across hydration
 * (applying a paused class on the first frame would otherwise cause a
 * hydration mismatch for every off-screen strip). After mount, if `paused` is
 * true we add the class and the animation stops.
 *
 * @param {Object} props
 * @param {number} [props.speed] Duration of one loop in seconds.
 * @param {boolean} [props.pauseOnHover]
 * @param {boolean} [props.paused] Hold the animation — e.g. while off-screen.
 */
export function Marquee({
  speed = 32,
  pauseOnHover = true,
  paused = false,
  className,
  children,
  ...rest
}) {
  const items = Children.toArray(children);
  // Mirror Reveal: the class is only applied after mount so SSR and the
  // first client paint agree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        styles.viewport,
        pauseOnHover && styles.pausable,
        mounted && paused && styles.paused,
        className,
      )}
      aria-hidden="true"
      {...rest}
    >
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        <div className={styles.group}>{items}</div>
        <div className={styles.group}>{items}</div>
      </div>
    </div>
  );
}
