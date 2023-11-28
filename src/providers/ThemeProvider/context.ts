import type { ThemeContextState } from './types';

import { createContext } from '@/utils/create-context';

export const [ThemeContextProvider, useTheme] = createContext<ThemeContextState>({
  name: 'ThemeContextProvider',
  hookName: 'useTheme',
  providerName: '<ThemeProvider />',
});
