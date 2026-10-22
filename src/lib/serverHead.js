/**
 * Lets the build-time pre-renderer read the metadata `<Seo />` computes.
 *
 * Effects never run during server rendering, so `useDocumentMeta` cannot write
 * the head there. Instead, while a capture is active, `<Seo />` hands its values
 * to this module during render. Outside a capture (the browser, tests) the calls
 * do nothing.
 */

let activeCapture = null;

/** Begin recording. Returns nothing; read the result with `stopHeadCapture`. */
export function startHeadCapture() {
  activeCapture = { meta: null };
}

/** @param {Object} meta Values `<Seo />` is about to apply to the document. */
export function recordServerHead(meta) {
  if (activeCapture) activeCapture.meta = meta;
}

/** Stop recording and return the last metadata seen, or null. */
export function stopHeadCapture() {
  const meta = activeCapture?.meta ?? null;
  activeCapture = null;
  return meta;
}
