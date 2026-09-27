import { Children } from 'react';

import { cn } from '@/lib/cn';

import styles from './Marquee.module.css';

/**
 * Infinite horizontal marquee.
 *
 * The children are rendered twice and the track is translated by -50%, which
 * produces a seamless loop without measuring anything. The duplicate is hidden
 * from assistive tech, and the whole strip is decorative by default.
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

  return (
    <div
      className={cn(
        styles.viewport,
        pauseOnHover && styles.pausable,
        paused && styles.paused,
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
