import { IconButton } from '@/components/ui/IconButton';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

import styles from './ImageSlider.module.css';

/**
 * Image carousel with captions, arrows, optional dots, swipe and autoplay.
 *
 * @param {Object} props
 * @param {Array<{id: string, image: string, alt: string, caption?: string}>} props.slides
 * @param {string} props.label           Accessible name for the carousel region.
 * @param {number} [props.autoPlayMs]    0 disables autoplay.
 * @param {boolean} [props.showDots]
 * @param {'4/3'|'16/7.5'} [props.ratio]
 * @param {'eager'|'lazy'} [props.loading] Loading strategy for the first slide.
 */
export function ImageSlider({
  slides,
  label,
  autoPlayMs = 0,
  showDots = false,
  ratio = '4/3',
  loading = 'lazy',
  className,
}) {
  const [viewportRef, inView] = useInView({ threshold: 0.25 });
  const { index, goTo, next, previous, pause, resume, swipeHandlers } = useCarousel({
    length: slides.length,
    autoPlayMs,
    active: inView,
  });

  return (
    <div
      ref={viewportRef}
      className={cn(styles.slider, className)}
      style={{ aspectRatio: ratio }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      {...swipeHandlers}
    >
      <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <figure
            key={slide.id}
            className={styles.slide}
            aria-hidden={slideIndex !== index}
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={slideIndex === 0 ? loading : 'lazy'}
              decoding="async"
            />
            {slide.caption ? (
              <figcaption className={styles.caption}>{slide.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <IconButton
        variant="floating"
        className={styles.prev}
        label={`Previous slide, ${label}`}
        onClick={previous}
      >
        ←
      </IconButton>
      <IconButton
        variant="floating"
        className={styles.next}
        label={`Next slide, ${label}`}
        onClick={next}
      >
        →
      </IconButton>

      {showDots ? (
        <div className={styles.dots}>
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              className={cn(styles.dot, slideIndex === index && styles.dotActive)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index}
              onClick={() => goTo(slideIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
