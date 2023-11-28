import { useMemo } from 'react';

/**
 * Returns a memoized instance of URLSearchParams object that represents the query parameters of the current URL.
 * @returns {URLSearchParams} An instance of URLSearchParams object that represents the query parameters of the current URL.
 */
export const useSearchParams = (): URLSearchParams => {
  const { search } = typeof window !== 'undefined' ? window.location : { search: '' };

  return useMemo(() => new URLSearchParams(search), [search]);
};
