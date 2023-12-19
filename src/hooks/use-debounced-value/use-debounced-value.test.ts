import { act, renderHook } from '@testing-library/react';

import { useDebouncedValue } from './use-debounced-value';

describe('Hooks/useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the default value', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 1000));
    expect(result.current[0]).toBe('hello');
  });

  it('should update the value after the wait time', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 1000));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current[0]).toBe('hello');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current[0]).toBe('hello');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe('hello');
  });

  it('should update the value immediately on the first call if leading is true', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 1000, { leading: true }));
    expect(result.current[0]).toBe('hello');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current[0]).toBe('hello');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current[0]).toBe('hello');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe('hello');
  });

  it('should cancel the debounced update', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 1000));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current[0]).toBe('hello');
    act(() => {
      result.current[1]();
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe('hello');
  });
});
