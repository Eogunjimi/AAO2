'use client';

import { company } from '@/data/company';
import { cn } from '@/lib/cn';

import styles from './FloatingWhatsapp.module.css';

/**
 * Persistent WhatsApp hand-off fixed in the bottom-right corner.
 *
 * Renders a polished circular FAB with the official WhatsApp two-tone glyph
 * (white speech bubble containing a green telephone handset). The SVG is
 * inlined rather than going through the generic `<Icon>` component so we can
 * use two fill colours instead of being limited to `currentColor`.
 */
export function FloatingWhatsapp({ className }) {
  return (
    <a
      href={company.phone.whatsapp}
      className={cn(styles.button, className)}
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        viewBox="0 0 32 32"
        className={styles.glyph}
        aria-hidden="true"
        focusable="false"
      >
        {/* White speech-bubble body with tail pointing to lower-left. */}
        <path
          fill="currentColor"
          d="M16 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.42.68 4.7 1.86 6.66L3 29l6.6-1.86A12.73 12.73 0 0 0 16 28.8c7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2z"
        />
        {/* Green telephone handset inside the bubble. */}
        <path
          fill="var(--fab-glyph-green, #25d366)"
          d="M21.46 19.15c-.23-.12-1.38-.68-1.59-.76-.22-.08-.37-.12-.53.12-.15.23-.6.76-.74.91-.13.16-.27.18-.5.06-.23-.12-.97-.36-1.85-1.14-.68-.6-1.15-1.35-1.28-1.57-.14-.23-.01-.36.1-.47.1-.1.23-.27.35-.43.11-.16.15-.27.23-.44.07-.17.04-.32-.02-.45-.06-.13-.53-1.27-.72-1.75-.19-.46-.39-.4-.53-.4l-.45-.01c-.15 0-.4.06-.61.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.57 2.4 3.8 3.36.56.24.98.38 1.3.49.54.18 1.04.15 1.43.09.44-.07 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.05-.1-.2-.16-.44-.28z"
        />
      </svg>
    </a>
  );
}
