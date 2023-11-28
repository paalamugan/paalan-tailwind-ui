import type { FormatIntlContextState } from './types';

import { createContext } from '@/utils/create-context';

export const [FormatIntlContextProvider, useFormatIntl] = createContext<FormatIntlContextState>({
  name: 'FormatIntlContextProvider',
  hookName: 'useFormatIntl',
  providerName: '<FormatIntlProvider />',
});
