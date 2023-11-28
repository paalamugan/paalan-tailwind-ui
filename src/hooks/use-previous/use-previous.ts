import { useEffect, useRef } from 'react';

/**
 * Returns the previous value of the given value.
 * @template T The type of the value.
 * @param {T} value The current value.
 * @returns {T | undefined} The previous value of the given value.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
