import { useCallback, useEffect } from 'react';

import type { AuthenticationResult, EventMessage } from '@azure/msal-browser';
import type { MsalAuthProviderProps } from './types';

import { EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { createMsalInstance } from './helper';
import { MsalAuth } from './MsalAuth';

/**
 * A React component that provides authentication using Microsoft Authentication Library (MSAL).
 * @param {string} clientId - The client ID of the Azure AD application.
 * @param {string} tenantId - The tenant ID of the Azure AD application.
 * @param {ReactNode} children - The child components to be rendered.
 * @param {string} authFailRedirectPath - The path to redirect to if authentication fails.
 * @param {boolean} isPopupAuthenticationFlow - A flag indicating whether to use popup authentication flow.
 * @param {MsalConfig} restMsalConfig - The MSAL configuration options.
 */
export const MsalAuthProvider = ({
  clientId,
  tenantId,
  children,
  authFailRedirectPath,
  isPopupAuthenticationFlow,
  ...restMsalConfig
}: MsalAuthProviderProps) => {
  const msalInstance = createMsalInstance({ clientId, tenantId, ...restMsalConfig });

  const setAzureADAccount = useCallback(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    const currentActiveAccount = msalInstance.getActiveAccount();

    // Default to using the first account if no account is active on page load
    if (!currentActiveAccount && accounts.length && accounts[0]) {
      // Account selection logic is app dependent. Adjust as needed for different use cases.
      msalInstance.setActiveAccount(accounts[0]);
    }
  }, [msalInstance]);

  useEffect(() => {
    setAzureADAccount();
    // Optional - This will update account state if a user signs in from another tab or window
    msalInstance.enableAccountStorageEvents();

    const eventId = msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const payload = event.payload as AuthenticationResult | null;
        if (payload) {
          msalInstance.setActiveAccount(payload.account);
        }
      }

      if (event.eventType === EventType.HANDLE_REDIRECT_END) {
        setAzureADAccount();
      }
    });

    return () => {
      if (eventId) {
        msalInstance.removeEventCallback(eventId);
      }
    };
  }, [msalInstance, setAzureADAccount]);

  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuth authFailRedirectPath={authFailRedirectPath} isPopupAuthenticationFlow={isPopupAuthenticationFlow}>
        {children}
      </MsalAuth>
    </MsalProvider>
  );
};
