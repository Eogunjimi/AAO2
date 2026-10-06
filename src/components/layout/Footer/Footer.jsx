import Link from 'next/link';

import { Logo } from '@/components/layout/Logo';
import { Button, Chip, Container, Icon, Marquee } from '@/components/ui';
import { serviceAreaPages } from '@/data/areas';
import { company, navbarCtaLabel, officeAddress } from '@/data/company';
import { footerMenus } from '@/data/navigation';
import { featuredServices } from '@/data/services';
import { anchors, paths } from '@/routes/paths';

import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

/** Global footer: service marquee, sitemap, service areas and legal line. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Marquee speed={46} className={styles.marquee}>
        {featuredServices.map((service) => (
          <span key={service.slug} className={styles.marqueeGroup}>
            <span className={styles.marqueeText}>{service.label}</span>
            <span className={styles.marqueeStar}>★</span>
          </span>
        ))}
      </Marquee>

      <Container className={styles.main}>
        <div className={styles.grid}>
          <div>
            <Logo tone="inverse" />
            <p className={styles.tagline}>
              {company.tagline} Power &amp; security solutions built to last.
            </p>
            <a className={styles.line} href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a className={styles.line} href={company.phone.href}>
              {company.phone.display}
            </a>
            <address className={styles.address}>
              {officeAddress.lines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
              <a
                className={styles.directions}
                href={officeAddress.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions →
              </a>
            </address>

            <ul className={styles.socials}>
              {company.socials.map((social) => (
                <li key={social.id}>
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                    <Icon name={social.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerMenus.map((menu) => (
            <nav key={menu.id} aria-label={menu.title}>
              <h2 className={styles.columnTitle}>{menu.title}</h2>
              <ul>
                {menu.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.to} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={styles.columnTitle}>Connect With Us Now</h2>
            <p className={styles.note}>
              Free site inspections · Clear upfront pricing · {company.responseTime}.
            </p>
            <Button to={anchors.contact} variant="volt">
              {navbarCtaLabel}
            </Button>
          </div>
        </div>

        <section className={styles.areas} aria-labelledby="footer-areas">
          <h2 id="footer-areas" className={styles.columnTitle}>
            Service Areas
          </h2>
          <ul className={styles.areaChips}>
            {serviceAreaPages.map((area) => (
              <li key={area.slug}>
                <Chip tone="outline" to={paths.serviceArea(area.slug)}>
                  {area.name}
                </Chip>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <Icon name="copyright" size={54} className={styles.copyMark} />
            <p className={styles.legal}>
              © {currentYear} {company.name}. All rights reserved.
              <br />
              Proudly designed with ❤️ by{' '}
              <a href={company.credit.href} target="_blank" rel="noreferrer">
                {company.credit.label}
              </a>
            </p>
          </div>
          <p className={styles.year} aria-hidden="true">
            {currentYear}
          </p>
        </div>
      </Container>
    </footer>
  );
}
