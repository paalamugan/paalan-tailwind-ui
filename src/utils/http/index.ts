import type { IAxiosClientConfig } from './IAxiosClient';

import { AxiosClient } from './AxiosClient';
import { HttpClient } from './HttpClient';

export const axiosDefaultConfig: IAxiosClientConfig = {};
export const httpClient = new HttpClient(new AxiosClient(axiosDefaultConfig));

export * from './HttpError';
export * from './exceptions';

export * from './types';
