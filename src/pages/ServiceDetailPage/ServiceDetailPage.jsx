import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Seo } from '@/components/common/Seo';
import { ContactSection } from '@/components/sections/home';
import {
  RelatedServices,
  ServiceBenefits,
  ServiceFaq,
  ServiceHero,
  ServiceIntro,
  ServiceProcess,
  ServiceReviews,
  ServiceSigns,
  ServiceSwitcher,
} from '@/components/sections/service';
import { serviceFaqs } from '@/data/faqs';
import { getRelatedServices, getServiceBySlug } from '@/lib/services';
import { buildFaqSchema, buildServiceSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

/** Detail page for a single service, addressed by slug. */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  const faqs = useMemo(() => {
    if (!service) return [];
    return [{ id: `${service.slug}-faq`, ...service.faq }, ...serviceFaqs];
  }, [service]);

  const jsonLd = useMemo(() => {
    if (!service) return [];
    return [buildServiceSchema(service), buildFaqSchema(faqs)];
  }, [service, faqs]);

  // Unknown slugs fall through to the 404 route rather than rendering an empty shell.
  if (!service) return <Navigate to={paths.notFound} replace />;

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        image={service.image}
        jsonLd={jsonLd}
      />

      <ServiceSwitcher activeSlug={service.slug} />
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceSigns service={service} />
      <ServiceBenefits benefits={service.benefits} />
      <ServiceProcess />
      <ServiceReviews />
      <ServiceFaq faqs={faqs} />
      <RelatedServices services={getRelatedServices(service.slug)} />
      <ContactSection defaultService={service.slug} />
    </>
  );
}
