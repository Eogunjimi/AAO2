import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { posts } from '@/data/posts';
import { paths } from '@/routes/paths';
import { renderPage, routeParams } from '@/test/serverComponent';

import BlogPostPage, { generateMetadata, generateStaticParams } from './page';

const post = posts[0];

const renderSlug = (slug) => renderPage(BlogPostPage, { params: routeParams({ slug }) });

describe('blog post route', () => {
  it('prerenders one page per post', () => {
    expect(generateStaticParams()).toEqual(posts.map((entry) => ({ slug: entry.slug })));
  });

  it('renders the article body under a single h1', async () => {
    await renderSlug(post.slug);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(post.title);

    expect(screen.getByText(post.intro)).toBeInTheDocument();
    expect(screen.getByText(post.takeaway)).toBeInTheDocument();
  });

  it('renders every section heading and paragraph', async () => {
    await renderSlug(post.slug);

    post.sections.forEach((section) => {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument();
      section.body.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
    });
  });

  it('shows a machine-readable publication date', async () => {
    const { container } = await renderSlug(post.slug);

    expect(container.querySelector('time')).toHaveAttribute('datetime', post.publishedAt);
  });

  it('links onward to related posts, never to itself', async () => {
    const { container } = await renderSlug(post.slug);

    const links = [...container.querySelectorAll('a[href^="/blog/"]')].map((a) =>
      a.getAttribute('href'),
    );

    expect(links.length).toBeGreaterThan(0);
    expect(links).not.toContain(paths.blogPost(post.slug));
  });

  it('describes itself to crawlers as an article', async () => {
    const metadata = await generateMetadata({ params: routeParams({ slug: post.slug }) });

    expect(metadata.title).toBe(post.title);
    expect(metadata.openGraph.type).toBe('article');
    expect(metadata.openGraph.publishedTime).toBe(post.publishedAt);
    expect(metadata.alternates.canonical).toMatch(new RegExp(`/blog/${post.slug}$`));
  });

  it('answers an unknown slug with a 404', async () => {
    await expect(renderSlug('not-a-real-post')).rejects.toThrow('NEXT_NOT_FOUND');
  });
});

describe('post data', () => {
  it('gives every post a unique slug and the fields a page renders', () => {
    const slugs = posts.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    posts.forEach((entry) => {
      expect(entry.slug).toMatch(/^[a-z0-9-]+$/);
      expect(entry.image).toMatch(/^\/images\//);
      expect(entry.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.intro).toBeTruthy();
      expect(entry.takeaway).toBeTruthy();
      expect(entry.sections.length).toBeGreaterThan(0);
      entry.sections.forEach((section) => {
        expect(section.heading).toBeTruthy();
        expect(section.body.length).toBeGreaterThan(0);
      });
    });
  });
});
