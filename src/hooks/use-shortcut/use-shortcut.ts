import { useEffect, useRef, useState } from 'react';

/**
 * Checks if the key pressed is a printable character
 * and can be used for shortcut navigation
 */
const isPrintableCharacter = (event: React.KeyboardEvent) => {
  const { key } = event;
  return key.length === 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key));
};

export interface UseShortcutParams {
  timeout?: number;
  preventDefault?: (event: React.KeyboardEvent) => boolean;
}

/**
 * A hook that listens for keyboard shortcuts and returns a callback function to be used in onKeyDown event.
 * @param params - Optional params to configure the hook behavior.
 * @param params.timeout - The delay in milliseconds after which the keys are cleared. Defaults to 300.
 * @param params.preventDefault - A function that returns a boolean indicating whether to prevent the default behavior of the event.
 * @returns A callback function to be used in onKeyDown event.
 */
export const useShortcut = (params: UseShortcutParams = {}) => {
  const { timeout = 300, preventDefault = () => true } = params;

  const [keys, setKeys] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  const clearKeysAfterDelay = () => {
    flush();
    timeoutRef.current = setTimeout(() => {
      setKeys([]);
      timeoutRef.current = undefined;
    }, timeout);
  };

  useEffect(() => flush, []);

  type Callback = (keysSoFar: string) => void;

  function onKeyDown(fn: Callback) {
    return (event: React.KeyboardEvent) => {
      if (event.key === 'Backspace') {
        const keysCopy = [...keys];
        keysCopy.pop();
        setKeys(keysCopy);
        return;
      }

      if (isPrintableCharacter(event)) {
        const keysCopy = keys.concat(event.key);

        if (preventDefault(event)) {
          event.preventDefault();
          event.stopPropagation();
        }

        setKeys(keysCopy);
        fn(keysCopy.join(''));

        clearKeysAfterDelay();
      }
    };
  }

  return onKeyDown;
};
