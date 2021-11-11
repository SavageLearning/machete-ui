/// <reference types="cypress" />
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<void>;
    logout(): Chainable<void>;
    /**
     * Should work with or without being authenticated
     */
    getMacheteConfigs(): Chainable<void>;
    /**
     * Should be called after authentication
     */
    getEmployerProfile(): Chainable<void>;
    /**
     * fills out employer profile with mock data
     * previous log in required. Should already be at route and with
     * specifi use case.
     */
    fillOutEmployerProfile(): Chainable<void>;
    /**
     * Requires: previous login with at least the hirer role
     * @param toggleState `"check" | "uncheck"`
     */
    toggleTerms(toggleState: string): Chainable<void>;
    /**
     * Should be called after authentication
     */
    getMacheteTransportRules(): Chainable<void>;
    /**
     * Should be called after authentication
     */
    getMacheteTransportProviders(): Chainable<void>;
  }
}
