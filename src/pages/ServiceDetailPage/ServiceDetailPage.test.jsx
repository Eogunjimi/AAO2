import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { getServiceBySlug } from '@/lib/services';

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
  it('renders the content of the requested service', () => {
    const service = getServiceBySlug('cctv');
    renderAt('/services/cctv');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(service.headline);
    expect(screen.getByText(service.intro)).toBeInTheDocument();
    service.signs.forEach((sign) => expect(screen.getByText(sign)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: service.title })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('sets the document title from the service', () => {
    renderAt('/services/network');
    expect(document.title).toMatch(/Network Installation/);
  });

  it('starts the FAQ with the service specific question', () => {
    const service = getServiceBySlug('auto-gates');
    renderAt('/services/auto-gates');

    expect(
      screen.getByRole('button', { name: new RegExp(service.faq.question, 'i') }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('redirects unknown slugs to the not-found route', () => {
    renderAt('/services/does-not-exist');
    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
