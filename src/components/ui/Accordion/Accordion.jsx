import { useId, useState } from 'react';

import { cn } from '@/lib/cn';

import styles from './Accordion.module.css';

/**
 * Accessible disclosure list used for the FAQs.
 *
 * Panels animate with `grid-template-rows` so no height measuring is needed,
 * and each trigger exposes `aria-expanded` / `aria-controls` for screen readers.
 *
 * @param {Object} props
 * @param {Array<{id: string, question: string, answer: string}>} props.items
 * @param {boolean} [props.allowMultiple] Keep previously opened panels open.
 * @param {string} [props.defaultOpenId]
 */
export function Accordion({ items, allowMultiple = false, defaultOpenId, className }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(() => (defaultOpenId ? [defaultOpenId] : []));

  const toggle = (id) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn(styles.list, className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className={cn(styles.item, isOpen && styles.open)}>
            <h3 className={styles.headingWrapper}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <span className={styles.indicator} aria-hidden="true">
                  <span className={styles.indicatorBar} />
                  <span className={cn(styles.indicatorBar, styles.indicatorBarVertical)} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
