import type { FC } from 'react';
import type { ErrorLayoutProps } from './ErrorLayout';

import { ErrorLayout } from './ErrorLayout';

interface ErrorEmptyResponseProps extends Partial<ErrorLayoutProps> {}

export const ErrorEmptyResponse: FC<ErrorEmptyResponseProps> = ({
  children,
  heading = 'No results found',
  subHeading = 'Unfortunately, there is nothing for you here yet!',
  ...props
}) => {
  return (
    <ErrorLayout heading={heading} subHeading={subHeading} {...props}>
      {children}
    </ErrorLayout>
  );
};
