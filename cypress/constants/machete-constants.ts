import { IOnlineOrderRoute } from "../interfaces";

export const MACHETE_ADMIN = { user: "jadmin", password: "ChangeMe" };
export const MACHETE_USER = { user: "juser", password: "ChangeMe" };
export const REMOTE_TEST_WAIT_MS = 0;

// environment var ids used for hodling data from API requests
export const ENV_KEY_MACHETE_EMPLOYER = "machete-employer";
export const ENV_KEY_MACHETE_CONFIGS = "machete-configs";
export const ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES = "machete-transport-provider-rules";
export const ENV_KEY_MACHETE_TRANSPORT_SCHEDULE_RULES = "machete-transport-schedule-rules";
export const ENV_KEY_MACHETE_PAID_TRANSPORT_RULE = "machete-transport-paid-rule";
export const ENV_KEY_MACHETE_TRANSPORT_PROVIDERS = "machete-transport-providers";
export const ENV_KEY_MACHETE_LOOKUPS = "machete-lookups";
export const ENV_KEY_ANY_SKILL = "machete-any-skill";

// keyboard key codes
export const ESCAPE_KEY = { keyCode: 27 };

// routes
const onlineOrdersBase: string = "/online-orders";
export const onlineOrderRoutes: IOnlineOrderRoute = {
  introduction: `${onlineOrdersBase}/introduction`,
  introConfirm: `${onlineOrdersBase}/intro-confirm`,
  workOrders: `${onlineOrdersBase}/work-order`,
  workAssignments: `${onlineOrdersBase}/work-assignments`,
  orderConfirm: `${onlineOrdersBase}/order-confirm`,
};

export const initConfirmCheckedTerms = [
  {
    name: "completion",
    description:
      "This order is not complete until I receive a confirmation email from Casa Latina.  \n      If you do not hear from us or if you need a worker with 48 hours please call 206.956.0779 x3 \n      during our business hours.",
    confirmed: true,
  },
  {
    name: "arrival_time",
    description:
      " Please allow a one hour window for workers to arrive.This will account for \n      transportation routes with multiple stops and for traffic. There is no transportation fee to \n      hire a Casa Latina worker when you pick them up from our office. To have your worker(s) arrive \n      at your door, there is a small fee payable through this form.",
    confirmed: true,
  },
  {
    name: "employer_agency",
    description:
      "Casa Latina workers are not contractors. You will need to provide all tools, \n      materials, and safety equipment (link to http://casa-latina.org/information-for-employers) \n      necessary for the job(s) I wish to have done. ",
    confirmed: true,
  },
  {
    name: "screening",
    description:
      "I understand that as a condition of participation in our referral program, all \n      workers have been screened through the national and local sex offender registries.  However, \n      they have not gone through any other type of background checks.",
    confirmed: true,
  },
  {
    name: "in-house_training",
    description:
      "Casa Latina does not employ the workers that it refers.  When I make the decision \n      to hire, I am their employer and they are my employees. All workers referred through Casa Latina \n      have completed at least 10 hours of in-house training and Casa Latina does its best to only \n      refer workers who are skilled and dependable, but it cannot and does not guarantee that worker \n      performance will always meet my expectations. Casa Latina is not responsible for any failure \n      in worker performance or for any damage or injuries that could conceivably occur during the \n      performance of the work I have hired these workers to perform.",
    confirmed: true,
  },
  {
    name: "satisfaction",
    description:
      "If I am dissatisfied with work performance, I may ask that the worker stop \n      working and just pay them for the hours worked.  I am not obligated to continue to work with \n      her or him.",
    confirmed: true,
  },
  {
    name: "covid-19",
    description:
      "I certify that no one in my household have symptoms of COVID-19, such as dry cough, \n      fever, and loss of smell and taste, or has been in close contact with someone who does, no one \n      in my household has tested positive for COVID-19, no one in my household been in close contact \n      with someone who has tested positive for COVID-19.\n      ",
    confirmed: true,
  },
];
