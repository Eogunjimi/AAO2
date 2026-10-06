import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';
import { cn } from '@/lib/cn';
import { initials } from '@/lib/text';

import styles from './ReviewCard.module.css';

/** Review platforms we syndicate from, mapped to the icon registry. */
const SOURCE_ICONS = {
  Google: 'google',
  Facebook: 'facebook',
};

/** Keep the intrinsic size in step with `--avatar-size` in the stylesheet. */
const AVATAR_SIZE = 48;

/**
 * A single customer review: rating header, quote and author credit.
 *
 * The credit leads with the reviewer's portrait when `review.avatar` is set,
 * and falls back to their initials so a review without a photo still renders
 * an identically sized badge.
 *
 * @param {Object} props
 * @param {import('@/data/reviews').Review} props.review
 * @param {boolean} [props.showSource] Display the Google/Facebook attribution.
 * @param {string} [props.className]
 */
export function ReviewCard({ review, showSource = true, className }) {
  const sourceIcon = SOURCE_ICONS[review.source];

  return (
    <figure className={cn(styles.card, className)}>
      <div className={styles.head}>
        <Icon name="quote" size={30} className={styles.mark} />

        <span className={styles.rating}>
          {showSource && sourceIcon ? <Icon name={sourceIcon} size={17} brand /> : null}
          <b>{review.rating.toFixed(1)}</b>
          <Stars rating={review.rating} />
        </span>
      </div>

      <blockquote className={styles.quote}>{review.quote}</blockquote>

      <figcaption className={styles.meta}>
        {/*
          Decorative: the author's name is already announced by the text
          beside it, so a photo or initials here would only repeat it.
        */}
        <span className={styles.avatar} aria-hidden="true">
          {review.avatar ? (
            <img
              className={styles.avatarImage}
              src={review.avatar}
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              loading="lazy"
              decoding="async"
            />
          ) : (
            initials(review.author)
          )}
        </span>
        <span>
          <b className={styles.author}>{review.author}</b>
          <span className={styles.credit}>
            {showSource
              ? `${review.location} · Based on ${review.source} reviews`
              : review.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
