// @ts-check
///<reference path="./support.d.ts" />

import {
  ENV_KEY_MACHETE_CONFIGS,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES,
  MACHETE_ADMIN,
  onlineOrderRoutes,
} from "cypress/constants";

import { TransportRule } from "../../src/app/online-orders/shared/models/transport-rule";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";

// Add all the commands below to the support.d.ts Chainable interface

function login(username: string, password: string): void {
  cy.visit("/");
  cy.url().should("includes", "welcome");
  cy.get('button:contains("Log In / Sign Up")').click(); // !needs to be change-resilient
  cy.log(`Loggin in: ${username}`);
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get("[type=submit]").click();
}

function getMacheteConfigs(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/configs`;
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body["data"]).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as Object[];
    // look for a config value
    const theConfig = data.map(
      (config) => config["key"] === "DisableOnlineOrders"
    );
    // At least one should be there
    expect(theConfig).to.include(true);
    Cypress.env(ENV_KEY_MACHETE_CONFIGS, data);
  });
}

function getMacheteTransportRules(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/TransportRules`;
  cy.getCookie(".AspNetCore.Identity.Application").should('exist');
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data;
    // data.map((o) => {
    //   return new TransportRule({key: o.key, lookupKey: o.lookupKey});
    // });
    Cypress.log({
      message: "getMacheteTransportRules()",
      name: "getMacheteTransportRules()",
      displayName: "getMacheteTransportRules()",
      consoleProps: () => {
        // return an object which will
        // print to dev tools console on click
        return {
          Key: "getMacheteTransportRules()",
          Value: data,
        };
      },
    });
    Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES, data);
  });
}

function getMacheteTransportProviders(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/TransportProviders`;
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as TransportProvider[];
    Cypress.log({
      message: "getMacheteTransportProviders()",
      name: "getMacheteTransportProviders()",
      displayName: "getMacheteTransportProviders()",
      consoleProps: () => {
        // return an object which will
        // print to dev tools console on click
        return {
          Key: "getMacheteTransportProviders()",
          Value: data,
        };
      },
    });
    Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDERS, data);
  });
}

function getEmployerProfile(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/employers/profile`;
  cy.request({ url: endpoint, failOnStatusCode: true }).then((response) => {
    // look for a employer value
    const employer = response.body.data;
    expect(employer).not.to.eq(undefined);
    expect(response.body["data"]).to.not.be.null.and.not.be.undefined;
    Cypress.log({
      message: "getEmployerProfile()",
      name: "getEmployerProfile()",
      displayName: "getEmployerProfile()",
      consoleProps: () => {
        // return an object which will
        // print to dev tools console on click
        return {
          Key: "getEmployerProfile()",
          Value: response.body.data,
        };
      },
    });
    Cypress.env(ENV_KEY_MACHETE_EMPLOYER, response.body.data);
  });
}

function fillOutEmployerProfile(): void {
  // name
  const name = "#name";
  cy.get(name).type("fake Employer");

  // phone number
  const phone = "#phone";
  cy.get(phone).type("1234567891");

  // address
  const address = "#address1";
  cy.get(address).type("fake address");

  // City
  const city = "#city";
  cy.get(city).type("gotham city");

  // state
  const state = "#state";
  cy.get(state).type("WA");

  // zip
  const zip = "#zipcode";
  cy.get(zip).type("98122");
  cy.get(`[type="submit"`).click();
  cy.url().should("include", "online-orders/introduction");
}

function logout(): void {
  cy.clearCookie(".AspNetCore.Identity.Application");
}

function toggleTerms(toggleState: "check" | "uncheck" = "uncheck"): void {
  cy.visit(onlineOrderRoutes.introConfirm);
  cy.get(`input[type="checkbox"]`).each(($el, index, $lis) => {
    const child = $el.children("div").first();
    if (child.has(`aria-checked="true"`)) {
      if (toggleState === "uncheck") cy.wrap($el).uncheck({ force: true });
      if (toggleState === "check") cy.wrap($el).check({ force: true });
    }
  });
}

// NOTE: You can use it like so:
Cypress.Commands.add("login", login);
Cypress.Commands.add("logout", logout);
Cypress.Commands.add("getMacheteConfigs", getMacheteConfigs);
Cypress.Commands.add("getEmployerProfile", getEmployerProfile);
Cypress.Commands.add("fillOutEmployerProfile", fillOutEmployerProfile);
Cypress.Commands.add("toggleTerms", toggleTerms);
Cypress.Commands.add("getMacheteTransportRules", getMacheteTransportRules);
Cypress.Commands.add(
  "getMacheteTransportProviders",
  getMacheteTransportProviders
);
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
