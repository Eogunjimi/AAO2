import { FloatingWhatsapp } from '@/components/layout/FloatingWhatsapp';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollManager } from '@/components/layout/ScrollManager';
import { SkipLink } from '@/components/layout/SkipLink';

import styles from './SiteLayout.module.css';

/**
 * Shell shared by every route: skip link, header, main landmark and footer.
 *
 * In Next.js App Router the root layout receives its page content as
 * `children` rather than rendering a router `<Outlet />`.
 */
export function SiteLayout({ children }) {
  return (
    <>
      <SkipLink />
      <ScrollManager />
      <Header />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
