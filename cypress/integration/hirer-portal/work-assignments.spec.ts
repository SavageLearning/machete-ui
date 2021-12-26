import {
  ENV_KEY_ANY_SKILL,
  ENV_KEY_MACHETE_EMPLOYER,
  ENV_KEY_MACHETE_LOOKUPS,
  ENV_KEY_MACHETE_TRANSPORT_PROVIDERS,
  initConfirmCheckedTerms,
  MACHETE_ADMIN,
  onlineOrderRoutes,
} from "cypress/constants";
import { stringToTitleCase } from "cypress/utils/helpers";
import * as faker from "faker";
import { Lookup } from "src/app/lookups/models/lookup";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";
import { WorkAssignmentSelectors } from "../../constants/hirer-portal-selectors";

const stepsToWorkOrders = () => {
  const employerProfile = Cypress.env(ENV_KEY_MACHETE_EMPLOYER);
  const transportProviders = Cypress.env(ENV_KEY_MACHETE_TRANSPORT_PROVIDERS);
  const aFreeTransportProvider: TransportProvider = transportProviders.find(
    (tp) => tp.key.includes("pickup")
  );

  const orderComponentUG = false;

  const dummyDate = new Date();
  // when weekend, add 4 days to land on a weekday
  dummyDate.setDate(dummyDate.getDay() < 5 ? dummyDate.getDate() + 7 : 4);
  dummyDate.setHours(9, 30);

  const macheteWorkOrder = {
    id: 0,
    dateTimeofWork: dummyDate,
    contactName: employerProfile.name,
    worksiteAddress1: employerProfile.address1,
    worksiteAddress2: null,
    city: employerProfile.city,
    state: employerProfile.state,
    zipcode: employerProfile.zipcode,
    phone: employerProfile.phone,
    description: "asd",
    englishRequired: false,
    englishRequiredNote: null,
    transportProviderID: aFreeTransportProvider.id,
  };

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
        orderComponentUG.toString()
      );
      win.sessionStorage.setItem(
        "machete.workorder",
        JSON.stringify(macheteWorkOrder)
      );
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
    cy.getMacheteTransportRules();
    cy.getMacheteTransportProviders();
    cy.getEmployerProfile();
    if (Cypress.env(ENV_KEY_MACHETE_EMPLOYER) == 0) {
      // if new employer
      console.log(Cypress.env(ENV_KEY_MACHETE_EMPLOYER));
      cy.fillOutEmployerProfile();
    }
    cy.getMacheteLookups();
  });

  beforeEach(() => {
    cy.logout();
    cy.apiLogin(MACHETE_ADMIN.user, MACHETE_ADMIN.password);
    stepsToWorkOrders();
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
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).type(
      anySkill.minHour.toString()
    );
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest)
      .find("button")
      .should("have.attr", "disabled");
  });
  it("should validate additional info length", () => {
    const additionalInfoOverflow = faker.random.alpha({
      count: 1001,
      upcase: false,
    });
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).type(
      additionalInfoOverflow
    );
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`p-tabview`)
      .parent()
      .should("include.html", `active-index="0"`)
      .should("not.include.html", `active-index="1"`);
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).should(
      "have.class",
      "ng-invalid"
    );
  });
  it("should add request to list when valid and swtich to review tab", () => {
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`p-tabview`)
      .parent()
      .should("include.html", `active-index="1"`)
      .should("not.include.html", `active-index="0"`);
    cy.get(`[header="Review and Continue"]`)
      .find("p-table")
      .contains(stringToTitleCase(anySkill.text_EN));
  });
  it("should show success message when request is added", () => {
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`p-messages .p-message-summary`).contains(`Success!`);
    cy.get(`p-messages .p-message-detail`).contains(
      `Job added successfully to your resquest. See details below`
    );
  });
  it("should edit request", () => {
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
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
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    const uniqueValue = "MacheteRocks";
    cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).type(uniqueValue);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(`tbody tr`).first().find(`td`).last().find(`button`).last().click();
    cy.get(`tbody`).should("not.contain", uniqueValue);
  });
  it("Add More Jobs should switch to blank form", () => {
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(WorkAssignmentSelectors.buttonAddMoreJobs).click();
    cy.get(WorkAssignmentSelectors.fieldHoursNeeded).should(
      "have.value",
      "0 hrs."
    );
  });
  it(`Save and Continue should navigate to ${onlineOrderRoutes.orderConfirm}`, () => {
    const anySkill: Lookup = Cypress.env(ENV_KEY_ANY_SKILL);
    selectAnySkill(anySkill);
    cy.get(WorkAssignmentSelectors.buttonAddCurrentJobToRequest).click();
    cy.get(WorkAssignmentSelectors.buttonSaveAndContinue).click();
    cy.url().should("contain", onlineOrderRoutes.orderConfirm);
  });
  it("should compute correct transport fee", () => {
    
  });
});

const selectAnySkill = (anySkill: Lookup) => {
  cy.get(WorkAssignmentSelectors.chooseJobsTab).click();
  cy.get(WorkAssignmentSelectors.fieldChageSkillSelection).click();
  const skillTitleCase = stringToTitleCase(anySkill.text_EN);
  cy.get(`[data-mtest="${anySkill.id}"]`).click();
  cy.get(WorkAssignmentSelectors.skillInfo).contains(skillTitleCase);
  const minHours = anySkill.minHour.toString();
  cy.get(WorkAssignmentSelectors.fieldHoursNeeded).clear().type(minHours);
  cy.get(WorkAssignmentSelectors.fieldAdditionalInfo).focus();
};
