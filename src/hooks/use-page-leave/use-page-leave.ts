import { useEffect } from 'react';

import { useCallbackRef } from '../use-callback-ref';

/**
 * Attaches a listener to the `mouseleave` event of the `document.documentElement` element.
 * @param onPageLeave - A function to be called when the `mouseleave` event is triggered.
 */
export const usePageLeave = (onPageLeave: () => void) => {
  const onPageLeaveRef = useCallbackRef(onPageLeave);
  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onPageLeaveRef);
    return () => document.documentElement.removeEventListener('mouseleave', onPageLeaveRef);
  }, [onPageLeaveRef]);
};
