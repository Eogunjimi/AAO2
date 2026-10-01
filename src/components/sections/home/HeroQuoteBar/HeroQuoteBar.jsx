import { FormField } from '@/components/forms/FormField';
import { Honeypot } from '@/components/forms/Honeypot';
import { Button, Container, Icon, Reveal } from '@/components/ui';
import { heroQuote } from '@/data/home';
import { HONEYPOT_FIELD, useLeadForm } from '@/hooks/useLeadForm';
import { getServiceOptions } from '@/lib/services';
import { validators } from '@/lib/validation';

import styles from './HeroQuoteBar.module.css';

const INITIAL_VALUES = { name: '', phone: '', service: '' };

const SCHEMA = {
  name: [
    validators.required(heroQuote.fields.name.label),
    validators.minLength(heroQuote.fields.name.label, 2),
  ],
  phone: [validators.required(heroQuote.fields.phone.label), validators.phone()],
  service: [validators.required(heroQuote.fields.service.label)],
};

/**
 * The hero's quick-conversion footer. It keeps the primary lead path visible
 * without making the hero copy compete with another card or modal.
 */
export function HeroQuoteBar() {
  const serviceOptions = getServiceOptions();
  const form = useLeadForm({
    initialValues: INITIAL_VALUES,
    schema: SCHEMA,
    source: 'hero-quote-form',
  });

  const field = (name) => ({
    name,
    value: form.values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
  });

  return (
    <Container className={styles.wrap}>
      <Reveal className={styles.bar} delay={140}>
        {form.isSuccess ? (
          <div className={styles.success} role="status" aria-live="polite">
            <span className={styles.successMark} aria-hidden="true">
              ✓
            </span>
            <div>
              <p className={styles.successTitle}>{heroQuote.successTitle}</p>
              <p className={styles.successMessage}>
                {heroQuote.successMessage}
                {form.reference ? ` Reference: ${form.reference}.` : ''}
              </p>
            </div>
            <button type="button" className={styles.reset} onClick={form.reset}>
              {heroQuote.reset}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.prompt}>
              <span className={styles.sunMark} aria-hidden="true">
                <Icon name="sun" size={38} />
              </span>
              <h2 id="hero-quote-title" className={styles.title}>
                {heroQuote.titleLead} <span>{heroQuote.titleAccent}</span>
              </h2>
            </div>

            <form
              className={styles.form}
              onSubmit={form.handleSubmit}
              noValidate
              aria-labelledby="hero-quote-title"
            >
              <FormField
                {...field('name')}
                label={heroQuote.fields.name.label}
                placeholder={heroQuote.fields.name.placeholder}
                hideLabel
                required
                autoComplete="name"
                leadingIcon={<Icon name="user" size={16} />}
                className={styles.field}
              />
              <FormField
                {...field('phone')}
                label={heroQuote.fields.phone.label}
                placeholder={heroQuote.fields.phone.placeholder}
                hideLabel
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                leadingIcon={<Icon name="phone" size={15} />}
                className={styles.field}
              />
              <FormField
                {...field('service')}
                as="select"
                label={heroQuote.fields.service.label}
                placeholder={heroQuote.fields.service.placeholder}
                hideLabel
                required
                options={serviceOptions}
                className={styles.field}
              />

              <Honeypot value={form.values[HONEYPOT_FIELD]} onChange={form.handleChange} />

              {form.submitError ? (
                <p className={styles.submitError} role="alert">
                  {form.submitError}
                </p>
              ) : null}

              <Button type="submit" variant="volt" size="sm" disabled={form.isSubmitting}>
                {form.isSubmitting ? heroQuote.submitting : heroQuote.submit}
                <span aria-hidden="true">→</span>
              </Button>
            </form>
          </>
        )}
      </Reveal>
    </Container>
  );
}
