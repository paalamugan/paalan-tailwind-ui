import { useRef } from 'react';

/**
 * Returns a mutable ref object whose current value is always set to the latest value passed to it.
 * its persist any value between renders but keeps it up-to-date if it changes.
 * @template T The type of the value to be stored in the ref object.
 * @param {T} value The value to be stored in the ref object.
 * @returns {React.MutableRefObject<T>} A mutable ref object whose current value is always set to the latest value passed to it.
 */
export const useLatestRef = <T>(value: T): React.MutableRefObject<T> => {
  const ref = useRef<T | null>(null);
  ref.current = value;
  return ref as React.MutableRefObject<T>;
};
