import { PageLoader } from '@/components/common/PageLoader';

/**
 * Shown while a route segment streams in. Replaces the `<Suspense>` fallback
 * the SPA wrapped around its lazily imported routes.
 */
export default function Loading() {
  return <PageLoader />;
}
