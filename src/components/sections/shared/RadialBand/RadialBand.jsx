import { Container, RadialBackdrop, Section } from '@/components/ui';
import { cn } from '@/lib/cn';

import styles from './RadialBand.module.css';

/**
 * Centred band with the animated radial backdrop, shared by the contact and
 * service-area sections.
 */
export function RadialBand({ id, className, children, ...rest }) {
  return (
    <Section
      id={id}
      tone="wash"
      spacing="spacious"
      className={cn(styles.band, className)}
      {...rest}
    >
      <RadialBackdrop />
      <Container className={styles.content}>{children}</Container>
    </Section>
  );
}
