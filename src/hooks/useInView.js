import { useEffect, useRef, useState } from 'react';

const SUPPORTS_OBSERVER = typeof IntersectionObserver !== 'undefined';

/**
 * Observe an element's intersection with the viewport.
 *
 * When `IntersectionObserver` is unavailable the element is reported as visible
 * so content is never hidden behind a missing browser API.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold]
 * @param {string} [options.rootMargin]
 * @param {boolean} [options.once] Stop observing after the first intersection.
 * @returns {[React.RefObject<HTMLElement>, boolean]}
 */
export function useInView({ threshold = 0.2, rootMargin = '0px', once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(!SUPPORTS_OBSERVER);

  useEffect(() => {
    const element = ref.current;
    if (!element || !SUPPORTS_OBSERVER) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
