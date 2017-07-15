export const environment = {
  production: true,
  dataUrl: 'http://api.machetessl.org',
  authUrl: 'https://identity.machetessl.org/id',
  oidc_client_settings: {
    authority: 'https://identity.machetessl.org/id',
    client_id: 'machete-ui-local',
    redirect_uri: 'http://localhost:4200/auth.html',
    post_logout_redirect_uri: 'http://localhost:4200/index.html',
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
