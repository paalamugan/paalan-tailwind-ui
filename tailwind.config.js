// @ts-check
import { tailwindConfig } from './src/config';
import { tailwindSafeList } from './src/config/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  safelist: tailwindSafeList,
};
