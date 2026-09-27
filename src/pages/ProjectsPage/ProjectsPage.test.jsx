import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';

import ProjectsPage from './ProjectsPage';

const renderPage = () =>
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  );

describe('<ProjectsPage />', () => {
  it('presents every completed project', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/our work/i);

    projects.forEach((project) => {
      expect(screen.getByRole('heading', { level: 2, name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.summary)).toBeInTheDocument();
      expect(screen.getByAltText(project.alt)).toHaveAttribute('src', project.image);
    });
  });

  it('offers the way onward', () => {
    renderPage();

    expect(screen.getByRole('link', { name: /free site inspection/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse our services/i })).toHaveAttribute(
      'href',
      '/services',
    );
  });
});
