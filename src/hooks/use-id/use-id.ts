import { useCallback, useMemo, useState } from 'react';

import { randomId } from '@/utils';

import { useIsomorphicEffect } from '../use-isomorphic-effect';
import { useReactId } from './use-react-id';

/**
 * A hook that generates a unique ID for an element.
 * @param staticId - A static ID to use instead of generating a random one.
 * @param prefix - A prefix to add to the generated ID.
 * @returns A unique ID for an element.
 */
export const useId = (staticId?: string, prefix: string = '') => {
  const reactId = useReactId(prefix);
  const [uuid, setUuid] = useState(reactId);

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  if (typeof staticId === 'string') {
    return staticId;
  }

  if (typeof window === 'undefined') {
    return reactId;
  }

  return uuid;
};

/**
 * React hook to generate ids for use in compound components
 *
 * @param staticId the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */
export const useIds = (staticId?: string, ...prefixes: string[]) => {
  const id = useId(staticId);
  return useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`);
  }, [id, prefixes]);
};

/**
 * Used to generate an id, and after render, check if that id is rendered, so we know
 * if we can use it in places such as `aria-labelledby`.
 *
 * @param partId - The unique id for the component part
 *
 * @example
 * const { ref, id } = useOptionalPart<HTMLInputElement>(`${id}-label`)
 */
export const useOptionalPart = <T>(partId: string) => {
  const [id, setId] = useState<string | null>(null);
  const ref = useCallback(
    (node: T) => {
      setId(node ? partId : null);
    },
    [partId],
  );
  return { ref, id, isRendered: Boolean(id) };
};
