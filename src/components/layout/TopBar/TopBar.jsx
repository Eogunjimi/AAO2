import { Container } from '@/components/ui';
import { company } from '@/data/company';

import styles from './TopBar.module.css';

/** Announcement strip above the header. */
export function TopBar() {
  return (
    <div className={styles.topbar}>
      <Container className={styles.inner}>
        <p>⚡ Free site inspections across Lagos — book while seasonal slots last</p>
        <p className={styles.contacts}>
          <a href={company.phone.href}>{company.phone.display}</a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </Container>
    </div>
  );
}
