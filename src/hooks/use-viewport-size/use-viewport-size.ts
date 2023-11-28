import { useCallback, useEffect, useState } from 'react';

import { useWindowEvent } from '../use-window-event/use-window-event';

const eventListerOptions = {
  passive: true,
};

/**
 * Returns an object containing the current viewport size.
 * @returns {{ width: number, height: number }} An object containing the current viewport size.
 */
export const useViewportSize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const setSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
  }, []);

  useWindowEvent('resize', setSize, eventListerOptions);
  useWindowEvent('orientationchange', setSize, eventListerOptions);
  useEffect(setSize, [setSize]);

  return windowSize;
};
