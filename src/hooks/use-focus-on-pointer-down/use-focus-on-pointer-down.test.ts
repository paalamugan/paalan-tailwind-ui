import { renderHook } from '@testing-library/react';

import { useFocusOnPointerDown } from './use-focus-on-pointer-down';

jest.mock('./helper', () => ({
  ...jest.requireActual('./helper'),
  isSafari: jest.fn().mockReturnValue(true),
}));

describe('useFocusOnPointerDown', () => {
  it('should not focus on the element when the hook is disabled', () => {
    const ref = { current: document.createElement('div') };
    renderHook(() => useFocusOnPointerDown({ ref, enabled: false }));

    const event = new Event('pointerdown', { bubbles: true });
    ref.current.dispatchEvent(event);

    expect(document.activeElement).not.toEqual(ref.current);
  });

  it('should not focus on the element when the pointer down event is triggered on an excluded element', () => {
    const ref = { current: document.createElement('div') };
    const excludedElement = document.createElement('button');
    renderHook(() => useFocusOnPointerDown({ ref, enabled: true, elements: [excludedElement] }));

    const event = new Event('pointerdown', { bubbles: true });
    excludedElement.dispatchEvent(event);

    expect(document.activeElement).not.toEqual(ref.current);
  });
});
