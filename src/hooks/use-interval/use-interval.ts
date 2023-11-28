import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useCallbackRef } from '../use-callback-ref';

export interface UseIntervalOption {
  immediate?: boolean;
}
/**
 * A custom hook that sets up an interval to repeatedly call a function.
 * @param fn The function to be called at each interval.
 * @param interval The time, in milliseconds, between each interval.
 * @param options An optional object containing options for the interval.
 * @param options.immediate If true, the interval will start immediately upon mounting the component.
 * @returns An object containing functions to start, stop, and toggle the interval, as well as a boolean indicating whether the interval is currently active.
 */
export const useInterval = (fn: () => void, interval: number, options: UseIntervalOption = {}) => {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>();
  const callback = useCallbackRef(fn);

  const start = useCallback(() => {
    setActive((old) => {
      if (!old && !intervalRef.current && callback) {
        intervalRef.current = window.setInterval(callback, interval);
      }
      return true;
    });
  }, [callback, interval]);

  const stop = useCallback(() => {
    setActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  const toggle = useCallback(() => {
    if (active) {
      stop();
    } else {
      start();
    }
  }, [active, start, stop]);

  useEffect(() => {
    if (options.immediate) {
      start();
    } else {
      stop();
    }
    return stop;
  }, [options.immediate, start, stop]);

  return useMemo(() => ({ start, stop, toggle, active }), [start, stop, toggle, active]);
};
