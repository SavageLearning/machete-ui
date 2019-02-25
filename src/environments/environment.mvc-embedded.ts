// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'mvc-embedded',
  production: false,
  paypalID: '',
  dataUrl: 'https://localhost:4213',
  authUrl: 'https://localhost:4213/id',
  oidc_client_settings: {
    authority: 'https://localhost:4213/id',
    client_id: 'machete-ui-local-embedded',
    redirect_uri: 'https://localhost:4213/V2/authorize',
    post_logout_redirect_uri: 'https://localhost:4213/V2',
    response_type: 'id_token token',
    scope: 'openid email roles api profile',
    silent_redirect_uri: 'https://localhost:4213/V2/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true
  }
};
