import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { quoteForm } from '@/data/forms';
import { services } from '@/data/services';
import { getRelatedServices, getServiceBySlug, getServicePage } from '@/lib/services';
import { readJsonLd, renderPage, routeParams } from '@/test/serverComponent';

import ServiceDetailPage, { generateMetadata, generateStaticParams } from './page';

const renderSlug = (slug) => renderPage(ServiceDetailPage, { params: routeParams({ slug }) });

describe('service detail route', () => {
  it('prerenders one page per service', () => {
    expect(generateStaticParams()).toEqual(services.map((service) => ({ slug: service.slug })));
  });

  it('leads with the service headline, promise and proof', async () => {
    const service = getServiceBySlug('solar-inverter');
    const page = getServicePage(service);
    await renderSlug('solar-inverter');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(page.heroTitle);
    expect(screen.getByText(page.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    // The breadcrumb ends on the current page, which is text rather than a link.
    expect(screen.getByText(service.title, { selector: '[aria-current="page"]' })).toBeVisible();
  });

  it('tells the story and lists what the customer gets', async () => {
    const page = getServicePage(getServiceBySlug('solar-inverter'));
    await renderSlug('solar-inverter');

    page.introBody.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    expect(page.included).toHaveLength(4);
    page.included.forEach((item) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
    });
  });

  it('offers the quote form with the service already chosen', async () => {
    await renderSlug('solar-inverter');

    const form = screen.getByRole('form', { name: new RegExp(quoteForm.titleAccent, 'i') });
    expect(within(form).getByLabelText(/service/i)).toHaveValue('solar-inverter');
  });

  it('runs the process widget on this service’s own steps', async () => {
    const page = getServicePage(getServiceBySlug('load-audit'));
    await renderSlug('load-audit');

    page.process.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('asks no more than five questions, all about this service', async () => {
    const service = getServiceBySlug('solar-inverter');
    const page = getServicePage(service);
    await renderSlug('solar-inverter');

    expect(page.faqs.length).toBeLessThanOrEqual(5);

    expect(
      screen.getByRole('heading', {
        name: new RegExp(`${service.title}.*questions answered`, 'i'),
      }),
    ).toBeInTheDocument();

    page.faqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('mixes written copy with catalogue fallbacks where a page is part-written', async () => {
    const service = getServiceBySlug('cctv');
    const page = getServicePage(service);
    await renderSlug('cctv');

    // Written: the headline and the story.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(page.heroTitle);
    expect(screen.getByText(page.introBody[0])).toBeInTheDocument();

    // Fallen back: the cards still come from the catalogue benefits.
    service.benefits.forEach((benefit) => {
      expect(screen.getByRole('heading', { name: benefit.title })).toBeInTheDocument();
    });
    expect(
      screen.getByRole('button', { name: new RegExp(service.faq.question, 'i') }),
    ).toBeInTheDocument();
  });

  it('picks the service keyword out of every headline', async () => {
    const page = getServicePage(getServiceBySlug('cctv'));
    await renderSlug('cctv');

    expect(page.heroTitle.startsWith(page.heroKeyword)).toBe(true);
    expect(screen.getByRole('heading', { level: 1 }).querySelector('em')).toHaveTextContent(
      page.heroKeyword,
    );
  });

  it('builds the page title and canonical from the service', async () => {
    const metadata = await generateMetadata({ params: routeParams({ slug: 'network' }) });

    expect(metadata.title).toMatch(/Network Installation/);
    expect(metadata.alternates.canonical).toMatch(/\/services\/network$/);
    expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
  });

  it('answers an unknown slug with a 404 instead of an empty shell', async () => {
    await expect(renderSlug('does-not-exist')).rejects.toThrow('NEXT_NOT_FOUND');
    expect(await generateMetadata({ params: routeParams({ slug: 'does-not-exist' }) })).toEqual({});
  });

  it('links on to three related services and back to the catalogue', async () => {
    await renderSlug('cctv');

    const related = screen.getByRole('region', { name: /often needed alongside this/i });
    const links = within(related).getAllByRole('link');

    // Three service cards plus the route back to the index.
    const cards = links.filter((link) => link.getAttribute('href') !== '/services');
    expect(cards).toHaveLength(3);
    expect(within(related).getByRole('link', { name: /view all services/i })).toHaveAttribute(
      'href',
      '/services',
    );

    // A page must never recommend itself.
    cards.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/services\/.+/);
      expect(link).not.toHaveAttribute('href', '/services/cctv');
    });
  });

  it('prefers related services from the same category', async () => {
    const service = getServiceBySlug('cctv');
    await renderSlug('cctv');

    const related = screen.getByRole('region', { name: /often needed alongside this/i });
    const slugs = getRelatedServices('cctv', 3).map((item) => item.slug);

    // The selector leads with siblings, so the first card shares the category.
    expect(getServiceBySlug(slugs[0]).category).toBe(service.category);
    slugs.forEach((slug) => {
      expect(within(related).getByRole('link', { name: new RegExp(getServiceBySlug(slug).title) }));
    });
  });

  it('emits the breadcrumb it renders as BreadcrumbList structured data', async () => {
    const service = getServiceBySlug('solar-inverter');
    const { container } = await renderSlug('solar-inverter');

    const schema = readJsonLd(container).find((entry) => entry['@type'] === 'BreadcrumbList');
    expect(schema).toBeDefined();

    // One-for-one with the crumbs in the hero.
    expect(schema.itemListElement.map((item) => item.name)).toEqual([
      'Home',
      'Services',
      service.title,
    ]);
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(schema.itemListElement.at(-1)).not.toHaveProperty('item');
  });
});
