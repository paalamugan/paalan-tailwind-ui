import { useState } from 'react';

import type React from 'react';

/**
 * Defines the interface for the handlers of a list state.
 * @template T The type of items in the list.
 */
export interface UseListStateHandlers<T> {
  /**
   * Sets the state of the list.
   * @param state The new state of the list.
   */
  setState: React.Dispatch<React.SetStateAction<T[]>>;

  /**
   * Appends items to the end of the list.
   * @param items The items to append.
   */
  append: (...items: T[]) => void;

  /**
   * Prepends items to the beginning of the list.
   * @param items The items to prepend.
   */
  prepend: (...items: T[]) => void;

  /**
   * Inserts items at the specified index in the list.
   * @param index The index at which to insert the items.
   * @param items The items to insert.
   */
  insert: (index: number, ...items: T[]) => void;

  /**
   * Removes the last item from the list.
   */
  pop: () => void;

  /**
   * Removes the first item from the list.
   */
  shift: () => void;

  /**
   * Applies a function to each item in the list.
   * @param fn The function to apply to each item.
   */
  apply: (fn: (item: T, index?: number) => T) => void;

  /**
   * Applies a function to items in the list that satisfy a condition.
   * @param condition The condition that an item must satisfy.
   * @param fn The function to apply to the matching items.
   */
  applyWhere: (condition: (item: T, index: number) => boolean, fn: (item: T, index?: number) => T) => void;

  /**
   * Removes items at the specified indices from the list.
   * @param indices The indices of the items to remove.
   */
  remove: (...indices: number[]) => void;

  /**
   * Reorders an item in the list from one index to another.
   * @param from The current index of the item.
   * @param to The new index of the item.
   */
  reorder: ({ from, to }: { from: number; to: number }) => void;

  /**
   * Sets the item at the specified index in the list.
   * @param index The index of the item to set.
   * @param item The new value of the item.
   */
  setItem: (index: number, item: T) => void;

  /**
   * Sets a property of an item at the specified index in the list.
   * @param index The index of the item.
   * @param prop The property to set.
   * @param value The new value of the property.
   */
  setItemProp: <K extends keyof T, U extends T[K]>(index: number, prop: K, value: U) => void;

  /**
   * Filters the list based on a condition.
   * @param fn The condition to filter the list.
   */
  filter: (fn: (item: T, i: number) => boolean) => void;
}

export type UseListState<T> = [T[], UseListStateHandlers<T>];

/**
 * A custom hook that provides state management for a list of items.
 * @template T The type of the items in the list.
 * @param {T[]} initialValue The initial value of the list.
 * @returns {[T[], UseListStateActions<T>]} An array containing the current state of the list and an object with functions to manipulate the list.
 */
export const useListState = <T>(initialValue: T[] = []): UseListState<T> => {
  const [state, setState] = useState(initialValue);

  const append = (...items: T[]) => setState((current) => [...current, ...items]);
  const prepend = (...items: T[]) => setState((current) => [...items, ...current]);

  const insert = (index: number, ...items: T[]) =>
    setState((current) => [...current.slice(0, index), ...items, ...current.slice(index)]);

  const apply = (fn: (item: T, index?: number) => T) =>
    setState((current) => current.map((item, index) => fn(item, index)));

  const remove = (...indices: number[]) =>
    setState((current) => current.filter((_, index) => !indices.includes(index)));

  const pop = () =>
    setState((current) => {
      const cloned = [...current];
      cloned.pop();
      return cloned;
    });

  const shift = () =>
    setState((current) => {
      const cloned = [...current];
      cloned.shift();
      return cloned;
    });

  const reorder = ({ from, to }: { from: number; to: number }) =>
    setState((current) => {
      const cloned = [...current];
      const item = current[from];

      cloned.splice(from, 1);
      cloned.splice(to, 0, item);

      return cloned;
    });

  const setItem = (index: number, item: T) =>
    setState((current) => {
      const cloned = [...current];
      cloned[index] = item;
      return cloned;
    });

  const setItemProp = <K extends keyof T, U extends T[K]>(index: number, prop: K, value: U) =>
    setState((current) => {
      const cloned = [...current];
      cloned[index] = { ...cloned[index], [prop]: value };
      return cloned;
    });

  const applyWhere = (condition: (item: T, index: number) => boolean, fn: (item: T, index?: number) => T) =>
    setState((current) => current.map((item, index) => (condition(item, index) ? fn(item, index) : item)));

  const filter = (fn: (item: T, i: number) => boolean) => {
    setState((current) => current.filter(fn));
  };

  return [
    state,
    {
      setState,
      append,
      prepend,
      insert,
      pop,
      shift,
      apply,
      applyWhere,
      remove,
      reorder,
      setItem,
      setItemProp,
      filter,
    },
  ];
};
