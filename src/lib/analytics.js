/**
 * Google Analytics 4 (gtag.js) integration.
 *
 * Enabled by default with the production property. Setting
 * VITE_GA_MEASUREMENT_ID to an empty value disables every function here (they
 * become silent no-ops), which is useful for local development.
 *
 * Automatic page views are disabled because this is a single-page app: the
 * router-aware <AnalyticsTracker /> sends a page_view on every navigation.
 */

/** Production property. Measurement IDs are public (they appear in every page's source). */
const DEFAULT_GA_MEASUREMENT_ID = 'G-VX0E8TB5TK';

/**
 * Unset → the default property. Set to an empty string (e.g. in a local .env)
 * to turn tracking off.
 */
export const GA_MEASUREMENT_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? DEFAULT_GA_MEASUREMENT_ID
).trim();

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
