'use client';

import { HeroQuoteBar } from '@/components/sections/home/HeroQuoteBar';
import { Button, Container, Eyebrow, Icon, Reveal } from '@/components/ui';
import { company } from '@/data/company';
import { heroSlides } from '@/data/projects';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { paths } from '@/routes/paths';

import styles from './HeroSection.module.css';

const reviewAvatars = [
  { id: 'homeowner', src: '/images/hero-avatar-1.webp', alt: 'Nigerian homeowner' },
  { id: 'contractor', src: '/images/hero-avatar-2.webp', alt: 'Nigerian contractor' },
  { id: 'business-owner', src: '/images/hero-avatar-3.webp', alt: 'Nigerian business owner' },
  { id: 'facility-manager', src: '/images/hero-avatar-4.webp', alt: 'Nigerian facility manager' },
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
            Stop Overpaying for the Wrong <em>Solar &amp; CCTV Systems</em> in Lagos
          </h1>

          <p className={styles.subtitle}>
            AAO Engineering Services delivers expert solar, inverter, and CCTV installation in Lagos
            — backed by a free load audit and warranty on every job.
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
                <Icon name="google" brand />
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
            <Button to={paths.services} variant="ghost-light">
              Explore Our Services
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
