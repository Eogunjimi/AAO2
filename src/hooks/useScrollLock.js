import { useEffect } from 'react';

/** Freeze body scrolling while an overlay (mobile nav, modal) is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
