import { ComingSoon, comingSoonMetadata } from '@/components/common/ComingSoon';
import { paths } from '@/routes/paths';

export const metadata = comingSoonMetadata('career', paths.career);

export default function CareerPage() {
  return <ComingSoon pageKey="career" />;
}
