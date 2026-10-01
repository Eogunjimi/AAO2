/**
 * Nigerian phone number helpers.
 *
 * Visitors type their number every way imaginable — `0810 574 3694`,
 * `+234 810 574 3694`, `234-810-574-3694`, `8105743694`. We accept all of
 * them and hand the backend one canonical E.164 string.
 */

const NON_DIGITS = /\D+/g;

/** Nigerian mobile network codes are 3 digits beginning with 7, 8 or 9. */
const MOBILE_PREFIX = /^[789]/;

/**
 * Convert any recognisable Nigerian number to E.164, or `null` when it is not
 * one. The subscriber part is always 10 digits (network code + 7).
 *
 * @param {string} input
 * @returns {string|null} e.g. `+2348105743694`
 */
export function toE164(input = '') {
  const digits = String(input).replace(NON_DIGITS, '');
  if (!digits) return null;

  let subscriber = null;

  if (digits.length === 11 && digits.startsWith('0')) {
    subscriber = digits.slice(1); // 0810… national trunk form
  } else if (digits.length === 10) {
    subscriber = digits; // 810… trunk prefix omitted
  } else if (digits.length === 13 && digits.startsWith('234')) {
    subscriber = digits.slice(3); // 234810… with or without a leading +
  } else if (digits.length === 14 && digits.startsWith('2340')) {
    subscriber = digits.slice(4); // 2340810… trunk zero kept after the code
  }

  if (!subscriber || !MOBILE_PREFIX.test(subscriber)) return null;

  return `+234${subscriber}`;
}

/** @param {string} input */
export function isNigerianPhone(input) {
  return toE164(input) !== null;
}

/**
 * National display form, e.g. `0810 574 3694`. Returns the input untouched
 * when it is not a Nigerian number, so it is safe on unvalidated values.
 *
 * @param {string} input
 */
export function formatNational(input = '') {
  const e164 = toE164(input);
  if (!e164) return input;

  const national = `0${e164.slice(4)}`;
  return `${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`;
}
