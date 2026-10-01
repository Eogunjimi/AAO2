import { Navigate, useParams } from 'react-router-dom';

import { Seo } from '@/components/common/Seo';
import { ContactSection } from '@/components/sections/home';
import { PageHero } from '@/components/sections/shared/PageHero';
import { Container, PostCard, Reveal, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
import { formatPostDate, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { buildArticleSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

import styles from './BlogPostPage.module.css';

/** A single article, addressed by slug. */
export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Unknown slugs fall through to the 404 route rather than an empty shell.
  if (!post) return <Navigate to={paths.notFound} replace />;

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        jsonLd={[buildArticleSchema(post)]}
      />

      <PageHero
        id="post-title"
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        image={post.image}
        breadcrumb={[
          { label: 'Home', to: paths.home },
          { label: 'Blog', to: paths.blog },
          { label: post.title },
        ]}
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
