import { useFetcher } from '../use-fetcher/use-fetcher';

/**
 * This TypeScript function returns a modified version of the useFetcher hook that takes in a fetcher
 * function and a parameter object, and returns the result without the fetcher function.
 * @param {TFetcher} fetcher - `fetcher` is a function that takes in an argument of type `TParam` and
 * returns a Promise that resolves to an unknown value. The type of `TParam` is a union of
 * `Parameters<TFetcher>[0]`, which represents the first parameter type of the `TFetcher
 * @param {TParam} parameter - The `parameter` parameter is a generic type that extends
 * `Parameters<TFetcher>[0]`, which means it can accept any argument that the `fetcher` function
 * expects as its first parameter. It also extends `Record<string, unknown>`, which means it can accept
 * any additional properties as key-value
 * @returns The `useQueryFetcher` function returns an object that is the same as the `result` object
 * returned by the `useFetcher` hook, but with the `fetcher` property omitted. The `useFetcher` hook is
 * passed two arguments: a fetcher function and a parameter object. The `useQueryFetcher` function
 * takes these same two arguments and passes them to `useFetcher`, then
 */
export const useQueryFetcher = <
  TFetcher extends (firstArg: Parameters<TFetcher>[0]) => ReturnType<TFetcher>,
  TParam extends Parameters<TFetcher>[0],
>(
  fetcher: TFetcher,
  ...[parameter]: TParam extends undefined ? [] : [Parameters<TFetcher>[0] & { skip?: boolean }]
) => {
  const result = useFetcher(fetcher, { ...parameter });
  return result as Omit<typeof result, 'fetcher'>;
};
