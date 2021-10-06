import { macheteAdmin, macheteUser } from "cypress/machete-constants";

describe("Login", () => {
  it("should fail when credentials are incorrect", () => {
    cy.login(macheteAdmin.user, "BadPassword");
    cy.get("div .error-message").contains(
      "Error: Invalid username or password."
    );
  });
  it("should login when credentials are correct", () => {
    cy.login(macheteAdmin.user, macheteAdmin.password);
    cy.get("inline-profile").find("span").contains("jadmin");
  });

  it("should see center staff dashboard for non-hirer role", () => {
    cy.login(macheteAdmin.user, macheteAdmin.password);
    cy.get("inline-profile").find("span").contains(macheteAdmin.user);
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Hire a Worker')");
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Update Employer Profile')");
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Hiring History')");
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Machete Reports')");
    cy.logout();
    cy.login(macheteUser.user, macheteUser.password);
    cy.get("inline-profile").find("span").contains(macheteUser.user);
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Hire a Worker')");
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Update Employer Profile')");
    cy.get('[data-mtest="dashboard-links"]').get("button:contains('Hiring History')");
  });
});
