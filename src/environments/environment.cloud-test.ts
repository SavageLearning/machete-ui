export const environment = {
  name: 'cloud-test',
  production: true,
  dataUrl: 'https://api.machetessl.org',
  authUrl: 'https://identity.machetessl.org/id',
  oidc_client_settings: {
    authority: 'https://identity.machetessl.org/id',
    client_id: 'machete-ui-cloud-test',
    redirect_uri: 'https://test.machetessl.org/V2/authorize',
    post_logout_redirect_uri: 'https://test.machetessl.org/V2',
    response_type: 'id_token token',
    scope: 'openid email roles api profile',
    silent_redirect_uri: 'https://test.machetessl.org/V2/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
