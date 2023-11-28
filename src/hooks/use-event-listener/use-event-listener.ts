import { useEffect, useRef } from 'react';

import { useCallbackRef } from '../use-callback-ref';

type Target = EventTarget | null | (() => EventTarget | null) | HTMLElement;

/**
 * Attaches an event listener to a DOM element or window.
 * @template K - The type of event to listen for.
 * @template T - The type of the target element.
 * @param {K} eventType - The type of event to listen for.
 * @param {(ev: HTMLElementEventMap[K]) => void} callback - The function to call when the event is triggered.
 * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics about the event listener.
 * @param {Target} [target] - The target element to attach the event listener to. Defaults to window.
 * @returns {React.RefObject<T>} - A mutable ref object that can be attached to a React component.
 */
export const useEventListener = <K extends keyof HTMLElementEventMap, T extends HTMLElement | null = HTMLElement>(
  eventType: K,
  callback: (ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
  target?: Target,
): React.RefObject<T> => {
  const callbackProp = useCallbackRef(callback);
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current ?? target;
    const domNode = typeof node === 'function' ? node() : node ?? window;
    if (!domNode) return;

    const listener: EventListenerOrEventListenerObject = (event) => {
      callbackProp(event as HTMLElementEventMap[K]);
    };

    domNode.addEventListener(eventType, listener, options);
    return () => domNode.removeEventListener(eventType, listener, options);
  }, [eventType, target, options, callbackProp]);

  return ref;
};
