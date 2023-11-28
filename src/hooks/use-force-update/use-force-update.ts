import { useReducer } from 'react';

const reducer = (value: number) => (value + 1) % 1000000;

/**
 * Returns a function that can be used to force an update on a React component.
 * @returns {VoidFunction} The update function.
 */
export const useForceUpdate = (): VoidFunction => {
  const [, update] = useReducer(reducer, 0);
  return update;
};
