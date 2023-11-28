import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A hook debounces value changes. This can be useful in case you want to perform a heavy operation based on react state, for example, send search request. Unlike `useDebouncedValue` it is designed to work with uncontrolled components.
 * @template T The type of the state value.
 * @param defaultValue The initial value of the state.
 * @param wait The number of milliseconds to wait before updating the state.
 * @param options An optional object with a `leading` property that determines whether to update the state immediately when the function is called.
 * @returns A tuple containing the current state value and a function to update it.
 */
export const useDebouncedState = <T,>(defaultValue: T, wait: number, options = { leading: false }) => {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current!);
  useEffect(() => clearTimeout, []);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      clearTimeout();
      if (leadingRef.current && options.leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, wait);
      }
      leadingRef.current = false;
    },
    [options.leading, wait],
  );

  return [value, debouncedSetValue] as const;
};
