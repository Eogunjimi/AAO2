'use client';

import { Seo } from '@/components/common/Seo';
import { AreaIntro, AreaSection } from '@/components/sections/area';
import { ContactSection, ProcessSection, TrustBadges } from '@/components/sections/home';
import { FaqBand } from '@/components/sections/shared/FaqBand';
import { PageHero } from '@/components/sections/shared/PageHero';
import { propertyTypes, systemTypes, whatYouGet } from '@/data/areas';
import { company } from '@/data/company';
import { getAreaBySlug, getAreaFaqs } from '@/lib/areas';
import { Navigate, useParams } from '@/lib/router';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/structuredData';
import { anchors, paths } from '@/routes/paths';

/**
 * Landing page for one Lagos neighbourhood we serve.
 *
 * Accepts `slug` as a prop (App Router pages pass it) and falls back to
 * useParams() so client navigations and tests resolve the right area.
 *
 * @param {Object} [props]
 * @param {string} [props.slug]
 */
export default function ServiceAreaPage({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const area = getAreaBySlug(slug);
  if (!area) return <Navigate to={paths.notFound} replace />;

  const faqs = getAreaFaqs(area);

  const breadcrumb = [
    { label: 'Home', to: '/' },
    { label: 'Service Areas', to: anchors.areas },
    { label: area.name },
  ];

  return (
    <>
      <Seo
        title={`Solar & Inverter Installation in ${area.name} | ${company.shortName} Engineering`}
        description={area.intro[0]}
        image={area.heroImage}
        jsonLd={[buildFaqSchema(faqs), buildBreadcrumbSchema(breadcrumb)]}
      />

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
