/* eslint-disable @typescript-eslint/naming-convention */
import { ConfigVM } from "machete-client";
import { Record } from "./record";
export class Config extends Record<Config> implements ConfigVM {
  key: string;
  value: string;
  description: string;
  category: string;
  publicConfig: boolean;
}

export enum CCategory {
  DAILYLIST = "DailyList",
  EMAIL = "Emails",
  GENERAL = "General",
  ONLINEORDERS = "OnlineOrders",
  PAYPAL = "PayPal",
}
