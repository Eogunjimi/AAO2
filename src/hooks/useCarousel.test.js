import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCarousel } from './useCarousel';

describe('useCarousel', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('wraps around in both directions', () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));

    expect(result.current.index).toBe(0);

    act(() => result.current.previous());
    expect(result.current.index).toBe(2);

    act(() => result.current.next());
    expect(result.current.index).toBe(0);

    act(() => result.current.goTo(5));
    expect(result.current.index).toBe(2);
  });

  it('advances automatically while active', () => {
    const { result } = renderHook(() => useCarousel({ length: 3, autoPlayMs: 1000 }));

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.index).toBe(1);

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.index).toBe(0);
  });

  it('stops autoplay when paused or inactive', () => {
    const { result, rerender } = renderHook(
      ({ active }) => useCarousel({ length: 3, autoPlayMs: 1000, active }),
      { initialProps: { active: true } },
    );

    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.index).toBe(0);

    act(() => result.current.resume());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.index).toBe(1);

    rerender({ active: false });
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.index).toBe(1);
  });

  it('changes slide on a swipe that passes the threshold', () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));

    act(() => {
      result.current.swipeHandlers.onPointerDown({ clientX: 300 });
      result.current.swipeHandlers.onPointerUp({ clientX: 100 });
    });
    expect(result.current.index).toBe(1);

    act(() => {
      result.current.swipeHandlers.onPointerDown({ clientX: 100 });
      result.current.swipeHandlers.onPointerUp({ clientX: 120 });
    });
    expect(result.current.index).toBe(1);
  });
});
