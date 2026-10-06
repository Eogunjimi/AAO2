import { FloatingWhatsapp } from '@/components/layout/FloatingWhatsapp';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';

import styles from './SiteLayout.module.css';

/**
 * Shell shared by every route: skip link, header, main landmark and footer.
 *
 * Rendered from the App Router's root layout, so it persists across
 * navigations and never re-mounts. Scroll restoration and hash scrolling are
 * handled by Next itself (with `scroll-behavior: smooth` from `base.css`),
 * which is why the SPA's `<ScrollManager />` no longer exists.
 */
export function SiteLayout({ children }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
