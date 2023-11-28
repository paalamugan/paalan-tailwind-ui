import { useCallback, useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement = HTMLDivElement>() => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      const current = ref.current;
      current.addEventListener('mouseenter', onMouseEnter);
      current.addEventListener('mouseleave', onMouseLeave);

      return () => {
        current?.removeEventListener('mouseenter', onMouseEnter);
        current?.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    return undefined;
  }, [onMouseEnter, onMouseLeave]);

  return { ref, hovered };
};
