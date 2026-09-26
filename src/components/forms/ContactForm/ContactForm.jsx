import { FormField } from '@/components/forms/FormField';
import { FormSuccess } from '@/components/forms/FormSuccess';
import { Button } from '@/components/ui';
import { useLeadForm } from '@/hooks/useLeadForm';
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

/** Full enquiry form used in the contact band. */
export function ContactForm({ defaultService = '' }) {
  const form = useLeadForm({
    initialValues: { ...INITIAL_VALUES, service: defaultService },
    schema: SCHEMA,
    source: 'contact-form',
  });

  if (form.isSuccess) {
    return (
      <div className={styles.form}>
        <FormSuccess onReset={form.reset} />
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit}
      noValidate
      aria-label="Talk to our team"
    >
      <FormField
        name="name"
        label="Your name"
        placeholder="Your Name"
        required
        autoComplete="name"
        value={form.values.name}
        onChange={form.handleChange}
        error={form.errors.name}
      />
      <FormField
        name="phone"
        label="Phone / WhatsApp"
        placeholder="Phone / WhatsApp"
        required
        type="tel"
        autoComplete="tel"
        value={form.values.phone}
        onChange={form.handleChange}
        error={form.errors.phone}
      />
      <FormField
        full
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={form.values.email}
        onChange={form.handleChange}
        error={form.errors.email}
      />
      <FormField
        as="select"
        name="service"
        label="Service you're interested in"
        placeholder="Select a service"
        required
        options={getServiceOptions()}
        value={form.values.service}
        onChange={form.handleChange}
        error={form.errors.service}
      />
      <FormField
        name="location"
        label="Location"
        placeholder="Location"
        required
        autoComplete="address-level2"
        value={form.values.location}
        onChange={form.handleChange}
        error={form.errors.location}
      />
      <FormField
        full
        as="textarea"
        name="message"
        label="How can we help?"
        placeholder="How can we help?"
        rows={4}
        value={form.values.message}
        onChange={form.handleChange}
        error={form.errors.message}
      />

      {form.submitError ? (
        <p className={styles.submitError} role="alert">
          {form.submitError}
        </p>
      ) : null}

      <Button type="submit" className={styles.submit} disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Sending…' : 'Talk to Our Team →'}
      </Button>
    </form>
  );
}
