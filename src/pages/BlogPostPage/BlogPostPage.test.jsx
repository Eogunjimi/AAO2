import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { posts } from '@/data/posts';
import { paths } from '@/routes/paths';

import BlogPostPage from './BlogPostPage';

const post = posts[0];

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path={paths.notFound} element={<p>Not found</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe('<BlogPostPage />', () => {
  it('renders the article body under a single h1', () => {
    renderAt(paths.blogPost(post.slug));

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(post.title);

    expect(screen.getByText(post.intro)).toBeInTheDocument();
    expect(screen.getByText(post.takeaway)).toBeInTheDocument();
  });

  it('renders every section heading and paragraph', () => {
    renderAt(paths.blogPost(post.slug));

    post.sections.forEach((section) => {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument();
      section.body.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
    });
  });

  it('shows a machine-readable publication date', () => {
    const { container } = renderAt(paths.blogPost(post.slug));

    expect(container.querySelector('time')).toHaveAttribute('datetime', post.publishedAt);
  });

  it('links onward to related posts, never to itself', () => {
    renderAt(paths.blogPost(post.slug));

    const links = [...document.querySelectorAll('a[href^="/blog/"]')].map((a) =>
      a.getAttribute('href'),
    );

    expect(links.length).toBeGreaterThan(0);
    expect(links).not.toContain(paths.blogPost(post.slug));
  });

  it('redirects an unknown slug to the 404 route', () => {
    renderAt('/blog/not-a-real-post');

    expect(screen.getByText('Not found')).toBeInTheDocument();
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
