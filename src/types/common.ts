import type { tailwindBoxVariants } from '@/constants';
import type { VariantProps } from 'class-variance-authority';

export type Dict<T = unknown> = Record<string, T>;
export type ValueOf<T> = T[keyof T];
export interface OptionType {
  label: string;
  value: string;
  className?: string;
  disabled?: boolean;
}

export type Merge<T, P> = P & Omit<T, keyof P>;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type LiteralUnion<T extends U, U = string> = T | (U & { _?: never });

export type AnyFunction<T = never> = (...args: T[]) => never;

export type FunctionArguments<T extends VoidFunction> = T extends (...args: infer R) => never ? R : never;

export type Booleanish = boolean | 'true' | 'false';
export type StringOrNumber = string | number;

export type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

export type SizeVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type TailwindBoxVariants = VariantProps<typeof tailwindBoxVariants>;
