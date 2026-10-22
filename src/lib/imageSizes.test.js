import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { imageSizes } from './imageSizes';

// Vitest runs from the repository root.
const srcDir = path.resolve('src');

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(jsx?|css)$/.test(name) && !/\.test\./.test(name) ? [full] : [];
  });
}

describe('imageSizes', () => {
  it('records a size for every local image the source references', () => {
    const referenced = new Set();
    for (const file of sourceFiles(srcDir)) {
      const text = readFileSync(file, 'utf8');
      for (const [, ref] of text.matchAll(
        /['"`](\/images\/[^'"`\s)]+\.(?:jpe?g|png|webp))['"`]/gi,
      )) {
        referenced.add(ref);
      }
    }

    const missing = [...referenced].filter((ref) => !imageSizes[ref]);
    expect(missing).toEqual([]);
  });

  it('holds positive integer dimensions', () => {
    for (const { width, height } of Object.values(imageSizes)) {
      expect(Number.isInteger(width) && width > 0).toBe(true);
      expect(Number.isInteger(height) && height > 0).toBe(true);
    }
  });
});
