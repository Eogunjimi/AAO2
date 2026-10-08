'use client';

import { company } from '@/data/company';
import { isDev, LEAD_ENDPOINT } from '@/lib/env';
import { getServiceBySlug } from '@/lib/services';
import { toE164 } from '@/lib/phone';

/**
 * Lead submission gateway.
 *
 * The UI never talks to `fetch` directly: it calls `submitLead`, which posts to
 * `LEAD_ENDPOINT` (or `NEXT_PUBLIC_LEAD_ENDPOINT`) when configured and
 * otherwise resolves locally so the site remains fully demoable without a
 * backend.
 */

const ENDPOINT = LEAD_ENDPOINT;
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
    // Send one canonical, dialable number whatever the visitor typed, while
    // leaving their original text in `phoneInput` for reference.
    phone: toE164(payload.phone) ?? payload.phone,
    phoneInput: payload.phone,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  if (!ENDPOINT) {
    await delay(DEMO_LATENCY_MS, signal);
    if (isDev) {
      // eslint-disable-next-line no-console
      console.info('[leads] demo mode — no LEAD_ENDPOINT configured', body);
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

/**
 * A WhatsApp deep link carrying the enquiry. The form hook opens this link
 * immediately after validation, while the contact form also exposes it as a
 * manual recovery link if the lead endpoint fails.
 *
 * @param {Record<string, string>} values
 * @param {{serviceLabel?: string}} [options]
 */
export function buildWhatsappHandoff(values, { serviceLabel } = {}) {
  const lines = [`Hello ${company.name}, I would like to request a free site inspection.`, ''];

  const add = (label, value) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  add('Name', values.name);
  add('Phone', values.phone);
  add('Email', values.email);
  const serviceName = serviceLabel ?? getServiceBySlug(values.service)?.title ?? values.service;
  add('Service', serviceName);
  add('Location', values.location);

  if (values.message) lines.push('', values.message);

  return `${company.phone.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
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
