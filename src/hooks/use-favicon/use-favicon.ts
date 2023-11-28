import { useRef } from 'react';

import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect';

const MIME_TYPES = {
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
};

/**
 * A hook that sets the favicon of the page to the specified URL.
 * @param url - The URL of the favicon.
 */
export const useFavicon = (url: string) => {
  const link = useRef<HTMLLinkElement>();

  useIsomorphicEffect(() => {
    if (!url) {
      return;
    }

    if (!link.current) {
      const existingElements = document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
      existingElements.forEach((element) => document.head.removeChild(element));

      const element = document.createElement('link');
      element.rel = 'shortcut icon';
      link.current = element;
      document.querySelector('head')?.appendChild(element);
    }

    const splittedUrl = url.split('.');
    const type = splittedUrl[splittedUrl.length - 1].toLowerCase() as keyof typeof MIME_TYPES;
    link.current.setAttribute('type', MIME_TYPES[type]);
    link.current.setAttribute('href', url);
  }, [url]);
};
