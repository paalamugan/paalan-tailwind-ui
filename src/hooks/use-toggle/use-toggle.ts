import { useReducer } from 'react';

/**
 * A hook that toggles between two values.
 * @template T The type of the toggle values.
 * @param {readonly T[]} [options=[false, true] as T[]] An array of toggle values.
 * @returns {[T, (value?: React.SetStateAction<T>) => void]} A tuple containing the current toggle value and a function to toggle the value.
 */
export const useToggle = <T = boolean>(options: readonly T[] = [false, true] as T[]) => {
  const [[option], toggle] = useReducer((state: T[], action: React.SetStateAction<T>) => {
    const value = action instanceof Function ? action(state[0]) : action;
    const index = Math.abs(state.indexOf(value));

    return state.slice(index).concat(state.slice(0, index));
  }, options as T[]);

  return [option, toggle as (value?: React.SetStateAction<T>) => void] as const;
};
