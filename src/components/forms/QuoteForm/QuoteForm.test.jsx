import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { quoteForm } from '@/data/forms';
import * as leads from '@/lib/leads';

import { QuoteForm } from './QuoteForm';

const submitButton = { name: new RegExp(quoteForm.submit, 'i') };

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

    await user.click(screen.getByRole('button', submitButton));

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(submitLead).not.toHaveBeenCalled();
  });

  it('validates the phone number format', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText(quoteForm.fields.name.placeholder), 'Ada Obi');
    await user.type(screen.getByPlaceholderText(quoteForm.fields.phone.placeholder), 'not-a-number');
    await user.selectOptions(screen.getByRole('combobox'), 'cctv');
    await user.click(screen.getByRole('button', submitButton));

    expect(await screen.findByText(/valid Nigerian number/i)).toBeInTheDocument();
  });

  it('submits a valid lead and confirms to the visitor', async () => {
    const user = userEvent.setup();
    const submitLead = vi
      .spyOn(leads, 'submitLead')
      .mockResolvedValue({ ok: true, reference: 'AAO-TEST' });
    renderForm();

    await user.type(screen.getByPlaceholderText(quoteForm.fields.name.placeholder), 'Ada Obi');
    await user.type(screen.getByPlaceholderText(quoteForm.fields.phone.placeholder), '+234 810 574 3694');
    await user.selectOptions(screen.getByRole('combobox'), 'cctv');
    await user.click(screen.getByRole('button', submitButton));

    await waitFor(() => expect(submitLead).toHaveBeenCalledTimes(1));
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      name: 'Ada Obi',
      service: 'cctv',
      source: 'hero-quote-form',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(/thank you/i);
  });
});
