import { ENV_KEY_MACHETE_EMPLOYER, MACHETE_ADMIN } from "cypress/constants";
import { Employer } from "src/app/shared/models/employer";

describe("employers profile", () => {
  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.apiGetEmployerProfile();
  });

  it("should display username", () => {
    cy.visit("/employers");
    const employerProfile = Cypress.env(ENV_KEY_MACHETE_EMPLOYER) as Employer;
    cy.get(`[id="name"]`).should("have.value", employerProfile.name);
  });

  it("form should validate", () => {
    cy.visit("/employers");
    const employer = Cypress.env(ENV_KEY_MACHETE_EMPLOYER);

    // name
    const name = "#name";
    cy.get(name).clear().type("fake Employer");
    cy.get(name).should("not.have.class", "ng-invalid");
    cy.get(name).clear();
    cy.get(name).should("have.class", "ng-invalid");

    // phone number
    const phone = "#phone";
    cy.get(phone).clear().type("1234567891");
    cy.get(phone).parent().should("not.have.class", "ng-invalid");
    cy.get(phone).clear();
    cy.get(phone).parent().should("have.class", "ng-invalid");
    cy.get(phone).type("asdfasdf");
    cy.get(phone).parent().should("have.class", "ng-invalid");
    cy.get(phone).type("1234567");
    cy.get(phone).parent().should("have.class", "ng-invalid");

    // address
    const address = "#address1";
    cy.get(address).clear().type("fake address");
    cy.get(address).should("not.have.class", "ng-invalid");
    cy.get(address).clear();
    cy.get(address).should("have.class", "ng-invalid");

    // City
    const city = "#city";
    cy.get(city).clear().type("gotham city");
    cy.get(city).should("not.have.class", "ng-invalid");
    cy.get(city).clear();
    cy.get(city).should("have.class", "ng-invalid");

    // state
    const state = "#state";
    cy.get(state).clear().type("WA");
    cy.get(state).parent().should("not.have.class", "ng-invalid");
    cy.get(state).clear();
    cy.get(state).parent().should("have.class", "ng-invalid");
    cy.get(state).type("12");
    cy.get(state).parent().should("have.class", "ng-invalid");

    // zip
    const zip = "#zipcode";
    cy.get(zip).clear().type("98122");
    cy.get(zip).parent().should("not.have.class", "ng-invalid");
    cy.get(zip).clear();
    cy.get(zip).type("98122-1234");
    cy.get(zip).parent().should("not.have.class", "ng-invalid");
    cy.get(zip).clear();
    cy.get(zip).type("asdfasdf");
    cy.get(state).focus();
    cy.get(zip).parent().should("have.class", "ng-invalid");

    // required error message
    cy.get("div .p-input-filled input").clear({ force: true });
    cy.get(`[type="submit"`).click();
    const form = "form";
    cy.get(form).contains("Name is required");
    cy.get(form).contains("Phone is required in 999-999-9999 format");
    cy.get(form).contains("Address is required");
    cy.get(form).contains("City is required");
    cy.get(form).contains("State is required State must be two letters");
    cy.get(form).contains("zipcode is required");
  });

  it("should navigate to hire worker form on save", () => {
    cy.visit("/employers");
    const employer: Employer = Cypress.env(ENV_KEY_MACHETE_EMPLOYER);
    cy.get("#name").should("contain.value", employer.name);
    cy.get(`[type="submit"]`).should("exist").click();
    cy.url().should("include", "online-orders/introduction");
  });
});
