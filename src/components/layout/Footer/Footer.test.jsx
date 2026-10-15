import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

/**
 * The business's official profiles. Spelled out rather than read back from
 * `company.socials` so a regression to a placeholder URL fails this test.
 */
const OFFICIAL_PROFILES = [
  ['Facebook', 'https://www.facebook.com/AAOENGINEERING/'],
  ['Instagram', 'https://www.instagram.com/aao_engineering_services/'],
  ['Google Business Profile', 'https://share.google/XmZ2oV4DRnutBFOQ3'],
];

describe('<Footer />', () => {
  it.each(OFFICIAL_PROFILES)('links the %s icon to the official profile', (label, href) => {
    renderFooter();

    const link = within(screen.getByRole('contentinfo')).getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });
});
