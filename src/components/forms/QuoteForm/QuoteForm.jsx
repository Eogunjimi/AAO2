import { FormField } from '@/components/forms/FormField';
import { FormSuccess } from '@/components/forms/FormSuccess';
import { Button } from '@/components/ui';
import { useLeadForm } from '@/hooks/useLeadForm';
import { getServiceOptions } from '@/lib/services';
import { validators } from '@/lib/validation';

import styles from './QuoteForm.module.css';

const INITIAL_VALUES = { name: '', phone: '', service: '' };

const SCHEMA = {
  name: [validators.required('Name'), validators.minLength('Name', 2)],
  phone: [validators.required('Phone number'), validators.phone()],
  service: [validators.required('Service')],
};

/** Compact three-field quote request used in the hero. */
export function QuoteForm({ defaultService = '' }) {
  const form = useLeadForm({
    initialValues: { ...INITIAL_VALUES, service: defaultService },
    schema: SCHEMA,
    source: 'hero-quote-form',
  });

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit}
      noValidate
      aria-label="Get a free quote"
    >
      <h2 className={styles.title}>Get Your Free Quote</h2>

      {form.isSuccess ? (
        <FormSuccess onReset={form.reset} />
      ) : (
        <>
          <div className={styles.row}>
            <FormField
              name="name"
              label="Your name"
              placeholder="Your name"
              hideLabel
              required
              autoComplete="name"
              value={form.values.name}
              onChange={form.handleChange}
              error={form.errors.name}
            />
            <FormField
              name="phone"
              label="Phone or WhatsApp number"
              placeholder="Phone / WhatsApp"
              hideLabel
              required
              type="tel"
              autoComplete="tel"
              value={form.values.phone}
              onChange={form.handleChange}
              error={form.errors.phone}
            />
          </div>

          <FormField
            as="select"
            name="service"
            label="Service you're interested in"
            placeholder="Service you're interested in"
            hideLabel
            required
            options={getServiceOptions()}
            value={form.values.service}
            onChange={form.handleChange}
            error={form.errors.service}
          />

          {form.submitError ? (
            <p className={styles.submitError} role="alert">
              {form.submitError}
            </p>
          ) : null}

          <Button type="submit" block disabled={form.isSubmitting} className={styles.submit}>
            {form.isSubmitting ? 'Sending…' : 'Get My Free Quote →'}
          </Button>

          <p className={styles.note}>No spam. An AAO expert responds within 24 hours.</p>
        </>
      )}
    </form>
  );
}
