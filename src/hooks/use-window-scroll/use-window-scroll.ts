import { useEffect, useState } from 'react';

import { useWindowEvent } from '../use-window-event/use-window-event';

interface ScrollPosition {
  x: number;
  y: number;
}

const getScrollPosition = (): ScrollPosition => {
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;
  return typeof window !== 'undefined' ? { x: scrollX, y: scrollY } : { x: 0, y: 0 };
};

const scrollTo = ({ x, y }: Partial<ScrollPosition>) => {
  if (typeof window !== 'undefined') {
    const scrollOptions: ScrollToOptions = { behavior: 'smooth' };

    if (typeof x === 'number') {
      scrollOptions.left = x;
    }

    if (typeof y === 'number') {
      scrollOptions.top = y;
    }

    window.scrollTo(scrollOptions);
  }
};

/**
 * Returns the current scroll position of the window and a function to scroll to a specific position.
 * @returns A tuple containing the current scroll position and a function to scroll to a specific position.
 */
export const useWindowScroll = () => {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useWindowEvent('scroll', () => setPosition(getScrollPosition()));
  useWindowEvent('resize', () => setPosition(getScrollPosition()));

  useEffect(() => {
    setPosition(getScrollPosition());
  }, []);

  return [position, scrollTo] as const;
};
