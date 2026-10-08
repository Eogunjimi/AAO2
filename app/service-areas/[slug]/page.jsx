import { notFound } from 'next/navigation';

import ServiceAreaContent from '@/views/ServiceAreaPage/ServiceAreaPage';
import { buildMetadata } from '@/lib/metadata';
import { serviceAreaPages } from '@/data/areas';
import { company } from '@/data/company';
import { getAreaBySlug, getAreaFaqs } from '@/lib/areas';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/structuredData';
import { anchors } from '@/routes/paths';

export function generateStaticParams() {
  return serviceAreaPages.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) {
    return buildMetadata({
      title: 'Area not found',
      pathname: `/service-areas/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: `Solar & Inverter Installation in ${area.name} | ${company.shortName} Engineering`,
    description: area.intro[0],
    image: area.heroImage,
    pathname: `/service-areas/${slug}`,
  });
}

export default async function ServiceAreaRoute({ params }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const faqs = getAreaFaqs(area);
  const breadcrumb = [
    { label: 'Home', to: '/' },
    { label: 'Service Areas', to: anchors.areas },
    { label: area.name },
  ];
  const jsonLd = [buildFaqSchema(faqs), buildBreadcrumbSchema(breadcrumb)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceAreaContent slug={slug} />
    </>
  );
}
