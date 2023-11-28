import type { AxiosRequestConfig } from 'axios';
import type { AxiosRequestConfigData, AxiosReturnResponse } from './types';

export type IAxiosClientConfig = AxiosRequestConfig<AxiosRequestConfigData>;

export interface IAxiosClient<Config extends IAxiosClientConfig> {
  config: Config;
  get<TData = unknown, TConfig extends Config = Config>(
    url: string,
    config?: TConfig,
  ): AxiosReturnResponse<TData, TConfig>;
  post<TData = unknown, TBody = unknown, TConfig extends Config = Config>(
    url: string,
    body: TBody,
    config?: TConfig,
  ): AxiosReturnResponse<TData, TConfig>;
  put<TData = unknown, TBody = unknown, TConfig extends Config = Config>(
    url: string,
    body?: TBody,
    config?: TConfig,
  ): AxiosReturnResponse<TData, TConfig>;
  patch<TData = unknown, TBody = unknown, TConfig extends Config = Config>(
    url: string,
    body?: TBody,
    config?: TConfig,
  ): AxiosReturnResponse<TData, TConfig>;
  delete<TData = unknown, TConfig extends Config = Config>(
    url: string,
    config?: TConfig,
  ): AxiosReturnResponse<TData, TConfig>;
}
