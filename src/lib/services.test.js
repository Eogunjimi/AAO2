import { describe, expect, it } from 'vitest';

import { serviceCategories, services } from '@/data/services';

import {
  getRelatedServices,
  getServiceBySlug,
  getServiceOptions,
  getServiceOrDefault,
  getServicesByCategory,
  isValidServiceSlug,
} from './services';

describe('service catalogue', () => {
  it('exposes unique slugs for every service', () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only uses categories that are declared in the category list', () => {
    const names = serviceCategories.map((category) => category.name);
    services.forEach((service) => {
      expect(names).toContain(service.category);
    });
  });

  it('gives every service the content a detail page renders', () => {
    services.forEach((service) => {
      expect(service.title).toBeTruthy();
      expect(service.image).toMatch(/^\/images\//);
      expect(service.signs.length).toBeGreaterThan(0);
      expect(service.approach.length).toBeGreaterThan(0);
      expect(service.benefits.length).toBeGreaterThan(0);
      expect(service.faq.question).toBeTruthy();
      expect(service.faq.answer).toBeTruthy();
    });
  });
});

describe('selectors', () => {
  it('finds a service by slug', () => {
    expect(getServiceBySlug('cctv')?.title).toBe('CCTV Systems');
    expect(getServiceBySlug('nope')).toBeUndefined();
  });

  it('falls back to the default service for unknown slugs', () => {
    expect(getServiceOrDefault('nope')?.slug).toBe('solar-inverter');
  });

  it('validates slugs', () => {
    expect(isValidServiceSlug('network')).toBe(true);
    expect(isValidServiceSlug('teleportation')).toBe(false);
  });

  it('groups services by category without empty groups', () => {
    const groups = getServicesByCategory();
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((group) => expect(group.services.length).toBeGreaterThan(0));
    expect(groups.flatMap((group) => group.services)).toHaveLength(services.length);
  });

  it('prefers same-category services when suggesting related ones', () => {
    const related = getRelatedServices('cctv', 2);
    expect(related).toHaveLength(2);
    expect(related.map((service) => service.slug)).not.toContain('cctv');
    expect(related[0].category).toBe('Security & Surveillance');
  });

  it('builds select options for the enquiry forms', () => {
    const options = getServiceOptions();
    expect(options).toHaveLength(services.length);
    expect(options[0]).toEqual({ value: services[0].slug, label: services[0].title });
  });
});
