import { vi } from 'vitest';

/**
 * Test stub for `next/navigation`.
 *
 * Mirrors the handful of exports the app uses. `notFound()` throws the way the
 * real one does, so a test can assert that an unknown slug refuses to render.
 */

/** Thrown by `notFound()`; matches how Next signals a 404 to the router. */
export class NotFoundError extends Error {
  constructor() {
    super('NEXT_NOT_FOUND');
    this.digest = 'NEXT_NOT_FOUND';
  }
}

export function notFound() {
  throw new NotFoundError();
}

export function redirect(url) {
  const error = new Error('NEXT_REDIRECT');
  error.digest = `NEXT_REDIRECT;${url}`;
  throw error;
}

export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});

export const useRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
});
