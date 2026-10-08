import ComingSoonPageContent from '@/views/ComingSoonPage/ComingSoonPage';
import { buildMetadata } from '@/lib/metadata';
import { upcomingPages } from '@/data/pages';

const pageKey = 'team';

export const metadata = buildMetadata({
  title: `${upcomingPages[pageKey].title} — coming soon`,
  description: upcomingPages[pageKey].body,
  pathname: '/team',
  noIndex: true,
});

export default function TeamRoute() {
  return <ComingSoonPageContent pageKey={pageKey} />;
}
