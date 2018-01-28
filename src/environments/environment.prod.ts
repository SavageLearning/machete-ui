export const environment = {
  name: 'prod',
  production: true,
  paypalID: 'ASP66lVOhFY2wgvyN_YKd3xtaARkgZtHZ9zwmkhO1DsmYtEfBnt0b5udf36mkBuFhvP7XTyKsgn9OiSm',
  dataUrl: 'https://api.machetessl.org',
  authUrl: 'https://identity.machetessl.org/id',
  baseRef: '/V2',
  oidc_client_settings: {
    authority: 'https://identity.machetessl.org/id',
    client_id: 'machete-ui-test',
    redirect_uri: 'https://casa.machetessl.org/V2/authorize',
    post_logout_redirect_uri: 'https://casa.machetessl.org/V2',
    response_type: 'id_token token',
    scope: 'openid email roles api profile',
    silent_redirect_uri: 'https://casa.machetessl.org/V2/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
