import { useEffect, useRef, useState } from 'react';

const DEFAULT_EVENTS: (keyof DocumentEventMap)[] = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];
const DEFAULT_OPTIONS = {
  events: DEFAULT_EVENTS,
  initialState: true,
};

/**
 * Custom hook that tracks user idle state based on a specified timeout.
 *
 * @param timeout - The duration of inactivity (in milliseconds) after which the user is considered idle.
 * @param options - Optional configuration options for the hook.
 * @param options.events - An array of DOM events to listen for user activity. Defaults to all DOM events.
 * @param options.initialState - The initial idle state. Defaults to `true`.
 * @returns The current idle state of the user.
 */
export const useIdle = (
  timeout: number,
  options?: Partial<{ events: (keyof DocumentEventMap)[]; initialState: boolean }>,
) => {
  const { events, initialState } = { ...DEFAULT_OPTIONS, ...options };
  const [idle, setIdle] = useState<boolean>(initialState);
  const timer = useRef<number>();
  const eventsRef = useRef<(keyof DocumentEventMap)[]>([]);

  useEffect(() => {
    setIdle(initialState);
  }, [initialState]);

  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  useEffect(() => {
    const handleEvents = () => {
      setIdle(false);

      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        setIdle(true);
      }, timeout);
    };
    const currentEvents = eventsRef.current;
    currentEvents.forEach((event) => document.addEventListener(event, handleEvents));

    return () => {
      currentEvents.forEach((event) => document.removeEventListener(event, handleEvents));
    };
  }, [timeout]);

  return idle;
};
