'use client';

import { useEffect, useRef } from 'react';

/**
 * Attach an event listener with a stable handler reference.
 *
 * @param {string} eventName
 * @param {(event: Event) => void} handler
 * @param {EventTarget|null} [target] Defaults to `window`.
 */
export function useEventListener(eventName, handler, target) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = target ?? (typeof window !== 'undefined' ? window : null);
    if (!element?.addEventListener) return undefined;

    const listener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, listener);
    return () => element.removeEventListener(eventName, listener);
  }, [eventName, target]);
}
