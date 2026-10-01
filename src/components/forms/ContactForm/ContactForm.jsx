import { FormField } from '@/components/forms/FormField';
import { FormSuccess } from '@/components/forms/FormSuccess';
import { Honeypot } from '@/components/forms/Honeypot';
import { Button } from '@/components/ui';
import { HONEYPOT_FIELD, useLeadForm } from '@/hooks/useLeadForm';
import { buildWhatsappHandoff } from '@/lib/leads';
import { getServiceOptions } from '@/lib/services';
import { validators } from '@/lib/validation';

import styles from './ContactForm.module.css';

const INITIAL_VALUES = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  message: '',
};

const SCHEMA = {
  name: [validators.required('Name'), validators.minLength('Name', 2)],
  phone: [validators.required('Phone number'), validators.phone()],
  email: [validators.email()],
  service: [validators.required('Service')],
  location: [validators.required('Location')],
};

const MESSAGE_LIMIT = 1000;

/** Full enquiry form used in the contact band. */
export function ContactForm({ defaultService = '' }) {
  const serviceOptions = getServiceOptions();
  const form = useLeadForm({
    initialValues: { ...INITIAL_VALUES, service: defaultService },
    schema: SCHEMA,
    source: 'contact-form',
  });

  if (form.isSuccess) {
    return (
      <div className={styles.form}>
        <FormSuccess reference={form.reference} onReset={form.reset} />
      </div>
    );
  }

  const serviceLabel = serviceOptions.find((option) => option.value === form.values.service)?.label;

  const field = (name) => ({
    name,
    value: form.values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
  });

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit}
      noValidate
      aria-label="Talk to our team"
    >
      {/*
        Announced the moment a submit fails. Focus has already moved to the
        first problem field, so this is the orientation, not the instruction.
      */}
      {form.errorCount > 0 ? (
        <p className={styles.summary} role="alert">
          {form.errorCount === 1
            ? 'One field needs your attention.'
            : `${form.errorCount} fields need your attention.`}
        </p>
      ) : null}

      <FormField
        {...field('name')}
        label="Your name"
        placeholder="Your Name"
        required
        autoComplete="name"
      />
      <FormField
        {...field('phone')}
        label="Phone / WhatsApp"
        placeholder="0810 574 3694"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <FormField
        {...field('email')}
        full
        label="Email"
        placeholder="Email"
        type="email"
        autoComplete="email"
      />
      <FormField
        {...field('service')}
        as="select"
        label="Service you're interested in"
        placeholder="Select a service"
        required
        options={serviceOptions}
      />
      <FormField
        {...field('location')}
        label="Location"
        placeholder="Location"
        required
        autoComplete="address-level2"
      />
      <FormField
        {...field('message')}
        full
        as="textarea"
        label="How can we help?"
        placeholder="How can we help?"
        rows={4}
        maxLength={MESSAGE_LIMIT}
      />

      <Honeypot value={form.values[HONEYPOT_FIELD]} onChange={form.handleChange} />

      {form.submitError ? (
        <div className={styles.submitError} role="alert">
          <p>{form.submitError}</p>
          {/* A send that failed should still have somewhere to go. */}
          <a
            className={styles.errorAction}
            href={buildWhatsappHandoff(form.values, { serviceLabel })}
            target="_blank"
            rel="noreferrer"
          >
            Send these details on WhatsApp instead →
          </a>
        </div>
      ) : null}

      <div className={styles.actions}>
        <Button type="submit" className={styles.submit} disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Sending…' : 'Talk to Our Team →'}
        </Button>

        <a
          className={styles.whatsapp}
          href={buildWhatsappHandoff(form.values, { serviceLabel })}
          target="_blank"
          rel="noreferrer"
        >
          or send it on WhatsApp
        </a>
      </div>

      {/* Politely narrates the submit for assistive tech. */}
      <p className={styles.srOnly} role="status" aria-live="polite">
        {form.isSubmitting ? 'Sending your request…' : ''}
      </p>
    </form>
  );
}
