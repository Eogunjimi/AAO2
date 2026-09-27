import { describe, expect, it } from 'vitest';

import { validate, validators } from './validation';

const schema = {
  name: [validators.required('Name'), validators.minLength('Name', 2)],
  phone: [validators.required('Phone number'), validators.phone()],
  email: [validators.email()],
};

describe('validate', () => {
  it('returns no errors for a valid payload', () => {
    expect(
      validate({ name: 'Ada', phone: '+234 810 574 3694', email: 'ada@example.com' }, schema),
    ).toEqual({});
  });

  it('flags missing required fields', () => {
    const errors = validate({ name: '   ', phone: '', email: '' }, schema);
    expect(errors.name).toMatch(/required/i);
    expect(errors.phone).toMatch(/required/i);
    expect(errors.email).toBeUndefined();
  });

  it('reports only the first failing rule per field', () => {
    const errors = validate({ name: 'A', phone: 'abc', email: 'nope' }, schema);
    expect(errors.name).toMatch(/at least 2/);
    expect(errors.phone).toMatch(/valid phone/i);
    expect(errors.email).toMatch(/valid email/i);
  });

  it('treats optional email as valid when empty', () => {
    expect(validators.email()('')).toBeUndefined();
    expect(validators.email()('someone@aao.ng')).toBeUndefined();
  });
});
