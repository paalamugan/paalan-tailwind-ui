import type { IStorageProperties } from '../use-local-storage/create-storage';

import { createStorage } from '../use-local-storage/create-storage';

/**
 * Returns a custom React hook that provides a session storage object for a given key.
 * @param props - An object containing the key and initial value for the session storage object.
 * @returns A session storage object for the given key.
 */
export const useSessionStorage = <T = string>(props: IStorageProperties<T>) => {
  return createStorage<T>('sessionStorage', 'use-session-storage')(props);
};
