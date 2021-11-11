import { TransportRule } from "src/app/online-orders/shared/models/transport-rule";
import { IOnlineOrderRoute } from "../interfaces";

export const MACHETE_ADMIN = { user: "jadmin", password: "ChangeMe" };
export const MACHETE_USER = { user: "juser", password: "ChangeMe" };

// environment var ids used for hodling data from API requests
export const ENV_KEY_MACHETE_EMPLOYER = "machete-employer";
export const ENV_KEY_MACHETE_CONFIGS = "machete-configs";
export const ENV_KEY_MACHETE_TRANSPORT_PROVIDER_RULES = "machete-transport-provider-rules";
export const ENV_KEY_MACHETE_TRANSPORT_PROVIDERS = "machete-transport-providers";

// keyboard key codes
export const ESCAPE_KEY = { keyCode: 27 };

// routes
const onlineOrdersBase: string = "/online-orders";
export const onlineOrderRoutes: IOnlineOrderRoute = {
  introduction: `${onlineOrdersBase}/introduction`,
  introConfirm: `${onlineOrdersBase}/intro-confirm`,
  workOrders: `${onlineOrdersBase}/work-order`,
};
