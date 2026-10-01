import { Button, Icon } from '@/components/ui';
import { company } from '@/data/company';

import styles from './FloatingWhatsapp.module.css';

/** Persistent WhatsApp hand-off that stays available without crowding the nav. */
export function FloatingWhatsapp() {
  return (
    <Button
      href={company.phone.whatsapp}
      variant="solid"
      className={styles.button}
      aria-label="Chat on WhatsApp"
    >
      <Icon name="whatsapp" size={34} />
    </Button>
  );
}
