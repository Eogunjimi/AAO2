import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { propertyTypes, serviceAreaPages, systemTypes, whatYouGet } from '@/data/areas';
import { getAreaBySlug, getAreaFaqs } from '@/lib/areas';

import ServiceAreaPage from './ServiceAreaPage';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/service-areas/:slug" element={<ServiceAreaPage />} />
        <Route path="/404" element={<p>Not found page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('<ServiceAreaPage />', () => {
  it('covers every area we list', () => {
    expect(serviceAreaPages).toHaveLength(11);
    serviceAreaPages.forEach((area) => {
      expect(area.heroTitle).toContain(area.shortName ?? area.name);
      expect(area.intro).toHaveLength(2);
      expect(area.localFaqs).toHaveLength(2);
    });
  });

  it('leads with the local headline and the proof badges', () => {
    const area = getAreaBySlug('lekki-phase-1');
    renderAt('/service-areas/lekki-phase-1');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(area.heroTitle);
    expect(screen.getByText(area.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
  });

  it('tells the local story beside a quote form', () => {
    const area = getAreaBySlug('ikoyi');
    renderAt('/service-areas/ikoyi');

    area.intro.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    const form = screen.getByRole('form', { name: /free quote/i });
    expect(within(form).getByLabelText(/service/i)).toHaveValue('solar-inverter');
    expect(screen.getByAltText(new RegExp(area.name))).toHaveAttribute('src', area.introImage);
  });

  it('runs the three local sections with their lists', () => {
    const area = getAreaBySlug('yaba');
    renderAt('/service-areas/yaba');

    [area.why, area.trust, area.systems].forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    [whatYouGet[0], propertyTypes[0], systemTypes[0]].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('asks five questions, the first two written for the area', () => {
    const area = getAreaBySlug('magodo-gra');
    const faqs = getAreaFaqs(area);
    renderAt('/service-areas/magodo-gra');

    expect(faqs).toHaveLength(5);
    expect(faqs.slice(0, 2)).toEqual(area.localFaqs);
    faqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('redirects unknown areas to the not-found route', () => {
    renderAt('/service-areas/somewhere-else');
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
