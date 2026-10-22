/**
 * Google Analytics 4 (gtag.js) integration.
 *
 * Enabled only when VITE_GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") is set at
 * build time. With no ID every function here is a silent no-op, so local dev
 * and forks never send data.
 *
 * Automatic page views are disabled because this is a single-page app: the
 * router-aware <AnalyticsTracker /> sends a page_view on every navigation.
 */

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();

let initialised = false;

/** Whether a measurement ID is configured for this build. */
export function isAnalyticsEnabled() {
  return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
}

/** Loads gtag.js once and configures the property. Safe to call repeatedly. */
export function initAnalytics() {
  if (initialised || typeof window === 'undefined' || !isAnalyticsEnabled()) return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js requires the raw `arguments` object, not an array.
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Sends a page_view for the current in-app path. */
export function trackPageView(pathname, search = '') {
  if (!initialised || typeof window === 'undefined') return;
  const path = `${pathname}${search}`;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
}

/**
 * Sends a custom event, e.g. trackEvent('generate_lead', { form_source: 'contact-page' }).
 */
export function trackEvent(name, params = {}) {
  if (!initialised || typeof window === 'undefined') return;
  window.gtag('event', name, params);
}
