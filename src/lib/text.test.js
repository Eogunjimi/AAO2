import { describe, expect, it } from 'vitest';

import { initials } from './text';

describe('initials', () => {
  it('drops honorifics and reads through initialled names', () => {
    expect(initials('Engr. E. Adeyemi')).toBe('EA');
    expect(initials('Mrs. A. Bakare')).toBe('AB');
    expect(initials('T. Okonkwo')).toBe('TO');
  });

  it('caps the number of letters', () => {
    expect(initials('Ada Grace Nwosu Obi')).toBe('AG');
    expect(initials('Ada Grace Nwosu Obi', 3)).toBe('AGN');
  });

  it('returns an empty string for missing names', () => {
    expect(initials('')).toBe('');
    expect(initials(undefined)).toBe('');
  });
});
