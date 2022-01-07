import { Lookup } from "src/app/lookups/models/lookup";
import { ScheduleRule } from "src/app/online-orders/shared/models/schedule-rule";
import { TransportProvider } from "src/app/online-orders/shared/models/transport-provider";
import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { Employer } from "src/app/shared/models/employer";
import { WorkAssignment } from "src/app/shared/models/work-assignment";

export const stringToTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

export const getTodayPlus = (
  days: number
): { text: string; dateText: string } => {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + days);
  return {
    text: future.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    }),
    dateText: future.getDate.toString(),
  };
};

/**
 * Filters transport providers by a key
 * @param transportProviderLu string
 * @param transportProviders array of transport providers
 * @returns
 */
export const filterProvider = (
  transportProviderLu: string,
  transportProviders: TransportProvider[]
): TransportProvider => {
  const transportProvider = transportProviders.find(
    (tp) => tp.key === transportProviderLu
  );
  return transportProvider ?? null;
};

/**
 * gets the first day the provider is available
 * When none is found, -1 is returned
 * @param transportProvider
 * @param scheduleRules
 * @returns a Date object triggering a paid transport rule
 */
export const getFirstAvailableDateFromProvider = (
  transportProvider: TransportProvider,
  scheduleRules: ScheduleRule[]
): Date => {
  const dayAvailable = transportProvider.availabilityRules.find(
    (tar) => tar.available
  );

  const matchedSchedule = scheduleRules.find(
    (sr) => sr.day === dayAvailable.day
  );

  const payableDate = new Date();

  const leadDays = matchedSchedule.leadHours / 24;

  const daysDistance = dayAvailable.day - payableDate.getDay();

  const dateWithPaidRule =
    payableDate.getDate() + daysDistance + (leadDays % 7);

  // a date that applies to some paid rule
  payableDate.setDate(dateWithPaidRule);
  payableDate.setHours(0, matchedSchedule.minStartMin);

  return payableDate;
};

export const getFirstAvailableTime = (
  day: number,
  scheduleRules: ScheduleRule[]
): { leadHours: number; minStartMin: number } => {
  const matchedSchedule = scheduleRules.find((sr) => sr.day);

  return {
    leadHours: matchedSchedule.leadHours + 1,
    minStartMin: matchedSchedule.minStartMin + 30,
  };
};

export const getExpectedCostForWorkerCount = (
  count: number,
  rule: TransportRule
): number => {
  // can have a cost rule for a van, with an id greater that min/max worker,
  // that then leads to no rule.
  // TODO: Handle too many ids exception
  const result = rule.costRules.find(
    (r) => count > r.minWorker && count <= r.maxWorker
  );
  if (result === undefined || result == null) {
    throw new Error("work assignment count outside of cost rules");
  }
  return result.cost;
};

/**
 * Get machete workorder stub with paid transport provider ID selected
 * @param employerProfile the current employer for testing
 * @param transportProviders tps
 * @param paidTransportRule transport rules
 * @param scheduleRules schedule rules
 * @returns
 */
export const generateWorkOrderStub = (
  employerProfile: Employer,
  transportProviders: TransportProvider[],
  paidTransportRule: TransportRule,
  scheduleRules: ScheduleRule[]
) => {
  const aPaidProvider = filterProvider(paidTransportRule.lookupKey, [
    ...transportProviders,
  ]);

  const availableDate = getFirstAvailableDateFromProvider(
    aPaidProvider,
    scheduleRules
  );

  const macheteWorkOrder = {
    id: 0,
    dateTimeofWork: availableDate,
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
    transportProviderID: aPaidProvider.id,
  };

  return { ...macheteWorkOrder };
};

/**
 *
 * @param skill generates array of assignments
 * @param aPaidTransportRule
 * @returns
 */
export const generateWorkAssignmentsStub = (
  skill: Lookup,
  aPaidTransportRule: TransportRule
): WorkAssignment[] => {
  if (skill === null || skill === undefined) {
    throw new Error("error");
  }
  const wa: WorkAssignment = {
    id: 1,
    skillId: skill.id,
    skill: skill.text_EN,
    hours: skill.minHour,
    description: "",
    requiresHeavyLifting: false,
    hourlyWage: skill.wage,
    transportCost: getExpectedCostForWorkerCount(1, aPaidTransportRule),
    days: 1, // this is the default
  };

  const wa2: WorkAssignment = {
    id: 2,
    transportCost: getExpectedCostForWorkerCount(2, aPaidTransportRule),
    ...wa,
  };

  return [wa, wa2];
};
