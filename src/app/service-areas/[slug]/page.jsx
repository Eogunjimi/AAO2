import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/common/JsonLd';
import { AreaIntro, AreaSection } from '@/components/sections/area';
import { ContactSection, ProcessSection, TrustBadges } from '@/components/sections/home';
import { FaqBand } from '@/components/sections/shared/FaqBand';
import { PageHero } from '@/components/sections/shared/PageHero';
import { propertyTypes, serviceAreaPages, systemTypes, whatYouGet } from '@/data/areas';
import { company } from '@/data/company';
import { getAreaBySlug, getAreaFaqs } from '@/lib/areas';
import { buildMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/structuredData';
import { anchors, paths } from '@/routes/paths';

/** One prerendered HTML file per Lagos neighbourhood. */
export function generateStaticParams() {
  return serviceAreaPages.map((area) => ({ slug: area.slug }));
}

/** The trail rendered by the hero and emitted as BreadcrumbList. */
function breadcrumbFor(area) {
  return [
    { label: 'Home', to: paths.home },
    { label: 'Service Areas', to: anchors.areas },
    { label: area.name },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) return {};

  return buildMetadata({
    title: `Solar & Inverter Installation in ${area.name} | ${company.shortName} Engineering`,
    absoluteTitle: true,
    description: area.intro[0],
    image: area.heroImage,
    path: paths.serviceArea(area.slug),
  });
}

/** Landing page for one Lagos neighbourhood we serve. */
export default async function ServiceAreaPage({ params }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) notFound();

  const faqs = getAreaFaqs(area);
  const breadcrumb = breadcrumbFor(area);

  return (
    <>
      <JsonLd schema={[buildFaqSchema(faqs), buildBreadcrumbSchema(breadcrumb)]} />

      <PageHero
        id="area-title"
        eyebrow="Service Area"
        title={area.heroTitle}
        keyword={area.heroKeyword}
        subtitle={area.heroSubtitle}
        image={area.heroImage}
        breadcrumb={breadcrumb}
      />

      <TrustBadges />

      <AreaIntro area={area} />

      <AreaSection
        id="area-why-title"
        tone="wash"
        title={
          <>
            Why Homeowners and Businesses Choose {company.shortName} for <em>{area.name}</em> Solar
            Installation
          </>
        }
        body={area.why}
        list={whatYouGet}
      />

      <AreaSection
        id="area-trust-title"
        title={
          <>
            Trusted Solar and Inverter Installer <em>{area.name}</em> Home and Business Owners Can
            Rely On
          </>
        }
        body={area.trust}
        list={propertyTypes}
      />

      <AreaSection
        id="area-systems-title"
        tone="wash"
        title={
          <>
            Solar and Inverter Systems Designed for <em>{area.name}</em>
          </>
        }
        body={area.systems}
        list={systemTypes}
      />

      <ProcessSection
        id="area-process"
        showFooter={false}
        title={
          <>
            Our <em>{area.name}</em> Solar Installation Process
          </>
        }
      />

      <ContactSection defaultService="solar-inverter" />

      <FaqBand id="area-faq-title" title={`${area.name}: Your Questions Answered`} faqs={faqs} />
    </>
  );
}
