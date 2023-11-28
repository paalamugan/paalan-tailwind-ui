import { renderHook, waitFor } from '@testing-library/react';

import { useFocusReturn } from './use-focus-return';

jest.useFakeTimers();

describe('useFocusReturn', () => {
  let focusSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let clearTimeoutSpy: jest.SpyInstance;
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    setTimeoutSpy = jest.spyOn(window, 'setTimeout');
  });

  afterEach(() => {
    focusSpy.mockRestore();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
    setTimeoutSpy.mockRestore();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useFocusReturn({ opened: true }));
    expect(typeof result.current).toBe('function');
  });

  it('should focus on last active element when opened is false', async () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    const { rerender } = renderHook(({ opened }) => useFocusReturn({ opened }), {
      initialProps: { opened: false },
    });

    rerender({ opened: true });

    expect(focusSpy).not.toHaveBeenCalled();

    rerender({ opened: false });

    await waitFor(() => expect(focusSpy).toHaveBeenCalledTimes(1));
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('should not focus on last active element when shouldReturnFocus is false', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    const { result, rerender } = renderHook(
      ({ opened, shouldReturnFocus }) => useFocusReturn({ opened, shouldReturnFocus }),
      { initialProps: { opened: false, shouldReturnFocus: false } },
    );

    expect(focusSpy).not.toHaveBeenCalled();

    rerender({ opened: false, shouldReturnFocus: false });

    expect(focusSpy).not.toHaveBeenCalled();
    expect(result.current).toBeDefined();
  });

  it('should set lastActiveElement when opened is true', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    const { result, rerender } = renderHook(({ opened }) => useFocusReturn({ opened }), {
      initialProps: { opened: false },
    });

    rerender({ opened: true });

    expect(result.current).toBeDefined();
  });

  it('should set timeout when opened is false and shouldReturnFocus is true', () => {
    const { rerender } = renderHook(({ opened, shouldReturnFocus }) => useFocusReturn({ opened, shouldReturnFocus }), {
      initialProps: { opened: false, shouldReturnFocus: true },
    });

    expect(setTimeoutSpy).not.toHaveBeenCalled();

    rerender({ opened: true, shouldReturnFocus: true });

    expect(setTimeoutSpy).not.toHaveBeenCalled();

    rerender({ opened: false, shouldReturnFocus: true });

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 10);
  });
});
