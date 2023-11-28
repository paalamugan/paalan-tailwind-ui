import type { RedirectRequest } from '@azure/msal-browser';

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const MSAL_LOGIN_REQUEST: RedirectRequest = {
  scopes: ['User.Read.All', 'profile'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const MSAL_GRAPH_CONFIG = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
} as const;
