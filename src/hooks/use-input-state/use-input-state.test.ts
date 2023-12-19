import { act, renderHook } from '@testing-library/react';

import { useInputState } from './use-input-state';

const changeEventText = {
  currentTarget: { type: 'text', value: 'test-text-value' },
  nativeEvent: {},
};

describe('Hooks/use-input-state', () => {
  it('sets correct initial state', () => {
    const hook = renderHook(() => useInputState('test-value'));
    const [value] = hook.result.current;
    expect(value).toBe('test-value');
  });

  it('sets value with change event on text input', () => {
    const hook = renderHook(() => useInputState(''));
    act(() => {
      if (typeof hook.result.current[1] !== 'function') return;
      hook.result.current[1]('test-text-value');
    });
    const [value] = hook.result.current;
    expect(value).toBe(changeEventText.currentTarget.value);
  });

  it('sets value with change event on boolean input', () => {
    const hook = renderHook(() => useInputState(false));
    act(() => {
      if (typeof hook.result.current[1] !== 'function') return;
      hook.result.current[1](true);
    });
    const [value] = hook.result.current;
    expect(value).toBe(true);
  });

  it('sets value when onChange is called with actual value', () => {
    const boolean = renderHook(() => useInputState(false));
    const string = renderHook(() => useInputState(''));

    act(() => {
      if (typeof boolean.result.current[1] !== 'function') return;
      if (typeof string.result.current[1] !== 'function') return;
      boolean.result.current[1](true);
      string.result.current[1]('test');
    });

    expect(boolean.result.current[0]).toBe(true);
    expect(string.result.current[0]).toBe('test');
  });

  it('sets value with a callback function', () => {
    const hook = renderHook(() => useInputState(10));
    act(() => {
      if (typeof hook.result.current[1] !== 'function') return;
      hook.result.current[1]((current) => current + 11);
    });
    const [value] = hook.result.current;
    expect(value).toBe(21);
  });
});
