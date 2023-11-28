import type { IAxiosClient, IAxiosClientConfig } from './IAxiosClient';

export type IHttpClient<Config extends IAxiosClientConfig> = Omit<IAxiosClient<Config>, 'config'>;
