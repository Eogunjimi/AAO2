import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from '@/components/ui';
import { services } from '@/data/services';
import { cn } from '@/lib/cn';
import { paths } from '@/routes/paths';

import styles from './ServiceSwitcher.module.css';

/**
 * Horizontal pill navigation between services. The active pill is scrolled
 * into view so visitors always see where they are in the catalogue.
 */
export function ServiceSwitcher({ activeSlug }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [activeSlug]);

  return (
    <div className={styles.switcher}>
      <Container>
        <nav aria-label="Services">
          <ul className={styles.row}>
            {services.map((service) => {
              const isActive = service.slug === activeSlug;
              return (
                <li key={service.slug}>
                  <NavLink
                    to={paths.service(service.slug)}
                    ref={isActive ? activeRef : undefined}
                    className={({ isActive: active }) => cn(styles.pill, active && styles.active)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {service.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
