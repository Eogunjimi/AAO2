/**
 * Test stub for `next/font/local`.
 *
 * The real loader is rewritten by the Next compiler (it hashes and emits the
 * woff2 files), so it cannot run under Vitest. This returns the same shape the
 * root layout consumes.
 */
export default function localFont({ variable = '--font-stub' } = {}) {
  return {
    className: '__font_local',
    variable: `__variable_${variable.replace(/^--/, '')}`,
    style: { fontFamily: variable },
  };
}
