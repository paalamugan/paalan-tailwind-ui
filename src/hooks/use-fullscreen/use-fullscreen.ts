import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
    msExitFullscreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    mozCancelFullScreen(): Promise<void>;
  }

  interface HTMLElement {
    msRequestFullscreen(): Promise<void>;
    webkitEnterFullscreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    mozRequestFullscreen(): Promise<void>;
  }
}

function getFullscreenElement(): Element | null {
  const _document = window.document;

  const fullscreenElement =
    _document.fullscreenElement ||
    _document.webkitFullscreenElement ||
    _document.mozFullScreenElement ||
    _document.msFullscreenElement;

  return fullscreenElement;
}

async function exitFullscreen() {
  const _document = window.document;

  if (typeof _document.exitFullscreen === 'function') return _document.exitFullscreen();
  if (typeof _document.msExitFullscreen === 'function') return _document.msExitFullscreen();
  if (typeof _document.webkitExitFullscreen === 'function') return _document.webkitExitFullscreen();
  if (typeof _document.mozCancelFullScreen === 'function') return _document.mozCancelFullScreen();

  return null;
}

async function enterFullScreen(element: HTMLElement | undefined) {
  if (!element) return;
  const _element = element;

  return (
    _element.requestFullscreen?.() ||
    _element.msRequestFullscreen?.() ||
    _element.webkitEnterFullscreen?.() ||
    _element.webkitRequestFullscreen?.() ||
    _element.mozRequestFullscreen?.()
  );
}

const prefixes = ['', 'webkit', 'moz', 'ms'];

function addEvents(
  element: HTMLElement,
  { onFullScreen, onError }: { onFullScreen: (event: Event) => void; onError: (event: Event) => void },
) {
  prefixes.forEach((prefix) => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  });

  return () => {
    prefixes.forEach((prefix) => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${prefix}fullscreenerror`, onError);
    });
  };
}

export const useFullscreen = <T extends HTMLElement = HTMLElement>() => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const _ref = useRef<T>();

  const handleFullscreenChange = useCallback(
    (event: Event) => {
      setFullscreen(event.target === getFullscreenElement());
    },
    [setFullscreen],
  );

  const handleFullscreenError = useCallback(
    (event: Event) => {
      setFullscreen(false);
      console.error(`[hooks] use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`);
    },
    [setFullscreen],
  );

  const toggle = useCallback(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(_ref.current);
    } else {
      await exitFullscreen();
    }
  }, []);

  const ref = useCallback((element: T | null) => {
    if (element === null) {
      _ref.current = window.document.documentElement as T;
    } else {
      _ref.current = element;
    }
  }, []);

  useEffect(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement as T;
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });
    }

    if (_ref.current) {
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });
    }

    return undefined;
  }, [handleFullscreenChange, handleFullscreenError]);

  return { ref, toggle, fullscreen } as const;
};
