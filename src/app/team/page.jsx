import { ComingSoon, comingSoonMetadata } from '@/components/common/ComingSoon';
import { paths } from '@/routes/paths';

export const metadata = comingSoonMetadata('team', paths.team);

export default function TeamPage() {
  return <ComingSoon pageKey="team" />;
}
