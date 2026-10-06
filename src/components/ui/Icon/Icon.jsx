import { cn } from '@/lib/cn';

import styles from './Icon.module.css';
import { icons } from './icons';

/** A registry path is either a bare `d` string or `{ d, fill }`. */
const pathData = (path) => (typeof path === 'string' ? path : path.d);

/**
 * Renders an inline SVG from the icon registry.
 *
 * @param {Object} props
 * @param {keyof typeof icons} props.name
 * @param {number|string} [props.size]
 * @param {boolean} [props.brand] Paint the icon in its brand colours instead
 *   of currentColor. Only has an effect on marks that define per-path fills.
 * @param {string} [props.title] Provide to expose the icon to assistive tech.
 */
export function Icon({ name, size = 24, brand = false, title, className, ...rest }) {
  const icon = icons[name];

  if (!icon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon "${name}"`);
    }
    return null;
  }

  // Monochrome marks ignore `brand` entirely and keep inheriting currentColor.
  const colored = brand && icon.paths.some((path) => typeof path === 'object' && path.fill);
  const tone = colored ? styles.brand : icon.filled ? styles.filled : styles.stroked;

  return (
    <svg
      viewBox={icon.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      className={cn(styles.icon, tone, className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {icon.paths.map((path) => (
        <path key={pathData(path)} d={pathData(path)} fill={colored ? path.fill : undefined} />
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
