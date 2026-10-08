'use client';

import { HONEYPOT_FIELD } from '@/hooks/useLeadForm';

import styles from './Honeypot.module.css';

/**
 * Spam trap. Bots fill every input they find; people never see this one.
 *
 * It is positioned off-screen rather than `display: none`, because the cruder
 * scrapers skip hidden inputs. It is out of the tab order, hidden from
 * assistive tech, and excluded from autofill.
 *
 * @param {Object} props
 * @param {string} props.value
 * @param {(event: Event) => void} props.onChange
 */
export function Honeypot({ value, onChange }) {
  return (
    <div className={styles.trap} aria-hidden="true">
      <label htmlFor={HONEYPOT_FIELD}>Company website</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
