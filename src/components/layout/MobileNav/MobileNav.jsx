import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Icon } from '@/components/ui';
import { company, primaryCtaLabel } from '@/data/company';
import { cn } from '@/lib/cn';
import { anchors, paths } from '@/routes/paths';

import styles from './MobileNav.module.css';

/**
 * Slide-down navigation drawer for small screens.
 *
 * Mirrors the desktop structure: the two menus become disclosures so the
 * drawer opens short and expands only where the visitor asks.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Array<{id: string, title: string, links: Array}>} props.serviceGroups
 * @param {Array<{id: string, label: string, to: string}>} props.aboutLinks
 * @param {() => void} props.onNavigate
 */
export function MobileNav({ id, open, serviceGroups, aboutLinks, onNavigate }) {
  const [openSection, setOpenSection] = useState(null);

  // Collapse the sections whenever the drawer closes, without an effect.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setOpenSection(null);
  }

  const toggle = (section) => setOpenSection((current) => (current === section ? null : section));

  const renderDisclosure = (section, label, children) => {
    const isOpen = openSection === section;
    const panelId = `${id}-${section}`;

    return (
      <li>
        <button
          type="button"
          className={cn(styles.link, styles.disclosure, isOpen && styles.disclosureOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(section)}
        >
          {label}
          <span className={styles.caret} aria-hidden="true" />
        </button>

        <div id={panelId} hidden={!isOpen} className={cn(styles.panel, isOpen && styles.panelOpen)}>
          <div className={styles.panelInner}>{children}</div>
        </div>
      </li>
    );
  };

  return (
    <div id={id} className={styles.drawer} hidden={!open}>
      <nav aria-label="Mobile">
        <ul className={styles.list}>
          <li>
            <Link to={paths.home} className={styles.link} onClick={onNavigate}>
              Home
            </Link>
          </li>

          {renderDisclosure(
            'about',
            'About',
            <ul className={styles.sublist}>
              {aboutLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.to} className={styles.subLink} onClick={onNavigate}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>,
          )}

          {renderDisclosure(
            'services',
            'Services',
            <>
              <ul className={styles.sublist}>
                <li>
                  <Link to={paths.services} className={styles.subLink} onClick={onNavigate}>
                    All Services
                  </Link>
                </li>
              </ul>

              {serviceGroups.map((group) => (
                <div key={group.id} className={styles.group}>
                  <p className={styles.groupTitle}>{group.title}</p>
                  <ul className={styles.sublist}>
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <Link to={link.to} className={styles.subLink} onClick={onNavigate}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>,
          )}

          <li>
            <Link to={paths.projects} className={styles.link} onClick={onNavigate}>
              Projects
            </Link>
          </li>
          <li>
            <Link to={anchors.contact} className={styles.link} onClick={onNavigate}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <Button href={company.phone.whatsapp} variant="whatsapp" block className={styles.whatsapp}>
          <Icon name="whatsapp" size={17} />
          Chat on WhatsApp
        </Button>
        <Button to={anchors.contact} block onClick={onNavigate}>
          {primaryCtaLabel}
        </Button>
        <a className={styles.phone} href={company.phone.href}>
          Call {company.phone.display}
        </a>
      </div>
    </div>
  );
}
