import { render, screen } from '@testing-library/react';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { reviews } from '@/data/reviews';

import { ReviewCard } from './ReviewCard';

const withAvatar = reviews.find((review) => review.avatar);
const withoutAvatar = { ...withAvatar, id: 'no-photo', avatar: undefined };

/** The portrait is decorative, so it is unreachable by role or alt text. */
const avatarImage = (container) => container.querySelector('img');

describe('<ReviewCard />', () => {
  it('renders the reviewer portrait when the review has one', () => {
    const { container } = render(<ReviewCard review={withAvatar} />);
    const image = avatarImage(container);

    expect(image).toHaveAttribute('src', withAvatar.avatar);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '48');
    expect(image).toHaveAttribute('height', '48');
  });

  it('keeps the portrait out of the accessibility tree', () => {
    const { container } = render(<ReviewCard review={withAvatar} />);

    // Empty alt plus an aria-hidden wrapper: the author's name is already
    // announced as text, so the photo must not repeat it.
    expect(avatarImage(container)).toHaveAttribute('alt', '');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(withAvatar.author)).toBeInTheDocument();
  });

  it('falls back to the author initials when there is no portrait', () => {
    const { container } = render(<ReviewCard review={withoutAvatar} />);

    expect(avatarImage(container)).toBeNull();
    // "Mrs. A. Bakare" → "AB": honorifics are dropped.
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});

describe('review data', () => {
  it('points every avatar at a file that exists in public/images', () => {
    reviews.forEach((review) => {
      if (!review.avatar) return;

      expect(review.avatar).toMatch(/^\/images\/.+\.(jpg|png|webp)$/);
      expect(existsSync(`public${review.avatar}`)).toBe(true);
    });
  });

  it('gives every review a unique id and the fields a card renders', () => {
    const ids = reviews.map((review) => review.id);
    expect(new Set(ids).size).toBe(ids.length);

    reviews.forEach((review) => {
      expect(review.quote).toBeTruthy();
      expect(review.author).toBeTruthy();
      expect(review.location).toBeTruthy();
      expect(review.rating).toBeGreaterThan(0);
    });
  });
});
