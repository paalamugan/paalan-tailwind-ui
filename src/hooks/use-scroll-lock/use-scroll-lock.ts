import { useCallback, useEffect, useRef, useState } from 'react';

import { getLockStyles } from './utils/get-lock-styles';
import { injectStyles } from './utils/inject-style-tag';
import { insertStyleTag } from './utils/insert-style-tag';
import { makeStyleTag } from './utils/make-style-tag';

/**
 * Toggles the scroll lock on the body element of the page.
 * @param lock - A boolean value indicating whether to lock or unlock the scroll.
 * @param options - An object containing options to customize the scroll lock behavior.
 * @param options.disableBodyPadding - A boolean value indicating whether to disable the padding on the body element when the scroll is locked.
 * @returns A tuple containing the current scroll lock state and a function to update the scroll lock state.
 */
export const useScrollLock = (
  lock?: boolean,
  options = {
    disableBodyPadding: false,
  },
) => {
  const [scrollLocked, setScrollLocked] = useState(lock || false);
  const scrollTop = useRef(0);

  const { disableBodyPadding } = options;

  const stylesheet = useRef<HTMLStyleElement | null>(null);

  const lockScroll = useCallback(() => {
    scrollTop.current = window.scrollY;

    const styles = getLockStyles({ disableBodyPadding });

    /**
     * by applying styles via style tag
     * we don't care about previous styles due to inheritance
     * when scroll gets unlocked we delete that style tag
     */
    const sheet = makeStyleTag();
    injectStyles(sheet, styles);

    insertStyleTag(sheet);

    stylesheet.current = sheet;
  }, [disableBodyPadding]);

  const unlockScroll = () => {
    if (!stylesheet?.current) return;

    stylesheet.current.parentNode?.removeChild(stylesheet.current);
    stylesheet.current = null;
  };

  useEffect(() => {
    if (scrollLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return unlockScroll;
  }, [lockScroll, scrollLocked]);

  useEffect(() => {
    if (lock !== undefined) {
      setScrollLocked(lock);
    }
  }, [lock]);

  useEffect(() => {
    if (lock === undefined && typeof window !== 'undefined') {
      if (window.document.body.style.overflow === 'hidden') {
        setScrollLocked(true);
      }
    }
  }, [lock, setScrollLocked]);

  return [scrollLocked, setScrollLocked] as const;
};
