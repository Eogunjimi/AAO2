import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// jsdom implements neither of these browser APIs, and several components rely
// on them, so provide deterministic stubs for the whole suite.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target }], this);
  }

  unobserve() {}

  disconnect() {}
}

window.IntersectionObserver = IntersectionObserverStub;
global.IntersectionObserver = IntersectionObserverStub;

window.scrollTo = vi.fn();
window.open = vi.fn(() => ({}));
Element.prototype.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
