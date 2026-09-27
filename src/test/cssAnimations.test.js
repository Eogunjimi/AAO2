import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Lightning CSS scopes animation names inside CSS Modules, so a module can
 * only reference keyframes declared in the same file. A reference to a
 * keyframe defined anywhere else compiles to a name that does not exist and
 * the animation silently never runs — which is easy to miss in review.
 */

const SRC = join(process.cwd(), 'src');

const KEYWORDS = new Set([
  'none',
  'linear',
  'infinite',
  'alternate',
  'alternate-reverse',
  'reverse',
  'normal',
  'forwards',
  'backwards',
  'both',
  'running',
  'paused',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'step-start',
  'step-end',
]);

function moduleStylesheets(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return moduleStylesheets(path);
    return entry.name.endsWith('.module.css') ? [path] : [];
  });
}

function referencedKeyframes(css) {
  return [...css.matchAll(/animation(?:-name)?:\s*([^;}]+)/g)].flatMap(([, value]) =>
    value.split(/[\s,]+/).filter(
      (token) =>
        token &&
        !KEYWORDS.has(token) &&
        !/^[\d.]/.test(token) && // durations and delays
        !token.includes('(') && // var(), cubic-bezier(), steps()
        /^[a-zA-Z_-][\w-]*$/.test(token),
    ),
  );
}

describe('CSS modules', () => {
  it('declare every keyframe they animate', () => {
    const unresolved = moduleStylesheets(SRC).flatMap((file) => {
      const css = readFileSync(file, 'utf8');
      const declared = new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(([, name]) => name));

      return referencedKeyframes(css)
        .filter((name) => !declared.has(name))
        .map((name) => `${relative(process.cwd(), file)} references "${name}"`);
    });

    expect(unresolved).toEqual([]);
  });
});
