import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseFocusWithinOptions {
  onFocus?(event: FocusEvent): void;
  onBlur?(event: FocusEvent): void;
}

function containsRelatedTarget(event: FocusEvent) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false;
}

export const useFocusWithin = <T extends HTMLElement = HTMLElement>({
  onBlur,
  onFocus,
}: UseFocusWithinOptions = {}) => {
  const ref = useRef<T>(null);
  const [focused, _setFocused] = useState(false);
  const focusedRef = useRef(false);
  const setFocused = (value: boolean) => {
    _setFocused(value);
    focusedRef.current = value;
  };

  const handleFocusIn = useCallback(
    (event: FocusEvent) => {
      if (!focusedRef.current) {
        setFocused(true);
        onFocus?.(event);
      }
    },
    [onFocus],
  );

  const handleFocusOut = useCallback(
    (event: FocusEvent) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        setFocused(false);
        onBlur?.(event);
      }
    },
    [onBlur],
  );

  useEffect(() => {
    if (ref.current) {
      const current = ref.current;
      current.addEventListener('focusin', handleFocusIn);
      current.addEventListener('focusout', handleFocusOut);

      return () => {
        current?.removeEventListener('focusin', handleFocusIn);
        current?.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, [handleFocusIn, handleFocusOut]);

  return { ref, focused };
};
