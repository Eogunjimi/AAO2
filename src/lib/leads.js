/**
 * Lead submission gateway.
 *
 * The UI never talks to `fetch` directly: it calls `submitLead`, which posts to
 * `VITE_LEAD_ENDPOINT` when configured and otherwise resolves locally so the
 * site remains fully demoable without a backend.
 */

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT ?? '';
const DEMO_LATENCY_MS = 700;

export class LeadSubmissionError extends Error {
  constructor(message, { status } = {}) {
    super(message);
    this.name = 'LeadSubmissionError';
    this.status = status;
  }
}

/**
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.phone
 * @param {string} [payload.email]
 * @param {string} [payload.service]
 * @param {string} [payload.location]
 * @param {string} [payload.message]
 * @param {string} [payload.source] Which form produced the lead.
 * @param {{signal?: AbortSignal}} [options]
 * @returns {Promise<{ok: true, reference: string}>}
 */
export async function submitLead(payload, { signal } = {}) {
  const body = {
    ...payload,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  if (!ENDPOINT) {
    await delay(DEMO_LATENCY_MS, signal);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[leads] demo mode — no VITE_LEAD_ENDPOINT configured', body);
    }
    return { ok: true, reference: createReference() };
  }

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new LeadSubmissionError(
      'We could not reach our servers. Please call us on the number above.',
    );
  }

  if (!response.ok) {
    throw new LeadSubmissionError('Something went wrong sending your request. Please try again.', {
      status: response.status,
    });
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, reference: data.reference ?? createReference() };
}

function createReference() {
  return `AAO-${Date.now().toString(36).toUpperCase()}`;
}

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}
