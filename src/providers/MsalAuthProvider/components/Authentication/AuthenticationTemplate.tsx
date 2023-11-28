import { useCallback, useEffect, useState } from 'react';

import type { AccountInfo } from '@azure/msal-browser';
import type { FC } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useCallbackRef } from '@/hooks';
import { logger } from '@/utils';

import { useMsalAuth } from '../../context';
import { getMsalUserInfo } from '../../helper';
import { AuthenticationLoader } from './AuthenticationLoader';

const RequireAuth: FC = () => {
  const { isLoggedIn, authFailRedirectPath } = useMsalAuth();
  const location = useLocation();
  return isLoggedIn ? <Outlet /> : <Navigate to={authFailRedirectPath} state={{ from: location }} replace />;
};

export const AuthenticationTemplate: FC = () => {
  const { msalInstance, setAuth, user } = useMsalAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const fetchMsalUserInfo = useCallback(
    async (account: AccountInfo | null) => {
      try {
        if (!account) return setAuth({ user: null, account: null });
        if (user) return; // already authenticated

        const userInfo = await getMsalUserInfo(msalInstance, account);

        setAuth({ user: userInfo, account });
      } catch (err) {
        const error = err as Error;
        logger.error(error.message);
        msalInstance.clearCache();
        msalInstance.setActiveAccount(null);
        setAuth({ user: null, account: null });
      } finally {
        setIsAuthenticating(false);
      }
    },
    [setAuth, msalInstance, user],
  );

  const fetchMsalUserInfoRef = useCallbackRef(fetchMsalUserInfo);

  useEffect(() => {
    const account = msalInstance.getActiveAccount();
    fetchMsalUserInfoRef(account);
  }, [msalInstance, fetchMsalUserInfoRef]);

  if (isAuthenticating) return <AuthenticationLoader />;
  return <RequireAuth />;
};
