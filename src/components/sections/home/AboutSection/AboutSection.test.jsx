import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { company } from '@/data/company';

import { AboutSection } from './AboutSection';

describe('<AboutSection />', () => {
  it('credits the founder under the portrait', () => {
    render(<AboutSection />);

    expect(screen.getByText(company.founder, { selector: 'figcaption span' })).toBeInTheDocument();
    // The company name sits in its own <b>, so match the two parts separately.
    expect(screen.getByText(`${company.founderRole} of`)).toBeInTheDocument();
    expect(screen.getByText(company.name, { selector: 'b' })).toBeInTheDocument();
  });

  it('labels the guarantee medal and the portrait', () => {
    render(<AboutSection />);

    expect(
      screen.getByRole('img', { name: `${company.guarantee} by ${company.name}` }),
    ).toBeInTheDocument();

    const portrait = screen.getByRole('img', { name: new RegExp(company.founder, 'i') });
    expect(portrait).toHaveAttribute('src', '/images/about-engineer.jpg');
  });

  it('no longer prints the promises motto', () => {
    render(<AboutSection />);

    expect(screen.queryByText(company.tagline)).not.toBeInTheDocument();
  });
});
