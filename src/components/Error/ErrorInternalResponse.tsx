import type { FC } from 'react';
import type { ErrorLayoutProps } from './ErrorLayout';

import { ErrorLayout } from './ErrorLayout';

export interface ErrorResponseImpl {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
}

export const isInternalErrorResponse = (error: unknown): error is ErrorResponseImpl => {
  return 'internal' in (error as ErrorResponseImpl);
};

interface ErrorInternalResponseProps extends Partial<ErrorLayoutProps> {}

export const ErrorInternalResponse: FC<ErrorInternalResponseProps> = ({
  children,
  heading = 'Something went wrong',
  subHeading = "It sounds like something unexpected happened right now. Please, give it a try later or, if it's urgent, contact our support team.",
  ...props
}) => {
  return (
    <ErrorLayout heading={heading} subHeading={subHeading} {...props}>
      {children}
    </ErrorLayout>
  );
};
