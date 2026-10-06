import { JsonLd } from '@/components/common/JsonLd';
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
import { buildMetadata } from '@/lib/metadata';
import { buildFaqSchema, buildLocalBusinessSchema } from '@/lib/structuredData';

export const metadata = buildMetadata({
  title: `${company.name} — Power & Security Solutions in Lagos`,
  absoluteTitle: true,
  description: company.description,
  image: '/images/ion-hero.jpg',
  path: '/',
});

/** Marketing home page. */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={[buildLocalBusinessSchema(), buildFaqSchema(generalFaqs)]} />

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
