import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { certifications } from '@/data/company';

import { PartnerStrip } from './PartnerStrip';

describe('<PartnerStrip />', () => {
  it('exposes every partner to assistive tech, not just the visual loop', () => {
    render(<PartnerStrip />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(certifications.length);
    expect(items[0]).toHaveTextContent(certifications[0].name);
  });

  it('renders the real logo when the data supplies one', () => {
    const partners = [
      { id: 'with-logo', name: 'Growatt', descriptor: 'Partner brand', logo: '/x.svg' },
      { id: 'without-logo', name: 'Deye', descriptor: 'Partner brand', logo: null },
    ];

    const { container } = render(<PartnerStrip partners={partners} />);

    // The marquee duplicates its children for the seamless loop.
    const logos = container.querySelectorAll('img[src="/x.svg"]');
    expect(logos).toHaveLength(2);
    expect(logos[0]).toHaveAttribute('alt', 'Growatt logo');
    expect(container).toHaveTextContent('Deye');
  });
});
