import { useRef } from 'react';

import { useUpdateEffect } from '../use-update-effect';

/**
 * Interface for the return value of the useFocusReturn hook.
 */
export interface UseFocusReturn {
  /**
   * A boolean indicating whether the component is currently open.
   */
  opened: boolean;
  /**
   * An optional boolean indicating whether focus should be returned to the previously focused element when the component is closed.
   */
  shouldReturnFocus?: boolean;
}

/**
 * A hook that returns focus to the last active element when a component is unmounted or closed. its used in Modal and Drawer
 * @param {Object} options - The options object.
 * @param {boolean} options.opened - A boolean indicating whether the component is currently open.
 * @param {boolean} [options.shouldReturnFocus=true] - A boolean indicating whether focus should be returned to the last active element.
 * @returns {VoidFunction} - A function that returns focus to the last active element.
 */
export const useFocusReturn = ({ opened, shouldReturnFocus = true }: UseFocusReturn): VoidFunction => {
  const lastActiveElement = useRef<HTMLElement>();
  const returnFocus = () => {
    if (
      lastActiveElement.current &&
      'focus' in lastActiveElement.current &&
      typeof lastActiveElement.current.focus === 'function'
    ) {
      lastActiveElement.current?.focus({ preventScroll: true });
    }
  };

  useUpdateEffect(() => {
    let timeout = -1;

    const clearFocusTimeout = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        window.clearTimeout(timeout);
      }
    };

    document.addEventListener('keydown', clearFocusTimeout);

    if (opened) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, 10);
    }

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', clearFocusTimeout);
    };
  }, [opened, shouldReturnFocus]);

  return returnFocus;
};
