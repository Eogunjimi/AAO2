import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite configuration.
 *
 * `VITE_HMR_CLIENT_PORT` lets the dev server run behind an HTTPS reverse proxy
 * (cloud IDEs, preview sandboxes) where the browser reaches the app on a port
 * that differs from the one Vite listens on.
 */
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT) || undefined;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    // Allow proxied preview hostnames (e.g. https://5173-<id>.e2b.app).
    allowedHosts: true,
    hmr: hmrClientPort ? { clientPort: hmrClientPort, protocol: 'wss' } : true,
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Keep third-party code in its own long-lived cache entry.
        manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: true,
    include: ['src/**/*.test.{js,jsx}'],
  },
});
