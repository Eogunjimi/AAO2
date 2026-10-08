import { notFound } from 'next/navigation';

import ServiceDetailContent from '@/views/ServiceDetailPage/ServiceDetailPage';
import { buildMetadata } from '@/lib/metadata';
import { services } from '@/data/services';
import { getServiceBySlug, getServicePage } from '@/lib/services';
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return buildMetadata({
      title: 'Service not found',
      pathname: paths.service(slug),
      noIndex: true,
    });
  }
  const page = getServicePage(service);
  return buildMetadata({
    title: service.title,
    description: service.summary,
    image: page.heroImage,
    pathname: paths.service(slug),
  });
}

export default async function ServiceDetailRoute({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const page = getServicePage(service);
  const breadcrumb = [
    { label: 'Home', to: paths.home },
    { label: 'Services', to: paths.services },
    { label: service.title },
  ];
  const jsonLd = [buildServiceSchema(service), buildFaqSchema(page.faqs), buildBreadcrumbSchema(breadcrumb)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent slug={slug} />
    </>
  );
}
