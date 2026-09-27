import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

import styles from './SectionHeading.module.css';

/**
 * Eyebrow + heading + supporting copy, used at the top of every section.
 *
 * @param {Object} props
 * @param {string} props.eyebrow
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.subtitle] Bold line under the title.
 * @param {React.ReactNode} [props.description]
 * @param {'left'|'center'} [props.align]
 * @param {'display'|'compact'} [props.size] `compact` sets the title at the
 *   sub-headline scale, for sections that lead on their promise.
 * @param {'default'|'inverse'} [props.tone]
 * @param {2|3} [props.level] Heading level to render.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  size = 'display',
  tone = 'default',
  level = 2,
  id,
  className,
}) {
  const Heading = `h${level}`;

  return (
    <Reveal className={cn(styles.heading, styles[align], styles[tone], className)}>
      {eyebrow ? <Eyebrow tone={tone === 'inverse' ? 'volt' : 'default'}>{eyebrow}</Eyebrow> : null}
      <Heading id={id} className={cn(styles.title, styles[size])}>
        {title}
      </Heading>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </Reveal>
  );
}
