import { JsonLd } from '@/components/common/JsonLd';
import { ContactSection, TrustBadges } from '@/components/sections/home';
import { PageHero } from '@/components/sections/shared/PageHero';
import { Container, PostCard, Reveal, Section, SectionHeading } from '@/components/ui';
import { posts } from '@/data/posts';
import { buildMetadata } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

import styles from './blog.module.css';

const breadcrumb = [{ label: 'Home', to: paths.home }, { label: 'Blog' }];

export const metadata = buildMetadata({
  title: 'Blog — solar, security and electrical guides for Lagos homes',
  description:
    'Practical guides from AAO Engineering Services: sizing an inverter and battery bank, planning CCTV coverage, solar versus generator costs, load audits, automatic gates and structured cabling.',
  image: '/images/warm-detail.jpg',
  path: paths.blog,
});

/** Index of every guide and comparison, using the home page's card. */
export default function BlogPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumb)} />

      <PageHero
        id="blog-title"
        eyebrow="Blog"
        title="Guides That Help Lagos Homes and Businesses Win Power"
        keyword="Guides"
        subtitle="What we have learned across 200+ installations, written down."
        image="/images/warm-detail.jpg"
        breadcrumb={breadcrumb}
      />

      <TrustBadges />

      {/*
        Dark tone matches the home page's insights rail, so the cards read
        exactly the same on both pages.
      */}
      <Section tone="dark" aria-labelledby="blog-posts-title">
        <Container>
          <SectionHeading
            id="blog-posts-title"
            align="center"
            tone="inverse"
            eyebrow="Insights"
            title={
              <>
                Every guide we have <em>published</em>
              </>
            }
          />

          <Reveal>
            <ul className={styles.grid}>
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <ContactSection />
    </>
  );
}
