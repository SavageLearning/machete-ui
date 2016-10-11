import {Record} from './record';

export interface Employer extends Record {
  active?: boolean;
  business?: boolean;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  phone?: string;
  cellPhone?: string;
  zipCode?: string;
  email?: string;
  referralType_EN?: string; // TODO this diverges from v1 model
  referredByOther?: string;
  blogParticipate?: boolean;
  notes?: string;
  onlineSource?: boolean;
  returnCustomer?: boolean; // TODO this should be calculated, not a bit
  receiveUpdates?: boolean;
  businessName?: string;
  licensePlate?: string;
  driversLicense?: string;
}
