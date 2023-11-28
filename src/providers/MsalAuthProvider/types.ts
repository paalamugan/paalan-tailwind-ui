import type { AccountInfo, Configuration, IPublicClientApplication } from '@azure/msal-browser';
import type { PropsWithChildren } from 'react';

export interface MsalAuthProviderProps extends PropsWithChildren<MsalConfiguration> {
  /**
   * The path to redirect to when authentication fails.
   * @default /signin
   */
  authFailRedirectPath?: string;
  /**
   * Whether to use the popup authentication flow or not. If you are not passing then it will use the redirect flow.
   * @default false
   */
  isPopupAuthenticationFlow?: boolean;
}

export interface MsalUserInfo {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  roles: string[];
  avatar: string;
}

export interface MsalAccountInfo extends AccountInfo {}

export interface MsalConfiguration extends Partial<Configuration> {
  /**
   * The client ID of your application, you should get this from the Azure Portal.
   */
  clientId: string;
  /**
   * The tenant ID of your application, you should get this from the Azure Portal.
   */
  tenantId: string;
}

export interface MsalAuthContextState {
  user: MsalUserInfo | null;
  account: MsalAccountInfo | null;
  isLoggedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: MsalUserInfo | null) => void;
  setAccount: (account: MsalAccountInfo | null) => void;
  reset: () => void;
  setAuth: ({ user, account }: { user: MsalUserInfo | null; account: MsalAccountInfo | null }) => void;
  authFailRedirectPath: string;
  msalInstance: IPublicClientApplication;
}
