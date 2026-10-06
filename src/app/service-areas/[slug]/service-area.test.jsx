import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { propertyTypes, serviceAreaPages, systemTypes, whatYouGet } from '@/data/areas';
import { quoteForm } from '@/data/forms';
import { getAreaBySlug, getAreaFaqs } from '@/lib/areas';
import { readJsonLd, renderPage, routeParams } from '@/test/serverComponent';

import ServiceAreaPage, { generateMetadata, generateStaticParams } from './page';

const renderSlug = (slug) => renderPage(ServiceAreaPage, { params: routeParams({ slug }) });

describe('service area route', () => {
  it('prerenders one page per area we list', () => {
    expect(serviceAreaPages).toHaveLength(11);
    expect(generateStaticParams()).toEqual(serviceAreaPages.map((area) => ({ slug: area.slug })));

    serviceAreaPages.forEach((area) => {
      expect(area.heroTitle).toContain(area.shortName ?? area.name);
      expect(area.intro).toHaveLength(2);
      expect(area.localFaqs).toHaveLength(2);
    });
  });

  it('leads with the local headline and the proof badges', async () => {
    const area = getAreaBySlug('lekki-phase-1');
    await renderSlug('lekki-phase-1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(area.heroTitle);
    expect(screen.getByText(area.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
  });

  it('tells the local story beside a quote form', async () => {
    const area = getAreaBySlug('ikoyi');
    await renderSlug('ikoyi');

    area.intro.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    const form = screen.getByRole('form', { name: new RegExp(quoteForm.titleAccent, 'i') });
    expect(within(form).getByLabelText(/service/i)).toHaveValue('solar-inverter');
    expect(screen.getByAltText(new RegExp(area.name))).toHaveAttribute('src', area.introImage);
  });

  it('runs the three local sections with their lists', async () => {
    const area = getAreaBySlug('yaba');
    await renderSlug('yaba');

    [area.why, area.trust, area.systems].forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    [whatYouGet[0], propertyTypes[0], systemTypes[0]].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('asks five questions, the first two written for the area', async () => {
    const area = getAreaBySlug('magodo-gra');
    const faqs = getAreaFaqs(area);
    await renderSlug('magodo-gra');

    expect(faqs).toHaveLength(5);
    expect(faqs.slice(0, 2)).toEqual(area.localFaqs);
    faqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('titles the page for the neighbourhood', async () => {
    const metadata = await generateMetadata({ params: routeParams({ slug: 'ikoyi' }) });

    // `absolute` opts out of the global "— AAO Engineering Services" suffix,
    // because the title already carries the brand.
    expect(metadata.title.absolute).toMatch(/Solar & Inverter Installation in Ikoyi/);
    expect(metadata.alternates.canonical).toMatch(/\/service-areas\/ikoyi$/);
  });

  it('emits the breadcrumb it renders as BreadcrumbList structured data', async () => {
    const area = getAreaBySlug('ikoyi');
    const { container } = await renderSlug('ikoyi');

    const schema = readJsonLd(container).find((entry) => entry['@type'] === 'BreadcrumbList');

    expect(schema).toBeDefined();
    expect(schema.itemListElement.map((item) => item.name)).toEqual([
      'Home',
      'Service Areas',
      area.name,
    ]);
    expect(schema.itemListElement.at(-1)).not.toHaveProperty('item');
  });

  it('answers an unknown area with a 404', async () => {
    await expect(renderSlug('somewhere-else')).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
