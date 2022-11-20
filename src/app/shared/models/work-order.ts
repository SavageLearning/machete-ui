import { WorkAssignment } from "./work-assignment";
import { Record } from "./record";
import { WorkOrderVM } from "machete-client";

export class WorkOrder extends Record<WorkOrder> implements WorkOrderVM {
  city: string;
  contactName: string;
  dateTimeofWork: string;
  description: string;
  englishRequired = false;
  englishRequiredNote: string;
  paperOrderNum?: number;
  ppFee?: number;
  ppPayerID?: string;
  ppState?: string;
  ppResponse?: string;
  ppPaymentToken?: string;
  ppPaymentID?: string;
  phone: string;
  state: string;
  statusEN: string;
  transportProviderID: number;
  workSiteAddress1: string;
  workSiteAddress2: string;
  zipcode: string;

  workAssignments?: WorkAssignment[];

  isNotEmpty(): boolean {
    return !this.isEmpty();
  }
  isEmpty(): boolean {
    for (const key in this) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        console.log("Not empty: ", this[key]);
      }
      return false;
    }
    return true;
  }
}
