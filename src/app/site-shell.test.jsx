import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteLayout } from '@/components/layout/SiteLayout';
import { company } from '@/data/company';
import { serviceAreaPages } from '@/data/areas';
import { posts } from '@/data/posts';
import { services } from '@/data/services';
import { renderPage } from '@/test/serverComponent';

import HomePage, { metadata as homeMetadata } from './page';
import NotFound from './not-found';
import ServicesPage from './services/page';
import sitemap from './sitemap';
import robots from './robots';

/** The root layout's shell, wrapped around a page the way Next does. */
const renderShell = async (Page) => render(<SiteLayout>{await Page()}</SiteLayout>);

describe('site shell', () => {
  it('renders the home page with its landmarks and primary CTA', async () => {
    await renderShell(HomePage);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Power|Security|Solar/i);

    const banner = screen.getByRole('banner');
    const links = within(banner).getAllByRole('link');
    expect(links.some((link) => link.getAttribute('href') === company.phone.href)).toBe(true);
  });

  it('offers a skip link to the main content', async () => {
    const user = userEvent.setup();
    await renderShell(HomePage);

    await user.tab();
    expect(screen.getByRole('link', { name: /skip to (main )?content/i })).toHaveFocus();
  });

  it('renders the services catalogue', async () => {
    await renderPage(ServicesPage);

    expect(
      screen.getByRole('heading', { level: 1, name: /power, security and connectivity/i }),
    ).toBeInTheDocument();
  });

  it('shows the 404 page for unknown routes', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { level: 1, name: /couldn’t find that page/i }),
    ).toBeInTheDocument();
  });
});

describe('route metadata', () => {
  it('keeps the brand out of the title template on the home page', () => {
    // The home title already names the company, so it opts out of the suffix.
    expect(homeMetadata.title.absolute).toContain(company.name);
    expect(homeMetadata.alternates.canonical).toMatch(/^https?:\/\/[^/]+\/$/);
  });

  it('marks the 404 page noindex', () => {
    expect(NotFound).toBeTypeOf('function');
  });
});

describe('sitemap and robots', () => {
  it('lists every indexable route exactly once', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    // Home, services index, projects, blog index + every slug page.
    expect(urls).toHaveLength(4 + services.length + posts.length + serviceAreaPages.length);

    services.forEach((service) => {
      expect(urls.some((url) => url.endsWith(`/services/${service.slug}`))).toBe(true);
    });
    serviceAreaPages.forEach((area) => {
      expect(urls.some((url) => url.endsWith(`/service-areas/${area.slug}`))).toBe(true);
    });
  });

  it('leaves the noindex placeholders out of the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);

    ['/team', '/career', '/academy', '/shop'].forEach((path) => {
      expect(urls.some((url) => url.endsWith(path))).toBe(false);
    });
  });

  it('points robots.txt at the generated sitemap', () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
    expect(robots().rules[0]).toEqual({ userAgent: '*', allow: '/' });
  });
});
