import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function resetWindow() {
  delete window.dataLayer;
  delete window.gtag;
  document.head
    .querySelectorAll('script[src*="googletagmanager"]')
    .forEach((script) => script.remove());
}

describe('analytics (no measurement ID configured)', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    resetWindow();
  });

  it('stays fully disabled and injects nothing', async () => {
    const analytics = await import('./analytics');
    analytics.initAnalytics();
    analytics.trackPageView('/contact');
    analytics.trackEvent('generate_lead');

    expect(analytics.isAnalyticsEnabled()).toBe(false);
    expect(window.gtag).toBeUndefined();
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });
});

describe('analytics (measurement ID configured)', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', 'G-TEST12345');
    resetWindow();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetWindow();
  });

  it('loads gtag.js once and configures the property without automatic page views', async () => {
    const analytics = await import('./analytics');
    analytics.initAnalytics();
    analytics.initAnalytics();

    const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toContain('id=G-TEST12345');

    const configCalls = window.dataLayer.filter((args) => args[0] === 'config');
    expect(configCalls).toHaveLength(1);
    expect(configCalls[0][1]).toBe('G-TEST12345');
    expect(configCalls[0][2]).toEqual({ send_page_view: false });
  });

  it('sends page_view and custom events through gtag', async () => {
    const analytics = await import('./analytics');
    analytics.initAnalytics();

    analytics.trackPageView('/contact', '?utm_source=google');
    analytics.trackEvent('generate_lead', { form_source: 'contact-page' });

    const pageView = window.dataLayer.find(
      (args) => args[0] === 'event' && args[1] === 'page_view',
    );
    expect(pageView[2]).toMatchObject({
      page_path: '/contact?utm_source=google',
      page_location: `${window.location.origin}/contact?utm_source=google`,
    });

    const lead = window.dataLayer.find((args) => args[1] === 'generate_lead');
    expect(lead[2]).toEqual({ form_source: 'contact-page' });
  });
});
