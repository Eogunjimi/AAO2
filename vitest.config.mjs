import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vitest configuration.
 *
 * Next.js builds the app with its own compiler; Vitest keeps a minimal Vite
 * pipeline purely to transform JSX and CSS modules for the component tests.
 * The `next/*` modules that only exist inside the Next compiler or a running
 * App Router resolve to stubs under `src/test/stubs`.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Next's own modules expect a running App Router; the stubs render the
      // same markup and signal the same control flow without one.
      'next/link': fileURLToPath(new URL('./src/test/stubs/next-link.jsx', import.meta.url)),
      'next/navigation': fileURLToPath(
        new URL('./src/test/stubs/next-navigation.js', import.meta.url),
      ),
      'next/font/local': fileURLToPath(
        new URL('./src/test/stubs/next-font-local.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.jsx'],
    css: true,
    include: ['src/**/*.test.{js,jsx}'],
  },
});
