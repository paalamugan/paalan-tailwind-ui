import { useEffect, useRef } from 'react';

import { useCallbackRef } from '../use-callback-ref';
import { useLatestValue } from '../use-latest-value/use-latest-value';

const DEFAULT_EVENTS = ['mousedown', 'mouseup', 'touchstart', 'touchend'];

/**
 * Attaches a click outside event listener to a given element or list of elements.
 * @template T - The type of the element to attach the listener to.
 * @param {() => void} handler - The function to be called when a click outside event occurs.
 * @param {string[] | null} [events] - The list of events to listen for. Defaults to ['mousedown', 'mouseup', 'touchstart', 'touchend'].
 * @param {(HTMLElement | null)[]} [nodes] - The list of elements to ignore clicks outside of. If not provided, the listener will be attached to the element passed as a ref.
 * @returns {React.RefObject<T>} - A ref object that should be passed to the element to attach the listener to.
 */
export const useClickOutside = <T extends HTMLElement>(
  handler: () => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[],
): React.RefObject<T> => {
  const ref = useRef<T>(null);
  const eventsRef = useRef(events?.length ? events : DEFAULT_EVENTS);
  const handlerCallback = useCallbackRef(handler);
  const nodeValues = useLatestValue(nodes);

  useEffect(() => {
    eventsRef.current = events?.length ? events : DEFAULT_EVENTS;
  }, [events]);

  useEffect(() => {
    const listener: EventListenerOrEventListenerObject = (event) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (Array.isArray(nodeValues)) {
        const shouldIgnore =
          target?.hasAttribute('data-ignore-outside-clicks') ||
          (!document.body.contains(target) && target.tagName !== 'HTML');
        const shouldTrigger = nodeValues.every((node) => !!node && !event.composedPath().includes(node));
        if (shouldTrigger && !shouldIgnore) {
          handlerCallback();
        }
      } else if (ref.current && !ref.current.contains(target)) {
        handlerCallback();
      }
    };

    eventsRef.current.forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      eventsRef.current.forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handlerCallback, nodeValues]);

  return ref;
};
