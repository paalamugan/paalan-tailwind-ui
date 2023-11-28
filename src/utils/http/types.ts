import type { ExternalToast } from '@/components';
import type { AxiosResponse } from 'axios';
import type { IAxiosClientConfig } from './IAxiosClient';

export interface AxiosRequestConfigData {
  raw?: boolean; // if true, no data will be parsed and thrown as a raw error if api is not 200
  silent?: boolean; // if true, no toast will be shown
}

export interface IHttpErrorData {
  message: string;
  code?: string;
  description?: string;
}

export interface ErrorHandlerObject {
  after?(error?: IHttpErrorData, options?: ErrorHandlerObject): void;
  before?(error?: IHttpErrorData, options?: ErrorHandlerObject): void;
  message?: string;
  notify?: ExternalToast;
}

export type ErrorHandlerFunction = (error?: IHttpErrorData) => ErrorHandlerObject | boolean | undefined;

export type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;

export type ErrorHandlerMany = Record<string, ErrorHandler>;

export type AxiosReturnResponse<TData = unknown, TConfig = IAxiosClientConfig> = TConfig extends {
  data: { raw: boolean };
}
  ? Promise<AxiosResponse<TData, unknown>>
  : Promise<TData>;
