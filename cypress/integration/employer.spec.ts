import { wordToTitleCase } from "cypress/helpers";
import { MACHETE_ADMIN } from "cypress/machete-constants";

describe("employers", () => {
  beforeEach(() => {
    cy.login(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.visit("/employers");
    cy.getEmployerProfile();
  });
  it("should display username", () => {
    cy.get(`[id="name"]`).should(
      "have.value",
      wordToTitleCase(MACHETE_ADMIN.user)
    );
  });

  it("should validate", () => {
    const employer = Cypress.env("machete-employer");

    // name
    const nameSelector = "#name";
    cy.get(nameSelector).clear();
    cy.get(nameSelector).should("have.class", "ng-invalid");
    cy.get(nameSelector).type(employer.name);
    cy.get(nameSelector).should("not.have.class", "ng-invalid");

    // phone number
    const phoneSelector = "#phone";
    cy.get(phoneSelector).clear();
    cy.get(phoneSelector).parent().should("have.class", "ng-invalid");
    cy.get(phoneSelector).type(employer.phone.replace("-", "")); // to get over the mask
    cy.get(phoneSelector).parent().should("not.have.class", "ng-invalid");

    // address
    const addressSelector = "#address1";
    cy.get(addressSelector).clear();
    cy.get(addressSelector).should("have.class", "ng-invalid");
    cy.get(addressSelector).type(employer.address1);
    cy.get(addressSelector).should("not.have.class", "ng-invalid");
  });
});
