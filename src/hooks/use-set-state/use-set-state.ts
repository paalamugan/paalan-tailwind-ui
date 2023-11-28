import { useCallback, useState } from 'react';

/**
 * A hook that returns a stateful value and a function to update it.
 * @template T - The type of the state object.
 * @param initialState - The initial state object.
 * @returns A tuple containing the current state object and a function to update it.
 */
export const useSetState = <T extends Record<string, unknown>>(initialState: T) => {
  const [localState, localSetState] = useState(initialState);
  const setState = useCallback(
    (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) =>
      localSetState((current) => ({
        ...current,
        ...(typeof statePartial === 'function' ? statePartial(current) : statePartial),
      })),
    [],
  );
  return [localState, setState] as const;
};
