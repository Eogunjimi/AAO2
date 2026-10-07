'use client';

import { Seo } from '@/components/common/Seo';
import { ContactSection, TrustBadges } from '@/components/sections/home';
import { PageHero } from '@/components/sections/shared/PageHero';
import { Container, PostCard, Reveal, Section, SectionHeading } from '@/components/ui';
import { posts } from '@/data/posts';
import { buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

import styles from './BlogPage.module.css';

/** Index of every guide and comparison. */
export default function BlogPage() {
  const breadcrumb = [{ label: 'Home', to: paths.home }, { label: 'Blog' }];

  return (
    <>
      <Seo
        title="Blog — solar, security and electrical guides for Lagos homes"
        description="Practical guides from AAO Engineering Services: sizing an inverter and battery bank, planning CCTV coverage, solar versus generator costs, load audits, automatic gates and structured cabling."
        image="/images/warm-detail.jpg"
        jsonLd={[buildBreadcrumbSchema(breadcrumb)]}
      />

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
