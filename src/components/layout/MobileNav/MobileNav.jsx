import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { company } from '@/data/company';
import { anchors } from '@/routes/paths';

import styles from './MobileNav.module.css';

/**
 * Slide-down navigation drawer for small screens.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Array<{id: string, title: string, links: Array}>} props.serviceGroups
 * @param {Array<{id: string, label: string, to: string}>} props.companyLinks
 * @param {() => void} props.onNavigate
 * @param {string} props.servicesIndexPath
 */
export function MobileNav({
  id,
  open,
  serviceGroups,
  companyLinks,
  onNavigate,
  servicesIndexPath,
}) {
  return (
    <div id={id} className={styles.drawer} hidden={!open}>
      <nav aria-label="Mobile">
        <ul className={styles.list}>
          <li>
            <Link to="/" className={styles.link} onClick={onNavigate}>
              Home
            </Link>
          </li>
          <li>
            <Link to={servicesIndexPath} className={styles.link} onClick={onNavigate}>
              All Services
            </Link>
          </li>
        </ul>

        {serviceGroups.map((group) => (
          <section key={group.id}>
            <h2 className={styles.groupTitle}>{group.title}</h2>
            <ul className={styles.list}>
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link to={link.to} className={styles.link} onClick={onNavigate}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className={styles.groupTitle}>Company</h2>
          <ul className={styles.list}>
            <li>
              <Link to={anchors.work} className={styles.link} onClick={onNavigate}>
                Past Work
              </Link>
            </li>
            {companyLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.to} className={styles.link} onClick={onNavigate}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={anchors.contact} className={styles.link} onClick={onNavigate}>
                Contact
              </Link>
            </li>
          </ul>
        </section>
      </nav>

      <div className={styles.footer}>
        <Button to={anchors.contact} block onClick={onNavigate}>
          Get a Free Site Inspection →
        </Button>
        <a className={styles.phone} href={company.phone.href}>
          Call {company.phone.display}
        </a>
      </div>
    </div>
  );
}
