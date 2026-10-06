import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';
import { icons } from './icons';

/** The four quadrants of the Google "G", in registry order. */
const GOOGLE_BRAND_COLORS = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];

const fillsOf = (container) =>
  [...container.querySelectorAll('path')].map((path) => path.getAttribute('fill'));

describe('<Icon />', () => {
  it('paints a brand mark in its own colours when asked', () => {
    const { container } = render(<Icon name="google" brand />);

    expect(fillsOf(container)).toEqual(GOOGLE_BRAND_COLORS);
  });

  it('leaves the brand mark monochrome by default', () => {
    const { container } = render(<Icon name="google" />);

    // No per-path fill, so the stylesheet's currentColor applies and the mark
    // keeps inheriting the surrounding text colour.
    expect(fillsOf(container)).toEqual([null, null, null, null]);
  });

  it('ignores `brand` on icons that define no brand colours', () => {
    const { container } = render(<Icon name="facebook" brand />);

    expect(fillsOf(container)).toEqual([null]);
  });

  it('hides decorative icons from assistive tech but exposes titled ones', () => {
    const { container, rerender } = render(<Icon name="google" brand />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');

    rerender(<Icon name="google" brand title="Google" />);
    const labelled = container.querySelector('svg');
    expect(labelled).toHaveAttribute('role', 'img');
    expect(labelled).not.toHaveAttribute('aria-hidden');
  });
});

describe('icon registry', () => {
  it('gives every brand path a `d` and a hex fill', () => {
    Object.entries(icons).forEach(([name, icon]) => {
      icon.paths.forEach((path) => {
        if (typeof path === 'string') return;

        expect(path.d, `${name} path is missing its d`).toBeTruthy();
        expect(path.fill, `${name} fill is not a hex colour`).toMatch(/^#[0-9a-f]{6}$/);
      });
    });
  });
});
