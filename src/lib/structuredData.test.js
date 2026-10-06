import { describe, expect, it } from 'vitest';

import { SITE_URL, buildBreadcrumbSchema } from './structuredData';

const trail = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solar & Inverter Installation' },
];

describe('buildBreadcrumbSchema()', () => {
  it('numbers every crumb from one, in order', () => {
    const schema = buildBreadcrumbSchema(trail);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(schema.itemListElement.map((item) => item.name)).toEqual([
      'Home',
      'Services',
      'Solar & Inverter Installation',
    ]);
  });

  it('resolves linked crumbs to absolute URLs', () => {
    const [home, services] = buildBreadcrumbSchema(trail).itemListElement;

    expect(home.item).toBe(`${SITE_URL}/`);
    expect(services.item).toBe(`${SITE_URL}/services`);
  });

  it('omits item on the trailing crumb, which is the current page', () => {
    const last = buildBreadcrumbSchema(trail).itemListElement.at(-1);

    expect(last).not.toHaveProperty('item');
    expect(last.name).toBe('Solar & Inverter Installation');
  });

  it('keeps hash trails usable for sections that live on the home page', () => {
    const schema = buildBreadcrumbSchema([
      { label: 'Home', to: '/' },
      { label: 'Service Areas', to: '/#areas' },
      { label: 'Ikoyi' },
    ]);

    expect(schema.itemListElement[1].item).toBe(`${SITE_URL}/#areas`);
  });
});
