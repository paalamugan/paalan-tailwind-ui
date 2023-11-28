import type { IHttpErrorOptions } from '../HttpError';

import { HttpStatusCode } from 'axios';

import { HttpError } from '../HttpError';
import { HTTP_SERVER_ERROR_CODE } from '../InternalErrorCode';

export class ResourceNotFoundException extends HttpError {
  constructor(options: IHttpErrorOptions, resourceId?: string) {
    const message = resourceId ? `Resource with ${resourceId} id not found` : 'Resource was not found';
    super(message, {
      ...options,
      code: HTTP_SERVER_ERROR_CODE.E404,
      status: HttpStatusCode.NotFound,
    });
    this.name = 'ResourceNotFoundException';
  }
}
