import ComingSoonPageContent from '@/views/ComingSoonPage/ComingSoonPage';
import { buildMetadata } from '@/lib/metadata';
import { upcomingPages } from '@/data/pages';

const pageKey = 'shop';

export const metadata = buildMetadata({
  title: `${upcomingPages[pageKey].title} — coming soon`,
  description: upcomingPages[pageKey].body,
  pathname: '/shop',
  noIndex: true,
});

export default function ShopRoute() {
  return <ComingSoonPageContent pageKey={pageKey} />;
}
