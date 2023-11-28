import { useCallback, useEffect, useRef } from 'react';

import { useCallbackRef } from '../use-callback-ref';

/**
 * A custom hook that provides a way to execute a callback function after a specified delay.
 * @template TCallback - The type of the callback function.
 * @param {TCallback} callback - The callback function to be executed.
 * @param {number} delay - The delay (in milliseconds) after which the callback function should be executed.
 * @param {{ autoInvoke: boolean }} [options={ autoInvoke: false }] - An optional object that specifies whether the callback function should be automatically invoked when the component mounts.
 * @returns {{ start: (...args: Parameters<TCallback>) => void, clear: () => void }} - An object containing two functions: `start`, which starts the timeout and `clear`, which clears the timeout.
 */
export const useTimeout = <TCallback extends (...args: never[]) => void>(
  fn: TCallback,
  delay: number,
  options: { autoInvoke: boolean } = { autoInvoke: false },
) => {
  const callback = useCallbackRef(fn);
  const timeoutRef = useRef<number | undefined>(undefined);

  const start = useCallback(
    (...callbackParams: Parameters<TCallback>) => {
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          callback(...callbackParams);
          timeoutRef.current = undefined;
        }, delay);
      }
    },
    [delay, callback],
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (options.autoInvoke) {
      (start as () => void)();
    }

    return clear;
  }, [clear, delay, options.autoInvoke, start]);

  return { start, clear };
};
