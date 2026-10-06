import { describe, expect, it } from 'vitest';

import { hydrateServerMarkup } from '@/test/hydration';

/**
 * Hydration guard for whole pages.
 *
 * Each page is rendered without the browser-only globals (what `next build`
 * does), then that markup is hydrated with them present (what the visitor's
 * browser does). Any disagreement is the console error React shows on a real
 * page load, so it fails the build here instead.
 *
 * This is the test that catches state seeded from `typeof IntersectionObserver`
 * or `typeof window` — see `src/test/hydration.jsx` for why both passes need a
 * fresh module registry.
 */

/**
 * Imports a page and wraps it in the chrome `app/layout.jsx` gives it, so the
 * header, footer and floating widgets are hydrated too.
 *
 * @param {string} importPage resolves to the page module
 */
function page(importPage) {
  async function buildPageTree() {
    const [{ SiteLayout }, { default: Page }] = await Promise.all([
      import('@/components/layout/SiteLayout'),
      importPage(),
    ]);

    return <SiteLayout>{await Page()}</SiteLayout>;
  }

  return buildPageTree;
}

describe('server/client hydration', () => {
  it('hydrates the home page without a mismatch', async () => {
    expect(await hydrateServerMarkup(page(() => import('./page')))).toEqual([]);
  });

  it('hydrates the services catalogue without a mismatch', async () => {
    expect(await hydrateServerMarkup(page(() => import('./services/page')))).toEqual([]);
  });

  it('hydrates a service detail page without a mismatch', async () => {
    const tree = async () => {
      const [{ SiteLayout }, { default: ServicePage }, { services }] = await Promise.all([
        import('@/components/layout/SiteLayout'),
        import('./services/[slug]/page'),
        import('@/data/services'),
      ]);

      return (
        <SiteLayout>
          {await ServicePage({ params: Promise.resolve({ slug: services[0].slug }) })}
        </SiteLayout>
      );
    };

    expect(await hydrateServerMarkup(tree)).toEqual([]);
  });

  it('hydrates the 404 page without a mismatch', async () => {
    const tree = async () => {
      const [{ SiteLayout }, { default: NotFound }] = await Promise.all([
        import('@/components/layout/SiteLayout'),
        import('./not-found'),
      ]);

      return (
        <SiteLayout>
          <NotFound />
        </SiteLayout>
      );
    };

    expect(await hydrateServerMarkup(tree)).toEqual([]);
  });
});
