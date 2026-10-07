'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a CSS media query.
 *
 * Implemented with `useSyncExternalStore` so React stays in sync with the
 * browser without an effect-driven `setState` round trip.
 *
 * @param {string} query e.g. `(max-width: 900px)`
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia?.(query);
      if (!mediaQueryList?.addEventListener) return () => {};

      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia?.(query).matches ?? false, [query]);

  // Server snapshot: assume the query does not match until hydrated.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when the visitor asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
