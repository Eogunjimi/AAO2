import { useCallback, useEffect, useRef, useState } from 'react';

import { buildWhatsappHandoff, submitLead } from '@/lib/leads';
import { validate } from '@/lib/validation';

/** @typedef {'idle'|'submitting'|'success'|'error'} LeadFormStatus */

/** Name of the honeypot input. Humans never see it; bots fill everything. */
export const HONEYPOT_FIELD = 'companyWebsite';

/**
 * Move focus to the first control the visitor needs to fix, in DOM order
 * rather than schema order, and bring it into view.
 *
 * @param {HTMLFormElement|null} form
 * @param {Record<string, string>} errors
 */
function focusFirstInvalid(form, errors) {
  if (!form) return;

  const controls = form.querySelectorAll('input[name], select[name], textarea[name]');
  for (const control of controls) {
    if (!errors[control.name]) continue;
    control.focus?.();
    control.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
    return;
  }
}

/**
 * Open WhatsApp while still inside the submit gesture so browsers do not
 * classify the hand-off as an unsolicited popup.
 *
 * WhatsApp opens with the lead details prefilled; its own security model still
 * requires the visitor to tap Send before a message reaches the inbox.
 *
 * @param {Record<string, string>} values
 */
function openWhatsappHandoff(values) {
  if (typeof window === 'undefined') return;

  window.open(buildWhatsappHandoff(values), '_blank', 'noopener,noreferrer');
}

/**
 * Controlled form state for every enquiry form on the site.
 *
 * Validates a field once it has been left (so mistakes surface before submit),
 * re-validates everything live after the first submit attempt, moves focus to
 * the first problem, drops submissions that trip the honeypot, and exposes the
 * reference returned by the gateway.
 *
 * @param {Object} options
 * @param {Record<string, string>} options.initialValues
 * @param {Record<string, Array<Function>>} options.schema
 * @param {string} options.source Identifies which form sent the lead.
 */
export function useLeadForm({ initialValues, schema, source }) {
  const [values, setValues] = useState({ ...initialValues, [HONEYPOT_FIELD]: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(/** @type {LeadFormStatus} */ ('idle'));
  const [submitError, setSubmitError] = useState(null);
  const [reference, setReference] = useState(null);
  const wasSubmitted = useRef(false);
  const abortRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const setValue = useCallback(
    (field, value) => {
      setValues((current) => {
        const nextValues = { ...current, [field]: value };
        if (wasSubmitted.current) setErrors(validate(nextValues, schema));
        return nextValues;
      });
    },
    [schema],
  );

  const handleChange = useCallback(
    (event) => setValue(event.target.name, event.target.value),
    [setValue],
  );

  /** Validate a single field when the visitor leaves it. */
  const handleBlur = useCallback(
    (event) => {
      const field = event.target.name;
      if (!schema[field]) return;

      const fieldError = validate(values, schema)[field];
      setErrors((current) => {
        if (fieldError === current[field]) return current;
        const next = { ...current };
        if (fieldError) next[field] = fieldError;
        else delete next[field];
        return next;
      });
    },
    [values, schema],
  );

  const reset = useCallback(() => {
    wasSubmitted.current = false;
    setValues({ ...initialValues, [HONEYPOT_FIELD]: '' });
    setErrors({});
    setSubmitError(null);
    setReference(null);
    setStatus('idle');
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      wasSubmitted.current = true;

      // Read synchronously: `currentTarget` is cleared once the handler yields,
      // and it saves every form having to plumb a ref through.
      const formElement = event?.currentTarget ?? null;

      const nextErrors = validate(values, schema);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        focusFirstInvalid(formElement, nextErrors);
        return { ok: false };
      }

      // Honeypot: report success and send nothing, so the bot does not retry.
      if (values[HONEYPOT_FIELD]) {
        setStatus('success');
        return { ok: true };
      }

      // Start the WhatsApp hand-off before awaiting the optional lead endpoint
      // so popup blockers see it as part of the visitor's submit gesture.
      openWhatsappHandoff(values);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus('submitting');
      setSubmitError(null);

      const { [HONEYPOT_FIELD]: _honeypot, ...payload } = values;

      try {
        const result = await submitLead({ ...payload, source }, { signal: controller.signal });
        setReference(result?.reference ?? null);
        setStatus('success');
        return { ok: true };
      } catch (error) {
        if (error?.name === 'AbortError') return { ok: false };
        setStatus('error');
        setSubmitError(error?.message ?? 'Something went wrong. Please try again.');
        return { ok: false };
      }
    },
    [values, schema, source],
  );

  return {
    values,
    errors,
    errorCount: Object.keys(errors).length,
    status,
    submitError,
    reference,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
