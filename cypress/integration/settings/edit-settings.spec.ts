import { macheteSettingsRoutes, MACHETE_ADMIN } from "cypress/constants";
import { MS_NON_EDITABLE_CONFIGS_LOWER_CASE } from "src/app/configs/machete-settings/shared/machete-settings-constants";
import { Config } from "src/app/shared/models/config";

describe("machete settings edit", () => {
  const STUBBED_CONFGIS_KEY = "stubbed.configs";
  let userEditableConfigs: Config[];

  let privateConfigs: Config[];

  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);

    // Stubbing the response from server here
    cy.fixture("settings/settings.json");
    cy.intercept(
      {
        method: "GET",
        url: "/api/configs",
      },
      { fixture: "settings/settings" }
    ).as("configs");
    cy.visit(macheteSettingsRoutes.list);

    cy.wait("@configs").then((i) => {
      Cypress.env(STUBBED_CONFGIS_KEY, i.response.body.data);
      const configs = Cypress.env(STUBBED_CONFGIS_KEY) as Config[];

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

  it("text field when valid saves", () => {
    const nonTextFields = [
      "OnlineOrdersTerms",
      "DisableOnlineOrders",
      "DisableWorkersVaccineRequirement",
    ];
    userEditableConfigs.forEach((c: Config) => {
      if (!nonTextFields.includes(c.key)) {
        // mock response
        cy.intercept(
          {
            method: "PUT",
            url: "/api/configs/*",
          },
          (req) => {
            req.body = {}; // don't acctually change anything
            req.reply({
              statusCode: 200,
              body: { fixture: `settings/${c.key}.json` },
            });
          }
        ).as("edit");
        cy.visit(`${macheteSettingsRoutes.list}/${c.key}`);
        cy.get("#value").type(" anything");
        cy.get(`button[label="Save"]`).click();
        cy.get(`.p-confirm-popup-accept`).click();
        cy.wait("@edit").then((i) => {
          expect(i.request.body.value).to.contain("anything");
        });
      }
    });
  });

  it("text field when Invalid shows error", () => {
    const nonTextFields = [
      "OnlineOrdersTerms",
      "DisableOnlineOrders",
      "DisableWorkersVaccineRequirement",
    ];
    userEditableConfigs.forEach((c: Config) => {
      if (!nonTextFields.includes(c.key)) {
        cy.visit(`${macheteSettingsRoutes.list}/${c.key}`);
        cy.get("#value").clear();
        cy.get(`button[label="Save"]`).should("have.attr", "disabled");
        cy.get("small").contains("Value is required");
      }
    });
  });

  it("TERMS field adds & removes children", () => {
    const termField = ["OnlineOrdersTerms"];
    // Expect 3 divs. 2 divs for the stubbed 2 terms and one for the buttons
    const elementPerChild = 3;

    cy.visit(`${macheteSettingsRoutes.list}/${termField}`);
    cy.get("app-machete-settings-term-form")
      .find("div")
      .first()
      .children()
      .should("have.length", elementPerChild);
    cy.get(".p-button-info > .p-button-icon").click();

    cy.get("app-machete-settings-term-form")
      .find("div")
      .first()
      .children()
      .should("have.length", elementPerChild + 1);

    cy.get(".p-button-danger > .p-button-icon").click();
    cy.get("app-machete-settings-term-form")
      .find("div")
      .first()
      .children()
      .should("have.length", elementPerChild);
  });

  it("TERMS field when valid saves", () => {
    const termField = ["OnlineOrdersTerms"];
    const elementPerChild = 3;
  });

  it("errors when saving", () => {
    privateConfigs.forEach((c: Config) => {
      cy.visit(`${macheteSettingsRoutes.list}/${c.key}`);
      cy.get("#value").should("exist").type("test");
      cy.get(`button[label="Save"]`).click();
      cy.get("span.p-button-label");
      cy.get(`button[ng-reflect-label="Yes"]`).click();
      cy.contains("Action not allowed");
    });
  });
});
