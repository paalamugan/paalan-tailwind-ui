import { useState } from 'react';

/**
 * A custom hook that manages a queue of items of type T with a specified limit.
 * @template T The type of items in the queue.
 * @param {Object} options An object containing the initial values and limit of the queue.
 * @param {T[]} [options.initialValues=[]] An optional array of initial values for the queue.
 * @param {number} options.limit The maximum number of items that can be in the queue.
 * @returns {Object} An object containing the current state of the queue, as well as methods to add, update, and clean the queue.
 */
export const useQueue = <T>({ initialValues = [], limit }: { initialValues?: T[]; limit: number }) => {
  const [{ state, queue }, setState] = useState({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit),
  });

  const add = (...items: T[]) =>
    setState((current) => {
      const results = [...current.state, ...current.queue, ...items];

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const update = (fn: (state: T[]) => T[]) =>
    setState((current) => {
      const results = fn([...current.state, ...current.queue]);

      return {
        state: results.slice(0, limit),
        queue: results.slice(limit),
      };
    });

  const cleanQueue = () => setState((current) => ({ state: current.state, queue: [] }));

  return {
    state,
    queue,
    add,
    update,
    cleanQueue,
  };
};
