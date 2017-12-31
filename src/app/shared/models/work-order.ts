import { WorkAssignment } from "./work-assignment";
import { Record } from './record';

export class WorkOrder extends Record<WorkOrder> {
  additionalNotes: string;
  
  // createdby: string;
  // datecreated: Date;
  // dateupdated: Date;
  // id: number;
  // idPrefix: string;
  // idString: string;
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
  // lunchSupplied: boolean;
  // onlineSource: boolean;
  // paperOrderNum?: number;
  ppFee?: string;
  ppPayerID?: number;
  ppState?: string;
  ppResponse?: string;
  ppPaymentToken?: string;
  ppPaymentID?: string;
  // permanentPlacement: boolean;
  phone: string;
  state: string;
  // statusEN: string;
  // statusES: string;
  // statusID: number;
  // timeFlexible: boolean;
  // timeZoneOffset: number;
  // transportFee: number;
  // transportFeeExtra: number;
  // transportMethodEN: string;
  // transportMethodES: string;
  transportMethodID: number;
  // transportTransactID: string;
  // transportTransactType?: number;
  // typeOfWorkID: number;
  // waPseudoIDCounter: number;
  worksiteAddress1: string;
  worksiteAddress2: string;
  zipcode: string;
  // EID: string;
  // WOID: string;
  // recordid: string;
  // dateupdatedstring: string;
  // datecreatedstring: string;
  // transportMethod: string;

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
    // if (this.additionalNotes != null) return false;
    // if (this.city != null) return false;
    // if (this.contactName != null) return false;
    // if (this.dateTimeofWork != null) return false;
    // if (this.description != null) return false;
    // if (this.phone != null) return false;
    // if (this.ppFee != null) return false;
    // if (this.ppPayerID != null) return false;
    // if (this.ppPaymentID != null) return false;
    // if (this.ppPaymentToken != null) return false;
    // if (this.ppResponse != null) return false;
    // if (this.ppState != null) return false;

    return true;
  }
}
