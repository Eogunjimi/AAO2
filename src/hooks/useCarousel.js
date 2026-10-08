'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './useMediaQuery';

/**
 * Headless carousel state: index management, optional autoplay (paused while
 * off-screen, hovered or when the OS prefers reduced motion) and swipe support.
 *
 * @param {Object} options
 * @param {number} options.length            Number of slides.
 * @param {number} [options.autoPlayMs]      Autoplay interval; 0 disables it.
 * @param {boolean} [options.active]         Autoplay only while true (e.g. in view).
 * @param {number} [options.swipeThreshold]  Minimum px travel to register a swipe.
 * @returns {{
 *   index: number,
 *   goTo: (index: number) => void,
 *   next: () => void,
 *   previous: () => void,
 *   pause: () => void,
 *   resume: () => void,
 *   swipeHandlers: {onPointerDown: Function, onPointerUp: Function, onPointerCancel: Function},
 * }}
 */
export function useCarousel({ length, autoPlayMs = 0, active = true, swipeThreshold = 50 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayReset, setAutoplayReset] = useState(0);
  const pointerStartX = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Derive the visible slide so the hook stays correct when `length` shrinks,
  // without an extra render pass to clamp state.
  const safeIndex = length > 0 ? Math.min(index, length - 1) : 0;

  const goTo = useCallback(
    (nextIndex) => {
      if (length <= 0) return;
      setIndex(((nextIndex % length) + length) % length);
      // Give a manually selected slide a full viewing interval before autoplay resumes.
      setAutoplayReset((current) => current + 1);
    },
    [length],
  );

  const next = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);
  const previous = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  useEffect(() => {
    if (!autoPlayMs || paused || !active || prefersReducedMotion || length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, paused, active, prefersReducedMotion, length, autoplayReset]);

  const onPointerDown = useCallback((event) => {
    pointerStartX.current = event.clientX;
  }, []);

  const onPointerUp = useCallback(
    (event) => {
      const startX = pointerStartX.current;
      pointerStartX.current = null;
      if (startX === null) return;

      const travelled = event.clientX - startX;
      if (Math.abs(travelled) < swipeThreshold) return;
      goTo(safeIndex + (travelled < 0 ? 1 : -1));
    },
    [goTo, safeIndex, swipeThreshold],
  );

  const onPointerCancel = useCallback(() => {
    pointerStartX.current = null;
  }, []);

  return {
    index: safeIndex,
    goTo,
    next,
    previous,
    pause,
    resume,
    swipeHandlers: { onPointerDown, onPointerUp, onPointerCancel },
  };
}
