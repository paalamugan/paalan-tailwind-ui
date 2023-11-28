/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { assignRef } from '@/utils';

export type ReactRef<T> =
  | React.RefCallback<T>
  | React.MutableRefObject<T>
  | React.Dispatch<React.SetStateAction<T>>
  | React.ForwardedRef<T>
  | null
  | undefined;

/**
 * Merges multiple React refs into a single ref function.
 * @template T - The type of the ref object.
 * @param {...ReactRef<T>[]} refs - The refs to be merged.
 * @returns {(node: T | null) => void} - The merged ref function.
 */
export const mergeRefs = <T>(...refs: ReactRef<T>[]): ((node: T | null) => void) => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (node) {
        assignRef(ref, node);
      }
    });
  };
};

/**
 * Returns a merged ref callback function that can be used to merge multiple refs into a single ref.
 * @template T The type of the ref object.
 * @param {...ReactRef<T>[]} refs The refs to be merged.
 * @returns {React.RefCallback<T>} The merged ref callback function.
 */
export const useMergedRef = <T>(...refs: ReactRef<T>[]): React.RefCallback<T> => {
  return useCallback(mergeRefs(...refs), refs);
};
