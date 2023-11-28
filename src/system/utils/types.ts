import type { TailwindStyledTheme } from '@/types';

export type ThemeTypingsKey = keyof TailwindStyledTheme | 'breakpoints' | 'empty';
export type ThemeTypings<K extends ThemeTypingsKey> = K extends keyof TailwindStyledTheme
  ? TailwindStyledTheme
  : {
      breakpoints: TailwindStyledTheme['screens'];
    };

export type ResponsiveArray<T> = Array<T | null>;

export type ResponsiveObject<T> = Partial<Record<keyof ThemeTypings<'breakpoints'>['breakpoints'], T>>;

export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>;

export type Length = string | 0 | number;

export type Union<T> = T | (string & NonNullable<unknown>);

export type Token<
  CSSType,
  ThemeKey extends ThemeTypingsKey = 'empty',
  ExtraType extends string = never,
> = ThemeKey extends keyof ThemeTypings<ThemeKey>
  ? keyof ThemeTypings<ThemeKey>[ThemeKey] | ExtraType
  : ResponsiveValue<CSSType>;

export type Transform = (value: string | number, styles?: Record<string, string>) => unknown;
