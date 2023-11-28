import { useEffect, useRef, useState } from 'react';

/**
 * A hook debounces value changes. This can be useful in case you want to perform a heavy operation based on react state, for example, send search request. Unlike `useDebouncedState` it is designed to work with controlled components.
 * @template T The type of the value.
 * @param defaultValue The default value of the debounced value.
 * @param wait The wait time in milliseconds before the value updates.
 * @param options The options for the debounced value.
 * @param options.leading If true, the value will update immediately on the first call.
 * @returns A tuple containing the debounced value and a cancel function to cancel the debounced update.
 */
export const useDebouncedValue = <T>(defaultValue: T, wait: number, options = { leading: false }) => {
  const [value, setValue] = useState(defaultValue);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number>();
  const coolDownRef = useRef(false);

  const cancel = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!coolDownRef.current && options.leading) {
        coolDownRef.current = true;
        setValue(defaultValue);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          coolDownRef.current = false;
          setValue(defaultValue);
        }, wait);
      }
    }
  }, [defaultValue, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [value, cancel] as const;
};
