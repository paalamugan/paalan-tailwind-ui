import { useEffect, useRef } from 'react';

import type { HotkeyItemOptions } from './parse-hotkey';

import { getHotkeyHandler, getHotkeyMatcher } from './parse-hotkey';

export { getHotkeyHandler };
export type { HotkeyItemOptions };

export type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

function shouldFireEvent(event: KeyboardEvent, tagsToIgnore: string[], triggerOnContentEditable = false) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }

  return true;
}

export const useHotkeys = (
  hotkeys: HotkeyItem[],
  tagsToIgnores: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
  triggerOnContentEditable = false,
) => {
  const hotKeysRef = useRef<HotkeyItem[]>([]);
  const tagsToIgnoresRef = useRef<string[]>([]);

  useEffect(() => {
    hotKeysRef.current = hotkeys;
  }, [hotkeys]);

  useEffect(() => {
    tagsToIgnoresRef.current = tagsToIgnores;
  }, [tagsToIgnores]);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotKeysRef.current.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
        if (
          getHotkeyMatcher(hotkey)(event) &&
          shouldFireEvent(event, tagsToIgnoresRef.current, triggerOnContentEditable)
        ) {
          if (options.preventDefault) {
            event.preventDefault();
          }

          handler(event);
        }
      });
    };

    document.documentElement.addEventListener('keydown', keydownListener);
    return () => document.documentElement.removeEventListener('keydown', keydownListener);
  }, [triggerOnContentEditable]);
};
