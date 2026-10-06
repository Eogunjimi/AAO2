'use client';

import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';

import styles from './Reveal.module.css';

/**
 * Fades content in the first time it scrolls into view — the React equivalent
 * of the original `[data-reveal]` IntersectionObserver script, with motion
 * preferences respected.
 *
 * Starts *visible* on both the server and the client's first render. Two
 * reasons: the two must agree or hydration fails, and the prerendered HTML
 * should be readable before any JavaScript runs rather than sitting at
 * `opacity: 0`. Once mounted, the observer hides anything that is off-screen —
 * invisible to the visitor by definition — and fades it in as they reach it.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as]
 * @param {number} [props.delay] Delay in milliseconds.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, once: true, initial: true });
  const visible = inView || prefersReducedMotion;

  return (
    <Tag
      ref={ref}
      className={cn(styles.reveal, visible && styles.visible, className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
