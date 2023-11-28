import type { IAxiosClient, IAxiosClientConfig } from './IAxiosClient';
import type { IHttpClient } from './IHttpClient';

import { merge } from 'lodash-es';

export class HttpClient<Config extends IAxiosClientConfig> implements IHttpClient<Config> {
  private client: IAxiosClient<IAxiosClientConfig>;

  constructor(client: IAxiosClient<IAxiosClientConfig>) {
    this.client = client;
  }

  get<TData = unknown, TConfig extends Config = Config>(url: string, config?: TConfig) {
    return this.client.get<TData, TConfig>(url, config);
  }

  post<TData = unknown, TBody = unknown, TConfig extends Config = Config>(url: string, body: TBody, config?: TConfig) {
    return this.client.post<TData, TBody, TConfig>(url, body, config);
  }

  put<TData = unknown, TBody = unknown, TConfig extends Config = Config>(url: string, body?: TBody, config?: TConfig) {
    return this.client.put<TData, TBody, TConfig>(url, body, config);
  }

  patch<TData = unknown, TBody = unknown, TConfig extends Config = Config>(
    url: string,
    body?: TBody,
    config?: TConfig,
  ) {
    return this.client.patch<TData, TBody, TConfig>(url, body, config);
  }

  delete<TData = unknown, TConfig extends Config = Config>(url: string, config?: TConfig) {
    return this.client.delete<TData, TConfig>(url, this.configure(config));
  }

  private configure<TConfig = Config>(customConfig?: TConfig): TConfig {
    return { ...merge(this.client.config, customConfig) };
  }
}
