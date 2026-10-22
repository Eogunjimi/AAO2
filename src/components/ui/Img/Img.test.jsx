import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Img } from './Img';

describe('<Img />', () => {
  it('sets intrinsic width and height for a known local image', () => {
    const { container } = render(<Img src="/images/about-engineer.jpg" alt="Engineer" />);
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('width', '922');
    expect(img).toHaveAttribute('height', '1152');
  });

  it('lets explicit width and height props win', () => {
    const { container } = render(
      <Img src="/images/about-engineer.jpg" alt="" width={100} height={120} />,
    );
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '120');
  });

  it('adds no size attributes for remote images it cannot measure', () => {
    const { container } = render(<Img src="https://example.com/logo.png" alt="Logo" />);
    const img = container.querySelector('img');

    expect(img).not.toHaveAttribute('width');
    expect(img).not.toHaveAttribute('height');
  });

  it('passes other attributes through', () => {
    const { container } = render(
      <Img src="/images/about-engineer.jpg" alt="Engineer" loading="lazy" className="x" />,
    );
    const img = container.querySelector('img');

    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveClass('x');
  });
});
