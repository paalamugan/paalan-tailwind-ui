import { useFetcher } from '../use-fetcher/use-fetcher';

/**
 * This TypeScript function returns a modified version of the useFetcher hook that skips the initial
 * fetch and omits the refetch function.
 * @param {TFetcher} fetcher - The `fetcher` parameter is a function that takes an argument of a
 * specific type (defined by `Parameters<TFetcher>[0]`) and returns a Promise that resolves to an
 * unknown value. The type of the argument and the return value are determined by the type of the
 * `fetcher` function
 * @returns The `useLazyQueryFetcher` function returns an object that is the same as the object
 * returned by the `useFetcher` hook, except that the `refetch` function is omitted. This means that
 * the returned object can be used to execute a query lazily (i.e. only when needed), but it cannot be
 * used to manually trigger a refetch of the query.
 */
export const useLazyQueryFetcher = <TFetcher extends (arg: Parameters<TFetcher>[0]) => ReturnType<TFetcher>>(
  fetcher: TFetcher,
) => {
  const result = useFetcher(fetcher, { skip: true });
  return result as Omit<typeof result, 'refetch'>;
};
