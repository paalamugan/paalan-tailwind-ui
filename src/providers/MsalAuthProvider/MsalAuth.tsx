import { useCallback, useMemo, useReducer } from 'react';

import type React from 'react';
import type { PropsWithChildren } from 'react';
import type { MsalAuthContextState } from './types';

import { useMsal } from '@azure/msal-react';

import { toast } from '../../components/Toast';
import { MSAL_LOGIN_REQUEST } from './constants';
import { MsalAuthContextProvider } from './context';
import { getMsalUserInfo } from './helper';

type ReducerActionType =
  | {
      type: 'SET_USER';
      payload: MsalAuthContextState['user'];
    }
  | {
      type: 'SET_ACCOUNT';
      payload: MsalAuthContextState['account'];
    }
  | {
      type: 'RESET';
    };

const reducer = (state: MsalAuthContextState, action: ReducerActionType) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'RESET':
      return { ...state, user: null, account: null };
    default:
      return state;
  }
};

interface MsalAuthProps extends PropsWithChildren {
  authFailRedirectPath?: string;
  isPopupAuthenticationFlow?: boolean;
}

export const MsalAuth: React.FC<MsalAuthProps> = ({ children, authFailRedirectPath, isPopupAuthenticationFlow }) => {
  const { instance: msalInstance } = useMsal();
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    account: null,
    isLoggedIn: false,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    setUser: () => null,
    setAccount: () => null,
    reset: () => null,
    setAuth: () => null,
    msalInstance,
    authFailRedirectPath: authFailRedirectPath || '/signin',
  });

  const setUser = useCallback((user: MsalAuthContextState['user']) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const setAccount = useCallback((account: MsalAuthContextState['account']) => {
    dispatch({ type: 'SET_ACCOUNT', payload: account });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const setAuth: MsalAuthContextState['setAuth'] = useCallback(
    ({ user, account }) => {
      setUser(user);
      setAccount(account);
    },
    [setUser, setAccount],
  );

  const signIn = useCallback(async () => {
    try {
      if (isPopupAuthenticationFlow) {
        const result = await msalInstance.loginPopup({
          ...MSAL_LOGIN_REQUEST,
        });
        const userInfo = await getMsalUserInfo(msalInstance, result.account);
        if (!userInfo) {
          throw new Error('User info not found');
        }
        msalInstance.setActiveAccount(result.account);
        setAuth({ user: userInfo, account: result.account });
      } else {
        await msalInstance.loginRedirect({
          ...MSAL_LOGIN_REQUEST,
        });
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Couldn't sign in. Please try again later.");
      reset();
    }
  }, [isPopupAuthenticationFlow, msalInstance, reset, setAuth]);

  const signOut = useCallback(async () => {
    try {
      if (isPopupAuthenticationFlow) {
        await msalInstance.logoutPopup({
          account: state.account,
        });
        reset();
      } else {
        await msalInstance.logoutRedirect({
          account: state.account,
        });
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Couldn't sign in. Please try again later.");
    }
  }, [isPopupAuthenticationFlow, msalInstance, state.account, reset]);

  const isLoggedIn = !!state.user;

  const value = useMemo(
    () => ({
      ...state,
      isLoggedIn,
      signIn,
      signOut,
      setUser,
      setAccount,
      reset,
      setAuth,
    }),
    [isLoggedIn, reset, setAccount, setUser, signIn, signOut, setAuth, state],
  );

  return <MsalAuthContextProvider value={value}>{children}</MsalAuthContextProvider>;
};
