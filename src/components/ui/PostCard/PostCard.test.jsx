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

  it('offers "Read now" as a real control, not decoration', () => {
    renderCard();

    const cta = screen.getByRole('link', { name: /read now/i });
    expect(cta).toHaveAttribute('href', paths.blogPost(post.slug));
    expect(cta).not.toHaveAttribute('aria-hidden');
    expect(cta).toHaveTextContent('Read now');
  });

  it('names the "Read now" control after the post it opens', () => {
    renderCard();

    // A grid of cards each offering a bare "Read now" tells a screen-reader
    // user nothing, so the accessible name carries the title too.
    expect(screen.getByRole('link', { name: `Read now: ${post.title}` })).toBeInTheDocument();
  });

  it('routes both the title and the button to the same post', () => {
    renderCard();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', paths.blogPost(post.slug));
    });
  });

  it('renders the post image, category and excerpt', () => {
    renderCard();

    expect(screen.getByAltText(post.alt)).toHaveAttribute('src', post.image);
    expect(screen.getByText(new RegExp(post.category))).toBeInTheDocument();
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });
});
