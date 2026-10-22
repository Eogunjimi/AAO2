import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppRoutes } from '@/routes';
import { startHeadCapture, stopHeadCapture } from '@/lib/serverHead';

/**
 * Server entry used only at build time (see scripts/prerender.mjs).
 *
 * Renders one route to an HTML string and returns the metadata its <Seo />
 * computed, so the build can write a complete static page per URL.
 *
 * @param {string} url Root-relative path, e.g. "/contact".
 * @returns {Promise<{html: string, head: Object|null}>}
 */
export async function renderRoute(url) {
  startHeadCapture();
  try {
    const { prelude } = await prerender(
      <ErrorBoundary>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ErrorBoundary>,
    );
    const html = await new Response(prelude).text();
    return { html, head: stopHeadCapture() };
  } catch (error) {
    stopHeadCapture();
    throw error;
  }
}
