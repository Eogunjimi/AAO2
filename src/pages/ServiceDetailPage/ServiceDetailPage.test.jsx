import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { getServiceBySlug, getServicePage } from '@/lib/services';

import ServiceDetailPage from './ServiceDetailPage';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/404" element={<p>Not found page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('<ServiceDetailPage />', () => {
  it('leads with the service headline, promise and proof', () => {
    const service = getServiceBySlug('solar-inverter');
    const page = getServicePage(service);
    renderAt('/services/solar-inverter');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(page.heroTitle);
    expect(screen.getByText(page.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    // The breadcrumb ends on the current page, which is text rather than a link.
    expect(screen.getByText(service.title, { selector: '[aria-current="page"]' })).toBeVisible();
  });

  it('tells the story and lists what the customer gets', () => {
    const page = getServicePage(getServiceBySlug('solar-inverter'));
    renderAt('/services/solar-inverter');

    page.introBody.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    expect(page.included).toHaveLength(4);
    page.included.forEach((item) => {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
    });
  });

  it('offers the quote form with the service already chosen', () => {
    renderAt('/services/solar-inverter');

    const form = screen.getByRole('form', { name: /free quote/i });
    expect(within(form).getByLabelText(/service/i)).toHaveValue('solar-inverter');
  });

  it('runs the process widget on this service’s own steps', () => {
    const page = getServicePage(getServiceBySlug('load-audit'));
    renderAt('/services/load-audit');

    page.process.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('asks no more than five questions, all about this service', () => {
    const service = getServiceBySlug('solar-inverter');
    const page = getServicePage(service);
    renderAt('/services/solar-inverter');

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

  it('mixes written copy with catalogue fallbacks where a page is part-written', () => {
    const service = getServiceBySlug('cctv');
    const page = getServicePage(service);
    renderAt('/services/cctv');

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

  it('picks the service keyword out of every headline', () => {
    const page = getServicePage(getServiceBySlug('cctv'));
    renderAt('/services/cctv');

    expect(page.heroTitle.startsWith(page.heroKeyword)).toBe(true);
    expect(screen.getByRole('heading', { level: 1 }).querySelector('em')).toHaveTextContent(
      page.heroKeyword,
    );
  });

  it('sets the document title from the service', () => {
    renderAt('/services/network');
    expect(document.title).toMatch(/Network Installation/);
  });

  it('redirects unknown slugs to the not-found route', () => {
    renderAt('/services/does-not-exist');
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
