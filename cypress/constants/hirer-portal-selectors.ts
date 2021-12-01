export class WorkOrderSelectors {
  static readonly dow: string = "#dateOfWork > .p-calendar > .p-inputtext";
  static readonly tow: string = "#timeOfWork > .p-calendar > .p-inputtext";
  static readonly contacName: string = `input[id="contactName"]`;
  static readonly address1: string = `input[id="worksiteAddress1"]`;
  static readonly city: string = `input[id="city"]`;
  static readonly state: string = `input[id="state"]`;
  static readonly zipcode: string = `input[id="zipcode"]`;
  static readonly phone: string = `input[id="phone"]`;
  static readonly description: string = `textarea[id="description"]`;
}

export class WorkAssignmentSelectors {
  static readonly heading: string = "h1";
  static readonly steps: string = `.p-steps`;
  static readonly stepsTitle: string = ".p-card-title";
  static readonly stepInstructions: string = ".p-card-subtitle";
  static readonly chooseJobsTab: string = "#p-tabpanel-0-label > .p-tabview-title";
  static readonly reviewAndContinueTab: string = "#p-tabpanel-1-label > .p-tabview-title";
  static readonly fieldChageSkillSelection: string = "div.p-col-12 > p-button.p-element > .p-ripple > .p-button-label";
  static readonly fieldHoursNeeded: string = "#hours";
  static readonly fieldRequiresHeavyLifting: string = ".p-inputswitch-slider";
  static readonly fieldAdditionalInfo: string = "#description";
  static readonly buttonAddCurrentJobToRequest: string = `[data-mtest="add-current-job-to-request"]`;
  static readonly addSuccessM: string = ".p-message-wrapper";
  static readonly buttonSaveAndContinue: string = `[label="Save and Continue"] > .p-ripple > .p-button-label`;
  static readonly buttonAddMoreJobs: string = `[label="Add More Jobs"] > .p-ripple > .p-button-label`;
  static readonly skillInfo: string = `.p-text-bold`;
}
