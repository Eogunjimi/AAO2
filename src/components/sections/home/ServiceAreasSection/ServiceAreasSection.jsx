import { RadialBand } from '@/components/sections/shared/RadialBand';
import { Button, Chip, Eyebrow, Icon, Reveal } from '@/components/ui';
import { company, primaryCtaLabel } from '@/data/company';
import { serviceAreaPages } from '@/data/areas';
import { anchors, paths } from '@/routes/paths';

import styles from './ServiceAreasSection.module.css';

/** Coverage map band listing the Lagos neighbourhoods AAO serves. */
export function ServiceAreasSection() {
  return (
    <RadialBand id="areas" aria-labelledby="areas-title">
      <Reveal>
        <Eyebrow tone="ember">Service Areas</Eyebrow>
        <h2 id="areas-title">
          Proudly Rooted in <em>Lagos</em>. Ready When You Are
        </h2>
        <p className={styles.subtitle}>
          Based at <strong>Magnet Plaza, Meiran</strong> (beside Majok Filling Station, Ladipo Bus
          Stop), AAO proudly serves homes, offices, shops, schools, hospitals, and industries across
          Lagos and surrounding areas. Free site inspections, original products, and fast, neat
          installations—wherever you are.
        </p>
      </Reveal>

      <Reveal as="ul" className={styles.chips}>
        {serviceAreaPages.map((area) => (
          <li key={area.slug}>
            <Chip to={paths.serviceArea(area.slug)}>{area.name}</Chip>
          </li>
        ))}
      </Reveal>

      <Reveal className={styles.actions}>
        <Button to={anchors.contact}>{primaryCtaLabel}</Button>
        <Button href={company.phone.href} variant="ghost">
          <Icon name="phone" size={15} />
          {company.phone.display}
        </Button>
      </Reveal>

      <Reveal>
        <p className={styles.legal}>CAC Certified · COREN · NEMSA — Licensed &amp; Insured</p>
      </Reveal>
    </RadialBand>
  );
}
