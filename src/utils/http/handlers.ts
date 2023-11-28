import type { AxiosResponse } from 'axios';
import type { AxiosRequestConfigData, ErrorHandler, ErrorHandlerMany, IHttpErrorData } from './types';

import axios from 'axios';

import { jsonParser } from '../helper';
import { ErrorHandlerRegistry } from './ErrorHandlerRegistry';
import { ResourceNotFoundException } from './exceptions';
import { GLOBAL_HTTP_ERROR_VALIDATION } from './global-http-error';
import { HttpError } from './HttpError';

export const responseSuccessHandler = <T, D extends AxiosRequestConfigData>(response: AxiosResponse<T, D>) => {
  const config = response?.config;
  const configData = jsonParser<D>(config.data);

  if (configData?.raw) {
    return response;
  }
  if (response.status !== 200) {
    throw new HttpError('Response status is not 200!');
  }
  const data = response?.data;
  if (!data) {
    throw new HttpError('Response data is not provided!');
  }
  return data;
};

export const responseErrorHandler = <T extends IHttpErrorData, D extends AxiosRequestConfigData>(
  error: unknown,
  direct?: boolean,
) => {
  if (axios.isAxiosError<T, D>(error)) {
    const { status } = error.response ?? {};
    if (status === 404) {
      error = new ResourceNotFoundException(error);
    }
  }
  return globalHttpErrorHandlers.responseErrorHandler(error, direct);
};

export function dealWith(solutions: ErrorHandlerMany, ignoreGlobal = true) {
  let global;
  if (!ignoreGlobal) global = globalHttpErrorHandlers;
  const localHandlers = new ErrorHandlerRegistry(global, solutions);
  return (error: unknown) => localHandlers.responseErrorHandler(error, true);
}

export const globalHttpErrorHandlers = new ErrorHandlerRegistry();
globalHttpErrorHandlers.registerMany({ ...GLOBAL_HTTP_ERROR_VALIDATION });

export function registerHttpError(key: keyof typeof GLOBAL_HTTP_ERROR_VALIDATION, handler: ErrorHandler) {
  globalHttpErrorHandlers.register(key, handler);
}
