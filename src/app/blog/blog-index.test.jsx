import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InsightsSection } from '@/components/sections/home/InsightsSection';
import { posts } from '@/data/posts';
import { renderPage } from '@/test/serverComponent';

import BlogPage from './page';

const postTitles = () =>
  screen
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent)
    .filter((title) => posts.some((post) => post.title === title));

describe('blog index route', () => {
  it('leads with a single headline', async () => {
    await renderPage(BlogPage);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/guides/i);
  });

  it('lists every post', async () => {
    await renderPage(BlogPage);

    expect(postTitles()).toEqual(posts.map((post) => post.title));
  });

  it('renders each card with its image, category and excerpt', async () => {
    await renderPage(BlogPage);
    const post = posts[0];

    expect(screen.getByAltText(post.alt)).toHaveAttribute('src', post.image);
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(post.category))).toBeInTheDocument();
  });

  it('renders the same card markup as the home page insights rail', async () => {
    // Both surfaces must stay visually identical, so they share <PostCard />.
    const { container: blog } = await renderPage(BlogPage);
    const blogCard = blog.querySelector('article').className;

    const { container: home } = render(<InsightsSection />);
    const homeCard = home.querySelector('article').className;

    expect(blogCard).toBe(homeCard);
  });
});
