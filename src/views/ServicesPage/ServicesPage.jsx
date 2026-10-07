'use client';

import { Link } from '@/lib/router';

import { Seo } from '@/components/common/Seo';
import { ContactSection, ProcessSection } from '@/components/sections/home';
import { Button, Container, Eyebrow, Reveal, Section, SectionHeading } from '@/components/ui';
import { company } from '@/data/company';
import { getServicesByCategory } from '@/lib/services';
import { anchors, paths } from '@/routes/paths';

import styles from './ServicesPage.module.css';

/** Catalogue of every service, grouped by category. */
export default function ServicesPage() {
  const groups = getServicesByCategory();

  return (
    <>
      <Seo
        title="Services — Solar, Electrical, Security & ICT"
        description="Solar, electrical, CCTV, access control, automation and ICT services by AAO Engineering Services — assessed properly, installed neatly, supported for life."
        image="/images/hero-solar.jpg"
      />

      <section className={styles.hero} aria-labelledby="services-hero-title">
        <Container>
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
            <h1 id="services-hero-title" className={styles.title}>
              Power, security and connectivity — engineered for your property.
            </h1>
            <p className={styles.subtitle}>
              Every project starts with a free site inspection and a professional assessment. Pick
              the service you need, or talk to our team and we will recommend the right fit.
            </p>
            <div className={styles.actions}>
              <Button to={anchors.contact} variant="volt">
                Book a Free Site Inspection
              </Button>
              <Button href={company.phone.href} variant="ghost">
                Call {company.phone.display}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          tone={groupIndex % 2 === 0 ? 'light' : 'wash'}
          aria-labelledby={`${group.id}-title`}
        >
          <Container>
            <SectionHeading
              id={`${group.id}-title`}
              eyebrow={`0${groupIndex + 1}`}
              title={group.name}
              className={styles.groupHeading}
            />

            <ul className={styles.grid}>
              {group.services.map((service, index) => (
                <Reveal as="li" key={service.slug} delay={index * 60}>
                  <Link to={paths.service(service.slug)} className={styles.card}>
                    <span className={styles.thumb}>
                      <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
                    </span>
                    <span className={styles.body}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <span className={styles.summary}>{service.summary}</span>
                      <span className={styles.link}>Explore service →</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <ProcessSection
        id="services-process"
        showFooter={false}
        title={
          <>
            Getting Started <em>Is Simple</em>
          </>
        }
      />
      <ContactSection />
    </>
  );
}
