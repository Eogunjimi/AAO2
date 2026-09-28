import { Button, Container, Eyebrow, Icon, Reveal, Stars } from '@/components/ui';
import { company, primaryCtaLabel } from '@/data/company';
import { heroSlides } from '@/data/projects';
import { useCarousel, useInView } from '@/hooks';
import { anchors, paths } from '@/routes/paths';

import styles from './HeroSection.module.css';

const heroProofPoints = ['Certified Technicians', 'Original Products + Warranty'];
const heroTrust = ['Free site inspection', 'Professional load audit', 'Warranty-backed products'];
const heroAvatars = [
  {
    id: 'engineer-load-audit',
    src: '/images/about-engineer.jpg',
    position: '40% 22%',
  },
  {
    id: 'electrical-technician',
    src: '/images/aao-electrical.jpg',
    position: '34% 20%',
  },
  {
    id: 'solar-technicians',
    src: '/images/ion-hero.jpg',
    position: '47% 34%',
  },
  {
    id: 'site-engineer',
    src: '/images/service-electrical.jpg',
    position: '38% 24%',
  },
];

/** Above-the-fold value proposition, imagery and quick quote form. */
export function HeroSection() {
  const [heroRef, inView] = useInView({ threshold: 0.2 });
  const { index: activeSlide } = useCarousel({
    length: heroSlides.length,
    autoPlayMs: 5200,
    active: inView,
  });

  return (
    <section ref={heroRef} className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        {heroSlides.map((slide, slideIndex) => (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            loading={slideIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`${styles.backdropImage} ${
              slideIndex === activeSlide ? styles.backdropImageActive : ''
            }`}
          />
        ))}
      </div>

      <Container className={styles.inner}>
        <Reveal className={styles.copy}>
          <Eyebrow tone="volt" className={styles.eyebrow}>
            {company.name} — {company.address.display}
          </Eyebrow>

          <h1 id="hero-title" className={styles.title}>
            Power &amp; Security Solutions for Homes and Businesses That Demand <em>Reliability</em>
          </h1>

          <p className={styles.subtitle}>
            Professionally designed solar, electrical, CCTV, and security systems built to give you
            dependable power, better protection, and lasting peace of mind.
          </p>

          <ul className={styles.serviceList} aria-label="AAO proof points">
            {heroProofPoints.map((point) => (
              <li key={point}>
                <span aria-hidden="true">✓</span>
                {point}
              </li>
            ))}
          </ul>

          <div className={styles.proofRow} aria-label="Customer proof">
            <div className={styles.avatars} aria-hidden="true">
              {heroAvatars.map((avatar) => (
                <span key={avatar.id}>
                  <img src={avatar.src} alt="" style={{ objectPosition: avatar.position }} />
                </span>
              ))}
            </div>
            <span className={styles.reviewIcon} aria-hidden="true">
              <Icon name="google" size={18} />
            </span>
            <strong>5.0</strong>
            <Stars rating={5} className={styles.stars} />
            <span className={styles.proofText}>Trusted by 200+ Lagos homes &amp; businesses</span>
          </div>

          <div className={styles.actions}>
            <Button to={anchors.contact} variant="volt" className={styles.primaryCta}>
              {primaryCtaLabel}
            </Button>
            <Button to={paths.services} variant="ghost-light" className={styles.secondaryCta}>
              Explore Services
            </Button>
          </div>

          <ul className={styles.trustLine} aria-label="What every client gets">
            {heroTrust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
