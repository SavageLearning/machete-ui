/**
 * Created by jcii on 6/10/17.
 */
import { WorkAssignment } from '../../work-assignments/models/work-assignment';

export class WorkOrder {
  dateTimeofWork: Date;
  contactName: string;
  worksiteAddress1: string;
  worksiteAddress2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  description: string;
  additionalNotes: string;
  transportMethodID: number;
  workAssignments?: WorkAssignment[];
}
