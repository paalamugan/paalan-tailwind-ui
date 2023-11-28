import { useLatestRef } from '../use-latest-ref';

/**
 * Returns the latest value of the input parameter.
 * @template T - The type of the input parameter.
 * @param {T} value - The input parameter whose latest value is to be returned.
 * @returns {T} - The latest value of the input parameter.
 */
export const useLatestValue = <T>(value: T): T => {
  const ref = useLatestRef(value);
  return ref.current;
};
