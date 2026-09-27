import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Accordion } from './Accordion';

const items = [
  { id: 'one', question: 'Do you offer free site inspections?', answer: 'Yes, across Lagos.' },
  { id: 'two', question: 'Do you use original products?', answer: 'Always, with warranty.' },
];

describe('<Accordion />', () => {
  it('renders every question collapsed by default', () => {
    render(<Accordion items={items} />);

    const triggers = screen.getAllByRole('button');
    expect(triggers).toHaveLength(2);
    triggers.forEach((trigger) => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('opens a panel on click and exposes it to assistive tech', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: /free site inspections/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: /free site inspections/i })).toBeVisible();
  });

  it('collapses the previous panel unless multiple are allowed', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const [first, second] = screen.getAllByRole('button');
    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps panels open when allowMultiple is set', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} allowMultiple />);

    const [first, second] = screen.getAllByRole('button');
    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });
});
