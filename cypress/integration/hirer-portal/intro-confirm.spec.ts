import {
  ENV_KEY_MACHETE_CONFIGS,
  ENV_KEY_MACHETE_EMPLOYER,
  MACHETE_ADMIN,
  onlineOrderRoutes,
} from "cypress/constants";
import { ConfigVM } from "machete-client";

const loadConfigs = () => Cypress.env(ENV_KEY_MACHETE_CONFIGS) as ConfigVM[];

describe("hirer portal - intro-comfirm - flow", () => {
  before(() => {
    cy.getMacheteConfigs();
  });

  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.getEmployerProfile();

    if (Cypress.env(ENV_KEY_MACHETE_EMPLOYER) == 0) {
      // if new employer
      console.log(Cypress.env(ENV_KEY_MACHETE_EMPLOYER));
      cy.fillOutEmployerProfile();
    }

    cy.enableOnlineOrdersSetting(loadConfigs());
  });

  //#region intro-comfirm
  it(`${onlineOrderRoutes.introConfirm} - should display conditions`, () => {
    cy.visit(onlineOrderRoutes.introConfirm);
    // !TODO eventually, these values will come from configs rather than being static
    cy.get(".p-datatable-tbody")
      .first()
      .should(
        "contain.text",
        `This order is not complete until I receive a confirmation email from Casa Latina.`
      );
    cy.get(`button[label="Confirm and proceed"]`).should("exist");
  });

  it(`${onlineOrderRoutes.introConfirm} - should check for accepted terms`, () => {
    cy.toggleTerms("uncheck");
    cy.get(`button[label="Confirm and proceed"]`)
      .should("exist")
      .should("have.attr", "disabled");

    cy.get("tr td p-checkbox").each(($el, index, $lis) => {
      cy.wrap($el).click();
    });
    cy.get(`button[label="Confirm and proceed"]`)
      .should("exist")
      .should("not.have.attr", "disabled");
  });

  it(`${onlineOrderRoutes.introConfirm} - should go to next step after terms accepted`, () => {
    cy.toggleTerms("uncheck");
    cy.get("tr td p-checkbox").each(($el, index, $lis) => {
      cy.wrap($el).click();
    });
    cy.get(`button[label="Confirm and proceed"]`).click();
    cy.url().should("include", onlineOrderRoutes.workOrders);
  });
});
