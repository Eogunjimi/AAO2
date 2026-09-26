import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { company } from '@/data/company';

import { AboutSection } from './AboutSection';

describe('<AboutSection />', () => {
  it('credits the founder and the guarantee on the portrait', () => {
    render(<AboutSection />);

    expect(screen.getByText(company.founder)).toBeInTheDocument();
    expect(screen.getByText(company.founderRole)).toBeInTheDocument();
    expect(screen.getByText(company.guarantee)).toBeInTheDocument();
  });

  it('describes the portrait for screen readers', () => {
    render(<AboutSection />);

    const portrait = screen.getByRole('img', { name: new RegExp(company.founder, 'i') });
    expect(portrait).toHaveAttribute('src', '/images/about-engineer.jpg');
  });
});
