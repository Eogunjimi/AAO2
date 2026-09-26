import { useCallback, useEffect, useRef, useState } from 'react';

import { submitLead } from '@/lib/leads';
import { validate } from '@/lib/validation';

/** @typedef {'idle'|'submitting'|'success'|'error'} LeadFormStatus */

/**
 * Controlled form state for every enquiry form on the site: validation on
 * submit (then live while correcting), async submission, and a success state.
 *
 * @param {Object} options
 * @param {Record<string, string>} options.initialValues
 * @param {Record<string, Array<Function>>} options.schema
 * @param {string} options.source Identifies which form sent the lead.
 */
export function useLeadForm({ initialValues, schema, source }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(/** @type {LeadFormStatus} */ ('idle'));
  const [submitError, setSubmitError] = useState(null);
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

  const reset = useCallback(() => {
    wasSubmitted.current = false;
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
    setStatus('idle');
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      wasSubmitted.current = true;

      const nextErrors = validate(values, schema);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return { ok: false };

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus('submitting');
      setSubmitError(null);

      try {
        await submitLead({ ...values, source }, { signal: controller.signal });
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
    status,
    submitError,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    setValue,
    handleChange,
    handleSubmit,
    reset,
  };
}
