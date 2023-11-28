import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/config/tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

/**
 * This is the generated theme from tailwind.config.js
 * You can use it to get the type of the theme.
 * For example, if you want to get the type of the theme.spacing, you can use the following code:
 * const spacing: TailwindGeneratedTheme['spacing'] = { ... }
 *
 * *Important*: If you want to add a new property in the `src/config/tailwind.config.ts` file,
 * * then you must also add that new property types in the `@/types/tailwind-styled-theme.ts` file as well for typing consistency.
 */
export const tailwindGeneratedTheme = fullConfig.theme;
export type TailwindGeneratedTheme = typeof tailwindGeneratedTheme;

export const breakpoints = Object.keys(tailwindGeneratedTheme.screens) as (keyof TailwindGeneratedTheme['screens'])[];
export type Breakpoints = (typeof breakpoints)[number];
