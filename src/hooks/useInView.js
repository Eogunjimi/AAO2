'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Observe an element's intersection with the viewport.
 *
 * Hydration-safe: the server and the very first client render always report
 * the element as *visible* so the HTML sent to crawlers / no-JS visitors is
 * complete and React does not warn about mismatched markup. After mount an
 * IntersectionObserver takes over, and elements that are actually off-screen
 * flip to the hidden state on the next frame — at which point the CSS
 * reveal/transition kicks in when they scroll into view.
 *
 * When `IntersectionObserver` is unavailable (very old browsers) the element
 * stays visible forever, so content is never hidden behind a missing API.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold]
 * @param {string} [options.rootMargin]
 * @param {boolean} [options.once] Stop observing after the first intersection.
 * @returns {[React.RefObject<HTMLElement>, boolean]}
 */
export function useInView({ threshold = 0.2, rootMargin = '0px', once = false } = {}) {
  const ref = useRef(null);

  // Start as visible on BOTH server and first client render to match markup.
  // The observer corrects this after hydration.
  const [inView, setInView] = useState(true);
  // We only want the observer to start flipping the state after the component
  // has mounted, otherwise the very first paint above-the-fold would briefly
  // render as hidden and then back to visible.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;
    const element = ref.current;
    // If IntersectionObserver is unsupported (old browsers / SSR edge), leave
    // content visible.
    if (typeof IntersectionObserver === 'undefined' || !element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [mounted, threshold, rootMargin, once]);

  return [ref, inView];
}
