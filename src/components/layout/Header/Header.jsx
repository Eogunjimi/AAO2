import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { TopBar } from '@/components/layout/TopBar';
import { Button, Container } from '@/components/ui';
import { company } from '@/data/company';
import { companyLinks, getServiceMenuGroups, primaryNav } from '@/data/navigation';
import { useEventListener } from '@/hooks/useEventListener';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn } from '@/lib/cn';
import { anchors, paths } from '@/routes/paths';

import styles from './Header.module.css';

/**
 * Sticky site header: announcement bar, primary navigation with a services
 * mega-menu, and the mobile drawer.
 */
export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const serviceGroups = getServiceMenuGroups();

  useScrollLock(isMenuOpen);

  // Close the drawer whenever the route (or hash) changes. Adjusting state
  // during render — rather than in an effect — avoids a flash of the open
  // drawer on the new page.
  const locationKey = `${location.pathname}${location.hash}`;
  const [lastLocationKey, setLastLocationKey] = useState(locationKey);

  if (lastLocationKey !== locationKey) {
    setLastLocationKey(locationKey);
    setMenuOpen(false);
  }

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  return (
    <header className={styles.header}>
      <TopBar />

      <Container className={styles.bar}>
        <Logo />

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((item) => (
              <li key={item.id} className={item.menu ? styles.hasMenu : undefined}>
                <Link to={item.to} className={styles.navLink}>
                  {item.label}
                  {item.menu ? <span aria-hidden="true"> ▾</span> : null}
                </Link>

                {item.menu === 'services' ? (
                  <div className={cn(styles.dropdown, styles.mega)}>
                    {serviceGroups.map((group) => (
                      <div key={group.id}>
                        <h2 className={styles.megaTitle}>{group.title}</h2>
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.id}>
                              <Link to={link.to} className={styles.megaLink}>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.menu === 'company' ? (
                  <div className={cn(styles.dropdown, styles.simple)}>
                    <ul>
                      {companyLinks.map((link) => (
                        <li key={link.id}>
                          <Link to={link.to} className={styles.simpleLink}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={company.phone.href}>
            {company.phone.display}
          </a>
          <Button to={anchors.contact} size="sm" className={styles.cta}>
            Get a Free Site Inspection →
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(styles.burger, isMenuOpen && styles.burgerOpen)}
              aria-hidden="true"
            />
          </button>
        </div>
      </Container>

      <MobileNav
        id="mobile-navigation"
        open={isMenuOpen}
        serviceGroups={serviceGroups}
        companyLinks={companyLinks}
        onNavigate={() => setMenuOpen(false)}
        servicesIndexPath={paths.services}
      />
    </header>
  );
}
