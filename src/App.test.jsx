import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { company } from '@/data/company';
import { AppRoutes } from '@/routes';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('site shell', () => {
  it('renders the home page with its landmarks and primary CTA', async () => {
    renderApp('/');

    expect(await screen.findByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Power|Security|Solar/i);

    const banner = screen.getByRole('banner');
    const links = within(banner).getAllByRole('link');
    expect(links.some((link) => link.getAttribute('href') === company.phone.href)).toBe(true);
  });

  it('offers a skip link to the main content', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.tab();
    expect(screen.getByRole('link', { name: /skip to (main )?content/i })).toHaveFocus();
  });

  it('lazily renders the services catalogue', async () => {
    renderApp('/services');

    expect(
      await screen.findByRole('heading', { level: 1, name: /power, security and connectivity/i }),
    ).toBeInTheDocument();
  });

  it('shows the 404 page for unknown routes', async () => {
    renderApp('/this/route/does-not-exist');

    expect(
      await screen.findByRole('heading', { level: 1, name: /couldn’t find that page/i }),
    ).toBeInTheDocument();
  });
});
