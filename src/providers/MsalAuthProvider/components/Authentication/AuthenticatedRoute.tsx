import type { FC } from 'react';

import { ClientSideNavigation } from '../ClientSideNavigation';
import { AuthenticationTemplate } from './AuthenticationTemplate';

export const AuthenticatedRoute: FC = () => {
  return (
    <ClientSideNavigation>
      <AuthenticationTemplate />
    </ClientSideNavigation>
  );
};
