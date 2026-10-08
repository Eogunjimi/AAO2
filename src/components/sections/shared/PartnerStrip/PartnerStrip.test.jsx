import { fireEvent, render, screen } from '@testing-library/react';
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

  it('uses the supplied Luminous artwork in the default trust strip', () => {
    const { container } = render(<PartnerStrip />);

    const logos = container.querySelectorAll('img[alt="Luminous logo"]');
    expect(logos).toHaveLength(2);
    logos.forEach((logo) =>
      expect(logo).toHaveAttribute('src', 'https://i.postimg.cc/BbDgYDsZ/luminous-transparent.png'),
    );
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

  it('falls back to the wordmark when logo artwork fails to load', () => {
    const partners = [
      { id: 'broken', name: 'Hikvision', descriptor: 'Partner brand', logo: '/missing.svg' },
    ];

    const { container } = render(<PartnerStrip partners={partners} />);

    const logos = container.querySelectorAll('img[src="/missing.svg"]');
    expect(logos).toHaveLength(2);

    // A wrong or not-yet-uploaded path must not leave a broken-image icon
    // sitting in the middle of the trust strip.
    logos.forEach((logo) => fireEvent.error(logo));

    expect(container.querySelectorAll('img')).toHaveLength(0);
    expect(container).toHaveTextContent('Hikvision');
    expect(container).toHaveTextContent('Partner brand');
  });
});
