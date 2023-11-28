import { useCallback, useEffect, useRef, useState } from 'react';

import { useWindowEvent } from '../use-window-event/use-window-event';

export type StorageType = 'localStorage' | 'sessionStorage';

export interface IStorageProperties<T> {
  /** Storage key */
  key: string;

  /** Default value that will be set if value is not found in storage */
  defaultValue?: T;

  /** If set to true, value will be updated in useEffect after mount */
  getInitialValueInEffect?: boolean;

  /** Function to serialize value into a string to be saved in storage */
  serialize?(value: T): string;

  /** Function to deserialize string value from storage to value */
  deserialize?(value: string): T;
}

function serializeJSON<T>(value: T, hookName: string) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(`hooks ${hookName}: Failed to serialize the value`);
  }
}

function deserializeJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export const createStorage = <T>(type: StorageType, hookName: string) => {
  const eventName = type === 'localStorage' ? 'app-local-storage' : 'app-session-storage';

  return function useStorage({
    key,
    defaultValue = undefined,
    getInitialValueInEffect = true,
    deserialize = (value: string) => deserializeJSON(value) as T,
    serialize = (value: T) => serializeJSON(value, hookName),
  }: IStorageProperties<T>) {
    const deserializeRef = useRef(deserialize);
    const serializeRef = useRef(serialize);

    useEffect(() => {
      deserializeRef.current = deserialize;
    }, [deserialize]);

    useEffect(() => {
      serializeRef.current = serialize;
    }, [serialize]);

    const readStorageValue = useCallback(
      (skipStorage?: boolean): T => {
        if (typeof window === 'undefined' || !(type in window) || window[type] === null || skipStorage) {
          return defaultValue as T;
        }

        const storageValue = window[type].getItem(key);

        return storageValue !== null ? deserializeRef.current(storageValue) : (defaultValue as T);
      },
      [key, defaultValue],
    );

    const [value, setValue] = useState<T>(readStorageValue(getInitialValueInEffect));

    const setStorageValue = useCallback(
      (val: T | ((prevState: T) => T)) => {
        if (val instanceof Function) {
          setValue((current) => {
            const result = val(current);
            window[type].setItem(key, serializeRef.current(result));
            window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val(current) } }));
            return result;
          });
        } else {
          window[type].setItem(key, serializeRef.current(val));
          window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }));
          setValue(val);
        }
      },
      [key],
    );

    const removeStorageValue = useCallback(() => {
      window[type].removeItem(key);
      window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }));
    }, [defaultValue, key]);

    useWindowEvent('storage', (event) => {
      if (event.storageArea === window[type] && event.key === key) {
        setValue(deserializeRef.current(event.newValue ?? ''));
      }
    });

    useWindowEvent(eventName, (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });

    useEffect(() => {
      if (defaultValue !== undefined && value === undefined) {
        setStorageValue(defaultValue);
      }
    }, [defaultValue, value, setStorageValue]);

    useEffect(() => {
      if (getInitialValueInEffect) {
        setValue(readStorageValue());
      }
    }, [getInitialValueInEffect, readStorageValue]);

    return [value === undefined ? defaultValue : value, setStorageValue, removeStorageValue] as const;
  };
};
