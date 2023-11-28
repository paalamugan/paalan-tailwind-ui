import { useEffect, useRef, useState } from 'react';

/**
 * Hook that tracks the mouse position over a given element or the entire document.
 * @template T The type of the element to track the mouse position over.
 * @param {Object} options - The options object.
 * @param {boolean} [options.resetOnExit=false] - Whether to reset the mouse position to (0, 0) when the mouse leaves the tracked element.
 * @returns {ref: React.RefObject<T>; x: number; y: number} An object containing a ref to the tracked element and the current mouse position.
 */
export const useMouse = <T extends HTMLElement = HTMLDivElement>(
  options: { resetOnExit?: boolean } = { resetOnExit: false },
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref = useRef<T>(null);

  const setMousePosition = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;
    const currentTarget = event.currentTarget as HTMLElement;

    if (ref.current && currentTarget) {
      const rect = currentTarget.getBoundingClientRect();

      const x = Math.max(0, Math.round(event.pageX - rect.left - (window.pageXOffset || window.scrollX)));

      const y = Math.max(0, Math.round(event.pageY - rect.top - (window.pageYOffset || window.scrollY)));

      setPosition({ x, y });
    } else {
      setPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const resetMousePosition = () => setPosition({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref?.current ? ref.current : document;
    element.addEventListener('mousemove', setMousePosition);
    if (options.resetOnExit) element.addEventListener('mouseleave', resetMousePosition);

    return () => {
      element.removeEventListener('mousemove', setMousePosition);
      if (options.resetOnExit) element.removeEventListener('mouseleave', resetMousePosition);
    };
  }, [options.resetOnExit]);

  return { ref, ...position };
};
