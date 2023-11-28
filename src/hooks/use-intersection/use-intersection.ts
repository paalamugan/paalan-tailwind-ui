import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook that provides intersection information for a given element.
 * @template T - The type of the element being observed (defaults to HTMLElement).
 * @param options - Optional options to configure the IntersectionObserver.
 * @returns An object containing the ref, entry, and isIntersecting properties.
 */
export const useIntersection = <T extends HTMLElement = HTMLElement>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1],
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const ref = useCallback((element: T | null) => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = undefined;
    }

    if (element === null) {
      setEntry(null);
      return;
    }

    observer.current = new IntersectionObserver(([_entry]) => {
      setEntry(_entry);
    }, optionsRef.current);

    observer.current.observe(element);
  }, []);

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false };
};
