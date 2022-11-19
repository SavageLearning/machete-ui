import {
  ENV_KEY_MACHETE_CONFIGS,
  macheteSettingsRoutes,
  MACHETE_ADMIN,
} from "cypress/constants";
import { Config } from "src/app/shared/models/config";
import { MS_NON_EDITABLE_CONFIGS_LOWER_CASE } from "src/app/configs/machete-settings/shared/machete-settings-constants";

describe("machete settings list", () => {
  let userEditableConfigs: Config[];

  let privateConfigs: Config[];

  let configs: Config[];

  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);

    // wait for data to load
    cy.intercept({
      method: "GET",
      url: "/api/configs",
    }).as("configs");

    cy.getMacheteConfigs();
    cy.visit(macheteSettingsRoutes.list);

    cy.wait("@configs").then(() => {
      configs = Cypress.env(ENV_KEY_MACHETE_CONFIGS) as Config[];
      userEditableConfigs = configs.filter(
        (c: Config) =>
          c.publicConfig &&
          !MS_NON_EDITABLE_CONFIGS_LOWER_CASE.includes(c.key.toLowerCase())
      );

      privateConfigs = configs.filter(
        (c: Config) =>
          !c.publicConfig &&
          MS_NON_EDITABLE_CONFIGS_LOWER_CASE.includes(c.key.toLowerCase())
      );
    });

  });

  it("when list loads, should display table", () => {
    cy.visit(macheteSettingsRoutes.list);
    cy.get("table")
      .should("be.visible")
      .should("have.class", "p-datatable-table");
  });
  it("when list loads, results should contain user-editable configs", () => {
    cy.visit(macheteSettingsRoutes.list);

    userEditableConfigs.forEach((c: Config) => {
      cy.get("input").type(c.key);
      cy.get("table").should("contain.text", c.key);
      cy.get("input").clear();
    });

    privateConfigs.forEach((c: Config) => {
      cy.get("input").type(c.key);
      cy.get("table").should("not.contain.text", c.key);
      cy.get("input").clear();
    });
  });
});

describe("when record selected", () => {
  it("should navigate to detail page", () => {
    cy.contains("OrganizationName").click();
    cy.url().should(
      "include",
      `${macheteSettingsRoutes.list}/OrganizationName`
    );
  });
});
