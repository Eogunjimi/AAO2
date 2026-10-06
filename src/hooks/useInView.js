import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * Whether the environment supports `IntersectionObserver`.
 *
 * Read through `useSyncExternalStore` rather than during render. The answer
 * differs between the server (no such global) and the browser (has one), and
 * branching on it while rendering is precisely what breaks hydration. The
 * store's server snapshot deliberately claims support so the first client
 * render is byte-identical to the prerendered HTML; the real answer is applied
 * immediately afterwards, which React handles without a mismatch.
 *
 * Support cannot change during a session, so the store never notifies.
 */
const subscribeNever = () => () => {};
const getObserverSupport = () => typeof IntersectionObserver !== 'undefined';
const assumeObserverSupport = () => true;

/**
 * Observe an element's intersection with the viewport.
 *
 * The first render returns `initial` and nothing else — no feature detection,
 * no `typeof window`. Everything environment-dependent happens after mount, so
 * the server HTML and the browser's first render always agree.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold]
 * @param {string} [options.rootMargin]
 * @param {boolean} [options.once] Stop observing after the first intersection.
 * @param {boolean} [options.initial] Value for the first render, server and
 *   client alike. Pass `true` for anything that controls visibility, so the
 *   content is painted before JavaScript arrives.
 * @returns {[React.RefObject<HTMLElement>, boolean]}
 */
export function useInView({
  threshold = 0.2,
  rootMargin = '0px',
  once = false,
  initial = false,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(initial);
  const supported = useSyncExternalStore(subscribeNever, getObserverSupport, assumeObserverSupport);

  useEffect(() => {
    const element = ref.current;
    if (!element || !supported) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [supported, threshold, rootMargin, once]);

  // Without an observer nothing would ever report back, so report permanently
  // in view: content stays visible and marquees keep moving instead of being
  // stranded behind a missing API.
  return [ref, supported ? inView : true];
}
