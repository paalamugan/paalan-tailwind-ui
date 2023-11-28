import type { IStorageProperties } from './create-storage';

import { createStorage } from './create-storage';

/**
 * Returns a hook that allows you to store and retrieve data from local storage.
 * @param props - The properties for the storage.
 * @returns The storage object.
 */
export const useLocalStorage = <T = string>(props: IStorageProperties<T>) => {
  return createStorage<T>('localStorage', 'use-local-storage')(props);
};
