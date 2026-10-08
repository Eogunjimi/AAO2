'use client';

import { FormField } from '@/components/forms/FormField';
import { FormSuccess } from '@/components/forms/FormSuccess';
import { Honeypot } from '@/components/forms/Honeypot';
import { Button, Icon } from '@/components/ui';
import { quoteForm } from '@/data/forms';
import { HONEYPOT_FIELD, useLeadForm } from '@/hooks/useLeadForm';
import { getServiceOptions } from '@/lib/services';
import { validators } from '@/lib/validation';

import styles from './QuoteForm.module.css';

const INITIAL_VALUES = { name: '', phone: '', service: '' };

const SCHEMA = {
  name: [
    validators.required(quoteForm.fields.name.label),
    validators.minLength(quoteForm.fields.name.label, 2),
  ],
  phone: [validators.required(quoteForm.fields.phone.label), validators.phone()],
  service: [validators.required(quoteForm.fields.service.label)],
};

/**
 * Three-field quote request for the sticky sidebar on service and
 * service-area pages.
 *
 * Wears the same "frictionless" treatment as the hero quote bar — dark card
 * under a volt rule, sun mark, two-tone heading, iconned fields, volt CTA —
 * so the conversion path a visitor met on the home page is recognisably the
 * same one here. The layout is stacked rather than the hero's single row,
 * because this sits in a 360px column.
 *
 * @param {Object} props
 * @param {string} [props.defaultService] Slug pre-selected in the dropdown.
 */
export function QuoteForm({ defaultService = '' }) {
  const form = useLeadForm({
    initialValues: { ...INITIAL_VALUES, service: defaultService },
    schema: SCHEMA,
    source: 'hero-quote-form',
  });

  const field = (name) => ({
    name,
    value: form.values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
    className: styles.field,
  });

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit}
      noValidate
      aria-labelledby="quote-form-title"
    >
      <div className={styles.prompt}>
        <span className={styles.sunMark} aria-hidden="true">
          <Icon name="sun" size={34} />
        </span>
        <h2 id="quote-form-title" className={styles.title}>
          {quoteForm.titleLead} <span>{quoteForm.titleAccent}</span>
        </h2>
      </div>

      {form.isSuccess ? (
        <FormSuccess tone="dark" reference={form.reference} onReset={form.reset} />
      ) : (
        <>
          <FormField
            {...field('name')}
            label={quoteForm.fields.name.label}
            placeholder={quoteForm.fields.name.placeholder}
            hideLabel
            required
            autoComplete="name"
            leadingIcon={<Icon name="user" size={16} />}
          />

          <FormField
            {...field('phone')}
            label={quoteForm.fields.phone.label}
            placeholder={quoteForm.fields.phone.placeholder}
            hideLabel
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            leadingIcon={<Icon name="phone" size={15} />}
          />

          <FormField
            {...field('service')}
            as="select"
            label={quoteForm.fields.service.label}
            placeholder={quoteForm.fields.service.placeholder}
            hideLabel
            required
            options={getServiceOptions()}
          />

          <Honeypot value={form.values[HONEYPOT_FIELD]} onChange={form.handleChange} />

          {form.submitError ? (
            <p className={styles.submitError} role="alert">
              {form.submitError}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="volt"
            block
            disabled={form.isSubmitting}
            className={styles.submit}
          >
            {form.isSubmitting ? quoteForm.submitting : quoteForm.submit}
            <span aria-hidden="true">→</span>
          </Button>

          <p className={styles.note}>{quoteForm.note}</p>
        </>
      )}
    </form>
  );
}
