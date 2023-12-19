import { renderHook } from '@testing-library/react';

import { useUpdateEffect } from './use-update-effect';

describe('Hooks/use-update-effect', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls `fn` on `dependencies` change', () => {
    const fn = jest.fn();
    let dependency = '';
    const { rerender } = renderHook(() => useUpdateEffect(fn, [dependency]));
    expect(fn).not.toHaveBeenCalled();
    //change dependency and rerender
    dependency = 'foo';
    rerender();
    expect(fn).toHaveBeenCalled();
  });
});
