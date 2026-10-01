import { HeroQuoteBar } from '@/components/sections/home/HeroQuoteBar';
import { Button, Container, Eyebrow, Icon, Reveal } from '@/components/ui';
import { company } from '@/data/company';
import { heroSlides } from '@/data/projects';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { anchors } from '@/routes/paths';

import styles from './HeroSection.module.css';

const reviewAvatars = [
  { id: 'homeowner', src: '/images/hero-avatar-1.png', alt: 'Nigerian homeowner' },
  { id: 'contractor', src: '/images/hero-avatar-2.png', alt: 'Nigerian contractor' },
  { id: 'business-owner', src: '/images/hero-avatar-3.png', alt: 'Nigerian business owner' },
  { id: 'facility-manager', src: '/images/hero-avatar-4.png', alt: 'Nigerian facility manager' },
];

/** Above-the-fold value proposition, imagery and quick conversion path. */
export function HeroSection() {
  const [heroRef, inView] = useInView({ threshold: 0.25 });
  const { index, pause, resume, swipeHandlers } = useCarousel({
    length: heroSlides.length,
    autoPlayMs: 5200,
    active: inView,
  });

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
      onFocus={pause}
      onBlur={resume}
      {...swipeHandlers}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.slideTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
          {heroSlides.map((slide, slideIndex) => (
            <div key={slide.id} className={styles.backgroundSlide}>
              <img
                src={slide.image}
                alt=""
                loading={slideIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <Container className={styles.inner}>
        <Reveal className={styles.content}>
          <Eyebrow className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {company.name} · {company.address.display}
          </Eyebrow>

          <h1 id="hero-title" className={styles.title}>
            Reliable <em>Power &amp; Security</em> for Lagos Homes and Businesses
          </h1>

          <p className={styles.subtitle}>
            Professionally designed solar, electrical, CCTV, and security systems built to give you
            dependable power, better protection, and lasting peace of mind.
          </p>

          <div
            className={styles.reviewBadge}
            aria-label="5.0 star rating. Trusted by 200 Homes & Businesses Across Nigeria."
          >
            <div className={styles.reviewBadgeTop}>
              <ul className={styles.reviewAvatars} aria-label="Customers">
                {reviewAvatars.map((avatar) => (
                  <li key={avatar.id} className={styles.reviewAvatar}>
                    <img src={avatar.src} alt={avatar.alt} loading="eager" decoding="async" />
                  </li>
                ))}
              </ul>

              <span className={styles.googleBadge} aria-hidden="true">
                <svg viewBox="0 0 48 48" focusable="false">
                  <path
                    fill="#4285f4"
                    d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.4 6.6-16.1z"
                  />
                  <path
                    fill="#34a853"
                    d="M24 46c5.9 0 10.9-2 14.6-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.5 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C8 41.1 15.4 46 24 46z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.3C2.9 17.1 2 20.5 2 24s.9 6.9 2.3 9.9l7.4-5.7z"
                  />
                  <path
                    fill="#ea4335"
                    d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8 6.9 4.3 14.1l7.4 5.7c1.7-5.2 6.6-9 12.3-9z"
                  />
                </svg>
              </span>

              <p className={styles.ratingLine}>
                <strong>5.0</strong>
                <span className={styles.reviewStars} aria-hidden="true">
                  ★★★★★
                </span>
              </p>
            </div>

            <p className={styles.reviewText}>
              Trusted by 200 Homes &amp; Businesses Across Nigeria
            </p>
          </div>

          <div className={styles.actions}>
            <Button to={anchors.process} variant="ghost-light">
              See How We Work
              <span className={styles.gears} aria-hidden="true">
                <Icon name="gear" size={20} className={styles.gear} />
              </span>
            </Button>
          </div>
        </Reveal>
      </Container>

      <HeroQuoteBar />
    </section>
  );
}
