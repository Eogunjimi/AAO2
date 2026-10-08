'use client';

import React from 'react';

import { __TestLocationContext, __TestNavigateContext, __TestParamsContext } from '@/lib/router';

export { Link, Navigate, useLocation, useNavigate, useParams } from '@/lib/router';

/**
 * Minimal router stand-in for Vitest tests.
 */

function matchPath(pattern, pathname) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const pp = patternParts[i];
    const v = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(v);
    } else if (pp !== v) {
      return null;
    }
  }
  return params;
}

export function MemoryRouter({ initialEntries = ['/'], children }) {
  const initialPath = React.useMemo(() => {
    const entry = initialEntries[0] ?? '/';
    return entry.split('#')[0] || '/';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pathname, setPathname] = React.useState(initialPath);

  const navigate = React.useCallback((to) => {
    setPathname(String(to).split('#')[0] || '/');
  }, []);

  // Resolve the matching route on every render. Flatten one level of <Routes>
  // so callers can either pass <Route>s directly or wrap them in <Routes>.
  const flatten = (nodes) =>
    React.Children.toArray(nodes).flatMap((el) => {
      if (!React.isValidElement(el)) return [el];
      if (el.type === Routes) return flatten(el.props.children);
      return [el];
    });

  const arr = flatten(children);
  const routes = arr.filter((el) => React.isValidElement(el) && el.type === Route);
  const other = arr.filter((el) => !React.isValidElement(el) || el.type !== Route);

  let element = null;
  let params = {};
  if (routes.length === 0) {
    element = <>{children}</>;
  } else {
    for (const route of routes) {
      const { path, element: el } = route.props;
      if (!path) continue;
      const m = matchPath(path, pathname);
      if (m) {
        element = el;
        params = m;
        break;
      }
    }
    if (!element && other.length > 0) element = <>{other}</>;
  }

  return (
    <__TestNavigateContext.Provider value={navigate}>
      <__TestLocationContext.Provider value={{ pathname, hash: '', search: '', key: pathname }}>
        <__TestParamsContext.Provider value={params}>{element}</__TestParamsContext.Provider>
      </__TestLocationContext.Provider>
    </__TestNavigateContext.Provider>
  );
}

export function Routes({ children }) {
  return <>{children}</>;
}

export function Route() {
  return null;
}
