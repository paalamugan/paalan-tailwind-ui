import type { UseMediaQueryOptions } from '../use-media-query/use-media-query';

import { useMediaQuery } from '../use-media-query/use-media-query';

/**
 * A hook that returns a boolean indicating if the user has requested reduced motion based on their system preferences.
 * @param initialValue - Optional initial value for the hook.
 * @param options - Optional options for the hook.
 * @returns A boolean indicating if the user has requested reduced motion.
 */
export const useReducedMotion = (initialValue?: boolean, options?: UseMediaQueryOptions) => {
  return useMediaQuery('(prefers-reduced-motion: reduce)', initialValue, options);
};
