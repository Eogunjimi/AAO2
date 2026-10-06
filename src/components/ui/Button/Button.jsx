import Link from 'next/link';

import { cn } from '@/lib/cn';

import styles from './Button.module.css';

/**
 * The single call-to-action primitive.
 *
 * Renders a Next `<Link>` when `to` is given, an `<a>` when `href` is given
 * (external links, `tel:` and `mailto:`), and a `<button>` otherwise — so
 * markup semantics always match the action.
 *
 * The `to` / `href` split is deliberate and predates the Next migration: `to`
 * means "a route on this site" and gets client-side navigation plus
 * prefetching, `href` means "a raw URL" and is emitted verbatim. Keeping both
 * is what lets the component decide between `<Link>` and `<a>` without
 * guessing from the string.
 *
 * @param {Object} props
 * @param {string} [props.to]   Internal route — rendered with next/link.
 * @param {string} [props.href] External URL, `tel:` or `mailto:`.
 * @param {'solid'|'volt'|'whatsapp'|'ghost'|'ghost-light'} [props.variant]
 * @param {'sm'|'md'} [props.size]
 * @param {boolean} [props.block] Stretch to the container width.
 */
export function Button({
  to,
  href,
  variant = 'solid',
  size = 'md',
  block = false,
  type,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    block && styles.block,
    className,
  );

  if (to) {
    return (
      <Link href={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
}
