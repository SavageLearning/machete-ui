import { WorkOrder } from "./work-order";

export class Employer {
  id: number;
  active: boolean;
  address1: string;
  address2: string;
  blogparticipate?: boolean;
  business: boolean;
  businessname: string;
  cellphone: string;
  city: string;
  driverslicense: string;
  email: string;
  fax: string;
  isOnlineProfileComplete?: boolean;
  licenseplate: string;
  name: string;
  notes: string;
  onlineSigninID: string;
  onlineSource: boolean;
  phone: string;
  receiveUpdates: boolean;
  referredBy?: number;
  referredByOther: string;
  returnCustomer: boolean;
  state: string;
  workOrders: WorkOrder[];
  zipcode: string;
}