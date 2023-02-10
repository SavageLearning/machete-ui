import {
  MACHETE_ADMIN,
  onlineOrderRoutes,
} from "cypress/constants";

describe("hirer portal - introduction - flow", () => {
  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.apiGetEmployerProfile();
  });

  //#region intro
  it(`${onlineOrderRoutes.introduction} should display intro`, () => {
    cy.visit(onlineOrderRoutes.introduction);
    // !TODO eventually, these values will come from configs rather than being static
    cy.get(".p-card-title").should("contain.text", "About Casa Latina");
    cy.get("p").should(
      "contain.text",
      "Casa Latina connects Latino immigrant workers with individuals and businesses looking for temporary labor. Our workers are skilled and dependable."
    );
  });

  it(`${onlineOrderRoutes.introConfirm} should display action buttons`, () => {
    cy.visit(onlineOrderRoutes.introduction);
    cy.get(".p-card-footer").find('button[label="Next"]').should("exist");
    cy.get(".p-card-footer").find('button[label="Start over"]').should("exist");
  });
});
