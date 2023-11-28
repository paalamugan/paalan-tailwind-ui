import type { FC } from 'react';
import type { ErrorLayoutProps } from './ErrorLayout';

import { ErrorLayout } from './ErrorLayout';

interface ErrorInternalServerResponseProps extends Partial<ErrorLayoutProps> {}

export const ErrorInternalServerResponse: FC<ErrorInternalServerResponseProps> = ({
  children,
  heading = 'Something went seriously wrong',
  subHeading = 'It sounds like something unexpected happened right now. Please, inform our support team about this issue ASAP!',
  ...props
}) => {
  return (
    <ErrorLayout heading={heading} subHeading={subHeading} {...props}>
      {children}
    </ErrorLayout>
  );
};
