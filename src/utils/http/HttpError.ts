import type { IHttpErrorData } from './types';

import { AxiosError, HttpStatusCode } from 'axios';

interface IHttpError extends Error {
  message: string;
  status: number;
}

export interface IHttpErrorOptions {
  status?: HttpStatusCode;
  code?: string;
  config?: AxiosError['config'];
  request?: AxiosError['request'];
  response?: AxiosError<IHttpErrorData>['response'];
  name?: string;
}

export class HttpError extends AxiosError implements IHttpError {
  message: string;
  status: HttpStatusCode;
  name: string;

  constructor(
    message?: string,
    { status = HttpStatusCode.BadRequest, code, config, request, response, name }: IHttpErrorOptions = {},
  ) {
    super(message, code, config, request, response);
    this.status = status;
    this.message = message ?? response?.data?.message ?? 'Http error message not provided';
    this.name = name ?? 'HttpAxiosError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
