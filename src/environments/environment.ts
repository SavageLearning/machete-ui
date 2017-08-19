export const environment = {
  name: 'dev',
  production: false,
  dataUrl: 'http://api.machetessl.org',
  authUrl: 'https://identity.machetessl.org/id',
  oidc_client_settings: {
    authority: 'https://identity.machetessl.org/id',
    client_id: 'machete-ui-local',
    redirect_uri: 'http://localhost:4200/authorize',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid email roles api profile',
    silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
