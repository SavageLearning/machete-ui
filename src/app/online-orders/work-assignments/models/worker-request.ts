/**
 * Created by jcii on 5/31/17.
 */
export class WorkerRequest
{
  id: number;
  skillId: number;
  skill: string;
  hours: number;
  description: string;
  requiresHeavyLifting: boolean = false;
  wage: number;
}
