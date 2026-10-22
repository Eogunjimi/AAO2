import { describe, expect, it } from 'vitest';

import {
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  TITLE_MAX,
  fitDescription,
  formatTitle,
} from './seoText';

const options = { brand: 'AAO Engineering Services', suffix: ' | AAO Engineering' };

describe('formatTitle', () => {
  it('appends the brand suffix when the result fits', () => {
    expect(formatTitle('CCTV Systems', options)).toBe('CCTV Systems | AAO Engineering');
  });

  it('leaves the title bare when the suffix would overflow', () => {
    const long = 'Solar & Inverter in Victoria Garden City (VGC)';
    expect(formatTitle(long, options)).toBe(long);
    expect(long.length + options.suffix.length).toBeGreaterThan(TITLE_MAX);
  });

  it('does not add a suffix when the brand is already present', () => {
    const title = 'AAO Engineering Services — Power & Security in Lagos';
    expect(formatTitle(title, options)).toBe(title);
  });
});

describe('fitDescription', () => {
  it('keeps a description that is already in range', () => {
    const text = 'x'.repeat(130);
    expect(fitDescription(text)).toBe(text);
  });

  it('pads a short description into the target range', () => {
    const result = fitDescription('Smart door locks for Lagos homes.');
    expect(result.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    expect(result.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(result).toContain('Free site inspection in Lagos');
  });

  it('cuts long text at a word boundary and never exceeds the maximum', () => {
    const long = Array.from({ length: 60 }, (_, i) => `word${i}`).join(' ');
    const result = fitDescription(long);
    expect(result.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(result.endsWith('…')).toBe(true);
    expect(result).toMatch(/word\d+…$/);
  });

  it('collapses whitespace and handles empty input', () => {
    expect(fitDescription('  a \n\n b  ', { padding: [] })).toBe('a b');
    expect(fitDescription(undefined)).toBe('');
  });
});
