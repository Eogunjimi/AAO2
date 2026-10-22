/**
 * Build step: writes one static HTML file per indexable route.
 *
 * Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx`.
 * For each route it renders the React tree on the server, then writes
 * dist/<route>/index.html with the route's title, meta tags, canonical,
 * JSON-LD, the pre-rendered body and the CSS that page needs. The browser
 * bundle then takes over exactly as before.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { buildHeadTags, stripManagedHead } from '../src/lib/headTags.js';
import { getIndexableRoutes } from '../src/lib/indexableRoutes.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { renderRoute } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(path.join(distDir, '.vite', 'manifest.json'), 'utf8'));

/** CSS files for a manifest entry, including the shared chunks it imports. */
function collectCss(key, seen = new Set(), out = []) {
  const entry = manifest[key];
  if (!entry || seen.has(key)) return out;
  seen.add(key);
  for (const file of entry.css ?? []) out.push(file);
  for (const imported of entry.imports ?? []) collectCss(imported, seen, out);
  return out;
}

/** Global CSS (from index.html) plus the route's own page chunk CSS. */
function cssForRoute(route) {
  const files = [...collectCss('index.html'), ...collectCss(`src/pages/${route.page}/index.js`)];
  // The template already links the global stylesheet; don't link it twice.
  return [...new Set(files)]
    .filter((file) => !template.includes(`/${file}"`))
    .map((file) => `<link rel="stylesheet" href="/${file}" />`)
    .join('\n    ');
}

function assemblePage(route, body, head) {
  const cleaned = stripManagedHead(template);
  const headTags = [head ? buildHeadTags(head) : '', cssForRoute(route)]
    .filter(Boolean)
    .join('\n    ');

  return cleaned
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const routes = getIndexableRoutes();
const failures = [];

for (const route of routes) {
  try {
    const { html, head } = await renderRoute(route.path);
    if (!head) throw new Error('no <Seo /> metadata was rendered');

    const page = assemblePage(route, html, head);
    const outFile =
      route.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, page);
    console.info(`[prerender] ${route.path}`);
  } catch (error) {
    failures.push({ path: route.path, error });
  }
}

await rm(serverDir, { recursive: true, force: true });

if (failures.length) {
  for (const { path: failedPath, error } of failures) {
    console.error(`[prerender] FAILED ${failedPath}:`, error);
  }
  process.exit(1);
}

console.info(`[prerender] wrote ${routes.length} pages`);
