import { useCallback, useRef } from 'react';

/**
 * Imperative helpers for a horizontally scrollable rail (scroll-snap row).
 *
 * @param {number} [step] Pixels to travel per activation.
 */
export function useHorizontalScroll(step = 324) {
  const ref = useRef(null);

  const scrollBy = useCallback((amount) => {
    ref.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  const scrollNext = useCallback(() => scrollBy(step), [scrollBy, step]);
  const scrollPrevious = useCallback(() => scrollBy(-step), [scrollBy, step]);

  return { ref, scrollNext, scrollPrevious };
}
