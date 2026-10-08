'use client';

import { useId } from 'react';

import { cn } from '@/lib/cn';

import styles from './FormField.module.css';

/**
 * Labelled form control with inline validation messaging.
 *
 * Supports `input`, `select` and `textarea` through the `as` prop and wires up
 * `aria-invalid` / `aria-describedby` so errors are announced.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.label           Always rendered (visually hidden when `hideLabel`).
 * @param {'input'|'select'|'textarea'} [props.as]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 * @param {boolean} [props.hideLabel]
 * @param {boolean} [props.full]         Span the full width of a two-column grid.
 * @param {Array<{value: string, label: string}>} [props.options] For `select`.
 * @param {React.ReactNode} [props.leadingIcon] Optional decorative icon inside the control.
 */
export function FormField({
  name,
  label,
  as = 'input',
  error,
  required = false,
  hideLabel = false,
  full = false,
  options = [],
  placeholder,
  className,
  leadingIcon,
  ...rest
}) {
  const id = useId();
  const fieldId = `${id}-${name}`;
  const errorId = `${fieldId}-error`;

  const controlProps = {
    id: fieldId,
    name,
    required,
    placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(styles.control, error && styles.controlError),
    ...rest,
  };

  const control =
    as === 'select' ? (
      <select {...controlProps}>
        <option value="">{placeholder ?? `Select ${label.toLowerCase()}`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : as === 'textarea' ? (
      <textarea {...controlProps} />
    ) : (
      <input {...controlProps} />
    );

  return (
    <div className={cn(styles.field, full && styles.full, className)}>
      <label htmlFor={fieldId} className={cn(styles.label, hideLabel && styles.srOnly)}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {leadingIcon ? (
        <div className={styles.controlWrap}>
          <span className={styles.controlIcon}>{leadingIcon}</span>
          {control}
        </div>
      ) : (
        control
      )}

      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
