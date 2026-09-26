import { cn } from '@/lib/cn';

import styles from './Section.module.css';

/**
 * A page band.
 *
 * @param {Object} props
 * @param {'light'|'wash'|'dark'|'ink'} [props.tone] Background treatment.
 * @param {'none'|'compact'|'default'|'spacious'} [props.spacing]
 */
export function Section({ id, tone = 'light', spacing = 'default', className, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn(styles.section, styles[tone], styles[`spacing-${spacing}`], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
