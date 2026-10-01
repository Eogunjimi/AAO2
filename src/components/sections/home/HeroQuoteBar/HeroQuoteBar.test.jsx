import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import * as leads from '@/lib/leads';

import { HeroQuoteBar } from './HeroQuoteBar';

describe('<HeroQuoteBar />', () => {
  it('renders the compact quote path and submits its three fields', async () => {
    const user = userEvent.setup();
    window.open.mockClear();
    const submitLead = vi
      .spyOn(leads, 'submitLead')
      .mockResolvedValue({ ok: true, reference: 'AAO-HERO-TEST' });

    render(<HeroQuoteBar />);

    await user.type(screen.getByPlaceholderText('Name'), 'Ada Obi');
    await user.type(screen.getByPlaceholderText('Phone'), '+234 810 574 3694');
    await user.selectOptions(screen.getByRole('combobox'), 'cctv');
    await user.click(screen.getByRole('button', { name: /get quote/i }));

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/2348105743694?text='),
      '_blank',
      'noopener,noreferrer',
    );
    expect(decodeURIComponent(window.open.mock.calls[0][0])).toContain('Service: CCTV Systems');
    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1));
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      name: 'Ada Obi',
      phone: '+234 810 574 3694',
      service: 'cctv',
      source: 'hero-quote-form',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(/quote request sent/i);
  });
});
