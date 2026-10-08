'use client';

import React from 'react';

/**
 * Compatibility layer for the migration from react-router-dom to Next.js.
 *
 * All application components import `Link`, `useLocation`, `Navigate` and
 * `useParams` from this file instead of from `next/link` / `next/navigation`
 * directly. This keeps the component JSX stable (same `to={...}` / `<Navigate
 * to={...} replace />` API the app used under react-router-dom) while allowing
 * us to:
 *
 *   1. Delegate to Next.js primitives when running inside a real Next tree,
 *   2. Degrade to plain-HTML / window.location fallbacks when the Next router
 *      isn't mounted (Vitest/jsdom, isolated renders, preview sandboxes, etc).
 *
 * A separate `@/lib/test-router` module ships a `MemoryRouter` for unit tests
 * so components behave exactly as they did under react-router-dom.
 */

// Lazily load next/navigation. Importing it at the top of the module would
// crash Vitest (jsdom) because the module expects a Next App Router context
// to exist before any component renders. We use it only for `useLocation` /
// `useParams` when running inside a real Next tree; outside of that (tests,
// isolated renders) we fall back to window.location and internal contexts.
function getNextNavigation() {
  try {
    // eslint-disable-next-line global-require
    return require('next/navigation');
  } catch {
    return null;
  }
}

// When MemoryRouter mounts in tests it provides its own navigate via this
// internal context. The real router reads it so that <Link> / <Navigate>
// inside a MemoryRouter update the test history, not window.location.
export const __TestNavigateContext = React.createContext(null);
export const __TestLocationContext = React.createContext(null);
export const __TestParamsContext = React.createContext({});

/**
 * Link that accepts the same `to` prop react-router-dom did.
 *
 * We deliberately render a plain `<a>` instead of delegating to `next/link`:
 * it keeps the component usable in jsdom/Vitest (where there is no Next
 * routing context) and the behaviour is correct for internal navigation
 * (Next treats <a href="/path"> as a soft navigation automatically inside
 * the App Router when no target/download is set). Prefetching can be added
 * later with a dedicated wrapper if needed.
 */
export function Link({ to, href, children, replace, onClick, ...rest }) {
  const destination = to ?? href;
  const testNavigate = React.useContext(__TestNavigateContext);

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;
    const isInternal = typeof destination === 'string' && /^(\/|#)/.test(destination);
    if (!isInternal) return;

    if (testNavigate) {
      event.preventDefault();
      testNavigate(destination, { replace });
    }
    // In a real Next environment the browser's default <a> navigation is
    // intercepted by Next.js's soft-navigation handler; no extra work needed.
  };

  return (
    <a href={destination} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

/** Subset of react-router-dom's useLocation() — pathname + hash. */
export function useLocation() {
  const testLoc = React.useContext(__TestLocationContext);
  if (testLoc) return testLoc;

  let pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  try {
    const nav = getNextNavigation();
    if (nav?.usePathname) pathname = nav.usePathname() ?? pathname;
  } catch {
    // No Next router mounted (e.g. jsdom tests); fall back to window.
  }

  const [hash, setHash] = React.useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  React.useEffect(() => {
    setHash(window.location.hash);
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [pathname]);

  return {
    pathname,
    hash,
    search: typeof window !== 'undefined' ? window.location.search : '',
    key: `${pathname}${hash}`,
  };
}

/** Programmatic navigation. */
export function useNavigate() {
  const testNavigate = React.useContext(__TestNavigateContext);
  return React.useCallback(
    (to, { replace } = {}) => {
      if (testNavigate) {
        testNavigate(to, { replace });
        return;
      }
      const nav = getNextNavigation();
      if (nav?.useRouter) {
        try {
          // Can't call a hook inside a callback; navigate via window instead.
          if (typeof window !== 'undefined') {
            if (replace) window.location.replace(to);
            else window.location.href = to;
          }
          return;
        } catch {
          /* fall through */
        }
      }
      if (typeof window !== 'undefined') {
        if (replace) window.location.replace(to);
        else window.location.href = to;
      }
    },
    [testNavigate],
  );
}

/** Imperative redirect. */
export function Navigate({ to, replace }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
}

export function useParams() {
  const testParams = React.useContext(__TestParamsContext);
  if (testParams && Object.keys(testParams).length) return testParams;
  const nav = getNextNavigation();
  try {
    return nav?.useParams?.() ?? {};
  } catch {
    return {};
  }
}
