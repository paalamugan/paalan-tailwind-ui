import type React from 'react';

import { isDefinedValue } from '../helper';

export const assignRef = <T>(
  ref: React.Dispatch<React.SetStateAction<T>> | React.ForwardedRef<T> | null | undefined,
  value: T,
) => {
  if (!isDefinedValue(ref)) return;

  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
    }
  }
};
