import ComingSoonPageContent from '@/views/ComingSoonPage/ComingSoonPage';
import { buildMetadata } from '@/lib/metadata';
import { upcomingPages } from '@/data/pages';

const pageKey = 'career';

export const metadata = buildMetadata({
  title: `${upcomingPages[pageKey].title} — coming soon`,
  description: upcomingPages[pageKey].body,
  pathname: '/career',
  noIndex: true,
});

export default function CareerRoute() {
  return <ComingSoonPageContent pageKey={pageKey} />;
}
