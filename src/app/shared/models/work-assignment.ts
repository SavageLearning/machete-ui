/* eslint-disable brace-style */
/**
 * Created by jcii on 5/31/17.
 */
import { WorkAssignmentVM } from "machete-client";
import { Record } from "./record";
export class WorkAssignment
  extends Record<WorkAssignment>
  implements WorkAssignmentVM
{
  skillId: number;
  skill: string;
  hours: number;
  description: string;
  requiresHeavyLifting = false;
  hourlyWage: number;
  transportCost: number;
  days: number;

  static sort = (a: WorkAssignment, b: WorkAssignment): number => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };
}
