/**
 * Created by jcii on 5/31/17.
 */
import { Record } from './record';
export class WorkAssignment extends Record<WorkAssignment>
{
  skillId: number;
  skill: string;
  hours: number;
  description: string;
  requiresHeavyLifting = false;
  hourlyWage: number;
  transportCost: number;

  static sort(a: WorkAssignment, b: WorkAssignment) {
    if (a.ID < b.ID) { return -1; }
    if (a.ID > b.ID) { return 1; }
    return 0;
  }
}
