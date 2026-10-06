import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { posts } from '@/data/posts';
import { paths } from '@/routes/paths';

import { PostCard } from './PostCard';

const post = posts[0];

const renderCard = () =>
  render(
    <MemoryRouter>
      <PostCard post={post} />
    </MemoryRouter>,
  );

describe('<PostCard />', () => {
  it('links the title to the full article', () => {
    renderCard();

    const link = screen.getByRole('link', { name: post.title });
    expect(link).toHaveAttribute('href', paths.blogPost(post.slug));
  });

  it('exposes exactly one link, named by the post rather than "Read now"', () => {
    renderCard();

    // The whole card is clickable via a stretched pseudo-element, so the
    // accessibility tree must still contain a single, meaningfully named link.
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.queryByRole('link', { name: /read now/i })).not.toBeInTheDocument();
  });

  it('keeps the "Read now…" affordance visible but out of the a11y tree', () => {
    const { container } = renderCard();

    const readNow = screen.getByText(/read now/i);
    expect(readNow).toBeInTheDocument();
    expect(readNow).toHaveAttribute('aria-hidden', 'true');

    // The stretched link is what makes that text clickable.
    expect(container.querySelector('a').className).toBeTruthy();
  });

  it('renders the post image, category and excerpt', () => {
    renderCard();

    expect(screen.getByAltText(post.alt)).toHaveAttribute('src', post.image);
    expect(screen.getByText(new RegExp(post.category))).toBeInTheDocument();
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });
});
