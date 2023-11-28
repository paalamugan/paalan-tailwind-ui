import type { ErrorHandlerMany } from './types';

import { logger } from '../logger';

export const GLOBAL_HTTP_ERROR_VALIDATION: ErrorHandlerMany = {
  '404': { message: 'Data not found' },
  '500': { message: 'Internal Server Error' },
  INVALID_LOGIN: {
    message: 'Invalid Login!',
  },
  LOGIN_REQUIRED: {
    after: () => logger.info('Go TO /login'),
    message: 'Login required',
  },
  NO_INPUT_DATA: { message: 'No Input data' },
  VALIDATION_ERROR: {
    message: 'Validation error!',
  },
  WRONG_KEY: {
    after: () => logger.info('Go TO /login'),
  },
};
