import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from '@/lib/test-router';
import { describe, expect, it } from 'vitest';

import { generalFaqs } from '@/data/faqs';

import { FaqSection } from './FaqSection';

function renderSection() {
  return render(
    <MemoryRouter>
      <FaqSection />
    </MemoryRouter>,
  );
}

describe('<FaqSection />', () => {
  it('publishes every question in the FAQ data', () => {
    renderSection();

    const triggers = screen.getAllByRole('button');
    expect(triggers).toHaveLength(generalFaqs.length);
    generalFaqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('opens the first answer by default and swaps on click', async () => {
    const user = userEvent.setup();
    renderSection();

    const [first, second] = screen.getAllByRole('button');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(generalFaqs[0].answer)).toBeVisible();

    await user.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });
});
