import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { initAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Initialises GA once and reports a page_view on every client-side navigation.
 * Renders nothing. Must sit inside the router.
 */
export function AnalyticsTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // Defer one tick so route-level effects (e.g. <Seo /> updating document.title)
    // have run before the title is read.
    const id = window.setTimeout(() => trackPageView(pathname, search), 0);
    return () => window.clearTimeout(id);
  }, [pathname, search]);

  return null;
}

export default AnalyticsTracker;
