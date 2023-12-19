import type { TailwindGeneratedTheme } from '@/utils/generated-theme';

import { camelCase } from 'lodash-es';

import { tailwindGeneratedTheme } from '@/utils/generated-theme';

import { SUPPORTED_TAILWIND_CLASSES } from '../constants/supported-classes';
import {
  backdropFilterTemplate,
  filterTemplate,
  getRingTemplate,
  getTransformGpuTemplate,
  getTransformTemplate,
} from './templates';

function isCssVar(value: string): boolean {
  return /^var\(--.+\)$/.test(value);
}

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), '');
  return { unitless: !unit, value: num, unit };
};

const wrap = (str: string) => {
  return <T>(value: T) => `${str}(${value})`;
};

export const transformFunctions = {
  filter<T>(value: T) {
    return value !== 'auto' ? value : filterTemplate;
  },
  backdropFilter(value: unknown) {
    return value !== 'auto' ? value : backdropFilterTemplate;
  },
  ring(value: string) {
    return getRingTemplate(transformFunctions.px(value));
  },
  bgClip(value: string) {
    return value === 'text' ? { color: 'transparent', backgroundClip: 'text' } : { backgroundClip: value };
  },
  transform<T>(value: T) {
    if (value === 'auto') return getTransformTemplate();
    if (value === 'auto-gpu') return getTransformGpuTemplate();
    return value;
  },
  tailwind(value: string | number, styles?: Record<string, string>) {
    const array = String(value).split('-'); // bg-red-100 => ['bg', 'red', '100'], maxW-100 => ['maxW', '100'], mt-100 => ['mt', '100']
    const tailwindClassValue = array.pop(); // 100, 100, 100
    const tailWindClassKey = array.join('-'); // bg-red, max-w, mt
    if (!tailwindClassValue) return '';
    if (styles?.[tailwindClassValue]) return styles[tailwindClassValue]; // If the value is in the styles, return it (e.g. 'xs', 'sm', 'md', 'lg', 'xl')

    const tailwindClass = camelCase(tailWindClassKey); // bgRed, maxW, mt
    for (const supportedClass of SUPPORTED_TAILWIND_CLASSES) {
      // padding, margin, width, height, minWidth, maxWidth, minHeight, maxHeight
      const themeConfig = tailwindGeneratedTheme; // tailwindTheme
      const themeValue =
        themeConfig[tailwindClass as keyof TailwindGeneratedTheme] ??
        themeConfig[supportedClass as keyof TailwindGeneratedTheme];

      // tailwindTheme.margin
      if (!themeValue) continue; // If there is no such property in the theme, continue to the next iteration
      const isValid = themeValue[tailwindClassValue as keyof typeof themeValue]; // tailwindTheme.margin[100], tailwindTheme.margin[100]
      if (!isValid) continue; // If there is no such value in the theme, continue to the next iteration
      return `${tailWindClassKey}-${tailwindClassValue}`; // bg-red-100, max-w-100, mt-100, if there is a value in the theme and it is valid, return it
    }
    return ''; // If there is no such value in the theme, return an empty string
  },
  vh(value: number | string) {
    return value === '$100vh' ? 'var(--tw-vh)' : value;
  },
  px(value: number | string) {
    if (value === null || value === undefined) return value;
    const { unitless } = analyzeCSSValue(value);
    return unitless || typeof value === 'number' ? `${value}px` : value;
  },
  fraction<T>(value: T) {
    return !(typeof value === 'number') || value > 1 ? value : `${value * 100}%`;
  },
  float<T>(value: T) {
    const map = { left: 'right', right: 'left' } as { left: 'right'; right: 'left' };
    const direction = getComputedStyle(document.documentElement).direction;
    return direction === 'rtl' ? map[value as 'right' | 'left'] : value;
  },
  degree<T>(value: T) {
    if (isCssVar(value as string) || value === null) return value;
    const unitless = typeof value === 'string' && !value.endsWith('deg');
    return typeof value === 'number' || unitless ? `${value}deg` : value;
  },
  blur: wrap('blur'),
  opacity: wrap('opacity'),
  brightness: wrap('brightness'),
  contrast: wrap('contrast'),
  dropShadow: wrap('drop-shadow'),
  grayscale: wrap('grayscale'),
  hueRotate: wrap('hue-rotate'),
  invert: wrap('invert'),
  saturate: wrap('saturate'),
  sepia: wrap('sepia'),
  outline<T>(value: T) {
    const isNoneOrZero = String(value) === '0' || String(value) === 'none';
    return value !== null && isNoneOrZero
      ? { outline: '2px solid transparent', outlineOffset: '2px' }
      : { outline: value };
  },
};
