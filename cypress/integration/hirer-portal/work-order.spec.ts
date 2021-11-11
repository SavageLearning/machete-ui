import { getTodayPlus } from "cypress/utils";
import {
  ENV_KEY_MACHETE_CONFIGS,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES,
  ESCAPE_KEY,
  MACHETE_ADMIN,
  onlineOrderRoutes,
} from "cypress/constants";
import * as faker from "faker";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";

let fields: Partial<{
  key: string;
  val: string;
  skipCheckVal: boolean;
  checkParent: boolean;
}>[] = null;

const dow: string = "#dateOfWork > .p-calendar > .p-inputtext";
const tow: string = "#timeOfWork > .p-calendar > .p-inputtext";
const contacName: string = `input[id="contactName"]`;
const address1: string = `input[id="worksiteAddress1"]`;
const city: string = `input[id="city"]`;
const state: string = `input[id="state"]`;
const zipcode: string = `input[id="zipcode"]`;
const phone: string = `input[id="phone"]`;
const description: string = `textarea[id="description"]`;

describe("hirer portal - work-orders - flow", () => {
  beforeEach(() => {
    cy.login(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.getMacheteTransportRules();
    cy.getMacheteTransportProviders();
    cy.getEmployerProfile();
    if (Cypress.env(ENV_KEY_MACHETE_EMPLOYER) == 0) {
      // if new employer
      console.log(Cypress.env(ENV_KEY_MACHETE_EMPLOYER));
      cy.fillOutEmployerProfile();
    }

    cy.toggleTerms("check");
    cy.visit(onlineOrderRoutes.workOrders, {
      onBeforeLoad: (win) => {
        // removes session entry that avoids re-displaying the dialog
        win.sessionStorage.removeItem("machete.work-order.component.UG");
      },
    });
    cy.get("p-footer > .p-element > .p-button-label").click();
  });

  //#region work-orders
  it(`${onlineOrderRoutes.workOrders} - should show instructions dialog on first view`, () => {
    cy.visit(onlineOrderRoutes.introConfirm, {
      onBeforeLoad: (win) => {
        // removes session entry that avoids re-displaying the dialog
        win.sessionStorage.removeItem("machete.work-order.component.UG");
      },
    });
    cy.get(`button[label="Confirm and proceed"]`).click();
    cy.url().should("contain", onlineOrderRoutes.workOrders);
    // !TODO make dynamic
    cy.get(".p-dialog-content > .ng-tns-c43-12").should(
      "contain",
      "You may pick up the workers, or Casa Latina offers a transport program (fees apply)"
    );
    cy.get("p-footer > .p-element > .p-button-label").should("exist");
    cy.get("p-footer > .p-element > .p-button-label")
      .click()
      .should("not.exist");
  });

  it(`${onlineOrderRoutes.workOrders} - form should validate date and time`, () => {
    // date of work
    cy.get(dow)
      .type("abcd") // alpha chars are invalid
      .parent()
      .parent()
      .should("have.class", "ng-invalid");
    cy.get(dow)
      .trigger("keydown", ESCAPE_KEY)
      .clear()
      .type(getTodayPlus(3).text) // correct date should not fail
      .parent()
      .parent()
      .should("not.have.class", "ng-invalid");
    cy.get(dow).click();

    const dateText = getTodayPlus(3).dateText;
    cy.get(`p-calendar`) // selecting from calendar should not fail
      .find(".p-ripple")
      .each(($el, index, $lis) => {
        if ($el.val.toString() == dateText) {
          cy.wrap($el).click();
        }
      });
    cy.get(dow)
      .should("have.value", getTodayPlus(3).text)
      .trigger("keydown", ESCAPE_KEY);

    // time of work
    cy.get(tow)
      .focus()
      .type("abc") // alpha chars are invalid
      .parent()
      .parent()
      .should("have.class", "ng-invalid")
      .trigger("keydown", ESCAPE_KEY);

    cy.get(tow)
      .clear()
      .type("9:30") // correct date should not fail
      .parent()
      .parent()
      .should("not.have.class", "ng-invalid")
      .clear()
      .trigger("keydown", ESCAPE_KEY);

    cy.get(`#timeOfWork > .p-calendar > .p-datepicker-trigger > .p-button-icon`)
      // selecting from calendar should not fail
      .click(); // open time selector
    cy.get(".p-timepicker > .p-hour-picker button")
      .first()
      .should("be.visible")
      .click(); // click on up HOUR arrow
    cy.get(tow)
      .should("be.visible")
      .should("have.value", "10:00") // input should contain this val
      .trigger("keydown", ESCAPE_KEY);
  });

  it(`${onlineOrderRoutes.workOrders} form - required fail should add invalid class`, () => {
    // required fields should validate
    // required invalid class applied
    fields = [
      {
        key: contacName,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["name"],
      },
      {
        key: address1,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["address1"],
      },
      {
        key: city,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["city"],
      },
      {
        key: state,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["state"],
        checkParent: true,
      },
      {
        key: zipcode,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["zipcode"],
        checkParent: true,
      },
      {
        key: phone,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["phone"],
        checkParent: true,
      },
      {
        key: description,
        skipCheckVal: true,
      },
    ];

    fields.forEach((item) => {
      if (!item.skipCheckVal) {
        // with default values to check
        cy.get(item.key).should("have.value", item.val);
      } else {
        // add some initial text
        cy.get(item.key).type("abc");
      }
      if (item.checkParent) {
        cy.get(item.key).parent().should("not.have.class", "ng-invalid");
        cy.get(item.key)
          .focus()
          .clear() // required case
          .blur()
          .parent()
          .should("have.class", "ng-invalid");
      } else {
        cy.get(item.key).should("not.have.class", "ng-invalid");
        cy.get(item.key)
          .focus()
          .clear() // required case
          .blur()
          .should("have.class", "ng-invalid");
      }

      // return to original state
      if (item.val !== undefined) {
        cy.get(item.key).type(item.val);
      }
    });
  });

  it(`${onlineOrderRoutes.workOrders} form - required fail should display error message`, () => {
    // required Error messages
    fields.forEach((item) => {
      if (item.val !== undefined) {
        cy.get(item.key).clear();
      }
    });
    cy.get(dow).clear().trigger("keydown", ESCAPE_KEY);
    cy.get(tow).clear().trigger("keydown", ESCAPE_KEY);
    cy.get(`button[type="submit"]`).click();
    cy.get("form").contains("Date & time is required.");
    cy.get("form").contains("Contact name is required");
    cy.get("form").contains("Address is required");
    cy.get("form").contains("City is required.");
    cy.get("form").contains("State is required. State must be two letters");
    cy.get("form").contains("Zipcode is required.");
    cy.get("form").contains("Phone is required in ###-###-#### format");
    cy.get("form").contains("Description is required");
    cy.get("form").contains("A transport method is required");
  });

  it(`${onlineOrderRoutes.workOrders} form - should validate description max length`, () => {
    cy.get(description)
      .type(faker.random.alpha({ count: 101, upcase: false }))
      .click();
    cy.get(`button[type="submit"]`).click();
    cy.get("form").contains("Must be less than 100 characters");
    cy.get(description).clear();
  });

  it(`${onlineOrderRoutes.workOrders} form - should save when data is valid`, () => {
    cy.get(description).type(faker.random.alpha({ count: 100, upcase: false }));
    cy.get(`#pr_id_6_label`).click();

    const pickUpOption = getTransportFreeProvider();
    cy.get(`.p-dropdown-items-wrapper`).within(() => {
      cy.get("span").each(($el, index, $lis) => {
        const spanText = $el.text();
        if (spanText === pickUpOption) {
          cy.wrap($el).click();
        } else {
          cy.log("OPTION NOT FOUND");
        }
      });
    });
    cy.get(`#pr_id_6_label`).contains(pickUpOption);
    cy.get(`button[type="submit"]`).click();
  });

  const getTransportFreeProvider = (): string => {
    // stablish values to use
    let rules: TransportRule[];
    let pickupLUKey: string;
    let transportProviders: TransportProvider[];
    let pickupOptionText: string;
    rules =
      (Cypress.env(
        ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES
      ) as TransportRule[]) || [];
    cy.log(JSON.stringify(rules));
    pickupLUKey = rules.find((item) => {
      return item.key === "pickup";
    }).lookupKey;
    transportProviders = Cypress.env(
      ENV_KEY_MACHETE_TRANSPORT_PROVIDERS
    ) as TransportProvider[];
    pickupOptionText = transportProviders.find(
      (tp) => tp.key == pickupLUKey
    ).text;
    return pickupOptionText;
  };
});
