import { render } from '@testing-library/react';

/**
 * Helpers for testing App Router pages.
 *
 * A server component is just a function returning JSX — async when it awaits
 * `params`. These wrappers resolve it and hand the result to Testing Library,
 * so a page can be asserted on without a running Next server.
 */

/** Wrap route params the way Next passes them (a promise since Next 15). */
export const routeParams = (value) => Promise.resolve(value);

/**
 * @param {Function} Page  A page component, sync or async.
 * @param {Object} [props] e.g. `{ params: routeParams({ slug: 'cctv' }) }`.
 */
export async function renderPage(Page, props = {}) {
  return render(await Page(props));
}

/**
 * The schema.org payloads a page rendered.
 *
 * They are inline `<script>` elements now, not head nodes appended by an
 * effect, so they are read straight off the rendered container.
 */
export function readJsonLd(container) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
    JSON.parse(node.textContent),
  );
}
