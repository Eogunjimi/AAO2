import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Seo } from '@/components/common/Seo';
import { ContactSection, ProcessSection, TrustBadges } from '@/components/sections/home';
import { ProjectMarquee } from '@/components/sections/shared/ProjectMarquee';
import {
  ServiceBrief,
  ServiceFaq,
  ServiceHero,
  ServiceReviews,
} from '@/components/sections/service';
import { getServiceBySlug, getServicePage } from '@/lib/services';
import { buildFaqSchema, buildServiceSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

/** Detail page for a single service, addressed by slug. */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  const page = useMemo(() => (service ? getServicePage(service) : null), [service]);

  const jsonLd = useMemo(() => {
    if (!service) return [];
    return [buildServiceSchema(service), buildFaqSchema(page.faqs)];
  }, [service, page]);

  // Unknown slugs fall through to the 404 route rather than rendering an empty shell.
  if (!service) return <Navigate to={paths.notFound} replace />;

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        image={page.heroImage}
        jsonLd={jsonLd}
      />

      <ServiceHero service={service} page={page} />
      <TrustBadges />
      <ServiceBrief service={service} page={page} />

      <ProcessSection
        id="service-process"
        steps={page.process}
        showFooter={false}
        title={
          <>
            {page.processTitle.lead} <em>{page.processTitle.accent}</em>
          </>
        }
      />

      <ProjectMarquee
        title={
          <>
            Work We Have <em>Already Delivered</em>
          </>
        }
        description="Completed installations across Lagos — the same crew, the same standards, whatever the job."
      />

      <ServiceReviews />
      <ContactSection defaultService={service.slug} />
      <ServiceFaq faqs={page.faqs} service={service} />
    </>
  );
}
