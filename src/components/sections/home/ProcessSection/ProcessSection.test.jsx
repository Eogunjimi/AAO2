import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ProcessSection } from './ProcessSection';

function renderSection() {
  return render(
    <MemoryRouter>
      <ProcessSection />
    </MemoryRouter>,
  );
}

describe('<ProcessSection />', () => {
  it('shows a selected step and updates its description when clicked', async () => {
    const user = userEvent.setup();
    renderSection();

    const recommendation = screen.getByRole('button', {
      name: /transparent recommendation & quote/i,
    });

    await user.click(recommendation);

    expect(recommendation).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('status')).toHaveTextContent(
      'You get a right-sized system, honest pricing, and product warranties in writing.',
    );
  });
});
