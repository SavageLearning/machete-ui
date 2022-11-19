// Not configurable by users
export const MS_NON_EDITABLE_CONFIGS: string[] = [
  "EmailServerHostName",
  "EmailServerPort",
  "EmailEnableSSL",
  "SmtpUser",
  "SmtpPassword",
  "EmailFromAddress",
  "true",
  "TimeZoneDifferenceFromPacific",
  "PayPalClientID",
  "PayPalUrl",
  "PayPalClientSecret",
  "PayPalEnvironment",
  "MicrosoftTimeZoneIndex",
  "FacebookAppId",
  "GoogleClientId",
  "OAuthStateParameter",
];

export const MS_NON_EDITABLE_CONFIGS_LOWER_CASE: string[] = [
  ...MS_NON_EDITABLE_CONFIGS,
].map((key) => key.toLowerCase());
