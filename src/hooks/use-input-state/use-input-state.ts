import { useState } from 'react';

import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Returns an input change handler function that can be used with React input elements.
 * The handler function updates the value of the input element based on the provided value.
 *
 * @template T - The type of the input value.
 * @param {Dispatch<SetStateAction<T>>} setValue - The state setter function.
 * @returns {(val: null | undefined | T | React.ChangeEvent<HTMLInputElement> | ((current: T) => T)) => void} - The input change handler function.
 */
export const getInputOnChange = <T>(setValue: Dispatch<SetStateAction<T>>) => {
  return (val: null | undefined | T | React.ChangeEvent<HTMLInputElement> | ((current: T) => T)) => {
    if (!val) {
      setValue(val as T);
    } else if (typeof val === 'function') {
      setValue(val);
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      const { currentTarget } = val;

      if (currentTarget.type === 'checkbox') {
        setValue(currentTarget.checked as T);
      } else {
        setValue(currentTarget.value as T);
      }
    } else {
      setValue(val);
    }
  };
};

/**
 * Custom hook for managing input state.
 *
 * @template T - The type of the initial state.
 * @param initialState - The initial state value.
 * @returns An array containing the current value and a function to update the value.
 */
export const useInputState = <T>(initialState: T) => {
  const [value, setValue] = useState(initialState);
  return [value, getInputOnChange<T>(setValue)] as const;
};
