import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/common/JsonLd';
import { ContactSection, ProcessSection, TrustBadges } from '@/components/sections/home';
import {
  RelatedServices,
  ServiceBrief,
  ServiceHero,
  ServiceReviews,
} from '@/components/sections/service';
import { FaqBand } from '@/components/sections/shared/FaqBand';
import { ProjectMarquee } from '@/components/sections/shared/ProjectMarquee';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/metadata';
import { getServiceBySlug, getServicePage } from '@/lib/services';
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

/**
 * Prerender one HTML file per service at build time. Adding a service to
 * `src/data/services.js` is all it takes for its page — and its sitemap entry
 * — to exist.
 */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/** The trail rendered by the hero and emitted as BreadcrumbList. */
function breadcrumbFor(service) {
  return [
    { label: 'Home', to: paths.home },
    { label: 'Services', to: paths.services },
    { label: service.title },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.summary,
    image: getServicePage(service).heroImage,
    path: paths.service(service.slug),
  });
}

/** Detail page for a single service, addressed by slug. */
export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Unknown slugs render the real 404 page with a 404 status, rather than the
  // SPA's client-side redirect (which always served HTTP 200).
  if (!service) notFound();

  const page = getServicePage(service);
  const breadcrumb = breadcrumbFor(service);

  return (
    <>
      <JsonLd
        schema={[
          buildServiceSchema(service),
          buildFaqSchema(page.faqs),
          buildBreadcrumbSchema(breadcrumb),
        ]}
      />

      <ServiceHero service={service} page={page} breadcrumb={breadcrumb} />
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
      <RelatedServices slug={service.slug} />
      <ContactSection defaultService={service.slug} />
      <FaqBand
        id="service-faq-title"
        title={`${service.title}: Your Questions Answered`}
        faqs={page.faqs}
      />
    </>
  );
}
