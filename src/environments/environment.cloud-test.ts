export const environment = {
  name: 'cloud-test',
  production: true,
  paypalID: 'AeabfiAbx3eY7bFZDsns0L4u77c4TE4cLuU8bZ4hWA1u9D5kVA2_KbBIJh3mIJcjJ96fGEckqoi9ynyr',
  dataUrl: 'https://test-api.machetessl.org',
  authUrl: 'https://test-identity.machetessl.org/id',
  oidc_client_settings: {
    authority: 'https://test-identity.machetessl.org/id',
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
