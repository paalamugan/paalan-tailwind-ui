/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

export const useCallbackRef = <T extends (...args: never[]) => unknown>(
  callback: T | undefined,
  deps: React.DependencyList = [],
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps);
};
