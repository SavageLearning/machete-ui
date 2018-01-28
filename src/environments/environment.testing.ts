export const environment = {
  name: 'testing',
  production: false,
  paypalID: 'AeabfiAbx3eY7bFZDsns0L4u77c4TE4cLuU8bZ4hWA1u9D5kVA2_KbBIJh3mIJcjJ96fGEckqoi9ynyr',
  dataUrl: '',
  authUrl: '/id',
  oidc_client_settings: {
    authority: '/id',
    client_id: 'machete-ui-local',
    redirect_uri: '/authorize',
    post_logout_redirect_uri: '',
    response_type: 'id_token token',
    scope: 'openid email roles api profile offline_access',
    silent_redirect_uri: '/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
