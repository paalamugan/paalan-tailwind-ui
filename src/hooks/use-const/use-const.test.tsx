import { renderHook } from '@testing-library/react';

import { useConst } from './use-const';

describe('useConst', () => {
  it('should return the same value on every render', () => {
    const { result, rerender } = renderHook(() => useConst('hello'));

    expect(result.current).toBe('hello');

    rerender();

    expect(result.current).toBe('hello');
  });

  it('should only call the initializer once', () => {
    const init = jest.fn(() => 'hello');
    const { result, rerender } = renderHook(() => useConst(init));

    expect(init).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('hello');

    rerender();

    expect(init).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('hello');
  });
});
