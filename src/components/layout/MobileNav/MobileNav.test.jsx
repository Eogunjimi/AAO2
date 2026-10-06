import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { aboutMenu, areaMenu, getServiceMenuGroups } from '@/data/navigation';

import { MobileNav } from './MobileNav';

function renderDrawer(props = {}) {
  return render(
    <MobileNav
      id="mobile-navigation"
      open
      serviceGroups={getServiceMenuGroups()}
      aboutLinks={aboutMenu}
      areaLinks={areaMenu}
      onNavigate={() => {}}
      {...props}
    />,
  );
}

const drawer = () => screen.getByRole('navigation', { name: 'Mobile' });

describe('<MobileNav />', () => {
  it('mirrors the desktop structure', () => {
    renderDrawer();

    ['Home', 'Projects', 'Contact Us'].forEach((label) => {
      expect(within(drawer()).getByRole('link', { name: label })).toBeInTheDocument();
    });
    ['About', 'Services', 'Service Areas'].forEach((label) => {
      expect(
        within(drawer()).getByRole('button', { name: new RegExp(`^${label}$`) }),
      ).toBeInTheDocument();
    });
  });

  it('keeps the sections collapsed until tapped', async () => {
    const user = userEvent.setup();
    renderDrawer();

    const services = within(drawer()).getByRole('button', { name: /^Services$/ });
    expect(services).toHaveAttribute('aria-expanded', 'false');
    expect(within(drawer()).queryByRole('link', { name: 'All Services' })).toBeNull();

    await user.click(services);

    expect(services).toHaveAttribute('aria-expanded', 'true');
    expect(within(drawer()).getByRole('link', { name: 'All Services' })).toBeInTheDocument();
    getServiceMenuGroups().forEach((group) => {
      expect(within(drawer()).getByText(group.title)).toBeInTheDocument();
    });
  });

  it('lists every neighbourhood under Service Areas', async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(within(drawer()).getByRole('button', { name: /^Service Areas$/ }));

    areaMenu.forEach((area) => {
      expect(within(drawer()).getByRole('link', { name: area.label })).toHaveAttribute(
        'href',
        area.to,
      );
    });
  });

  it('opens one section at a time', async () => {
    const user = userEvent.setup();
    renderDrawer();

    const about = within(drawer()).getByRole('button', { name: /^About$/ });
    const services = within(drawer()).getByRole('button', { name: /^Services$/ });

    await user.click(about);
    await user.click(services);

    expect(about).toHaveAttribute('aria-expanded', 'false');
    expect(services).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the drawer when a link is followed', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    renderDrawer({ onNavigate });

    await user.click(within(drawer()).getByRole('link', { name: 'Projects' }));

    expect(onNavigate).toHaveBeenCalled();
  });
});
