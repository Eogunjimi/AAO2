import { cn } from '@/lib/cn';

import styles from './Icon.module.css';
import { icons } from './icons';

/**
 * Renders an inline SVG from the icon registry.
 *
 * @param {Object} props
 * @param {keyof typeof icons} props.name
 * @param {number|string} [props.size]
 * @param {string} [props.title] Provide to expose the icon to assistive tech.
 */
export function Icon({ name, size = 24, title, className, ...rest }) {
  const icon = icons[name];

  if (!icon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon "${name}"`);
    }
    return null;
  }

  return (
    <svg
      viewBox={icon.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      className={cn(styles.icon, icon.filled ? styles.filled : styles.stroked, className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {icon.circles?.map((circle) => (
        <circle key={`${circle.cx}-${circle.cy}-${circle.r}`} {...circle} />
      ))}
      {icon.rects?.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} {...rect} />
      ))}
    </svg>
  );
}
