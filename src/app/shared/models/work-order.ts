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
  // paypalErrors: string;
  // paypalFee?: number;
  // paypalPayerId: string;
  // paypalToken: string;
  // paypalTransactID: string;
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
}
