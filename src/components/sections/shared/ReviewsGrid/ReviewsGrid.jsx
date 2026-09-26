import { useMemo, useState } from 'react';

import { IconButton, Reveal, ReviewCard } from '@/components/ui';
import { chunk } from '@/lib/array';
import { cn } from '@/lib/cn';

import styles from './ReviewsGrid.module.css';

/**
 * Paged review grid shared by the home page and the service pages.
 *
 * @param {Object} props
 * @param {Array} props.reviews
 * @param {number} [props.perPage]
 * @param {boolean} [props.showSource]
 * @param {'start'|'center'} [props.align] Alignment of the pager controls.
 */
export function ReviewsGrid({ reviews, perPage = 3, showSource = true, align = 'center' }) {
  const pages = useMemo(() => chunk(reviews, perPage), [reviews, perPage]);
  const [page, setPage] = useState(0);

  const goTo = (next) => setPage(((next % pages.length) + pages.length) % pages.length);

  return (
    <>
      <Reveal className={styles.grid} aria-live="polite">
        {pages[page].map((review) => (
          <ReviewCard key={review.id} review={review} showSource={showSource} />
        ))}
      </Reveal>

      {pages.length > 1 ? (
        <div className={cn(styles.nav, styles[align])}>
          <IconButton label="Previous reviews" onClick={() => goTo(page - 1)}>
            ←
          </IconButton>
          <p className={styles.counter}>
            Page {page + 1} of {pages.length}
          </p>
          <IconButton label="Next reviews" onClick={() => goTo(page + 1)}>
            →
          </IconButton>
        </div>
      ) : null}
    </>
  );
}
