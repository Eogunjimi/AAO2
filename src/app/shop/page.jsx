import { ComingSoon, comingSoonMetadata } from '@/components/common/ComingSoon';
import { paths } from '@/routes/paths';

export const metadata = comingSoonMetadata('shop', paths.shop);

export default function ShopPage() {
  return <ComingSoon pageKey="shop" />;
}
