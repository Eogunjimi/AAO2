import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { HONEYPOT_FIELD } from '@/hooks/useLeadForm';

import { ContactForm } from './ContactForm';

const renderForm = () => render(<ContactForm />);

const form = () => screen.getByRole('form', { name: /talk to our team/i });
const submit = () => screen.getByRole('button', { name: /talk to our team/i });

const fill = async (user) => {
  await user.type(screen.getByLabelText(/your name/i), 'Ada Bakare');
  await user.type(screen.getByLabelText(/phone/i), '0810 574 3694');
  await user.selectOptions(screen.getByLabelText(/service/i), 'solar-inverter');
  await user.type(screen.getByLabelText(/location/i), 'Lekki Phase 1');
};

describe('<ContactForm /> validation', () => {
  it('blocks submission and summarises how many fields need attention', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(submit());

    // name, phone, service and location are all required. Each also raises its
    // own inline alert, so target the summary by its text.
    expect(await screen.findByText(/4 fields need your attention/i)).toBeInTheDocument();
    // Nothing was sent, so the form is still on screen.
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });

  it('moves focus to the first field needing attention', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(submit());

    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
  });

  it('validates a field as soon as the visitor leaves it', async () => {
    const user = userEvent.setup();
    renderForm();

    const phone = screen.getByLabelText(/phone/i);
    await user.type(phone, '12345');
    await user.tab();

    expect(await screen.findByText(/valid Nigerian number/i)).toBeInTheDocument();
    expect(phone).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a Nigerian number in any common format', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/phone/i), '+234 810 574 3694');
    await user.tab();

    expect(screen.queryByText(/valid Nigerian number/i)).not.toBeInTheDocument();
  });
});

describe('<ContactForm /> submission', () => {
  it('confirms with a reference once it succeeds', async () => {
    const user = userEvent.setup();
    renderForm();

    await fill(user);
    await user.click(submit());

    expect(await screen.findByText(/thank you/i, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/your reference/i)).toHaveTextContent(/AAO-/);
  });

  it('offers a WhatsApp hand-off carrying what has been typed', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/your name/i), 'Ada Bakare');

    const handoff = within(form()).getByRole('link', { name: /send it on whatsapp/i });
    expect(handoff).toHaveAttribute('target', '_blank');
    expect(decodeURIComponent(handoff.getAttribute('href'))).toContain('Name: Ada Bakare');
  });

  it('hides a spam trap that real users never reach', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();

    const trap = container.querySelector(`[name="${HONEYPOT_FIELD}"]`);
    expect(trap).toHaveAttribute('tabindex', '-1');
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();

    // Tabbing from the first field must never land on it.
    screen.getByLabelText(/your name/i).focus();
    await user.tab();
    expect(document.activeElement).not.toBe(trap);
  });

  it('silently drops a submission that fills the trap', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();

    await fill(user);
    const trap = container.querySelector(`[name="${HONEYPOT_FIELD}"]`);
    await user.type(trap, 'http://spam.example');

    await user.click(submit());

    // The bot is told it worked, but no reference exists because nothing sent.
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/your reference/i)).not.toBeInTheDocument());
  });
});
