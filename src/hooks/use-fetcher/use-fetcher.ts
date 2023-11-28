import { useCallback, useEffect, useRef, useState } from 'react';

import { isEqual } from 'lodash-es';

/**
 * This is a TypeScript function that sets up a fetcher to fetch data and provides a refetch function,
 * data, loading, error, and initialized states.
 * @param {TFetcher} fetcher - `fetcher` is a function that takes in a parameter of type `TParam` and
 * returns a Promise that resolves to some data. The type of the data returned by the Promise is
 * inferred from the return type of the `fetcher` function.
 * @param {TParam} [parameter] - `parameter` is an optional object parameter that can be passed to the
 * `useFetcher` hook. It should be an object that matches the type of the argument expected by the
 * `fetcher` function. It can also have an additional `skip` property which, if set to `true`, will
 * @returns The `useFetcher` hook returns an object with the following properties:
 * - `fetcher`: A function that can be used to fetch the data
 * - `refetch`: A function that can be used to refetch the data
 * - `data`: The data that was fetched
 * - `loading`: A boolean that indicates whether the data is currently being fetched
 * - `error`: An error object that contains information about any errors that occurred while fetching the data
 * - `initialized`: A boolean that indicates whether the hook has been initialized
 */
export const useFetcher = <
  TFetcher extends (firstArg: Parameters<TFetcher>[0]) => ReturnType<TFetcher>,
  TParam,
  TResult = Awaited<ReturnType<TFetcher>>,
>(
  fetcher: TFetcher,
  ...[parameter]: TParam extends undefined ? [] : [Parameters<TFetcher>[0] & { skip?: boolean }]
) => {
  const lazyFetcherRef = useRef(fetcher);
  // Determine if the fetcher should be skipped.
  // The fetcher should be skipped if the fetcher is not fully initialized by the parameter.
  const internalSkip = parameter?.skip ?? false;

  // Set up states for data, loading, error, and initialized.
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState<boolean>(!internalSkip);
  const [error, setError] = useState<Error | null>(null);
  const parameterRef = useRef<Parameters<TFetcher>[0]>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const mountedRef = useRef(false);
  const [isParamChanged, setIsParamChanged] = useState<boolean>(false);

  // Set up a ref to the fetcher for future use.
  useEffect(() => {
    lazyFetcherRef.current = fetcher;
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, [fetcher]);

  useEffect(() => {
    const paramEquality = isEqual(parameter, parameterRef.current);
    if (paramEquality) return;
    setIsParamChanged(true);
    parameterRef.current = parameter;
  }, [parameter]);

  // Set up a fetcher function that will be used to fetch data.
  const fetchData = useCallback(
    async <TParamFetch>(...[param]: TParamFetch extends undefined ? [] : [Parameters<TFetcher>[0]]) => {
      setLoading(true);
      setError(null);
      try {
        const newData = (await lazyFetcherRef.current(Object.keys(param ?? {}).length ? param : undefined)) as TResult;
        if (mountedRef.current) {
          setData(newData);
        }
        return newData;
      } catch (err) {
        if (mountedRef.current) {
          setData(null);
          setError(err as Error);
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setInitialized(true);
          setIsParamChanged(false);
        }
      }
    },
    [],
  );

  // Fetch data immediately when the hook is first mounted.
  useEffect(() => {
    if (!isParamChanged || internalSkip) return;
    fetchData(parameterRef.current).catch(console.error);
  }, [fetchData, isParamChanged, internalSkip]);

  const refetch = useCallback(
    async <TParamFetch extends Parameters<TFetcher>[0]>(
      ...[param]: TParamFetch extends undefined ? [] : [Parameters<TFetcher>[0]]
    ) => {
      return await fetchData(param);
    },
    [fetchData],
  );

  return {
    data,
    error,
    fetcher: fetchData,
    initialized,
    loading,
    refetch,
  };
};
