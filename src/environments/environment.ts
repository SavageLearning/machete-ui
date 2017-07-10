// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // dataUrl: 'https://test.machetessl.org',
  // authUrl: 'https://test.machetessl.org',
  dataUrl: 'http://localhost:63374',
  authUrl: 'https://localhost:44379/id'
};
