import { getTodayPlus } from "cypress/utils";
import {
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES,
  ESCAPE_KEY,
  initConfirmCheckedTerms,
  MACHETE_ADMIN,
  onlineOrderRoutes,
  REMOTE_TEST_WAIT_MS,
} from "cypress/constants";
import * as faker from "faker";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";
import { WorkOrderSelectors } from "../../constants/hirer-portal-selectors";
import { Employer } from "src/app/shared/models/employer";

let fields: Partial<{
  key: string;
  val: string;
  skipCheckVal: boolean;
  checkParent: boolean;
}>[] = null;

export const stepsToWorkOrder = () => {
  cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
  cy.visit(onlineOrderRoutes.workOrders, {
    onBeforeLoad: (win) => {
      // turn off userguide
      win.sessionStorage.setItem("machete.work-order.component.UG", "false");
      win.sessionStorage.removeItem("machete.workorder");
      win.sessionStorage.setItem(
        // because this sets all terms as accepted
        "machete.online-orders-service.initialconfirm",
        JSON.stringify(initConfirmCheckedTerms)
      );
    },
  });
};

describe("hirer portal - work-orders - flow", () => {
  before(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.getMacheteTransportRules();
    cy.getMacheteTransportProviders();
    cy.apiGetEmployerProfile();
  });

  beforeEach(() => {
    stepsToWorkOrder();

    fields = [
      {
        key: WorkOrderSelectors.contacName,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["name"],
      },
      {
        key: WorkOrderSelectors.address1,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["address1"],
      },
      {
        key: WorkOrderSelectors.city,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["city"],
      },
      {
        key: WorkOrderSelectors.state,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["state"],
        checkParent: true,
      },
      {
        key: WorkOrderSelectors.zipcode,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["zipcode"],
        checkParent: true,
      },
      {
        key: WorkOrderSelectors.phone,
        val: Cypress.env(ENV_KEY_MACHETE_EMPLOYER)["phone"],
        checkParent: true,
      },
      {
        key: WorkOrderSelectors.description,
        skipCheckVal: true,
      },
    ];
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
    cy.get(`[data-mtest="users-guide-dialog"]`).should(
      "contain",
      "You may pick up the workers, or Casa Latina offers a transport program (fees apply)"
    );
    cy.get("p-footer > .p-element > .p-button-label").should("exist");
    cy.get("p-footer > .p-element > .p-button-label").click();
    cy.get("p-footer > .p-element > .p-button-label").should("not.exist");
  });

  it(`${onlineOrderRoutes.workOrders} - form should validate date and time`, () => {
    // date of work
    cy.get(WorkOrderSelectors.dow)
      .clear()
      .type("abcd") // alpha chars are invalid
      .parent()
      .parent()
      .should("have.class", "ng-invalid");
    filloutDateAndTime();
    cy.get(WorkOrderSelectors.dow) // correct date should not fail
      .parent()
      .parent()
      .should("not.have.class", "ng-invalid");
    cy.get(WorkOrderSelectors.dow).click();

    const dateText = getTodayPlus(3).dateText;
    cy.get(`p-calendar`) // selecting from calendar should not fail
      .find(".p-ripple")
      .each(($el, index, $lis) => {
        if ($el.val.toString() == dateText) {
          cy.wrap($el).click();
        }
      });
    cy.get(WorkOrderSelectors.dow)
      .should("have.value", getTodayPlus(3).text)
      .trigger("keydown", ESCAPE_KEY);

    // time of work
    cy.get(WorkOrderSelectors.tow)
      .trigger("keydown", ESCAPE_KEY)
      .clear()
      .type("abc") // alpha chars are invalid
      .trigger("keydown", ESCAPE_KEY)
      .parent()
      .parent()
      .should("have.class", "ng-invalid")
      .trigger("keydown", ESCAPE_KEY);
    filloutDateAndTime();
    cy.get(WorkOrderSelectors.tow) // correct date should not fail
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
    cy.get(WorkOrderSelectors.tow)
      .should("be.visible")
      .should("have.value", "10:00") // input should contain this val
      .trigger("keydown", ESCAPE_KEY);
  });

  it(`${onlineOrderRoutes.workOrders} form - required fail should add invalid class`, () => {
    // required fields should validate
    // required invalid class applied
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
          // .focus()
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
    cy.get(WorkOrderSelectors.dow).clear().trigger("keydown", ESCAPE_KEY);
    cy.get(WorkOrderSelectors.tow).clear().trigger("keydown", ESCAPE_KEY);
    cy.get(`button[type="submit"]`).click();
    // required Error messages
    fields.forEach((item) => {
      if (item.val !== undefined) {
        cy.get(item.key).clear();
      }
    });
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
    const overFlow =
      "mqaovtkwidbobqsrtlvejedifeupmhsowzvbmrxtzhnpyvuaufcefsmefocsfsfsdfsdfkbkjbkbkbkbkbwbneeyvlomjphznmgvzbuykxkpicnzrbuisfdasdf2";
    cy.get(WorkOrderSelectors.description).type(overFlow);
    cy.get(`button[type="submit"]`).click();
    cy.get("form").contains("Must be less than 100 characters");
    cy.get(WorkOrderSelectors.description).clear();
  });

  it(`${onlineOrderRoutes.workOrders} form - should save when data is valid`, () => {
    filloutDateAndTime();
    cy.get(WorkOrderSelectors.description).type(
      faker.random.alpha({ count: 100, upcase: false })
    );
    const rules = Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES);
    const transportProviders = Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDERS);
    selectWorkOrderPickUpMethod(transportProviders, rules);
    const zip = getFirstFreeProviderZip(rules);
    cy.get(WorkOrderSelectors.zipcode).clear().type(zip);
    cy.get(`button[type="submit"]`).click();
    cy.url().should("contain", onlineOrderRoutes.workAssignments);
  });

  describe(`${onlineOrderRoutes.workOrders} required vaccinated dropdown`, () => {
    it(`field should exist`, () => {
      cy.get(WorkOrderSelectors.vaccineReqDropdown).should("exist");
      cy.get(WorkOrderSelectors.vaccineReqDropdown)
        .parent()
        .parent()
        .parent()
        .contains("Do you prefer prefer vaccinated workers?");
    });

    it(`should update form when true on save`, () => {
      cy.wait(REMOTE_TEST_WAIT_MS);
      cy.get(WorkOrderSelectors.vaccineReqDropdown).click();
      cy.get(`.p-dropdown-items-wrapper`).within(() => {
        cy.get("span").each(($el, index, $lis) => {
          const spanText = $el.text();
          if (spanText === "yes") {
            cy.wrap($el).click();
            cy.log("spanText: ", spanText);
          }
        });
      });

      cy.get(WorkOrderSelectors.description).type("anything");
      filloutDateAndTime();

      const rules = Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES);
      const transportProviders = Cypress.env(
        ENV_KEY_MACHETE_TRANSPORT_PROVIDERS
      );
      selectWorkOrderPickUpMethod(transportProviders, rules);

      cy.get(`button[type="submit"]`).click();
      cy.window().then((win) => {
        const wo = win.sessionStorage.getItem("machete.workorder");
        cy.wrap(wo).should("contain", "**REQUIERE TRABAJADORES VACUNADXS**");
      });
    });
  });
});

export const selectWorkOrderPickUpMethod = (
  transportProviders: TransportProvider[],
  rules: TransportRule[]
): void => {
  cy.get(WorkOrderSelectors.tranportDropdown).click();
  const pickUpOption = getFreeTransportProvider(transportProviders, rules);
  cy.get(`.p-dropdown-items-wrapper`).within(() => {
    cy.get("span").each(($el, index, $lis) => {
      const spanText = $el.text();
      if (spanText === pickUpOption) {
        cy.wrap($el).click();
        cy.log(`${spanText} CLICKED`);
      } else {
        cy.log("OPTION NOT FOUND");
      }
    });
  });
  cy.get(WorkOrderSelectors.tranportDropdown).contains(pickUpOption);
  cy.get(WorkOrderSelectors.contacName).focus();
};

export const filloutDateAndTime = () => {
  cy.get(WorkOrderSelectors.dow)
    .trigger("keydown", ESCAPE_KEY)
    .clear()
    .type(getTodayPlus(3).text) // correct date should not fail
    .trigger("keydown", ESCAPE_KEY)
    .parent()
    .parent()
    .should("not.have.class", "ng-invalid")
    .trigger("keydown", ESCAPE_KEY);
  // cy.get(WorkOrderSelectors.dow).click();
  cy.get(WorkOrderSelectors.tow)
    .trigger("keydown", ESCAPE_KEY)
    .clear()
    .type("9:30") // correct date should not fail
    .parent()
    .parent()
    .should("not.have.class", "ng-invalid")
    .trigger("keydown", ESCAPE_KEY);
};

export const getFreeTransportProvider = (
  transportProviders: TransportProvider[],
  rules: TransportRule[]
): string => {
  // stablish values to use
  let pickupLUKey: string;
  let pickupOptionText: string;
  cy.log(JSON.stringify(rules));
  pickupLUKey = rules.find((item) => {
    return item.key.startsWith("pickup");
  }).lookupKey;
  pickupOptionText = transportProviders.find(
    (tp) => tp.key == pickupLUKey
  ).text;
  return pickupOptionText;
};

export const getFirstFreeProviderZip = (rules: TransportRule[]): string => {
  let firstZipMatch: string;
  let result: string;
  firstZipMatch = rules.find((tr) => tr.key.startsWith("pickup")).zipcodes[0];
  result = firstZipMatch.includes("*")
    ? rules[0].zipcodes.toString().split(",")[0]
    : firstZipMatch;
  cy.log("FIST ZIP", result);
  return result;
};
