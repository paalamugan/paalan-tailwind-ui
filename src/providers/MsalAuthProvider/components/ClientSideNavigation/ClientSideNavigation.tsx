import { useEffect, useState } from 'react';

import type { PropsWithChildren } from 'react';

import { ScrollRestoration, useNavigate } from 'react-router-dom';

import { useMsalAuth } from '../../context';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { CustomNavigationClient } from './CustomNavigationClient';

/**
 *  This component is optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
 */
export const ClientSideNavigation: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { msalInstance } = useMsalAuth();
  const navigationClient = new CustomNavigationClient(navigate);
  msalInstance.setNavigationClient(navigationClient);

  // react-router-dom v6 doesn't allow navigation on the first render - delay rendering of MsalProvider to get around this limitation
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const activeAccount = msalInstance.getActiveAccount();
    if (activeAccount) {
      return setFirstRender(false);
    }
    const timer = setTimeout(() => {
      setFirstRender(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [msalInstance]);

  if (firstRender) return <LoadingIndicator />;

  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      {children}
    </>
  );
};
