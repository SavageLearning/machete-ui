# MacheteUi

This project is the re-write of the UI for the [Machete project](https://github.com/savagelearning/machete). Currently we're using the issuer tracker at the Machete project site, but will migrate UI issues to this project soon.

## Development server

The project uses `ng serve` with the standard Angular CLI dev server. The environment is configured to use our cloud test server for identity and API calls.  You can authenticate with google or facebook for testing.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). I suggest using `ng test -sm=false` to make the error messages better.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the Machete app on `:4213`.
Naturally this also requires running the Angular app via `ng serve`.

## Further help
See the main project [Machete project](https://github.com/savagelearning/machete) for issue and project information.
