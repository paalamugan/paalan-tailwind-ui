/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import { shallowEqual } from '@/utils/shallow-equal';

const shallowCompare = (prevValue: React.DependencyList, currValue: React.DependencyList) => {
  if (!prevValue || !currValue) {
    return false;
  }

  if (prevValue === currValue) {
    return true;
  }

  if (prevValue.length !== currValue.length) {
    return false;
  }

  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }

  return true;
};

const useShallowCompare = (dependencies: React.DependencyList) => {
  const ref = useRef<React.DependencyList>([]);
  const updateRef = useRef<number>(0);

  if (!shallowCompare(ref.current, dependencies)) {
    ref.current = dependencies;
    updateRef.current += 1;
  }

  return [updateRef.current];
};

/**
 * Runs the provided callback function when the dependencies have changed shallowly.
 * @param cb - The callback function to run.
 * @param dependencies - The dependencies to compare shallowly.
 */
export const useShallowEffect = (cb: () => void, dependencies: React.DependencyList = []): void => {
  useEffect(cb, useShallowCompare(dependencies));
};
