import { Stars } from '@/components/ui/Stars';
import { cn } from '@/lib/cn';

import styles from './ReviewCard.module.css';

/**
 * A single customer review.
 *
 * @param {Object} props
 * @param {import('@/data/reviews').Review} props.review
 * @param {boolean} [props.showSource] Display the Google/Facebook badge.
 */
export function ReviewCard({ review, showSource = true, className }) {
  return (
    <figure className={cn(styles.card, className)}>
      <Stars rating={review.rating} className={styles.stars} />
      <blockquote className={styles.quote}>{review.quote}</blockquote>
      <figcaption className={styles.meta}>
        <span>
          <b>{review.author}</b> — {review.location}
        </span>
        {showSource ? <span className={styles.source}>{review.source}</span> : null}
      </figcaption>
    </figure>
  );
}
