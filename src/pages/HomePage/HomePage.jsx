import { useMemo } from 'react';

import { Seo } from '@/components/common/Seo';
import {
  AboutSection,
  ContactSection,
  FaqSection,
  HeroSection,
  InsightsSection,
  OfferSection,
  ProcessSection,
  ReviewsSection,
  ServiceAreasSection,
  ServicesShowcase,
  TrustBadges,
  WhyChooseSection,
  WorkSection,
} from '@/components/sections/home';
import { company } from '@/data/company';
import { generalFaqs } from '@/data/faqs';
import { buildFaqSchema, buildLocalBusinessSchema } from '@/lib/structuredData';

/** Marketing home page. */
export default function HomePage() {
  const jsonLd = useMemo(() => [buildLocalBusinessSchema(), buildFaqSchema(generalFaqs)], []);

  return (
    <>
      <Seo
        title={`${company.name} — Power & Security Solutions in Lagos`}
        description={company.description}
        image="/images/ion-hero.jpg"
        jsonLd={jsonLd}
      />

      <HeroSection />
      <TrustBadges />
      <ReviewsSection />
      <AboutSection />
      <ServicesShowcase />
      <WhyChooseSection />
      <WorkSection />
      <ProcessSection />
      <OfferSection />
      <ContactSection />
      <InsightsSection />
      <FaqSection />
      <ServiceAreasSection />
    </>
  );
}
