import HomePageContent from '@/views/HomePage/HomePage';
import { buildMetadata } from '@/lib/metadata';
import { company } from '@/data/company';
import { generalFaqs } from '@/data/faqs';
import { buildFaqSchema, buildLocalBusinessSchema } from '@/lib/structuredData';

export const metadata = buildMetadata({
  title: `${company.name} — Power & Security Solutions in Lagos`,
  description: company.description,
  image: '/images/ion-hero.jpg',
  pathname: '/',
});

/**
 * Marketing home page.
 *
 * Server component that composes the original `HomePage` section tree. The
 * JSON-LD schemas are rendered in a tiny inline script tag so they arrive in
 * the server HTML (the old SPA set them up via a client-side effect).
 */
export default function HomePage() {
  const jsonLd = [buildLocalBusinessSchema(), buildFaqSchema(generalFaqs)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageContent />
    </>
  );
}
