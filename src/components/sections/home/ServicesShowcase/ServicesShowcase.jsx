import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Chip,
  Container,
  IconButton,
  Reveal,
  Section,
  SectionHeading,
} from '@/components/ui';
import { featuredServices, services } from '@/data/services';
import { useCarousel } from '@/hooks/useCarousel';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';
import { anchors, paths } from '@/routes/paths';

import styles from './ServicesShowcase.module.css';

const AUTOPLAY_MS = 5200;
const MOBILE_QUERY = '(max-width: 900px)';
const SCROLL_SYNC_DELAY = 140;

/**
 * Expanding card carousel for the five headline services.
 *
 * Desktop: hovering or the arrows expand a panel.
 * Mobile: the same cards become a scroll-snap rail that keeps the active dot
 * in sync with the user's finger.
 */
export function ServicesShowcase() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [sectionRef, inView] = useInView({ threshold: 0.3 });
  const { index, goTo, next, previous, pause, resume } = useCarousel({
    length: featuredServices.length,
    autoPlayMs: AUTOPLAY_MS,
    active: inView,
  });

  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollTimeout = useRef(null);
  const syncingFromScroll = useRef(false);

  // Keep the active card centred when the index changes on small screens.
  useEffect(() => {
    if (!isMobile) return;
    if (syncingFromScroll.current) {
      syncingFromScroll.current = false;
      return;
    }

    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [index, isMobile]);

  useEffect(() => () => clearTimeout(scrollTimeout.current), []);

  const handleScroll = () => {
    if (!isMobile) return;
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const midpoint = scroller.scrollLeft + scroller.clientWidth / 2;
      let closest = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, cardIndex) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = cardIndex;
        }
      });

      if (closest !== index) {
        syncingFromScroll.current = true;
        goTo(closest);
      }
    }, SCROLL_SYNC_DELAY);
  };

  return (
    <Section id="services" aria-labelledby="services-title" ref={sectionRef}>
      <Container>
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow="Our Services"
          title="Power & Security Solutions Built for Homes & Businesses"
          description="We help homes and businesses stay powered, protected, and connected. Hover, tap, or use the arrows to explore each solution."
        />

        <Reveal>
          <div
            className={styles.track}
            ref={scrollerRef}
            onScroll={handleScroll}
            onMouseLeave={resume}
          >
            {featuredServices.map((service, cardIndex) => {
              const isActive = cardIndex === index;
              return (
                <article
                  key={service.slug}
                  ref={(node) => {
                    cardRefs.current[cardIndex] = node;
                  }}
                  className={cn(styles.card, isActive && styles.cardActive)}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      goTo(cardIndex);
                      pause();
                    }
                  }}
                >
                  <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                  <div className={styles.body}>
                    <h3 className={styles.cardTitle}>{service.label}</h3>
                    <p className={cn(styles.description, isActive && styles.descriptionVisible)}>
                      {service.description}
                    </p>
                    {isActive ? (
                      <Button
                        to={paths.service(service.slug)}
                        variant="volt"
                        size="sm"
                        className={styles.cta}
                      >
                        Get started →
                      </Button>
                    ) : (
                      <Link to={paths.service(service.slug)} className={styles.miniLink}>
                        Get started →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <div className={styles.nav}>
          <IconButton label="Previous service" onClick={previous}>
            ←
          </IconButton>
          <div className={styles.dots}>
            {featuredServices.map((service, dotIndex) => (
              <button
                key={service.slug}
                type="button"
                className={cn(styles.dot, dotIndex === index && styles.dotActive)}
                aria-label={`Show ${service.label}`}
                aria-current={dotIndex === index}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>
          <IconButton label="Next service" onClick={next}>
            →
          </IconButton>
        </div>

        <Reveal className={styles.other}>
          <h3 className={styles.otherTitle}>
            Other services — Power. Security. Solutions You Can Trust.
          </h3>
          <ul className={styles.tags}>
            {services.map((service) => (
              <li key={service.slug}>
                <Chip to={paths.service(service.slug)}>{service.title}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.footer}>
          <Button to={anchors.contact}>Get Your Quote Now</Button>
        </div>
      </Container>
    </Section>
  );
}
