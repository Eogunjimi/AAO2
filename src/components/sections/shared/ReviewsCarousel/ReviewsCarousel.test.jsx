import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { reviews } from '@/data/reviews';

import { ReviewsCarousel } from './ReviewsCarousel';

/** matchMedia is stubbed to never match, so the suite runs at desktop width. */
const PER_VIEW = 3;

const renderCarousel = () => render(<ReviewsCarousel reviews={reviews} autoPlayMs={0} />);
const dots = () => screen.getAllByRole('button', { name: /^Show reviews/ });
const track = () => screen.getByRole('list');

describe('<ReviewsCarousel />', () => {
  it('renders every review with its rating and attribution', () => {
    renderCarousel();

    expect(screen.getAllByRole('figure')).toHaveLength(reviews.length);
    expect(screen.getByText(reviews[0].quote)).toBeInTheDocument();
    expect(
      screen.getByText(`${reviews[0].location} · Based on ${reviews[0].source} reviews`),
    ).toBeInTheDocument();
  });

  it('offers one dot per reachable window position', () => {
    renderCarousel();

    expect(dots()).toHaveLength(reviews.length - PER_VIEW + 1);
    expect(dots()[0]).toHaveAttribute('aria-current', 'true');
    expect(track().style.getPropertyValue('--index')).toBe('0');
  });

  it('advances and rewinds the window', async () => {
    const user = userEvent.setup();
    renderCarousel();

    await user.click(screen.getByRole('button', { name: 'Next reviews' }));
    expect(track().style.getPropertyValue('--index')).toBe('1');
    expect(dots()[1]).toHaveAttribute('aria-current', 'true');

    await user.click(screen.getByRole('button', { name: 'Previous reviews' }));
    expect(track().style.getPropertyValue('--index')).toBe('0');
  });

  it('jumps straight to a position from its dot', async () => {
    const user = userEvent.setup();
    renderCarousel();

    await user.click(dots()[2]);
    expect(track().style.getPropertyValue('--index')).toBe('2');
    expect(dots()[2]).toHaveAttribute('aria-current', 'true');
  });
});
