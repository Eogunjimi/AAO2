import { IconButton, Reveal, ReviewCard } from '@/components/ui';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';

import styles from './ReviewsCarousel.module.css';

/**
 * Sliding review rail shared by the home page and the service pages.
 *
 * The window moves one card at a time, so there is a dot per reachable
 * position rather than per card. How many cards are visible is decided here
 * and handed to CSS as `--per-view`, keeping the slide maths in one place.
 *
 * @param {Object} props
 * @param {Array} props.reviews
 * @param {boolean} [props.showSource]
 * @param {'start'|'center'} [props.align]   Alignment of the controls.
 * @param {number} [props.autoPlayMs]        0 disables autoplay.
 */
export function ReviewsCarousel({
  reviews,
  showSource = true,
  align = 'center',
  autoPlayMs = 6000,
}) {
  const [viewportRef, inView] = useInView({ threshold: 0.2 });
  const isNarrow = useMediaQuery('(max-width: 960px)');
  const isMobile = useMediaQuery('(max-width: 700px)');

  const perView = isMobile ? 1 : isNarrow ? 2 : 3;
  const positions = Math.max(1, reviews.length - perView + 1);

  const { index, goTo, next, previous, pause, resume, swipeHandlers } = useCarousel({
    length: positions,
    autoPlayMs,
    active: inView,
  });

  return (
    <Reveal className={styles.carousel}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        {...swipeHandlers}
      >
        <ul className={styles.track} style={{ '--per-view': perView, '--index': index }}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.slide}>
              <ReviewCard review={review} showSource={showSource} />
            </li>
          ))}
        </ul>
      </div>

      {positions > 1 ? (
        <div className={cn(styles.controls, styles[align])}>
          <IconButton label="Previous reviews" onClick={previous}>
            ←
          </IconButton>

          <div className={styles.dots}>
            {Array.from({ length: positions }, (_, position) => (
              <button
                key={position}
                type="button"
                className={cn(styles.dot, position === index && styles.dotActive)}
                aria-label={`Show reviews ${position + 1} to ${Math.min(position + perView, reviews.length)}`}
                aria-current={position === index}
                onClick={() => goTo(position)}
              />
            ))}
          </div>

          <IconButton label="Next reviews" onClick={next}>
            →
          </IconButton>
        </div>
      ) : null}
    </Reveal>
  );
}
