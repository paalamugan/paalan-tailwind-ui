import { useEffect, useRef, useState } from 'react';

import { clamp } from '@/utils';

export interface UseMovePosition {
  x: number;
  y: number;
}

export const clampUseMovePosition = (position: UseMovePosition) => ({
  x: clamp(position.x, 0, 1),
  y: clamp(position.y, 0, 1),
});

interface useMoveHandlers {
  /**
   * Callback function that is called when the scrubbing starts.
   */
  onScrubStart?(): void;
  /**
   * Callback function that is called when the scrubbing ends.
   */
  onScrubEnd?(): void;
}

/**
 * Hook that enables moving an HTML element using mouse or touch events.
 * @template T The type of the HTML element. Defaults to HTMLDivElement.
 * @param {function} onChange A callback function that is called when the position of the element changes.
 * @param {object} [handlers] Optional event handlers for scrubbing start and end.
 * @param {'ltr' | 'rtl'} [dir='ltr'] Optional direction of the element. Defaults to 'ltr'.
 * @returns {object} An object containing the ref of the HTML element and a boolean indicating if the element is currently being moved.
 */
export const useMove = <T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void,
  handlers?: useMoveHandlers,
  dir: 'ltr' | 'rtl' = 'ltr',
) => {
  const ref = useRef<T>(null);
  const mounted = useRef<boolean>(false);
  const isSliding = useRef(false);
  const frame = useRef(0);
  const [active, setActive] = useState(false);
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const onScrub = ({ x, y }: UseMovePosition) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current) {
          ref.current.style.userSelect = 'none';
          const rect = ref.current.getBoundingClientRect();

          if (rect.width && rect.height) {
            const _x = clamp((x - rect.left) / rect.width, 0, 1);
            onChange({
              x: dir === 'ltr' ? _x : 1 - _x,
              y: clamp((y - rect.top) / rect.height, 0, 1),
            });
          }
        }
      });
    };

    const bindEvents = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopScrubbing);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopScrubbing);
    };

    const unbindEvents = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopScrubbing);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopScrubbing);
    };

    const handlers = handlersRef.current;
    const startScrubbing = () => {
      if (!isSliding.current && mounted.current) {
        isSliding.current = true;
        if (typeof handlers?.onScrubStart === 'function') {
          handlers.onScrubStart();
        }
        setActive(true);
        bindEvents();
      }
    };

    const stopScrubbing = () => {
      if (isSliding.current && mounted.current) {
        isSliding.current = false;
        setActive(false);
        unbindEvents();
        setTimeout(() => {
          if (typeof handlers?.onScrubEnd === 'function') {
            handlers.onScrubEnd();
          }
        }, 0);
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing();
      event.preventDefault();
      onMouseMove(event);
    };

    const onMouseMove = (event: MouseEvent) => onScrub({ x: event.clientX, y: event.clientY });

    const onTouchStart = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }

      startScrubbing();
      onTouchMove(event);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }

      onScrub({ x: event.changedTouches[0]?.clientX || 0, y: event.changedTouches[0]?.clientY || 0 });
    };

    const element = ref.current;
    element?.addEventListener('mousedown', onMouseDown);
    element?.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchstart', onTouchStart);
      }
    };
  }, [dir, onChange]);

  return { ref, active };
};
