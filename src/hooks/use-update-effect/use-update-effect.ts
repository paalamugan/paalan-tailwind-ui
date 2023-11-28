/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

/**
 * Calls the provided callback function on every update except the first render.
 * @param callback The function to call on every update except the first render.
 * @param deps The dependencies to watch for changes. If any of the dependencies change, the callback will be called.
 */
export const useUpdateEffect = (callback: React.EffectCallback, deps: React.DependencyList) => {
  const renderCycleRef = useRef(false);
  const effectCycleRef = useRef(false);

  useEffect(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);

  useEffect(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
};
