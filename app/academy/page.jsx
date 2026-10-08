import ComingSoonPageContent from '@/views/ComingSoonPage/ComingSoonPage';
import { buildMetadata } from '@/lib/metadata';
import { upcomingPages } from '@/data/pages';

const pageKey = 'academy';

export const metadata = buildMetadata({
  title: `${upcomingPages[pageKey].title} — coming soon`,
  description: upcomingPages[pageKey].body,
  pathname: '/academy',
  noIndex: true,
});

export default function AcademyRoute() {
  return <ComingSoonPageContent pageKey={pageKey} />;
}
