import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/common/JsonLd';
import { ContactSection } from '@/components/sections/home';
import { PageHero } from '@/components/sections/shared/PageHero';
import { Container, PostCard, Reveal, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
import { posts } from '@/data/posts';
import { buildMetadata } from '@/lib/metadata';
import { formatPostDate, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

import styles from './post.module.css';

/** One prerendered HTML file per article. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/** The trail rendered by the hero and emitted as BreadcrumbList. */
function breadcrumbFor(post) {
  return [
    { label: 'Home', to: paths.home },
    { label: 'Blog', to: paths.blog },
    { label: post.title },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    path: paths.blogPost(post.slug),
    type: 'article',
    article: { publishedTime: post.publishedAt, section: post.category },
  });
}

/** A single article, addressed by slug. */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const breadcrumb = breadcrumbFor(post);

  return (
    <>
      <JsonLd schema={[buildArticleSchema(post), buildBreadcrumbSchema(breadcrumb)]} />

      <PageHero
        id="post-title"
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        image={post.image}
        breadcrumb={breadcrumb}
      />

      <Section aria-labelledby="post-title">
        <Container className={styles.layout}>
          <article className={styles.article}>
            <Reveal>
              <p className={styles.meta}>
                By {company.name} ·{' '}
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> ·{' '}
                {post.readMinutes} min read
              </p>

              <p className={styles.standfirst}>{post.intro}</p>
            </Reveal>

            {post.sections.map((section) => (
              <Reveal key={section.id} className={styles.block}>
                <h2 className={styles.heading}>{section.heading}</h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className={styles.list}>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}

            <Reveal>
              <p className={styles.takeaway}>{post.takeaway}</p>
            </Reveal>
          </article>
        </Container>
      </Section>

      {related.length ? (
        <Section tone="dark" aria-labelledby="related-posts-title">
          <Container>
            <SectionHeading
              id="related-posts-title"
              align="center"
              tone="inverse"
              eyebrow="Keep reading"
              title={
                <>
                  More from the <em>AAO</em> blog
                </>
              }
            />

            <Reveal>
              <ul className={styles.related}>
                {related.map((item) => (
                  <li key={item.id}>
                    <PostCard post={item} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <ContactSection />
    </>
  );
}
