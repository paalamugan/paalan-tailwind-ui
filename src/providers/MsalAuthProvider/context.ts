import type { MsalAuthContextState } from './types';

import { createContext } from '@/utils/create-context';

export const [MsalAuthContextProvider, useMsalAuth] = createContext<MsalAuthContextState>({
  name: 'MsalAuthContextProvider',
  hookName: 'useMsalAuth',
  providerName: '<MsalAuthProvider />',
});
