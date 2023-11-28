/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef } from 'react';

/**
 * Attaches an event listener to the window object.
 * @param type - The event type to listen for.
 * @param listener - The function to be called when the event is triggered.
 * @param options - An optional object that specifies characteristics about the event listener.
 * @returns void
 */
export const useWindowEvent = <K extends keyof WindowEventMap | (string & {})>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  const listenerRef = useRef(listener);
  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    const listener = (e: Event) => listenerRef.current.bind(window)(e as never);
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [options, type]);
};
