import type { ComponentType, ReactNode } from 'react';
import type { ErrorBoundaryPropsWithFallback } from 'react-error-boundary';

import { ErrorBoundary as Boundary } from 'react-error-boundary';

import { ErrorRouterBoundary } from './ErrorRouterBoundary';

export interface FallbackProps<ErrorType> {
  error: ErrorType;
  resetErrorBoundary: (...args: unknown[]) => void;
}

export type ErrorFallback<ErrorType> = ComponentType<FallbackProps<ErrorType>>;

export type ErrorBoundaryProps<ErrorType> = Omit<ErrorBoundaryPropsWithFallback, 'fallback'> & {
  fallback?: ErrorFallback<ErrorType>;
};
export type IErrorBoundaryProps<ErrorType> = ErrorBoundaryProps<ErrorType> & {
  children: ReactNode;
};

export const ErrorBoundary = <ErrorType extends Error>({
  children,
  fallback,
  ...props
}: IErrorBoundaryProps<ErrorType>) => {
  return (
    <Boundary FallbackComponent={fallback ?? ErrorRouterBoundary} {...props}>
      {children}
    </Boundary>
  );
};
