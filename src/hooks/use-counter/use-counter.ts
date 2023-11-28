import { useState } from 'react';

import { clamp } from '@/utils';

const DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity,
};

/**
 * A custom hook that provides a counter with increment, decrement, set and reset functionality.
 * @param initialValue - The initial value of the counter. Default is 0.
 * @param options - An optional object containing min and max values for the counter.
 * @returns A tuple containing the current count and an object with increment, decrement, set and reset functions.
 */
export const useCounter = (initialValue = 0, options?: Partial<{ min: number; max: number }>) => {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options };
  const [count, setCount] = useState<number>(clamp(initialValue, min, max));

  const increment = () => setCount((current) => clamp(current + 1, min, max));
  const decrement = () => setCount((current) => clamp(current - 1, min, max));
  const set = (value: number) => setCount(clamp(value, min, max));
  const reset = () => setCount(clamp(initialValue, min, max));

  return [count, { increment, decrement, set, reset }] as const;
};
