import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { hydrate, renderOnServer } from '@/test/hydration';

import { Reveal } from './Reveal';

/**
 * Imported inside the callback so each pass gets the module registry the
 * hydration helpers set up for it — see `src/test/hydration.jsx`.
 */
const revealTree = async () => {
  const { Reveal: FreshReveal } = await import('./Reveal');
  return <FreshReveal className="custom">Content</FreshReveal>;
};

/** Classes on the outermost element of a chunk of markup. */
function classesOf(html) {
  const host = document.createElement('div');
  host.innerHTML = html;
  return [...host.firstElementChild.classList];
}

describe('<Reveal />', () => {
  it('hydrates its server markup without a mismatch', async () => {
    // This regressed once: the hook seeded its state from `typeof
    // IntersectionObserver`, absent on the server and present in the browser,
    // so every Reveal on the page disagreed with its own server HTML.
    expect(await hydrate(await renderOnServer(revealTree), revealTree)).toEqual([]);
  });

  it('paints its content before JavaScript runs', async () => {
    // Server HTML carries the visible class, so the prerendered page is
    // readable rather than sitting at opacity: 0 until hydration.
    const serverHtml = await renderOnServer(revealTree);

    expect(classesOf(serverHtml).some((name) => /visible/.test(name))).toBe(true);
    expect(serverHtml).toContain('Content');
  });

  it('hides an element the observer reports as off-screen', () => {
    const observers = [];

    class ManualObserver {
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe(target) {
        this.target = target;
      }
      unobserve() {}
      disconnect() {}
    }

    vi.stubGlobal('IntersectionObserver', ManualObserver);

    const { container } = render(<Reveal>Content</Reveal>);
    const element = container.firstElementChild;
    const visibleClass = [...element.classList].find((name) => /visible/.test(name));

    expect(visibleClass).toBeDefined();

    act(() => observers[0].callback([{ isIntersecting: false, target: element }], observers[0]));
    expect(element.classList.contains(visibleClass)).toBe(false);

    act(() => observers[0].callback([{ isIntersecting: true, target: element }], observers[0]));
    expect(element.classList.contains(visibleClass)).toBe(true);

    vi.unstubAllGlobals();
  });

  it('keeps the transition delay it was given', () => {
    const { container } = render(<Reveal delay={120}>Content</Reveal>);

    expect(container.firstElementChild).toHaveStyle({ transitionDelay: '120ms' });
  });
});
