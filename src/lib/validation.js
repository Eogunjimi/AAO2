/**
 * Framework-agnostic validation helpers for the enquiry forms.
 *
 * Each validator returns `undefined` when the value is acceptable, or a human
 * readable message when it is not.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;

export const validators = {
  required:
    (label) =>
    (value = '') =>
      value.trim() ? undefined : `${label} is required.`,

  minLength:
    (label, min) =>
    (value = '') =>
      value.trim().length >= min ? undefined : `${label} must be at least ${min} characters.`,

  email:
    () =>
    (value = '') => {
      if (!value.trim()) return undefined; // optional unless combined with `required`
      return EMAIL_PATTERN.test(value.trim()) ? undefined : 'Enter a valid email address.';
    },

  phone:
    () =>
    (value = '') => {
      if (!value.trim()) return undefined;
      return PHONE_PATTERN.test(value.trim())
        ? undefined
        : 'Enter a valid phone or WhatsApp number.';
    },
};

/**
 * Run a schema of `{ field: validator[] }` against form values.
 *
 * @param {Record<string, string>} values
 * @param {Record<string, Array<(value: string) => string|undefined>>} schema
 * @returns {Record<string, string>} errors keyed by field name
 */
export function validate(values, schema) {
  return Object.entries(schema).reduce((errors, [field, rules]) => {
    for (const rule of rules) {
      const message = rule(values[field] ?? '');
      if (message) {
        errors[field] = message;
        break;
      }
    }
    return errors;
  }, {});
}
