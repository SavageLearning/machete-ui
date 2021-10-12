import { MACHETE_ADMIN, MACHETE_USER } from "cypress/machete-constants";

describe("Login", () => {
  beforeEach(() => {
    cy.getMacheteConfigs();
  });

  it("should fail when credentials are incorrect", () => {
    cy.login(MACHETE_ADMIN.user, "BadPassword");
    cy.get("div .error-message").contains(
      "Error: Invalid username or password."
    );
  });
  it("should login when credentials are correct", () => {
    cy.login(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.get("inline-profile").find("span").contains(MACHETE_ADMIN.user);
  });

  it("should see center staff dashboard for non-hirer role", () => {
    cy.login(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.get("inline-profile").find("span").contains(MACHETE_ADMIN.user);
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Hire a Worker')"
    );
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Update Employer Profile')"
    );
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Hiring History')"
    );
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Machete Reports')"
    );
    cy.logout();
    cy.login(MACHETE_USER.user, MACHETE_USER.password);
    cy.get("inline-profile").find("span").contains(MACHETE_USER.user);
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Hire a Worker')"
    );
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Update Employer Profile')"
    );
    cy.get('[data-mtest="dashboard-links"]').get(
      "button:contains('Hiring History')"
    );
  });

  it("should display center info from db configs when authenticated", () => {
    cy.login(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    checkForWorkCenterDescription();
  });

  it("should display center info from db configs when  NOT authenticated", () => {
    checkForWorkCenterDescription();
  });
});

const checkForWorkCenterDescription = () => {
  const configs = Cypress.env("machete-configs");
  cy.get("[data-mtest=WorkCenterDescription_EN]").should(
    "have.html",
    configs.find(({ key }) => key === "WorkCenterDescription_EN").value
  );
};
