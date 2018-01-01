import { WorkAssignment } from "./work-assignment";
import { Record } from './record';

export class WorkOrder extends Record<WorkOrder> {
  additionalNotes: string;
  
  // createdby: string;
  // datecreated: Date;
  // dateupdated: Date;
  // updatedby: string;
  // additionalNotes: string;
  city: string;
  contactName: string;
  dateTimeofWork: Date;
  description: string;
  // disclosureAgreement?: boolean;
  // employerID: number;
  // englishRequired: boolean;
  // englishRequiredNote: string;
  // onlineSource: boolean;
  // paperOrderNum?: number;
  ppFee?: string;
  ppPayerID?: number;
  ppState?: string;
  ppResponse?: string;
  ppPaymentToken?: string;
  ppPaymentID?: string;
  phone: string;
  state: string;
  // statusEN: string;
  // statusID: number;
  // timeFlexible: boolean;
  // timeZoneOffset: number;
  // transportFee: number;
  // transportMethodEN: string;
  transportMethodID: number;
  // waPseudoIDCounter: number;
  worksiteAddress1: string;
  worksiteAddress2: string;
  zipcode: string;

  workAssignments?: WorkAssignment[];

  isNotEmpty(): boolean {
    return !this.isEmpty();
  }
  isEmpty(): boolean {    
    for (var key in this) {
      if (this[key] !== null && this[key] != "")
        console.log('Not empty: ', this[key]);
        return false;
    }

    return true;
  }
}
