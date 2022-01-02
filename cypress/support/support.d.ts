/// <reference types="cypress" />
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable {
    uiLogin(username: string, password: string): void;

    /**
     * Log in via network request. Cypress will set the cookie accross tests:
     * https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
     * @param username test user name
     * @param password test user password
     */
    apiLogin(username: string, password: string): void;

    logout(): void;
    /**
     * Should work with or without being authenticated
     */
    getMacheteConfigs(): void;
    /**
     * Should be called after authentication
     */
    getEmployerProfile(): void;
    /**
     * get Machete lookups and save in Cy env variable
     */
    getMacheteLookups(): void;
    /**
     * fills out employer profile with mock data
     * previous log in required. Should already be at route and with
     * specifi use case.
     */
    fillOutEmployerProfile(): void;
    /**
     * Requires: previous login with at least the hirer role
     * @param toggleState `"check" | "uncheck"`
     */
    toggleTerms(toggleState: string): void;
    /**
     * Should be called after authentication
     */
    getMacheteTransportRules(): void;
    /**
     * Gets the first transport rule with a cost and sets the record in the 
     * environment variable available through the key in the
     * `ENV_KEY_MACHETE_PAID_TRANSPORT_PROVIDER` constant
     */
     getFirstMachetePaidTransportRule(): void;
    /**
     * Should be called after authentication
     */
    getMacheteTransportProviders(): void;
    /**
     * wraps the Cypress.log(...) method to avoid repetition
     * @param method the method name that was executed
     * @param data data to print to console when the snapshot is clicked
     */
    /**
     * Gets the schedule rules
     * `ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES` constant
     */
     getMacheteScheduleRules(): void;
    logWrapper(method: string, data: any): void;
  }
}
