'use client';

import { useEffect } from 'react';
import { useLocation } from '@/lib/router';

/**
 * Restores browser-like scrolling to the SPA:
 *  - navigating to a new path scrolls to the top,
 *  - navigating to `/#section` scrolls that section into view (once it exists).
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));

    // The target section may mount a frame later (lazy routes, images, …).
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
