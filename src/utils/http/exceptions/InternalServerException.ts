import type { IHttpErrorOptions } from '../HttpError';

import { HttpStatusCode } from 'axios';

import { HttpError } from '../HttpError';
import { HTTP_SERVER_ERROR_CODE } from '../InternalErrorCode';

export class InternalServerException extends HttpError {
  constructor(options: IHttpErrorOptions) {
    const message = `Unknown internal server error occurred`;
    super(message, {
      ...options,
      code: HTTP_SERVER_ERROR_CODE.E500,
      status: HttpStatusCode.InternalServerError,
    });
    this.name = 'InternalServerException';
  }
}
