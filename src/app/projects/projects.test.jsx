import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { projectFaqs } from '@/data/faqs';
import { projects } from '@/data/projects';
import { renderPage } from '@/test/serverComponent';

import ProjectsPage from './page';

const cardTitles = () =>
  screen
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent)
    .filter((title) => projects.some((project) => project.title === title));

describe('projects route', () => {
  it('leads with a headline and the proof badges', async () => {
    await renderPage(ProjectsPage);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/projects in lagos/i);
    expect(screen.getByText('200+')).toBeInTheDocument();
  });

  it('shows every project until a filter is chosen', async () => {
    await renderPage(ProjectsPage);

    expect(cardTitles()).toHaveLength(projects.length);
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('filters the grid by service category', async () => {
    const user = userEvent.setup();
    await renderPage(ProjectsPage);

    const category = 'ICT & Networking';
    const expected = projects.filter((project) => project.category === category);

    await user.click(screen.getByRole('button', { name: category }));

    expect(cardTitles()).toEqual(expected.map((project) => project.title));
    expect(screen.getByRole('button', { name: category })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(cardTitles()).toHaveLength(projects.length);
  });

  it('closes with questions about the work', async () => {
    await renderPage(ProjectsPage);

    expect(projectFaqs.length).toBeLessThanOrEqual(5);
    projectFaqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('offers a contact form', async () => {
    await renderPage(ProjectsPage);

    const form = screen.getByRole('form', { name: /talk to our team/i });
    expect(within(form).getByLabelText(/name/i)).toBeInTheDocument();
  });
});
