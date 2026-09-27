import { Button, Container, Icon, Reveal, Section } from '@/components/ui';
import { company } from '@/data/company';

import styles from './AreaSection.module.css';

/**
 * A titled block on a service-area page: local copy, the list it introduces,
 * and the phone call-to-action.
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {React.ReactNode} props.title
 * @param {string} props.body
 * @param {string[]} props.list
 * @param {'light'|'wash'} [props.tone]
 */
export function AreaSection({ id, title, body, list, tone = 'light' }) {
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <Reveal className={styles.block}>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>

          <p className={styles.body}>{body}</p>

          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item}>
                <Icon name="bolt" size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.cta}>
            <Button href={company.phone.href}>
              <Icon name="phone" size={16} />
              Call {company.phone.display}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
