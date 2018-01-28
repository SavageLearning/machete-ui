export const environment = {
  name: 'dev',
  paypalID: 'AeabfiAbx3eY7bFZDsns0L4u77c4TE4cLuU8bZ4hWA1u9D5kVA2_KbBIJh3mIJcjJ96fGEckqoi9ynyr',
  production: false,
  dataUrl: 'https://test-api.machetessl.org',
  authUrl: 'https://test-identity.machetessl.org/id',
  oidc_client_settings: {
    authority: 'https://test-identity.machetessl.org/id',
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
