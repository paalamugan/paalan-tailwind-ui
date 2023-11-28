import type { FC } from 'react';
import type { ErrorLayoutProps } from './ErrorLayout';

import { ErrorLayout } from './ErrorLayout';

interface ErrorNotFoundResponseProps extends Partial<ErrorLayoutProps> {}

export const ErrorNotFoundResponse: FC<ErrorNotFoundResponseProps> = ({
  children,
  heading = "Page doesn't exist",
  subHeading = 'Probably you got here by accident. If you think there is something wrong on our side, please contact us!',
  ...props
}) => {
  return (
    <ErrorLayout heading={heading} subHeading={subHeading} {...props}>
      {children}
    </ErrorLayout>
  );
};
