// @ts-check
///<reference path="./support.d.ts" />

import {
  ENV_KEY_ANY_SKILL,
  ENV_KEY_MACHETE_CONFIGS,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_LOOKUPS,
  ENV_KEY_MACHETE_PAID_TRANSPORT_RULE,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES,
  ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES,
  onlineOrderRoutes,
} from "cypress/constants";

import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";
import { LookupVM, ConfigVM } from "machete-client";
import { Employer } from "src/app/shared/models/employer";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { ScheduleRule } from "src/app/online-orders/shared/models/schedule-rule";

// Add all the commands below to the support.d.ts Chainable interface

function uiLogin(username: string, password: string): void {
  cy.visit("/");
  cy.url().should("includes", "welcome");
  cy.get(`.p-m-2 > .p-element`).click(); // !needs to be change-resilient
  cy.log(`Loggin in: ${username}`);
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get("[type=submit]").click();
}

function apiLogin(username: string, password: string): void {
  const endpoint = `${Cypress.env("macheteLegacyUrl")}/id/login`;
  cy.request("POST", endpoint, {
    password: password,
    userName: username,
    remember: true,
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.getCookie(".AspNetCore.Identity.Application").should("exist");
  });
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
    expect(theConfig).to.not.null;
    Cypress.env(ENV_KEY_MACHETE_CONFIGS, data);
  });
}

function getMacheteTransportRules(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/TransportRules`;
  cy.getCookie(".AspNetCore.Identity.Application").should("exist");
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data;
    logWrapper("getMacheteTransportRules()", data);
    Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES, data);
  });
}

function getFirstMachetePaidTransportRule(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/TransportRules`;
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as TransportRule[];
    const firstPaidRule = data.find(
      (tr) => tr.costRules.find((cr) => cr.cost > 0).id !== undefined
    );
    logWrapper("getFirstMachetePaidTransportRule()", firstPaidRule);
    Cypress.env(ENV_KEY_MACHETE_PAID_TRANSPORT_RULE, firstPaidRule ?? 0);
  });
}

function getMacheteScheduleRules(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/ScheduleRules`;
  cy.getCookie(".AspNetCore.Identity.Application").should("exist");
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as ScheduleRule[];
    logWrapper("getMacheteScheduleRules()", data);
    Cypress.env(ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES, data);
  });
}

function getMacheteTransportProviders(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/TransportProviders`;
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as TransportProvider[];
    logWrapper("getMacheteTransportProviders()", data);
    Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDERS, data);
  });
}

function getEmployerProfile(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/employers/profile`;
  cy.request({
    url: endpoint,
    failOnStatusCode: false,
    followRedirect: false,
  }).then((response) => {
    // look for a employer value
    // when employer hasn't first filled out thier profile, api returns 401
    if (response.status == 200) {
      expect(response.body).haveOwnProperty("data");
      const employer = response.body.data as Employer;
      expect(employer).to.not.be.null.and.not.be.undefined;
      logWrapper("getEmployerProfile()", employer);
      Cypress.env(ENV_KEY_MACHETE_EMPLOYER, employer);
    } else {
      Cypress.env(ENV_KEY_MACHETE_EMPLOYER, 0);
      logWrapper("getEmployerProfile()", 0);
    }
  });
}

function enableOnlineOrdersSetting(configs: ConfigVM[]): void {
  const { id, value } = configs.filter(
    (config: ConfigVM) => config.key === "DisableOnlineOrders"
  )[0];
  expect(id).not.null;
  const disableOnlineOrdersConfig = {
    id: id,
    key: "DisableOnlineOrders",
    value: "FALSE",
    description:
      "Enter either TRUE or FALSE. Enter TRUE to turn off access to the online hiring portal",
    category: "OnlineOrders",
    publicConfig: true,
    createdby: "Init T. Script",
    datecreated: "2023-01-06T22:25:14.18",
    dateupdated: "2023-01-06T22:25:14.18",
    updatedby: "Init T. Script",
  };

  if (value === "TRUE") {
    cy.request(
      "PUT",
      `${Cypress.env("macheteApiUrl")}/configs/${id}`,
      disableOnlineOrdersConfig
    ).then(() => {
      cy.getMacheteConfigs();
    });
  }
}

function getMacheteLookups(): void {
  const endpoint = `${Cypress.env("macheteApiUrl")}/Lookups`;
  cy.request(endpoint).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.data).to.not.be.null.and.not.be.undefined;
    const data = response.body.data as LookupVM[];
    logWrapper("getMacheteLookups()", data);
    Cypress.env(ENV_KEY_MACHETE_LOOKUPS, data);

    const anySkill: LookupVM = data.find((lu) => lu.category.includes("skill"));
    Cypress.env(ENV_KEY_ANY_SKILL, anySkill);
  });
}

function fillOutEmployerProfile(): void {
  // name
  const name = "#name";
  cy.get(name).clear().type("fake Employer");

  // phone number
  const phone = "#phone";
  cy.get(phone).clear().type("1234567891");

  // address
  const address = "#address1";
  cy.get(address).clear().type("fake address");

  // City
  const city = "#city";
  cy.get(city).clear().type("gotham city");

  // state
  const state = "#state";
  cy.get(state).clear().type("WA");

  // zip
  const zip = "#zipcode";
  cy.get(zip).clear().type("98122");
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

function logWrapper(message: string, data: any) {
  Cypress.log({
    message: message,
    name: message,
    displayName: message,
    consoleProps: () => {
      // return an object which will
      // print to dev tools console on click
      return {
        Key: message,
        Value: data,
      };
    },
  });
}

// NOTE: You can use it like so:
Cypress.Commands.add("uiLogin", uiLogin);
Cypress.Commands.add("apiLogin", apiLogin);
Cypress.Commands.add("logout", logout);
Cypress.Commands.add("getMacheteConfigs", getMacheteConfigs);
Cypress.Commands.add("getEmployerProfile", getEmployerProfile);
Cypress.Commands.add("enableOnlineOrdersSetting", enableOnlineOrdersSetting);
Cypress.Commands.add("getMacheteLookups", getMacheteLookups);
Cypress.Commands.add("fillOutEmployerProfile", fillOutEmployerProfile);
Cypress.Commands.add("toggleTerms", toggleTerms);
Cypress.Commands.add("getMacheteTransportRules", getMacheteTransportRules);
Cypress.Commands.add(
  "getFirstMachetePaidTransportRule",
  getFirstMachetePaidTransportRule
);
Cypress.Commands.add(
  "getMacheteTransportProviders",
  getMacheteTransportProviders
);
Cypress.Commands.add("getMacheteScheduleRules", getMacheteScheduleRules);
Cypress.Commands.add("logWrapper", logWrapper);
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
