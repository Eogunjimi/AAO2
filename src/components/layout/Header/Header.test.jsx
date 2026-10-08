import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { aboutMenu, getServiceMenuGroups, primaryNav } from '@/data/navigation';

import { Header } from './Header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

const nav = () => screen.getByRole('navigation', { name: 'Primary' });

/** Menu triggers are buttons: they disclose a panel, they do not navigate. */
const trigger = (name) => within(nav()).getByRole('button', { name: new RegExp(`^${name}$`, 'i') });

describe('<Header />', () => {
  it('closes the mobile drawer and unlocks scrolling when switching to desktop', async () => {
    let desktop = false;
    const listeners = new Set();
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn((query) => {
      if (query !== '(min-width: 1181px)') return originalMatchMedia(query);
      return {
        matches: desktop,
        media: query,
        addEventListener: (_, listener) => listeners.add(listener),
        removeEventListener: (_, listener) => listeners.delete(listener),
      };
    });

    try {
      renderHeader();
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        desktop = true;
        listeners.forEach((listener) => listener());
      });

      expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false');
      expect(document.body.style.overflow).not.toBe('hidden');
      expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('lists the primary navigation in order', () => {
    const labels = () =>
      within(nav())
        .getAllByRole('listitem')
        .map((item) => item.firstElementChild?.textContent?.trim());

    renderHeader();

    expect(labels()).toEqual(primaryNav.map((item) => item.label));
  });

  it('hides both menus, and their links, until asked', () => {
    renderHeader();

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
    expect(trigger('Services')).toHaveAttribute('aria-expanded', 'false');
    // `hidden` keeps the panel out of the accessibility tree and the tab order.
    expect(within(nav()).queryByRole('link', { name: 'Team' })).toBeNull();
  });

  it('opens the About menu on click and closes it on a second click', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(trigger('About'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'true');
    aboutMenu.forEach((link) => {
      expect(within(nav()).getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        link.to,
      );
    });

    await user.click(trigger('About'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
    expect(within(nav()).queryByRole('link', { name: 'Team' })).toBeNull();
  });

  it('stays shut on hover — the panel is click-only', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.hover(trigger('About'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
    expect(within(nav()).queryByRole('link', { name: 'Team' })).toBeNull();
  });

  it('stays shut when its trigger merely takes focus', () => {
    renderHeader();

    // Tabbing across the nav must not fire menus open.
    fireEvent.focus(trigger('About'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
    expect(within(nav()).queryByRole('link', { name: 'Academy' })).toBeNull();
  });

  it('never navigates from a menu trigger', () => {
    renderHeader();

    primaryNav
      .filter((item) => item.menu)
      .forEach((item) => {
        const control = trigger(item.label);
        expect(control.tagName).toBe('BUTTON');
        expect(control).not.toHaveAttribute('href');
      });
  });

  it('opens the services mega menu with every group', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(trigger('Services'));

    const groups = getServiceMenuGroups();
    expect(groups).toHaveLength(3);

    groups.forEach((group) => {
      expect(within(nav()).getByText(group.title)).toBeInTheDocument();
      group.links.forEach((link) => {
        expect(within(nav()).getByRole('link', { name: link.label })).toHaveAttribute(
          'href',
          link.to,
        );
      });
    });

    expect(within(nav()).getByRole('link', { name: /view all services/i })).toHaveAttribute(
      'href',
      '/services',
    );
  });

  it('closes the open menu on Escape and restores focus to its trigger', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(trigger('Services'));
    await user.keyboard('{Escape}');

    expect(trigger('Services')).toHaveAttribute('aria-expanded', 'false');
    expect(trigger('Services')).toHaveFocus();
  });

  it('only keeps one menu open at a time', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(trigger('About'));
    await user.click(trigger('Services'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
    expect(trigger('Services')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes an open menu when a pointer lands outside the nav', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(trigger('About'));
    await user.click(screen.getByRole('banner'));

    expect(trigger('About')).toHaveAttribute('aria-expanded', 'false');
  });
});
