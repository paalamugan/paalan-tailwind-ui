import React from 'react';

import type { ToasterProps } from './types';

export const isValidReactNode = (value: unknown): value is React.ReactNode => {
  return typeof value === 'string' || React.isValidElement(value);
};

export const getDocumentDirection = (): ToasterProps['dir'] => {
  if (typeof window === 'undefined') return 'ltr';

  const dirAttribute = document.documentElement.getAttribute('dir');

  if (dirAttribute === 'auto' || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction as ToasterProps['dir'];
  }

  return dirAttribute as ToasterProps['dir'];
};
