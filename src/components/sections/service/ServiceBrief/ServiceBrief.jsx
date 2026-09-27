import { QuoteForm } from '@/components/forms/QuoteForm';
import { Container, Icon, Reveal, Section } from '@/components/ui';
import { company } from '@/data/company';

import styles from './ServiceBrief.module.css';

/**
 * The body of a service page: the quote form, the long-form introduction and
 * what the customer gets.
 *
 * The form comes first in the DOM so it sits directly under the trust strip on
 * a phone; on desktop the grid moves it into a sticky sidebar beside the copy.
 *
 * @param {Object} props
 * @param {import('@/data/services').Service} props.service
 * @param {ReturnType<typeof import('@/lib/services').getServicePage>} props.page
 */
export function ServiceBrief({ service, page }) {
  return (
    <Section aria-labelledby="service-intro-title">
      <Container className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.formCard}>
            <QuoteForm defaultService={service.slug} />
          </div>
        </div>

        <div className={styles.content}>
          <Reveal>
            <h2 id="service-intro-title" className={styles.introTitle}>
              {page.introTitle}
            </h2>

            <figure className={styles.figure}>
              <img
                src={page.introImage}
                alt={`${service.title} by ${company.name}`}
                loading="lazy"
                decoding="async"
              />
            </figure>

            {page.introBody.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className={styles.included}>
            <h2 className={styles.includedTitle}>
              {page.includedTitle.lead} <em>{page.includedTitle.accent}</em>
            </h2>

            <ul className={styles.cards}>
              {page.included.map((item) => (
                <li key={item.id} className={styles.card}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
