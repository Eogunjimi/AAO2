import { describe, expect, it } from 'vitest';

import { getIndexableRoutes } from './indexableRoutes';

describe('getIndexableRoutes', () => {
  const routes = getIndexableRoutes();

  it('includes the contact page and the core sections', () => {
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('/');
    expect(paths).toContain('/contact');
    expect(paths).toContain('/services');
    expect(paths).toContain('/blog');
  });

  it('never lists a path twice', () => {
    const paths = routes.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
  });

  it('gives every route a page folder and only excludes placeholders and 404', () => {
    for (const route of routes) {
      expect(route.page).toMatch(/^[A-Za-z]+Page$/);
      expect(route.path).not.toMatch(/^\/(404|team|career|academy|shop)$/);
    }
  });
});
