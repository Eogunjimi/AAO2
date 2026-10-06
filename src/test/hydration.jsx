import { vi } from 'vitest';

/**
 * Helpers for testing that a tree hydrates cleanly.
 *
 * The suite's setup file installs an `IntersectionObserver` stub on the global
 * object, because that is what a browser looks like. A Node server is *not*
 * that: there is no `IntersectionObserver`, no `window`, no `matchMedia`. Any
 * module that reads those at import time or during render therefore produces
 * different output in `next build` than it does in the visitor's browser,
 * which is exactly the hydration mismatch this helper exists to catch.
 *
 * Reproducing it needs two things:
 *
 *  1. the browser-only globals genuinely removed for the server pass, and
 *  2. a fresh module registry for each pass, so module-scope constants such as
 *     `const SUPPORTS_OBSERVER = typeof IntersectionObserver !== 'undefined'`
 *     are re-evaluated under the globals that pass is meant to simulate.
 *
 * Without (2) the first import wins and both passes silently agree, which is
 * how the original bug reached production with a green suite.
 */

/** Globals a browser has and a Node server does not. */
const BROWSER_ONLY_GLOBALS = ['IntersectionObserver', 'ResizeObserver', 'matchMedia'];

/** Runs `fn` with the browser-only globals deleted, then puts them back. */
async function withoutBrowserGlobals(fn) {
  const saved = new Map();

  for (const name of BROWSER_ONLY_GLOBALS) {
    if (name in globalThis) {
      saved.set(name, globalThis[name]);
      delete globalThis[name];
    }
  }

  try {
    return await fn();
  } finally {
    for (const [name, value] of saved) {
      globalThis[name] = value;
    }
  }
}

/**
 * Renders `importTree()` the way `next build` does — no browser globals, fresh
 * modules — and returns the HTML string.
 *
 * @param {() => Promise<import('react').ReactNode>} importTree
 */
export async function renderOnServer(importTree) {
  return withoutBrowserGlobals(async () => {
    vi.resetModules();
    const { renderToString } = await import('react-dom/server');
    return renderToString(await importTree());
  });
}

/**
 * Hydrates `html` with a freshly imported copy of the tree, the way a browser
 * does, and resolves with every hydration complaint React made.
 *
 * React reports mismatches through `console.error`, so they are captured
 * rather than thrown.
 *
 * @param {string} html markup produced by {@link renderOnServer}
 * @param {() => Promise<import('react').ReactNode>} importTree
 * @returns {Promise<string[]>} hydration errors, empty when the markup matched
 */
export async function hydrate(html, importTree) {
  vi.resetModules();

  const [{ act, StrictMode, createElement }, { hydrateRoot }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
  ]);

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  const complaints = [];
  const record = (...args) => {
    const message = args.map((arg) => (arg instanceof Error ? arg.message : String(arg))).join(' ');
    if (/hydrat|did not match|didn.t match|server rendered HTML|server HTML/i.test(message)) {
      complaints.push(message);
    }
  };

  const consoleError = vi.spyOn(console, 'error').mockImplementation(record);
  const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(record);

  try {
    let root;
    await act(async () => {
      root = hydrateRoot(container, createElement(StrictMode, null, await importTree()), {
        onRecoverableError: (error) => record(error),
      });
    });
    await act(async () => root.unmount());
  } finally {
    consoleError.mockRestore();
    consoleWarn.mockRestore();
    container.remove();
  }

  return complaints;
}

/**
 * Server-renders a tree and hydrates that exact markup, as the browser does on
 * a real page load.
 *
 * `importTree` is called once per pass and must import its modules *inside*
 * the callback, so each pass gets the registry it was given.
 *
 * @param {() => Promise<import('react').ReactNode>} importTree
 * @returns {Promise<string[]>} hydration errors, empty when the markup matched
 */
export async function hydrateServerMarkup(importTree) {
  return hydrate(await renderOnServer(importTree), importTree);
}
