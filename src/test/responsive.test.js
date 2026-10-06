import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Guards the handful of rules that decide whether the site fits a narrow
 * screen. Each one has been reverted by accident at least once in projects
 * this size, and none of them is visible in a desktop browser.
 */

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

/** Narrowest viewport we support, minus the gutter on both sides. */
const MIN_VIEWPORT = 320;
const MIN_GUTTER = 16;
const MAX_CONTENT = MIN_VIEWPORT - MIN_GUTTER * 2; // 288px

/**
 * Elements inside a horizontally scrolling rail are allowed to be wider than
 * the screen — that is the point of a rail.
 */
const SCROLLING_RAILS = ['ProjectMarquee.module.css', 'Marquee.module.css'];

function moduleStylesheets(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return moduleStylesheets(path);
    return entry.name.endsWith('.module.css') ? [path] : [];
  });
}

const read = (path) => readFileSync(join(ROOT, path), 'utf8');

describe('responsive foundations', () => {
  it('scales the container gutter with the viewport', () => {
    // A fixed 24px gutter costs a 320px phone 15% of its width.
    expect(read('src/styles/tokens.css')).toMatch(/--container-gutter:\s*clamp\(/);
  });

  it('scales section rhythm with the viewport', () => {
    expect(read('src/styles/tokens.css')).toMatch(/--section-padding:\s*clamp\(/);

    const section = read('src/components/ui/Section/Section.module.css');
    expect(section).toMatch(/\.spacing-compact\s*{\s*padding-block:\s*clamp\(/);
    expect(section).toMatch(/\.spacing-spacious\s*{\s*padding-block:\s*clamp\(/);
  });

  it('keeps content clear of the notch in landscape', () => {
    const container = read('src/components/ui/Container/Container.module.css');

    expect(container).toMatch(/padding-left:\s*max\(.*?env\(safe-area-inset-left\)/);
    expect(container).toMatch(/padding-right:\s*max\(.*?env\(safe-area-inset-right\)/);
  });

  it('breaks long unbroken strings rather than overflowing', () => {
    expect(read('src/styles/base.css')).toMatch(/overflow-wrap:\s*break-word/);
  });

  it('clips sideways overflow without creating a scroll container', () => {
    // `clip` must follow `hidden`: the fallback first, then the value that
    // cannot put the sticky header or sticky quote forms at risk.
    const base = read('src/styles/base.css');
    const hidden = base.indexOf('overflow-x: hidden');
    const clip = base.indexOf('overflow-x: clip');

    expect(hidden).toBeGreaterThan(-1);
    expect(clip).toBeGreaterThan(hidden);
  });

  it('lets the viewport scale, so pinch-zoom still works', async () => {
    // Next builds the viewport meta tag from the root layout's export, so the
    // guard reads that rather than a static index.html.
    const { viewport } = await import('@/app/layout');

    expect(viewport.width).toBe('device-width');
    expect(viewport.initialScale).toBe(1);
    // Blocking zoom is a WCAG failure and breaks low-vision users outright.
    expect(viewport.userScalable).not.toBe(false);
    expect(viewport.maximumScale).toBeUndefined();
  });

  it('declares no fixed width wider than the narrowest screen', () => {
    const offenders = moduleStylesheets(SRC).flatMap((file) => {
      if (SCROLLING_RAILS.some((name) => file.endsWith(name))) return [];
      const css = readFileSync(file, 'utf8');

      return [...css.matchAll(/(?<!max-)(?<!-)\b(min-width|width):\s*(\d+)px/g)]
        .filter(([, , px]) => Number(px) > MAX_CONTENT)
        .map(([, prop, px]) => `${relative(ROOT, file)} sets ${prop}: ${px}px`);
    });

    expect(offenders).toEqual([]);
  });
});
