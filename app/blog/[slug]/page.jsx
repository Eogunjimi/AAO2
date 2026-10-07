import { notFound } from 'next/navigation';

import BlogPostContent from '@/views/BlogPostPage/BlogPostPage';
import { buildMetadata } from '@/lib/metadata';
import { posts } from '@/data/posts';
import { getPostBySlug } from '@/lib/posts';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structuredData';
import { paths } from '@/routes/paths';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return buildMetadata({ title: 'Post not found', pathname: paths.blogPost(slug), noIndex: true });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    pathname: paths.blogPost(slug),
  });
}

export default async function BlogPostRoute({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumb = [
    { label: 'Home', to: paths.home },
    { label: 'Blog', to: paths.blog },
    { label: post.title },
  ];
  const jsonLd = [buildArticleSchema(post), buildBreadcrumbSchema(breadcrumb)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent slug={slug} />
    </>
  );
}
