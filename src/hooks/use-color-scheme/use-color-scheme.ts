import type { UseMediaQueryOptions } from '../use-media-query/use-media-query';

import { useMediaQuery } from '../use-media-query/use-media-query';

export const useColorScheme = (initialValue?: 'dark' | 'light', options?: UseMediaQueryOptions) => {
  return useMediaQuery('(prefers-color-scheme: dark)', initialValue === 'dark', options) ? 'dark' : 'light';
};
