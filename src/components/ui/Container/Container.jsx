import { cn } from '@/lib/cn';

import styles from './Container.module.css';

/**
 * Horizontal page gutter + max width. Every section content block uses it so
 * the grid stays consistent across the site.
 */
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
