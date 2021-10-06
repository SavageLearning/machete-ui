// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): typeof login;
    logout(): typeof logout;
  }
}

function login(username: string, password: string): void {
  // console.warn(param);
  cy.visit('/');
  cy.url().should('includes', 'welcome');
  cy.get('button:contains("Log In / Sign Up")').click(); // !needs to be change-resilient
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('[type=submit]').click();
}

function logout(username: string, password: string): void {
  cy.clearCookie(".AspNetCore.Identity.Application");
}

// NOTE: You can use it like so:
Cypress.Commands.add("login", login);
Cypress.Commands.add("logout", logout);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
