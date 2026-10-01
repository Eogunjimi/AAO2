import { describe, expect, it } from 'vitest';

import { formatNational, isNigerianPhone, toE164 } from './phone';

describe('toE164', () => {
  it('accepts every way a Nigerian number gets typed', () => {
    const expected = '+2348105743694';

    expect(toE164('08105743694')).toBe(expected); // national trunk form
    expect(toE164('0810 574 3694')).toBe(expected); // spaced
    expect(toE164('0810-574-3694')).toBe(expected); // hyphenated
    expect(toE164('8105743694')).toBe(expected); // trunk zero omitted
    expect(toE164('+234 810 574 3694')).toBe(expected); // international
    expect(toE164('2348105743694')).toBe(expected); // no plus
    expect(toE164('+2340810 574 3694')).toBe(expected); // trunk zero kept
  });

  it('rejects anything we could not actually dial', () => {
    expect(toE164('')).toBeNull();
    expect(toE164('abc')).toBeNull();
    expect(toE164('12345')).toBeNull(); // too short
    expect(toE164('081057436941234')).toBeNull(); // too long
    expect(toE164('01234567890')).toBeNull(); // network code cannot start 0
    expect(toE164('+4478 1234 5678')).toBeNull(); // not Nigerian
  });

  it('exposes a boolean form', () => {
    expect(isNigerianPhone('0810 574 3694')).toBe(true);
    expect(isNigerianPhone('nope')).toBe(false);
  });
});

describe('formatNational', () => {
  it('renders the grouped national form', () => {
    expect(formatNational('+2348105743694')).toBe('0810 574 3694');
    expect(formatNational('8105743694')).toBe('0810 574 3694');
  });

  it('passes unrecognised input through untouched', () => {
    expect(formatNational('not a number')).toBe('not a number');
  });
});
