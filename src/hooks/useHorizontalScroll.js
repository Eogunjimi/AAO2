'use client';

import { useCallback, useRef } from 'react';

/** Width of one item in the rail: the first child plus the row's column gap. */
function itemWidth(rail) {
  const item = rail.firstElementChild;
  if (!item) return rail.clientWidth;

  const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
  return item.getBoundingClientRect().width + gap;
}

/**
 * Imperative helpers for a horizontally scrollable rail (scroll-snap row).
 *
 * With no `step` the rail advances by exactly one item, measured from the DOM,
 * so the controls stay correct when the card width changes across breakpoints.
 *
 * @param {number} [step] Fixed pixel distance per activation.
 */
export function useHorizontalScroll(step) {
  const ref = useRef(null);

  const scrollByDirection = useCallback(
    (direction) => {
      const rail = ref.current;
      if (!rail) return;

      const distance = step ?? itemWidth(rail);
      rail.scrollBy({ left: direction * distance, behavior: 'smooth' });
    },
    [step],
  );

  const scrollNext = useCallback(() => scrollByDirection(1), [scrollByDirection]);
  const scrollPrevious = useCallback(() => scrollByDirection(-1), [scrollByDirection]);

  return { ref, scrollNext, scrollPrevious };
}
