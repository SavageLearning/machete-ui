import {
  ENV_KEY_ANY_SKILL,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_PAID_TRANSPORT_RULE,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES,
  initConfirmCheckedTerms,
  MACHETE_ADMIN,
  onlineOrderRoutes,
  REMOTE_TEST_WAIT_MS,
} from "cypress/constants";
import {
  stringToTitleCase,
  generateWorkOrderStub,
} from "cypress/utils/helpers";
import * as faker from "faker";
import { LookupVM } from "machete-client";
import { ScheduleRule } from "src/app/online-orders/shared/models/schedule-rule";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { Employer } from "src/app/shared/models/employer";
import { WorkAssignmentSelectors } from "../../constants/hirer-portal-selectors";

export const stepsToWorkAssignments = () => {
  const employerProfile = Cypress.env(ENV_KEY_MACHETE_EMPLOYER) as Employer;
  const transportProviders = Cypress.env(
    ENV_KEY_MACHETE_TRANSPORT_PROVIDERS
  ) as TransportProvider[];
  const paidTransportRule = Cypress.env(
    ENV_KEY_MACHETE_PAID_TRANSPORT_RULE
  ) as TransportRule;
  const scheduleRules = Cypress.env(
    ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES
  ) as ScheduleRule[];

  const wo = generateWorkOrderStub(
    employerProfile,
    transportProviders,
    paidTransportRule,
    scheduleRules
  );

  cy.logWrapper("stub Work Order", wo);

  cy.visit(onlineOrderRoutes.introConfirm, {
    onBeforeLoad: (win) => {
      win.sessionStorage.setItem(
        // because this sets all terms as accepted
        "machete.online-orders-service.initialconfirm",
        JSON.stringify(initConfirmCheckedTerms)
      );
      win.sessionStorage.setItem(
        "machete.work-order.component.UG",
        // to always show the work order userguide
        "false"
      );
      win.sessionStorage.setItem("machete.workorder", JSON.stringify(wo));
      win.sessionStorage.setItem(
        "machete.online-orders-service.workorderconfirm",
        true.toString()
      );
      // clear state: this clears all the work assignements
      win.sessionStorage.removeItem("machete.workassignments");
    },
  });
  cy.visit(onlineOrderRoutes.workAssignments);
  cy.url().should("contain", onlineOrderRoutes.workAssignments);
};

describe("hirer portal - work-assignments - flow", () => {
  before(() => {
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    cy.getFirstMachetePaidTransportRule();
    cy.getMacheteScheduleRules();
    cy.getMacheteTransportProviders();
    cy.apiGetEmployerProfile();
    cy.getMacheteLookups();
  });

  beforeEach(() => {
    cy.logout();
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    stepsToWorkAssignments();
  });

  it("should display all fields and text", () => {
    cy.get(WorkAssignmentSelectors.heading).contains(
      "Hire a Worker Online Order Form"
    );
    cy.get(WorkAssignmentSelectors.steps).contains("Intro");
    cy.get(WorkAssignmentSelectors.steps).contains("Confirm");
    cy.get(WorkAssignmentSelectors.steps).contains("site details");
    cy.get(WorkAssignmentSelectors.steps).contains("job details");
    cy.get(WorkAssignmentSelectors.steps).contains("confirm");

    cy.get(WorkAssignmentSelectors.stepInstructions).contains(
      "Choose the skill and the number of hours needed for your job request."
    );
    cy.get(WorkAssignmentSelectors.chooseJobsTab).contains("Choose Jobs");
    cy.get(WorkAssignmentSelectors.reviewAndContinueTab)
      .should("exist")
      .contains("Review and Continue");
    cy.get(WorkAssignmentSelectors.fieldChageSkillSelection)
      .should("exist")
      .contains("Select a Skill");
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).should("exist");
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).should("exist");
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).should("exist");

    const anySkill = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest)
      .find("button")
      .should("not.have.attr", "disabled");
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();

    cy.get(WorkAssignmentSelectors.buttonAddMoreJobs)
      .should("exist")
      .parent()
      .should("not.have.attr", "disabled");
    cy.get(WorkAssignmentSelectors.buttonSaveAndContinue)
      .should("exist")
      .parent()
      .should("not.have.attr", "disabled");
  });
  it("should not display add request if invalid", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).type(
      anySkill.minHour.toString()
    );
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest)
      .find("button")
      .should("have.attr", "disabled");
  });
  it("should validate additional info length", () => {
    const additionalInfoOverflow = faker.random.alpha({
      count: 1050,
      upcase: false,
    });
    cy.get(".p-tabview-nav-content ul li:first").should(
      "have.class",
      "p-highlight"
    ); // make sure right tab is selected
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo)
      .trigger("mousedown")
      .type(additionalInfoOverflow);
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).should(
      "have.class",
      "ng-invalid"
    );
  });
  it("should add request to list when valid and swtich to review tab", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(".p-tabview-nav-content ul li:first")
      .next()
      .should("have.class", "p-highlight"); // make sure right tab is selected
    cy.get(`[header="Review and Continue"]`)
      .find("p-table")
      .contains(stringToTitleCase(anySkill.text_EN));
  });
  it("should show success message when request is added", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`p-messages .p-message-summary`).contains(`Success!`);
    cy.get(`p-messages .p-message-detail`).contains(
      `Job added successfully to your resquest. See details below`
    );
  });
  it("should edit request", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    const uniqueValue = "MacheteRocks";
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`tbody tr`).first().find(`td`).last().find(`button`).first().click();
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).type(uniqueValue);
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded)
      .clear()
      .type((anySkill.minHour + 1).toString());
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`tbody`).contains(uniqueValue);
    cy.get(`tbody`).contains((anySkill.minHour + 1).toString());
  });
  it("should delete request", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    const uniqueValue = "MacheteRocks";
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).type(uniqueValue);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`tbody tr`).first().find(`td`).last().find(`button`).last().click();
    cy.get(`tbody`).should("not.contain", uniqueValue);
  });
  it("Add More Jobs should switch to blank form", () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(WorkAssignmentSelectors.buttonAddMoreJobs).click();
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).should(
      "have.value",
      "0 hrs."
    );
  });
  it(`Save and Continue should navigate to ${onlineOrderRoutes.orderConfirm}`, () => {
    const anySkill: LookupVM = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(WorkAssignmentSelectors.buttonSaveAndContinue).click();
    cy.url().should("contain", onlineOrderRoutes.orderConfirm);
  });
});

const selectAnySkill = (anySkill: LookupVM) => {
  cy.wait(REMOTE_TEST_WAIT_MS);
  cy.get(WorkAssignmentSelectors.chooseJobsTab).click();
  cy.get(WorkAssignmentSelectors.fieldChageSkillSelection).click();
  const skillTitleCase = stringToTitleCase(anySkill.text_EN);
  cy.get("tbody td:first").should("exist");
  cy.get(`[data-mtest="${anySkill.id}"]`).click();
  cy.get(WorkAssignmentSelectors.skillInfo).contains(skillTitleCase);
  const minHours = anySkill.minHour.toString();
  cy.get(WorkAssignmentSelectors.fieldHoursNeeded).clear().type(minHours);
  cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).focus();
};
