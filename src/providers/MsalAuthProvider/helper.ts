import type { AccountInfo, Configuration, IPublicClientApplication } from '@azure/msal-browser';
import type { AxiosRequestConfig } from 'axios';
import type { MsalConfiguration, MsalUserInfo } from './types';

import { InteractionRequiredAuthError, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';

import { logger } from '@/utils/logger';

import { MSAL_GRAPH_CONFIG, MSAL_LOGIN_REQUEST } from './constants';

const getAzureAuthenticationResult = async (msalInstance: IPublicClientApplication, account: AccountInfo | null) => {
  if (!account) {
    throw Error('No active account! Verify a user has been signed in and setActiveAccount has been called.');
  }

  const response = await msalInstance.acquireTokenSilent({
    ...MSAL_LOGIN_REQUEST,
    account: account,
  });
  const idTokenClaims = response.idTokenClaims as { exp: number };
  const expireDate = new Date(idTokenClaims.exp * 1000);
  const now = new Date();

  if (now > expireDate) {
    // If idToken is expired, we get a new one
    return msalInstance.ssoSilent({
      ...MSAL_LOGIN_REQUEST,
    });
  }

  return response;
};

const getMsalUserInfoFromIdTokenClaims = (
  idTokenClaims: AccountInfo['idTokenClaims'],
): Omit<MsalUserInfo, 'avatar'> => {
  if (!idTokenClaims) {
    throw Error('No idTokenClaims!');
  }
  const { name, preferred_username } = idTokenClaims;

  const firstName = (idTokenClaims.firstName as string) ?? '';
  const lastName = (idTokenClaims.lastName as string) ?? '';
  const email = (idTokenClaims.mail as string) ?? '';
  const employeeId = (idTokenClaims.employeeId as string) ?? '';
  const roles = idTokenClaims.roles ?? [];
  const fullName = `${firstName} ${lastName}`.trim();
  const displayName = name ?? preferred_username ?? fullName;

  return {
    displayName,
    employeeId,
    firstName,
    lastName,
    email,
    roles,
  };
};

const getAvatarUrl = async (accessToken: string) => {
  const bearer = `Bearer ${accessToken}`;

  const options: AxiosRequestConfig = {
    headers: {
      Authorization: bearer,
    },
  };

  let avatar = '';

  try {
    const avatarResponse = await axios.get<Blob>(`${MSAL_GRAPH_CONFIG.graphMeEndpoint}/photo/$value`, {
      ...options,
      responseType: 'blob',
    });

    if (avatarResponse.data) {
      avatar = URL.createObjectURL(avatarResponse.data);
    }
  } catch {
    avatar = '';
  }

  return avatar;
};

export const getMsalUserInfo = async (
  msalInstance: IPublicClientApplication,
  account: AccountInfo | null,
): Promise<MsalUserInfo | null> => {
  try {
    const response = await getAzureAuthenticationResult(msalInstance, account);
    const msalUserInfo = getMsalUserInfoFromIdTokenClaims(response.idTokenClaims as AccountInfo['idTokenClaims']);
    const avatar = await getAvatarUrl(response.accessToken);

    return { ...msalUserInfo, avatar };
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await msalInstance.acquireTokenRedirect({
        ...MSAL_LOGIN_REQUEST,
        account: account || undefined,
      });
      return null;
    }
    throw error;
  }
};

// Config object to be passed to Msal on creation
export const getMsalConfig = ({ clientId, tenantId, ...restMsalConfig }: MsalConfiguration) => {
  // Browser check variables
  // If you support IE, our recommendation is that you sign-in using Redirect APIs
  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const msie11 = ua.indexOf('Trident/');
  const msedge = ua.indexOf('Edge/');
  const firefox = ua.indexOf('Firefox');
  const isIE = msie > 0 || msie11 > 0;
  const isEdge = msedge > 0;
  const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

  const authority = `https://login.microsoftonline.com/${tenantId}`;

  const { auth, ...rest } = restMsalConfig;
  const { clientId: authClientId, ...restAuth } = auth || {};

  const msalConfig: Configuration = {
    auth: {
      authority: authority,
      clientId: authClientId || clientId,
      postLogoutRedirectUri: '/logout',
      redirectUri: '/redirect',
      ...restAuth,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE || isEdge || isFirefox,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        logLevel: LogLevel.Error, // Only show error logs in the console
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              logger.error(message);
              return;
            case LogLevel.Info:
              logger.info(message);
              return;
            case LogLevel.Verbose:
              logger.debug(message);
              return;
            case LogLevel.Warning:
              logger.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },
    ...rest,
  };

  return msalConfig;
};

export const createMsalInstance = ({ clientId, tenantId, ...restMsalConfig }: MsalConfiguration) => {
  if (!clientId || !tenantId) {
    throw new Error('Client ID or Tenant ID is missing.');
  }

  const msalConfig = getMsalConfig({ clientId, tenantId, ...restMsalConfig });
  const msalInstance = new PublicClientApplication(msalConfig);
  return msalInstance;
};
