import { ComingSoon, comingSoonMetadata } from '@/components/common/ComingSoon';
import { paths } from '@/routes/paths';

export const metadata = comingSoonMetadata('academy', paths.academy);

export default function AcademyPage() {
  return <ComingSoon pageKey="academy" />;
}
