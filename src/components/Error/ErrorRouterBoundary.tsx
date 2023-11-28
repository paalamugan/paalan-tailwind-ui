import { useRouteError } from 'react-router-dom';

import { HttpError } from '@/utils/http';

import { ErrorInternalResponse, isInternalErrorResponse } from './ErrorInternalResponse';
import { ErrorInternalServerResponse } from './ErrorInternalServerResponse';
import { ErrorNotFoundResponse } from './ErrorNotFoundResponse';
import { ErrorRouterComponent } from './ErrorRouterComponent';

interface IProps<Response extends HttpError['response'] = never> {
  error?: Response;
}

export const ErrorRouterBoundary = <Response extends HttpError['response'] = never>(props: IProps<Response>) => {
  const routeError = useRouteError();

  const error = props.error ?? routeError;

  if (error instanceof HttpError) {
    switch (error.status) {
      case 500:
        return <ErrorInternalServerResponse />;
      case 401:
        return null;
      case 403:
      case 404:
        return <ErrorNotFoundResponse />;
      default:
        return <ErrorInternalResponse />;
    }
  }

  if (error instanceof Error) {
    return (
      <ErrorInternalResponse>
        <ErrorRouterComponent error={error} />
      </ErrorInternalResponse>
    );
  }

  if (isInternalErrorResponse(error)) {
    return (
      <ErrorInternalResponse>
        <ErrorRouterComponent error={error.error} />
      </ErrorInternalResponse>
    );
  }

  return <ErrorInternalResponse />;
};
