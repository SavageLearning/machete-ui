/**
 * Created by jcii on 5/31/17.
 */
import { Record } from '../../shared';
export class WorkAssignment extends Record<WorkAssignment>
{
  skillId: number;
  skill: string;
  hours: number;
  description: string;
  requiresHeavyLifting = false;
  wage: number;
  transportCost: number;

  static sort(a: WorkAssignment, b: WorkAssignment) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
}
