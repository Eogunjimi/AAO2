import ServicesPageContent from '@/views/ServicesPage/ServicesPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Services — Solar, Electrical, Security & ICT',
  description:
    'Solar, electrical, CCTV, access control, automation and ICT services by AAO Engineering Services — assessed properly, installed neatly, supported for life.',
  image: '/images/hero-solar.jpg',
  pathname: '/services',
});

export default function ServicesRoute() {
  return <ServicesPageContent />;
}
