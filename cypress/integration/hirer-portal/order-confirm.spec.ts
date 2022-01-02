import {
  ENV_KEY_ANY_SKILL,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_PAID_TRANSPORT_RULE,
  MACHETE_ADMIN,
  onlineOrderRoutes,
  WorkOrderConfirmSelectors,
} from "cypress/constants";
import {
  generateWorkAssignmentsStub,
  getExpectedCostForWorkerCount,
} from "cypress/utils";
import { Lookup } from "src/app/lookups/models/lookup";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { WorkAssignment } from "src/app/shared/models/work-assignment";
import { stepsToWorkAssignments } from "./work-assignments.spec";

let waInTest: WorkAssignment[];

const stepsToOrderConfirm = () => {
  // arrange base state
  const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
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
    cy.getEmployerProfile();
    if (Cypress.env(ENV_KEY_MACHETE_EMPLOYER) == 0) {
      // if new employer
      console.log(Cypress.env(ENV_KEY_MACHETE_EMPLOYER));
      cy.fillOutEmployerProfile();
    }
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
});
