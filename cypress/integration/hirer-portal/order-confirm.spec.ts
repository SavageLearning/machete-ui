import {
  ENV_KEY_ANY_SKILL,
  ENV_KEY_MACHETE_PAID_TRANSPORT_RULE,
  MACHETE_ADMIN,
  onlineOrderRoutes,
  WorkOrderConfirmSelectors,
} from "cypress/constants";
import {
  generateWorkAssignmentsStub,
  getExpectedCostForWorkerCount,
} from "cypress/utils";
import { LookupVM } from "machete-client";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { WorkAssignment } from "src/app/shared/models/work-assignment";
import { stepsToWorkAssignments } from "./work-assignments.spec";

let waInTest: WorkAssignment[];

const stepsToOrderConfirm = () => {
  // arrange base state
  const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
  if (anySkill === null || anySkill === undefined) throw new Error();
  const paidTransportRule = Cypress.env(
    ENV_KEY_MACHETE_PAID_TRANSPORT_RULE
  ) as TransportRule;
  waInTest = generateWorkAssignmentsStub(anySkill, paidTransportRule);
  cy.visit(onlineOrderRoutes.workAssignments, {
    onBeforeLoad: (win) => {
      win.sessionStorage.setItem(
        "machete.workassignments",
        JSON.stringify(waInTest)
      );
      win.sessionStorage.setItem(
        "machete.online-orders-service.workassignmentsconfirm",
        "true"
      );
    },
  });
};

describe("hirer portal - order confirm flow", () => {
  before(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.getFirstMachetePaidTransportRule();
    cy.getMacheteScheduleRules();
    cy.getMacheteTransportProviders();
    cy.getMacheteLookups();
    cy.apiGetEmployerProfile();
  });

  beforeEach(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    stepsToWorkAssignments();
    stepsToOrderConfirm();
  });

  afterEach(() => {
    cy.visit(onlineOrderRoutes.workAssignments, {
      onBeforeLoad: (win) => {
        // clear state: this clears all the work assignements
        win.sessionStorage.removeItem("machete.workassignments");
      },
    });
    cy.logout();
  });

  it("should compute correct transport fee", () => {
    let expectedCost: number = 0;
    for (let index = 0; index < waInTest.length; index++) {
      let cost = getExpectedCostForWorkerCount(
        index + 1,
        Cypress.env(ENV_KEY_MACHETE_PAID_TRANSPORT_RULE) as TransportRule
      );
      expectedCost = expectedCost + cost;
    }

    // assert
    cy.visit(onlineOrderRoutes.orderConfirm).contains("Review and Submit");
    cy.get(WorkOrderConfirmSelectors.transportCost).should(
      "have.text",
      `$${expectedCost}.00`
    );
  });

  it("should display helper text", () => {
    cy.visit(onlineOrderRoutes.orderConfirm).contains("Review and Submit");
    cy.contains("Please review your request summary below.");
    cy.contains("Not Submitted");
    cy.contains("JOBSITE INFORMATION");
    cy.contains("WHAT YOU PAY");
    cy.contains("Order Details");
    cy.contains("Jobs Requested");
    cy.contains("Review and submit");
  });

  it("should display paypal button when fees apply", () => {
    cy.visit(onlineOrderRoutes.orderConfirm).contains("Review and Submit");
    cy.get(WorkOrderConfirmSelectors.submit).click();
    cy.url().should("contains", "my-work-orders");
    cy.contains("ORDER #");
    // only visible when fee applies, which is the case case
    cy.get(WorkOrderConfirmSelectors.paypalButton).should("exist");
  });

  it("should display vaccine requirement flag", () => {
    cy.visit(onlineOrderRoutes.orderConfirm);
    const FIELD_SELECTOR = `table:first`;

    const FEILD_LABEL = `${FIELD_SELECTOR} .p-button-label`;

    cy.window().then((win) => {
      const wo = JSON.parse(win.sessionStorage.getItem("machete.workorder"));
      const arrangedWo = { ...wo, requireVaccinatedWorkers: true };
      win.sessionStorage.setItem(
        "machete.workorder",
        JSON.stringify(arrangedWo)
      );
    });
    cy.contains("Please review your request summary below.");
  });
});
