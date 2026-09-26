import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import * as leads from '@/lib/leads';

import { QuoteForm } from './QuoteForm';

function renderForm() {
  return render(
    <MemoryRouter>
      <QuoteForm />
    </MemoryRouter>,
  );
}

describe('<QuoteForm />', () => {
  it('blocks submission and shows messages when fields are empty', async () => {
    const user = userEvent.setup();
    const submitLead = vi.spyOn(leads, 'submitLead');
    renderForm();

    await user.click(screen.getByRole('button', { name: /get my free quote/i }));

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(submitLead).not.toHaveBeenCalled();
  });

  it('validates the phone number format', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Obi');
    await user.type(screen.getByPlaceholderText('Phone / WhatsApp'), 'not-a-number');
    await user.selectOptions(screen.getByRole('combobox'), 'cctv');
    await user.click(screen.getByRole('button', { name: /get my free quote/i }));

    expect(await screen.findByText(/valid phone/i)).toBeInTheDocument();
  });

  it('submits a valid lead and confirms to the visitor', async () => {
    const user = userEvent.setup();
    const submitLead = vi
      .spyOn(leads, 'submitLead')
      .mockResolvedValue({ ok: true, reference: 'AAO-TEST' });
    renderForm();

    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Obi');
    await user.type(screen.getByPlaceholderText('Phone / WhatsApp'), '+234 810 574 3694');
    await user.selectOptions(screen.getByRole('combobox'), 'cctv');
    await user.click(screen.getByRole('button', { name: /get my free quote/i }));

    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1));
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      name: 'Ada Obi',
      service: 'cctv',
      source: 'hero-quote-form',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(/thank you/i);
  });
});
