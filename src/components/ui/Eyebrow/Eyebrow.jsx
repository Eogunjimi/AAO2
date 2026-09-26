import { cn } from '@/lib/cn';

import styles from './Eyebrow.module.css';

/** Small uppercase kicker that sits above section headings. */
export function Eyebrow({ as: Tag = 'span', tone = 'default', className, children, ...rest }) {
  return (
    <Tag className={cn(styles.eyebrow, styles[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
