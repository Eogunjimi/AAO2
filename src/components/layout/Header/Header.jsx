'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { TopBar } from '@/components/layout/TopBar';
import { Button, Container } from '@/components/ui';
import { navbarCtaLabel } from '@/data/company';
import { aboutMenu, areaMenu, getServiceMenuGroups, primaryNav } from '@/data/navigation';
import { useEventListener } from '@/hooks/useEventListener';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn } from '@/lib/cn';
import { anchors, paths } from '@/routes/paths';

import styles from './Header.module.css';

/** Which panel shape each menu uses. */
const PANEL_STYLES = { services: 'mega', areas: 'areas', about: 'simple' };

/**
 * Sticky site header: announcement bar, primary navigation with dropdowns,
 * and the mobile drawer.
 *
 * A dropdown opens only when its trigger is clicked, and closes on a second
 * click, on Escape (returning focus to the trigger), when a pointer or focus
 * lands outside the nav, and on navigation. Panels keep the `hidden` attribute
 * while closed so their links stay out of the tab order.
 */
export function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const triggerRefs = useRef({});
  const pathname = usePathname();
  const serviceGroups = getServiceMenuGroups();

  useScrollLock(isDrawerOpen);

  // Close everything when the route changes. Adjusting state during render —
  // rather than in an effect — avoids a flash of the open menu on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setDrawerOpen(false);
    setOpenMenu(null);
  }

  // `usePathname()` ignores the fragment, so a same-page jump like `/#contact`
  // would otherwise leave the panel hanging open. Every link inside a panel
  // closes it on click, which covers both cases.
  const closeMenu = () => setOpenMenu(null);

  useEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setDrawerOpen(false);
    if (openMenu) {
      triggerRefs.current[openMenu]?.focus();
      setOpenMenu(null);
    }
  });

  useEventListener('pointerdown', (event) => {
    if (!navRef.current?.contains(event.target)) setOpenMenu(null);
  });

  return (
    <header className={styles.header}>
      <TopBar />

      <Container className={styles.bar}>
        <Logo />

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="Primary"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
          }}
        >
          <ul className={styles.navList}>
            {primaryNav.map((item) => {
              if (!item.menu) {
                return (
                  <li key={item.id}>
                    <Link href={item.to} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = openMenu === item.menu;
              const panelId = `nav-menu-${item.menu}`;

              return (
                <li key={item.id} className={styles.hasMenu}>
                  {/*
                   * A button, not a link: it exists to disclose the panel, so
                   * it must not navigate. Each panel carries a link to the
                   * label's own destination (View all services, See our full
                   * coverage, About AAO), so nothing becomes unreachable.
                   */}
                  <button
                    type="button"
                    ref={(node) => {
                      triggerRefs.current[item.menu] = node;
                    }}
                    className={cn(styles.navLink, styles.trigger, isOpen && styles.triggerOpen)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenMenu((current) => (current === item.menu ? null : item.menu))
                    }
                  >
                    {item.label}
                    <span className={styles.caret} aria-hidden="true" />
                  </button>

                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className={cn(
                      styles.dropdown,
                      styles[PANEL_STYLES[item.menu] ?? 'simple'],
                      isOpen && styles.dropdownOpen,
                    )}
                  >
                    {item.menu === 'services' ? (
                      <div className={styles.panel}>
                        <div className={styles.megaGroups}>
                          {serviceGroups.map((group) => (
                            <div key={group.id}>
                              <p className={styles.megaTitle}>{group.title}</p>
                              <ul>
                                {group.links.map((link) => (
                                  <li key={link.id}>
                                    <Link
                                      href={link.to}
                                      className={styles.megaLink}
                                      onClick={closeMenu}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={paths.services}
                          className={styles.megaFooter}
                          onClick={closeMenu}
                        >
                          View all services →
                        </Link>
                      </div>
                    ) : item.menu === 'areas' ? (
                      <div className={styles.panel}>
                        <p className={styles.megaTitle}>Lagos neighbourhoods we cover</p>
                        <ul className={styles.areaGrid}>
                          {areaMenu.map((link) => (
                            <li key={link.id}>
                              <Link
                                href={link.to}
                                className={styles.simpleLink}
                                onClick={closeMenu}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={anchors.areas}
                          className={styles.megaFooter}
                          onClick={closeMenu}
                        >
                          See our full coverage →
                        </Link>
                      </div>
                    ) : (
                      <div className={styles.panel}>
                        <ul>
                          {aboutMenu.map((link) => (
                            <li key={link.id}>
                              <Link
                                href={link.to}
                                className={styles.simpleLink}
                                onClick={closeMenu}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button to={anchors.contact} variant="volt" size="sm" className={styles.cta}>
            {navbarCtaLabel}
          </Button>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-navigation"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            <span
              className={cn(styles.burger, isDrawerOpen && styles.burgerOpen)}
              aria-hidden="true"
            />
          </button>
        </div>
      </Container>

      <MobileNav
        id="mobile-navigation"
        open={isDrawerOpen}
        serviceGroups={serviceGroups}
        aboutLinks={aboutMenu}
        areaLinks={areaMenu}
        onNavigate={() => setDrawerOpen(false)}
      />
    </header>
  );
}
